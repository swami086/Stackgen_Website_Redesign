import type { Metric, Quote, Cta } from '@/lib/types';

const caseGreythr = {
  slug: 'greythr',
  hero: {
    h1: 'greytHR',
    sub: '50% MTTD/MTTR. 90% fewer O11Y support tickets. 65% less manual incident remediation.',
    support: 'Published quote from Abhishek Gaurav, Head of Engineering and DevOps.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
    quote: {
      text: 'Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.',
      attribution: 'Abhishek Gaurav',
      role: 'Head of Engineering and DevOps',
      company: 'greytHR',
      status: 'published',
      sourceUrl: 'https://stackgen.com/case-studies/greythr',
    } satisfies Quote,
  },
  metrics: [
    {
      value: '50%',
      label: 'MTTD and MTTR',
      mechanism:
        'Natural language observability insights and correlated incident context cut mean time to detect and resolve.',
    },
    {
      value: '90%',
      label: 'fewer O11Y tickets',
      mechanism:
        'Engineers query production in plain language instead of opening SRE support tickets for complex PromQL.',
    },
    {
      value: '65%',
      label: 'less manual remediation',
      mechanism:
        'Policy-bounded remediation with assembled context reduces manual incident runbook steps.',
    },
  ] satisfies Metric[],
  finalCta: {
    heading: 'Schedule a demo.',
    body: 'See how greytHR outcomes map to your observability and SRE workflow on Aiden.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default caseGreythr;
