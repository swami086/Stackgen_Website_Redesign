import { productHref, type ProductPhase, type ProductSlug } from "@/lib/products";

export type ProductMegaMenuColumn = {
  phase: ProductPhase;
  title: string;
  description: string;
  slug: ProductSlug;
  capabilities: readonly [string, string, string];
};

/** Pencil BCszz → rvmr8 catalog columns (verbatim blurbs). */
export const productMegaMenuContent = {
  columns: [
    {
      phase: "Build",
      title: "Aiden for InfraOps",
      description: "Governed IaC from intent. Lands in your Git.",
      slug: "aiden-for-infraops",
      capabilities: [
        "Intent to governed IaC in the IDE",
        "Policy checked before production",
        "Audit trail with the PR",
      ],
    },
    {
      phase: "Operate",
      title: "Aiden for DevOps",
      description: "Prompts become reviewed action across your toolchain.",
      slug: "aiden-for-devops",
      capabilities: [
        "IDP to blueprint compose",
        "Policies applied by design",
        "ServiceNow & Jira ready",
      ],
    },
    {
      phase: "Observe",
      title: "Aiden for Observability",
      description: "Managed OSS observability with an AI investigation layer.",
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
      description: "Discovery through triage to approved remediation.",
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
