// components/sections/platform/PlatformHero.tsx — STUB
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformHeroContent = typeof platform.hero;

export function PlatformHero({ content }: SectionProps<PlatformHeroContent>) {
  return (
    <section aria-labelledby="platformhero-heading" data-stub="PlatformHero">
      <h1 id="platformhero-heading">{content.h1}</h1>
    </section>
  );
}
