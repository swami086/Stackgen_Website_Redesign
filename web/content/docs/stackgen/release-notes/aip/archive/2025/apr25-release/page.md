---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/apr25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/apr25-release"
status: "ok"
---

Release Notes Naming Update

Starting with this release, we've updated our naming convention to reflect the month in which a release is shipped, rather than the month in which it was developed. This change makes it easier to track and reference releases based on when they become available to you. You may notice a shift in the naming of our release notes. No action is required on your part. Check out the latest [May 2025](/docs/stackgen/release-notes/aip/archive/2025/may25-release) release.

Our April 2025 release brings new features to StackGen, including new capabilities across our developer platform and cloud migration use cases.

We now support custom Terraform modules that can be shared with developer teams, enabling them to deploy hundreds of cloud services within the Terraform registry beyond AWS, Azure, and GCP, such as Databricks, Snowflake, and Confluent. We also support Terraform state file sharing across developer teams and environments. For platform engineers who create hardened Terraform modules for other developers to consume public or private cloud services, we are launching a module editor (beta version) which also includes support for custom providers.

For cloud migration use cases, we now support additional AWS and Google Cloud Platform (GCP) resources. Refer to the Supported Resources documentation to view the complete list.

User experience improvements: We now support resource search within the visual infrastructure topology, search within the + Add Resource panel, and severity and remediation insights for policy violations found during initial infrastructure scans.

