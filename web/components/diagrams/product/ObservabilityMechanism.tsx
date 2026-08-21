import productObservability from '@/content/product-observability';
import type { DiagramProps } from '@/lib/types';
import mechanismObservabilityGeometry from '../../../geometry/mechanism-observability.json';

type GeometryNode = {
  id?: string;
  name?: string | null;
  type?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string | null;
  stroke?: string | null;
  strokeWidth?: number | null;
  cornerRadius?: number | null;
  text?: string | null;
  fontSize?: number | null;
  fontWeight?: string | number | null;
  fontFamily?: string | null;
  depth?: number;
};

type GeometryFile = { viewBox: number[]; nodes: GeometryNode[] };

type ObservabilityCopy = {
  heading: string;
  body: string;
  promptLabel: string;
  prompt: string;
  signalsLabel: string;
  signalsTitle: string;
  insightLabel: string;
  insightTitle: string;
  insightBody: string;
  contextLabel: string;
  infraTitle: string;
  changeTitle: string;
  handoffLabel: string;
  handoffText: string;
};

export type ObservabilityMechanismProps = DiagramProps & {
  copy?: Partial<ObservabilityCopy>;
};

const geo = mechanismObservabilityGeometry as GeometryFile;

const DEFAULT_COPY: ObservabilityCopy = {
  heading: productObservability.mechanism.heading,
  body: 'greytHR used Aiden to replace complex queries with natural language insights and cut observability support tickets by 90 percent. The OCG links live signals to infrastructure state and change history before SRE takes over.',
  promptLabel: 'Plain-language prompt',
  prompt: 'What changed before the latency spike?',
  signalsLabel: 'Signals',
  signalsTitle: 'Metrics / Logs / Traces',
  insightLabel: 'Correlated insight',
  insightTitle: 'Signals align with the live estate.',
  insightBody: 'Aiden ties the anomaly to infrastructure state and the last approved change.',
  contextLabel: 'Context',
  infraTitle: 'Infra state',
  changeTitle: 'Change history',
  handoffLabel: 'Observe to remediate',
  handoffText:
    'Observe hands SRE a correlated starting point with state and recent changes already attached.',
};

const FILL: Record<string, string> = {
  '#F7F8F8': 'var(--color-text-primary)',
  '#8A8F98': 'var(--color-text-secondary)',
  '#A7ACB5': 'var(--color-text-secondary)',
  '#0E1014': 'var(--color-surface-card)',
  '#101217': 'var(--color-surface-sunken)',
  '#20242C': 'var(--color-border-card)',
  '#9437FF': 'var(--color-accent-text)',
  '#3B2D5B': 'var(--color-accent-dim)',
  '#5D478C': 'var(--color-accent-dim)',
};

const GRAPH_NODES = [
  {
    key: 'signals',
    frameName: 'Signals Node',
    labelName: 'Signals Node Label',
    titleName: 'Signals Node Title',
    bodyName: null,
    part: 'signals-node',
    titleSize: 20,
  },
  {
    key: 'insight',
    frameName: 'Insight Node',
    labelName: 'Insight Node Label',
    titleName: 'Insight Node Title',
    bodyName: 'Insight Node Body',
    part: 'insight-node',
    titleSize: 17,
  },
  {
    key: 'infra',
    frameName: 'Infra Node',
    labelName: 'Infra Node Label',
    titleName: 'Infra Node Title',
    bodyName: null,
    part: 'context-node',
    titleSize: 20,
  },
  {
    key: 'change',
    frameName: 'Change Node',
    labelName: 'Change Node Label',
    titleName: 'Change Node Title',
    bodyName: null,
    part: 'context-node',
    titleSize: 20,
  },
] as const;

const CONNECTORS = ['Left Link', 'Right Link', 'Branch Stem', 'Top Branch', 'Bottom Branch'] as const;
const JUNCTION_DOTS = ['Center Dot', 'Top Dot', 'Bottom Dot'] as const;

function yOffset(nodes: GeometryNode[]): number {
  return -Math.min(...nodes.map((n) => n.y));
}

function node(name: string): GeometryNode {
  const found = geo.nodes.find((n) => n.name === name);
  if (!found) throw new Error(`Missing geometry node: ${name}`);
  return found;
}

function canvasFill(token: string | null | undefined): string {
  if (!token) return 'none';
  return FILL[token] ?? 'none';
}

