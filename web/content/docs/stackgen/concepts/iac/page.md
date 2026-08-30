---
title: "Directory Structure of IaC"
product: "stackgen"
sourcePath: "/docs/concepts/iac"
sourceUrl: "https://docs.stackgen.com/docs/concepts/iac"
status: "ok"
---

The **IaC (Infrastructure as Code)** section in the **StackGen Dashboard** provides a read-only view of the generated infrastructure code after configuring resources in the **Topology Canvas**. This IaC representation includes all necessary dependencies and configurations required to deploy the infrastructure to the selected cloud provider.

You can view the IaC section after configuring resources in the **Topology Canvas**, which are generated in the form of terraform files.

- The IaC files cannot be modified directly within the StackGen UI.
- The generated IaC is structured to include all dependencies and configurations needed for deployment.
- You can export the IaC to a **Git repository** or **download as .zip** for further deployment.

## Directory Structure of IaC

StackGen organizes the generated IaC files into a structured directory to ensure modularity and reusability.

There are three main directories in the IaC:

- [Root Directory](/docs/stackgen/concepts/iac#root-directory)
- [Terraform Directory](/docs/stackgen/concepts/iac#terraform-directory-terraform)
- [Modules Directory](/docs/stackgen/concepts/iac#modules-directory-terraformmodules)

### Root Directory

The **root directory** contains essential metadata and backend configuration files.

| File Name | Description |
| --- | --- |
| **.gitignore** | Specifies files to be ignored when exporting to Git. |
| **.metadata** | Stores metadata related to the generated IaC. |
| **README.md** | Provides an overview of the exported IaC. |
| **backend.conf** | Defines backend storage configurations. |
| **backend.tf** | Configures remote state management for Terraform. |

### Terraform Directory (`terraform/`)

This directory contains the main Terraform configurations for managing cloud resources.

| Directory/File | Description |
| --- | --- |
| **modules/** | Stores reusable Terraform modules categorized by resource type. |
| **variables.tf** | Defines input variables for parameterized deployments. |
| **outputs.tf** | Specifies output variables for retrieving resource details post-deployment. See [appStack Outputs](/docs/stackgen/concepts/topology/appstack-outputs) to configure outputs from the Topology canvas. |
| **main.tf** | The primary Terraform configuration file that integrates various modules. |
| **providers.tf** | Defines cloud provider settings (AWS, Azure, GCP). |
| **terraform.tfvars** | Contains predefined values for Terraform variables. |

### Modules Directory (`terraform/modules/`)

Modules allow for reusable and modular infrastructure definitions. StackGen automatically organizes modules based on the selected cloud provider.

## IaC Management in StackGen

The generated IaC can be managed in the StackGen dashboard directly in the following ways:

- [View IaC](/docs/stackgen/concepts/iac#view-and-manage-iac-in-the-iac-tab)
- [Resolve Policy Violations](/docs/stackgen/concepts/iac#resolve-policy-violations)
- [Export IaC](/docs/stackgen/concepts/iac#export-iac)
- [Plan, Deploy, and Destroy](/docs/stackgen/concepts/iac#plan-deploy-and-destroy)
- [Deploy to Cloud](/docs/stackgen/concepts/iac#deploy-to-cloud)

### View and Manage IaC in the IaC Tab

The IaC tab provides a comprehensive view of your entire Infrastructure as Code (IaC) repository, showing all files and folders related to your infrastructure configuration. The generated IaC can be viewed in the StackGen dashboard directly.

- The IaC files are auto-generated and cannot be directly modified in the UI.
- You can review the Terraform configurations to understand the structure before exporting.
- **Resize the IaC file pane** when folder or file names are long, so you can see complete module and file names in the left pane.

note

Additionally, you can reach out to us at [support@stackgen.com](mailto:support@stackgen.com) to enable the following beta features for your projects:

- **Adding Files and Folders**: You can add new files and folders directly within the IaC tab to expand or customize your infrastructure setup. This helps you manage your IaC resources conveniently without switching tools.

- **Renaming Files and Folders**: Files and folders can be renamed inline in the IaC tab, allowing you to keep your IaC structure organized and up to date as your project evolves.

- **Moving Files and Folders**: For improved organization, you can move files and folders within the IaC tab to restructure your IaC repository easily.- [Directory Structure of IaC](/docs/stackgen/concepts/iac#directory-structure-of-iac)
  - [Root Directory](/docs/stackgen/concepts/iac#root-directory)
  - [Terraform Directory (`terraform/`)](/docs/stackgen/concepts/iac#terraform-directory-terraform)
  - [Modules Directory (`terraform/modules/`)](/docs/stackgen/concepts/iac#modules-directory-terraformmodules)
- [IaC Management in StackGen](/docs/stackgen/concepts/iac#iac-management-in-stackgen)
  - [View and Manage IaC in the IaC Tab](/docs/stackgen/concepts/iac#view-and-manage-iac-in-the-iac-tab)
  - [Resolve Policy Violations](/docs/stackgen/concepts/iac#resolve-policy-violations)
  - [Export IaC](/docs/stackgen/concepts/iac#export-iac)
  - [Deploy to Cloud](/docs/stackgen/concepts/iac#deploy-to-cloud)
- [Next Steps](/docs/stackgen/concepts/iac#next-steps)

- **Deleting Files and Folders**: You can delete files or folders directly from the IaC tab, helping you remove outdated or redundant code and keep your IaC clean.

- **Search**: Search for the relevant file or folder within your IaC



![Manage IaC](https://docs.stackgen.com/assets/images/iaceditfolders-0a2dba6055005aa399b97819d69afc2f.jpg)


### Resolve Policy Violations

If there are compliance issues, policy violations will be displayed in a warning banner. You must resolve violations before exporting the IaC.

Refer to [Policy Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation) for more detailed information.

### Export IaC

You can export your IaC in the following ways:

1. **Download IaC (.zip)**: Export the Terraform files as a `.zip` file.
2. **Download Topology (`.json`)**: Download your topology in `.json` format.
3. **Push to Git**: Directly push the IaC to a connected Git repository.

### Plan, Deploy, and Destroy

Use **Plan & Deploy** in the StackGen UI to:

- **Plan**: preview changes for an environment
- **Deploy**: apply those changes
- **Destroy**: tear the environment down

This flow works for supported clouds after you attach provider credentials. Only **DevOps** and **Admins** can change environment settings and the Secret Store. Platform engineers set up the project. Developers add and configure resources, then run **Plan** to check the result.

Set up [Environment configurations](/docs/stackgen/concepts/environment-configurations) before you run Plan or Deploy.

#### Run Plan

1. Open your appStack and click **Deploy**, or choose **Plan & Deploy** from the topology **Actions** menu.
2. Click **Plan**.
3. Select an environment.
4. Click the deployment button (labeled **deployment** on the first run, **rerun deployment** later).
5. Review the plan output when the run finishes.

![Plan feature - Deploy panel with Plan operation and successful output](https://docs.stackgen.com/assets/images/planfeature-feb2026-d331b54dbbf8ed5cc1e31662f23879dd.png)

On success, StackGen shows that the plan completed and what will change. Use the **log** control for `init` and `plan` output (Terraform or OpenTofu). The same run also appears under **CLI Runs**.

#### Deploy or Destroy

After a successful plan for the same environment, choose **Deploy** to apply or **Destroy** to tear down. StackGen asks you to type **`deploy`** before either action runs.

If a Plan or Deploy run stays **Running** in the UI after the job has finished or stopped updating, use **Force Cancel** on that run. You can cancel from the Plan & Deploy panel or from **CLI Runs** when the action is available.

For credentials, roles, `TF_VAR` values, and logs, see [Plan and Deploy (SaaS)](/docs/stackgen/concepts/iac/plan-and-deploy-saas).

### Deploy to Cloud

Apply from the StackGen UI, or export IaC and run it yourself:

- **AWS**: Terraform or OpenTofu CLI, or AWS CloudFormation.
- **Azure**: Terraform or OpenTofu CLI, or Azure Resource Manager (ARM) templates.
- **GCP**: Terraform or OpenTofu CLI, or Google Cloud Deployment Manager.
- **Civo**: Terraform or OpenTofu CLI, or Civo Kubernetes Provider.
- **OCI**: Custom modules and StackGen CLI plan and apply. See [Cloud provider limitations](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci).

## Next Steps

- Learn more about **[Exporting IaC](/docs/stackgen/concepts/iac/exporting-iac)**: Configure Git Repositories or Download Terraform Files.
- Understand **[Policy Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation)**: Ensure compliance before exporting.
- Explore **[Using Custom Modules](/docs/stackgen/concepts/resources/custom-module)**: Extend infrastructure with reusable modules.

- [Directory Structure of IaC](/docs/stackgen/concepts/iac#directory-structure-of-iac)
  - [Root Directory](/docs/stackgen/concepts/iac#root-directory)
  - [Terraform Directory (`terraform/`)](/docs/stackgen/concepts/iac#terraform-directory-terraform)
  - [Modules Directory (`terraform/modules/`)](/docs/stackgen/concepts/iac#modules-directory-terraformmodules)
- [IaC Management in StackGen](/docs/stackgen/concepts/iac#iac-management-in-stackgen)
  - [View and Manage IaC in the IaC Tab](/docs/stackgen/concepts/iac#view-and-manage-iac-in-the-iac-tab)
  - [Resolve Policy Violations](/docs/stackgen/concepts/iac#resolve-policy-violations)
  - [Export IaC](/docs/stackgen/concepts/iac#export-iac)
  - [Plan, Deploy, and Destroy](/docs/stackgen/concepts/iac#plan-deploy-and-destroy)
  - [Deploy to Cloud](/docs/stackgen/concepts/iac#deploy-to-cloud)
