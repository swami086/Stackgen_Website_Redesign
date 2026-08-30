---
title: "Enable Aiden SRE"
product: "aiden"
sourcePath: "/aiden/1.0/settings/aiden-sre"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/settings/aiden-sre"
status: "ok"
---

Aiden SRE is an AI assistant that helps you run Site Reliability Engineering (SRE) workflows by connecting to your observability and infrastructure tools. It can monitor systems, investigate incidents, and answer operational questions across your integrations.

You can enable Aiden SRE when creating a workspace. The onboarding flow guides you through integration setup and context entry so Aiden understands your environment quickly, then you review discovered infrastructure. The result is faster time-to-productivity for SRE teams, with clear contextual information up front.

**Why use Aiden SRE**

- **Semantic understanding**: Structured context and discovery give Aiden an understanding of your environment without manual effort.
- **Monitoring and investigation**: Aiden can monitor clusters and services and investigate incidents across your integrations.
- **Smart routing**: Queries are routed to the right observability tools.
- **Incident response**: Context reduces ambiguity during incident response. PagerDuty and Prometheus (and other supported integrations) are available for alerting and incident management.

### Enable Aiden SRE

See [Manage Workspaces](/docs/aiden/1.0/settings/workspaces) for the full workspace creation steps.

When creating a workspace, turn-on the **Enable Aiden SRE** toggle if you want this workspace to use Aiden for SRE workflows. After the workspace is created, you will be guided through SRE onboarding.

![Enable Aiden SRE](https://docs.stackgen.com/assets/images/workspace-create-sre-2b0f88c540dd8c50754e72c351ee30d8.png)

## Aiden SRE Onboarding

Aiden SRE Onboarding walks you through three steps:

1. Connecting your observability and incident-management integrations.
2. Adding a structured Knowledge Base context so Aiden understands your environment.
3. Reviewing the infrastructure that Aiden discovers and adding recommended integrations.

Completing these steps gives Aiden the context it needs for monitoring, investigation, and incident response.

### Setup integrations

Add integrations from the categories available in onboarding:

- **Observability** (e.g., Prometheus, Grafana, PagerDuty),
- **INFRA**,
- **SCM**,
- **CI/CD**.
Aiden uses these to monitor clusters and services, investigate incidents, and route queries to the right tools.

![Setup integrations](https://docs.stackgen.com/assets/images/aidensre-integrations-075593df0dbbf48fe5cd755ad1d7d73e.png)

### Context input and Knowledge Hub

A **Context Input** step lets you provide structured context so Aiden can reason about your environment. You can describe:

- Cluster environment descriptions
- Namespace ownership
- Alert routing
- Observability tool usage
- Incident management setup

Adding this context reduces ambiguity during incident responses. As the next step in onboarding, the Knowledge Hub is populated with discovered infrastructure data; you can add more text context to enhance Aiden's understanding.

![Context input and Knowledge Hub](https://docs.stackgen.com/assets/images/aidensre-knowledge-hub-34de6744a84c0a5c313a451dcc74e93f.png)

### Infrastructure discovery and recommendations

After integration setup, Aiden automatically:

- Detects clusters, namespaces, services, and data sources
- Identifies associated cloud providers (e.g., AWS, Azure)
- Recommends additional integrations based on discovered entities




![Infrastructure discovery and recommendations](https://docs.stackgen.com/assets/images/aidensre-discovery-1c37eff908413886def602096d10b426.png)


### Knowledge Hub, Tasks, and Skills From Discovery

Once you run a discovery, besides showing the resources in your environment, it also automatically populates:

- [Knowledge Hub](/docs/aiden/1.0/concepts/knowledgehub): Structured findings from discovery appear in the Knowledge Hub alongside any context you added during onboarding. That gives Aiden one place to reason about clusters, services, ownership, and related metadata before you enable tasks and skills.
- [Tasks](/docs/aiden/1.0/tasks): Incident-response tasks are created:

  - **Debug Service Outage**: runs when an issue is detected
  - **Monitor Services for Anomalies**: runs every hour
- **Optional notifications**: Link tasks to notification channels so the right people are alerted when something needs attention.
- [Skills](/docs/aiden/1.0/skills): Prebuilt skills from discovery that are ready-to-use:

  - Monitoring service health
  - Investigating incidents

These are generated using built-in templates tied to the resource discovery finds. This reduces manual configuration and speeds up operational readiness.

note

**Discovery flow behavior**

- Tasks and skills are created automatically from discovery results.
- New tasks are created in a **disabled** state so you can review them before enabling.
- Discovery results include more context, such as schedules, run times, and creators.

![Aiden SRE Discovery](https://docs.stackgen.com/assets/ideal-img/sre1RN01032026.9d94c78.100.png)‹›

−100%+⌂

Discovery

Run Aiden SRE Discovery to see what is running in your environment and capture the context Aiden uses to generate follow-on automation.

1 / 4

Once you've completed onboarding, you can view your discovery at any time from the [**Discovery** page](/docs/aiden/1.0/aiden-sre/discovery). The page shows discovery findings (clusters, services, data sources), discovery history with run status, and recommended integrations.

![Discovery page](https://docs.stackgen.com/assets/images/discovery-page-2e791b9676123cfa8e7fac6e1087daea.png)

## Additional Resources

- [Manage Workspaces](/docs/aiden/1.0/settings/workspaces): Create workspaces and enable Aiden SRE
- [Discovery](/docs/aiden/1.0/aiden-sre/discovery): View discovery findings, history, and recommended integrations
- [Tasks](/docs/aiden/1.0/tasks): How tasks run on schedules or triggers in Aiden
- [Skills](/docs/aiden/1.0/skills): How skills automate multi-step workflows
- [Knowledge Hub](/docs/aiden/1.0/concepts/knowledgehub): How Aiden uses knowledge and context
- [Integrations](/docs/aiden/1.0/integrations): Supported observability and infrastructure integrations

- [Enable Aiden SRE](/docs/aiden/1.0/settings/aiden-sre#enable-aiden-sre)
- [Aiden SRE Onboarding](/docs/aiden/1.0/settings/aiden-sre#aiden-sre-onboarding)
  - [Setup integrations](/docs/aiden/1.0/settings/aiden-sre#setup-integrations)
  - [Context input and Knowledge Hub](/docs/aiden/1.0/settings/aiden-sre#context-input-and-knowledge-hub)
  - [Infrastructure discovery and recommendations](/docs/aiden/1.0/settings/aiden-sre#infrastructure-discovery-and-recommendations)
  - [Knowledge Hub, Tasks, and Skills From Discovery](/docs/aiden/1.0/settings/aiden-sre#knowledge-hub-tasks-and-skills-from-discovery)
