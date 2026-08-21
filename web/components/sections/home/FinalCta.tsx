// components/sections/home/FinalCta.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type FinalCtaContent = typeof home.finalCta;

export function FinalCta({ content }: SectionProps<FinalCtaContent>) {
  return (
    <section aria-labelledby="final-cta-heading" data-stub="FinalCta">
      <h2 id="final-cta-heading">{content.heading}</h2>
    </section>
  );
}
