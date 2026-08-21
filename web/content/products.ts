/** Verbatim copy from App Replica product frames (light). */

import type { ProductSlug } from "@/lib/products";

export type ProductFooter = {
  tagline: string;
  copyright: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
};

export type MechanismStep = {
  tag: string;
  title: string;
  detail: string;
};

export type ProductMechanism = {
  heading: string;
  body: string;
  image?: {
    src: string;
    captionLabel: string;
    captionDetail: string;
  };
  callouts?: { label: string; detail: string }[];
  steps?: MechanismStep[];
  footnote?: string;
  prompt?: { label: string; text: string };
  correlation?: {
    signals: { category: string; detail: string }[];
    infraState: { label: string; items: string[] };
    changeHistory: { label: string; items: string[] };
    insight: { label: string; text: string };
  };
  handoff?: { label: string; text: string };
};

export type ProductContent = {
  slug: ProductSlug;
  frameLight: string;
  frameDark: string;
  hero: {
    label: string;
    heading: string;
    body: string;
    support: string;
    cta: { label: string };
  };
  metrics: { value: string; label: string }[];
  capabilities: { title: string; body: string }[];
  mechanism: ProductMechanism;
  earlyAccess?: {
    label: string;
    title: string;
    body: string;
    ctaLabel: string;
  };
  testimonial: {
    label: string;
    quote?: string;
    attribution?: string;
    placeholder?: string;
    note?: string;
  };
  finalCta: { heading: string; ctaLabel: string; href: string };
  footer: ProductFooter;
};

