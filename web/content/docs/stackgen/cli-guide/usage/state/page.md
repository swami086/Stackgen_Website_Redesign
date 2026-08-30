---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/state"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/state"
status: "ok"
---

The `stackgen state` command is used to run OpenTofu or Terraform state operations against appStack IaC.

## Usage

```bash
stackgen state [command]
```

## Sub Commands

### push

The `stackgen state push` command is used to initialize Tofu or Terraform configuration and push state to a remote backend.

For **Cloud Discovery** appStacks, you can also push state from the UI in state backend settings. See [Push Terraform state to a remote backend](/docs/stackgen/concepts/clouddiscovery#push-terraform-state-to-a-remote-backend) and [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#push-tf-state-to-remote-backend).

```bash
stackgen state push [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `--appstack string` | AppStack UUID or name in the current project. Use `stackgen appstack list` for names and ids. |
| `-e`, `--environment string` | Environment profile name when exporting IaC (same as `stackgen provision`). |
| `--iac-tool string` | IaC tool: `terraform` or `tofu` (default `terraform`). |
| `-h`, `--help` | Help for `push`. |

See [Global CLI flags](/docs/stackgen/cli-guide/usage/global-flags) for `--interactive`, `--log`, `--output`, `--project`, and `--stackgen-home`.

**Examples**

### Usage 1: Push state for an appStack with OpenTofu

```bash
stackgen state push --appstack my-production-app --environment dev --iac-tool=tofu
```

The above command will:

- Download IaC for `my-production-app` using the `dev` environment profile.
- Run `tofu init` and push the appStack state to the remote backend.

- [Usage](/docs/stackgen/cli-guide/usage/state#usage)
- [Sub Commands](/docs/stackgen/cli-guide/usage/state#sub-commands)
  - [push](/docs/stackgen/cli-guide/usage/state#push)
- [Flags](/docs/stackgen/cli-guide/usage/state#flags)
  - [Usage 1: Push state for an appStack with OpenTofu](/docs/stackgen/cli-guide/usage/state#usage-1-push-state-for-an-appstack-with-opentofu)
