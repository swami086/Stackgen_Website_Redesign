import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';
import contextGraphHomeGeometry from '../../geometry/context-graph-home.json';
import contextGraphPlatformGeometry from '../../geometry/context-graph-platform.json';

export type ContextGraphProps = DiagramProps & { variant: 'home' | 'platform' };

type GeometryNode = { y: number; x: number; width: number; height: number; name?: string | null; type?: string; text?: string | null; fill?: string | null; fontSize?: number | null; fontWeight?: string | number | null; fontFamily?: string | null; depth?: number; id?: string; cornerRadius?: number | null; stroke?: string | null; strokeWidth?: number | null };

type GeometryFile = { viewBox: number[]; nodes: GeometryNode[] };

function yOffset(nodes: GeometryNode[]): number {
  return -Math.min(...nodes.map((n) => n.y));
}

function fillVar(token: string | null | undefined): string | undefined {
  if (!token?.startsWith('$')) return undefined;
  return `var(--color-${token.slice(1)})`;
}

function frameChildren(nodes: GeometryNode[], frameId: string): GeometryNode[] {
  const frame = nodes.find((n) => n.id === frameId);
  if (!frame) return [];
  const idx = nodes.findIndex((n) => n.id === frameId);
  const out: GeometryNode[] = [];
  for (let j = idx + 1; j < nodes.length; j++) {
    const n = nodes[j];
    if ((n.depth ?? 0) <= (frame.depth ?? 0)) break;
    out.push(n);
  }
  return out;
}

type HomeNode = { name: string; x: number; y: number; width: number; label: string; body: string };

function parseHomeNodes(geo: GeometryFile): HomeNode[] {
  const offset = yOffset(geo.nodes);
  const grid = geo.nodes.find((n) => n.name === 'OCG Nodes')!;
  const gridY = grid.y + offset;
  return geo.nodes
    .filter((n) => n.depth === 2 && n.name?.endsWith('Node'))
    .map((frame) => {
      const texts = frameChildren(geo.nodes, frame.id!).filter((n) => n.type === 'text');
      const label = texts.find((n) => n.name === 'Label')?.text ?? '';
      const body = texts.find((n) => n.name === 'Body')?.text ?? '';
      return {
        name: frame.name ?? '',
        x: grid.x + frame.x,
        y: gridY,
        width: frame.width,
        label,
        body,
      };
    });
}

type PlatformNode = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  label: string;
  body: string;
};

function parsePlatformLayout(geo: GeometryFile) {
  const offset = yOffset(geo.nodes);
  const panel = geo.nodes.find((n) => n.name === 'OCG Diagram Panel')!;
  const panelY = panel.y + offset;
  const px = (n: GeometryNode) => panel.x + n.x;
  const py = (n: GeometryNode) => panelY + (n.y - panel.y);

  const nodeFrames = geo.nodes.filter(
    (n) => n.depth === 2 && n.type === 'frame' && n.name?.includes('Node'),
  );
  const nodes: PlatformNode[] = nodeFrames.map((frame) => {
    const texts = frameChildren(geo.nodes, frame.id!).filter((n) => n.type === 'text');
    return {
      name: frame.name ?? '',
      x: px(frame),
      y: py(frame),
      width: frame.width,
      height: frame.height,
      rx: frame.cornerRadius ?? 20,
      label: texts.find((n) => n.name === 'Label')?.text ?? '',
      body: texts.find((n) => n.name === 'Body')?.text ?? '',
    };
  });

  const hubFrame = geo.nodes.find((n) => n.name === 'OCG Shared Intel Hub')!;
  const hubTexts = frameChildren(geo.nodes, hubFrame.id!).filter((n) => n.type === 'text');
  const hub = {
    x: px(hubFrame),
    y: py(hubFrame),
    width: hubFrame.width,
    height: hubFrame.height,
    rx: hubFrame.cornerRadius ?? 24,
    title: hubTexts.find((n) => n.name === 'Title')?.text ?? '',
    body: hubTexts.find((n) => n.name === 'Body')?.text ?? '',
    footnote: hubTexts.find((n) => n.name === 'Footnote')?.text ?? '',
  };

  const junctions = geo.nodes
    .filter((n) => n.name?.includes('Junction'))
    .map((j) => ({ x: px(j) + 4, y: py(j) + 4, name: j.name ?? '' }));

  return { panel: { x: panel.x, y: panelY, width: panel.width, height: panel.height, rx: panel.cornerRadius ?? 24 }, nodes, hub, junctions };
}

const HOME_NODES = parseHomeNodes(contextGraphHomeGeometry as GeometryFile);
const HOME_PULL = (() => {
  const geo = contextGraphHomeGeometry as GeometryFile;
  const offset = yOffset(geo.nodes);
  const frame = geo.nodes.find((n) => n.name === 'Platform Pull')!;
  const text = geo.nodes.find((n) => n.name === 'Pull')!;
  return { x: frame.x, y: frame.y + offset, text: text.text ?? '' };
})();

const PLATFORM = parsePlatformLayout(contextGraphPlatformGeometry as GeometryFile);

