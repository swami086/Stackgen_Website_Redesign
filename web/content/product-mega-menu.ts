import { productHref, type ProductPhase, type ProductSlug } from "@/lib/products";

export type ProductMegaMenuColumn = {
  phase: ProductPhase;
  title: string;
  description: string;
  slug: ProductSlug;
  capabilities: readonly [string, string, string];
};

/** Pencil BCszz catalog. SRE-primary job language. Sourcegraph control altitude. */
export const productMegaMenuContent = {
  columns: [
    {
      phase: "Build",
      title: "Aiden for InfraOps",
      description: "Policy-checked change from the IDE. Before it becomes an alert.",
      slug: "aiden-for-infraops",
      capabilities: [
        "Intent to governed IaC in the IDE",
        "Policy checked before production",
        "Audit trail with the change",
      ],
    },
    {
      phase: "Operate",
      title: "Aiden for DevOps",
      description: "Delivery from the IDP that on-call can trust.",
      slug: "aiden-for-devops",
      capabilities: [
        "Developers self-serve from the IDP",
        "Policies applied by design",
        "ServiceNow & Jira ready",
      ],
    },
    {
      phase: "Observe",
      title: "Aiden for Observability",
      description: "Investigation on Grafana. Filter false positives.",
      slug: "aiden-for-observability",
      capabilities: [
        "Investigate on your existing stack",
        "Shared context across tools",
        "Feeds Detect → Remediate",
      ],
    },
    {
      phase: "Remediate",
      title: "Aiden for SRE",
      description: "Detect the real incident. Let agents act. You keep the call.",
      slug: "aiden-for-sre",
      capabilities: [
        "Detect → Triage → Diagnose → Remediate",
        "RCA with shared context",
        "Human-approved remediation",
      ],
    },
  ] satisfies readonly ProductMegaMenuColumn[],
} as const;

export function productMegaMenuExploreHref(slug: ProductSlug): string {
  return productHref(slug);
}
