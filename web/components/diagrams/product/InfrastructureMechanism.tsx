import type { ReactNode, SVGAttributes } from 'react';
import productInfrastructure from '@/content/product-infrastructure';
import type { DiagramProps } from '@/lib/types';
import infrastructureGeometry from '../../../geometry/mechanism-infrastructure.json';

type GeometryNode = (typeof infrastructureGeometry.nodes)[number];

type InfrastructureStep = {
  y: number;
  tag: string;
  tagWidth: number;
  title: string;
  detail: string;
  dotFill: string;
  hasLine: boolean;
  hasTopBorder: boolean;
};

type InfrastructureCallout = {
  x: number;
  label: string;
  detail: string;
};

export type InfrastructureMechanismProps = DiagramProps & {
  heading?: string;
  body?: string;
  footnote?: string;
  callouts?: readonly InfrastructureCallout[];
  steps?: readonly InfrastructureStep[];
};

// Geometry from web/geometry/mechanism-infrastructure.json (node w8Wb0v)
const VIEW_BOX = infrastructureGeometry.viewBox.join(' ');
const Y_TOP = 683;
const Y_ROW = Y_TOP;

const CALLOUTS = {
  y: -474 + Y_TOP,
  height: 105,
  rx: 16,
  padX: 18,
  labelY: -665 + Y_TOP,
  detailY: -640 + Y_TOP,
  labelSize: 11,
  detailSize: 15,
};

const CARD = {
  x: 100,
  y: -345 + Y_TOP,
  width: 1040,
  height: 822,
  rx: 24,
};

const ROW_X = CARD.x + 28;
const ROW_W = 984;
const RAIL_X = ROW_X;
const DOT = { x: RAIL_X + 9, y: -683 + Y_ROW, r: 5 };
const LINE = { x: RAIL_X + 13, y: -665 + Y_ROW, width: 2, height: 74 };
const CONTENT_X = ROW_X + 46;
const TAG = { y: -683 + Y_ROW, height: 26, padX: 10, padY: 6, fontSize: 10.5 };
const TITLE_Y = -649 + Y_ROW;
const DETAIL_Y = -612 + Y_ROW;

const FILL: Record<string, string> = {
  '$surface-card': 'var(--color-surface-card)',
  '$border-hairline': 'var(--color-border-hairline)',
  '$border-card': 'var(--color-border-card)',
  '$text-primary': 'var(--color-text-primary)',
  '$text-secondary': 'var(--color-text-secondary)',
  '$text-tertiary': 'var(--color-text-tertiary)',
  '$accent': 'var(--color-accent)',
  '$accent-text': 'var(--color-accent-text)',
  '$accent-dim': 'var(--color-accent-dim)',
  '$pass': 'var(--color-pass)',
};

const [DEFAULT_BODY, DEFAULT_FOOTNOTE] = productInfrastructure.mechanism.body.split(/(?<=\.)\s+/);

function frameChildren(nodes: GeometryNode[], frameId: string, frameDepth: number): GeometryNode[] {
  const idx = nodes.findIndex((n) => n.id === frameId);
  if (idx < 0) return [];
  const out: GeometryNode[] = [];
  for (let j = idx + 1; j < nodes.length; j++) {
    const node = nodes[j];
    if ((node.depth ?? 0) <= frameDepth) break;
    out.push(node);
  }
  return out;
}

function fill(token: string | null | undefined): string {
  if (!token) return 'none';
  return FILL[token] ?? 'none';
}

function accentFill(fontSize: number, token: string): string {
  if (token !== '$accent') return fill(token);
  return fontSize >= 24 ? 'var(--color-accent)' : 'var(--color-accent-text)';
}

function parseCallouts(nodes: GeometryNode[]): InfrastructureCallout[] {
  const parent = nodes.find((n) => n.name === 'Pipeline Callouts')!;
  const frames = nodes.filter(
    (n) => n.depth === 2 && n.name?.endsWith(' Callout') && n.name !== 'Pipeline Callouts',
  );

  return frames.map((frame) => {
    const children = frameChildren(nodes, frame.id!, frame.depth!);
    const label = children.find((n) => n.name?.includes('Callout Label'));
    const detail = children.find((n) => n.name?.includes('Callout Detail'));
    return {
      x: frame.x >= parent.x ? frame.x : parent.x + frame.x,
      label: label?.text ?? '',
      detail: detail?.text ?? '',
    };
  });
}

