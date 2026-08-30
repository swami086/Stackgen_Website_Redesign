"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";
import { DUR, EASE, STAGGER, capStagger } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type StaggerProps = {
  children: ReactNode;
  step?: number;
  className?: string;
};

/**
 * Staggers direct children. Total delay is capped so a long list never
 * reads as latency.
 */
export function Stagger({ children, step = STAGGER.chip, className }: StaggerProps) {
  const reduced = useReducedMotionSafe();
  const items = Children.toArray(children);
  const effective = capStagger(items.length, step);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      // Generous margin so Factory diagrams don't stay at opacity 0
      // when only a sliver is on-screen (common on dense home scroll).
      viewport={{ once: true, amount: 0.05, margin: "80px 0px" }}
      variants={{ shown: { transition: { staggerChildren: effective } } }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12, scale: 0.98 },
            shown: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: DUR.chip, ease: EASE.standard }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
