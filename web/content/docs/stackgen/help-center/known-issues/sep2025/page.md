---
title: "In-ProgressUnable to Reset `Manage Master User Password` to `select` for AWS DB Instance"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/sep2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/sep2025"
status: "ok"
---

We've listed all the Known Issues for the September 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/sep25-release).

- [Unable to Reset `Manage Master User Password` to `-select-` for AWS DB Instance](/docs/stackgen/help-center/known-issues/sep2025#in-progressunable-to-reset-manage-master-user-password-to-select-for-aws-db-instance)
- [Modules Created via Module Editor Cannot Be Deleted From Projects](/docs/stackgen/help-center/known-issues/sep2025#in-progressmodules-created-via-module-editor-cannot-be-deleted-from-projects)
- [All Files Moved to terraform Directory When Export Preference Set to Root](/docs/stackgen/help-center/known-issues/sep2025#in-progressall-files-moved-to-terraform-directory-when-export-preference-set-to-root)

### In-ProgressUnable to Reset `Manage Master User Password` to `select` for AWS DB Instance

Click to view

**Summary**: For the `aws_db_instance_composite` resource, once the **Manage Master User Password** value is set to `true` or `false`, it cannot be reverted to `-select-` from the **Resource Configuration** pane. The IaC does not update to reflect the reset action.

![manage pwd](https://docs.stackgen.com/assets/images/managepwdKI2025-9ccc8feba344415c30be59ae8362dc25.png)

**Cause**: The StackGen configuration handling logic for `aws_db_instance_composite` does not currently support reverting the **Manage Master User Password** field to its default `-select-` state once a value has been defined.

**Workaround**: This is a known limitation. To update the configuration, you can manually modify the IaC definition or recreate the resource with the desired setting. Support for resetting the field to `-select-` will be fixed in a future release.

### In-ProgressModules Created via Module Editor Cannot Be Deleted From Projects

Click to view

**Summary**: Modules that are created and published through the **Module Editor** cannot be deleted when they are part of a **Project**. The delete action fails and displays an error message. However, deleting the same module from the **Personal Workspace** works as expected.

![deletion module project](https://docs.stackgen.com/assets/images/moduledeletionki2025-74dec8ac2f05f509b5938d7873539873.png)

**Cause**: The deletion flow for modules within a **Project** is not correctly synchronized with the Module Editor publishing logic. As a result, module deletion requests from the **Project** context are not processed successfully.

**Workaround**: This is a known limitation. To delete such modules, navigate to your Personal Workspace and delete the custom module from there. Issue with deleting modules directly from the **Project** will be fixed in a future release.

### In-ProgressAll Files Moved to terraform Directory When Export Preference Set to Root

Click to view

**Summary**: When you create an appStack from an imported script (for example, Brownfield import) and set the preference for export directory to `.` or root, all files, including other user-created files, are moved into a Terraform directory.

![Cli screen with command for root directory](https://docs.stackgen.com/assets/images/clirootRN01092025-695c74c893c8290d434417ede590c023.png)

![Folder structure of CLI root in IaC tab](https://docs.stackgen.com/assets/images/cliroot1RN01092025-62d5d68871f3bcc41b2ef7cecddbf8fd.png)

**Cause**: The cause of this issue is currently unknown. The export logic moves all files into a Terraform folder, even when you have set the export directory to root.

**Workaround**: There is no known workaround at the moment. We are investigating the issue and will update this section when we have more information on the root cause and a solution.
