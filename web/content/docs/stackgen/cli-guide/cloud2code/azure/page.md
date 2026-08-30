---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/azure"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/azure"
status: "ok"
---

## Prerequisites

Before proceeding with Cloud to Code CLI, you’ll need to meet the requirements listed below.

1. Install **Homebrew** (macOS and Linux) and **Terraform**.
2. Install `cloud2code` on your system. Check out [OS-specific installation guides](/docs/stackgen/cli-guide/cloud2code/install).
3. If you do not have Azure CLI installed, refer to the [Azure documentation](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).

## Authenticate Your AZ CLI

1. Run the following command to authenticate your Azure CLI:





```bash
az login
```

2. Follow the on-screen instructions to finish authenticating.


Refer to the [Azure documentation](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli) to learn more about CLI authentication.

### Read Access to Resources

Ensure you have the necessary permissions to access your cloud regions and resources. If unsure, check with your cloud administrator or run the following command to verify your account details:

```bash
az account show
```

## Create a Terraform State File

Follow these steps to create and import a `tfstate` file:

1. Use the command line to create a local Terraform folder and switch your directory to the local folder.
2. Run the command below to create a terraform state file for the resources within a resource group. You will find your tfstate file in the directory specified in **Step 1**.

**Usage**

- macOS
- Windows-Docker
- Linux

```bash
cloud2code import azure --subscription-id <subscription_id> --resource-group <resource_group>
```

```bash
docker run --platform linux/arm64 --rm `

-e AZURE_TENANT_ID="***************" ` // tenant ID

-e AZURE_CLIENT_ID="***************" ` // client ID (App registration/service principal) for authentication

-e AZURE_CLIENT_SECRET="***************" ` // client secret used to authenticate the client ID

-v C:\Users\abc\output:/output `

ghcr.io/stackgenhq/cloud2code import azure --subscription-id ********************** --resource-group rg-2 --output-dir /output
```

**Docker Flags Explained**

| Option | Description |
| --- | --- |
| `--platform` | Ensures that `ghcr.io/stackgenhq/cloud2code`<br>container runs using the ARM64 architecture, <br>regardless of your host machine's architecture. |
| `-e` | Sets the environment variables. |
| `-v` | Used for volume mounting. <br>`C:\Users\username\output` is the directory path on your local Windows machine, <br>while `/output` is the directory path inside the Docker container. |

```bash
cloud2code import azure --subscription-id <subscription_id> --resource-group <resource_group>
```

## `cloud2code` Flags Explained

| Flag | Description | Required |
| --- | --- | --- |
| `--subscription-id` | The Azure Subscription ID from which resources will be imported. | Yes |
| `--resource-group` | The name of the Azure Resource Group to import. | Yes |
| `--output-dir` | Output Terraform state file path. | Yes |

**Example**:

Run the following command to create a terraform state file for the resources in a `std-test-template` resource group:

```bash
cloud2code import azure --subscription-id a1b2c3d4-567e-89f0-1234-56789abcdef0 --resource-group standard-test-template --output-dir /Users/abc/Downloads
```

- [Prerequisites](/docs/stackgen/cli-guide/cloud2code/azure#prerequisites)
- [Authenticate Your AZ CLI](/docs/stackgen/cli-guide/cloud2code/azure#authenticate-your-az-cli)
  - [Read Access to Resources](/docs/stackgen/cli-guide/cloud2code/azure#read-access-to-resources)
