import { PRODUCTS, type ProductSlug } from "@/lib/products";

const P = (label: string) => `PLACEHOLDER — ${label}`;

const CTA_DEFAULTS = {
  primaryCta: "Schedule a demo",
  primaryHref: "/schedule-demo",
  secondaryCta: "How it works",
  secondaryHref: "/#how-it-works",
  finalCtaLabel: "Schedule a demo",
  finalCtaHref: "/schedule-demo",
} as const;

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
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
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
    href: string;
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
      ...CTA_DEFAULTS,
      primaryCta: CTA_DEFAULTS.primaryCta,
      primaryHref: CTA_DEFAULTS.primaryHref,
      secondaryCta: CTA_DEFAULTS.secondaryCta,
      secondaryHref: CTA_DEFAULTS.secondaryHref,
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
      cta: CTA_DEFAULTS.finalCtaLabel,
      href: CTA_DEFAULTS.finalCtaHref,
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

const infraOpsContent: ProductPageContent = {
  slug: "aiden-for-infraops",
  title: PRODUCTS["aiden-for-infraops"].title,
  phase: PRODUCTS["aiden-for-infraops"].phase,
  flags: {
    subNav: true,
    pillars: true,
    offers: false,
    resources: false,
  },
  subNav: {
    overviewLabel: "Overview",
  },
  hero: {
    heading: "Aiden for InfraOps",
    subhead:
      "Self-serve standardized infrastructure from the IDE — intent to governed IaC without a platform-team handoff.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "Intent in the IDE",
        body: "Developers describe what they need in the environment they already work in — no ticket queue.",
      },
      {
        title: "Governed IaC generation",
        body: "Secure Terraform or OpenTofu generated in-environment, aligned to your approved modules.",
      },
      {
        title: "Compliance before production",
        body: "Policy checks run against shared state before any change reaches your estate.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by platform teams",
  },
  problem: {
    heading: "Manual handoffs slow every infrastructure request.",
    body: "Developers wait on tickets while platform teams re-encode the same patterns. Compliance arrives late, after the shape is already wrong.",
  },
  spotlight: {
    heading: "Intent → Detect & generate → Govern → Deploy → Close the loop",
    body: "The Build spine of the Autonomous Operations Factory — from developer intent to governed infrastructure in your Git.",
    cards: [
      {
        title: "Intent in IDE",
        body: "Developers express infrastructure needs directly in agentic IDEs — no platform-team translation layer.",
      },
      {
        title: "Secure Terraform/OpenTofu generated in-environment",
        body: "IaC is composed inside your environment using approved modules and patterns.",
      },
      {
        title: "Compliance checked against shared state before production",
        body: "Policy gates validate against the Operational Context Graph before deploy.",
      },
    ],
  },
  capabilities: {
    heading: "Built for platform teams",
    items: [
      {
        title: "Manual handoff eliminated",
        body: "Developers self-serve standardized infrastructure without waiting on platform tickets.",
      },
      {
        title: "Compliance by default",
        body: "Every generated change is checked against policy before it lands in production.",
      },
      {
        title: "Audit trail auto-filed",
        body: "Intent, generation, and approval history travel with the PR — not in a separate system.",
      },
      {
        title: "Multi-cloud IaC (AWS / Azure / GCP)",
        body: "Same governance model across cloud providers with your approved module library.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph hold live estate state and policy — so generated IaC is checked against truth, not stale docs.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "IDE and agentic IDEs (e.g. Kiro-class), Git, and cloud accounts — intent flows straight into governed IaC.",
  },
  enterprise: {
    heading: "Deploy your way",
    items: [
      {
        title: "Public cloud",
        body: "Run Aiden for InfraOps on your preferred cloud provider with standard SaaS deployment.",
      },
      {
        title: "Private SaaS",
        body: "Dedicated tenant isolation with your security and compliance requirements.",
      },
      {
        title: "Self-hosted",
        body: "Deploy in your own environment when data residency or air-gapped operation is required.",
      },
    ],
  },
  proof: {
    heading: "Trusted in production",
    body: "Trusted by platform teams standardizing infrastructure across production estates.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See InfraOps on your estate",
    subhead: "Schedule a demo — intent to governed IaC without the handoff queue.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Does this replace our platform team?",
        answer:
          "No. Platform teams define modules, policies, and guardrails. Developers self-serve within those boundaries — reducing toil, not ownership.",
      },
      {
        question: "Where does the IaC land?",
        answer:
          "Generated Terraform or OpenTofu flows into your Git repos with full audit trail — same review process your team already uses.",
      },
      {
        question: "How is compliance enforced?",
        answer:
          "Policy checks run against the Operational Context Graph before production. Non-compliant changes are blocked, not reviewed after the fact.",
      },
    ],
  },
  resources: {
    heading: "",
    items: [],
  },
};

