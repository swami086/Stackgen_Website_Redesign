---
title: "In-Progress Tenant Admin and Tenant DevOps Land on Project Dashboard Instead of Enterprise Dashboard"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/july2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/july2026"
status: "ok"
---

We've listed all the Known Issues for the July 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11).

- [Tenant Admin and Tenant DevOps Land on Project Dashboard Instead of Enterprise Dashboard](/docs/stackgen/help-center/known-issues/july2026#in-progresstenant-admin-and-tenant-devops-land-on-project-dashboard-instead-of-enterprise-dashboard)
- [Generated Policy Always Includes an Unnecessary Configuration Block](/docs/stackgen/help-center/known-issues/july2026#in-progressgenerated-policy-always-includes-an-unnecessary-configuration-block)
- [Sidebar Expand Toggle Placement Is Awkward and Overlaps the Project Switcher](/docs/stackgen/help-center/known-issues/july2026#in-progresssidebar-expand-toggle-placement-is-awkward-and-overlaps-the-project-switcher)
- [Project List Dropdown Is Not Scrollable and Shifts Position When Filtered](/docs/stackgen/help-center/known-issues/july2026#in-progressproject-list-dropdown-is-not-scrollable-and-shifts-position-when-filtered)
- [Modules Uploaded With --dir Show Source as Module Editor in Catalog](/docs/stackgen/help-center/known-issues/july2026#in-progressmodules-uploaded-with-dir-show-source-as-module-editor-in-catalog)
- [Empty Terraform Directory Upload With --dir Succeeds Without Error](/docs/stackgen/help-center/known-issues/july2026#in-progressempty-terraform-directory-upload-with-dir-succeeds-without-error)
- [Overwrite Version Upload Shows Duplicate Version in Labels and Versions](/docs/stackgen/help-center/known-issues/july2026#in-progressoverwrite-version-upload-shows-duplicate-version-in-labels-and-versions)
- [Default Values for any Variables Not Shown After Publishing a Second Version](/docs/stackgen/help-center/known-issues/july2026#in-progressdefault-values-for-any-variables-not-shown-after-publishing-a-second-version)
- [Incorrect Provider Icon for OCI Security Policies](/docs/stackgen/help-center/known-issues/july2026#fixed-incorrect-provider-icon-for-oci-security-policies)
- [Empty Required Tag Blocks Saving Other Attributes](/docs/stackgen/help-center/known-issues/july2026#fixed-empty-required-tag-blocks-saving-other-attributes)
- [ui\_control for any Variables in stackgen.yaml Sometimes Set to object Instead of hcl](/docs/stackgen/help-center/known-issues/july2026#in-progressui-control-for-any-variables-in-stackgen-yaml-sometimes-set-to-object-instead-of-hcl)
- [Action Required Count Incorrect for Custom Modules With Many Required Fields](/docs/stackgen/help-center/known-issues/july2026#in-progressaction-required-count-incorrect-for-custom-modules-with-many-required-fields)

### In-Progress Tenant Admin and Tenant DevOps Land on Project Dashboard Instead of Enterprise Dashboard

Click to view

**Summary**: When you log in as a user who is an **Admin** or **DevOps** at the tenant level, you should land on the **enterprise dashboard**. Instead, you land on the **project dashboard**. Previously, these users were redirected to the enterprise dashboard after login.

Related login landing cases under review:

- **Tenant Admin** \- Should land on the enterprise dashboard. Currently lands on the project dashboard.
- **Tenant DevOps** \- Should land on the enterprise dashboard. Currently lands on the project dashboard.
- **Tenant Developer** \- Landing target for developers who belong to one or more projects is still being confirmed.
- **Tenant Developer not added to any projects** \- Should not land on an invalid or random URL, and should not be redirected to **create appStack** when returning to the main URL. Current behavior can drop the user on a random URL; clearing the URL and opening the main URL can incorrectly send the user into create appStack.

**Cause**: The cause of this issue is currently under investigation. Post-login redirection no longer matches the previous enterprise-dashboard landing behavior for tenant Admin and tenant DevOps users. Final intended landing per role (including tenant Developer cases) is still being confirmed. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. After login, navigate manually to the enterprise dashboard if that is the view you need.

### In-Progress Generated Policy Always Includes an Unnecessary Configuration Block

Click to view

**Summary**: When you go to **Policy Management**, generate a policy for a module and a resource, and review the generated policy, the policy should not include an unnecessary `configuration` block. Instead, the generated policy always includes a `configuration` block. This can also affect resource-level policy evaluation when that block is missing from the evaluation path.

**Cause**: The cause of this issue is currently under investigation. Policy generation still emits a `configuration` key that is not needed for the intended policy. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Sidebar Expand Toggle Placement Is Awkward and Overlaps the Project Switcher

Click to view

**Summary**: When you navigate to **appStacks** and try to expand or collapse the sidebar, the expand toggle should feel clean and intuitive. Instead, the button placement feels off. When the sidebar is collapsed, the expand control can sit behind or overlap the project switcher (Aiden Switcher), which makes the toggle harder to find and use.

**Cause**: The cause of this issue is currently under investigation. Sidebar expand behavior and project switcher priority conflict in the collapsed sidebar layout. UX improvements for the toggle placement are under review. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Project List Dropdown Is Not Scrollable and Shifts Position When Filtered

Click to view

**Summary**: When you open the **All Members** page, click **Invite**, and use the **Project List** dropdown, you should be able to scroll the list with a mouse pad, and filtering should keep the dropdown in place. Instead, scrolling does not work, and when you filter results the dropdown list changes position.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Modules Uploaded With --dir Show Source as Module Editor in Catalog

Click to view

**Summary**: When you upload a custom module with `stackgen upload custom-modules` using the `--dir` flag (local directory blob upload), then open **Module Catalog** and check the module **Source**, the source should reflect that the module was uploaded from a local directory. Instead, **Source** shows **Module Editor**, which is incorrect for `--dir` uploads.

**Cause**: The cause of this issue is currently under investigation. Modules uploaded through the `--dir` blob path are labeled with the Module Editor source in Catalog. The correct source label for local directory uploads is still being confirmed. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. The module itself still uploads and can be used; only the **Source** label in Catalog is wrong.

### In-Progress Empty Terraform Directory Upload With --dir Succeeds Without Error

Click to view

**Summary**: When you create an empty folder with no `.tf` files and run `stackgen upload custom-modules` with `--dir` pointed at that folder, the upload should fail because there is nothing to upload. Instead, the command succeeds and returns no error.

**Cause**: The cause of this issue is currently under investigation. The `--dir` upload path does not validate that the target directory contains Terraform module files before accepting the upload. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Confirm the directory contains the expected `.tf` files before you run the upload.

### In-Progress Overwrite Version Upload Shows Duplicate Version in Labels and Versions

Click to view

**Summary**: When you upload a custom module with a given `--version`, then upload the same module again with the same `--version` and `--overwrite-version`, open **Module Catalog**, and open the version to view **Custom Module Label** management, you should see a single entry for that version. Instead, the same version appears twice in the labels and versions view.

**Cause**: The cause of this issue is currently under investigation. Overwriting a version with `--overwrite-version` still leaves a duplicate version entry in the labels and versions UI. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment.

### In-Progress Default Values for any Variables Not Shown After Publishing a Second Version

Click to view

**Summary**: When you create a custom module with variables of type `any` or `any(list)` and no defaults, publish it, drag the module onto the canvas, then edit the module again to add default values and publish a new version, the attribute panel should show those default values for the module already on the canvas. Instead, the defaults are not rendered, and you have to drag and drop the module again to see them.

**Cause**: The cause of this issue is currently under investigation. Default values added in a later module version for `any` and `any(list)` variables do not refresh on existing canvas instances. We will update this section when we have more information on the root cause and a solution.

**Workaround**: Remove the module from the canvas and drag and drop it again after the version with defaults is published.

### Fixed Incorrect Provider Icon for OCI Security Policies

Click to view

**Summary**: When you create a security policy for an **OCI** module and review the provider icon shown for the policy, you should see the **OCI** icon. Instead, the policy shows a **GCP**, **Azure**, or **AWS** icon.

**Cause**: Provider icon selection for OCI security policies did not resolve to the OCI icon.

**Workaround**: This issue has been fixed in [v2026.7.11](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#oci-security-policy-provider-icon). OCI security policies now show the correct OCI provider icon.

### Fixed Empty Required Tag Blocks Saving Other Attributes

Click to view

**Summary**: When an appStack-owned module marks both a field such as bucket name and **tags** as required, you should be able to save other single attributes even when the required tag is still empty. Instead, saving a single attribute value failed unless tags were saved first.

**Cause**: Attribute save validation treated an empty required tag as a hard block on saving other attributes.

**Workaround**: This issue has been fixed in [v2026.7.11](/docs/stackgen/release-notes/aip/2026/july/v2026-7-11#save-attributes-with-empty-required-tag). You can save other attributes when a required tag is still empty.

### In-Progress ui\_control for any Variables in stackgen.yaml Sometimes Set to object Instead of hcl

Click to view

**Summary**: When you create an **appStack-owned** module and, in the prompt, ask for variables of type `any` or `any(list)`, then review `stackgen.yaml`, the `ui_control` for those variables should be `hcl`. Other control types can break attribute rendering and override the default HCL Expression behavior for these types. Instead, `ui_control` is sometimes set to `object`, which breaks rendering.

**Cause**: The cause of this issue is currently under investigation. Prompt-based or generated `stackgen.yaml` for `any` and `any(list)` variables does not consistently assign `ui_control: hcl`. We will update this section when we have more information on the root cause and a solution.

**Workaround**: Edit `stackgen.yaml` and set `ui_control` to `hcl` for variables of type `any` or `any(list)` before you rely on the attribute panel rendering.

### In-Progress Action Required Count Incorrect for Custom Modules With Many Required Fields

Click to view

**Summary**: When you create a custom **appStack-owned** module, mark many attributes as required, publish it, and drag the module onto the canvas, the **Action Required** count should match the required fields that still need values, and all related warnings should be visible. Instead, the count is incorrect, and new **Action Required** warnings keep appearing as you resolve other warnings.

**Cause**: The cause of this issue is currently under investigation. Action Required aggregation for modules with many required fields does not stay in sync as individual warnings are cleared. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Treat the Action Required list as incomplete until you have reviewed all required attributes on the module.