function fontFamily(name: string | null | undefined): string {
  return name === 'JetBrains Mono' ? 'var(--font-mono)' : 'var(--font-sans)';
}

function absInParent(parent: GeometryNode, child: GeometryNode, parentAbsY: number) {
  return {
    x: parent.x + child.x,
    y: parentAbsY + (child.y - parent.y),
    width: child.width,
    height: child.height,
    rx: child.cornerRadius ?? 0,
  };
}

function localTextY(frame: GeometryNode, textNode: GeometryNode): number {
  return textNode.y - frame.y;
}

const Y0 = yOffset(geo.nodes);
const CORR = node('Correlation Diagram');
const CORR_Y = CORR.y + Y0;
const CLUSTER = node('Correlation Cluster');
const CLUSTER_ABS = absInParent(CORR, CLUSTER, CORR_Y);

function panelChild(name: string) {
  return absInParent(CORR, node(name), CORR_Y);
}

function clusterChild(name: string) {
  return absInParent(CLUSTER, node(name), CLUSTER_ABS.y);
}

function copyForNode(key: (typeof GRAPH_NODES)[number]['key'], copy: ObservabilityCopy) {
  switch (key) {
    case 'signals':
      return { label: copy.signalsLabel, title: copy.signalsTitle, body: null };
    case 'insight':
      return { label: copy.insightLabel, title: copy.insightTitle, body: copy.insightBody };
    case 'infra':
      return { label: copy.contextLabel, title: copy.infraTitle, body: null };
    case 'change':
      return { label: copy.contextLabel, title: copy.changeTitle, body: null };
  }
}

