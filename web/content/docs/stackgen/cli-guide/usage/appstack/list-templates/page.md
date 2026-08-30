---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/list-templates"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/list-templates"
status: "ok"
---

The `stackgen appstack list-templates` command lists appStacks in the current project that have the `template` label. These are the same stacks shown under **Templates** in the UI. Use the name or UUID with [`stackgen appstack create --template`](/docs/stackgen/cli-guide/usage/appstack/create).

## Usage

```bash
stackgen appstack list-templates [flags]
```

## Aliases

```text
list-templates, templates
```

## Flags

| Flag | Description |
| --- | --- |
| `--include-archived` | Include archived template appStacks. |
| `-h`, `--help` | Help for `list-templates`. |

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, and `--stackgen-home`.

**Examples**

### List template appStacks

```bash
stackgen appstack list-templates
```

This command will:

- List appStacks in the current project that have the `template` label
- Show each stack's name and UUID for use with `stackgen appstack create --template`

### Include archived templates

```bash
stackgen appstack list-templates --include-archived
```

### Use the alias

```bash
stackgen appstack templates
```

This command provides the same output as `stackgen appstack list-templates`.

note

For enterprise template sharing and module compatibility when creating from a template in the UI, see [IaC from Templates](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates).

- [Usage](/docs/stackgen/cli-guide/usage/appstack/list-templates#usage)
- [Aliases](/docs/stackgen/cli-guide/usage/appstack/list-templates#aliases)
- [Flags](/docs/stackgen/cli-guide/usage/appstack/list-templates#flags)
  - [List template appStacks](/docs/stackgen/cli-guide/usage/appstack/list-templates#list-template-appstacks)
  - [Include archived templates](/docs/stackgen/cli-guide/usage/appstack/list-templates#include-archived-templates)
  - [Use the alias](/docs/stackgen/cli-guide/usage/appstack/list-templates#use-the-alias)
