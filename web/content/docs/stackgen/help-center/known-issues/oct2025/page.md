---
title: "Fixed GCP Modules Get Listed Under AWS Resources After Publishing"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/oct2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/oct2025"
status: "ok"
---

We've listed all the Known Issues for the October 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/oct25-release).

- [GCP Modules Get Listed Under AWS Resources After Publishing](/docs/stackgen/help-center/known-issues/oct2025#fixed-gcp-modules-get-listed-under-aws-resources-after-publishing)
- [New Policy Versions Are Not Inheriting Terraform and Provider Version Restrictions](/docs/stackgen/help-center/known-issues/oct2025#fixed-new-policy-versions-are-not-inheriting-terraform-and-provider-version-restrictions)
- [Governance Config Back Button Does Not Return to the Governance Page](/docs/stackgen/help-center/known-issues/oct2025#fixed-governance-config-back-button-does-not-return-to-the-governance-page)

### Fixed GCP Modules Get Listed Under AWS Resources After Publishing

Click to view

**Summary**: When you create and publish a GCP module via the Module Editor, the module incorrectly gets listed under AWS resources instead of GCP resources in the Resources panel.

**Cause**: The current resource mapping logic supports only AWS resources. As a result, published modules, regardless of the cloud provider are automatically listed under AWS Resources.

**Fix**: This issue has been resolved.

### Fixed New Policy Versions Are Not Inheriting Terraform and Provider Version Restrictions

Click to view

**Summary**: When you create a new version of an existing governance policy, you will notice that the Terraform and Provider version restrictions from the previous version are not populated automatically.

**Cause**: The version cloning logic currently copies only metadata and rules from the previous policy version, but does not include Terraform and Provider versioning attributes, resulting in missing default values when you create a new version of an existing policy .

**Fix**: This issue has been resolved.

### Fixed Governance Config Back Button Does Not Return to the Governance Page

Click to view

**Summary**: While configuring a new Governance policy, clicking the **Back** button does not go back to the appStack Governance page. Instead, the Back button becomes disabled and nothing happens.

**Cause**: The **Back** button logic is triggered only after progressing beyond the first screen when you're creating a Governance Configuration.

**Fix**: This issue has been resolved.
