import type { DiagramProps } from '@/lib/types';
import { DiagramText } from '../DiagramText';

const SOURCE_FRAME = { x: 66, y: 236, width: 1787, height: 781 } as const;
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

const CALLOUTS = [
  {
    x: 1236,
    y: 277,
    label: 'IaC Translation',
    body: 'Automatically translates IaC configurations for AWS to OCI.',
  },
  {
    x: 1570,
    y: 282,
    label: 'Performance Baselines',
    body: 'Captures baseline metrics prior to execution.',
  },
  {
    x: 1236,
    y: 485,
    label: 'Threshold Rollbacks',
    body: 'Instantly triggers rollback if safety thresholds are breached.',
  },
] as const;

const NODES = [
  { x: 322.881, y: 343.557, w: 130.529, h: 142.016, label: 'AWS', fill: '#FFB74D' },
  { x: 218.459, y: 666.224, w: 123.22, h: 142.016, label: 'Azure', fill: '#4EA7FF' },
  { x: 619.447, y: 488.705, w: 124.264, h: 144.105, label: 'OCI', fill: '#F33' },
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
        <rect x={66} y={236} width={779} height={639.072} rx={2} fill="none" stroke={BORDER} />

        <path
          d="M66 369 H147 L218.459 414.5"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M66 463 H149 L218.459 559 H619.447"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M66 635 H160 L218.459 590"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M66 721 H175 L218.459 699"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M453.41 414.565 H619.447"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M341.679 737.232 H619.447"
          fill="none"
          stroke={BORDER}
          strokeWidth={1.4}
        />
        <path
          d="M453.41 414.565 L619.447 560.758"
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
              fill={node.fill}
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

        <circle cx={194.236} cy={457.508} r={7.79} fill={ACCENT} data-part="junction" />
        <circle cx={316.793} cy={426.393} r={9.109} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={513.107} cy={570.496} r={9.109} fill={ACCENT} data-part="junction" />
        <circle cx={522.863} cy={569.451} r={9.109} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={114.473} cy={571.537} r={7.79} fill={PANEL_TEXT} data-part="junction" />
        <circle cx={121.808} cy={749.061} r={9.109} fill={PANEL_TEXT} data-part="junction" />

        <rect x={117.622} y={304.648} width={24.16} height={22.702} rx={1.044} fill={ACCENT} opacity={0.9} />
        <rect x={183.088} y={449.711} width={14.44} height={13.865} rx={1.044} fill={ACCENT} opacity={0.9} />
        <rect x={147.19} y={482.439} width={25.532} height={23.949} rx={1.044} fill="#6a6a6a" opacity={0.9} />
        <rect x={130.792} y={714.76} width={29.285} height={5.744} rx={1.044} fill="#6a6a6a" opacity={0.9} />
        <rect x={379.483} y={496.538} width={19.84} height={6.265} rx={1.044} fill="#6a6a6a" opacity={0.9} />
        <rect x={667.69} y={471.997} width={19.84} height={6.265} rx={1.044} fill="#6a6a6a" opacity={0.9} />
        <rect x={786.195} y={560.758} width={6.265} height={32.371} rx={1.044} fill="#6a6a6a" opacity={0.9} />

        <text
          x={66}
          y={954}
          fill={CYAN}
          fontSize={16}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          Policy-Bounded Migration Pipeline
        </text>
        <DiagramText
          x={66}
          y={981}
          width={833}
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
              y={callout.y + 67}
              fill={PANEL_TEXT}
              fontSize={24}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.label}
            </text>
            <DiagramText
              x={callout.x}
              y={callout.y + 104}
              width={index === 2 ? 310 : 277}
              lineHeight={25}
              maxLines={4}
              fill={PANEL_MUTED}
              fontSize={18}
              fontFamily="var(--font-sans)"
              dominantBaseline="hanging"
            >
              {callout.body}
            </DiagramText>
          </g>
        ))}
      </g>

      <g data-part="timeline-card">
        <rect x={1244} y={728} width={609} height={288} fill={PANEL_RAISED} stroke="none" />
        <polygon
          points="1426 686 1488 686 1542 1016 1426 1016"
          fill="url(#infra-prism)"
          opacity="0.95"
        />
        <text
          x={1490.136}
          y={781.109}
          fill={CYAN}
          fontSize={28.96}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Timeline Compression
        </text>
        <text
          x={1490.136}
          y={839.109}
          fill={CYAN}
          fontSize={68}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          6→9
        </text>
        <rect x={1616.083} y={783.109} width={91} height={40} fill="none" stroke={HAIRLINE} />
        <text
          x={1661.583}
          y={803.109}
          fill={PANEL_TEXT}
          fontSize={15.962}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          dominantBaseline="middle"
        >
          Months
        </text>
        <DiagramText
          x={1490.136}
          y={850}
          width={292}
          lineHeight={24}
          maxLines={4}
          fill={PANEL_MUTED}
          fontSize={18.957}
          fontFamily="var(--font-sans)"
          dominantBaseline="hanging"
        >
          AWS-to-OCI migration factory execution (versus 12-18 month industry standard).
        </DiagramText>
      </g>

      <defs>
        <linearGradient
          id="infra-prism"
          x1="1426"
          y1="686"
          x2="1542"
          y2="1016"
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
