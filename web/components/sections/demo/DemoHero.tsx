// components/sections/demo/DemoHero.tsx — STUB
import type { SectionProps } from '@/lib/types';
import scheduleDemo from '@/content/schedule-demo';

type DemoHeroContent = typeof scheduleDemo.hero;

export function DemoHero({ content }: SectionProps<DemoHeroContent>) {
  return (
    <section aria-labelledby="demohero-heading" data-stub="DemoHero">
      <h1 id="demohero-heading">{content.h1}</h1>
    </section>
  );
}
