// components/diagrams/TwoPlanesDiagram.tsx — STUB
import type { DiagramProps } from '@/lib/types';

export function TwoPlanesDiagram({ className, titleId = 'two-planes-diagram-title' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 1440 165"
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-stub="TwoPlanesDiagram"
    >
      <title id={titleId}>Two planes diagram</title>
    </svg>
  );
}
