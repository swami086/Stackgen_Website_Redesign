"use client";

import { useEffect, useState } from "react";
import { Hourglass } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import { AMBIENT, DUR, EASE, RING_OPACITY, STAGGER } from "@/lib/motion-tokens";

/** Quiet inner-loop speed highlight — matches ParticleField / DESIGN.md */
const INNER_CYAN = "#A8E0F8";

const INNER_CHIPS = [
  { id: "build", label: "AI-assisted Build", angle: -90 },
  { id: "deploy", label: "Deploy", angle: -18 },
  { id: "code", label: "AI-generated code", angle: 54 },
  { id: "pushes", label: "High-volume pushes", angle: 126 },
  { id: "debug", label: "Debug", angle: 198 },
] as const;

const OUTER_CHIPS = [
  { id: "observe", label: "Observe", angle: -90 },
  { id: "remediate", label: "Remediate", angle: 18 },
  { id: "operate", label: "Operate", angle: 198 },
] as const;

const BOTTOM_ROW = ["Compliance", "Observability"] as const;

type Props = {
  caption?: string;
  className?: string;
  theme?: "light" | "dark";
};

function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md border border-border bg-surface-raised px-2 py-1 text-[11px] font-medium leading-none whitespace-nowrap text-text-primary transition-colors",
        active && "border-accent text-accent",
      )}
      style={{ transitionDuration: `${DUR.chip}s` }}
    >
      {label}
    </span>
  );
}

function SegmentedBar({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-1 w-full gap-px overflow-hidden rounded-sm" aria-hidden>
      {[0.55, 0.35, 0.7, 0.25, 0.5].map((w, i) => (
        <motion.span
          key={i}
          className="h-full rounded-sm bg-border"
          style={{ flexGrow: w, flexBasis: 0 }}
          initial={reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.4 + i * 0.05, ease: EASE.standard }}
          // ponytail: scaleX reveal — flexGrow alone is not a reliable motion target
        />
      ))}
    </div>
  );
}

/**
 * Pencil SoT: Stack_Linear.pen `ifJjx` — dual-panel Ops Lag anatomy.
 * Soft Structuralism plate: inner Dev loop (fast cyan orbit) vs outer Ops lag (hourglass hub).
 */
