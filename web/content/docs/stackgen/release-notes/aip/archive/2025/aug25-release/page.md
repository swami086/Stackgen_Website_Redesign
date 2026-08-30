---
title: "Smarter Infra, Sharper Controls"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/aug25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/aug25-release"
status: "ok"
---

## Smarter Infra, Sharper Controls

This August, StackGen takes a big leap forward. From AI-powered StackBuilder to cross-project appStack sharing and carving infra out of massive TFState files, we’ve focused on making infrastructure generation, reuse, and governance easier than ever. You’ll also find drift alerts, a streamlined UI, and CLI enhancements that keep your workflows faster and more reliable. Plus, a set of important fixes to make your experience smooth as ever.

- What's New
  - [StackBuilder: Infra Generation and Deployment Agent For Developers And Platform Engineers](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stackbuilder-infra-generation-and-deployment-agent-for-developers-and-platform-engineers)
  - [Share Your Infrastructure With Set of appStacks Across Projects](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#share-your-infrastructure-with-set-of-appstacks-across-projects)
  - [Carve Out appStacks from Large TFState Imports](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#carve-out-appstacks-from-large-tfstate-imports)
- What's Enhanced
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stackgen-cli)
  - [Stay Ahead of Infrastructure Changes With Drift Alerts](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stay-ahead-of-infrastructure-changes-with-drift-alerts)
  - [Streamlined UI Menu for Sharing, Importing, and Exporting IaC](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#streamlined-ui-menu-for-sharing-importing-and-exporting-iac)
- What’s Fixed
  - [Cloud Discovery UI: Search and Filter Does Not Work On Create appStack Page](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#cloud-discovery-ui-search-and-filter-does-not-work-on-create-appstack-page)
  - [Resource Tags Tab Is Disabled for a Subnet Resource Until You Add Tags](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#resource-tags-tab-is-disabled-for-a-subnet-resource-until-you-add-tags)
  - [Policies Are Not Getting Added to appStacks Created via CLI](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#policies-are-not-getting-added-to-appstacks-created-via-cli)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#supported-resources)

## What's New

### StackBuilder: Infra Generation and Deployment Agent For Developers And Platform Engineers

Click to view

StackBuilder, your AI-powered assistant for simplifying Day 0 infrastructure tasks using natural language. Whether you're a platform engineer writing Terraform or a developer generating self-service environments, StackBuilder’s agentic workflows help you move faster.

![assist me](https://docs.stackgen.com/assets/images/assistme1-ea49d1e61132961c1c882aab789754b6.png)

**Key Features**

- **Day 0 (Available Now)**: Generate and configure Infrastructure-as-Code (IaC), set up storage, networking, variables, and more.
- **Day 1 & 2 (Coming Soon)**: Monitoring, drift detection, incident response, and auto-remediation.

**How It Works**

Powered by StackGen AI agents, StackBuilder blends deterministic guardrails with generative AI to automate infrastructure tasks, so you can spend more time shipping features.

- **Platform Engineers**: Use the [TF Module Coding Agent](/docs/stackgen/concepts/modules#-module-ai-assistant) to generate and manage Terraform modules.
- **Developers**: Use the Self-Service Agent to generate governed infrastructure from natural language prompts, producing an appStack.

**Getting Started**

1. Navigate to **StackGen > Click Assist Me > Launch StackBuilder**.



![assist me](https://docs.stackgen.com/assets/images/assistme-209cff296a7d31d673df7095edf81127.png)

2. Use prompts like:


> Generate Terraform code to deploy a typical web application backend on AWS.
> Include:
>
>    - A VPC with public and private subnets
>    - An EC2 instance (or ECS Fargate task) behind a load balancer
>    - RDS for PostgreSQL and ElastiCache for Redis, both in private subnets
>    - NAT Gateway and Internet Gateway
>    - IAM roles with least privilege
>    - Security groups for web, DB, and cache layers
>    - S3 bucket for static assets and logs
>    - Outputs for public IP, DB endpoint, and other key values
>
> Follow AWS best practices for networking and security.




note





If using [Custom Modules](/docs/stackgen/concepts/modules), ensure they are pre-created and published in the [Module Catalog](/docs/stackgen/concepts/modules/catalog) for correct reference.







![Prompt1](https://docs.stackgen.com/assets/images/promptcl2025-64589abdfd3eff115ba6a973601ac66f.png)

3. Configure, validate, and export your IaC—errors and policy violations are auto-detected and fixable.



![Prompt2](https://docs.stackgen.com/assets/images/promptcla2025-566702ba3e5c9888300572f7980e3d6b.png)


**Error Handling And Governance**

- Errors, policy violations, and configuration issues are detected and clearly explained.
- Manual fixes may be required—work with your DevOps team if needed.
- Governance settings are enforced: if your request violates them, the agent will either block or auto-adjust the output accordingly.

Check out [StackBuilder](/docs/stackgen/stackgen-mcp) to learn more.

### Share Your Infrastructure With Set of appStacks Across Projects

Click to view

You can now share outputs from one appStack so other appStacks or projects can reuse them, ideal for separating networking, applications, or other components while keeping everything connected.

**Key Features**

- **Cross-Project Sharing**: Publish outputs (e.g., VPC IDs, Subnet IDs, Security Group IDs) from a provisioned appStack to another project.
- **Automatic Updates**: If the original appStack is updated, dependent appStacks automatically get the new values.
- **Support for Multiple Sources**: Share infrastructure from provisioned appStacks, imported tfstate files, or cloud asset discoveries with a remote backend enabled.
- **Easy Integration**: Use shared values directly in new appStacks without redeploying the original appStack.

This feature lets your teams work independently while reusing core infrastructure, avoiding duplication and ensuring consistency across environments.

Check out [Share Infra](/docs/stackgen/concepts/iac/shareinfra) documentation to learn how you can share your infrastructure across Projects.

### Carve Out appStacks from Large TFState Imports

Click to view

Managing infrastructure as a single, giant Terraform state file can make collaboration difficult. With this release, you can now import a large `.tfstate` file and carve it into multiple smaller appStacks that are organized by resource family such as networking, compute, or storage.

![TFState Import](https://docs.stackgen.com/img/appstacktfstateimport.png)‹›

−100%+⌂

Large .tfstate file

Whether you create an appStack from deployment files or Cloud Asset Discovery, you can carve out smaller appStacks for your teams.

1 / 8

**Why this matters**

- Platform teams can split a monolithic infrastructure state into smaller appStacks, making it easier to assign ownership (e.g., networking to one team, storage to another).
- **Zero-Drift Confidence**: No matter if you start from discovery, Cloud-to-Code, or a `.tfstate` import, you can run `terraform plan` or `tofu plan` and expect zero changes when everything is in sync.
- **Developer Velocity**: Developers can search across existing appStacks to quickly reuse modules, reducing duplication and ensuring consistency with platform best practices.

**Key Features**

- **Selective Imports**: Choose a subset of resources from a `.tfstate` file to create targeted appStacks.
- **Multiple appStacks from One State**: Split a monolithic state into smaller, focused appStacks (e.g., Networking, Compute, or Storage).
- **Validation Across Flows**: Confirm end-to-end consistency with plan, whether your appStack originates from discovery, Cloud-to-Code, or `.tfstate` import.
- **AI Assistance for Developers**: Developers searching for best-practice modules can discover and reuse the appStacks created for them.

**Example Use Cases**

- **Inventory and Discovery**: A platform team scans an existing production account to understand its cloud footprint, then organizes resources into appStacks by category.
- **Division of Work**: Teams working on a shared cloud account separate responsibilities where networking engineers own the Networking appStack, while compute engineers own Compute appStack.
- **Compliance and Resilience**: Using the carve-out plus module editor, platform engineers enforce compliance frameworks (FedRAMP, Mars-E) and add resiliency patterns (e.g., disaster recovery) before developers consume these appStacks.
- **End-to-End Consistency**: Whether starting from StackGen resources, deployed `.tfstate`, or Cloud-to-Code, you can run `terraform plan` or `tofu plan` to validate that exports match the actual deployed state.

Learn more about:

- [Importing IaC](/docs/stackgen/concepts/iac/import-iac/importing-iac)
- [Carving out appStacks from `.tfstate`](/docs/stackgen/concepts/iac/import-iac/importing-iac#carve-out-appstacks-from-a-tfstate-import)
- [Downloading Iac](/docs/stackgen/concepts/iac/exporting-iac)
- [Sharing Infra](/docs/stackgen/concepts/iac/shareinfra)

## What's Enhanced

### StackGen CLI

Click to view

- **StackGen CLI Version v0.67.0.**: New `--appstack-id` Flag for the `download-iac` Command.
We’ve added a new CLI flag to the **`download-iac` Command** make it easier to retrieve your generated Infrastructure as Code (IaC) files.


  - The `--appstack-id` flag lets you specify the UUID of the appStack you want to download.
  - You can use `stackgen appstack show` to find UUIDs.

Learn more about [`download-iac`](/docs/stackgen/cli-guide/usage/appstack/download-iac)

- **StackGen CLI Version v0.64.3.**: Default Policies are now auto-applied to appStacks that are created using StackGen CLI.
  - This update fixes a [known issue](/docs/stackgen/help-center/known-issues/jul2025#fixed-policies-not-added-to-appstacks-created-via-cli) where appStacks created using StackGen CLI now match the UI experience by including default security policies.
  - **Cloud-Aware Defaults**: Policies are applied automatically for AWS, GCP, and Azure appStacks.
  - **Flexible Control**: Use [`--skip-policies`](/docs/stackgen/cli-guide/usage/appstack/create) flag if you prefer not to attach default policies.

### Stay Ahead of Infrastructure Changes With Drift Alerts

Click to view

Drift Alerts now keep you informed whenever your infrastructure changes outside of your Infrastructure-as-Code (IaC) definitions, thus letting you respond quickly, maintain compliance, and avoid downtime.

**Key Features**

- **Automatic Drift Detection**: Continuously alerts for any changes to your deployed resources against your IaC so that you can spot unauthorized or manual changes.
- **Real-Time Slack Notifications**: Get instant alerts in your connected Slack channel whenever a drift is detected.
- **Centralized Reporting**: All drift types are tracked and reported and no manual setup is required.

With Drift Alerts, you’ll know the moment your infrastructure drifts from its intended state, so you can take corrective action before it impacts your environment.

Learn more about [Drift Alerts](/docs/stackgen/concepts/drift/detectdrift#drift-alerts)

### Streamlined UI Menu for Sharing, Importing, and Exporting IaC

Click to view

We’ve redesigned the action buttons to make your most used workflows faster and keep the interface tidy.

![export/import buttons](https://docs.stackgen.com/assets/images/uienhancementaug2025-1bfc78fd002757349fd569b8f1d991e6.png)

1. Prominent [**Push to Git**](/docs/stackgen/concepts/iac/exporting-iac#push-to-git) button: is now the primary button for quick access.
2. [**Download IaC**](/docs/stackgen/concepts/iac/exporting-iac#download-iac-zip) icon: is placed right next to **Push to Git** button.
3. An **ellipsis ⋮** icon: for more actions, such as:

   - [**Import (`.tfstate`, `.json`)**](/docs/stackgen/concepts/iac/import-iac/importing-iac) for your IaC imports
   - [**Download Topology (`.json`)**](/docs/stackgen/concepts/iac/exporting-iac#download-topology-json) to download your `topology.json` file.
   - [**Compare Topology**](/docs/stackgen/concepts/appstacks/manageappstacks/versioncontrol#create-an-appstack-version) to compare the topology changes between two appStack versions.
   - [**Share Infra**](/docs/stackgen/concepts/iac/shareinfra) to share your provisioned infrastructure across projects in StackGen.

This update ensures sharing, importing, and exporting IaC is quicker, while keeping the workspace uncluttered.

## What's Fixed

### Cloud Discovery UI: Search and Filter Does Not Work On Create appStack Page

Click to view

Previously, the **Search and Filter** functionality on the Cloud Discovery page, only returned filtered values that were visible on the current page and missed showing results from other pages.

![Search and Filter](https://docs.stackgen.com/assets/images/searchandfilteraug2025-a4001841f3e6fbf17cfeac9441855768.png)

This issue has been resolved by implementing backend-driven search, filter, and pagination, ensuring that filtered results are displayed across all pages.

### Resource Tags Tab Is Disabled for a Subnet Resource Until You Add Tags

Click to view

The **Resource Tags** UI logic now checks for the presence of a `tags` attribute in the resource template.
From this release onward, the **Resource Tags** tab will appear for any resource that defines a `tags` variable in its template, regardless of whether `tag` values are set. This removes the need to update templates solely to make the tab visible.

Previously, for resources such as Subnet, the tab remained disabled until the **Add** button was clicked and at least one `tag` was added, thereby blocking access to the tab.

![resource tag error](https://docs.stackgen.com/assets/images/subnettagsjun2025-8c9208b53d0f4367dd3995909467039c.png)

### Policies Are Not Getting Added to appStacks Created via CLI

Click to view

In CLI Version v0.64.3, default policies are now automatically attached when you create an appStack via CLI using the command `stackgen appstack create`, unless `--skip-policies` is specified. We recommend that you upgrade to this version to ensure consistent behavior.

Previously, appStacks created using StackGen CLI were missing the assignment of default policies for AWS, GCP, and Azure, unlike those created via the Web UI.

## Supported Resources

Click to view

With this release, we've added Kubernetes to the list of supported platforms across cloud providers. We've also added the following resource and services across the following clouds:

| Cloud Provider | Services | Resources |
| --- | --- | --- |
| **AWS** | 4 | 12 |
| **Azure** | 3 | 9 |
| **GCP** | 2 | 7 |

Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#whats-new)
  - [StackBuilder: Infra Generation and Deployment Agent For Developers And Platform Engineers](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stackbuilder-infra-generation-and-deployment-agent-for-developers-and-platform-engineers)
  - [Share Your Infrastructure With Set of appStacks Across Projects](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#share-your-infrastructure-with-set-of-appstacks-across-projects)
  - [Carve Out appStacks from Large TFState Imports](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#carve-out-appstacks-from-large-tfstate-imports)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#whats-enhanced)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stackgen-cli)
  - [Stay Ahead of Infrastructure Changes With Drift Alerts](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#stay-ahead-of-infrastructure-changes-with-drift-alerts)
  - [Streamlined UI Menu for Sharing, Importing, and Exporting IaC](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#streamlined-ui-menu-for-sharing-importing-and-exporting-iac)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#whats-fixed)
  - [Cloud Discovery UI: Search and Filter Does Not Work On Create appStack Page](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#cloud-discovery-ui-search-and-filter-does-not-work-on-create-appstack-page)
  - [Resource Tags Tab Is Disabled for a Subnet Resource Until You Add Tags](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#resource-tags-tab-is-disabled-for-a-subnet-resource-until-you-add-tags)
  - [Policies Are Not Getting Added to appStacks Created via CLI](/docs/stackgen/release-notes/aip/archive/2025/aug25-release#policies-are-not-getting-added-to-appstacks-created-via-cli)
