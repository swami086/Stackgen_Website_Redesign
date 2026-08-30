---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/autocomplete/bash"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/autocomplete/bash"
status: "ok"
---

The `stackgen completion bash` command generates an autocompletion script for Bash shell. This allows you to use the TAB key to complete StackGen commands, flags, and arguments in Bash.

## Usage

```bash
stackgen completion bash [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for bash |
| `--no-descriptions` | Disable completion descriptions |

**Examples**

### Generate the autocompletion script

```bash
stackgen completion bash > ~/.stackgen-completion.bash
```

This command will:

- Generate the Bash completion script
- Save it to a file in your home directory

### Add the completion script to your .bashrc file

```bash
echo "source ~/.stackgen-completion.bash" >> ~/.bashrc
```

This command will:

- Add a line to your .bashrc file that sources the completion script
- Enable StackGen autocompletion for all new Bash sessions

### Load the completion script in your current session

```bash
source ~/.stackgen-completion.bash
```

This command will:

- Load the completion script in your current Bash session
- Immediately enable StackGen autocompletion without needing to start a new shell

note

- The generated script must be sourced in your shell configuration to enable completions
- For temporary use, you can pipe the output directly to a source command: `source <(stackgen completion bash)`
- If you update the StackGen CLI, you may need to regenerate the completion script

- [Usage](/docs/stackgen/cli-guide/configuration/autocomplete/bash#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/autocomplete/bash#flags)
  - [Generate the autocompletion script](/docs/stackgen/cli-guide/configuration/autocomplete/bash#generate-the-autocompletion-script)
  - [Add the completion script to your .bashrc file](/docs/stackgen/cli-guide/configuration/autocomplete/bash#add-the-completion-script-to-your-bashrc-file)
  - [Load the completion script in your current session](/docs/stackgen/cli-guide/configuration/autocomplete/bash#load-the-completion-script-in-your-current-session)
