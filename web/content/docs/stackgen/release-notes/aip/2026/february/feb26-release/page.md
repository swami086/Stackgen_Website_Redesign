---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/february/feb26-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/february/feb26-release"
status: "ok"
---

StackGen's February 2026 Release focuses on improving the day-to-day experience of building and managing infrastructure. We've reorganized the Topology page with a cleaner canvas and consolidated actions. Terraform expressions now provide clearer visual feedback and support complex expressions such as `concat`, `merge`, and `jsonencode`. We've simplified snapshots by removing versioning and correctly capturing variables, locals, and providers when you restore. We've also fixed push to Git for Azure DevOps, spaces in Git subdirectory paths for custom modules, and snapshot propagation for Terraform block configurations.

Explore what's new and see how StackGen continues to simplify infrastructure operations.

Discover What's New, What's Enhanced, What's Changed, and What's Fixed; and how these updates make building and managing your infrastructure more intuitive.

|  | Feature | Link |
| **What's New** | **Topology** | [New Topology Page UI](/docs/stackgen/release-notes/aip/2026/february/feb26-release#new-topology-page-ui) |
| **Aiden** | [Aiden SRE for Workspaces](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-sre) |
| [PagerDuty Integration Support](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-pagerduty) |
| **What's Enhanced** | **Terraform Expressions** | [Terraform Expressions: UI and Complex Expressions](/docs/stackgen/release-notes/aip/2026/february/feb26-release#terraform-expressions-ui-and-complex-expressions) |
| **What's Changed** | **Snapshots** | [Snapshots and Versioning](/docs/stackgen/release-notes/aip/2026/february/feb26-release#snapshots-and-versioning) |
| **What's Fixed** | **Platform** | [Push to Git Failing for Azure DevOps](/docs/stackgen/release-notes/aip/2026/february/feb26-release#platform-push-to-git-failing-for-azure-devops) |
| **Custom Modules** | [Spaces in Git Subdirectory Paths Not Escaped](/docs/stackgen/release-notes/aip/2026/february/feb26-release#spaces-in-git-subdirectory-paths-not-escaped) |
| **Terraform Block** | [Variables, Locals, and Providers Not Captured in Snapshots](/docs/stackgen/release-notes/aip/2026/february/feb26-release#variables-locals-providers-not-captured-in-snapshots) |
| **Aiden** | [Thought Without Actual Answer](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-fixed) |
| [AWS CLI Timeout Error Message](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-fixed) |
| [Tabular Data in Code Format](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-fixed) |
| [GCP Integration in Integrated StackGen Aiden](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-fixed) |

## What's New

### New Topology Page UI

Click to view

We've reorganized the Topology page when creating or adding appStacks. All options that were previously on the canvas have been moved to the top navigation bar, giving you a cleaner canvas and a more intuitive workflow.

**Key Changes**

- **\+ Add New button** \- The Add Resources and Add TF Module buttons have been consolidated into a single **\+ Add New** button. When you click it, you get two options:


  - **Resource** \- Opens the resource panel so you can add infrastructure resources to your topology.
  - **Terraform Block** \- Opens the Terraform Configuration panel with tabs for `Variables`, `Locals`, `Providers`, and `State Backend`.

![New Topology Page with Add New Button](https://docs.stackgen.com/assets/images/topologynewpage022026-6bd8c60c35e2e454c4eb2958371a7045.png)

![Terraform Block Configuration](https://docs.stackgen.com/assets/images/terrsformblocktopology02026-b283f7d57a8cc87819ec9b6cb828f72b.png)

- **Resources, Policies, and Cost Estimate** \- These tabs are now hidden behind a three-dot `(⋮)` toggle next to the IaC tab. Click the toggle to reveal these options.



![Three-Dot Toggle for Resources, Policies, and Cost Estimate](https://docs.stackgen.com/assets/images/topology3dotstoggle022026-3f0f93854184eefc653c90c17288e415.png)

- **Deploy and other actions** \- The Download IaC button is no longer visible by default. The **Push to Git** button appears only after you have added resources and there are no violations. Once a module is added, you'll see Push to Git along with Import, Download, Topology, JSON, CLI Runs, ShareInfra, and other options.


**Why It Matters**

These changes simplify the Topology canvas experience by reducing clutter and grouping related actions in the top bar. You can focus on building your deployment architecture while keeping configuration options easily accessible.

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
- Identifies associated cloud providers (e.g., AWS, Azure).
- Recommends additional integrations based on discovered entities.

![Aiden SRE Onboarding Knowledge Base](https://docs.stackgen.com/assets/images/aidensre6RN01022026-1c37eff908413886def602096d10b426.png)


This ensures manual configuration is reduced and faster operational readiness.

**Why It Matters**

Structured context and discovery give Aiden a semantic understanding of your environment without manual effort. Aiden can monitor clusters and services, investigate incidents across integrations, route queries to the right observability tools, and reduce ambiguity during incident response. Grafana and Prometheus integrations are supported for alerting and incident management.

### Aiden: PagerDuty Integration Support

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

## What's Enhanced

### Terraform Expressions: UI and Complex Expressions

Click to view

We've enhanced the Terraform expressions experience with clearer UI feedback and support for complex expressions.

**Improved expression mode toggle**

When you click the expression toggle icon (code symbol) next to a resource attribute field, you enter Terraform expression mode. Previously, there was no clear visual indication that the mode had changed.

Now when you toggle expression mode on:

- The input field switches to a **code mode editor** with distinct text styling

- A **dropdown with suggestions** appears as you type (for example, `var.`, `local.`)

- The text color changes to indicate you are in code mode



![Terraform expression mode with code editor and suggestions](https://docs.stackgen.com/assets/images/experessiontoggle02026-4bf04d4c59f559a9586206c63b19e8aa.png)


**Support for complex Terraform expressions**

StackGen now supports complex Terraform expressions that were not supported before. You can use Terraform functions such as `concat`, `merge`, and `jsonencode` in resource attribute fields.

For example, when configuring an IAM role's policy as a Terraform expression, you can use `jsonencode` to wrap the JSON policy. You can now enter any valid Terraform expression, if Terraform supports it, StackGen supports it.

**Why It Matters**

The clearer UI makes it obvious when you are in expression mode, reducing confusion and input errors. Support for complex expressions lets you use advanced Terraform patterns directly in the resource attribute panel, without workarounds.

## What's Changed

### Snapshots and Versioning

Click to view

We've made significant changes to snapshots and versioning in appStacks.

**Versioning removed**

Going forward, StackGen no longer supports manually adding new versions. The **Create new version** button has been moved, and the option to add new versions has been removed from the dropdown and context menu. Existing appStacks that already have versions will continue to work, and you can still toggle between existing versions using the dropdown.

**Snapshot panel**

The history icon (snapshot icon) next to **Cloud Provider** opens the Snapshots panel. Automatic snapshots are taken when:

![History icon (snapshot icon) next to Cloud Provider](https://docs.stackgen.com/assets/images/anapshoticon022026-4be298a976cf9f5d6e7495121c06fd12.png)

- A resource is added to the topology
- A resource is deleted from the topology
- You fill a value in the resource attribute panel and click **Save**

Variables, locals, and providers are now correctly captured and restored when you restore a snapshot (see [What's Fixed](/docs/stackgen/release-notes/aip/2026/february/feb26-release#variables-locals-providers-not-captured-in-snapshots)).

![Snapshots panel with Create, Restore, and filter options](https://docs.stackgen.com/assets/images/snapshotrestore02026-6cedbecc7e45f815f639c12224b32961.png)

**Why It Matters**

Snapshots give you a clear history of changes to your appStack, so you can restore to a previous state if needed. By removing versioning and focusing on snapshots, StackGen simplifies how you track and revert changes. The improved capture of variables, locals, and providers means your Terraform block configurations are fully preserved when you restore, reducing the risk of losing configuration when rolling back.

note

State backend configuration is not yet supported in snapshots. Support is planned for a future release.

## What's Fixed

### Platform: Push to Git Failing for Azure DevOps

Click to view

We have fixed an issue where push to git was failing for Azure DevOps. Previously, you would not be alerted when fields marked as required were left blank, and you would see validation errors that would not specify the field for which the validation failed.

Push to git for Azure DevOps now works correctly, with **proper validation messaging** and successful loading of generated infrastructure to the repository.

### Spaces in Git Subdirectory Paths Not Escaped

Click to view

We have fixed an issue where custom modules that reference a subdirectory within a Git repo would break Terraform when the subdirectory path contained spaces. StackGen was not properly escaping spaces in the source URL.

Previously, a path like `//hardened modules/` in the Git source would be exported as-is, causing Terraform to fail. The path must be URL-encoded (for example, `//hardened%20modules/`) for Terraform to parse it correctly.

StackGen now properly escapes spaces in Git subdirectory paths when generating the module source URL, so custom modules with spaces in their subdirectory names work correctly.

### Variables, Locals, and Providers Not Captured in Snapshots

Click to view

We have fixed an issue where variables, locals, and providers were not propagating through snapshots. Previously, when you added a variable, local, or provider and created a snapshot, those values were not captured in snapshots. Restoring a snapshot would not show the Terraform block configurations correctly.

Now when you restore a snapshot, variables, locals, and providers are correctly restored. For example, if you add a variable and create a snapshot, then restore an older snapshot where that variable did not exist, the Terraform Block will show blank. When you restore the snapshot where the variable was present, it will appear correctly.

### Aiden

Click to view

**Thought Without Actual Answer**

We have fixed an issue where Aiden sometimes returned only the thought (reasoning) and not the actual answer. Previously, you might see only the "Thought" and "Action" (e.g., "Show 3 Thoughts") with no final answer below. Aiden now returns the full response so you get both the reasoning and the answer.

![Aiden returning only thought without answer](https://docs.stackgen.com/assets/images/aiden-thought-without-answer-f9c8348f20b085c4dc8f69e451fbc3da.png)

**AWS CLI Timeout Error Message**

We have fixed an issue where an AWS CLI timeout produced the error: `The AWS CLI command timed out. Please ask the user for necessary permissions.` Aiden interpreted this as a permissions problem even when the cause was something else (e.g., network or resource delay). The timeout error message has been updated so Aiden no longer defaults to a permissions explanation and can respond more accurately.

**Tabular Data Shown in Code Format**

We have fixed an issue where Aiden sometimes displayed tabular data (e.g., EC2 instance lists, query results) as plain text in a code block instead of a formatted table. That made the data hard to scan and understand. Aiden now renders tabular data using HTML table markup so responses are organized and easier to read.

![Aiden displaying tabular data in code format](https://docs.stackgen.com/assets/images/aiden-tabular-data-code-format-80948ea96da2add733d7b472ca05c75f.png)

**GCP Integration in Integrated StackGen Aiden**

We have fixed an issue where users could not create GCP integrations when using Aiden in the integrated StackGen experience (e.g., from your company StackGen URL). GCP integrations can now be created and used in integrated Aiden environments.

## Supported Resources

Click to view

With this release, we've added additional support resources across our clouds. Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/2026/february/feb26-release#whats-new)
  - [New Topology Page UI](/docs/stackgen/release-notes/aip/2026/february/feb26-release#new-topology-page-ui)
  - [Aiden SRE for Workspaces](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-sre)
  - [Aiden: PagerDuty Integration Support](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-pagerduty)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/february/feb26-release#whats-enhanced)
  - [Terraform Expressions: UI and Complex Expressions](/docs/stackgen/release-notes/aip/2026/february/feb26-release#terraform-expressions-ui-and-complex-expressions)
- [What's Changed](/docs/stackgen/release-notes/aip/2026/february/feb26-release#whats-changed)
  - [Snapshots and Versioning](/docs/stackgen/release-notes/aip/2026/february/feb26-release#snapshots-and-versioning)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/february/feb26-release#whats-fixed)
  - [Platform: Push to Git Failing for Azure DevOps](/docs/stackgen/release-notes/aip/2026/february/feb26-release#platform-push-to-git-failing-for-azure-devops)
  - [Spaces in Git Subdirectory Paths Not Escaped](/docs/stackgen/release-notes/aip/2026/february/feb26-release#spaces-in-git-subdirectory-paths-not-escaped)
  - [Variables, Locals, and Providers Not Captured in Snapshots](/docs/stackgen/release-notes/aip/2026/february/feb26-release#variables-locals-providers-not-captured-in-snapshots)
  - [Aiden](/docs/stackgen/release-notes/aip/2026/february/feb26-release#aiden-fixed)
