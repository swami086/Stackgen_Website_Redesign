// components/sections/home/Hero.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type HeroContent = typeof home.hero;

export function Hero({ content }: SectionProps<HeroContent>) {
  return (
    <section aria-labelledby="hero-heading" data-stub="Hero">
      <h1 id="hero-heading">{content.h1}</h1>
    </section>
  );
}
