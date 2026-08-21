import type { Metric, Cta } from '@/lib/types';

const productSre = {
  slug: 'aiden-for-sre',
  prompt: 'remediate the checkout latency incident inside policy',
  hero: {
    h1: 'Aiden for SRE',
    sub: 'Detect, triage, diagnose, and remediate within policy. Heal inside your SLOs.',
    support:
      'Part of the Agentic OS for DevOps. SRE-domain tools stop at one domain. Aiden remediates inside the same OS that builds and observes.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '50%',
      label: 'MTTR reduction',
      mechanism:
        'Evidence-backed root cause analysis on the OCG isolates failing dependencies before remediation.',
    },
    {
      value: '66%',
      label: 'faster RCA',
      mechanism:
        'Shared topology, change history, and observability context assemble the incident chain automatically.',
    },
    {
      value: '90%',
      label: 'less alert noise',
      mechanism: 'SLO-based alert triage and automatic service discovery filter signal from noise.',
    },
    {
      value: '10 to 15',
      label: 'hrs/week per SRE',
      mechanism:
        'Human-approved remediation within policy reclaims toil hours previously spent assembling context.',
    },
  ] satisfies Metric[],
  mechanism: {
    label: 'ADF LOOP · REMEDIATE',
    heading: 'Move from drift to recovery inside policy.',
    body: 'Aiden for SRE correlates alert signals with OCG history, generates the remediation, and ships it only when the policy boundary passes. Workflow orchestration sequences steps; policy enforces each action boundary.',
  },
  earlyAccess: null,
  finalCta: {
    heading: 'See bounded remediation on your stack.',
    body: 'Schedule a demo to walk through drift detection, root cause, policy-validated deploy, and SLO recovery.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default productSre;
