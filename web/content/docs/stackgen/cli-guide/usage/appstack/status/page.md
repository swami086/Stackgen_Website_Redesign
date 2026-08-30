---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/status"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/status"
status: "ok"
---

The `stackgen appstack status` command checks the current status of an appStack so you can monitor readiness and pending actions or issues.

## Usage

```bash
stackgen appstack status [appstack-id] [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for status. |

See [Global flags](/docs/stackgen/cli-guide/usage/global-flags) for `--project`, `--output`, `--interactive`, `--log`, and `--stackgen-home`.

**Examples**

### Check status by appStack ID

```bash
stackgen appstack status app-1234abcd5678efgh
```

This command will:

- Display the current status of the appStack with id `app-1234abcd5678efgh`
- Show information about the processing state, validation status, and other relevant details

## Status Information

The status output typically includes:

- Processing State: Whether the appStack is being analyzed, updated, or is ready
- Validation Status: Any validation errors or warnings
- Required Actions: List of actions needed before the appStack can be deployed
- Dependencies: Status of dependencies between resources
- Compliance: Status of resource policy compliance

note

- Use this command to troubleshoot issues with appStack creation or updates
- The status command is useful before downloading IaC to ensure all requirements are met
- Regular status checks can help identify configuration issues early in the development process

- [Usage](/docs/stackgen/cli-guide/usage/appstack/status#usage)
- [Flags](/docs/stackgen/cli-guide/usage/appstack/status#flags)
  - [Check status by appStack ID](/docs/stackgen/cli-guide/usage/appstack/status#check-status-by-appstack-id)
