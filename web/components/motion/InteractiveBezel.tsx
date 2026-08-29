"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "@/components/motion/easing";
import { SlidePattern } from "@/components/motion/SlidePattern";

type InteractiveBezelProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function InteractiveBezel({
  children,
  className,
  innerClassName,
}: InteractiveBezelProps) {
  return (
    <motion.div
      className={cn(
        "group relative rounded-[20px] bg-surface p-[6px] outline outline-1 -outline-offset-1 outline-border",
        className,
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.55, ease: SPRING_EASE }}
    >
      <SlidePattern />
      <div
        className={cn(
          "relative rounded-[14px] bg-surface-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline outline-1 -outline-offset-1 outline-border",
          innerClassName,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
