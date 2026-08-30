---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/may25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/may25-release"
status: "ok"
---

Our May 2025 release brings a powerful set of new capabilities, performance upgrades, and critical fixes. From Terraform state imports via CLI, Drift detection, Backstage integration, to expanded module governance, and enhanced UI reliability, this release strengthens StackGen’s position as your go-to platform for secure, scalable, and compliant infrastructure management.

Whether you're building greenfield environments or managing complex brownfield landscapes, these updates are designed to accelerate delivery while maintaining enterprise-grade control.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgen-cli)
  - [Drift Detection in StackGen](/docs/stackgen/release-notes/aip/archive/2025/may25-release#drift-detection-in-stackgen)
  - [StackGen–Backstage Integration](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgenbackstage-integration)
  - [Resources Tab](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resources-tab)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-enhanced)
  - [Resource Discovery for .tfstate Imports](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resource-discovery-for-tfstate-imports)
  - [Governance Configuration Versioning](/docs/stackgen/release-notes/aip/archive/2025/may25-release#governance-configuration-versioning)
  - [Custom Module Versioning and Governance Enforcement](/docs/stackgen/release-notes/aip/archive/2025/may25-release#custom-module-versioning-and-governance-enforcement)
  - [Auto-Detect Nested Modules from Imported tfstate](/docs/stackgen/release-notes/aip/archive/2025/may25-release#auto-detect-nested-modules-from-imported-tfstate)
  - [Peg Default Version for Custom Resources](/docs/stackgen/release-notes/aip/archive/2025/may25-release#peg-default-version-for-custom-resources)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-fixed)
  - [StackGen Crashes When Typing in Search Bar on IaC Tab](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgen-crashes-when-typing-in-search-bar-on-iac-tab)
  - [Map Variables Displayed as Strings in Generated Modules](/docs/stackgen/release-notes/aip/archive/2025/may25-release#map-variables-displayed-as-strings-in-generated-modules)
  - [Unable to Resolve SQS Dead Letter Queue Policy Violation via Drag-and-Drop](/docs/stackgen/release-notes/aip/archive/2025/may25-release#unable-to-resolve-sqs-dead-letter-queue-policy-violation-via-drag-and-drop)
  - [UI Breaks When Group Resource is Nested Inside Another Group](/docs/stackgen/release-notes/aip/archive/2025/may25-release#ui-breaks-when-group-resource-is-nested-inside-another-group)
  - [ECS Service: Unable to Set Operating System and CPU Architecture](/docs/stackgen/release-notes/aip/archive/2025/may25-release#ecs-service-unable-to-set-operating-system-and-cpu-architecture)
  - [Resource Pack Sharing Doesn't Follow Tenant and Team Ownership Rules](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resource-pack-sharing-doesnt-follow-tenant-and-team-ownership-rules)
  - [GCP Connections Are Not Created as Expected with `tfstate` Import](/docs/stackgen/release-notes/aip/archive/2025/may25-release#gcp-connections-are-not-created-as-expected-with-tfstate-import)
  - [Client-Side Error When Defining `list(object)` Variable for New Custom Module](/docs/stackgen/release-notes/aip/archive/2025/may25-release#client-side-error-when-defining-listobject-variable-for-new-custom-module)
  - [Internal Server Error While Deleting Multiple Archived appStacks](/docs/stackgen/release-notes/aip/archive/2025/may25-release#internal-server-error-while-deleting-multiple-archived-appstacks)
  - [Creating an appStack from Source Code Under a Team Redirects Back to List Page](/docs/stackgen/release-notes/aip/archive/2025/may25-release#creating-an-appstack-from-source-code-under-a-team-redirects-back-to-list-page)
  - [`appstack for Cloud Migration` Flow Does Not Redirect to Topology Canvas After Creation](/docs/stackgen/release-notes/aip/archive/2025/may25-release#appstack-for-cloud-migration-flow-does-not-redirect-to-topology-canvas-after-creation)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/may25-release#supported-resources)

## What's New

### StackGen CLI

StackGen CLI Version **v0.55.0** is now available!
Discover what’s new in the latest release below.

To upgrade or install the StackGen CLI, follow the steps in the [CLI Installation Guide](/docs/stackgen/cli-guide/get-started/install-and-uninstall).

#### `tfstate` to appStack Automation

Click to view

We've introduced a new CLI-based feature that lets you import Terraform state files (`.tfstate`) directly into StackGen. Use a single command to create new appStacks or new appStack versions, enabling seamless CI/CD integration, real-time compliance checks, and reduced manual effort. This feature is Ideal for infrastructure teams aiming for faster, more secure, and compliant deployments.

- You can run the following command to create appStack from a `.tfstate` file:





```bash
stackgen import state --file=<path/to/.tfstate file>
```

- To create an appStack version from the `.tfstate` file:





```bash
stackgen import state --appstack-id=<your-appstack-id> --file=<path/to/terraform.tfstate> --cloud-provider=<provider name>
```


Learn more about [syncing `.tfstate files` to appStack](/docs/stackgen/cli-guide/usage/import).

#### Drift Detection

Click to view

StackGen now supports Drift Detection, allowing your teams to automatically identify and visualize changes between the actual cloud environment and the defined Infrastructure as Code (IaC).

You can run the following command to get started with Drift detection:

```bash
stackgen drift detect --appstack-id <appstack-id> --var="region=<region>"
```

Learn more about [Drift Detection in StackGen](/docs/stackgen/concepts/drift) and [Drift CLI](/docs/stackgen/cli-guide/usage/drifts).

### Drift Detection in StackGen

Click to view

StackGen now supports **Drift Detection**, allowing your teams to automatically identify and visualize changes between the actual cloud environment and the defined Infrastructure as Code (IaC).

![driftdashboard](https://docs.stackgen.com/assets/images/driftdashboard-99190dacdedf7fb6b4bcfc6f4868be89.jpg)

![driftdiff](https://docs.stackgen.com/assets/images/driftdiff-3cb3025e8fb53b746a7cad915af66407.jpg)

This feature helps detect unauthorized changes, outdated configurations, or orphaned resources, both before creating an appStack and after deployment.

Drift detection can be triggered via CLI or viewed in the StackGen UI, with results shown in the Topology Canvas for easy review. It supports Cloud-to-Cloud comparisons, integrates with CI/CD pipelines, and strengthens security, reliability, and compliance across your infrastructure.

To get started, run

```bash
stackgen drift detect --appstack-id <appstack-id> --var="region=<region>"
```

Learn more about [Drift Detection in StackGen](/docs/stackgen/concepts/drift) and [Drift CLI](/docs/stackgen/cli-guide/usage/drifts).

### StackGen–Backstage Integration

Click to view

StackGen now offers a native integration with [Backstage](https://backstage.io/), enabling your teams to auto-generate Infrastructure as Code (IaC) from service metadata defined in the Backstage catalog. This plugin streamlines cloud deployments by converting component definitions into ready-to-deploy Terraform templates.

![BackStage-StackGen](https://docs.stackgen.com/assets/images/backstage-stackgen-1fc6c3b4e270784675bd03f61489d8ac.png)

This integration supports multiple clouds, aligns with your organizational standards, and helps developers and DevOps teams accelerate infrastructure setup while maintaining consistency and control.

**Supported Clouds**: AWS, Azure, GCP, Civo Cloud.

This feature is available on request. Please contact [Support](mailto:support@stackgen.com) to get access to this feature.

Learn more about [StackGen-Backstage Integration](/docs/stackgen/integrations/backstage).

### Resources Tab

Click to view

You can now access a dedicated **Resources tab** within each appStack. This new tab offers a structured, searchable table that makes it easier to browse and inspect large-scale infrastructure in StackGen.

![Resources Tab](https://docs.stackgen.com/assets/images/resources-tab-78a3cbf26646903e6e6df1ef8aa12743.png)

Key capabilities include:

- View resource name, ID, type, region, and tags in a clean tabular layout.
- Search resources by name or ARN.
- Filter by resource type.
- See warnings and issues flagged on each resource.
- Inspect resource metadata and configuration via a side panel.

For full details, refer to the [Resources Tab Page](/docs/stackgen/concepts/topology/resources-tab).

## What's Enhanced

### Resource Discovery for .tfstate Imports

Click to view

We're excited to introduce Resource Discovery, a major usability enhancement for working with imported Terraform state (`.tfstate`) files.

![Select Resources](https://docs.stackgen.com/assets/images/selectresouces-6d2eccf298f57953a9ba6db7ced3fe96.jpg)

**Key Highlights**:

- **Selective Resource Inclusion**: After uploading a `.tfstate` file, you can now browse and select only the resources you want to include in the topology. You no longer have to auto-import massive, unmanageable diagrams.
- **Search, Filter, and Pagination**: The discovery UI is fully backed by API-driven pagination, filters, and search, which is ideal for working with state files containing thousands of resources.
- **Update Later**: Add more resources via the new **Source panel** in the generated topology. You can revisit the original file and incrementally add resources.
- **Safe by Design**: Resources already included cannot be unselected to preserve topology integrity, but you can always add more.

Pro Tip

Use Resource Discovery to mimic workflows similar to [**Cloud-to-Code**](/docs/stackgen/cli-guide/cloud2code) and maintain cleaner, more maintainable diagrams.

This feature is especially useful for teams working with large infrastructure projects that want finer control over what gets modeled in their topologies.

Learn how to use [Resource Discovery during IaC from the `.tfstate` file](/docs/stackgen/concepts/clouddiscovery).

### Governance Configuration Versioning

Click to view

As a DevOps and an Administrator user in StackGen, you can now create new versions of your existing governance configurations. Thus, making it easier for you to test, iterate, and apply changes without redefining your governance configurations from scratch.

![govconfig](https://docs.stackgen.com/assets/images/governanceversion-0311ca5209c392fa654f35cadd4e775f.jpg)

Previously, the only supported UI flow was to create an entirely new configuration. With this enhancement, you can:

- Create new governance versions from existing governance configurations
- Test changes incrementally without losing previous setups
- Maintain continuity across governance applications

Learn more about [Governance Versioning](/docs/stackgen/concepts/rbac/governance/governanceconfig)

### Custom Module Versioning and Governance Enforcement

Click to view

This release introduces several enhancements to custom module versioning and governance enforcement, ensuring more flexible and consistent management of infrastructure configurations.

Key capabilities include:

- **Versioning for Custom Policies**: Now, custom policies can be versioned and applied per governance configuration. Different versions of custom policies can be associated with each governance config, enabling more granular control over your infrastructure setups.
- **Governance Config Versioning**: Teams can now apply specific versions of governance configurations. This flexibility ensures that different teams can operate under distinct governance rules while still maintaining consistency within the enterprise.
- **Governance Enforcement with Version Control**: Custom modules now enforce the use of specific versions, ensuring that only approved configurations are deployed across teams.
- **Module Editor UI Enhancements**: A new and improved Module Editor UI now supports the creation, versioning, and management of custom modules, with an intuitive interface designed for DevOps and Admin teams.

This enhancement improves the ability to control and audit the custom modules and their associated policies, ensuring compliance with your organization’s standards. For more details, refer to the [Module Editor](/docs/stackgen/concepts/modules) page.

### Auto-Detect Nested Modules from Imported tfstate

Click to view

This release introduces the ability to automatically detect and represent nested modules when importing a Terraform state file (`.tfstate`) into StackGen. When creating a new appStack, enabling the option "Identify modules and nested resources from uploaded tfstate" ensures StackGen intelligently reconstructs the module hierarchy, allowing for accurate visual and logical representation of the infrastructure.

![custom module linkages](https://docs.stackgen.com/assets/images/nested-modules-6b2c9744cffd14ca067fa49446ffad57.png)

Key Features:

- **Nested Module Detection**: StackGen will analyze the uploaded state file and detect all modules and their nested structure, as defined in your Terraform configuration.
- **Visual Hierarchy in Canvas**: The module nesting is reflected in the canvas view, making it easier to understand parent-child relationships and dependencies between modules and resources.
- **Supports Complex Module Structures**: Whether your modules are one level deep or heavily nested, StackGen captures the hierarchy faithfully for brownfield (pre-existing) Terraform deployments.
- **Toggle-Based Control**: The feature can be enabled via the checkbox during appStack creation, allowing flexibility based on the desired import behavior.

This enhancement makes StackGen more intuitive and accurate when working with real-world Terraform architectures that use deeply nested modules.

### Peg Default Version for Custom Resources

Click to view

The new Peg Default Version for Custom Resources feature enables DevOps teams to manage and control the default version used for custom resource overrides in appStacks. This enhancement ensures that the latest version of a custom resource is automatically used when performing resource overrides, eliminating issues caused by relying on the original V1 version.

**Key Features**

- Default Version Auto-Pegging: The latest version of a custom resource will automatically be pegged as the default version for resource overrides. When a resource is overridden in an appStack, the latest available version will be applied by default.
- Custom Default Version for Resources: DevOps users can explicitly peg a specific version as the default for each custom resource. If not set, StackGen will automatically use the latest semantic version available.
- Streamlined appStack Creation: This feature eliminates the need to manually specify versions during resource overrides, reducing the chances of outdated versions being used in new appStacks.

For full details, refer to the [Custom Modules Documentation](/docs/stackgen/concepts/resources/custom-module).

## What's Fixed

### StackGen Crashes When Typing in Search Bar on IaC Tab

Click to view

After running Generate IaC, typing into the search bar under the IaC tab caused the page to freeze and become unresponsive.

We’ve fixed the issue by optimizing how search input is handled, so you can now type freely without running into browser crashes, even on large IaC outputs.

### Map Variables Displayed as Strings in Generated Modules

Click to view

Map-type inputs were incorrectly displayed as string values in the autogenerated module.tf.json, leading to type errors during apply.

You would’ve seen this when defining a map(any) or any type variable, StackGen would wrap the value in quotes, converting it into a string. This has now been fixed. Your map variables will retain their correct structure without needing to manually edit the file post-generation.

### Unable to Resolve SQS Dead Letter Queue Policy Violation via Drag-and-Drop

Click to view

When a Lambda resource violated an SQS dead letter queue policy, dragging an SQS resource into the topology view didn’t resolve the violation as expected.

This was due to a limitation in how certain complex connections were handled behind the scenes. We’ve now removed the strict enforcement for this policy in cases where it couldn’t be programmatically resolved via the canvas, allowing you to proceed with infrastructure design without blockers.

### UI Breaks When Group Resource is Nested Inside Another Group

Click to view

A bug was causing the UI to break when a resource of type group was nested inside another group. This resulted in improper rendering and display issues, affecting the user interface.

The UI now correctly handles the nesting of group-type resources within other groups, ensuring proper rendering without any interface breaks.

### ECS Service: Unable to Set Operating System and CPU Architecture

Click to view

Previously, when adding an AWS ECS Service resource, you couldn’t set the `runtimePlatform`, which meant there was no way to define operating system or CPU architecture requirements (e.g., Windows/ARM64).
This has now been fixed.

Key fixes include:

- The runtimePlatform field is now exposed in the configuration panel.
- You can specify operating system (e.g., Windows, Linux) and CPU architecture (e.g., `x86_64`, `ARM64`) directly from the UI.
- The fix ensures full compatibility for ECS workloads requiring non-default runtime configurations.
- This update unblocks Windows container support and improves ECS task definition parity with AWS.

### Resource Pack Sharing Doesn't Follow Tenant and Team Ownership Rules

Click to view

We've fixed the issue that prevented sharing of the resource packs within teams. Resource packs now follow **Enterprise** and **Team** ownership rules. As a result, you will see the following behaviour:

- Only StackGen Admins and DevOps can share resource packs.
- When you create a resource pack in your **Personal Workspace** and share it at the **Enterprise** level, it will be owned at the **Enterprise** level.
- Other users will now be able to see and use resource packs shared at the **Enterprise** level. This will include resource packs shared by users in the same **Team** or at the **User** level (like Admin or DevOps accounts).

This fix ensures resource packs behave as expected across **Personal**, **Team**, and **Enterprise** scopes, thus making it easier to share and access the right resource packs across your organization.

### GCP Connections Are Not Created as Expected with `tfstate` Import

Click to view

Resource connections defined in the `tfstate` for GCP resources are now populated automatically after a `.tfstate` import. Previously, resource connections for GCP resources were not getting populated as expected after a `tfstate` import.

### Client-Side Error When Defining `list(object)` Variable for New Custom Module

Click to view

We have fixed the issue with the handling of the `list(object)` variable definition when you create a new custom module. You can now define and use these variables without encountering errors.

Previously, entering a value in the **Key** would throw a client-side error.

![list(object)](https://docs.stackgen.com/assets/images/bug701-9772badb169250e566ee86c1ae41b87b.jpg)

### Internal Server Error While Deleting Multiple Archived appStacks

Click to view

You can now delete multiple archived appStacks in one action without encountering errors.

Previously, doing so would throw an `internal server error`.

### Creating an appStack from Source Code Under a Team Redirects Back to List Page

Click to view

We've fixed an issue where creating an appStack from the source code under a **Team** redirects you back to the appStacks list page. You will now be redirected to the Topology canvas, once the appStack creation and analysis is completed.

### `appstack for Cloud Migration` Flow Does Not Redirect to Topology Canvas After Creation

Click to view

We have fixed an issue where, after completing the **appStack to Cloud Migration**, you were not being redirected to the Topology canvas.

Previously, the appStack was created successfully, but the StackGen UI would remain on the same page.

![Frozen screen](https://docs.stackgen.com/assets/images/appstacktocloudbug-a3a17543f4062f7b886f41d07a8bf388.png)

## Supported Resources

Click to view

We now support the additional Standalone Google Cloud Platform (GCP) and Azure resources. Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgen-cli)
  - [Drift Detection in StackGen](/docs/stackgen/release-notes/aip/archive/2025/may25-release#drift-detection-in-stackgen)
  - [StackGen–Backstage Integration](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgenbackstage-integration)
  - [Resources Tab](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resources-tab)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-enhanced)
  - [Resource Discovery for .tfstate Imports](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resource-discovery-for-tfstate-imports)
  - [Governance Configuration Versioning](/docs/stackgen/release-notes/aip/archive/2025/may25-release#governance-configuration-versioning)
  - [Custom Module Versioning and Governance Enforcement](/docs/stackgen/release-notes/aip/archive/2025/may25-release#custom-module-versioning-and-governance-enforcement)
  - [Auto-Detect Nested Modules from Imported tfstate](/docs/stackgen/release-notes/aip/archive/2025/may25-release#auto-detect-nested-modules-from-imported-tfstate)
  - [Peg Default Version for Custom Resources](/docs/stackgen/release-notes/aip/archive/2025/may25-release#peg-default-version-for-custom-resources)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/may25-release#whats-fixed)
  - [StackGen Crashes When Typing in Search Bar on IaC Tab](/docs/stackgen/release-notes/aip/archive/2025/may25-release#stackgen-crashes-when-typing-in-search-bar-on-iac-tab)
  - [Map Variables Displayed as Strings in Generated Modules](/docs/stackgen/release-notes/aip/archive/2025/may25-release#map-variables-displayed-as-strings-in-generated-modules)
  - [Unable to Resolve SQS Dead Letter Queue Policy Violation via Drag-and-Drop](/docs/stackgen/release-notes/aip/archive/2025/may25-release#unable-to-resolve-sqs-dead-letter-queue-policy-violation-via-drag-and-drop)
  - [UI Breaks When Group Resource is Nested Inside Another Group](/docs/stackgen/release-notes/aip/archive/2025/may25-release#ui-breaks-when-group-resource-is-nested-inside-another-group)
  - [ECS Service: Unable to Set Operating System and CPU Architecture](/docs/stackgen/release-notes/aip/archive/2025/may25-release#ecs-service-unable-to-set-operating-system-and-cpu-architecture)
  - [Resource Pack Sharing Doesn't Follow Tenant and Team Ownership Rules](/docs/stackgen/release-notes/aip/archive/2025/may25-release#resource-pack-sharing-doesnt-follow-tenant-and-team-ownership-rules)
  - [GCP Connections Are Not Created as Expected with `tfstate` Import](/docs/stackgen/release-notes/aip/archive/2025/may25-release#gcp-connections-are-not-created-as-expected-with-tfstate-import)
  - [Client-Side Error When Defining `list(object)` Variable for New Custom Module](/docs/stackgen/release-notes/aip/archive/2025/may25-release#client-side-error-when-defining-listobject-variable-for-new-custom-module)
  - [Internal Server Error While Deleting Multiple Archived appStacks](/docs/stackgen/release-notes/aip/archive/2025/may25-release#internal-server-error-while-deleting-multiple-archived-appstacks)
  - [Creating an appStack from Source Code Under a Team Redirects Back to List Page](/docs/stackgen/release-notes/aip/archive/2025/may25-release#creating-an-appstack-from-source-code-under-a-team-redirects-back-to-list-page)
  - [`appstack for Cloud Migration` Flow Does Not Redirect to Topology Canvas After Creation](/docs/stackgen/release-notes/aip/archive/2025/may25-release#appstack-for-cloud-migration-flow-does-not-redirect-to-topology-canvas-after-creation)
