---
title: "Supported Clouds"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/upload/custom-modules"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/upload/custom-modules"
status: "ok"
---

Important

This command can only be used by users with the **DevOps** role.

The `stackgen upload custom-modules` command allows DevOps users to upload custom modules from a public or private **Git** repository, or from a **local directory** of Terraform module code.

## Supported Clouds

All cloud providers.

## Usage

```bash
stackgen upload custom-modules [flags]
```

**Aliases**: `custom-modules`, `custom-resources`

## Flags

| Flag | Type | Description |
| --- | --- | --- |
| `--branch` | string | Branch from which the custom module are to be read. |
| `--dir` | string | Local directory containing Terraform module code to upload as a blob. Mutually exclusive with Git source flags (`--repo-url`, `--ref`, `--branch`, `--tag`, `--subdir`, `--secret-name`). |
| `-h, --help` |  | Help for custom-modules. |
| `--name` | string | Unique identifier (name) for the custom module. Only alphanumeric characters, hyphens `-`, and underscores `_` are allowed. |
| `--overwrite-version` |  | Overwrite existing custom module version if it exists. |
| `-p, --provider` | string | Provider for the custom module. The default value is `aws`. |
| `--ref` | string | Module source URL with optional subdirectory (after `//`) and source ref (after `@`). Semver-like refs are treated as tags; use `tags/<name>` or `heads/<name>` after `@` to choose a tag or branch explicitly. Omitting `@` defaults to branch `main`. Example: `https://github.com/org/repo//modules/foo@v1.0.0`. |
| `--repo-url` | string | Repository URL for the custom module. |
| `--scope` | scope | Where to upload the module. Default is `tenant`. Only `tenant` is valid (module is available to every project in the tenant). |
| `-t, --secret-name` | string | Secret name (created in [secret store](/docs/stackgen/setup/settings#secret-store)) for repository authentication in case of private repository. If not provided, will read token from `SCM_TOKEN` and `SCM_TYPE` (github, gitlab, azurescm, bitbucket) env variable and create ephemeral secret in StackGen for uploading the module. If the env variable is not provided, it will assume that it is a public repository. |
| `-d, --subdir` | string | Subdirectory in the repository to scan for module. |
| `--tag` | string | Tag value of the repository for the custom module. |
| `--version` | string | Version name for the custom module. The default value is `1.0`. |

You can upload a custom module using `--repo-url`, `--ref`, or `--dir`.

- **Public repository**: If you do not set `--secret-name` and do not set `SCM_TOKEN` or `SCM_TYPE`, CLI will assume that you are uploading the custom module from a public repository.
- **Private repository**: you must provide authentication.
- **Local directory**: Use `--dir` with local Terraform module code. Do not combine `--dir` with Git source flags.

### Upload at tenant scope (default) [](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-at-tenant-scope-default%20%22Direct%20link%20to%20Upload%20at%20tenant%20scope%20(default)")

Click to view

When `--scope` is omitted, the module is uploaded at the tenant level and is available to every project in the tenant.

```bash
stackgen upload custom-modules \
  --name my-module \
  --provider aws \
  --repo-url https://github.com/org/repo \
  --branch main
```

### Upload from a local directory

Click to view

Upload local Terraform module code as a blob with `--dir`. This path does not use Git source flags.

See [v2026.7.9](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#cli-local-module-upload).

```bash
stackgen upload custom-modules \
  --name my-module \
  --provider aws \
  --dir ./modules/foo \
  --version 1.0.0
```

### Upload with `--ref`

Click to view

```bash
stackgen upload custom-modules \
  --scope tenant \
  --name my-module \
  --provider aws \
  --ref https://github.com/org/repo//modules/foo@v1.0.0
```

### Upload from a public repository

Click to view

Do not set `--secret-name` and do not set `SCM_TOKEN` or `SCM_TYPE`. The CLI will assume that you are uploading the custom module from a public repository.

```bash
stackgen upload custom-modules \
  --tag <version-tag-of-the-repo> \
  --repo-url "<public-repo-url>" \
  --name "<module-name>"
```

**Optional**: use `--branch`, `--tag`, and `-d` or `--subdir` to specify the branch, tag, or subdirectory from where the CLI has to read the custom module.

### Upload from a private repository

Click to view

You must authenticate using one of the following:

**Option 1: Secret from StackGen secret store**

Create a secret in StackGen [secret store (Settings > Secret Store)](/docs/stackgen/setup/settings#secret-store) for your SCM provider. Pass the name of your secret using the `-t, --secret-name` flag:

```bash
stackgen upload custom-modules \
  --branch main \
  --repo-url "<private-repo-url>" \
  --name "<module-name>" \
  --subdir "<subdir>" \
  --secret-name "<secret-name>"
```

**Option 2: Environment variables**

Set `SCM_TOKEN` and `SCM_TYPE` in your shell (or in your CI/CD pipeline environment) before running the command. Use `SCM_TYPE` for your provider (`github`, `gitlab`, `azurescm`, or `bitbucket`). The CLI will create an ephemeral secret in StackGen for the upload:

```bash
export SCM_TOKEN="your_token"

export SCM_TYPE="github"

stackgen upload custom-modules \
  --repo-url "<repo-url>" \
  -p aws \
  --name "<module-name>" \
  --version 1.0
```

When running in a supported SCM pipeline (for example GitHub Actions), the pipeline token (for example `GITHUB_TOKEN`) is often available automatically; see your pipeline documentation.

note

**GitHub Enterprise:** You may need to allowlist StackGen’s egress IP addresses in your corporate firewall. Contact your StackGen representative for the list.

- [Supported Clouds](/docs/stackgen/cli-guide/usage/upload/custom-modules#supported-clouds)
- [Usage](/docs/stackgen/cli-guide/usage/upload/custom-modules#usage)
- [Flags](/docs/stackgen/cli-guide/usage/upload/custom-modules#flags)
  - [Upload at tenant scope (default)](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-at-tenant-scope-default)
  - [Upload from a local directory](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-from-a-local-directory)
  - [Upload with `--ref`](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-with---ref)
  - [Upload from a public repository](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-from-a-public-repository)
  - [Upload from a private repository](/docs/stackgen/cli-guide/usage/upload/custom-modules#upload-from-a-private-repository)
