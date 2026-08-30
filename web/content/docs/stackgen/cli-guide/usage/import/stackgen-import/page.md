---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/import/stackgen-import"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/import/stackgen-import"
status: "ok"
---

The `stackgen import` command imports infrastructure configuration from supported sources (for example Terraform state).

## Usage

```bash
stackgen import [flags]

stackgen import [command]
```

## Flags (parent) [](/docs/stackgen/cli-guide/usage/import/stackgen-import#flags-parent%20%22Direct%20link%20to%20Flags%20(parent)")

| Flag | Type | Description |
| --- | --- | --- |
| `--appstack-id` | string | Appstack id to import into an existing appstack (creates a new appstack version). |
| `--appstack-name` | string | Appstack name to create when importing into a new appstack (must be unique). |
| `-f`, `--file` | string | Path to the source file (required when the flow uses a file). |
| `-h`, `--help` |  | Help for import. |

For `import state`, this site documents `--cloud-provider`, `-m` / `--mode`, and the file or appStack selectors on the [import state](/docs/stackgen/cli-guide/usage/import/stackgen-import-state) page.

## Subcommands

Here's an overview of the available subcommands:

### [state](/docs/stackgen/cli-guide/usage/import/stackgen-import-state)

Parses a Terraform state file (.tfstate) and imports the infrastructure configuration into a new or existing appStack. This subcommand automates the process of keeping your infrastructure in sync with your Terraform-managed resources by creating a new appStack or a new version of an existing one directly from the CLI. Ideal for CI/CD pipelines, it reduces manual work, ensures compliance, and supports seamless version control without needing to access the UI. Use this command to integrate Terraform-managed infrastructure into StackGen workflows efficiently.

- [Usage](/docs/stackgen/cli-guide/usage/import/stackgen-import#usage)
- [Flags (parent)](/docs/stackgen/cli-guide/usage/import/stackgen-import#flags-parent)
- [Subcommands](/docs/stackgen/cli-guide/usage/import/stackgen-import#subcommands)
  - [state](/docs/stackgen/cli-guide/usage/import/stackgen-import#state)
