---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/policies"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/policies"
status: "ok"
---

The `stackgen policies` command is used to list, inspect, and upload resource restriction policies from the CLI. Use `stackgen policies resource-restriction` instead of `stackgen upload resource-restriction-policy` (deprecated).

## Usage

```bash
stackgen policies [command]
```

## Sub Commands

### Resource restriction

List, inspect by ID or exact name (`--id` / `--name`), or upload policies that limit which resources users can add to topologies.

| Subcommand | Description |
| --- | --- |
| [**`list`**](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy) | List resource restriction policies, or one policy with `--id` or `--name`. Alias: `ls`. |
| [**`upload`**](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy) | Upload a resource restriction policy from a JSON file. |

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for `policies`. |

See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags) for `--interactive`, `--log`, `--output`, `--project`, and `--stackgen-home`.

**Examples**

### List all resource restriction policies

```bash
stackgen policies resource-restriction list
```

The above command will display every resource restriction policy in the project.

### List one policy by ID or name

```bash
stackgen policies resource-restriction list --id <policy-id>

stackgen policies resource-restriction list --name <policy-name>
```

The above command will show only the matching policy.

### Upload a policy from a JSON file

```bash
stackgen policies resource-restriction upload -p /path/to/resource_restriction_policy.json
```

The above command will:

- Read the restriction policy from the specified JSON file.
- Upload the policy to StackGen.

- [Usage](/docs/stackgen/cli-guide/usage/policies#usage)
- [Sub Commands](/docs/stackgen/cli-guide/usage/policies#sub-commands)
  - [Resource restriction](/docs/stackgen/cli-guide/usage/policies#resource-restriction)
- [Flags](/docs/stackgen/cli-guide/usage/policies#flags)
  - [List all resource restriction policies](/docs/stackgen/cli-guide/usage/policies#list-all-resource-restriction-policies)
  - [List one policy by ID or name](/docs/stackgen/cli-guide/usage/policies#list-one-policy-by-id-or-name)
  - [Upload a policy from a JSON file](/docs/stackgen/cli-guide/usage/policies#upload-a-policy-from-a-json-file)
