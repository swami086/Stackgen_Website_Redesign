---
title: "Resource-Level Policies, OCI Early Access, Project Invites, and Product Switcher"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/july/v2026-7-3"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/july/v2026-7-3"
status: "ok"
---

## Resource-Level Policies, OCI Early Access, Project Invites, and Product Switcher

The July 2026 weekly **v2026.7.3** release introduces **resource-level** IaC policies (alongside existing **module-level** policies), with plan-time evaluation when attribute values only resolve after **Terraform** or **Tofu** plan. It also brings early-access **Oracle Cloud Infrastructure (OCI)** provider support with **CLI** plan and apply, **email-based** invites to add teammates to projects, a **StackGen** to **Aiden** product switcher in the core UI, and **email** / **OTP** login on the **Aiden** side.

For **platform** and **security** teams, resource policies evaluate against the Terraform resource itself, regardless of which module owns it. For **OCI** work, you can demo and manage infrastructure through custom modules and the **CLI**, with the constraints called out below.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Governance** | [Resource-Level Policies](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#resource-level-policies) |
| **Platform** | [OCI Provider and CLI Early Access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access) |
| **Projects** | [Invite Teammates to Projects by Email](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#invite-teammates-to-projects-by-email) |
| **UX** | [StackGen to Aiden Product Switcher](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#stackgen-to-aiden-product-switcher) |
| **Aiden** | [Aiden Email and OTP Login](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#aiden-email-and-otp-login) |
| **What's Enhanced** | **Governance** | [IaC Policy Management Revamp](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#iac-policy-management-revamp) |
| **Plan & Deploy** | [Resource Policy Evaluation on Terraform Plan](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#resource-policy-evaluation-on-terraform-plan) |
| **What's Fixed** | **Governance** | [Policy Violations Refresh After Plan Policy Scan](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#policy-violations-refresh-after-plan-policy-scan) |
| [Incorrect Security Policy Generation and Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#incorrect-security-policy-generation-and-evaluation) |
| [Misconfiguration Warnings for Nullable Tags](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#misconfiguration-warnings-for-nullable-tags) |
| **Topology** | [Root-Level Folders After appStack-Owned Module Folder](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#root-level-folders-after-appstack-owned-module-folder) |

## What's New

### Resource-Level Policies

Click to view

We've added **resource-level policies** in **Policy Management**. These policies evaluate against a specific Terraform resource type and its attributes, regardless of which module declares that resource.

**Previously**, IaC policies were primarily **module-level**: they checked whether you used the right parameters for a given module, and they depended on how that module named and exposed inputs. That worked for StackGen-provided modules and customer custom modules, but it was module-specific and limited when the same resource type appeared across many modules. **Now**, you can author **resource policies** that always check the resource when the platform detects it (for example, any **AWS DB** instance must have `storage_encrypted` set, or an **S3** bucket name must be prefixed with `stackgen-`).

Policy generation flows (including the LLM-assisted path) have been updated so you can create and work with resource-level policies, not only module-level ones.

**Key Features**

- **Resource-Scoped Checks** \- Define a policy against a Terraform resource type and attribute. When that resource appears in the appStack IaC, the policy is evaluated against it, no matter which module introduced the resource.
- **Works Across Modules** \- Unlike module-level policies, resource policies are not tied to a single module's parameter names. The same rule applies everywhere that resource type shows up.
- **Variable-Backed Attributes** \- If the attribute under check is a variable (for example a bucket name), the value is not known until you run **Terraform** or **Tofu** plan. Resource policies are designed to evaluate those cases using plan output. Module-level policies alone cannot catch them.
- **LLM Policy Generation Support** \- The policy generation flow has been updated so resource-level policies are supported when you generate policies through the assisted / LLM path in Policy Management.
- **Open Source Scanner Alignment** \- Most open source security scanners operate at the resource policy level. Resource policies make it more practical to support those out-of-the-box checks in StackGen, instead of rewriting them around module-specific naming.

**Why It Matters**

Teams get governance that follows the Terraform resource itself. Security-style checks hold across modules and still apply when values only resolve at plan time, instead of stopping at module parameter names in the UI.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies#resource-level-security-policies).

### OCI Provider and CLI Early Access

Click to view

Availability

This feature is early access (first cut). Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for enablement and guidance.

We've added **Oracle Cloud Infrastructure (OCI)** Terraform provider support and related **CLI** options so you can run infrastructure lifecycle management for OCI from StackGen.

**Previously**, **v2026.6.12** landed backend framework support for OCI and a generic cloud type behind a feature flag, with CLI provisioning and full plan / deploy still incomplete. **Now**, OCI is available as a provider in early access: you can use OCI in the provider surfaces, work with custom OCI modules, and run **plan** and **apply** through the **CLI**.

**Key Features**

- **OCI Provider Support** \- OCI is supported as a cloud provider type for infrastructure lifecycle management. When enabled, OCI appears in the relevant provider UI (including the OCI icon) so you can build and manage OCI-based appStacks.
- **CLI Plan and Apply** \- You can run plan and apply for OCI through the **CLI**. This cut uses the CLI for provisioning mainly because of limited **OpenTofu** support for the OCI provider.
- **Custom Modules Only** \- There are no built-in OCI modules in this release. Customers provide their own modules. During an SE engagement, you can create a starter set for the customer and open a PR to the StackGen modules repository if the modules are useful to share. QA-validated examples (such as an object storage bucket) show the expected path.

**Current Constraints**

- Plan and apply for OCI are available via the **CLI** in this early-access cut, not as a full UI plan and deploy path.
- Built-in OCI modules are not included. Custom modules (or SE-authored modules) are required.
- This is the first cut. Use it for demos and early customer OCI work with the limits above in mind.

**Why It Matters**

OCI infrastructure management asks and demos can start now with custom modules and CLI provisioning, without waiting on a full built-in module catalog or broader OpenTofu provider parity.

Read more in [IaC from Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch) and [Provision infrastructure with StackGen](/docs/stackgen/cli-guide/usage/provision-infra-with-cli).

### Invite Teammates to Projects by Email

Click to view

We've added UI support to invite and add users to a **project** by email.

**Key Features**

- **Email Invites** \- Invite teammates to a project through email from the project membership UI.
- **Add Users to Project** \- Add users directly to the project so they can collaborate on that project's appStacks and related resources.

**Why It Matters**

Project owners can bring collaborators onto the right project from the UI, without a separate offline invite path.

Read more in [Members](/docs/stackgen/setup/settings#invite-teammates-to-a-project-by-email) and [Create a Project with Guided Onboarding](/docs/stackgen/setup/project-onboarding).

### StackGen to Aiden Product Switcher

Click to view

We've added a product switcher in the core **StackGen** platform UI so you can move from **StackGen** to **Aiden**.

**Key Features**

- **Switch to Aiden** \- From the core StackGen UI, use the product switcher to open **Aiden**.
- **Known Limitation** \- Switching back from **Aiden** to core StackGen is not available yet. StackGen to Aiden works; Aiden to StackGen still needs to land in a later update.

**Why It Matters**

Teams that use both products can open Aiden from the core platform in one step, while the reverse switcher is tracked as a follow-up.

Read more in [Product switcher](/docs/stackgen/setup/stackgen-ui#product-switcher-stackgen-and-aiden).

### Aiden Email and OTP Login

Click to view

**Aiden** now supports **email-based** login and **one-time password (OTP)** login over email.

**Key Features**

- **Email Login** \- Sign in to Aiden using your email address.
- **Email OTP** \- Request a one-time password sent to your email, then complete login with that OTP.

**Why It Matters**

This brings Aiden login closer to Aiden 1 parity for customers who need email and OTP-based sign-in, alongside the other Aiden 1 support fixes in this release cycle.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden).

## What's Enhanced

### IaC Policy Management Revamp

Click to view

We've enhanced **Policy Management** so IaC policies are organized into two explicit types: **module policies** and **resource policies**.

**Previously**, policy authoring was oriented around module parameters and module-specific naming, which limited how far checks could go when the same resource type appeared across modules, or when values were unresolved until plan. **Now**, Policy Management surfaces both types so you can pick the model that matches the check.

**Key Features**

- **Module Policies** \- Control which values can be entered in the UI for particular module parameters. Use these for organization-specific rules that should give quick feedback while someone configures a StackGen-provided or custom module.
- **Resource Policies** \- Evaluate the Terraform resource itself when the platform detects it, regardless of module. Use these when the check must hold for every occurrence of that resource type.
- **Different Jobs, Not Duplicates** \- Module policies shape parameter input in the UI. Resource policies evaluate the resolved resource. If a security group CIDR is set to `var.cidr`, a module policy cannot catch the final value; a resource policy evaluated after plan can.

**Why It Matters**

Platform engineers can keep fast UI guardrails on module policies and put deeper security and compliance checks on resource policies, instead of forcing one policy model to cover both.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies#how-stackgen-validates-custom-policies).

### Resource Policy Evaluation on Terraform Plan

Click to view

We've enhanced plan-time policy scanning so **resource-level** policies can be evaluated against **Terraform** or **Tofu** plan output.

**Previously**, if an attribute was a variable in the module (for example an **S3** bucket name), there was no way to fully evaluate that resource policy until plan resolved the value. **Now**, after you run plan, resource policies can use the planned configuration for that environment, so the check reflects the real planned values.

**Key Features**

- **Plan-Backed Evaluation** \- Resource policies run against plan results. Attributes that are variables in the module definition are checked using the values plan resolves for that environment.
- **Environment-Specific Results** \- The same resource policy can pass in one environment and fail in another, depending on the planned variable values, without rewriting the policy per environment.
- **Plan and Deploy Policy Scan** \- Use the policy scan action in the plan and deploy flow to see which resource policies passed or failed before you apply.

**Why It Matters**

Customers previously had to run this kind of check against `plan.json` outside the platform, or rely on module-level checks that could not see variable-backed values. Plan-time resource policy evaluation catches those violations before apply, inside the same plan and deploy flow.

Read more in [When resource-level policies run](/docs/stackgen/concepts/policies/custom-policies#when-resource-level-policies-run).

## What's Fixed

### Policy Violations Refresh After Plan Policy Scan

Click to view

We fixed an issue where policy violations did not refresh automatically after a **Policy Scan** was run on plan.

Previously, after you ran a policy scan on plan, the violations view could stay stale until a manual refresh. Policy violations now refresh automatically once the plan policy scan completes.

Read more in [When resource-level policies run](/docs/stackgen/concepts/policies/custom-policies#when-resource-level-policies-run).

### Incorrect Security Policy Generation and Evaluation

Click to view

We fixed incorrect security policy generation and evaluation.

Previously, security policies could be generated or evaluated incorrectly. Security policy generation and evaluation now behave correctly.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies).

### Misconfiguration Warnings for Nullable Tags

Click to view

We fixed an issue where misconfiguration warnings incorrectly flagged tags that are set as nullable in the variable definition.

Previously, tags marked nullable still triggered misconfiguration warnings. Those warnings no longer fire for tags that are nullable in the variable definition.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

### Root-Level Folders After appStack-Owned Module Folder

Click to view

We fixed an issue that prevented folders from being added at the root level after creating a folder for an **appStack-owned** module.

Previously, once you created a folder for an appStack-owned module, adding another folder at the root could fail. You can now add root-level folders after creating a folder for an appStack-owned module.

Read more in [Edit and Sync appStack-Owned Modules](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates).

- [What's New](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#whats-new)
  - [Resource-Level Policies](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#resource-level-policies)
  - [OCI Provider and CLI Early Access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access)
  - [Invite Teammates to Projects by Email](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#invite-teammates-to-projects-by-email)
  - [StackGen to Aiden Product Switcher](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#stackgen-to-aiden-product-switcher)
  - [Aiden Email and OTP Login](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#aiden-email-and-otp-login)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#whats-enhanced)
  - [IaC Policy Management Revamp](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#iac-policy-management-revamp)
  - [Resource Policy Evaluation on Terraform Plan](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#resource-policy-evaluation-on-terraform-plan)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#whats-fixed)
  - [Policy Violations Refresh After Plan Policy Scan](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#policy-violations-refresh-after-plan-policy-scan)
  - [Incorrect Security Policy Generation and Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#incorrect-security-policy-generation-and-evaluation)
  - [Misconfiguration Warnings for Nullable Tags](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#misconfiguration-warnings-for-nullable-tags)
  - [Root-Level Folders After appStack-Owned Module Folder](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#root-level-folders-after-appstack-owned-module-folder)
