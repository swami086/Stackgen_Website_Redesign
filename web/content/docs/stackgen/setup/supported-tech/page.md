---
title: "Supported Resources"
product: "stackgen"
sourcePath: "/docs/setup/supported-tech"
sourceUrl: "https://docs.stackgen.com/docs/setup/supported-tech"
status: "ok"
---

StackGen is designed to work seamlessly with a range of technologies, ensuring broad compatibility and flexibility. Below is a list of the currently supported technologies across categories.

| Category | Technology |
| --- | --- |
| Language | Rego language for Policies |
| Infrastructure as Code (IaC) | - Terraform<br>- OpenTofu<br>- Helm |
| Cloud Providers | - Amazon Web Services (AWS)<br>- Microsoft Azure<br>- Google Cloud Platform (GCP)<br>- Civo Cloud<br>- Oracle Cloud Infrastructure (OCI) |
| Container Orchestration | - Amazon Elastic Kubernetes Service (EKS)<br>- Amazon Elastic Compute Service (ECS) |
| Version Control System (VCS) | - GitHub<br>- GitLab<br>- BitBucket<br>- Azure Devops |

## Supported Resources

See a full list of supported resources [here](/docs/stackgen/setup/supported-tech/supported-technologies-list).

note

**OCI** is available for all tenants. There are no built-in OCI modules yet. Use custom OCI modules and run plan and apply with the **CLI**. StackGen also offers a **generic** cloud type for module sources that are not a traditional cloud (for example GitHub modules). See [Cloud provider limitations](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci) and [IaC from Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch).
