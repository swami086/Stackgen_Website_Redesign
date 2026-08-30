---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/may/v2026-5-8"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/may/v2026-5-8"
status: "ok"
---

The June 2026 weekly **v2026.5.8** release introduces AI-assisted actions inside **appStack** and **Module Catalog**, makes **appStack Templates** available at **enterprise** scope across projects, and tightens **module identifier** naming validation.

Explore the sections below to see what's new, changed, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **AI Agents** | [appStack Agent](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#appstack-agent) |
| [Module Catalog Assistant](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#module-catalog-assistant) |
| **What's Changed** | **Topology** | [Project-Level appStack Templates Are No Longer Available](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#project-level-appstack-templates-discontinued) |
| **What's Enhanced** | **Topology** | [Enterprise-Level appStack Template Sharing](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#enterprise-level-appstack-template-sharing) |
| [One-Click Copy for appStack Output Values](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#one-click-copy-for-appstack-output-values) |
| **What's Fixed** | **Topology** | [Actions Required Count on Snapshot Restore Set to Zero](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#actions-required-count-on-snapshot-restore) |
| [Terraform Variable Names and Default Values Truncated During Horizontal Scroll](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#terraform-variable-names-and-default-values-truncated-during-horizontal-scroll) |
| [Topology JSON Import Failure for Inaccessible Modules](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#topology-json-import-failure-for-inaccessible-modules) |
| [Invalid appStack Names Allowed on Rename](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#invalid-appstack-names-allowed-on-rename) |
| [Module Identifier Naming Validation](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#module-identifier-naming-validation) |
| **Catalog** | [Create New Version Option Missing for Project-Scoped Modules](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#create-new-version-option-missing-for-project-scoped-modules) |

## What's New

### appStack AI Agent

Click to view

Availability

This feature is behind a feature flag and is currently enabled only for select customers. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for access.

**Stackgen** now includes an **appStack Agent**, an in-context assistant available from any **appStack**, that combines the platform's API/SDK with AI to carry out topology actions on request.

![appStack Agent](https://docs.stackgen.com/assets/images/appstackagentRN2026.5.8-fbdc2ff4dd2499bac1d2a539e5389a0f.png)

**Key Features**

- **Topology actions**: Ask the agent to build an infrastructure (for example, `build an infra for a simple web application`) and it adds the relevant modules and base infrastructure to the canvas.
- **Resource configuration**: The agent can configure added resources, including variables and locals, so they're ready to plan and deploy.
- **Scoped to appStack context**: The agent only understands appStack and topology actions (adding a resource, configuring a resource, adding variables, environments, etc.) It does not perform unrelated platform actions, such as governance setup.
- **Prompt-dependent results**: Output quality depends on how the action is described. Specific, topology-oriented prompts work best; generic requests outside topology actions will fail.
- **Supported functions**: Most topology actions, including:

  - Adding modules
  - Deleting modules
  - Configuring modules and resources
  - Managing Terraform configuration blocks: variables, locals, outputs, providers, backends, environments

**Why It Matters**

Whether you already know the infrastructure that goes into your appStack or you are a developer who does not specialize in infrastructure, you can describe what you need in everyday language. The agent adds and connects the relevant resources for you, so you spend less time on canvas setup and more time shipping the application.

### Module Catalog Assistant

Click to view

Availability

This feature is behind a feature flag and is currently enabled only for select customers. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for access.

The **Module Catalog Assistant** is now available on the **Project Module Catalog** page to help you perform catalog-specific actions.

![Module Catalog Assistant](https://docs.stackgen.com/assets/images/catalogassistantRN2026.5.8-c74475526bf33f8dc5440e661fe2bc25.png)

**Key Features**

- **Module actions**: The assistant can import a new module, add a new version of an existing module through conversational prompts.
- **Restricted deletion**: Deleting a module is not permitted through the chat interface.

**Why It Matters**

Catalog maintenance tasks that are otherwise multi-step become a single conversational request, while destructive actions stay behind the platform's existing User Interface safeguards.

## What's Changed

### Project-Level appStack Templates Are No Longer Available

Click to view

**appStack Templates** at the project level have been discontinued. Templates are now managed and shared at the **enterprise** level. Check out the [Enterprise-Level appStack Template Sharing](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#enterprise-level-appstack-template-sharing) section to know how enterprise templates work.

## What's Enhanced

### Enterprise-Level appStack Template Sharing

Click to view

**appStack Templates** are now reusable across every project in your **enterprise**, instead of being locked to the project where they were created.

![Enterprise-Level appStack Template Sharing](https://docs.stackgen.com/assets/images/enterpriseappStacktemplateRN2026.5.8-d5591654f521f108601d9f36114a323e.png)

**Key Features**

- **Build once, reuse everywhere**: Create a new appStack using a pre-configured topology in any project, instead of recreating the same project by project.

- **Admin-controlled templates**: Admins [mark an appStack as a template](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates), so that your teams share one trusted and validated template instead of creating ad-hoc copies.



![appStack Template](https://docs.stackgen.com/assets/images/markappstacktemplateRN2026.5.8-71bde46af2e629e341bd3128ed00e5af.png)


**Why It Matters**

Teams ship faster with less rework, since a single enterprise-wide template keeps every project aligned on the same baseline architecture, while admins retain control over what's reusable.

### One-Click Copy for appStack Output Values

Click to view

The **Outputs** UI now includes a **Copy** button, letting you quickly copy the entire output values after deployment. This streamlines copying long values, such as URLs.

![Copy Outputs](https://docs.stackgen.com/assets/images/copyoutputRN2026.5.8-627dd036f1187cca072c105f9eadd4e1.png)

Read more in [appStack Outputs](/docs/stackgen/concepts/topology/appstack-outputs#view-outputs-after-apply-ui).

## What's Fixed

### Actions Required Count on Snapshot Restore Set to Zero

Click to view

We fixed an issue where the **Actions Required** count did not refresh after restoring an **appStack** snapshot.

![Violations Count](https://docs.stackgen.com/assets/images/actioncountRN2026.5.8-56c8df347dace4aa428462ed041d714c.png)

Previously, restoring a snapshot that added a resource or that cleared actions required left the count stale until you clicked the resource. The count now updates as soon as the snapshot restore completes, in both cases.

### Terraform Variable Names and Default Values Truncated During Horizontal Scroll

Click to view

We fixed an issue where **Terraform** variable names and default values appeared truncated or clipped when you scrolled the variables table horizontally.

Previously, horizontal scroll made it hard to read the full name or default value. Those cells now stay fully visible while you scroll, so you can review variable configurations without the text cutting off.

![Horizontal Variable Scroll](https://docs.stackgen.com/assets/images/truncatedvaluesRN2026.5.8-08f62afa1262641759c033aceab93b47.png)

### Topology JSON Import Failure for Inaccessible Modules

Click to view

We fixed an issue where importing a topology JSON that referenced modules you don't have access to, such as modules owned by another **appStack**, left the page blank and unresponsive instead of showing an error.

Previously, the import did not check module access first, so the platform tried to render the topology anyway and froze. Import now validates accessibility up front and blocks the import with a clear message: **Cannot import topology because it contains one or more inaccessible modules.**

![Json import failure](https://docs.stackgen.com/assets/images/topologyimportfailureRN2026.5.8-a4bfc9c08db7209de3cf77dd42cbb587.png)

### Invalid appStack Names Allowed on Rename

Click to view

We fixed an issue where renaming an **appStack** did not validate the new name, allowing names with spaces, special or random characters, or a leading number.

![appStack Renames](https://docs.stackgen.com/assets/images/appstackrenameerrorRN2026.5.8-bd1f34f522071fd033f2670293387a56.png)

Renaming an **appStack** now enforces the following rules:

- No spaces are allowed in the name.
- No special or random characters are allowed.
- The name cannot start with a number.

### Module Identifier Naming Validation

Click to view

We fixed an issue where module identifier renaming accepted invalid names, such as those containing special characters, without any validation.

![Module Identifier Naming Validation](https://docs.stackgen.com/assets/images/moduleidentifierRN20206.5.8-66a301527ab4e5b9a18fee2b5f46a5b0.png)

Renaming now rejects invalid identifiers and shows a clear error instead of accepting them silently, so invalid module identifiers are caught before they cause downstream issues.

### Create New Version Missing for Project-Scoped Modules

Click to view

We've fixed an issue where the **Create new version** option was missing under the **Actions** menu on the **Project Module Catalog** page. This issue was observed in modules which were scoped to **Available to specific projects**.

![Issue with appStack Versions](https://docs.stackgen.com/assets/images/appversionissueRN2026.5.8-9b80e3e661361c33b8c2f2fab7b4c7ea.png)

You will now see the **Create new version** option under the **Actions** menu.

- [What's New](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#whats-new)
  - [appStack AI Agent](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#appstack-agent)
  - [Module Catalog Assistant](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#module-catalog-assistant)
- [What's Changed](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#whats-changed)
  - [Project-Level appStack Templates Are No Longer Available](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#project-level-appstack-templates-discontinued)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#whats-enhanced)
  - [Enterprise-Level appStack Template Sharing](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#enterprise-level-appstack-template-sharing)
  - [One-Click Copy for appStack Output Values](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#one-click-copy-for-appstack-output-values)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#whats-fixed)
  - [Actions Required Count on Snapshot Restore Set to Zero](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#actions-required-count-on-snapshot-restore)
  - [Terraform Variable Names and Default Values Truncated During Horizontal Scroll](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#terraform-variable-names-and-default-values-truncated-during-horizontal-scroll)
  - [Topology JSON Import Failure for Inaccessible Modules](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#topology-json-import-failure-for-inaccessible-modules)
  - [Invalid appStack Names Allowed on Rename](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#invalid-appstack-names-allowed-on-rename)
  - [Module Identifier Naming Validation](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#module-identifier-naming-validation)
  - [Create New Version Missing for Project-Scoped Modules](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#create-new-version-option-missing-for-project-scoped-modules)
