// components/sections/home/AdfLoop.tsx
import { AdfLoopDiagram } from '@/components/diagrams/AdfLoopDiagram';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type AdfLoopContent = typeof home.adfLoop;

export function AdfLoop({ content }: SectionProps<AdfLoopContent>) {
  return (
    <section
      aria-labelledby="adf-loop-heading"
      className="bg-bg-raised px-(--spacing-pad-x) py-(--spacing-pad-y)"
    >
      <Reveal>
        <div className="flex gap-12 max-[1023px]:flex-col max-[1023px]:gap-5">
          <div className="w-[520px] shrink-0 max-[1023px]:w-auto">
            <p className="text-sm text-text-tertiary">{content.label}</p>
            <h2
              id="adf-loop-heading"
              className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
            >
              {content.heading}
            </h2>
          </div>
        </div>
        <AdfLoopDiagram className="mt-12 block w-full" stages={content.stages} />
      </Reveal>
    </section>
  );
}
