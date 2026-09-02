"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { MotionProvider } from "@/components/replica/motion/MotionProvider";
import { PuckCanvasProvider } from "@/puck/PuckCanvasContext";

/** Wraps Puck canvas + preview — replica blocks require theme/motion context. */
export function PuckRenderProviders({ children }: { children: ReactNode }) {
  return (
    <PuckCanvasProvider>
      <ThemeProvider initialTheme="dark">
        <MotionProvider>{children}</MotionProvider>
      </ThemeProvider>
    </PuckCanvasProvider>
  );
}
