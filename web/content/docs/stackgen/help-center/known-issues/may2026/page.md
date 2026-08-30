---
title: "In-Progress Mark as Template Button Does Not Add the Template Label"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/may2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/may2026"
status: "ok"
---

We've listed all the Known Issues for the May 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8).

- [Mark as Template Button Does Not Add the Template Label](/docs/stackgen/help-center/known-issues/may2026#in-progressmark-as-template-button-does-not-add-the-template-label)
- [Broken appStack Links When Deleting a Custom Module In Use Across Projects](/docs/stackgen/help-center/known-issues/may2026#in-progressbroken-appstack-links-when-deleting-a-custom-module-in-use-across-projects)
- [Plan for an S3 Bucket Fails Because of bucket\_policy](/docs/stackgen/help-center/known-issues/may2026#in-progressplan-for-an-s3-bucket-fails-because-of-bucket-policy)

### In-Progress Mark as Template Button Does Not Add the Template Label

Click to view

**Summary**: When you create an appStack and try to mark it as a template using the **Mark as Template** button, the button should add the `template` label and mark the appStack as a template. Instead, the button does not work as expected and the `template` label is not added.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: Manually add a label named **`template`** to the appStack. For the full template flow, see [IaC from Templates](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates).

### In-Progress Broken appStack Links When Deleting a Custom Module In Use Across Projects

Click to view

**Summary**: When you try to delete a custom module from the **Custom Modules** section in the **Add Resources** panel, and that module is still in use by an appStack in a different project, StackGen correctly blocks the delete and shows the dependent appStack. If you follow the appStack link from that error, you should be able to open the appStack when you are an **Admin**. Instead, the link is inaccessible and the UI can remain stuck in a loading state. Behavior for non-admin users who are not members of the project where the appStack was created is still being clarified.

**Cause**: The cause of this issue is currently under investigation. Access to the consuming appStack can fail when it lives in another project or context, so the dependency link does not resolve correctly. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround for opening the broken dependency link from the delete error. If you are a member of the project that owns the consuming appStack, switch to that project and open the appStack from the **appStacks** list instead. Otherwise, ask an **Admin** or a project member to remove the module usage before you retry the delete.

### In-Progress Plan for an S3 Bucket Fails Because of bucket\_policy

Click to view

**Summary**: When you drag and drop a built-in **S3** module onto the Topology canvas, fill in the bucket name, and run **Plan**, the plan should pass. Instead, plan fails with an error stating that **Bucket Policy** is a required field.

**Cause**: The platform sends `null` by default for this field as part of a fix for a separate issue, which causes plan to treat **bucket\_policy** as required and fail.

**Workaround**: There is no known workaround at the moment.
