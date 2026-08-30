---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/gcp"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/gcp"
status: "ok"
---

## Prerequisites

Before proceeding with Cloud to Code CLI, you’ll need to meet the requirements listed below.

1. Install **Homebrew** (macOS and Linux) and **Terraform**.
2. Install `cloud2code` on your system. Check out [OS-specific installation guides](/docs/stackgen/cli-guide/cloud2code/install).
3. If you do not have GCP CLI installed, refer to the [GCP documentation](https://cloud.google.com/sdk/docs/install).

## Authenticate Your GCP CLI

1. Run the following command to authenticate your GCP CLI:





```bash
gcloud auth login
```

2. Enter your Application Credentials Json Path and Output Format.

3. Follow the on-screen instructions to finish authenticating.


Refer to the [GCP documentation](https://cloud.google.com/docs/authentication/gcloud) to learn more about CLI authentication.

### Read Access to Regions

Ensure you have the necessary permissions to access your cloud regions and resources. If unsure, check with your cloud administrator or run the following command to verify your account details:

```bash
gcloud asset search-all-iam-policies \
  --scope=projects/PROJECT_ID \
  --query="policy:email@example.com" \
  --format="table(resource, policy.bindings.role)"
```

Replace `PROJECT_ID` and `Email` with your relevant details.

## Create a Terraform State File

Follow these steps to create and import a `tfstate` file:

1. Use the command line to create a local Terraform folder and switch your directory to the local folder.
2. Run the following command to create a terraform state file for Storage buckets and Compute instances from a specified region. You will find your tfstate file in the directory specified in **Step 1**.

**Usage**

- macOS
- Windows-Docker
- Linux

```bash
cloud2code import gcp --region <region> --project-id <project-id> --credentials <credentials-file-path> --include <resource_types> --exclude <resource_types> --output-dir
```

```sh
    docker run --platform linux/arm64 --rm `

    -e = "***************" ` //

    -e GOOGLE_APPLICATION_CREDENTIALS = "***************" ` // Json Credentials File Path

    -v C:\Users\abc\output:/output `

    ghcr.io/stackgenhq/cloud2code import gcp --region us-east1 --include google_storage_bucket --output-dir /output
```

**Docker Flags Explained**

| Option | Description |
| --- | --- |
| `--platform` | Ensures that `ghcr.io/stackgenhq/cloud2code`<br>container runs using the ARM64 architecture, <br>regardless of your host machine's architecture. |
| `-e` | Sets the environment variables. |
| `-v` | Used for volume mounting. <br>`C:\Users\username\output` is the directory path on your local Windows machine, <br>while `/output` is the directory path inside the Docker container. |

```bash
cloud2code import gcp --region <region> --project-id <project-id> --credentials <credentials-file-path> --include <resource_types> --exclude <resource_types> --output-dir
```

## `cloud2code` Flags Explained

| Flag | Description | Required |
| --- | --- | --- |
| `--region` | The GCP region from which resources will be imported. | Yes |
| `--project-id` | The GCP Project ID from which resource types to import. | Yes |
| `--credentials` | The local GCP credentials json file path. | Yes |

**Example**:

```bash
cloud2code import gcp --region us-east1 --include google_storage_bucket --include google_compute_instance --output-dir “/Users/abc/Downloads/terraform”
```

The command above imports Storage buckets and Compute instances from the `us-east1 region` into Terraform configuration files (`.tf`).

- [Prerequisites](/docs/stackgen/cli-guide/cloud2code/gcp#prerequisites)
- [Authenticate Your GCP CLI](/docs/stackgen/cli-guide/cloud2code/gcp#authenticate-your-gcp-cli)
  - [Read Access to Regions](/docs/stackgen/cli-guide/cloud2code/gcp#read-access-to-regions)
