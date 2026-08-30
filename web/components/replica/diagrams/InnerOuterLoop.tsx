"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { GitFork } from "@phosphor-icons/react/dist/ssr";
import { Beam } from "@/components/replica/motion/Beam";
import { DrawPath } from "@/components/replica/motion/DrawPath";
import { ParticleField } from "@/components/replica/motion/ParticleField";
import type {
  EmittedKind,
  WorkItemKind,
} from "@/components/replica/motion/ParticleField";
import { Stagger } from "@/components/replica/motion/Stagger";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { VendorMark } from "@/components/replica/logos";
import { cn } from "@/lib/cn";
import { AMBIENT, DUR, EASE, RING_OPACITY, STAGGER } from "@/lib/motion-tokens";

const SOURCES = [
  { id: "ide", x: 0.18, y: 0.28, emits: "edit" },
  { id: "git", x: 0.18, y: 0.44, emits: "commit" },
  { id: "ci", x: 0.18, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.18, y: 0.76, emits: "plan" },
] as const;

const HUB = { id: "hub", x: 0.5, y: 0.5 };

const SINKS = [
  { id: "runtime", x: 0.82, y: 0.34 },
  { id: "infra", x: 0.82, y: 0.5 },
  { id: "obs", x: 0.82, y: 0.66 },
] as const;

const SATELLITE_FOR_KIND: Record<WorkItemKind, string> = {
  edit: "memory",
  commit: "entities",
  pipeline: "policies",
  plan: "intent",
};

type AssemblePhase = "apart" | "gather" | "lock";

const PHASE_MS: Record<AssemblePhase, number> = {
  apart: 1800,
  gather: 1400,
  lock: 2200,
};

const PHASE_ORDER: AssemblePhase[] = ["apart", "gather", "lock"];

/**
 * Classic jigsaw silhouette — tabs on the mating edge so the puzzle reads
 * without copy (skeleton test). viewBox 0 0 200 320.
 * Inner: tabs on the RIGHT. Outer: sockets on the LEFT (receive those tabs).
 * Body band (content-safe): Inner x≈18–168 · Outer x≈32–182 — chips must
 * stay inside that band; tabs are stroke-only, never a content lane.
 */
const INNER_PUZZLE_D =
  "M18 10 H168 V70 C168 70 188 70 188 100 C188 130 168 130 168 130 V190 C168 190 188 190 188 220 C188 250 168 250 168 250 V310 H18 Z";

const OUTER_PUZZLE_D =
  "M32 10 H182 V310 H32 V250 C32 250 12 250 12 220 C12 190 32 190 32 190 V130 C32 130 12 130 12 100 C12 70 32 70 32 70 Z";

const STITCH_IN = [
  "M28 34 C40 40 44 46 50 50",
  "M28 44 C40 46 44 48 50 50",
  "M28 56 C40 54 44 52 50 50",
  "M28 66 C40 60 44 54 50 50",
] as const;

const STITCH_OUT = [
  "M50 50 C56 44 62 38 72 34",
  "M50 50 C58 48 66 50 72 50",
  "M50 50 C56 56 62 62 72 66",
] as const;

