---
title: "In-Progress Map Resources Window Overlaps Split Screen View"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/may2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/may2025"
status: "ok"
---

We've listed all the Known Issues for the May 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/may25-release).

- [Map Resources Window Overlaps Split Screen View](/docs/stackgen/help-center/known-issues/may2025#in-progress-map-resources-window-overlaps-split-screen-view)
- [CLI Shows Unclear Error While Organization ID Is Not Set](/docs/stackgen/help-center/known-issues/may2025#in-progress-cli-shows-unclear-error-while-organization-id-is-not-set)
- [Table Doesn’t Navigate to First Page After Applying Filter](/docs/stackgen/help-center/known-issues/may2025#in-progress-table-doesnt-navigate-to-first-page-after-applying-filter)
- [Topology Doesn’t Load Automatically After Importing tfstate File](/docs/stackgen/help-center/known-issues/may2025#fixed-topology-doesnt-load-automatically-after-importing-tfstate-file)
- [Syncing a Single Component in Backstage Replaces the Entire appStack in Stackgen](/docs/stackgen/help-center/known-issues/may2025#in-progress-syncing-a-single-component-in-backstage-replaces-the-entire-appstack-in-stackgen)
- [Deleted Locals Remain in HCL Editor and Cause Duplication](/docs/stackgen/help-center/known-issues/may2025#fixed-deleted-locals-remain-in-hcl-editor-and-cause-duplication)
- [Helm Charts Tab Missing and Custom Helm Charts Displayed Under Modules](/docs/stackgen/help-center/known-issues/may2025#in-progress-helm-charts-tab-missing-and-custom-helm-charts-displayed-under-modules)
- [Creating Resource Pack with VPC and Two Nested Subnets Fails with 500 Error](/docs/stackgen/help-center/known-issues/may2025#in-progress-creating-resource-pack-with-vpc-and-two-nested-subnets-fails-with-500-error)
- [Built-In Policy Count Fluctuates While Creating Governance](/docs/stackgen/help-center/known-issues/may2025#fixed-built-in-policy-count-fluctuates-while-creating-governance)
- [Two Different Toast Messages Displayed for Incorrect GitHub Token](/docs/stackgen/help-center/known-issues/may2025#in-progress-two-different-toast-messages-displayed-for-incorrect-github-token)
- [Unable to Create Labels While Defining an appStack](/docs/stackgen/help-center/known-issues/may2025#fixed-unable-to-create-labels-while-defining-an-appstack)
- [Custom Module Appears With Inconsistent Labels in Starred and Recents](/docs/stackgen/help-center/known-issues/may2025#in-progress-custom-module-appears-with-inconsistent-labels-in-starred-and-recents)
- [Scope of Custom Module is Incorrectly Shown as Personal in Recent or Starred Modules](/docs/stackgen/help-center/known-issues/may2025#in-progress-scope-of-custom-module-is-incorrectly-shown-as-personal-in-recent-or-starred-modules)
- [Output Attributes From Custom Modules Not Available for Attribute-Based Connections](/docs/stackgen/help-center/known-issues/may2025#in-progress-output-attributes-from-custom-modules-not-available-for-attribute-based-connections)
- [`Not Found` Error During Custom Module Versioning](/docs/stackgen/help-center/known-issues/may2025#fixed-not-found-error-during-custom-module-versioning)
- [Custom Module Versioning Does Not Work When Accessed from Recent Resources List](/docs/stackgen/help-center/known-issues/may2025#fixed-custom-module-versioning-does-not-work-when-accessed-from-recent-resources-list)
- [`stackgen provision` Fails for a Simple AWS S3 Bucket](/docs/stackgen/help-center/known-issues/may2025#in-progress-stackgen-provision-fails-for-a-simple-aws-s3-bucket)
- [Connection Attributes Not Retained in Resource Packs or New appStack Versions](/docs/stackgen/help-center/known-issues/may2025#in-progress-connection-attributes-not-retained-in-resource-packs-or-new-appstack-versions)
- [Connection Attributes Not Retained in Resource Packs or New appStack Versions](/docs/stackgen/help-center/known-issues/may2025#in-progress-connection-attributes-not-retained-in-resource-packs-or-new-appstack-versions)
- [Deleted or Updated Resources Are Still Visible Under Recent or Starred Resources List](/docs/stackgen/help-center/known-issues/may2025#in-progress-deleted-or-updated-resources-are-still-visible-under-recent-or-starred-resources-list)

### In-Progress Map Resources Window Overlaps Split Screen View

Click to view

**Summary**: While you're using split-screen mode in the UI, the Map Resources window may overlap the secondary pane, making it difficult to view or interact with content beneath. This can disrupt your workflow while referencing other parts of the appStack.

![Split Screen Overlaps](https://docs.stackgen.com/assets/images/split-screen-overlap-0bc04a1be1dd9b8603eaaccb8a8a88f2.png)

**Cause**: The modal does not respect split-screen layout boundaries due to a UI layering issue.

**Workaround**: Exit split-screen mode before opening the Map Resources window, or complete resource mapping before switching to split-screen. This is a visual issue and does not impact functionality.

### In-Progress CLI Shows Unclear Error While Organization ID Is Not Set

Click to view

**Summary**: While using the `stackgen preference set` command without an Organization ID configured, the CLI returns a generic 400 error without explanation, making it difficult to understand what went wrong.

![Cli Unclear Org ID](https://docs.stackgen.com/assets/images/cli-unclear-org-id-24607d8879b2a2dba2b81e1c5b67ef9b.png)

**Cause**: The CLI does not provide a clear message while the Organization ID is missing during preference operations, resulting in a confusing or unhelpful error.

**Workaround**: Use the interactive mode command (`stackgen configure -i`) which enforces selecting the Organization ID. This ensures all required configuration is properly set before running preference-related commands.

### In-Progress Table Doesn’t Navigate to First Page After Applying Filter

Click to view

**Summary**: While you apply a filter (e.g., for Helm resource type) while you're on the second or third page of the catalog, you remain on the same page instead of being taken to the first page where the filtered results actually begin.

**Cause**: The table component doesn’t reset pagination while a new filter is applied, likely due to a shared issue in the core table logic.

**Workaround**: After applying a filter, manually navigate to the first page to view the filtered results. A more consistent behavior is planned with a future fix.

### Fixed Topology Doesn’t Load Automatically After Importing tfstate File

Click to view

**Summary**: After you import a `tfstate` file while creating an AKS appStack, the topology view remains blank until you manually refresh the page. This breaks the expected flow and may cause confusion, especially for new users.

**Cause**: The UI does not automatically re-render the topology after the `tfstate` is processed, likely due to a missing state update or delayed API response handling.

**Fix**: Topology will now load automatically after importing a `.tfstate` file.

### In-Progress Syncing a Single Component in Backstage Replaces the Entire appStack in Stackgen

Click to view

**Summary**: While you sync a single component from the Components page, the action replaces the entire appStack with only the selected component, instead of updating it incrementally. This can lead to accidental data loss if you're expecting only that one component to be updated.

**Cause**: The current sync operation does not preserve existing appStack state and treats the action as a full replacement rather than a partial update.

**Workaround**: Before syncing a single component, ensure that a backup or version of the full appStack exists. Alternatively, avoid syncing individual components unless you're intentionally recreating the appStack. A safer update flow is under consideration.

### Fixed Deleted Locals Remain in HCL Editor and Cause Duplication

Click to view

**Summary**: While you delete a local variable from the module editor UI, it isn’t removed from the HCL editor (main.tf). If you manually clear the locals block and add a new one, the locals section may appear multiple times in the HCL.

**Cause**: The module editor does not fully sync deletions with the underlying HCL structure, resulting in stale or duplicated local blocks.

**Fix**: We have now fixed this issue and you can expect the following behaviour:

- Adding a local variable updates both the `main.tf` file and the preview canvas.
- Deleting a local variable removes it from all canvases and from `main.tf`.
- Re-adding a local variable now works seamlessly without creating duplicates.

### In-Progress Helm Charts Tab Missing and Custom Helm Charts Displayed Under Modules

Click to view

**Summary**: In the Catalog section, custom Helm charts are currently being shown under the Modules tab instead of in a dedicated Helm Charts tab. This can cause confusion while browsing or filtering resources.

**Cause**: The UI does not currently separate Helm charts and modules into distinct tabs, even though design references (such as in Figma) suggest they should be displayed separately.

**Workaround**: To locate Helm charts, use the filter option in the Modules tab and set the provider to helm. A dedicated Helm tab may be introduced in a future update to improve clarity.

### In-Progress Creating Resource Pack with VPC and Two Nested Subnets Fails with 500 Error

Click to view

**Summary**: While you try to create a resource pack that includes a VPC and two nested subnets as grouped resources, the operation fails with a 500 Internal Server Error. This prevents successful creation of the intended infrastructure layout.

**Cause**: The backend fails to handle complex nesting logic between grouped resources like VPCs and subnets, resulting in a server-side error.

**Workaround**: There is currently no known workaround. Avoid creating grouped resource packs with nested subnets until a fix is released.

### Fixed Built-In Policy Count Fluctuates While Creating Governance

Click to view

**Summary**: While you create a new governance configuration and select a compute type, the built-in policy count displayed may vary unexpectedly. You might notice the count decreasing even while no policies have been removed.

**Cause**: The UI does not consistently fetch or cache the built-in policies, leading to transient discrepancies in the displayed count. This inconsistency has also impacted automation test stability.

**Fix**: Our team has been monitoring this issue and observed that while this issue occurs, it does not occur frequently. If you observe this issue, please report it to us at [support@stackgen.com](mailto:support@stackgen.com).

### In-Progress Two Different Toast Messages Displayed for Incorrect GitHub Token

Click to view

**Summary**: While a user tries to create a GitHub configuration with an incorrect token, two different toast messages are shown instead of a single consistent error message. This can cause confusion for the user.

**Cause**: The issue arises from inconsistent error handling in the UI, where multiple error messages are triggered simultaneously while an invalid token is provided.

**Workaround**: Ensure that the correct GitHub token is entered to avoid triggering multiple error messages.

### Fixed Unable to Create Labels While Defining an appStack

Click to view

**Summary**: While creating an appStack with a name, description, and labels, users are unable to create or assign labels to the appStack.

**Cause**: This issue may have been introduced due to recent changes aimed at increasing the real estate for the topology, which affected the appStack creation process.

**Fix**: You can now create or assign labels to an appStack.

### In-Progress Custom Module Appears With Inconsistent Labels in Starred and Recents

Click to view

**Summary**: When you create a custom module, **Star** the resource, and later drag it onto the canvas (so tht it appears in your Recents), you will notice that the label name for the custom module looks different in each list.

![DiffModuleLabels](https://docs.stackgen.com/assets/images/differentmodulelabels-bf75a5590eb89ac986e5fa2c26fb840d.jpg)

**Cause**: The **Starred** and **Recents** lists use different logic or data sources to display module names, potentially referencing different naming attributes (e.g., display name vs. internal name or original title).

**Workaround**: Currently there is no known workaround.

### In-Progress Scope of Custom Module is Incorrectly Shown as Personal in Recent or Starred Modules

Click to view

**Summary**: When you **Star** or use custom module with a **Team** scope and use in an appStack, it appears in the **Recent** section with an incorrect **User** scope.

**Cause**: The scope metadata of the custom module is not being correctly rendered when you access it from **Recent** or **Starred** sections. As a result, the UI defaults to showing the **User** scope icon regardless of the custom module's original scope.

**Workaround**: Until this is resolved, you can confirm the actual scope of a custom module by navigating to the **Custom Modules** tab in the main resource library. We recommend that you avoid relying solely on the icon in **Recent** or **Starred** custom modules for scope validation.

### In-Progress Output Attributes From Custom Modules Not Available for Attribute-Based Connections

Click to view

**Summary:** While trying to create a custom module using the **Custom Modules** option in the topology canvas, you can define output variables in the **Terraform** code. However, after successful module creation, the output attributes do not appear in the dropdown for setting up attribute-based connections with other resources.

![Custom Modules](https://docs.stackgen.com/assets/images/custommodule-33c901d10befbe2b38d11f58233dc6c7.jpg)

**Cause:** The system is currently not able to parse or register output variables defined in the **Terraform** code of custom modules, resulting in the output attributes not exposed for connection mapping.

**Workaround:** No known workaroud is available at present.

### Fixed`Not Found` Error During Custom Module Versioning

Click to view

**Summary**: While creating a new version of an existing custom module in an appStack within your **Team**, the operation fails with a `Not found` error.

![Custom Module Version error](https://docs.stackgen.com/assets/images/custommoduleversioner-7450f3da5e2411f0cd721879c6ec09ad.jpg)

**Cause**: You're seeing this issue because the module is being fetched from your **Personal** scope instead of the **Team** scope, even though the module exists in the **Team** scope. The **API** call to create a new version fails, as it cannot find the module in the expected scope.

**Fix**: UI now handles custom module version creation correctly by enforcing `orgId` presence when `ownerType` is organization and `isShared` is `false`, and restricting version creation based on ownership and scope rules.

### Fixed Custom Module Versioning Does Not Work When Accessed from Recent Resources List

Click to view

**Summary**: When you create a version of a **Custom Module** from the **Recent Resources** list in the topology canvas, you will notice that a dialog with an error `No Configuration found for given resource.` is displayed.

![Custom Module Recent Version Failure](https://docs.stackgen.com/assets/images/custommfailversion-7043e6d273e31bf3723b8e70c563ce29.jpg)

**Cause**: The Recent Resources list does not fully support versioning actions for custom modules.

**Fix**: The **Gear** icon has been removed from the resources listed under the **Recent Resources** section, so you will no longer be able to create a new version from your recent resources.

### In-Progress`stackgen provision` Fails for a Simple AWS S3 Bucket

Click to view

**Summary**: Provisioning an `S3` bucket using Stackgen CLI fails when you run the `stackgen provision` command:

```bash
stackgen provision --appstack-id 51100769-1550-4adb-898e-1c97093334fc --apply --cloud-profile sandbox --env-profile dev --log 2
```

**Cause**: `--var region=<region>` is a mandatory attribute needed for stackgen provision.

**Workaround**: Use the `--var region=<region>` flag to while running the command `stackgen provision`.

### In-Progress Connection Attributes Not Retained in Resource Packs or New appStack Versions

Click to view

**Summary:** You will notice that when you:

- Group resources into a resource pack
- Create an appStack version

Connection attributes are not being retained resulting in missing connection details in reused or updated resources.

**Cause:** This issue occurs due to a gap in connection metadata (mappings) during the following operations:

- Creating a resource pack from connected resources
- Reusing a resource pack in a governance policy or new appStack
- Creating a new version of an existing appStack
- Exporting and re-importing the topology

**Workaround:** Until the issue is resolved, consider mapping your resource connection attributes after you:

- Add a resource pack to an appStack
- Create a new version of an appStack
- Import a topology

### In-Progress Deleted or Updated Resources Are Still Visible Under Recent or Starred Resources List

Click to view

**Summary**: When you delete or update a resource template, its previous instance may still appear under the **Recent** or **Starred** sections in the **\+ Add Resources** panel. Attempting to use such resources results in no action or broken behavior.

**Cause**: This issue arises due to stale references in the local cache for **Recent** and **Starred** modules where the UI continues to display the old resource, even though the template has been deleted or changed. Thus leading to a mismatch between UI state and available templates.

**Workaround**: Until the cache invalidation is handled automatically, avoid relying on **Starred** or **Recent** entries for critical templates. Prefer using the latest template from the main resources panel. If a resource in **Recents** or **Starred** list does not respond to drag-and-drop action in **Topology** canvas, verify whether the template still exists in the list of resources.
