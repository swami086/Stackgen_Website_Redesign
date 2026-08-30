---
title: "Introduction"
product: "stackgen"
sourcePath: "/docs/support-and-kb/how-tos/awsdeploymentguide"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/how-tos/awsdeploymentguide"
status: "ok"
---

- [Introduction](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#introduction)
  - [Why StackGen?](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#why-stackgen)
  - [Overview of Customer Deployment in AWS](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#overview-of-customer-deployment-in-aws)
  - [Expected Deployment Time](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#expected-deployment-time)
  - [Supported AWS Regions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#supported-aws-regions)
- [Technical Prerequisites and Requirements](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#technical-prerequisites-and-requirements)
  - [Prerequisite Skills](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#prerequisite-skills)
  - [Environment Configuration](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#environment-configuration)
  - [Required Tools](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#required-tools)
- [StackGen Deployment Architecture on AWS](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#stackgen-deployment-architecture-on-aws)
- [Security and Compliance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#security-and-compliance)
  - [Avoid Using AWS Root Account](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#avoid-using-aws-root-account)
  - [Least Privilege Principle](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#least-privilege-principle)
  - [Public Resources](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#public-resources)
  - [IAM Roles and Policies](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#iam-roles-and-policies)
  - [Keys and Secrets Management](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#keys-and-secrets-management)
  - [Data Storage and Encryption](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#data-storage-and-encryption)
- [Cost and Billing](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#cost-and-billing)
  - [Billable Services](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#billable-services)
  - [Licensing Costs](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#licensing-costs)
- [Deployment and Maintenance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#deployment-and-maintenance)
  - [Step-by-Step Deployment Instructions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#step-by-step-deployment-instructions)
  - [Testing and Troubleshooting](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#testing-and-troubleshooting)
  - [Health Monitoring](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#health-monitoring)
- [Backup and Recovery](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#backup-and-recovery)
  - [Backup Instructions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#backup-instructions)
  - [Rotating Credentials](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#rotating-credentials)
- [Software Maintenance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#software-maintenance)
  - [Patches and Upgrades](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#patches-and-upgrades)
  - [License Management](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#license-management)
  - [AWS Service Limits](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#aws-service-limits)
- [Troubleshooting](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#troubleshooting)
  - [Fault Conditions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#fault-conditions)
  - [Technical Support](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#technical-support)
  - [Support Tiers and SLAs](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#support-tiers-and-slas)

## Introduction

Click to preview

### Why StackGen?

StackGen is designed to streamline application deployment and infrastructure provisioning by generating Infrastructure as Code (IaC) tailored to your application's requirements. Typical use cases include:

- Automating Infrastructure as Code creation for Python and Java apps.
- Managing infrastructure for scalable web applications.
- Ensuring compliance and security in cloud deployments.

### Overview of Customer Deployment in AWS

StackGen provides a comprehensive solution for hosting StackGen within your AWS cloud environment. The deployment involves:

1. Setting up an EKS cluster.
2. Configuring IAM resources.
3. Integrating with your existing VPC.

Once deployment is complete, the following resources will be set up:

- Kubernetes cluster on EKS
- IAM roles and policies for access management
- VPC configurations including subnets and security groups
- Helm charts for deploying StackGen services

### Expected Deployment Time

The typical deployment, including setting up the required AWS resources and configuring the software, is expected to take approximately **1-2 hours**, depending on your network and resource availability.

### Supported AWS Regions

StackGen supports deployment in all major AWS regions, ensuring broad availability and compliance with regional regulations. Specific regions can be configured based on your requirements.

## Technical Prerequisites and Requirements

Click to preview

### Prerequisite Skills

The deployment process requires basic familiarity with the following concepts, tools, or skills:

- AWS services (EKS, IAM, VPC).
- Terraform.
- Kubernetes management.
- Basic understanding of Helm charts.

### Environment Configuration

The deployment environment must include:

1. An AWS account with administrative access.
2. A domain configured in Amazon Route 53.
3. A valid SSL certificate in AWS Certificate Manager.
4. A TLS certificate in AWS Certificate Manager.

### Required Tools

To deploy StackGen, you need:

- [Terraform](https://developer.hashicorp.com/terraform/install) or [OpenTofu](https://opentofu.org/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/) (version 3.7.0 or later)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- AWS IAM user or role for infrastructure provisioning.
- A Route 53 alias record pointing to your StackGen installation.
- TLS certificate in AWS Certificate Manager.

## StackGen Deployment Architecture on AWS

![AWS Deployment Guide Architechture](https://docs.stackgen.com/assets/images/architechtureawsdeployment-c43b5e421c491f040a5b0ab8a359454b.png)

The architecture consists of StackGen, which is hosted on an EKS cluster within an AWS VPC. This setup also integrates StackGen services and databases. The network layer can be customized based on specific requirements.

## Security and Compliance

Click to preview

### Avoid Using AWS Root Account

- Avoid using the AWS account's root user for deployment or operational tasks.
- Use IAM users or roles with the least privilege necessary to ensure security.

### Least Privilege Principle

Apply the principle of least privilege to all IAM roles and policies, ensuring only necessary permissions are granted.

### Public Resources

- No public resources are required during the deployment of StackGen.
- Resources are configured for private access within the VPC by default.

### IAM Roles and Policies

#### Example IAM Policy for EKS

```json
{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "eks:CreateCluster",\
\
        "eks:DescribeCluster",\
\
        "eks:ListClusters",\
\
        "eks:DeleteCluster"\
\
      ],\
\
      "Resource": "*"\
\
    }\
\
  ]

}
```

#### Example IAM Policy for VPC

```json
{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "ec2:CreateVpc",\
\
        "ec2:DescribeVpcs",\
\
        "ec2:DeleteVpc",\
\
        "ec2:CreateSubnet",\
\
        "ec2:DescribeSubnets",\
\
        "ec2:DeleteSubnet",\
\
        "ec2:CreateRouteTable",\
\
        "ec2:DescribeRouteTables",\
\
        "ec2:DeleteRouteTable"\
\
      ],\
\
      "Resource": "*"\
\
    }\
\
  ]

}
```

### Keys and Secrets Management

- Use AWS Secrets Manager to securely store sensitive data, such as database credentials.
- Regularly rotate secrets to enhance security.

### Data Storage and Encryption

- Ensure all data stored in S3 is encrypted using server-side encryption (SSE-S3 or SSE-KMS).
- Enable encryption for EBS volumes to secure data at rest.

## Cost and Billing

Click to preview

### Billable Services

- **Amazon EKS** (mandatory).
- **Amazon RDS** (optional, if using managed databases).

### Licensing Costs

StackGen requires licenses to be included in your subscription package. Contact the [StackGen Support](mailto:support@stackgen.com) for specific costs.

## Deployment and Maintenance

Click to preview

### Step-by-Step Deployment Instructions

1. **Prepare the Environment**


   - Install the required tools - `Terraform` and `OpenTofu`:

```bash
sudo apt-get install terraform tofu
```

   - Install `kubectl`:

```bash
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x ./kubectl

sudo mv ./kubectl /usr/local/bin/kubectl
```

   - Install Helm:

```bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

   - Configure AWS CLI:

```bash
aws configure
```

2. **Configure IAM Roles**

Create necessary IAM roles and policies using the examples provided [here](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#iam-roles-and-policies).

3. **Configure DNS and SSL**

Set up Route 53 records and SSL certificates in AWS Certificate Manager. Update `variables.tfvars` accordingly.

4. **Provision StackGen**

Use Terraform to set up StackGen in AWS:





```bash
terraform init

terraform apply -var-file="variables.tfvars"
```


### Testing and Troubleshooting

- Verify that all services are running as expected:





```bash
kubectl get pods -n appcd
```


### Health Monitoring

- Use AWS CloudWatch to monitor health metrics (e.g., CPU utilization, memory usage, and network traffic).

## Backup and Recovery

Click to preview

### Backup Instructions

- Enable automatic snapshots for RDS databases via the AWS Management Console or CLI.

### Rotating Credentials

- Regularly rotate IAM credentials and use AWS Secrets Manager for secure management.

## Software Maintenance

Click to preview

### Patches and Upgrades

- Check for updates and apply patches as needed.
- Follow official documentation for upgrading Helm charts and Terraform scripts.

### License Management

- Ensure software licenses are up-to-date.
- Renew licenses as needed.

### AWS Service Limits

- Monitor AWS service limits and request increases as required for scaling.

## Troubleshooting

Click to preview

### Fault Conditions

1. Check CloudWatch logs for errors.
2. Verify the status of Kubernetes pods.
3. Ensure IAM roles and policies are correctly configured.

### Technical Support

For support, contact the StackGen team at [support@stackgen.com](mailto:support@stackgen.com).

### Support Tiers and SLAs

StackGen offers enterprise support with a **24-hour Service Level Agreement (SLA)**. Ensure you are aware of your support tier and corresponding SLA.

- [Introduction](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#introduction)
  - [Why StackGen?](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#why-stackgen)
  - [Overview of Customer Deployment in AWS](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#overview-of-customer-deployment-in-aws)
  - [Expected Deployment Time](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#expected-deployment-time)
  - [Supported AWS Regions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#supported-aws-regions)
- [Technical Prerequisites and Requirements](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#technical-prerequisites-and-requirements)
  - [Prerequisite Skills](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#prerequisite-skills)
  - [Environment Configuration](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#environment-configuration)
  - [Required Tools](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#required-tools)
- [StackGen Deployment Architecture on AWS](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#stackgen-deployment-architecture-on-aws)
- [Security and Compliance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#security-and-compliance)
  - [Avoid Using AWS Root Account](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#avoid-using-aws-root-account)
  - [Least Privilege Principle](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#least-privilege-principle)
  - [Public Resources](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#public-resources)
  - [IAM Roles and Policies](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#iam-roles-and-policies)
  - [Keys and Secrets Management](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#keys-and-secrets-management)
  - [Data Storage and Encryption](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#data-storage-and-encryption)
- [Cost and Billing](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#cost-and-billing)
  - [Billable Services](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#billable-services)
  - [Licensing Costs](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#licensing-costs)
- [Deployment and Maintenance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#deployment-and-maintenance)
  - [Step-by-Step Deployment Instructions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#step-by-step-deployment-instructions)
  - [Testing and Troubleshooting](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#testing-and-troubleshooting)
  - [Health Monitoring](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#health-monitoring)
- [Backup and Recovery](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#backup-and-recovery)
  - [Backup Instructions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#backup-instructions)
  - [Rotating Credentials](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#rotating-credentials)
- [Software Maintenance](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#software-maintenance)
  - [Patches and Upgrades](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#patches-and-upgrades)
  - [License Management](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#license-management)
  - [AWS Service Limits](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#aws-service-limits)
- [Troubleshooting](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#troubleshooting)
  - [Fault Conditions](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#fault-conditions)
  - [Technical Support](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#technical-support)
  - [Support Tiers and SLAs](/docs/stackgen/support-and-kb/how-tos/awsdeploymentguide#support-tiers-and-slas)
