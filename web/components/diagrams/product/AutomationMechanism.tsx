import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const SOURCE_FRAME = { x: 66, y: 266, width: 1584, height: 751 } as const;
const VIEWBOX = `${SOURCE_FRAME.x} ${SOURCE_FRAME.y} ${SOURCE_FRAME.width} ${SOURCE_FRAME.height}`;
const DESC =
  'Aiden for Automation runs a self-verifying delivery path from source and build through staged validation, live application checks, monitoring, and an Operational Context Graph feedback loop. Active gating and self-verification cards describe how the pipeline blocks risky promotions and confirms post-release health.';

const STROKE = 'var(--color-border-hairline)';
const INK = 'var(--color-text-primary)';
const MUTED = 'var(--color-text-secondary)';
const PANEL = 'var(--color-panel)';
const PANEL_TEXT = 'var(--color-text-on-panel)';
const PANEL_MUTED = 'var(--color-text-muted-panel)';
const ACCENT = 'var(--color-accent)';
const PIPELINE_BOXES = [
  {
    x: 69,
    y: 410.378,
    w: 120.135,
    h: 99.664,
    titleX: 83.007,
    titleY: 437.314,
    titleWidth: 50.688,
    title: 'Code Repository',
    subtitleX: 83.007,
    subtitleY: 470.638,
    subtitleWidth: 34,
    subtitle: 'git',
  },
  {
    x: 69,
    y: 512.735,
    w: 120.135,
    h: 99.664,
    titleX: 83.007,
    titleY: 541.827,
    titleWidth: 46.713,
    title: 'Container Registry',
    subtitleX: 83.007,
    subtitleY: 575.994,
    subtitleWidth: 44,
    subtitle: 'docker',
  },
  {
    x: 251.089,
    y: 413.61,
    w: 95.893,
    h: 151.997,
    titleX: 260.011,
    titleY: 439.469,
    titleWidth: 33.792,
    title: 'Source',
    subtitleX: 259.708,
    subtitleY: 453.476,
    subtitleWidth: 44.725,
    subtitle: 'Code Commit',
  },
  {
    x: 357.756,
    y: 426.001,
    w: 95.893,
    h: 151.997,
    titleX: 367.756,
    titleY: 453.476,
    titleWidth: 23.853,
    title: 'Build',
    subtitleX: 367.453,
    subtitleY: 467.483,
    subtitleWidth: 58.182,
    subtitle: 'Compile Package Container',
  },
  {
    x: 464.423,
    y: 438.93,
    w: 95.893,
    h: 151.997,
    titleX: 474.423,
    titleY: 467.483,
    titleWidth: 46.713,
    title: 'Test & Validation',
    subtitleX: 474.12,
    subtitleY: 498.459,
    subtitleWidth: 58.182,
    subtitle: 'Complete Package Container',
  },
  {
    x: 571.091,
    y: 452.937,
    w: 95.893,
    h: 151.997,
    titleX: 582.943,
    titleY: 484.722,
    titleWidth: 56.651,
    title: 'Artifact Repository',
    subtitleX: 586.175,
    subtitleY: 521.086,
    subtitleWidth: 16.162,
    subtitle: '',
  },
  {
    x: 677.758,
    y: 465.328,
    w: 95.893,
    h: 151.997,
    titleX: 689.913,
    titleY: 493.341,
    titleWidth: 36.774,
    title: 'Staging Deploy',
    subtitleX: 689.61,
    subtitleY: 524.318,
    subtitleWidth: 58.182,
    subtitle: 'Provision infrastructure',
  },
  {
    x: 784.425,
    y: 478.257,
    w: 95.893,
    h: 151.997,
    titleX: 796.58,
    titleY: 508.426,
    titleWidth: 47.706,
    title: 'UAT/PERF Test',
    subtitleX: 796.277,
    subtitleY: 539.402,
    subtitleWidth: 58.182,
    subtitle: 'User Acceptance Performance',
  },
  {
    x: 891.093,
    y: 491.725,
    w: 95.893,
    h: 151.997,
    titleX: 902.17,
    titleY: 519.2,
    titleWidth: 51.682,
    title: 'Production Deploy',
    subtitleX: 901.867,
    subtitleY: 550.177,
    subtitleWidth: 58.182,
    subtitle: 'Final release, Monitoring, Logs',
  },
  {
    x: 1054.865,
    y: 522.433,
    w: 120.135,
    h: 89.967,
    titleX: 1095.808,
    titleY: 562.298,
    titleWidth: 52.676,
    title: 'Live Application',
    subtitleX: 1064.562,
    subtitleY: 561.797,
    subtitleWidth: 23.704,
    subtitle: '',
  },
  {
    x: 1054.865,
    y: 598.931,
    w: 120.135,
    h: 89.967,
    titleX: 1095.808,
    titleY: 638.797,
    titleWidth: 50.688,
    title: 'Monitoring & logs',
    subtitleX: 1066.716,
    subtitleY: 636.642,
    subtitleWidth: 18.205,
    subtitle: '',
  },
] as const;

