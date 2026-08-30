---
title: "Key Characteristics"
product: "stackgen"
sourcePath: "/docs/concepts/resources/data-source"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/data-source"
status: "ok"
---

**Data Sources** in StackGen represent infrastructure components that are referenced but not managed directly by StackGen. They are used to query existing information from your cloud environment—such as fetching details about a VPC, subnet, or AMI—without creating or modifying those resources.

Data sources help improve reusability and modularity by allowing you to use existing infrastructure components as inputs for your appStack, without the risk of duplication or drift.

## Key Characteristics

- **Read-Only**: Data sources are never created, modified, or deleted—only referenced.
- **Reusable**: Can be used across multiple appStacks to ensure consistency.
- **Linkable**: Data sources can be connected to other resources in the Topology Canvas.
- **Safe by Design**: They prevent accidental overwrite of critical production infrastructure.

## When to Use Data Sources

Use data sources when:

- You want to reference existing infrastructure without managing it in StackGen.
- Your organisation has shared networking or IAM components.
- You’re adopting StackGen incrementally and already have infrastructure deployed.

## Supported Examples

| Provider | Data Source Example | Usage |
| --- | --- | --- |
| AWS | `aws_vpc`, `aws_ami`, `aws_subnet` | Reference existing VPC or AMI for an EC2 instance. |
| Azure | `azurerm_resource_group` | Fetch an existing resource group. |
| GCP | `google_compute_subnetwork` | Use an existing subnetwork in a GKE cluster. |

## Marking a Resource as a Data Source

To convert a regular resource into a data source:

1. In the Topology Canvas, drag and drop the required resource.
2. Select the resource and enable the **Mark as Data Source** toggle from the sidebar panel.
3. This changes the resource to a read-only reference.

caution

Marking a resource as a data source will remove its editable fields and all existing connections. Ensure this is intentional before proceeding.

## Next Steps

- [Learn more about managing resources in StackGen →](/docs/stackgen/concepts/resources)
- [See how to connect data sources to other resources →](/docs/stackgen/concepts/topology/configure-resource)
- [Understand how imported infrastructure appears as data sources →](/docs/stackgen/concepts/iac/import-iac/importing-iac)
