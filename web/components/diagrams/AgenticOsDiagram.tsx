import type { DiagramProps } from '@/lib/types';
import agenticOsGeometry from '../../geometry/agentic-os.json';

type GeometryNode = (typeof agenticOsGeometry.nodes)[number];

function yOffset(nodes: GeometryNode[]): number {
  return -Math.min(...nodes.map((n) => n.y));
}

function fillVar(token: string | null | undefined): string | undefined {
  if (!token?.startsWith('$')) return undefined;
  return `var(--color-${token.slice(1).replace(/-/g, '-')})`;
}

function fontVar(token: string | null | undefined): string {
  if (token === '$font-mono') return 'var(--font-mono)';
  return 'var(--font-sans)';
}

type AgentCard = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  promise: string;
  metrics: Array<{ value: string; label: string; rowY: number }>;
  capabilities: string[];
  cta: string;
  ctaY: number;
};

function parseAgentCards(): AgentCard[] {
  const nodes = agenticOsGeometry.nodes;
  const offset = yOffset(nodes);
  const grid = nodes.find((n) => n.name === 'Agent Grid')!;
  const gridY = grid.y + offset;
  const cardFrames = nodes.filter((n) => n.depth === 2 && n.name?.startsWith('Aiden for'));

  return cardFrames.map((frame) => {
    const idx = nodes.findIndex((n) => n.id === frame.id);
    const card: AgentCard = {
      name: frame.name ?? '',
      x: grid.x + frame.x,
      y: gridY,
      width: frame.width,
      height: frame.height,
      promise: '',
      metrics: [],
      capabilities: [],
      cta: '',
      ctaY: frame.height - 49,
    };

    for (let j = idx + 1; j < nodes.length; j++) {
      const n = nodes[j];
      if (n.depth <= frame.depth) break;

      if (n.name === 'Promise' && n.type === 'text' && n.text) {
        card.promise = n.text;
      }

      if (
        n.type === 'frame' &&
        n.depth === 4 &&
        n.name !== 'Metrics' &&
        n.name !== 'Capabilities' &&
        n.name !== 'Agent Head' &&
        n.name !== 'Card CTA'
      ) {
        const value = nodes[j + 1];
        const label = nodes[j + 2];
        if (value?.name === 'Value' && label?.name === 'Label') {
          card.metrics.push({
            value: value.text ?? '',
            label: label.text ?? '',
            rowY: n.y - frame.y + 100 + 16,
          });
        }
      }

      if (n.name === 'Label' && n.type === 'text' && n.fontSize === 12.5 && n.x >= 22) {
        card.capabilities.push(n.text ?? '');
      }

      if (n.name === 'Label' && n.type === 'text' && n.fill === '$accent-text') {
        card.cta = n.text ?? '';
        card.ctaY = n.y - frame.y;
      }
    }

    return card;
  });
}

const AGENT_CARDS = parseAgentCards();
const CLOSER = (() => {
  const nodes = agenticOsGeometry.nodes;
  const offset = yOffset(nodes);
  const frame = nodes.find((n) => n.name === 'Band Closer')!;
  const text = nodes.find((n) => n.name === 'Closer')!;
  return { x: frame.x, y: frame.y + offset, text: text.text ?? '' };
})();

const VIEWBOX = agenticOsGeometry.viewBox.join(' ');

function Tick({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y + 7} L${x + 4} ${y + 11} L${x + 11} ${y + 2}`}
      fill="none"
      stroke="var(--color-text-tertiary)"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

function AgentCardSvg({ card, index }: { card: AgentCard; index: number }) {
  const padX = index === 0 ? 0 : 26;
  const innerW = card.width - padX;

  return (
    <g
      data-part="agent-card"
      data-index={index}
      transform={`translate(${card.x} ${card.y})`}
    >
      {index < 3 ? (
        <line
          x1={card.width}
          y1={0}
          x2={card.width}
          y2={card.height}
          stroke="var(--color-border-hairline)"
          aria-hidden="true"
        />
      ) : null}
      <text
        x={padX}
        y={23}
        fill="var(--color-text-primary)"
        fontSize={19}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {card.name}
      </text>
      <text
        x={padX}
        y={55}
        fill="var(--color-text-secondary)"
        fontSize={13.5}
        fontFamily="var(--font-sans)"
      >
        {card.promise}
      </text>
      <line
        x1={padX}
        y1={90}
        x2={padX + innerW}
        y2={90}
        stroke="var(--color-border-hairline)"
        aria-hidden="true"
      />
      <line
        x1={padX}
        y1={218}
        x2={padX + innerW}
        y2={218}
        stroke="var(--color-border-hairline)"
        aria-hidden="true"
      />
      {card.metrics.map((metric, i) => (
        <g key={metric.label} data-part="metric" data-index={i}>
          <text
            x={padX}
            y={metric.rowY}
            fill="var(--color-text-primary)"
            fontSize={13}
            fontFamily="var(--font-mono)"
          >
            {metric.value}
          </text>
          <text
            x={padX + 66}
            y={metric.rowY}
            fill="var(--color-text-tertiary)"
            fontSize={11.5}
            fontFamily="var(--font-sans)"
          >
            {metric.label}
          </text>
        </g>
      ))}
      {card.capabilities.map((cap, i) => (
        <g key={cap} data-part="capability" data-index={i}>
          <Tick x={padX} y={246 + i * 27} />
          <text
            x={padX + 22}
            y={262 + i * 27}
            fill="var(--color-text-secondary)"
            fontSize={12.5}
            fontFamily="var(--font-sans)"
          >
            {cap}
          </text>
        </g>
      ))}
      <text
        x={padX + (card.cta.startsWith('Try') ? 0 : 0)}
        y={card.ctaY + 15}
        fill="var(--color-accent-text)"
        fontSize={12.5}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {card.cta}
      </text>
      <path
        d={`M${padX + card.cta.length * 6.5} ${card.ctaY + 11} L${padX + card.cta.length * 6.5 + 9} ${card.ctaY + 11} L${padX + card.cta.length * 6.5 + 5} ${card.ctaY + 7} M${padX + card.cta.length * 6.5 + 9} ${card.ctaY + 11} L${padX + card.cta.length * 6.5 + 5} ${card.ctaY + 15}`}
        fill="none"
        stroke="var(--color-accent-text)"
        strokeWidth={1.2}
        aria-hidden="true"
      />
    </g>
  );
}

export function AgenticOsDiagram({
  className,
  titleId = 'agentic-os-diagram-title',
}: DiagramProps) {
  const offset = yOffset(agenticOsGeometry.nodes);
  const grid = agenticOsGeometry.nodes.find((n) => n.name === 'Agent Grid')!;
  const gridY = grid.y + offset;

  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      fill={fillVar('$bg-base')}
    >
      <title id={titleId}>Agentic OS diagram</title>
      <desc>
        Four Aiden product surfaces — Infrastructure, Automation, Observability, and SRE —
        share one Agentic OS; each card lists metrics, capabilities, and an explore label.
      </desc>
      <g data-part="agent-grid">
        <line
          x1={grid.x}
          y1={gridY}
          x2={grid.x + grid.width}
          y2={gridY}
          stroke="var(--color-border-hairline)"
          aria-hidden="true"
        />
        {AGENT_CARDS.map((card, i) => (
          <AgentCardSvg key={card.name} card={card} index={i} />
        ))}
      </g>
      <text
        data-part="band-closer"
        x={CLOSER.x}
        y={CLOSER.y + 48}
        fill="var(--color-text-primary)"
        fontSize={24}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {CLOSER.text}
      </text>
    </svg>
  );
}
