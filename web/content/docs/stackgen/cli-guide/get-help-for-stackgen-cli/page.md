---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/get-help-for-stackgen-cli"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/get-help-for-stackgen-cli"
status: "ok"
---

The `stackgen help` command prints usage and flags for any command. `stackgen configure` is an alias for `stackgen login`, so `stackgen help configure` matches `stackgen help login`.

## Usage

```bash
stackgen help [command] [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Displays help information for the help command. |

**Examples**

#### Usage 1: Get help for a specific command

```bash
stackgen help appstack
```

The above command will:

- Provide help on the `appstack` command.
- Explain its usage, available subcommands, and flags.

#### Usage 2: Get help for the generate command

```bash
stackgen help generate
```

The above command will:

- Provide help on the `generate` command.
- Show the flags and usage details for generating IaC files.

#### Usage 3: Get help for login or configure

```bash
stackgen help login
```

The above command will:

- Provide help on `stackgen login` (authentication and server URL).
- Match `stackgen help configure` because `configure` is an alias for `login`.
