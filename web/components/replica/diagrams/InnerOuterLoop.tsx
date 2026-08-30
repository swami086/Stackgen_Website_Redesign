"use client";

import { useCallback, useEffect, useState } from "react";
import { GitFork } from "@phosphor-icons/react/dist/ssr";
import { ParticleField } from "@/components/replica/motion/ParticleField";
import type { WorkItemKind } from "@/components/replica/motion/ParticleField";
import { Reveal } from "@/components/replica/motion/Reveal";
import { Stagger } from "@/components/replica/motion/Stagger";
import { VendorMark } from "@/components/replica/logos";
import { cn } from "@/lib/cn";
import { AMBIENT, DUR, RING_OPACITY, STAGGER } from "@/lib/motion-tokens";

const SOURCES = [
  { id: "ide", x: 0.14, y: 0.22, emits: "edit" },
  { id: "git", x: 0.14, y: 0.41, emits: "commit" },
  { id: "ci", x: 0.14, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.14, y: 0.79, emits: "plan" },
] as const;

const HUB = { id: "hub", x: 0.5, y: 0.5 };

const SINKS = [
  { id: "runtime", x: 0.86, y: 0.3 },
  { id: "infra", x: 0.86, y: 0.5 },
  { id: "obs", x: 0.86, y: 0.7 },
] as const;

const SATELLITE_FOR_KIND: Record<WorkItemKind, string> = {
  edit: "memory",
  commit: "entities",
  pipeline: "policies",
  plan: "intent",
};

