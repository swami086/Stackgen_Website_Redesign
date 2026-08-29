"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type DrawPathProps = {
  d: string;
  className?: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
};

/**
 * Self-drawing stroke. Must be rendered inside an <svg>.
 * Uses pathLength normalization so the same timing works at any scale.
 */
export function DrawPath({
  d,
  className,
  delay = 0,
  duration = 0.7,
  strokeWidth = 1,
}: DrawPathProps) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.path
      d={d}
      className={className}
      fill="none"
      strokeWidth={strokeWidth}
      initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0 : duration, delay, ease: EASE.emphasize }}
    />
  );
}
