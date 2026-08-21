import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const VIEWBOX = '0 0 1240 820';
const DESC =
  'Aiden for SRE shows a bounded incident ladder from Infra Drift Present through P1 Alert Fires, Root Cause Established, Remediation Deployed, and Service Restored. The refusal boundary sits at deploy, bounded autonomy is intentional, and the policy boundary is enforced while Temporal orchestrates sequencing and OPA checks each action boundary.';

const PANEL = 'var(--color-panel)';
const PANEL_RAISED = 'var(--color-panel-raised)';
const PANEL_TEXT = 'var(--color-text-on-panel)';
const PANEL_MUTED = 'var(--color-text-muted-panel)';
const BORDER = 'var(--color-border-panel)';
const HAIRLINE = 'var(--color-border-hairline)';
const ACCENT = 'var(--color-accent)';
const CYAN = 'var(--color-accent-cyan)';

const INCIDENT_STEPS = [
  {
    label: 'Infra Drift Present',
    detail: 'Autoscaling config deviates from desired state',
  },
  {
    label: 'P1 Alert Fires',
    detail: 'Memory pressure detected on dependent services',
  },
  {
    label: 'Root Cause Established',
    detail: 'Infrastructure change traced via OCG history',
  },
  {
    label: 'Remediation Deployed',
    detail: 'Fix generated, policy-validated and applied',
  },
  {
    label: 'Service Restored',
    detail: 'SLO Recovered. 13min MTTR 0 Engineers Paged.',
  },
] as const;

const LADDER_STEPS = [
  { tag: 'Detection', title: 'Infrawatch', detail: 'Monitors IaC drift and scores risk', refusal: false },
  { tag: 'Observability', title: 'ChangeCorrelation', detail: 'Links drift to alert signals', refusal: false },
  { tag: 'Root Cause', title: 'RootCause', detail: 'Queries OCG', refusal: false },
  { tag: 'Remediation', title: 'Remediation', detail: 'Generates fix', refusal: false },
  { tag: 'Deploy', title: 'DeployAgent', detail: 'Run pipeline', refusal: true },
  { tag: 'Verification', title: 'Verification', detail: 'Confirms SLO recovery', refusal: false },
] as const;

function LeftIncidentColumn() {
  return (
    <g data-part="incident-column">
      <rect x={70} y={140} width={300} height={430} fill={PANEL_RAISED} stroke={BORDER} />
      <rect x={40} y={110} width={330} height={490} fill="none" stroke="url(#sre-column-glow)" strokeWidth={20} />
      <rect x={65} y={145} width={6} height={330} rx={999} fill={BORDER} />

      {INCIDENT_STEPS.map((step, index) => {
        const y = 182 + index * 76;
        return (
          <g key={step.label} data-part="incident-step" data-index={index}>
            <rect x={95} y={y} width={40} height={40} rx={4} fill="none" stroke={HAIRLINE} />
            <circle cx={68} cy={y + 20} r={6} fill={index === 4 ? ACCENT : index === 3 ? CYAN : PANEL_TEXT} />
            <text
              x={158}
              y={y + 1}
              fill={PANEL_TEXT}
              fontSize={16}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.label}
            </text>
            <DiagramText
              x={158}
              y={y + 22}
              width={148}
              lineHeight={16}
              maxLines={3}
              fill={PANEL_MUTED}
              fontSize={12}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.detail}
            </DiagramText>
          </g>
        );
      })}
    </g>
  );
}

function RightLadderColumn() {
  return (
    <g data-part="automation-ladder">
      {LADDER_STEPS.map((step, index) => {
        const y = 112 + index * 82;
        const part = step.refusal ? 'refusal-boundary' : 'step';
        return (
          <g key={step.title} data-part={part} data-index={index}>
            <path
              d={`M430 ${y} H570 L590 ${y + 14} V${y + 48} H430 Z`}
              fill={PANEL_RAISED}
              stroke={BORDER}
            />
            <text
              x={442}
              y={y + 10}
              fill={PANEL_MUTED}
              fontSize={10}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.tag}
            </text>
            <text
              x={442}
              y={y + 24}
              fill={PANEL_TEXT}
              fontSize={12}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.title}
            </text>
            <text
              x={442}
              y={y + 38}
              fill={PANEL_MUTED}
              fontSize={9}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.detail}
            </text>
            <rect x={545} y={y + 17} width={24} height={24} rx={4} fill="none" stroke={HAIRLINE} />
            {index < LADDER_STEPS.length - 1 ? (
              <>
                <circle cx={500} cy={y + 52} r={7} fill={PANEL} stroke={BORDER} />
                <rect x={499} y={y + 59} width={2} height={22} rx={999} fill={BORDER} />
              </>
            ) : null}
          </g>
        );
      })}

      <g data-part="ocg-card">
        <rect x={430} y={614} width={158} height={44} fill={PANEL_RAISED} stroke={BORDER} />
        <text
          x={444}
          y={626}
          fill={PANEL_TEXT}
          fontSize={12}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          OCG - Operational Context Graph
        </text>
        <text
          x={444}
          y={642}
          fill={PANEL_MUTED}
          fontSize={9}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Shared memory across all agents
        </text>
      </g>

      <g data-part="policy-footer">
        <rect x={430} y={676} width={158} height={50} fill={PANEL_RAISED} stroke={BORDER} />
        <line x1={509} y1={676} x2={509} y2={726} stroke={BORDER} />
        <text
          x={440}
          y={694}
          fill={PANEL_MUTED}
          fontSize={9}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Temporal orchestrates sequencing
        </text>
        <text
          x={520}
          y={694}
          fill={PANEL_MUTED}
          fontSize={7.5}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          OPA enforces policy at each action boundary
        </text>
      </g>
    </g>
  );
}

export function SreMechanism({
  className,
  titleId = 'sre-mechanism-title',
}: DiagramProps) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-ground="panel"
    >
      <title id={titleId}>SRE incident recovery mechanism</title>
      <desc>{DESC}</desc>

      <rect width={1240} height={820} fill={PANEL} />

      <LeftIncidentColumn />
      <RightLadderColumn />

      <g data-part="product-lockup">
        <rect x={936} y={676} width={214} height={56} fill="none" stroke={HAIRLINE} />
        <rect x={936} y={676} width={62} height={56} fill={ACCENT} />
        <text
          x={1016}
          y={704}
          fill={PANEL_TEXT}
          fontSize={20}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for SRE
        </text>
      </g>

      <defs>
        <linearGradient id="sre-column-glow" x1="20" y1="620" x2="360" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="0.55" stopColor="#b69df9" />
          <stop offset="1" stopColor="#f3f0ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
