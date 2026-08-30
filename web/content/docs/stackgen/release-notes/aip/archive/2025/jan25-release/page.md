---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/jan25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/jan25-release"
status: "ok"
---

We're thrilled to present our January 2025 release, packed with powerful features and enhancements designed to make infrastructure management easier, more secure, and more efficient than ever. This update introduces preview mode for safer CLI operations, enhanced data source management, new backend configuration support for Infrastructure as Code (IaC), and robust governance capabilities with resource pack policies. Additionally, we've enabled Azure to GCP migration, providing actionable insights to streamline your cloud transitions. Dive in to explore how StackGen continues to evolve to meet your infrastructure needs.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#stackgen-cli)
  - [Enhanced Data Source Management for Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enhanced-data-source-management-for-resources)
  - [New Backend Configuration Support for IaC](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#new-backend-configuration-support-for-iac)
  - [Enhanced Support for Resource Packs with Helm and Terraform Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enhanced-support-for-resource-packs-with-helm-and-terraform-resources)
  - [Support for Governance With Resource Pack Policy](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#support-for-governance-with-resource-pack-policy)
  - [Enabling Azure to GCP Migration](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enabling-azure-to-gcp-migration)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#user-interface-enhancements)
  - [Intuitive Resource Connection in the Topology Canvas](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#intuitive-resource-connection-in-the-topology-canvas)
  - [Cloud Migration with Actionable Insights](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#cloud-migration-with-actionable-insights)
  - [Migration events toggle](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#migration-events-toggle)
  - [Migration events log](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#migration-events-log)
  - [Create Resource Pack From a Single Resource](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#create-resource-pack-from-a-single-resource)
  - [Warning for Resource Packs without IAM Roles](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#warning-for-resource-packs-without-iam-roles)
  - [Extended Support for GCP Cloud](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#extended-support-for-gcp-cloud)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#whats-fixed)
  - [EKS Cluster Creation Fails With `Multiple Subnets Needed` Error in the Topology Canvas](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#eks-cluster-creation-fails-with-multiple-subnets-needed-error-in-the-topology-canvas)
  - [appStack From Source Code: Canceling Github Authentication Redirects to Repository Onboarding Page](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#appstack-from-source-code-canceling-github-authentication-redirects-to-repository-onboarding-page)
  - [Issues with Creating Resource Packs due to Missing IDs in New Connections](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#issues-with-creating-resource-packs-due-to-missing-ids-in-new-connections)
  - [Unable to Pass `var` File and `region` in `destroy` Command](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#unable-to-pass-var-file-and-region-in-destroy-command)
  - [Rerun Failure in `provision` and `destroy` Commands](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#rerun-failure-in-provision-and-destroy-commands)
  - [Resource Pack Shared with `Everyone` is Not Visible to Non-Admin Users](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#resource-pack-shared-with-everyone-is-not-visible-to-non-admin-users)
  - [Lack of Tagging Support for Certain Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#lack-of-tagging-support-for-certain-resources)
  - [`cloud2code import azure` Fails on Unsupported Azure Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#cloud2code-import-azure-fails-on-unsupported-azure-resources)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#supported-resources)
  - [Google Cloud Platform (GCP)](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#google-cloud-platform-gcp)

## What's New

### StackGen CLI

#### Preview Mode for Safer Cloud Infrastructure Changes

Click to view

We’re excited to announce an improvement to the **StackGen CLI** that enhances safety and control when managing cloud infrastructure. By default, StackGen `provision` and `destroy` commands now provide a preview of actions before making any changes.

- **Preview by Default**: Running StackGen CLI `provision` or `destroy` commands will now show a summary of the actions you can perform without executing them.

- **Explicit Consent for Changes**: You will need to explicitly confirm your intent to apply changes by adding the `--apply` flag.


#### Benefits

- **Increased Safety**: Prevents you from making accidental changes to your cloud infrastructure.

- **Greater Control**: Allows you to review and verify your actions before execution.


**Example Usage**

- **Preview Mode (Default)**: This will display a summary of resources to be created or updated.

`stackgen provision`

- **Applying Changes**: This will execute the provisioning process.
`stackgen provision --apply`


#### Impact

This update ensures that changes to your cloud environment are deliberate and reviewed, reducing the risk of unintended modifications. For more information, refer to the article on [Provisioning Your appStack](/docs/stackgen/cli-guide/usage/provision-infra-with-cli) and [Destroying Your appStack](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra).

### Enhanced Data Source Management for Resources

Click to view

We are excited to introduce new functionality in the **Toplogy Canvas** that makes managing data sources and resources in your workflow more intuitive and easy. Here's what's new:

- **Simplified Resource Management**: To reduce clutter in the resource drag-and-drop panel, we've streamlined how data sources are handled. Instead of listing each resource as a separate data source, users can now easily:



![External Data Source](https://docs.stackgen.com/assets/images/ExternalDataSourceRN1224-09d336bb26b7167cb7fda66457487f5b.png)












  - **Drag and drop a resource** and click the **Mark as Data Source** toggle directly from the panel. This functionality works similarly to the **Mark as External Resource** toggle that providing a seamless experience.

  - **Better Organization and Flexibility**: Keep your resource panel clean and manageable, even with a large number of resources. Quickly identify and configure data sources without navigating through an extensive list.


warning

Marking a resource as a data source will delete all the existing data and connections of the resource. This is a Known Issue. To know more refer to the section on [Loss of attributes](/docs/stackgen/help-center/known-issues/jan2025)
page.

We hope these changes enhance your productivity and create a smoother resource management experience. Happy building!

### New Backend Configuration Support for IaC

Click to view

We are excited to announce a significant enhancement to our **Infrastructure as Code (IaC) Topology Canvas** capabilities, support for **Backend Configuration**. **Backends** are now fully supported as **Resources** within your **appStacks** under the **Topology Canvas**, enabling seamless integration and management of your resources across environments.

You can now streamline deployment workflows, enable rapid time-to-value (TTV), and enhance scalability for Terraform lifecycle and statefile management.

![Backend Resource](https://docs.stackgen.com/assets/images/BackendResourceRN1224-9d775a9b42723237757a936a91191d43.png)

**Key Benefits**

- **Rapid Deployment**: By integrating backend resources into the topology, you can deploy your IaC more efficiently and reliably.

- **Scalable Lifecycle Management**: Provides robust Terraform statefile handling and supports stable, transactional operations.

- **Improved Governance**: Offers flexibility for custom policies and pre-configurations with backend resources.

- **Custom Policy and Governance**: Backend configurations can be utilized in custom policies and governance pre-configurations, ensuring compliance and standardization.

- **IaC Export**: Backends are now included in the exported IaC, within a backend.tf file for **Instant Deployment**.


**Supported Backend Types**

- S3
- Local
- Remote
- HTTP
- Azure Storage Blobs

We’re committed to making your IaC journey more smooth and efficient. If you have any questions or feedback, please don’t hesitate to reach out!

### Enhanced Support for Resource Packs with Helm and Terraform Resources

Click to view

We’ve introduced exciting enhancements to **Resource Packs** to address your needs for better governance and usability. You can now include both **Terraform (TF)** and **Helm** resources in a single **Resource Pack**, enabling seamless enforcement of governance policies and efficient appStack deployment configurations.

#### Here's what's new

- **Helm Resources in Resource Packs**: Helm resources can now be included in **Resource Packs** alongside **Terraform** resources.

![Helm Resource Packs](https://docs.stackgen.com/assets/images/HelmRPRN1224-ad291097b734af8c4def5128db7cc8bf.png)

_**Image**: of a **Helm Resource Pack** for a single resource in the left panel; and multiple resources to the right._

- Once you create a resource group, the default connections configured between your **Helm** and **Cloud (TF)** resources are maintained, ensuring pre-configured settings like your configured **IAM** roles are available to you when you create an appStack.

- You will receive a warning to review your connection-related configurations (e.g., IAM roles) while using such packs.

- **Support for Single Resource Packs**: You can now create your **Resource Packs** using a single **Helm** or **Terraform** resource. This enables governance enforcement for scenarios requiring the mandatory inclusion of a specific resource (e.g., DataDog or Grafana) in every appStack that you create. For a visual walkthrough of this feature, refer to the section [Create a Resource Pack from a Single Resource](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#create-resource-pack-from-a-single-resource).


### Support for Governance With Resource Pack Policy

Click to view

We’re excited to introduce the new **Resource Pack Policy** feature that extends and enhances your **Governance** capabilities. With this feature, your **DevOps** teams are empowered to create, manage, and enforce **Resource Pack-specific Custom Policies**.

#### Extended Support for Resource Pack in CLI

You can now create a Resource Pack via your appStack Topology Canvas and use the CLI to view the Resource Pack ID and create and upload your custom Resource Pack Policy. To do this, run the following commands:

**1\. View all resources in an appStack**: You can view the list of resource packs in StackGen by running the command `stackgen resource type -k`. You will notice that the resource packs created in StackGen will have a `uuid` number populated as highlighted in the image below. This is your `resource pack id`. You will need this ID to create your Resource Pack Policy.

![Resource Pack Ids](https://docs.stackgen.com/assets/images/ResourcePackIDRN1224-52da39de3359ed856000780dcabfda50.png)

To get help on listing resource types, run the command: `stackgen resource type --help`

**2\. Upload your resource pack policy**: This command enforces the addition of specified Resource Packs to your Topologies. It can only be used by users who have been assigned the `DevOps` role in StackGen.

You will have to first create your resource pack policy and save it as a `.json` file. We've shared a sample resource pack policy below:

```bash
[\
\
    {\
\
        "name": "resource_pack_policy",\
\
        "description": "Resource Pack Policy",\
\
        "resourcePackIds": ["pack-1"]\
\
    }\
\
]
```

Use the command `stackgen upload resource-pack-policy [flags]`

**Example**:

`stackgen upload resource-pack-policy -p /path/to/resource-pack-policy.json`

To get help with uploading a resource pack policy, run the command:
`stackgen upload resource-pack-policy --help`.

#### Custom Resource Pack Policies in Governance Pre-config

Your DevOps users can add Resource Pack-specific custom policies via the **Governance Configurations** page. These configurations can be enforced across one or multiple teams, thus streamlining policy compliance.

#### Functional Improvements

- Enforced automatic inclusion of resource packs within the topology for version one.
- Only resource packs with matching deployment types are included.
- **User Interface Updates**: The **Custom Policies** dialog now displays custom resource pack policies.

![Resource Pack Policy](https://docs.stackgen.com/assets/images/ResourcePackPoliciesR1224-0399a15cce4a797cca697dc73bbe23ff.png)


With these updates, we’ve made it easier for you to enforce governance policies tailored to your unique resource requirements, ensuring compliance, consistency, and efficiency.

### Enabling Azure to GCP Migration

Click to view

We are thrilled to announce support for migration from **Azure** to the **GCP** cloud. This enhancement lays the foundation for seamless transitions between **Azure** and **Google Cloud Platform (GCP)**, empowering your teams to migrate workloads efficiently and with confidence.

![Azure to GCP](https://docs.stackgen.com/assets/images/AzureToGcpRN1224-1c77e29417960f5280b4d8d738d76c43.png)

**Key Features**

- **Resource Attribute Mapping**: We have defined and implemented mappings for resource attributes between **Azure** and **GCP** clouds. This ensures compatibility and consistency by aligning your **Azure** resource attributes with the **GCP** cloud equivalents.
- **Simplified Migration Process**: This enhancement provides a robust framework for automated or guided migrations from **Azure** to **GCP** cloud. It reduces complexity and manual effort during the migration process.
- **Enhanced Interoperability**: StackGen [supports a wide range of Azure resources](/docs/stackgen/setup/supported-tech/supported-technologies)), ensuring a comprehensive migration strategy.

This feature is a critical step toward enabling multi-cloud flexibility and empowering you to take full advantage of the **GCP** cloud while leveraging your existing **Azure** resources. Stay tuned for additional updates as we continue to enhance our migration capabilities!

## User Interface Enhancements

### Intuitive Resource Connection in the Topology Canvas

Click to view

We have enhanced the user experience and interface logic in the **Topology Canvas** for intuitively disabling and greying out any resource that cannot be connected with yours and highlighting the link in red.

![Not Connected](https://docs.stackgen.com/assets/images/NoConnectionUIRN1224-1c0aa38e1cbb131b4e851c0d5485557d.png)

### Cloud Migration with Actionable Insights

Click to view

When migrating resources between clouds, it’s important that you understand what happened to your resources. We’ve enhanced our user interface and experience to make this process clear, simple, and actionable.

To learn more, check out the relevant enhancements for the **Migration events** toggle and **Migration Events Log** below.

#### Migration events toggle

Click to view

We've added the **Migration events** toggle to the bottom left of your **Topology Canvas** page that provides you with a visual overview of your migrated appStack. Enable the toggle to see which resources were migrated and how they were mapped.

![Migrated Events](https://docs.stackgen.com/assets/images/MigrationEventsRN1224-271f3ae25e5dc3f622755c9ad088780b.png)

- You will notice various icons next to each of your resources in the **Before Migration** view under the **Topology Canvas**.



![Migrated Resources](https://docs.stackgen.com/assets/images/MigratedResourcesRN1224-ecc34df23edd1c8a0a05bf3e2f5d6648.png)











Let's go over what each of the icons represents in detail:



| Icon | Description |
| --- | --- |
| ![Successfully Migrated](<Base64-Image-Removed>) | Denotes a resource or a connection that is **_Successfully Migrated_** and mapped correctly. |
| ![Unsuccessfully Migrated](<Base64-Image-Removed>) | Migration of the resource or connection is **_Unsupported_** as we were unable to map the resource in the destination cloud. You will have to manually add the resource or configure the connection via the backend. |
| ![Resource Not Applicable](<Base64-Image-Removed>) | Some resources or connections in the **source** cloud are irrelevant in the **destination** cloud. For example, an **Azurem Resource Group** in your target **GCP** cloud is not required and as such, serves no purpose. In such cases, **StackGen** will intuitively skip migrating and mapping such resources and connections and display this icon to denote that the resource or connection is **_Not applicable for destination cloud_**. |

- Clicking a resource displays information about the mapped resource or connection in the source cloud and highlights the equivalent resource or connection created in the destination cloud.



![Mapped Resources](https://docs.stackgen.com/assets/images/MappedResourcesRN1224-aa492087b935b0205b8d6828ee46c785.png)


#### Migration Events Log

Click to view

We’ve added a **Migration Events Log** to provide a detailed breakdown and a clear understanding of what occurred during the migration process.

![Migration Event Logs](https://docs.stackgen.com/assets/images/MigrationEventLogsRN1224-47c4d17d2d8b271ec5383fc0a13c8f6c.png)

Simply click the **Migration Events Log** icon from the **Split View** under the **Topology Canvas** to check out the migration log, which contains the following information:

![Migration Event Logs1](https://docs.stackgen.com/assets/images/MigrationEventsLogs1RN1224-83a437c8d6064bdf30872bb6b56ded86.png)

- **Successfully migrated resources**: Displays successful resource mappings, so you can explicitly see which resources were mapped to which ones.
- **Migrated as unsupported resource**: Identifies resources that couldn’t be mapped due to incompatibility.
- **Resource not applicable for destination cloud**: Highlights source cloud resources that don’t exist in the destination cloud. With the migration logs providing better insights, we now remove known non-applicable resources from the post-migration topology. These include irrelevant resources that have no meaningful counterpart in the target cloud (e.g., Azure resource groups in AWS).
- **Migrated Connections**: Displays successful resource connection mappings, so you can explicitly see which resources were connected to which ones.

Additionally, you can:

- Search and filter the logs by specific resources via the search bar.

- Filter logs by the migration event.

- Filter and search for resource types in the source and destination cloud.



![Migration Event Logs2](https://docs.stackgen.com/assets/images/MigratedEventLogs2RN1224-fe1bef2b2bc1b9b643b5f93073d35c27.png)


These updates enhance the clarity and usability of the migration process, providing you with actionable insights and a cleaner post-migration view.

### Create Resource Pack From a Single Resource

Click to view

We’re excited to announce a new feature that mandates the inclusion of **Single Resource Packs** in all **appStacks** created by your developer teams. This capability ensures seamless resource standardization and compliance across projects, streamlining **appStack** development while meeting evolving organizational requirements. With this feature, your teams can now confidently maintain consistency and adhere to best practices effortlessly.

To use this feature: 1. Drag and drop a single resource into a newly created appStack. 2. Select the single resource and click the **Save** icon.

![Create Single Resource Pack](https://docs.stackgen.com/assets/images/SingleResourcePack1RN1224-9fb9c86d2822596f829724398640a371.png)

3\. Fill in the details and click **Save Resource Pack**. 4\. You can create a new appStack and drag and drop the created resource pack to check if it can be used.

![SearchSingle Resource Pack](https://docs.stackgen.com/assets/images/SingleResoucePack2RN1224-2404e70cacb472d749b4c07e35187f40.png)

### Warning for Resource Packs without IAM Roles

Click to view

To enhance security and enforce compliance, **StackGen** now issues a warning for **Resource Packs** missing an **IAM** role. These warnings notify users when a **Resource Pack** without an **IAM** role is created or referenced within an **appStack**, ensuring that all configurations meet the necessary security requirements.

![Warning Message Resource Pack without IaM](https://docs.stackgen.com/assets/images/WarningPanelRN1224-a6a01842dbc5307c3a5ddf70fa8907c5.png)

When you use this **Resource Pack** in another **appStack**, you will receive the missing **IAM** role warning message again. You will need to manually add one or connect this to an existing **IAM** role in your **appStack**.

![Warning Message Resource Pack in an existing appStack](https://docs.stackgen.com/assets/images/WarningMessageIaMRN1224-a10c237567220e7efc690c36b674d617.png)

These steps help validate the platform’s warnings for missing IAM roles, ensuring secure and compliant resource pack usage across all appStacks.

### Extended Support for GCP Cloud

Click to view

We have added support for **GCP** cloud in this release.

#### Support for uploading Custom Security Rules

Click to view

**StackGen** now supports sideloading of your **GCP Custom Security Rules** via the **StackGen CLI**. All you need to do is define your security rules in a `.json` file, and upload it by running the following command:

`stackgen upload security-rules -p /path/to/security_rules.json`

**Sample Custom Security Rule**

```bash
    [\
\
{\
\
    "rule_id": "GCP_STORAGE_001",\
\
    "name": "Bucket Name Must be test",\
\
    "version": "0.0.1",\
\
    "resource_type": "google_storage_bucket",\
\
    "provider": "gcp",\
\
    "description": "Ensure that Google Cloud Storage bucket names are 'test'.",\
\
    "benchmarks": [\
\
    "CIS",\
\
    "GCP Security",\
\
    "NIST",\
\
    "HIPAA",\
\
    "ISO",\
\
    "PCI",\
\
    "SOC2",\
\
    "GDPR"\
\
    ],\
\
    "category": "Data Protection",\
\
    "severity": "HIGH",\
\
    "rules": [\
\
    {\
\
        "logical_operator": "AND",\
\
        "conditions": [\
\
        {\
\
            "attribute": {\
\
            "name": "name",\
\
            "default": "test",\
\
            "data_type": "string"\
\
            },\
\
            "operator": "EQUALS",\
\
            "value": "test"\
\
        }\
\
        ],\
\
        "remediation": {\
\
        "description": "The bucket name should be set to 'test' for compliance with data protection standards."\
\
        }\
\
    }\
\
    ]\
\
}\
\
]
```

If you need help with uploading your security policies, run the following command:

`stackgen upload security-rules --help`

#### Governance - IAM Policy Restrictions

Click to view

To enhance governance and streamline resource management, we are extending the capability of side-loaded **Custom IAM policies** to **Google Cloud Platform (GCP)**. This feature ensures that only side-loaded **IAM** policies are displayed in the **Topology Canvas** dropdown for every resource type, similar to the existing functionality for **AWS**.

By implementing this for GCP, we aim to provide consistent and granular control over **IAM policies** across platforms, improving clarity, governance, and user experience in multi-cloud environments.

![IAM Roles Restrictions](https://docs.stackgen.com/assets/images/IamRoleRestrictionGCPRN1224-ce49abb3965ce3580b99e193b47433ee.png)

To add IAM policy restrictions to your GCP resources, define your policies and save them in a `.json` file, and upload it by running the following command:

`stackgen upload resource-iam-restriction-policy -p /path/to/resource_restriction_policy.json`

**Sample Custom IAM Restriction Policy**

```bash
[\
\
{\
\
    "name": "resource_iam_restriction_policy",\
\
    "description": "Resource IAM Restriction Policy",\
\
    "resourceSpecificAllowedRoles": {\
\
        "google_storage_bucket":{\
\
            "allowedRoles": [\
\
                "Storage Bucket Admin",\
\
                "roles/storage.objectUser"\
\
            ],\
\
            "defaultRole": "Storage Bucket Admin"\
\
        }\
\
    }\
\
}\
\
]
```

If you need help with uploading your IAM Restriction policies, run the following command:

`stackgen upload resource-iam-restriction-policy --help`

#### Enhanced Support for GCP Resources and Connections

Click to view

We’ve added support for additional **GCP** resources and connections in the latest update. This enhancement improves the way certain resources are discovered in your **StackGen** configurations. The following resources now support handling and inter-resource connections:

| **Resource** | **Description** |
| --- | --- |
| Google Container Engine Versions | Resource handling and improved management. |
| Google Compute Router NAT | Operations and resource links. |
| Google SQL Database | Database connections. |
| Google SQL Database Instance | Resource handling with database connections. |
| Google Service Networking Connection | Improved inter-resource connections. |
| Google SQL User | Enhanced user management. |
| Google Compute Global Address | Supports resource handling. |
| Google Compute Router | Improved handling for routing configurations. |

These improvements enhance consistency, flexibility, and ease of managing interconnected resources, helping streamline your infrastructure workflows.

## What's Fixed

### EKS Cluster Creation Fails With `Multiple Subnets Needed` Error in the Topology Canvas

Click to view

You can now connect your **EKS Clusters** with multiple **Subnets** via the **Topology Canvas**, ensuring a smooth deployment and operation.

Previously, creating **EKS Clusters** with multiple subnets would fail with a `Multiple Subnets Needed` error because the **Topology Canvas** supported connection to a single subnet.

note

Subnet IDs for the EKS Cluster are populated from the connected subnets.

![EKS Clusters](https://docs.stackgen.com/assets/images/EKSClustersRN1224-6e621440266ff41bc31238319f5176c5.png)

### appStack From Source Code: Canceling Github Authentication Redirects to Repository Onboarding Page

Click to view

You can now cancel authenticating your **GitHub** account in the initial repository configuration process while creating an **appStack** from your **Application Source Code**. Previously, doing so, would unexpectedly redirect you to the GitHub onboarding page instead of redirecting back to the appStack creation page.

### Issues with Creating Resource Packs due to Missing IDs in New Connections

Click to view

You can now add resources, connect them, and create a resource pack on the **Topology Canvas** without any issues. Previously, doing so would throw an `Invalid Resource Pack` error and you had to refresh the **Topology Canvas** page again and create your **Resource Pack**.

### Unable to Pass `var` File and `region` in `destroy` Command

Click to view

Previously, StackGen CLI did not allow passing variable files located outside the **IaC directory** or setting a region using the `destroy` command. You would have had to manually fix this, which was time consuming and caused inefficiencies.

The **StackGen CLI Destroy** command now supports the following:

- **Var File Support**: Added the `--var-file` option to reference variable files from any location.
- **Region Support**: Added the `--region` flag to specify the region directly.

**Example**

`stackgen destroy --var-file /path/to/vars.tfvars --region us-west-2`

This fix provides flexibility for handling variable files and simplifies region configuration. Thus, enabling smoother workflows.

### Rerun Failure in `provision` and `destroy` Commands

Click to view

Re-running the `stackgen provision --apply` or the `stackgen destroy --apply` commands now detects and automatically handles re-initialization of the Terraform backend configuration when it changes or becomes inconsistent. Thus, ensuring a smooth execution.

Previously, re-running the `stackgen provision --apply` or the `stackgen destroy --apply` commands for an IaC directory failed during initialization. You would have to run the `terraform init -reconfigure` command first.

Action Required

Update your **StackGen CLI** to the latest version by running the following command:

`brew upgrade stackgen`

No further steps are needed.

### Resource Pack Shared with `Everyone` is Not Visible to Non-Admin Users

Click to view

We've fixed the Resource Pack sharing mechanism to ensure that resource packs marked as shared with `Everyone` are accessible to all users in the organization, delivering a consistent and inclusive experience.

Previously, resource packs shared with `Everyone` were only visible to users with the `Admin` role in the organization. Non-admin users, such as those with `Developer` or `DevOps` roles, could not access these shared resource packs.

### Lack of Tagging Support for Certain Resources

Click to view

Tagging support has been introduced for all supported resources in **StackGen**.Previously, some of the resources did not support tagging, thus limiting the ability to enable better organization, searchability, and cost tracking.

### `cloud2code import azure` Fails on Unsupported Azure Resources

Click to view

Previously, the `cloud2code import azure` command would fail entirely if it encountered an unsupported **Azure** resource. StackGen would throw the following error:
`Error: failed to populate ID map: Need multiple calls to figure out the terraform resource type for resourceID: %!w(<nil>).`

The import process now logs unsupported resources and continues processing the remaining resources instead of stopping. Enhanced logging has also been added for better transparency.

## Supported Resources

### Google Cloud Platform (GCP) [](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#google-cloud-platform-gcp%20%22Direct%20link%20to%20Google%20Cloud%20Platform%20(GCP)")

Click to view

We now support the following Google Cloud Platform (GCP) technologies:

| **Resource Type** | **Details** |
| --- | --- |
| **Google Redis Instance** | Supports provisioning and managing Google Redis instances. |
| **Google Bigtable** | Composite of `google_bigtable_instance` and `google_bigtable_table`. Includes `google_bigtable_table_iam_member`. |
| **Google Cloud SQL** | Supports database flags setup for customizable configurations. |
| **Google BigQuery** | Composite of `google_bigquery_dataset` and `google_bigquery_table`. Includes `google_bigquery_table_iam_member`. Users can define their schema or use Google Sheets. |
| **Google Cloud Run (v2)** | Supports `google_cloud_run_v2_service` and `google_cloud_run_v2_service_iam_member` for managing services and permissions. |

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#stackgen-cli)
  - [Enhanced Data Source Management for Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enhanced-data-source-management-for-resources)
  - [New Backend Configuration Support for IaC](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#new-backend-configuration-support-for-iac)
  - [Enhanced Support for Resource Packs with Helm and Terraform Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enhanced-support-for-resource-packs-with-helm-and-terraform-resources)
  - [Support for Governance With Resource Pack Policy](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#support-for-governance-with-resource-pack-policy)
  - [Enabling Azure to GCP Migration](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#enabling-azure-to-gcp-migration)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#user-interface-enhancements)
  - [Intuitive Resource Connection in the Topology Canvas](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#intuitive-resource-connection-in-the-topology-canvas)
  - [Cloud Migration with Actionable Insights](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#cloud-migration-with-actionable-insights)
  - [Create Resource Pack From a Single Resource](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#create-resource-pack-from-a-single-resource)
  - [Warning for Resource Packs without IAM Roles](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#warning-for-resource-packs-without-iam-roles)
  - [Extended Support for GCP Cloud](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#extended-support-for-gcp-cloud)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#whats-fixed)
  - [EKS Cluster Creation Fails With `Multiple Subnets Needed` Error in the Topology Canvas](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#eks-cluster-creation-fails-with-multiple-subnets-needed-error-in-the-topology-canvas)
  - [appStack From Source Code: Canceling Github Authentication Redirects to Repository Onboarding Page](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#appstack-from-source-code-canceling-github-authentication-redirects-to-repository-onboarding-page)
  - [Issues with Creating Resource Packs due to Missing IDs in New Connections](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#issues-with-creating-resource-packs-due-to-missing-ids-in-new-connections)
  - [Unable to Pass `var` File and `region` in `destroy` Command](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#unable-to-pass-var-file-and-region-in-destroy-command)
  - [Rerun Failure in `provision` and `destroy` Commands](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#rerun-failure-in-provision-and-destroy-commands)
  - [Resource Pack Shared with `Everyone` is Not Visible to Non-Admin Users](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#resource-pack-shared-with-everyone-is-not-visible-to-non-admin-users)
  - [Lack of Tagging Support for Certain Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#lack-of-tagging-support-for-certain-resources)
  - [`cloud2code import azure` Fails on Unsupported Azure Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#cloud2code-import-azure-fails-on-unsupported-azure-resources)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#supported-resources)
  - [Google Cloud Platform (GCP)](/docs/stackgen/release-notes/aip/archive/2025/jan25-release#google-cloud-platform-gcp)
