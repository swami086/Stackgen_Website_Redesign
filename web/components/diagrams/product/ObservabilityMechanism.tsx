import productObservability from '@/content/product-observability';
import type { DiagramProps } from '@/lib/types';
import mechanismObservabilityGeometry from '../../../geometry/mechanism-observability.json';
import { DiagramText } from '../DiagramText';

type GeometryNode = (typeof mechanismObservabilityGeometry.nodes)[number];

type ObservabilityCopy = {
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

const DEFAULT_COPY: ObservabilityCopy = {
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

const Y0 = -Math.min(...mechanismObservabilityGeometry.nodes.map((n) => n.y));
const VIEWBOX = mechanismObservabilityGeometry.viewBox.join(' ');

function canvasFill(token: string | null | undefined): string {
  if (!token) return 'none';
  return FILL[token] ?? 'none';
}

function fontFamily(name: string | null | undefined): string {
  return name === 'JetBrains Mono' ? 'var(--font-mono)' : 'var(--font-sans)';
}

function absPositions(nodes: GeometryNode[]): Array<{ x: number; y: number }> {
  const pos: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  const stack = [0];
  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i]!;
    while (stack.length > (n.depth ?? 0)) stack.pop();
    const parent = pos[stack[stack.length - 1]!]!;
    pos[i] = {
      x: parent.x + n.x,
      y: (n.depth ?? 0) === 0 ? n.y : parent.y + n.y + Y0,
    };
    stack.push(i);
  }
  return pos;
}

function nodeIndex(name: string): number {
  const idx = mechanismObservabilityGeometry.nodes.findIndex((n) => n.name === name);
  if (idx < 0) throw new Error(`Missing geometry node: ${name}`);
  return idx;
}

const POS = absPositions(mechanismObservabilityGeometry.nodes);

function placed(name: string) {
  const idx = nodeIndex(name);
  const n = mechanismObservabilityGeometry.nodes[idx]!;
  const p = POS[idx]!;
  return { ...n, absX: p.x, absY: p.y };
}

const GRAPH_NODES = [
  {
    frameName: 'Signals Node',
    labelName: 'Signals Node Label',
    titleName: 'Signals Node Title',
    bodyName: null as string | null,
    part: 'signals-node',
    titleSize: 20,
    copyKey: 'signals' as const,
  },
  {
    frameName: 'Insight Node',
    labelName: 'Insight Node Label',
    titleName: 'Insight Node Title',
    bodyName: 'Insight Node Body',
    part: 'insight-node',
    titleSize: 17,
    copyKey: 'insight' as const,
  },
  {
    frameName: 'Infra Node',
    labelName: 'Infra Node Label',
    titleName: 'Infra Node Title',
    bodyName: null,
    part: 'context-node',
    titleSize: 20,
    copyKey: 'infra' as const,
  },
  {
    frameName: 'Change Node',
    labelName: 'Change Node Label',
    titleName: 'Change Node Title',
    bodyName: null,
    part: 'context-node',
    titleSize: 20,
    copyKey: 'change' as const,
  },
] as const;

