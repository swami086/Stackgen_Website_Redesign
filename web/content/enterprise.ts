/** Verbatim copy from Pencil frame `o8Fqkk` (Replica — Enterprise light). */

import type { ProductFooter } from "@/content/products";

export type EnterpriseContent = {
  hero: {
    label: string;
    heading: string;
    body: string;
  };
  metrics: {
    stats: { value: string; label: string; mech: string }[];
  };
  capabilities: {
    label: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  compliance: {
    label: string;
    heading: string;
    badges: string[];
  };
  testimonial: {
    quote: string;
    attribution: string;
  };
  finalCta: {
    heading: string;
  };
  footer: ProductFooter;
};

const ENTERPRISE_FOOTER: ProductFooter = {
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

const enterprise: EnterpriseContent = {
  hero: {
    label: "ENTERPRISE",
    heading: "Build for the enterprise from day one.",
    body: "Security, compliance, and control are not afterthoughts. Every Aiden surface ships policy-checked, audited, and governable.",
  },

  metrics: {
    stats: [
      {
        value: "10×",
        label: "velocity",
        mech: "Infrastructure change ships as fast as the policy check clears.",
      },
      {
        value: "100%",
        label: "policy-checked",
        mech: "Every change evaluates against Tirith before it lands.",
      },
      {
        value: "50%",
        label: "MTTR reduction",
        mech: "Shared context skips the manual correlation step.",
      },
      {
        value: "60%+",
        label: "lower cost",
        mech: "Correlation replaces redundant dashboards and alert noise.",
      },
    ],
  },

  capabilities: {
    label: "BUILT FOR SCALE",
    heading: "Every feature ships enterprise-ready.",
    items: [
      {
        title: "SSO / SAML",
        body: "Single sign-on with every major identity provider.",
      },
      {
        title: "Centralized org config",
        body: "One policy surface across every environment.",
      },
      {
        title: "Cost controls",
        body: "Guardrails on inference and infra spend, enforced by policy.",
      },
      {
        title: "OTEL native",
        body: "Standard telemetry export, no proprietary agent.",
      },
      {
        title: "Air-gapped delivery",
        body: "On-prem and disconnected environments supported.",
      },
      {
        title: "Dedicated environments",
        body: "Isolated compute and data boundaries per customer.",
      },
    ],
  },

  compliance: {
    label: "COMPLIANCE",
    heading: "Enterprise trust, built in.",
    badges: ["SOC 2", "PCI", "HIPAA"],
  },

  testimonial: {
    quote:
      "The correlated view is what let us trust the alert instead of re-verifying it by hand.",
    attribution: "Abhishek Gaurav, Head of Engineering and DevOps, greytHR",
  },

  finalCta: {
    heading: "See how StackGen fits your enterprise environment.",
  },

  footer: ENTERPRISE_FOOTER,
};

export default enterprise;
