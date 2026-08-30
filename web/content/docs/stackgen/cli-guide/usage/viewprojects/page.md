---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/viewprojects"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/viewprojects"
status: "ok"
---

Important

With the July 2025 release, **Teams** has been renamed to **Projects** across the StackGen platform. This change reflects our broader vision of enabling cross-functional collaboration around infrastructure, code, and compliance workflows under clearly scoped project workspaces. All existing functionality remains the same and only the terminology has been updated to better align with how you organize and manage appStacks, modules, and cloud environments in real-world settings. You will now see **Projects** wherever **Teams** was previously referenced in the UI, CLI, and documentation.

The `stackgen project` command retrieves projects within your StackGen organisation. The usual subcommand is `list` (aliases `ls`, `show`).

## Usage

```bash
stackgen project list
```

Lists all Projects accessible to the currently authenticated user.

## Use this command when:

- You need to reference project UUIDs in scripts or automation pipelines.
- You are deploying infra (for example Terraform modules) across projects.
- You want a CLI-based alternative to viewing project membership in the UI.

## Role-Based Behavior

**Admin or DevOps users**: Returns all projects within the org.

**Developer users**: Returns only the projects the user is a member of.

## Flags

| Flag | Description |
| --- | --- |
| `-h`, `--help` | Help for the `list` subcommand. |

These global flags also apply: `-i` / `--interactive`, `--log`, `-o` / `--output`, `--project`, `--stackgen-home`. For `--output`, use `json` or `human` (default `human`). There is no `raw` output format for this command.

See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags).

**Example**

```bash
stackgen project list --output json
```

**Sample Outputs**

**Output for Admins**

```json
[\
\
  {\
\
    "name": "Platform Engineering",\
\
    "uuid": "project-abc123"\
\
  },\
\
  {\
\
    "name": "DevOps Project",\
\
    "uuid": "project-def456"\
\
  }\
\
]
```

**Output for Developers**

```json
[\
\
  {\
\
    "name": "DevOps Project",\
\
    "uuid": "project-def456"\
\
  }\
\
]
```
