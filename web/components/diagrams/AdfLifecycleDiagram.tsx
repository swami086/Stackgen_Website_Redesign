import home from '@/content/home';
import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

type LifecycleStep = (typeof home.factoryProcess.steps)[number];

export type AdfLifecycleDiagramProps = DiagramProps & {
  steps?: readonly LifecycleStep[];
};

const VIEW_BOX = '0 0 1674 335';
const CARD_WIDTH = 396;
const CARD_HEIGHT = 335;
const CARD_X = [0, 426, 852, 1278] as const;
const CHIP = [
  { width: 88, height: 40, stroke: '#9EE6FC', text: '#9EE6FC' },
  { width: 79.28025817871094, height: 40.28025436401367, stroke: '#BA99FD', text: '#BA99FD' },
  { width: 79.28025817871094, height: 40.28025436401367, stroke: '#96897C', text: '#96897C' },
  { width: 79.28025817871094, height: 40.28025436401367, stroke: '#96897C', text: '#96897C' },
] as const;
const CONNECTOR_X = [396, 822, 1248] as const;
const CONNECTOR_TOP = 19;
const CONNECTOR_BOTTOM = 271;
const BODY_TOP = [127, 126.28025817871094, 126.28025817871094, 126.28025817871094] as const;
const BODY_LINES = [4, 4, 4, 4] as const;
const PANEL = '#211D15';
const GROUND = '#1B1811';
const TEXT_PRIMARY = '#F1EAE0';
const TEXT_SECONDARY = '#96897C';
const WIRE_DARK = '#4A4441';

function ConnectorStack({
  x,
  accent,
  muted,
  y,
}: {
  x: number;
  accent: string;
  muted: string;
  y: number;
}) {
  const bars = [
    { x: 0, y: 0, fill: muted },
    { x: 10, y: 0, fill: muted },
    { x: 20, y: 0, fill: muted },
    { x: 5, y: 16, fill: accent },
    { x: 15, y: 16, fill: accent },
    { x: 25, y: 16, fill: accent },
  ] as const;

  return (
    <g data-part="connector-stack" transform={`translate(${x} ${y})`}>
      {bars.map((bar) => (
        <rect
          key={`${bar.x}-${bar.y}`}
          x={bar.x}
          y={bar.y}
          width={8}
          height={5}
          fill={bar.fill}
          aria-hidden="true"
        />
      ))}
    </g>
  );
}

export function AdfLifecycleDiagram({
  className,
  titleId = 'adf-lifecycle-diagram-title',
  steps = home.factoryProcess.steps,
}: AdfLifecycleDiagramProps) {
  const descId = `${titleId}-desc`;

  return (
    <svg
      viewBox={VIEW_BOX}
      className={className}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      data-ground="panel"
    >
      <title id={titleId}>Autonomous DevOps Factory lifecycle diagram</title>
      <desc id={descId}>
        Four lifecycle cards show how the Autonomous DevOps Factory moves from intent to
        factory spec, factory runtime, and factory learning in one bounded loop.
      </desc>

      <rect
        data-part="panel-ground"
        x={0}
        y={0}
        width={1674}
        height={335}
        fill={GROUND}
        aria-hidden="true"
      />

      <g data-part="lifecycle-row">
        {steps.map((step, index) => {
          const chip = CHIP[index];
          if (!chip) return null;

          return (
            <g
              key={step.title}
              data-part="step-card"
              data-index={index}
              transform={`translate(${CARD_X[index]} 0)`}
            >
              <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx={2} fill={PANEL} />

              <g data-part="step-chip" transform="translate(37 19)">
                <rect
                  width={chip.width}
                  height={chip.height}
                  fill="none"
                  stroke={chip.stroke}
                  strokeWidth={1.14}
                />
                <text
                  x={chip.width / 2}
                  y={chip.height / 2}
                  fill={chip.text}
                  fontSize={14}
                  fontWeight={500}
                  fontFamily="var(--font-sans)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {`STEP ${String(index + 1).padStart(2, '0')}`}
                </text>
              </g>

              <text
                x={37}
                y={83}
                fill={TEXT_PRIMARY}
                fontSize={24}
                fontWeight={400}
                fontFamily="var(--font-sans)"
                dominantBaseline="hanging"
              >
                {step.title}
              </text>

              <DiagramText
                data-part="step-body"
                x={37}
                y={BODY_TOP[index]}
                width={322}
                lineHeight={25.2}
                fill={TEXT_SECONDARY}
                fontSize={18}
                maxLines={BODY_LINES[index]}
                dominantBaseline="hanging"
              >
                {step.body}
              </DiagramText>
            </g>
          );
        })}

        {CONNECTOR_X.map((x, index) => {
          const accent = index === 0 ? '#BA99FD' : '#96897C';
          const muted = index === 0 ? '#9EE6FC' : WIRE_DARK;

          return (
            <g key={x} data-part="connector" data-index={index}>
              <ConnectorStack x={x} y={CONNECTOR_TOP} accent={accent} muted={muted} />
              <ConnectorStack x={x} y={CONNECTOR_BOTTOM} accent={accent} muted={muted} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
