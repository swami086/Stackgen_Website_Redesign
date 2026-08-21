import type { DiagramProps } from '@/lib/types';
import mechanismAutomationGeometry from '../../../geometry/mechanism-automation.json';

type GeometryNode = (typeof mechanismAutomationGeometry.nodes)[number];

const Y0 = -Math.min(...mechanismAutomationGeometry.nodes.map((n) => n.y));
const VIEWBOX = mechanismAutomationGeometry.viewBox.join(' ');

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
    const n = nodes[i];
    while (stack.length > n.depth) stack.pop();
    const parent = pos[stack[stack.length - 1]!]!;
    pos[i] = {
      x: parent.x + n.x,
      y: n.depth === 0 ? n.y : parent.y + n.y + Y0,
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
    if (n.depth <= frame.depth) break;
    out.push(n);
  }
  return out;
}

type Callout = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  detail: string;
};

type PipelineStep = {
  y: number;
  borderTop: boolean;
  tag: string;
  tagWidth: number;
  title: string;
  detail: string;
  dotFill: string;
  isLast: boolean;
};

function parseLayout() {
  const nodes = mechanismAutomationGeometry.nodes;
  const pos = absPositions(nodes);

  const calloutFrame = nodes.find((n) => n.name === 'Pipeline Callouts')!;
  const calloutIdx = nodes.indexOf(calloutFrame);
  const calloutCards = frameChildren(nodes, calloutFrame.id).filter((n) => n.type === 'frame');

  const callouts: Callout[] = calloutCards.map((card) => {
    const cardIdx = nodes.indexOf(card);
    const cardPos = pos[cardIdx]!;
    const texts = frameChildren(nodes, card.id).filter((n) => n.type === 'text');
    const label = texts.find((n) => n.name?.includes('Label'))?.text ?? '';
    const detail = texts.find((n) => n.name?.includes('Detail'))?.text ?? '';
    return {
      x: cardPos.x,
      y: cardPos.y,
      width: card.width,
      height: card.height,
      label,
      detail,
    };
  });

  const sequence = nodes.find((n) => n.name === 'Pipeline Sequence')!;
  const sequenceIdx = nodes.indexOf(sequence);
  const sequencePos = pos[sequenceIdx]!;

  const rowFrames = frameChildren(nodes, sequence.id).filter((n) => n.name?.endsWith(' Row'));
  const steps: PipelineStep[] = rowFrames.map((row, i) => {
    const rowIdx = nodes.indexOf(row);
    const rowPos = pos[rowIdx]!;
    const children = frameChildren(nodes, row.id);
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
      tagWidth: tagFrame?.width ?? 59,
      title: title?.text ?? '',
      detail: detail?.text ?? '',
      dotFill: dot?.fill ?? '$accent',
      isLast: !hasLine,
    };
  });

  const footnoteNode = nodes.find((n) => n.name === 'Footnote')!;
  const footnoteIdx = nodes.indexOf(footnoteNode);
  const footnotePos = pos[footnoteIdx]!;

  return {
    callouts,
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

const DESC =
  'Six pipeline stages run top to bottom: code commit, build and test, infra checks against the operational context graph, active gating, deploy, and monitoring confirms release health.';

function PipelineStepRow({ step, index }: { step: PipelineStep; index: number }) {
  const rowX = LAYOUT.sequence.x + 28;

  return (
    <g data-part="pipeline-step" data-index={index} transform={`translate(${rowX} ${step.y})`}>
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
        <rect
          x={9}
          y={18}
          width={10}
          height={10}
          rx={999}
          fill={fillVar(step.dotFill)}
        />
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

export function AutomationMechanism({
  className,
  titleId = 'automation-mechanism-title',
}: DiagramProps) {
  const { callouts, sequence, steps, footnote } = LAYOUT;

  return (
    <svg viewBox={VIEWBOX} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>Automation mechanism diagram</title>
      <desc>{DESC}</desc>

      <g data-part="callouts">
        {callouts.map((callout, i) => (
          <g key={callout.label} data-part="callout" data-index={i}>
            <rect
              x={callout.x}
              y={callout.y}
              width={callout.width}
              height={callout.height}
              rx={16}
              fill={fillVar('$surface-card')}
              stroke={fillVar('$border-card')}
              strokeWidth={1}
            />
            <text
              x={callout.x + 18}
              y={callout.y + 18}
              fill={fillVar('$accent-text')}
              fontSize={11}
              fontWeight={500}
              fontFamily={fontVar('$font-mono')}
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <text
              x={callout.x + 18}
              y={callout.y + 43}
              fill={fillVar('$text-secondary')}
              fontSize={15}
              fontFamily={fontVar('$font-sans')}
              dominantBaseline="hanging"
            >
              {callout.detail}
            </text>
          </g>
        ))}
      </g>

      <g data-part="pipeline-sequence">
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
