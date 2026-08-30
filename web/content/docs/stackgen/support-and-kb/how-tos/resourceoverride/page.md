---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/support-and-kb/how-tos/resourceoverride"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/how-tos/resourceoverride"
status: "ok"
---

This guide provides step-by-step instructions on using the StackGen [Command-Line Interface (CLI)](/docs/stackgen/cli-guide/usage/upload/upload-resources) to sideload custom policies onto the StackGen platform. Sideloading allows you to extend StackGen's functionality with policies tailored to your requirements.

## Overview

The Resource Override Policy allows you to replace specific cloud provider resource types with custom resource types. This is useful for enforcing compliance, standardization, or other organizational requirements in Terraform state management.

The policy consists of the following fields:

- **Name**: The descriptive name of the policy has to be unique.
- **OverrideResourceTypeDetails**: Defines the mappings of cloud provider resource types to custom resource types.

  - Each entry within this section represents a cloud provider resource type that should be overridden.
  - The details for each overridden resource include:
    - **OverrideType**: The custom resource type replacing the cloud provider resource.
    - **Locked**: can be ignored.
    - **TemplateID**: The identifier of the template associated with the custom resource type. Has to be a valid UUID.

**Example**: Below is a policy framework that helps enforce consistency in Terraform state management by allowing controlled resource type overrides. Before applying overrides, validate all template IDs and verify resource mappings..

```json
[\
\
  {\
\
    "Name": "Resource Override Policy - Replace Compute and IAM Roles with Custom Versions",\
\
    "OverrideResourceTypeDetails": {\
\
      "cloud_storage_bucket": {\
\
        "OverrideType": "custom_storage_bucket",\
\
        "Locked": true,\
\
        "TemplateID": "c7aedaa8-cc51-469a-9fc2-f14c57033b52"\
\
      },\
\
      "cloud_iam_role": {\
\
        "OverrideType": "custom_iam_role",\
\
        "Locked": true,\
\
        "TemplateID": "402abbd3-0501-4be1-b683-04418a5ded84"\
\
      }\
\
    }\
\
  }\
\
]
```

## Understanding Resource Override Mapping Policies in StackGen

Click to view

- **Override Policies & Drag-and-Drop**: The override mapping policy does not affect the drag-and-drop functionality of resources in StackGen. It only swaps or replaces resources when importing configurations (such as Terraform state files) or using Infrastructure as Code (IaC) exports.

- **How Overrides Work During Import**: When you import a Terraform state (tfstate) file, StackGen maps the resources to built-in or data source templates.
  - Even if a custom resource module was deployed already, StackGen-supported resources will still be created.
  - If a mapping policy exists, StackGen will automatically replace these built-in or data source resources with your custom module.
- **Restricting Resource Usage**: To prevent users from deploying a generic S3 bucket, define a resource restriction policy. These policies specify a list of **allowed** templates, which can include both custom templates/modules and built-in templates maintained by StackGen. Any resources not included in the policy will be disabled from the drag-and-drop interface.



important





This restriction affects the `tfstate` **import** and **Cloud-to-Code** processes differently. If no mapping policy is defined, restricted resources will still appear in the topology view, but IaC export will be disabled.

- **Handling Variable Inputs**: StackGen swaps the built-in or data source resource with your custom module when a custom resource is deployed and later re-imported. However, there is currently no built-in support for automatically passing variables (such as tfvars) back into the custom module.


## Governance Rules

Click to view

We’ve listed the conditions for defining rules for managing your governance configurations, policies, and permissions within a multi-level structure.

- **Ownership**: Governance configurations can be owned at either the **Enterprise** or **Project** levels. Governance Configurations at the enterprise level can only be comprised of policies that are also owned at the enterprise level.
- **Access and Scope**: To create a governance configuration at the **Enterprise** level, a user must have the relevant [scope](/docs/stackgen/concepts/rbac) assigned.

  - To create a governance configuration at the **Project** level, a user must have a project-level role or scope.
  - You can create a Governance configuration only if you are a StackGen DevOps or Administratior user.
- **Policy Inheritance and Restrictions**: A governance configuration at the **Project** level must contain policies that are also owned by the **Project**.

  - Policies created at the **Enterprise** level can be inherited by projects.
  - Policies created at the **Project** level cannot be accessed by other **Projects**.
- **Policy Application Conditions**:

  - If a governance configuration is applied to a **Project**, it overrides any configuration at the **Enterprise** level.
  - If a governance configuration is applied at an **appStack** level, it takes precedence over the **Project** level governance configuration.
  - An **appStack** automatically applies the governance configuration of the project it belongs to at the time of creation.
