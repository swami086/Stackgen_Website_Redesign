---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/supportedresources"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/supportedresources"
status: "ok"
---

The `get-supported-resources` command lists the cloud resource types that cloud2code can import and generate Terraform state for. Use it to see which AWS, Azure, or GCP resources are supported before running an import, or to filter and plan which resources to bring into StackGen.

## Usage

```bash
cloud2code get-supported-resources [flags]
```

## Example

List supported resources for GCP:

```bash
cloud2code get-supported-resources --cloud-provider gcp
```

## Flags

| Flag | Description |
| --- | --- |
| `-c`, `--cloud-provider` _string_ | Cloud provider to list supported resources for (`aws`, `azure`, `gcp`) |
| `-h`, `--help` | Help for get-supported-resources |

## Global Flags

| Flag | Description |
| --- | --- |
| `-l`, `--log-level` _string_ | Log level (`debug`, `info`, `warn`, `error`, `panic`, `fatal`) (default: `"info"`) |
| `-t`, `--log-type` _string_ | Log output type (`console`, `json`) (default: `"json"`) |

note

Cloud2Code can use `~/.stackgen/config.yaml` for reading and setting up StackGen tenant details.
