"use client";

import { useReducedMotion } from "motion/react";

/**
 * SSR-safe reduced-motion read. `motion/react` returns null before mount;
 * we resolve that to false so the server and first client render agree,
 * then the real preference applies. Never invert this default: doing so
 * makes every animation flash on for reduced-motion users.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
