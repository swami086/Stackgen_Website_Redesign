---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/manage/type"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/manage/type"
status: "ok"
---

The `stackgen resource type` command allows you to list and filter the resource types supported by the StackGen platform. This helps you identify what resources are available for use in your infrastructure.

## Usage

```bash
stackgen resource type [flags]
```

## Flags

| Flag | Description |
| --- | --- |
| `-a, --appstack string` | AppStack UUID or name in the current project. Use `stackgen appstack list` for names and ids. |
| `-c, --custom` | Custom resource |
| `-d, --deployment-type string` | Deployment type (default "k8s") |
| `-h, --help` | Help for type |
| `-r, --pattern string` | The pattern of the resource |
| `-p, --provider string` | Cloud provider (Default value is "aws"). Use this flag to specify the cloud provider whose resources you want to list. Refer to the [**Known Issues**](/docs/stackgen/help-center/known-issues/apr2025#fixed-using-the-provider-azuread-flag-may-result-in-incomplete-list-of-resource-types) section to understand the limitations of the AzureAD provider. |
| `-k, --resource-pack` | Resource pack |

**Examples**

### List supported resources for the `azurerm` provider:

```bash
stackgen resource type --provider azurerm
```

### List all available resource types

```bash
stackgen resource type
```

This command will:

- Display a complete list of all resource types supported by StackGen
- Use the default provider (AWS) and deployment type (k8s)

### Filter resources with multiple criteria

```bash
stackgen resource type --appstack <appstack-id-or-name> --deployment-type <deployment-type> --custom --resource-pack --provider <provider> --pattern <resource-type>
```

This command will:

- Filter resources based on multiple criteria
- Only show resources that match all specified filters

### Filter resources by provider

```bash
stackgen resource type -p azure
```

This command will:

- Display only Azure resources supported by StackGen
- Override the default provider (AWS)

### Filter resources by deployment type

```bash
stackgen resource type -d aws-lambda
```

This command will:

- Display only resources compatible with AWS Lambda deployments
- Override the default deployment type (k8s)

### Search for specific resources by pattern

```bash
stackgen resource type -r database
```

This command will:

- Display resources containing "database" in their name or description
- Help quickly find specific types of resources

### List custom resources only

```bash
stackgen resource type -c
```

This command will:

- Only display custom resources that have been uploaded to the system
- Filter out built-in resources

### List resource packs

```bash
stackgen resource type -k
```

This command will:

- Display available resource packs
- Useful for identifying resource pack IDs for governance policies

note

- The output includes the full resource type identifier used in StackGen
- Resource types are grouped by provider for easier navigation
- This command is useful when planning your infrastructure requirements
- The default provider is "aws" and default deployment type is "k8s" if not specified

- [Usage](/docs/stackgen/cli-guide/usage/manage/type#usage)
- [Flags](/docs/stackgen/cli-guide/usage/manage/type#flags)
  - [List supported resources for the `azurerm` provider:](/docs/stackgen/cli-guide/usage/manage/type#list-supported-resources-for-the-azurerm-provider)
  - [List all available resource types](/docs/stackgen/cli-guide/usage/manage/type#list-all-available-resource-types)
  - [Filter resources with multiple criteria](/docs/stackgen/cli-guide/usage/manage/type#filter-resources-with-multiple-criteria)
  - [Filter resources by provider](/docs/stackgen/cli-guide/usage/manage/type#filter-resources-by-provider)
  - [Filter resources by deployment type](/docs/stackgen/cli-guide/usage/manage/type#filter-resources-by-deployment-type)
  - [Search for specific resources by pattern](/docs/stackgen/cli-guide/usage/manage/type#search-for-specific-resources-by-pattern)
  - [List custom resources only](/docs/stackgen/cli-guide/usage/manage/type#list-custom-resources-only)
  - [List resource packs](/docs/stackgen/cli-guide/usage/manage/type#list-resource-packs)
