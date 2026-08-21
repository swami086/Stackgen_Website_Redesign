// components/sections/home/Logos.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type LogosContent = typeof home.logos;

export function Logos({ content }: SectionProps<LogosContent>) {
  return (
    <section aria-labelledby="logos-heading" data-stub="Logos">
      <h2 id="logos-heading">{content.heading}</h2>
    </section>
  );
}