function parseSteps(nodes: GeometryNode[]): InfrastructureStep[] {
  const rowFrames = nodes.filter((n) => n.depth === 2 && n.name?.endsWith(' Row'));

  return rowFrames.map((row, index) => {
    const children = frameChildren(nodes, row.id!, row.depth!);
    const tagFrame = children.find((n) => n.type === 'frame' && n.name?.includes(' Tag'));
    const tagLabel = children.find((n) => n.name?.includes('Tag Label'));
    const title = children.find((n) => n.name?.includes(' Title'));
    const detail = children.find((n) => n.name?.includes(' Detail'));
    const dot = children.find((n) => n.name?.includes(' Dot'));
    const line = children.find((n) => n.name?.includes(' Line'));

    return {
      y: row.y + Y_ROW,
      tag: tagLabel?.text ?? '',
      tagWidth: tagFrame?.width ?? 80,
      title: title?.text ?? '',
      detail: detail?.text ?? '',
      dotFill: dot?.fill ?? '$accent',
      hasLine: Boolean(line),
      hasTopBorder: index > 0,
    };
  });
}

const DEFAULT_CALLOUTS = parseCallouts(infrastructureGeometry.nodes);
const DEFAULT_STEPS = parseSteps(infrastructureGeometry.nodes);
const FIRST_ROW_Y = -659 + Y_ROW;
const TAG_OFFSET = TAG.y - FIRST_ROW_Y;
const TITLE_OFFSET = TITLE_Y - FIRST_ROW_Y;
const DETAIL_OFFSET = DETAIL_Y - FIRST_ROW_Y;
const DOT_OFFSET = DOT.y - FIRST_ROW_Y;
const LINE_OFFSET = LINE.y - FIRST_ROW_Y;

function SvgText({
  x,
  y,
  fontSize,
  fontWeight = 'normal',
  fontFamily = 'sans',
  fillToken,
  children,
  ...rest
}: {
  x: number;
  y: number;
  fontSize: number;
  fontWeight?: 'normal' | '500';
  fontFamily?: 'sans' | 'mono';
  fillToken: string;
  children: ReactNode;
} & SVGAttributes<SVGTextElement>) {
  return (
    <text
      x={x}
      y={y + fontSize}
      fontSize={fontSize}
      fontWeight={fontWeight === '500' ? 500 : 400}
      fontFamily={fontFamily === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)'}
      fill={accentFill(fontSize, fillToken)}
      {...rest}
    >
      {children}
    </text>
  );
}

function CalloutCard({
  callout,
  index,
}: {
  callout: InfrastructureCallout & { width: number };
  index: number;
}) {
  return (
    <g data-part="callout" data-index={index}>
      <rect
        x={callout.x}
        y={CALLOUTS.y}
        width={callout.width}
        height={CALLOUTS.height}
        rx={CALLOUTS.rx}
        fill={fill('$surface-card')}
        stroke={fill('$border-card')}
        strokeWidth={1}
      />
      <SvgText
        x={callout.x + CALLOUTS.padX}
        y={CALLOUTS.labelY}
        fontSize={CALLOUTS.labelSize}
        fontWeight="500"
        fontFamily="mono"
        fillToken="$accent-text"
      >
        {callout.label}
      </SvgText>
      <SvgText
        x={callout.x + CALLOUTS.padX}
        y={CALLOUTS.detailY}
        fontSize={CALLOUTS.detailSize}
        fillToken="$text-secondary"
      >
        {callout.detail}
      </SvgText>
    </g>
  );
}