const sreContent: ProductPageContent = {
  slug: "aiden-for-sre",
  title: PRODUCTS["aiden-for-sre"].title,
  phase: PRODUCTS["aiden-for-sre"].phase,
  flags: {
    subNav: true,
    pillars: true,
    offers: false,
    resources: false,
  },
  subNav: {
    overviewLabel: "Overview",
  },
  hero: {
    heading: "Aiden for SRE",
    subhead:
      "Less toil. Improve reliability. Detect → Triage → Diagnose → Remediate — with humans keeping authority.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "Alert intelligence",
        body: "Correlates signals across your observability stack so noise drops before it reaches on-call.",
      },
      {
        title: "Incident triage",
        body: "Routes incidents with shared context from the Operational Context Graph — not another chat thread.",
      },
      {
        title: "RCA acceleration",
        body: "Surfaces hypotheses from live estate state and recent changes, ready for human review.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by platform teams",
  },
  problem: {
    heading: "Hundreds of alerts. Hours to a hypothesis.",
    body: "Signals arrive fragmented across tools. Tribal knowledge stays in chats. Forming a root-cause hypothesis burns minutes you do not have on call.",
  },
  spotlight: {
    heading: "Detect → Triage → Diagnose → Remediate",
    body: "The SRE spine of the Autonomous Operations Factory — each step grounded in shared context and human authority.",
    cards: [
      {
        title: "Detect",
        body: "Ingest alerts and signals from Grafana, Datadog, New Relic, and your existing observability stack.",
      },
      {
        title: "Triage",
        body: "Correlate and prioritize with shared context — humans stay in the loop on every escalation.",
      },
      {
        title: "Diagnose",
        body: "Form root-cause hypotheses from live infrastructure state and change history.",
      },
      {
        title: "Remediate",
        body: "Propose policy-checked fixes and learn from outcomes — nothing executes without explicit approval.",
      },
    ],
  },
  capabilities: {
    heading: "Built for production SRE",
    items: [
      {
        title: "Integrations with your stack",
        body: "Connects to the observability, Git, cloud, and ITSM tools your team already runs.",
      },
      {
        title: "Never acts without sign-off",
        body: "Every remediation proposal requires explicit human approval before any change executes.",
      },
      {
        title: "Full audit trail",
        body: "Every investigation step, hypothesis, and proposed change is logged with full context.",
      },
      {
        title: "Works with OSS and managed observability",
        body: "Grafana, OTEL, Datadog, Dynatrace, New Relic — same governance layer across vendors.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph keep infrastructure state, policies, and change history in one place — so SRE workflows start from truth, not tribal knowledge.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Grafana, Grafana Cloud, New Relic, Dynatrace, Datadog, OTEL, Kubernetes, Terraform, Git, ServiceNow, cloud accounts — out of the box.",
  },
  enterprise: {
    heading: "Deploy your way",
    items: [
      {
        title: "Public cloud",
        body: "Run Aiden for SRE on your preferred cloud provider with standard SaaS deployment.",
      },
      {
        title: "Private SaaS",
        body: "Dedicated tenant isolation with your security and compliance requirements.",
      },
      {
        title: "Self-hosted",
        body: "Deploy in your own environment when data residency or air-gapped operation is required.",
      },
    ],
  },
  proof: {
    heading: "Trusted in production",
    body: "Trusted by platform and SRE teams running production estates.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See Aiden for SRE on your stack",
    subhead: "Schedule a demo — policy, context, and humans keeping authority.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Does Aiden act autonomously?",
        answer:
          "No. Every remediation proposal requires explicit human approval. Policy gates and sign-off stay in your control.",
      },
      {
        question: "Is there an audit trail?",
        answer:
          "Yes. Every investigation step, hypothesis, and proposed change is logged with full context for compliance and post-incident review.",
      },
      {
        question: "Does it work with our existing tools?",
        answer:
          "Aiden integrates with Grafana, Datadog, New Relic, Dynatrace, Kubernetes, Terraform, Git, ServiceNow, and cloud accounts out of the box.",
      },
    ],
  },
  resources: {
    heading: "",
    items: [],
  },
};

export const productContentBySlug: Record<ProductSlug, ProductPageContent> = {
  "aiden-for-infraops": infraOpsContent,
  "aiden-for-devops": buildProductContent("aiden-for-devops"),
  "aiden-for-observability": buildProductContent("aiden-for-observability"),
  "aiden-for-sre": sreContent,
};

export function getProductContent(slug: ProductSlug): ProductPageContent {
  return productContentBySlug[slug];
}
