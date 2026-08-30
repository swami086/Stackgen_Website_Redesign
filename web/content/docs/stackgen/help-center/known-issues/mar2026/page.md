---
title: "Fixed appStack Templates Are Scoped Only to Project Level"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/mar2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/mar2026"
status: "ok"
---

We've listed all the Known Issues for the March 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/march/mar26-release).

- [appStack Templates Are Scoped Only to Project Level](/docs/stackgen/help-center/known-issues/mar2026#fixed-appstack-templates-are-scoped-only-to-project-level)
- [Project Environment Configuration vs Template Source of Truth for New appStacks](/docs/stackgen/help-center/known-issues/mar2026#in-progressproject-environment-configuration-vs-template-source-of-truth-for-new-appstacks)
- [Incoherent Logs and Incorrect UI Stats for Apply](/docs/stackgen/help-center/known-issues/mar2026#in-progressincoherent-logs-and-incorrect-ui-stats-for-apply)

### Fixed appStack Templates Are Scoped Only to Project Level

Click to view

**Summary**: When you create an appStack template in Personal Workspace or in a Project, appStack templates are scoped only to Project Level and you cannot scope them to Tenant Level. A template may not have access to the same modules in another project, and environment or credentials may not match what is available in other projects. Resource Packs mostly fill that gap, but they can hit the same limitation when you create a resource pack in a project that uses a module only available to that project.

**Cause**: The cause of this issue is that appStack templates are scoped only to Project Level. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Fix**: This issue has been resolved in [v2026.5.8](/docs/stackgen/release-notes/aip/2026/may/v2026-5-8#enterprise-level-appstack-template-sharing). appStack Templates are now shared at the enterprise (tenant) level. See [IaC from Templates](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates).

### In-Progress Project Environment Configuration vs Template Source of Truth for New appStacks

Click to view

**Summary**: When you create a project, create variables and environments in project settings, create an appStack, add variables and environments at topology level, and create an appStack template from that appStack, how variables and environments from project configuration should line up with topology for appStacks created from the template is still being clarified. Right now the appStack marked as template is the source of truth. If you delete on that template appStack the variables and environments that came from Project Environment Configuration, then any other appStack you create in the project from that template does not get those Project Environment Configuration settings. This was raised in standup.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to manually confirm variables and environments on each appStack you create from a template until this issue is fixed.

### In-Progress Incoherent Logs and Incorrect UI Stats for Apply

Click to view

**Summary**: When you run apply, logs for apply are incoherent and in a format that is not human readable. Apply UI stats show 0 for all counts even though apply succeeded (for example a bucket was created) and plan had passed. Retrying apply shows the same incorrect stats. Expected behavior is that apply logs are human readable and that UI stats are correct after a successful plan and apply.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to confirm resources and apply outcome in your cloud environment or outside the apply stats until this issue is fixed.
