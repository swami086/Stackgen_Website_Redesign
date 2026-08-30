---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/ai/knowledge"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/ai/knowledge"
status: "ok"
---

Use `stackgen ai knowledge` to upload documents to an Aiden Knowledge Hub and manage ingestion. You can upload a file, check status, list documents, delete documents, and list hubs.

## Usage

```bash
stackgen ai knowledge [command]
```

## Available commands

| Command | Description |
| --- | --- |
| `upload` | Upload a document to a Knowledge Hub |
| `status` | Check ingestion status of a document |
| `ls` | List ingested documents. Alias: `list` |
| `delete` | Delete an ingested document and its chunks. Alias: `rm` |
| `hubs` | Work with Knowledge Hubs |

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for `knowledge`. |

### Global flags

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--workspace`, `--output`, `--interactive`, `--log`, `--stackgen-home`, and other options.

## Subcommands

### upload

Click to view

Upload a document file for asynchronous ingestion into an Aiden Knowledge Hub. If you omit `--hub`, the CLI uses the default **Organization Knowledge** hub.

```bash
stackgen ai knowledge upload <file> [flags]
```

| Flag | Description |
| --- | --- |
| `--hub string` | Target Knowledge Hub name or ID (default: Organization Knowledge) |
| `--poll duration` | Poll interval when `--wait` is set (default `3s`) |
| `--runbook` | Classify the document as a runbook |
| `--timeout duration` | Max time to wait when `--wait` is set (default `5m0s`) |
| `--wait` | Wait until ingestion reaches ready or failed |
| `-h`, `--help` | Help for upload |

**Examples**

#### Upload a document and wait for ingestion

```bash
stackgen ai knowledge upload ./runbooks/deploy.md --runbook --wait
```

The above command will:

- Upload `./runbooks/deploy.md` to the default Organization Knowledge hub
- Mark the document as a runbook
- Wait until ingestion reaches ready or failed

#### Upload to a specific hub

```bash
stackgen ai knowledge upload ./docs/guide.md --hub "<hub-name-or-id>"
```

The above command will upload the file to the Knowledge Hub you specify.

### status

Click to view

```bash
stackgen ai knowledge status <document-id> [flags]
```

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for status |

**Examples**

#### Check ingestion status for a document

```bash
stackgen ai knowledge status <document-id>
```

The above command will show the ingestion status for the document ID you provide.

### ls

Click to view

List ingested knowledge documents. You can filter by hub and by status (`pending`, `processing`, `ready`, `failed`).

```bash
stackgen ai knowledge ls [flags]
```

**Aliases**: `ls`, `list`

| Flag | Description |
| --- | --- |
| `--hub string` | Filter by Knowledge Hub name or ID |
| `--status string` | Filter by status: `pending`, `processing`, `ready`, `failed` |
| `-h`, `--help` | Help for ls |

**Examples**

#### List all ingested documents

```bash
stackgen ai knowledge ls
```

The above command will list ingested documents.

#### List ready documents

```bash
stackgen ai knowledge ls --status ready
```

The above command will list only documents with status `ready`.

### delete

Click to view

```bash
stackgen ai knowledge delete <document-id> [flags]
```

**Aliases**: `delete`, `rm`

| Flag | Description |
| --- | --- |
| `-y`, `--yes` | Skip confirmation prompt and delete |
| `-h`, `--help` | Help for delete |

**Examples**

#### Delete a document

```bash
stackgen ai knowledge delete <document-id> --yes
```

The above command will delete the document and its chunks without a confirmation prompt.

### hubs

Click to view

```bash
stackgen ai knowledge hubs [command]
```

#### hubs ls

List Knowledge Hubs.

```bash
stackgen ai knowledge hubs ls [flags]
```

**Aliases**: `ls`, `list`

```bash
stackgen ai knowledge hubs ls
```

The above command will list the Knowledge Hubs available to you.

- [Usage](/docs/stackgen/cli-guide/usage/ai/knowledge#usage)
- [Available commands](/docs/stackgen/cli-guide/usage/ai/knowledge#available-commands)
- [Flags](/docs/stackgen/cli-guide/usage/ai/knowledge#flags)
  - [Global flags](/docs/stackgen/cli-guide/usage/ai/knowledge#global-flags)
- [Subcommands](/docs/stackgen/cli-guide/usage/ai/knowledge#subcommands)
  - [upload](/docs/stackgen/cli-guide/usage/ai/knowledge#upload)
  - [status](/docs/stackgen/cli-guide/usage/ai/knowledge#status)
  - [ls](/docs/stackgen/cli-guide/usage/ai/knowledge#ls)
  - [delete](/docs/stackgen/cli-guide/usage/ai/knowledge#delete)
  - [hubs](/docs/stackgen/cli-guide/usage/ai/knowledge#hubs)
