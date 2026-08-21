'use client';

import type { ReactNode } from 'react';

// Wave 1: inert pass-through. Wave 2 hosts motion config and reduced-motion context here.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
