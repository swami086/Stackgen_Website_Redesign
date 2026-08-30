---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/import"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/import"
status: "ok"
---

The `cloud2code import` lets you import your cloud resources and customise your resource imports, including logging, filtering, and the output settings.

## Usage

```bash
cloud2code import <provider> [options] [global flags]
```

## Available Flags

| Flag | Description | Required |
| --- | --- | --- |
| `--log-level` or `-l` | Sets the logging level (`debug`, `info`, `warn`, `error`, `panic`, `fatal`). Global flag. | No |
| `--log-type` or `-t` | Sets the logging output format (`console`, `json`). Global flag. | No |
| `--tags` | Filters resources by specified tags. | No |
| `--include` | Includes only the specified resource types. | No |
| `--exclude` | Excludes specific resource types from import. | No |
| `--output-dir`<br> or `-o` | Specifies the output directory for Terraform state files (default: current directory). | No |
| `--auto-import` | Automatically create discovery on StackGen (default `true`). | No |
| `--name` | Name that you want to use for the discovery. If a discovery with the given name already exists, it will be updated instead of creating a new one. | No |
| `--project` | StackGen Project Id. Can also be set via `STACKGEN_TEAM` or `PROJECT` environment variables, or in `~/.stackgen/config.yaml`. | No |

## StackGen Configuration

Cloud2Code can connect to your StackGen tenant using environment variables or a configuration file at `~/.stackgen/config.yaml`.

### Configuration File

Create a file at `~/.stackgen/config.yaml` with the following format:

```yaml
url: https://customer.cloud.stackgen.com

token: stackgen_******

project: <stackgen-project-id>
```

### Environment Variables

Alternatively, you can set the following environment variables:

| Variable | Description |
| --- | --- |
| `STACKGEN_URL` | URL of the StackGen server |
| `STACKGEN_TOKEN` | StackGen authentication token |
| `STACKGEN_TEAM` | StackGen Project Id |
| `PROJECT` | StackGen Project Id (alternative) |

### Precedence

When multiple sources are configured, the following precedence applies:

- **StackGen URL**: `STACKGEN_URL` env var > `~/.stackgen/config.yaml``url` field
- **StackGen Token**: `STACKGEN_TOKEN` env var > `~/.stackgen/config.yaml``token` field
- **Project Id**: `--project` flag > `STACKGEN_TEAM` env var > `PROJECT` env var > `~/.stackgen/config.yaml``project` field

If no project is specified through any of these sources, the discovery will be created in your personal workspace.

## Examples

**Usage**

```bash
cloud2code import aws --region us-east-1 --include aws_s3_bucket,aws_instance --log-level debug --output-dir ./terraform
```

The above command will:

1. Import S3 buckets and EC2 instances from AWS (`us-east-1`).
2. Log details at debug level.
3. Save the Terraform files in the `./terraform` directory.

**Usage**

```bash
cloud2code import azure --subscription-id <subscription_id> --resource-group my-rg --exclude azure_vm --name my-azure-discovery
```

The above command will:

1. Import all resources from an Azure Resource Group, except VMs.
2. Automatically create a discovery on StackGen (since `--auto-import` defaults to `true`) with the name `my-azure-discovery`.
3. Connect to StackGen using environment variables or `~/.stackgen/config.yaml` (see [StackGen Configuration](/docs/stackgen/cli-guide/cloud2code/import#stackgen-configuration)).
4. If `--project` is not specified, the discovery will be created in your personal workspace.

**Usage**

```bash
cloud2code import gcp --project-id <project-id> --region us-central1 --credentials <creds> --project <stackgen-project-id> --include google_storage_bucket --name my-gcp-discovery
```

The above command will:

1. Import all the Google Storage Bucket resources present in `us-central1` region.
2. Create a discovery named `my-gcp-discovery` on StackGen under the specified project.
3. Connect to StackGen using environment variables or `~/.stackgen/config.yaml` (see [StackGen Configuration](/docs/stackgen/cli-guide/cloud2code/import#stackgen-configuration)).

- [Usage](/docs/stackgen/cli-guide/cloud2code/import#usage)
- [Available Flags](/docs/stackgen/cli-guide/cloud2code/import#available-flags)
- [StackGen Configuration](/docs/stackgen/cli-guide/cloud2code/import#stackgen-configuration)
  - [Configuration File](/docs/stackgen/cli-guide/cloud2code/import#configuration-file)
  - [Environment Variables](/docs/stackgen/cli-guide/cloud2code/import#environment-variables)
  - [Precedence](/docs/stackgen/cli-guide/cloud2code/import#precedence)
