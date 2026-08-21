// components/sections/home/AdfLoop.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type AdfLoopContent = typeof home.adfLoop;

export function AdfLoop({ content }: SectionProps<AdfLoopContent>) {
  return (
    <section aria-labelledby="adf-loop-heading" data-stub="AdfLoop">
      <h2 id="adf-loop-heading">{content.heading}</h2>
    </section>
  );
}
