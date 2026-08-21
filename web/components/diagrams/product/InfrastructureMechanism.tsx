import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const VIEWBOX = '0 0 1240 820';
const DESC =
  'Aiden for Infrastructure shows a policy-bounded migration route across cloud providers, three supporting callouts, an Early Access migration marker, and a timeline-compression card. The diagram emphasizes translation, baseline capture, threshold rollback, and a bounded path from source infrastructure to live workloads.';

const PANEL = 'var(--color-panel)';
const PANEL_RAISED = 'var(--color-panel-raised)';
const PANEL_TEXT = 'var(--color-text-on-panel)';
const PANEL_MUTED = 'var(--color-text-muted-panel)';
const BORDER = 'var(--color-border-panel)';
const HAIRLINE = 'var(--color-border-hairline)';
const ACCENT = 'var(--color-accent)';
const CYAN = 'var(--color-accent-cyan)';
const HALT = 'var(--color-halt)';

const CALLOUTS = [
  {
    x: 862,
    y: 120,
    label: 'IaC Translation',
    body: 'Automatically translates IaC configurations for AWS to OCI.',
  },
  {
    x: 862,
    y: 302,
    label: 'Performance Baselines',
    body: 'Captures baseline metrics prior to execution.',
  },
  {
    x: 862,
    y: 484,
    label: 'Threshold Rollbacks',
    body: 'Instantly triggers rollback if safety thresholds are breached.',
  },
] as const;

const NODES = [
  { x: 184, y: 212, w: 92, h: 92, label: 'AWS' },
  { x: 182, y: 474, w: 92, h: 92, label: 'Azure' },
  { x: 512, y: 338, w: 92, h: 92, label: 'OCI' },
] as const;

export function InfrastructureMechanism({
  className,
  titleId = 'infrastructure-mechanism-title',
}: DiagramProps) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-ground="panel"
    >
      <title id={titleId}>Infrastructure mechanism diagram</title>
      <desc>{DESC}</desc>

      <rect width={1240} height={820} fill={PANEL} />

      <g data-part="migration-map">
        <rect x={36} y={86} width={710} height={530} rx={2} fill="none" stroke={BORDER} />

        <path
          d="M36 190 H82 L132 238 L132 246 L82 296 H36"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M36 286 H82 L158 360 H400 L470 302"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M36 458 H82 L158 382"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M36 544 H82 L184 446"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M602 384 H690"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M276 258 H512"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M276 520 H512"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />

        {NODES.map((node, index) => (
          <g key={node.label} data-part="cloud-node" data-index={index}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={10}
              fill={PANEL_RAISED}
              stroke={BORDER}
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + node.h / 2}
              fill={node.label === 'OCI' ? '#F33' : node.label === 'Azure' ? '#4EA7FF' : '#FFB74D'}
              fontSize={28}
              fontWeight={600}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-sans)"
            >
              {node.label}
            </text>
          </g>
        ))}

        <circle cx={118} cy={262} r={4} fill={ACCENT} data-part="junction" />
        <circle cx={330} cy={342} r={4} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={344} cy={342} r={4} fill={ACCENT} data-part="junction" />
        <circle cx={72} cy={400} r={4} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={74} cy={518} r={4} fill={PANEL_TEXT} data-part="junction" />

        <text
          x={36}
          y={662}
          fill={CYAN}
          fontSize={16}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Policy-Bounded Migration Pipeline
        </text>
        <DiagramText
          x={36}
          y={692}
          width={620}
          lineHeight={24}
          maxLines={4}
          fill={PANEL_MUTED}
          fontSize={18}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Automatic drift detection, continuous baseline audits, and instant performance rollbacks safeguard the integrity of live workloads in transit.
        </DiagramText>
      </g>

      <g data-part="callouts">
        {CALLOUTS.map((callout, index) => (
          <g key={callout.label} data-part="callout" data-index={index}>
            <text
              x={callout.x}
              y={callout.y}
              fill={CYAN}
              fontSize={20}
              fontFamily="var(--font-mono)"
              dominantBaseline="hanging"
            >
              {'{}'}
            </text>
            <text
              x={callout.x}
              y={callout.y + 36}
              fill={PANEL_TEXT}
              fontSize={18}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <DiagramText
              x={callout.x}
              y={callout.y + 68}
              width={260}
              lineHeight={22}
              maxLines={4}
              fill={PANEL_MUTED}
              fontSize={16}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.body}
            </DiagramText>
          </g>
        ))}
      </g>

      <g data-part="early-access">
        <rect x={1064} y={48} width={102} height={28} fill="none" stroke={HAIRLINE} />
        <text
          x={1115}
          y={62}
          fill={PANEL_TEXT}
          fontSize={10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          dominantBaseline="middle"
        >
          Early Access
        </text>
      </g>

      <g data-part="timeline-card">
        <rect x={860} y={538} width={312} height={170} fill="rgba(255,255,255,0.03)" stroke="none" />
        <polygon
          points="860,538 914,538 968,708 860,708"
          fill="url(#infra-prism)"
          opacity="0.95"
        />
        <text
          x={994}
          y={574}
          fill={CYAN}
          fontSize={18}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Timeline Compression
        </text>
        <text
          x={994}
          y={618}
          fill={CYAN}
          fontSize={56}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          6→9
        </text>
        <rect x={1080} y={600} width={62} height={22} fill="none" stroke={HAIRLINE} />
        <text
          x={1111}
          y={611}
          fill={PANEL_TEXT}
          fontSize={10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          dominantBaseline="middle"
        >
          Months
        </text>
        <DiagramText
          x={994}
          y={642}
          width={132}
          lineHeight={20}
          maxLines={4}
          fill={PANEL_MUTED}
          fontSize={15}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          AWS-to-OCI migration factory execution versus the usual 12 to 18 month industry standard.
        </DiagramText>
      </g>

      <g data-part="product-lockup">
        <rect x={860} y={732} width={314} height={62} fill="none" stroke={HAIRLINE} />
        <rect x={860} y={732} width={82} height={62} fill={ACCENT} />
        <text
          x={956}
          y={763}
          fill={PANEL_TEXT}
          fontSize={20}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for Infrastructure
        </text>
      </g>

      <defs>
        <linearGradient id="infra-prism" x1="860" y1="538" x2="968" y2="708" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={PANEL_TEXT} />
          <stop offset="0.45" stopColor={CYAN} />
          <stop offset="1" stopColor={ACCENT} />
        </linearGradient>
      </defs>
    </svg>
  );
}
