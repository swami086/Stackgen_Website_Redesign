---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/globalflags"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/globalflags"
status: "ok"
---

cloud2code is a powerful tool that can generate Terraform state files from cloud resources. It can be used to generate Terraform state files from AWS, GCP, and Azure cloud.

## Usage

```bash
cloud2code [command]
```

## Available Commands

| Command | Description |
| --- | --- |
| `completion` | Generate the autocompletion script for the specified shell |
| `get-supported-resources` | List supported resources |
| `help` | Help about any command |
| `import` | Import resources from cloud |
| `version` | Version of cloud2code |

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for cloud2code |
| `-l`, `--log-level` _string_ | Log level (`debug`, `info`, `warn`, `error`, `panic`, `fatal`) (default: `"info"`) |
| `-t`, `--log-type` _string_ | Log output type (`console`, `json`) (default: `"json"`) |

Use `cloud2code [command] --help` for more information about a command.
