import type { Metric, Cta } from '@/lib/types';

const productAutomation = {
  slug: 'aiden-for-automation',
  hero: {
    h1: 'Aiden for Automation',
    sub: 'Pipeline-native delivery with governance in the path. Operate and maintain without the ticket tax.',
    support: 'Part of the Agentic OS for DevOps. Maps to the Operate pillar in the ADF loop.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '~30%',
      label: 'fewer pipeline tickets',
      mechanism:
        'Self-verifying pipelines query the OCG for live topology and failure history before promotion.',
    },
    {
      value: 'Pre',
      label: 'deploy infra checks',
      mechanism:
        'Pre-deploy infrastructure validation compares build output against current cloud state in the Operational Context Graph.',
    },
    {
      value: 'Canary',
      label: 'gates on release',
      mechanism: 'Active gating halts unsafe releases when live state matches a risky pattern in the graph.',
    },
    {
      value: 'Auto',
      label: 'rollback on breach',
      mechanism:
        'Post-release monitoring confirms SLO health and triggers rollback when thresholds breach after deploy.',
    },
  ] satisfies Metric[],
  mechanism: {
    label: 'ADF LOOP · OPERATE',
    heading: 'Pipelines that verify before they promote.',
    body: 'Aiden for Automation checks build output against live infrastructure context, gates risky changes, and confirms the release behaves after ship. The OCG supplies shared failure history; monitoring closes the loop after every deploy.',
  },
  earlyAccess: null,
  finalCta: {
    heading: 'See governed pipelines on your stack.',
    body: 'Schedule a demo to walk through commit, build, OCG checks, gating, deploy, and post-release verification.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default productAutomation;
