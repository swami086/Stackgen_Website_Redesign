import type { SVGAttributes } from 'react';
import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

const VIEWBOX = { width: 1438, height: 696 };
const LEFT_PANEL = { x: 0, y: 0, width: 593, height: 696, rx: 8 };
const RIGHT_COLUMN = { x: 982.5, y: 100.67906188964844 };

const COLORS = {
  panel: 'var(--color-panel)',
  panelRaised: 'var(--color-panel-raised)',
  panelBorder: 'var(--color-border-panel)',
  text: 'var(--color-text-on-panel)',
  muted: 'var(--color-text-muted-panel)',
  accent: 'var(--color-accent)',
  gap: '#FBE3F5',
  chipLeft: 'var(--color-text-on-panel)',
  chipRight: '#C0C0C0',
  iconBorder: '#FCDBCE',
} as const;

const CREATION_ROWS = [
  {
    title: 'AI Coding Assistants:',
    body: 'have drastically accelerated the core software creation process.',
  },
  {
    title: 'PR Acceleration:',
    body: 'Coding aids have effectively doubled pull request volumes globally.',
  },
] as const;

const OPERATIONS_ROWS = [
  {
    title: 'Operations Stagnation:',
    body: 'The ops later has failed to scale or match development velocity spikes',
  },
  {
    title: 'Reliability Gap:',
    body: 'Creates a hazardous bottleneck where code is written faster than it can safely ship',
  },
] as const;

function SvgText({
  x,
  y,
  width,
  lineHeight,
  fontSize,
  fontWeight = 400,
  fill,
  maxLines,
  children,
  ...rest
}: {
  x: number;
  y: number;
  width?: number;
  lineHeight?: number;
  fontSize: number;
  fontWeight?: number;
  fill: string;
  maxLines?: number;
  children: string;
} & SVGAttributes<SVGTextElement>) {
  return (
    <DiagramText
      x={x}
      y={y + fontSize}
      width={width}
      lineHeight={lineHeight}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fill={fill}
      maxLines={maxLines}
      {...rest}
    >
      {children}
    </DiagramText>
  );
}

function TitleBadge({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g data-part="title-badge">
      <rect
        x={x}
        y={y}
        width={20}
        height={22.21766471862793}
        rx={2.951}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={1.2}
        aria-hidden="true"
      />
      <circle cx={x + 10} cy={y + 11.108832359313965} r={4.1} fill="none" stroke={COLORS.accent} strokeWidth={1.2} aria-hidden="true" />
      <SvgText x={x + 30.136035919189453} y={y + 1.1088323593139648} fontSize={28.96} fill={COLORS.text}>
        {label}
      </SvgText>
    </g>
  );
}

