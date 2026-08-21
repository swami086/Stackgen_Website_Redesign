import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

export type ContextGraphProps = DiagramProps & { variant: 'home' | 'platform' };

type PlatformNode = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  body: string;
  bodyWidth: number;
  bodyMaxLines: number;
};

const PLATFORM_VIEWBOX = '0 0 1248.35205078125 555.1572265625';
const PLATFORM_SIZE = { width: 1248.35205078125, height: 555.1572265625 };
const HOME_VIEWBOX = `0 0 ${PLATFORM_SIZE.width} 332`;

const PLATFORM_NODES: PlatformNode[] = [
  {
    name: 'infrastructure',
    x: 0,
    y: 72.0209567565918,
    width: 396.11273193359375,
    height: 143.04071044921875,
    label: 'Infrastructure Topology',
    body: 'Current state and relationships of resources',
    bodyWidth: 290.0825500488281,
    bodyMaxLines: 2,
  },
  {
    name: 'change',
    x: 0,
    y: 239.06786990398407,
    width: 396.11273193359375,
    height: 143.04071044921875,
    label: 'Change Attribution',
    body: 'IaC changes and timestamps.',
    bodyWidth: 290.0825500488281,
    bodyMaxLines: 1,
  },
  {
    name: 'drift',
    x: 424.1142272949219,
    y: 412.11645388836055,
    width: 396.11273193359375,
    height: 143.04071044921875,
    label: 'Drift History',
    body: 'Divergence from desired state',
    bodyWidth: 281,
    bodyMaxLines: 1,
  },
  {
    name: 'incident',
    x: 852.2388305664062,
    y: 72.0209567565918,
    width: 396.11273193359375,
    height: 143.04071044921875,
    label: 'Incident Causality',
    body: 'Infrastructure patterns linked to incident classes.',
    bodyWidth: 276.0785827636719,
    bodyMaxLines: 2,
  },
  {
    name: 'observability',
    x: 852.2388305664062,
    y: 239.06786990398407,
    width: 396.11273193359375,
    height: 143.04071044921875,
    label: 'Observability Correlations',
    body: 'Infrastructure states linked to anomalies.',
    bodyWidth: 254,
    bodyMaxLines: 2,
  },
] as const;

const BADGE = {
  x: 521.1435546875,
  y: 0,
  width: 204.33323669433594,
  height: 63.29827117919922,
  label: 'OCG Shared Intel',
};

const ILLUSTRATION = {
  x: 463.2972717285156,
  y: 90.02475738525388,
  width: 321.09136962890625,
  height: 292.0830993652344,
  layers: [
    {
      href: '/diagram-assets/operational-context-graph/stack-layer-front.png',
      x: 21.010427851462737,
      y: 33.005615234375,
      width: 280.0314744333409,
      height: 280.02695695053444,
    },
    {
      href: '/diagram-assets/operational-context-graph/stack-layer-middle.svg',
      x: 21.010427851462737,
      y: 5,
      width: 280.0314744333409,
      height: 280.02695695053444,
    },
    {
      href: '/diagram-assets/operational-context-graph/stack-layer-back.png',
      x: 21.010427851462737,
      y: -21.007232666015625,
      width: 280.0314744333409,
      height: 280.02695695053444,
    },
  ],
  union: {
    href: '/diagram-assets/operational-context-graph/stack-union.svg',
    x: 101.04180908203125,
    y: 43.0142822265625,
    width: 161.0458984375,
    height: 110.03125,
  },
  core: {
    href: '/diagram-assets/operational-context-graph/stack-core.svg',
    x: 135.052001953125,
    y: 66.02029418945312,
    width: 92.78225708007812,
    height: 63.01753616333008,
  },
};

