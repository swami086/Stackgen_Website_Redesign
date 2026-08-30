---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/drift/detectdrift"
sourceUrl: "https://docs.stackgen.com/docs/concepts/drift/detectdrift"
status: "ok"
---

## Overview

Drift Detection in StackGen identifies discrepancies between your deployed cloud infrastructure and the state defined in your Terraform configurations. This feature ensures visibility into unauthorized or unintended changes, enabling teams to maintain consistency, security, and compliance across their environments.

Lets see how its done in a step-by-step manner.

### Prerequisites

Click to view

- **Permissions and Authentication**: To enable drift detection, StackGen requires read-only access to your cloud provider and a valid Terraform state file.

Ensure that you have the following permissions:
  - **AWS**: IAM policies with Describe, List, and Get permissions for infrastructure components.
  - **Azure**: Role-based access control (RBAC) with read permissions for required resources.
  - **GCP**: Read-only IAM roles for resource discovery.
- **CLI Version**: Ensure StackGen **CLI v0.50.1** or higher is installed.

- **TOFU Installation**: Install [OpenTofu (v1.9.0+)](https://opentofu.org/docs/intro/install/), a Terraform-compatible tool, and add it to your **PATH**.

- **Cloud Credentials**: Configure your AWS, Azure, GCP, or Civo credentials.

- **StackGen Login**: Authenticate using `stackgen configure`.
  - To configure your environment variables, refer to the articles [Configure StackGen Cloud](/docs/stackgen/cli-guide/configuration/cloud) and [Configure StackGen CLI](/docs/stackgen/cli-guide/configuration/configure-stackgen-cli)

### Drift in StackGen UI

Click to view

To begin with Drift, follow these steps:

1. From the StackGen cloud **Home** page, navigate to the **Drifts** tab.

2. Click the appStack for which you want to detect drift.



note





Before you select the appStack, ensure that:



   - The appStack must be deployed to your cloud to be able to detect drift.
   - You have configured a storage state backend, as the drift command needs access to the `.tfstate` file.

3. From the **Actions** column, click **View CLI Commands** to follow the CLI commands.



note





Skip **Step 2** of the **CLI commands for Drifts Test** dialog if you’ve already configured your environment.







![clidrift](https://docs.stackgen.com/assets/images/clifordriftdetect-7ae0592f96762b73c1a76c510e1a8ab6.jpg)


### Enable Drift Detection

Click to view

Run the following command:

```bash
stackgen drift detect --appstack-id <appstack-id> --var="region=<region>”
```

### Flags

| Flag | Description | Required |
| --- | --- | --- |
| `--appstack-id` | ID of the appStack to analyze. You can find this in the URL of your appStack in the StackGen UI. <br>**Example**: `app-stack-12345`. | Yes |
| `--var="region=<region>"` | Cloud provider region where the app stack is deployed. <br>**Example**: `us-east-1`, `west-europe`. | Yes |

Follow the [StackGen CLI documentation](/docs/stackgen/cli-guide/usage/drifts) to detect drift via the CLI.

### View Drift Results in UI

Click to view

1. From the StackGen cloud **Home** page, navigate to the **Drifts** tab.

2. Click the chart icon next to the appStack to view the **Drift** dashboard.



![chart](https://docs.stackgen.com/assets/images/charticondrift-65a30c71ef3575caa6cf1f2f1fc913e0.jpg)











You will be redirected to the **CLI Runs** dashboard.



![driftdashboard](https://docs.stackgen.com/assets/images/driftdashboard-99190dacdedf7fb6b4bcfc6f4868be89.jpg)











From here you can view the following:
   - **Summary**: High-level changes (resource types affected).
   - **Details**: Per-resource diffs (e.g., modified tags, configuration shifts).
3. Click individual resources to view granular details (e.g., modified tags, configurations).



![driftdiff](https://docs.stackgen.com/assets/images/driftdiff-3cb3025e8fb53b746a7cad915af66407.jpg)

4. If you have a **Custom IaC**, you can view it by clicking the **CLI Runs** tab and clicking the relevant run.



![customiac](https://docs.stackgen.com/assets/images/driftdiffforiac-6faa5f6a673e990733f485016df0d294.jpg)


## Drift Alerts

Click to view

**Drift Alerts** notify you when your infrastructure changes outside the defined Infrastructure-as-Code (IaC) configuration. This helps you detect unexpected modifications and take corrective action quickly.

Drift Alerts let you:

- Detect unauthorized or manual changes to your cloud resources.
- Maintain compliance by monitoring infrastructure deviations.
- Reduce downtime by responding quickly to unexpected modifications.

**Key Capabilities**

- **Automatic Drift Detection**: Drift alret lets you monitor the differences between deployed infrastructure and your IaC definitions.
- **Real-Time Notifications via Slack**: All detected drifts are sent directly as alerts to your connected Slack channel.
- **Centralized Alerting**: All types of drift are reported; no manual selection is required.

### How Drift Alerts Work

When you enable alerts on a drift, the following happens:

1. StackGen scans your infrastructure for changes outside your IaC definitions.
2. Any detected drift is compiled into an alert.
3. The alert is sent to your connected Slack channel in real-time.

### Configure Drift Alerts

To get alerts on Drifts on an appStack, check out the section on [Enabling appStack Notifications](/docs/stackgen/setup/alerts).

### Best Practices

- Ensure your Slack integration is connected and active.
- Regularly review drift alerts to confirm whether changes are intentional or require remediation.
- Treat repeated drifts as a signal to review your deployment process.

### Troubleshooting

Not Receiving Alerts?

- Verify that your Slack integration is active.
- Check that your Slack channel allows messages from StackGen.

## Best Practices

**Review Changes Before Applying**: Always inspect drift results before updating your appStack.

- [Overview](/docs/stackgen/concepts/drift/detectdrift#overview)
  - [Prerequisites](/docs/stackgen/concepts/drift/detectdrift#prerequisites)
  - [Drift in StackGen UI](/docs/stackgen/concepts/drift/detectdrift#drift-in-stackgen-ui)
  - [Enable Drift Detection](/docs/stackgen/concepts/drift/detectdrift#enable-drift-detection)
  - [Flags](/docs/stackgen/concepts/drift/detectdrift#flags)
  - [View Drift Results in UI](/docs/stackgen/concepts/drift/detectdrift#view-drift-results-in-ui)
- [Drift Alerts](/docs/stackgen/concepts/drift/detectdrift#drift-alerts)
  - [How Drift Alerts Work](/docs/stackgen/concepts/drift/detectdrift#how-drift-alerts-work)
  - [Configure Drift Alerts](/docs/stackgen/concepts/drift/detectdrift#configure-drift-alerts)
  - [Best Practices](/docs/stackgen/concepts/drift/detectdrift#best-practices)
  - [Troubleshooting](/docs/stackgen/concepts/drift/detectdrift#troubleshooting)
