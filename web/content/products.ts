import { PRODUCTS, type ProductSlug } from "@/lib/products";

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

const observabilityContent: ProductPageContent = {
  slug: "aiden-for-observability",
  title: PRODUCTS["aiden-for-observability"].title,
  phase: PRODUCTS["aiden-for-observability"].phase,
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
    heading: "Aiden for Observability",
    subhead:
      "AI investigation on the observability stack you already run — Grafana, Datadog, New Relic, Dynatrace, and more.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "Work with existing dashboards",
        body: "Investigate on Grafana, Datadog, New Relic, or Dynatrace — no rip-and-replace.",
      },
      {
        title: "Shared World Model context",
        body: "The Operational Context Graph connects signals across tools into one investigation path.",
      },
      {
        title: "Feeds SRE remediation",
        body: "Observations flow into Detect → Remediate with the same governance and audit trail.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by platform teams",
  },
  problem: {
    heading: "Dashboards without a shared investigation path.",
    body: "Every tool holds a slice. Developers lose time re-assembling context that the Factory should already share.",
  },
  spotlight: {
    heading: "Observe pillar in the Autonomous Operations Factory",
    body: "AI investigation on your existing observability stack — context shared across the Factory.",
    cards: [
      {
        title: "Investigate on your stack",
        body: "Connect Grafana, Datadog, New Relic, Dynatrace, and OTEL without migrating dashboards.",
      },
      {
        title: "Shared context across tools",
        body: "The Operational Context Graph joins signals that live in separate vendor silos.",
      },
      {
        title: "Feeds Detect → Remediate",
        body: "Observations connect to SRE workflows with the same policy gates and human authority.",
      },
    ],
  },
  capabilities: {
    heading: "Built for your observability stack",
    items: [
      {
        title: "Works with Grafana / Datadog / New Relic / Dynatrace",
        body: "Investigate on the tools your team already runs — no new dashboard migration.",
      },
      {
        title: "Saves developer investigation time",
        body: "Shared context reduces the re-assembly tax across vendor silos.",
      },
      {
        title: "Same Aiden OS governance",
        body: "Policy gates, audit trail, and human authority apply to every investigation path.",
      },
      {
        title: "Factory-wide context",
        body: "Observations feed Build, Operate, and Remediate workflows from one shared memory.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph unify observability signals with infrastructure state — so investigation starts from truth.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Grafana, Grafana Cloud, Datadog, New Relic, Dynatrace, OTEL, and cloud accounts — investigate without replacing your stack.",
  },
  enterprise: {
    heading: "Deploy your way",
    items: [
      {
        title: "Public cloud",
        body: "Run Aiden for Observability on your preferred cloud provider with standard SaaS deployment.",
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
    body: "Trusted by platform teams running multi-vendor observability estates.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See Observability in the Factory",
    subhead: "Schedule a demo — AI investigation on the stack you already run.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Do we need to migrate our dashboards?",
        answer:
          "No. Aiden investigates on Grafana, Datadog, New Relic, Dynatrace, and OTEL — your existing stack stays in place.",
      },
      {
        question: "How does this connect to SRE workflows?",
        answer:
          "Observations feed Detect → Remediate with shared context from the Operational Context Graph and the same governance layer.",
      },
      {
        question: "Is investigation autonomous?",
        answer:
          "Aiden accelerates investigation with shared context. Remediation still requires explicit human approval through Aiden for SRE.",
      },
    ],
  },
  resources: {
    heading: "",
    items: [],
  },
};

const devOpsContent: ProductPageContent = {
  slug: "aiden-for-devops",
  title: PRODUCTS["aiden-for-devops"].title,
  phase: PRODUCTS["aiden-for-devops"].phase,
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
    heading: "Aiden for DevOps",
    subhead:
      "From IDP and ticketing to automated pipeline provisioning — blueprints, policies, and guardrails applied by design.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "IDP-native compose",
        body: "Developers pick approved scaffolds in the IDP — StackGen composes the full stack from there.",
      },
      {
        title: "Policy by design",
        body: "Modules, security guidelines, and guardrails are enforced automatically — not reviewed manually each time.",
      },
      {
        title: "Ticket-to-deploy",
        body: "ServiceNow and Jira requests flow into governed provisioning without platform-team re-encoding.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by platform teams",
  },
  problem: {
    heading: "Weeks to stand up what the blueprint already knows.",
    body: "Developers pick scaffolds in the IDP; platform still re-applies modules and reviews by hand. Same standards, slow path.",
  },
  spotlight: {
    heading: "IDP / ticket → compose → provision",
    body: "The Operate spine of the Autonomous Operations Factory — from developer request to governed deployment.",
    cards: [
      {
        title: "Developer parametrizes approved blueprint",
        body: "Pick a scaffold in the IDP or open a ticket — parameters stay within approved bounds.",
      },
      {
        title: "StackGen composes IaC with policies",
        body: "Infrastructure, app configs, and workloads are composed with L1–L3 modules and security guidelines applied.",
      },
      {
        title: "App configs, infrastructure, and workload deploy",
        body: "The full stack provisions through the same governance layer — no manual module re-application.",
      },
    ],
  },
  capabilities: {
    heading: "Built for platform teams",
    items: [
      {
        title: "ServiceNow & Jira out of the box",
        body: "Ticket-driven provisioning flows into the same compose and policy pipeline as IDP requests.",
      },
      {
        title: "Centers of excellence keep L1–L3 modules",
        body: "Platform teams maintain approved module libraries — developers consume, not re-invent.",
      },
      {
        title: "Same governance, automatic enforcement",
        body: "Security guidelines and guardrails apply on every compose — not on every review cycle.",
      },
      {
        title: "Blueprint-driven provisioning",
        body: "Approved patterns become repeatable, governed deployments across your estate.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph connect IDP selections, tickets, and live estate — so compose starts from current state.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Internal developer platforms, ServiceNow, Jira, Git, and cloud accounts — requests flow into governed provisioning.",
  },
  enterprise: {
    heading: "Deploy your way",
    items: [
      {
        title: "Public cloud",
        body: "Run Aiden for DevOps on your preferred cloud provider with standard SaaS deployment.",
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
    body: "Same blueprints and security guidelines — enforced automatically instead of reviewed manually.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See DevOps compose on your IDP",
    subhead: "Schedule a demo — blueprints, policies, and guardrails applied by design.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Does this work with our existing IDP?",
        answer:
          "Yes. Aiden connects to your internal developer platform — developers keep their familiar scaffolds and workflows.",
      },
      {
        question: "What about ServiceNow or Jira tickets?",
        answer:
          "Ticket-driven requests flow into the same compose pipeline. Platform teams define blueprints once; every request uses them.",
      },
      {
        question: "Who maintains the module library?",
        answer:
          "Your platform team or center of excellence. Aiden enforces what you approve — L1–L3 modules and security guidelines stay under your control.",
      },
    ],
  },
  resources: {
    heading: "",
    items: [],
  },
};

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
  "aiden-for-devops": devOpsContent,
  "aiden-for-observability": observabilityContent,
  "aiden-for-sre": sreContent,
};

export function getProductContent(slug: ProductSlug): ProductPageContent {
  return productContentBySlug[slug];
}