const CONNECTORS = {
  leftTop: {
    x1: 396.1083068847656,
    y1: 141.04061770671986,
    x2: 563.1558532714844,
    y2: 141.04061770671986,
  },
  rightTop: {
    x1: 685.2022552486094,
    y1: 141.04061770671986,
    x2: 852.2508016353281,
    y2: 141.04061770671986,
  },
  leftBottom: {
    x1: 396.1083068847656,
    y1: 304.0873401188292,
    x2: 541.1495819091797,
    y2: 304.0873401188292,
  },
  rightBottom: {
    x1: 707.1962280273438,
    y1: 304.0873401188292,
    x2: 852.2375030517578,
    y2: 304.0873401188292,
  },
  top: { x: 623.1784057617188, y1: 66.01901245117188, y2: 89.03301239013664 },
  bottom: { x: 624.173583984375, y1: 382.1088567504883, y2: 412.1310932006837 },
} as const;

const HOME_PULL =
  'One shared memory layer for the four Aiden surfaces.';

function CardLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill="var(--color-text-primary)"
      fontSize={24.007}
      fontWeight={400}
      fontFamily="var(--font-sans)"
    >
      {children}
    </text>
  );
}

function PlatformCard({
  node,
  index,
}: {
  node: PlatformNode;
  index: number;
}) {
  return (
    <g data-part="platform-node" data-index={index}>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={2.001}
        fill="var(--color-surface-card)"
      />
      <CardLabel x={node.x + 53.0115} y={node.y + 64.01935} >
        {node.label}
      </CardLabel>
      <DiagramText
        x={node.x + 53.0115}
        y={node.y + 97.0239}
        width={node.bodyWidth}
        lineHeight={25.2}
        fill="var(--color-text-secondary)"
        fontSize={18.005}
        maxLines={node.bodyMaxLines}
      >
        {node.body}
      </DiagramText>
    </g>
  );
}

function SharedIntelBadge() {
  const iconX = BADGE.x + 15.3422;
  const iconY = BADGE.y + 17.6555;
  const glyphX = iconX + 14;
  const glyphY = iconY + 14;

  return (
    <g data-part="shared-intel-badge">
      <rect
        x={BADGE.x}
        y={BADGE.y}
        width={BADGE.width}
        height={BADGE.height}
        fill="var(--color-bg-base)"
        stroke="var(--color-accent-dim)"
        strokeWidth={1.33}
      />
      <rect
        x={iconX}
        y={iconY}
        width={27.9873}
        height={27.9873}
        rx={2.112}
        fill="var(--color-bg-base)"
        stroke="var(--color-text-secondary)"
        strokeWidth={0.528}
        data-part="shared-intel-icon"
      />
      <circle cx={glyphX} cy={glyphY} r={4.8} fill="none" stroke="var(--color-accent-text)" strokeWidth={1.2} aria-hidden="true" />
      <circle cx={glyphX} cy={glyphY} r={1.8} fill="var(--color-accent-text)" aria-hidden="true" />
      <path
        d={`M${glyphX - 7} ${glyphY} H${glyphX + 7} M${glyphX} ${glyphY - 7} V${glyphY + 7}`}
        fill="none"
        stroke="var(--color-accent-text)"
        strokeWidth={1.2}
        aria-hidden="true"
      />
      <text
        x={BADGE.x + 54.9909}
        y={BADGE.y + 37.1491}
        fill="var(--color-accent-text)"
        fontSize={16.326}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {BADGE.label}
      </text>
    </g>
  );
}

