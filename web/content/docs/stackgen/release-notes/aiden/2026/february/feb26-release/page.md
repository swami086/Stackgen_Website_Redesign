---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aiden/2026/february/feb26-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aiden/2026/february/feb26-release"
status: "ok"
---

The February 2026 Aiden release introduces **Aiden SRE** workspace onboarding with infrastructure discovery, adds **PagerDuty** support for incident investigation, and fixes several response and integration reliability issues.

Explore the sections below to see what's new and fixed in this update.

|  | Feature | Link |
| **What's New** | **SRE** | [Aiden SRE for Workspaces](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#aiden-sre-for-workspaces) |
| **Integrations** | [PagerDuty Integration Support](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#pagerduty-integration-support) |
| **What's Fixed** | **Reliability** | [Thought Without Actual Answer](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#thought-without-actual-answer) |
| [AWS CLI Timeout Error Message](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#aws-cli-timeout-error-message) |
| [Tabular Data Shown in Code Format](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#tabular-data-shown-in-code-format) |
| [GCP Integration in Integrated StackGen Aiden](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#gcp-integration-in-integrated-stackgen-aiden) |

## What's New

### Aiden SRE for Workspaces

Click to view

This release introduces Aiden SRE onboarding and infrastructure discovery. Aiden SRE is an AI assistant that helps you run Site Reliability Engineering (SRE) workflows by connecting to your observability and infrastructure tools. It can monitor systems, investigate incidents, and answer operational questions across your integrations.

![Enable Aiden SRE](https://docs.stackgen.com/assets/images/aidensre1RN01022026-2b0f88c540dd8c50754e72c351ee30d8.png)

**Aiden SRE onboarding**

You can now enable Aiden SRE when creating a workspace. The onboarding flow guides you through integration setup and mandatory context entry so Aiden can understand your environment quickly. You then review discovered infrastructure entities. The result is faster time-to-productivity for SRE teams, with clear contextual information up front.

**Integration: Infrastructure discovery and recommendations**

Once your observability integrations are connected, Aiden discovers your infrastructure and suggests next steps.

![Aiden SRE Onboarding Integrations](https://docs.stackgen.com/assets/images/aidensre2RN01022026-075593df0dbbf48fe5cd755ad1d7d73e.png)

![Aiden SRE Onboarding Integrations2](https://docs.stackgen.com/assets/images/aidensre3RN01022026-c5bef5717db404ca86de867acce83a35.png)

**Context input and Knowledge Hub**

A new Context Input step in onboarding lets you provide structured context so Aiden can reason about your environment and route queries to the right tools. You can describe cluster environments, namespace ownership, alert routing, observability tool usage, and incident management setup. As the next step, the Knowledge Hub is populated with discovered infrastructure data; adding this context reduces ambiguity during incident responses.

![Aiden SRE Onboarding Knowledge Base](https://docs.stackgen.com/assets/images/aidensre5RN01022026-34de6744a84c0a5c313a451dcc74e93f.png)

After integration setup, Aiden automatically:

- Detects clusters, namespaces, services, and data sources.
- Identifies associated cloud providers (for example, AWS, Azure).
- Recommends additional integrations based on discovered entities.

![Aiden SRE Onboarding Knowledge Base](https://docs.stackgen.com/assets/images/aidensre6RN01022026-1c37eff908413886def602096d10b426.png)

This ensures manual configuration is reduced and faster operational readiness.

**Why It Matters**

Structured context and discovery give Aiden a semantic understanding of your environment without manual effort. Aiden can monitor clusters and services, investigate incidents across integrations, route queries to the right observability tools, and reduce ambiguity during incident response. Grafana and Prometheus integrations are supported for alerting and incident management.

### PagerDuty Integration Support

Click to view

Aiden now supports PagerDuty Integration for incident investigation. You can fetch incident details by ID, retrieve summaries, query by status (Triggered, Acknowledged, Resolved), and summarize open incidents from within Aiden.

Typical use case for this integration is automation of your incident response by having Aiden receive a webhook from PagerDuty, correlate data from observability and cloud tools, generate an RCA, and update the PagerDuty ticket.

![PagerDuty incidents in Aiden](https://docs.stackgen.com/assets/images/aiden-pagerduty-incidents-8df3971c2acbb2ed404de538e3380647.png)

**Example prompts**

- "Get details for PagerDuty incident INC-1234"
- "Summarize all unresolved incidents"

**Why It Matters**

You get cross-platform incident visibility in Aiden without switching to PagerDuty; incident lookup and triage stay in context with your other observability and SRE workflows.

Check out the [PagerDuty integration](/docs/aiden/1.0/integrations/pagerduty) guide to set up and use the integration.

## What's Fixed

### Thought Without Actual Answer

Click to view

We have fixed an issue where Aiden sometimes returned only the thought (reasoning) and not the actual answer. Previously, you might see only the "Thought" and "Action" (for example, "Show 3 Thoughts") with no final answer below. Aiden now returns the full response so you get both the reasoning and the answer.

![Aiden returning only thought without answer](https://docs.stackgen.com/assets/images/aiden-thought-without-answer-f9c8348f20b085c4dc8f69e451fbc3da.png)

### AWS CLI Timeout Error Message

Click to view

We have fixed an issue where an AWS CLI timeout produced the error: `The AWS CLI command timed out. Please ask the user for necessary permissions.` Aiden interpreted this as a permissions problem even when the cause was something else (for example, network or resource delay). The timeout error message has been updated so Aiden no longer defaults to a permissions explanation and can respond more accurately.

### Tabular Data Shown in Code Format

Click to view

We have fixed an issue where Aiden sometimes displayed tabular data (for example, EC2 instance lists, query results) as plain text in a code block instead of a formatted table. That made the data hard to scan and understand. Aiden now renders tabular data using HTML table markup so responses are organized and easier to read.

![Aiden displaying tabular data in code format](https://docs.stackgen.com/assets/images/aiden-tabular-data-code-format-80948ea96da2add733d7b472ca05c75f.png)

### GCP Integration in Integrated StackGen Aiden

Click to view

We have fixed an issue where users could not create GCP integrations when using Aiden in the integrated StackGen experience (for example, from your company StackGen URL). GCP integrations can now be created and used in integrated Aiden environments.

- [What's New](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#whats-new)
  - [Aiden SRE for Workspaces](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#aiden-sre-for-workspaces)
  - [PagerDuty Integration Support](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#pagerduty-integration-support)
- [What's Fixed](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#whats-fixed)
  - [Thought Without Actual Answer](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#thought-without-actual-answer)
  - [AWS CLI Timeout Error Message](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#aws-cli-timeout-error-message)
  - [Tabular Data Shown in Code Format](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#tabular-data-shown-in-code-format)
  - [GCP Integration in Integrated StackGen Aiden](/docs/stackgen/release-notes/aiden/2026/february/feb26-release#gcp-integration-in-integrated-stackgen-aiden)
