import { AgenticOsDiagram } from '@/components/diagrams/AgenticOsDiagram';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeaderSplit } from '@/components/primitives/SectionHeaderSplit';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type AgenticOsContent = typeof home.agenticOs;

export function AgenticOs({ content }: SectionProps<AgenticOsContent>) {
  return (
    <section className="bg-bg-base px-pad-x py-pad-y">
      <Reveal>
        <SectionHeaderSplit
          label={content.label}
          heading={content.heading}
          body={content.body}
        />
        <AgenticOsDiagram className="mt-12 w-full" titleId="agentic-os-diagram-title" />
      </Reveal>
    </section>
  );
}
