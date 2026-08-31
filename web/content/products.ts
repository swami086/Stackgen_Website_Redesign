import { PRODUCTS, type ProductSlug } from "@/lib/products";

const P = (label: string) => `PLACEHOLDER — ${label}`;

export type ProductSectionFlags = {
  subNav: boolean;
  pillars: boolean;
  offers: boolean;
  resources: boolean;
};

export type ProductCard = {
  title: string;
  body: string;
};

export type ProductFaqItem = {
  question: string;
  answer: string;
};

export type ProductPageContent = {
  slug: ProductSlug;
  title: string;
  phase: string;
  flags: ProductSectionFlags;
  subNav: {
    overviewLabel: string;
  };
  hero: {
    heading: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  pillars: {
    items: readonly ProductCard[];
  };
  logos: {
    eyebrow: string;
  };
  problem: {
    heading: string;
    body: string;
  };
  spotlight: {
    heading: string;
    body: string;
    cards: readonly ProductCard[];
  };
  capabilities: {
    heading: string;
    items: readonly ProductCard[];
  };
  platformLink: {
    heading: string;
    body: string;
  };
  integrations: {
    heading: string;
    body: string;
  };
  enterprise: {
    heading: string;
    items: readonly ProductCard[];
  };
  proof: {
    heading: string;
    body: string;
  };
  offers: {
    heading: string;
    items: readonly ProductCard[];
  };
  finalCta: {
    heading: string;
    subhead: string;
    cta: string;
  };
  faq: {
    heading: string;
    items: readonly ProductFaqItem[];
  };
  resources: {
    heading: string;
    items: readonly ProductCard[];
  };
};

function buildProductContent(slug: ProductSlug): ProductPageContent {
  const meta = PRODUCTS[slug];

  return {
    slug,
    title: meta.title,
    phase: meta.phase,
    flags: {
      subNav: true,
      pillars: true,
      offers: false,
      resources: true,
    },
    subNav: {
      overviewLabel: P("overview nav label"),
    },
    hero: {
      heading: meta.title,
      subhead: P("hero subhead"),
      primaryCta: "Schedule demo",
      secondaryCta: P("secondary CTA"),
    },
    pillars: {
      items: [
        { title: P("pillar 1 title"), body: P("pillar 1 body") },
        { title: P("pillar 2 title"), body: P("pillar 2 body") },
        { title: P("pillar 3 title"), body: P("pillar 3 body") },
      ],
    },
    logos: {
      eyebrow: P("logos eyebrow"),
    },
    problem: {
      heading: P("problem heading"),
      body: P("problem body"),
    },
    spotlight: {
      heading: P("spotlight heading"),
      body: P("spotlight body"),
      cards: [
        { title: P("spotlight card 1 title"), body: P("spotlight card 1 body") },
        { title: P("spotlight card 2 title"), body: P("spotlight card 2 body") },
        { title: P("spotlight card 3 title"), body: P("spotlight card 3 body") },
      ],
    },
    capabilities: {
      heading: P("capabilities heading"),
      items: [
        { title: P("capability 1 title"), body: P("capability 1 body") },
        { title: P("capability 2 title"), body: P("capability 2 body") },
        { title: P("capability 3 title"), body: P("capability 3 body") },
        { title: P("capability 4 title"), body: P("capability 4 body") },
      ],
    },
    platformLink: {
      heading: P("platform link heading"),
      body: P("platform link body"),
    },
    integrations: {
      heading: P("integrations heading"),
      body: P("integrations body"),
    },
    enterprise: {
      heading: P("enterprise heading"),
      items: [
        { title: P("enterprise item 1 title"), body: P("enterprise item 1 body") },
        { title: P("enterprise item 2 title"), body: P("enterprise item 2 body") },
        { title: P("enterprise item 3 title"), body: P("enterprise item 3 body") },
      ],
    },
    proof: {
      heading: P("proof heading"),
      body: P("proof body"),
    },
    offers: {
      heading: P("offers heading"),
      items: [
        { title: P("offer 1 title"), body: P("offer 1 body") },
        { title: P("offer 2 title"), body: P("offer 2 body") },
      ],
    },
    finalCta: {
      heading: P("final CTA heading"),
      subhead: P("final CTA subhead"),
      cta: "Schedule demo",
    },
    faq: {
      heading: P("FAQ heading"),
      items: [
        {
          question: P("FAQ question 1"),
          answer: P("FAQ answer 1"),
        },
        {
          question: P("FAQ question 2"),
          answer: P("FAQ answer 2"),
        },
        {
          question: P("FAQ question 3"),
          answer: P("FAQ answer 3"),
        },
      ],
    },
    resources: {
      heading: P("resources heading"),
      items: [
        { title: P("resource 1 title"), body: P("resource 1 body") },
        { title: P("resource 2 title"), body: P("resource 2 body") },
        { title: P("resource 3 title"), body: P("resource 3 title") },
      ],
    },
  };
}

export const productContentBySlug: Record<ProductSlug, ProductPageContent> = {
  "aiden-for-infraops": buildProductContent("aiden-for-infraops"),
  "aiden-for-devops": buildProductContent("aiden-for-devops"),
  "aiden-for-observability": buildProductContent("aiden-for-observability"),
  "aiden-for-sre": buildProductContent("aiden-for-sre"),
};

export function getProductContent(slug: ProductSlug): ProductPageContent {
  return productContentBySlug[slug];
}