We have also made bug fixes within our UI and CLI. Check out the release notes for a more detailed breakdown of what’s new in this month’s release.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#stackgen-cli)
  - [Backend State Management](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#backend-state-management)
  - [Support for Custom Providers](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#support-for-custom-providers)
  - [Module Editor](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#module-editor)
  - [RBAC for Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#rbac-for-custom-modules)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-enhanced)
  - [Enhanced Backend Configuration Support](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-backend-configuration-support)
  - [Improved Override TFvars UX](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#improved-override-tfvars-ux)
  - [Get IaC Best Practice Tips While Importing Terraform or Topology Files in Import Logs](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#get-iac-best-practice-tips-while-importing-terraform-or-topology-files-in-import-logs)
  - [User Interface Enhancements for Topology and appStack Creation](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#user-interface-enhancements-for-topology-and-appstack-creation)
  - [Resource Search](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#resource-search)
  - [Enhanced Custom Terraform Module Sharing](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-custom-terraform-module-sharing)
  - [Enhanced Usability in the Add Resources Panel](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-usability-in-the-add-resources-panel)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-fixed)
  - [Unable to Set Configuration Variables to “Required” While Creating a Custom Module](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#unable-to-set-configuration-variables-to-required-while-creating-a-custom-module)
  - [UI Breaks for Long Keys in `list(object)` Data Type in Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#ui-breaks-for-long-keys-in-listobject-data-type-in-custom-modules)
  - [Incorrect Resource Pack Output for `--provider` Flag in CLI](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#incorrect-resource-pack-output-for-provider-flag-in-cli)
  - [Misaligned Checkmark in Attribute Dropdown for Long Attribute Names](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#misaligned-checkmark-in-attribute-dropdown-for-long-attribute-names)
  - [Resource Packs Do Not Load Consistently When Governance Policy Is Applied](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#resource-packs-do-not-load-consistently-when-governance-policy-is-applied)
  - [Custom Override and Mapping Policy Fixes for Governance](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#custom-override-and-mapping-policy-fixes-for-governance)
  - [Incorrect Handling of `moves.tf` During Terraform Import](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#incorrect-handling-of-movestf-during-terraform-import)
  - [Input Fields in Custom Resource Editor Does Not Accept Full Text](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#input-fields-in-custom-resource-editor-does-not-accept-full-text)
  - [Governance ID and Proceed Button Issues During appStack Creation](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#governance-id-and-proceed-button-issues-during-appstack-creation)
  - [ECS Service: Unable to Set Operating System and CPU Architecture](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#ecs-service-unable-to-set-operating-system-and-cpu-architecture)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#supported-resources)

## What's New

### StackGen CLI

Click to view

- **Cloud2code CLI now identifies the child resources**: of a parent resource and imports them while querying an Azure resource group. For example, if a VNet is imported, StackGen will import all its subnets.

- **A new command to view teams**: within an organisation. You can run the following to view all the teams assigned to your role.

`stackgen team list`

For more information, refer to the [View Teams](/docs/stackgen/cli-guide/usage/viewprojects) documentation.

- **List Supported Resource Types by Provider**: StackGen CLI now supports listing all available resource types for a given cloud provider. This enhancement makes discovering and referencing valid resource types easier while defining templates or working with infrastructure as code.

`stackgen resource type --provider <provider_name>`

Refer to the [View Supported Resource Types](/docs/stackgen/cli-guide/usage/manage/type#filter-resources-by-provider) CLI documentation for more information.


### Backend State Management

Click to view

You can now enable **Storage Backends** in StackGen to manage infrastructure state centrally and securely across your team.

#### Key Highlights

- **Persisted State**: Tracks and manages infrastructure resources using remote object storage.
- **Team Collaboration**: Share state files securely with multiple team members.
- **Flexible Backends**: Supports AWS S3, GCS, Azure Storage, PostgreSQL, and local storage.
- **Environment Overrides**: Configure different backends per environment (e.g., S3 for Prod, PostgreSQL for Dev).

#### Enable Storage Backend

To enable this feature, navigate to:

**appStacks > Backend Configuration > Enable Storage Backend**.

Learn more about [Backend Storage Management](/docs/stackgen/concepts/topology/backend-configuration).

### Support for Custom Providers

Click to view

We’re excited to introduce **Custom Providers**, a powerful new capability that allows users to use their own Terraform providers beyond the ones built into the StackGen system.

#### Key Features

- [**Support for Custom Terraform Providers:**](/docs/stackgen/concepts/resources/custom-module/customproviders) You can now define and integrate out-of-the-box providers that are not officially supported by StackGen.

- **Custom Provider UI:** On the **Custom Resource creation** page, you’ll see a new **Add Custom Provider** button to input provider details directly.



![custom_provider.tf](https://docs.stackgen.com/assets/images/addcustomprovider-4341819dacca4893ef76fd0db795be45.png)

- **Export Support:** Custom provider configurations are exported in the `custom_provider.tf` file within the module folder.



![custom_provider.tf](https://docs.stackgen.com/assets/images/createcustomprovider-a146df926dfdb2922456b55f68286464.png)


#### Why This Matters

If you need to integrate locally available or proprietary providers that aren’t publicly documented or supported, you can do so using the Custom Providers feature. With this release, you can:

- Use niche or internally developed providers
- Avoid waiting for official integrations
- Take full control of your infrastructure provisioning

To learn more about custom providers, refer to the documentation on [Configure Custom Providers in your Custom Modules](/docs/stackgen/concepts/resources/custom-module/customproviders).

### Module Editor

Click to view

Create, import, and manage custom Terraform modules directly within StackGen. The Module Editor gives you complete control over module configuration, supports nested modules, and provides embedded guidance without leaving the platform.

![Module Editor](https://docs.stackgen.com/assets/images/module-editor-75e6d9253064a0f161956ebab627ab97.png)

This feature is not available on StackGen cloud by default. To get access to Module Editor feature, contact your [StackGen representative](mailto:support@stackgen.com).

Learn more about [Module Editor](/docs/stackgen/concepts/modules).

### RBAC for Custom Modules

Click to view

Role-Based Access Control (RBAC) for custom modules ensures governance through defined permissions at the team and enterprise levels. Control who can create, import, and share modules that are aligned with your organisation’s policies. Access is scoped by user role: Developers have read-only access, while DevOps and Admin users can create, import, and share modules based on their team or enterprise scope.

| Role | Create Custom Modules | Custom Modules Versioning | Import Custom Modules | Share with Teams | Share with Enterprise | Read Access |
| --- | --- | --- | --- | --- | --- | --- |
| Developer | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| DevOps (Team) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Admin (Enterprise) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

Learn more about [RBAC for Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules).

## What's Enhanced

### Enhanced Backend Configuration Support

Click to view

We've improved how backend configurations work in **appStacks** and **Environment Profiles**:

- **Flexible Backend Support**: Choose any valid backend (e.g., `postgres`, `remote`, etc.), not just `S3`. The defaults would still map to the current setup.


![Backend Types](https://docs.stackgen.com/assets/images/backendtype-27faf1d061334e278ac48f971b895383.png)

- **Full Config Overrides**: Environment profiles now use full backend configs (not key-by-key merges), inheriting defaults unless explicitly overridden.



![Full config override](https://docs.stackgen.com/assets/images/backendoverridedefult-23d7e679c458baf87431e8c7cd65d8e7.png)

- **Smarter Defaults**: Common keys for each backend type (e.g., `bucket`, `region`, `dynamodb_table`, etc. for S3) will now be displayed automatically. If the setting is unused, you can disable it via the backend configuration setting.



![BackendOverride](https://docs.stackgen.com/assets/images/backendoverrideenv-b6f3b3c0d70403344120862e61985269.png)


### Improved Override TFvars UX

Click to view

- We've updated the **Override default resource variable** panel to display values up front, eliminating the need to open the standard **Resource configuration** panel. This reduces unnecessary clicks and makes editing resource variables.
- You will also notice that the variables that override the default value, will have the same label colour as that of your environment profile.

![tfvar](https://docs.stackgen.com/assets/images/tfvarsui-22ec2112a2015ae0edfc32131da05411.png)

### Get IaC Best Practice Tips While Importing Terraform or Topology Files in Import Logs

Click to view

While importing `.tfstate files`, StackGen now evaluates configurations for security risks, governance violations, and best practice issues, which are displayed in a severity-ranked Import Logs panel.

![Import Logs](https://docs.stackgen.com/assets/images/import-logs-f40584deb7d1730a05e04094cd06c1cd.png)

You’ll now be able to view **💡Tips** to remediate the issues so that you can adhere to **IaC Best Practices** whenever you import an IaC.

![importlogstips](https://docs.stackgen.com/assets/images/importlogstips-e125c7113d92a26cdafee05e8e9cb8a8.png)

Learn more about [Import Logs](/docs/stackgen/concepts/iac/import-iac/import-tf-logs)

### User Interface Enhancements for Topology and appStack Creation

Click to view

We've introduced multiple UI and UX improvements across the Topology Canvas and appStack creation flow, making it easier to build, manage, and navigate your infrastructure.

What's Changed:

- **Topology Page Enhancements**



![topologyui](https://docs.stackgen.com/assets/images/topologyui-b1ca4d7c6ee8d776e59ab59f4511896e.png)











**1.** appStack version listing, creation, and deletion are now integrated directly into the Topology view.

**2.** Updated top info bar with improved layout and visual clarity.

**3.** A new footer for topology actions includes errors, warnings, zoom controls, and minimize/maximize toggles.

**4.** Expand/collapse functionality for the top bar to reduce visual clutter.

- **appStack Creation Improvements**
  - Creating an appStack from scratch now takes you directly to the Topology Canvas.
  - You can now edit the appStack name and description via a new modal.

    ![newappstackfromscratch](https://docs.stackgen.com/assets/images/newappstackfromscratch-af96dd8c7dfd65db9635f19114da9eb7.png)

These changes improve focus, reduce navigation friction, and bring essential actions closer to where you work, within the canvas itself.

### Resource Search

Click to view

StackGen now offers improved resource search capabilities in two key areas:

1. **From Topology Canvas:**
You can now search from the list of resources added to your topology canvas via Topology Search. This enhancement improves navigation and visibility, making it easier to locate and work with resources in complex topologies.

2. **From Add Resources Panel:**
Search functionality has been added to the Add New Resources panel, allowing you to quickly find and add both standard resources and custom modules to your infrastructure.


These search enhancements significantly improve productivity when working with large, complex infrastructures by reducing the time needed to locate specific components.

### Enhanced Custom Terraform Module Sharing

Click to view

DevOps and Admin users can now upload custom Terraform modules and share them across their StackGen tenant, with the ability to scope sharing to a single team, multiple teams, or enterprise-wide. This enhancement supports tighter governance, reusability, and faster onboarding across teams.

Key Updates:

- **Scoped Sharing Options**: During module creation or import, choose to share modules with the entire enterprise, specific teams, or multiple teams.
- **RBAC-Driven Access**: Only users with DevOps or Admin roles can upload and manage shared modules. Developers have read-only access to use shared modules in appStacks.
- **Topology-First Flow**: Module sharing is currently supported via the Topology Canvas. Module Editor support will be added in a future update.
- **UI & CLI Support**: Scoped sharing is available in both the StackGen UI and CLI.
- **Deprecation Notice**: Uploading new custom modules to personal workspaces is no longer supported. Existing modules in personal workspaces remain usable.

Learn more in the [RBAC for Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules).

### Enhanced Usability in the Add Resources Panel

Click to view

We’ve enhanced the **\+ Add Resources** panel with key updates to improve usability as follows:

- You can now view the Permission Scopes of your Custom Modules.



![custom module scopes](https://docs.stackgen.com/assets/images/custom-modulescopes-c5166feb905409a5cbe9f6445b68722c.png)











**1\. Team Scope**: The custom module is shared with your Team.

**2\. Enterprise Scope**: The custom module is shared enterprise-wide.

**3\. Personal/Workspace Scope**: The custom module is created in your personal workspace and will be available only for your personal use.

- You can now view **Recents** or recently used and **Starred** resources in the **\+ Add New Resource** panel.
  - To star a resource, hover over the greyed out star icon next to the resource and click it.

    ![starredand recents](https://docs.stackgen.com/assets/images/starredandrecentresources-e86590a97127dc58136fc9c7d52bf4f3.png)

  - **Personal Recents and Starred Resources**: If you've starred any resources in your personal workspace, it will be only visible to you and the same applies to your recents.
  - **Team Recents and Starred Resources**: Any resources that are starred or recently used within a team will be visible to the entire team.

## What's Fixed

### Unable to Set Configuration Variables to “Required” While Creating a Custom Module

Click to view

Previously, while trying to mark configuration variables defined under a custom module to **required**, you would have noticed that the toggle would stay off. We have fixed this issue, and you can now set any configuration variable as required during custom module creation. The UI and backend correctly validate the input and ensure **required** fields are not left empty.

![RequiredVariable](https://docs.stackgen.com/assets/images/reduiredconfigvariable-079a56cbadc3080a96b8a229c7ed5d24.png)

### UI Breaks for Long Keys in `list(object)` Data Type in Custom Modules

Click to view

Previously, longer keys in the `list(object)` data type in Custom Modules would throw a 'error 500'. We've fixed this issue and you will now be able to add longer keys.

![listobjectkeys](https://docs.stackgen.com/assets/images/listobjectkeys-7ab95f6028c16950faa7aff953148b06.png)

### Incorrect Resource Pack Output for `provider` Flag in CLI

Click to view

Using the `--provider` flag with the stackgen resource type command now returns the correct resource packs for the specified cloud provider.

Previously, using `--provider` azure or `--provider` gcp returned the correct resources but showed AWS resource packs instead.

There are still issues with the `azuread` provider flag, refer to the [Known Issues section](/docs/stackgen/help-center/known-issues/apr2025#fixed-using-the-provider-azuread-flag-may-result-in-incomplete-list-of-resource-types)

### Misaligned Checkmark in Attribute Dropdown for Long Attribute Names

Click to view

The Configure References panel now correctly displays checkmarks aligned with selected attributes, even while attribute names are long.

Previously, long attribute names caused visual misalignment, making it difficult to identify the selected attribute in the dropdown.

### Resource Packs Do Not Load Consistently When Governance Policy Is Applied

Click to view

Resource packs defined through governance policies are now reliably loaded while creating an appStack under a team with that policy assigned.

Previously, resource packs were intermittently missing due to a timing issue during appStack creation.

### Custom Override and Mapping Policy Fixes for Governance

Click to view

Several fixes have been implemented to improve the reliability and validation of Resource Override and Mapping Policies, particularly for custom resource types used in governance configurations.

Improvements include:

- Validating custom resource scope during policy upload and governance assignment.
- Ensuring that only team-accessible templates can be referenced in override policies.
- UI updates to pass the correct governance and organisation context during appStack creation.
- CLI enhancements to fetch custom resource types scoped to specific teams.

These changes ensure consistent and secure behaviour while using override policies to enforce custom standards across your infrastructure.

### Incorrect Handling of moves.tf During Terraform Import

Click to view

The Terraform import process now correctly supports moves.tf blocks, preventing unnecessary destroy-and-recreate actions during plan execution.

Previously, some resources appeared to be replaced due to missing moves.tf handling. This update ensures more accurate diffs and smoother transitions while importing existing infrastructure.

### Input Fields in Custom Resource Editor Does Not Accept Full Text

Click to view

Previously, while creating or versioning a custom resource, input fields in the variable attribute section only accepted one character at a time, requiring repeated clicks to enter full values.

This issue has been resolved. You can now enter multi-character inputs seamlessly in one go, improving the custom resource creation and editing experience.

### Governance ID and Proceed Button Issues During appStack Creation

Click to view

We've resolved two issues impacting the appStack creation flow while no required security policy was selected:

- Governance ID Not Passed: Previously, if no required security policy were selected, the governance ID would not be passed during appStack creation, leading to missing governance assignments. This has now been fixed.
- Proceed Button Disabled: The Proceed button on the appStack creation screen remained disabled while no security policy was selected, even if other configurations were complete. This issue has also been fixed.

These fixes ensure a smoother appStack creation experience, even while optional security policies are not applied.

### ECS Service: Unable to Set Operating System and CPU Architecture

Click to view

Previously, when adding an AWS ECS Service resource, you couldn’t set the `runtimePlatform`, which meant there was no way to define operating system or CPU architecture requirements (e.g., Windows/ARM64). This has now been fixed.

**Key fixes include**:

- The `runtimePlatform` field is now exposed in the configuration panel.
- You can specify operating system (e.g., Windows, Linux) and CPU architecture (e.g., `x86_64`, `ARM64`) directly from the UI.
- The fix ensures full compatibility for ECS workloads requiring non-default runtime configurations.
- This update unblocks Windows container support and improves ECS task definition parity with AWS.

## Supported Resources

Click to view

We now support the additional Standalone Google Cloud Platform (GCP) and AWS resources. Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#stackgen-cli)
  - [Backend State Management](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#backend-state-management)
  - [Support for Custom Providers](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#support-for-custom-providers)
  - [Module Editor](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#module-editor)
  - [RBAC for Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#rbac-for-custom-modules)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-enhanced)
  - [Enhanced Backend Configuration Support](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-backend-configuration-support)
  - [Improved Override TFvars UX](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#improved-override-tfvars-ux)
  - [Get IaC Best Practice Tips While Importing Terraform or Topology Files in Import Logs](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#get-iac-best-practice-tips-while-importing-terraform-or-topology-files-in-import-logs)
  - [User Interface Enhancements for Topology and appStack Creation](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#user-interface-enhancements-for-topology-and-appstack-creation)
  - [Resource Search](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#resource-search)
  - [Enhanced Custom Terraform Module Sharing](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-custom-terraform-module-sharing)
  - [Enhanced Usability in the Add Resources Panel](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#enhanced-usability-in-the-add-resources-panel)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#whats-fixed)
  - [Unable to Set Configuration Variables to “Required” While Creating a Custom Module](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#unable-to-set-configuration-variables-to-required-while-creating-a-custom-module)
  - [UI Breaks for Long Keys in `list(object)` Data Type in Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#ui-breaks-for-long-keys-in-listobject-data-type-in-custom-modules)
  - [Incorrect Resource Pack Output for `provider` Flag in CLI](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#incorrect-resource-pack-output-for-provider-flag-in-cli)
  - [Misaligned Checkmark in Attribute Dropdown for Long Attribute Names](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#misaligned-checkmark-in-attribute-dropdown-for-long-attribute-names)
  - [Resource Packs Do Not Load Consistently When Governance Policy Is Applied](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#resource-packs-do-not-load-consistently-when-governance-policy-is-applied)
  - [Custom Override and Mapping Policy Fixes for Governance](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#custom-override-and-mapping-policy-fixes-for-governance)
  - [Incorrect Handling of moves.tf During Terraform Import](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#incorrect-handling-of-movestf-during-terraform-import)
  - [Input Fields in Custom Resource Editor Does Not Accept Full Text](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#input-fields-in-custom-resource-editor-does-not-accept-full-text)
  - [Governance ID and Proceed Button Issues During appStack Creation](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#governance-id-and-proceed-button-issues-during-appstack-creation)
  - [ECS Service: Unable to Set Operating System and CPU Architecture](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#ecs-service-unable-to-set-operating-system-and-cpu-architecture)
