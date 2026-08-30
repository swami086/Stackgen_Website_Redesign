---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aiden/2026/june/v2026-6-8"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aiden/2026/june/v2026-6-8"
status: "ok"
---

The June 2026 **v2026.6.8** release adds **light mode**, **task support for Persona/Functional Agents**, and **new tool integrations**, along with Grafana dashboard editing, broader alert filtering, and several reliability fixes.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **UI** | [Aiden Light Mode](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#aiden-light-mode) |
| **Agents** | [Task Support for Functional Agents](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#task-support-for-functional-agents) |
| **Integrations** | [New Tool Integrations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#new-tool-integrations) |
| **What's Enhanced** | **Integrations** | [Grafana Dashboard Creation and Editing](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#grafana-dashboard-creation-and-editing) |
| [Alert Filtering Integrations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#alert-filtering-integrations) |
| [Vault Integration Storage](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#vault-integration-storage) |
| **Alerts** | [Expanded Alert Injection Filtering Operators](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#expanded-alert-injection-filtering-operators) |
| **Investigations** | [Investigation Tracking Enhancements](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#investigation-tracking-enhancements) |
| **What's Fixed** | **Integrations** | [Harness Integration Validation](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#harness-integration-validation) |
| [Multiple Loki Configurations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#multiple-loki-configurations) |
| [Multiple AWS Integration Handling](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#multiple-aws-integration-handling) |
| [MySQL Integration Queries](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#mysql-integration-queries) |
| **Agents** | [Azure Agent Error Formatting](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#azure-agent-error-formatting) |
| **Investigations** | [Manual Investigation Progress Bar](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#manual-investigation-progress-bar) |
| **Platform** | [Deploy Terraform Hang State](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#deploy-terraform-hang-state) |
| [Non-JSON Chat Inputs](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#non-json-chat-inputs) |
| [Knowledge Source List Tool](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#knowledge-source-list-tool) |

## What's New

### Aiden Light Mode

Click to view

**Aiden** now includes a **light mode** toggle, letting you switch the interface between light and dark mode, with corresponding background and UI component adjustments.

**Why It Matters**

Teams can match Aiden to their preferred visual environment, whether that's a bright workspace or a low-light setup.

### Task Support for Functional Agents

Click to view

When creating tasks, you can now assign task actions to **Persona/Functional Agents** powered by specific custom prompts, expanding beyond standard integration experts.

**Why It Matters**

Tasks aren't limited to built-in integration experts anymore. You can route work to agents tailored with custom prompts for your specific use case.

### New Tool Integrations

Click to view

Aiden adds support for several new integrations:

- **Civo Cloud**: Connect using an API key and query cloud networks via the Civo expert.
- **New Relic**, **Fire Hydrant**, and **Squadcast**: Initial integration support added.

**Why It Matters**

Expanded integration coverage lets more teams bring their existing tools into Aiden's investigation and automation workflows.

## What's Enhanced

### Grafana Dashboard Creation and Editing

Click to view

Grafana integration support has been expanded. You can now prompt Aiden to **create and edit dashboards** using specified filters and details, moving beyond the previous read-only access.

**Why It Matters**

You can manage dashboards conversationally through Aiden instead of switching to Grafana for setup and edits.

### Expanded Alert Injection Filtering Operators

Click to view

Alert rule import filters now support additional operators:

- `equals`
- `not equals`
- `greater than`
- `less than`
- `contains`
- `starts with`
- `ends with`

**Why It Matters**

More granular filtering lets you scope alert imports more precisely to the rules you actually want.

### Alert Filtering Integrations

Click to view

Alert filtering capabilities have been expanded beyond **PagerDuty** to include **ObserveNow** and **Datadog** integrations.

**Why It Matters**

Teams using ObserveNow or Datadog for alerting now get the same filtering control previously available only for PagerDuty.

### Vault Integration Storage

Click to view

Added API support to read, update, fetch, and store credentials at runtime in the vault for **Fire Hydrant**, **Jenkins**, **SonarQube**, and **DigitalOcean**.

**Why It Matters**

Credentials for these tools are now managed securely and consistently through the vault, rather than requiring separate handling.

### Investigation Tracking Enhancements

Click to view

- Added a **View Investigation** button to the resolved alerts UI, so you can easily view connected investigation data.
- Fixed the **Reopen** button's link flow to route correctly.

**Why It Matters**

Makes it easier to trace an alert back to its investigation history after resolution, and ensures reopening an alert takes you to the right place.

## What's Fixed

### Harness Integration Validation

Click to view

We fixed a bug that broke validation flows when defining a **Harness** integration.

### Azure Agent Error Formatting

Click to view

We fixed a text-formatting bug where prompt/chat errors returned by Azure agents were not rendered accurately alongside standard A2I components.

### Manual Investigation Progress Bar

Click to view

We fixed an issue where initiating a manual investigation from an alert opened a blank window with no feedback. A loading state progress bar has been added.

### Multiple Loki Configurations

Click to view

We fixed a backend configuration flag constraint that previously restricted users to a single **Loki** configuration. You can now add multiple configurations.

### Multiple AWS Integration Handling

Click to view

We fixed a system prompt resolution error that occurred when a user had multiple **AWS** integrations configured under different access styles (for example, role-based vs. access keys).

### Deploy Terraform Hang State

Click to view

We fixed a bug where prompting a deploy Terraform/IaC action caused the application to freeze. The operation now completes with a proper success or failure message.

### Non-JSON Chat Inputs

Click to view

We fixed an error handling bug where non-JSON chat strings (such as YAML inputs) caused system failures.

### Knowledge Source List Tool

Click to view

We fixed a bug causing the `list knowledge sources` tool to fail during Azure-related queries.

### MySQL Integration Queries

Click to view

We fixed an issue where database queries to MySQL integrations failed due to configuration errors.

- [What's New](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#whats-new)
  - [Aiden Light Mode](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#aiden-light-mode)
  - [Task Support for Functional Agents](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#task-support-for-functional-agents)
  - [New Tool Integrations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#new-tool-integrations)
- [What's Enhanced](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#whats-enhanced)
  - [Grafana Dashboard Creation and Editing](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#grafana-dashboard-creation-and-editing)
  - [Expanded Alert Injection Filtering Operators](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#expanded-alert-injection-filtering-operators)
  - [Alert Filtering Integrations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#alert-filtering-integrations)
  - [Vault Integration Storage](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#vault-integration-storage)
  - [Investigation Tracking Enhancements](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#investigation-tracking-enhancements)
- [What's Fixed](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#whats-fixed)
  - [Harness Integration Validation](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#harness-integration-validation)
  - [Azure Agent Error Formatting](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#azure-agent-error-formatting)
  - [Manual Investigation Progress Bar](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#manual-investigation-progress-bar)
  - [Multiple Loki Configurations](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#multiple-loki-configurations)
  - [Multiple AWS Integration Handling](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#multiple-aws-integration-handling)
  - [Deploy Terraform Hang State](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#deploy-terraform-hang-state)
  - [Non-JSON Chat Inputs](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#non-json-chat-inputs)
  - [Knowledge Source List Tool](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#knowledge-source-list-tool)
  - [MySQL Integration Queries](/docs/stackgen/release-notes/aiden/2026/june/v2026-6-8#mysql-integration-queries)
