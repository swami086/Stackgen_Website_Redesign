'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);

    if (
      typeof query.addEventListener === 'function' &&
      typeof query.removeEventListener === 'function'
    ) {
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    }

    if (typeof query.addListener === 'function' && typeof query.removeListener === 'function') {
      query.addListener(onChange);
      return () => query.removeListener(onChange);
    }
  }, []);

  return reduced;
}
