---
title: "In-Progress Incorrect Navigation and URL While Switching Projects After a CLI Run"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/apr2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/apr2026"
status: "ok"
---

We've listed all the Known Issues for the April 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/april/apr26-release).

- [Incorrect Navigation and URL While Switching Projects After a CLI Run](/docs/stackgen/help-center/known-issues/apr2026#in-progressincorrect-navigation-and-url-while-switching-projects-after-a-cli-run)
- [Dropping Resource Packs Into an appStack With Existing Resources Causes Visual Overlap in the Topology View](/docs/stackgen/help-center/known-issues/apr2026#in-progressdropping-resource-packs-into-an-appstack-with-existing-resources-causes-visual-overlap-in-the-topology-view)
- [Variable References Not Updated When a Variable Is Renamed](/docs/stackgen/help-center/known-issues/apr2026#in-progressvariable-references-not-updated-when-a-variable-is-renamed)
- [Output References Not Updated After Adding a Module Identifier](/docs/stackgen/help-center/known-issues/apr2026#in-progressoutput-references-not-updated-after-adding-a-module-identifier)
- [Duplicate appStack Fails for appStack-Owned Modules and Creates an Unrenderable appStack](/docs/stackgen/help-center/known-issues/apr2026#in-progressduplicate-appstack-fails-for-appstack-owned-modules-and-creates-an-unrenderable-appstack)
- [Plan Fails on Init When Using Modules From Azure DevOps in the UI](/docs/stackgen/help-center/known-issues/apr2026#in-progressplan-fails-on-init-when-using-modules-from-azure-devops-in-the-ui)
- [Blank Dashboard URL After Switching to Personal Workspace With No appStacks](/docs/stackgen/help-center/known-issues/apr2026#in-progressblank-dashboard-url-after-switching-to-personal-workspace-with-no-appstacks)
- [IaC Export Preference for Compliance Failure Does Not Take Effect](/docs/stackgen/help-center/known-issues/apr2026#in-progressiac-export-preference-for-compliance-failure-does-not-take-effect)
- [Default Backend Type Preference Still Appears and Does Not Work](/docs/stackgen/help-center/known-issues/apr2026#in-progressdefault-backend-type-preference-still-appears-and-does-not-work)
- [Developer Not Added to Any Project Lands on appStack Creation in Personal Workspace](/docs/stackgen/help-center/known-issues/apr2026#in-progressdeveloper-not-added-to-any-project-lands-on-appstack-creation-in-personal-workspace)
- [Admin and DevOps Land on appStack Listing After Second Login Instead of Dashboard](/docs/stackgen/help-center/known-issues/apr2026#in-progressadmin-and-devops-land-on-appstack-listing-after-second-login-instead-of-dashboard)
- [Cloud Discovery Tag Filter Reload Appears Visually Inconsistent and Multiple Tags Return Wrong Results](/docs/stackgen/help-center/known-issues/apr2026#in-progresscloud-discovery-tag-filter-reload-appears-visually-inconsistent-and-multiple-tags-return-wrong-results)
- [Blank appStack Created From Cloud Discovery Without Template Modules When Modal Is Closed](/docs/stackgen/help-center/known-issues/apr2026#in-progressblank-appstack-created-from-cloud-discovery-without-template-modules-when-modal-is-closed)
- [Module Restriction Policy Updates Automatically When You Delete the Minimum Version](/docs/stackgen/help-center/known-issues/apr2026#in-progressmodule-restriction-policy-updates-automatically-when-you-delete-the-minimum-version)
- [Cloud Discovery Pagination Controls Missing When You Have More Than Ten Discoveries](/docs/stackgen/help-center/known-issues/apr2026#in-progresscloud-discovery-pagination-controls-missing-when-you-have-more-than-ten-discoveries)

### In-Progress Incorrect Navigation and URL While Switching Projects After a CLI Run

Click to view

**Summary**: After you switch to a project that has a CLI run, open a run to view CLI run details, then switch projects, you should land on the CLI runs page. Instead, the URL changes but still has the CLI run id appended instead of only the CLI tab.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: You can manually navigate back to the CLI runs page.

### In-Progress Dropping Resource Packs Into an appStack With Existing Resources Causes Visual Overlap in the Topology View

Click to view

**Summary**: If you create a resource pack in an appStack and drag and drop the resource pack in the same appStack, the resource pack is added on top of the same resources. Resources overlap, making it difficult to determine whether the pack has been added to the canvas.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Variable References Not Updated When a Variable Is Renamed

Click to view

**Summary**: When you create an appStack, add a resource, define a variable, and rename the same, its references should be updated automatically. You'll notice that they are not getting updated.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Output References Not Updated After Adding a Module Identifier

Click to view

**Summary**: After you create an appStack, drag and drop a module onto it, create an output and reference it using the module, then add a module identifier to the module and look at the output, the output should show the updated module identifier reference. Instead, the output does not reflect the updated module identifier. A similar limitation may apply to variables when references should follow a renamed variable or updated identifier but do not refresh; see [Variable References Not Updated When a Variable Is Renamed](/docs/stackgen/help-center/known-issues/apr2026#in-progressvariable-references-not-updated-when-a-variable-is-renamed) in this list.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Duplicate appStack Fails for appStack-Owned Modules and Creates an Unrenderable appStack

Click to view

**Summary**: In this scenario, when you create an appStack that uses appStack-owned modules and try to duplicate the appStack, duplication fails with an **Internal Server Error**. No appStack should be created if duplication fails. Instead, an appStack is still created that cannot be rendered.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Plan Fails on Init When Using Modules From Azure DevOps in the UI

Click to view

**Summary**: After you import a module from an Azure DevOps repository, create an appStack that uses the module, add the secret for the Azure DevOps repository in project configuration and attach it to the environment, return to the appStack, and run **Plan** from the UI, **Plan** should complete without errors. **Plan** fails during the init step. Logs report a **Failed to download module** error.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Blank Dashboard URL After Switching to Personal Workspace With No appStacks

Click to view

**Summary**: After you delete the existing appStack in Personal Workspace, you are sent automatically to the first project you belong to. If you open the project switcher and choose Personal Workspace again, you can land on a blank dashboard URL. Expected behavior is unclear when you have no appStacks in Personal Workspace (for example whether you should still see Personal Workspace in the switcher). The issue can show up intermittently when you switch between projects while Personal Workspace has no appStacks. When you remove the last appStack while you are on the appStack listing page in Personal Workspace, the automatic redirect to your first project tends to occur. If you open another Personal Workspace screen first, Personal Workspace can stay reachable without that redirect.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to open another area inside Personal Workspace (not only the appStack listing) before you delete the last appStack or switch projects if you still need Personal Workspace while it has no appStacks, so that path may avoid the automatic redirect and the blank dashboard.

### In-Progress IaC Export Preference for Compliance Failure Does Not Take Effect

Click to view

**Summary**: If you open the **Preferences UI**, set **Block Export on Compliance Failure** to false, create an appStack, fix items marked as **Action Required**, and leave the policy warning in place, then try to export IaC, you should be able to export IaC. Instead, you are unable to export IaC. IaC export is not enabled on any of the export paths even though the preference is meant to allow export in at least one case when you turn blocking off.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Default Backend Type Preference Still Appears and Does Not Work

Click to view

**Summary**: If you open the **Preferences UI** and select the default backend type, that preference should not be present. Instead, the preference is shown and is non-functional.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Developer Not Added to Any Project Lands on appStack Creation in Personal Workspace

Click to view

**Summary**: After you sign in as a tenant-level developer who is not added to any project and has no appStacks in Personal Workspace, you should see messaging that you need to be added to a project and should ask your admin to add you. Instead, you are redirected to the appStack creation page in Personal Workspace.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to contact your admin to be added to a project until this issue is fixed.

### In-Progress Admin and DevOps Land on appStack Listing After Second Login Instead of Dashboard

Click to view

**Summary**: After you clear cookies and cache for the product, sign in, sign out, then sign in again, and your role is Admin or DevOps, you should land on the **Tenant Dashboard** page. Instead, you land on the appStack listing page. Admin and DevOps users are expected to land on the **Tenant Dashboard** so that view stays easy to reach. For developers, landing on appStack pages or the last used project is the more sensible default.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to open the **Tenant Dashboard** from the navigation until this issue is fixed.

### In-Progress Cloud Discovery Tag Filter Reload Appears Visually Inconsistent and Multiple Tags Return Wrong Results

Click to view

**Summary**: After you open a cloud discovery, use the tag filter, and watch the UI while it reloads for filtering, the experience should stay smooth and predictable. If you select multiple tags in the filter and review the results, the result set should match the selected tags. Instead, the reload appears visually inconsistent and multiple tags do not return correct results.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Blank appStack Created From Cloud Discovery Without Template Modules When Modal Is Closed

Click to view

**Summary**: After you create a cloud discovery, select resources, click **create appStack**, then close the modal, you can still create an appStack that is blank or empty even when you have no template modules so the appStack would stay empty. It is unclear whether an appStack should be created in that case. When there are no resources at all, an appStack should likely not be created.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to delete the empty appStack if one was created until this issue is fixed.

### In-Progress Module Restriction Policy Updates Automatically When You Delete the Minimum Version

Click to view

**Summary**: In this scenario, when you create a module with versions, create a module restriction policy and set the minimum version to the latest version, delete that version, then publish a new version, the governance policy can update on its own. Whether the product should always move the minimum to the latest version without user action is still under review. The automatic update can be easy to miss and can move enforcement onto a different release than you pinned, including when a new build reuses the same version identifier as the deleted build so the policy still shows the same number while the underlying module is new. Teams have asked for a clear signal when a pinned minimum version no longer exists, including for **get resource restrictions** style responses.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Cloud Discovery Pagination Controls Missing When You Have More Than Ten Discoveries

Click to view

**Summary**: After you switch to a project, create more than ten cloud discoveries while the list shows ten discoveries per page, then scroll to the bottom to switch pages, the table should show the page switcher and the page count selector. Instead, both are missing.

**Cause**: The cause is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.
