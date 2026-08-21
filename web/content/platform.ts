import type { Cta } from '@/lib/types';

const platform = {
  hero: {
    h1: 'Agentic OS for DevOps',
    sub: 'Aiden runs on one platform for Platform Engineers, Developers, and SRE teams: build, operate, monitor, and heal multi-cloud production for applications and AI agents, with guardrails baked in.',
    support:
      'Deterministic plane plus agentic plane. Shared Operational Context Graph. Tirith at every action boundary.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  twoPlanes: {
    label: 'AGENTIC OS',
    deterministic: {
      title: 'Deterministic plane',
      body: 'AppStacks, Terraform/OpenTofu, Tirith policy, topology. Reviewable and replayable.',
    },
    agentic: {
      title: 'Agentic plane',
      body: 'Aiden surfaces across Infrastructure, Automation, Observability, and SRE. Cross-domain plays share one context graph.',
    },
  },
  ocg: {
    label: 'OPERATIONAL CONTEXT GRAPH',
    heading: 'Operational Context Graph',
    body: 'The OCG connects operational domains into a queryable graph. That is what separates a factory from a collection of agents.',
    dimensions: [
      {
        title: 'Infrastructure Topology',
        body: 'Services, clusters, regions, and dependency paths in one map.',
      },
      {
        title: 'Change Attribution',
        body: 'PRs, deploys, authors, and rollout windows tied to each state change.',
      },
      {
        title: 'Drift History',
        body: 'Desired state versus live reality, with the timeline of what diverged.',
      },
      {
        title: 'Incident Causality',
        body: 'Timeline, blast radius, and remediation chain assembled before action.',
      },
      {
        title: 'Observability Correlations',
        body: 'Metrics, logs, traces, and symptom overlap pulled into one reasoning layer.',
      },
    ],
    sharedIntel: {
      heading: 'OCG Shared Intel',
      body: 'One memory layer that lets every Aiden surface query the same operational truth before it recommends, approves, or acts.',
      note: 'Queryable graph for cross-domain reasoning.',
    },
  },
  aidenOs: {
    label: 'AIDEN OS',
    heading: 'Aiden OS',
    body: 'Aiden OS coordinates how work moves between agents, when humans re-enter the loop, and how cost stays inside policy.',
    features: [
      {
        title: 'Workflow orchestration',
        body: 'Sequences multi-agent work with escalation to humans when bounds are hit.',
      },
      {
        title: 'Financial governance',
        body: 'Tracks inference and cost guardrails so autonomy stays inside budget policy.',
      },
    ],
    roadmap: {
      label: 'Roadmap',
      note: 'Early Access and H1 2027 items are not GA.',
      items: [
        'Currently Available: Aiden for Automation · Aiden for SRE',
        'Early Access: Aiden for Infrastructure · ADF factory generation',
        'H1 2027: MLOps Factory',
      ],
    },
  },
  productLinks: {
    heading: 'Four surfaces. One OS.',
    products: [
      { name: 'Aiden for Infrastructure', href: '/product/aiden-for-infrastructure' },
      { name: 'Aiden for Automation', href: '/product/aiden-for-automation' },
      { name: 'Aiden for Observability', href: '/product/aiden-for-observability' },
      { name: 'Aiden for SRE', href: '/product/aiden-for-sre' },
    ],
  },
  finalCta: {
    heading: 'See the Agentic OS on your stack.',
    body: 'Schedule a demo to walk through the deterministic and agentic planes on your multi-cloud production environment.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default platform;
