// components/sections/home/Problem.tsx — STUB
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type ProblemContent = typeof home.problem;

export function Problem({ content }: SectionProps<ProblemContent>) {
  return (
    <section aria-labelledby="problem-heading" data-stub="Problem">
      <h2 id="problem-heading">{content.heading}</h2>
    </section>
  );
}
