"use client";

import { createContext, useContext, type ReactNode } from "react";

const PuckCanvasContext = createContext(false);

export function PuckCanvasProvider({ children }: { children: ReactNode }) {
  return (
    <PuckCanvasContext.Provider value={true}>{children}</PuckCanvasContext.Provider>
  );
}

/** True inside Puck admin canvas / preview providers — not on public site layout. */
export function usePuckCanvas(): boolean {
  return useContext(PuckCanvasContext);
}
