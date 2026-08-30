---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/appstack/download-iac"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/appstack/download-iac"
status: "ok"
---

The `stackgen appstack download-iac` command downloads Infrastructure as Code (IaC) files for an appStack. Use them for local development, deployment, or CI/CD.

## Usage

```bash
stackgen appstack download-iac [appstack] [flags]
```

## Flags

| Flag | Type | Description |
| --- | --- | --- |
| `--appstack` | string | appStack UUID or name to download. Use `stackgen appstack list`, `show`, or `ls`. |
| `--appstack-name` | string | Name of the appStack to download. |
| `--destination` | string | Destination directory for zipped IaC. Appends `.zip` if not present. If omitted, the CLI uses its default output path. |
| `--env-profile` | string | Name of the environment profile to download. |
| `-h`, `--help` |  | Help for download-iac. |
| `--unpack` |  | Unpack the downloaded zip file (default **`false`**). |
| `--latest` |  | Download IaC for the latest **appStack version** (default **`false`**). Legacy versioning flag. See note below. |
| `--version` | int32 | Download IaC for a specific **appStack version** number. Legacy versioning flag. See note below. |

note

StackGen moved day-to-day appStack history to [Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots). Prefer downloading IaC for the **current** appStack (omit `--version` and `--latest`) unless you intentionally need a legacy versioned download. `--version` and `--latest` remain in the CLI for older versioned appStacks.

**Examples**

### Download IaC by appStack ID (recommended) [](/docs/stackgen/cli-guide/usage/appstack/download-iac#download-iac-by-appstack-id-recommended%20%22Direct%20link%20to%20Download%20IaC%20by%20appStack%20ID%20(recommended)")

```bash
stackgen appstack download-iac --appstack app-1234abcd5678efgh --destination ./my-iac-files.zip
```

This command will:

- Download the IaC files for the specified appStack,
- Save the files to `./my-iac-files.zip`.

### Download IaC by appStack name

```bash
stackgen appstack download-iac --appstack-name my-production-app --destination ~/projects/infrastructure.zip
```

This command will:

- Download the IaC files for the appStack named `my-production-app`,
- Save the files to `~/projects/infrastructure.zip`.

### Legacy: download a specific appStack version

```bash
stackgen appstack download-iac --appstack app-1234abcd5678efgh --version 2 --destination ./v2-deployment.zip
```

Use this only when the appStack still has legacy versions. For current workflows, prefer [Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots) instead of `--version`.

### Legacy: download the latest appStack version

```bash
stackgen appstack download-iac --appstack app-1234abcd5678efgh --latest --destination ./latest-deployment.zip
```

Use this only for legacy versioned appStacks. Prefer omitting `--latest` for the current appStack, or use snapshots for history.

note

- The downloaded file is a ZIP archive containing the Terraform files for that appStack.
- You may need to extract and configure provider credentials before applying the IaC.
- If no destination is specified, files go to the CLI default output path.
- Use `stackgen appstack list`, `show`, or `ls` to list appStacks and ids.

- [Usage](/docs/stackgen/cli-guide/usage/appstack/download-iac#usage)
- [Flags](/docs/stackgen/cli-guide/usage/appstack/download-iac#flags)
  - [Download IaC by appStack ID (recommended)](/docs/stackgen/cli-guide/usage/appstack/download-iac#download-iac-by-appstack-id-recommended)
  - [Download IaC by appStack name](/docs/stackgen/cli-guide/usage/appstack/download-iac#download-iac-by-appstack-name)
  - [Legacy: download a specific appStack version](/docs/stackgen/cli-guide/usage/appstack/download-iac#legacy-download-a-specific-appstack-version)
  - [Legacy: download the latest appStack version](/docs/stackgen/cli-guide/usage/appstack/download-iac#legacy-download-the-latest-appstack-version)
