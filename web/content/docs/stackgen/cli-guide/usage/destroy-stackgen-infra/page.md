---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/destroy-stackgen-infra"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/destroy-stackgen-infra"
status: "ok"
---

The `stackgen destroy` command is used to tear down the infrastructure provisioned from exported appStack IaC configurations.

## Usage

```bash
stackgen destroy [flags]
```

note

If you skip adding the `--apply` flag, you will only be able to preview changes and not execute them.

## Flags

| Flag | Description |
| --- | --- |
| `--apply` | Preview and apply the infrastructure changes. This command does not require further approval. |
| `--appstack string` | AppStack UUID or name to destroy. Use `stackgen appstack list`, `show`, or `ls` for names and ids. |
| `--backend-config stringArray` | Backend configuration as a `key=value` pair or a path to an HCL file with key/value assignments. This flag can be specified multiple times. |
| `--ci-job-url string` | URL of the CI job that triggered the CLI command. |
| `--cloud-profile string` | Specify the credential profile to use for provisioning the infrastructure. This works only for AWS. For other clouds, make sure default credentials are set. |
| `-e`, `--environment string` | Name of the environment that belongs to the provided appStack. |
| `-h, --help` | Displays help information for the destroy command. |
| `--iac-tool string` | IaC tool: `terraform` or `tofu` (default `terraform`). See [IaC tool and infrastructure lifecycle](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle). |
| `--restrict-output-access` | Do not make resource attributes available to other appStacks. |
| `--var stringArray` | Specify a value for one of the input variables. This flag can be specified multiple times. |
| `--var-file string` | Vars file path. Default `terraform.tfvars.json` in the working directory. |
| `-v`, `--verbose` | Print each OpenTofu/Terraform subprocess invocation and captured stdout/stderr to stderr. |

**Examples**

### Usage 1: Destroy Infrastructure with Apply Preview

```bash
stackgen destroy --apply --appstack 12345-uuid
```

The above command will:

- Preview and apply the infrastructure changes.
- Use the provided appStack UUID or name (`12345-uuid`).

### Usage 2: Destroy Infrastructure with Cloud Profile

```shell
stackgen destroy --appstack 12345-uuid --cloud-profile my-aws-profile --var-file ./custom-vars.tfvars.json
```

The above command will:

- Use the provided appStack UUID or name (`12345-uuid`).
- Specify the cloud profile (`my-aws-profile`) for AWS credential usage.
- Use the custom variables file (`./custom-vars.tfvars.json`).

### Usage 3: Destroy Infrastructure with Backend Configuration

```shell
stackgen destroy --appstack 12345-uuid --backend-config 'bucket=my-bucket' --environment prod
```

The above command will:

- Use the provided appStack UUID or name (`12345-uuid`).
- Set the backend configuration to use `my-bucket`.
- Pass the environment name `prod` for the appStack (`-e` / `--environment`).

- [Usage](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra#usage)
- [Flags](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra#flags)
  - [Usage 1: Destroy Infrastructure with Apply Preview](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra#usage-1-destroy-infrastructure-with-apply-preview)
  - [Usage 2: Destroy Infrastructure with Cloud Profile](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra#usage-2-destroy-infrastructure-with-cloud-profile)
  - [Usage 3: Destroy Infrastructure with Backend Configuration](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra#usage-3-destroy-infrastructure-with-backend-configuration)
