import type { SequenceItem } from '@/components/primitives/NumberedSequence';
import type { FeaturedCase, Metric, Quote, Cta, MomentumItem } from '@/lib/types';

const home = {
  hero: {
    h1: 'Autonomous DevOps Factory',
    sub: 'Aiden sets the foundations for an Autonomous DevOps Factory: build, govern, observe, and remediate the agent-driven SDLC so velocity and governance move in the same path.',
    support:
      'StackGen is the company behind Aiden, the DevOps operating system for AI-native environments. Platform and SRE leaders scale autonomy at the pace their confidence supports.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  mechanism: {
    label: 'aiden ‹for infrastructure›',
    heading: 'TIRITH POLICY GATE',
    body: 'Single-AZ exceeds the blast radius you set. Aiden held the change and routed it to the payments change owner with the plan and evidence attached.',
    intent:
      'Give payments-api a read replica in eu-west-1 with 30-day point-in-time recovery.',
    planFile: 'modules/payments-api/replica.tf',
    diff: [
      '+ resource "aws_db_instance" "payments_replica" {',
      '+   identifier              = "payments-api-euw1-ro"',
      '+   replicate_source_db     = aws_db_instance.payments.arn',
      '+   backup_retention_period = 30',
      '+   storage_encrypted       = true',
      '+   tags = { owner = "payments", slo = "99.95" }',
      '+ }',
      '',
      '~ output "payments_replica_endpoint" { sensitive = true }',
    ].join('\n'),
    verdict: {
      state: 'halt' as const,
      label: 'Stopped at your limit.',
      rule: 'blast-radius: single-az',
    },
    mergeTarget: 'acme-corp/infra · PR #2841',
  },
  logos: {
    heading:
      "Gartner Cool Vendor in AI for IT Operations · Named in four Gartner Hype Cycles · AWS Advanced Technology Partner · Google Cloud Partner",
    note: "Also on the live strip: SAP NS2, Lowe's, RocTop, Chamberlain.",
  },
  integrationCategories: [
    {
      label: 'CLOUD',
      subtitle: 'Run anywhere your workloads run.',
      tools: ['AWS', 'Azure', 'Google Cloud', 'EKS', 'AKS', 'GKE'],
    },
    {
      label: 'IaC',
      subtitle: 'Generate in the language you already use.',
      tools: ['Terraform', 'OpenTofu', 'Helm', 'CloudFormation'],
    },
    {
      label: 'CI / CD',
      subtitle: 'Ship through your existing pipelines.',
      tools: ['GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'Argo CD'],
    },
    {
      label: 'Observability',
      subtitle: 'Read every signal you already collect.',
      tools: [
        'Grafana',
        'Prometheus',
        'Loki',
        'Jaeger',
        'OpenTelemetry',
        'Datadog',
        'New Relic',
      ],
    },
    {
      label: 'Security & Identity',
      subtitle: 'Use the policy and identity you trust.',
      tools: ['Wiz', 'HashiCorp Vault', 'Okta', 'OPA'],
    },
    {
      label: 'ChatOps & ITSM',
      subtitle: 'Slot into your incident workflow.',
      tools: ['PagerDuty', 'Slack', 'ServiceNow', 'Jira'],
    },
    {
      label: 'IDEs & MCP clients',
      subtitle: 'Aiden lives where your developers live.',
      tools: ['VS Code', 'Cursor', 'Amazon Kiro', 'Claude Code', 'Backstage'],
    },
  ],
  problem: {
    label: 'Gap',
    heading: 'Software creation now outpaces operations.',
    body: 'Agentic creation compounds change faster than teams can verify, govern, and ship it safely. The result is a widening gap between software creation and software operations.',
    citations: [
      {
        claim:
          'Independent analysis found AI-authored pull requests carry more defects, especially logic and correctness bugs that become production incidents.',
        source: 'CodeRabbit / Stack Overflow Blog, State of AI vs Human Code Generation',
      },
      {
        claim:
          'Teams rate AI code highly in review, then see production failures after ship when line-by-line review is skipped.',
        source: 'New Relic 2026 State of AI Coding',
      },
      {
        claim:
          'AI adoption raises individual productivity while hurting software delivery stability and throughput.',
        source: 'DORA 2024 Accelerate State of DevOps Report',
      },
    ],
  },
  factoryProcess: {
    label: '01',
    heading: 'From intent to automated learning',
    steps: [
      {
        title: 'Intent',
        body: 'State the operational problem in plain language. (e.g. "reduce SRE on-call time for infra incidents").',
      },
      {
        title: 'Factory Spec',
        body: 'ADF translates intent into a reviewable spec defining agents, OCG data, SLOs, and escalation boundaries.',
      },
      {
        title: 'Factory Runtime',
        body: 'Agents execute their configured tasks, escalating novel edge cases to humans with full context.',
      },
      {
        title: 'Factory Learning',
        body: 'Every cycle writes incident patterns and remediation outcomes back to the OCG, improving the system automatically.',
      },
    ],
  },
  adfLoop: {
    label: 'THE FACTORY',
    heading: 'Build, Operate, observe, remediate.',
    stages: [
      {
        index: '01',
        title: 'Build',
        product: 'Aiden for Infrastructure',
        body: 'Intent becomes policy-checked infrastructure change. Aiden for Infrastructure owns the Build pillar.',
      },
      {
        index: '02',
        title: 'Govern',
        product: 'Aiden OS',
        body: 'Policy is evaluated at every action boundary before execution: deterministic, replayable, attributable.',
      },
      {
        index: '03',
        title: 'Observe',
        product: 'Aiden for Observability',
        body: 'Signal, SLOs, and cost budgets stay in the loop. Aiden for Observability feeds what Remediate needs.',
      },
      {
        index: '04',
        title: 'Remediate',
        product: 'Aiden for SRE',
        body: 'Heal inside your limits. Aiden for SRE remediates within policy and pulls humans in with context assembled.',
      },
    ],
  },
  agenticOs: {
    label: 'AGENTIC OS',
    heading: 'Aiden is the Agentic OS for DevOps.',
    body: 'Four surfaces for Platform Engineers, Developers, and SRE teams: Infrastructure, Automation, Observability, and SRE. Guardrails baked in. No organizational silos.',
  },
  contextGraph: {
    label: 'OPERATIONAL CONTEXT GRAPH',
    heading: 'Operational Context Graph',
    body: 'Topology, change, drift, causality, and observability live in one shared memory layer. That is how the four Aiden surfaces act like one system.',
  },
  integrations: {
    label: 'STACK-AGNOSTIC',
    heading: 'Stack-agnostic, by design.',
    deck: 'StackGen runs on top of the tools your team already uses. No rip-and-replace, no proprietary lock-in.',
  },
  inTheirWords: {
    label: 'CUSTOMER VOICE',
    heading: 'Built with the teams running it.',
    quotes: [
      {
        text: 'Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.',
        attribution: 'Abhishek Gaurav',
        role: 'Head of Engineering and DevOps',
        company: 'greytHR',
        status: 'published',
        sourceUrl: 'https://stackgen.com/case-studies/greythr',
      },
      {
        text: 'Agents were shipping recommendations faster than our governance could absorb. Aiden put policy and audit on the same path as change.',
        attribution: 'PLACEHOLDER',
        role: 'VP Platform Engineering',
        company: 'Nielsen',
        status: 'placeholder',
      },
      {
        text: 'Deployment used to take days of cloud-specific glue. Environments now land in under a day, aligned to the controls healthcare requires.',
        attribution: 'PLACEHOLDER',
        role: 'Cloud Platform Lead',
        company: 'Healthcare Platform',
        status: 'placeholder',
      },
      {
        text: 'Every root cause comes back with its sources attached. My engineers stopped arguing about what happened and started arguing about what to do next.',
        attribution: '[NAME]',
        role: 'Principal SRE',
        company: 'Manufacturer',
        status: 'placeholder',
      },
      {
        text: 'Provisioning went from a two-week ticket to an afternoon, and every deploy is policy-checked. Our auditors have stopped asking for screenshots.',
        attribution: '[NAME]',
        role: 'Head of Cloud Platform',
        company: 'Innovaccer',
        status: 'placeholder',
      },
    ] satisfies Quote[],
  },
  compliance: {
    label: 'GOVERNANCE',
    heading: 'Autonomy needs guardrails.',
    badges: ['SOC 2', 'PCI', 'HIPAA'],
  },
  useCases: [
    {
      title: 'Provision compliant infrastructure change',
      body: 'State the outcome. Aiden plans, checks policy, and applies the bounded change.',
    },
    {
      title: 'Verify a release before promotion',
      body: 'Pipelines compare build output to live context before promotion.',
    },
    {
      title: 'Explain a production spike fast',
      body: 'Signals, infra state, and change history line up before anyone guesses.',
    },
    {
      title: 'Remediate an incident inside policy',
      body: 'Aiden assembles context, proposes the fix, and stops at your refusal line.',
    },
    {
      title: 'Generate audit evidence on demand',
      body: 'Audits pull control evidence from the same runtime and policy path.',
    },
    {
      title: 'Learn from the last failure',
      body: 'Outcomes write back to the OCG so the next run starts informed.',
    },
  ] satisfies SequenceItem[],
  featuredCase: {
    videoId: 'V0zsWdJz2rs',
    poster: {
      status: 'pending',
      note: 'No verified public greytHR poster path is approved in Task 5 scope yet.',
    },
    quoteRef: 'case-greythr.hero.quote',
  } satisfies FeaturedCase,
  momentum: [
    {
      kind: 'report',
      title: 'State of Reliability 2026',
      detail: '178,000 incidents show how often AI coding reaches production before teams are ready.',
    },
    {
      kind: 'event',
      title: 'AI SRE meetup series',
      detail: 'Meetups turn recent incidents, controls, and operating patterns into live discussion.',
    },
    {
      kind: 'credential',
      title: 'Gartner Cool Vendor',
      detail: 'Cool Vendor status anchors the category claim with named analyst recognition.',
    },
    {
      kind: 'credential',
      title: 'Four Gartner Hype Cycles',
      detail: 'Four Gartner Hype Cycles keep Aiden visible in the markets buyers track.',
    },
  ] satisfies MomentumItem[],
  finalCta: {
    heading: 'Scale autonomy with governance in the same path.',
    body: 'Aiden is the Agentic OS for DevOps for Platform Engineers, Developers, and SRE teams. Schedule a demo to see build, govern, observe, and remediate under one operating system.',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  metrics: [
    {
      value: '50%',
      label: 'MTTR reduction',
      mechanism:
        'SLO-based alert triage and evidence-backed root cause analysis shorten incident resolution across the ADF loop.',
    },
    {
      value: '60%',
      label: 'lower IaC cost',
      mechanism:
        'Cloud discovery, drift detection, and policy-checked provisioning reduce rework and unused infrastructure spend.',
    },
    {
      value: '10×',
      label: 'provisioning velocity',
      mechanism:
        'AI IDE-based infra creation via MCP turns plain-language intent into reviewable, policy-checked infrastructure change in minutes.',
    },
  ] satisfies Metric[],
};

export default home;
