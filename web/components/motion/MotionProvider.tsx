'use client';

import type { ReactNode } from 'react';

// Reduced-motion is read per component for now, so this stays a no-op wrapper.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