function TimelineRow({ step, index }: { step: InfrastructureStep; index: number }) {
  return (
    <g data-part="step" data-index={index}>
      {step.hasTopBorder ? (
        <line
          x1={ROW_X}
          y1={step.y}
          x2={ROW_X + ROW_W}
          y2={step.y}
          stroke={fill('$border-hairline')}
          aria-hidden="true"
        />
      ) : null}

      <circle
        cx={DOT.x}
        cy={step.y + DOT_OFFSET + DOT.r}
        r={DOT.r}
        fill={fill(step.dotFill)}
        aria-hidden="true"
      />

      {step.hasLine ? (
        <rect
          x={LINE.x}
          y={step.y + LINE_OFFSET}
          width={LINE.width}
          height={LINE.height}
          rx={LINE.width / 2}
          fill={fill('$border-card')}
          aria-hidden="true"
        />
      ) : null}

      <rect
        x={CONTENT_X}
        y={step.y + TAG_OFFSET}
        width={step.tagWidth}
        height={TAG.height}
        rx={TAG.height / 2}
        fill={fill('$accent-dim')}
        aria-hidden="true"
      />
      <SvgText
        x={CONTENT_X + TAG.padX}
        y={step.y + TAG_OFFSET + TAG.padY}
        fontSize={TAG.fontSize}
        fontWeight="500"
        fontFamily="mono"
        fillToken="$accent-text"
      >
        {step.tag}
      </SvgText>

      <SvgText
        x={CONTENT_X}
        y={step.y + TITLE_OFFSET}
        fontSize={24}
        fontWeight="500"
        fillToken="$text-primary"
      >
        {step.title}
      </SvgText>

      <SvgText
        x={CONTENT_X}
        y={step.y + DETAIL_OFFSET}
        fontSize={14}
        fillToken="$text-secondary"
      >
        {step.detail}
      </SvgText>
    </g>
  );
}

export function InfrastructureMechanism({
  className,
  titleId = 'infrastructure-mechanism-title',
  heading = productInfrastructure.mechanism.heading,
  body = DEFAULT_BODY,
  footnote = DEFAULT_FOOTNOTE,
  callouts = DEFAULT_CALLOUTS,
  steps = DEFAULT_STEPS,
}: InfrastructureMechanismProps) {
  const desc =
    'Six steps run top to bottom: plain-language intent, Factory Spec assembly, policy-checked plan review, bounded apply, post-change watch, and threshold rollback. Intent becomes infrastructure change only inside the policy boundary you configured.';

  const calloutWidths = DEFAULT_CALLOUTS.map((_, i) => {
    const frame = infrastructureGeometry.nodes.filter(
      (n) => n.depth === 2 && n.name?.endsWith(' Callout') && n.name !== 'Pipeline Callouts',
    )[i];
    return frame?.width ?? 510;
  });

  return (
    <svg
      viewBox={VIEW_BOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>Infrastructure mechanism diagram</title>
      <desc>{desc}</desc>

      <g data-part="header">
        <SvgText x={100} y={-611 + Y_TOP} fontSize={32} fontWeight="500" fillToken="$text-primary">
          {heading}
        </SvgText>
        <SvgText x={100} y={-548 + Y_TOP} fontSize={16} fillToken="$text-secondary">
          {body}
        </SvgText>
      </g>

      <g data-part="callouts-row">
        {callouts.map((callout, index) => (
          <CalloutCard
            key={callout.label}
            callout={{ ...callout, width: calloutWidths[index] ?? 510 }}
            index={index}
          />
        ))}
      </g>

      <g data-part="sequence-card">
        <rect
          x={CARD.x}
          y={CARD.y}
          width={CARD.width}
          height={CARD.height}
          rx={CARD.rx}
          fill={fill('$surface-card')}
          stroke={fill('$border-hairline')}
          strokeWidth={1}
        />

        <g data-part="timeline">
          {steps.map((step, index) => (
            <TimelineRow key={step.title} step={step} index={index} />
          ))}
        </g>
      </g>

      <SvgText
        x={100}
        y={501 + Y_TOP}
        fontSize={13}
        fillToken="$text-tertiary"
        data-part="footnote"
      >
        {footnote}
      </SvgText>
    </svg>
  );
}