const PRODUCT_FOOTER: ProductFooter = {
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

export const products: Record<ProductSlug, ProductContent> = {
  "aiden-for-infrastructure": {
    slug: "aiden-for-infrastructure",
    frameLight: "qwI1S",
    frameDark: "GGu5s",
    hero: {
      label: "ADF LOOP · BUILD",
      heading: "Aiden for Infrastructure",
      body: "Intent becomes policy-checked infrastructure change. Build with governance at every action boundary.",
      support:
        "Part of the Agentic OS for DevOps. IaC tooling alone stops at templates. Aiden keeps Build inside the full loop.",
      cta: { label: "Get started" },
    },
    metrics: [
      { value: "10×", label: "provisioning velocity" },
      { value: "100%", label: "policy-checked deploys" },
      { value: "95%", label: "less IaC toil" },
      { value: "60%", label: "lower IaC cost" },
    ],
    capabilities: [
      {
        title: "Intent to Terraform",
        body: "State the outcome in plain language. Aiden drafts policy-checked Terraform.",
      },
      {
        title: "Your Git, always",
        body: "Every change lands as a reviewable pull request in your own repository.",
      },
      {
        title: "Cloud to code",
        body: "Discover live cloud state and normalize it into AppStacks without a rewrite.",
      },
    ],
    mechanism: {
      heading: "Intent becomes infrastructure change inside policy.",
      body: "Aiden for Infrastructure turns plain-language outcomes into a Factory Spec, generates a reviewable plan, and applies only the bounded change your controls allow.",
      image: {
        src: "/media/aiden-infra-security-audit/hero-i31kMgVn_Xk-1920.png",
        captionLabel: "Aiden Infra",
        captionDetail: "Skills editor — AWS Security Audit",
      },
      callouts: [
        {
          label: "Intent input",
          detail:
            "Teams describe the operational outcome in plain language instead of stitching the IaC path together by hand.",
        },
        {
          label: "Policy boundary",
          detail:
            "Every proposed change is checked against the governance threshold you configured before apply.",
        },
      ],
      steps: [
        {
          tag: "Intent",
          title: "Plain-language intent",
          detail:
            "An operator states the target state or migration outcome in plain language.",
        },
        {
          tag: "FactorySpec",
          title: "Factory Spec assembled",
          detail:
            "A reviewable spec defines agents, topology inputs, SLOs, and governance requirements.",
        },
        {
          tag: "Plan",
          title: "Policy-checked plan reviewed",
          detail:
            "A diffable infrastructure plan is generated and bounded before execution.",
        },
        {
          tag: "Apply",
          title: "Change lands under guardrails",
          detail:
            "Only the validated change is provisioned, with approvals added where the limit requires.",
        },
        {
          tag: "Watch",
          title: "Watch",
          detail:
            "Drift detection and baseline checks keep the environment aligned after the change lands.",
        },
        {
          tag: "Rollback",
          title: "Threshold rollback stays close",
          detail:
            "If live thresholds breach, rollback can trigger from the bounded change set without rebuilding context.",
        },
      ],
      footnote:
        "Tirith evaluates each action boundary; drift detection keeps rollback close after apply.",
    },
    earlyAccess: {
      label: "EARLY ACCESS",
      title: "Policy-bounded migration",
      body: "Drift detection, baseline audits, and threshold rollbacks keep live workloads in transit inside policy.",
      ctaLabel: "Request access",
    },
    testimonial: {
      label: "CUSTOMER",
      placeholder: "PLACEHOLDER — quote pending approval",
      note: "No customer quote ships here until it clears the approval tracker.",
    },
    finalCta: {
      heading: "See policy-checked infrastructure on your stack.",
      ctaLabel: "Schedule demo",
      href: "#",
    },
    footer: PRODUCT_FOOTER,
  },

  "aiden-for-automation": {
    slug: "aiden-for-automation",
    frameLight: "llzpJ",
    frameDark: "ZjYRz",
    hero: {
      label: "ADF LOOP · OPERATE",
      heading: "Aiden for Automation",
      body: "Pipeline-native delivery with governance in the path. Operate and maintain without the ticket tax.",
      support:
        "Part of the Agentic OS for DevOps. Maps to the Operate pillar in the ADF loop.",
      cta: { label: "Get started" },
    },
    metrics: [
      { value: "~30%", label: "fewer pipeline tickets" },
      { value: "Pre", label: "deploy infra checks" },
      { value: "Canary", label: "gates on release" },
      { value: "Auto", label: "rollback on breach" },
    ],
    capabilities: [
      {
        title: "Pipeline gating",
        body: "Every pipeline step checks against the Operational Context Graph before it proceeds.",
      },
      {
        title: "No blind merges",
        body: "Active gating stops a merge the moment context says it is unsafe.",
      },
      {
        title: "Self-verification",
        body: "Automation checks its own output before marking a task complete.",
      },
    ],
    mechanism: {
      heading: "Pipelines that verify before they promote.",
      body: "Aiden for Automation checks build output against live infrastructure context, gates risky changes, and confirms the release behaves after ship.",
      callouts: [
        {
          label: "Active Gating",
          detail:
            "Checks current infrastructure state against historical failure patterns in the Operational Context Graph before promotion.",
        },
        {
          label: "Self-Verification",
          detail:
            "Deployments verify themselves through post-release monitoring so drift and regressions surface immediately.",
        },
      ],
      steps: [
        {
          tag: "Commit",
          title: "Code commit",
          detail: "A source change lands in Git and starts the delivery path.",
        },
        {
          tag: "BuildTest",
          title: "Build and test",
          detail:
            "Linting, security scans, unit tests, and packaging validate the release artifact.",
        },
        {
          tag: "OCGCheck",
          title: "Infra checks against context graph",
          detail:
            "Live topology, recent drift, and failure history are queried before the pipeline can promote.",
        },
        {
          tag: "Gate",
          title: "Active gating",
          detail:
            "Unsafe releases halt when the current estate matches a risky pattern in the graph.",
        },
        {
          tag: "Deploy",
          title: "Deploy",
          detail:
            "The validated release provisions only the required change and keeps rollback close.",
        },
        {
          tag: "Monitor",
          title: "Monitoring confirms release health",
          detail:
            "Telemetry checks confirm the service stays inside SLO and the deploy does not introduce fresh drift.",
        },
      ],
      footnote:
        "The Operational Context Graph supplies shared failure history; monitoring closes the loop after every deploy.",
    },
    testimonial: {
      label: "CUSTOMER",
      placeholder: "PLACEHOLDER — quote pending approval",
      note: "No customer quote ships here until it clears the approval tracker.",
    },
    finalCta: {
      heading: "See governed pipelines on your stack.",
      ctaLabel: "Schedule demo",
      href: "#",
    },
    footer: PRODUCT_FOOTER,
  },

  "aiden-for-observability": {
    slug: "aiden-for-observability",
    frameLight: "JQkAE",
    frameDark: "VB4gY",
    hero: {
      label: "ADF LOOP · OBSERVE",
      heading: "Aiden for Observability",
      body: "Unified signal and AI-assisted insight that feeds Remediate. Natural language instead of dashboard archaeology.",
      support:
        "Part of the Agentic OS for DevOps. Observe feeds Remediate with correlated context.",
      cta: { label: "Get started" },
    },
    metrics: [
      { value: "60%+", label: "lower observability cost" },
      { value: "90%", label: "fewer O11Y tickets (greytHR)" },
      { value: "300+", label: "integrations" },
      { value: "PromQL", label: "native, no rewrite" },
    ],
    capabilities: [
      {
        title: "Signal correlation",
        body: "Metrics, logs, and traces resolve against real infra state and change history.",
      },
      {
        title: "Natural-language queries",
        body: "Ask what changed in plain language. Aiden traces the correlated cause.",
      },
      {
        title: "Handoff to SRE",
        body: "A correlated insight becomes an SRE investigation without a context reset.",
      },
    ],
    mechanism: {
      heading: "Ask production in plain language.",
      body: "greytHR used Aiden to replace complex queries with natural language insights and cut observability support tickets by 90 percent. The Operational Context Graph links live signals to infrastructure state and change history before SRE takes over.",
      image: {
        src: "/media/aiden-observability-sre-investigator/hero-HKEV6rkRDzU-1920.png",
        captionLabel: "Aiden Observability",
        captionDetail: "Approval & auto-remediation",
      },
      prompt: {
        label: "Plain-language prompt",
        text: "What changed before the latency spike?",
      },
      correlation: {
        signals: [
          { category: "Metrics", detail: "Latency spikes" },
          { category: "Logs", detail: "Error bursts" },
          { category: "Traces", detail: "Span bottlenecks" },
        ],
        infraState: {
          label: "INFRA STATE",
          items: ["Postgres replicas", "CPU / Memory load"],
        },
        changeHistory: {
          label: "CHANGE HISTORY",
          items: ["Deployment v1.4.2", "Config modification"],
        },
        insight: {
          label: "CORRELATED INSIGHT",
          text: "Latency spike triggered by configuration drift",
        },
      },
      handoff: {
        label: "Observe to remediate",
        text: "Observe hands SRE a correlated starting point with state and recent changes already attached.",
      },
    },
    testimonial: {
      label: "CUSTOMER",
      quote:
        "“The correlated view is what let us trust the alert instead of re-verifying it by hand.”",
      attribution: "Abhishek Gaurav, Head of Engineering and DevOps, greytHR",
    },
    finalCta: {
      heading: "See Observability with Aiden.",
      ctaLabel: "Schedule demo",
      href: "#",
    },
    footer: PRODUCT_FOOTER,
  },

  "aiden-for-sre": {
    slug: "aiden-for-sre",
    frameLight: "TIh4G",
    frameDark: "Q6ZkwE",
    hero: {
      label: "ADF LOOP · REMEDIATE",
      heading: "Aiden for SRE",
      body: "Detect, triage, diagnose, and remediate within policy. Heal inside your SLOs.",
      support:
        "Part of the Agentic OS for DevOps. SRE-domain tools stop at one domain. Aiden remediates inside the same OS that builds and observes.",
      cta: { label: "Get started" },
    },
    metrics: [
      { value: "50%", label: "MTTR reduction" },
      { value: "66%", label: "faster RCA" },
      { value: "90%", label: "less alert noise" },
      { value: "10 to 15", label: "hrs/week per SRE" },
    ],
    capabilities: [
      {
        title: "Shared investigation context",
        body: "Every incident opens with topology, change history, and prior remediations attached.",
      },
      {
        title: "Policy-bound remediation",
        body: "Aiden acts only inside the limits your change advisory board approved.",
      },
      {
        title: "Verification, not just action",
        body: "Every remediation confirms the fix before closing the loop.",
      },
    ],
    mechanism: {
      heading: "Move from drift to recovery inside policy.",
      body: "Aiden for SRE correlates alert signals with Operational Context Graph history, generates the remediation, and ships it only when the policy boundary passes.",
      steps: [
        {
          tag: "Infrawatch",
          title: "Infra drift present",
          detail:
            "Live infrastructure drifts from desired state and is scored as incident-relevant.",
        },
        {
          tag: "ChangeCorrelation",
          title: "P1 alert fires",
          detail:
            "Alert signals are linked back to the risky change and affected service path.",
        },
        {
          tag: "RootCause",
          title: "Root cause via context graph",
          detail:
            "Shared topology, change history, and observability context isolate the failing dependency.",
        },
        {
          tag: "Remediation",
          title: "Remediation generated",
          detail:
            "A safe infrastructure fix is proposed from the incident context instead of a blank runbook.",
        },
        {
          tag: "Deploy",
          title: "Policy-validated deploy",
          detail:
            "The change runs only after policy passes at the action boundary you configured.",
        },
        {
          tag: "Verification",
          title: "Verification / SLO recovered",
          detail:
            "Recovery is confirmed, the incident path closes, and the service returns inside SLO.",
        },
      ],
      footnote:
        "Workflow orchestration sequences steps; policy enforces each action boundary.",
    },
    testimonial: {
      label: "CUSTOMER",
      placeholder: "PLACEHOLDER — quote pending approval",
      note: "No customer quote ships here until it clears the approval tracker.",
    },
    finalCta: {
      heading: "See bounded remediation on your stack.",
      ctaLabel: "Schedule demo",
      href: "#",
    },
    footer: PRODUCT_FOOTER,
  },
};

export default products;
