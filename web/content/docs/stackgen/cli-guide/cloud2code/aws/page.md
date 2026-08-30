---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/aws"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/aws"
status: "ok"
---

## Prerequisites

Before proceeding with Cloud to Code CLI, you’ll need to meet the requirements listed below.

1. Install **Homebrew** (macOS and Linux) and **Terraform**.
2. Install `cloud2code` on your system. Check out [OS-specific installation guides](/docs/stackgen/cli-guide/cloud2code/install).
3. If you do not have AWS CLI installed, refer to the [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)

## Authenticate Your AWS CLI

1. Run the following command to authenticate your AWS CLI:





```bash
aws configure
```

2. Enter your **Access Key**, **Secret Key**, **Region**, and **Output Format**.


Follow the on-screen instructions to finish authenticating. Refer to the [AWS documentation](https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html) to learn more about CLI authentication.

### Read Access to Regions

Ensure you have the necessary permissions to access your cloud regions and resources. If unsure, check with your cloud administrator or run the following command to verify your account details:

```bash
aws iam get-user
```

## Create a Terraform State File

Follow these steps to create and import a `tfstate` file:

1. Use the command line to create a local Terraform folder and switch your directory to the local folder.
2. Run the following command to create a terraform state file for S3 buckets and EC2 instances from a specified region. You will find your tfstate file in the directory specified in **Step 1**.

**Usage**

- macOS
- Windows-Docker
- Linux

```bash
cloud2code import aws --region <region> --include <resource_types> --output-dir
```

```bash
docker run --platform linux/arm64 --rm `

-e AWS_ACCESS_KEY_ID="***************" ` // access key id

-e AWS_SECRET_ACCESS_KEY="***************" ` // secret access key

-e AWS_SESSION_TOKEN="***************" ` // enter an aws session token

-v C:\Users\abc\output:/output `

ghcr.io/stackgenhq/cloud2code import aws --region us-east-1 --include aws_s3_bucket --output-dir /output
```

**Docker Flags Explained**

| Option | Description |
| --- | --- |
| `--platform` | Ensures that `ghcr.io/stackgenhq/cloud2code`<br>container runs using the ARM64 architecture, <br>regardless of your host machine's architecture. |
| `-e` | Sets the environment variables. |
| `-v` | Used for volume mounting. <br>`C:\Users\username\output` is the directory path on your local Windows machine, <br>while `/output` is the directory path inside the Docker container. |

```bash
cloud2code import aws --region <region> --include <resource_types> --output-dir
```

## `cloud2code` Flags Explained

| Flag | Description | Required |
| --- | --- | --- |
| `--region` | The AWS region from which resources will be imported. | Yes |
| `--include` | Comma-separated list of specific AWS resource types to import. | Yes |
| `--output-dir` | Output Terraform state file path. | Yes |

**Example**:

```bash
cloud2code import aws --region us-east-1 --include aws_s3_bucket,aws_instance --output-dir “/Users/abc/Downloads/terraform”
```

The command above imports S3 buckets and EC2 instances from the `us-east-1 region` into Terraform configuration files (`.tf`).

- [Prerequisites](/docs/stackgen/cli-guide/cloud2code/aws#prerequisites)
- [Authenticate Your AWS CLI](/docs/stackgen/cli-guide/cloud2code/aws#authenticate-your-aws-cli)
  - [Read Access to Regions](/docs/stackgen/cli-guide/cloud2code/aws#read-access-to-regions)
