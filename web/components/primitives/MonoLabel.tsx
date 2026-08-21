import type { ReactNode } from 'react';

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        'font-mono text-xs tracking-[0.08em] text-text-tertiary uppercase',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
