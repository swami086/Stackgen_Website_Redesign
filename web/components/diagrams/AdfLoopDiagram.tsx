import type { DiagramProps } from '@/lib/types';
import { AdfLifecycleDiagram } from './AdfLifecycleDiagram';

type Stage = {
  index: string;
  title: string;
  product: string;
  body: string;
};

export type AdfLoopDiagramProps = DiagramProps & {
  stages: Stage[];
};

export function AdfLoopDiagram({
  className,
  titleId = 'adf-loop-diagram-title',
  stages: _stages,
}: AdfLoopDiagramProps) {
  return <AdfLifecycleDiagram className={className} titleId={titleId} />;
}
