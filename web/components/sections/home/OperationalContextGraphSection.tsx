import { OperationalContextGraph } from '@/components/diagrams/OperationalContextGraph';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeaderSplit } from '@/components/primitives/SectionHeaderSplit';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type OperationalContextGraphSectionContent = typeof home.contextGraph;

export function OperationalContextGraphSection({
  content,
}: SectionProps<OperationalContextGraphSectionContent>) {
  return (
    <section className="bg-bg-raised px-pad-x py-pad-y">
      <Reveal>
        <SectionHeaderSplit
          label={content.label}
          heading={content.heading}
          body={content.body}
        />
        <OperationalContextGraph
          variant="home"
          className="mt-12 w-full"
          titleId="operational-context-graph-section-diagram-title"
        />
      </Reveal>
    </section>
  );
}
