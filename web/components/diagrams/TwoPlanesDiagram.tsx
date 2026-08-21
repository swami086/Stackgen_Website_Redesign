import platform from '@/content/platform';
import type { DiagramProps } from '@/lib/types';

type TwoPlanesContent = typeof platform.twoPlanes;

export type TwoPlanesDiagramProps = DiagramProps & {
  planes?: TwoPlanesContent;
};

// Geometry from web/geometry/two-planes.json (node KGZ7Q)
const VIEW_BOX = '0 0 1440 165';
const Y_OFFSET = 532;
const PLANES = [
  { key: 'deterministic', x: 100, y: -492 + Y_OFFSET },
  { key: 'agentic', x: 740, y: -492 + Y_OFFSET },
] as const;
const PLANE = { width: 600, height: 85 };
const INNER = { titleY: 0, bodyY: 39 };

const FILL: Record<string, string> = {
  '$bg-raised': 'var(--color-bg-raised)',
  '$text-primary': 'var(--color-text-primary)',
  '$text-secondary': 'var(--color-text-secondary)',
};

export function TwoPlanesDiagram({
  className,
  titleId = 'two-planes-diagram-title',
  planes = platform.twoPlanes,
}: TwoPlanesDiagramProps) {
  const desc =
    'Two planes run side by side: a deterministic plane for reviewable infrastructure and policy, and an agentic plane where Aiden surfaces share one operational context graph.';

  return (
    <svg viewBox={VIEW_BOX} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>Two planes diagram</title>
      <desc>{desc}</desc>

      <rect
        x={0}
        y={0}
        width={1440}
        height={165}
        fill={FILL['$bg-raised']}
        aria-hidden="true"
      />

      {PLANES.map(({ key, x, y }, i) => {
        const plane = planes[key];
        return (
          <g key={key} data-part="plane" data-index={i}>
            <text
              x={x}
              y={y + INNER.titleY + 22}
              fill={FILL['$text-primary']}
              fontSize={22}
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              {plane.title}
            </text>
            <text
              x={x}
              y={y + INNER.bodyY + 15}
              fill={FILL['$text-secondary']}
              fontSize={15}
              fontFamily="var(--font-sans)"
            >
              {plane.body}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
