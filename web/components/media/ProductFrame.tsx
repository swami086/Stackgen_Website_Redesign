import type { JSX, ReactNode } from 'react';

/** Dark plate with the iridescent field behind it, per spec 3.4. */
export function ProductFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-plate opacity-60 blur-2xl"
        style={{
          background:
            'linear-gradient(120deg, var(--color-accent) 0%, var(--color-accent-cyan) 55%, #F5C2DC 100%)',
        }}
      />
      <div
        className="relative overflow-hidden rounded-plate border border-border-panel bg-panel"
        data-ground="panel"
      >
        {children}
      </div>
    </div>
  );
}
