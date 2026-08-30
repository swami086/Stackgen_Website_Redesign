---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/autocomplete/fish"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/autocomplete/fish"
status: "ok"
---

The `stackgen completion fish` command generates an autocompletion script for Fish shell. This allows you to use the TAB key to complete StackGen commands, flags, and arguments in Fish.

## Usage

```bash
stackgen completion fish [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for fish |
| `--no-descriptions` | Disable completion descriptions |

**Examples**

### Generate the autocompletion script

```bash
stackgen completion fish > ~/.config/fish/completions/stackgen.fish
```

This command will:

- Generate the Fish completion script
- Save it to the Fish completions directory
- Fish automatically loads completions from this directory

### Verify the completion is working

```bash
stackgen [TAB]
```

Press TAB after typing "stackgen " to see the available subcommands.

note

- Fish automatically loads completion scripts from the ~/.config/fish/completions directory
- No additional steps are needed after placing the file in the correct location
- If you update the StackGen CLI, you may need to regenerate the completion script

- [Usage](/docs/stackgen/cli-guide/configuration/autocomplete/fish#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/autocomplete/fish#flags)
  - [Generate the autocompletion script](/docs/stackgen/cli-guide/configuration/autocomplete/fish#generate-the-autocompletion-script)
  - [Verify the completion is working](/docs/stackgen/cli-guide/configuration/autocomplete/fish#verify-the-completion-is-working)
