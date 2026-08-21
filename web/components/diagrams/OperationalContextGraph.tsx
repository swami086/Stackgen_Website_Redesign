// STUB
import type { DiagramProps } from '@/lib/types';

export type ContextGraphProps = DiagramProps & { variant: 'home' | 'platform' };

export function OperationalContextGraph({
  className,
  titleId = 'operational-context-graph-title',
  variant = 'home',
}: ContextGraphProps) {
  const viewBox = variant === 'home' ? '0 0 1440 543' : '0 0 1440 945';
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-stub="OperationalContextGraph"
      data-variant={variant}
    >
      <title id={titleId}>Operational context graph</title>
    </svg>
  );
}
