import Link from 'next/link';
import platform from '@/content/platform';
import type { DiagramProps } from '@/lib/types';

type AidenOsContent = typeof platform.aidenOs;
type ProductLinksContent = typeof platform.productLinks;

export type AidenOsLinksDiagramProps = DiagramProps & {
  aidenOs?: AidenOsContent;
  productLinks?: ProductLinksContent;
};

// Geometry from web/geometry/aiden-os-links.json (node gWRK3)
const VIEW_BOX = '0 0 1440 846';
const Y_OFFSET = 1622;

const LAYOUT = {
  heading: { x: 100, y: -1586 + Y_OFFSET },
  body: { x: 100, y: -1532 + Y_OFFSET },
  modules: [
    { x: 100, y: -1462 + Y_OFFSET, width: 1240, height: 102, rx: 20 },
    { x: 100, y: -1340 + Y_OFFSET, width: 1240, height: 102, rx: 20 },
  ],
  roadmap: { x: 100, y: -1218 + Y_OFFSET, width: 1240, height: 197, rx: 20, padX: 20 },
  linksHeading: { x: 100, y: -1001 + Y_OFFSET },
  linkYs: [-947, -905, -863, -821].map((y) => y + Y_OFFSET),
  linkX: 100,
} as const;

const FILL: Record<string, string> = {
  '$bg-raised': 'var(--color-bg-raised)',
  '$border-card': 'var(--color-border-card)',
  '$text-primary': 'var(--color-text-primary)',
  '$text-secondary': 'var(--color-text-secondary)',
  '$accent-text': 'var(--color-accent-text)',
};

function ModuleCard({
  x,
  y,
  width,
  height,
  rx,
  title,
  body,
  index,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <g data-part="module" data-index={index}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={FILL['$bg-raised']}
        stroke={FILL['$border-card']}
        strokeWidth={1}
      />
      <text
        x={x + 20}
        y={y + 27}
        fill={FILL['$text-primary']}
        fontSize={22}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {title}
      </text>
      <text
        x={x + 20}
        y={y + 66}
        fill={FILL['$text-secondary']}
        fontSize={15.5}
        fontFamily="var(--font-sans)"
      >
        {body}
      </text>
    </g>
  );
}

export function AidenOsLinksDiagram({
  className,
  titleId = 'aiden-os-links-diagram-title',
  aidenOs = platform.aidenOs,
  productLinks = platform.productLinks,
}: AidenOsLinksDiagramProps) {
  const { roadmap } = aidenOs;
  const desc =
    'Aiden OS coordinates workflow orchestration and financial governance, with a roadmap of available and upcoming surfaces, then links to the four Aiden product routes.';

  return (
    <svg viewBox={VIEW_BOX} className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>Aiden OS and product links diagram</title>
      <desc>{desc}</desc>

      <text
        data-part="aiden-os-heading"
        x={LAYOUT.heading.x}
        y={LAYOUT.heading.y + 28}
        fill={FILL['$text-primary']}
        fontSize={28}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {aidenOs.heading}
      </text>
      <text
        data-part="aiden-os-body"
        x={LAYOUT.body.x}
        y={LAYOUT.body.y + 16}
        fill={FILL['$text-secondary']}
        fontSize={16}
        fontFamily="var(--font-sans)"
      >
        {aidenOs.body}
      </text>

      {aidenOs.features.map((feature, i) => (
        <ModuleCard
          key={feature.title}
          {...LAYOUT.modules[i]}
          title={feature.title}
          body={feature.body}
          index={i}
        />
      ))}

      <g data-part="roadmap">
        <rect
          x={LAYOUT.roadmap.x}
          y={LAYOUT.roadmap.y}
          width={LAYOUT.roadmap.width}
          height={LAYOUT.roadmap.height}
          rx={LAYOUT.roadmap.rx}
          fill={FILL['$bg-raised']}
          stroke={FILL['$border-card']}
          strokeWidth={1}
        />
        <text
          x={LAYOUT.roadmap.x + LAYOUT.roadmap.padX}
          y={LAYOUT.roadmap.y + 24}
          fill={FILL['$text-primary']}
          fontSize={20}
          fontWeight={500}
          fontFamily="var(--font-sans)"
        >
          {roadmap.label}
        </text>
        <text
          x={LAYOUT.roadmap.x + LAYOUT.roadmap.padX}
          y={LAYOUT.roadmap.y + 60}
          fill={FILL['$accent-text']}
          fontSize={13}
          fontWeight={500}
          fontFamily="var(--font-sans)"
        >
          {roadmap.note}
        </text>
        {roadmap.items.map((item, i) => (
          <text
            key={item}
            data-part="roadmap-item"
            data-index={i}
            x={LAYOUT.roadmap.x + LAYOUT.roadmap.padX}
            y={LAYOUT.roadmap.y + 90 + i * 35}
            fill={FILL['$text-secondary']}
            fontSize={15}
            fontFamily="var(--font-sans)"
          >
            {item}
          </text>
        ))}
      </g>

      <text
        data-part="links-heading"
        x={LAYOUT.linksHeading.x}
        y={LAYOUT.linksHeading.y + 28}
        fill={FILL['$text-primary']}
        fontSize={28}
        fontWeight={500}
        fontFamily="var(--font-sans)"
      >
        {productLinks.heading}
      </text>

      {productLinks.products.map((product, i) => (
        <Link
          key={product.href}
          href={product.href}
          data-part="product-link"
          data-index={i}
        >
          <text
            x={LAYOUT.linkX}
            y={LAYOUT.linkYs[i] + 18}
            fill={FILL['$text-secondary']}
            fontSize={18}
            fontFamily="var(--font-sans)"
          >
            {product.name}
          </text>
        </Link>
      ))}
    </svg>
  );
}
