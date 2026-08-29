"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
};

/**
 * Entrance on first intersection. Default state is visible content; the
 * initial offset is only applied when motion is allowed, so a failed script
 * can never leave the page blank.
 */
export function Reveal({ children, delay = 0, y = 16, blur = false, className }: RevealProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DUR.shell, delay, ease: EASE.emphasize }}
    >
      {children}
    </motion.div>
  );
}
