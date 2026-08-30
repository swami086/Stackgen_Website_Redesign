"use client";

/**
 * Communicates: product surfaces as a precision isometric object, not a flat
 * illustration — layers share one authored camera angle (ISO_ROTATION).
 */
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/** The single source of the isometric angle. Billboard inverts exactly this. */
export const ISO_ROTATION = { x: 54, z: -45 } as const;

export function IsoScene({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: "1600px" }}>
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${ISO_ROTATION.x}deg) rotateZ(${ISO_ROTATION.z}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type IsoLayerProps = {
  children: ReactNode;
  /** Stacking order, 0 = base. */
  index: number;
  /** Vertical separation in px along the scene Z axis. */
  lift: number;
  active: boolean;
  className?: string;
};

/**
 * One plane of the stack. Only transform and opacity animate.
 * Shadows are pre-composed gradients on the plane, never animated box-shadow.
 */
export function IsoLayer({ children, index, lift, active, className }: IsoLayerProps) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d", zIndex: index }}
      animate={{
        // `z` is motion's key for translateZ. `translateZ` is not a valid
        // motion value key and will silently do nothing.
        z: lift,
        opacity: active ? 1 : 0.42,
        scale: active ? 1 : 0.97,
      }}
      transition={reduced ? { duration: 0 } : { duration: DUR.shell, ease: EASE.emphasize }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counter-rotates its content by the inverse of the scene transform so
 * vendor marks and labels render square. A sheared logo is a brand
 * violation, not a stylistic choice.
 */
export function Billboard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateZ(${-ISO_ROTATION.z}deg) rotateX(${-ISO_ROTATION.x}deg)`,
      }}
    >
      {children}
    </div>
  );
}
