"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { staggerContainer, staggerItem } from "./Reveal";
import { useReducedMotion } from "./useReducedMotion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroupItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}
