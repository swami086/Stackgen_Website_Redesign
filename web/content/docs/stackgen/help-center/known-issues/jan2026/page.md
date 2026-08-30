---
title: "Fixed Inferred Attribute Does Not Reset After Module Deletion"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/jan2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/jan2026"
status: "ok"
---

We've listed all the Known Issues for the January 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/january/jan26-release).

- [Inferred Attribute Does Not Reset After Module Deletion](/docs/stackgen/help-center/known-issues/jan2026#fixed-inferred-attribute-does-not-reset-after-module-deletion)
- [Resource Restriction Policy Does Not Appear in Table After Creation](/docs/stackgen/help-center/known-issues/jan2026#in-progressresource-restriction-policy-does-not-appear-in-table-after-creation)
- [Incorrect Toast Message Displayed When Fixing All Violations for Multiple Resources of Same Type](/docs/stackgen/help-center/known-issues/jan2026#in-progressincorrect-toast-message-displayed-when-fixing-all-violations-for-multiple-resources-of-same-type)
- [Generated Policy Does Not Match Resource Type from Prompt and Fails to Find Custom Module](/docs/stackgen/help-center/known-issues/jan2026#in-progressgenerated-policy-does-not-match-resource-type-from-prompt-and-fails-to-find-custom-module)
- [File Deletion and Rename Operations Fail for appStack-Owned Modules](/docs/stackgen/help-center/known-issues/jan2026#in-progressfile-deletion-and-rename-operations-fail-for-appstack-owned-modules)
- [Resource Restriction Policy Created at Project Level Instead of Tenant Level](/docs/stackgen/help-center/known-issues/jan2026#in-progressresource-restriction-policy-created-at-project-level-instead-of-tenant-level)
- [Incorrect Toast Message Shown When Deleting Governance Config with Active Version](/docs/stackgen/help-center/known-issues/jan2026#in-progressincorrect-toast-message-shown-when-deleting-governance-config-with-active-version)

### Fixed Inferred Attribute Does Not Reset After Module Deletion

Click to view

**Summary**: When you delete a module, the inferred attribute associated with that module does not automatically reset to empty. The attribute retains its previous value even after the module has been removed.

**Cause**: The module deletion logic does not currently clear or reset inferred attributes that were associated with the deleted module. As a result, the inferred attribute persists with its last known value.

**Fix**: Inferred attributes now automatically reset to empty when you delete a module. The module deletion logic clears inferred attributes associated with the deleted module.

### In-ProgressResource Restriction Policy Does Not Appear in Table After Creation

Click to view

**Summary**: When you create a resource restriction policy, the policy does not appear in the resource restriction policies table. Although the policy is successfully created, it is not visible in the table listing, making it difficult to view or manage the newly created policy.

**Cause**: The table refresh logic does not currently update the resource restriction policies table after a new policy is created. As a result, the newly created policy exists in the system but is not displayed in the table view.

**Workaround**: There is no known workaround at the moment. You may need to refresh the page or navigate away and return to the resource restriction policies page to see the newly created policy in the table until this issue is fixed.

### In-ProgressIncorrect Toast Message Displayed When Fixing All Violations for Multiple Resources of Same Type

Click to view

**Summary**: When you fix all violations for multiple resources of the same type, and a violation cannot be fixed (for example, violations for a custom S3 bucket), the toast message does not display the error response. The message should show the error response but currently does not.

**Cause**: The toast message logic does not currently handle error responses when violations cannot be fixed during a bulk fix operation. As a result, when a violation cannot be fixed, the error response is not displayed in the toast message.

**Workaround**: There is no known workaround at the moment. You may need to check individual resources to identify which violations could not be fixed until this issue is fixed.

### In-ProgressGenerated Policy Does Not Match Resource Type from Prompt and Fails to Find Custom Module

Click to view

**Summary**: When you generate a policy using a prompt, the generated policy does not match the expected resource type defined in the prompt. Additionally, if you manually change the resource type and try to evaluate the policy, you get an error because the system fails to find the custom module.

**Cause**: This issue appears to be related to the AI policy generation logic rather than the code logic. The AI does not correctly map the resource type from the prompt to the generated policy, and when the resource type is manually changed, it fails to locate the corresponding custom module.

**Workaround**: For now, the workaround is to change `bucket.bucket_name` to `bucket.Configuration.bucket_name` in the generated policy.

### In-ProgressFile Deletion and Rename Operations Fail for appStack-Owned Modules

Click to view

**Summary**: When you attempt to delete or rename a file associated with an appStack-owned module, the operation fails with an error message.

**Cause**: The cause of this issue is currently unknown. The file deletion and rename operations for appStack-owned modules are not working as expected.

**Workaround**: There is no known workaround at the moment. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

### In-ProgressResource Restriction Policy Created at Project Level Instead of Tenant Level

Click to view

**Summary**: When you create a resource restriction policy, the policy is created at the project level instead of the tenant level. Although the policy is successfully created, it is not visible in the table listing, making it difficult to view or manage the newly created policy.

**Cause**: The resource restriction policy creation logic does not currently correctly determine the appropriate level (project or tenant) for the policy. As a result, the policy is created at the project level instead of the tenant level.

**Workaround**: There is no known workaround at the moment. You may need to manually move the policy to the tenant level until this issue is fixed.

### In-ProgressIncorrect Toast Message Shown When Deleting Governance Config with Active Version

Click to view

**Summary**: When you delete a governance configuration with an active version, the toast message displayed is incorrect. The message should show the error response but currently does not.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to manually verify the deletion of the governance configuration and the active version until this issue is fixed.