const CHECK_LABELS = [
  { x: 362, y: 612, text: 'Code Linting' },
  { x: 474, y: 624, text: 'Security Scan' },
  { x: 590, y: 638, text: 'Unit Tests' },
  { x: 694, y: 650, text: 'Integration Tests' },
  { x: 814, y: 664, text: 'Infra Checks' },
  { x: 918, y: 676, text: 'Performance Checks' },
  { x: 1046, y: 690, text: 'Observability Checks' },
] as const;

const CALLOUTS = [
  {
    x: 864,
    y: 88,
    label: 'Active Gating',
    body: 'Gates deployments by checking current infrastructure state against historical failure patterns in the OCG.',
  },
  {
    x: 864,
    y: 296,
    label: 'Self-Verification',
    body: 'Enables deployments to verify themselves, mitigating deployment failures and infrastructure drift.',
  },
] as const;

function PipelineCard({
  x,
  y,
  w,
  h,
  titleX,
  titleY,
  titleWidth,
  title,
  subtitleX,
  subtitleY,
  subtitleWidth,
  subtitle,
}: (typeof PIPELINE_BOXES)[number]) {
  return (
    <g data-part="pipeline-card">
      <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={STROKE} strokeWidth={1} />
      {subtitle ? (
        <DiagramText
          x={subtitleX}
          y={subtitleY}
          width={Math.max(subtitleWidth, w - 18)}
          lineHeight={10}
          maxLines={3}
          fill={MUTED}
          fontSize={7.2}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          {subtitle}
        </DiagramText>
      ) : null}
      <DiagramText
        x={titleX}
        y={titleY}
        width={Math.max(titleWidth, w - 18)}
        lineHeight={14}
        maxLines={3}
        fill={INK}
        fontSize={10.8}
        fontFamily="var(--font-sans)"
        dominantBaseline="hanging"
      >
        {title}
      </DiagramText>
    </g>
  );
}

