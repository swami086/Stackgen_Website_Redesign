/** Verbatim copy from Pencil frame `V8R69l` (Replica — Pricing light). */

import type { ProductFooter } from "@/content/products";

export type PricingContent = {
  hero: {
    label: string;
    heading: string;
    body: string;
  };
  pricingModel: {
    items: { title: string; body: string }[];
  };
  publicWebRules: {
    heading: string;
    body: string;
  };
  faq: {
    heading: string;
    subheading: string;
    items: { question: string; answer: string }[];
  };
  footer: ProductFooter;
};

const PRICING_FOOTER: ProductFooter = {
  tagline: "Infrastructure that ships itself.",
  copyright: "© StackGen. All rights reserved.",
  columns: [
    {
      title: "Product",
      links: [
        {
          label: "Infrastructure",
          href: "/product/aiden-for-infrastructure",
        },
        { label: "Automation", href: "/product/aiden-for-automation" },
        {
          label: "Observability",
          href: "/product/aiden-for-observability",
        },
        { label: "SRE", href: "/product/aiden-for-sre" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Integrations", href: "/platform" },
        { label: "Cloud to Code", href: "/platform" },
        { label: "Policies", href: "/platform" },
        { label: "IaC Lifecycle", href: "/platform" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
};

const pricing: PricingContent = {
  hero: {
    label: "MODEL",
    heading: "Platform fee plus tiered usage.",
    body: "Sales-led packaging matched to your environment. No public dollar figures — a quote lands after we map your operating constraints.",
  },

  pricingModel: {
    items: [
      {
        title: "Platform fee",
        body: "Base access to Aiden OS, Operational Context Graph, and policy evaluation.",
      },
      {
        title: "Tiered usage",
        body: "Scales with governed actions, surfaces in use, and environment count.",
      },
      {
        title: "Hybrid delivery",
        body: "SaaS by default. On-prem and air-gapped available for regulated teams.",
      },
    ],
  },

  publicWebRules: {
    heading: "No modeled ROI dollars on this page.",
    body: "Slide-style annual value figures stay in sales materials until finance and analyst-relations sign-off. This page sells the packaging shape, not a spreadsheet.",
  },

  faq: {
    heading: "FAQ",
    subheading: "What buyers ask before a quote.",
    items: [
      {
        question: "Do you publish list prices?",
        answer:
          "No. Pricing is scoped after a demo against your surfaces, policy posture, and delivery model.",
      },
      {
        question: "Can we run air-gapped?",
        answer:
          "Yes for regulated teams. Hybrid delivery is part of the packaging conversation.",
      },
      {
        question: "What is included in the platform fee?",
        answer:
          "Aiden OS runtime, Operational Context Graph, Tirith policy checks, and the four Aiden surfaces you enable.",
      },
    ],
  },

  footer: PRICING_FOOTER,
};

export default pricing;
