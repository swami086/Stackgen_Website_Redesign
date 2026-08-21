import type { Metric, Cta } from '@/lib/types';

const caseInnovaccer = {
  slug: 'innovaccer',
  hero: {
    h1: 'Innovaccer',
    sub: '75% faster environment deployment. Up to 80% less script and environment toil. Compliance validation cut from hours to minutes.',
    support: 'Lead with metrics. Do not present unverified named quotes as real.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '75%',
      label: 'faster environment deployment',
      mechanism:
        'Multi-cloud AWS and Azure provisioning under one control plane replaces days of cloud-specific glue.',
    },
    {
      value: '80%',
      label: 'less script and environment toil',
      mechanism:
        'Policy-checked infrastructure generation and drift remediation reduce manual script maintenance.',
    },
    {
      value: 'Minutes',
      label: 'compliance validation',
      mechanism:
        'Automated compliance validation replaces hours-long manual checks required for healthcare controls.',
    },
  ] satisfies Metric[],
  finalCta: {
    heading: 'Schedule a demo.',
    body: 'See how Innovaccer deployment and compliance outcomes map to your multi-cloud control plane.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default caseInnovaccer;
