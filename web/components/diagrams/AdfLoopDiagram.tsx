// components/diagrams/AdfLoopDiagram.tsx
import type { ReactNode } from 'react';
import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

type Stage = {
  index: string;
  title: string;
  product: string;
  body: string;
};

export type AdfLoopDiagramProps = DiagramProps & {
  stages: Stage[];
};

const INPUT_CHIPS = [
  { label: 'Repos & IaC', y: 401 },
  { label: 'Telemetry', y: 433 },
  { label: 'Policies & SLOs', y: 465 },
  { label: 'Cloud state', y: 497 },
] as const;

const FACTORY_STAGES = [
  { label: 'Build', y: 321 },
  { label: 'Operate', y: 363 },
  { label: 'Observe', y: 405 },
  { label: 'Remediate', y: 447 },
] as const;

const OUTCOMES = [
  { value: '50%', label: 'MTTR reduction', y: 352 },
  { value: '60%', label: 'lower IaC cost', y: 412 },
  { value: '10×', label: 'provisioning velocity', y: 472 },
] as const;

const STAGE_CARDS = [
  { y: 270, titleFill: 'var(--color-text-primary)', bodyFill: 'var(--color-text-secondary)', accent: true },
  { y: 392, titleFill: 'var(--color-text-secondary)', bodyFill: 'var(--color-text-tertiary)', accent: false },
  { y: 514, titleFill: 'var(--color-text-secondary)', bodyFill: 'var(--color-text-tertiary)', accent: false },
  { y: 636, titleFill: 'var(--color-text-secondary)', bodyFill: 'var(--color-text-tertiary)', accent: false },
] as const;

function canvasFill(token: string | null | undefined): string {
  if (!token || token === '#00000000') return 'none';
  const map: Record<string, string> = {
    '$bg-raised': 'var(--color-bg-raised)',
    '$surface-sunken': 'var(--color-surface-sunken)',
    '$surface-card': 'var(--color-surface-card)',
    '$border-hairline': 'var(--color-border-hairline)',
    '$border-card': 'var(--color-border-card)',
    '$text-primary': 'var(--color-text-primary)',
    '$text-secondary': 'var(--color-text-secondary)',
    '$text-tertiary': 'var(--color-text-tertiary)',
    '$accent': 'var(--color-accent)',
    '$accent-dim': 'var(--color-accent-dim)',
  };
  if (token.startsWith('$')) return map[token] ?? 'none';
  if (token === '#C9A2FF') return 'var(--color-accent-text)';
  if (token === '#9E8FB8') return 'var(--color-text-tertiary)';
  return 'none';
}

function StageText({
  x,
  y,
  fontSize,
  fill,
  fontWeight = 'normal',
  fontFamily = 'var(--font-sans)',
  width,
  lineHeight,
  children,
}: {
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  fontWeight?: string | number;
  fontFamily?: string;
  width?: number;
  lineHeight?: number;
  children: string;
}) {
  return (
    <DiagramText
      x={x}
      y={y + fontSize}
      width={width}
      lineHeight={lineHeight}
      fill={fill}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
    >
      {children}
    </DiagramText>
  );
}

function HairlineBottom({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <line
      x1={x}
      y1={y + height}
      x2={x + width}
      y2={y + height}
      stroke="var(--color-border-hairline)"
      aria-hidden="true"
    />
  );
}

