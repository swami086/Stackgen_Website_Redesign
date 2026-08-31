import type { ProductSlug } from "@/lib/products";

export type DiagramPlaceholderContent = {
  /** Stable id for data-diagram-placeholder */
  id: string;
  title: string;
  subtitle: string;
  /** Deck / Pencil queue hint — mono footer */
  deck: string;
};

/**
 * New product deep-dive visual slots only (homepage keeps live diagrams + prior video plate).
 * Soft Structuralism stand-ins until Pencil → React.
 */
export const productDiagramPlaceholders = {
  "aiden-for-sre": {
    id: "product-sre-flow",
    title: "Detect → Triage → Diagnose → Remediate",
    subtitle: "SRE agent flow on your observability stack",
    deck: "Deck p23–28 · Pencil pending",
  },
  "aiden-for-infraops": {
    id: "product-infraops-ide",
    title: "Intent → Governed IaC in the IDE",
    subtitle: "1/5 → 5/5: detect, generate, govern, deploy, close the loop",
    deck: "Deck p29–30 · Pencil pending",
  },
  "aiden-for-devops": {
    id: "product-devops-compose",
    title: "IDP / ticket → blueprint compose",
    subtitle: "Blueprints, policies, and guardrails applied by design",
    deck: "Deck p31–32 · Pencil pending",
  },
  "aiden-for-observability": {
    id: "product-observability-agent",
    title: "Observe pillar · investigation agent",
    subtitle: "Work with Grafana, Datadog, New Relic, Dynatrace dashboards you already run",
    deck: "Deck p14 / p38 · Pencil pending",
  },
} as const satisfies Record<ProductSlug, DiagramPlaceholderContent>;

export function getProductDiagramPlaceholder(
  slug: ProductSlug,
): DiagramPlaceholderContent {
  return productDiagramPlaceholders[slug];
}
