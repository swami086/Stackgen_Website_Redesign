---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/drift"
sourceUrl: "https://docs.stackgen.com/docs/concepts/drift"
status: "ok"
---

## Overview

Drift Detection in StackGen helps ensure that your infrastructure remains in sync with its intended configuration by identifying changes between the actual cloud environment and the defined Infrastructure as Code (IaC). This feature lets you detect, visualize, and manage drift before creating an appStack and as part of ongoing monitoring after deployment.

You can automatically identify discrepancies (drift) between your deployed cloud resources and their expected state defined in Terraform. This feature helps your teams detect unauthorized changes, configuration mismatches, or outdated resources, enabling proactive remediation.

Both features are accessible via CLI commands and integrated with the StackGen UI for end-to-end visibility.

## Drift Detection Process

After deploying an appStack, StackGen enables ongoing drift detection to track infrastructure changes over time. The drift detection workflow is as follows:

1. **Enable Drift Detection**: Enable drift detection at an appStack level. Run the CLI tool periodically to report drift back to the StackGen cloud.
2. **Review and Manage Detected Drift**: Any detected drifts are displayed in the Topology Canvas.
3. **IaC-to-IaC Drift Detection**:
   - Compare the latest Terraform state file with previously imported versions.
   - Ensure infrastructure updates remain consistent with expected configurations.
4. **Maintain Infrastructure Consistency**: Regular drift detection ensures that infrastructure remains compliant with its defined state.

### How Drift Detection Works in StackGen

1. **CLI Command**: Run `stackgen drift detect` to scan your cloud environment against the Terraform state.
2. **Analysis**: The CLI generates a summary of changes (created, updated, and deleted resources).
3. **UI Visualization**: Detailed drift results are displayed in the StackGen UI for granular inspection.

## Key Benefits

- **Proactive Security**: Detect unauthorized modifications (e.g., altered IAM policies, deleted encryption settings) that could expose vulnerabilities.
- **Operational Reliability**: Ensure infrastructure aligns with IaC definitions, reducing deployment failures caused by configuration mismatches.
- **Cost Control**: Identify orphaned resources (e.g., unattached disks, idle instances) to eliminate wasteful cloud spending.
- **Audit Compliance**: Maintain a record of drift history for auditing and governance purposes.
CI/CD Integration: Automate drift checks in pipelines to block deployments until discrepancies are resolved.

**Example Use Case**: Your team discovers a drift in their production S3 bucket’s encryption settings via StackGen drift detection. They use the StackGen import state file feature to sync the corrected Terraform state, then enforce policies to prevent future misconfigurations.

Let’s learn more about this feature in detail.

- [Overview](/docs/stackgen/concepts/drift#overview)
- [Drift Detection Process](/docs/stackgen/concepts/drift#drift-detection-process)
  - [How Drift Detection Works in StackGen](/docs/stackgen/concepts/drift#how-drift-detection-works-in-stackgen)
