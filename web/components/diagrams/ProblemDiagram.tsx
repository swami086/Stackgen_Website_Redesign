// components/diagrams/ProblemDiagram.tsx — STUB
import type { DiagramProps } from '@/lib/types';

export function ProblemDiagram({ className, titleId = 'problem-diagram-title' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 1440 1481"
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-stub="ProblemDiagram"
    >
      <title id={titleId}>Problem diagram</title>
    </svg>
  );
}
