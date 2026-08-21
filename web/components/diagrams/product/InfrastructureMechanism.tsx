import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const SOURCE_FRAME = { x: 66, y: 236, width: 1787, height: 780 } as const;
const VIEWBOX = `${SOURCE_FRAME.x} ${SOURCE_FRAME.y} ${SOURCE_FRAME.width} ${SOURCE_FRAME.height}`;
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

const sx = (value: number) => SOURCE_FRAME.x + (value / 1240) * SOURCE_FRAME.width;
const sy = (value: number) => SOURCE_FRAME.y + (value / 820) * SOURCE_FRAME.height;
const sw = (value: number) => (value / 1240) * SOURCE_FRAME.width;
const sh = (value: number) => (value / 820) * SOURCE_FRAME.height;

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

      <rect
        x={SOURCE_FRAME.x}
        y={SOURCE_FRAME.y}
        width={SOURCE_FRAME.width}
        height={SOURCE_FRAME.height}
        fill={PANEL}
      />

      <g data-part="migration-map">
        <rect x={sx(36)} y={sy(86)} width={sw(710)} height={sh(530)} rx={2} fill="none" stroke={BORDER} />

        <path
          d={`M${sx(36)} ${sy(190)} H${sx(82)} L${sx(132)} ${sy(238)} L${sx(132)} ${sy(246)} L${sx(82)} ${sy(296)} H${sx(36)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(36)} ${sy(286)} H${sx(82)} L${sx(158)} ${sy(360)} H${sx(400)} L${sx(470)} ${sy(302)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(36)} ${sy(458)} H${sx(82)} L${sx(158)} ${sy(382)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(36)} ${sy(544)} H${sx(82)} L${sx(184)} ${sy(446)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(602)} ${sy(384)} H${sx(690)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(276)} ${sy(258)} H${sx(512)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d={`M${sx(276)} ${sy(520)} H${sx(512)}`}
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />

        {NODES.map((node, index) => (
          <g key={node.label} data-part="cloud-node" data-index={index}>
            <rect
              x={sx(node.x)}
              y={sy(node.y)}
              width={sw(node.w)}
              height={sh(node.h)}
              rx={10}
              fill={PANEL_RAISED}
              stroke={BORDER}
            />
            <text
              x={sx(node.x + node.w / 2)}
              y={sy(node.y + node.h / 2)}
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

        <circle cx={sx(118)} cy={sy(262)} r={4} fill={ACCENT} data-part="junction" />
        <circle cx={sx(330)} cy={sy(342)} r={4} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={sx(344)} cy={sy(342)} r={4} fill={ACCENT} data-part="junction" />
        <circle cx={sx(72)} cy={sy(400)} r={4} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={sx(74)} cy={sy(518)} r={4} fill={PANEL_TEXT} data-part="junction" />

        <text
          x={sx(36)}
          y={sy(662)}
          fill={CYAN}
          fontSize={16}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Policy-Bounded Migration Pipeline
        </text>
        <DiagramText
          x={sx(36)}
          y={sy(692)}
          width={sw(620)}
          lineHeight={sh(24)}
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
              x={sx(callout.x)}
              y={sy(callout.y)}
              fill={CYAN}
              fontSize={20}
              fontFamily="var(--font-mono)"
              dominantBaseline="hanging"
            >
              {'{}'}
            </text>
            <text
              x={sx(callout.x)}
              y={sy(callout.y + 36)}
              fill={PANEL_TEXT}
              fontSize={18}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <DiagramText
              x={sx(callout.x)}
              y={sy(callout.y + 68)}
              width={sw(260)}
              lineHeight={sh(22)}
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
        <rect x={sx(1064)} y={sy(48)} width={sw(102)} height={sh(28)} fill="none" stroke={HAIRLINE} />
        <text
          x={sx(1115)}
          y={sy(62)}
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
        <rect
          x={sx(860)}
          y={sy(538)}
          width={sw(312)}
          height={sh(170)}
          fill="rgba(255,255,255,0.03)"
          stroke="none"
        />
        <polygon
          points={`${sx(860)},${sy(538)} ${sx(914)},${sy(538)} ${sx(968)},${sy(708)} ${sx(860)},${sy(708)}`}
          fill="url(#infra-prism)"
          opacity="0.95"
        />
        <text
          x={sx(994)}
          y={sy(574)}
          fill={CYAN}
          fontSize={18}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Timeline Compression
        </text>
        <text
          x={sx(994)}
          y={sy(618)}
          fill={CYAN}
          fontSize={56}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          6→9
        </text>
        <rect x={sx(1080)} y={sy(600)} width={sw(62)} height={sh(22)} fill="none" stroke={HAIRLINE} />
        <text
          x={sx(1111)}
          y={sy(611)}
          fill={PANEL_TEXT}
          fontSize={10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          dominantBaseline="middle"
        >
          Months
        </text>
        <DiagramText
          x={sx(994)}
          y={sy(642)}
          width={sw(132)}
          lineHeight={sh(20)}
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
        <rect x={sx(860)} y={sy(732)} width={sw(314)} height={sh(62)} fill="none" stroke={HAIRLINE} />
        <rect x={sx(860)} y={sy(732)} width={sw(82)} height={sh(62)} fill={ACCENT} />
        <text
          x={sx(956)}
          y={sy(763)}
          fill={PANEL_TEXT}
          fontSize={20}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Aiden for Infrastructure
        </text>
      </g>

      <defs>
        <linearGradient
          id="infra-prism"
          x1={sx(860)}
          y1={sy(538)}
          x2={sx(968)}
          y2={sy(708)}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={PANEL_TEXT} />
          <stop offset="0.45" stopColor={CYAN} />
          <stop offset="1" stopColor={ACCENT} />
        </linearGradient>
      </defs>
    </svg>
  );
}
