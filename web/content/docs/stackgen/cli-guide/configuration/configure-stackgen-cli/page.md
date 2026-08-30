---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/configure-stackgen-cli"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/configure-stackgen-cli"
status: "ok"
---

The `stackgen login` command is used to authenticate the StackGen CLI with your StackGen server URL and credentials. `stackgen configure` is an alias for `stackgen login` (same command).

## Usage

```bash
stackgen login [flags]
```

You can also run **`stackgen configure`** with the same flags.

## Flags

Command-specific flags for `stackgen login`:

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for login. |
| `--url string` | StackGen server URL. Optional if already in `~/.stackgen/config.yaml`; overrides config and `STACKGEN_URL` when set. |

`--project`, `--workspace`, `--interactive`, `--log`, `--output`, and `--stackgen-home` are global flags on this command. See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags).

If you omit `--project` on login, the CLI removes any saved project from the local config (personal workspace). If `STACKGEN_PROJECT` is set in the environment, that value is used and written to the config. Pass `--project` explicitly to set the default project. `--workspace` / `STACKGEN_WORKSPACE` are aliases for `--project` / `STACKGEN_PROJECT`.

### Examples

#### Usage 1: Basic login with URL and project

```bash
stackgen login --project=my_project_id --url https://my-stackgen-server.com
```

The above command will:

- Save the StackGen server URL (`https://my-stackgen-server.com`).
- Set the default project id to **`my_project_id`** in your local configuration.

#### Usage 2: Login with environment variables

```shell
export STACKGEN_PROJECT=my_project_id

export STACKGEN_URL=https://my-stackgen-server.com

stackgen login
```

The above commands use the environment variables so you do not have to pass `--url` or `--project` on the command line. Because `STACKGEN_PROJECT` is set, login writes that project into the config.

#### Usage 3: Interactive login

```shell
stackgen login --url https://my-stackgen-server.com --interactive
```

The above command will:

- Run `stackgen login` in interactive mode (`-i` / `--interactive`).
- Prompt for additional inputs if the CLI needs them.

## Logout

The `stackgen logout` command is used to clear your token and project from `~/.stackgen/config.yaml`. Run `stackgen login` again before you use authenticated commands.

## Usage

```bash
stackgen logout
```

### Examples

#### Usage 1: Log out of the CLI

```bash
stackgen logout
```

The above command will remove saved credentials from your local StackGen config.

## Whoami

The `stackgen whoami` command is used to verify authentication and print account details such as name, email, and current project.

## Usage

```bash
stackgen whoami
```

### Examples

#### Usage 1: Show the logged-in user

```bash
stackgen whoami
```

The above command will print the logged-in user and the active project.

- [Usage](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#usage)
- [Flags](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#flags)
  - [Examples](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#examples)
- [Logout](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#logout)
- [Usage](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#usage-1)
  - [Examples](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#examples-1)
- [Whoami](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#whoami)
- [Usage](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#usage-2)
  - [Examples](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#examples-2)
