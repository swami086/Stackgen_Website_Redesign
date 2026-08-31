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

// Hub-facing edges of Pencil shells — corridor stitch, never past the boxes.
const SOURCES = [
  { id: "ide", x: 0.36, y: 0.4, emits: "edit" },
  { id: "git", x: 0.36, y: 0.5, emits: "commit" },
  { id: "ci", x: 0.36, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.36, y: 0.7, emits: "plan" },
] as const;

const HUB = { id: "hub", x: 0.5, y: 0.55 };

const SINKS = [
  { id: "runtime", x: 0.64, y: 0.44 },
  { id: "infra", x: 0.64, y: 0.55 },
  { id: "obs", x: 0.64, y: 0.66 },
] as const;

/** Particles + seam SVG stay inside this band so Soft Structuralism shells stay clean. */
const CORRIDOR = { minX: 0.34, maxX: 0.66 } as const;

/** Corridor-only stitch paths (viewBox 0–100) — Context Graph as the join. */
const STITCH_IN = [
  "M36 40 C42 46 46 50 50 55",
  "M36 48 C42 50 46 52 50 55",
  "M36 58 C42 56 46 55 50 55",
  "M36 66 C42 62 46 58 50 55",
] as const;

const STITCH_OUT = [
  "M50 55 C54 48 58 44 64 42",
  "M50 55 C54 52 58 54 64 55",
  "M50 55 C54 58 58 62 64 66",
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
 * Pencil → code: Stack_Linear.pen shells `k3vas0` (inner) / `eYtt6` (outer).
 * Soft Structuralism box: accent-rail header above a bordered zone of chips.
 * Motion note from Pencil: fade+slide 520ms ease.emphasize.
 */
function LoopShell({
  side,
  phase,
  eyebrow,
  title,
  children,
}: {
  side: "inner" | "outer";
  phase: AssemblePhase;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const offset =
    phase === "apart"
      ? side === "inner"
        ? -12
        : 12
      : phase === "gather"
        ? side === "inner"
          ? -4
          : 4
        : 0;

  return (
    <motion.div
      className="relative z-20 flex w-[260px] shrink-0 flex-col gap-2 self-center"
      animate={{
        x: offset,
        opacity: phase === "apart" ? 0.88 : 1,
      }}
      transition={{ duration: DUR.shell, ease: EASE.emphasize }}
      data-loop-shell={side}
      data-loop-phase={phase}
      data-pencil-id={side === "inner" ? "k3vas0" : "eYtt6"}
    >
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-0.5 shrink-0 rounded-sm bg-accent"
            aria-hidden
          />
          <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
            {eyebrow}
          </span>
        </div>
        <span className="text-xs font-semibold leading-tight text-text-primary">
          {title}
        </span>
      </div>
      <div
        className="flex w-full flex-col gap-1 rounded-xl border border-border bg-surface p-3"
        data-loop-zone={side}
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
      aria-label="Inner loop build-and-ship tools and outer loop run-and-observe tools connected through the Context Graph"
      data-diagram="inner-outer-loop-shells"
      data-assemble-phase={phase}
      data-tile-density="offerings"
      data-compose="keystone"
      data-motion="corridor-stitch"
      className="glass-specular relative mx-auto flex w-full flex-row items-center justify-center gap-4 overflow-visible rounded-[16px] border border-border p-2.5 md:gap-6 md:p-3"
    >
      <ParticleField
        sources={SOURCES}
        hub={HUB}
        sinks={SINKS}
        isolateSourceId={isolateSourceId}
        onAbsorb={onAbsorb}
        onEmit={onEmit}
        corridor={CORRIDOR}
        labels="hub"
        maxParticles={28}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Corridor stitch — draws only between shells; Context Graph is the join. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible transition-opacity duration-500",
          showStitch ? "opacity-100" : "opacity-0",
        )}
        data-stitch-seams="corridor"
      >
        <defs>
          <clipPath id="iol-corridor-clip">
            <rect x={CORRIDOR.minX * 100} y="0" width={(CORRIDOR.maxX - CORRIDOR.minX) * 100} height="100" />
          </clipPath>
        </defs>
        <g clipPath="url(#iol-corridor-clip)">
          {STITCH_IN.map((d, i) => (
            <DrawPath
              key={`in-${i}`}
              d={d}
              delay={0.05 * i}
              duration={0.55}
              strokeWidth={0.35}
              className="stroke-border"
            />
          ))}
          {STITCH_OUT.map((d, i) => (
            <DrawPath
              key={`out-${i}`}
              d={d}
              delay={0.2 + 0.08 * i}
              duration={0.55}
              strokeWidth={0.4}
              className="stroke-accent/40"
            />
          ))}
          {phase === "lock" &&
            STITCH_IN.map((d, i) => (
              <Beam
                key={`beam-in-${i}`}
                d={d}
                delay={i * 0.35}
                duration={AMBIENT.sweep / 1.8}
                r={0.9}
                className="fill-accent"
              />
            ))}
          {phase === "lock" &&
            STITCH_OUT.map((d, i) => (
              <Beam
                key={`beam-out-${i}`}
                d={d}
                delay={0.5 + i * 0.4}
                duration={AMBIENT.sweep / 1.6}
                r={0.95}
                className="fill-accent"
              />
            ))}
        </g>
      </svg>

      {/* INNER LOOP — Pencil k3vas0 */}
      <LoopShell
        side="inner"
        phase={phase}
        eyebrow="Inner Loop"
        title="Build & ship"
      >
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
                // Pencil chip: pad [4,8], cr 6 — aligned icon+label row
                "flex h-7 w-full shrink-0 cursor-default items-center gap-1.5 rounded-md border border-border bg-surface-raised px-2 transition-colors hover:border-border-hover",
                isolateSourceId === item.id && "border-accent",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
              data-loop-chip="inner"
            >
              <VendorMark slug={item.slug} theme={theme} className="size-3.5 shrink-0" />
              <span className={cn("leading-none whitespace-nowrap text-[11px] font-medium", labelTone)}>
                {item.label}
              </span>
            </div>
          ))}
        </Stagger>
      </LoopShell>

      {/* Context Graph — quiet keystone (Offerings accent, not neon hub) */}
      <div className="relative z-20 flex size-[132px] shrink-0 items-center justify-center">
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
            className="absolute top-1/2 left-1/2 h-px w-[46px] border-t border-dashed border-border/40"
            style={{
              transformOrigin: "0 0",
              transform: `rotate(${angle}deg) translate(18px, -50%)`,
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
            const r = 54;
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
                    "flex items-center justify-center rounded-md border px-1.5 py-0.5 transition-colors",
                    "bg-surface-raised",
                    isPulsed ? "border-accent text-accent" : "border-border text-text-tertiary",
                  )}
                  style={{
                    animation: reduced
                      ? undefined
                      : `orbit-track-reverse ${AMBIENT.orbit}s linear infinite`,
                    transitionDuration: `${DUR.chip}s`,
                  }}
                >
                  <span className="text-[8px] font-medium tracking-wide">{sat.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          className={cn(
            "glass-tile relative z-20 flex size-11 flex-col items-center justify-center gap-0.5 rounded-md border",
            theme === "light" ? "border-border-hover" : "border-border",
            (hubLock || phase === "lock") && "border-accent",
          )}
          animate={
            phase === "lock" || hubLock
              ? {
                  boxShadow:
                    theme === "light"
                      ? "0 0 22px 4px color-mix(in srgb, var(--ds-accent) 28%, transparent), 0 0 0 1px color-mix(in srgb, var(--ds-accent) 50%, transparent)"
                      : "0 0 18px 3px color-mix(in srgb, var(--ds-accent) 38%, transparent), 0 0 0 1px color-mix(in srgb, var(--ds-accent) 55%, transparent)",
                  scale: 1.06,
                }
              : { boxShadow: "0 0 0 0 transparent", scale: 1 }
          }
          transition={{ duration: DUR.shell, ease: EASE.emphasize }}
          data-hub-lock={phase === "lock" || hubLock ? "true" : "false"}
        >
          <GitFork size={12} className="text-text-primary" weight="bold" />
          <span className="text-center text-[7px] font-semibold leading-none text-text-primary">
            Context Graph
          </span>
        </motion.div>
      </div>

      {/* OUTER LOOP — Pencil eYtt6 */}
      <LoopShell
        side="outer"
        phase={phase}
        eyebrow="Outer Loop"
        title="Run & observe"
      >
        <Stagger step={STAGGER.chip} className="flex w-full flex-col gap-1">
          {[
            { id: "runtime", label: "Runtime", slug: "eks" as const },
            { id: "infra", label: "Infrastructure", slug: "aws" as const },
            { id: "obs", label: "Observability", slug: "datadog" as const },
          ].map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex h-7 w-full shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface-raised px-2 transition-colors hover:border-border-hover",
                pulsedSink === item.id && "border-accent",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
              data-loop-chip="outer"
            >
              <VendorMark slug={item.slug} theme={theme} className="size-3.5 shrink-0" />
              <span className={cn("leading-none whitespace-nowrap text-[11px] font-medium", labelTone)}>
                {item.label}
              </span>
            </div>
          ))}
        </Stagger>
      </LoopShell>

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
