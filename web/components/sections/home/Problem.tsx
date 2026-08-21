import { ProblemDiagram } from '@/components/diagrams/ProblemDiagram';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type ProblemContent = typeof home.problem;

export function Problem({ content }: SectionProps<ProblemContent>) {
  return (
    <section
      aria-labelledby="problem-heading"
      className="bg-bg-raised px-(--spacing-pad-x) py-(--spacing-pad-y)"
    >
      <div className="flex max-w-[1240px] gap-12">
        <div className="w-[520px] shrink-0">
          <p className="text-sm text-text-tertiary">{content.label}</p>
          <h2
            id="problem-heading"
            className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
          >
            {content.heading}
          </h2>
        </div>
        <p className="w-[480px] text-base leading-normal text-text-secondary">{content.body}</p>
      </div>
      <Reveal>
        <ProblemDiagram
          className="mt-16 w-full max-w-[1240px]"
          citations={content.citations}
        />
      </Reveal>
    </section>
  );
}