export function OpsLag({ caption, className, theme }: Props) {
  const reduced = useReducedMotionSafe();
  void theme;
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setPulseIndex((i) => (i + 1) % INNER_CHIPS.length);
    }, 900);
    return () => clearInterval(timer);
  }, [reduced]);

  const chipOrbitR = 72;

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DUR.chip, ease: EASE.standard } }
  };

  return (
    <figure className={cn("w-full", className)} data-figma-id="23:2">
      <motion.div
        role="img"
        aria-label="Ops lag diagram: fast inner Dev loop with AI-assisted build, deploy, and debug orbiting a bridge of slow feedback and noisy signal into a slower outer Ops loop with observe, operate, remediate around an hourglass hub, plus compliance and observability"
        data-problem-diagram="ops-lag"
        data-pencil-id="ifJjx"
        className="glass-specular relative flex min-h-[420px] w-full flex-col gap-2 overflow-hidden rounded-[16px] border border-border p-2.5 md:min-h-[480px] md:flex-row md:gap-3 md:p-3"
        initial={reduced ? "visible" : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          // Cap: 12 children × 40ms ≈ 0.44s < 0.6s budget (impeccable animate)
          visible: { transition: { staggerChildren: STAGGER.chip, delayChildren: 0.04 } },
        }}
      >
        {/* LEFT — Inner Loop */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-1 flex-col gap-2 rounded-xl border border-border bg-surface p-3"
          data-ops-panel="inner"
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-0.5 shrink-0 rounded-sm"
                style={{ backgroundColor: INNER_CYAN }}
                aria-hidden
              />
              <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                Inner Loop
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[220px] w-full flex-1 items-center justify-center md:min-h-[280px]">
            <motion.div
              variants={itemVariants}
              className="absolute rounded-full border border-dashed"
              style={{
                width: chipOrbitR * 2 + 48,
                height: chipOrbitR * 2 + 48,
                borderColor: `${INNER_CYAN}55`,
                animation: reduced
                  ? undefined
                  : `ops-inner-orbit ${AMBIENT.orbit / 2.5}s linear infinite`,
              }}
              data-motion="inner-orbit-ring"
              aria-hidden
            >
              {/* 3 tiny cyan particles on the ring */}
              {[0, 120, 240].map((deg, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    backgroundColor: INNER_CYAN,
                    top: "50%",
                    left: "50%",
                    opacity: 0.6,
                    transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${chipOrbitR + 24}px)`,
                  }}
                />
              ))}
            </motion.div>

            {INNER_CHIPS.map((chip, i) => {
              const rad = (chip.angle * Math.PI) / 180;
              const x = Math.cos(rad) * chipOrbitR;
              const y = Math.sin(rad) * chipOrbitR;
              const active = !reduced && pulseIndex === i;

              return (
                <motion.div
                  variants={itemVariants}
                  key={chip.id}
                  className="absolute z-[2]"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  data-motion={i === 0 ? "chip-pulse-inner" : undefined}
                  data-ops-chip="inner"
                >
                  <Chip label={chip.label} active={active} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BRIDGE */}
        <motion.div
          variants={itemVariants}
          className="relative flex shrink-0 flex-col items-center justify-center gap-2 px-1 md:w-[108px]"
          data-ops-panel="bridge"
        >
          <svg
            viewBox="0 0 40 120"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M4 60 C14 58, 26 58, 36 60"
              fill="none"
              stroke="#F0883E"
              strokeWidth={0.6}
              strokeDasharray="3 2"
              data-motion="bridge-flow"
              initial={false}
              animate={
                reduced
                  ? { pathLength: 1, opacity: 0.45 }
                  : { pathLength: [0.3, 1, 0.3], opacity: [0.35, 0.65, 0.35] }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { duration: 3.2, repeat: Infinity, ease: EASE.standard }
              }
            />
            <motion.path
              d="M4 68 C14 66, 26 66, 36 68"
              fill="none"
              stroke="#F0883E"
              strokeWidth={0.5}
              strokeDasharray="2 2"
              data-motion="lag-lines"
              initial={false}
              animate={
                reduced
                  ? { pathLength: 0.6, opacity: 0.35 }
                  : { pathLength: [0.2, 0.85, 0.2], opacity: [0.25, 0.5, 0.25] }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
              }
            />
            {/* Traveling packet */}
            {!reduced && (
              <circle
                r="1.5"
                fill="#F0883E"
                style={{
                  offsetPath: "path('M4 60 C14 58, 26 58, 36 60')",
                  animation: "ops-travel 1.4s linear infinite"
                }}
              />
            )}
          </svg>
          <p className="relative z-[1] max-w-[9rem] text-center text-[10px] font-semibold leading-snug text-halt md:text-[11px]">
            Slow Feedback / Noisy Signal
          </p>
        </motion.div>

        {/* RIGHT — Outer Loop */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-1 flex-col gap-2 rounded-xl border border-border bg-surface p-3"
          data-ops-panel="outer"
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-0.5 shrink-0 rounded-sm bg-accent" aria-hidden />
              <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                Outer Loop
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[220px] w-full flex-1 flex-col items-center justify-center md:min-h-[280px]">
            <motion.div
              variants={itemVariants}
              className="absolute rounded-[28px] border border-dashed border-border/60"
              style={{
                width: chipOrbitR * 2 + 56,
                height: chipOrbitR * 2 + 40,
                animation: reduced
                  ? undefined
                  : `ops-outer-orbit ${AMBIENT.orbit * 1.8}s linear infinite reverse`,
              }}
              data-motion="outer-orbit-slow"
              aria-hidden
            />

            {OUTER_CHIPS.map((chip) => {
              const rad = (chip.angle * Math.PI) / 180;
              const x = Math.cos(rad) * (chipOrbitR + 8);
              const y = Math.sin(rad) * (chipOrbitR - 4);

              return (
                <motion.div
                  variants={itemVariants}
                  key={chip.id}
                  className="absolute z-[2]"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  data-ops-chip="outer"
                >
                  <Chip label={chip.label} />
                </motion.div>
              );
            })}

            {/* Hourglass hub */}
            <motion.div variants={itemVariants} className="relative z-[3] flex flex-col items-center gap-1">
              <div className="flex size-14 items-center justify-center rounded-md border border-border bg-surface-raised">
                <Hourglass size={22} weight="regular" className="text-accent" aria-hidden />
              </div>
              <span
                className="h-3 w-0.5 rounded-full bg-accent/50"
                data-motion="hourglass-drip"
                style={{
                  animation: reduced
                    ? undefined
                    : `ops-hourglass-drip ${AMBIENT.hub}s ease-in-out infinite`,
                }}
                aria-hidden
              />
            </motion.div>

            {/* Lag lines into hub */}
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              {[
                "M50 18 L50 42",
                "M78 52 L58 52",
                "M22 52 L42 52",
              ].map((d) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.4}
                  strokeDasharray="2 2"
                  className="text-border"
                  data-motion="lag-lines"
                  initial={false}
                  animate={
                    reduced
                      ? { pathLength: 0.7, opacity: 0.35 }
                      : { pathLength: [0.25, 1, 0.25], opacity: [0.3, 0.55, 0.3] }
                  }
                  transition={
                    reduced
                      ? { duration: 0.2 }
                      : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {BOTTOM_ROW.map((label) => (
              <motion.div
                variants={itemVariants}
                key={label}
                className="flex flex-col gap-1 rounded-md border border-border bg-surface-raised px-2 py-1.5"
              >
                <SegmentedBar reduced={reduced} />
                <span className="text-[11px] font-medium text-text-primary">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            @keyframes ops-inner-orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes ops-outer-orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes ops-hourglass-drip {
              0%, 100% { opacity: ${RING_OPACITY.from}; transform: scaleY(0.6); }
              50% { opacity: ${RING_OPACITY.to}; transform: scaleY(1); }
            }
            @keyframes ops-travel {
              0% { offset-distance: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
          }
        `}</style>
      </motion.div>
      {caption ? (
        <figcaption className="sr-only">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
