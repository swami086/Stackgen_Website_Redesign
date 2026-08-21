import type { Cta } from '@/lib/types';

const caseIndex = {
  hero: {
    h1: 'Case studies',
    sub: 'Customer proof for the Agentic OS and ADF loop. Featured: greytHR and Innovaccer.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  cases: [
    {
      slug: 'greythr',
      company: 'greytHR',
      summary:
        'Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.',
      attribution: 'Abhishek Gaurav, Head of Engineering and DevOps · PUBLISHED',
      href: '/case-studies/greythr',
    },
    {
      slug: 'innovaccer',
      company: 'Innovaccer',
      summary:
        '75% faster environment deployment. Up to 80% less script maintenance. Multi-cloud AWS and Azure under one control plane.',
      attribution: 'Published case metrics · named quote PLACEHOLDER until approved',
      href: '/case-studies/innovaccer',
    },
  ],
  finalCta: {
    heading: 'Talk through a case on your stack.',
    body: 'Schedule a demo to map greytHR and Innovaccer outcomes to your infrastructure and SRE workflow.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default caseIndex;
