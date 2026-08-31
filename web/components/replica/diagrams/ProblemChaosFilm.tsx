"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { EASE } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

type Beat = {
  id: string;
  label: string;
  /** percent of plate */
  x: number;
  y: number;
  tone?: "danger" | "warn" | "neutral";
};

const BEATS: Beat[] = [
  { id: "alert", label: "Alert · no deploy", x: 8, y: 14, tone: "danger" },
  { id: "drift", label: "Drift detected", x: 58, y: 10, tone: "danger" },
  { id: "deploy", label: "Deploy failed", x: 72, y: 42, tone: "danger" },
  { id: "war", label: "War room", x: 12, y: 52, tone: "warn" },
  { id: "runbooks", label: "Stale runbooks", x: 38, y: 68, tone: "warn" },
  { id: "ai", label: "Ungoverned AI change", x: 62, y: 72, tone: "neutral" },
];

/** Hairline paths in viewBox 0 0 100 100 (percent space). */
const PATHS = [
  "M18 20 C 35 18, 48 22, 62 16",
  "M22 56 C 40 48, 55 40, 74 46",
  "M48 74 C 55 60, 68 52, 76 48",
  "M20 22 C 28 40, 30 50, 22 55",
];

/** Accent path that visually “snaps” mid-run. */
const BROKEN = "M68 18 C 78 28, 82 38, 78 46";

type Props = {
  caption: string;
  className?: string;
};

function PlayIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    );
  }
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function toneClass(tone: Beat["tone"]) {
  if (tone === "danger") return "text-halt border-halt/50";
  if (tone === "warn") return "text-halt border-halt/35";
  return "text-text-secondary border-border";
}

/**
 * A+B hybrid: Framer/Tines cinema plate + Ramp chaos collage as the film.
 * Focal motion: fragments drift in, connectors thrash, violet beam snaps.
 */
export function ProblemChaosFilm({ caption, className }: Props) {
  const reduced = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, once: false });
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!inView) setPlaying(false);
    else if (!reduced) setPlaying(true);
  }, [inView, reduced]);

  const active = playing && !reduced && inView;

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full max-w-3xl rounded-[20px] border border-border bg-surface p-1.5",
        className,
      )}
      data-problem-film="chaos-ab"
    >
      <div
        className="relative flex h-[420px] w-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface-raised md:h-[480px]"
        role="img"
        aria-label={`Animated explainer: ${caption}. Siloed alerts, drift, deploys, and runbooks with no shared context.`}
      >
        {/* quiet particles */}
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          {[12, 28, 44, 61, 77, 88].map((left, i) => (
            <span
              key={left}
              className="absolute size-1 rounded-full bg-accent/40"
              style={{ left: `${left}%`, top: `${18 + ((i * 17) % 60)}%` }}
            />
          ))}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {PATHS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.35}
              className="text-text-tertiary"
              strokeLinecap="round"
              initial={false}
              animate={
                active
                  ? { pathLength: [0.35, 1, 0.55], opacity: [0.25, 0.55, 0.3] }
                  : { pathLength: 0.7, opacity: 0.35 }
              }
              transition={
                active
                  ? {
                      duration: 4.2 + i * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
          <motion.path
            d={BROKEN}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.55}
            className="text-accent"
            strokeLinecap="round"
            strokeDasharray="2 1.2"
            initial={false}
            animate={
              active
                ? { pathLength: [1, 0.55, 1], opacity: [0.9, 0.35, 0.9] }
                : { pathLength: 0.55, opacity: 0.55 }
            }
            transition={
              active
                ? { duration: 2.8, repeat: Infinity, ease: EASE.emphasize }
                : { duration: 0.3 }
            }
          />
        </svg>

        {BEATS.map((beat, i) => (
          <motion.div
            key={beat.id}
            className={cn(
              "absolute z-[1] max-w-[42%] rounded-md border bg-surface/90 px-2.5 py-1.5 text-left text-[11px] font-medium leading-snug backdrop-blur-sm md:text-xs",
              toneClass(beat.tone),
            )}
            style={{ left: `${beat.x}%`, top: `${beat.y}%` }}
            initial={false}
            animate={
              active
                ? {
                    x: [0, i % 2 === 0 ? 4 : -3, 0],
                    y: [0, i % 3 === 0 ? -3 : 2, 0],
                    opacity: 1,
                  }
                : { x: 0, y: 0, opacity: 1 }
            }
            transition={
              active
                ? {
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }
                : { duration: 0.2 }
            }
          >
            {beat.label}
          </motion.div>
        ))}

        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-3 border-t border-border bg-surface/80 px-3 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] tracking-wide text-text-tertiary md:text-[11px]">
            {caption}
          </p>
          <button
            type="button"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-on-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
            aria-pressed={active}
            aria-label={active ? "Pause problem explainer" : "Play problem explainer"}
            disabled={reduced}
            onClick={() => setPlaying((p) => !p)}
          >
            <PlayIcon playing={active} />
          </button>
        </div>
      </div>
    </div>
  );
}
