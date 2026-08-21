import type { DiagramProps } from '@/lib/types';
import { DiagramText } from './DiagramText';

const CENTER_ASSET = '/diagram-assets/aiden-os-center.svg';

const VIEW_BOX = '0 0 1920 1080';

const HEADER = {
  title: { x: 66, y: 64, width: 488, fontSize: 48 },
  label: {
    x: 873,
    y: 64,
    width: 293,
    fontSize: 20,
    lineHeight: 26.4,
    maxLines: 2,
  },
  body: {
    x: 1485,
    y: 64,
    width: 370,
    fontSize: 20,
    lineHeight: 26.4,
    maxLines: 2,
  },
} as const;

const LEFT_VISUAL = {
  panel: { x: 1.6364569505131, y: 538.2189370082342, size: 476.8750915527344 },
  orbit: { x: 65.6364569505131, y: 538.2189370082342, size: 476.8750915527344 },
  core: {
    x: 165.690999492017,
    y: 634.9252434657538,
    width: 280.9561462402344,
    height: 269.28436279296875,
  },
  pattern: {
    x: 1.6364569505131,
    y: 538.2189370082342,
    width: 476.8750915527344,
    height: 476.8750915527344,
    stepX: 10.00434004282579,
    stepY: 10.8386604678817,
  },
} as const;

const CARDS = [
  {
    badge: 'TEMPORAL CORE',
    title: 'Workflow Orchestration',
    body: 'Orchestrates workflows with durability, retries, and state tracking.',
    x: 1033,
    y: 316,
    badgeWidth: 143,
    bodyMaxLines: 3,
  },
  {
    badge: 'FINANCIAL GOVERNANCE',
    title: 'Cost Governance',
    body: 'Tracks inference token spend and automatically shifts familiar workloads to cheaper, optimized models.',
    x: 1459,
    y: 316,
    badgeWidth: 194.28025817871094,
    bodyMaxLines: 4,
  },
  {
    badge: 'INTELLIGENT ROUTING',
    title: 'Model Routing',
    body: 'Selects the appropriate LLM based on task type and OCG confidence dynamically.',
    x: 607,
    y: 681,
    badgeWidth: 180,
    bodyMaxLines: 3,
  },
  {
    badge: 'NATS MESSAGING',
    title: 'Event Messaging',
    body: 'Individual agents accelerate specific tasks but fail because they do not share operational history.',
    x: 1033,
    y: 681,
    badgeWidth: 147.28025817871094,
    bodyMaxLines: 3,
  },
  {
    badge: 'OPEN POLICY AGENT',
    title: 'Policy Enforcement',
    body: 'Enforces policy at every action boundary before execution.',
    x: 1459,
    y: 681,
    badgeWidth: 163.28025817871094,
    bodyMaxLines: 2,
  },
] as const;

const CARD = {
  width: 396,
  height: 335,
  radius: 2,
  contentX: 37,
  contentY: 19,
  gapY: 24,
  bodyOffsetY: 64,
  bodyLineHeight: 25.2,
  titleFontSize: 24,
  bodyFontSize: 18,
} as const;

function patternDigit(row: number, column: number) {
  return (row * 19 + column * 31 + row * column) % 2 === 0 ? '0' : '1';
}

function CapabilityCard({
  badge,
  title,
  body,
  x,
  y,
  badgeWidth,
  bodyMaxLines,
  index,
}: {
  badge: string;
  title: string;
  body: string;
  x: number;
  y: number;
  badgeWidth: number;
  bodyMaxLines: number;
  index: number;
}) {
  const contentX = x + CARD.contentX;
  const contentY = y + CARD.contentY;

  return (
    <g data-part="capability-card" data-index={index}>
      <rect
        x={x}
        y={y}
        width={CARD.width}
        height={CARD.height}
        rx={CARD.radius}
        fill="var(--color-panel-raised)"
      />
      <g data-part="capability-badge" data-index={index}>
        <rect
          x={contentX}
          y={contentY}
          width={badgeWidth}
          height={40}
          fill="none"
          stroke="var(--color-text-muted-panel)"
          strokeWidth={1.14}
        />
        <text
          x={contentX + badgeWidth / 2}
          y={contentY + 15}
          fill="var(--color-text-muted-panel)"
          fontFamily="var(--font-sans)"
          fontSize={14}
          fontWeight={500}
          letterSpacing={-0.028}
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          {badge}
        </text>
      </g>
      <text
        data-part="capability-title"
        data-index={index}
        x={contentX}
        y={contentY + CARD.bodyOffsetY}
        fill="var(--color-text-on-panel)"
        fontFamily="var(--font-sans)"
        fontSize={CARD.titleFontSize}
        fontWeight={400}
        letterSpacing={0.24}
        dominantBaseline="hanging"
      >
        {title}
      </text>
      <DiagramText
        data-part="capability-copy"
        data-index={index}
        x={contentX}
        y={contentY + CARD.bodyOffsetY + 43}
        width={322}
        maxLines={bodyMaxLines}
        lineHeight={CARD.bodyLineHeight}
        fontSize={CARD.bodyFontSize}
        fill="var(--color-text-muted-panel)"
        dominantBaseline="hanging"
      >
        {body}
      </DiagramText>
    </g>
  );
}

