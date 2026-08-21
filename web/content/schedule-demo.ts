import type { Cta } from '@/lib/types';

const scheduleDemo = {
  hero: {
    h1: 'Schedule a demo',
    sub: 'See Aiden set the foundations for an Autonomous DevOps Factory on your stack. One primary action. No competing CTAs.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  formNote: 'Form fields land in implementation. Canvas shows conversion intent only.',
};

export default scheduleDemo;
