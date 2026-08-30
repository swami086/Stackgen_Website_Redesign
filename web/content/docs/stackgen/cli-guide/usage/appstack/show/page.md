---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/show"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/show"
status: "ok"
---

The `stackgen appstack show` command is used to list appStacks and ids for use with other commands. It is an alias of `stackgen appstack list`.

## Usage

```bash
stackgen appstack list [flags]
```

## Aliases

```text
list, show, ls
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for list. |
| `--include-archived` | List archived appStacks as well as active ones (archived stacks are hidden by default). |
| `-l, --include-labels` | Show labels for appStacks. |

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, and `--stackgen-home`.

**Examples**

### Show all appStacks

```bash
stackgen appstack show
```

This command will:

- Display a list of all available appStacks
- Show each appStack's name, id, versions, and related fields (and labels when `--include-labels` is set)

### Use an alias to list all appStacks

```bash
stackgen appstack list
```

```bash
stackgen appstack ls
```

These commands provide the same output as `stackgen appstack show`.

## Output Format

The command output typically includes:

- appStack ID
- appStack Name
- Creation Date
- Last Modified Date
- Available Versions
- Status

This information is essential for referencing appStacks in other commands such as `download-iac`, `delete`, `create --template`, or `list-templates`.

- [Usage](/docs/stackgen/cli-guide/usage/appstack/show#usage)
- [Aliases](/docs/stackgen/cli-guide/usage/appstack/show#aliases)
- [Flags](/docs/stackgen/cli-guide/usage/appstack/show#flags)
  - [Show all appStacks](/docs/stackgen/cli-guide/usage/appstack/show#show-all-appstacks)
  - [Use an alias to list all appStacks](/docs/stackgen/cli-guide/usage/appstack/show#use-an-alias-to-list-all-appstacks)
