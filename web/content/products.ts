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
  video: {
    caption: string;
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
      "AI investigation on Grafana, Datadog, New Relic, Dynatrace, and more. Filter false positives.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "Work with existing dashboards",
        body: "Investigate on Grafana, Datadog, New Relic, or Dynatrace. No rip-and-replace.",
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
    eyebrow: "Trusted by SRE teams",
  },
  problem: {
    heading: "Every dashboard is a fragment. Alerts struggle to keep up.",
    body: "On-call still jumps dashboards while AI code lands in production. Alerts struggle to keep up.",
  },
  video: {
    caption: "See Observability investigation — video placeholder.",
  },
  spotlight: {
    heading: "Observe pillar in the Autonomous Operations Factory",
    body: "AI investigation on your existing observability stack. Context shared across the Factory.",
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
    heading: "Built for on-call investigation",
    items: [
      {
        title: "Works with Grafana / Datadog / New Relic / Dynatrace",
        body: "Investigate on the tools your team already runs. No new dashboard migration.",
      },
      {
        title: "Saves on-call investigation time",
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
    body: "Aiden OS and the Operational Context Graph unify observability signals with infrastructure state, so investigation starts from truth.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Grafana, Grafana Cloud, Datadog, New Relic, Dynatrace, OTEL, and cloud accounts. Investigate without replacing your stack.",
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
    body: "Trusted by SRE teams investigating on the stack they already run.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See Observability on your stack",
    subhead: "Schedule a demo. Investigation that already knows what changed.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Do we need to migrate our dashboards?",
        answer:
          "No. Aiden investigates on Grafana, Datadog, New Relic, Dynatrace, and OTEL. Your existing stack stays in place.",
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
      "Delivery from the IDP that on-call can trust.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "IDP-native compose",
        body: "Developers pick approved scaffolds in the IDP. Compose stays inside the rails on-call can see.",
      },
      {
        title: "Policy by design",
        body: "Modules, security guidelines, and guardrails apply automatically. Not a review cycle each time.",
      },
      {
        title: "Ticket-to-deploy",
        body: "ServiceNow and Jira requests flow into governed provisioning. You are not re-encoding each one.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by SRE teams",
  },
  problem: {
    heading: "A deploy you did not see still becomes an alert.",
    body: "Scaffolds ship from the IDP. You still reverse-engineer what landed. Same standards. Slow path to truth.",
  },
  video: {
    caption: "See DevOps blueprint compose — video placeholder.",
  },
  spotlight: {
    heading: "IDP / ticket → compose → provision",
    body: "The Operate spine of the Autonomous Operations Factory. From developer request to governed deployment.",
    cards: [
      {
        title: "Developer parametrizes approved blueprint",
        body: "Pick a scaffold in the IDP or open a ticket. Parameters stay within approved bounds.",
      },
      {
        title: "StackGen composes IaC with policies",
        body: "Infrastructure, app configs, and workloads are composed with L1–L3 modules and security guidelines applied.",
      },
      {
        title: "App configs, infrastructure, and workload deploy",
        body: "The full stack provisions through the same governance layer. No manual module re-application.",
      },
    ],
  },
  capabilities: {
    heading: "Built for SRE",
    items: [
      {
        title: "ServiceNow & Jira out of the box",
        body: "Ticket-driven provisioning flows into the same compose and policy pipeline as IDP requests.",
      },
      {
        title: "Centers of excellence keep L1–L3 modules",
        body: "You maintain approved module libraries. Developers consume, not re-invent.",
      },
      {
        title: "Same governance, automatic enforcement",
        body: "Security guidelines and guardrails apply on every compose, not on every review cycle.",
      },
      {
        title: "Blueprint-driven provisioning",
        body: "Approved patterns become repeatable, governed deployments.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph connect IDP selections, tickets, and live production, so compose starts from current state.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Internal developer platforms, ServiceNow, Jira, and cloud accounts. Requests flow into governed provisioning.",
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
    body: "Same blueprints and security guidelines. Enforced automatically instead of reviewed on every request.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See Aiden for DevOps on your IDP",
    subhead: "Schedule a demo. Delivery on-call can trust.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Does this work with our existing IDP?",
        answer:
          "Yes. Aiden connects to your internal developer platform. Developers keep their familiar scaffolds and workflows.",
      },
      {
        question: "What about ServiceNow or Jira tickets?",
        answer:
          "Ticket-driven requests flow into the same compose pipeline. You define blueprints once. Every request uses them.",
      },
      {
        question: "Who maintains the module library?",
        answer:
          "You do, or your center of excellence. Aiden enforces what you approve. L1–L3 modules and security guidelines stay under your control.",
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
      "Policy-checked change from the IDE. Before it becomes an alert.",
    primaryCta: CTA_DEFAULTS.primaryCta,
    primaryHref: CTA_DEFAULTS.primaryHref,
    secondaryCta: CTA_DEFAULTS.secondaryCta,
    secondaryHref: CTA_DEFAULTS.secondaryHref,
  },
  pillars: {
    items: [
      {
        title: "Intent in the IDE",
        body: "Describe what production needs in the IDE. Policy gates run before the change becomes an alert.",
      },
      {
        title: "Governed IaC generation",
        body: "Secure Terraform or OpenTofu generated in-environment, aligned to your approved modules.",
      },
      {
        title: "Compliance before production",
        body: "Policy checks run against shared state before any change reaches production.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by SRE teams",
  },
  problem: {
    heading: "Ungoverned infra change shows up as an alert.",
    body: "Intent lands without policy. You find out on-call. Drift shows up after deploy. Compliance arrives late, after the shape is already wrong.",
  },
  video: {
    caption: "See InfraOps IDE intent → IaC — video placeholder.",
  },
  spotlight: {
    heading: "Intent → Detect & generate → Govern → Deploy → Close the loop",
    body: "The Build spine of the Autonomous Operations Factory. From developer intent to governed infrastructure.",
    cards: [
      {
        title: "Intent in IDE",
        body: "Intent lands in agentic IDEs. Policy still has to catch it before on-call does.",
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
    heading: "Built for SRE",
    items: [
      {
        title: "Policy-checked before it becomes an alert",
        body: "Generated infrastructure is checked against policy before it reaches production.",
      },
      {
        title: "Compliance by default",
        body: "Every generated change is checked against policy before it lands in production.",
      },
      {
        title: "Audit trail auto-filed",
        body: "Intent, generation, and approval history travel with the change, not in a separate system.",
      },
      {
        title: "Multi-cloud IaC (AWS / Azure / GCP)",
        body: "Same governance model across cloud providers with your approved module library.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph hold live production state and policy, so generated IaC is checked against truth, not stale docs.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "IDE and agentic IDEs (e.g. Kiro-class) and cloud accounts. Intent flows straight into governed IaC.",
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
    body: "Trusted by SRE teams shipping infrastructure without surprise deploys.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See InfraOps in your IDE",
    subhead: "Schedule a demo. Change on-call can see before it becomes an alert.",
    cta: CTA_DEFAULTS.finalCtaLabel,
    href: CTA_DEFAULTS.finalCtaHref,
  },
  faq: {
    heading: "How it works",
    items: [
      {
        question: "Does this replace our platform team?",
        answer:
          "No. You still define modules, policies, and guardrails. Developers self-serve within those boundaries. Less toil on-call, not less ownership.",
      },
      {
        question: "Where does the IaC land?",
        answer:
          "Generated Terraform or OpenTofu flows into your repos with a full audit trail. Same review process your team already uses.",
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
      "Detect the real incident. Let agents act. You keep the call.",
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
        body: "Routes incidents with shared context from the Operational Context Graph. Not another chat thread.",
      },
      {
        title: "RCA acceleration",
        body: "Surfaces likely root cause from live production state and recent changes, ready for human review.",
      },
    ],
  },
  logos: {
    eyebrow: "Trusted by SRE teams",
  },
  problem: {
    heading: "Hundreds of alerts. Hours to a hypothesis.",
    body: "Signals arrive fragmented across tools. Tribal knowledge stays in chats. Forming a root cause burns the first hour of a P1.",
  },
  video: {
    caption: "See Detect → Triage → Remediate — video placeholder.",
  },
  spotlight: {
    heading: "Detect → Triage → Diagnose → Remediate",
    body: "The SRE spine of the Autonomous Operations Factory. Each step grounded in shared context and human authority.",
    cards: [
      {
        title: "Detect",
        body: "Ingest alerts and signals from Grafana, Datadog, New Relic, and your existing observability stack.",
      },
      {
        title: "Triage",
        body: "Correlate and prioritize with shared context. Humans stay in the loop on every escalation.",
      },
      {
        title: "Diagnose",
        body: "Form root-cause hypotheses from live infrastructure state and change history.",
      },
      {
        title: "Remediate",
        body: "Propose policy-checked fixes and learn from outcomes. Nothing executes without explicit approval.",
      },
    ],
  },
  capabilities: {
    heading: "Built for production SRE",
    items: [
      {
        title: "Integrations with your stack",
        body: "Connects to the observability, cloud, and ITSM tools your team already runs.",
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
        body: "Grafana, OTEL, Datadog, Dynatrace, New Relic. Same governance layer across vendors.",
      },
    ],
  },
  platformLink: {
    heading: "Shared memory across the Factory",
    body: "Aiden OS and the Operational Context Graph keep infrastructure state, policies, and change history in one place, so SRE workflows start from truth, not tribal knowledge.",
  },
  integrations: {
    heading: "Your stack, connected",
    body: "Grafana, Grafana Cloud, New Relic, Dynatrace, Datadog, OTEL, Kubernetes, Terraform, ServiceNow, cloud accounts. Out of the box.",
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
    body: "Trusted by SRE teams running production.",
  },
  offers: {
    heading: "",
    items: [],
  },
  finalCta: {
    heading: "See Aiden for SRE on-call",
    subhead: "Schedule a demo. Root cause without assembling a war room.",
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
          "Aiden integrates with Grafana, Datadog, New Relic, Dynatrace, Kubernetes, Terraform, ServiceNow, and cloud accounts out of the box.",
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
