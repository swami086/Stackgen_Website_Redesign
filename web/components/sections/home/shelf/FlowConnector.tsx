"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "@/components/motion/easing";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type FlowConnectorProps = {
  delay?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/** Mobbin/Tines-inspired marching dash + traveling pulse (21st Flow Button dash-flow). */
export function FlowConnector({
  delay = 0,
  orientation = "horizontal",
  className,
}: FlowConnectorProps) {
  const reduced = useReducedMotion();
  const isVertical = orientation === "vertical";

  if (isVertical) {
    return (
      <div className="flex h-12 w-5 shrink-0 items-center justify-center md:hidden">
        <svg viewBox="0 0 20 48" className="h-12 w-5" aria-hidden>
          <motion.line
            x1="10"
            y1="4"
            x2="10"
            y2="36"
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
            d="M6 36 L10 44 L14 36"
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
              cy="8"
              animate={{ cy: [8, 36], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 2.2,
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

  return (
    <div
      className={cn(
        "hidden h-5 shrink-0 items-center md:flex lg:w-[96px]",
        className ?? "w-[72px]",
      )}
    >
      <svg viewBox="0 0 96 20" className="h-5 w-full" aria-hidden>
        <motion.line
          x1="2"
          y1="10"
          x2="78"
          y2="10"
          stroke="var(--ds-text-tertiary)"
          strokeWidth="1"
          strokeDasharray="5 4"
          animate={reduced ? undefined : { strokeDashoffset: [0, -9] }}
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
          d="M78 10 L90 10 M84 6 L90 10 L84 14"
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
            cx="6"
            animate={{ cx: [6, 74], opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: SPRING_EASE,
              delay,
            }}
            cy="10"
          />
        )}
      </svg>
    </div>
  );
}