function PuzzleShell({
  side,
  theme,
  phase,
  children,
}: {
  side: "inner" | "outer";
  theme: "light" | "dark";
  phase: AssemblePhase;
  children: ReactNode;
}) {
  const d = side === "inner" ? INNER_PUZZLE_D : OUTER_PUZZLE_D;
  const fill = theme === "light" ? "var(--ds-surface)" : "var(--ds-surface)";
  const stroke =
    phase === "lock"
      ? "var(--ds-accent)"
      : theme === "light"
        ? "var(--ds-border)"
        : "var(--ds-border)";
  // Keep offsets small so halves stay near the keystone (stitch reads).
  const offset =
    phase === "apart" ? (side === "inner" ? -14 : 14) : phase === "gather" ? (side === "inner" ? -5 : 5) : 0;

  return (
    <motion.div
      className="relative z-10 w-44 shrink-0"
      animate={{ x: offset }}
      transition={{ duration: DUR.shell, ease: EASE.emphasize }}
      data-puzzle-shell={side}
      data-puzzle-phase={phase}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 320"
        className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-sm"
        preserveAspectRatio="none"
      >
        <path
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth={phase === "lock" ? 2.25 : 1.25}
          className="transition-[stroke] duration-300"
        />
        {/* Tab face highlights — silhouette only; content never sits here */}
        {side === "inner" ? (
          <>
            <circle cx="178" cy="100" r="12" fill="none" stroke={stroke} strokeWidth={1} opacity={0.45} />
            <circle cx="178" cy="220" r="12" fill="none" stroke={stroke} strokeWidth={1} opacity={0.45} />
          </>
        ) : (
          <>
            <circle cx="22" cy="100" r="12" fill="none" stroke={stroke} strokeWidth={1} opacity={0.35} />
            <circle cx="22" cy="220" r="12" fill="none" stroke={stroke} strokeWidth={1} opacity={0.35} />
          </>
        )}
      </svg>
      {/*
        Insets mirror path body (~9% far edge, ~18% tab edge, ~4% vertical)
        so chips cannot spill into knobs or past the stroke. overflow-hidden
        is the hard stop.
      */}
      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-stretch gap-1 overflow-hidden py-2.5",
          // Breathing room past stroke on far edge; tab edge clears knobs.
          side === "inner" ? "pl-6 pr-10" : "pl-10 pr-6",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function InnerOuterLoop({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();
  const [isolateSourceId, setIsolateSourceId] = useState<string | null>(null);
  const [pulsed, setPulsed] = useState<string | null>(null);
  const [hubLock, setHubLock] = useState(false);
  const [pulsedSink, setPulsedSink] = useState<string | null>(null);
  const [phase, setPhase] = useState<AssemblePhase>(reduced ? "lock" : "apart");
  const [phaseIndex, setPhaseIndex] = useState(0);

  const labelTone = theme === "light" ? "text-text-primary" : "text-text-secondary";
  const eyebrowTone =
    theme === "light" ? "text-text-secondary" : "text-text-tertiary";
  const ringTone = theme === "light" ? "border-border-hover" : "border-border";
  const trackTone =
    theme === "light" ? "border-border-hover/70" : "border-border/50";

  // Authored assemble cycle — independent of particles so the puzzle always reads.
  useEffect(() => {
    if (reduced) {
      setPhase("lock");
      return;
    }
    const current = PHASE_ORDER[phaseIndex % PHASE_ORDER.length]!;
    setPhase(current);
    if (current === "lock") setHubLock(true);
    const timer = setTimeout(() => {
      if (current === "lock") setHubLock(false);
      setPhaseIndex((i) => i + 1);
    }, PHASE_MS[current]);
    return () => clearTimeout(timer);
  }, [phaseIndex, reduced]);

  const onAbsorb = useCallback((kind: WorkItemKind) => {
    setPulsed(SATELLITE_FOR_KIND[kind]);
    setHubLock(true);
  }, []);

  const onEmit = useCallback((_kind: EmittedKind, sinkId: string) => {
    setPulsedSink(sinkId);
  }, []);

  useEffect(() => {
    if (!pulsed) return;
    const timer = setTimeout(() => setPulsed(null), 400);
    return () => clearTimeout(timer);
  }, [pulsed]);

  useEffect(() => {
    if (!hubLock || phase === "lock") return;
    const timer = setTimeout(() => setHubLock(false), 520);
    return () => clearTimeout(timer);
  }, [hubLock, phase]);

  useEffect(() => {
    if (!pulsedSink) return;
    const timer = setTimeout(() => setPulsedSink(null), 420);
    return () => clearTimeout(timer);
  }, [pulsedSink]);

  const showStitch = phase !== "apart";

  return (
    <div
      role="img"
      aria-label="Inner loop and outer loop as interlocking puzzle halves stitched by the Context Graph into one picture for agents"
      data-diagram="inner-outer-puzzle-stitch"
      data-assemble-phase={phase}
      className="glass-specular relative mx-auto flex w-fit max-w-5xl flex-row items-center justify-center gap-0 overflow-visible rounded-[16px] px-2 py-2.5"
    >
      <ParticleField
        sources={SOURCES}
        hub={HUB}
        sinks={SINKS}
        isolateSourceId={isolateSourceId}
        onAbsorb={onAbsorb}
        onEmit={onEmit}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Stitch seams — only after gather begins (nodes first, then edges) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible transition-opacity duration-500",
          showStitch ? "opacity-100" : "opacity-0",
        )}
        data-stitch-seams=""
      >
        {STITCH_IN.map((d, i) => (
          <DrawPath
            key={`in-${i}`}
            d={d}
            delay={0.05 * i}
            duration={0.55}
            strokeWidth={0.45}
            className="stroke-accent/40"
          />
        ))}
        {STITCH_OUT.map((d, i) => (
          <DrawPath
            key={`out-${i}`}
            d={d}
            delay={0.2 + 0.08 * i}
            duration={0.55}
            strokeWidth={0.5}
            className="stroke-accent/60"
          />
        ))}
        {phase === "lock" &&
          STITCH_IN.map((d, i) => (
            <Beam
              key={`beam-in-${i}`}
              d={d}
              delay={i * 0.4}
              duration={AMBIENT.sweep / 1.8}
              r={0.85}
              className="fill-accent"
            />
          ))}
        {phase === "lock" &&
          STITCH_OUT.map((d, i) => (
            <Beam
              key={`beam-out-${i}`}
              d={d}
              delay={0.6 + i * 0.45}
              duration={AMBIENT.sweep / 1.6}
              r={0.9}
              className="fill-accent"
            />
          ))}
      </svg>

      {/* INNER LOOP — left puzzle half */}
      <PuzzleShell side="inner" theme={theme} phase={phase}>
        <div className="flex flex-col items-center gap-0.5 px-0.5">
          <span className={cn("font-mono text-[9px] font-medium tracking-[1.5px]", eyebrowTone)}>
            INNER LOOP
          </span>
          <span className="text-[11px] font-medium text-text-primary">Build &amp; ship</span>
        </div>
        <Stagger step={STAGGER.chip} className="flex w-full flex-col gap-1">
          {[
            { id: "ide", label: "IDE", slug: "cursor" as const },
            { id: "git", label: "Git", slug: "github" as const },
            { id: "ci", label: "CI / CD", slug: "gitlab" as const },
            { id: "iac", label: "IaC", slug: "terraform" as const },
          ].map((item) => (
            <div
              key={item.id}
              onPointerEnter={() => setIsolateSourceId(item.id)}
              onPointerLeave={() => setIsolateSourceId(null)}
              className={cn(
                "flex h-7 w-full min-w-0 cursor-default items-center gap-1.5 rounded-full border bg-surface-raised px-2 transition-colors hover:border-border-hover",
                theme === "light" ? "border-border-hover" : "border-border",
                isolateSourceId === item.id && "border-accent",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
              data-puzzle-facet="inner"
            >
              <VendorMark slug={item.slug} theme={theme} className="h-3 w-3 shrink-0" />
              <span className={cn("truncate text-[11px] font-medium", labelTone)}>{item.label}</span>
            </div>
          ))}
        </Stagger>
      </PuzzleShell>

      {/* Context Graph — keystone that stitches the halves */}
      <div className="relative z-20 flex size-[156px] shrink-0 items-center justify-center">
        <div
          className={cn("absolute inset-0 rounded-full border", ringTone)}
          style={{
            animation: reduced
              ? undefined
              : `orbit-ring ${AMBIENT.ring}s ease-in-out infinite alternate`,
          }}
        />
        {[45, 135, 225, 315].map((angle) => (
          <div
            key={angle}
            className="absolute top-1/2 left-1/2 h-px w-[56px] border-t border-dashed border-border/50"
            style={{
              transformOrigin: "0 0",
              transform: `rotate(${angle}deg) translate(22px, -50%)`,
            }}
          />
        ))}
        <div
          className={cn("absolute inset-0 rounded-full border border-dashed", trackTone)}
          style={{
            animation: reduced
              ? undefined
              : `orbit-track ${AMBIENT.orbit}s linear infinite`,
          }}
        >
          {[
            { id: "intent", angle: 45 },
            { id: "entities", angle: 135 },
            { id: "policies", angle: 225 },
            { id: "memory", angle: 315 },
          ].map((sat) => {
            const rad = (sat.angle * Math.PI) / 180;
            const r = 68;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            const isPulsed = pulsed === sat.id || phase === "lock";

            return (
              <div
                key={sat.id}
                className="absolute flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full px-1 py-0.5 transition-colors",
                    theme === "light" ? "bg-surface-raised" : "bg-surface",
                  )}
                  style={{
                    animation: reduced
                      ? undefined
                      : `orbit-track-reverse ${AMBIENT.orbit}s linear infinite`,
                    borderColor: isPulsed ? "var(--ds-accent)" : "var(--ds-border)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    color: isPulsed ? "var(--ds-accent)" : "var(--ds-text-tertiary)",
                    transitionDuration: `${DUR.chip}s`,
                  }}
                >
                  <span className="font-mono text-[8px] tracking-wide">{sat.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          className={cn(
            "glow-source relative z-20 flex size-14 flex-col items-center justify-center gap-0.5 rounded-full border bg-surface shadow-sm",
            theme === "light" ? "border-border-hover" : "border-border",
            (hubLock || phase === "lock") && "border-accent",
          )}
          animate={
            phase === "lock" || hubLock
              ? {
                  boxShadow:
                    "0 0 20px 2px color-mix(in srgb, var(--ds-accent) 40%, transparent)",
                  scale: 1.05,
                }
              : {
                  boxShadow: "0 0 0 0 transparent",
                  scale: 1,
                }
          }
          transition={{ duration: DUR.shell, ease: EASE.emphasize }}
          data-hub-lock={phase === "lock" || hubLock ? "true" : "false"}
        >
          <GitFork size={14} className="text-text-primary" weight="bold" />
          <span className="text-center text-[8px] font-medium leading-none text-text-primary">
            Context Graph
          </span>
        </motion.div>
      </div>

      {/* OUTER LOOP — right puzzle half */}
      <PuzzleShell side="outer" theme={theme} phase={phase}>
        <div className="flex flex-col items-center gap-0.5 px-0.5">
          <span className={cn("font-mono text-[9px] font-medium tracking-[1.5px]", eyebrowTone)}>
            OUTER LOOP
          </span>
          <span className="text-[11px] font-medium text-text-primary">Run &amp; observe</span>
        </div>
        <Stagger step={STAGGER.chip} className="flex w-full flex-col gap-1">
          {[
            { id: "runtime", label: "Runtime", slug: "eks" as const },
            { id: "infra", label: "Infrastructure", slug: "aws" as const },
            { id: "obs", label: "Observability", slug: "datadog" as const },
          ].map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex h-7 w-full min-w-0 items-center gap-1.5 rounded-full border bg-surface-raised px-2 transition-colors hover:border-border-hover",
                theme === "light" ? "border-border-hover" : "border-border",
                pulsedSink === item.id && "border-accent",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
              data-puzzle-facet="outer"
            >
              <VendorMark slug={item.slug} theme={theme} className="h-3 w-3 shrink-0" />
              <span className={cn("truncate text-[11px] font-medium", labelTone)}>{item.label}</span>
            </div>
          ))}
        </Stagger>
      </PuzzleShell>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes orbit-track {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes orbit-track-reverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes orbit-ring {
            from { opacity: ${RING_OPACITY.from}; transform: scale(0.98); }
            to { opacity: ${RING_OPACITY.to}; transform: scale(1.02); }
          }
        }
      `}</style>
    </div>
  );
}
