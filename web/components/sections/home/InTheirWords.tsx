// components/sections/home/InTheirWords.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type InTheirWordsContent = typeof home.inTheirWords;

export function InTheirWords({ content }: SectionProps<InTheirWordsContent>) {
  return (
    <section aria-labelledby="in-their-words-heading" data-stub="InTheirWords">
      <h2 id="in-their-words-heading">{content.heading}</h2>
    </section>
  );
}
