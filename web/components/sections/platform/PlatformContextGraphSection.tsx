import { OperationalContextGraph } from '@/components/diagrams/OperationalContextGraph';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeaderSplit } from '@/components/primitives/SectionHeaderSplit';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformOcgContent = typeof platform.ocg;

export function PlatformContextGraphSection({ content }: SectionProps<PlatformOcgContent>) {
  return (
    <section className="bg-bg-raised px-pad-x py-pad-y">
      <Reveal>
        <SectionHeaderSplit
          label={content.label}
          heading={content.heading}
          body={content.body}
        />
        <OperationalContextGraph
          variant="platform"
          className="mt-12 w-full"
          titleId="platform-operational-context-graph-diagram-title"
        />
      </Reveal>
    </section>
  );
}