function AccentConnector({
  x1,
  y1,
  x2,
  y2,
  orientation,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  orientation: 'horizontal' | 'vertical';
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g data-part="connector">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-border-card)"
        strokeWidth={1.2}
        aria-hidden="true"
      />
      {orientation === 'horizontal' ? (
        <>
          <rect x={midX - 20.5} y={midY - 2} width={41.012} height={4.001} fill="var(--color-border-card)" aria-hidden="true" />
          <rect x={midX - 29.5} y={midY - 2} width={7.002} height={4.001} fill="var(--color-accent-text)" aria-hidden="true" />
          <rect x={midX + 22.5} y={midY - 2} width={3.001} height={4.001} fill="var(--color-accent-text)" aria-hidden="true" />
          <rect x={midX + 26.5} y={midY - 2} width={3.001} height={4.001} fill="var(--color-accent-text)" aria-hidden="true" />
        </>
      ) : (
        <>
          <rect x={midX - 2} y={midY - 20.5} width={4.001} height={41.012} fill="var(--color-border-card)" aria-hidden="true" />
          <rect x={midX - 2} y={midY - 29.5} width={4.001} height={7.002} fill="var(--color-accent-text)" aria-hidden="true" />
          <rect x={midX - 2} y={midY + 22.5} width={4.001} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
          <rect x={midX - 2} y={midY + 26.5} width={4.001} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
        </>
      )}
    </g>
  );
}

function SharedIntelPlate() {
  const { x, y, width, height, layers, union, core } = ILLUSTRATION;

  return (
    <g data-part="shared-intel-plate">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="var(--color-bg-base)"
        stroke="var(--color-accent-dim)"
      />
      {layers.map((layer, index) => (
        <image
          key={index}
          x={x + layer.x}
          y={y + layer.y}
          width={layer.width}
          height={layer.height}
          href={layer.href}
          preserveAspectRatio="none"
          transform={`rotate(-44.73 ${x + layer.x + layer.width / 2} ${y + layer.y + layer.height / 2})`}
          data-part="shared-intel-stack-layer"
          aria-hidden="true"
        />
      ))}
      <image
        x={x + union.x}
        y={y + union.y}
        width={union.width}
        height={union.height}
        href={union.href}
        preserveAspectRatio="none"
        data-part="shared-intel-union"
        aria-hidden="true"
      />
      <image
        x={x + core.x}
        y={y + core.y}
        width={core.width}
        height={core.height}
        href={core.href}
        preserveAspectRatio="none"
        data-part="shared-intel-core"
        aria-hidden="true"
      />
      <rect x={x - 2} y={y + 96.03} width={3.001} height={41.012} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x - 2} y={y + 63.02} width={3.001} height={25.007} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x - 2} y={y + 55.02} width={3.001} height={5.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 12} y={y - 2} width={41.012} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 61.03} y={y - 2} width={25.007} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 89.03} y={y - 2} width={5.001} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 133.04} y={y - 2} width={5.001} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 213.07} y={y + height - 2} width={14.004} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 230.07} y={y + height - 2} width={25.007} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 258.08} y={y + height - 2} width={5.001} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + 266.08} y={y + height - 2} width={14.004} height={3.001} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + width - 2} y={y + 74.02} width={3.001} height={14.004} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + width - 2} y={y + 99.02} width={3.001} height={25.007} fill="var(--color-accent-text)" aria-hidden="true" />
      <rect x={x + width - 2} y={y + 91.02} width={3.001} height={5.001} fill="var(--color-accent-text)" aria-hidden="true" />
    </g>
  );
}

