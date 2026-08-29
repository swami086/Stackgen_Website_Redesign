"use client";

import type { ReactNode } from "react";
import { LogoMarquee, type LogoMarqueeItem } from "./LogoMarquee";

type DualMarqueeProps = {
  row1: LogoMarqueeItem[];
  row2: LogoMarqueeItem[];
  label?: string;
  className?: string;
};

/** factory.ai model-router dual-row opposite marquees. */
export function DualMarquee({
  row1,
  row2,
  label = "Scrolling logos",
  className,
}: DualMarqueeProps) {
  return (
    <div className={className} aria-label={label}>
      <LogoMarquee items={row1} speed={32} gap={40} label={`${label} row 1`} />
      <LogoMarquee
        items={row2}
        speed={28}
        gap={40}
        direction="right"
        label={`${label} row 2`}
        className="mt-3 opacity-90"
      />
    </div>
  );
}
