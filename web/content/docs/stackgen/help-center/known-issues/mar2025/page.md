---
title: "Fixed Azure tfstate Misclassification in AWS-Based appStack"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/mar2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/mar2025"
status: "ok"
---

We've listed all the Known Issues for the March 2025 release here. Once these Issues are resolved in a release, they will be listed under the bug fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/mar25-release).

- [Azure tfstate Misclassification in AWS-Based appStack](/docs/stackgen/help-center/known-issues/mar2025#fixed-azure-tfstate-misclassification-in-aws-based-appstack)
- [Persistent IAM Role Selection Warning in Resource Pack Configuration](/docs/stackgen/help-center/known-issues/mar2025#fixed-persistent-iam-role-selection-warning-in-resource-pack-configuration)
- [Creating a Variable with a Duplicate Name Throws No Error](/docs/stackgen/help-center/known-issues/mar2025#in-progress-creating-an-environment-variable-with-a-duplicate-name-throws-no-error)

### Fixed Azure tfstate Misclassification in AWS-Based appStack

Click to view

**Summary**: While importing an Azure **tfstate** file into an appStack configured with AWS Cloud, the resources appear as valid resources but are incorrectly classified with `azurerm*` types.

**Cause**: This occurs due to a misclassification in the resource identification logic, where the system does not correctly map Azure resources when an AWS-based appStack is used.

**Workaround**: This issue has been resolved.

### Fixed Persistent IAM Role Selection Warning in Resource Pack Configuration

Click to view

**Summary**: While creating a Resource Pack, the IAM role selection warning is incorrectly displayed even after selecting the corresponding IAM Role. The warning should not appear if the IAM Role is included in the Resource Pack.

**Workaround**: This issue has been resolved.

### In-Progress Creating an Environment Variable with a Duplicate Name Throws No Error

Click to view

**Summary**: While creating Environment Profiles in the Topology Canvas, you will notice that you can create variables with the same name. Doing so, will override the default value of the previously created variable, thus leading to configuration conflicts.

**To avoid this issue**:

- Ensure that all variable names are unique.
- Avoid using identical names for variables assigned to different resources.
