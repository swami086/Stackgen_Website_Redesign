// components/sections/case/CaseHero.tsx — STUB
import type { SectionProps } from '@/lib/types';
import caseGreythr from '@/content/case-greythr';
import caseIndex from '@/content/case-index';
import innovaccer from '@/content/case-innovaccer';

type CaseHeroContent =
  | typeof caseIndex.hero
  | typeof caseGreythr.hero
  | typeof innovaccer.hero;

export function CaseHero({ content }: SectionProps<CaseHeroContent>) {
  return (
    <section aria-labelledby="casehero-heading" data-stub="CaseHero">
      <h1 id="casehero-heading">{content.h1}</h1>
    </section>
  );
}
