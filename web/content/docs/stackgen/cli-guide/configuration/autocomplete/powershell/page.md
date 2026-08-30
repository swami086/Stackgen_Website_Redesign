---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/autocomplete/powershell"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/autocomplete/powershell"
status: "ok"
---

The `stackgen completion powershell` command generates an autocompletion script for PowerShell. This allows you to use the TAB key to complete StackGen commands, flags, and arguments in PowerShell.

## Usage

```powershell
stackgen completion powershell [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for powershell |
| `--no-descriptions` | Disable completion descriptions |

**Examples**

### Generate the autocompletion script

```powershell
stackgen completion powershell > $HOME\Documents\WindowsPowerShell\stackgen.ps1
```

This command will:

- Generate the PowerShell completion script
- Save it to your PowerShell user profile directory

### Add the completion script to your PowerShell profile

```powershell
echo ". $HOME\Documents\WindowsPowerShell\stackgen.ps1" >> $PROFILE
```

This command will:

- Add a line to your PowerShell profile that sources the completion script
- Enable StackGen autocompletion for all new PowerShell sessions

### Load the completion script in your current session

```powershell
. $HOME\Documents\WindowsPowerShell\stackgen.ps1
```

This command will:

- Load the completion script in your current PowerShell session
- Immediately enable StackGen autocompletion without restarting PowerShell

note

- The PowerShell profile may not exist by default; you might need to create it first
- You may need to set your execution policy to allow running scripts: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
- If you update the StackGen CLI, you may need to regenerate the completion script

- [Usage](/docs/stackgen/cli-guide/configuration/autocomplete/powershell#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/autocomplete/powershell#flags)
  - [Generate the autocompletion script](/docs/stackgen/cli-guide/configuration/autocomplete/powershell#generate-the-autocompletion-script)
  - [Add the completion script to your PowerShell profile](/docs/stackgen/cli-guide/configuration/autocomplete/powershell#add-the-completion-script-to-your-powershell-profile)
  - [Load the completion script in your current session](/docs/stackgen/cli-guide/configuration/autocomplete/powershell#load-the-completion-script-in-your-current-session)
