---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/upload/upload-resources"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/upload/upload-resources"
status: "ok"
---

Important

You will need a StackGen **Admin** or **DevOps** access to run this command.

The `stackgen upload` command uploads custom modules and security rules through the CLI.
Use [`stackgen policies`](/docs/stackgen/cli-guide/usage/policies) for resource restriction policies.

## Usage

```bash
stackgen upload [command]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for `upload`. |

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--interactive`, `--log`, `--output`, `--project`, `--workspace`, and `--stackgen-home`.

## Subcommands

The `upload` command group includes these subcommands:

### [custom-modules](/docs/stackgen/cli-guide/usage/upload/custom-modules)

Upload custom modules from a Git repository or a local Terraform directory (`--dir`) for use across your organization (DevOps role).

### [security-rules](/docs/stackgen/cli-guide/usage/upload/security-rules)

Upload custom security and compliance rules from a JSON file (Admin or DevOps role).

### Resource restriction policies

Use [`stackgen policies resource-restriction`](/docs/stackgen/cli-guide/usage/policies) to list or upload resource restriction policies.

note

`stackgen upload resource-restriction-policy` is **deprecated**. Prefer `stackgen policies resource-restriction upload`.

## Commands no longer supported under `stackgen upload`

These former upload targets are **not** available as `stackgen upload` subcommands:

- `aws-iam-permissions`
- `custom-cloud-migration-mappings`
- `resource-iam-restriction-policy`
- `resource-override-policy`
- `resource-pack-policy`

Do not use those command paths. Use the product UI or the supported `upload` / `policies` commands above.

- [Usage](/docs/stackgen/cli-guide/usage/upload/upload-resources#usage)
- [Flags](/docs/stackgen/cli-guide/usage/upload/upload-resources#flags)
- [Subcommands](/docs/stackgen/cli-guide/usage/upload/upload-resources#subcommands)
  - [custom-modules](/docs/stackgen/cli-guide/usage/upload/upload-resources#custom-modules)
  - [security-rules](/docs/stackgen/cli-guide/usage/upload/upload-resources#security-rules)
  - [Resource restriction policies](/docs/stackgen/cli-guide/usage/upload/upload-resources#resource-restriction-policies)
