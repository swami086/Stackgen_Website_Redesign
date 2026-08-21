'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || shown) return;

    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver !== 'function') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, shown]);

  const animate = !reduced;

  return (
    <div
      ref={ref}
      style={
        animate
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 600ms cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 600ms cubic-bezier(0.32,0.72,0,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