- **Custom Resource and Security Conditions**:

  - A custom resource template can be created at the **User** or **Project** level, but not at the **Enterprise** level.
  - A governance configuration applied at the **Enterprise** level must only use policies and resources that exist at the **Enterprise** level.
- Governance configurations are visible based on user **Roles** and **Permissions**.
- **Secret** storage must indicate which **Projects** have access and prevent unauthorized deletions.

## Prerequisites

Click to view

Before you begin, ensure you have the following:

- **StackGen CLI installed and configured**: Follow the [StackGen CLI](/docs/stackgen/cli-guide/get-started/install-and-uninstall) documentation to install and set up the **CLI** on your system.
- **Custom policy files**: Ensure that your policy files are correctly formatted and ready for sideloading. Example policy format is on the [resource override policy](/docs/stackgen/cli-guide/usage/upload/resource-override-policy) CLI guide page.

## Important Considerations

Click to view

- **Policy format**: Your custom policy files must adhere to the format specified by StackGen. Incorrect formatting may cause errors during the upload.
- **Policy conflicts**: Be mindful of potential conflicts between your custom and existing StackGen policies. Carefully review your custom policies to avoid unintended behaviour.
- **Version control**: Consider using version control for your custom policy files. This will help you track changes and revert to previous versions if needed.
- **Testing**: Thoroughly test your custom policies in a controlled environment before applying them to production workloads.
- **Resource Name Matching**: The resource type specified in `OverrideResourceTypeDetails` must exactly match the Terraform state resource type.
**Example**: Overriding `cloud_function` with `custom_function` works only if the incoming Terraform state contains `cloud_function`.
- **Template ID Verification**: The `TemplateID` must belong to a custom resource type accessible to the project applying the policy.

  - The `TemplateID` must correspond to the same resource type as the one being overridden.

  - Before creating a resource override policy, ensure the `TemplateID` is listed using the command:





    ```bash
    stackgen resource type --pattern custom_storage_bucket -c true --project projectId
    ```

## Process Workflow

To sideload custom policies onto the StackGen platform, you’ll need to:

