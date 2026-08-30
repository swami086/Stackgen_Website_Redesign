---
title: "Fixed Teams Are Incorrectly Displayed While Assigning Governance Configuration"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/apr2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/apr2025"
status: "ok"
---

We've listed all the Known Issues for the April 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/apr25-release).

- [Teams Are Incorrectly Displayed While Assigning Governance Configuration](/docs/stackgen/help-center/known-issues/apr2025#fixed-teams-are-incorrectly-displayed-while-assigning-governance-configuration)
- [Lambda Connected to X-Ray but No CloudWatch Log Group](/docs/stackgen/help-center/known-issues/apr2025#closed-lambda-connected-to-x-ray-but-no-cloudwatch-log-group)
- [Using the `--provider azuread` Flag May Result in Incomplete List of Resource Types](/docs/stackgen/help-center/known-issues/apr2025#fixed-using-the-provider-azuread-flag-may-result-in-incomplete-list-of-resource-types)

### Fixed Teams Are Incorrectly Displayed While Assigning Governance Configuration

Click to view

**Summary**: While creating a Governance Configuration under a specific team, the Assign to Team dropdown incorrectly displays all other teams from the organisation as selectable options.

**Cause**: The dropdown does not filter based on the team scope and incorrectly surfaces unrelated teams during governance assignment.

**Workaround**: This issue has been resolved at [Custom Override and Mapping Policy Fixes for Governance](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#custom-override-and-mapping-policy-fixes-for-governance).

### Closed Lambda Connected to X-Ray but No CloudWatch Log Group

Click to view

**Summary**: In environments where Lambda functions configured with both X-Ray and CloudWatch integration are missing CloudWatch-specific tracing data in logs.

**Cause**: The current deployment template provisions both X-Ray and CloudWatch support, but function code may not be fully integrated to emit trace data to the configured log group.

**Workaround**: Use `CloudWatch` Log Group integration alone for now. Teams are advised to proceed with `CloudWatch` as it requires minimal code changes. X-Ray tracing can be configured later if needed via source code updates.

### Fixed Using the `provider azuread` Flag May Result in Incomplete List of Resource Types

Click to view

**Summary**: Using the `--provider azuread` flag may return an incomplete list of supported resource types.

**Cause**: You are facing this issue due to partial API integration where there are possible mismatches between StackGen and current Azure AD API versions.

**Workaround**: This issue has been resolved at [Incorrect Resource Pack Output for provider Flag in CLI](/docs/stackgen/release-notes/aip/archive/2025/apr25-release#incorrect-resource-pack-output-for-provider-flag-in-cli).
