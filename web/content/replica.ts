/** Dual-theme home copy. Naming and CTA vocabulary locked to PRODUCT.md. */

export const replicaContent = {
  nav: {
    links: [
      { label: "Products", href: "#" },
      { label: "Platform", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Company", href: "#" },
      { label: "Docs", href: "/docs" },
    ],
    cta: { label: "Schedule demo", href: "#" },
  },
  hero: {
    heading: "The Autonomous DevOps Factory",
    sub: "Aiden: Agentic Operating System to Build, Operate, Observe and Remediate",
    primaryCta: "Schedule demo",
    secondaryCta: "How ADF works",
  },
  video: {
    label: "Product tour · ~3 min",
  },
  logos: {
    eyebrow: "Trusted by teams running production grade AI Ops",
    items: [
      { src: "/logos/customers/Nielsen.png", alt: "Nielsen" },
      { src: "/logos/customers/GreytHR.png", alt: "GreytHR" },
      { src: "/logos/customers/Corcentric.png", alt: "Corcentric" },
      { src: "/logos/customers/Piramal.png", alt: "Piramal" },
      { src: "/logos/customers/NIQ.png", alt: "NIQ" },
      { src: "/logos/customers/Autodesk.png", alt: "Autodesk" },
      { src: "/logos/customers/InMobi.png", alt: "InMobi" },
      { src: "/logos/customers/Innovaccer.png", alt: "Innovaccer" },
    ],
  },
  assemblies: {
    heading: "The DevOps Factory",
  },
  shell: {
    eyebrow: "OPERATIONAL CONTEXT GRAPH",
    heading: "Trace changes across your entire software supply chain",
    body1: "Incidents pull deploy history, dependencies, and drift into one timeline.",
    body2: "Root cause starts with context, not a war room.",
  },
  whoItsFor: {
    eyebrow: "WHO IT'S FOR",
    heading: "Aiden is the Agentic OS for production teams",
    sub: "One context layer for SRE, platform, DevSecOps, and developers.",
    pillars: [
      {
        label: "Build",
        title: "Aiden for Infrastructure",
        body: "Provision, govern, and heal via the OCG.",
      },
      {
        label: "Operate",
        title: "Aiden for Automation",
        body: "Self-verifying deploys gated on resilience.",
      },
      {
        label: "Observe",
        title: "Aiden for Observability",
        body: "Signals into correlated answers.",
      },
      {
        label: "Remediate",
        title: "Aiden for SRE",
        body: "Incidents that know what changed.",
      },
    ],
    roles: [
      {
        title: "Platform Engineering",
        body: "Catch drift before deploy lands",
      },
      {
        title: "Developers",
        body: "Ship without the platform ticket queue",
      },
      {
        title: "DevSecOps",
        body: "Keep agent actions inside policy",
      },
      {
        title: "SRE",
        body: "Alerts arrive with deploys and drift attached",
      },
    ],
    osTitle: "Aiden OS",
    osChips: [
      "Governance",
      "Guardrails",
      "Tokenomics",
      "Identity & Access",
      "Audit & Evidence",
      "Integrations",
    ],
  },
  footer: {
    ctaHeading: "Ready to run agents that stay governed?",
    ctaSub: "See Aiden OS on your stack — context, policy, and approval included.",
    cta: "Schedule demo",
    brand: "The Agentic OS for production teams.",
    product: [
      "Aiden for Infrastructure",
      "Aiden for Automation",
      "Aiden for Observability",
      "Aiden for SRE",
    ],
    platform: ["Aiden OS", "Context Graph", "AppStacks", "Policies"],
    company: ["About", "Pricing", "Contact", "Docs", "Security"],
    legal: "© 2026 StackGen. All rights reserved.",
    legalLinks: ["Privacy", "Terms", "Status"],
  },
} as const;

export type ReplicaContent = typeof replicaContent;
