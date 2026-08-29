"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "./easing";
import { useReducedMotion } from "./useReducedMotion";

type StaggerTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

/** Linear/Railway-style word cascade on scroll into view. */
export function StaggerText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: StaggerTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.28em] last:mr-0"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            delay: delay + i * 0.055,
            duration: 0.72,
            ease: SPRING_EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
