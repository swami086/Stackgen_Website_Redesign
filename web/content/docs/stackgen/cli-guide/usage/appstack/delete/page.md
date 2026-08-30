---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/delete"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/delete"
status: "ok"
---

The `stackgen appstack delete` command is used to remove an appStack you no longer need. This permanently deletes the appStack and its metadata in StackGen.

## Usage

```bash
stackgen appstack delete [appstack] [flags]
```

You can pass the appStack UUID or name as a positional argument or with `--appstack`.

## Flags

| Flag | Description |
| --- | --- |
| `--appstack string` | appStack UUID or name to delete. Use `stackgen appstack list`, `show`, or `ls`. |
| `-y`, `--yes` | Skip confirmation prompt and proceed with the deletion. |
| `-h`, `--help` | Help for delete. |

Global flags (`--interactive`, `--log`, `--output`, `--project`, `--stackgen-home`) apply. See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags).

**Examples**

### Delete an appStack by positional id

```bash
stackgen appstack delete 12345-uuid
```

This command will:

- Prompt for confirmation before deleting the appStack with id `12345-uuid`.
- Remove the appStack and all associated data from the system after confirmation.

### Delete an appStack using the flag

```bash
stackgen appstack delete --appstack 12345-uuid
```

This command will:

- Prompt for confirmation before deleting the appStack with the specified id.
- Remove the appStack and all associated data from the system after confirmation.

### Force delete an appStack without confirmation

```bash
stackgen appstack delete 12345-uuid -y
```

This command will:

- Delete the appStack with id `12345-uuid` without asking for confirmation.
- Remove the appStack and all associated data from the system immediately.

note

- Deleting an appStack does not affect any infrastructure that has already been provisioned using this appStack.
- This action cannot be undone, so use it with caution.
- If you need to retain a record of the appStack configuration, export IaC with `download-iac` before deletion.
- Use `stackgen appstack list`, `show`, or `ls` to list appStacks and ids.

- [Usage](/docs/stackgen/cli-guide/usage/appstack/delete#usage)
- [Flags](/docs/stackgen/cli-guide/usage/appstack/delete#flags)
  - [Delete an appStack by positional id](/docs/stackgen/cli-guide/usage/appstack/delete#delete-an-appstack-by-positional-id)
  - [Delete an appStack using the flag](/docs/stackgen/cli-guide/usage/appstack/delete#delete-an-appstack-using-the-flag)
  - [Force delete an appStack without confirmation](/docs/stackgen/cli-guide/usage/appstack/delete#force-delete-an-appstack-without-confirmation)
