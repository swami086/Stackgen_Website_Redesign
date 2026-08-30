---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack"
status: "ok"
---

The `stackgen appstack` command is used to manage appStacks for complex infrastructure code generation. This command provides several subcommands for creating, listing, downloading, and deleting appStacks.

## Usage

```bash
stackgen appstack [command]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for appstack. |

Each subcommand has its own flags on the pages linked below.

## Subcommands

Here's an overview of the available subcommands from `stackgen appstack -h`:

### [create](/docs/stackgen/cli-guide/usage/appstack/create)

Creates an empty appStack, or creates one from a template appStack (`--template`) that has the `template` label. Use [`list-templates`](/docs/stackgen/cli-guide/usage/appstack/list-templates) to see valid templates.

### [delete](/docs/stackgen/cli-guide/usage/appstack/delete)

Removes an appStack from the system. Includes a confirmation prompt that you can skip with `-y` / `--yes`.

### [download-iac](/docs/stackgen/cli-guide/usage/appstack/download-iac)

Downloads the Infrastructure as Code (IaC) files generated for an appStack as a zip (optionally unpacked).

### [list](/docs/stackgen/cli-guide/usage/appstack/show) (`show`, `ls`)

Lists appStacks and IDs. Aliases: `show`, `ls`. Supports `--include-archived` and `-l` / `--include-labels`.

### [list-templates](/docs/stackgen/cli-guide/usage/appstack/list-templates) (`templates`)

Lists appStacks in the current project that have the `template` label. Use the name or UUID with `create --template`.

### [status](/docs/stackgen/cli-guide/usage/appstack/status)

Checks the current status of an appStack.

note

StackGen moved day-to-day appStack history to [Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots). `stackgen appstack create-version` still runs, but it is **not** listed in `stackgen appstack -h` and is not recommended for new work. See [create-version](/docs/stackgen/cli-guide/usage/appstack/create-version).

- [Usage](/docs/stackgen/cli-guide/usage/appstack#usage)
- [Flags](/docs/stackgen/cli-guide/usage/appstack#flags)
- [Subcommands](/docs/stackgen/cli-guide/usage/appstack#subcommands)
  - [create](/docs/stackgen/cli-guide/usage/appstack#create)
  - [delete](/docs/stackgen/cli-guide/usage/appstack#delete)
  - [download-iac](/docs/stackgen/cli-guide/usage/appstack#download-iac)
  - [list (`show`, `ls`)](/docs/stackgen/cli-guide/usage/appstack#list-show-ls)
  - [list-templates (`templates`)](/docs/stackgen/cli-guide/usage/appstack#list-templates-templates)
  - [status](/docs/stackgen/cli-guide/usage/appstack#status)
