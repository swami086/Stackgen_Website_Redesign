import home from '@/content/home';
import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

type FactoryStep = (typeof home.factoryProcess.steps)[number];

export type FactoryProcessDiagramProps = DiagramProps & {
  steps?: readonly FactoryStep[];
};

// Geometry from design-reference/geometry/factory-process.json (node pnlIy)
const VIEW_BOX = '0 0 1440 604';
const Y_OFFSET = 2676;
const STEPS_ORIGIN = { x: 100, y: -2548 + Y_OFFSET };
const STEP = { width: 292, height: 236, rx: 10 };
const STEP_X = [0, 316, 632, 948] as const;
const CONNECTOR_X = [292, 608, 924] as const;
const INNER = {
  x: 18,
  numberY: 18,
  titleY: 47,
  dividerY: 79,
  bodyY: 94,
  dividerW: 256,
  bodyW: 256,
};
const CONNECTOR_HAIRLINE_Y = 118;

const FILL: Record<string, string> = {
  '$bg-raised': 'var(--color-bg-raised)',
  '$surface-sunken': 'var(--color-surface-sunken)',
  '$border-card': 'var(--color-border-card)',
  '$text-primary': 'var(--color-text-primary)',
  '$text-secondary': 'var(--color-text-secondary)',
  '$accent-text': 'var(--color-accent-text)',
  '$accent-dim': 'var(--color-accent-dim)',
};

function stepNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function FactoryProcessDiagram({
  className,
  titleId = 'factory-process-diagram-title',
  steps = home.factoryProcess.steps,
}: FactoryProcessDiagramProps) {
  const desc =
    'Four stages run left to right: intent, factory spec, factory runtime, factory learning; learning feeds back into intent.';

  return (
    <svg
      viewBox={VIEW_BOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>Factory process diagram</title>
      <desc>{desc}</desc>

      <rect
        x={0}
        y={0}
        width={1440}
        height={604}
        fill={FILL['$bg-raised']}
        aria-hidden="true"
      />

      <g data-part="steps-row">
        {steps.map((step, i) => {
          const x = STEPS_ORIGIN.x + STEP_X[i];
          const y = STEPS_ORIGIN.y;

          return (
            <g key={step.title} data-part="step" data-index={i}>
              <rect
                x={x}
                y={y}
                width={STEP.width}
                height={STEP.height}
                rx={STEP.rx}
                fill={FILL['$surface-sunken']}
                stroke={FILL['$border-card']}
                strokeWidth={1}
              />
              <text
                x={x + INNER.x}
                y={y + INNER.numberY}
                fill={FILL['$accent-text']}
                fontSize={11}
                fontWeight={500}
                fontFamily="var(--font-mono)"
                dominantBaseline="hanging"
              >
                {stepNumber(i)}
              </text>
              <text
                x={x + INNER.x}
                y={y + INNER.titleY}
                fill={FILL['$text-primary']}
                fontSize={15}
                fontWeight={600}
                fontFamily="var(--font-sans)"
                dominantBaseline="hanging"
              >
                {step.title}
              </text>
              <rect
                x={x + INNER.x}
                y={y + INNER.dividerY}
                width={INNER.dividerW}
                height={1}
                fill={FILL['$accent-dim']}
                aria-hidden="true"
              />
              <DiagramText
                x={x + INNER.x}
                y={y + INNER.bodyY}
                width={INNER.bodyW}
                lineHeight={20}
                fill={FILL['$text-secondary']}
                fontSize={13}
                dominantBaseline="hanging"
              >
                {step.body}
              </DiagramText>
            </g>
          );
        })}

        {CONNECTOR_X.map((relX, i) => {
          const x = STEPS_ORIGIN.x + relX;
          const y = STEPS_ORIGIN.y;
          const midY = y + CONNECTOR_HAIRLINE_Y;

          return (
            <g key={`connector-${i}`} data-part="connector" data-index={i} aria-hidden="true">
              <path
                d={`M ${x} ${midY} H ${x + 24}`}
                stroke={FILL['$accent-dim']}
                strokeWidth={1}
                fill="none"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
