---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/import/stackgen-import-state"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/import/stackgen-import-state"
status: "ok"
---

The `stackgen import state` command will parse a Terraform state file and import the infrastructure
configuration into an appstack or a new version of an existing appstack.

## Usage

```bash
stackgen import state [flags]
```

## Flags

| Flag | Description | Default |
| --- | --- | --- |
| `--cloud-provider string` | Cloud provider for the infrastructure | `aws` |
| `-m, --mode string` | Import strategy: `replace` or `merge` | `replace` |
| `-h, --help` | Help for import state. | n/a |

### Global flags (with this command) [](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#global-flags-with-this-command%20%22Direct%20link%20to%20Global%20flags%20(with%20this%20command)")

| Flag | Description |
| --- | --- |
| `-f, --file string` | Path to the Terraform state file ( **required**). |
| `--appstack-id string` | Appstack ID to import into an existing appstack (creates a new appstack version). |
| `--appstack-name string` | Appstack name to create if importing into a new appstack (must be unique). |

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, `--stackgen-home`, and other globals.

## Usage Guide

Use `stackgen import state` to:

- [Create new appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#create-new-appstack)
- [Create a new version of an existing appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#create-new-version-of-an-existing-appstack)

### Prerequisites

Click to view

Before running this command, ensure you have:

- StackGen CLI installed. To install with Homebrew:





```bash
brew install stackgenhq/stackgen/stackgen
```

- If you are **creating a new appStack**, you need: A valid Terraform-generated state file (`.tfstate`).

- If you are **creating an appStack version**, you will need:
  - An updated Terraform state file (`.tfstate`)
  - **appStack ID** for an existing appStack in StackGen.
- Configure your StackGen environment by running:





```bash
export STACKGEN_TOKEN=<TOKEN>
```









Replace `<TOKEN>` with your personal access token (PAT). Skip this step if you have already configured your environment.

- If you are creating an appStack inside a project workspace (not the default personal workspace):


1. Select the project workspace from the **Projects** dropdown.

2. From the browser address bar, copy the **Project ID**.

3. Run:





     ```bash
     export STACKGEN_PROJECT=<Project ID>
     ```


You can also pass `--project <Project ID>` instead of the environment variable.

- This feature is supported in the following cloud providers:
  - AWS
  - Azure
  - GCP

### Create New appStack

Click to view

Use this command to create a new appStack in StackGen by importing an existing Terraform state file. This is especially useful when you want to bring your current infrastructure under StackGen's visibility without manually recreating configurations.

Once imported, StackGen will analyze the resources in the state file, generate the corresponding appStack definition, and make it available for further compliance checks, versioning, and deployment actions.

important

Please read the [Prerequisites](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#prerequisites) section before running the command.

#### Usage

Create a new appStack in StackGen by importing resources from a `.tfstate` file.

```bash
stackgen import state -f <path/to/.tfstate> --cloud-provider=<provider name>
```

#### Flags (this flow) [](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#flags-this-flow%20%22Direct%20link%20to%20Flags%20(this%20flow)")

| Flag | Description | Required |
| --- | --- | --- |
| `-f, --file` | Path to the Terraform state file | Yes |
| `--cloud-provider` | Cloud provider (for example AWS, Azure, GCP) | Yes |
| `-m, --mode` | `replace` or `merge` (default `replace`) | No |

**Example**:

Import resources from the `.tfstate` file and create a new appStack for an Azure-based infrastructure.

```bash
stackgen import state -f /Users/abc/Downloads/terraform/terraform.tfstate --cloud-provider=azure
```

### Create New Version of an Existing appStack

Click to view

Use this command to create a new version of an existing appStack by importing an updated Terraform state file. This helps keep your StackGen environment in sync with infrastructure changes and re-evaluating compliance after each iteration.

#### Usage

Create a new version of the specified appStack using the updated tfstate file.

```bash
stackgen import state --appstack-id=<your-appstack-id> -f <path/to/terraform.tfstate> --cloud-provider=<provider name>
```

#### Flags (this flow) [](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#flags-this-flow-1%20%22Direct%20link%20to%20Flags%20(this%20flow)")

| Flag | Description | Required |
| --- | --- | --- |
| `--appstack-id` | ID of the existing appStack to create a new version for | Yes |
| `-f, --file` | Path to the Terraform state file | Yes |
| `--cloud-provider` | Cloud provider (for example AWS, Azure, GCP) | Yes |
| `-m, --mode` | `replace` or `merge` (default `replace`) | No |

**Example**:

Create a new version of the appStack with ID `app-1234abcd5678efgh` using the latest Terraform state file for an AWS infrastructure.

```bash
stackgen import state --appstack-id=app-1234abcd5678efgh -f /Users/abc/Downloads/terraform/terraform.tfstate --cloud-provider=aws
```

- [Usage](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#usage)
- [Flags](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#flags)
  - [Global flags (with this command)](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#global-flags-with-this-command)
- [Usage Guide](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#usage-guide)
  - [Prerequisites](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#prerequisites)
  - [Create New appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#create-new-appstack)
  - [Create New Version of an Existing appStack](/docs/stackgen/cli-guide/usage/import/stackgen-import-state#create-new-version-of-an-existing-appstack)
