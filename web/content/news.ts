/** Verbatim copy from Pencil frame `o303yj` (Replica — News light). */

import type { ProductFooter } from "@/content/products";

export type NewsContent = {
  hero: {
    label: string;
    heading: string;
    body: string;
  };
  realMomentum: {
    label: string;
    items: { title: string; body: string }[];
  };
  placeholderItems: {
    label: string;
    items: { tag: string; title: string; body: string }[];
  };
  footer: ProductFooter;
};

const NEWS_FOOTER: ProductFooter = {
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

const news: NewsContent = {
  hero: {
    label: "NEWS",
    heading: "News and momentum.",
    body: "Where StackGen is showing up: reports, events, and recognition. Full announcements land here as they are ready.",
  },

  realMomentum: {
    label: "CONFIRMED",
    items: [
      {
        title: "State of Reliability 2026",
        body: "178,000 incidents analyzed across the industry.",
      },
      {
        title: "AI SRE meetup series",
        body: "Ongoing practitioner meetups on agentic reliability.",
      },
      {
        title: "Analyst credentials",
        body: "Gartner Cool Vendor in AI for IT Operations; named in 4 Gartner Hype Cycles.",
      },
    ],
  },

  placeholderItems: {
    label: "MORE COMING",
    items: [
      {
        tag: "PLACEHOLDER",
        title: "Product update",
        body: "No published item yet.",
      },
      {
        tag: "PLACEHOLDER",
        title: "Company news",
        body: "No published item yet.",
      },
      {
        tag: "PLACEHOLDER",
        title: "Case study",
        body: "No published item yet.",
      },
    ],
  },

  footer: NEWS_FOOTER,
};

export default news;
