---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/autocomplete/autocomplete-for-stackgen"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/autocomplete/autocomplete-for-stackgen"
status: "ok"
---

The `stackgen completion` command generates autocompletion scripts for various shells to enhance your command-line experience with the StackGen CLI. This makes it easier to use StackGen commands by providing tab completion for commands, flags, and arguments.

## Usage

```bash
stackgen completion [command]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for completion. |

Shell subcommands (`bash`, `fish`, `powershell`, `zsh`) add their own flags (for example `--no-descriptions` on bash). See the per-shell pages below and [Global flags](/docs/stackgen/cli-guide/usage/global-flags).

## Subcommands

Here's an overview of the available subcommands:

### [bash](/docs/stackgen/cli-guide/configuration/autocomplete/bash)

Generate the autocompletion script for Bash shell. This subcommand creates a script that provides tab completion for StackGen commands, significantly improving your productivity when working with the CLI in Bash environments, which are common in Linux distributions and macOS.

### [fish](/docs/stackgen/cli-guide/configuration/autocomplete/fish)

Generate the autocompletion script for Fish shell. This subcommand helps users of the Fish shell get intelligent tab completion for StackGen commands. Fish is a smart and user-friendly shell that is becoming increasingly popular among developers.

### [powershell](/docs/stackgen/cli-guide/configuration/autocomplete/powershell)

Generate the autocompletion script for PowerShell. This subcommand creates completion scripts for Microsoft PowerShell, making it easier to work with StackGen CLI on Windows systems or for users who prefer PowerShell on other platforms.

### [zsh](/docs/stackgen/cli-guide/configuration/autocomplete/zsh)

Generate the autocompletion script for Zsh shell. This subcommand provides tab completion support for the Z shell (Zsh), which is the default shell in macOS and a popular alternative to Bash on many Linux distributions.

- [Usage](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#flags)
- [Subcommands](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#subcommands)
  - [bash](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#bash)
  - [fish](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#fish)
  - [powershell](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#powershell)
  - [zsh](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen#zsh)