1. [Create a new Custom Resource](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-a-new-custom-resource)
2. [Initialize the StackGen CLI](/docs/stackgen/support-and-kb/how-tos/resourceoverride#initialize-stackgen-cli)
3. [Create a custom `policy.json` file](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-a-custom-policyjson-file)
4. [Upload the **Policy** via StackGen CLI](/docs/stackgen/support-and-kb/how-tos/resourceoverride#upload-the-policy-via-stackgen-cli)
5. [Create a **Governance Configuration**](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-governance-configuration) template that lets you enforce this policy on **Projects**

Let’s go through each step in detail.

### Create a New Custom Resource

Click to view

1. **Navigate to the Projects workspace**: In StackGen, policies are enforced at the project level. Make sure you are in the desired Project's workspace where you want to set up the custom module enforcement policy, then collect the Project ID from the browser URL.
2. **Create a new Custom Resource**:

1. In the appStack view, click New Resource on the bottom left.



      ![Add Resource](https://docs.stackgen.com/assets/images/addresource-howto-c7d33cf119c00b29a26a34dbc300909d.jpg)

2. Click the **+** icon at the top of the list next to the Custom Resources section.



      ![Add Custom Resource](https://docs.stackgen.com/assets/images/custommodule-howto-0b98f6872651fd7d09e72af3412fd72e.jpg)

3. Link the custom module from your git repository.

### Initialize StackGen CLI

Click to view

1. Set the following three environment variables in your shell to point StackGen CLI to the right environment:
1. Refer to the [PAT](/docs/stackgen/setup/pat) documentation to create a **Token** and run:





      ```bash
      export STACKGEN_TOKEN=<TOKEN>
      ```

2. Follow these steps to retrieve your **Project ID**:
      1. Select the Project from the **Projects** dropdown.

      2. Copy your **Project ID** from the browser address bar.



         ![uuid](https://docs.stackgen.com/assets/images/uuid-howto-6a46150c1e36164beb71e7fb138adc98.jpg)

      3. Run the following:





         ```bash
         `Export STACKGEN_PROJECT=<Project ID from step 1>`
         ```
3. Copy the URL for your StackGen Cloud and run the following:





      ```bash
      export STACKGEN_URL=<URL>
      ```
2. Run the following command to list available resource types:





```bash
stackgen resource type -c true
```









Before creating a resource override policy, ensure the `TemplateID` is listed using the command:





```bash
stackgen resource type --pattern custom_storage_bucket -c true --project projectId
```











![List Templates](https://docs.stackgen.com/assets/images/patterncustom-howto-376a83cd0499a94354e9906ab02565c8.jpg)









3\. Find your custom module on the list and copy its UUID.


### Create a Custom `policy.json` File

Click to view

The example below defines a **Hardened S3 Substitution Policy** policy that automatically replaces any S3 resources in an Appstack with a custom S3 module. Copy and modify the example into the `policy.json` file.

```json
[\
\
  {\
\
    "Name": "Hardened S3 Substitution Policy",\
\
    "OverrideResourceTypeDetails": {\
\
      "aws_s3": {\
\
        "OverrideType": "aws_s3_bucket",\
\
        "Locked": true,\
\
        "TemplateID": "{CUSTOM_MODULE_UUID_HERE}"\
\
      }\
\
    }\
\
  }\
\
]
```

### Upload the Policy via StackGen CLI

Click to view

Availability

`stackgen upload resource-override-policy` is **not supported** on StackGen CLI **0.81.0**. It is not listed under `stackgen upload -h`.

Upload and manage resource override policies through the StackGen UI and governance flows instead of this CLI path. For supported CLI upload commands, see [Resource Upload](/docs/stackgen/cli-guide/usage/upload/upload-resources) (`custom-modules` and `security-rules` only).

### Create Governance Configuration

Click to view

Ensure that the overridden resource type aligns with the organizational policies and infrastructure requirements.From the StackGen home page, click **Governance Configurations** (from your project's workspace) to create a new governance configuration.

### Examples

We’ve listed examples of custom policies you could use to ensure consistency, security, and compliance when provisioning your resources on various clouds.

#### AWS

- Replace all generic S3 buckets and RDS templates with hardened custom modules.





```json
[\
\
{\
\
      "Name": "Enforce S3 Encryption",\
\
      "OverrideResourceTypeDetails": {\
\
      "aws_s3_bucket": {\
\
          "OverrideType": "aws_s3_bucket",\
\
          "Locked": true,\
\
          "TemplateID": "s3-encryption-template"\
\
      },\
\
"aws_rds_cluster": {\
\
          "OverrideType": "aws_rds",\
\
          "Locked": true,\
\
          "TemplateID": "rds-hardend-template-id"\
\
      }\
\
      }\
\
}\
\
]
```

- Mandate the use of a custom storage account module instead of a generic storage account template.





```bash
[\
\
{\
\
      "Name": "Require Azure Storage Account Encryption",\
\
      "OverrideResourceTypeDetails": {\
\
      "azurerm_storage_account": {\
\
          "OverrideType": "azurerm_storage_account",\
\
          "Locked": true,\
\
          "TemplateID": "azure-storage-template-id"\
\
      }\
\
      }\
\
}\
\
]
```


#### Google Cloud (GCP) [](/docs/stackgen/support-and-kb/how-tos/resourceoverride#google-cloud-gcp%20%22Direct%20link%20to%20Google%20Cloud%20(GCP)")

- Ensure the use of a custom Cloud Storage Bucket template instead of a default configuration.





```json
[\
\
{\
\
      "Name": "Require GCP Storage Encryption",\
\
      "OverrideResourceTypeDetails": {\
\
      "google_storage_bucket": {\
\
          "OverrideType": "google_storage_bucket",\
\
          "Locked": true,\
\
          "TemplateID": "gcp-storage-template-id"\
\
      }\
\
      }\
\
}\
\
]
```


- [Overview](/docs/stackgen/support-and-kb/how-tos/resourceoverride#overview)
- [Understanding Resource Override Mapping Policies in StackGen](/docs/stackgen/support-and-kb/how-tos/resourceoverride#understanding-resource-override-mapping-policies-in-stackgen)
- [Governance Rules](/docs/stackgen/support-and-kb/how-tos/resourceoverride#governance-rules)
- [Prerequisites](/docs/stackgen/support-and-kb/how-tos/resourceoverride#prerequisites)
- [Important Considerations](/docs/stackgen/support-and-kb/how-tos/resourceoverride#important-considerations)
- [Process Workflow](/docs/stackgen/support-and-kb/how-tos/resourceoverride#process-workflow)
  - [Create a New Custom Resource](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-a-new-custom-resource)
  - [Initialize StackGen CLI](/docs/stackgen/support-and-kb/how-tos/resourceoverride#initialize-stackgen-cli)
  - [Create a Custom `policy.json` File](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-a-custom-policyjson-file)
  - [Upload the Policy via StackGen CLI](/docs/stackgen/support-and-kb/how-tos/resourceoverride#upload-the-policy-via-stackgen-cli)
  - [Create Governance Configuration](/docs/stackgen/support-and-kb/how-tos/resourceoverride#create-governance-configuration)
  - [Examples](/docs/stackgen/support-and-kb/how-tos/resourceoverride#examples)
