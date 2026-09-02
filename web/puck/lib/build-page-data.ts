import type { Data } from "@puckeditor/core";
import { replicaContent } from "@/content/replica";
import { getProductContent } from "@/content/products";
import type { ProductSlug } from "@/lib/products";
import { PRODUCT_SLUGS } from "@/lib/products";

type PuckBlock = {
  type: string;
  props: Record<string, unknown>;
};

function block(type: string, props: Record<string, unknown>): PuckBlock {
  return { type, props: { id: type, ...props } };
}

export function buildHomePuckData(): Data {
  const c = replicaContent;
  return {
    root: {
      props: {
        title: "Home",
        pageLayout: "default",
        isHomepage: true,
        showHeader: "false",
        showFooter: "false",
      },
    },
    content: [
      block("StackGenNav", {
        links: c.nav.links,
        ctaLabel: c.nav.cta.label,
        ctaHref: c.nav.cta.href,
      }),
      block("StackGenHomeHero", { ...c.hero }),
      block("StackGenHomeLogos", { eyebrow: c.logos.eyebrow }),
      block("StackGenHomeProblem", {
        eyebrow: c.problem.eyebrow,
        heading: c.problem.heading,
        body: c.problem.body,
        filmCaption: c.problem.filmCaption,
        learnMoreLabel: c.problem.learnMore.label,
        learnMoreHref: c.problem.learnMore.href,
      }),
      block("StackGenHomeSolution", {
        eyebrow: c.solution.eyebrow,
        heading: c.solution.heading,
        body: c.solution.body,
        claim: c.solution.claim,
        demoCaption: c.solution.demoCaption,
      }),
      block("StackGenHomeAssemblies", {
        eyebrow: c.assemblies.eyebrow,
        heading: c.assemblies.heading,
        body: c.assemblies.body,
        learnMoreLabel: c.assemblies.learnMore.label,
        learnMoreHref: c.assemblies.learnMore.href,
      }),
      block("StackGenHomeShell", {
        eyebrow: c.shell.eyebrow,
        heading: c.shell.heading,
        body1: c.shell.body1,
        body2: c.shell.body2,
      }),
      block("StackGenHomeWhoItsFor", {
        eyebrow: c.whoItsFor.eyebrow,
        heading: c.whoItsFor.heading,
        sub: c.whoItsFor.sub,
        osTitle: c.whoItsFor.osTitle,
      }),
      block("StackGenFooter", {
        ctaHeading: c.footer.ctaHeading,
        ctaSub: c.footer.ctaSub,
        cta: c.footer.cta,
        ctaHref: c.footer.ctaHref,
        brand: c.footer.brand,
        legal: c.footer.legal,
      }),
    ],
    zones: {},
  } as Data;
}

export function buildProductPuckData(slug: ProductSlug): Data {
  const p = getProductContent(slug);
  const blocks: PuckBlock[] = [
    block("StackGenNav", {
      links: replicaContent.nav.links,
      ctaLabel: replicaContent.nav.cta.label,
      ctaHref: replicaContent.nav.cta.href,
    }),
  ];

  if (p.flags.subNav) {
    blocks.push(
      block("StackGenProductSubNav", {
        productSlug: slug,
        overviewLabel: p.subNav.overviewLabel,
      }),
    );
  }

  blocks.push(
    block("StackGenProductHero", {
      productSlug: slug,
      phase: p.phase,
      heading: p.hero.heading,
      subhead: p.hero.subhead,
      primaryCta: p.hero.primaryCta,
      primaryHref: p.hero.primaryHref,
      secondaryCta: p.hero.secondaryCta,
      secondaryHref: p.hero.secondaryHref,
    }),
  );

  if (p.flags.pillars) {
    blocks.push(block("StackGenProductPillars", { productSlug: slug }));
  }

  blocks.push(
    block("StackGenProductLogos", { productSlug: slug, eyebrow: p.logos.eyebrow }),
    block("StackGenProductProblem", {
      productSlug: slug,
      heading: p.problem.heading,
      body: p.problem.body,
    }),
    block("StackGenProductVideo", { productSlug: slug, caption: p.video.caption }),
    block("StackGenProductSpotlight", {
      productSlug: slug,
      heading: p.spotlight.heading,
      body: p.spotlight.body,
    }),
    block("StackGenProductCapabilities", {
      productSlug: slug,
      heading: p.capabilities.heading,
    }),
    block("StackGenProductPlatformLink", {
      productSlug: slug,
      heading: p.platformLink.heading,
      body: p.platformLink.body,
    }),
    block("StackGenProductIntegrations", {
      productSlug: slug,
      heading: p.integrations.heading,
      body: p.integrations.body,
    }),
    block("StackGenProductEnterprise", {
      productSlug: slug,
      heading: p.enterprise.heading,
    }),
    block("StackGenProductProof", {
      productSlug: slug,
      heading: p.proof.heading,
      body: p.proof.body,
    }),
  );

  if (p.flags.offers) {
    blocks.push(
      block("StackGenProductOffers", {
        productSlug: slug,
        heading: p.offers.heading,
      }),
    );
  }

  blocks.push(
    block("StackGenProductFinalCta", {
      productSlug: slug,
      heading: p.finalCta.heading,
      subhead: p.finalCta.subhead,
      cta: p.finalCta.cta,
      href: p.finalCta.href,
    }),
    block("StackGenProductFaq", {
      productSlug: slug,
      heading: p.faq.heading,
      items: p.faq.items.map((item) => ({ ...item })),
    }),
  );

  if (p.flags.resources) {
    blocks.push(
      block("StackGenProductResources", {
        productSlug: slug,
        heading: p.resources.heading,
      }),
    );
  }

  blocks.push(
    block("StackGenFooter", {
      ctaHeading: replicaContent.footer.ctaHeading,
      ctaSub: replicaContent.footer.ctaSub,
      cta: replicaContent.footer.cta,
      ctaHref: replicaContent.footer.ctaHref,
      brand: replicaContent.footer.brand,
      legal: replicaContent.footer.legal,
    }),
  );

  return {
    root: {
      props: {
        title: p.title,
        pageLayout: "default",
        isHomepage: false,
        showHeader: "false",
        showFooter: "false",
      },
    },
    content: blocks,
    zones: {},
  } as Data;
}

export function buildBlogPuckData(input: {
  title: string;
  excerpt: string;
  bodyHtml: string;
}): Data {
  return {
    root: {
      props: {
        title: input.title,
        pageLayout: "default",
        isHomepage: false,
        showHeader: "false",
        showFooter: "false",
      },
    },
    content: [
      block("StackGenNav", {
        links: replicaContent.nav.links,
        ctaLabel: replicaContent.nav.cta.label,
        ctaHref: replicaContent.nav.cta.href,
      }),
      block("StackGenBlogEyebrow", { text: "News" }),
      block("StackGenBlogTitle", { title: input.title }),
      ...(input.excerpt
        ? [block("StackGenBlogExcerpt", { excerpt: input.excerpt })]
        : []),
      block("StackGenBlogBody", { bodyHtml: input.bodyHtml }),
      block("StackGenFooter", {
        ctaHeading: replicaContent.footer.ctaHeading,
        ctaSub: replicaContent.footer.ctaSub,
        cta: replicaContent.footer.cta,
        ctaHref: replicaContent.footer.ctaHref,
        brand: replicaContent.footer.brand,
        legal: replicaContent.footer.legal,
      }),
    ],
    zones: {},
  } as Data;
}

export const ALL_PRODUCT_SLUGS = PRODUCT_SLUGS;
