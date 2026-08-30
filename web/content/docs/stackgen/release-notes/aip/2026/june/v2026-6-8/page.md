---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/june/v2026-6-8"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/june/v2026-6-8"
status: "ok"
---

The June 2026 **v2026.6.8** release adds selectable **UI themes**, **governance policy scans against Terraform plan output**, **direct Git commits without a PR**, and enhances how you update **appStack-owned custom modules**, so field changes apply in place and show up on the topology canvas without a delete-and-recreate cycle.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **StackGen UI** | [Personalize Your Workspace with UI Themes](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#personalize-your-workspace-with-ui-themes) |
|  | **Policies** | [Governance Policy Scans on Terraform Plan Output](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#governance-policy-scans-on-terraform-plan-output) |
|  | **Platform** | [Direct Git Commits Without a PR](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#direct-git-commits-without-a-pr) |
| **What's Enhanced** | **Topology** | [In-Place Updates for appStack-Owned Custom Modules](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#in-place-updates-for-appstack-owned-custom-modules) |
| **What's Fixed** | **Policies** | [Policy Generation UI Broken After UI Kit Changes](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#policy-generation-ui-broken-after-ui-kit-changes) |
| **Platform** | [PAT Table Failing to Load](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#pat-table-failing-to-load) |

## What's New

### Personalize Your Workspace with UI Themes

Click to view

**StackGen** now includes selectable **UI themes**, letting you choose the color scheme that best fits how you work.

![Personalize Your Workspace with UI Themes](https://docs.stackgen.com/assets/images/themesRN2026.6.8-3d1dcacb8503e65c648353665aeadf32.png)

**Key Features**

- **Six themes** across three color families : **Green**, **Cool**, and **Purple**, each with **light** and **dark** variants.
- **Immediate preview**: Selecting a theme updates the interface right away, with no refresh required.

**How to Change Your Theme**

1. From the StackGen Home page, click the dropdown arrow next to your profile.
2. Click **Theme**.
3. Select one of the available themes.

**Why It Matters**

Whether you prefer a light or dark interface, StackGen now lets you match the platform to your preference across green, cool, and purple theme families, without changing how you work in the product.

### Governance Policy Scans on Terraform Plan Output

Click to view

**StackGen** now supports running a **governance policy scan directly against Terraform plan output**, in addition to the existing static analysis on an appStack.

**Key Features**

- **Run scans from Plan and Deploy**: When you execute a terraform plan via the **Plan and Deploy** dialog, a new **Run policy scan** button lets you trigger a policy scan directly on that plan. The scan runs against the `plan.json` file that is generated for Terraform Plan. This is the same file that your users have historically scanned in their own CI pipelines and it is now available natively in StackGen.



![Plan ploicy scan](https://docs.stackgen.com/assets/images/policyscanplanRN2026.6.8-b318d5bc82ab602380814486dbf4eb16.png)

- **Violation management**: Once the scan completes, it generates policy violations that can be fixed via **Actions** and **Warnings** dialog. You can fix these violations before proceeding with your plan, or bypass the violations and continue with the deployment.

- **Compliance Dashboard reporting**: Scan results also flow into the Compliance Dashboard. Use the `policy eval against plan` **Run Type** filter to see which policies passed or failed, when they ran, and which resources were impacted.



![Compliance Dashboard](https://docs.stackgen.com/assets/images/plicyscancomplianceRN2026.6.8-8f2a912ad6f233b688fdd4f4c8d69f5d.png)


**Why It Matters**

Policy checks against plan output previously lived outside StackGen, in your CI pipelines. Bringing this scan into the platform means your teams get policy feedback right when you run a **Plan**, without leaving the UI. You can either fix violations or proceed without interruptions, all while keeping a full compliance record.

### Direct Git Commits Without a PR

Click to view

**StackGen** now includes a toggle that lets you push code changes directly to a branch in your Git repository, instead of creating a pull request.

![Push to Git toggle](https://docs.stackgen.com/assets/images/pushtogitRN2026.6.8-87bac982d56f4869d7a408f6629465a9.png)

**Key Features**

- **Toggle for PR vs. Direct Commit**: A new toggle controls whether pushes go through a PR or commit directly to the branch.



important





Disabling the PR option places responsibility on the users to complete their own sanity checks before committing directly to a branch, since the PR review step is bypassed.




  - **PR flow retained by default**: With the toggle turned on, StackGen follows the original workflow, creating a PR for every push.
  - **Direct commit when disabled**: Turning the toggle off pushes your changes straight to the branch, skipping the PR step.

**Why It Matters**

Not every workflow needs a PR for every change you make. With this new feature, your teams can iterate fast by commmitting changes directly to a branch, while teams that want to enforce review gates can choose to go with the existing PR flow.

## What's Enhanced

### In-Place Updates for appStack-Owned Custom Modules

Click to view

We've enhanced how **appStack-owned custom modules** are updated. Previously, applying any change to a module, including adding or modifying a field, required deleting the module from the topology and dragging it back in. Modules generated via the `importer-cli` flow went a step further and locked editing entirely.

![In-place updates for appStack-owned custom modules](https://docs.stackgen.com/assets/images/inplaceappstackmoduleN2026.6.8-67a6d3da2298c8384199b17789ace905.jpg)

**Key Features**

- **In-place field updates**: Add or modify fields directly within the module (for example, adding a subnet input) and publish those changes straight to the appStack.
- **Dynamic topology sync**: Updates reflect immediately in the topology canvas, with no delete-and-recreate cycle.

**Why It Matters**

Editing an appStack-owned module used to mean losing your place in the topology just to make a small change. Now updates, down to individual fields, apply directly and show up in the canvas right away, so teams can iterate on modules without rebuilding them.

## What's Fixed

### Policy Generation UI Broken After UI Kit Changes

Click to view

We have fixed an issue where the bottom section of the UI displayed after generating a policy was broken. This was caused by recent UI kit changes. These UI flows have now been corrected.

### PAT Table Failing to Load

Click to view

We have fixed an issue where the Personal Access Token (PAT) table was failing to load properly.

- [What's New](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#whats-new)
  - [Personalize Your Workspace with UI Themes](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#personalize-your-workspace-with-ui-themes)
  - [Governance Policy Scans on Terraform Plan Output](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#governance-policy-scans-on-terraform-plan-output)
  - [Direct Git Commits Without a PR](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#direct-git-commits-without-a-pr)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#whats-enhanced)
  - [In-Place Updates for appStack-Owned Custom Modules](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#in-place-updates-for-appstack-owned-custom-modules)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#whats-fixed)
  - [Policy Generation UI Broken After UI Kit Changes](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#policy-generation-ui-broken-after-ui-kit-changes)
  - [PAT Table Failing to Load](/docs/stackgen/release-notes/aip/2026/june/v2026-6-8#pat-table-failing-to-load)
