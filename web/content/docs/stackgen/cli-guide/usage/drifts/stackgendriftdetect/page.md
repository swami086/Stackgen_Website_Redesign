---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/drifts/stackgendriftdetect"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/drifts/stackgendriftdetect"
status: "ok"
---

The `stackgen drift detect` command is used to compare live infrastructure to the desired state from a StackGen appStack or from local IaC.

note

**OCI**: You can run drift detect on OCI appStacks with the CLI when credentials and backend config are set. Pass `--appstack` plus the `--var` and `--backend-config` values your environment needs. See [Cloud provider limitations](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci).

## Usage

```bash
stackgen drift detect [flags]
```

## Flags

| Flag | Description | Required |
| --- | --- | --- |
| `--appstack string` | StackGen appStack UUID or name for appStack-based drift. | Use this or a custom IaC path with `--name` (see below). |
| `--backend-config strings` | Backend config to pass to drift detection. | No |
| `--ci-job-url string` | URL of the CI job that triggered the CLI command. | No |
| `--environment string` | Environment for drift detection. Only with `--appstack`. | No |
| `-h`, `--help` | Help for detect | No |
| `--iac-tool string` | IaC tool: `terraform` or `tofu` (default `terraform`). See [IaC tool and infrastructure lifecycle](/docs/stackgen/cli-guide/usage/provision-infra-with-cli#iac-tool-and-infrastructure-lifecycle). | No |
| `--name string` | Unique name for the IaC source. Required when `--appstack` is not set. | Required for custom IaC flow |
| `--timeout duration` | Timeout for drift detection (default `10m0s`). | No |
| `--var strings` | Variables to pass to drift detection. | No |
| `--var-file string` | Path to the vars file. | No |
| `-v`, `--verbose` | Print each OpenTofu/Terraform subprocess invocation and captured stdout/stderr to stderr. | No |
| `--work-dir string` | Directory for IaC files. If `--appstack` is set, IaC is cloned here. | No |

note

Use `--work-dir`, not `--iac-dir`.

You can use this subcommand and flags to detect drift for your IaC in two ways:

- [Detect Drift for an appStack](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#detect-drift-for-an-appstack)
- [Detect Drift for a Custom IaC](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#detect-drift-for-a-custom-iac)

## Detect Drift for an appStack

Click to view

### Usage

Detect drift for an appStack:

```bash
stackgen drift detect --appstack=<appstack-id-or-name> --var="region=<region>"
```

### Flags

Refer to the section on [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#flags) to know more about the supported flags.

**Example**: Run a drift detection on your appStack with an appStack ID `12345` deployed in the `us-east-1` region on your AWS cloud.

```bash
stackgen drift detect --appstack=12345 --var="region=us-east-1"
```

**Sample Output**: You will also see a summary table.

```bash
Drift Summary:

Total Resources: 16

Total Drifts: 1

Resources to be Created: 0

Resources to be Updated: 1

Resources to be Deleted: 0

Resource Drifts:

+----------+---------------+---------+-----------+--------------------------------+

| RESOURCE |     TYPE      | ACTION  |  REGION   |          DESCRIPTION           |

+----------+---------------+---------+-----------+--------------------------------+

| this     | aws_s3_bucket | changed | us-east-1 | Resource attributes has been   |

|          |               |         |           | updated                        |

+----------+---------------+---------+-----------+--------------------------------+
```

This kind of result tells you there's partial drift. Some things are out of sync, and you might want to review, update, or reapply your IaC to bring the actual state back in line.

### Output Explained

The command will return a summary of detected drift:

| Field | Description |
| --- | --- |
| Total Resources | Your IaC configuration defines **16** resources in total. |
| Total Drifts | **1** of those resources shows signs of drift. These are either not deployed yet, manually changed, or out of sync. |
| Resources to be Created | **0** resource is defined in your IaC but not found in the live environment. You will have to create it. |
| Resources to be Updated | **1** existing resource was manually altered (e.g., instance type, security group rules) and differs from what's declared in your IaC. |
| Resources to be Deleted | **0** resources were found in the live environment that are missing from your IaC (so nothing extra was created manually). |

## Detect Drift for a Custom IaC

Click to view

### Usage

Run drift detection against your own local IaC project (e.g., Terraform).

```bash
stackgen drift detect --name <my-project> --work-dir ./terraform
```

### Flags

Refer to the section on [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#flags) to know more about the supported flags.

**Example**: Run drift detection using your local IaC, in this case, a Terraform project.

```bash
stackgen drift detect --name mytest --work-dir ./terraform
```

**Sample Output**: You will also see a summary table.

```bash
Drift Summary:

Total Resources: 16

Total Drifts: 1

Resources to be Created: 0

Resources to be Updated: 1

Resources to be Deleted: 0

Resource Drifts:

+----------+---------------+---------+-----------+--------------------------------+

| RESOURCE |     TYPE      | ACTION  |  REGION   |          DESCRIPTION           |

+----------+---------------+---------+-----------+--------------------------------+

| this     | aws_s3_bucket | changed | us-east-1 | Resource attributes has been   |

|          |               |         |           | updated                        |

+----------+---------------+---------+-----------+--------------------------------+
```

This kind of result tells you there's partial drift. Some things are out of sync, and you might want to review, update, or reapply your IaC to bring the actual state back in line.

### Output Explained

The command will return a summary of detected drift:

| Field | Description |
| --- | --- |
| Total Resources | Your IaC configuration defines **16** resources in total. |
| Total Drifts | **1** of those resources shows signs of drift. These are either not deployed yet, manually changed, or out of sync. |
| Resources to be Created | **0** resource is defined in your IaC but not found in the live environment. You will have to create it. |
| Resources to be Updated | **1** existing resource was manually altered (e.g., instance type, security group rules) and differs from what's declared in your IaC. |
| Resources to be Deleted | **0** resources were found in the live environment that are missing from your IaC (so nothing extra was created manually). |

To see how this looks in your StackGen User Interface refer to the steps mentioned in the [Drifts User Guide](/docs/stackgen/concepts/drift/detectdrift#view-drift-results-in-ui)

- [Usage](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#usage)
- [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#flags)
- [Detect Drift for an appStack](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#detect-drift-for-an-appstack)
  - [Usage](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#usage-1)
  - [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#flags-1)
  - [Output Explained](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#output-explained)
- [Detect Drift for a Custom IaC](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#detect-drift-for-a-custom-iac)
  - [Usage](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#usage-2)
  - [Flags](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#flags-2)
  - [Output Explained](/docs/stackgen/cli-guide/usage/drifts/stackgendriftdetect#output-explained-1)
