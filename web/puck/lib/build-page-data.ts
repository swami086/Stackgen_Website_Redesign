import type { Data } from "@puckeditor/core";
import { replicaContent, type ReplicaContent } from "@/content/replica";
import { paragraphsFromHtml } from "@/puck/lib/blog-html";
import { getProductContent, type ProductPageContent } from "@/content/products";
import type { ProductSlug } from "@/lib/products";
import { PRODUCT_SLUGS } from "@/lib/products";

type PuckBlock = {
  type: string;
  props: Record<string, unknown>;
};

function block(type: string, props: Record<string, unknown>): PuckBlock {
  return { type, props: { id: type, ...props } };
}

/** Shared StackGenNav props — keeps mega-menu columns in sync across home/product/blog seeds. */
function navBlockProps(nav: ReplicaContent["nav"]) {
  return {
    links: nav.links,
    ctaLabel: nav.cta.label,
    ctaHref: nav.cta.href,
    megaMenu: nav.megaMenu.columns.map((col) => ({
      ...col,
      capabilities: col.capabilities.map((text) => ({ text })),
    })),
  };
}

export function buildHomePuckData(): Data {
  return buildHomePuckDataFromContent(replicaContent);
}

export function buildHomePuckDataFromContent(c: ReplicaContent): Data {
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
      block("StackGenNav", navBlockProps(c.nav)),
      block("StackGenHomeHero", { ...c.hero }),
      block("StackGenHomeLogos", {
        eyebrow: c.logos.eyebrow,
        items: c.logos.items.map((logo) => ({ src: logo.src, alt: logo.alt })),
      }),
      block("StackGenHomeProblem", {
        eyebrow: c.problem.eyebrow,
        heading: c.problem.heading,
        body: c.problem.body,
        punchline: c.problem.punchline,
        filmCaption: c.problem.filmCaption,
        learnMoreLabel: c.problem.learnMore.label,
        learnMoreHref: c.problem.learnMore.href,
        symptoms: c.problem.symptoms.map((title) => ({ title })),
      }),
      block("StackGenHomeSolution", {
        eyebrow: c.solution.eyebrow,
        heading: c.solution.heading,
        body: c.solution.body,
        claim: c.solution.claim,
        demoLabelLeft: c.solution.demoLabelLeft,
        demoLabelRight: c.solution.demoLabelRight,
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
        pillars: c.whoItsFor.pillars.map((p) => ({
          ...p,
          image: { id: p.title, url: p.image.url, alt: p.image.alt },
        })),
        roles: c.whoItsFor.roles.map((r) => ({ ...r })),
        osChips: c.whoItsFor.osChips.map((label) => ({ label })),
      }),
      block("StackGenFooter", {
        ctaHeading: c.footer.ctaHeading,
        ctaSub: c.footer.ctaSub,
        cta: c.footer.cta,
        ctaHref: c.footer.ctaHref,
        brand: c.footer.brand,
        company: c.footer.company.map((label) => ({ label })),
        legal: c.footer.legal,
        legalLinks: c.footer.legalLinks.map((label) => ({ label })),
      }),
    ],
    zones: {},
  } as Data;
}

export function buildProductPuckData(slug: ProductSlug): Data {
  return buildProductPuckDataFromContent(slug, getProductContent(slug));
}

export function buildProductPuckDataFromContent(
  slug: ProductSlug,
  p: ProductPageContent,
): Data {
  const blocks: PuckBlock[] = [block("StackGenNav", navBlockProps(replicaContent.nav))];

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
    blocks.push(
      block("StackGenProductPillars", {
        productSlug: slug,
        items: p.pillars.items.map((item) => ({ ...item })),
      }),
    );
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
      cards: p.spotlight.cards.map((item) => ({ ...item })),
    }),
    block("StackGenProductCapabilities", {
      productSlug: slug,
      heading: p.capabilities.heading,
      items: p.capabilities.items.map((item) => ({ ...item })),
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
      items: p.enterprise.items.map((item) => ({ ...item })),
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
        items: p.offers.items.map((item) => ({ ...item })),
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
        items: p.resources.items.map((item) => ({ ...item })),
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
      company: replicaContent.footer.company.map((label) => ({ label })),
      legal: replicaContent.footer.legal,
      legalLinks: replicaContent.footer.legalLinks.map((label) => ({ label })),
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
  const paragraphs = paragraphsFromHtml(input.bodyHtml);
  const bodyBlocks = paragraphs.map((text, index) =>
    block("StackGenBlogParagraph", {
      id: `blog-paragraph-${index}`,
      text,
    }),
  );

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
      block("StackGenNav", navBlockProps(replicaContent.nav)),
      block("StackGenBlogEyebrow", { text: "News" }),
      block("StackGenBlogTitle", { title: input.title }),
      ...(input.excerpt
        ? [block("StackGenBlogExcerpt", { excerpt: input.excerpt })]
        : []),
      ...bodyBlocks,
      block("StackGenFooter", {
        ctaHeading: replicaContent.footer.ctaHeading,
        ctaSub: replicaContent.footer.ctaSub,
        cta: replicaContent.footer.cta,
        ctaHref: replicaContent.footer.ctaHref,
        brand: replicaContent.footer.brand,
        company: replicaContent.footer.company.map((label) => ({ label })),
        legal: replicaContent.footer.legal,
        legalLinks: replicaContent.footer.legalLinks.map((label) => ({ label })),
      }),
    ],
    zones: {},
  } as Data;
}

export const ALL_PRODUCT_SLUGS = PRODUCT_SLUGS;
