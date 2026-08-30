---
title: "In-ProgressappStack-Owned Module Creation Fails if You Use the Same Name Across appStacks"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/nov2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/nov2025"
status: "ok"
---

We've listed all the Known Issues for the November 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/nov25-release).

- [appStack-Owned Module Creation Fails if You Use the Same Name Across appStacks](/docs/stackgen/help-center/known-issues/nov2025#in-progressappstack-owned-module-creation-fails-if-you-use-the-same-name-across-appstacks)
- [Github Branch Name Does Not Change When You Switch Between Github Configurations via Push to Git](/docs/stackgen/help-center/known-issues/nov2025#in-progressgithub-branch-name-does-not-change-when-you-switch-between-github-configurations-via-push-to-git)
- [Wiz Scan Fails for Team-Shared Modules with “Wiz Auth Not Found” Error](/docs/stackgen/help-center/known-issues/nov2025#in-progresswiz-scan-fails-for-team-shared-modules-with-wiz-auth-not-found-error)

### In-ProgressappStack-Owned Module Creation Fails if You Use the Same Name Across appStacks

Click to view

**Summary**: While creating an appStack-owned module, using the same module name across different appStacks causes the module creation to fail.

**Cause**: Module names are currently being forced globally instead of being scoped to an appStack. As a result, creating an appStack-owned module with the same name (for example, `vpc`) in another appStack will fail.

**Workaround**: There is no known workaround at the moment. As a temporary measure, ensure that module names are unique across all appStacks until this issue is fixed.

### In-ProgressGithub Branch Name Does Not Change When You Switch Between Github Configurations via Push to Git

Click to view

**Summary**: While pushing your appStack changes to Git, you will notice that switching between multiple GitHub configurations within the same appStack, does not automatically update the branch name.

**Cause**: Currently, StackGen retains the branch name configured in your last used GitHub configuration and reuses it, even if you switch to a different GitHub configuration with a different branch name.

**Workaround**: There is no known workaround at the moment. You will need to manually verify and update the branch name before pushing changes until this issue is resolved.

### In-ProgressWiz Scan Fails for Team-Shared Modules with “Wiz Auth Not Found” Error

Click to view

**Summary**: When you share a module with a team, running a `Scan with Wiz` scan returns a `Wiz Auth Not Found` error.

**Cause**: Wiz authentication secrets are currently scoped to the Personal Workspace, while the module is scoped to a Project. As a result, Wiz cannot access the required authentication when you run a scan on team-shared modules.

**Workaround**: There is no known workaround at this time. You may be able to successfully scan modules only when the module scope and Wiz authentication secret exist within the same workspace scope until this issue is resolved.
