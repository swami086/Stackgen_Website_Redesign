/** Verbatim copy from Pencil frame `kQPf7` (Replica — Platform light). */

import type { ProductFooter } from "@/content/products";

export type PlatformContent = {
  hero: {
    label: string;
    heading: string;
    body: string;
    support: string;
    cta: { label: string };
  };
  trustedBy: {
    framing: string;
    logos: { src: string }[];
  };
  byTheNumbers: {
    label: string;
    stats: { value: string; label: string; mech: string }[];
  };
  twoPlanes: {
    deterministic: { title: string; body: string };
    agentic: { title: string; body: string };
  };
  ocg: {
    heading: string;
    body: string;
    flowLabels: string[];
    pillars: { title: string; body: string }[];
    hub: { title: string; body: string; footnote: string };
    chips: string[];
  };
  aidenOs: {
    heading: string;
    body: string;
    modules: { title: string; body: string }[];
    roadmap: {
      heading: string;
      currentlyAvailable: string;
      earlyAccess: string;
      h1_2027: string;
    };
    productLinks: {
      heading: string;
      links: { label: string; href: string }[];
    };
  };
  compliance: {
    label: string;
    badges: string[];
  };
  finalCta: {
    heading: string;
    body: string;
    cta: { label: string };
  };
  footer: ProductFooter;
};

const PLATFORM_FOOTER: ProductFooter = {
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

const platform: PlatformContent = {
  hero: {
    label: "AGENTIC OS",
    heading: "Agentic OS for DevOps",
    body: "Aiden runs on one platform for Platform Engineers, Developers, and SRE teams: build, operate, monitor, and heal multi-cloud production for applications and AI agents, with guardrails baked in.",
    support:
      "Deterministic plane plus agentic plane. Shared Operational Context Graph. Tirith at every action boundary.",
    cta: { label: "Get started" },
  },

  trustedBy: {
    framing:
      "Running in production across regulated and high-scale environments.",
    logos: [
      { src: "/logos/customers/Nielsen.png" },
      { src: "/logos/customers/GreytHR.png" },
      { src: "/logos/customers/Corcentric.png" },
      { src: "/logos/customers/Piramal.png" },
      { src: "/logos/customers/NIQ.png" },
      { src: "/logos/customers/SAP-NS2.png" },
      { src: "/logos/customers/Lowes.png" },
      { src: "/logos/customers/Autodesk.png" },
      { src: "/logos/customers/InMobi.png" },
      { src: "/logos/customers/Innovaccer.png" },
    ],
  },

  byTheNumbers: {
    label: "BY THE NUMBERS",
    stats: [
      {
        value: "10×",
        label: "velocity",
        mech: "Infrastructure change ships as fast as the policy check clears.",
      },
      {
        value: "100%",
        label: "policy-checked deploys",
        mech: "Every change evaluates against Tirith before it lands.",
      },
      {
        value: "95%",
        label: "less IaC toil",
        mech: "Manual Terraform authoring drops once intent drives the spec.",
      },
      {
        value: "60%",
        label: "lower IaC cost",
        mech: "Fewer stale modules, less rework, less duplicated state.",
      },
    ],
  },

  twoPlanes: {
    deterministic: {
      title: "Deterministic plane",
      body: "AppStacks, Terraform/OpenTofu, Tirith policy, topology. Reviewable and replayable.",
    },
    agentic: {
      title: "Agentic plane",
      body: "Aiden surfaces across Infrastructure, Automation, Observability, and SRE. Cross-domain plays share one context graph.",
    },
  },

  ocg: {
    heading: "Operational Context Graph",
    body: "The Operational Context Graph connects operational domains into a queryable graph. That is what separates a factory from a collection of agents.",
    flowLabels: [
      "topology →",
      "change →",
      "drift →",
      "incident →",
      "signals →",
    ],
    pillars: [
      {
        title: "Infrastructure Topology",
        body: "Services, clusters, regions, and dependency paths in one map.",
      },
      {
        title: "Change Attribution",
        body: "PRs, deploys, authors, and rollout windows tied to each state change.",
      },
      {
        title: "Drift History",
        body: "Desired state versus live reality, with the timeline of what diverged.",
      },
      {
        title: "Incident Causality",
        body: "Timeline, blast radius, and remediation chain assembled before action.",
      },
      {
        title: "Observability Correlations",
        body: "Metrics, logs, traces, and symptom overlap pulled into one reasoning layer.",
      },
    ],
    hub: {
      title: "Shared Context Intel",
      body: "One memory layer that lets every Aiden surface query the same operational truth before it recommends, approves, or acts.",
      footnote: "Queryable graph for cross-domain reasoning.",
    },
    chips: ["Service", "Deploy", "Signal", "Incident"],
  },

  aidenOs: {
    heading: "Aiden OS",
    body: "Aiden OS coordinates how work moves between agents, when humans re-enter the loop, and how cost stays inside policy.",
    modules: [
      {
        title: "Workflow orchestration",
        body: "Sequences multi-agent work with escalation to humans when bounds are hit.",
      },
      {
        title: "Financial governance",
        body: "Tracks inference and cost guardrails so autonomy stays inside budget policy.",
      },
    ],
    roadmap: {
      heading: "Roadmap",
      currentlyAvailable:
        "Currently Available: Aiden for Automation · Aiden for SRE",
      earlyAccess:
        "Early Access: Aiden for Infrastructure · ADF factory generation",
      h1_2027: "MLOps Factory",
    },
    productLinks: {
      heading: "Four surfaces. One OS.",
      links: [
        {
          label: "Aiden for Infrastructure",
          href: "/product/aiden-for-infrastructure",
        },
        {
          label: "Aiden for Automation",
          href: "/product/aiden-for-automation",
        },
        {
          label: "Aiden for Observability",
          href: "/product/aiden-for-observability",
        },
        { label: "Aiden for SRE", href: "/product/aiden-for-sre" },
      ],
    },
  },

  compliance: {
    label: "COMPLIANCE",
    badges: ["SOC 2", "PCI", "HIPAA"],
  },

  finalCta: {
    heading: "See the Agentic OS on your stack.",
    body: "One platform for Platform Engineers, Developers, and SRE teams — build, operate, and heal with guardrails baked in.",
    cta: { label: "Schedule demo" },
  },

  footer: PLATFORM_FOOTER,
};

export default platform;
