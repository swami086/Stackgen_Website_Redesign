// STUB
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type TwoPlanesContent = typeof platform.twoPlanes;

export function TwoPlanes({ content }: SectionProps<TwoPlanesContent>) {
  return (
    <section aria-labelledby="two-planes-heading" data-stub="TwoPlanes">
      <h2 id="two-planes-heading">{content.deterministic.title}</h2>
    </section>
  );
}
