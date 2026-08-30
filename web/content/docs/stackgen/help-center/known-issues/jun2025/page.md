---
title: "In-Progress Module Names Are Not Referenced Correctly Causing Terraform Plan Failure"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/jun2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/jun2025"
status: "ok"
---

We've listed all the Known Issues for the June 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/jun25-release).

- [Module Names Are Not Referenced Correctly Causing Terraform Plan Failure](/docs/stackgen/help-center/known-issues/jun2025#in-progress-module-names-are-not-referenced-correctly-causing-terraform-plan-failure)
- [Exported appStack `.zip` File Name Does Not Match appStack Name](/docs/stackgen/help-center/known-issues/jun2025#in-progress-exported-appstack-zip-file-name-does-not-match-appstack-name)
- [Duplicate Appstack Does Not Include Resources in Duplicated Topology](/docs/stackgen/help-center/known-issues/jun2025#in-progress-duplicate-appstack-does-not-include-resources-in-duplicated-topology)
- [Terraform Plan Fails When Helm Workload Is Connected to a Storage Account](/docs/stackgen/help-center/known-issues/jun2025#in-progress-terraform-plan-fails-when-helm-workload-is-connected-to-a-storage-account)
- [Incorrect Violations Displayed in Topology Canvas](/docs/stackgen/help-center/known-issues/jun2025#in-progress-incorrect-violations-displayed-in-topology-canvas)
- [Resource Tags Tab Is Disabled for a Subnet Resource Until You Add Tags](/docs/stackgen/help-center/known-issues/jun2025#fixed-resource-tags-tab-is-disabled-for-a-subnet-resource-until-you-add-tags)
- [appstack Names Do Not Load in Governance Configuration Details Dialog](/docs/stackgen/help-center/known-issues/jun2025#in-progress-appstack-names-do-not-load-in-governance-configuration-details-dialog)
- [Search and Filter Only Works on Current Page in Cloud Discovery UI](/docs/stackgen/help-center/known-issues/jun2025#fixed-search-and-filter-only-works-on-current-page-in-cloud-discovery-ui)
- [Cloud Discovery UI Renders Empty Page After Selecting All Resources From a Page](/docs/stackgen/help-center/known-issues/jun2025#in-progress-cloud-discovery-ui-renders-empty-page-after-selecting-all-resources-from-a-page)
- [`assume_role_policy` for an IAM Role Is Not Flagged as Required Action](/docs/stackgen/help-center/known-issues/jun2025#fixed-assume_role_policy-for-an-iam-role-is-not-flagged-as-required-action)
- [Resource Discovery Pagination Does Not Update After Adding Resources to Topology](/docs/stackgen/help-center/known-issues/jun2025#in-progress-resource-discovery-pagination-does-not-update-after-adding-resources-to-topology)
- [Cloud Discovery Filters Re-Populate Instead of Preserving All Values](/docs/stackgen/help-center/known-issues/jun2025#in-progress-cloud-discovery-filters-re-populate-instead-of-preserving-all-values)
- [File and Folder Names with Special Characters Revert on Refresh or Tab Switch](/docs/stackgen/help-center/known-issues/jun2025#in-progress-file-and-folder-names-with-special-characters-revert-on-refresh-or-tab-switch)
- [Team Dropdown Reopens Automatically After Removing a Team in Catalog Access Management](/docs/stackgen/help-center/known-issues/jun2025#in-progress-team-dropdown-reopens-automatically-after-removing-a-team-in-catalog-access-management)
- [Only Personal Workspace Custom Modules Are Shown in Backstage During Mapping](/docs/stackgen/help-center/known-issues/jun2025#in-progress-only-personal-workspace-custom-modules-are-shown-in-backstage-during-mapping)
- [Governance Version Details Pop-Up Not Loading Assigned Custom Policies](/docs/stackgen/help-center/known-issues/jun2025#in-progress-governance-version-details-pop-up-not-loading-assigned-custom-policies)
- [Stackgen CLI Run URL Fails When Using `--project` Parameter](/docs/stackgen/help-center/known-issues/jun2025#in-progress-stackgen-cli-run-url-fails-when-using---project-parameter)
- [Files and Folders Cannot Be Dragged Out of a Parent Folder to Root](/docs/stackgen/help-center/known-issues/jun2025#in-progress-files-and-folders-cannot-be-dragged-out-of-a-parent-folder-to-root)

### In-Progress Module Names Are Not Referenced Correctly Causing Terraform Plan Failure

Click to view

**Summary**: Terraform plan fails with an `undeclared module` error after exporting Infrastructure from Code when module names are not referenced correctly following recent changes.

**Cause**: Recent changes in module naming conventions cause incorrect references in the exported Terraform files.

**Workaround**: Manually verify and correct module references in the Terraform files before running terraform plan.

### In-Progress Exported appStack `.zip` File Name Does Not Match appStack Name

Click to view

**Summary**: When exporting an appStack, the output `.zip` file name does not match the current appStack name. Instead, it uses the default name assigned at creation.

**Cause**: The export function references the original default appStack name instead of the updated name after renaming.

**Workaround**: Manually rename the downloaded `.zip` file to match the desired appStack name.

### In-Progress Duplicate Appstack Does Not Include Resources in Duplicated Topology

Click to view

**Summary**: Duplicating an appStack creates a copy without any of the original resources or connections. Additionally, the duplication process asks for target cloud and policies despite expectations it should not.

**Cause**: The duplicate feature was designed to copy only appStack configurations such as name, policies, compute, repo, and components, but not the actual resources or connections.

**Workaround**: No workaround available currently. Future plans include either replicating resources in duplicates or clarifying UX expectations with messaging.

### In-Progress Terraform Plan Fails When Helm Workload Is Connected to a Storage Account

Click to view

**Summary**: Terraform plan fails with an `Unsupported attribute` error referencing a missing `id` attribute in the exported IaC when a Helm Workload is connected to a Storage account in the topology.

**Cause**: The exported Terraform JSON references an attribute id on a module object that does not exist, causing the plan failure.

**Workaround**: There is no workaround as of now.

### In-Progress Incorrect Violations Displayed in Topology Canvas

Click to view

**Summary**: The violation count displayed in the topology error drawer is incorrect, leading to inaccurate error reporting.

**Cause**: The root cause is under investigation and currently not identified.

**Workaround**: No workaround is currently available.

### Fixed Resource Tags Tab Is Disabled for a Subnet Resource Until You Add Tags

Click to view

**Summary**: The Resource Tags tab remains disabled for a Subnet resource until the Add button is clicked and at least one tag is added, preventing access.

![resource tag error](https://docs.stackgen.com/assets/images/subnettagsjun2025-8c9208b53d0f4367dd3995909467039c.png)

**Cause**: The tab activation logic requires existing tags before it can be enabled, causing it to remain disabled initially.

**Fix:** This issue has been resolve in [August 2025](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#resource-tags-tab-is-disabled-for-a-subnet-resource-until-you-add-tags) release.

### In-Progress appstack Names Do Not Load in Governance Configuration Details Dialog

Click to view

**Summary**: In the Governance configuration details window, the appStacks tab shows a perpetual `Loading...` message and does not load appStack names when those appStacks belong to different teams.

![appStack name error](https://docs.stackgen.com/assets/images/govconfigappstackjun2025-d76e00d39d34250224999feec09120c3.png)

**Cause**: The API call fetching appStack details filters by ownership (`orgId`), but appStacks assigned governance configurations often lack the necessary owner `orgId`, causing the request to fail or return no data.

**Workaround**: Currently, appStacks in Governance config details have been disabled as a temporary measure until a permanent fix is implemented.

### Fixed Search and Filter Only Works on Current Page in Cloud Discovery UI

Click to view

**Summary**: The Search and Filter functionality on the Cloud Discovery page filters resources only on the currently visible page, not across all pages.

**Cause**: The search and filter logic is client-side and limited to resources loaded on the current page, lacking backend-driven filtering and pagination.

**Fix**: This issue has been fixed in [August 2025 Release](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#cloud-discovery-ui-search-and-filter-does-not-work-on-create-appstack-page).

### In-Progress Cloud Discovery UI Renders Empty Page After Selecting All Resources From a Page

Click to view

**Summary**: If all resources on a page are moved to the **Selected resources** panel, then navigating to another page and back causes the original page to appear empty, despite other unselected resources being available across the discovery.

**Cause**: The issue occurs due to client-side filtering and pagination logic that does not properly adjust the resource list when selections affect page content.

**Workaround**: No workaround currently available. Planned backend-driven filtering and pagination will address this.

### Fixed`assume_role_policy` for an IAM Role Is Not Flagged as Required Action

Click to view

**Summary**: The required attribute assume\_role\_policy for an IAM Role is not being recognized as an Action Required item, causing the missing attribute to go unnoticed in the actions required count.

![Required Action](https://docs.stackgen.com/assets/images/requiredactionjun2025-75367806d38ddf26e6a4107377aae48c.png)

**Cause**: The validation logic does not currently pick up assume\_role\_policy as a required attribute for IAM Role resources.

**Workaround**: This issue has been fixed in [July 2025 Release](/docs/stackgen/release-notes/aip/archive/2025/jul25-release#iam-role-assume-role-policy-missing-but-not-flagged-as-action-required).

### In-Progress Resource Discovery Pagination Does Not Update After Adding Resources to Topology

Click to view

**Summary**: When you add resources from multiple pages to the topology, the pagination and resource counts on the UI do not update correctly. The page count remains unchanged even though you have added resources, causing inconsistent display and potential confusion.

**Cause**: The client-side pagination logic does not refresh the total resource count or number of pages after resources are added to the topology.

**Workaround** No workaround currently available.

### In-Progress Cloud Discovery Filters Re-Populate Instead of Preserving All Values

Click to view

**Summary**: On the **Cloud Asset Discovery** page, when selecting filters after importing a `.tfstate` file, the filter dropdown options get re-populated instead of preserving all available values. This prevents you from selecting multiple values for the same filter field.

**Cause**: The filter list is dynamically refreshed based on the first selected value, which causes the available options to be overwritten. As a result, users are unable to apply multi-select filters on a single field.

**Workaround**: No workaround currently available. You will need to apply filters one at a time, which limits filtering flexibility.

### In-Progress File and Folder Names with Special Characters Revert on Refresh or Tab Switch

Click to view

**Summary**: When a folder or file under IaC tab of an appstack is renamed using special characters, the new name appears temporarily but reverts to the previous name after refreshing the page or switching tabs. This results in inconsistent naming behavior and confusion.

**Cause**: The frontend allows entry of special characters during renaming, but the backend likely rejects or fails to persist these names due to character restrictions, without displaying an error.

**Workaround**: Avoid using special characters in folder or file names. Only use alphanumeric characters and allowed symbols (e.g., `_` or `-`).

### In-Progress Team Dropdown Reopens Automatically After Removing a Team in Catalog Access Management

Click to view

**Summary**: In the **Catalog** module, when removing a team from the **Access Management** section using the `x` button, the team is successfully removed, but the team selection dropdown reopens automatically. This creates a disruptive user experience by implying that you intend to add another team immediately.

![Delete Team opens the team dropdown](https://docs.stackgen.com/assets/images/deleteteamjun2025-75106de35200aa71aae104384b3b0f63.png)

**Cause**: The UI triggers the dropdown to reopen on focus loss or removal action, possibly due to unintended event propagation or lack of state control after a deletion.

**Workaround**: No workaround currently available. You will need to manually close the dropdown or ignore it before proceeding.

### In-Progress Only Personal Workspace Custom Modules Are Shown in Backstage During Mapping

Click to view

**Summary**: In the **Backstage** deployment, when creating a custom mapping (e.g., for GCP), only custom modules from the **Personal Workspace** are shown in the **Stackgen Resource Type** dropdown. Custom modules added under a **Team scope** are not displayed, even if you have access to them.

**Cause**: The current logic filters modules by scope and excludes those associated with teams. As a result, even authorized users can't view or use **Team-scoped** custom modules in the mapping workflow.

**Workaround**: No current workaround. You will need must manually recreate or duplicate custom modules in your **Personal Workspace** to use them.

### In-Progress Governance Version Details Pop-Up Not Loading Assigned Custom Policies

Click to view

**Summary**: In the **Governance Configuration** tab, when viewing the version details of a governance rule, the **Custom Policies** tab appears empty, even though policies were previously assigned.

![Blank Policies](https://docs.stackgen.com/assets/images/nullpoliciesjun2025-19a444bcddc52b224f4e3fd2a6faa3f9.png)

**Cause**: The API returns a `null` response for the custom policies. This may occur if the governance configuration is outdated and references custom policies that no longer exist or have been deleted from the system.

**Workaround**: No known workarounds at present. You will have to manually verify policy associations via the Policies tab of an appStack or **Policies** page for a team.

### In-Progress Stackgen CLI Run URL Fails When Using `--project` Parameter

Click to view

**Summary**: In **Stackgen CLI v0.58.0**, when deploying resources using the `--project` parameter (e.g., from an appStack), the command executes successfully, but the **CLI run URL** printed at the end returns a **404 Not Found** error when clicked.

```yaml

Action Summary:

Total Resources: 3

Total Changes: 3

Resources Created: 3

Resources Updated: 0

Resources Deleted: 0

Resource Changes:

+----------+------------+--------+--------+--------------------------+

| RESOURCE |    TYPE    | ACTION | REGION |       DESCRIPTION        |

+----------+------------+--------+--------+--------------------------+

| this     | aws_vpc    | create |        | This resource is created |

+----------+------------+--------+--------+--------------------------+

| this     | aws_subnet | create |        | This resource is created |

+----------+------------+--------+--------+--------------------------+

| this     | aws_subnet | create |        | This resource is created |

+----------+------------+--------+--------+--------------------------+

CLI run URL : https://cloud.stackgen.com/cli-runs/4a61ffac-ee06-4540-aecd-7434bee1df0e
```

**Cause**: The CLI run URL generated at the end of command execution does not account for the `--project` context, resulting in an invalid or incomplete URL that fails to resolve correctly.

**Workaround**: No current workaround known. You will need to view the run through the UI.

### In-Progress Files and Folders Cannot Be Dragged Out of a Parent Folder to Root

Click to view

**Summary**: Attempting to drag-and-drop files or folders created inside a parent folder in the IaC tab of an appStack; to the root directory is failing. The items remain in their original location within the nested folder.

**Cause**: The drag-and-drop operation does not support relocating items to the root directory. This may be due to missing event handling or path resolution logic in the file hierarchy UI.

**Workaround**: No workaround currently available. You will need to delete and recreate the files at the desired location manually.
