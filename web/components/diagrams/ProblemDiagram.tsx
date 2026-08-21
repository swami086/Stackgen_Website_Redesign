import type { SVGAttributes } from 'react';
import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

/** Normalized Y origin: Creation Ops frame top in problem.json (y=-1037). */
const Y0 = 1037;
const CARD = { x: 100, y: 0, w: 1240, h: 369, rx: 24 };
const PAD = 32;
const DIVIDER_Y = PAD + 141;
const FAILURE_Y = DIVIDER_Y + 1;
const ROW_H = 57;
const GAP_X = PAD + 534;
const OPS_X = PAD + 666;
const EVIDENCE_TOP = -604 + Y0;
const EVIDENCE_ROW_H = 172;
const PULL_Y = -24 + Y0;

const FILL: Record<string, string> = {
  '$surface-card': 'var(--color-surface-card)',
  '$border-hairline': 'var(--color-border-hairline)',
  '$text-primary': 'var(--color-text-primary)',
  '$text-secondary': 'var(--color-text-secondary)',
  '$text-tertiary': 'var(--color-text-tertiary)',
  '$accent': 'var(--color-accent)',
};

const CREATION = {
  title: 'Software Creation',
  body: 'Agents compress local creation loops. Code, pull requests, and spec changes rise before governance catches up.',
};

const OPERATIONS = {
  title: 'Software Operations',
  body: 'Operations still carry the whole-system check. Approvals, drift checks, incident context, and rollback safety stay cross-domain.',
};

const FAILURE_ROWS = [
  {
    title: 'Manual toll',
    body: 'Supervised deploys, approval chains, and stale runbooks slow each release.',
  },
  {
    title: 'Reactive SRE',
    body: 'On-call response starts with missing change history and fragmented tools.',
  },
  {
    title: 'Stateless agents',
    body: 'Domain helpers accelerate one lane at a time, not the shared operational loop.',
  },
] as const;

const EVIDENCE_ROWS = [
  {
    figure: '1.7x',
    title: 'more issues in AI-generated PRs',
    description:
      'Independent analysis found AI-authored pull requests carry more defects, especially logic and correctness bugs that become production incidents.',
    source: 'CodeRabbit / Stack Overflow Blog, State of AI vs Human Code Generation',
  },
  {
    figure: '78%',
    title: 'report more incidents once AI code is live',
    description:
      'Teams rate AI code highly in review, then see production failures after ship when line-by-line review is skipped.',
    source: 'New Relic 2026 State of AI Coding',
  },
  {
    figure: 'DORA',
    title: 'AI helps productivity, hurts stability',
    description:
      'AI adoption raises individual productivity while hurting software delivery stability and throughput.',
    source: 'DORA 2024 Accelerate State of DevOps Report',
  },
] as const;

const PULL =
  'Autonomy should scale at the pace of confidence, not at the pace of autocomplete.';

function accentFill(fontSize: number, token: string): string {
  if (token !== '$accent') return FILL[token] ?? token;
  return fontSize >= 24 ? 'var(--color-accent)' : 'var(--color-accent-text)';
}

function SvgText({
  x,
  y,
  fontSize,
  fontWeight = 'normal',
  fontFamily = 'sans',
  fill,
  width,
  lineHeight,
  children,
  ...rest
}: {
  x: number;
  y: number;
  fontSize: number;
  fontWeight?: 'normal' | '500';
  fontFamily?: 'sans' | 'mono';
  fill: string;
  width?: number;
  lineHeight?: number;
  children: string;
} & SVGAttributes<SVGTextElement>) {
  return (
    <DiagramText
      x={x}
      y={y + fontSize}
      width={width}
      lineHeight={lineHeight}
      fontSize={fontSize}
      fontWeight={fontWeight === '500' ? 500 : 400}
      mono={fontFamily === 'mono'}
      fill={accentFill(fontSize, fill)}
      {...rest}
    >
      {children}
    </DiagramText>
  );
}

export type ProblemDiagramProps = DiagramProps & {
  citations?: ReadonlyArray<{ claim: string; source: string }>;
};

