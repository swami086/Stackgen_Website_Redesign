---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/generate-iac"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/generate-iac"
status: "ok"
---

The `stackgen generate` command generates Infrastructure as Code files for a project. If the output directory you pass does not exist, StackGen tries to create it. If you omit the directory, output goes to the current working directory.

## Usage

```bash
stackgen generate [flags]
```

## Flags

`stackgen generate` uses the global flags in [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags) (`--interactive`, `--log`, `--output`, `--project`, `--stackgen-home`) plus `-h` / `--help`. There are no separate command-only flags.

note

`stackgen generate` still runs (`stackgen generate -h`), but it is **not** listed under the root `stackgen -h` command groups. Prefer [`stackgen appstack download-iac`](/docs/stackgen/cli-guide/usage/appstack/download-iac) when you need IaC for a specific appStack.

### Examples

#### Run generate with debug logging

```bash
stackgen generate --log 2
```

The above command runs `stackgen generate` with log level DEBUG (numeric `2`).

#### Run generate with JSON output

```bash
stackgen generate --output json
```

The above command prints command output as JSON. Allowed `--output` values are `json` and `human`.

- [Usage](/docs/stackgen/cli-guide/usage/generate-iac#usage)
- [Flags](/docs/stackgen/cli-guide/usage/generate-iac#flags)
  - [Examples](/docs/stackgen/cli-guide/usage/generate-iac#examples)
