---
title: "Key Features"
product: "stackgen"
sourcePath: "/docs/concepts/modules/catalog"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/catalog"
status: "ok"
---

The StackGen Module Catalog is designed to provide you, as a DevOps team, with a powerful tool to curate and enforce the use of specific Terraform modules within your organization. By integrating trusted modules from various sources, including custom Git repositories, Terraform registries, and StackGen-generated modules, you can establish policies that ensure developers use only approved infrastructure configurations, thereby streamlining workflows and enhancing security.

![module catalog](https://docs.stackgen.com/assets/images/modulecatalog-3324d6d429d2e14c40de35c990794dfb.png)

## Key Features

- **Centralized Module Management**: The StackGen Catalog is your one-stop platform for discovering, managing, and enforcing Terraform modules from multiple sources, including custom GIT repositories, and external registries like Terraform and OpenTofu.
- **Module Catalog Assistant**: Import modules and add versions through conversational prompts on the **Project Module Catalog** page. See [Module Catalog Assistant](/docs/stackgen/concepts/modules/module-catalog-assistant).
- **Web UI and CLI**: You can use either the Web UI or the CLI to ingest, list, and search Terraform modules, giving you the flexibility to interact with the catalog in the way that best suits your needs.
- **RBAC Permissions**: Developers can cherry-pick specific resources from an existing tfstate during appStack creation based on their RBAC permissions, ensuring only approved modules are used.
- **Module Enforcement**: As a DevOps team, you can enforce the usage of specific Terraform modules across different projects within your organization. This ensures consistency and control over infrastructure deployments.

## Managing Access for Enterprises and Projects

- **Enterprise-Level Access Management (DevOps Role)**
As a **DevOps user**, you can manage access to specific Terraform modules at the **Enterprise** level. This means you can set organization-wide policies to control which modules are accessible to all projects across the entire organization. This ensures that enterprise-wide configurations are secure and standardized. DevOps projects can also change access between **Enterprise and Project** level permissions when required.
- **Project-Level Access Management (Admin Role)**
As an **Admin** user, you have the authority to assign specific Terraform modules to projects based on their needs and responsibilities. Project-level access allows you to tailor which modules are available to individual projects, ensuring they only use the relevant resources for their projects. This also includes the ability to switch access between **Enterprise and Project** level permissions when project requirements change.
- **Switching Between Enterprise and Project Access**
Both **DevOps** and **Admin** users have the ability to switch between **Enterprise** and **Project** level access for Terraform modules. This flexibility allows the DevOps or Admin role users to grant or restrict access as needed based on the project scope or changes in project responsibilities. For example, DevOps users can elevate access to an enterprise-wide level for a specific module, while Admin users can narrow the access to a particular Project based on their project needs.

### Manage Access (module promotion) [](/docs/stackgen/concepts/modules/catalog#manage-access-module-promotion%20%22Direct%20link%20to%20Manage%20Access%20(module%20promotion)")

From the **Enterprise Module Catalog**, open a module and choose **Manage Access** to change visibility without republishing:

- **Enterprise** \- Share the module with every project in the organization.
- **Project** \- Limit access to one or more specific projects.

![Enterprise Modules catalog with Manage Access panel showing Enterprise and Project access options](https://docs.stackgen.com/assets/images/may26-module-access-promotion-0f34ecf6573132f5c3438527f84440ea.png)

### Custom module labels

Custom modules support **labels** on each version (for example **stable** or **tested**). StackGen applies a **Latest** label to the newest imported version automatically. You can bind an appStack resource to a label instead of a fixed version number so consuming appStacks follow the version currently tagged with that label.

In the catalog, hover a label to highlight it and see the **manage labels** tooltip, then click the label to open the full label flow. For how labels work (dynamic vs pinned, **Latest** rules, catalog management, Resource Packs, and snapshots), see [Labels](/docs/stackgen/concepts/modules/labels).

See [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#custom-module-catalog-labels-ui).

![Project Module Catalog Versions panel for cloud-storage showing Latest, test, stable, and tested labels on module versions](https://docs.stackgen.com/assets/images/may26-custom-module-labels-40343b734d533b8743b040d9ef2fff1f.png)

### Custom module tags

Custom modules can carry **meta-tags** (key/value pairs such as `allow = true`) that governance expressions can match.

**Previously**, module restriction policies leaned on explicit allowlists. **Now**, you can attach tags on custom modules from module management, then select modules in governance with expressions such as `module.tags["allow"] == "true"` (often combined with name globs).

When new modules match the expression (including after you add the required tag), they can enter the allowlist for projects that use that governance, without rewriting the governance configuration from scratch.

For expression examples and governance steps, see [Select policies with expressions](/docs/stackgen/concepts/rbac/governance/governanceconfig#select-policies-with-expressions) and [v2026.8.4](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#policy-selection-by-expression).

### StackGen Registry module source

A **Module Source** preference lets you choose how custom modules are sourced. **StackGen Registry** is the default for custom modules and improves usage tracking inside the platform. You can also select **Remote** (Git URL) or **Local** (vendored or inline definitions).

![IaC editor main.tf showing a module sourced from the StackGen registry URL](https://docs.stackgen.com/assets/images/may26-stackgen-registry-93d3f0f36f369f014450317e49a3811b.png)

By managing access at both the enterprise and project levels and providing seamless transitions between these access types, StackGen Catalog ensures that your infrastructure remains secure, compliant, and streamlined across all projects within your organization.

### Workflow For DevOps projects

Click to view

1. **Ingesting Terraform Modules**
   - **Web UI**: You can import one GIT repository at a time for custom modules through the Web UI.
   - **CLI**: For greater flexibility, the CLI allows you to perform bulk imports for custom GIT repositories, making it easier to manage a large number of modules. You can also upload a module from a **local directory** with `stackgen upload custom-modules --dir` (do not combine `--dir` with Git source flags). See [Upload Custom Modules](/docs/stackgen/cli-guide/usage/upload/custom-modules) and [v2026.7.9](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#cli-local-module-upload).
2. **Searching and Listing Modules**
Once the modules are ingested, you can list and search through the catalog. This includes modules from your custom GIT repositories, the Terraform registry, the OpenTofu registry, and StackGen autogenerated modules.
3. **RBAC-Enabled Module Assignment**
You can assign specific Terraform modules to projects based on their RBAC permissions. For example, a developer working on network controls can access StackGen autogenerated modules related to networking from the OpenTofu registry through the catalog. These modules can then be used during appStack creation.
4. **Enforcing Module Usage**
As a DevOps user, you can enforce specific Terraform modules within your organization. These enforced modules will be available to developers based on the permissions you assign to them.
5. **`tfstate` Import (DevOps Responsibility)**
The import of tfstate files should be handled by DevOps teams. This allows DevOps teams to decide which resources should be picked into an appStack and which should not. Importing tfstate files ensures that only trusted and approved resources are included in the appStack. Developers will not have to deal with unsupported resources in this flow, as the resources imported by DevOps will be curated.

### Workflow For Developer Projects

Click to view

1. **Accessing Modules**
If you’re a developer with the necessary RBAC permissions, you can access the StackGen Catalog to find the modules you need, including modules related to infrastructure resources such as networking or storage.
2. **Cherrypicking Resources**
After creating an appStack, you can overlay additional approved Terraform modules from sources like the OpenTofu registry. The modules you can access will be based on what your DevOps team has allowed through the catalog.
3. **Module Assignment**
You can assign specific modules to your projects based on project-level permissions set by the DevOps team, ensuring that only the approved resources are being used.

## Known Limitations

- **Helm Chart Discovery**: The Catalog UI does not discover Helm charts. Use the CLI for Helm charts outside the catalog UI.
- **Cloud-to-Code Integration**: StackGen autogenerated modules from Cloud-to-Code migrations are not included in the catalog by default. However, developers can cherry-pick specific resources from tfstate during appStack creation.

## Additional Considerations

- **Delete while scrolling**: On the **Module Catalog**, the **Delete** control stays **pinned** when you scroll through a long list, so you do not have to scroll back to the top to remove a selection after you move down the list.

- **Unsupported Resources**: If a `tfstate` file includes resources that are not part of the enforced modules, these resources will be flagged as unsupported by DevOps and will not be included in the appStack. This ensures that the developer will not encounter issues with unsupported resources, as DevOps will have already curated the modules and approved them for use.

- **Module Removal After Assignment**: If a module that was previously enforced is removed from the catalog by your DevOps team, it will be flagged with an error in the IaC tab. While the module will no longer be usable, you will still be able to export the configuration without the removed module.

- **Sharing Custom vs Built-In Modules**: As a DevOps team, you can differentiate between sharing custom modules and built-in modules. Custom modules can be shared selectively with projects, whereas built-in modules are automatically enforced across the organization.


## Getting Started

You can import single and multiple modules via the **Import** button on the Module Catalog page.

### Import Single Module

Click to view

You can import a single module from either a Git repository or the Terraform Registry.

#### Import Via Git

You can import a public or private module via Git repository. Follow these steps:

1. From the StackGen Home page, navigate to **Module Catalog > click Import Module** to open the import module dialog.
2. Select **Import single module** and choose **Git** as the source type.
3. Enter the repository details:
   - **Repository URL**: Provide the Git repository URL (e.g., `https://github.com/aws-ia/terraform-aws-vpc`).
   - **Branch / Commit / Tag**: Specify the branch, commit, or tag.
   - **Subdirectory (Optional)**: If the module is in a subdirectory, specify it here.
   - **Private Repository**: Check this if the repository is private.
4. Configure module details:
   - **Name**: Enter a unique name for the module.
   - **Resource Type**: Specify the resource type.
   - **Provider**: Select the cloud provider (e.g., Amazon Web Services).
5. Set access management:
   - **Managed By**: By default, the scope is Enterprise.
   - **Scope**: Select if you want to share the module across enterprise or with specific projects.

     - If you select share with specific projects, you'll get a list of Projects you have access to. You can select the ones that you want to share these modules with.
6. Review the scan results:
   - The module is automatically scanned for security issues.
   - Review passed and failed policies before finalizing the import.
   - All policies must pass or be reviewed before adding the module.
7. Click **Add Module** to complete the import.

#### Import Module Via Terraform Registry

You can import modules directly from the Terraform Registry with pre-scan visibility. Follow these steps:

1. From the StackGen Home page, navigate to **Module Catalog > click Import Module** to open the import module dialog.
2. Select **Import single module** and choose **Terraform Registry** as the source type.
3. Set access management:
   - **Managed By**: By default, the scope is Enterprise.
   - **Scope**: Select if you want to share the module across enterprise or with specific projects.

     - If you select share with specific projects, you'll get a list of Projects you have access to. You can select the ones that you want to share these modules with.
4. Browse and search the Terraform Registry directly from the Import Module dialog to search and select the module you need.

![Search TF Module](https://docs.stackgen.com/assets/images/importtfregistry1-b57308aec249f9a68027126a7628268b.png)

5. Review the scan results:
   - Every module imported from the registry is automatically scanned using StackGen's built-in scanning capabilities.
   - Review the passed and failed policies before finalizing the import to understand the compliance and security posture of the module.

![Policy Review](https://docs.stackgen.com/assets/images/importtfregistry2-9a85c78a3a6ad586744bf7a7ac3e2b98.png)

7. Click **Add Module** to complete the import.

### Import Multiple Modules

Click to view

To import multiple modules at once, use the CLI command:

```bash
stackgen upload custom-modules --tag <TAG> \
  --repo-url "https://github.com/<your-org>/<your-repo>" \
  --name "<MODULE_NAME>"
```

For more information on this command, visit the [StackGen CLI documentation](/docs/stackgen/cli-guide/usage/import/stackgen-import).

Once the modules are imported into the Module Catalog, you can search, assign, and use them across your organization. The process varies based on your role and permissions.

### DevOps

Click to view

1. Access the StackGen Catalog to import Terraform modules from custom GIT repositories, the Terraform registry, and the OpenTofu registry.
2. Use the Web UI for single repository imports or the CLI for bulk imports.
3. Assign and enforce specific modules for projects using RBAC permissions.
4. Handle tfstate imports and ensure only approved resources are available to developers.

### Admins

Click to view

1. Assign access to specific projects and manage permissions for Terraform modules.
2. Switch access between enterprise-wide and project-level as per organizational needs.
3. Ensure the right modules are available to projects based on their roles and responsibilities.

### Developers

Click to view

1. Access the StackGen Catalog to search for and overlay approved Terraform modules.
2. Use the catalog to discover network or storage modules, ensuring that they align with organizational policies.
3. Ensure that only allowed modules are used during appStack creation.

## Onboarding StackGen modules (`stackgen-modules`)

You can onboard the full catalog of **StackGen-maintained Terraform modules** from the public repository [stackgenhq/stackgen-modules](https://github.com/stackgenhq/stackgen-modules). Prefer this path when you want approved, StackGen-authored modules as **custom modules** in your catalog instead of relying on platform **built-in** modules.

### What the repository contains

The repo is organized by cloud provider (`aws/`, `azurerm/`, `gcp/`). Each module includes:

- Terraform source for the resource
- A **`.stackgen/stackgen.yaml`** file with StackGen metadata (UI labels, variables, controls, and how the module appears in the product)

StackGen validates that metadata against **`stackgen_yaml_schema.json`** in the same repository.

### Why upload them as custom modules

- You control which modules are available at **enterprise** or **project** scope.
- You can version, label, and enforce modules the same way you do for other custom modules.
- Platform **built-in** modules are being phased out for some flows (for example [Cloud Asset Discovery](/docs/stackgen/concepts/clouddiscovery)). Custom modules from this catalog (or your own repos) are the supported path forward.

### How to upload

**Single module:** Use the Web UI **Import** flow above, or upload with the CLI. See [`stackgen upload custom-modules`](/docs/stackgen/cli-guide/usage/upload/custom-modules).

**Many modules at once:** Clone or reference [stackgen-modules](https://github.com/stackgenhq/stackgen-modules) and run the batch script **`tools/upload_stackgen_modules.sh`**. The script wraps `stackgen upload custom-modules` and supports:

| Option | Purpose |
| --- | --- |
| `--token` | StackGen auth token (minimal required input) |
| `--url` / `--project` | Optional StackGen URL and project |
| `--repo-url` | Git repository URL |
| `--branch` or `--tag` | Source ref to read modules from |
| `--templates` | Limit which modules are uploaded |

For step-by-step commands, defaults, versioning, and schema validation details, see the repository [README](https://github.com/stackgenhq/stackgen-modules/blob/main/Readme.md).

note

If you are creating an appStack from **Cloud Asset Discovery**, you also need the discovery-oriented modules in **[discovery-modules](https://github.com/stackgenhq/discovery-modules)**. Those modules are separate from `stackgen-modules`. See [Cloud Asset Discovery](/docs/stackgen/concepts/clouddiscovery).

- [Key Features](/docs/stackgen/concepts/modules/catalog#key-features)
- [Managing Access for Enterprises and Projects](/docs/stackgen/concepts/modules/catalog#managing-access-for-enterprises-and-projects)
  - [Manage Access (module promotion)](/docs/stackgen/concepts/modules/catalog#manage-access-module-promotion)
  - [Custom module labels](/docs/stackgen/concepts/modules/catalog#custom-module-labels)
  - [Custom module tags](/docs/stackgen/concepts/modules/catalog#custom-module-tags)
  - [StackGen Registry module source](/docs/stackgen/concepts/modules/catalog#stackgen-registry-module-source)
  - [Workflow For DevOps projects](/docs/stackgen/concepts/modules/catalog#workflow-for-devops-projects)
  - [Workflow For Developer Projects](/docs/stackgen/concepts/modules/catalog#workflow-for-developer-projects)
- [Known Limitations](/docs/stackgen/concepts/modules/catalog#known-limitations)
- [Additional Considerations](/docs/stackgen/concepts/modules/catalog#additional-considerations)
- [Getting Started](/docs/stackgen/concepts/modules/catalog#getting-started)
  - [Import Single Module](/docs/stackgen/concepts/modules/catalog#import-single-module)
  - [Import Multiple Modules](/docs/stackgen/concepts/modules/catalog#import-multiple-modules)
  - [DevOps](/docs/stackgen/concepts/modules/catalog#devops)
  - [Admins](/docs/stackgen/concepts/modules/catalog#admins)
  - [Developers](/docs/stackgen/concepts/modules/catalog#developers)
- [Onboarding StackGen modules (`stackgen-modules`)](/docs/stackgen/concepts/modules/catalog#onboarding-stackgen-modules-stackgen-modules)
  - [What the repository contains](/docs/stackgen/concepts/modules/catalog#what-the-repository-contains)
  - [Why upload them as custom modules](/docs/stackgen/concepts/modules/catalog#why-upload-them-as-custom-modules)
  - [How to upload](/docs/stackgen/concepts/modules/catalog#how-to-upload)
