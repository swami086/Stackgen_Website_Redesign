import type { Metric, Cta } from '@/lib/types';

const productInfrastructure = {
  slug: 'aiden-for-infrastructure',
  prompt: 'scan my prod AWS account and do a security audit',
  hero: {
    h1: 'Aiden for Infrastructure',
    sub: 'Intent becomes policy-checked infrastructure change. Build with governance at every action boundary.',
    support:
      'Part of the Agentic OS for DevOps. IaC tooling alone stops at templates. Aiden keeps Build inside the full loop.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '10×',
      label: 'provisioning velocity',
      mechanism:
        'Plain-language intent becomes a reviewable Factory Spec and policy-checked plan before apply.',
    },
    {
      value: '100%',
      label: 'policy-checked deploys',
      mechanism: 'Tirith evaluates each action boundary before infrastructure change executes.',
    },
    {
      value: '95%',
      label: 'less IaC toil',
      mechanism:
        'Cloud discovery, cloud-to-code generation, and continuous drift remediation reduce manual template work.',
    },
    {
      value: '60%',
      label: 'lower IaC cost',
      mechanism:
        'Right-sizing, drift detection, and policy-gated provisioning cut unused and non-compliant resources.',
    },
  ] satisfies Metric[],
  mechanism: {
    label: 'ADF LOOP · BUILD',
    heading: 'Intent becomes infrastructure change inside policy.',
    body: 'Aiden for Infrastructure turns plain-language outcomes into a Factory Spec, generates a reviewable plan, and applies only the bounded change your controls allow. Tirith evaluates each action boundary; drift detection keeps rollback close after apply.',
  },
  earlyAccess: {
    label: 'EARLY ACCESS',
    heading: 'Policy-bounded migration',
    body: 'Drift detection, baseline audits, and threshold rollbacks keep live workloads in transit inside policy.',
  },
  finalCta: {
    heading: 'See policy-checked Build on your stack.',
    body: 'Schedule a demo to walk through intent, Factory Spec, policy evaluation, and bounded apply on your infrastructure.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
};

export default productInfrastructure;
