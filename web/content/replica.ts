/** Dual-theme home copy. Naming and CTA vocabulary locked to PRODUCT.md. */

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
    heading: "Outcomes, not agents.",
    sub: "The Autonomous Operations Factory turns how you build, ship, run, and improve software into reliable, repeatable action — with humans keeping authority.",
    primaryCta: "Schedule a demo",
    primaryHref: "/schedule-demo",
    secondaryCta: "How it works",
    secondaryHref: "#how-it-works",
  },
  logos: {
    eyebrow: "Trusted by teams running production",
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
    heading: "Outer Ops loop is failing to keep up with inner Dev loop",
    body: "AI accelerated the inner Dev loop. The outer Ops loop — observe, operate, remediate under compliance — did not keep up. Feedback is slow. Signal is noisy.",
    punchline: "Slow feedback / noisy signal",
    /** Cinema-plate caption (A+B hybrid film). Symptoms render as animated fragments, not a list. */
    filmCaption: "Inner loop minutes · Outer loop hours to days",
    symptoms: [
      "Alert with no deploy or drift attached",
      "AI remediation that cannot land a policy-checked change",
      "First 90 minutes of a P1 is a war room",
      "Deploy lands on unchecked infrastructure drift",
      "200 runbooks — maybe 30 still true",
    ],
    learnMore: {
      label: "SRE tools compared",
      href: "/blog/top-7-ai-sre-tools-for-2026-essential-solutions-for-modern-site-reliability",
    },
  },
  solution: {
    eyebrow: "The solution",
    heading: "Autonomous Operations Factory",
    body: "One factory for Build, Operate, Observe, and Remediate — learning back into a Shared World Model, with humans keeping authority.",
    claim: "Outcomes, not agents.",
    demoLabelLeft: "Ops lag",
    demoLabelRight: "Factory path",
    demoCaption: "From intent to repeatable action under policy.",
  },
  assemblies: {
    eyebrow: "How it works",
    heading: "Intent → Spec → Runtime → Learning",
    body: "State the outcome. Get a Factory Spec. Run it. Learn back into the Shared World Model — the Autonomous Operations Factory path.",
    learnMore: {
      label: "Platform engineering + MCP",
      href: "/blog/the-10-best-mcp-servers-for-platform-engineers-in-2026",
    },
  },
  shell: {
    eyebrow: "SHARED WORLD MODEL",
    heading: "One Operational Context Graph",
    body1: "Four Bodies of shared context so every Aiden product sees the same estate.",
    body2: "Cross-domain plays without rebuilding the picture every page.",
  },
  whoItsFor: {
    eyebrow: "Offerings",
    heading: "Four products on Aiden OS",
    sub: "InfraOps, DevOps, Observability, and SRE — one context layer.",
    pillars: [
      {
        label: "Build",
        title: "Aiden for InfraOps",
        body: "Intent to policy-checked infrastructure change in your Git.",
        href: "/product/aiden-for-infraops",
      },
      {
        label: "Operate",
        title: "Aiden for DevOps",
        body: "Delivery and automation that verify themselves under policy.",
        href: "/product/aiden-for-devops",
      },
      {
        label: "Observe",
        title: "Aiden for Observability",
        body: "Signals that already know what changed.",
        href: "/product/aiden-for-observability",
      },
      {
        label: "Remediate",
        title: "Aiden for SRE",
        body: "Context-backed incident response under bounded autonomy.",
        href: "/product/aiden-for-sre",
      },
    ],
    roles: [
      { title: "SRE", body: "Alerts arrive with deploys and drift attached" },
      { title: "Platform Engineering", body: "Catch drift before deploy lands" },
      { title: "Developers", body: "Ship without the platform ticket queue" },
      { title: "DevSecOps", body: "Keep agent actions inside policy" },
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
    ctaHeading: "Outcomes, not agents.",
    ctaSub: "See the Autonomous Operations Factory on your stack — policy, context, and humans keeping authority.",
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
