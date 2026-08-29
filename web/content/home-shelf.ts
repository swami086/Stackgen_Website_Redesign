/** Verbatim copy from Pencil frame `CYfSl` (Web Shelf — Home [Dark]). */

export const homeShelf = {
  hero: {
    heading: "The Autonomous DevOps Factory",
    sub: "Aiden: Agentic Operating System to Build, Operate, Observe and Remidiate",
    primaryCta: "Schedule demo",
    secondaryCta: "How ADF works",
  },
  video: {
    label: "Product tour · ~3 min",
  },
  surfaces: {
    heading: "One platform, every surface your team works on",
    sub: "Factory assemblies run from IDE, terminal, chat, and CI — the same context graph follows every surface.",
    items: [
      {
        num: "01",
        phase: "BUILD",
        title: "Infrastructure lane",
        body: "Provision and govern from IaC with policy gates at apply.",
        preview:
          "Intent routes to Infrastructure — drift scans, AppStack plans, and governed apply land in one lane.",
      },
      {
        num: "02",
        phase: "OPERATE",
        title: "Automation lane",
        body: "Pipelines that verify themselves before they ship.",
        preview:
          "Deployments pull context from the graph — dependencies, tests, and approvals in one run.",
      },
      {
        num: "03",
        phase: "OBSERVE",
        title: "Observability lane",
        body: "Signals correlated across traces, metrics, and change events.",
        preview:
          "Alerts arrive with deploy history, blast radius, and owner context — not a blank ticket.",
      },
      {
        num: "04",
        phase: "REMEDIATE",
        title: "SRE lane",
        body: "Incidents that know what changed before the war room opens.",
        preview:
          "Remediation plans reference live topology, prior incidents, and policy-safe runbooks.",
      },
    ],
  },
  modelRouter: {
    heading: "Route every task to the right model and tool",
    sub: "Switch providers in a config change. Run several in parallel for redundancy. Factory never locks you to a vendor — neither does Aiden.",
    row1: [
      "Claude",
      "GPT",
      "Gemini",
      "Terraform",
      "Kubernetes",
      "Datadog",
      "GitHub",
      "PagerDuty",
    ],
    row2: [
      "Mistral",
      "DeepSeek",
      "Slack",
      "Jira",
      "OPA",
      "Argo CD",
      "Prometheus",
      "OpenTelemetry",
    ],
  },
  logos: {
    eyebrow: "Trusted by teams running production grade AI Ops",
    items: [
      { src: "/logos/customers/Nielsen.png", alt: "Nielsen" },
      { src: "/logos/customers/GreytHR.png", alt: "GreytHR" },
      { src: "/logos/customers/Corcentric.png", alt: "Corcentric" },
      { src: "/logos/customers/Autodesk.png", alt: "Autodesk" },
      { src: "/logos/customers/InMobi.png", alt: "InMobi" },
      { src: "/logos/customers/Innovaccer.png", alt: "Innovaccer" },
    ],
  },
  assemblies: {
    heading: "The Devops Factory",
    sub: "Aiden: Agentic Operating System to Build, Operate, Observe, and Remediate.",
    innerOuterLoopImage: "/media/home-shelf/inner-outer-loop.png",
    pillars: [
      {
        label: "Build",
        title: "Aiden for Infrastructure",
        body: "Infrastructure that provisions, governs, and heals through the OCG.",
      },
      {
        label: "Operate",
        title: "Aiden for Automation",
        body: "Deployments that verify themselves and gate on resilience.",
      },
      {
        label: "Observe",
        title: "Aiden for Observability",
        body: "Turn signals into correlated answers across the factory.",
      },
      {
        label: "Remediate",
        title: "Aiden for SRE",
        body: "Incidents that know what changed. Root cause in under 15 minutes.",
      },
    ],
    osBar: {
      title: "Aiden OS",
      chips: [
        { label: "Context Graph", highlight: true },
        { label: "Memory" },
        { label: "Governance" },
        { label: "Policies" },
        { label: "MCP + A2A" },
        { label: "Deterministic Execution" },
      ],
    },
  },
  whoItsFor: {
    eyebrow: "WHO IT'S FOR",
    heading: "Aiden is the Agentic Harness for Production Teams",
    sub: "SRE, platform, DevSecOps, and developers share one context layer. Every deploy, alert, and approval starts with the same context.",
    roles: [
      {
        title: "SRE",
        body: "Every alert arrives with deploys, drift, and dependencies attached",
      },
      {
        title: "Platform Engineering",
        body: "Catch drift and failure patterns before the deploy lands",
      },
      {
        title: "DevSecOps",
        body: "Keep agent actions inside policy, not around approvals",
      },
      {
        title: "Developers",
        body: "Ship and provision without the platform ticket queue",
      },
    ],
  },
  beforeAfter: {
    today: {
      label: "Today: humans in the loop",
      steps: ["App Devs", "Policies"],
      roles: ["DevEx", "SREs", "Security", "FinOps"],
    },
    future: {
      label: "Future: factory inside Aiden OS",
      specs: "Specs",
      osTitle: "Aiden Agents Operating System",
      assemblies: ["Automation", "SRE", "Infrastructure"],
    },
  },
  contextGraph: {
    eyebrow: "OPERATIONAL CONTEXT GRAPH",
    heading: "Trace changes Across Your Entire Software Supply Chain",
    body1: "Incidents pull deploy history, dependencies, and drift into one timeline.",
    body2: "Root cause starts with context, not a war room.",
    stack: {
      intentPlaceholder:
        "Ask Aiden to investigate latency spike in checkout…",
      intentPills: ["auto-route", "world model", "guardrails"],
      assemblies: [
        {
          phase: "BUILD",
          title: "Aiden for Infrastructure",
          subtitle: "INFRASTRUCTURE · IaC",
        },
        {
          phase: "OPERATE",
          title: "Aiden for Automation",
          subtitle: "AUTOMATION · PIPELINES",
        },
        {
          phase: "OBSERVE",
          title: "Aiden for Observability",
          subtitle: "TRACES · METRICS · ALERTS",
        },
        {
          phase: "REMEDIATE",
          title: "Aiden for SRE",
          subtitle: "INCIDENTS · SLOs",
        },
      ],
      assemblyCaption: "Build · Operate · Observe · Remediate",
      connectors: {
        routeToAssembly: "ROUTE TO ASSEMBLY",
        enrichFromContext: "ENRICH FROM CONTEXT",
        governedBy: "GOVERNED BY",
      },
      contextGraph: {
        title: "World Model · Context Graph",
        stats: "32 nodes · 1,354 entities",
        chipsRow1: [
          "logs",
          "metrics",
          "traces",
          "alerts",
          "config & IaC",
          "k8s state",
          "dependencies",
          "change events",
        ],
        chipsRow2: [
          "prior incidents",
          "deployments",
          "test results",
          "tickets",
          "cost & usage",
          "docs",
        ],
      },
      osBand: {
        title: "Aiden Agentic Operating System",
        chips: [
          "Governance",
          "Tokenomics",
          "Identity & Access",
          "Audit & Evidence",
          "Integrations",
        ],
      },
    },
    entityResolutionImage: "/media/home-shelf/entity-resolution.png",
    integrations: {
      heading: "Plugs into the stack you already run",
      items: [
        { name: "GitHub", icon: "/logos/integrations/GitHub.png" },
        { name: "GitLab", icon: "/logos/integrations/GitLab.png" },
        { name: "Terraform", icon: "/logos/integrations/Terraform.png" },
        { name: "Datadog", icon: "/logos/integrations/Datadog.png" },
        { name: "PagerDuty", icon: "/logos/integrations/PagerDuty.png" },
        { name: "Jira", icon: "/logos/integrations/Jira.png" },
        { name: "OPA", icon: "/logos/integrations/OPA.png" },
        { name: "Slack", icon: "/logos/integrations/Slack.png" },
      ],
    },
    footer: "Resolution covers what you connect. Nothing beyond that.",
  },
  finalCta: {
    heading: "Ready to run the autonomous factory?",
    cta: "Schedule demo",
  },
} as const;

export type HomeShelfContent = typeof homeShelf;
