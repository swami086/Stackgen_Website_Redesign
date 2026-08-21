'use client';

import { useReducedMotion } from '@/components/motion/useReducedMotion';

export function Marquee({ items, label }: { items: string[]; label: string }) {
  const reduced = useReducedMotion();
  const animated = !reduced;

  return (
    <ul
      aria-label={label}
      data-part="track"
      data-animated={String(animated)}
      className="flex gap-12 overflow-hidden"
      style={animated ? { animation: 'marquee 40s linear infinite' } : undefined}
    >
      {items.map((item) => (
        <li key={item} className="shrink-0 text-[15px] font-semibold text-text-secondary">
          {item}
        </li>
      ))}
    </ul>
  );
}