export function AutomationMechanism({
  className,
  titleId = 'automation-mechanism-title',
}: DiagramProps) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-ground="panel"
    >
      <title id={titleId}>Automation mechanism diagram</title>
      <desc>{DESC}</desc>

      <rect
        x={SOURCE_FRAME.x}
        y={SOURCE_FRAME.y}
        width={SOURCE_FRAME.width}
        height={SOURCE_FRAME.height}
        fill="var(--color-bg-base)"
      />

      <g data-part="cloud-providers" aria-hidden="true">
        <rect
          x={418.093}
          y={266}
          width={375.489}
          height={121.214}
          rx={3}
          fill="none"
          stroke={STROKE}
        />
        <text
          x={545.232}
          y={286.471}
          fill={MUTED}
          fontSize={11}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Cloud Providers
        </text>
        <text
          x={606}
          y={318}
          fill={INK}
          fontSize={16}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          AWS   Azure   K8s   GCP
        </text>
      </g>

      <g data-part="pipeline-flow" aria-hidden="true">
        <rect
          x={306.577}
          y={490.353}
          width={632.462}
          height={128.458}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        <rect
          x={297.419}
          y={664.748}
          width={637.306}
          height={103.528}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        <rect
          x={506.444}
          y={715.296}
          width={198.336}
          height={98.588}
          rx={3}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        <path
          d="M189.135 461.214 L251.089 472.4 L251.089 565.608 L571.091 604.934 L1054.865 604.934 L1054.865 566.42"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M346.982 489.609 L418.093 387.214 L793.582 387.214"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
          strokeDasharray="4 4"
        />
        <path
          d="M939.039 555.54 L1054.865 555.54"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M356.205 500.349 L445.029 512.735"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M551.697 525.665 L658.364 538.594"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M765.031 551.524 L871.698 564.453"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
      </g>

      <g data-part="pipeline-boxes">
        {PIPELINE_BOXES.map((box) => (
          <PipelineCard key={`${box.x}-${box.y}-${box.title}`} {...box} />
        ))}
      </g>

      <g data-part="pipeline-labels">
        {CHECK_LABELS.map((check, index) => (
          <text
            key={check.text}
            x={
              [
                272.217, 374.44, 495.248, 584.66, 694.576, 792.616, 898.205,
              ][index]
            }
            y={
              [
                604.319, 617.248, 632.332, 643.107, 656.036, 668.965, 681.895,
              ][index]
            }
            fill={MUTED}
            fontSize={7.2}
            fontFamily="var(--font-sans)"
            dominantBaseline="hanging"
            data-part="check-label"
            data-index={index}
          >
            {check.text}
          </text>
        ))}
      </g>

      <g data-part="ocg-card">
        <DiagramText
          x={576.478}
          y={753.006}
          width={69.386}
          lineHeight={12}
          maxLines={3}
          fill={INK}
          fontSize={10.8}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          OCG Operational Context Graph
        </DiagramText>
      </g>

      <g data-part="callouts">
        {CALLOUTS.map((callout, index) => (
          <g key={callout.label} data-part="callout" data-index={index}>
            <text
              x={1244}
              y={index === 0 ? 313 : 563}
              fill={ACCENT}
              fontSize={22}
              fontFamily="var(--font-mono)"
              dominantBaseline="hanging"
            >
              {index === 0 ? '[]' : '[]'}
            </text>
            <text
              x={1244}
              y={index === 0 ? 368 : 618}
              fill={INK}
              fontSize={24}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <DiagramText
              x={1244}
              y={index === 0 ? 412 : 662}
              width={index === 0 ? 431 : 429}
              lineHeight={25}
              maxLines={4}
              fill={MUTED}
              fontSize={18}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.body}
            </DiagramText>
          </g>
        ))}
      </g>

      <g data-part="metrics">
        <text x={66} y={925} fill={INK} fontSize={80} fontWeight={500} fontFamily="var(--font-sans)">
          {'<3%'}
        </text>
        <text
          x={66}
          y={1002}
          fill={INK}
          fontSize={22}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Change Failure Rate
        </text>

        <line x1={336} y1={949} x2={336} y2={993} stroke={ACCENT} strokeWidth={1} />

        <text x={393} y={925} fill={INK} fontSize={80} fontWeight={500} fontFamily="var(--font-sans)">
          Zero
        </text>
        <text
          x={575.5}
          y={944.5}
          fill={INK}
          fontSize={24}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          min
        </text>
        <text
          x={393}
          y={1002}
          fill={INK}
          fontSize={22}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Babysitting Pipelines
        </text>
      </g>

      <g data-part="product-lockup">
        <rect x={1244} y={933} width={406} height={83} fill={PANEL} />
        <rect x={1244} y={933} width={98} height={83} fill={ACCENT} />
        <rect x={1244} y={881} width={194} height={52} fill={PANEL} />
        <text
          x={1272}
          y={910}
          fill={PANEL_TEXT}
          fontSize={24}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          StackGen
        </text>
        <text
          x={1361}
          y={975}
          fill={PANEL_TEXT}
          fontSize={32}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for Automation
        </text>
      </g>
    </svg>
  );
}