export function AidenOsDiagram({
  className,
  titleId = 'aiden-os-diagram-title',
}: DiagramProps) {
  const descId = `${titleId}-desc`;
  const title =
    'Aiden OS runtime layer diagram';
  const desc =
    'Aiden OS on a dark production panel with a central runtime mark and five capability plates for workflow orchestration, cost governance, model routing, event messaging, and policy enforcement.';
  const patternColumns = Math.ceil(LEFT_VISUAL.pattern.width / LEFT_VISUAL.pattern.stepX);
  const patternRows = Math.ceil(LEFT_VISUAL.pattern.height / LEFT_VISUAL.pattern.stepY);

  return (
    <svg
      viewBox={VIEW_BOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-ground="panel"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>

      <rect
        data-part="panel-ground"
        x={0}
        y={0}
        width={1920}
        height={1080}
        fill="var(--color-panel)"
      />

      <text
        data-part="frame-title"
        x={HEADER.title.x}
        y={HEADER.title.y}
        fill="var(--color-text-on-panel)"
        fontFamily="var(--font-sans)"
        fontSize={HEADER.title.fontSize}
        fontWeight={400}
        letterSpacing={0.48}
        dominantBaseline="hanging"
      >
        Aiden OS
      </text>

      <DiagramText
        data-part="frame-label"
        x={HEADER.label.x}
        y={HEADER.label.y}
        width={HEADER.label.width}
        lineHeight={HEADER.label.lineHeight}
        fontSize={HEADER.label.fontSize}
        maxLines={HEADER.label.maxLines}
        fill="var(--color-text-on-panel)"
        dominantBaseline="hanging"
      >
        The Production-Grade Agentic Infrastructure Runtime Layer
      </DiagramText>

      <DiagramText
        data-part="frame-summary"
        x={HEADER.body.x}
        y={HEADER.body.y}
        width={HEADER.body.width}
        lineHeight={HEADER.body.lineHeight}
        fontSize={HEADER.body.fontSize}
        maxLines={HEADER.body.maxLines}
        fill="var(--color-text-on-panel)"
        dominantBaseline="hanging"
      >
        Aiden OS ensures the factory is reliable for production environments.
      </DiagramText>

      <g data-part="left-visual" aria-hidden="true">
        <clipPath id="aiden-os-visual-clip">
          <rect
            x={LEFT_VISUAL.panel.x}
            y={LEFT_VISUAL.panel.y}
            width={LEFT_VISUAL.panel.size}
            height={LEFT_VISUAL.panel.size}
          />
        </clipPath>
        <g data-part="visual-pattern" clipPath="url(#aiden-os-visual-clip)">
          {Array.from({ length: patternRows }).map((_, row) =>
            Array.from({ length: patternColumns }).map((__, column) => (
              <text
                key={`${row}-${column}`}
                x={LEFT_VISUAL.pattern.x + column * LEFT_VISUAL.pattern.stepX}
                y={LEFT_VISUAL.pattern.y + row * LEFT_VISUAL.pattern.stepY}
                fill="var(--color-border-panel)"
                fontFamily="var(--font-mono)"
                fontSize={6}
                opacity={0.85}
                dominantBaseline="hanging"
              >
                {patternDigit(row, column)}
              </text>
            )),
          )}
        </g>
        <circle
          data-part="visual-shell"
          cx={LEFT_VISUAL.orbit.x + LEFT_VISUAL.orbit.size / 2}
          cy={LEFT_VISUAL.orbit.y + LEFT_VISUAL.orbit.size / 2}
          r={LEFT_VISUAL.orbit.size / 2}
          fill="var(--color-panel)"
          stroke="var(--color-text-muted-panel)"
          strokeWidth={1}
        />
        <image
          data-part="visual-core"
          href={CENTER_ASSET}
          x={LEFT_VISUAL.core.x}
          y={LEFT_VISUAL.core.y}
          width={LEFT_VISUAL.core.width}
          height={LEFT_VISUAL.core.height}
          preserveAspectRatio="none"
        />
      </g>

      {CARDS.map((card, index) => (
        <CapabilityCard key={card.title} index={index} {...card} />
      ))}
    </svg>
  );
}
