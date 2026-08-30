---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/create"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/create"
status: "ok"
---

The `stackgen appstack create` command creates an empty appStack, or creates one from an appStack that has the `template` label (the same stacks shown under **Templates** in the UI).

Use [`stackgen appstack list-templates`](/docs/stackgen/cli-guide/usage/appstack/list-templates) to see valid templates. Name resolution for `--template` matches other `appstack` commands within the current project.

## Usage

```bash
stackgen appstack create [flags]
```

## Flags (command) [](/docs/stackgen/cli-guide/usage/appstack/create#flags-command%20%22Direct%20link%20to%20Flags%20(command)")

| Flag | Description |
| --- | --- |
| `--appstack-name string` | Name for the new appStack (optional with `--template`). |
| `--cloud-provider string` | `aws`, `gcp`, `azure`, `civo`, `oci`, `other` (default `aws`). |
| `--skip-policies` | Skip default compliance policies. |
| `--template string` | Template appStack UUID or name (unique in the current project). |
| `-h`, `--help` | Help for `create`. |

## Global flags (with this command) [](/docs/stackgen/cli-guide/usage/appstack/create#global-flags-with-this-command%20%22Direct%20link%20to%20Global%20flags%20(with%20this%20command)")

You can combine **`stackgen appstack create`** with the usual globals, for example **`-i` / `--interactive`**, **`--log`**, **`-o` / `--output`**, **`--project`**, **`--workspace`**, **`--stackgen-home`**. See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags). Use **`STACKGEN_PROJECT`** or **`STACKGEN_WORKSPACE`** for the default project when you do not pass **`--project`** / **`--workspace`**.

## Copy-paste CLI examples

Every block below uses **only** the command flags in the [Flags (command)](/docs/stackgen/cli-guide/usage/appstack/create#flags-command) table plus **global** flags from [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags).

### Empty appStack (AWS default) [](/docs/stackgen/cli-guide/usage/appstack/create#empty-appstack-aws-default%20%22Direct%20link%20to%20Empty%20appStack%20(AWS%20default)")

```bash
stackgen appstack create \
  --appstack-name my-app \
  --cloud-provider aws
```

### Skip default compliance policies

```bash
stackgen appstack create \
  --appstack-name my-app \
  --cloud-provider aws \
  --skip-policies
```

### Create from a template

```bash
stackgen appstack list-templates

stackgen appstack create \
  --template <template-uuid-or-name> \
  --appstack-name my-app-from-template
```

If you omit `--appstack-name` when using `--template`, the CLI creates a new stack with an auto-generated name.

### Interactive

```bash
stackgen appstack create -i
```

Same as **`stackgen appstack create --interactive`**.

### With a project (global) [](/docs/stackgen/cli-guide/usage/appstack/create#with-a-project-global%20%22Direct%20link%20to%20With%20a%20project%20(global)")

```bash
stackgen appstack create \
  --appstack-name my-app \
  --cloud-provider aws \
  --project my-project-id
```

### JSON command output (global) [](/docs/stackgen/cli-guide/usage/appstack/create#json-command-output-global%20%22Direct%20link%20to%20JSON%20command%20output%20(global)")

```bash
stackgen appstack create \
  --appstack-name my-app \
  --cloud-provider aws \
  --output json
```

### Debug logging (global) [](/docs/stackgen/cli-guide/usage/appstack/create#debug-logging-global%20%22Direct%20link%20to%20Debug%20logging%20(global)")

```bash
stackgen appstack create \
  --appstack-name my-app \
  --cloud-provider aws \
  --log 2
```

- [Usage](/docs/stackgen/cli-guide/usage/appstack/create#usage)
- [Flags (command)](/docs/stackgen/cli-guide/usage/appstack/create#flags-command)
- [Global flags (with this command)](/docs/stackgen/cli-guide/usage/appstack/create#global-flags-with-this-command)
- [Copy-paste CLI examples](/docs/stackgen/cli-guide/usage/appstack/create#copy-paste-cli-examples)
  - [Empty appStack (AWS default)](/docs/stackgen/cli-guide/usage/appstack/create#empty-appstack-aws-default)
  - [Skip default compliance policies](/docs/stackgen/cli-guide/usage/appstack/create#skip-default-compliance-policies)
  - [Create from a template](/docs/stackgen/cli-guide/usage/appstack/create#create-from-a-template)
  - [Interactive](/docs/stackgen/cli-guide/usage/appstack/create#interactive)
  - [With a project (global)](/docs/stackgen/cli-guide/usage/appstack/create#with-a-project-global)
  - [JSON command output (global)](/docs/stackgen/cli-guide/usage/appstack/create#json-command-output-global)
  - [Debug logging (global)](/docs/stackgen/cli-guide/usage/appstack/create#debug-logging-global)
