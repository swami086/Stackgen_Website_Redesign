import { TwoPlanesDiagram } from '@/components/diagrams/TwoPlanesDiagram';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type TwoPlanesContent = typeof platform.twoPlanes;

export function TwoPlanes({ content }: SectionProps<TwoPlanesContent>) {
  return (
    <section aria-label="Deterministic and agentic planes" className="bg-bg-raised px-pad-x">
      <Reveal>
        <TwoPlanesDiagram planes={content} className="w-full" />
      </Reveal>
    </section>
  );
}
