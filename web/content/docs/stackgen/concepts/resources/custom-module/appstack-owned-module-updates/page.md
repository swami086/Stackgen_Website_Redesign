---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/resources/custom-module/appstack-owned-module-updates"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/custom-module/appstack-owned-module-updates"
status: "ok"
---

## Overview

appStack-owned custom modules live inside a single appStack. You edit that module in the Custom Module Editor, publish it back to the appStack, and StackGen refreshes every placed instance on the Topology canvas. You do not re-upload files, delete nodes, or drag the module onto the canvas again.

This applies when you change Terraform source (for example `.tf` files), add infrastructure to the module, or expose new input parameters. After **Publish to appStack**, the Attributes panel on each placed node shows the updated fields. Values you already saved on those nodes stay in place.

## Who can create and publish

| Role | Create appStack-owned modules | Publish to appStack |
| --- | --- | --- |
| **Project DevOps** | Yes | Yes |
| **Project Admin** | Yes | Yes |
| **Enterprise DevOps** / **Admin** | Yes | Yes |
| **Developer** | No | No |

**Project DevOps** users can create appStack-owned modules and publish updates for appStacks in their project.

**Current constraints**

- Importing modules into the project catalog, and promoting an appStack-owned module to **Enterprise**, stay **tenant** / **enterprise** scoped. Project DevOps alone does not unlock those flows.
- Other catalog workflows still follow [RBAC for Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules).

See [v2026.7.11](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#project-devops-appstack-owned-module-publishing).

## How to Use It

Use in-place updates to keep appStack-owned modules and the canvas in sync as the module evolves.

- **Edit modules that already sit on the canvas**: Open an existing appStack-owned module from **Existing AppStack Owned Modules**, change it, and publish. Placed nodes pick up the new schema without a rebuild.
- **Edit modules from importer CLI appStacks**: appStacks created through the [Terraform Importer](/docs/stackgen/cli-guide/terraform-importer) allow the same edit and publish flow.
- **Change code and UI schema together**: Update `.tf` files and `.stackgen/stackgen.yaml` in the editor or through the Module AI Assistant, then confirm how fields look on the **Preview** tab before you publish. See [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

## Why It Matters

Use it when you need the module definition and every canvas instance to move forward together, without a manual replace step.

- **Avoid delete and re-add**: You no longer remove a module from the topology and place it again just to pick up source changes.
- **Expose new inputs safely**: New variables appear on existing nodes after publish. Required fields that still need values show a warning (`!`) until you save them.
- **Keep configured values**: Existing attribute values on placed nodes are retained when the module updates.

## Use Cases for appStack-Owned Modules

- **Iterate on a VPC-style module**: Add subnet IDs, route tables, or other attributes after the module is already on the canvas, then publish and fill the new fields.
- **Refine an imported brownfield module**: Edit an appStack-owned module that came from importer CLI, publish, and configure new parameters on the same nodes.
- **AI-assisted module edits**: Prompt the Module AI Assistant to add attributes or inputs, accept the diffs, preview the form layout, and publish to the appStack.

## How it Works

Updating an appStack-owned module used to mean workarounds: re-dragging modules, skipping new fields, or being blocked on importer-built appStacks. In-place publish keeps the canvas nodes you already configured, updates their forms from the latest module source, and applies that update to every instance of the module on that appStack at once.

## How to Update an appStack-Owned Custom Module

### Step 1: Open the Custom Module Editor

1. Open your appStack Topology canvas.
2. Click **Add New** (`+`).
3. Select **Custom Module** (or **Create Module**).
4. Expand **Existing AppStack Owned Modules** to list modules created or imported for this appStack.
5. Hover over the module you want to update and click the **Edit** (pencil) icon.

tip

To copy a module structure instead of editing the original, enter a name under **Create New appStack Owned Module** to create a fork.

You can also start from **Create appStack Owned Module** on the canvas. See [Topology canvas](/docs/stackgen/concepts/topology#8-create-appstack-owned-module).

### Step 2: Modify code and expose new input parameters

Click to view

In the Custom Module Editor, change the module source and review how inputs will appear on the canvas.

**Update code with the Module AI Assistant or Code view**

Enter prompts in the Module AI Assistant, for example:

- `create a terraform module - vpc_basic with only vpc name as attribute`
- `Add a new attribute of subnet IDs`
- `Add route table`
- `Take a new input for the table`

The assistant can update `main.tf`, `variables.tf`, `outputs.tf`, and `.stackgen/stackgen.yaml`. For editor layout and AI assistant controls, see [Module Editor](/docs/stackgen/concepts/modules).

**Review and accept code diffs**

Inspect the generated file diffs. Click **Accept** or **Accept All** when the changes look correct.

**Verify field layouts in Preview**

1. Open the **Preview** tab.
2. Confirm how UI sections (for example **VPC Configuration**, **Subnet Configuration**, **Route Table Configuration**) will present input fields to users on the canvas.

### Step 3: Publish updates to the appStack

1. Click **Publish to appStack** in the top-right corner of the editor.
2. Wait for the confirmation toast: `Module published successfully`.
3. Return to the Topology canvas.

### Step 4: Configure updated parameters on canvas nodes

1. Select the module node on the Topology canvas.
2. Open the **Attributes** panel. Newly exposed inputs (for example **Subnet IDs** or **Route Table Name**) appear on the form after publish.
3. If a new variable is required and still empty, the node shows a warning indicator (`!`) until you set a value.
4. Enter the required parameters and click **Save**.
5. Confirm the toast: `Topology updated successfully`.

## System behavior

Click to view

| Feature / scenario | Behavior |
| --- | --- |
| **Canvas node sync** | After publish, placed nodes update their UI forms and schema in place from the published module. |
| **Data retention** | Variable values already saved on existing canvas nodes are preserved. |
| **Multiple instances** | If the same appStack-owned module is placed more than once on the canvas, publish updates all of those instances together. |
| **Validation alerts** | Nodes that still need required fields show a warning icon (`!`) until you save valid values. |
| **Importer CLI support** | appStacks imported with the Terraform Importer support editing appStack-owned modules and in-place publish sync. |

- [Overview](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#overview)
- [Who can create and publish](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#who-can-create-and-publish)
- [How to Use It](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#how-to-use-it)
- [Why It Matters](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#why-it-matters)
- [Use Cases for appStack-Owned Modules](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#use-cases-for-appstack-owned-modules)
- [How it Works](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#how-it-works)
- [How to Update an appStack-Owned Custom Module](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#how-to-update-an-appstack-owned-custom-module)
  - [Step 1: Open the Custom Module Editor](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#step-1-open-the-custom-module-editor)
  - [Step 2: Modify code and expose new input parameters](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#step-2-modify-code-and-expose-new-input-parameters)
  - [Step 3: Publish updates to the appStack](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#step-3-publish-updates-to-the-appstack)
  - [Step 4: Configure updated parameters on canvas nodes](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates#step-4-configure-updated-parameters-on-canvas-nodes)
