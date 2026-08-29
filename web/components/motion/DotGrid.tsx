"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

/** Dovetail/Vapi dot-grid depth — fixed to section, pointer-events none. */
export function DotGrid({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
      initial={reduced ? undefined : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: SPRING_EASE }}
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--ds-border) 65%, transparent) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)",
      }}
    />
  );
}