function copyForNode(
  key: (typeof GRAPH_NODES)[number]['copyKey'],
  copy: ObservabilityCopy,
): { label: string; title: string; body: string | null } {
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

function textOffset(frameName: string, textName: string): number {
  const frame = placed(frameName);
  const text = placed(textName);
  return text.absY - frame.absY;
}

export type ObservabilityMechanismProps = DiagramProps & {
  copy?: Partial<ObservabilityCopy>;
};

export function ObservabilityMechanism({
  className,
  titleId = 'observability-mechanism-title',
  copy: copyOverride,
}: ObservabilityMechanismProps) {
  const copy: ObservabilityCopy = { ...DEFAULT_COPY, ...copyOverride };
  const corr = placed('Correlation Diagram');
  const promptStrip = placed('Prompt Strip');
  const handoffStrip = placed('Handoff Strip');

  const desc =
    'A plain-language prompt flows from live signals through correlated insight to infrastructure state and change history, giving SRE a starting point with attribution before remediation.';

  // The canvas frame reserves a heading/body band that the section renders as
  // DOM text; crop it so the diagram does not sit under a slab of empty SVG.
  const cropTop = Math.min(corr.absY, promptStrip.absY) - 40;
  const cropHeight =
    Math.max(corr.absY + corr.height, handoffStrip.absY + handoffStrip.height) +
    40 -
    cropTop;

  return (
    <svg
      viewBox={`0 ${cropTop} 1240 ${cropHeight}`}
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-ground="panel"
    >
      <title id={titleId}>Observability mechanism diagram</title>
      <desc>{desc}</desc>

      <rect x={0} y={cropTop} width={1240} height={cropHeight} fill="var(--color-panel)" />

      <g data-part="correlation-panel">
        <rect
          x={corr.absX}
          y={corr.absY}
          width={corr.width}
          height={corr.height}
          rx={corr.cornerRadius ?? 22}
          fill={canvasFill(corr.fill)}
          stroke={canvasFill(corr.stroke)}
          strokeWidth={corr.strokeWidth ?? 1}
        />

        <g data-part="prompt-strip">
          <rect
            x={promptStrip.absX}
            y={promptStrip.absY}
            width={promptStrip.width}
            height={promptStrip.height}
            rx={promptStrip.cornerRadius ?? 16}
            fill={canvasFill(promptStrip.fill)}
            stroke={canvasFill(promptStrip.stroke)}
            strokeWidth={promptStrip.strokeWidth ?? 1}
          />
          <text
            x={promptStrip.absX + 18}
            y={promptStrip.absY + textOffset('Prompt Strip', 'Prompt Label')}
            fill={canvasFill('#9437FF')}
            fontSize={11}
            fontWeight={500}
            fontFamily="var(--font-mono)"
            dominantBaseline="hanging"
          >
            {copy.promptLabel}
          </text>
          <text
            x={promptStrip.absX + 18}
            y={promptStrip.absY + textOffset('Prompt Strip', 'Prompt Text')}
            fill={canvasFill(placed('Prompt Text').fill)}
            fontSize={18}
            fontWeight={500}
            fontFamily="var(--font-sans)"
            dominantBaseline="hanging"
          >
            {copy.prompt}
          </text>
        </g>

        <g data-part="correlation-cluster">
          {(['Left Link', 'Right Link', 'Branch Stem', 'Top Branch', 'Bottom Branch'] as const).map(
            (name, i) => {
              const link = placed(name);
              return (
                <rect
                  key={name}
                  x={link.absX}
                  y={link.absY}
                  width={link.width}
                  height={link.height}
                  fill={canvasFill(link.fill)}
                  data-part="connector"
                  data-index={i}
                  aria-hidden="true"
                />
              );
            },
          )}

          {(['Center Dot', 'Top Dot', 'Bottom Dot'] as const).map((name, i) => {
            const dot = placed(name);
            return (
              <ellipse
                key={name}
                cx={dot.absX + dot.width / 2}
                cy={dot.absY + dot.height / 2}
                rx={dot.width / 2}
                ry={dot.height / 2}
                fill={canvasFill(dot.fill)}
                data-part="junction"
                data-index={i}
                aria-hidden="true"
              />
            );
          })}

          {GRAPH_NODES.map(({ frameName, labelName, titleName, bodyName, part, titleSize, copyKey }, i) => {
            const frame = placed(frameName);
            const labels = copyForNode(copyKey, copy);
            const labelY = textOffset(frameName, labelName);
            const titleY = textOffset(frameName, titleName);
            const bodyY = bodyName ? textOffset(frameName, bodyName) : 0;

            return (
              <g key={frameName} data-part={part} data-index={i}>
                <rect
                  x={frame.absX}
                  y={frame.absY}
                  width={frame.width}
                  height={frame.height}
                  rx={frame.cornerRadius ?? 0}
                  fill={canvasFill(frame.fill)}
                  stroke={canvasFill(frame.stroke)}
                  strokeWidth={frame.strokeWidth ?? 1}
                />
                <text
                  x={frame.absX + 18}
                  y={frame.absY + labelY}
                  fill={canvasFill('#9437FF')}
                  fontSize={11}
                  fontWeight={500}
                  fontFamily="var(--font-mono)"
                  dominantBaseline="hanging"
                >
                  {labels.label}
                </text>
                <text
                  x={frame.absX + 18}
                  y={frame.absY + titleY}
                  fill={canvasFill('#F7F8F8')}
                  fontSize={titleSize}
                  fontWeight={500}
                  fontFamily="var(--font-sans)"
                  dominantBaseline="hanging"
                >
                  {labels.title}
                </text>
                {bodyName && labels.body ? (
                  <DiagramText
                    x={frame.absX + 18}
                    y={frame.absY + bodyY}
                    width={frame.width - 36}
                    lineHeight={16}
                    fill={canvasFill('#8A8F98')}
                    fontSize={12}
                    dominantBaseline="hanging"
                  >
                    {labels.body}
                  </DiagramText>
                ) : null}
              </g>
            );
          })}
        </g>

        <g data-part="handoff-strip">
          <rect
            x={handoffStrip.absX}
            y={handoffStrip.absY}
            width={handoffStrip.width}
            height={handoffStrip.height}
            rx={handoffStrip.cornerRadius ?? 16}
            fill={canvasFill(handoffStrip.fill)}
            stroke={canvasFill(handoffStrip.stroke)}
            strokeWidth={handoffStrip.strokeWidth ?? 1}
          />
          <text
            x={handoffStrip.absX + 18}
            y={handoffStrip.absY + textOffset('Handoff Strip', 'Handoff Label')}
            fill={canvasFill('#9437FF')}
            fontSize={11}
            fontWeight={500}
            fontFamily="var(--font-mono)"
            dominantBaseline="hanging"
          >
            {copy.handoffLabel}
          </text>
          <text
            x={handoffStrip.absX + 18}
            y={handoffStrip.absY + textOffset('Handoff Strip', 'Handoff Text')}
            fill={canvasFill(placed('Handoff Text').fill)}
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
