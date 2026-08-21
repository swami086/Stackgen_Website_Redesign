import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const VIEWBOX = '0 0 1240 820';
const DESC =
  'Aiden for Automation runs a self-verifying delivery path from source and build through staged validation, live application checks, monitoring, and an Operational Context Graph feedback loop. Active gating and self-verification cards describe how the pipeline blocks risky promotions and confirms post-release health.';

const STROKE = 'var(--color-border-hairline)';
const INK = 'var(--color-text-primary)';
const MUTED = 'var(--color-text-secondary)';
const PANEL = 'var(--color-panel)';
const PANEL_TEXT = 'var(--color-text-on-panel)';
const PANEL_MUTED = 'var(--color-text-muted-panel)';
const ACCENT = 'var(--color-accent)';
const ACCENT_TEXT = 'var(--color-accent-text)';
const ACCENT_CYAN = 'var(--color-accent-cyan)';

const PIPELINE_BOXES = [
  { x: 102, y: 320, w: 92, h: 116, title: 'Code Repository', subtitle: 'git' },
  { x: 102, y: 438, w: 92, h: 102, title: 'Container Registry', subtitle: 'docker' },
  { x: 224, y: 318, w: 90, h: 110, title: 'Source', subtitle: 'Code Commit' },
  { x: 348, y: 326, w: 90, h: 112, title: 'Build', subtitle: 'Compile Package Container' },
  { x: 470, y: 336, w: 96, h: 118, title: 'Test & Validation', subtitle: 'Complete Package Container' },
  { x: 596, y: 346, w: 94, h: 120, title: 'Artifact Repository', subtitle: 'Artifact Repository' },
  { x: 718, y: 356, w: 96, h: 122, title: 'Staging Deploy', subtitle: 'Provision infrastructure' },
  { x: 844, y: 366, w: 96, h: 124, title: 'UAT/PERF Test', subtitle: 'User Acceptance Performance' },
  { x: 968, y: 378, w: 96, h: 126, title: 'Production Deploy', subtitle: 'Final release, Monitoring, Logs' },
  { x: 1092, y: 410, w: 88, h: 94, title: 'Live Application', subtitle: '' },
  { x: 1092, y: 506, w: 88, h: 82, title: 'Monitoring & logs', subtitle: '' },
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
  title,
  subtitle,
}: (typeof PIPELINE_BOXES)[number]) {
  return (
    <g data-part="pipeline-card" transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={4} fill="none" stroke={STROKE} strokeWidth={1} />
      <text
        x={12}
        y={14}
        fill={INK}
        fontSize={10}
        fontFamily="var(--font-sans)"
        dominantBaseline="hanging"
      >
        {title}
      </text>
      {subtitle ? (
        <DiagramText
          x={12}
          y={34}
          width={w - 24}
          lineHeight={12}
          maxLines={3}
          fill={MUTED}
          fontSize={8}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          {subtitle}
        </DiagramText>
      ) : null}
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

      <rect width={1240} height={820} fill="var(--color-bg-base)" />

      <g data-part="cloud-providers" aria-hidden="true">
        <rect x={454} y={184} width={244} height={46} rx={3} fill="none" stroke={STROKE} />
        <text
          x={576}
          y={201}
          fill={MUTED}
          fontSize={11}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Cloud Providers
        </text>
        <text
          x={576}
          y={216}
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
        <path
          d="M194 392 L224 392 L224 584 L1036 584 L1036 522 L1092 522"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M314 378 L454 378 L454 244"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
          strokeDasharray="4 4"
        />
        <path
          d="M814 418 L864 418"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M940 432 L968 432"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M1064 470 L1092 470"
          fill="none"
          stroke={STROKE}
          strokeWidth={1.25}
        />
        <path
          d="M1064 544 L1092 544"
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
        <text
          x={252}
          y={510}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Source
        </text>
        <text
          x={376}
          y={522}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Build
        </text>
        <text
          x={500}
          y={534}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Test &amp; Validation
        </text>
        <text
          x={734}
          y={560}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Staging Deploy
        </text>
        <text
          x={858}
          y={574}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          UAT/PERF Test
        </text>
        <text
          x={982}
          y={588}
          fill={INK}
          fontSize={11}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Production Deploy
        </text>
        {CHECK_LABELS.map((check, index) => (
          <text
            key={check.text}
            x={check.x}
            y={check.y}
            fill={MUTED}
            fontSize={8}
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
        <rect x={560} y={672} width={164} height={62} rx={3} fill="none" stroke={STROKE} />
        <DiagramText
          x={574}
          y={686}
          width={136}
          lineHeight={12}
          maxLines={3}
          fill={INK}
          fontSize={9}
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
              x={callout.x}
              y={callout.y}
              fill={ACCENT}
              fontSize={22}
              fontFamily="var(--font-mono)"
              dominantBaseline="hanging"
            >
              {index === 0 ? '[]' : '[]'}
            </text>
            <text
              x={callout.x}
              y={callout.y + 36}
              fill={INK}
              fontSize={24}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <DiagramText
              x={callout.x}
              y={callout.y + 78}
              width={300}
              lineHeight={26}
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
        <text x={40} y={738} fill={INK} fontSize={56} fontWeight={500} fontFamily="var(--font-sans)">
          {'<3%'}
        </text>
        <text
          x={40}
          y={754}
          fill={INK}
          fontSize={18}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Change Failure Rate
        </text>

        <line x1={216} y1={732} x2={216} y2={786} stroke={ACCENT} strokeWidth={1} />

        <text x={256} y={738} fill={INK} fontSize={56} fontWeight={500} fontFamily="var(--font-sans)">
          Zero
        </text>
        <text
          x={402}
          y={748}
          fill={INK}
          fontSize={22}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          min
        </text>
        <text
          x={256}
          y={754}
          fill={INK}
          fontSize={18}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Babysitting Pipelines
        </text>
      </g>

      <g data-part="product-lockup">
        <rect x={866} y={706} width={306} height={74} fill={PANEL} />
        <rect x={866} y={706} width={74} height={74} fill={ACCENT} />
        <text
          x={950}
          y={752}
          fill={PANEL_TEXT}
          fontSize={20}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for Automation
        </text>
      </g>
    </svg>
  );
}