function Chevron({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y + 4} L${x + 14} ${y + 7.5} L${x} ${y + 11}`}
      fill="none"
      stroke="var(--color-text-tertiary)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    />
  );
}

export function AdfLoopDiagram({
  className,
  titleId = 'adf-loop-diagram-title',
  stages,
}: AdfLoopDiagramProps) {
  return (
    <svg
      viewBox="0 0 1440 870"
      className={className}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>ADF factory loop diagram</title>
      <desc>
        Inputs flow through Build, Govern, Observe, and Remediate inside the factory;
        Aiden OS gates every action and measured outcomes close the loop.
      </desc>

      <rect
        x={0}
        y={0}
        width={1440}
        height={870}
        fill={canvasFill('$bg-raised')}
        stroke="var(--color-border-hairline)"
        strokeWidth={1}
        aria-hidden="true"
      />

      <g data-part="schematic">
        <rect
          x={100}
          y={270}
          width={880}
          height={302}
          rx={12}
          fill={canvasFill('$surface-sunken')}
          stroke={canvasFill('$border-card')}
          strokeWidth={1}
          data-part="schematic-panel"
        />

        <StageText x={128} y={313} fontSize={10.5} fill="var(--color-text-tertiary)" fontWeight={500}>
          INPUTS
        </StageText>

        <g data-part="intent-card">
          <HairlineBottom x={128} y={340} width={180} height={47} />
          <StageText x={130} y={340} fontSize={13.5} fill="var(--color-text-primary)" fontWeight={500}>
            Factory Spec
          </StageText>
          <StageText x={130} y={361} fontSize={11.5} fill="var(--color-text-tertiary)">
            Reviewable. Diffable.
          </StageText>
        </g>

        {INPUT_CHIPS.map((chip, i) => (
          <g key={chip.label} data-part="input" data-index={i}>
            <HairlineBottom x={128} y={chip.y} width={180} height={32} />
            <StageText x={130} y={chip.y + 9} fontSize={11.5} fill="var(--color-text-secondary)">
              {chip.label}
            </StageText>
          </g>
        ))}

        <g data-part="connector" data-index={0} aria-hidden="true">
          <Chevron x={308} y={414} />
        </g>

        <StageText x={338} y={298} fontSize={10.5} fill="var(--color-text-tertiary)" fontWeight={500}>
          THE FACTORY
        </StageText>

        {FACTORY_STAGES.map((stage, i) => (
          <g key={stage.label} data-part="factory-stage" data-index={i}>
            <HairlineBottom x={338} y={stage.y} width={334} height={42} />
            <StageText x={340} y={stage.y + 13} fontSize={13.5} fill="var(--color-text-primary)" fontWeight={500}>
              {stage.label}
            </StageText>
          </g>
        ))}

        <g data-part="os-bar">
          <rect
            x={338}
            y={489}
            width={334}
            height={55}
            rx={6}
            fill={canvasFill('$accent-dim')}
          />
          <StageText x={350} y={489} fontSize={12} fill="var(--color-accent-text)" fontWeight={600}>
            Aiden OS
          </StageText>
          <StageText x={350} y={506} fontSize={11} fill="var(--color-text-tertiary)">
            One Operational Context Graph. Policy gate at every action.
          </StageText>
        </g>

        <g data-part="connector" data-index={1} aria-hidden="true">
          <Chevron x={672} y={414} />
        </g>

        <StageText x={702} y={325} fontSize={10.5} fill="var(--color-text-tertiary)" fontWeight={500}>
          MEASURED OUTCOMES
        </StageText>

        {OUTCOMES.map((outcome, i) => (
          <g key={outcome.label} data-part="outcome" data-index={i}>
            <rect
              x={702}
              y={outcome.y}
              width={250}
              height={46}
              rx={8}
              fill={canvasFill('$surface-card')}
              stroke={canvasFill('$border-card')}
              strokeWidth={1}
            />
            <StageText
              x={715}
              y={outcome.y + 12}
              fontSize={17}
              fill="var(--color-text-primary)"
              fontFamily="var(--font-mono)"
            >
              {outcome.value}
            </StageText>
            <StageText x={757} y={outcome.y + 15} fontSize={12} fill="var(--color-text-secondary)">
              {outcome.label}
            </StageText>
          </g>
        ))}
      </g>

      <g data-part="state-rail">
        {stages.map((stage, i) => {
          const layout = STAGE_CARDS[i];
          if (!layout) return null;
          const titleY = layout.y + 16;
          const bodyY = layout.y + 41;
          return (
            <g key={stage.index} data-part="stage" data-index={i}>
              <rect
                x={1020}
                y={layout.y}
                width={320}
                height={114}
                rx={9}
                fill={layout.accent ? canvasFill('$surface-card') : 'none'}
                stroke={layout.accent ? canvasFill('$accent') : canvasFill('$border-hairline')}
                strokeWidth={1}
              />
              <StageText
                x={1037}
                y={titleY}
                fontSize={15}
                fill={layout.titleFill}
                fontWeight={500}
              >
                {stage.title}
              </StageText>
              <StageText
                x={1037}
                y={bodyY}
                width={286}
                lineHeight={19}
                fontSize={12.5}
                fill={layout.bodyFill}
              >
                {stage.body}
              </StageText>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
