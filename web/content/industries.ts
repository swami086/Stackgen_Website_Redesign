import type { Industry } from '@/lib/types';

const industries: Industry[] = [
  {
    slug: 'financial-services',
    name: 'Financial services',
    promise: 'Change lands inside the controls your risk function already set.',
    evidence:
      'One leading Latin American bank runs 53,000 deployments a week with a 60-day lead time. 24% of change effort is rework.',
    href: '/industries/financial-services',
    provenance: {
      kind: 'approved-evidence',
      approvedEvidence: 'PRODUCT.md: anonymized bank proof on 53,000 weekly deployments and 24% rework.',
    },
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    promise: 'Multi-cloud delivery lands faster with compliance evidence already attached.',
    evidence:
      'Innovaccer shipped 75% faster environment deployment. Script and environment toil fell by up to 80%. Compliance validation dropped from hours to minutes.',
    href: '/industries/healthcare',
    provenance: {
      kind: 'published-url',
      sourceUrl: 'https://stackgen.com/case-studies/innovacer',
    },
  },
];

export default industries;
