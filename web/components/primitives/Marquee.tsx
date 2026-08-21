'use client';

import type { CSSProperties } from 'react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

const viewportMaskStyle: CSSProperties = {
  maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
};

export function Marquee({ items, label }: { items: string[]; label: string }) {
  const reduced = useReducedMotion();
  const animated = !reduced;

  if (!animated) {
    return (
      <div data-part="track" data-animated="false">
        <ul aria-label={label} data-part="list" className="flex flex-wrap gap-x-12 gap-y-3">
          {items.map((item) => (
            <li key={item} className="shrink-0 text-[15px] font-semibold text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div data-part="viewport" className="overflow-hidden" style={viewportMaskStyle}>
      <div
        data-part="track"
        data-animated={String(animated)}
        className="flex w-max"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        <ul aria-label={label} data-part="list" className="flex w-max shrink-0 gap-12 pr-12">
          {items.map((item) => (
            <li key={item} className="shrink-0 text-[15px] font-semibold text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" data-part="list" className="flex w-max shrink-0 gap-12 pr-12">
          {items.map((item) => (
            <li key={item} className="shrink-0 text-[15px] font-semibold text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
