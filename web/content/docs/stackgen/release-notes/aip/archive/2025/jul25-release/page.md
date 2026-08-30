---
title: "Faster Infrastructure, Stronger Governance"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/jul25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/jul25-release"
status: "ok"
---

## Faster Infrastructure, Stronger Governance

Our July 2025 release introduces revolutionary new features and enhancements to elevate infrastructure automation, governance, and developer productivity in StackGen. Key highlights include StackBuilder Express for instant infrastructure generation from natural language descriptions, OpenTofu support in StackGen CLI for flexible IaC tooling, and comprehensive compliance scanning for custom Terraform modules.

Teams can now leverage the enhanced Module Editor with AI assistance, streamlined Projects management with Azure AD integration, and improved custom module workflows for faster development cycles.

We've also delivered advanced Infrastructure as Code capabilities, including cross-platform provisioning support, enhanced drift detection, and simplified module versioning. These improvements make infrastructure delivery faster, more consistent, and easier to manage across environments. Additionally, we've resolved several key issues to improve system stability, performance, and the overall user experience across the StackGen Cloud platform.

- What's New
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackgen-cli)
    - [v0.62.0: OpenTofu Support](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#v0620-opentofu-support)
    - [v0.64.0: Teams Are Now Projects](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#v0640-teams-are-now-projects)
  - [StackBuilder Express: Idea to Infra in Seconds](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackbuilder-express-idea-to-infra-in-seconds)
  - [Compliance Scanning for Custom Terraform Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#compliance-scanning-for-custom-terraform-modules)
  - [Stackgen Module Editor Is Now Live: Build, Edit, and Reuse Terraform Modules With Ease](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackgen-module-editor-is-now-live-build-edit-and-reuse-terraform-modules-with-ease)
- What's Enhanced
  - [Teams are now Projects](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#teams-are-now-projects)
  - [Improved appStack Versioning and Governance Support](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#improved-appstack-versioning-and-governance-support)
  - [Cross-Launch Module Editor From Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#cross-launch-module-editor-from-custom-modules)
  - [Improved Custom Resource Management: Delete Your Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#improved-custom-resource-management-delete-your-custom-modules)
- What’s Fixed
  - [appStack Page Stuck on Loading for an Extended Period](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#appstack-page-stuck-on-loading-for-an-extended-period)
  - [Custom `provider.tf` File Is Created While Creating Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#custom-providertf-file-is-created-while-creating-custom-modules)
  - [`No Module Found` Error When Trying to Create a Custom Resource Version](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#no-module-found-error-when-trying-to-create-a-custom-resource-version)
  - [IAM Role `Assume Role Policy` Missing but Not Flagged as Action Required](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#iam-role-assume-role-policy-missing-but-not-flagged-as-action-required)
  - [Drift Detected After Resource Deletion](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#drift-detected-after-resource-deletion)
  - [Drift Detection No Longer Flags Newly Added Resources in an appStack](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#drift-detection-no-longer-flags-newly-added-resources-in-an-appstack)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#supported-resources)

## What's New

### StackGen CLI

#### v0.62.0: OpenTofu Support

Click to view

StackGen CLI now supports **OpenTofu** for infrastructure provisioning! The new `--iac-tool` flag for ILM commands lets you run `provision`, `destroy`, and `drift` using the default provisioning engine **OpenTofu**.

You can still default to **Terraform** by passing `--iac-tool=terraform`.

#### Example Usage

| Commands | Tofu | Terraform |
| --- | --- | --- |
| Provision | `stackgen provision --iac-tool=tofu` | `bash stackgen provision --iac-tool=terraform` |
| Destroy | `stackgen destroy --iac-tool=tofu` | `stackgen destroy --iac-tool=terraform` |
| Drift | `stackgen drift --iac-tool=tofu` | `stackgen drift --iac-tool=terraform` |

View the full usage guide to learn more about [provision infrastructure and the IaC tool flag](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle)

#### v0.64.0: Teams Are Now Projects

Click to view

We’ve updated the StackGen CLI to reflect the recent shift from **Teams** to **Projects** to better align the CLI experience with how infrastructure is managed in modern DevOps environments.

**What's Changed**

The `--team` flag and related commands have been renamed to use `--project`, reflecting the new terminology across the platform.

**Key Changes in CLI**

| Old Command | New Command |
| --- | --- |
| `stackgen team list` | `stackgen project list` |

**Backward compatibility**: Existing scripts using `--team` will continue to work for now, but we recommend migrating to `--project`.

**Why It Matters**

- Consistency with the **StackGen UI**, which now uses **Projects** instead of **Teams**.
- **Clearer intent**: Projects better reflect how organizations structure infrastructure around apps, services, and environments.
- Simplified governance and access management through AD group mapping at the project level.

**What You Need to Do**

- Start using `--project` instead of `--team` in all CLI commands.
- Update any scripts, CI/CD pipelines, or automation that reference `--team`.

For full CLI usage examples and updated flags, see the [CLI documentation](/docs/stackgen/cli-guide/usage/viewprojects).

### StackBuilder Express: Idea to Infra in Seconds

Click to view

Transform your cloud ideas into Infrastructure as Code, instantly.

- Describe infra in plain English or upload a sketch
- Get real-time previews of Terraform/OpenTofu code
- Export and refine your architecture in StackGen

No account needed to try, just start typing or uploading!

**Try Examples Like**:

- "A web app with a load balancer and RDS database"



![Example StackBuilder Express](https://docs.stackgen.com/assets/images/exampleintent2infrajun2025-3bf7cdbcc15e8ffcb3b2be17bc555021.png)

- Upload a whiteboard sketch or slide screenshot


Learn more about [StackBuilder Express](/docs/stackgen/stackgen-mcp) or [get started](https://intent2infra.cloud.stackgen.com/) right away.

### Compliance Scanning for Custom Terraform Modules

Click to view

StackGen now supports **full compliance scanning for custom Terraform modules**, enabling your teams to detect and fix security and policy violations before deployment, whether your modules are created within StackGen or imported from Git, `.tfstate`, or code editors like VS Code.

**Key Features**

- **Pre-deployment scanning** of all custom modules during appStack creation.
- **Real-time feedback** with actionable compliance results.
- **Violation logs** with severity, failed policies, and remediation guidance.
- **Support across sources**, including Git, TFState, StackGen Module Editor, and external IDEs

**How It Works**

- Scan modules directly from the **Catalog** or click **View Compliance** from the **appStack Policies** tab.



![Scan Results](https://docs.stackgen.com/assets/images/scanresults-373b5c486906691f3c9b0aa50e929f43.png)

- View violations in the **Module Editor**, **Compliance Dashboard**, or **IDEs** after syncing.

- **Get rich violation context**: policy name, impacted resource, severity, and fix suggestions.


**Example**: Copied some Terraform code and created a custom module?

1. You can edit, publish, and scan it directly from the **Catalog > Actions > Scan** menu.

2. Fix any violations in the **Module Editor** or your **IDE**, re-scan the module by following Step 1. above to view your paased policies, and you're good to go!



![Fix Violation](https://docs.stackgen.com/assets/images/fixedviolation-a782855d8fca0b8ff77de870f4f4a951.png)


Learn more about [Scanning Modules](/docs/stackgen/concepts/modules/scanmodules).

### Stackgen Module Editor Is Now Live: Build, Edit, and Reuse Terraform Modules With Ease

Click to view

The new **Module Editor** in StackGen makes it easier than ever to **create**, **edit**, and **manage** **Custom Terraform Modules**, all from one place. Whether you're building your custom modules from scratch, importing from Git, or editing in your IDE, StackGen has you covered.

- **Visual Code Editor**: Intuitive interface to write, preview, and version your module code.
- **AI Assistant**: Auto-generate Terraform modules by just describing what you need.
- **Compliance Scanning**: Scan your modules before deployment to catch policy violations early.
- **IDE Integration**: Open and edit modules in VS Code (Cursor, NVIM, and WindSurf coming soon).
- **Catalog Publishing**: Publish and reuse modules across your appStacks.

**Get started**: via **Modules > Create Module** or **Modules > Open in Module Editor** and streamline your IaC workflows today!

Check out the [Module Editor](/docs/stackgen/concepts/modules) and [Open in IDE](/docs/stackgen/concepts/modules/openinide) docs to learn more about the feature.

## What's Enhanced

### Teams are now Projects

Click to view

We’ve made it easier to manage governance policies for teams with overlapping responsibilities.

**Projects = The New Teams**

We’ve renamed **Teams** to **Projects** to better reflect how you organize your infrastructure work, whether it’s mission-critical apps or internal microservices.

**Key Features**

- **Azure Active Directory (AD) Integration at the Project Level**: You can now map your organization’s AD groups directly to StackGen Projects. This makes onboarding to StackGen seamless and removes the need to manage user permissions across multiple projects manually.
- **Self-Service AD Setup**: StackGen now supports self-service AD configuration.

**Why This Matters**

Previously, your DevOps teams had to create and manage separate teams for different governance needs, like stricter controls for production apps and lighter policies for internal tools. That often meant juggling overlapping users across teams. With Projects and AD mapping:

- You reduce setup time and admin overhead
- You enforce the right governance automatically
- You simplify user access without compromising on control

Check out the documentation on [Projects](/docs/stackgen/setup/settings#project-management).

### Improved appStack Versioning and Governance Support

Click to view

We've restructured how StackGen manages appStacks to support explicit versioning and enable more advanced governance controls.

**What’s Improved**

- **appStack and Version Separation**: appStacks are now distinct from their versions in the backend, allowing for cleaner data structures and better lifecycle management.
- **Governance at Both Levels**: You can now assign governance policies at the appStack level or to individual versions, supporting stricter compliance and review workflows.
- **Simplified Identifiers**: appStacks now use URL-friendly IDs, making it easier to reference and navigate them within StackGen and across systems.
- **Better Performance at Scale**: Pagination has been added to the appStack list view in the UI and API, reducing load times and improving responsiveness, especially for users managing hundreds of appStacks.

This update improves performance, policy enforcement, and long-term manageability while remaining fully backward-compatible with your existing appStacks.

### Cross-Launch Module Editor From Custom Modules

Click to view

You can now open custom modules directly in the **Module Editor** from the **Topology** canvas. This enhancement allows faster access to custom module code and configuration without leaving the appStack view.

![Cross Launch Module Editor](https://docs.stackgen.com/assets/images/crosslaunchmoduleeditor-4d3ab2f2b67473439fc9f47e0a8a5f2a.png)

Right-clicking a custom module now displays an **Open in Module Editor** option. This launches the **Module Editor** in a new tab, preloaded with the selected module’s structure and IaC files for editing. You can then make changes using either the code view or the preview, and optionally publish a new version for reuse.

This update improves the workflow for editing and managing custom modules, supporting quicker iterations and more streamlined version control. For more details, refer to the [Module Editor](/docs/stackgen/concepts/modules) page.

### Improved Custom Resource Management: Delete Your Custom Modules

Click to view

You can now delete custom modules directly from the topology canvas if you have a DevOps or Admin role. This feature lets you keep your workspace uncluttered by removing custom modules you no longer want to use from the **Add New Resource** panel.

![Delete Custom Module](https://docs.stackgen.com/assets/images/deletecustommodule-2fc05fde04b7d3a31d8b20eb1332337d.png)

#### Key features

- **Delete module and all versions**: Deleting a custom module permanently deletes it and prevents further use in new deployments, and prompts you to remove it from your existing appStacks where it is used before you proceed.

- **Delete Module Versions**: You can delete specific versions of a custom module, provided they are not actively used in any of your appStacks.

- **Error Handling**: Attempts to delete custom modules that are still in use in one of your appStacks, Resource Packs, or Custom Resource Policies will throw an error pointing to the appStack where the custom module is in use. When deleting a module, the UI will show a warning explaining this behavior to avoid confusion.



note





You cannot delete custom modules used in



  - appStacks
  - Resource packs
  - Custom security policy
  - Custom migration mapping policy
  - Resource override mapping policy

![delete warning](https://docs.stackgen.com/assets/images/deletemodulewarning-8acbf75d18ad3c2a4c13bb0dfc761af1.png)

For full details, refer to the [Custom Modules](/docs/stackgen/concepts/resources/custom-module#delete-custom-modules) page.

## What’s Fixed

### appStack Page Stuck on Loading for an Extended Period

Click to view

With a large number of appStacks, the appStack page often got stuck on the loading screen, making it difficult to view your appStack list.

We've resolved this issue by adding pagination and optimizing the backend, so now the appStack page loads quickly and efficiently, even with many appStacks.

### Custom `provider.tf` File Is Created While Creating Custom Modules

Click to view

While creating a custom module, an empty `provider.tf` file was being created automatically, even if you did not enable it through the UI.

We’ve fixed this issue by ensuring that the `provider.tf` file is now only created when the user selects it during the custom module creation process. If not enabled, the file will not be generated.

### `No Module Found` Error When Trying to Create a Custom Resource Version

Click to view

While creating a new version of a custom module, you may encounter the `No module found` error. You will notice this error messaging pop up after making changes to the Infrastructure as Code (IaC) and clicking **Create Module Version**.

![Not found error](https://docs.stackgen.com/assets/images/notfounderrorjuly2025-f8d67fc0476ce19c60b4104288d061f2.png)

The absence of the **orgId** in the request caused the API to fail when trying to create the version. We’ve fixed this issue by ensuring that the **orgId** is correctly included in the request when creating a custom module version at the project level. Now, the system properly includes the **orgId** when required, allowing you to create a new version of the module successfully.

### IAM Role `Assume Role Policy` Missing but Not Flagged as Action Required

Click to view

While creating an appStack and dragging an IAM role onto the canvas, the `assume_role_policy` attribute, which is required for the IAM role, was not being picked up as an **Required Action**. As a result, the actions required count was not reflecting the missing attribute.

![Actions Required](https://docs.stackgen.com/assets/images/actionsrequiredjul2025-aee9bb328e7c5902aea94e621ce04e0d.png)

We’ve fixed this issue by ensuring that the `assume_role_policy` attribute is now correctly identified as an Required Action when it is missing, updating the count to 1 as expected.

### Drift Detected After Resource Deletion

Click to view

We have fixed the issue with the CLI Runs where `stackgen drift detect` reported drift even after resources were destroyed. After running `stackgen destroy` to delete all resources in an appStack, running `stackgen drift detect` would still report a drift, even though no infrastructure would have remained.

This was happening because the drift detection logic compared the desired state (`Terraform plan`) against the last known state in the `.tfstate`, without accounting for the fact that resources had been destroyed, resulting in a false positive where the absence of resources is treated as unexpected drift, rather than an expected post-destroy state.

### Drift Detection No Longer Flags Newly Added Resources in an appStack

Click to view

Drift detection has been fixed to ignore newly added but unprovisioned resources in the appStack. Previously, if you modified an existing appStack, for example, by adding a new **S3 bucket**, but had not yet applied the changes using `stackgen provision`, running `stackgen drift detect` would incorrectly flag the new resource (and its related resources) as drift.

This happened because the CLI compared the updated desired state, including unprovisioned additions, against the current cloud state, resulting in false positives. With this fix, drift detection now considers only the resources that have already been provisioned, ensuring that it accurately reports actual configuration drifts in deployed infrastructure.

## Supported Resources

Click to view

We now support these additional resources:

- AWS
  - Standalone and Grouped resources
- Azure
  - Grouped resources

Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackgen-cli)
  - [StackBuilder Express: Idea to Infra in Seconds](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackbuilder-express-idea-to-infra-in-seconds)
  - [Compliance Scanning for Custom Terraform Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#compliance-scanning-for-custom-terraform-modules)
  - [Stackgen Module Editor Is Now Live: Build, Edit, and Reuse Terraform Modules With Ease](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#stackgen-module-editor-is-now-live-build-edit-and-reuse-terraform-modules-with-ease)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#whats-enhanced)
  - [Teams are now Projects](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#teams-are-now-projects)
  - [Improved appStack Versioning and Governance Support](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#improved-appstack-versioning-and-governance-support)
  - [Cross-Launch Module Editor From Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#cross-launch-module-editor-from-custom-modules)
  - [Improved Custom Resource Management: Delete Your Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#improved-custom-resource-management-delete-your-custom-modules)
- [What’s Fixed](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#whats-fixed)
  - [appStack Page Stuck on Loading for an Extended Period](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#appstack-page-stuck-on-loading-for-an-extended-period)
  - [Custom `provider.tf` File Is Created While Creating Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#custom-providertf-file-is-created-while-creating-custom-modules)
  - [`No Module Found` Error When Trying to Create a Custom Resource Version](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#no-module-found-error-when-trying-to-create-a-custom-resource-version)
  - [IAM Role `Assume Role Policy` Missing but Not Flagged as Action Required](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#iam-role-assume-role-policy-missing-but-not-flagged-as-action-required)
  - [Drift Detected After Resource Deletion](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#drift-detected-after-resource-deletion)
  - [Drift Detection No Longer Flags Newly Added Resources in an appStack](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#drift-detection-no-longer-flags-newly-added-resources-in-an-appstack)
