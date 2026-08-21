/** Verbatim copy from Pencil frame `nwYaY` (Replica — Home light). */

export type HomeContent = {
  hero: {
    heading: string;
    body: string;
    support: string;
    cta: { label: string };
  };
  logos: {
    body: string;
    items: { src: string }[];
  };
  surfaces: {
    label: string;
    heading: string;
    items: { number: string; title: string; body: string }[];
  };
  mechanism: {
    title: string;
    caption: string;
    image: string;
  };
  problem: {
    heading: string;
    body: string;
    creation: { label: string; body: string };
    gap: { label: string; caption: string };
    operations: { label: string; body: string };
    painPoints: { label: string; body: string }[];
    stats: {
      value: string;
      headline: string;
      body: string;
      attribution: string;
    }[];
    closing: string;
  };
  factoryProcess: {
    heading: string;
    body: string;
    steps: { number: string; title: string; body: string }[];
  };
  adfLoop: {
    heading: string;
    body: string;
    inputs: {
      label: string;
      specTitle: string;
      specCaption: string;
      chips: string[];
    };
    factory: {
      label: string;
      stages: string[];
      osTitle: string;
      osCaption: string;
    };
    outcomes: { label: string; items: { value: string; label: string }[] };
    stateRail: { title: string; body: string }[];
  };
  agenticOs: {
    heading: string;
    body: string;
    products: {
      title: string;
      tagline: string;
      metrics: { value: string; label: string }[];
      features: string[];
      cta: string;
    }[];
    footer: string;
  };
  ocg: {
    heading: string;
    body: string;
    pillars: { title: string; body: string }[];
    footer: string;
  };
  integrations: {
    heading: string;
    body: string;
    categories: {
      label: string;
      caption: string;
      items: { name: string; icon: string }[];
    }[];
  };
  inTheirWords: {
    heading: string;
    testimonials: {
      company: string;
      quote: string;
      name: string;
      role: string;
    }[];
  };
  industries: {
    label: string;
    heading: string;
    items: { title: string; body: string }[];
    footer: string;
  };
  compliance: {
    heading: string;
    body: string;
    items: { title: string; body: string }[];
    badges: { label: string; icon: string }[];
  };
  useCases: {
    label: string;
    heading: string;
    items: { number: string; title: string; body: string }[];
  };
  finalCta: {
    modes: { title: string; body: string }[];
    tagline: string;
    heading: string;
    body: string;
    cta: { label: string };
  };
};

