---
title: "Key Benefits"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/import"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/import"
status: "ok"
---

The **`tfstate` to appStack** feature is a CLI-based automation for importing Terraform state files (`.tfstate`) into StackGen, making it easier to keep your infrastructure state in sync and continuously compliant.

note

To import existing **Terraform configuration** (`.tf`, `env/`, and modules), use the [**Terraform Importer**](/docs/stackgen/cli-guide/terraform-importer) CLI (`terraform-importer`), not `stackgen import state`.

Instead of manually uploading state files or managing versions through the StackGen User Interface, you can now run a single CLI command to import a state file and either create a new appStack or a new version of an existing appStack. This streamlines your workflow, supports CI/CD integration, and reduces the risk of human error in critical infrastructure processes.

Often, your team uses StackGen in an iterative workflow to ensure infrastructure compliance. A typical process involves:

1. Importing the initial state file (`.tfstate` v1) into StackGen, making changes to the same, and deploying it.
2. After subsequent infrastructure updates, deploy it again and re-import the updated state (`.tfstate` v2) to validate compliance and identify security risks.

To streamline this process, you can use the StackGen CLI to automate the import of your `.tfstate` file. You can now:

- [Create new appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#usage-guide)
- [Create a new version of an existing appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#usage-guide)

This will reduce manual overhead and enable tighter CI/CD integrations, and your:

- Infrastructure teams can run a script that automatically runs `stackgen import state` to sync the updated state into StackGen after a `terraform apply`.
- Security and DevOps projects can then review changes, validate compliance, and push new versions.

**Example**: After provisioning a new environment using Terraform, the state file is automatically pushed to StackGen so that you can:

- Create a new appStack version.
- Trigger compliance scans.
- Review diffs between previous and current states.

### Key Benefits

- **Increased Efficiency**: Reduces manual steps in syncing `.tfstate` file with StackGen.
- **Improved Security**: Enables real-time compliance checks after every infrastructure change.
- **CI/CD Integration**: Facilitates continuous compliance by embedding StackGen into DevOps workflows.
- **Ease of use**: Eliminates friction in recurring workflows.
