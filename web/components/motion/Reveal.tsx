'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  const hidden = !reduced && !shown;

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

  return (
    <div
      ref={ref}
      className={[
        hidden ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0',
        'transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
      ].join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
