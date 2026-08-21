// STUB
import type { SectionProps } from '@/lib/types';
import caseIndex from '@/content/case-index';

type FeaturedCasesContent = typeof caseIndex.cases;

export function FeaturedCases({ content }: SectionProps<FeaturedCasesContent>) {
  return (
    <section aria-labelledby="featured-cases-heading" data-stub="FeaturedCases">
      <h2 id="featured-cases-heading">Featured cases</h2>
      <p>{content[0]?.company}</p>
    </section>
  );
}
