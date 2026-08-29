"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "./useReducedMotion";

/** factory.ai connector-card diagonal line sweep on hover. */
export function SlidePattern({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        "animate-[slidePattern_2s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0px, transparent 2px, color-mix(in srgb, var(--ds-accent) 22%, transparent) 2px, color-mix(in srgb, var(--ds-accent) 22%, transparent) 3px, transparent 3px, transparent 8px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}
