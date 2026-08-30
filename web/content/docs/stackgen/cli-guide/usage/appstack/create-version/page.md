---
title: "Supported appStack CLI commands"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/create-version"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/create-version"
status: "ok"
---

note

`stackgen appstack create-version` still runs (`stackgen appstack create-version -h` works), but it is **not** listed under `Available Commands` in `stackgen appstack -h`.

StackGen moved day-to-day appStack history to [Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots). Do not use `create-version` for new workflows. Prefer snapshots to capture and restore appStack state.

Some help text mentions `--raw-output` for id-only output. That flag is rejected (`unknown flag: --raw-output`). Use global `--output json` when you need machine-readable output.

## Supported appStack CLI commands

Use these subcommands from `stackgen appstack -h`:

- [create](/docs/stackgen/cli-guide/usage/appstack/create)
- [list](/docs/stackgen/cli-guide/usage/appstack/show) (`show`, `ls`)
- [list-templates](/docs/stackgen/cli-guide/usage/appstack/list-templates)
- [download-iac](/docs/stackgen/cli-guide/usage/appstack/download-iac)
- [status](/docs/stackgen/cli-guide/usage/appstack/status)
- [delete](/docs/stackgen/cli-guide/usage/appstack/delete)

See [Manage appStacks](/docs/stackgen/cli-guide/usage/appstack).
