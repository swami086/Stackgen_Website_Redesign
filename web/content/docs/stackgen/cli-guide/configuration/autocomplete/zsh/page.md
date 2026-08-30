---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/autocomplete/zsh"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/autocomplete/zsh"
status: "ok"
---

The `stackgen completion zsh` command generates an autocompletion script for Zsh shell. This allows you to use the TAB key to complete StackGen commands, flags, and arguments in Zsh.

## Usage

```bash
stackgen completion zsh [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for zsh |
| `--no-descriptions` | Disable completion descriptions |

**Examples**

### Generate the autocompletion script

```bash
stackgen completion zsh > ~/.zsh_completions/_stackgen
```

This command will:

- Generate the Zsh completion script
- Save it to a file in your home directory

### Add the completion directory to your .zshrc file

```bash
echo "fpath=(~/.zsh_completions $fpath)" >> ~/.zshrc

echo "autoload -U compinit && compinit" >> ~/.zshrc
```

This command will:

- Add your completions directory to the fpath array
- Ensure the completion system is initialized
- Enable StackGen autocompletion for all new Zsh sessions

### Load the completion in your current session

```bash
fpath=(~/.zsh_completions $fpath)

autoload -U compinit && compinit
```

This command will:

- Update your fpath array to include the completions directory
- Initialize the completion system
- Make the StackGen autocompletion available immediately

note

- Zsh completions are more powerful than Bash completions but require proper setup
- If you already have completions set up, you might only need to place the file in your completions directory
- If you update the StackGen CLI, you may need to regenerate the completion script

- [Usage](/docs/stackgen/cli-guide/configuration/autocomplete/zsh#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/autocomplete/zsh#flags)
  - [Generate the autocompletion script](/docs/stackgen/cli-guide/configuration/autocomplete/zsh#generate-the-autocompletion-script)
  - [Add the completion directory to your .zshrc file](/docs/stackgen/cli-guide/configuration/autocomplete/zsh#add-the-completion-directory-to-your-zshrc-file)
  - [Load the completion in your current session](/docs/stackgen/cli-guide/configuration/autocomplete/zsh#load-the-completion-in-your-current-session)