function HomeVariant() {
  const columnWidth = PLATFORM_SIZE.width / PLATFORM_NODES.length;
  const top = 44;
  const bottom = 192;
  const badgeY = 219;

  return (
    <>
      <line
        x1={0}
        y1={top}
        x2={PLATFORM_SIZE.width}
        y2={top}
        stroke="var(--color-border-hairline)"
        data-part="home-rail"
        aria-hidden="true"
      />
      <line
        x1={0}
        y1={bottom}
        x2={PLATFORM_SIZE.width}
        y2={bottom}
        stroke="var(--color-border-hairline)"
        data-part="home-rail"
        aria-hidden="true"
      />
      {PLATFORM_NODES.map((node, index) => {
        const x = index * columnWidth;
        const pad = index === 0 ? 0 : 18;
        return (
          <g
            key={node.name}
            data-part="home-node"
            data-index={index}
            transform={`translate(${x} ${top})`}
          >
            {index < PLATFORM_NODES.length - 1 ? (
              <line
                x1={columnWidth}
                y1={0}
                x2={columnWidth}
                y2={bottom - top}
                stroke="var(--color-border-hairline)"
                aria-hidden="true"
              />
            ) : null}
            <text
              x={pad}
              y={34}
              fill="var(--color-text-primary)"
              fontSize={18}
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              {node.label}
            </text>
            <DiagramText
              x={pad}
              y={66}
              width={Math.min(node.bodyWidth, columnWidth - pad - 14)}
              lineHeight={18}
              fill="var(--color-text-secondary)"
              fontSize={13}
              maxLines={3}
            >
              {node.body}
            </DiagramText>
          </g>
        );
      })}
      <line
        x1={PLATFORM_SIZE.width / 2}
        y1={bottom}
        x2={PLATFORM_SIZE.width / 2}
        y2={badgeY}
        stroke="var(--color-border-card)"
        data-part="home-badge-connector"
        aria-hidden="true"
      />
      <g data-part="home-badge" transform={`translate(${(PLATFORM_SIZE.width - BADGE.width) / 2} ${badgeY})`}>
        <rect
          x={0}
          y={0}
          width={BADGE.width}
          height={BADGE.height}
          fill="var(--color-bg-base)"
          stroke="var(--color-accent-dim)"
          strokeWidth={1.33}
        />
        <text
          x={24}
          y={37}
          fill="var(--color-accent-text)"
          fontSize={16.326}
          fontWeight={500}
          fontFamily="var(--font-sans)"
        >
          {BADGE.label}
        </text>
      </g>
      <DiagramText
        x={(PLATFORM_SIZE.width - 420) / 2}
        y={313}
        width={420}
        lineHeight={24}
        fill="var(--color-text-primary)"
        fontSize={18}
        fontWeight={500}
        maxLines={2}
        data-part="home-pull"
      >
        {HOME_PULL}
      </DiagramText>
    </>
  );
}

function PlatformVariant() {
  return (
    <>
      {PLATFORM_NODES.map((node, index) => (
        <PlatformCard key={node.name} node={node} index={index} />
      ))}
      <AccentConnector {...CONNECTORS.leftTop} orientation="horizontal" />
      <AccentConnector {...CONNECTORS.rightTop} orientation="horizontal" />
      <AccentConnector {...CONNECTORS.leftBottom} orientation="horizontal" />
      <AccentConnector {...CONNECTORS.rightBottom} orientation="horizontal" />
      <AccentConnector
        x1={CONNECTORS.top.x}
        y1={CONNECTORS.top.y1}
        x2={CONNECTORS.top.x}
        y2={CONNECTORS.top.y2}
        orientation="vertical"
      />
      <AccentConnector
        x1={CONNECTORS.bottom.x}
        y1={CONNECTORS.bottom.y1}
        x2={CONNECTORS.bottom.x}
        y2={CONNECTORS.bottom.y2}
        orientation="vertical"
      />
      <g data-part="ocg-hub">
        <SharedIntelBadge />
        <SharedIntelPlate />
      </g>
    </>
  );
}

export function OperationalContextGraph({
  className,
  titleId = 'operational-context-graph-title',
  variant = 'home',
}: ContextGraphProps) {
  const descId = `${titleId}-desc`;
  const viewBox = variant === 'home' ? HOME_VIEWBOX : PLATFORM_VIEWBOX;
  const desc =
    variant === 'home'
      ? 'Five operational domains sit in one compact shared-memory teaser: infrastructure topology, change attribution, drift history, incident causality, and observability correlations.'
      : 'Infrastructure topology, change attribution, drift history, incident causality, and observability correlations all connect through OCG Shared Intel.';

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      data-ground="panel"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>Operational Context Graph</title>
      <desc id={descId}>{desc}</desc>
      {variant === 'home' ? <HomeVariant /> : <PlatformVariant />}
    </svg>
  );
}
