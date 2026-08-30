---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/provision-infra-with-cli"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/provision-infra-with-cli"
status: "ok"
---

## Prerequisites

Install the following before you provision or deploy appStacks:

- **Terraform**: [Install Terraform](https://developer.hashicorp.com/terraform/install).
- **OpenTofu**: [Install OpenTofu](https://opentofu.org/docs/intro/install/).

The `terraform` and `tofu` binaries must be on your `PATH` when you use each engine. To upgrade the StackGen CLI, see [Install and uninstall](/docs/stackgen/cli-guide/get-started/install-and-uninstall).

note

Local CLI **provision** and **drift** runs sync logs into the StackGen UI ( **CLI Runs** / Action Runs). Use a current StackGen CLI. Older CLI versions will not work for provision and drift after this change. See [CLI Runs](/docs/stackgen/concepts/cliruns).

The `stackgen provision` command is used to run the IaC workflow for an exported appStack. When you omit `--apply`, the CLI runs init and plan only (preview, no apply). Add `--apply` to apply in the same run. Cloud credentials must already be configured.

## `stackgen provision`

### Usage

```bash
stackgen provision [flags]
```

note

Without `--apply`, `stackgen provision` runs init and plan only (preview). It does not apply. Add `--apply` when you want apply in the same CLI run.

Updating governance in the UI does not retroactively swap policies on existing appStacks. Teams that need new enforcement sometimes create new appStacks. See [Creating appStacks](/docs/stackgen/concepts/appstacks/createappstacks).

### Flags

| Flag | Description |
| --- | --- |
| `--apply` | When set: preview and apply (no extra approval in the CLI). When omitted: init and plan only. |
| `--appstack string` | AppStack UUID or name to provision. Use `stackgen appstack list`, `show`, or `ls` for names and ids. |
| `--backend-config stringArray` | Backend config as `key=value` or path to an HCL file. Repeatable. Example: `--backend-config='bucket=my-bucket'` or `--backend-config=./backend.conf`. |
| `--ci-job-url string` | URL of the CI job that triggered the CLI command. |
| `--cloud-profile string` | Specify the credential profile to use for provisioning the infrastructure. This works only for AWS. For other clouds, please make sure default credentials are set. |
| `-e`, `--environment string` | Name of the environment that belongs to the provided appStack. |
| `-F`, `--fail-on-violation` | Exit with a non-zero status when policy violations are found (requires `--security-scan`). |
| `-h`, `--help` | Help for provision |
| `--iac-tool string` | IaC tool: `terraform` or `tofu` (default `terraform`). See [IaC tool and infrastructure lifecycle](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle). |
| `--restrict-output-access` | Do not make resource attributes available to other appStacks. |
| `-S`, `--security-scan` | Scan the plan JSON against security policies after plan. |
| `--var stringArray` | Input variable value. Repeatable. Example: `--var='region=us-west-1'`. |
| `--var-file string` | Vars file path. Default `terraform.tfvars.json` in the working directory. |
| `-v`, `--verbose` | Print each OpenTofu/Terraform subprocess invocation and captured stdout/stderr to stderr. |

**Examples**

#### Usage 1: Init and plan only (no apply) [](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#usage-1-init-and-plan-only-no-apply%20%22Direct%20link%20to%20Usage%201:%20Init%20and%20plan%20only%20(no%20apply)")

```bash
stackgen provision --appstack <appstack-id-or-name> --cloud-profile <aws-profile> --var 'region=us-west-2'
```

The above command will run init and plan for the specified appStack using the given AWS profile and region. It does not apply changes because `--apply` is omitted.

#### Usage 2: Init and plan with backend configuration and environment

```bash
stackgen provision --appstack <appstack-id-or-name> --backend-config 'bucket=my-bucket' --environment dev
```

The above command will run init and plan (still no apply). It will:

- Use the provided backend configuration for the storage bucket.
- Pass the environment name `dev` for the appStack (`-e` / `--environment`).

It does not apply infrastructure until you run again with `--apply` (or use a separate apply flow).

#### Usage 3: Plan and apply changes

```bash
stackgen provision --appstack <appstack-id-or-name> --apply --var 'region=us-west-1'
```

The above command will preview and apply infrastructure changes for the specified appStack without further approval in the CLI because `--apply` is set.

#### Usage 4: Apply with verbose OpenTofu or Terraform output

```bash
stackgen provision --appstack <appstack-id-or-name> --apply -v
```

The above command will:

- Run init, plan, and apply for the appStack.
- Print each OpenTofu or Terraform subprocess to stderr, including captured stdout from apply.
- Show Terraform **Outputs** in that stdout when the appStack defines outputs. See [appStack Outputs](/docs/stackgen/concepts/topology/appstack-outputs).

When apply finishes, verbose stdout can look like this:

```text
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

arn = "arn:aws:s3:::my-bucket"

bucket = "my-bucket"
```

Output names and values match what you configured in the appStack. Without `-v`, the CLI does not print this subprocess output.

#### Usage 5: Plan with security scan and fail on violations

```bash
stackgen provision --appstack <appstack-id-or-name> -e <environment> -S -F
```

The above command will:

- Run init and plan for the appStack.
- Scan the plan JSON against security policies (`-S` / `--security-scan`).
- Exit with a non-zero status when policy violations are found (`-F` / `--fail-on-violation`).

## IaC tool and infrastructure lifecycle

StackGen supports [OpenTofu](https://opentofu.org/) and HashiCorp Terraform for infrastructure lifecycle management (ILM). Use `--iac-tool=terraform` or `--iac-tool=tofu` on commands that expose the flag so teams can align with the engine they standardize on.

When you omit `--iac-tool`, **`stackgen provision`** and **`stackgen destroy`** use Terraform (`terraform`). Use `--iac-tool=tofu` when you want OpenTofu instead.

note

ILM commands that support `--iac-tool` include **`stackgen provision`** (this page), **`stackgen destroy`**, and **`stackgen drift detect`**. Run `stackgen <command> --help` for the full flag list.

### `iac-tool` values

| Value | Description |
| --- | --- |
| `tofu` | Run the workflow with OpenTofu. |
| `terraform` | Run the workflow with HashiCorp Terraform. |

### Examples with `--iac-tool`

Provision with OpenTofu (init and plan only unless you add `--apply`):

```bash
stackgen provision --appstack <appstack-id-or-name> --cloud-profile <aws-profile> --iac-tool=tofu --var 'region=us-west-2'
```

Detect drift with OpenTofu:

```bash
stackgen drift detect --appstack <appstack-id-or-name> --iac-tool=tofu --var 'region=us-west-2'
```

Destroy infrastructure with OpenTofu:

```bash
stackgen destroy --appstack <appstack-id-or-name> --iac-tool=tofu --var 'region=us-east-2'
```

Add **`--apply`** on `stackgen destroy` when your workflow requires it to perform the teardown, consistent with that command's documentation.

## `stackgen run`

Use `stackgen run` to execute any `tofu` or `terraform` command against appStack IaC. Put StackGen flags before `--`. Everything after `--` is passed to the IaC tool.

### Usage

```bash
stackgen run [flags] -- <tofu|terraform> <command> [flags]
```

### Flags

| Flag | Description |
| --- | --- |
| `--appstack string` | AppStack UUID or name in the current project. Use `stackgen appstack list` for names and ids. |
| `--detached` | Skip downloading IaC files. |
| `--env-profile string` | Environment profile of the appStack. |
| `-h`, `--help` | Help for run. |
| `--sync` | Synchronize the CLI action with StackGen. |
| `--work-dir string` | Directory path for the IaC files. |

See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, and `--stackgen-home`.

**Examples**

```bash
stackgen run --appstack <appstack-id-or-name> --env-profile dev -- tofu plan

stackgen run --appstack <appstack-id-or-name> --env-profile dev -- terraform init
```

- [Prerequisites](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#prerequisites)
- [`stackgen provision`](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#stackgen-provision)
  - [Usage](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#usage)
  - [Flags](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#flags)
- [IaC tool and infrastructure lifecycle](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle)
  - [`iac-tool` values](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-values)
  - [Examples with `--iac-tool`](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#examples-with---iac-tool)
- [`stackgen run`](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#stackgen-run)
  - [Usage](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#usage-1)
  - [Flags](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#flags-1)