const home: HomeContent = {
  hero: {
    heading: "Autonomous DevOps Factory",
    body: "Aiden sets the foundations for an Autonomous DevOps Factory: build, govern, observe, and remediate the agent-driven SDLC so velocity and governance move in the same path.",
    support:
      "StackGen is the company behind Aiden, the DevOps operating system for AI-native environments. Platform and SRE leaders scale autonomy at the pace their confidence supports.",
    cta: { label: "Get started" },
  },

  logos: {
    body:
      "Gartner Cool Vendor in AI for IT Operations · Named in four Gartner Hype Cycles · AWS Advanced Technology Partner · Google Cloud Partner",
    items: [
      { src: ".firecrawl/logos-quotes/png/Nielsen.png" },
      { src: ".firecrawl/logos-quotes/png/GreytHR.png" },
      { src: ".firecrawl/logos-quotes/png/Corcentric.png" },
      { src: ".firecrawl/logos-quotes/png/Piramal.png" },
      { src: ".firecrawl/logos-quotes/png/NIQ.png" },
      { src: ".firecrawl/logos-quotes/png/Autodesk.png" },
      { src: ".firecrawl/logos-quotes/png/InMobi.png" },
      { src: ".firecrawl/logos-quotes/png/Innovaccer.png" },
    ],
  },

  surfaces: {
    label: "EVERY SURFACE",
    heading: "One graph. Every surface your team already uses.",
    items: [
      {
        number: "01",
        title: "CLI",
        body: "Run Aiden actions from the terminal, right where infra code already lives.",
      },
      {
        number: "02",
        title: "IDE via MCP",
        body: "Governed Aiden tools inside Cursor and VS Code without leaving the editor.",
      },
      {
        number: "03",
        title: "Git",
        body: "Every change lands as a reviewable pull request in your own repository.",
      },
      {
        number: "04",
        title: "Slack",
        body: "Approvals and remediation updates land where the on-call team already watches.",
      },
      {
        number: "05",
        title: "Jira / Linear",
        body: "Assign a ticket and Aiden picks up the context and reports back on it.",
      },
      {
        number: "06",
        title: "API",
        body: "Programmatic access for automation that does not fit a chat window.",
      },
    ],
  },

  mechanism: {
    title: "Aiden Change",
    caption: "Policy-bounded recovery / approval gate",
    image: "/media/aiden-home-change-surface/hero-HKEV6rkRDzU-1920.png",
  },

  problem: {
    heading: "Software creation now outpaces operations.",
    body: "Agentic creation compounds change faster than teams can verify, govern, and ship it safely. The result is a widening gap between software creation and software operations.",
    creation: {
      label: "Software Creation",
      body: "Agents compress local creation loops. Code, pull requests, and spec changes rise before governance catches up.",
    },
    gap: { label: "Gap", caption: "context gap" },
    operations: {
      label: "Software Operations",
      body: "Operations still carry the whole-system check. Approvals, drift checks, incident context, and rollback safety stay cross-domain.",
    },
    painPoints: [
      {
        label: "Manual toll",
        body: "Supervised deploys, approval chains, and stale runbooks slow each release.",
      },
      {
        label: "Reactive SRE",
        body: "On-call response starts with missing change history and fragmented tools.",
      },
      {
        label: "Stateless agents",
        body: "Domain helpers accelerate one lane at a time, not the shared operational loop.",
      },
    ],
    stats: [
      {
        value: "1.7x",
        headline: "more issues in AI-generated PRs",
        body: "Independent analysis found AI-authored pull requests carry more defects, especially logic and correctness bugs that become production incidents.",
        attribution: "CodeRabbit / Stack Overflow Blog, State of AI vs Human Code Generation",
      },
      {
        value: "78%",
        headline: "report more incidents once AI code is live",
        body: "Teams rate AI code highly in review, then see production failures after ship when line-by-line review is skipped.",
        attribution: "New Relic 2026 State of AI Coding",
      },
      {
        value: "DORA",
        headline: "AI helps productivity, hurts stability",
        body: "AI adoption raises individual productivity while hurting software delivery stability and throughput.",
        attribution: "DORA 2024 Accelerate State of DevOps Report",
      },
    ],
    closing: "Autonomy should scale at the pace of confidence, not at the pace of autocomplete.",
  },

  factoryProcess: {
    heading: "From intent to automated learning",
    body: "The factory process turns operational intent into a reviewable runtime and learning loop. ",
    steps: [
      {
        number: "01",
        title: "Intent",
        body: "State the operational outcome in plain language.",
      },
      {
        number: "02",
        title: "Factory Spec",
        body: "Reviewable spec: agents, Operational Context Graph data, SLOs, escalation boundaries.",
      },
      {
        number: "03",
        title: "Factory Runtime",
        body: "Agents execute; novel cases escalate to humans with full context.",
      },
      {
        number: "04",
        title: "Factory Learning",
        body: "Outcomes write back to the Operational Context Graph and improve the next cycle.",
      },
    ],
  },

  adfLoop: {
    heading: "Build, Operate, Observe, Remediate.",
    body: "Aiden sets the foundations for an Autonomous DevOps Factory. Four states of one Agentic OS, with velocity and governance in the same path.",
    inputs: {
      label: "INPUTS",
      specTitle: "Factory Spec",
      specCaption: "Reviewable. Diffable.",
      chips: ["Repos & IaC", "Telemetry", "Policies & SLOs", "Cloud state"],
    },
    factory: {
      label: "THE FACTORY",
      stages: ["Build", "Operate", "Observe", "Remediate"],
      osTitle: "Aiden OS",
      osCaption: "One Operational Context Graph. Policy gate at every action.",
    },
    outcomes: {
      label: "MEASURED OUTCOMES",
      items: [
        { value: "50%", label: "MTTR reduction" },
        { value: "60%", label: "lower IaC cost" },
        { value: "10×", label: "provisioning velocity" },
      ],
    },
    stateRail: [
      {
        title: "Build",
        body: "Intent becomes policy-checked infrastructure change. Aiden for Infrastructure owns the Build pillar.",
      },
      {
        title: "Operate",
        body: "Policy is evaluated at every action boundary before execution: deterministic, replayable, attributable.",
      },
      {
        title: "Observe",
        body: "Signal, SLOs, and cost budgets stay in the loop. Aiden for Observability feeds what Remediate needs.",
      },
      {
        title: "Remediate",
        body: "Heal inside your limits. Aiden for SRE remediates within policy and pulls humans in with context assembled.",
      },
    ],
  },

  agenticOs: {
    heading: "Aiden from StackGen is the Agentic OS for DevOps.",
    body: "Four surfaces for Platform Engineers, Developers, and SRE teams: Infrastructure, Automation, Observability, and SRE. Guardrails baked in. No organizational silos.",
    products: [
      {
        title: "Aiden for Infrastructure",
        tagline: "Stop choosing between fast and compliant.",
        metrics: [
          { value: "10×", label: "provisioning velocity: minutes, not days" },
          { value: "100%", label: "of deploys policy-checked" },
          { value: "95%", label: "less IaC toil" },
          { value: "60%", label: "lower IaC cost" },
        ],
        features: [
          "AI IDE-based infra creation via MCP",
          "Producer / consumer model",
          "Cloud discovery and cloud-to-code",
          "Continuous drift detection and remediation",
        ],
        cta: "Explore Aiden for Infrastructure",
      },
      {
        title: "Aiden for Automation",
        tagline: "Pipelines that check themselves before they ship.",
        metrics: [
          { value: "~30%", label: "fewer pipeline tickets" },
          { value: "Pre", label: "deploy infrastructure checks" },
          { value: "Canary", label: "gates on every release" },
          { value: "Auto", label: "rollback on breach" },
        ],
        features: [
          "Self-verifying, drift-aware pipelines",
          "Pre-deploy infrastructure validation",
          "Canary gates and auto-rollback",
          "GitOps-native",
        ],
        cta: "Explore Aiden for Automation",
      },
      {
        title: "Aiden for Observability",
        tagline: "Your monitoring stack shouldn't need its own on-call.",
        metrics: [
          { value: "60%+", label: "lower observability cost" },
          { value: "2 to 5", label: "SRE FTEs reclaimed" },
          { value: "300+", label: "integrations" },
          { value: "PromQL", label: "native, no rewrite" },
        ],
        features: [
          "Unified metrics, logs, traces and APM",
          "Drop-in Prometheus remote-write",
          "Open standards, managed OTel stack",
          "SLO management built in",
        ],
        cta: "Explore Aiden for Observability",
      },
      {
        title: "Aiden for SRE",
        tagline: "Less toil. Faster recovery. Your SREs, amplified.",
        metrics: [
          { value: "50%", label: "MTTR reduction" },
          { value: "66%", label: "faster root cause analysis" },
          { value: "90%", label: "less alert noise" },
          { value: "10 to 15", label: "hrs/week reclaimed per SRE" },
        ],
        features: [
          "Automatic service discovery",
          "SLO-based alert triage",
          "Evidence-backed root cause analysis",
          "Human-approved remediation",
        ],
        cta: "Try Aiden for SRE in action",
      },
    ],
    footer: "All four surfaces share one Operational Context Graph.",
  },

  ocg: {
    heading: "Operational Context Graph",
    body: "Topology, change, drift, causality, and observability live in one shared memory layer, allowing Aiden surfaces to act like one unified system.",
    pillars: [
      {
        title: "Topology",
        body: "What is running, where it lives, and how it connects.",
      },
      {
        title: "Change",
        body: "What changed, by whom, and when it landed.",
      },
      {
        title: "Drift",
        body: "What moved away from the intended state.",
      },
      {
        title: "Causality",
        body: "What explains the incident chain and blast radius.",
      },
      {
        title: "Observability",
        body: "What the system is signaling right now.",
      },
    ],
    footer: "Platform goes deeper: shared memory separates a factory from a pile of agents.",
  },

  integrations: {
    heading: "Stack-agnostic, by design.",
    body: "StackGen runs on top of the tools your team already uses. No rip-and-replace, no proprietary lock-in.",
    categories: [
      {
        label: "CLOUD",
        caption: "Run anywhere your workloads run.",
        items: [
          { name: "AWS", icon: ".firecrawl/official-logos/AWS.png" },
          { name: "Azure", icon: ".firecrawl/official-logos/Azure.png" },
          { name: "Google Cloud", icon: ".firecrawl/official-logos/GoogleCloud.png" },
          { name: "EKS", icon: ".firecrawl/official-logos/EKS.png" },
          { name: "AKS", icon: ".firecrawl/official-logos/AKS.png" },
          { name: "GKE", icon: ".firecrawl/official-logos/GKE.png" },
        ],
      },
      {
        label: "IaC",
        caption: "Generate in the language you already use.",
        items: [
          { name: "Terraform", icon: ".firecrawl/official-logos/Terraform.png" },
          { name: "OpenTofu", icon: ".firecrawl/official-logos/OpenTofu.png" },
          { name: "Helm", icon: ".firecrawl/official-logos/Helm.png" },
          {
            name: "CloudFormation",
            icon: ".firecrawl/official-logos/CloudFormation.png",
          },
        ],
      },
      {
        label: "CI / CD",
        caption: "Ship through your existing pipelines.",
        items: [
          { name: "GitHub", icon: ".firecrawl/official-logos/GitHub.png" },
          { name: "GitLab", icon: ".firecrawl/official-logos/GitLab.png" },
          { name: "Bitbucket", icon: ".firecrawl/official-logos/Bitbucket.png" },
          { name: "Jenkins", icon: ".firecrawl/official-logos/Jenkins.png" },
          { name: "Argo CD", icon: ".firecrawl/official-logos/ArgoCD.png" },
        ],
      },
      {
        label: "Observability",
        caption: "Read every signal you already collect.",
        items: [
          { name: "Grafana", icon: ".firecrawl/official-logos/Grafana.png" },
          { name: "Prometheus", icon: ".firecrawl/official-logos/Prometheus.png" },
          { name: "Loki", icon: ".firecrawl/official-logos/Loki-v2.png" },
          { name: "Jaeger", icon: ".firecrawl/official-logos/Jaeger.png" },
          {
            name: "OpenTelemetry",
            icon: ".firecrawl/official-logos/OpenTelemetry.png",
          },
          { name: "Datadog", icon: ".firecrawl/official-logos/Datadog.png" },
          { name: "New Relic", icon: ".firecrawl/official-logos/NewRelic.png" },
        ],
      },
      {
        label: "Security & Identity",
        caption: "Use the policy and identity you trust.",
        items: [
          { name: "Wiz", icon: ".firecrawl/official-logos/Wiz-icon.png" },
          {
            name: "HashiCorp Vault",
            icon: ".firecrawl/official-logos/HashiCorpVault.png",
          },
          { name: "Okta", icon: ".firecrawl/official-logos/Okta.png" },
          { name: "OPA", icon: ".firecrawl/official-logos/OPA.png" },
        ],
      },
      {
        label: "ChatOps & ITSM",
        caption: "Slot into your incident workflow.",
        items: [
          { name: "PagerDuty", icon: ".firecrawl/official-logos/PagerDuty.png" },
          { name: "Slack", icon: ".firecrawl/official-logos/Slack.png" },
          {
            name: "ServiceNow",
            icon: ".firecrawl/official-logos/ServiceNow-icon-v2.png",
          },
          { name: "Jira", icon: ".firecrawl/official-logos/Jira.png" },
        ],
      },
      {
        label: "IDEs & MCP clients",
        caption: "Aiden lives where your developers live.",
        items: [
          { name: "VS Code", icon: ".firecrawl/official-logos/VSCode.png" },
          { name: "Cursor", icon: ".firecrawl/official-logos/Cursor-icon.png" },
          { name: "Amazon Kiro", icon: ".firecrawl/official-logos/Kiro.png" },
          { name: "Claude Code", icon: ".firecrawl/official-logos/Claude-icon.png" },
          { name: "Backstage", icon: ".firecrawl/official-logos/Backstage.png" },
        ],
      },
    ],
  },

  inTheirWords: {
    heading: "Built with the teams running it.",
    testimonials: [
      {
        company: "GREYTHR",
        quote:
          "Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.",
        name: "Abhishek Gaurav",
        role: "HEAD OF ENGINEERING AND DEVOPS",
      },
      {
        company: "NIELSEN",
        quote:
          "Agents were shipping recommendations faster than our governance could absorb. Aiden put policy and audit on the same path as change.",
        name: "PLACEHOLDER",
        role: "VP PLATFORM ENGINEERING",
      },
      {
        company: "INNOVACCER",
        quote:
          "Deployment used to take days of cloud-specific glue. Environments now land in under a day, aligned to the controls healthcare requires.",
        name: "PLACEHOLDER",
        role: "CLOUD PLATFORM LEAD",
      },
      {
        company: "HEALTHCARE PLATFORM",
        quote:
          "Every root cause comes back with its sources attached. My engineers stopped arguing about what happened and started arguing about what to do next.",
        name: "[NAME]",
        role: "PRINCIPAL SRE",
      },
      {
        company: "MANUFACTURER",
        quote:
          "Provisioning went from a two-week ticket to an afternoon, and every deploy is policy-checked. Our auditors have stopped asking for screenshots.",
        name: "[NAME]",
        role: "HEAD OF CLOUD PLATFORM",
      },
    ],
  },

  industries: {
    label: "INDUSTRIES",
    heading: "Proven where the evidence is real.",
    items: [
      {
        title: "Financial services",
        body: "53,000 deployments a week, 24% rework, at one leading Latin American bank.",
      },
      {
        title: "Healthcare",
        body: "Innovaccer runs governed infrastructure change on Aiden today.",
      },
    ],
    footer:
      "More verticals as evidence lands. We do not publish a case we cannot prove.",
  },

  compliance: {
    heading: "Autonomy needs guardrails.",
    body: "Every Aiden action runs through policy at runtime, not as a static gate. Every decision logged. Every approval routed where it should go. That is what makes autonomous DevOps safe to run.",
    items: [
      {
        title: "Policy enforcement",
        body: "Runtime policy checks on every action before it executes.",
      },
      {
        title: "Audit trail",
        body: "Every Aiden action, decision, and tool call logged and queryable. Compliance-ready out of the box.",
      },
      {
        title: "Approval workflow",
        body: "Route to humans where it matters. Set thresholds by environment, blast radius, or cost.",
      },
      {
        title: "Organisational knowledge",
        body: "Runbooks, modules, incident signatures. Versioned, approved, and consumable by every agent.",
      },
    ],
    badges: [
      { label: "SOC 2", icon: ".firecrawl/official-logos/SOC2-badge.png" },
      { label: "PCI", icon: ".firecrawl/official-logos/PCI-SSC-badge.png" },
      { label: "HIPAA", icon: ".firecrawl/official-logos/HIPAA-badge.png" },
    ],
  },

  useCases: {
    label: "WHAT RUNS AUTONOMOUSLY",
    heading: "Bounded autonomy, four pillars.",
    items: [
      {
        number: "01",
        title: "Build",
        body: "Intent becomes policy-checked Terraform in your Git. Aiden for Infrastructure.",
      },
      {
        number: "02",
        title: "Govern",
        body: "Pipelines gate on Operational Context Graph checks before merge. Aiden for Automation.",
      },
      {
        number: "03",
        title: "Observe",
        body: "Signals correlate to change history and infra state. Aiden for Observability.",
      },
      {
        number: "04",
        title: "Remediate",
        body: "Incidents investigate with shared context, then act inside policy. Aiden for SRE.",
      },
    ],
  },

  finalCta: {
    modes: [
      { title: "Recommend", body: "Aiden proposes. You act." },
      { title: "Approve", body: "Aiden prepares. You sign off." },
      { title: "Act within policy", body: "Aiden acts. The gate holds the line." },
    ],
    tagline:
      "Recommend, approve, act within policy. Refuse when the limit you drew is crossed.",
    heading: "Scale autonomy with governance in the same path.",
    body: "Aiden is the Agentic OS for DevOps for Platform Engineers, Developers, and SRE teams. Schedule a demo to see build, govern, observe, and remediate under one operating system.",
    cta: { label: "Schedule demo" },
  },
};

export default home;
