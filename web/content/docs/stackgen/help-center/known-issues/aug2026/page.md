---
title: "In-Progress Project Admin Cannot Add Members From Project Settings"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/aug2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/aug2026"
status: "ok"
---

We've listed all the Known Issues for the August 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4).

- [Project Admin Cannot Add Members From Project Settings](/docs/stackgen/help-center/known-issues/aug2026#in-progressproject-admin-cannot-add-members-from-project-settings)
- [Built-In Policy Expression Filtering Returns Incomplete Results](/docs/stackgen/help-center/known-issues/aug2026#in-progressbuilt-in-policy-expression-filtering-returns-incomplete-results)
- [Policy Count Incorrect When Using Expressions in Governance](/docs/stackgen/help-center/known-issues/aug2026#in-progresspolicy-count-incorrect-when-using-expressions-in-governance)
- [Policy Expression Placeholder Example Is Invalid for Built-In Policies](/docs/stackgen/help-center/known-issues/aug2026#in-progresspolicy-expression-placeholder-example-is-invalid-for-built-in-policies)
- [Security Policy Expression Filters Need Verification](/docs/stackgen/help-center/known-issues/aug2026#in-progresssecurity-policy-expression-filters-need-verification)
- [Policy Violations Do Not Update Until an Attribute Is Saved](/docs/stackgen/help-center/known-issues/aug2026#in-progresspolicy-violations-do-not-update-until-an-attribute-is-saved)
- [New GitHub Configuration Breaks Secret Selection](/docs/stackgen/help-center/known-issues/aug2026#in-progressnew-github-configuration-breaks-secret-selection)
- [Override Base Branch in Git Config Does Not Create a New Commit or PR](/docs/stackgen/help-center/known-issues/aug2026#in-progressoverride-base-branch-in-git-config-does-not-create-a-new-commit-or-pr)
- [Selected Project ID and Role Missing on Enterprise Routes](/docs/stackgen/help-center/known-issues/aug2026#in-progressselected-project-id-and-role-missing-on-enterprise-routes)
- [Catalog Used in appStacks Count Does Not Open Details](/docs/stackgen/help-center/known-issues/aug2026#in-progresscatalog-used-in-appstacks-count-does-not-open-details)

### In-Progress Project Admin Cannot Add Members From Project Settings

Click to view

**Summary**: When a user is a **Project Admin** (directly on the project, or through a **user group** assigned as **Admin**), they should be able to add members from **Project Settings > Members**. Instead, they cannot add project members from that tab.

This applies when:

- The user is a tenant-level **Developer** and belongs to a user group that is **Admin** on the project.
- The user is added to the project as **Admin** without a user group.

**Cause**: The cause of this issue is currently under investigation. Project Admin membership permissions do not unlock the add-members action in Project Settings as expected. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Ask a tenant **Admin** or **DevOps** user to add members until this is fixed.

### In-Progress Built-In Policy Expression Filtering Returns Incomplete Results

Click to view

**Summary**: When you create a **Governance** configuration, open **Built-In Policies**, and filter with an expression such as `glob(policy.name, "AWS*")`, the results should include every matching built-in policy. Instead, filtering returns an incomplete set. For example, searching for AWS policies may show only a small subset (such as about 12) instead of the full matching set (such as about 70).

**Cause**: The cause of this issue is currently under investigation. Expression-based filtering for built-in policies does not return the full matching set. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Select required built-in policies manually when expression filtering under-selects.

### In-Progress Policy Count Incorrect When Using Expressions in Governance

Click to view

**Summary**: When you create a **Governance** configuration, select some policies manually, then add more policies with an expression, the policy count shown at the top, on the **Governance Summary** page, and in **Governance Details** after create should match the selected set. Instead, the count is incorrect for the end user.

The same count issue applies for **Security Policies** when expressions are used.

**Cause**: The cause of this issue is currently under investigation. Manual selection and expression selection are not aggregated correctly into the displayed policy count. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. After create, open **Governance Details** and review the selected policies by name rather than relying on the count alone.

### In-Progress Policy Expression Placeholder Example Is Invalid for Built-In Policies

Click to view

**Summary**: When you create a **Governance** configuration and open the expression editor for **Built-In Policies**, the placeholder example should be a valid expression for that policy type, and help text should make supported keys clear. Instead, the placeholder can show an invalid example (for example tag-based expressions that do not apply to built-in policies). Keys that look like table headers are also easy to misuse (for example a **Domain** column does not mean `policy.domain` is a valid expression key).

**Cause**: The cause of this issue is currently under investigation. Placeholder and help content for policy expressions do not match the valid key set for built-in policies. We will update this section when we have more information on the root cause and a solution.

**Workaround**: Prefer expression keys that map to confirmed filters for the policy type you are editing. Do not assume every table column header is a valid `policy.*` key.

### In-Progress Security Policy Expression Filters Need Verification

Click to view

**Summary**: When you filter **custom security policies** in governance with expression keys such as `policy.resourceName`, `policy.moduleName`, and `policy.resourceType`, results should match the intended policies. Filtering behavior for these keys still needs verification, and results may not be reliable yet.

**Cause**: The cause of this issue is currently under investigation. Expression filter logic for security-policy keys is being cross-checked. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. After applying an expression, review the selected security policies manually before you save governance.

### In-Progress Policy Violations Do Not Update Until an Attribute Is Saved

Click to view

**Summary**: When governance uses a policy expression (for example `glob(policy.moduleName, "stackgen*") && policy.tags["allow"] == "true"`), and you add modules to an appStack that should trigger new violations, those violations should appear when the matching policies apply. Instead, policy violations on the UI do not update until you save an attribute on the appStack.

**Cause**: The cause of this issue is currently under investigation. Adding modules or policies does not refresh violation state until an attribute save. We will update this section when we have more information on the root cause and a solution.

**Workaround**: Save an attribute on a module in the appStack to refresh policy violation display, then re-check the violations list.

### In-Progress New GitHub Configuration Breaks Secret Selection

Click to view

**Summary**: When you create an appStack, create a **GitHub** configuration, push a PR, then open **Push to GitHub** again and click **New Configuration**, the **Secret** selector should let you choose a secret. Instead, the application breaks when you open the secret selector.

**Cause**: The cause of this issue is currently under investigation. Creating an additional GitHub configuration after an existing push flow breaks secret selection. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Avoid opening **New Configuration** in that flow until this is fixed, or recreate the Git config from a clean path if your team has a known recovery step.

### In-Progress Override Base Branch in Git Config Does Not Create a New Commit or PR

Click to view

**Summary**: When you create an appStack, create a git config, raise a PR, then change the **base branch** while keeping the push branch the same, StackGen should create a new commit or PR for the updated base. Instead, the new commit or PR fails with an error.

**Cause**: The cause of this issue is currently under investigation. Overriding the base branch on an existing git config does not complete the expected new commit or PR path. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Create a new git configuration aimed at the desired base branch instead of overriding the base on the existing config.

### In-Progress Selected Project ID and Role Missing on Enterprise Routes

Click to view

**Summary**: When you are on an **Enterprise** route, the sidebar should still show the selected project's ID or name and your role in that project, the same way project routes do. Instead, that project context is missing on enterprise routes. Refreshing on an enterprise route can also auto-select the first project.

**Cause**: The cause of this issue is currently under investigation. Selected project context is not kept visible across enterprise routes. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Use the project switcher to confirm which project is selected after you leave or refresh an enterprise page.

### In-Progress Catalog Used in appStacks Count Does Not Open Details

Click to view

**Summary**: When you open **Module Catalog** and click the **Used in appStacks** count for a module, the side panel should show the appStacks that use that module. Instead, the panel does not show the expected details.

**Cause**: The cause of this issue is currently under investigation. The catalog count click path does not populate appStack usage details in the side panel. We will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. Find module usage by opening appStacks directly when you need that information.
