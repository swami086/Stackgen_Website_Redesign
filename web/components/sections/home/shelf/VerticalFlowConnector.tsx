"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type VerticalFlowConnectorProps = {
  cap?: string;
  delay?: number;
  className?: string;
};

/** Airtable-automation-style vertical marching dash + traveling accent dot. */
export function VerticalFlowConnector({
  cap,
  delay = 0,
  className,
}: VerticalFlowConnectorProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-1.5",
        className,
      )}
    >
      {cap ? (
        <span
          className="font-mono text-[9px] font-semibold tracking-[1.5px] text-text-tertiary"
        >
          {cap}
        </span>
      ) : null}
      <svg viewBox="0 0 20 56" className="h-14 w-5 shrink-0" aria-hidden>
        <motion.line
          x1="10"
          y1="4"
          x2="10"
          y2="40"
          stroke="var(--ds-text-tertiary)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={reduced ? undefined : { strokeDashoffset: [0, -8] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }
          }
        />
        <path
          d="M6 40 L10 48 L14 40"
          fill="none"
          stroke="var(--ds-text-tertiary)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!reduced && (
          <motion.circle
            r="2.5"
            fill="var(--ds-accent)"
            cx="10"
            animate={{ cy: [8, 40], opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: SPRING_EASE,
              delay,
            }}
          />
        )}
      </svg>
    </div>
  );
}
