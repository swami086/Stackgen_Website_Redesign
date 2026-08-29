"use client";

import { motion } from "motion/react";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

/** Tines-style pulsing connector between flow nodes. */
export function FlowPulse({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className} aria-hidden>
        →
      </span>
    );
  }

  return (
    <span className={className} aria-hidden>
      <motion.span
        className="inline-flex items-center text-text-tertiary"
        animate={{ opacity: [0.35, 1, 0.35], x: [0, 3, 0] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: SPRING_EASE,
        }}
      >
        →
      </motion.span>
    </span>
  );
}
