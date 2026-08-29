"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { SPRING_EASE } from "@/components/motion/easing";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  showArrow?: boolean;
};

export function PillButton({
  href,
  children,
  variant = "primary",
  className,
  showArrow = false,
}: PillButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      className="inline-flex"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: SPRING_EASE }}
    >
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium no-underline transition-[box-shadow] duration-500",
          isPrimary
            ? "bg-accent text-on-accent shadow-[0_0_0_0_rgba(140,133,255,0)] hover:shadow-[0_8px_32px_-8px_rgba(140,133,255,0.45)]"
            : "text-text-primary outline outline-1 -outline-offset-1 outline-border hover:outline-accent/40",
          className,
        )}
      >
        {children}
        {showArrow && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-px",
              isPrimary ? "bg-on-accent/10" : "bg-surface-raised",
            )}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        )}
      </Link>
    </motion.div>
  );
}
