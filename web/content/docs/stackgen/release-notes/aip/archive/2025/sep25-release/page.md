---
title: "AI Wrote Your Code. Now It Runs Your Infra."
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2025/sep25-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2025/sep25-release"
status: "ok"
---

## AI Wrote Your Code. Now It Runs Your Infra.

This month’s update brings some of our biggest innovations yet—introducing **Aiden**, your AI-powered DevOps copilot, and **ObserveNow**, a unified, cost-efficient observability platform. Alongside these, we’ve added **Activity Logs** for full system visibility, enforced governance for Terraform and provider versions, and delivered enhancements that simplify workflows and governance management.

We’ve also addressed critical fixes to improve stability and performance, while expanding support for new AWS and Google resources.

Explore the highlights below to see what’s new, what’s improved, and what’s been fixed.

- What's New
  - [StackGen Aiden: Your AI Powered DevOps Copilot](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#stackgen-aiden-your-ai-powered-devops-copilot)
  - [StackGen ObserveNow: Unified, Open, Cost-Efficient Full-Stack Observability](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#stackgen-observenow-unified-open-cost-efficient-full-stack-observability)
  - [Introducing Activity Logs: Full Visibility into System Events](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#introducing-activity-logs-full-visibility-into-system-events)
  - [Terraform and Provider Version Governance Enforcement](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#terraform-and-provider-version-governance-enforcement)
- What's Enhanced
  - [Drift and appStack Notifications](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#drift-and-appstack-notifications)
  - [Enhanced Governance Management: Streamlined Assignment for Projects and appStacks](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#enhanced-governance-management-streamlined-assignment-for-projects-and-appstacks)
  - [UI and Workflow Enhancements](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#ui-and-workflow-enhancements)
- What's Fixed
  - [Validating Topology Loader Keeps Running](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#validating-topology-loader-keeps-running)
  - [Deleted Locals Remain in HCL Editor and Cause Duplication](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#deleted-locals-remain-in-hcl-editor-and-cause-duplication)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#supported-resources)

## What's New

### StackGen Aiden: Your AI Powered DevOps Copilot

Click to view

StackGen introduces **Aiden**, a multi-agent, LLM-powered DevOps Copilot built to automate and accelerate workflows across the entire DevOps lifecycle.

**What is Aiden?**

Aiden acts like a teammate in your DevOps team. Instead of writing custom scripts or digging through dashboards, engineers can simply ask Aiden to perform tasks in natural language.

**Typical use cases include**:

- **Pipeline Automation**: Configure and deploy CI/CD pipelines on demand.
- **Incident Response**: Debug and remediate production outages with context-aware suggestions and automated fixes.
- **Access and Security Management**: Generate and apply IAM policies aligned with org-wide rules.
- **Infra Ops**: Automate scaling, provisioning, and compliance tasks across environments.

Unlike static automation scripts, Aiden adapts over time by learning from your environment, toolchain, and workflows, thus improving accuracy and reducing repetitive manual effort.

**How Aiden Works**

1. **Connect Your Stack**: Aiden integrates with observability tools, CI/CD systems, databases, cloud providers, or Kubernetes clusters.
2. **Ask or Automate**: Use plain English queries or configure Aiden to automatically monitor for issues.
3. **Investigate and Resolve**: Aiden correlates logs, metrics, and traces to identify causes and either resolve issues or provide clear guidance.

**Key Concepts**

- **Integrations**: Connect Aiden directly to your CI/CD, observability, infrastructure, and security tools. Once integrated, Aiden can not only surface insights but also take direct action (e.g., restarting a service, rolling back a deployment, applying IAM policies).

- **Skills**: Teach Aiden your org-specific workflows using plain English instructions. Skills can encode:


  - Deployment approval processes
  - Incident escalation paths
  - Compliance and governance rules

Skills are reusable across teams, ensuring automation reflects your exact processes.

**Why Aiden Works For You**

- **Fewer Repetitive Tasks**: Automate the **plumbing** (pipelines, policies, scaling) so you can focus on engineering.
- **Faster Incident Handling**: Aiden reduces MTTR by surfacing root causes and orchestrating fixes across tools.
- **Consistent Workflows**: Codify org practices once as Skills and ensure they’re enforced everywhere.
- **Toolchain-Native**: Aiden integrates into your existing stack, no rip-and-replace required.

**Core Capabilities**

| Capability | Description |
| --- | --- |
| Observability Insights | Query metrics, logs, and traces in natural language. |
| Incident Insights | Surface actionable details from alerts, deployments, and pipelines. |
| Root Cause Analysis | Identify likely causes with contextual evidence. |
| Guided Remediation | Provide step-by-step guidance. |
| Custom Use Cases | Adapt Aiden to organization-specific tasks. |
| Flexible Deployment | Choose deployment options and models to align with security and compliance needs. |
| Platform Orchestration _(coming soon)_ | Manage all StackGen agents from one interface using natural language. |

Availability

Aiden is now live as part of the StackGen Autonomous Infrastructure Platform. You can start by connecting Aiden to your toolchain and defining org-specific Skills for immediate value.

This feature is available on request. Please contact your respective customer success representative or get in touch with us at [support@stackgen.com](mailto:support@stackgen.com).

For documentation and setup instructions, visit [Aiden docs](https://docs.opsverse.io/what-is-aiden).

### StackGen ObserveNow: Unified, Open, Cost-Efficient Full-Stack Observability

Click to view

**What is ObserveNow?**

[ObserveNow](https://docs.opsverse.io/launch-an-observenow-instance) eliminates observability fragmentation by consolidating multiple telemetry sources into a single platform. Instead of juggling different tools for logs, metrics, and traces, engineering teams get a unified view with instant setup, massive cost savings, and full control over data residency.

**Typical use cases include**:

- **Unified Monitoring:** Collect and correlate logs, metrics, traces, and APM data across cloud, on-prem, or hybrid environments.
- **Incident Analysis:** Reduce MTTR with fast root cause identification powered by correlated telemetry.
- **Cost-Effective Observability:** Achieve 60%+ lower TCO through compression technology and open-source standards.
- **Compliance-First Deployments:** Ensure data residency and governance with private SaaS or on-prem options.

Unlike proprietary vendor tools, ObserveNow is built on open standards (OpenTelemetry) and offers flexible deployment without lock-in.

**How ObserveNow Works**

1. **Connect Your Stack:** Integrate with 300+ out-of-the-box connectors using OpenTelemetry standards.
2. **Unified Data Collection:** Automatically ingest and correlate telemetry from applications, infrastructure, and services.

**Key Concepts**

- [**Integrations**](https://docs.opsverse.io/kubernetes): Out-of-the-box support for 300+ tools, with pre-built dashboards and alerts for rapid adoption.
- [**Dashboards**](https://docs.opsverse.io/UKQf-overview) and [**Alerts**](https://docs.opsverse.io/overview): Ready-to-use Grafana-based dashboards with automated alerting and multi-channel notifications.
- [**Compliance and Control**](https://docs.opsverse.io/flexible-options): Deploy anywhere - public cloud, private SaaS, or hybrid to meet strict data governance rules.
- **Customer-Facing Dashboards**: Share curated views with external stakeholders for transparency and collaboration.

**Why ObserveNow Works For You**

- **Cut Observability Costs by 60%+**: Compression-first architecture delivers massive TCO savings.
- **Faster Time-to-Value**: Start monitoring in minutes with automated configs and pre-built assets.
- **End-to-End Visibility**: Unified observability across apps, infra, and services.
- **No Vendor Lock-In**: Open standards ensure flexibility in tooling and deployment.
- **Scalable and Flexible**: Built for modern SaaS and enterprise-grade workloads.

**Core Capabilities**

| Capability | Description |
| --- | --- |
| Unified Observability | Single telemetry platform for logs, metrics, traces, and APM data. |
| 300+ Integrations | Out-of-the-box connectors with dashboards and automated alerts. |
| Built-in Monitoring | Pre-configured Grafana dashboards, alerting rules, and multi-channel routing. |
| Compliance-Ready Deployments | Private SaaS and on-prem options for data residency and governance. |
| Customer-Facing Dashboards | Share real-time insights externally for end-user visibility. |
| SLO Management | Define and track service-level objectives with budgeting. |
| Optimized Data Processing | Filtering and compression for efficient ingestion and storage. |
| Open Standards Foundation | No vendor lock-in with OTel-based architecture. |

Availability

ObserveNow is now live as part of the StackGen Autonomous Infrastructure Platform. You can start by connecting your stack with 300+ integrations and deploying observability in minutes.

This feature is available on request. Please contact your StackGen customer success representative or reach out at [support@stackgen.com](mailto:support@stackgen.com).

For documentation and setup instructions, visit [ObserveNow Docs](https://docs.opsverse.io/launch-an-observenow-instance).

### Introducing Activity Logs: Full Visibility into System Events

Click to view

We’ve introduced a new **Activity Logs** dashboard to improve visibility and auditing across StackGen.

![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs-0327f98dc45418402fc69b616a8ca608.png)

**Key Features**

- Centralized audit log capturing all agent, chat, and user events.

- Filter logs by action, appStack, user, and time range.

- Drill down into log details with a JSON viewer for deeper inspection.



![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs2-46293d46016fb492b5df91fd681a827a.png)


This update enables platform engineers and admins to track, analyze, and troubleshoot system activity with complete transparency.

**Access Activity Logs**: Navigate to the **StackGen Home** page and click **Activity Logs**.

Check out the [Activity Logs](/docs/stackgen/concepts/activity-logs) documentation to learn about this feature in detail.

### Terraform and Provider Version Governance Enforcement

Click to view

As an StackGen Admin or DevOps, you need need tighter control over your infrastructure code to ensure consistency, reliability, and compliance. To help you with this, we’ve added new features that let you enforce which Terraform and provider versions can be used in your modules and appStacks.

![Terraform and Provider version](https://docs.stackgen.com/assets/images/tf-provider-version-b489cf8cad9b34c224921a88c1f17edf.png)

**Define Governance Policies for Version Control**

Your StackGen Admins and DevOps can now create policies to enforce the Terraform versions (for example, Only version 1.6.x) and Provider version requirements (for example, “AWS provider must be >= 5.0.0”) for Governance Policies.

**Sample Block**

```hcl
terraform {

  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {

    aws = {

      source  = "hashicorp/aws"

      version = "~> 5.0"

    }

    awscc = { // AWS Cloud Control

      source  = "hashicorp/awscc"

      version = "~> 1.0"

    }

  }

}

provider "aws" {

  region = var.region

}
```

These policies are automatically applied when you:

- Create appStacks
- Generate an IaC or pushed your IaC to Git.

**Automatic Version Checks in appStacks**

When you generate infrastructure code for an appStack, StackGen will:

- Check that the Terraform and provider versions match your organization’s policies.
- Automatically include the correct versions in the generated configuration.
- Prevent code generation if there’s a policy violation, and show clear error messages in the UI and CLI.

**Benefits You’ll Notice**

- No more version mismatches or unexpected errors while deploying infrastructure.
- Clear guidance on which versions are allowed, helping you stay compliant.
- More reliable infrastructure code with fewer manual checks.

Learn [How to Create and Assign Governance for Terraform and Provider Versions](/docs/stackgen/concepts/rbac/governance/tf-provider-versions).

## What's Enhanced

### Drift and appStack Notifications

Click to view

We’ve expanded StackGen notifications to support external integrations, helping teams stay on top of drift detection and appStack lifecycle events.

**What's Improved**

- **External Notification Channels**: Send alerts to Slack, Email, or Discord for drift and appStack events. You can now configure channels centrally via **Settings > Notification Channels**.

- **Drift Notifications**: Subscribe appStacks to drift alerts from the Drifts view. Get notified in real time when infrastructure drift is detected.



![Drift Alerts](https://docs.stackgen.com/assets/images/appstackalerts-7b0a4c9d6c8059cb7dde46448fb737fe.png)











Learn more about [Drift Alerts](/docs/stackgen/setup/alerts#subscribe-to-an-appstack-for-drift-notifications).

- **appStack Notifications**: Subscribe appStacks to notifications for lifecycle events like appStack create, update, archive/unarchive, delete, import/export.



![appStack Alerts](https://docs.stackgen.com/assets/images/appstackalerts-7b0a4c9d6c8059cb7dde46448fb737fe.png)











Learn more about [appStack alerts](/docs/stackgen/setup/alerts#subscribe-to-an-appstack-for-notifications).

- **Fine-grained Control**: You can now choose to receive alerts for all appStacks or only specific appStacks and manage multiple channels and event types with flexible settings.


**How to Enable Notifications**

1. Create a notification channel via **Settings > Notification Channels**.
2. Subscribe your appStacks to the channel via the Drifts or appStacks views.
3. Start receiving alerts in Slack, Email, or Discord.

Check out the documentation on [Enabling appStack Notifications](/docs/stackgen/setup/alerts) to learn about this feature in detail.

### Enhanced Governance Management: Streamlined Assignment for Projects and appStacks

Click to view

We’ve improved governance management in StackGen to better align with DevOps workflows and reduce manual effort.

- **Assign Governance to Projects via the Governance Configurations page**



![Governance Projects](https://docs.stackgen.com/assets/images/governance-projects-b096eded913acc4a64275f98fc00b763.png)












  - While assigning a governance configuration to a project, you can now choose to apply the selected governance version to selected projects. This ensures consistency across appStacks within a **Project** and enforces the latest governance standards without extra steps.
  - **Improved Visibility and Control**: The new UI now clearly displays which **Projects** are governed and allows admins to easily see governance assignments.

Learn how to [Assign Governance Configuration to Projects](/docs/stackgen/concepts/rbac/governance/governanceconfig#assign-governance-configuration-to-projects)

- **Direct Governance Configuration Management for appStacks**: Managing governance at the appStack level is now simpler and more flexible.



![Governance appStacks](https://docs.stackgen.com/assets/images/governance-appstacks-1825a600a5f159bffb9df0be01a570db.png)











You can now:


  - **Assign or Update Governance for an appStack**: Admins or DevOps can directly configure a specific governance version for each appStack from the appStack management screen.
  - **Remove Governance Assignments**: You can now remove a governance configuration from an appStack, giving full flexibility to adjust governance policies as needed.

Learn how to [Assign Governance Configuration to appStacks](/docs/stackgen/concepts/appstacks/manageappstacks#managing-governance-configuration-for-a-specific-appstack).

**Why This Matters**

- **Consistent Governance Across Projects and appStacks**: By enabling governance assignment directly to projects, you can now enforce the latest governance standards across all appStacks in a project with a single action. This eliminates the need for repetitive manual configuration and ensures uniform compliance across your infrastructure.
- **Improved Visibility and Control**: The updated UI provides clear visibility into which projects and appStacks are governed, helping admins and DevOps teams quickly understand policy coverage and make informed decisions.
- **Simplified appStack Governance Management**: You can now easily assign, update, or remove a governance configuration directly from the appStack management screen. This granular control empowers teams to adapt governance as projects evolve, making policy management faster and more intuitive.

These enhancements streamline governance workflows, reduce operational overhead, and improve compliance posture in dynamic cloud environments.

### UI and Workflow Enhancements

Click to view

We’ve made a series of important updates focused on simplifying the appStack creation and governance flows, improving UI clarity, and enhancing the overall experience. These changes reduce complexity, remove outdated workflows, and ensure consistency across the platform, making it easier for you to focus on your core tasks.

**Key Improvements**

- **Simplified appStack Creation Workflow**: We’ve streamlined the UI to make creating an appStack easier and more intuitive.


  - The **From Scratch** appStack creation flow has been streamlined. We have removed the option to select different **Target Deployments**. Instead, you can now select the **Cloud Provider** directly (AWS, GCP, Azure, or CIVO). The system automatically picks the provider with Kubernetes, so Kubernetes is always available in the drag-and-drop editor.

![Select cloud](https://docs.stackgen.com/assets/images/appstackSelectcloud-18b17c68667934312d461cc88ffd8cb1.png)

  - We've removed the create an appStack **From Source Code** from the workflow.
- The icon for target compute is no longer displayed at the top when viewing an appStack. Instead, you will now see the Cloud Provider icon.



![Target Compute](https://docs.stackgen.com/assets/images/appstackprovider-6cc73023069e38800fe3bce60ea599af.png)

- **Improved appStack Listing and Details**: We’ve added a **Governance** column to show applied governance for your appStack. The **Cloud Service** and **Repos** columns have been removed to simplify the view.



![appStack view page](https://docs.stackgen.com/assets/images/appstacklisting-sep25-dff86dfba6fe12d967a1983df876d861.png)

- **Create Governance Flow Update**: The **\+ New Configuratiom** flow now removes all references to the target compute, replacing it with a selection of available **Cloud Providers**.



![Governance](https://docs.stackgen.com/assets/images/newgovernance-sep2025-4d3e1883b91af5c1f8e5672e419d73dc.png)

- **First Time User Experience**: We've removed the First-time FTUX (First Time User Experience) flow to streamline the **appStack Creation** experience.



![FTUX](https://docs.stackgen.com/assets/images/ftux-963fb46566369af2637b774d5eac759e.png)


## What's Fixed

### Validating Topology Loader Keeps Running

Click to view

While creating an appStack **From Scratch** in StackGen, the `Validating Topology` loader would keep running in the background even after the **\+ Add Resources** window was opened. This happened because the loader process was not properly cleared when no resources were present in a newly created appStack, causing the loader to remain visible behind the active window.

![Topology validation loader](https://docs.stackgen.com/assets/images/validatingloaderaug2025-8443424633cda485a021abb974361058.png)

This issue has now been fixed. The loader stops correctly when the **\+ Add Resources** window appears, resulting in a smoother and cleaner experience.

### Deleted Locals Remain in HCL Editor and Cause Duplication

Click to view

When you deleted a local variable from the module editor UI, it was not being removed from the HCL editor (`main.tf`). If you manually cleared the locals block and added a new one, the locals section could appear multiple times in the HCL.

This happened because the module editor did not fully sync deletions with the underlying HCL structure, leaving behind stale or duplicated blocks. We have fixed this issue so that adding, deleting, and re-adding local variables now updates both the main.tf file and the preview canvas consistently, without leaving duplicates.

## Supported Resources

Click to view

With this release, we've added the following resource across the following clouds:

| Provider | Resource Name | Type |
| --- | --- | --- |
| AWS | ApiGatewayV2 Deployment | Standalone |
| AWS | ApiGatewayV2 Stage | Standalone |
| AWS | Default Network Acl | Standalone |
| AWS | Efs File System Policy | Standalone |
| AWS | Eks Access Policy Association | Standalone |
| AWS | Kms Grant | Standalone |
| AWS | Msk Serverless Cluster | Standalone |
| AWS | S3 Bucket Lifecycle Configuration | Standalone |
| AWS | Efs Mount Target | Standalone |
| AWS | Elasticache Serverless Cache | Standalone |
| GOOGLE | Billing Subaccount | Standalone |
| GOOGLE | Sql Ssl Cert | Standalone |

Refer to the [Supported Resources](/docs/stackgen/setup/supported-tech/supported-technologies-list) document to view the complete list.

- [What's New](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#whats-new)
  - [StackGen Aiden: Your AI Powered DevOps Copilot](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#stackgen-aiden-your-ai-powered-devops-copilot)
  - [StackGen ObserveNow: Unified, Open, Cost-Efficient Full-Stack Observability](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#stackgen-observenow-unified-open-cost-efficient-full-stack-observability)
  - [Introducing Activity Logs: Full Visibility into System Events](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#introducing-activity-logs-full-visibility-into-system-events)
  - [Terraform and Provider Version Governance Enforcement](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#terraform-and-provider-version-governance-enforcement)
- [What's Enhanced](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#whats-enhanced)
  - [Drift and appStack Notifications](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#drift-and-appstack-notifications)
  - [Enhanced Governance Management: Streamlined Assignment for Projects and appStacks](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#enhanced-governance-management-streamlined-assignment-for-projects-and-appstacks)
  - [UI and Workflow Enhancements](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#ui-and-workflow-enhancements)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#whats-fixed)
  - [Validating Topology Loader Keeps Running](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#validating-topology-loader-keeps-running)
  - [Deleted Locals Remain in HCL Editor and Cause Duplication](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#deleted-locals-remain-in-hcl-editor-and-cause-duplication)
