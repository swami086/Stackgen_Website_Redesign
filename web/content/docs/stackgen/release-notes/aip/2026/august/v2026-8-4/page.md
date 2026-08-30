---
title: "User Groups, Policy Expressions, Integration Wizards, and SRE Alert UX"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/august/v2026-8-4"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/august/v2026-8-4"
status: "ok"
---

## User Groups, Policy Expressions, Integration Wizards, and SRE Alert UX

The August 2026 weekly **v2026.8.4** release focuses on **enterprise scale**. You can create **user groups**, assign groups to **project roles**, and sync groups from **Microsoft Entra ID** (with important enablement caveats below). **Governance** policy selection supports **expressions**, so large policy catalogs and naming or tag conventions stay maintainable without constant governance rewrites.

On the **Aiden** side, common **integration wizards** show clearer in-product setup steps, default **agent skills** for integrations are visible (view and expand; system skills stay protected), and the **SRE** alert experience adds **bulk review category** updates plus **sidebar counts** by category. Stability work across the agent and product continues in this release window.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **RBAC** | [User Groups and Entra ID Group Sync](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#user-groups-and-entra-id-group-sync) |
| **Governance** | [Policy Selection by Expression](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#policy-selection-by-expression) |
| **What's Enhanced** | **Aiden** | [Integration Setup Wizards](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#integration-setup-wizards) |
| [Default Agent Skills Visibility](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#default-agent-skills-visibility) |
| **SRE** | [SRE Bulk Alert Category and Sidebar Counts](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#sre-bulk-alert-category-and-sidebar-counts) |

## What's New

### User Groups and Entra ID Group Sync

Click to view

Availability

**Group sync** from **Microsoft Entra ID** requires StackGen to enable a tenant flag (Helm chart). Customers cannot turn sync on by themselves in the UI yet. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager to enable it.

**User group membership** from Entra is **not** synced automatically in this cut. Automatic membership sync is planned for a follow-up release.

The **UI** for groups is available on **Infra Ops** (StackGen core) today. Group data is available through the **API** across apps (for example Backstage-driven flows). Expanding the groups UI beyond Infra Ops is a follow-up.

We've added **user groups** so you can manage project access at scale instead of only assigning individuals.

**Previously**, project membership was oriented around individual users, which is hard to maintain as organizations grow and already manage access in **Entra ID**. **Now**, you can create groups in StackGen, optionally nest groups, add members, and assign a group to a project with a role ( **Admin**, **DevOps**, or **Developer**). Customers on Entra ID can sync **groups** into StackGen when StackGen enables the tenant flag.

**Key Features**

- **Create Groups** \- From **Enterprise** user management, open **Groups**, create a group, and add users.
- **Nested Groups** \- Nest groups when your org structure needs it.
- **Assign Groups to Projects** \- On a project’s members, add a user group and choose the project role for that group.
- **Entra ID Group Sync** \- Sync Entra groups into StackGen when enablement is configured for the tenant (support-assisted today).
- **API Access** \- Group APIs support automation paths (including Backstage) even where the UI is Infra Ops only.

**Example**

1. Create a group (for example a demo or platform team group) and add members.
2. Open a project, add the group under members, and set the group role to **Admin**, **DevOps**, or **Developer**.
3. Members of that group receive that project role based on group membership.

**Current Constraints**

- Entra **group** sync: support-enabled flag required; not self-serve in product yet.
- Entra **membership** auto-sync: not in this release (planned next).
- Groups **UI**: Infra Ops only in this cut. API covers broader app usage.

**Why It Matters**

Enterprise customers can map existing IdP group models into StackGen project RBAC, which is required to scale StackGen beyond one-off user invites.

Read more in [User Groups](/docs/stackgen/concepts/rbac/user-groups), [RBAC](/docs/stackgen/concepts/rbac), [Members](/docs/stackgen/setup/settings#members), and [Microsoft Entra ID (Azure AD) OAuth](/docs/stackgen/support-and-kb/how-tos/entra).

### Policy Selection by Expression

Click to view

We've added **expression**-based policy selection when you create or update a **Governance Configuration**.

**Previously**, customers with large policy catalogs had to pick policies one by one, and new modules that matched org naming or tagging conventions often forced a new governance version. **Now**, you can select policies with expressions (for example by **provider**, **category**, or **severity**) across **built-in**, **module restriction**, and **security** policies.

**Key Features**

- **Expression Filters** \- While selecting policies for a governance configuration, use expressions such as provider or category equals a cloud (for example Azure), or severity-based filters.
- **Built-In and Custom Coverage** \- Expressions apply across built-in policies, module restriction policies, and security policies.
- **Convention-Friendly Governance** \- Target modules by naming or tag conventions (for example a shared prefix or `allow = true` style tags). When new modules match the expression, governance can pick them up without rewriting the configuration from scratch. The same pattern applies to security policies scoped by expression.

**Why It Matters**

Platform teams with many policies and evolving module catalogs can keep governance current with naming and tagging standards, instead of constant manual policy reselection.

Read more in [Governance Configuration](/docs/stackgen/concepts/rbac/governance/governanceconfig#select-policies-with-expressions) and [Custom Policies](/docs/stackgen/concepts/policies/custom-policies).

## What's Enhanced

### Integration Setup Wizards

Click to view

We've improved **Aiden** integration setup wizards so common providers show clearer in-product enablement steps.

**Previously**, connecting an integration often meant leaving the product for StackGen docs or the provider’s docs to learn required fields and IAM steps. **Now**, the most commonly used integrations surface the guidance you need in the wizard itself (for example AWS with an IAM assumable role, including the instructions to follow in-console).

**Key Features**

- **In-UI Setup Guidance** \- See provider-specific steps inside the integration wizard.
- **Common Providers First** \- The highest-traffic integrations are updated first. More providers will get the same treatment over time.

**Why It Matters**

Admins can enable integrations faster with fewer context switches during demos, PoCs, and customer onboarding.

Read more in [Integrations](/docs/aiden/1.0/integrations) and [Supported Integrations](/docs/aiden/1.0/integrations/supported-integrations).

### Default Agent Skills Visibility

Click to view

Availability

This cut prioritizes **visibility**. You can **view** and **expand** default agent skills that ship with integrations. Deleting or fully replacing **system** skills is not part of this release. Fuller duplicate-and-customize workflow UX continues in follow-up work. Custom skills you own remain editable; system skills stay StackGen-owned and immutable.

We've started surfacing more of how Aiden works by default, starting with **agent skills** that come with integrations.

**Previously**, many bundled skills stayed hidden, so customers could not see the baseline behavior Aiden used for an integration. **Now**, new workspaces make default **Persona** agents and related **agent skills** easier to observe. You can view and expand those skills, and you can copy content into a new skill when you need org-specific behavior.

**Key Features**

- **Visible Default Skills** \- See agent skills included by default with integrations instead of keeping them fully hidden.
- **View and Expand** \- Inspect how the generic baseline skill is configured for an integration.
- **Copy Into Your Own Skill** \- Create your own skill from that baseline when you need organization-specific behavior (manual copy path in this cut).
- **System Skills Protected** \- Default StackGen skills are not deletable, so platform updates can still reach every tenant.

**Why It Matters**

Teams can see the starting point for an integration, then layer org-specific skills for better agent results, without losing system-owned defaults.

Read more in [Skills](/docs/aiden/1.0/skills) and [Skills Best Practices](/docs/aiden/1.0/concepts/skills/skillsbestpractice).

### SRE Bulk Alert Category and Sidebar Counts

Click to view

We've enhanced the **Aiden SRE** alerts UI for bulk review and quicker scanning.

**Previously**, setting a review category was oriented around one alert at a time, and category volume was harder to see at a glance. **Now**, you can select **multiple alerts** and set the **review category** together, and the left sidebar shows **counts** of alerts by category.

**Key Features**

- **Bulk Review Category** \- Select many alerts and categorize them in one action.
- **Sidebar Category Counts** \- See alert counts by category in the left menu.

**Why It Matters**

SRE users can clear and organize alert queues faster during triage without opening each alert only to set a category.

Read more in [Alerts](/docs/aiden/1.0/aiden-sre/alerts) and [Investigations](/docs/aiden/1.0/aiden-sre/investigations).

## Known Issues

For open issues validated in this August release window, see [August 2026 Known Issues](/docs/stackgen/help-center/known-issues/aug2026).

- [What's New](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#whats-new)
  - [User Groups and Entra ID Group Sync](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#user-groups-and-entra-id-group-sync)
  - [Policy Selection by Expression](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#policy-selection-by-expression)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#whats-enhanced)
  - [Integration Setup Wizards](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#integration-setup-wizards)
  - [Default Agent Skills Visibility](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#default-agent-skills-visibility)
  - [SRE Bulk Alert Category and Sidebar Counts](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#sre-bulk-alert-category-and-sidebar-counts)
