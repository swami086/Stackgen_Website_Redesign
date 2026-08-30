---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/integrations/hcp-terraform"
sourceUrl: "https://docs.stackgen.com/docs/integrations/hcp-terraform"
status: "ok"
---

## Overview

StackGen integrates with [HashiCorp Cloud Platform (HCP Terraform)](https://www.hashicorp.com/cloud) to combine StackGen's visual infrastructure design with Terraform’s remote state, policy enforcement, and governance. With this integration, you design infrastructure visually in StackGen, generate production-ready Terraform HCL, and deploy it through HCP Terraform.

StackGen makes it easier to create secure, validated infrastructure blueprints, while HCP Terraform provides remote state management, policy enforcement, and audit trails.

**Key Features**

The integration combines the simplicity of StackGen with the governance of HCP Terraform. Together, they deliver the following capabilities:

- Visual canvas to design appStacks (infrastructure blueprints),
- Automatic generation of Terraform HCL with HCP backend configuration,
- Built-in security and compliance validation during design,
- Remote state, locking, and run management in HCP Terraform,
- Supports multi-region and multi-environment setups via workspaces.
- Supports import of existing `.tfstate` file and [generation of IaC](/docs/stackgen/concepts/appstacks/createappstacks/fromdiscovery).
- Supports adding [custom modules](/docs/stackgen/concepts/modules) through [drag and drop](/docs/stackgen/concepts/topology/new-resource).
- Configure best practice [policy](/docs/stackgen/concepts/policies) and [scanning](/docs/stackgen/concepts/modules/scanmodules) through StackGen before deployment. Check out [Custom Policies](/docs/stackgen/concepts/policies/custom-policies) and [Compliance](/docs/stackgen/concepts/compliance) documentation to learn more.

**Benefits**

By using StackGen with HCP Terraform, your platform teams and developers gain several advantages:

- **Faster delivery**: Skip manual Terraform coding with visual design and auto-generated HCL.
- **Governance included**: Leverage HCP Terraform for policies, state, locking, and audit logs.
- **Security first**: Design-time checks reduce misconfigurations before deploy.
- **Scale across teams**: Use standardized appStacks and workspaces for consistent infra management.

## Understanding the Technical Architecture

**Loose Coupling for Maximum Flexibility**: The integration follows a loosely coupled architecture that preserves flexibility.

![Visual Flow](https://docs.stackgen.com/assets/images/tf-hcarch-17440b5edff4003ba0eb05c2b56e9d01.png)

**Key architectural principles**

- **Standard Code Generation**: StackGen generates standard Terraform HCL that can be version controlled, modified, and deployed independently.

- **Multi-Environment Support**: Different appStacks can target different HCP Terraform workspaces for environment separation.

- **Regional Deployment**: Support for multiple regions through separate workspace configurations.



![Architechture](https://docs.stackgen.com/assets/images/stackgen-hc-int-74b714cf815f0b0d5d277ab96dcf0e0c.png)


**How It Works**

At a high level, the integration follows this flow from design to deployment:

1. **Design** your infrastructure in StackGen with the drag-and-drop canvas.
2. **Connect** the appStack to your HCP Terraform workspace.
3. **Generate** your Terraform HCL with backend configuration.
4. **Deploy** via Terraform CLI, CI/CD, or HCP Terraform runs.
5. **Manage** state, policies, and audit trails in HCP Terraform.

![appStack Create ](https://docs.stackgen.com/img/stackgen-hc-appstack.png)‹›

−100%+⌂

Create appStack

Create an appStack from scratch by adding and configuring resouces, or by importing an existing .tfstate file.

1 / 6

Let's learn how to do use this integration in detail.

## Step-by-Step Guide

### Prerequisites

Click to view

Before you begin, make sure you have the following in place:

- A [StackGen account](https://cloud.stackgen.com/).
- An [HCP Terraform account](https://chatgpt.com/c/68d14cf1-29d8-8325-afd6-534c13897513#:~:text=Sign%20in%20to-,HCP,-Terraform) with at least one organization and workspace configuration.
- Cloud provider credentials (AWS, Azure, or GCP).
- **Optional**: [Terraform CLI](https://developer.hashicorp.com/terraform/install) or a CI/CD pipeline, if you prefer to run deployments outside the HCP UI.

### Set Up Your HCP Terraform Workspace

Click to view

1. Log in to your [HCP Terraform](https://app.terraform.io/) account.
2. Create or select a workspace.
3. Configure the following [Workspace settings](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/settings):

   - **Terraform version**
   - **Execution mode** (Remote or Local): We recommend that you use **Remote**.
   - **Environment variables or secrets** for your cloud provider credentials.
4. Ensure you set permissions for your user or service account.

### Design Your IaC in StackGen

Click to view

1. Log into your [StackGen](https://cloud.stackgen.com/) account.

2. From the StackGen Home page, navigate to **appStacks > + New appStack**.

3. Create a new [**appStack**](/docs/stackgen/concepts/appstacks/createappstacks) from scratch and select your target cloud provider.

4. You can either [**Add resources**](/docs/stackgen/concepts/topology/new-resource) (e.g., VPC, subnets, load balancer, database, S3) to the Topology canvas. Or, you [import resources](/docs/stackgen/concepts/iac/import-iac/importing-iac) from an existing `.tfstate` file.



![import IaC](https://docs.stackgen.com/assets/images/importiac-b12f5c43d3f318d61bc0246ff081dce5.png)

5. Configure your [**Resources**](/docs/stackgen/concepts/topology/configure-resource) and resolve any [validation warnings](/docs/stackgen/support-and-kb/troubleshooting/actions-required).



![appStack HC](https://docs.stackgen.com/assets/images/stackgen-hc-appstack-ebc08b5b65924a378b8a499eabd79a03.png)


### Connect to HCP Terraform

Click to view

1. From your appStack **Topology** canvas, click the settings icon ⚙️ to configure your storage backend.

2. Turn on the **Enable Storage Backend** toggle.

3. From the **Select the backend type** drop-down, select **Cloud (Terraform)** as the backend.

4. Enter the following information:


   - Hostname (`app.terraform.io` or EU variant)
   - Organization name
   - Project
   - Workspace name

![appStack HC](https://docs.stackgen.com/assets/images/stackgen-hc-config-33c191d11771a4fa2500387f4f11dba7.png)

5. Once done, click **Save**.


### Generate and Deploy IaC

Click to view

1. From your appStack Topology canvas, click the **Download IaC** icon to export your Terraform files.



![download iac](https://docs.stackgen.com/assets/images/stackgen-hc-downloadiac-4f6bb236b88fba00f71b2dd5b8741415.png)

2. Your backend config will look like the sample config below:





```hcl
terraform {

     cloud {

       organization = "your-org"



       workspaces {

         name = "your-workspace"

       }

     }

}
```

3. Deploy your infrastructure, using one of the following methods:
   - **Local CLI**: HCP Terraform runs in CLI push your code directly to your HCP workspace.

     Run the following commands via CLI:





     ```bash
     terraform init
     ```













     ```bash
     terraform plan
     ```













     ```bash
     terraform apply
     ```











     ![StackGen-HC](https://docs.stackgen.com/assets/images/stackgen-hc-cli-34609cdac81ab758bb720ba97535b35e.png)

   - **CI/CD pipeline**: Commit generated IaC by clicking [Push to Git](/docs/stackgen/concepts/iac/exporting-iac#push-to-git) button. Your PR will trigger the Terraform `plan` Actions workflow. Check out how you can [Automate Terraform with GitHub Actions](https://developer.hashicorp.com/terraform/tutorials/automation/github-actions).

### Manage and Evolve

Click to view

With the StackGen - Hasicorp Terraform integration, you can:

- Monitor runs, logs, and audit trails in HCP Terraform.



![Monitor](https://docs.stackgen.com/assets/images/stackgen-hc-monitor-4bd85150ed73f971df881604b98fa6f0.png)

- Update your infrastructure designs in StackGen, regenerate the IaC, and redeploy your infrastructure.

- Use multiple workspaces for different regions or environments (dev, staging, prod).


- [Overview](/docs/stackgen/integrations/hcp-terraform#overview)
- [Understanding the Technical Architecture](/docs/stackgen/integrations/hcp-terraform#understanding-the-technical-architecture)
- [Step-by-Step Guide](/docs/stackgen/integrations/hcp-terraform#step-by-step-guide)
  - [Prerequisites](/docs/stackgen/integrations/hcp-terraform#prerequisites)
  - [Set Up Your HCP Terraform Workspace](/docs/stackgen/integrations/hcp-terraform#set-up-your-hcp-terraform-workspace)
  - [Design Your IaC in StackGen](/docs/stackgen/integrations/hcp-terraform#design-your-iac-in-stackgen)
  - [Connect to HCP Terraform](/docs/stackgen/integrations/hcp-terraform#connect-to-hcp-terraform)
  - [Generate and Deploy IaC](/docs/stackgen/integrations/hcp-terraform#generate-and-deploy-iac)
  - [Manage and Evolve](/docs/stackgen/integrations/hcp-terraform#manage-and-evolve)