export function ObservabilityMechanism({
  className,
  titleId = 'observability-mechanism-title',
  copy: copyOverride,
}: ObservabilityMechanismProps) {
  const copy: ObservabilityCopy = { ...DEFAULT_COPY, ...copyOverride };
  const heading = node('Heading');
  const body = node('Body');
  const promptStrip = node('Prompt Strip');
  const handoffStrip = node('Handoff Strip');
  const promptStripAbs = panelChild('Prompt Strip');
  const handoffStripAbs = panelChild('Handoff Strip');

  const desc =
    'A plain-language prompt flows from live signals through correlated insight to infrastructure state and change history, giving SRE a starting point with attribution before remediation.';

  return (
    <svg viewBox={geo.viewBox.join(' ')} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>Observability mechanism diagram</title>
      <desc>{desc}</desc>

      <g data-part="section-header">
        <text
          x={heading.x}
          y={heading.y + Y0}
          fill={canvasFill(heading.fill)}
          fontSize={heading.fontSize ?? 32}
          fontWeight={heading.fontWeight ?? 500}
          fontFamily={fontFamily(heading.fontFamily)}
          dominantBaseline="hanging"
        >
          {copy.heading}
        </text>
        <text
          x={body.x}
          y={body.y + Y0}
          fill={canvasFill(body.fill)}
          fontSize={body.fontSize ?? 16}
          fontFamily={fontFamily(body.fontFamily)}
          dominantBaseline="hanging"
        >
          {copy.body}
        </text>
      </g>

      <g data-part="correlation-panel">
        <rect
          x={CORR.x}
          y={CORR_Y}
          width={CORR.width}
          height={CORR.height}
          rx={CORR.cornerRadius ?? 22}
          fill={canvasFill(CORR.fill)}
          stroke={canvasFill(CORR.stroke)}
          strokeWidth={CORR.strokeWidth ?? 1}
          aria-hidden="true"
        />

        <g data-part="prompt-strip">
          <rect
            x={promptStripAbs.x}
            y={promptStripAbs.y}
            width={promptStripAbs.width}
            height={promptStripAbs.height}
            rx={promptStripAbs.rx}
            fill={canvasFill(promptStrip.fill)}
            stroke={canvasFill(promptStrip.stroke)}
            strokeWidth={promptStrip.strokeWidth ?? 1}
          />
          <text
            x={promptStripAbs.x + 18}
            y={promptStripAbs.y + localTextY(promptStrip, node('Prompt Label'))}
            fill={canvasFill('#9437FF')}
            fontSize={11}
            fontWeight={500}
            fontFamily="var(--font-mono)"
            dominantBaseline="hanging"
          >
            {copy.promptLabel}
          </text>
          <text
            x={promptStripAbs.x + 18}
            y={promptStripAbs.y + localTextY(promptStrip, node('Prompt Text'))}
            fill={canvasFill(node('Prompt Text').fill)}
            fontSize={18}
            fontWeight={500}
            fontFamily="var(--font-sans)"
            dominantBaseline="hanging"
          >
            {copy.prompt}
          </text>
        </g>

        <g data-part="correlation-cluster">
          {CONNECTORS.map((name, i) => {
            const link = node(name);
            const pos = absInParent(CLUSTER, link, CLUSTER_ABS.y);
            return (
              <rect
                key={name}
                x={pos.x}
                y={pos.y}
                width={link.width}
                height={link.height}
                fill={canvasFill(link.fill)}
                data-part="connector"
                data-index={i}
                aria-hidden="true"
              />
            );
          })}

          {JUNCTION_DOTS.map((name, i) => {
            const dot = node(name);
            const pos = absInParent(CLUSTER, dot, CLUSTER_ABS.y);
            return (
              <ellipse
                key={name}
                cx={pos.x + dot.width / 2}
                cy={pos.y + dot.height / 2}
                rx={dot.width / 2}
                ry={dot.height / 2}
                fill={canvasFill(dot.fill)}
                data-part="junction"
                data-index={i}
                aria-hidden="true"
              />
            );
          })}

          {GRAPH_NODES.map(({ key, frameName, labelName, titleName, bodyName, part, titleSize }, i) => {
            const frame = node(frameName);
            const frameAbs = clusterChild(frameName);
            const labels = copyForNode(key, copy);
            const labelNode = node(labelName);
            const titleNode = node(titleName);
            const bodyNode = bodyName ? node(bodyName) : null;

            return (
              <g key={key} data-part={part} data-index={i}>
                <rect
                  x={frameAbs.x}
                  y={frameAbs.y}
                  width={frameAbs.width}
                  height={frameAbs.height}
                  rx={frameAbs.rx}
                  fill={canvasFill(frame.fill)}
                  stroke={canvasFill(frame.stroke)}
                  strokeWidth={frame.strokeWidth ?? 1}
                />
                <text
                  x={frameAbs.x + 18}
                  y={frameAbs.y + localTextY(frame, labelNode)}
                  fill={canvasFill('#9437FF')}
                  fontSize={11}
                  fontWeight={500}
                  fontFamily="var(--font-mono)"
                  dominantBaseline="hanging"
                >
                  {labels.label}
                </text>
                <text
                  x={frameAbs.x + 18}
                  y={frameAbs.y + localTextY(frame, titleNode)}
                  fill={canvasFill('#F7F8F8')}
                  fontSize={titleSize}
                  fontWeight={500}
                  fontFamily="var(--font-sans)"
                  dominantBaseline="hanging"
                >
                  {labels.title}
                </text>
                {bodyNode && labels.body ? (
                  <text
                    x={frameAbs.x + 18}
                    y={frameAbs.y + localTextY(frame, bodyNode)}
                    fill={canvasFill('#8A8F98')}
                    fontSize={12}
                    fontFamily="var(--font-sans)"
                    dominantBaseline="hanging"
                  >
                    {labels.body}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>

        <g data-part="handoff-strip">
          <rect
            x={handoffStripAbs.x}
            y={handoffStripAbs.y}
            width={handoffStripAbs.width}
            height={handoffStripAbs.height}
            rx={handoffStripAbs.rx}
            fill={canvasFill(handoffStrip.fill)}
            stroke={canvasFill(handoffStrip.stroke)}
            strokeWidth={handoffStrip.strokeWidth ?? 1}
          />
          <text
            x={handoffStripAbs.x + 18}
            y={handoffStripAbs.y + localTextY(handoffStrip, node('Handoff Label'))}
            fill={canvasFill('#9437FF')}
            fontSize={11}
            fontWeight={500}
            fontFamily="var(--font-mono)"
            dominantBaseline="hanging"
          >
            {copy.handoffLabel}
          </text>
          <text
            x={handoffStripAbs.x + 18}
            y={handoffStripAbs.y + localTextY(handoffStrip, node('Handoff Text'))}
            fill={canvasFill(node('Handoff Text').fill)}
            fontSize={14}
            fontFamily="var(--font-sans)"
            dominantBaseline="hanging"
          >
            {copy.handoffText}
          </text>
        </g>
      </g>
    </svg>
  );
}
