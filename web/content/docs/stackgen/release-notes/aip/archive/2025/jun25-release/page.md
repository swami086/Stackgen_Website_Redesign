---
title: "StackGen Intent-to-Infrastructure Platform"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/jun25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/jun25-release"
status: "ok"
---

## StackGen Intent-to-Infrastructure Platform

With the June 2025 Release, we've enhanced our cloud infrastructure automation platform with the DevOps governance features teams search for most. Our new Cloud Asset Discovery, unified Activity Logs, and Compliance Dashboard deliver the infrastructure visibility and regulatory compliance capabilities growing companies need.

Our latest DevOps productivity enhancements include Backstage integration, automated Module Catalog, and streamlined Infrastructure-as-Code deployment. These cloud management improvements reduce deployment time while maintaining the security and consistency enterprise teams require.

We've resolved critical platform stability issues to deliver the reliable cloud infrastructure automation experience your team depends on. Discover how StackGen's latest capabilities can streamline your DevOps workflow—explore the complete feature guide below.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-new)
  - [Cloud Asset Discovery in StackGen](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#cloud-asset-discovery-in-stackgen)
  - [Activity logs: Unified Visibility Across CLI and UI](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#activity-logs-unified-visibility-across-cli-and-ui)
  - [StackGen Compliance Dashboard](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#stackgen-compliance-dashboard)
  - [Backstage Self-Service: Powered by StackGen](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#backstage-self-service-powered-by-stackgen)
  - [Module Catalog](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#module-catalog)
- [What’s Enhanced](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-enhanced)
  - [HCL Is Now the Default Format for IaC Exports](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#hcl-is-now-the-default-format-for-iac-exports)
  - [Improved Multi-Environment Support in IaC](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#improved-multi-environment-support-in-iac)
  - [Advanced IaC Tab File and Folder Management](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#advanced-iac-tab-file-and-folder-management)
  - [CLI Support for Bulk Module Onboarding via Git Repositories](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#cli-support-for-bulk-module-onboarding-via-git-repositories)
  - [Generate Custom Module Linkages Within Imported Tfstates](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#generate-custom-module-linkages-within-imported-tfstates)
  - [Team Management Experience](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#team-management-experience)
  - [Module Version Enforcement in Governance](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#module-version-enforcement-in-governance)
- [What’s Fixed](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-fixed)
  - [Create Resource Pack Button Not Visible](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#create-resource-pack-button-not-visible)
  - [Actions Count Not Displaying Immediately After Workload Drag-and-Drop](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#actions-count-not-displaying-immediately-after-workload-drag-and-drop)
  - [Governance Configs Incorrectly Allowing Assignment to Other Teams](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#governance-configs-incorrectly-allowing-assignment-to-other-teams-)
  - [Resource Restriction Policy for Enforcing Resource Versions Is Failing](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#resource-restriction-policy-for-enforcing-resource-versions-is-failing)
  - [User Role Incorrectly Assigned While Adding Users to Teams](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#user-role-incorrectly-assigned-while-adding-users-to-teams)
  - [Terramate Generation Failing Due to Recent Changes](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#terramate-generation-failing-due-to-recent-changes)
  - [Variable Name Updates Do Not Reflect in Environment Profiles](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#variable-name-updates-do-not-reflect-in-environment-profiles)
  - [Blank Canvas and Import Error While Importing Topology JSON](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#blank-canvas-and-import-error-while-importing-topology-json)
  - [`archive_file` Missing from Plan During Run](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#archive_file-missing-from-plan-during-run)
  - [Inconsistent Resource Names in AWS Console Due to Missing `name` Tags](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#inconsistent-resource-names-in-aws-console-due-to-missing-name-tags)
  - [Workspace Icon Reverts on Sidebar Hover Out](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#workspace-icon-reverts-on-sidebar-hover-out)
  - [Not Found Error When Creating Custom Module Version at Team Level](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#not-found-error-when-creating-custom-module-version-at-team-level)
  - [appStack Tag Added on TFState Import](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#appstack-tag-added-on-tfstate-import)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#supported-resources)

## What's New

### Cloud Asset Discovery in StackGen

Click to view

We’re excited to introduce **Resource Discovery** in StackGen — a high-impact feature that simplifies Day 0 visibility into your existing cloud infrastructure and supports ongoing drift detection.

![Discovery](https://docs.stackgen.com/assets/images/startdiscovery-cbc2e1a8545bffa5361b7541f60ba1f7.png)

**How Discovery Works**

1. **Pre-appStack Creation: Initial Resource Discovery**



![Discovered Resources](https://docs.stackgen.com/assets/images/discoveredresources-1312451358156f215b18b4443535780a.png)










   - Import your existing Terraform state files (`.tfstate`) to visualize cloud resources before creating an appStack.

   - Selectively include resources from the discovery to create a new appStack.



     ![Discovered Resources](https://docs.stackgen.com/assets/images/selectresouces-6d2eccf298f57953a9ba6db7ced3fe96.jpg)

   - Seamlessly update resource selection before finalizing the appStack topology.
2. **Post-appStack Creation: Use Drifts for Continuous Drift Monitoring**
   - Detect and track configuration drifts between the deployed infrastructure and your defined Infrastructure as Code (IaC).

   - Easily remediate drift by updating the appStack based on real-time changes in your environment.



     ![Discovered Resources](https://docs.stackgen.com/assets/images/driftdiscovery-9a6d6e5e9442312be92da08d79f37bfc.png)

**How It Helps**

- **Day 0 Insight**: Visualize your cloud footprint before provisioning or managing with StackGen.
- **Streamlined Onboarding**: Accelerate appStack creation using existing infrastructure definitions.
- **Governance-Ready**: Maintain alignment between live infrastructure and desired state over time.

StackGen’s Resource Discovery is your first step toward smarter, more resilient infrastructure management.

You can also create [appStacks from Cloud Discovery](/docs/stackgen/concepts/appstacks/createappstacks/fromdiscovery) once your discovery is complete. Check out the [Cloud Asset Discovery](/docs/stackgen/concepts/clouddiscovery) and [Drift Detection](/docs/stackgen/concepts/drift) documentation.

### Activity logs: Unified Visibility Across CLI and UI

Click to view

We’ve introduced **Activity logs for your CLI Runs** in the **CLI Runs** tab in StackGen to unify visibility across both the **Web UI** and the **CLI workflows**.

![CLI Runs](https://docs.stackgen.com/assets/images/cliruns-93e216597a74666f1945115ea0297bb1.jpg)

This enhancement ensures that **all appStack lifecycle actions**, including provisioning and destruction triggered via the CLI, are now **seamlessly tracked and displayed** in the StackGen UI.

**Why this matters:**

- Many teams (DevOps, Engineering) rely on the StackGen CLI for its speed and automation-friendly interface.
- Previously, actions performed via CLI weren’t visible in the Web UI, creating gaps in auditability, transparency, and collaboration.
- The CLI Runs tab eliminates this gap by bringing CLI and UI activity into a single, unified view.

With this update, important appStack actions, no matter where they’re triggered, are now traceable, visible, and auditable from one place.

Check out the [CLI Runs](/docs/stackgen/concepts/cliruns) documentation to know more about Activity Logs.

### StackGen Compliance Dashboard

Click to view

We’re excited to introduce the **StackGen Compliance Dashboard**, designed to simplify and streamline compliance tracking for your cloud infrastructure.

![Compliance Overview](https://docs.stackgen.com/assets/images/complianceoverview-cd66d322fe8e6682242c0fc4d026c8f5.png)

**Key Features**

- Visibility into passed and failed policy checks
- Mapping to control IDs aligned with frameworks like **NIST**, **FedRAMP**, and **Mars-E**
- CSV export of policy checks for easier collaboration
- Support for both **automatic** and **custom** policy enforcement
- Audit-ready reporting and continuous compliance tracking

**Why It Matters**

Compliance reporting no longer needs to be a manual, siloed effort. The StackGen Compliance Dashboard empowers teams to monitor and report on compliance status with confidence.

**Get Started**: Access the dashboard from the [StackGen Home or directly within your appStack](/docs/stackgen/concepts/compliance#navigating-to-the-compliance-dashboard).

Stay ahead of audits and security reviews with centralized compliance insights. Check out the [Compliance Dashboard](/docs/stackgen/concepts/compliance) documentation to learn more.

### Backstage Self-Service: Powered by StackGen

Click to view

We’re excited to roll out **Backstage Self-Service**, a seamless way for your developers to scaffold applications and provision infrastructure, without needing to rely on DevOps!

![Backstage Self Serve Home](https://docs.stackgen.com/assets/images/backstageselfservehome-140d92ea03cf14b6f53ed48352d9905e.png)

note

This feature is available on request. Contact [support@stackgen.com](mailto:support@stackgen.com) to get started.

**What’s Possible?**

With StackGen self-service integrated into Backstage, your developers can:

- Scaffold backend and frontend apps
- Create appStacks directly from templates
- Generate and export Infrastructure as Code (IaC)
- Provision cloud resources like S3, RDS, Helm workloads, and more
- Use advanced configurations like resource packs and nested resource groups

To explore the full guide and sample templates, refer to the [BackStage Self-Service](/docs/stackgen/integrations/selfserve) documentation.
For questions or setup support, reach out to [support@stackgen.com](mailto:support@stackgen.com).

### Module Catalog

Click to view

The **StackGen Catalog** provides DevOps and Admin teams with a powerful platform to manage and enforce the use of Terraform modules within your organization. It allows you to curate trusted modules from multiple sources, ensuring developers only use approved infrastructure configurations and streamlining workflows.

![Module Catalog](https://docs.stackgen.com/assets/images/modulecatalog-721a0a8e31d1606b42dea5513b2c44f0.jpg)

**Key Features**

- **Centralized Module Management**: Import and manage modules from custom GIT repositories, Terraform registries, and StackGen-generated modules in one platform.
- **Web UI and CLI**: Use either the Web UI or the CLI to ingest, list, and search Terraform modules.
RBAC Permissions: Control module access and assignment based on RBAC permissions, ensuring only approved modules are used across teams.
- **Module Enforcement**: Enforce specific Terraform modules across your organization to ensure consistency and compliance.
- **Sharing Custom Modules Across Teams**: You can share custom modules between organizations or teams, allowing for a more streamlined module management process. Custom modules that are shared remain updatable, and new versions will automatically be available for every team that has access to the shared module. This ensures consistency and reduces duplication across teams.

For full details, refer to the [StackGen Module Catalog](/docs/stackgen/concepts/modules/catalog) Page.

## What’s Enhanced

### HCL Is Now the Default Format for IaC Exports

Click to view

Hashicorp configuration language (HCL) is now the default format for Infrastructure as Code (IaC) exports, making it easier to maintain consistency, streamline your CI/CD workflows, and support reusability. You’ll now see HCL pre-selected in the following scenarios:

- Exporting and deploying built-in resources for AWS, GCP, and Azure.
- Exporting and deploying custom modules.
- Creating `tfvars` with complex types such as `list(map(string))` and `list(string)`.
- Pushing IaC exports to GitHub.

If you are an existing customer and would prefer maintaining your JSON file, please email us at [support@stackgen.com](mailto:support@stackgen.com), and we can change your preferences from the new default HCL to the previous default JSON.

### Improved Multi-Environment Support in IaC

Click to view

We’ve enhanced the IaC folder structure to simplify the management of multiple environments for your appStacks. Instead of relying on terramate exports and IaC dependencies, StackGen IaC now uses an env directory to generate configurations for each environment profile.

![Env Folder](https://docs.stackgen.com/assets/images/envfolders-4a2250f5d7a7c12d9fd38a1f427ae2d2.jpg)

**Key improvements include**

- Exporting configurations only for the specific environment profile you specify via a flag, making exports faster and more targeted.
- Running [ILM commands](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect) exclusively for the selected profile using the `--env-profile` flag, thereby streamlining the process and reducing unnecessary actions.

This update helps you manage multi-environment appStacks more efficiently and makes the CLI experience smoother and more intuitive.

### Advanced IaC Tab File and Folder Management

Click to view

We’ve introduced enhanced capabilities in the IaC tab to help you better manage your infrastructure code.

![Manage IaC](https://docs.stackgen.com/assets/images/iaceditfolders-0a2dba6055005aa399b97819d69afc2f.jpg)

You can now:

- Add new files and folders directly within the IaC tab
- Rename files and folders inline for improved organization
- Move files and folders to restructure your IaC repository
- Delete unnecessary files and folders to keep your IaC code clean
- Search for the relevant file or folder within your IaC

These features provide greater flexibility and control over your Infrastructure as Code, streamlining updates and maintenance without leaving the interface.
To enable these capabilities, please reach out to us at [support@stackgen.com](mailto:support@stackgen.com).

### CLI Support for Bulk Module Onboarding via Git Repositories

Click to view

You can now onboard entire sets of Terraform modules into your StackGen instance using a single CLI command. This is ideal for teams managing large sets of custom modules across multiple cloud environments.

This enhancement streamlines the onboarding process, especially when working with organized Git repositories that contain multiple modules. If your repository includes modules with overlapping or similar names, StackGen provides CLI flags to handle such scenarios and prevent naming conflicts during import.

Refer to the CLI documentation on [uploading from Git repositories](/docs/stackgen/cli-guide/usage/upload/custom-modules) for full details and usage examples.

### Generate Custom Module Linkages Within Imported Tfstates

Click to view

This release addresses a significant limitation while importing TFstates that were deployed via multi-resource custom modules. Previously, StackGen couldn’t group resources within imported TFstates under their respective custom modules. This update now automatically detects and groups resources based on the custom module names defined in the TFstate.

![Custom module linkages](https://docs.stackgen.com/assets/images/modulelinkingcustommodules-cb7702d71858f4240d25b1b26ee4c7fc.png)

**Key Features**

- **Custom Module Grouping**: While importing a TFstate, StackGen identifies and groups resources that were deployed as part of a custom module, making it easier for you to manage and upgrade versions of those modules.
- **Support for Brownfield TFstates**: If you have been using your custom multi-resource modules, this enhancement ensures you can onboard existing (brownfield) TFstates into StackGen without losing the module-abstracted context.
- **Module Recognition Without Management Features**: If a custom module hasn’t been added to StackGen, resources will still be grouped under the module name during TFstate import. However, management features such as version tracking or upgrades will only become available once the module is explicitly defined in StackGen.

This enhancement significantly improves your ability to handle imported TFstates, providing better module context and simplifying module management if you’re an existing Terraform user. For more details, refer to the [Custom Modules](/docs/stackgen/concepts/resources/custom-module#imported-tfstate-linkage) page.

### Team Management Experience

Click to view

Managing teams in StackGen is now faster, clearer, and more self-contained. As an Admin or DevOps, you can manage all aspects of team membership directly from the Team page, no more jumping between views. This update streamlines team operations and improves role visibility and control.

![Teams](https://docs.stackgen.com/assets/images/teamspage-40fb7aae7d7ac3a8bc6f995cc3f93123.jpg)

**Key capabilities include**

- Add members to a team with role assignment
- Remove members from a team
- Change member roles directly within the Team view
- Bulk update roles for multiple members

This enhancement simplifies collaboration and helps platform teams maintain clear boundaries and responsibilities across environments. For more details, refer to the [StackGen Settings](/docs/stackgen/setup/settings#projects) page.

### Module Version Enforcement in Governance

Click to view

You can now enforce the use of specific custom module versions as part of your governance configurations in StackGen. This enhancement provides tighter control over which infrastructure templates teams can access, ensuring consistency, compliance, and reduced configuration drift across environments.

**Key capabilities include**

- Define allowed custom module versions within a governance configuration
- Restrict the usage of outdated or unapproved module versions across teams
- View available module versions directly in the governance management screen

This update strengthens StackGen’s governance model by giving platform teams precise control over module lifecycle and team-level permissions. For more information, refer to the CLI Guide for enforcing a [Resource Restriction Policy](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy).

## What’s Fixed

### Create Resource Pack Button Not Visible

Click to view

While navigating to a topology with a large number of resources, the new pop-up was hiding the Create Resource Pack button, making it impossible to access. On topologies with fewer resources, the button was visible and accessible.

![Resource Pack Button missing](https://docs.stackgen.com/assets/images/createresourcepackrnjun2025-a91d5e33609bc274c415bc0aa2a982e0.jpg)

We’ve fixed the issue by adjusting the pop-up behavior to ensure the Create Resource Pack button remains visible and accessible regardless of the number of resources in the topology.

### Actions Count Not Displaying Immediately After Workload Drag-and-Drop

Click to view

While creating an EKS appStack and dragging a workload onto the canvas, the Actions count for the workload resource was not displayed. This occurred immediately after the drag-and-drop action. However, the count will appear if you click on the workload resource or refresh the page.

We’ve fixed the issue so that the Actions count is now displayed immediately after dragging and dropping the workload onto the canvas, as expected.

### Governance Configs Incorrectly Allowing Assignment to Other Teams

Click to view

While creating a governance config within a specific team and attempting to assign it to another team, all teams were displayed as options when clicking the Assign to Team button. This resulted in the action failing while applying the config to another team.

![wrong team assignments](https://docs.stackgen.com/assets/images/governancewrongassignjun25-8733f80484370e4f08673e3ca36da748.jpg)

We’ve fixed the issue so that governance configs created under a team are now restricted to that team. Other teams will no longer appear as options, and you can now only apply the config within the team in which it was created.

### Resource Restriction Policy for Enforcing Resource Versions Is Failing

Click to view

While applying a resource restriction policy for a specific resource version (using `baseId` and `templateId`), the policy was not functioning as expected. The policy was designed to restrict resources to the latest version of `aws_s3` and a custom module of type `custom_aws_s3`, but failed to enforce the versioning correctly.

![Resource Restriction Policy Not Applying](https://docs.stackgen.com/assets/images/resourcerestrictionnajun25-eddf3f74b9df5bfb147ea3f9c11262a1.jpg)

We’ve fixed this issue by ensuring that the resource restriction policy correctly applies to the specified version of the resource, using the provided `baseId` and `templateId` to enforce the versioning as intended. The policy now correctly restricts the resources and custom modules based on the specific version.

### User Role Incorrectly Assigned While Adding Users to Teams

Click to view

While adding a user to a team from the member select page and assigning them the **Admin** role, the **Developer** role was incorrectly applied instead. This caused confusion, as the intended role was not reflected.

We’ve fixed the issue by ensuring that the correct role ( **Admin**) is applied. At the same time, a user is added to a team, resolving the discrepancy and ensuring the role is accurately assigned as expected.

### Terramate Generation Failing Due to Recent Changes

Click to view

Due to recent changes, the Terramate-based environment profile Infrastructure as Code (IaC) was breaking, causing Terramate generation to fail.

We’ve fixed the issue by addressing the changes that caused the failure. The Terramate-based environment profile generation is now functioning as expected, and the issue has been resolved.

### Variable Name Updates Do Not Reflect in Environment Profiles

Click to view

While renaming a variable in one environment profile, the update was not reflected in other linked environment profiles where the variable should be inherited. This caused inconsistencies in variable management, which could lead to misconfigured deployments.

We’ve fixed the issue by ensuring that variable name updates are propagated correctly across all linked environment profiles. Changes to variable names will now be reflected throughout the profiles, maintaining consistency and preventing misconfigurations.

### Blank Canvas and Import Error While Importing Topology JSON

Click to view

We have fixed an issue where importing a certain `topology.json` files resulted in a blank canvas with an **Error importing the topology** message. The problem was caused by connections referencing **Resource IDs** that didn’t exist in the resource tree, typically from outdated topology files created before a recent feature upgrade. Now, all connection references are properly validated during import, ensuring the topology loads correctly every time.

### `archive_file` Missing from Plan During Run

Click to view

Previously, the `archive_file` data resource was disappearing during `terraform plan` run. This occurred when the expected source file or file path was missing. Terraform doesn’t raise an error in this case; it silently skips the resource.

We have fixed this issue, and the template now works as expected.

### Inconsistent Resource Names in AWS Console Due to Missing `name` Tags

Click to view

Previously, some AWS services didn’t require a **Name** parameter, but the **Console** displays names based on the `name` tag. When the tag is missing, names appear blank or inconsistent, making resources harder to identify.

We've added guidance under the **Logging and Monitoring** framework to recommend using name tags for better visibility.

### Workspace Icon Reverts on Sidebar Hover Out

Click to view

Previously, when hovering over the left sidebar, the correct workspace icon was shown. However, once the pointer moved away, the icon reverted to the personal workspace icon, causing confusion.

![Workspace error](https://docs.stackgen.com/assets/images/workspaceerrorjun25-58986a25d57594837f633d4e94746bf6.jpg)

This issue has now been fixed. The correct workspace icon remains visible even after moving the pointer out of the sidebar.

### Not Found Error When Creating Custom Module Version at Team Level

Click to view

We have fixed the issue you encountered while creating a new version of a custom module from an appStack, which would fail with a **Not found** error. You were experiencing this issue due to a missing `orgId` parameter in the **version creation API request** if the module scope was set to **Enterprise**.

Now, StackGen correctly handles edge cases based on ownership and sharing status, allowing you to create a module version only when the correct parameters and permissions are in place.

### appStack Tag Added on TFState Import

Click to view

We’ve fixed the issue you were facing while importing a `.tfstate` file, where StackGen was unintentionally adding a hidden `appstack` tag to your resources. This tag, originally introduced for ABAC-based IAM enforcement, is no longer needed, but was still being applied, overwriting user-defined values, and was not visible in the UI.

This behavior has now been removed. StackGen no longer auto-adds reserved tags like `appstack` during a `.tfstate` import.

## Supported Resources

Click to view

We now support additional Standalone and Grouped AWS resources. Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-new)
  - [Cloud Asset Discovery in StackGen](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#cloud-asset-discovery-in-stackgen)
  - [Activity logs: Unified Visibility Across CLI and UI](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#activity-logs-unified-visibility-across-cli-and-ui)
  - [StackGen Compliance Dashboard](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#stackgen-compliance-dashboard)
  - [Backstage Self-Service: Powered by StackGen](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#backstage-self-service-powered-by-stackgen)
  - [Module Catalog](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#module-catalog)
- [What’s Enhanced](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-enhanced)
  - [HCL Is Now the Default Format for IaC Exports](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#hcl-is-now-the-default-format-for-iac-exports)
  - [Improved Multi-Environment Support in IaC](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#improved-multi-environment-support-in-iac)
  - [Advanced IaC Tab File and Folder Management](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#advanced-iac-tab-file-and-folder-management)
  - [CLI Support for Bulk Module Onboarding via Git Repositories](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#cli-support-for-bulk-module-onboarding-via-git-repositories)
  - [Generate Custom Module Linkages Within Imported Tfstates](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#generate-custom-module-linkages-within-imported-tfstates)
  - [Team Management Experience](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#team-management-experience)
  - [Module Version Enforcement in Governance](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#module-version-enforcement-in-governance)
- [What’s Fixed](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#whats-fixed)
  - [Create Resource Pack Button Not Visible](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#create-resource-pack-button-not-visible)
  - [Actions Count Not Displaying Immediately After Workload Drag-and-Drop](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#actions-count-not-displaying-immediately-after-workload-drag-and-drop)
  - [Governance Configs Incorrectly Allowing Assignment to Other Teams](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#governance-configs-incorrectly-allowing-assignment-to-other-teams-)
  - [Resource Restriction Policy for Enforcing Resource Versions Is Failing](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#resource-restriction-policy-for-enforcing-resource-versions-is-failing)
  - [User Role Incorrectly Assigned While Adding Users to Teams](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#user-role-incorrectly-assigned-while-adding-users-to-teams)
  - [Terramate Generation Failing Due to Recent Changes](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#terramate-generation-failing-due-to-recent-changes)
  - [Variable Name Updates Do Not Reflect in Environment Profiles](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#variable-name-updates-do-not-reflect-in-environment-profiles)
  - [Blank Canvas and Import Error While Importing Topology JSON](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#blank-canvas-and-import-error-while-importing-topology-json)
  - [`archive_file` Missing from Plan During Run](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#archive_file-missing-from-plan-during-run)
  - [Inconsistent Resource Names in AWS Console Due to Missing `name` Tags](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#inconsistent-resource-names-in-aws-console-due-to-missing-name-tags)
  - [Workspace Icon Reverts on Sidebar Hover Out](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#workspace-icon-reverts-on-sidebar-hover-out)
  - [Not Found Error When Creating Custom Module Version at Team Level](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#not-found-error-when-creating-custom-module-version-at-team-level)
  - [appStack Tag Added on TFState Import](/docs/stackgen/release-notes/aip/archive/2025/jun25-release#appstack-tag-added-on-tfstate-import)
