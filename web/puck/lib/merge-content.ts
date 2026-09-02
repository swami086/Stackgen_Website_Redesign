import { replicaContent, type ReplicaContent } from "@/content/replica";
import {
  getProductContent,
  type ProductPageContent,
} from "@/content/products";
import type { ProductSlug } from "@/lib/products";

/** Editorial overrides — string fields widen beyond readonly replica literals. */
type ReplicaOverrides = {
  nav?: {
    links?: typeof replicaContent.nav.links;
    cta?: { label: string; href: string };
  };
  hero?: Partial<Record<keyof ReplicaContent["hero"], string>>;
  logos?: Partial<{ eyebrow: string }>;
  problem?: Partial<
    Record<keyof Omit<ReplicaContent["problem"], "learnMore" | "symptoms">, string>
  > & {
    learnMore?: { label: string; href: string };
  };
  solution?: Partial<Record<keyof ReplicaContent["solution"], string>>;
  assemblies?: Partial<
    Record<keyof Omit<ReplicaContent["assemblies"], "learnMore">, string>
  > & { learnMore?: { label: string; href: string } };
  shell?: Partial<Record<keyof ReplicaContent["shell"], string>>;
  whoItsFor?: Partial<
    Record<keyof Omit<ReplicaContent["whoItsFor"], "pillars" | "roles" | "osChips">, string>
  >;
  footer?: Partial<Record<keyof ReplicaContent["footer"], string>>;
};

/** Deep-merge editorial overrides onto home replica defaults. */
export function mergeReplicaContent(overrides: ReplicaOverrides): ReplicaContent {
  return {
    ...replicaContent,
    ...overrides,
    nav: {
      ...replicaContent.nav,
      ...overrides.nav,
      links: (overrides.nav?.links ?? replicaContent.nav.links) as typeof replicaContent.nav.links,
      cta: { ...replicaContent.nav.cta, ...overrides.nav?.cta },
    },
    hero: { ...replicaContent.hero, ...overrides.hero },
    logos: {
      ...replicaContent.logos,
      ...overrides.logos,
    },
    problem: { ...replicaContent.problem, ...overrides.problem },
    solution: { ...replicaContent.solution, ...overrides.solution },
    assemblies: { ...replicaContent.assemblies, ...overrides.assemblies },
    shell: { ...replicaContent.shell, ...overrides.shell },
    whoItsFor: {
      ...replicaContent.whoItsFor,
      ...overrides.whoItsFor,
    },
    footer: { ...replicaContent.footer, ...overrides.footer },
  } as ReplicaContent;
}

/** Merge Puck field overrides onto static product page content. */
export function mergeProductContent(
  slug: ProductSlug,
  patch: Record<string, unknown>,
): ProductPageContent {
  const base = getProductContent(slug);
  const p = patch as Partial<ProductPageContent>;
  return {
    ...base,
    ...patch,
    hero: { ...base.hero, ...p.hero },
    pillars: { ...base.pillars, ...p.pillars },
    logos: { ...base.logos, ...p.logos },
    problem: { ...base.problem, ...p.problem },
    video: { ...base.video, ...p.video },
    spotlight: {
      ...base.spotlight,
      ...p.spotlight,
      cards: p.spotlight?.cards ?? base.spotlight.cards,
    },
    capabilities: {
      ...base.capabilities,
      ...p.capabilities,
      items: p.capabilities?.items ?? base.capabilities.items,
    },
    platformLink: { ...base.platformLink, ...p.platformLink },
    integrations: { ...base.integrations, ...p.integrations },
    enterprise: {
      ...base.enterprise,
      ...p.enterprise,
      items: p.enterprise?.items ?? base.enterprise.items,
    },
    proof: { ...base.proof, ...p.proof },
    offers: {
      ...base.offers,
      ...p.offers,
      items: p.offers?.items ?? base.offers.items,
    },
    finalCta: { ...base.finalCta, ...p.finalCta },
    faq: {
      ...base.faq,
      ...p.faq,
      items: p.faq?.items ?? base.faq.items,
    },
    resources: {
      ...base.resources,
      ...p.resources,
      items: p.resources?.items ?? base.resources.items,
    },
    subNav: { ...base.subNav, ...p.subNav },
    flags: { ...base.flags, ...p.flags },
  };
}
