import type { DiagramProps } from '@/lib/types';
import sreGeometry from '../../../geometry/mechanism-sre.json';

type GeometryNode = (typeof sreGeometry.nodes)[number];

const Y0 = -Math.min(...sreGeometry.nodes.map((n) => n.y));
const VIEWBOX = sreGeometry.viewBox.join(' ');

function fillVar(token: string | null | undefined): string {
  if (!token?.startsWith('$')) return 'none';
  return `var(--color-${token.slice(1)})`;
}

function fontVar(token: string | null | undefined): string {
  if (token === '$font-mono') return 'var(--font-mono)';
  return 'var(--font-sans)';
}

function absPositions(nodes: GeometryNode[]): Array<{ x: number; y: number }> {
  const pos: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  const stack = [0];
  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i]!;
    while (stack.length > (n.depth ?? 0)) stack.pop();
    const parent = pos[stack[stack.length - 1]!]!;
    pos[i] = {
      x: parent.x + n.x,
      y: (n.depth ?? 0) === 0 ? n.y : parent.y + n.y + Y0,
    };
    stack.push(i);
  }
  return pos;
}

function frameChildren(nodes: GeometryNode[], frameId: string): GeometryNode[] {
  const idx = nodes.findIndex((n) => n.id === frameId);
  if (idx < 0) return [];
  const frame = nodes[idx]!;
  const out: GeometryNode[] = [];
  for (let j = idx + 1; j < nodes.length; j++) {
    const n = nodes[j]!;
    if ((n.depth ?? 0) <= (frame.depth ?? 0)) break;
    out.push(n);
  }
  return out;
}

type PipelineStep = {
  y: number;
  borderTop: boolean;
  tag: string;
  tagWidth: number;
  title: string;
  detail: string;
  dotFill: string;
  isLast: boolean;
  isRefusalBoundary: boolean;
};

function parseLayout() {
  const nodes = sreGeometry.nodes;
  const pos = absPositions(nodes);

  const sequence = nodes.find((n) => n.name === 'Investigation Sequence')!;
  const sequenceIdx = nodes.indexOf(sequence);
  const sequencePos = pos[sequenceIdx]!;

  const rowFrames = frameChildren(nodes, sequence.id!).filter((n) => n.name?.endsWith(' Row'));
  const steps: PipelineStep[] = rowFrames.map((row) => {
    const rowIdx = nodes.indexOf(row);
    const rowPos = pos[rowIdx]!;
    const children = frameChildren(nodes, row.id!);
    const tagFrame = children.find((n) => n.name?.includes(' Tag') && n.type === 'frame');
    const tagLabel = children.find((n) => n.name?.includes('Tag Label'));
    const title = children.find((n) => n.name?.includes(' Title'));
    const detail = children.find((n) => n.name?.includes(' Detail'));
    const dot = children.find((n) => n.name?.includes(' Dot'));
    const hasLine = children.some((n) => n.name?.includes(' Line'));

    return {
      y: rowPos.y,
      borderTop: typeof row.strokeWidth === 'object' && row.strokeWidth !== null,
      tag: tagLabel?.text ?? '',
      tagWidth: tagFrame?.width ?? 80,
      title: title?.text ?? '',
      detail: detail?.text ?? '',
      dotFill: dot?.fill ?? '$accent',
      isLast: !hasLine,
      isRefusalBoundary: row.name?.includes('Policy-validated') ?? false,
    };
  });

  const footnoteNode = nodes.find((n) => n.name === 'Footnote')!;
  const footnoteIdx = nodes.indexOf(footnoteNode);
  const footnotePos = pos[footnoteIdx]!;

  return {
    sequence: {
      x: sequencePos.x,
      y: sequencePos.y,
      width: sequence.width,
      height: sequence.height,
      rx: sequence.cornerRadius ?? 24,
    },
    steps,
    footnote: {
      x: footnotePos.x,
      y: footnotePos.y,
      text: footnoteNode.text ?? '',
    },
  };
}

const LAYOUT = parseLayout();

// See InfrastructureMechanism: the canvas heading/body band is rendered as DOM
// text by the section, so it is cropped out of the SVG here.
const CROP_PAD = 40;
const CROP_TOP = LAYOUT.sequence.y - CROP_PAD;
const CROP_HEIGHT = LAYOUT.footnote.y + 19 + CROP_PAD - CROP_TOP;
const CROPPED_VIEWBOX = `0 ${CROP_TOP} 1240 ${CROP_HEIGHT}`;

const DESC =
  'Six steps run top to bottom: infra drift, P1 alert, root cause via the Operational Context Graph, remediation, policy-validated deploy at the refusal boundary, and SLO verification. Bounded autonomy is the product: refusal at the policy boundary you configured is the point, not a caveat.';

function PipelineStepRow({ step, index }: { step: PipelineStep; index: number }) {
  const rowX = LAYOUT.sequence.x + 28;
  const part = step.isRefusalBoundary ? 'refusal-boundary' : 'step';

  return (
    <g data-part={part} data-index={index} transform={`translate(${rowX} ${step.y})`}>
      {step.borderTop ? (
        <line
          x1={0}
          y1={0}
          x2={984}
          y2={0}
          stroke={fillVar('$border-hairline')}
          aria-hidden="true"
        />
      ) : null}

      <g data-part="step-rail" aria-hidden="true">
        <rect x={9} y={18} width={10} height={10} rx={999} fill={fillVar(step.dotFill)} />
        {!step.isLast ? (
          <rect x={13} y={36} width={2} height={74} rx={999} fill={fillVar('$border-card')} />
        ) : null}
      </g>

      <g data-part="step-content">
        <rect
          x={46}
          y={18}
          width={step.tagWidth}
          height={26}
          rx={999}
          fill={fillVar('$accent-dim')}
        />
        <text
          x={56}
          y={24}
          fill={fillVar('$accent-text')}
          fontSize={10.5}
          fontWeight={500}
          fontFamily={fontVar('$font-mono')}
          dominantBaseline="hanging"
        >
          {step.tag}
        </text>
        <text
          x={46}
          y={52}
          fill={fillVar('$text-primary')}
          fontSize={24}
          fontWeight={500}
          fontFamily={fontVar('$font-sans')}
          dominantBaseline="hanging"
        >
          {step.title}
        </text>
        <text
          x={46}
          y={89}
          fill={fillVar('$text-secondary')}
          fontSize={14}
          fontFamily={fontVar('$font-sans')}
          dominantBaseline="hanging"
        >
          {step.detail}
        </text>
      </g>
    </g>
  );
}

export function SreMechanism({
  className,
  titleId = 'sre-mechanism-title',
}: DiagramProps) {
  const { sequence, steps, footnote } = LAYOUT;

  return (
    <svg viewBox={CROPPED_VIEWBOX} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>SRE incident recovery mechanism</title>
      <desc>{DESC}</desc>

      <g data-part="sequence-card">
        <rect
          x={sequence.x}
          y={sequence.y}
          width={sequence.width}
          height={sequence.height}
          rx={sequence.rx}
          fill={fillVar('$surface-card')}
          stroke={fillVar('$border-hairline')}
          strokeWidth={1}
        />
        {steps.map((step, i) => (
          <PipelineStepRow key={step.title} step={step} index={i} />
        ))}
      </g>

      <text
        data-part="footnote"
        x={footnote.x}
        y={footnote.y + 13}
        fill={fillVar('$text-tertiary')}
        fontSize={13}
        fontFamily={fontVar('$font-sans')}
      >
        {footnote.text}
      </text>
    </svg>
  );
}