function InsightIcon({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <g data-part="insight-icon" aria-hidden="true">
      <rect
        x={x}
        y={y}
        width={39.09894943237305}
        height={39.09894943237305}
        rx={2.951}
        fill="none"
        stroke={COLORS.iconBorder}
        strokeWidth={0.738}
      />
      <rect x={x + 8} y={y + 8} width={24} height={24} rx={2} fill="none" stroke={COLORS.accent} strokeWidth={1} />
      <path d={`M ${x + 16} ${y + 20} H ${x + 24}`} stroke={COLORS.text} strokeWidth={1.4} strokeLinecap="round" />
      <path d={`M ${x + 20} ${y + 16} V ${y + 24}`} stroke={COLORS.text} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

function GapGuide() {
  return (
    <g data-part="gap-guide" aria-hidden="true">
      <path d="M 735 286 H 755 M 770 278 H 791 M 807 270 H 829 M 844 262 H 864" stroke={COLORS.muted} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M 735 349 H 755 M 770 357 H 791 M 807 365 H 829 M 844 373 H 864" stroke={COLORS.accent} strokeWidth={1.2} strokeLinecap="round" />
    </g>
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
  const citationSummary = citations?.map((citation) => citation.source).filter(Boolean).join(', ');

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-ground="panel"
    >
      <title id={titleId}>Software creation outpaces software operations</title>
      <desc>
        A dark grounded comparison diagram shows software creation on the left and software
        operations on the right, with a labeled gap between them. Creation shows 2X PR volume plus
        two acceleration callouts, while operations shows 1x no boost plus stagnation and
        reliability-gap callouts.
        {citationSummary ? ` Home citations remain available from ${citationSummary}.` : ''}
      </desc>

      <rect
        x={0}
        y={0}
        width={VIEWBOX.width}
        height={VIEWBOX.height}
        rx={8}
        fill={COLORS.panel}
        stroke={COLORS.panelBorder}
        data-part="plate"
      />

      <rect
        x={LEFT_PANEL.x}
        y={LEFT_PANEL.y}
        width={LEFT_PANEL.width}
        height={LEFT_PANEL.height}
        rx={LEFT_PANEL.rx}
        fill={COLORS.panelRaised}
        data-part="creation-panel"
      />

      <g data-part="creation-column">
        <TitleBadge x={69} y={96.00007629394531} label="Software Creation (Dev)" />
        <SvgText
          x={69.00009694998153}
          y={135.59371818284853}
          width={454}
          lineHeight={57}
          maxLines={1}
          fontSize={43.44}
          fill={COLORS.text}
        >
          AI-Accelerated Speed
        </SvgText>
        <SvgText x={69} y={213.377669384121} fontSize={138.82} fontWeight={500} fill={COLORS.accent}>
          2X
        </SvgText>
        <rect
          x={258.0827941894531}
          y={241.9256609306298}
          width={121.99362182617188}
          height={39.90446090698242}
          fill="none"
          stroke={COLORS.chipLeft}
          strokeWidth={1.14}
          data-part="creation-chip"
        />
        <SvgText x={278.60047721862793} y={256.74599157760244} fontSize={15.962} fontWeight={500} fill={COLORS.chipLeft}>
          PR Volume
        </SvgText>

        {CREATION_ROWS.map((row, index) => {
          const y = index === 0 ? 375.3778991699219 : 525.5328674316406;
          return (
            <g key={row.title} data-part="creation-insight" data-index={index}>
              <InsightIcon x={69} y={y} />
              <SvgText x={131.79528045654297} y={y} width={390} lineHeight={28} maxLines={1} fontSize={21.327} fill={COLORS.text}>
                {row.title}
              </SvgText>
              <SvgText
                x={131.79528045654297}
                y={y + 36.326698303222656}
                width={390}
                lineHeight={25}
                maxLines={2}
                fontSize={18.957}
                fill={COLORS.muted}
              >
                {row.body}
              </SvgText>
            </g>
          );
        })}
      </g>

      <GapGuide />
      <SvgText
        x={757.25}
        y={343}
        width={61}
        lineHeight={18}
        maxLines={1}
        fontSize={14}
        fill={COLORS.gap}
        textAnchor="start"
        letterSpacing={0.56}
        data-part="gap-label"
      >
        {'← Gap →'}
      </SvgText>

      <g data-part="operations-column">
        <TitleBadge x={RIGHT_COLUMN.x} y={RIGHT_COLUMN.y} label="Software Operations" />
        <SvgText
          x={RIGHT_COLUMN.x + 0.00009694998152554035}
          y={RIGHT_COLUMN.y + 46.37605155687197}
          width={454}
          lineHeight={57}
          maxLines={1}
          fontSize={43.44}
          fill={COLORS.text}
        >
          AI-Accelerated Speed
        </SvgText>
        <SvgText
          x={RIGHT_COLUMN.x}
          y={RIGHT_COLUMN.y + 124.15978074073792}
          fontSize={80}
          fontWeight={500}
          fill={COLORS.accent}
        >
          1x
        </SvgText>
        <rect
          x={1080.5828018188477}
          y={232.83928680419922}
          width={96}
          height={40}
          fill="none"
          stroke={COLORS.chipRight}
          strokeWidth={1.14}
          data-part="operations-chip"
        />
        <SvgText x={1094.4989223480225} y={247.65963745117188} fontSize={15.962} fontWeight={500} fill={COLORS.chipRight}>
          No Boost
        </SvgText>

        {OPERATIONS_ROWS.map((row, index) => {
          const y = index === 0 ? 345.8392791748047 : 495.99424743652344;
          const bodyWidth = index === 0 ? 392 : 344;
          const maxLines = index === 0 ? 2 : 3;
          return (
            <g key={row.title} data-part="operations-insight" data-index={index}>
              <InsightIcon x={RIGHT_COLUMN.x} y={y} />
              <SvgText x={1045.295280456543} y={y} width={392} lineHeight={28} maxLines={1} fontSize={21.327} fill={COLORS.text}>
                {row.title}
              </SvgText>
              <SvgText
                x={1045.295280456543}
                y={y + 36.326698303222656}
                width={bodyWidth}
                lineHeight={25}
                maxLines={maxLines}
                fontSize={18.957}
                fill={COLORS.muted}
              >
                {row.body}
              </SvgText>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