export function InnerOuterLoop({ theme }: { theme: "light" | "dark" }) {
  const [isolateSourceId, setIsolateSourceId] = useState<string | null>(null);
  const [pulsed, setPulsed] = useState<string | null>(null);
  const labelTone = theme === "light" ? "text-text-primary" : "text-text-secondary";
  const eyebrowTone =
    theme === "light" ? "text-text-secondary" : "text-text-tertiary";
  const ringTone = theme === "light" ? "border-border-hover" : "border-border";
  const trackTone =
    theme === "light" ? "border-border-hover/70" : "border-border/50";

  const onAbsorb = useCallback((kind: WorkItemKind) => {
    setPulsed(SATELLITE_FOR_KIND[kind]);
  }, []);

  useEffect(() => {
    if (!pulsed) return;
    const timer = setTimeout(() => setPulsed(null), 400);
    return () => clearTimeout(timer);
  }, [pulsed]);

  return (
    <div
      role="img"
      aria-label="Inner loop build and ship tools feeding the Context Graph, which emits governed runtime, infrastructure, and observability work"
      className="glass-specular relative flex w-full max-w-[1024px] flex-row items-center justify-between rounded-[20px] p-6"
    >
      <ParticleField
        sources={SOURCES}
        hub={HUB}
        sinks={SINKS}
        isolateSourceId={isolateSourceId}
        onAbsorb={onAbsorb}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Inner Loop */}
      <Reveal delay={0} y={16} className="relative z-10 flex w-48 flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className={cn("font-mono text-[11px] font-medium tracking-[2px]", eyebrowTone)}>
            INNER LOOP
          </span>
          <span className="text-sm font-medium text-text-primary">Build &amp; ship</span>
        </div>
        <Stagger step={STAGGER.chip} className="flex flex-col gap-3">
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
                "flex h-[36px] w-[140px] cursor-default items-center gap-3 rounded-full border bg-surface px-4 py-2 transition-colors hover:border-border-hover hover:bg-surface-hover",
                theme === "light" ? "border-border-hover" : "border-border",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
            >
              <VendorMark slug={item.slug} theme={theme} className="h-4 w-4 shrink-0" />
              <span className={cn("text-sm font-medium", labelTone)}>{item.label}</span>
            </div>
          ))}
        </Stagger>
      </Reveal>

      {/* Hub */}
      <Reveal
        delay={STAGGER.shell}
        y={16}
        className="relative z-10 flex h-[280px] w-[280px] shrink-0 items-center justify-center"
      >
        {/* Ambient orbit ring */}
        <div
          className={cn("absolute inset-0 rounded-full border", ringTone)}
          style={{
            animation: `orbit-ring ${AMBIENT.ring}s ease-in-out infinite alternate`,
          }}
        />

        {/* Spokes */}
        {[45, 135, 225, 315].map((angle) => (
          <div
            key={angle}
            className="absolute top-1/2 left-1/2 h-px w-[100px] border-t border-dashed border-border/50"
            style={{
              transformOrigin: "0 0",
              transform: `rotate(${angle}deg) translate(40px, -50%)`,
            }}
          />
        ))}

        {/* Orbit Track & Satellites */}
        <div
          className={cn("absolute inset-0 rounded-full border border-dashed", trackTone)}
          style={{
            animation: `orbit-track ${AMBIENT.orbit}s linear infinite`,
          }}
        >
          {[
            { id: "intent", angle: 45 },
            { id: "entities", angle: 135 },
            { id: "policies", angle: 225 },
            { id: "memory", angle: 315 },
          ].map((sat) => {
            const rad = (sat.angle * Math.PI) / 180;
            const r = 140; // half of 280
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            const isPulsed = pulsed === sat.id;

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
                {/* Counter-rotate so text stays upright */}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full px-2 py-1 transition-colors",
                    theme === "light" ? "bg-surface-raised" : "bg-surface",
                  )}
                  style={{
                    animation: `orbit-track-reverse ${AMBIENT.orbit}s linear infinite`,
                    borderColor: isPulsed ? "var(--ds-accent)" : "var(--ds-border)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    color: isPulsed ? "var(--ds-accent)" : "var(--ds-text-tertiary)",
                    transitionDuration: `${DUR.chip}s`,
                  }}
                >
                  <span className="font-mono text-[10px] tracking-wide">{sat.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core */}
        <div
          className={cn(
            "glow-source relative z-20 flex h-[80px] w-[80px] flex-col items-center justify-center gap-1 rounded-full border bg-surface shadow-sm",
            theme === "light" ? "border-border-hover" : "border-border",
          )}
          style={{
            animation: `hub-pulse ${AMBIENT.hub}s ease-in-out infinite alternate`,
          }}
        >
          <GitFork size={20} className="text-text-primary" weight="bold" />
          <span className="text-[10px] font-medium leading-none text-text-primary text-center">
            Context Graph
          </span>
        </div>
      </Reveal>

      {/* Outer Loop */}
      <Reveal
        delay={STAGGER.shell * 2}
        y={16}
        className="relative z-10 flex w-48 flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <span className={cn("font-mono text-[11px] font-medium tracking-[2px]", eyebrowTone)}>
            OUTER LOOP
          </span>
        </div>
        <Stagger step={STAGGER.chip} className="flex flex-col gap-3">
          {[
            { id: "runtime", label: "Runtime", slug: "eks" as const },
            { id: "infra", label: "Infrastructure", slug: "aws" as const },
            { id: "obs", label: "Observability", slug: "datadog" as const },
          ].map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex h-[36px] w-[140px] items-center gap-3 rounded-full border bg-surface px-4 py-2 transition-colors hover:border-border-hover hover:bg-surface-hover",
                theme === "light" ? "border-border-hover" : "border-border",
              )}
              style={{ transitionDuration: `${DUR.chip}s` }}
            >
              <VendorMark slug={item.slug} theme={theme} className="h-4 w-4 shrink-0" />
              <span className={cn("text-sm font-medium", labelTone)}>{item.label}</span>
            </div>
          ))}
        </Stagger>
      </Reveal>
      
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
          @keyframes hub-pulse {
            from { box-shadow: 0 0 0 0 rgba(var(--ds-accent-rgb), 0); }
            to { box-shadow: 0 0 20px 0 rgba(var(--ds-accent-rgb), 0.2); }
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
