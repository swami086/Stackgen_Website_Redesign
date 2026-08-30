---
title: "Supported Clouds"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/upload/resource-restriction-policy"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/upload/resource-restriction-policy"
status: "ok"
---

Important

You will need a StackGen **Admin** or **DevOps** access to run this command.

The `stackgen policies resource-restriction` command is used to list and upload policies that limit the StackGen or custom resources that users can select from the drag-and-drop menu in their topologies.

note

`stackgen upload resource-restriction-policy` is **deprecated**. Use `stackgen policies resource-restriction upload` instead.

## Supported Clouds

All clouds are supported for resource restriction policies.

## List Policies

```bash
stackgen policies resource-restriction list [flags]
```

| Flag | Description |
| --- | --- |
| `--id string` | Show only the policy with this ID. |
| `--name string` | Show only the policy with this exact name. |
| `-h`, `--help` | Help for `list`. |

Aliases: `list`, `ls`.

**Examples**

### List all resource restriction policies

```bash
stackgen policies resource-restriction list
```

The above command will display every resource restriction policy in the project.

## Upload a Policy

```bash
stackgen policies resource-restriction upload [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-p, --restriction-policy-file-path string` | Path to resource restriction policy file. |
| `-h`, `--help` | Help for upload. |

**Examples**

### Upload resource restriction policy from a local file

```bash
stackgen policies resource-restriction upload -p /path/to/resource_restriction_policy.json
```

The above command will:

- Read the restriction policy from the specified JSON file.
- Upload the policy to the StackGen platform.
- Limit which resources users can select in the drag-and-drop menu.

## File Format

Click to view

The resource restriction policy file is JSON. It defines which built-in resource types and custom modules users can add on the topology.

### Built-in resources only

The `resources` array accepts **built-in** resource type names (for example `aws_s3`). If you list types there, only those types are allowed. Types not listed are blocked.

```json
{

  "name": "Allow s3",

  "description": "This restriction will only allow s3",

  "resources": [\
\
    "aws_s3"\
\
  ]

}
```

Each policy object must include:

- `name`: A unique identifier for the policy.
- `description`: A brief explanation of the policy's purpose.
- `resources`: An array of allowed built-in resource type names.

### Built-in resources and custom modules

Use `allowedCustomModules` to allow specific custom modules by `baseId` (UUID shared across all versions). You can optionally set `minVersion` and `maxVersion` for a module. Custom modules do **not** go in the `resources` array.

Get `baseId` values with [`stackgen resource type --custom`](/docs/stackgen/cli-guide/usage/manage/type).

```json
{

  "name": "Allow s3 and custom modules",

  "description": "Allows aws_s3 and specific custom modules",

  "resources": ["aws_s3"],

  "allowedCustomModules": [\
\
    { "baseId": "00000000-0000-0000-0000-000000000000" },\
\
    {\
\
      "baseId": "11111111-1111-1111-1111-111111111111",\
\
      "minVersion": "v.1",\
\
      "maxVersion": "v.5"\
\
    }\
\
  ]

}
```

### Custom modules only

To restrict the project to specific custom modules with no built-in types, use an empty `resources` array and set only `allowedCustomModules`.

```json
{

  "name": "Only specific custom modules",

  "description": "Restrict to only these custom modules",

  "resources": [],

  "allowedCustomModules": [\
\
    { "baseId": "00000000-0000-0000-0000-000000000000" }\
\
  ]

}
```

note

- Resource restriction policies help enforce standardization and compliance.
- Built-in types not listed in `resources` are not available on the topology.
- Version bounds in `allowedCustomModules` apply only to custom modules, not to entries in `resources`.

- [Supported Clouds](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#supported-clouds)
- [List Policies](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#list-policies)
  - [List all resource restriction policies](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#list-all-resource-restriction-policies)
- [Upload a Policy](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#upload-a-policy)
- [Flags](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#flags)
  - [Upload resource restriction policy from a local file](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#upload-resource-restriction-policy-from-a-local-file)
- [File Format](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#file-format)
  - [Built-in resources only](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#built-in-resources-only)
  - [Built-in resources and custom modules](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#built-in-resources-and-custom-modules)
  - [Custom modules only](/docs/stackgen/cli-guide/usage/upload/resource-restriction-policy#custom-modules-only)
