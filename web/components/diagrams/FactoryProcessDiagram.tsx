import type { DiagramProps } from '@/lib/types';
import { AdfLifecycleDiagram } from './AdfLifecycleDiagram';

export type FactoryProcessDiagramProps = DiagramProps & {
  steps?: readonly {
    title: string;
    body: string;
  }[];
};

export function FactoryProcessDiagram({
  className,
  titleId = 'factory-process-diagram-title',
  steps,
}: FactoryProcessDiagramProps) {
  return <AdfLifecycleDiagram className={className} titleId={titleId} steps={steps} />;
}