export function ProblemDiagram({
  className,
  titleId = 'problem-diagram-title',
  citations,
}: ProblemDiagramProps) {
  const evidence = EVIDENCE_ROWS.map((row, i) => ({
    ...row,
    description: citations?.[i]?.claim ?? row.description,
    source: citations?.[i]?.source ?? row.source,
  }));

  return (
    <svg
      viewBox="0 0 1440 1083"
      className={className}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>Creation versus operations gap</title>
      <desc>
        Software creation accelerates on the left while operations lag on the right, separated by a
        context gap; manual toll, reactive SRE, and stateless agents widen the gap before cited
        industry evidence and a closing principle on autonomy.
      </desc>

      <g data-part="creation-card">
        <rect
          x={CARD.x}
          y={CARD.y}
          width={CARD.w}
          height={CARD.h}
          rx={CARD.rx}
          fill={FILL['$surface-card']}
          stroke={FILL['$border-hairline']}
          strokeWidth={1}
        />

        <g data-part="creation-column" data-index={0}>
          <SvgText
            x={CARD.x + PAD}
            y={CARD.y + PAD}
            fontSize={18}
            fontWeight="500"
            fill="$text-primary"
          >
            {CREATION.title}
          </SvgText>
          <SvgText
            x={CARD.x + PAD}
            y={CARD.y + PAD + 34}
            width={510}
            lineHeight={21}
            fontSize={14}
            fill="$text-secondary"
          >
            {CREATION.body}
          </SvgText>
        </g>

        <g data-part="gap-marker" aria-hidden="true">
          <rect
            x={CARD.x + GAP_X + 51}
            y={CARD.y + PAD + 8}
            width={6}
            height={72}
            rx={999}
            fill={FILL['$accent']}
          />
          <SvgText
            x={CARD.x + GAP_X + 42}
            y={CARD.y + PAD + 90}
            fontSize={13}
            fontFamily="mono"
            fill="$accent"
          >
            Gap
          </SvgText>
          <SvgText
            x={CARD.x + GAP_X + 10}
            y={CARD.y + PAD + 117}
            fontSize={12}
            fill="$text-secondary"
          >
            context gap
          </SvgText>
        </g>

        <g data-part="operations-column" data-index={1}>
          <SvgText
            x={CARD.x + OPS_X}
            y={CARD.y + PAD}
            fontSize={18}
            fontWeight="500"
            fill="$text-primary"
          >
            {OPERATIONS.title}
          </SvgText>
          <SvgText
            x={CARD.x + OPS_X}
            y={CARD.y + PAD + 34}
            width={510}
            lineHeight={21}
            fontSize={14}
            fill="$text-secondary"
          >
            {OPERATIONS.body}
          </SvgText>
        </g>

        <rect
          x={CARD.x + PAD}
          y={CARD.y + DIVIDER_Y}
          width={1176}
          height={1}
          fill={FILL['$border-hairline']}
          aria-hidden="true"
        />

        {FAILURE_ROWS.map((row, i) => (
          <g key={row.title} data-part="failure-row" data-index={i}>
            <rect
              x={CARD.x + PAD}
              y={CARD.y + FAILURE_Y + i * ROW_H}
              width={1176}
              height={1}
              fill={FILL['$border-hairline']}
              aria-hidden="true"
            />
            <SvgText
              x={CARD.x + PAD}
              y={CARD.y + FAILURE_Y + i * ROW_H + 18}
              fontSize={14}
              fontWeight="500"
              fill="$text-primary"
            >
              {row.title}
            </SvgText>
            <SvgText
              x={CARD.x + PAD + 204}
              y={CARD.y + FAILURE_Y + i * ROW_H + 18}
              fontSize={14}
              fill="$text-secondary"
            >
              {row.body}
            </SvgText>
          </g>
        ))}
      </g>

      <g data-part="evidence">
        <rect
          x={CARD.x}
          y={EVIDENCE_TOP}
          width={CARD.w}
          height={1}
          fill={FILL['$border-hairline']}
          aria-hidden="true"
        />
        {evidence.map((row, i) => (
          <g key={row.figure} data-part="evidence-row" data-index={i}>
            <SvgText
              x={CARD.x}
              y={EVIDENCE_TOP + i * EVIDENCE_ROW_H + 32}
              fontSize={44}
              fontFamily="mono"
              fill="$accent"
            >
              {row.figure}
            </SvgText>
            <SvgText
              x={CARD.x + 256}
              y={EVIDENCE_TOP + i * EVIDENCE_ROW_H + 32}
              fontSize={20}
              fontWeight="500"
              fill="$text-primary"
            >
              {row.title}
            </SvgText>
            <SvgText
              x={CARD.x + 256}
              y={EVIDENCE_TOP + i * EVIDENCE_ROW_H + 65}
              width={640}
              lineHeight={24}
              fontSize={15}
              fill="$text-secondary"
            >
              {row.description}
            </SvgText>
            <SvgText
              x={CARD.x + 256}
              y={EVIDENCE_TOP + i * EVIDENCE_ROW_H + 122}
              fontSize={12}
              fill="$text-tertiary"
            >
              {row.source}
            </SvgText>
            <rect
              x={CARD.x}
              y={EVIDENCE_TOP + (i + 1) * EVIDENCE_ROW_H}
              width={CARD.w}
              height={1}
              fill={FILL['$border-hairline']}
              aria-hidden="true"
            />
          </g>
        ))}
      </g>

      <g data-part="pull-line">
        <SvgText
          x={CARD.x}
          y={PULL_Y}
          width={860}
          lineHeight={35}
          fontSize={26}
          fontWeight="500"
          fill="$text-primary"
        >
          {PULL}
        </SvgText>
      </g>
    </svg>
  );
}
