---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/drifts/stackgendrift"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/drifts/stackgendrift"
status: "ok"
---

The `stackgen drift` command enables Drift detection on your IaC and compares your current infrastructure state with the desired state defined in your IaC.

It identifies resources that have been created, updated, or deleted outside of your IaC management.

## Usage

```bash
stackgen drift [command]
```

## Available commands

| Command | Description |
| --- | --- |
| `detect` | Detect drift in infrastructure |

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for drift. |

### Global flags

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, `--stackgen-home`, and other options.

## Subcommands

### [detect](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect)

Drift detection compares live resources to Terraform definitions so you can spot changes outside IaC. Use the CLI or the StackGen UI to review results.

- [Usage](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#usage)
- [Available commands](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#available-commands)
- [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#flags)
  - [Global flags](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#global-flags)
- [Subcommands](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#subcommands)
  - [detect](/docs/stackgen/cli-guide/usage/drifts/stackgendrift#detect)
