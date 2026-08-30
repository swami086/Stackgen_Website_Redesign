---
title: "Aiden for DevOps, Slack App, Workspace Chat, GitHub Knowledge, and OCI Policies"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/july/v2026-7-11"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/july/v2026-7-11"
status: "ok"
---

## Aiden for DevOps, Slack App, Workspace Chat, GitHub Knowledge, and OCI Policies

The August 2026 weekly **v2026.7.11** release introduces **Aiden for DevOps** (MVP) so you can assign work from **Linear** or **Jira** and have Aiden triage it against your **workflows** and **skills**. It also brings early-access **Slack** app interaction (tag Aiden in channels), a **workspace chat** experience that is not limited to the SRE or DevOps app, and **GitHub** as a **Knowledge Hub** source (similar to Confluence).

On the infrastructure side, you can use **security policies** for **OCI**, and **Project DevOps** users can **create** and **publish** **appStack-owned** custom modules. **Project** and **Admin** ( **Tenant**) **Dashboards** are available to all customers. Bug fixes cover the **OCI** security policy provider icon, saving attributes when a required **tag** is empty, and **Backstage** plugin reliability.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Aiden** | [Aiden for DevOps](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#aiden-for-devops) |
| [Slack App Early Access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#slack-app-early-access) |
| [Workspace Chat Outside Apps](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#workspace-chat-outside-apps) |
| **Knowledge Hub** | [GitHub Knowledge Hub Source](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#github-knowledge-hub-source) |
| **Governance** | [OCI Security Policies](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#oci-security-policies) |
| **Custom Modules** | [Project DevOps appStack-Owned Module Publishing](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#project-devops-appstack-owned-module-publishing) |
| **What's Enhanced** | **Dashboards** | [Project and Admin Dashboards General Availability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#project-and-admin-dashboards-general-availability) |
| **What's Fixed** | **Governance** | [OCI Security Policy Provider Icon](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#oci-security-policy-provider-icon) |
| **Topology** | [Save Attributes with Empty Required Tag](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#save-attributes-with-empty-required-tag) |
| **Integrations** | [Backstage Plugin Reliability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#backstage-plugin-reliability) |

## What's New

### Aiden for DevOps

Click to view

Availability

**Aiden for DevOps** is an **MVP** first release. Ticket-driven triggering works with **Linear** and **Jira** in this cut. Treat workflow matching, inbox triage, and related UX as early and validate in a non-production workspace before you rely on it for customer demos or production work. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for enablement and guidance.

We've added **Aiden for DevOps** so teams can assign infrastructure and platform work to Aiden from the tools they already use, then review, approve, and run those requests against trained **workflows** and **skills**.

**Previously**, DevOps-style agent work was harder to demo and consume in one place, and customer expectations for automated ticket-driven work were scattered. **Now**, Aiden can ingest tickets into a DevOps **inbox**, triage them against your workspace workflows, and wait for you to approve and execute the matching workflow.

**Key Features**

- **Ticket-Driven Requests** \- Connect a tracker (this MVP: **Linear** or **Jira**), give Aiden an API key, choose the team, and define which tickets Aiden should pick up (for example tickets assigned to Aiden, with label filters).
- **Inbox and Triage** \- New tickets appear in the DevOps inbox. Aiden tries to match each request to a workflow in the workspace (matching uses the **workflow description**; keep descriptions clear and distinct).
- **Approve and Execute** \- Review the suggested workflow, approve it, and execute so Aiden fulfills the request with the skills and integrations you configured.
- **Train with Workflows and Skills** \- Define how Aiden should accomplish work (for example provision or tear down a cloud resource, create compliant Terraform modules and open a PR, or run cloud-to-code style flows) using the same workflow and skill model you already use in Aiden.

**Example flow (Linear)**

1. Connect Linear to the DevOps app with an API key and team selection.
2. Create a ticket such as provisioning a storage account in a named resource group.
3. Aiden ingests the ticket into the inbox and attempts workflow match.
4. Approve and execute the workflow. Aiden completes the work and records fulfillment detail for follow-up.

**Current Constraints**

- MVP quality. Expect polish work on matching, enablement UX, and related surfaces.
- Triggering for DevOps ticket intake in this release is **Linear** and **Jira** only.
- Similar workflow descriptions can confuse triage. Prefer unique, specific descriptions.

**Why It Matters**

You can assign Aiden work inside existing Linear or Jira processes, see what the agent is doing in one UI, and reuse the same workflows and skills you train for demos and day-to-day automation.

Read more in Aiden for DevOps, [Skills](/docs/aiden/1.0/skills), [Tasks](/docs/aiden/1.0/tasks), [Jira](/docs/aiden/1.0/integrations/jira), and [StackGen integration](/docs/aiden/1.0/integrations/stackgen).

### Slack App Early Access

Click to view

Availability

The **Slack** app is **early access**. The enablement UX is still being polished and is not always obvious from the main Integrations page. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager if you need help connecting Slack.

We've added an interactive **Slack** app so you can work with **Aiden** in Slack channels, not only send outbound notifications.

**Previously**, **v2026.7.7** shipped outbound Slack notifications only, and called out that a fuller Slack application was still in progress. **Now**, you can add the Slack app to a workspace and **tag Aiden** in channels so it can investigate alerts and answer follow-up questions interactively.

**Key Features**

- **Platform-Level Slack App** \- Slack is a workspace-level capability. It is not limited to the SRE app or the DevOps app alone.
- **Cross-Signal Context** \- A workspace can combine infra-related and SRE-related integrations, so Slack conversations can draw on that combined context.
- **One Workspace, Multiple Channels** \- You can connect the same Aiden Slack app to more than one channel in the same workspace.
- **Tag Aiden** \- In a connected channel, tag Aiden on an alert or question to start an investigation or keep asking follow-ups in thread.

**How to enable (current path)**

Enablement is under workspace **settings** for admins (connected accounts), including **Add to Slack**. If the Integrations URL does not show the control you need, open workspace settings (admins may need the settings path rather than the Integrations path). Exact navigation is still being polished.

**Current Constraints**

- Early access. Setup UX needs improvement.
- Give Aiden a clear indication when you want a specific workflow from a channel conversation.

**Why It Matters**

Teams can bring Aiden into the Slack channels where alerts and ops discussion already happen, without waiting for a separate product surface.

Read more in Slack and [Manage Workspaces](/docs/aiden/1.0/settings/workspaces).

### Workspace Chat Outside Apps

Click to view

We've added a **chat** experience in **Aiden** that is not tied only to the SRE app or the DevOps app.

**Previously**, chat-style interaction was easy to treat as app-specific (for example only inside an SRE or DevOps flow). **Now**, you can chat with Aiden directly in the workspace about general questions, map the conversation to an existing **Persona** agent or **workflow**, or let Aiden choose how to handle the request.

**Key Features**

- **Workspace Chat** \- Chat with Aiden outside a single specialized app context.
- **Persona or Workflow Mapping** \- Point the chat at an existing Persona agent or workflow when you want a specific behavior.
- **Help and General Questions** \- Use chat for product help and other questions that are not limited to one app.

**Why It Matters**

You get a single place to talk to Aiden for general work, while still routing to the agents and workflows you already trained when you need them.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden) and [Functional Agents](/docs/aiden/1.0/functional-agents).

### GitHub Knowledge Hub Source

Click to view

We've added **GitHub** as a **Knowledge Hub** source, in the same pattern as **Confluence**.

**Previously**, Knowledge Hub content commonly came from text, file upload, URL fetch, discovery, and sources such as Confluence. **Now**, you can connect **GitHub**, attach it to an agent, and let Aiden pull repository content as knowledge nodes so agents better understand your processes and workflows.

**Key Features**

- **GitHub Knowledge Source** \- Connect GitHub from Knowledge Hub (GitHub icon / connect flow).
- **Attach to an Agent** \- Bind the GitHub knowledge source to the agent that should use it.
- **Repository Context as Nodes** \- Aiden pulls data from the connected repository so answers and workflows can use that process and workflow context.

**Why It Matters**

Teams that keep runbooks, standards, and process docs in GitHub can feed that context into Aiden the same way they already can with Confluence-backed knowledge.

Read more in [Knowledge Hub](/docs/aiden/1.0/concepts/knowledgehub) and [GitHub](/docs/aiden/1.0/integrations/github).

### OCI Security Policies

Click to view

We've added support for **security policies** on **Oracle Cloud Infrastructure (OCI)**.

**Previously**, early-access OCI work focused on provider support, custom modules, and CLI plan and apply ( **v2026.7.3** and follow-on fixes). **Now**, you can author and use **security policies** for OCI the same way you govern other supported providers with OPA/Rego security policies.

**Key Features**

- **OCI Security Policy Support** \- Create and apply security policies that target OCI modules or resources in your governance setup.
- **Same Governance Path** \- Assign policies through Governance Configurations so projects and appStacks pick them up like other security policies.

**Why It Matters**

OCI appStacks can be checked against organization security and compliance rules inside StackGen, not only built and provisioned.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies) and [OCI provider early access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access).

### Project DevOps appStack-Owned Module Publishing

Click to view

We've expanded who can own the **appStack-owned** custom module lifecycle inside a project.

**Previously**, creating and publishing **appStack-owned** custom modules often needed a higher-scoped Admin or Enterprise DevOps role. **Now**, the **DevOps** role at project scope can **create** appStack-owned modules and **publish** them back to the appStack from the Custom Module Editor.

**Key Features**

- **Create in Project Scope** \- Project DevOps users can create **appStack-owned** custom modules for appStacks in their project.
- **Publish to appStack** \- After you edit Terraform source or `.stackgen/stackgen.yaml`, click **Publish to appStack**. Placed instances on the Topology canvas pick up the updated schema.
- **In-Place Sync** \- Existing attribute values on placed nodes stay in place when you publish. New required fields show a warning until you fill them.

**Why It Matters**

Project DevOps teams can iterate on appStack-local modules without waiting on enterprise-scoped roles, while catalog and enterprise sharing rules for shared modules stay unchanged.

Read more in [Edit and Sync appStack-Owned Modules](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates), [Custom Module](/docs/stackgen/concepts/resources/custom-module), and [RBAC for Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules).

## What's Enhanced

### Project and Admin Dashboards General Availability

Click to view

We've made the **Project Dashboard** and **Admin** ( **Tenant**) **Dashboard** available to all customers.

**Previously**, these dashboards were introduced earlier and were not rolled out to every tenant. **Now**, every customer can use them for project and tenant landing views, setup checklists, and quick links into the areas that still need attention.

**Key Features**

- **Project Dashboard** \- Project Admins and DevOps see project health (appStacks, members, modules, environments), a setup guide, and quick actions. Developers do not see this dashboard, by design.
- **Admin / Tenant Dashboard** \- Admin and DevOps users get a tenant-level view of projects, members, governance, and onboarded modules, plus a tenant setup guide.
- **Setup Continuity** \- If you skip optional steps during project or tenant setup, finish them later from the dashboard checklist.

**Why It Matters**

Admins and DevOps users in every tenant get the same landing pages and setup follow-up paths.

Read more in [Project Dashboard](/docs/stackgen/concepts/project-dashboard) and [StackGen UI](/docs/stackgen/setup/stackgen-ui#tenant-dashboard).

## What's Fixed

### OCI Security Policy Provider Icon

Click to view

We fixed an issue where security policies for **OCI** modules showed the wrong cloud provider icon.

Previously, an OCI security policy could display a **GCP**, **Azure**, or **AWS** icon instead of the **OCI** icon. OCI security policies now show the correct OCI provider icon.

This closes the known issue tracked in [July 2026 Known Issues](/docs/stackgen/help-center/known-issues/july2026#fixed-incorrect-provider-icon-for-oci-security-policies).

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies).

### Save Attributes with Empty Required Tag

Click to view

We fixed an issue that blocked saving attributes when a required **tag** attribute was left empty.

Previously, leaving a required tag empty could prevent you from saving other attribute changes on the resource. You can now save attributes even when a required tag attribute is still empty. Complete required tags before you rely on plan or apply if your module or policy expects them.

This closes the known issue tracked in [July 2026 Known Issues](/docs/stackgen/help-center/known-issues/july2026#fixed-empty-required-tag-blocks-saving-other-attributes).

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

### Backstage Plugin Reliability

Click to view

We shipped reliability and behavior fixes for the **StackGen Backstage** plugin based on customer-reported issues.

Previously, some Backstage plugin flows needed follow-up fixes for stability and expected behavior. Those updates are included in this release window.

Read more in [Install StackGen-Backstage Plugin](/docs/stackgen/integrations/backstage-plugin) and [Backstage User Guide](/docs/stackgen/integrations/backstage-userguide).

- [What's New](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#whats-new)
  - [Aiden for DevOps](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#aiden-for-devops)
  - [Slack App Early Access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#slack-app-early-access)
  - [Workspace Chat Outside Apps](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#workspace-chat-outside-apps)
  - [GitHub Knowledge Hub Source](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#github-knowledge-hub-source)
  - [OCI Security Policies](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#oci-security-policies)
  - [Project DevOps appStack-Owned Module Publishing](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#project-devops-appstack-owned-module-publishing)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#whats-enhanced)
  - [Project and Admin Dashboards General Availability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#project-and-admin-dashboards-general-availability)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#whats-fixed)
  - [OCI Security Policy Provider Icon](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#oci-security-policy-provider-icon)
  - [Save Attributes with Empty Required Tag](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#save-attributes-with-empty-required-tag)
  - [Backstage Plugin Reliability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#backstage-plugin-reliability)
