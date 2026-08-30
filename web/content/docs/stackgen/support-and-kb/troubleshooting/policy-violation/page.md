---
title: "Key Features"
product: "stackgen"
sourcePath: "/docs/support-and-kb/troubleshooting/policy-violation"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/troubleshooting/policy-violation"
status: "ok"
---

The **Policy Violation** tab in the Topology Canvas helps users identify and resolve compliance issues related to security, access control, and governance policies defined in StackGen. It ensures that cloud resources adhere to best practices, organisational policies, and regulatory requirements before deployment.

![policy violation](https://docs.stackgen.com/assets/images/policy-violations-69fe33f9176ea348d18140edd009b988.png)

### Key Features

- Automated detection of non-compliant configurations.
- Real-time validation against security, networking, IAM, and cost governance policies.
- Actionable recommendations to remediate policy violations.
- Visibility into compliance risks before deploying infrastructure.

## How It Works

### Policy Enforcement

StackGen scans all resources in the Topology Canvas against both user-defined policies and built-in compliance standards. It includes built-in policies that align with major regulatory frameworks such as FedRAMP, GDPR, HIPAA, MARS-E, NIST-800-171, NIST-800-53, and NIST-CSF. If a resource has any misconfiguration or fails to meet compliance requirements, it is flagged as a violation.

### Violation Reporting

Each policy violation is displayed with a description, severity level, and the affected resource(s). Users receive detailed insights into why the resource is non-compliant, helping them understand the impact of the violation.

### Recommended Fixes

StackGen provides automated recommendations to resolve policy violations. Users can apply the suggested changes directly within the **Configure Resource** panel to bring their infrastructure into compliance.

note

**Custom Resources Require Manual Remediation**: Unlike StackGen-provided resources, which have automatic error fixes, custom resources will not be automatically remediated when policy violations or missing attributes occur. You must manually fix errors in custom resources by reviewing the error message in the **Actions required** panel and entering the required values in the resource configuration panel.

![Custom Resources Manual Remediation](https://docs.stackgen.com/assets/images/customresourcesremediationRN01012026-b7f31735feecf4d40699886ab8c37dc7.png)

## Common Policy Violations and Resolutions

### Security Violations

| **Violation** | **Description** | **Resolution** |
| --- | --- | --- |
| S3 Bucket with Public Access Enabled | The bucket is accessible to everyone, violating security policies. | Disable public access and apply IAM-based controls. |
| VM Running Without Encryption | Storage or boot disk encryption is required but not enabled. | Enable encryption using cloud provider settings. |
| IAM Role with Excessive Permissions | The role has more permissions than necessary, violating least privilege policies. | Restrict permissions to only what is required. |

### Network Violations

| **Violation** | **Description** | **Resolution** |
| --- | --- | --- |
| Unrestricted Ingress Rule in Security Group | A security group allows inbound traffic from all IPs (0.0.0.0/0). | Restrict access to trusted IPs or private networks. |
| Missing VPC Flow Logs | Network traffic monitoring is disabled, violating compliance requirements. | Enable VPC Flow Logs for auditing and visibility. |

### IAM and Access Control Violations

| **Violation** | **Description** | **Resolution** |
| --- | --- | --- |
| User Has Full Admin Access Without Justification | A user account has full administrative access without documented approval. | Restrict access and enforce RBAC. |
| Service Account Without Key Rotation Policy | A service account lacks an automated key rotation policy. | Configure key rotation to improve security posture. |

### Cost Governance Violations

| **Violation** | **Description** | **Resolution** |
| --- | --- | --- |
| Idle Compute Instances Detected | VM instances are running without activity, leading to unnecessary costs. | Identify unused instances and shut them down. |
| Oversized Database Instances | The provisioned database instance exceeds workload requirements. | Resize to a more cost-effective instance type. |

## Severity Levels

Each violation is assigned a severity level to help prioritise remediation efforts:

- **Critical:** High-risk issues that must be resolved before deployment.
- **Warning:** Non-compliance that may not block deployment but requires attention.
- **Informational:** Best-practice recommendations for improving security and efficiency.

- [Key Features](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#key-features)
- [How It Works](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#how-it-works)
  - [Policy Enforcement](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#policy-enforcement)
  - [Violation Reporting](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#violation-reporting)
  - [Recommended Fixes](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#recommended-fixes)
- [Common Policy Violations and Resolutions](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#common-policy-violations-and-resolutions)
  - [Security Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#security-violations)
  - [Network Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#network-violations)
  - [IAM and Access Control Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#iam-and-access-control-violations)
  - [Cost Governance Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation#cost-governance-violations)
