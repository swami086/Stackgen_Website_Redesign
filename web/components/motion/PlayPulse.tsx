"use client";

import { motion } from "motion/react";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

export function PlayPulse() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent"
        aria-hidden
      >
        <span className="text-lg">▶</span>
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: SPRING_EASE,
      }}
      aria-hidden
    >
      <span className="text-lg">▶</span>
      <motion.span
        className="absolute inset-0 rounded-full bg-accent/30"
        animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: SPRING_EASE,
        }}
      />
    </motion.div>
  );
}
