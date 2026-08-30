---
title: "Container Modules, Plan and Deploy Panel, and MCP Module Tools"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/june/v2026-6-12"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/june/v2026-6-12"
status: "ok"
---

## Container Modules, Plan and Deploy Panel, and MCP Module Tools

The June 2026 weekly **v2026.6.12** release introduces **container-type** support for custom modules (with nested child modules, attribute mapping, and delete rules), brings **create** and **delete** for custom modules into **MCP**, and adds a UI action to **push Terraform state** to a mapped remote backend for **Cloud Discovery** appStacks. Backend frameworks also land for **Oracle Cloud Infrastructure (OCI)** and **generic** cloud provider types, currently behind a feature flag.

For **developers** and **DevOps** engineers, **Plan and Deploy** moves from a centered pop-up into an integrated right-side panel with environment status labels, environment sync from project settings, runtime and **Tofu** log streaming, an in-panel **policy scan** toggle, and direct navigation into the matching **CLI** run. **Custom module labels** in the catalog are easier to discover on hover, and the in-app changelog entry point uses an updated gift icon.

Explore the sections below to see what's new, enhanced, changed, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Custom Modules** | [Container Type Modules Support](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#container-type-modules-support) |
| **MCP** | [MCP Module Management Tools](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#mcp-module-management-tools) |
| **Platform** | [OCI and Generic Cloud Support](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#oci-and-generic-cloud-support) |
| **Plan & Deploy** | [Push TF State to Remote Backend](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#push-tf-state-to-remote-backend) |
| **What's Enhanced** | **Plan & Deploy** | [Plan and Deploy UI/UX Revamp](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#plan-and-deploy-ui-ux-revamp) |
| **Catalog** | [Custom Module Catalog Labels UI](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#custom-module-catalog-labels-ui) |
| **What's Changed** | **UX** | [Changelog Icon Update](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#changelog-icon-update) |
| **What's Fixed** | **Topology** | [IA Attribute Clutter on Canvas Modules](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#ia-attribute-clutter-on-canvas-modules) |
| [Output Field Renaming](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#output-field-renaming) |
| **Plan & Deploy** | [State Backend Encryption Flags](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#state-backend-encryption-flags) |
| **Platform** | [appStack Variables Pagination](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#appstack-variables-pagination) |

## What's New

### Container Type Modules Support

Click to view

We've added native **child module** support for custom **container** modules created in the platform. Custom containers now mirror the nested visual behavior of built-in **VPC** and **subnet** configurations on the **Topology** canvas.

Configure this support in the custom module's `stackgen.yaml` by setting `node.display_type` to `container`, then define connection rules and delete behavior so parent and child modules map attributes when a child is placed on a parent.

**Key Features**

- **Child Module Support** \- Custom container modules now natively support nested child modules on the canvas, matching the grouping patterns you already see with built-in networking containers.
- **YAML Configuration** \- Establish container behavior by setting `display_type` as `container` under `representation.node` in `stackgen.yaml`. Use the `container` block for delete rules and how other modules connect in.
- **Connection Rules and Attribute Mapping** \- Configure connection rules between specific parent and child modules (for example a **VPC** parent container and a **subnet** child module). When you drag a child onto the parent on the canvas, valid attributes (such as a **VPC ID**) map automatically between them based on those rules.
- **Deletion Types** \- Control what happens when the parent container is deleted via the `on_delete` parameter in `stackgen.yaml`:

  - **detach** \- If the parent container is deleted, nested child modules are detached and remain intact on the design canvas.
  - **cascade** \- If the parent container is deleted, both the parent and all nested child modules are removed from the canvas at the same time.
- **Important Technical Caveat** \- Visual grouping and attribute mapping rely on custom, user-defined connection rules built for canvas continuity. This is **not** a standard restriction imposed by **Terraform**. The platform will allow you to create and map otherwise uncommon connections (for example connecting an **S3** bucket to a route table) as long as your custom YAML rules dictate it.

**Why It Matters**

Teams that author custom networking or grouping modules can deliver the same nested canvas experience as built-in containers, with explicit control over attribute mapping and delete behavior in `stackgen.yaml`, without waiting on platform-only module types.

For YAML template examples or technical implementation questions, contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml#container).

### MCP Module Management Tools

Click to view

Previously, the **Model Context Protocol (MCP)** framework did not natively include mechanisms to create or delete custom modules. Direct support has now been added so you can generate and remove custom modules through MCP, in two scopes.

**Key Features**

- **Create and Delete Support** \- MCP can now create and delete custom modules. During execution, the tools process the request using the source details you provide and output full logs outlining exactly what module was created and which configuration parameters were used. Matching deletion flows cleanly remove modules in both scopes.
- **appStack-Owned Scope** \- Designate an **appStack** when creating a module so the module is owned directly by that appStack. These custom modules appear in the individual appStack view rather than the global catalog.
- **Tenant Scope** \- Create custom modules at a tenant-wide level. Tenant-scoped modules display globally in the main **Module Catalog** interface.
- **Scoped Cleanup** \- Corresponding deletion flows are supported in both scopes so you can remove appStack-owned or tenant-scoped modules without leaving orphaned catalog entries.

**Why It Matters**

Module lifecycle work that previously required separate UI or catalog steps can stay inside the same MCP-driven IDE flow you already use for topology, environment, and state backend tasks.

Read more in [StackGen MCP Capabilities](/docs/stackgen/mcp/mcp/mcp-capabilities#custom-module-create-and-delete) and [StackGen MCP](/docs/stackgen/stackgen-mcp).

### OCI and Generic Cloud Support

Click to view

Availability

This feature is behind a feature flag and is under active development. It is not yet enabled on customer environments. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for status.

We've updated the backend frameworks to support **Oracle Cloud Infrastructure (OCI)** as an alternative cloud provider type, plus a **generic** cloud provider option for use cases that do not map to traditional cloud providers (for example importing and managing **GitHub** modules).

**Interface Placements**

When enabled, provider selection is surfaced in three areas of the UI:

- **appStack Creation** \- During the initial application stack generation flow.
- **Module Import Flow** \- In the menu where you declare and map the provider type of an incoming module.
- **Governance Configuration** \- Inside the creation workflow for new governance structures.

**Current Constraints**

- The full feature set remains behind a feature flag and is undergoing active development; it is not yet enabled on customer environments.
- Additional UI elements are still pending for a later release.
- Several core workflows are currently non-functional, including appStack custom creation, **CLI** provisioning support for the **OCI** provider type, and full **plan** / **deploy** phases.
- New users may see an empty side panel and must manually run the module import flow to get started.

**Why It Matters**

This release lays the provider framework for **OCI** and non-traditional module sources so later releases can open enablement without reworking the underlying appStack, import, and governance paths.

Read more in [IaC from Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch) and [Cloud Provider Limitations](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci).

### Push TF State to Remote Backend

Click to view

The platform now exposes a direct UI action in state backend settings that lets you push a segregated **appStack** **Terraform (TF)** state file to its mapped remote backend storage bucket (such as **Amazon S3** or **Google Cloud Storage**).

While this command logic has historically been available via the **CLI** (`stackgen state push`), this update brings the capability into the visual web application for easier accessibility.

**Key Features**

- **UI Push Action** \- Use the action button in state backend settings to push the appStack state directly to the configured remote backend.
- **Cloud Discovery Workflow Exclusivity** \- This capability is unique to appStacks generated from a **Cloud Discovery** scan workflow. Standard manually built appStacks do not display this administrative option.
- **Automated Failure Intercepts** \- The platform runs connection checks during execution. The interface throws a processing error and aborts if remote cloud access credentials are expired, cloud permission settings are incorrect, or the target backend storage configuration is misconfigured.

warning

**Destructive Data Overwrite:** Triggering the push initiates an unmitigated file write that entirely overwrites the target destination state file in the remote cloud backend. The platform processes this change immediately without intermediate warning prompts or safety catches to block unintended state corruption. Confirm you intend to replace remote state before you run the push.

warning

**Cloud Discovery Deletion Dependency:** State management features are bound to the lifecycle of the parent **Cloud Discovery** execution entry. If you delete the parent Cloud Discovery record from history, the platform permanently removes the source state view tab, file download buttons, and remote backend push actions from the appStack UI. Do not clean up or remove active Cloud Discovery records until you are certain you will never need to push or modify that appStack's state again.

**Why It Matters**

Teams that generate appStacks from **Cloud Discovery** can push segregated state to the mapped remote backend without leaving the UI, while still using the CLI when they prefer a terminal workflow.

Read more in [`stackgen state push`](/docs/stackgen/cli-guide/usage/state) and [Cloud Discovery](/docs/stackgen/concepts/clouddiscovery#push-terraform-state-to-a-remote-backend).

## What's Enhanced

### Plan and Deploy UI/UX Revamp

Click to view

The core **Plan and Deploy** functionality remains identical to previous cycles, but the layout and interaction flow have been redesigned to make provisioning clearer and more intuitive.

**Previously**, plan and deploy ran from a large, centered pop-up window. **Now**, those actions open in an integrated, slide-out right-side panel, with richer environment status, live log streaming, plan-time policy scanning, and faster paths into CLI run history.

**Key Features**

- **Side Panel Integration** \- The centered pop-up previously used for managing plans and deployments is replaced by an integrated right-side panel that keeps you closer to the appStack context while you provision.
- **Environment Status Indicators** \- A status label appears next to each environment in the drop-down. If credentials or remote state configurations are incomplete, a warning states **missing action required**. Fully configured environments display a **ready** status.
- **Environment Sync** \- A dedicated refresh / sync button next to the environment section pulls newly created environments straight from project settings into the current appStack.
- **Runtime Log Streaming** \- The execution view features an expanded log panel that streams standard runtime logs alongside detailed **Tofu** logs as they execute.
- **Policy Scan Toggle** \- A new toggle lets you trigger automated policy scans directly against an execution plan. If a scan fails, the panel details exactly which policies passed or failed. Action items let you rerun the scan or open the compliance dashboard for full details.
- **CLI Run Navigation** \- A runtime history action button links directly to the appStack **CLI** tab and auto-filters by the exact run execution ID so you can review full command-line histories without hunting for the run.
- **Destroy Workflow** \- To run a destroy sequence, return to the plan phase, activate the dedicated destroy toggle, execute a plan against the destruction parameters, then confirm deployment.

**Why It Matters**

Customers previously ran plan-time policy checks against `plan.json` in their own CI pipelines, and managed provisioning from a modal that hid environment readiness and log detail. Bringing the panel, status labels, live logs, and policy scan into one surface lets teams catch and address issues before deploying, without leaving the appStack.

Read more in [Plan & Deploy](/docs/stackgen/concepts/iac/plan-and-deploy-saas#plan-and-deploy-panel).

### Custom Module Catalog Labels UI

Click to view

We've enhanced the **custom module labels** experience in the **Module Catalog** so label management is more intuitive and discoverable.

**Previously**, module labels were laid out plainly, which made the interface less obvious for users trying to modify them. **Now**, labels read as interactive controls with hover feedback and a direct path into the full label flow.

**Key Features**

- **Hover Highlight** \- When you move the mouse over a module label, the text is dynamically highlighted to indicate that it is an interactive element.
- **Actionable Tooltips** \- Hovering over the label also shows a tooltip that explicitly instructs you to **manage labels**.
- **Direct Access** \- Clicking the highlighted label text opens the complete custom module labels configuration flow, simplifying navigation without hunting through secondary menus.

**Why It Matters**

Label edits stay one hover and click away, so teams that pin appStacks to **stable**, **test**, or **latest** labels can update catalog metadata with less friction and fewer missed affordances.

Read more in [Labels](/docs/stackgen/concepts/modules/labels#manage-labels-in-the-module-catalog) and [Module Catalog](/docs/stackgen/concepts/modules/catalog#custom-module-labels).

## What's Changed

### Changelog Icon Update

Click to view

The interface icon representing the in-app product **changelog** has been updated. The display now uses a **gift** icon that illuminates when you hover over it, so the entry point is easier to notice in the UI chrome.

## What's Fixed

### IA Attribute Clutter on Canvas Modules

Click to view

Availability

This fix is deployed on the staging environment behind a feature flag. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for access status.

We fixed an issue where empty or unused attributes loading on canvas modules caused **Terraform** planning failures.

Previously, the **IA** tab surfaced attributes that were not explicitly filled out, which cluttered the form and could break **plan**. The **IA** tab now only renders attributes you have explicitly filled out.

To explicitly pass a **null** value, use expression mode and manually input `null`. For empty strings, wrap expression fields in empty quotes (`""`).

### Output Field Renaming

Click to view

We fixed an issue that blocked users from successfully renaming **output** fields.

Previously, renaming an output did not reliably update across the related surfaces. Renaming fields now automatically reflects across single output blocks, full blocks, and the **IA** layout.

### State Backend Encryption Flags

Click to view

We fixed an issue within the guided setup module where setting bucket encryption flags to `true` or `false` would break the **S3** state backend configuration.

Previously, toggling those encryption flags could leave the backend config in an invalid state. Encryption flag values now apply correctly without breaking the **S3** backend setup.

### appStack Variables Pagination

Click to view

We fixed an issue where navigating past page one of the **appStack** variables index displayed duplicate page-one variables when the variable count exceeded **100** entries.

Previously, later pages incorrectly reused the first page's variable set. Pagination now returns the correct variables for each page once the index grows beyond **100** entries.

- [What's New](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#whats-new)
  - [Container Type Modules Support](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#container-type-modules-support)
  - [MCP Module Management Tools](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#mcp-module-management-tools)
  - [OCI and Generic Cloud Support](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#oci-and-generic-cloud-support)
  - [Push TF State to Remote Backend](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#push-tf-state-to-remote-backend)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#whats-enhanced)
  - [Plan and Deploy UI/UX Revamp](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#plan-and-deploy-ui-ux-revamp)
  - [Custom Module Catalog Labels UI](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#custom-module-catalog-labels-ui)
- [What's Changed](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#whats-changed)
  - [Changelog Icon Update](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#changelog-icon-update)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#whats-fixed)
  - [IA Attribute Clutter on Canvas Modules](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#ia-attribute-clutter-on-canvas-modules)
  - [Output Field Renaming](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#output-field-renaming)
  - [State Backend Encryption Flags](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#state-backend-encryption-flags)
  - [appStack Variables Pagination](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#appstack-variables-pagination)
