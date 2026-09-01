/** Dual-theme home copy. Naming and CTA vocabulary locked to PRODUCT.md. SRE is the primary reader. */

export const replicaContent = {
  nav: {
    links: [
      { label: "Products", href: "#who" },
      { label: "Platform", href: "#ocg" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Company", href: "#" },
      { label: "Docs", href: "/docs" },
    ],
    cta: { label: "Schedule a demo", href: "/schedule-demo" },
  },
  hero: {
    heading: "Take control of production.",
    sub: "Give on-call complete context to see, decide, and change what is running.",
    primaryCta: "Schedule a demo",
    primaryHref: "/schedule-demo",
    secondaryCta: "How it works",
    secondaryHref: "#how-it-works",
  },
  logos: {
    eyebrow: "Trusted by SRE teams running production",
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
  problem: {
    eyebrow: "The problem",
    heading: "AI code is hitting production faster than you can see it. You cannot control what you cannot see.",
    body: "Agents and IDEs ship all day. Alerts struggle to keep up.",
    punchline: "",
    /** Cinema-plate caption (A+B hybrid film). Symptoms render as animated fragments, not a list. */
    filmCaption: "Fragments of production. No shared picture.",
    symptoms: [
      "Alert with no change attached",
      "A fix that cannot land",
      "First hour of a P1 is a war room",
      "Change lands on production you cannot see",
      "Runbooks that no longer match production",
    ],
    learnMore: {
      label: "SRE tools compared",
      href: "/blog/top-7-ai-sre-tools-for-2026-essential-solutions-for-modern-site-reliability",
    },
  },
  solution: {
    eyebrow: "The solution",
    heading: "Take back control with complete context",
    body: "Filter false positives and let your agents act proactively.",
    claim: "Focus on outcomes, not agents.",
    demoLabelLeft: "Ops lag",
    demoLabelRight: "Factory path",
    demoCaption: "Incomplete context vs. complete context.",
  },
  assemblies: {
    eyebrow: "How it works",
    heading: "Intent → Spec → Runtime → Learning",
    body: "State the outcome. Get a Factory Spec. Run it. Learn back into the Shared World Model. Build, Operate, Observe, and Remediate share one Autonomous Operations Factory path.",
    learnMore: {
      label: "Platform engineering + MCP",
      href: "/blog/the-10-best-mcp-servers-for-platform-engineers-in-2026",
    },
  },
  shell: {
    eyebrow: "SHARED WORLD MODEL",
    heading: "Four bodies of truth. One Operational Context Graph.",
    body1: "Infra, deploys, signals, and incidents share memory so every Aiden product sees the same production.",
    body2: "Cross-domain plays without rebuilding the picture every alert.",
  },
  whoItsFor: {
    eyebrow: "Offerings",
    heading: "Four products on Aiden OS",
    sub: "Built for SRE. Developers and DevOps share the same context.",
    pillars: [
      {
        label: "Build",
        title: "Aiden for InfraOps",
        body: "Policy-checked change from the IDE. Before it becomes an alert.",
        href: "/product/aiden-for-infraops",
      },
      {
        label: "Operate",
        title: "Aiden for DevOps",
        body: "Delivery from the IDP that on-call can trust.",
        href: "/product/aiden-for-devops",
      },
      {
        label: "Observe",
        title: "Aiden for Observability",
        body: "Investigation on Grafana and the stack you already run. Filter false positives.",
        href: "/product/aiden-for-observability",
      },
      {
        label: "Remediate",
        title: "Aiden for SRE",
        body: "Detect the real incident. Let agents act. You keep the call.",
        href: "/product/aiden-for-sre",
      },
    ],
    roles: [
      {
        title: "SRE",
        body: "Detect the real incident. Let agents act. You keep the call.",
        href: "/product/aiden-for-sre",
      },
      {
        title: "Developer",
        body: "Ship change on-call can see. No surprise deploys.",
        href: "/product/aiden-for-infraops",
      },
      {
        title: "DevOps",
        body: "Keep control of how software ships. On-call stays in the loop.",
        href: "/product/aiden-for-devops",
      },
    ],
    osTitle: "Aiden OS",
    osChips: [
      "Governance",
      "Guardrails",
      "Identity",
      "Audit",
      "Integrations",
      "Policies",
    ],
  },
  footer: {
    ctaHeading: "Take control of production.",
    ctaSub: "Filter false positives and let your agents act proactively.",
    cta: "Schedule a demo",
    ctaHref: "/schedule-demo",
    brand: "Grounded. Governed. Useful.",
    product: [
      "Aiden for InfraOps",
      "Aiden for DevOps",
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
