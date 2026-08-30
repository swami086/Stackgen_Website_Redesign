---
title: "What Is Backstage?"
product: "stackgen"
sourcePath: "/docs/integrations/backstage"
sourceUrl: "https://docs.stackgen.com/docs/integrations/backstage"
status: "ok"
---

For **Developers**, **Platform Engineers**, and **DevOps Teams**

The StackGen-Backstage integration is available upon request. Please reach out to [support@stackgen.com](mailto:support@stackgen.com) to access this feature.

## What Is Backstage?

[Backstage](https://backstage.io/docs/overview/what-is-backstage) is an open-source developer portal framework developed by **Spotify**. It uses a centralized software catalog to define services in terms of:

- **Components**: standalone software units
- **APIs**: interfaces between components
- **Resources**: infrastructure dependencies

## StackGen-Backstage Integration

The **StackGen Backstage** plugin enables automated generation of **Infrastructure as Code (IaC)** from service metadata captured in **Backstage**. It streamlines cloud deployment workflows by offering a foundational infrastructure outline based on the cataloged components and their dependencies. The plugin supports mappings for multiple clouds and allows users to override default configurations, making it adaptable across cloud environments like AWS, Azure, GCP, and Civo.

Some of the use cases that this integration aims to solve are:

- **Kickstarting Cloud-Native Projects**: Teams launching new services can generate basic infrastructure templates from the metadata already captured in Backstage.
- **IaC Modernization**: For teams with outdated or unstructured IaC, the plugin offers a structured and templated starting point.
- **Proof-of-Concept Environments**: Quickly scaffold infrastructure for experimentation or early testing without handcrafting Terraform from scratch.
- **Documentation-Driven Deployment**: When service documentation is already available in Backstage but lacks the corresponding deployment infrastructure.

## Key Features

- **Metadata-Driven IaC Generation**: Transforms Backstage service metadata into templated IaC definitions.
- **Supports Services and Resources**: Differentiates between service components (e.g., microservices, apps) and resources (e.g., databases, queues, gateways).
- **Cloud-Agnostic Deployment**: Allows environment-specific overrides (e.g., AWS RDS vs. GCP SQL) to support deployments across different cloud platforms.
- **Pluggable & Extensible**: Built as a Backstage plugin, enabling seamless integration into existing developer portals.
- **appStack Integration**: Connects selected Backstage components to StackGen’s appStack to generate a base IaC.

## Problems Solved And Benefits Delivered

| Problem | StackGen Backstage Benefit |
| --- | --- |
| Missing or poor-quality IaC | Automatically generates clean, templated Infrastructure as Code (IaC), providing a strong starting point for production-ready infrastructure. |
| Service metadata is siloed | Leverages existing metadata in Backstage, reducing duplication and aligning infrastructure with service definitions. |
| Support across multiple clouds | Supports cloud-specific resource mapping and overrides, enabling flexible deployments across AWS, GCP, etc. |
| Manual infrastructure provisioning is time-consuming | Accelerates infrastructure setup for new services or teams through metadata-driven automation. |
| Inconsistent deployment strategies across teams | Provides a standardized approach to infrastructure generation, improving consistency and maintainability. |
| Knowledge gaps between developers and DevOps | Bridges the gap by translating service-level metadata into deployable infrastructure, making ownership clearer. |
| Onboarding delays for new projects | Jumpstarts cloud deployments with pre-scaffolded IaC based on Backstage data, reducing ramp-up time. |
| Lack of visibility into existing infrastructure | Creates a transparent link between services and their infrastructure dependencies, improving observability. |

## StackGen-Backstage Integration: From Metadata to Infrastructure

The StackGen backend integrates seamlessly with your existing developer workflows by consuming metadata from Backstage and generating compliant, ready-to-deploy infrastructure-as-code (IaC). This integration ensures that application definitions drive automated, standards-aligned infrastructure provisioning.

![BackStage-StackGen](https://docs.stackgen.com/assets/images/backstage-stackgen-1fc6c3b4e270784675bd03f61489d8ac.png)

### Inputs

StackGen relies on two primary inputs from your Backstage environment:

**System Model Definitions (YAML)**: Your developers define application architecture using Backstage's system modeling capabilities. These YAML files describe systems, components, and their relationships in a structured format that StackGen can interpret.

**Cataloged Service Metadata**: Each service registered in Backstage includes metadata such as runtime type, owner, dependencies, and deployment requirements. This metadata enables StackGen to understand how services are configured and interconnected.

### Integration Workflow

1. **Developers Define Applications in Backstage**: Your teams use Backstage to model their systems using standardized YAML specs. These definitions become the source of truth for infrastructure requirements.

2. **Developers Map Backstage Specs with StackGen Resources**: Your teams will need to map Backstage service metadata to StackGen Resource Types. These mappings can also be used to synchronize Backstage Components and Resources with StackGen as Compute and Data Storage resources.

3. **StackGen Interprets Service Metadata**: When you click **Sync**, StackGen ingests the cataloged service information and analyzes relationships, dependencies, and required resources.

4. **Create or Overwrite an appStack**: Your team can choose to create an appStack from scratch or overwrite (replace) an existing appStack in StackGen.



note





   - Updating an appStack using the StackGen Backstage integration does not create an appStack version.
   - Syncing a single component from Backstage, will replace all the existing components in an appStack with the single component. Refer to the [May KI](/docs/stackgen/help-center/known-issues/may2025#in-progress-syncing-a-single-component-in-backstage-replaces-the-entire-appstack-in-stackgen)

5. **Automated Generation of appStack**: Based on the interpreted data, StackGen generates a complete logical infrastructure representation tailored to the service’s needs. This includes both explicitly defined components and any implicitly required resources (e.g., VPCs, subnets, and security groups).

6. **Output Conforms to Organizational Standards**: The generated appStack is aligned with your organization’s IaC templates, security policies, naming conventions, tagging schemas, and deployment environments. This ensures consistency, compliance, and maintainability across projects.


### Outputs

**appStack Configuration**: A StackGen-specific blueprint that captures the full set of infrastructure resources needed to deploy and run your application.
**IaC Templates**: Deployment-ready code in the Terraform format, structured to plug directly into your CI/CD workflows or provisioning pipelines.

## Related Docs

- [Backstage System Model Spec](https://backstage.io/docs/features/software-catalog/system-model/)
- [StackGen appStack Reference](/docs/stackgen/concepts/appstacks)

- [What Is Backstage?](/docs/stackgen/integrations/backstage#what-is-backstage)
- [StackGen-Backstage Integration](/docs/stackgen/integrations/backstage#stackgen-backstage-integration-1)
- [Key Features](/docs/stackgen/integrations/backstage#key-features)
- [Problems Solved And Benefits Delivered](/docs/stackgen/integrations/backstage#problems-solved-and-benefits-delivered)
- [StackGen-Backstage Integration: From Metadata to Infrastructure](/docs/stackgen/integrations/backstage#stackgen-backstage-integration-from-metadata-to-infrastructure)
  - [Inputs](/docs/stackgen/integrations/backstage#inputs)
  - [Integration Workflow](/docs/stackgen/integrations/backstage#integration-workflow)
  - [Outputs](/docs/stackgen/integrations/backstage#outputs)
