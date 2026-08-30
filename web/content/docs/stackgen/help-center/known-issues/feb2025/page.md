---
title: "Fixed Importing Custom Helm Charts Fails with an Internal Server Error"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/feb2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/feb2025"
status: "ok"
---

We've listed all the Known Issues for the February 2025 release here. Once these Issues are resolved in a release, they will be listed under the bug fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/feb25-release).

- [Importing Custom Helm Charts Fails with an Internal Server Error](/docs/stackgen/help-center/known-issues/feb2025#fixed-importing-custom-helm-charts-fails-with-an-internal-server-error)
- [Errors in Connection Attributes](/docs/stackgen/help-center/known-issues/feb2025#closed-errors-in-connection-attributes)
- [Incorrect Error Display for AWS ECS appStacks](/docs/stackgen/help-center/known-issues/feb2025#fixed-incorrect-error-display-for-aws-ecs-appstacks)
- [Unable to Create Connections Between Two Custom Resources](/docs/stackgen/help-center/known-issues/feb2025#fixed-unable-to-create-connections-between-two-custom-resources)
- [Checkmark Misalignment in Attribute Mapping Drop-Down](/docs/stackgen/help-center/known-issues/feb2025#fixed-checkmark-misalignment-in-attribute-mapping-drop-down)

### Fixed Importing Custom Helm Charts Fails with an Internal Server Error

Click to view

**Summary**: StackGen does not let you **Add Helm Chart** while you're adding a custom Helm chart
using a `.zip` file. Closing the **Add Custom Helm Chart** dialog throws an `Internal Server Error`.

**Cause**: This issue occurs because the StackGen logic expects the `.zip` file to contain only the chart files at the root level, so that only the required Helm chart files are processed.

**Workaround**: This issue has been resovled.

### Closed Errors in Connection Attributes

Click to view

**Summary**: Connections and resources created before the January 2025 release may encounter the following issues:

- **Update/Delete Errors**: You may face errors while updating or deleting connections or resources that were created before the January 2025 Release.
- **Missing Attribute Mappings**: Attribute mappings for older connections might not appear in the connection panel.

**Workaround**:
Follow these steps to resolve this issue:

- **For connections with errors**: Delete the affected connections and create them again.
- **For resources created before the release**: Delete the resource and recreate both the resource and connections.

If the issue persists, please contact [StackGen Support](mailto:support@stackgen.com) with your **appStack details** for further assistance.

### Fixed Incorrect Error Display for AWS ECS appStacks

Click to view

**Summary**: While defining an appStack that includes ECS with VPC and Security Groups you may see an error in the **Actions** panel. Clicking on the **Actions** list shows no errors and you will see that no missing attributes are listed.

![Actions Panel Error](https://docs.stackgen.com/assets/images/actionpanelKIRN012025-f17f0a5ded7babf7e030c0e65830074c.jpg)

**Workaround**: This issue has been resolved at [Policy Violations No Longer Disappear on Clicking a Resource](/docs/stackgen/release-notes/aip/archive/2025/mar25-release#policy-violations-no-longer-disappear-on-clicking-a-resource)

### Fixed Unable to Create Connections Between Two Custom Resources

Click to view

**Summary**: You will be unable to connect two **Custom Resources** in an appStack because the necessary outputs are unavailable. This issue also affects custom resources created via Git module.

**Workaround**: This issue has been resolved at [Enhanced Support For Connections](/docs/stackgen/release-notes/aip/archive/2025/feb25-release#enhanced-support-for-connections).

### Fixed Checkmark Misalignment in Attribute Mapping Drop-Down

Click to view

**Summary**: While selecting an attribute in the **Configure References** panel dropdown, the checkmark indicating the selected attribute may appear misaligned, especially for attributes with long names.

![Misaligned Attributes](https://docs.stackgen.com/assets/images/misalignedattributeRN0125-2521bc57d52cd53593ba86787677fe83.jpg)

**Workaround**: This issue has been resolved at [Misaligned Checkmark in Attribute Dropdown for Long Attribute Names](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#misaligned-checkmark-in-attribute-dropdown-for-long-attribute-names)

![Aligned Attributes](https://docs.stackgen.com/assets/images/aligneddropdownRN0125-be221847d7f01b7ce6233b4b4000de15.jpg)

This issue does not affect functionality but may cause confusion while mapping attributes.
