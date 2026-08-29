"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

/** Railway-style light sweep across media surfaces. */
export function Shimmer({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.08] to-transparent",
        className,
      )}
      aria-hidden
      animate={{ x: ["-120%", "120%"] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: SPRING_EASE,
        repeatDelay: 1.2,
      }}
    />
  );
}
