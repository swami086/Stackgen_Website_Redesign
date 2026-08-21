import type { ReactNode } from 'react';

// Wave 1: renders children with no wrapper element and no animation.
// Wave 2 replaces the body; the call sites do not change.
export function Reveal({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}
