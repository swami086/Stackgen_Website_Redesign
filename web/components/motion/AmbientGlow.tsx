"use client";

import { motion } from "motion/react";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

/** Soft Structuralism ambient glow — fixed layer, slow breathe. */
export function AmbientGlow() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-[20%] top-[8%] h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[120px]"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.55, 0.85, 0.55],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: SPRING_EASE,
        }}
      />
      <motion.div
        className="absolute -right-[15%] top-[35%] h-[480px] w-[480px] rounded-full bg-accent-text/[0.05] blur-[100px]"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.4, 0.7, 0.4],
                scale: [1.02, 0.96, 1.02],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: SPRING_EASE,
          delay: 1.5,
        }}
      />
    </div>
  );
}
