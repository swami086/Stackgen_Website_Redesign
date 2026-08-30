---
title: "Reimagining How AI and Infrastructure Work Together"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/oct25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/oct25-release"
status: "ok"
---

## Reimagining How AI and Infrastructure Work Together

StackGen’s **October 2025 Release** brings powerful integrations, AI-driven improvements, and a more unified experience across products. From **MCP Integration** for seamless AI connectivity, to **Aiden Workspaces** for context-aware automation, and an **AI-powered Rego Policy Editor**, this release focuses on giving you smarter tools with better control and visibility.

Discover What’s New, What’s Enhanced, and how these updates make building and managing your infrastructure even more intuitive.

- What's New
  - [MCP Integration in StackBuilder](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#mcp-integration-in-stackbuilder)
  - [AI–Powered Rego Policy Editor and Evaluator](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#aipowered-rego-policy-editor-and-evaluator)
  - [Aiden Workspaces](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#aiden-workspaces)
- What's Enhanced
  - [Unified Module Catalog Experience](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#unified-module-catalog-experience)
  - [Governance Enforcement Enhancements](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#governance-enforcement-enhancements)
  - [Activity Logs and Reporting](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#activity-logs-and-reporting)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#supported-resources)

## What's New

### MCP Integration in StackBuilder

Click to view

We’ve introduced MCP (Model Context Protocol) Integration, a powerful way to connect StackGen with AI tools like Claude and VS Code. Now, you can bring StackGen’s infrastructure intelligence directly into your favorite AI assistants for faster, context-aware automation.

**Key Features**

You can set up the StackGen MCP server on your local machine to:

- Access real-time infrastructure state directly from your AI tool.
- Get context-aware suggestions while working in Claude or VS Code.
- Integrate StackGen with external monitoring, logging, and management tools.
- Enable secure, real-time collaboration between AI agents and your system.

**Why It Matters?**

Until now, using StackGen meant switching between tools to view, configure, and manage infrastructure.
With MCP, your AI tools can talk to StackGen directly, giving you:

- A standardized and secure way to connect your infra data.
- Seamless context sharing between different environments.
- AI-driven recommendations based on live infrastructure insights.

Check out the [MCP Integration Guide](/docs/stackgen/stackgen-mcp) to get started.

### AI–Powered Rego Policy Editor and Evaluator

Click to view

We’ve made it easier than ever to author, test, and apply OPA Rego policies directly within StackGen! You can now create OPA-based Rego policies right from the Custom Policies tab in the StackGen UI.

![Custom Policy AI](https://docs.stackgen.com/assets/images/createcustomsep2025-3cce4c266ed5bf26fc76b224ddf18450.png)

**Key Benefits**

- **AI-Assisted Authoring**: The new Gen AI–powered editor provides smart suggestions, explanations, and summaries, helping you write accurate, readable policies faster.
- **Integrated Evaluation**: Instantly evaluate your generated Rego policies using test data before applying them in Governance workflows.
- **Governance Integration**: Once validated, your policies can be applied in projects through Governance Configurations page, enforcing guardrails and compliance automatically.
- **OPA Compatibility**: All policies are OPA-compliant, ensuring they can evaluate both StackGen payloads and Terraform/HashiCorp outputs with minimal friction.

**How to Create an AI Generated Policy**

From the StackGen home page, navigate to Policies and follow these steps:

1. Create a new policy using the **\+ Add Custom Policy** button under **Custom Policies** tab.

2. Generate or edit the Rego policy in the new AI-powered editor.

3. Validate it with test data to confirm correct evaluation.



![Evaluate Policy](https://docs.stackgen.com/assets/images/evaluatepolicy2025-e73a54a39943f9ea5f4c7e7438dc4aa3.png)

4. Apply it via **Governance Configurations** page and verify that it enforces rules as expected.


Check out the documentation for [Policies](/docs/stackgen/concepts/policies/custom-policies) to learn more.

### Aiden Workspaces

Click to view

Aiden now supports Workspaces, bringing secure, scoped, and context-aware AI operations to your environment. Each workspace acts as a dedicated boundary for integrations, knowledge, policies, and configurations, ensuring Aiden operates with the right context, permissions, and guardrails.

![Workspaces](https://docs.stackgen.com/assets/images/workspaces2025-b24e13795b079bae9366ced0a203583b.png)

**Key Highlights**

- **Scoped Context**: Aiden’s access and data are now limited to the selected workspace.
- **Workspace Selector**: Switch between workspaces directly from the main Aiden UI.
- **Workspace Management**: Create, link, or manage workspaces under **Settings > Manage Workspaces**.
- **StackGen Integration**: Each workspace can connect to StackGen projects, ensuring the Infra Provisioning Agent uses the correct appStacks and permissions.

**Try It Out**

1. Login to Aiden and select a workspace using the Workspace dropdown to the top-left.

2. Navigate to **Settings > Workspaces**, create a workspace similar to your StackGen projects.



note





Ensure you have set up the [StackGen Integration](/docs/aiden/1.0/integrations/stackgen) before you configure a workspace.


You're done! Watch Aiden adapt and automatically refresh integrations, knowledge, and context for the selected workspace.

Check out the documentation on [Managing Workspaces](/docs/aiden/1.0/settings/workspaces).

## What's Enhanced

### Unified Module Catalog Experience

Click to view

We’ve streamlined how you work with modules! We've merged Modules and the Catalog tabs into a unified Module Catalog tab, bringing together all module-related actions into one intuitive page.

**What’s changed**

- **Simplified navigation**: Manage, edit, publish, assign, and scan your custom modules from a single place.

- **Better visibility**: Module catalog layout and ordering has been refined for easier browsing. Newly created modules now appear right at the top of your list.



![module catalog](https://docs.stackgen.com/assets/images/modulecatalog-3324d6d429d2e14c40de35c990794dfb.png)

- **Module Import**: You can now use the **Import** button to import or or many Custom Modules into StackGen via your repository. To do that, simply forllow these steps:


1. Click **Import**.
2. Add the link to your repository where these modules are hosted,
3. Provide a name for the module and choose the supported providers,
4. Choose to share it with Projects or at an Enterprise level and,
5. Click **Add Module**.

It's that easy!

![Import](https://docs.stackgen.com/assets/images/importmodules-5e3e90f6cf1b46e045718f4f097846f5.png)

Check out the documentation on [Module Catalog](/docs/stackgen/concepts/modules/catalog).

### Governance Enforcement Enhancements

Click to view

You can now assign governance configurations directly to [**Projects**](/docs/stackgen/concepts/rbac/governance/governanceconfig#assign-governance-configuration-to-projects). When a governance configuration is applied to projects, it will affect only new appStacks created after the enforcement. You can:

- Add or remove projects from an existing governance configuration.

- Delete individual project assignments.

- Delete all assignments for a governance version at once.



![delete all assignments](https://docs.stackgen.com/assets/images/governancedeleteall-56ab431dd694c12ecd990eae493aaba4.png)


caution

You cannot delete a Governance Configuration if it is assigned to projects. You’ll have to unassign projects first.

### Activity Logs and Reporting

Click to view

We've made the following improvements and fixes to the Activity Logs page:

- Abstract IDs for appStacks are now replaced with human-readable names.
- **Archive** and **Delete** actions are now being tracked by logs.

**Coming soon**: We will be making further enhancements to this tab to include activity logs for appStacks that are unarchived.

## Supported Resources

Click to view

With this release, we've added the additional support resources across our clouds. Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#whats-new)
  - [MCP Integration in StackBuilder](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#mcp-integration-in-stackbuilder)
  - [AI–Powered Rego Policy Editor and Evaluator](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#aipowered-rego-policy-editor-and-evaluator)
  - [Aiden Workspaces](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#aiden-workspaces)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#whats-enhanced)
  - [Unified Module Catalog Experience](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#unified-module-catalog-experience)
  - [Governance Enforcement Enhancements](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#governance-enforcement-enhancements)
  - [Activity Logs and Reporting](/docs/stackgen/release-notes/aip/archive/2025/oct25-release#activity-logs-and-reporting)
