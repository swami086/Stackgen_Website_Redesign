"use client";

import { motion } from "motion/react";
import { AMBIENT } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type BeamProps = {
  /** SVG path geometry string, the same value you would pass to `<path d>`. */
  d: string;
  duration?: number;
  delay?: number;
  className?: string;
  r?: number;
  /** Travel to→from instead of from→to (bidirectional mesh chatter). */
  reverse?: boolean;
};

/**
 * Travelling light along an existing path. Ambient, so it stops entirely
 * under reduced motion rather than rendering a stationary dot.
 */
export function Beam({
  d,
  duration = AMBIENT.sweep / 2,
  delay = 0,
  className,
  r = 2.5,
  reverse = false,
}: BeamProps) {
  const reduced = useReducedMotionSafe();
  if (reduced) return null;

  return (
    <motion.circle
      r={r}
      className={className}
      initial={{
        offsetDistance: reverse ? "100%" : "0%",
        opacity: 0,
      }}
      animate={{
        offsetDistance: reverse ? "0%" : "100%",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
    />
  );
}
