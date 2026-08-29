"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HorizontalSnapProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

/** factory.ai case-study / news horizontal snap scroll. */
export function HorizontalSnap({
  children,
  className,
  label = "Carousel",
}: HorizontalSnapProps) {
  return (
    <section aria-label={label} className={cn("relative", className)}>
      <div
        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </section>
  );
}

export function HorizontalSnapItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-[min(100%,320px)] shrink-0 snap-start", className)}>
      {children}
    </div>
  );
}
