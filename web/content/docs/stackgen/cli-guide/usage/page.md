---
title: "Command Groups"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage"
status: "ok"
---

## Command Groups

StackGen CLI commands are grouped by purpose, such as Infrastructure Lifecycle Management, appStack Management, and authentication.

We've listed the grouping below:

### ILM Commands

| Command | Description |
| --- | --- |
| [**`destroy`**](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra) | Teardown your infrastructure |
| [**`drift`**](/docs/stackgen/cli-guide/usage/drifts) | Detect and manage infrastructure drift |
| [**`provision`**](/docs/stackgen/cli-guide/usage/provision-infra-with-cli) | Init and plan appStack IaC by default; add `--apply` to apply changes |

### appStack Management Commands

| Command | Description |
| --- | --- |
| [**`appstack`**](/docs/stackgen/cli-guide/usage/appstack) | Manage appStacks for complex codegen |
| [**`import`**](/docs/stackgen/cli-guide/usage/import) | Import infrastructure to StackGen (Terraform state) |

### Authentication Commands

| Command | Description |
| --- | --- |
| [**`login`**](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli) | Authenticate the CLI (`configure` is an alias) |
| [**`logout`**](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#logout) | Clear token and project from local config |
| [**`whoami`**](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli#whoami) | Show authenticated account and project |

### AI Commands

| Command | Description |
| --- | --- |
| [**`ai`**](/docs/stackgen/cli-guide/usage/ai) | Manage Aiden resources, workflows, sessions, and Knowledge Hubs |

### Other Commands

| Command | Description |
| --- | --- |
| [**`policies`**](/docs/stackgen/cli-guide/usage/policies) | List, inspect, and upload organization policies |
| [**`preference`**](/docs/stackgen/cli-guide/configuration/preference-key) | Get, set, and list preference keys (not listed in root `stackgen -h`) |
| [**`project`**](/docs/stackgen/cli-guide/usage/viewprojects) | Retrieve and manage projects within StackGen |
| [**`resource`**](/docs/stackgen/cli-guide/usage/manage/manage-resources-in-cli) | Resource management commands |
| [**`run`**](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle) | Execute any tofu or terraform command |
| [**`state`**](/docs/stackgen/cli-guide/usage/state) | Manage OpenTofu or Terraform state |
| [**`upload`**](/docs/stackgen/cli-guide/usage/upload/upload-resources) | Upload custom modules and security rules |

### Additional Commands

| Command | Description |
| --- | --- |
| [**`completion`**](/docs/stackgen/cli-guide/configuration/autocomplete/autocomplete-for-stackgen) | Generate the autocompletion script for the specified shell |
| [**`help`**](/docs/stackgen/cli-guide/get-help-for-stackgen-cli) | Help about any command |
| [**`mcp`**](/docs/stackgen/stackgen-mcp) | Start the MCP stdio server for LLM integrations |
| [**`version`**](/docs/stackgen/cli-guide/configuration/check-stackgen-version) | Prints the version of the stackgen cli |

note

`stackgen generate` still runs for project-level IaC generation, but it is **not** listed in root `stackgen -h`. Prefer [`stackgen appstack download-iac`](/docs/stackgen/cli-guide/usage/appstack/download-iac) for a specific appStack. See [generate](/docs/stackgen/cli-guide/usage/generate-iac).

### Standalone CLIs

These tools ship separately from the `stackgen` binary:

| CLI | Description |
| --- | --- |
| [**terraform-importer**](/docs/stackgen/cli-guide/terraform-importer) | Import existing Terraform configuration into StackGen |
| [**cloud2code**](/docs/stackgen/cli-guide/cloud2code) | Generate Terraform state files from cloud resources |

## Quick Commands

Click to view

### Help on Usage

```shell
stackgen help
```

### Enter the CLI Container

```shell
docker run -it --rm -p 50525:50525 -v ~/.stackgen:/home/stackgen/.stackgen ghcr.io/stackgenhq/stackgen:latest
```

note

This will switch the terminal prompt to the StackGen CLI container where StackGen can be run.

### Login or Configure Authentication

```shell
stackgen login
```

You can also run `stackgen configure` (alias for `stackgen login`).

note

This will present you with a clickable link to copy and paste into your browser on your main machine to complete login.

### Connect to a Repository

```shell
export STACKGEN_GIT_AUTH_TOKEN={token with readonly access to desired repositories}
```

### Create an appStack

```shell
stackgen appstack create --appstack-name my-app --cloud-provider aws
```

### Create from a template

```shell
stackgen appstack list-templates

stackgen appstack create --template <template-uuid-or-name> --appstack-name my-app-from-template
```

### List appStacks

```shell
stackgen appstack list
```

Aliases: `show`, `ls`.

### List template appStacks

```shell
stackgen appstack list-templates
```

### Download IaC for an appStack

```shell
stackgen appstack download-iac --appstack <appStack-id-or-name> --destination <path/to/file.zip>
```

note

By default, the `docker run` command above creates a volume in `/app/.stackgen` in the container, so any files written there will be synced to `~/.stackgen` on the host machine.

### Provision (plan, or plan and apply) [](/docs/stackgen/cli-guide/usage#provision-plan-or-plan-and-apply%20%22Direct%20link%20to%20Provision%20(plan,%20or%20plan%20and%20apply)")

```shell
stackgen provision --appstack <appStack-id-or-name> -e <environment>

stackgen provision --appstack <appStack-id-or-name> -e <environment> --apply -v

stackgen provision --appstack <appStack-id-or-name> -e <environment> -S -F
```

Use `-v` when you want Terraform or OpenTofu stdout, including **Outputs**, printed after apply. See [appStack Outputs](/docs/stackgen/concepts/topology/appstack-outputs).

Use `-S` / `--security-scan` to scan the plan against security policies. Add `-F` / `--fail-on-violation` to exit non-zero when violations are found (requires `--security-scan`).

- [Command Groups](/docs/stackgen/cli-guide/usage#command-groups)
  - [ILM Commands](/docs/stackgen/cli-guide/usage#ilm-commands)
  - [appStack Management Commands](/docs/stackgen/cli-guide/usage#appstack-management-commands)
  - [Authentication Commands](/docs/stackgen/cli-guide/usage#authentication-commands)
  - [AI Commands](/docs/stackgen/cli-guide/usage#ai-commands)
  - [Other Commands](/docs/stackgen/cli-guide/usage#other-commands)
  - [Additional Commands](/docs/stackgen/cli-guide/usage#additional-commands)
  - [Standalone CLIs](/docs/stackgen/cli-guide/usage#standalone-clis)
- [Quick Commands](/docs/stackgen/cli-guide/usage#quick-commands)
  - [Help on Usage](/docs/stackgen/cli-guide/usage#help-on-usage)
  - [Enter the CLI Container](/docs/stackgen/cli-guide/usage#enter-the-cli-container)
  - [Login or Configure Authentication](/docs/stackgen/cli-guide/usage#login-or-configure-authentication)
  - [Connect to a Repository](/docs/stackgen/cli-guide/usage#connect-to-a-repository)
  - [Create an appStack](/docs/stackgen/cli-guide/usage#create-an-appstack)
  - [Create from a template](/docs/stackgen/cli-guide/usage#create-from-a-template)
  - [List appStacks](/docs/stackgen/cli-guide/usage#list-appstacks)
  - [List template appStacks](/docs/stackgen/cli-guide/usage#list-template-appstacks)
  - [Download IaC for an appStack](/docs/stackgen/cli-guide/usage#download-iac-for-an-appstack)
  - [Provision (plan, or plan and apply)](/docs/stackgen/cli-guide/usage#provision-plan-or-plan-and-apply)
