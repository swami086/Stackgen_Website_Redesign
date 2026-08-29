"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { revealTransition, SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 64,
    filter: "blur(12px)",
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition(index * 0.12),
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: (index: number) => ({
    opacity: 1,
    transition: { delay: index * 0.05, duration: 0.2 },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

export function Reveal({ children, className, index = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? reducedVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: SPRING_EASE },
  },
};
