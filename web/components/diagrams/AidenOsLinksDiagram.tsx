import type { DiagramProps } from '@/lib/types';
import { AidenOsDiagram } from './AidenOsDiagram';

export type AidenOsLinksDiagramProps = DiagramProps;

export function AidenOsLinksDiagram({ className, titleId }: AidenOsLinksDiagramProps) {
  return <AidenOsDiagram className={className} titleId={titleId} />;
}
