// components/sections/home/OperationalContextGraphSection.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type OperationalContextGraphSectionContent = typeof home.contextGraph;

export function OperationalContextGraphSection({ content }: SectionProps<OperationalContextGraphSectionContent>) {
  return (
    <section aria-labelledby="operational-context-graph-section-heading" data-stub="OperationalContextGraphSection">
      <h2 id="operational-context-graph-section-heading">{content.heading}</h2>
    </section>
  );
}
