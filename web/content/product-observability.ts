import type { Metric, Cta } from '@/lib/types';

const productObservability = {
  slug: 'aiden-for-observability',
  hero: {
    h1: 'Aiden for Observability',
    sub: 'Unified signal and AI-assisted insight that feeds Remediate. Natural language instead of dashboard archaeology.',
    support: 'Part of the Agentic OS for DevOps. Observe feeds Remediate with correlated context.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '60%+',
      label: 'lower observability cost',
      mechanism:
        'Drop-in Prometheus remote-write and managed OpenTelemetry reduce duplicate tooling and toil.',
    },
    {
      value: '90%',
      label: 'fewer O11Y tickets (greytHR)',
      mechanism:
        'Natural language insights replace complex queries and cut observability support dependency on SREs.',
    },
    {
      value: '300+',
      label: 'integrations',
      mechanism:
        'Unified metrics, logs, traces, and APM connect to the tools teams already run in production.',
    },
    {
      value: 'PromQL',
      label: 'native, no rewrite',
      mechanism: 'Existing PromQL queries and dashboards port without a monitoring stack rewrite.',
    },
  ] satisfies Metric[],
  mechanism: {
    label: 'ADF LOOP · OBSERVE',
    heading: 'Ask production in plain language.',
    body: 'greytHR used Aiden to replace complex queries with natural language insights and cut observability support tickets by 90 percent. The OCG links live signals to infrastructure state and change history before SRE takes over. Observe hands SRE a correlated starting point with state and recent changes already attached.',
  },
  earlyAccess: null,
  finalCta: {
    heading: 'See Observability with Aiden.',
    body: 'Schedule a demo to correlate signals with infrastructure state and change history in plain language.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default productObservability;