function HomeVariant({ titleId }: { titleId: string }) {
  const geo = contextGraphHomeGeometry as GeometryFile;
  const offset = yOffset(geo.nodes);
  const root = geo.nodes[0];
  const grid = geo.nodes.find((n) => n.name === 'OCG Nodes')!;
  const gridY = grid.y + offset;

  return (
    <>
      <rect
        x={0}
        y={0}
        width={root.width}
        height={root.height}
        fill={fillVar('$bg-raised')}
        aria-hidden="true"
      />
      <line x1={0} y1={0} x2={root.width} y2={0} stroke="var(--color-border-hairline)" aria-hidden="true" />
      <line x1={0} y1={root.height} x2={root.width} y2={root.height} stroke="var(--color-border-hairline)" aria-hidden="true" />
      <g data-part="ocg-nodes">
        <line x1={grid.x} y1={gridY} x2={grid.x + grid.width} y2={gridY} stroke="var(--color-border-hairline)" aria-hidden="true" />
        <line x1={grid.x} y1={gridY + grid.height} x2={grid.x + grid.width} y2={gridY + grid.height} stroke="var(--color-border-hairline)" aria-hidden="true" />
        {HOME_NODES.map((node, i) => (
          <g key={node.name} data-part="ocg-node" data-index={i} transform={`translate(${node.x} ${node.y})`}>
            {i < HOME_NODES.length - 1 ? (
              <line x1={node.width} y1={0} x2={node.width} y2={116} stroke="var(--color-border-hairline)" aria-hidden="true" />
            ) : null}
            <text x={16} y={38} fill="var(--color-text-primary)" fontSize={22} fontWeight={500} fontFamily="var(--font-sans)">
              {node.label}
            </text>
            <DiagramText x={16} y={72} width={216} lineHeight={20} fill="var(--color-text-secondary)" fontSize={13.5}>
              {node.body}
            </DiagramText>
          </g>
        ))}
      </g>
      <DiagramText
        data-part="platform-pull"
        x={HOME_PULL.x}
        y={HOME_PULL.y + 28}
        width={900}
        lineHeight={35}
        fill="var(--color-text-primary)"
        fontSize={26}
        fontWeight={500}
      >
        {HOME_PULL.text}
      </DiagramText>
    </>
  );
}

function PlatformVariant() {
  const { panel, nodes, hub, junctions } = PLATFORM;
  const j = Object.fromEntries(junctions.map((x) => [x.name.replace(' Junction', '').toLowerCase(), x]));

  const connectors = [
    { from: nodes[0], to: j.infrastructure },
    { from: nodes[1], to: j.change },
    { from: nodes[2], to: j.drift },
    { from: nodes[3], to: j.incident },
    { from: nodes[4], to: j.observability },
  ];

  return (
    <>
      <rect x={panel.x} y={panel.y} width={panel.width} height={panel.height} rx={panel.rx} fill={fillVar('$bg-raised')} stroke="var(--color-border-card)" aria-hidden="true" />
      {connectors.map(({ from, to }) => (
        <path
          key={`${from.name}-${to.name}`}
          d={`M${from.x + from.width / 2} ${from.y + from.height / 2} L${to.x} ${to.y} L${hub.x + hub.width / 2} ${hub.y + hub.height / 2}`}
          fill="none"
          stroke="var(--color-border-card)"
          data-part="connector"
        />
      ))}
      {junctions.map((dot, i) => (
        <circle key={dot.name} cx={dot.x} cy={dot.y} r={4} fill="var(--color-accent)" data-part="junction" data-index={i} aria-hidden="true" />
      ))}
      {nodes.map((node, i) => (
        <g key={node.name} data-part="platform-node" data-index={i}>
          <rect x={node.x} y={node.y} width={node.width} height={node.height} rx={node.rx} fill="var(--color-surface-card)" stroke="var(--color-border-card)" />
          <text x={node.x + 18} y={node.y + 38} fill="var(--color-text-primary)" fontSize={21} fontWeight={500} fontFamily="var(--font-sans)">
            {node.label}
          </text>
          <DiagramText x={node.x + 18} y={node.y + 72} width={244} lineHeight={20} fill="var(--color-text-secondary)" fontSize={13.5}>
            {node.body}
          </DiagramText>
        </g>
      ))}
      <g data-part="ocg-hub">
        <rect x={hub.x} y={hub.y} width={hub.width} height={hub.height} rx={hub.rx} fill="var(--color-bg-base)" stroke="var(--color-accent-dim)" />
        <text x={hub.x + 28} y={hub.y + 48} fill="var(--color-text-primary)" fontSize={34} fontWeight={500} fontFamily="var(--font-sans)">
          {hub.title}
        </text>
        <DiagramText x={hub.x + 28} y={hub.y + 99} width={324} lineHeight={23} fill="var(--color-text-secondary)" fontSize={15}>
          {hub.body}
        </DiagramText>
        <text x={hub.x + 28} y={hub.y + 182} fill="var(--color-accent-text)" fontSize={13} fontWeight={500} fontFamily="var(--font-sans)">
          {hub.footnote}
        </text>
      </g>
    </>
  );
}

export function OperationalContextGraph({
  className,
  titleId = 'operational-context-graph-title',
  variant = 'home',
}: ContextGraphProps) {
  const geo = (variant === 'home' ? contextGraphHomeGeometry : contextGraphPlatformGeometry) as GeometryFile;
  const viewBox = geo.viewBox.join(' ');
  const desc =
    variant === 'home'
      ? 'Five operational domains (topology, change, drift, causality, and observability) form one shared memory layer connecting the four Aiden surfaces.'
      : 'Infrastructure, change, drift, incident, and observability nodes feed a central OCG shared-intel hub for cross-domain reasoning.';

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>Operational context graph</title>
      <desc>{desc}</desc>
      {variant === 'home' ? <HomeVariant titleId={titleId} /> : <PlatformVariant />}
    </svg>
  );
}
