---
title: "Types of Built-In Resources"
product: "stackgen"
sourcePath: "/docs/concepts/resources/built-in-resource"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/built-in-resource"
status: "ok"
---

Built-In Resources in StackGen refer to infrastructure components that are natively available on the platform. These resources are pre-modeled based on popular services across AWS, Azure, GCP, and Helm, and can be directly added to the Topology Canvas without requiring manual setup or configuration.

Built-In Resources are maintained by the StackGen project and follow best practices for deployment and integration. They are optimised for modularity, reusability, and ease of use—allowing teams to quickly model production-ready infrastructure across cloud providers.

## Types of Built-In Resources

StackGen supports two categories of built-in resources:

- **[Standalone Resources](/docs/stackgen/concepts/resources/built-in-resource#standalone-resources)**
- **[Grouped Resources](/docs/stackgen/concepts/resources/built-in-resource#grouped-resources)**

## Standalone Resources

Standalone Resources are individual cloud services that can be added, configured, and managed independently. They do not come with automatic dependencies and are useful when you want to build infrastructure from first principles or import resources individually.

### Key Characteristics

- **Atomic by Design**: Each resource corresponds to a single cloud service (e.g., EC2, IAM Role, S3 Bucket).
- **Independent Configuration**: They can be versioned, tagged, and connected manually.
- **Terraform-Mapped**: Directly aligned with provider-native Terraform resource types.

### Examples

- **AWS**: EC2 Instance, S3 Bucket, IAM Role, VPC
- **Azure**: Virtual Machine, Storage Account, Role Assignment
- **GCP**: Compute Engine, Cloud Storage, IAM Role
- **Helm**: Prometheus Chart, Grafana Chart

note

Use standalone resources when you want precise control over configuration, or when importing infrastructure into the Topology Canvas.

## Grouped Resources

Grouped Resources are bundles of related services automatically connected when added to the Topology Canvas. They are designed to reflect real-world deployment patterns and save time during setup.

### Key Characteristics

- **Pre-Connected**: Supporting components like IAM roles or log groups are auto-wired.
- **Production-Ready Defaults**: Best practice configurations are applied automatically.
- **Configurable**: You can modify or remove parts of the group after adding it.

### Examples

- **AWS Lambda**: Comes with IAM Role and Log Group
- **Azure Function App**: Includes App Service Plan and Storage
- **GKE Cluster**: Includes Node Pool and IAM
- **Helm App**: Includes Namespace and ConfigMap when required

note

Use grouped resources while deploying common service patterns or to reduce the time spent configuring dependencies manually.

## When to Use Built-In Resources

Built-In Resources are ideal when:

- You want to deploy standard infrastructure components quickly.
- You need cloud-specific resources that follow recommended defaults.
- You want a simplified, visual way to model your cloud infrastructure.
- You prefer using platform-maintained templates with sensible defaults.

They work seamlessly within appStacks, support version control, and align with StackGen’s governance, provisioning, and export capabilities.

For step-by-step instructions on adding a resource go to [Add New Resource](/docs/stackgen/concepts/topology/new-resource) and configuring built-in resources, refer to the [Configure a Resource](/docs/stackgen/concepts/topology/configure-resource).

- [Types of Built-In Resources](/docs/stackgen/concepts/resources/built-in-resource#types-of-built-in-resources)
- [Standalone Resources](/docs/stackgen/concepts/resources/built-in-resource#standalone-resources)
  - [Key Characteristics](/docs/stackgen/concepts/resources/built-in-resource#key-characteristics)
  - [Examples](/docs/stackgen/concepts/resources/built-in-resource#examples)
- [Grouped Resources](/docs/stackgen/concepts/resources/built-in-resource#grouped-resources)
  - [Key Characteristics](/docs/stackgen/concepts/resources/built-in-resource#key-characteristics-1)
  - [Examples](/docs/stackgen/concepts/resources/built-in-resource#examples-1)
