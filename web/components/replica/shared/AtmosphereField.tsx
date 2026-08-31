"use client";

import { useState } from "react";
import {
  ATMOSPHERE_OPACITY,
  atmosphereSrc,
  type AtmosphereSlot,
  type AtmosphereTheme,
} from "@/lib/atmosphere";
import { cn } from "@/lib/cn";

type Props = {
  slot: AtmosphereSlot;
  theme: AtmosphereTheme;
  className?: string;
  /** Pass null to force CSS-only fallback (tests / Vertex miss). */
  srcOverride?: string | null;
};

export function AtmosphereField({
  slot,
  theme,
  className,
  srcOverride,
}: Props) {
  const resolved =
    srcOverride === undefined ? atmosphereSrc(slot, theme) : srcOverride;
  const [failed, setFailed] = useState(resolved === null);

  if (failed || resolved === null) {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      />
    );
  }

  // Light WhoItsFor docks need richer ground variation so Tier-2 glass reads
  // (UX Pilot: glass dies on flat grounds; Mobbin Air / Apple Mail trays).
  const opacity =
    theme === "light" && slot === "ground-who"
      ? Math.min(0.34, ATMOSPHERE_OPACITY[slot] + 0.14)
      : ATMOSPHERE_OPACITY[slot];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      style={{ opacity }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static public asset */}
      <img
        src={resolved}
        alt=""
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
