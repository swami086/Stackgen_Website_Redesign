---
title: "In-ProgressCreating appstack From Discovery Does Not Include All Resources"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/jul2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/jul2025"
status: "ok"
---

We've listed all the Known Issues for the July 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/jul25-release).

- [Creating appstack From Discovery Does Not Include All Resources](/docs/stackgen/help-center/known-issues/jul2025#in-progresscreating-appstack-from-discovery-does-not-include-all-resources)
- [Module Editor AI is Generating Deprecated Values in IaC](/docs/stackgen/help-center/known-issues/jul2025#fixed-module-editor-ai-is-generating-deprecated-values-in-iac)
- [Partial Resource Provision Or Destruction Not Reported Correctly in CLI Output](/docs/stackgen/help-center/known-issues/jul2025#in-progresspartial-resource-provision-or-destruction-not-reported-correctly-in-cli-output)
- [`stackgen drift detect` Command Executes on Archived appStacks](/docs/stackgen/help-center/known-issues/jul2025#in-progressstackgen-drift-detect-command-executes-on-archived-appstacks)
- [Policies Not Added to appstacks Created via CLI](/docs/stackgen/help-center/known-issues/jul2025#fixed-policies-not-added-to-appstacks-created-via-cli)

### In-ProgressCreating appstack From Discovery Does Not Include All Resources

Click to view

**Summary**: While creating an appStack from a discovery, only the resources selected during the initial appStack creation are included, rather than all the resources available in the uploaded tfstate file.

**Cause**: The discovery process is incorrectly referencing only the selected resources from the initial appStack creation, rather than importing all available resources from the tfstate file.

**Workaround**: Currently, the workaround is to ensure all desired resources are selected while creating the appStack from the discovery pane.

### Fixed Module Editor AI is Generating Deprecated Values in IaC

Click to view

**Summary**: While using the module editor to create modules, the AI sometimes generates deprecated values in the IaC, causing issues while running Terraform commands like init, plan, and apply.

**Cause**: The AI occasionally uses older, deprecated values instead of the latest supported ones, leading to Terraform errors and warnings.

**Fix**: This issue has been resolved.

### In-ProgressPartial Resource Provision Or Destruction Not Reported Correctly in CLI Output

Click to view

**Summary**: While running `stackgen provision` or `stackgen destroy`, if the underlying IAC engine (Tofu or Terraform) fails partly in applying changes (e.g., fails on the 6th of 10 resources), the CLI only reports a general failure error. It does not inform the user that some resources were successfully created or destroyed prior to the failure. This can cause a misleading perception that the entire operation failed without any changes.

**Cause**: The CLI currently reports only the final status of the `stackgen provision` or `stackgen destroy` commands without parsing or presenting partial apply state or intermediate logs from Terraform or Tofu. As a result, users are unaware of partial success or failure unless they manually inspect the state file or backend.

**Workaround**: After any failed `stackgen provision` or `stackgen destroy`, run:

```bash
tofu show
```

or

```bash
terraform show
```

This will show you the resources in your state file in case of `stackgen provision` and ones that are yet to be destroyed in case of `stackgen destroy`.

### In-Progress`stackgen drift detect` Command Executes on Archived appStacks

Click to view

**Summary**: The `drift detect` command currently runs even when the target appStack is archived. Archived appStacks are expected to be inactive, and operational commands like `drift detect` should be restricted. Allowing drift checks on archived appStacks may lead to confusion and unintended operations.

**Cause**: The CLI/API does not validate the appStack's archived status before executing the `drift detect` command. As a result, the command proceeds even when the appStack should be considered inactive.

**Workaround**: Until a fix is implemented, you must manually avoid running the `drift detect` command on archived appStacks.

### Fixed Policies Not Added to appstacks Created via CLI

Click to view

**Summary**: While creating appStacks using the `stackgen appstack create` CLI command, no policies are added to the appStack, even though default policies are expected to be attached based on the selected cloud provider (AWS, GCP, Azure). This leads to a mismatch in behavior between appStacks created via CLI and those created through the UI.

**Cause**: The CLI did not trigger the default policy attachment logic during appStack creation. This resulted in policy-less appStacks, which may cause security compliance issues or unexpected behavior in downstream workflows.

**Fix**: This issue has been resolved in [August 2025](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#policies-are-not-getting-added-to-appstacks-created-via-cli) release.
