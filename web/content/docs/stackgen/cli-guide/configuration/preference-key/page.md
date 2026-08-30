---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/preference-key"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/preference-key"
status: "ok"
---

The `stackgen preference` command allows you to manage StackGen preferences, including retrieving preference values, listing available preference keys, and setting preference values for your organization or project.

## Usage

```bash
stackgen preference [command]
```

### Available Commands

| Command | Description |
| --- | --- |
| [`keys`](/docs/stackgen/cli-guide/configuration/preference-key#keys) | List available preference keys within StackGen |
| [`get`](/docs/stackgen/cli-guide/configuration/preference-key#get) | Retrieve preference values |
| [`set`](/docs/stackgen/cli-guide/configuration/preference-key#set) | Set preference values |

note

For `get` and `set`, the commands run for a specific environment. So let's say if you want to `set` preferences for your test environment, make sure you have [configured](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli) the relevant environment.

### Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Displays help information for the preference command. |

### Global Flags

Refer to the [Global flags](/docs/stackgen/cli-guide/usage/global-flags) section.

### Keys

Click to view

This command lists all available preference keys within StackGen. This is typically the first step to discover the preferences you can configure.

```bash
stackgen preference keys
```

This command displays a table showing all available preference keys, their descriptions, and default values.

Precedence is always **Organization** over **Tenant** (if a preference is set at both levels, the organization value is used).

| Key | Description | Default Value |
| --- | --- | --- |
| `topology.iac.export.`<br>`terraform.exportDirectory` | The directory where the Terraform files will be exported | `terraform` |
| `topology.iac.export.`<br>`helm.exportDirectory` | The directory where the Helm files will be exported | `helm` |
| `topology.iac.export.terraform.`<br>`exportRootProviderFiles`<br>`IfOnlyCustomResourcesUsed` | Flag to export root provider files `provider.tf` and `variables.tf` if only custom resources are used.<br>- When set to `true`, root provider files are exported.<br>- When set to `false`, root provider files are not exported when only custom resources are used. | `false` |
| `topology.iac.export.`<br>`blockExport`<br>`OnComplianceCheckFailure` | Flag to block IaC export if compliance check fails | `true` |
| `topology.iac.export.`<br>`defaultBackendType` | The default backend type for IaC exported from Topology | `none` |

### Allow Iac Export When Compliance Checks Fail

warning

Disabling export blocking allows workflows to proceed despite compliance violations. Use this only when your team accepts that risk or while governance policies are being updated.

By default, StackGen blocks Infrastructure as Code (IaC) export if any compliance or governance policy fails.

To allow export when compliance checks fail, set the preference to `false`:

```bash
stackgen preference set \
  --preference-key topology.iac.export.blockExportOnComplianceCheckFailure \
  --owner-type Organization \
  --value false
```

### Get

Click to view

This command lets you retrieve current preference values for your environment.

```bash
stackgen preference get
```

To retrieve the current preference values for a specific key, run the command:

```bash
stackgen preference get --preference-keys <preference-key>
```

#### Flags (get) [](/docs/stackgen/cli-guide/configuration/preference-key#flags-get%20%22Direct%20link%20to%20Flags%20(get)")

| Flag | Description |
| --- | --- |
| `-h, --help` | Help for preference get. |
| `--preference-keys` | Comma-separated list of preference keys to retrieve. |
| `--include-all-values` | Include all values for the selected preference key. |

**Example:**

```bash
stackgen preference get --preference-keys topology.iac.export.terraform.exportDirectory
```

**Example** (include all values for the key):

```bash
stackgen preference get --preference-keys topology.iac.export.terraform.exportDirectory --include-all-values
```

This command retrieves the current value of the Terraform export directory preference.

### Set

Click to view

This command lets you set preference values for your organization or project.

```bash
stackgen preference set [flags]
```

#### Flags

| Flag | Description |
| --- | --- |
| `-h, --help` | Displays help information for the set command |
| `--owner-type string` | The owner type to set (e.g., `Organization`, `Project`) |
| `--preference-key string` | The preference key to set |
| `--value string` | The value to set for the preference key |

**Examples**

- #### Set a preference for export directory [](/docs/stackgen/cli-guide/configuration/preference-key#set-a-preference-for-export-directory%20%22Direct%20link%20to%20Set%20a%20preference%20for%20export%20directory%22)






```bash
stackgen preference set --preference-key topology.iac.export.terraform.exportDirectory --owner-type Organization --value tf
```









This command sets the Terraform export directory preference to `tf` at the organization level.

- #### Set provider file export preference [](/docs/stackgen/cli-guide/configuration/preference-key#set-provider-file-export-preference%20%22Direct%20link%20to%20Set%20provider%20file%20export%20preference%22)






```bash
stackgen preference set --preference-key topology.iac.export.terraform.exportRootProviderFilesIfOnlyCustomResourcesUsed --owner-type Organization --value false --project <projectid>
```









This command disables the default provider file creation when only custom resources are used, at the organization level for a specific project.


- [Usage](/docs/stackgen/cli-guide/configuration/preference-key#usage)
  - [Available Commands](/docs/stackgen/cli-guide/configuration/preference-key#available-commands)
  - [Flags](/docs/stackgen/cli-guide/configuration/preference-key#flags)
  - [Global Flags](/docs/stackgen/cli-guide/configuration/preference-key#global-flags)
  - [Keys](/docs/stackgen/cli-guide/configuration/preference-key#keys)
  - [Allow Iac Export When Compliance Checks Fail](/docs/stackgen/cli-guide/configuration/preference-key#allow-iac-export-when-compliance-checks-fail)
  - [Get](/docs/stackgen/cli-guide/configuration/preference-key#get)
  - [Set](/docs/stackgen/cli-guide/configuration/preference-key#set)
