---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/ai"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/ai"
status: "ok"
---

Use `stackgen ai` to manage **Aiden** resources and Knowledge Hubs from the CLI. You can apply kinded YAML manifests, get or delete resources, list kinds, run workflows, inspect session artifacts, and manage Knowledge Hub documents.

## Usage

```bash
stackgen ai [command]
```

## Available commands

| Command | Description |
| --- | --- |
| `apply` | Create or update Aiden resources from kinded YAML |
| `delete` | Delete an Aiden resource by `kind/name` or from a manifest file |
| `get` | Get an Aiden resource by `kind/name` or from a manifest file |
| `knowledge` | Upload documents to an Aiden Knowledge Hub and check ingestion status |
| `list` | List Aiden resources of a kind. Alias: `ls` |
| `run` | Run an Aiden workflow as `workflow/<name>` with `--input` key=value pairs |
| `session` | Inspect Aiden sessions and download artifacts |
| `workflow` | Run Aiden workflows and optionally wait for completion |

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for `ai`. |

### Global flags

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--workspace`, `--output`, `--interactive`, `--log`, `--stackgen-home`, and other options.

## Kinded YAML apply

Click to view

Apply kinded YAML manifests (`apiVersion` \+ `kind`) to Aiden.

Supported kinds: **Agent**, **Workflow**, **Runbook**, **Skill**, **Policy**. Documents are applied **Policy** first, then **Agent** / **Runbook** / **Skill**, then **Workflow**. Use Kubernetes-style `---` separators to pack multiple resources in one file. Optional `--values` renders manifests and `*File` includes with Go `text/template`.

```bash
stackgen ai apply [flags]
```

| Flag | Description |
| --- | --- |
| `--approve` | Approve Workflow or Runbook versions after upsert |
| `--dry-run` | Validate and normalize without calling Aiden APIs |
| `-f`, `--filename stringArray` | Manifest file or directory (repeatable) |
| `-R`, `--recursive` | Recurse into directories passed to `-f` |
| `--values string` | YAML values file for Go text/template rendering |
| `-h`, `--help` | Help for apply |

**Examples**

```bash
stackgen ai apply -f workflow.yaml

stackgen ai apply -f ./manifests/ --recursive --approve

stackgen ai apply -f agent.yaml -f runbook.yaml --dry-run

stackgen ai apply --values values.yaml -f common.yaml -f observe-uber-triage.yaml --dry-run
```

## Get, list, and delete

Click to view

### get

```bash
stackgen ai get [kind/name] [flags]
```

| Flag | Description |
| --- | --- |
| `-f`, `--filename string` | Manifest file (uses kind + `metadata.name`) |
| `-o`, `--output string` | Output format: `yaml` or `json` (default `yaml`) |
| `-h`, `--help` | Help for get |

```bash
stackgen ai get workflow/observe-rabbitmq-backlog-rca

stackgen ai get -f workflow.yaml -o yaml
```

### list

```bash
stackgen ai list <kind> [flags]
```

**Aliases**: `list`, `ls`

```bash
stackgen ai list workflow

stackgen ai list agent
```

### delete

```bash
stackgen ai delete [kind/name] [flags]
```

| Flag | Description |
| --- | --- |
| `-f`, `--filename string` | Manifest file (uses kind + `metadata.name`) |
| `-h`, `--help` | Help for delete |

```bash
stackgen ai delete workflow/observe-rabbitmq-backlog-rca

stackgen ai delete -f agent.yaml
```

## Run workflows

Click to view

### `stackgen ai run`

```bash
stackgen ai run workflow/<name> [flags]
```

| Flag | Description |
| --- | --- |
| `--input stringArray` | Workflow input as `key=value` (repeatable) |
| `-h`, `--help` | Help for run |

```bash
stackgen ai run workflow/observe-rabbitmq-backlog-rca --input queue=orders --input vhost=/
```

### `stackgen ai workflow run`

Start a named Aiden workflow and print `run_id`, `trace_id`, and `session_id`. Use `--wait` to poll until the execution completes or fails.

```bash
stackgen ai workflow run <name> [flags]
```

| Flag | Description |
| --- | --- |
| `--input string` | Workflow input message (required) |
| `--metadata stringArray` | Source metadata as `key=value` (repeatable) |
| `--poll duration` | Poll interval when `--wait` is set (default `5s`) |
| `--session-id string` | Optional existing session ID for shared context |
| `--timeout duration` | Max time to wait when `--wait` is set (default `30m0s`) |
| `--version int32` | Optional preferred workflow version |
| `--wait` | Wait until the workflow execution completes or fails |
| `-h`, `--help` | Help for run |

```bash
stackgen ai workflow run observe-rabbitmq-backlog-rca --input '{"queue":"orders"}'

stackgen ai workflow run observe-rabbitmq-backlog-rca --input hi --wait --timeout 30m

stackgen ai workflow run observe-rabbitmq-backlog-rca --input hi --metadata alert_id=a1 --version 2
```

After a successful wait, list or download artifacts with [session artifacts](/docs/stackgen/cli-guide/usage/ai#session-artifacts).

## Session artifacts

Click to view

```bash
stackgen ai session artifacts [command]
```

### list

```bash
stackgen ai session artifacts list <session-id> [flags]
```

```bash
stackgen ai session artifacts list <session-id>

stackgen ai session artifacts list <session-id> -o json
```

### download

```bash
stackgen ai session artifacts download <session-id> <artifact-id> [flags]
```

| Flag | Description |
| --- | --- |
| `--destination string` | Directory to write the artifact into (default `.`) |
| `-h`, `--help` | Help for download |

```bash
stackgen ai session artifacts download <session-id> <artifact-id>

stackgen ai session artifacts download <session-id> <artifact-id> --destination ./out
```

## Subcommands

### [knowledge](/docs/stackgen/cli-guide/usage/ai/knowledge)

Upload documents to an Aiden Knowledge Hub, list documents, check ingestion status, delete documents, and list Knowledge Hubs.

- [Usage](/docs/stackgen/cli-guide/usage/ai#usage)
- [Available commands](/docs/stackgen/cli-guide/usage/ai#available-commands)
- [Flags](/docs/stackgen/cli-guide/usage/ai#flags)
  - [Global flags](/docs/stackgen/cli-guide/usage/ai#global-flags)
- [Kinded YAML apply](/docs/stackgen/cli-guide/usage/ai#kinded-yaml-apply)
- [Get, list, and delete](/docs/stackgen/cli-guide/usage/ai#get-list-and-delete)
  - [get](/docs/stackgen/cli-guide/usage/ai#get)
  - [list](/docs/stackgen/cli-guide/usage/ai#list)
  - [delete](/docs/stackgen/cli-guide/usage/ai#delete)
- [Run workflows](/docs/stackgen/cli-guide/usage/ai#run-workflows)
  - [`stackgen ai run`](/docs/stackgen/cli-guide/usage/ai#stackgen-ai-run)
  - [`stackgen ai workflow run`](/docs/stackgen/cli-guide/usage/ai#stackgen-ai-workflow-run)
- [Session artifacts](/docs/stackgen/cli-guide/usage/ai#session-artifacts)
  - [list](/docs/stackgen/cli-guide/usage/ai#list-1)
  - [download](/docs/stackgen/cli-guide/usage/ai#download)
- [Subcommands](/docs/stackgen/cli-guide/usage/ai#subcommands)
  - [knowledge](/docs/stackgen/cli-guide/usage/ai#knowledge)
