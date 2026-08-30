---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/azureflags"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/azureflags"
status: "ok"
---

Azure-specific flags in Cloud to Code help you control which Azure resources are imported into Terraform configuration files. Here's how they work:

## Usage

To import only mystorage from `my-resource-group`, instead of pulling `all` resources, run the command:

```bash
    cloud2code import azure --subscription-id a1b2c3d4-567e-89f0-1234-56789abcdef0 \
    --resource-group my-resource-group \
    --resource-ids /subscriptions/a1b2c3d4-567e-89f0-1234-56789abcdef0/resourceGroups/my-group/providers/Microsoft.Storage/storageAccounts/mystorage
```

note

Cloud2code identifies the child resources of a parent resource and imports them while querying a resource group. For example, if a VNet is imported, StackGen will import all its subnets.

## How Each Flag is Used

- **`--subscription-id` (Required)**: This flag is mandatory and specifies the Azure Subscription ID from which resources will be imported. Without it, Cloud to Code will not know which subscription to access.



**Usage**





```bash
cloud2code import azure --subscription-id a1b2c3d4-567e-89f0-1234-56789abcdef0
```









The above code will import all resources from the specified `subscription-id`.

- **`--resource-group` (Optional, but helpful)**: Limits the import to a specific Azure Resource Group instead of scanning the whole subscription. It also helps you reduce unnecessary imports and speeds up the process.

**Usage**





```bash
cloud2code import azure --subscription-id a1b2c3d4-567e-89f0-1234-56789abcdef0 --resource-group my-resource-group
```









This imports only resources inside the my-resource-group.

- **`--resource-ids` (Optional, for precise control)**: Import specific resources using their Azure Resource ID. You can run this command when you need to import only specific resources instead of everything under a resource group.

**Usage**





```bash
cloud2code import azure --subscription-id a1b2c3d4-567e-89f0-1234-56789abcdef0 \ --resource-ids /subscriptions/a1b2c3d4-567e-89f0-1234-56789abcdef0/resourceGroups/my-group/providers/Microsoft.Compute/virtualMachines/my-vm
```









This imports only the specific virtual machine `my-vm`, and ignores everything else.


## When to Use Each Flag

| Scenario | Flags to Use | Example Command |
| --- | --- | --- |
| Import all resources in a subscription | `--subscription-id` | `cloud2code import azure --subscription-id <sub_id>` |
| Import all resources in a specific resource group | `--subscription-id` \+ `--resource-group` | `cloud2code import azure --subscription-id <sub_id> --resource-group <rg_name>` |
| Import specific resources only | `--subscription-id` \+ `--resource-ids` | `cloud2code import azure --subscription-id <sub_id> --resource-ids <resource_id>` |
| Import specific resources within a resource group | `--subscription-id` \+ `--resource-group` \+ `--resource-ids` | `cloud2code import azure --subscription-id <sub_id> --resource-group <rg_name> --resource-ids <resource_id>` |
