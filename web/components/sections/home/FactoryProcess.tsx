import { FactoryProcessDiagram } from '@/components/diagrams/FactoryProcessDiagram';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeaderSplit } from '@/components/primitives/SectionHeaderSplit';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type FactoryProcessContent = typeof home.factoryProcess;

export function FactoryProcess({ content }: SectionProps<FactoryProcessContent>) {
  return (
    <section aria-labelledby="factory-process-heading" className="bg-bg-raised px-pad-x py-pad-y">
      <SectionHeaderSplit
        label={content.label}
        heading={content.heading}
        className="mb-14"
      />
      <Reveal>
        <FactoryProcessDiagram steps={content.steps} className="w-full" />
      </Reveal>
    </section>
  );
}
