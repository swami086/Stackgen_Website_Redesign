---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/mar25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/mar25-release"
status: "ok"
---

This month’s release introduces the powerful new Cloud To Code CLI, support for remote Git modules, and user-defined files in the IaC tab, giving you more flexibility to manage cloud resources and infrastructure as code. With enhancements to environment profile management, Terraform imports, and real-time validation in the Topology Canvas, this update empowers teams to build faster, customize more deeply, and maintain greater accuracy across cloud environments.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#whats-new)
  - [Cloud to Code CLI: Bring Your Cloud Resources Into Management Through IaC](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#cloud-to-code-cli-bring-your-cloud-resources-into-management-through-iac)
  - [Custom Resources from Remote Git Modules Now Supported](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#custom-resources-from-remote-git-modules-now-supported)
  - [Support for User-Defined Files in IaC Tab](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#support-for-user-defined-files-in-iac-tab)
  - [βeta: Enhanced Environment Profile Management for Applications](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#beta-enhanced-environment-profile-management-for-applications)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#user-interface-enhancements)
  - [Custom Dropdown Values for Imported Terraform Files](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#custom-dropdown-values-for-imported-terraform-files)
  - [Support for Custom Provider in Custom Resources](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#support-for-custom-provider-in-custom-resources)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#whats-fixed)
  - [Enhanced C# Code Analysis and Parsing Capabilities](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-c-code-analysis-and-parsing-capabilities)
  - [JSON Editor Enhancements](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#json-editor-enhancements)
  - [Optimized Resource Icon Rendering for Better Performance](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#optimized-resource-icon-rendering-for-better-performance)
  - [Automated Topology Validation: Real-Time Detection of Misconfigurations and Policy Violations](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#automated-topology-validation-real-time-detection-of-misconfigurations-and-policy-violations)
  - [Enhanced Bulk Data Handling for Resource Attributes and Templates](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-bulk-data-handling-for-resource-attributes-and-templates)
  - [Attributes Side Pane Not Loading When Creating appStack from Source Code](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#attributes-side-pane-not-loading-when-creating-appstack-from-source-code)
  - [Enhanced Visibility: Descriptions Now Displayed for Imported Resources and Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-visibility-descriptions-now-displayed-for-imported-resources-and-custom-modules)
  - [Fixed Backend Configuration Display in Environment Profiles](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#fixed-backend-configuration-display-in-environment-profiles)
  - [Policy Violations No Longer Disappear on Clicking a Resource](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#policy-violations-no-longer-disappear-on-clicking-a-resource)

## What's New

### Cloud to Code CLI: Bring Your Cloud Resources Into Management Through IaC

Click to view

The new Cloud to Code CLI makes cloud management effortless by enabling you to bring your cloud resources into the preview of Infrastructure as Code (IaC) management, visualize your cloud environments, generate IaC templates without prior setup, and retrieve deployed resources instantly.

This CLI tool supports AWS and Azure clouds, simplifies cloud migration, ensures consistency in infrastructure provisioning, and optimizes developer workflows. Using Cloud to Code CLI:

- Using tags, you can import specific resources like S3 buckets and bulk import resources.
- Exclude specific security-sensitive configurations, all with simple commands.

Get started today by contacting [StackGen Support](mailto:support@stackgen.com).

To learn more about Cloud to Code CLI, refer to the documentation [here](/docs/stackgen/cli-guide/cloud2code).

### Custom Resources from Remote Git Modules Now Supported

Click to view

You can now create custom resources using remote Git modules, enabling seamless integration with external repositories. This enhancement provides greater flexibility in defining and managing custom resources within StackGen.

![Remote Git Resource](https://docs.stackgen.com/assets/images/git-module-custom-resource-9892ae6f575ffe14d4bfbfbbfe403769.png)

Additionally, an **event tracking mechanism** has been introduced to log interactions with the "Create New Version" button, providing **better visibility into usage patterns**.

### Support for User-Defined Files in IaC Tab

Click to view

You can now **add, edit, rename, move, and delete files** in the **IaC tab**, giving you more flexibility in managing infrastructure as code.

Previously, you could only modify files generated by StackGen. This update allows you to work with **non-generated files**, making it easier to configure necessary CI/CD pipeline files.

note

This feature is **currently behind a feature flag** and is available to **selected customers**. Contact your StackGen representative for access.

### Beta: Enhanced Environment Profile Management for Applications

Click to view

We’re excited to introduce a powerful new Beta feature that makes managing application configurations across development, staging, and production easier than ever!

**Key Features**:

- **Environment Profiles for Applications**: Create dedicated profiles for each environment to simplify configuration management.
- **Unified and Flexible Configuration**:

  - **Global Variables**: Define shared configuration values (e.g., common database URLs) to maintain consistency and reduce duplication.
  - **Environment-Specific Overrides**: Customize settings for specific environments (e.g., credentials, regions, or instance sizes) as needed.
  - **Seamless Adaptability**: Set up global configurations and easily override them per environment. No extra complexity!
- **Stacks for Flexible Deployments**: Export environment profiles for streamlined deployment management.
- Choose to deploy all profiles or specific targets for efficient workflows.

These updates ensure better flexibility, efficiency, and control over your application configurations. Check out the documentation on [Environment Profiles](/docs/stackgen/concepts/topology/environment-profile) to get started with profile management for apllications in StackGen.

**Coming soon**: Installer packaging for Terramate Stacks and dependencies.

## User Interface Enhancements

### Custom Dropdown Values for Imported Terraform Files

Click to view

Previously, while importing a **Terraform state file**, dropdown values that weren't predefined in StackGen were hidden from the UI.

![Custom Dropdown Values](https://docs.stackgen.com/assets/images/custom-dropdown-0a8298bec513a65c802476cae39156f4.png)

With this update:

- Imported values will **now appear alongside default options** in dropdown menus.
- You can **select either predefined values** or the **imported Terraform state file values** in the resource attribute panel.

This improvement provides **more flexibility** when configuring resources from imported Terraform files.

### Support for Custom Provider in Custom Resources

Click to view

You can now define **custom providers** when creating **custom resources** in StackGen, making it easier to work with provider-specific configurations in Terraform. This enhancement allows better provider management for teams using custom Terraform providers.

![Custom Provider Button](https://docs.stackgen.com/assets/images/custom-provider-bttn-8b7c338d7d3b200e9b23dae5d1cadb7e.png)

**How It Works:**

1. **Add a Custom Provider During Resource Creation**
   - Click on **Create Custom Resource**.
   - You will now see an option to **add a custom provider**.
   - Click on this option to open the **Custom Provider Editor**.
2. **Define the Custom Provider**
   - Enter a **name** for the provider.
   - Specify the required provider details, following Terraform conventions.
   - Once done, proceed to **create the custom resource**.
3. **Using the Custom Provider in the Topology Canvas**
   - When you use this resource in the **Topology Canvas**, the custom provider configuration is automatically added.
   - On **export**, the provider configuration is **included in the TF state file**, ensuring consistency.
4. **Persisting the Provider Across Versions**
   - If you create a **new version** of this custom resource, the custom provider configuration **persists across versions**, ensuring seamless updates.
5. **Viewing the Custom Provider in the IaC Tab**
   - Navigate to the **IaC tab**.
   - You will find the custom resource listed, along with its **custom provider configuration**.
   - This ensures that the provider setup is easily visible and accessible.

![Custom Provider](https://docs.stackgen.com/assets/images/custom-provider-5d501647bcfe084a1912a197ef9f2c9c.png)

This update simplifies **provider configuration management** for custom resources, making it easier to integrate **custom Terraform providers** in StackGen.

## What's Fixed

### Enhanced C\# Code Analysis and Parsing Capabilities

Click to view

We’ve enhanced **StackGen’s C# code analysis**, improving how the platform identifies, interprets, and processes C# code structures.

![C# Parser](https://docs.stackgen.com/assets/images/c-sharp-parser-bd2090763d411b722bd38d567365c6fa.png)

StackGen now **recognizes C# expressions better**, ensuring that **method calls, properties, and nested functions** are correctly detected. This update also improves stability by preventing crashes that previously occurred while scanning unsupported C# code.

![C# Infra](https://docs.stackgen.com/assets/images/c-sharp-infra-797c6bdbffe630467ed4756cb5f66d64.png)

With these improvements, **C# scanning is more reliable**, offering **more accurate insights** when analyzing C# repositories.

### JSON Editor Enhancements

Click to view

We've improved the JSON Editor in StackGen's Configure Resource panel to enhance usability and flexibility. Previously, the editor **took up too much space**, making it difficult to scroll and navigate through attributes in the resource drawer. Additionally, it **did not allow single string inputs**, even when they were valid JSON values.

![JSON Editor](https://docs.stackgen.com/assets/images/json-editor-string-1511f2e4038dc0e263bccd0fad8da956.png)

With this update:

- We've resized the editor, making it easier to scroll through attributes.
- The editor now **accepts standalone string inputs**, for flexibility while configuring resources.

These changes ensure **smoother interaction with the JSON Editor** making it more user-friendly while working with embedded JSON configurations.

### Optimized Resource Icon Rendering for Better Performance

Click to view

We’ve optimized the way **resource icons** are rendered in StackGen, reducing page load times and improving overall performance.

### Automated Topology Validation: Real-Time Detection of Misconfigurations and Policy Violations

Click to view

StackGen now automatically **validates misconfigurations and policy violations** when loading the **Topology Canvas**.

![Auto Validation](https://docs.stackgen.com/assets/images/auto-validate-e663425c7e4b8be49d81e25d45f020d4.png)

Previously, validation was performed manually, requiring you to **refresh or inspect individual resources**. This update ensures **violations and errors surface immediately**, improving visibility and compliance.

### Enhanced Bulk Data Handling for Resource Attributes and Templates

Click to view

Loading **resource attributes and templates** in StackGen is now **more efficient**, especially for large-scale configurations.

Previously, attributes and templates were **loaded individually**, affecting performance. This update **introduces bulk APIs with pagination and filtering**, **reducing load times** and navigation smoother.

### Attributes Side Pane Not Loading When Creating appStack from Source Code

Click to view

While creating an **appStack from source code**, the **Fix Attributes** side pane now correctly displays attributes that need modification.

![Attribute Panel](https://docs.stackgen.com/assets/images/attribute-side-panel-6f27022303779e1179b1e43747a9be4a.png)

Previously, you encountered **an empty pane**, making it unclear which attributes required updates. This fix ensures that attributes **load properly**, making it easier to navigate to the attributes that require a value.

### Enhanced Visibility: Descriptions Now Displayed for Imported Resources and Custom Modules

Click to view

Descriptions for **imported resources and custom modules** are now visible in the **UI**.

![Resource Description](https://docs.stackgen.com/assets/images/resource-desc-7ea86e9ec4ae3f8f0d52cc1bbd911332.png)

Previously, descriptions **were not displayed**, making it difficult to identify module details after import. This update ensures descriptions are correctly shown, **improving visibility and usability**.

### Fixed Backend Configuration Display in Environment Profiles

Click to view

You can now correctly **see overridden backend configuration values** when editing **environment profiles**.

![Backend Config Override](https://docs.stackgen.com/assets/images/backend-config-override-cc7b44440415d88ed78fb243f57c279c.png)

Previously, overridden configurations were **not displayed**, causing confusion when modifying profiles. This fix ensures that you can easily view and confirm your applied settings..

### Policy Violations No Longer Disappear on Clicking a Resource

Click to view

Policy violations in the **Topology view** now remain **visible and persistent** while selecting resources.

Previously, violations would disappear upon clicking a resource. You had to refresh the page to bring them back. This fix ensures violations **stay visible**, making compliance checks easier to track.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#whats-new)
  - [Cloud to Code CLI: Bring Your Cloud Resources Into Management Through IaC](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#cloud-to-code-cli-bring-your-cloud-resources-into-management-through-iac)
  - [Custom Resources from Remote Git Modules Now Supported](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#custom-resources-from-remote-git-modules-now-supported)
  - [Support for User-Defined Files in IaC Tab](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#support-for-user-defined-files-in-iac-tab)
  - [Beta: Enhanced Environment Profile Management for Applications](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#beta-enhanced-environment-profile-management-for-applications)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#user-interface-enhancements)
  - [Custom Dropdown Values for Imported Terraform Files](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#custom-dropdown-values-for-imported-terraform-files)
  - [Support for Custom Provider in Custom Resources](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#support-for-custom-provider-in-custom-resources)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#whats-fixed)
  - [Enhanced C# Code Analysis and Parsing Capabilities](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-c-code-analysis-and-parsing-capabilities)
  - [JSON Editor Enhancements](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#json-editor-enhancements)
  - [Optimized Resource Icon Rendering for Better Performance](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#optimized-resource-icon-rendering-for-better-performance)
  - [Automated Topology Validation: Real-Time Detection of Misconfigurations and Policy Violations](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#automated-topology-validation-real-time-detection-of-misconfigurations-and-policy-violations)
  - [Enhanced Bulk Data Handling for Resource Attributes and Templates](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-bulk-data-handling-for-resource-attributes-and-templates)
  - [Attributes Side Pane Not Loading When Creating appStack from Source Code](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#attributes-side-pane-not-loading-when-creating-appstack-from-source-code)
  - [Enhanced Visibility: Descriptions Now Displayed for Imported Resources and Custom Modules](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#enhanced-visibility-descriptions-now-displayed-for-imported-resources-and-custom-modules)
  - [Fixed Backend Configuration Display in Environment Profiles](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#fixed-backend-configuration-display-in-environment-profiles)
  - [Policy Violations No Longer Disappear on Clicking a Resource](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#policy-violations-no-longer-disappear-on-clicking-a-resource)
