import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const VIEWBOX = '66 275 1570 743';
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
      <rect x={105} y={327} width={434} height={640} fill={PANEL_RAISED} stroke={BORDER} />
      <rect
        x={105}
        y={327}
        width={434}
        height={640}
        fill="none"
        stroke="url(#sre-column-glow)"
        strokeWidth={18}
      />
      <rect x={176} y={393} width={4} height={462} rx={999} fill={BORDER} />

      {INCIDENT_STEPS.map((step, index) => {
        const y = 393 + index * 112;
        return (
          <g key={step.label} data-part="incident-step" data-index={index}>
            <rect x={148} y={y} width={60} height={60} rx={4} fill="none" stroke={HAIRLINE} />
            <circle
              cx={178}
              cy={y + 30}
              r={6}
              fill={index === 4 ? ACCENT : index === 3 ? CYAN : PANEL_TEXT}
            />
            <text
              x={243}
              y={y}
              fill={PANEL_TEXT}
              fontSize={16}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.label}
            </text>
            <DiagramText
              x={243}
              y={y + 30}
              width={253}
              lineHeight={16}
              maxLines={2}
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
    <g data-part="investigation-ladder">
      {LADDER_STEPS.map((step, index) => {
        const y = 275 + index * 95.6554;
        const part = step.refusal ? 'refusal-boundary' : 'step';
        return (
          <g key={step.title} data-part={part} data-index={index}>
            <path
              d={`M678 ${y + 2} H948 L968 ${y + 17} V${y + 67} H678 Z`}
              fill={PANEL_RAISED}
              stroke={BORDER}
            />
            <text
              x={694}
              y={y + 17}
              fill={PANEL_MUTED}
              fontSize={10}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.tag}
            </text>
            <text
              x={694}
              y={y + 42}
              fill={PANEL_TEXT}
              fontSize={12}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.title}
            </text>
            <DiagramText
              x={694}
              y={y + 56}
              width={189}
              lineHeight={11}
              maxLines={2}
              fill={PANEL_MUTED}
              fontSize={9}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {step.detail}
            </DiagramText>
            <rect x={917} y={y + 39} width={33} height={33} rx={4} fill="none" stroke={HAIRLINE} />
            {index < LADDER_STEPS.length - 1 ? (
              <>
                <circle cx={814} cy={y + 90} r={7} fill={PANEL} stroke={BORDER} />
                <rect x={813} y={y + 97} width={2} height={28} rx={999} fill={BORDER} />
              </>
            ) : null}
          </g>
        );
      })}

      <g data-part="ocg-card">
        <rect x={678} y={850} width={290} height={69} fill={PANEL_RAISED} stroke={BORDER} />
        <text
          x={694}
          y={865}
          fill={PANEL_TEXT}
          fontSize={12}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          OCG - Operational Context Graph
        </text>
        <DiagramText
          x={694}
          y={887}
          width={189}
          lineHeight={11}
          maxLines={1}
          fill={PANEL_MUTED}
          fontSize={9}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Shared memory across all agents
        </DiagramText>
      </g>

      <g data-part="policy-footer">
        <rect x={678} y={930} width={288} height={86} fill={PANEL_RAISED} stroke={BORDER} />
        <line x1={822} y1={930} x2={822} y2={1016} stroke={BORDER} />
        <DiagramText
          x={694}
          y={960}
          width={130}
          lineHeight={10}
          maxLines={2}
          fill={PANEL_MUTED}
          fontSize={9}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Temporal orchestrates sequencing
        </DiagramText>
        <DiagramText
          x={832}
          y={959}
          width={119}
          lineHeight={10}
          maxLines={3}
          fill={PANEL_MUTED}
          fontSize={7.5}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          OPA enforces policy at each action boundary
        </DiagramText>
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

      <rect x={66} y={275} width={1570} height={743} fill={PANEL} />

      <LeftIncidentColumn />
      <RightLadderColumn />

      <g data-part="product-lockup">
        <rect x={1244} y={881} width={392} height={135} fill="none" stroke={HAIRLINE} />
        <rect x={1244} y={933} width={98} height={83} fill={ACCENT} />
        <text
          x={1376}
          y={975}
          fill={PANEL_TEXT}
          fontSize={20}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for SRE
        </text>
      </g>

      <defs>
        <linearGradient id="sre-column-glow" x1="105" y1="967" x2="539" y2="327" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="0.55" stopColor="#b69df9" />
          <stop offset="1" stopColor="#f3f0ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
