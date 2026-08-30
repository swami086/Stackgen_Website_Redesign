---
title: "Key Features"
product: "stackgen"
sourcePath: "/docs/support-and-kb/troubleshooting/actions-required"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/troubleshooting/actions-required"
status: "ok"
---

The **Actions Required** tab in the Topology Canvas lists mandatory configurations that must be completed to ensure the proper functionality of the infrastructure. It helps users identify and resolve misconfigurations, missing dependencies, or incomplete settings before deployment.

![actions required](https://docs.stackgen.com/assets/images/actions-required-5119425e7cde1f080193e3e53defaac5.png)

### Key Features

- A centralised view of missing or misconfigured settings that could affect deployment.
- Real-time validation to detect infrastructure issues.
- Actionable recommendations to guide users in resolving errors.
- Dependency validation, ensuring all interconnected resources function correctly.

## Common Configuration Issues and Resolutions

The **Actions Required** tab flags missing or incorrect settings across various cloud resources. Below are common issues and their resolutions:

### Compute Resources

- **Missing IAM Role for AWS ECS Cluster** → Assign an appropriate IAM role with necessary permissions.
- **Unconfigured Azure VM Network Interface** → Ensure the VM has an assigned virtual network and subnet.
- **GCP Compute Engine Instance without a Firewall Rule** → Define ingress/egress rules for secure connectivity.

### Network Resources

- **AWS VPC Subnet Missing Route Table Association** → Associate the subnet with an existing route table.
- **Azure Virtual Network with Unlinked Subnets** → Configure and link required subnets.
- **GCP VPC Missing Internet Gateway** → Attach an internet gateway for outbound connectivity.

### Storage and Database Resources

- **AWS S3 Bucket Without Proper Access Policies** → Define bucket policies to control permissions.
- **Azure SQL Database Without a Firewall Rule** → Allow access from required IP ranges.
- **GCP Cloud Storage Without Lifecycle Rules** → Configure retention and deletion policies.

### Security and IAM Resources

- **AWS IAM Policy Not Attached to a Role** → Assign the correct policy to the respective IAM role.
- **Azure Role Assignment Without Scope Definition** → Ensure the role assignment specifies the correct scope (resource, subscription, or management group).
- **GCP IAM Policy Missing User Permissions** → Define proper user roles and service account permissions.

## How It Works

1. **Detection of Issues**: The **Actions Required** tab automatically scans resources and detects missing configurations or incorrect settings.
2. **Issue Highlighting**: Each misconfiguration is flagged with a warning icon and a brief description of the issue.
3. **Actionable Recommendations**: Users receive concise one-line suggestions highlighting the issue and how to address it.
4. **Validation Check**: Once all required actions are completed, the issue disappears from the list, ensuring that the infrastructure is fully configured before deployment.

**Sample Use Cases**

- **Case 1:** An AWS ECS Cluster missing an IAM Role will be flagged, prompting the user to assign necessary permissions.
- **Case 2:** A VPC Subnet without a route table association will be listed as an issue, requiring the user to assign a route table.
- **Case 3:** A Kubernetes deployment without network policies will be identified, ensuring security policies are configured.

- [Key Features](/docs/stackgen/support-and-kb/troubleshooting/actions-required#key-features)
- [Common Configuration Issues and Resolutions](/docs/stackgen/support-and-kb/troubleshooting/actions-required#common-configuration-issues-and-resolutions)
  - [Compute Resources](/docs/stackgen/support-and-kb/troubleshooting/actions-required#compute-resources)
  - [Network Resources](/docs/stackgen/support-and-kb/troubleshooting/actions-required#network-resources)
  - [Storage and Database Resources](/docs/stackgen/support-and-kb/troubleshooting/actions-required#storage-and-database-resources)
  - [Security and IAM Resources](/docs/stackgen/support-and-kb/troubleshooting/actions-required#security-and-iam-resources)
