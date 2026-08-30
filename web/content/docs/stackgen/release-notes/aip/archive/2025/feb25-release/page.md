---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/feb25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/feb25-release"
status: "ok"
---

We’re kicking off the year with powerful new capabilities that simplify cloud migrations, enhance visibility into imported infrastructure, and give you more control over resource connections. From enabling Azure to Civo migration, to governance checks on imported tfstate files, and improved post-migration mapping, this release is all about smarter, more secure infrastructure management. Explore how StackGen is evolving to meet your growing needs across multi-cloud environments.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#whats-new)
  - [Enabling Azure to Civo Cloud Migration](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enabling-azure-to-civo-cloud-migration)
  - [Security and Governance Checks for Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#security-and-governance-checks-for-imported-tfstate-files)
  - [Inferring Resource Connections For Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#inferring-resource-connections-for-imported-tfstate-files)
  - [Enhanced Resource Mapping During Cloud Migration](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enhanced-resource-mapping-during-cloud-migration)
  - [Enhanced Support For Connections](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enhanced-support-for-connections)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#user-interface-enhancements)
  - [Import Logs For Viewing Security And Governance Checks On Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#import-logs-for-viewing-security-and-governance-checks-on-imported-tfstate-files)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#whats-fixed)
  - [StackGen-Generated Attribute Mappings for Data Connections Are Not Visible Under References](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#stackgen-generated-attribute-mappings-for-data-connections-are-not-visible-under-references)

## What's New

### Enabling Azure to Civo Cloud Migration

Click to view

We are thrilled to announce support for migration from **Azure** to **Civo** cloud. This enhancement lays the foundation for seamless transitions between **Azure** and **Civo cloud**, empowering your teams to migrate workloads efficiently and confidently.

![Azure to Civo](https://docs.stackgen.com/assets/images/civocloudRN0125-f06e2edd7d460d0fd1f9deaa8d1d8e36.jpg)

**Key Features**

- **Resource Attribute Mapping**: We have defined and implemented mappings for resource attributes between **Azure** and **Civo** clouds. This ensures compatibility and consistency by aligning your **Azure** resource attributes with the **Civo** cloud equivalents.
- **Simplified Migration Process**: This enhancement provides a robust framework for automated or guided migrations from **Azure** to **Civo** cloud. It reduces complexity and manual effort during the migration process.
- **Enhanced Interoperability**: StackGen [supports a wide range of Azure resources](/docs/stackgen/setup/supported-tech/supported-technologies), ensuring a comprehensive migration strategy.

This feature is a critical step toward enabling multi-cloud flexibility and empowering you to take full advantage of **Civo** cloud while leveraging your existing **Azure** resources. Stay tuned for additional updates as we continue to enhance our migration capabilities!

### Security and Governance Checks for Imported `tfstate` Files

Click to view

We’re excited to introduce new **Security And Governance** checks for your imported `tfstate` files that lets you evaluate your existing infrastructure for security and governance best practices. Thus, saving you time in troubleshooting complex **IaC** issues, identifying security issues within your existing environment, and ensuring compliance with golden security standards.

![Import Logs](https://docs.stackgen.com/assets/images/importlogs0RN0125-127c31eb642e5fc5f102f813229756d5.jpg)

![Import Logs1](https://docs.stackgen.com/assets/images/importlogsRN0125-c6ef1548c34e77e42b27cebc033d78b4.jpg)

**How It Works**

When you import your `tfstate` file, either while creating an appStack or through **Import** on the Topology canvas, StackGen will automatically analyze your environment to detect the following:

- Potential security risks
- Misconfigurations

The identified risks are categorized using color-coded indicators:

| Risk Level | Description |
| --- | --- |
| 🔴🔴🔴 **High Risk** | e.g., exposed secrets or confidential data |
| 🟠🟠 **Medium Risk** | Moderate security concerns |
| 🟡 **Low Risk** | Minor issues with low impact |

note

StackGen will populate the log when you import a `tfstate` file. It will not however, show this log once you modify your IaC.

**Remediation And Fixes**

While we highlight potential issues, StackGen gives you the choice to implement the fixes that are relevant to your requirements. Here are common areas that we identify for remediation:

| Issue | Description |
| --- | --- |
| **Modules Fix** | Organize Terraform code into modules for better manageability. |
| **Tag Inconsistency** | Modify tags in cloud resources to maintain consistency. |
| **(AWS-Specific) Overly Permissive IAM Policies** | Adjust IAM policies to enforce least privilege. |
| **(AWS-Specific) Secrets Exposed** | Update Terraform code to use the `sensitive` keyword in `inputs/outputs` blocks. |
| **IAM Users** | Can be ignored if not relevant to your security model. |

**Key Benefits**

- **Instant Security Insights**: Quickly spot misconfigurations and security gaps in your cloud environment.
- **RBAC Control**: Only the Topology owner can view the analysis results, thereby ensuring secure access.
- **Evolving Security Standards**: We’re continuously adding more checks and filters to enhance security assessments.

The new **Security And Governance** checks for your imported `tfstate` files help you proactively secure your infrastructure and stay ahead of compliance risks. For a visual walkthrough of the feature, refer to [Import Logs Panel for viewing Security And Governance Checks on Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#import-logs-for-viewing-security-and-governance-checks-on-imported-tfstate-files) under the [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#user-interface-enhancements) section.

### Inferring Resource Connections For Imported `tfstate` Files

Click to view

We’re excited to introduce a new feature that automatically infers resource connections for resources imported via `tfstate` files. This feature eliminates the need for manual connection mapping, streamlining the process of visualizing and managing the relationships between your cloud resources.

**How It Works**

1. **Resource Discovery**: Resources imported from `tfstate` files will now be automatically discovered and connected in your topology.

2. **Topological Mapping**: Resources imported from the `tfstate` files no longer appear without connections. Our new system automatically infers relationships between resources, making it easier to visualize how your infrastructure components interact.


This is applicable for all `tfstate` file imports made:

- While creating an appStack using Deployment Files.



![appStack from Deployment Files](https://docs.stackgen.com/assets/images/importTFRN0125-a2b5fdd34865f8a85fff3acf5f2a0652.jpg)

- From the Topology Canvas using the **Import** button.



![Import in Topoly Canvas](https://docs.stackgen.com/assets/images/importTF1RN0125-ec63fc0ad5c9677faa89c19ad9206acb.jpg)


note

Ensure that you turn on the **Find Resource Dependencies Automatically** toggle while importing your `tfstate` file.

![Find Resource Dependencies Automatically](https://docs.stackgen.com/assets/images/findresourcedependencies-af087054b592f58a425cf658d6da93cf.jpg)

**Key Benefits**

- **Automatic Resource Connections**: Automatically link resources and visualize their dependencies without manual effort.
- **Simplified Infrastructure Management**: Easily manage complex cloud environments with automatically mapped relationships.
- **Seamless Integration**: Import `tfstate` files from both new and existing deployments, ensuring accurate and immediate connection mapping.

**Supported Resource Connections**

- AWS
- Azure
- GCP
- Civo cloud
- Custom Resources

Get started now and streamline your resource management!

### Enhanced Resource Mapping During Cloud Migration

Click to view

We're excited to announce an update to **Cloud Migration** process for greater control over your resource mappings during the migration process.

**Post-Migration Resource Override**

Post migration, you can choose any one of the identified and available resource equivalents in your destination cloud for a resource on your source cloud. This feature lets you choose a better resource fit for your target cloud topology. For example, switch between **ECS** or **EKS** for containerized compute, depending on your specific use case.

StackGen will highlight resources in your post-migration topology canvas view that can be mapped to other resource alternatives and you will see a two-way arrow icon appear next to mappable resources. Alternatively, you will also see the **Map Resources** button to the bottom-left of your Topology canvas. It will also display the number of mappable resources in your topology.

You can map resources in two ways:

1. **Directly Clicking The Resource**


1. Click on the resource to display the two way icon.
2. Click it again to open the **Replace With** dialog panel.
3. Select your resource and you're done.

![Map Resource from Resource](https://docs.stackgen.com/assets/images/mapresourcesRN0125-f2029f9d06803f7064027ba4bc773652.jpg)

2. **Via Map Resources Button**


1. Click **Map Resources** button to the bottom-left of the Topology canvas to open the **Map Resources** panel.
2. Select the resource or resources that you want to map to other resource.
3. Click the **Other available mappings** dropdown to view the alternatives.
4. Click to select the newly mapped resource and click **Done**

![Map Resource from Resource](https://docs.stackgen.com/assets/images/mapresources1RN0125-ea2601a8113c23333408f4180bbfdc6d.jpg)

Mapping your resources is that easy!

**Benefits**

- **Flexibility**: Tailor your target topology to your needs without being locked into default resource options.
- **Control**: Ensure your migrated environment aligns with your business or technical preferences from the start.
- **Efficiency**: Minimize rework by configuring defaults upfront or easily adjusting resources post-migration.

With this update, we're bringing you closer to a more complete, customized, and efficient migration experience.

**What's Supported**: All **Cloud Migrations**.

### Enhanced Support For Connections

Click to view

We’ve added new capabilities to improve how connections are handled within your resources.

**Key Updates**

- **Connect Any Resources With Another**: With the aim of enabling a more flexible and precise way to establish resource relationships, StackGen now lets you create attribute connections among any of your resources within your appStack.
- **Create Reference Connections for Custom Resources**: You can now connect any resource with your Custom Resource provided, you have defined a variable for the same.

StackGen will continue to make auto suggestions for connection references but you can choose to override the reference values.

**Benefits**

- **Enhanced Flexibility**: Support for connection references provide more options for resource relationships where data connections are restricted.

![Reference Any Resource](https://docs.stackgen.com/assets/images/referenceanyresourceRN0125-6819a8faeae676df241a56bbdc2994c6.jpg)

- **Broad Compatibility**: Works across all resource types StackGen supported or custom resources, for a consistent experience.

![Reference Custom Resource](https://docs.stackgen.com/assets/images/referencecustomresourceRN0125-39eb23469a788feb9665b121efc56f59.jpg)


note

Currently StackGen connections only support inputs for custom resources.

This update simplifies resource management while maintaining validations to support your infrastructure needs.

## User Interface Enhancements

### Import Logs For Viewing Security And Governance Checks On Imported `tfstate` Files

Click to view

Introducing the new **Import Logs** feature for your imported `tfstate` files that helps you assess your existing infrastructure against security and governance best practices, saving you time troubleshooting complex IaC issues, identifying security risks, and ensuring compliance with golden security standards.

You can view import logs for any `tfstate` file import that you make:

- While creating an appStack using Deployment Files.



![appStack from Deployment Files](https://docs.stackgen.com/assets/images/importTFRN0125-a2b5fdd34865f8a85fff3acf5f2a0652.jpg)

- From the Topology Canvas using the **Import** button.



![Import in Topoly Canvas](https://docs.stackgen.com/assets/images/importTF1RN0125-ec63fc0ad5c9677faa89c19ad9206acb.jpg)


You will notice a log-like icon on the Topology canvas once StackGen is done analyzing your `tfstate` file.

![Import Logs](https://docs.stackgen.com/assets/images/importlogs0RN0125-127c31eb642e5fc5f102f813229756d5.jpg)

Clicking **Import Log** opens up the **Import Logs** panel where you can see the identified risks.

![Import Logs](https://docs.stackgen.com/assets/images/importlogsRN0125-c6ef1548c34e77e42b27cebc033d78b4.jpg)

To know how to remediate the issue refer to the section on [Remediation And Fixes](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#whats-fixed).

## What's Fixed

### StackGen-Generated Attribute Mappings for Data Connections Are Not Visible Under References

Click to view

Previously, when StackGen generated data connections (e.g., connecting Athena to S3), the implicit attribute mappings (such as S3 bucket name was mapped to Athena’s bucket name) were created but not displayed in the UI.

Attribute mappings generated as part of data connections are now explicitly shown in the UI.

Example: When IAM Role is connected to AWS Lambda Function, the mapping of the S3 bucket name to Athena's bucket name will now be visible in the attribute mappings section.

![IAM Role to AWS Lambda Function](https://docs.stackgen.com/assets/images/connectionreferencesbugRN0125-84c5f0bab69f5f11475821fc64bd0417.jpg)

This fix ensures that all relevant details about connections and mappings are visible in the UI.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#whats-new)
  - [Enabling Azure to Civo Cloud Migration](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enabling-azure-to-civo-cloud-migration)
  - [Security and Governance Checks for Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#security-and-governance-checks-for-imported-tfstate-files)
  - [Inferring Resource Connections For Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#inferring-resource-connections-for-imported-tfstate-files)
  - [Enhanced Resource Mapping During Cloud Migration](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enhanced-resource-mapping-during-cloud-migration)
  - [Enhanced Support For Connections](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enhanced-support-for-connections)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#user-interface-enhancements)
  - [Import Logs For Viewing Security And Governance Checks On Imported `tfstate` Files](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#import-logs-for-viewing-security-and-governance-checks-on-imported-tfstate-files)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#whats-fixed)
  - [StackGen-Generated Attribute Mappings for Data Connections Are Not Visible Under References](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#stackgen-generated-attribute-mappings-for-data-connections-are-not-visible-under-references)
