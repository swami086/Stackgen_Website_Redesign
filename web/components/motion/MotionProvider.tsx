"use client";

import { LazyMotion, domAnimation } from "motion/react";

type MotionProviderProps = {
  children: React.ReactNode;
};

/** Tree-shaken motion features for client sections. */
export function MotionProvider({ children }: MotionProviderProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
