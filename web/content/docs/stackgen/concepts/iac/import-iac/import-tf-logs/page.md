---
title: "View Import Logs"
product: "stackgen"
sourcePath: "/docs/concepts/iac/import-iac/import-tf-logs"
sourceUrl: "https://docs.stackgen.com/docs/concepts/iac/import-iac/import-tf-logs"
status: "ok"
---

StackGen intelligently evaluates your **Terraform state (`.tfstate`) file** before importing, identifying **best practices and security violations**. This ensures your infrastructure adheres to security and governance standards while providing greater visibility into potential risks.

![Import Logs](https://docs.stackgen.com/assets/images/import-logs-513d32c32fa2a6e00efc75b0bd3f1461.png)

## View Import Logs

While importing a **Terraform state file**, StackGen **automatically scans resources** and performs validation checks. Any violations or best practice issues detected are displayed in the **Import Logs** panel.

### Access Import Logs

1. Navigate to the **Topology Canvas**.
2. Click **Import** and select a **Terraform state file (`.tfstate`)**.
3. After the import completes, click the **View Import Logs** icon.

## What’s Included in Import Logs?

The **Import Logs** provide a summary of findings categorized by severity:

- **High Severity**: Critical security risks such as **exposed credentials**.
- **Medium Severity**: Configuration issues like **overly permissive IAM policies**.
- **Low Severity**: Minor best practice violations such as **improper resource naming**.

You can **filter logs by severity** to focus on specific issues.

## Detailed Violation Reports

![Import Logs](https://docs.stackgen.com/assets/images/import-logs-detailed-f19566efe49369847123693d440d4091.png)

Each issue in the **Import Logs** includes:

- **Violation Name**: The type of policy violation detected (e.g., **Exposed Credentials**).
- **Impacted Resources**: Number of resources affected.
- **Description**: Details about the violation and why it matters.

Click on the dropdown menu to see affected resources or to collapse the list.

**Sample Violations**

#### Security Issues

- Overly permissive IAM policies.
- IAM users detected instead of IAM roles.

#### Best Practice Violations

- Hardcoded secrets detected in imported Terraform configurations.

## Why Use Import Logs?

- **Identify and fix security risks** early in the imported topology.
- **Ensure compliance** with security and best practice standards.
- **Improve governance** by reviewing infrastructure before deployment.

After reviewing the logs, you can **take corrective action** to resolve violations and maintain a **secure, well-structured Terraform setup**.

- [View Import Logs](/docs/stackgen/concepts/iac/import-iac/import-tf-logs#view-import-logs)
  - [Access Import Logs](/docs/stackgen/concepts/iac/import-iac/import-tf-logs#access-import-logs)
