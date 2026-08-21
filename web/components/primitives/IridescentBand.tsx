import type { ReactNode } from 'react';

export function IridescentBand({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-pad-x py-pad-y">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, var(--color-accent) 0%, #D8C8F8 30%, var(--color-accent-cyan) 65%, #F5C2DC 100%)',
        }}
      />
      <div className="relative mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}
