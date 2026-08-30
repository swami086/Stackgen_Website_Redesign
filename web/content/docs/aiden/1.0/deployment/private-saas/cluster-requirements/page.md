---
title: "Prerequisites"
product: "aiden"
sourcePath: "/aiden/1.0/deployment/private-saas/cluster-requirements"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/deployment/private-saas/cluster-requirements"
status: "ok"
---

To install Aiden instances onto your own cloud using the PrivateSaaS model, you need a K8s cluster on your cloud.

note

Assuming that you already run a managed Kubernetes (e.g., EKS, AKS, or GKE on AWS, Azure, or GCP, respectively) this article will demonstrate how you can configure your Kubernetes cluster using examples. However, any Kubernetes Cluster would work, provided, it fulfills the prerequisites mentioned in this guide.

## Prerequisites

Click to view

### Cluster Version and Size

Ensure that you meet the following Cluster Version and Size requirements:

- **Kubernetes version**: Your cluster must run Kubernetes version 1.25 or higher
- **Worker nodes**: Minimum of 3 worker nodes required, each with at least 4 vCPUs and 16GB RAM to ensure adequate resources for Aiden's workloads and high availability.
- **Network configuration**: Your VPC must be configured with a CIDR block of `/21` or smaller (e.g., `/21`, `/22`, `/23`) to ensure at least `2,048` IP addresses are available for the cluster and its workloads.

### Cluster Resources and Configurations

To run Aiden on your cloud infrastructure, certain cluster resources and configurations are required, regardless of your cloud provider:

**1\. Networking and Security Resources**: Create network resources to provide a secure and connected foundation for your cluster. This typically includes:

- **Networks:** VPC in AWS and GCP, or VNET in Azure.
- **Subnets, gateways, and route tables**.
- **Certificate management services**.
These components ensure security, connectivity, and smooth app operations.

**2\. Kubernetes Cluster Configuration**: Provision your Kubernetes cluster and specify its details, including:

- Cluster name and Kubernetes version.
- Node group configurations (name, operating system, type).
- Networking and security parameters.

**3\. Object Storage**: Object storage is required for Aiden to function properly. Supported types include:

- **AWS:** S3 buckets.
- **GCP:** Google Cloud Storage (GCS).
- **Azure:** Blob Storage.
Object storage enables scalable storage and retrieval of large volumes of unstructured data.

**4\. IAM Resources**: Set up **Identity and Access Management (IAM)** resources to securely manage access to your infrastructure and storage. IAM allows your admins to define who can access specific services and what actions are permitted, it is therefore crucial for granting Aiden access to object storage.

**5\. Application Access to Object Storage**: Ensure that pods running in your cluster have the necessary IAM permissions to access your object storage. This is especially important for functionalities like log storage, retrieval, and backups.

By following these guidelines, you will be able to set up a cluster that is secure, connected, and ready to support Aiden.

## Supported Cloud Providers

Aiden has been validated and tested on Kubernetes clusters from the following cloud providers:

- **AWS (EKS)**: Configure IAM roles and policies to grant your cluster pods access to S3 buckets for object storage operations.
- **GCP (GKE)**: Set up service accounts and bind them to Workload Identity to enable secure access to Google Cloud Storage buckets.
- **Azure (AKS)**: Generate storage account keys through the Azure Portal to authenticate and access Azure Blob Storage containers.

GCP and Azure Support

Private SaaS deployment on GCP (GKE) or Azure (AKS) requires additional setup and configuration. Please contact your customer success representative to enable Private SaaS access for your GCP or Azure account before proceeding with the deployment.

## AWS (EKS) Cluster Configuration [](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#aws-eks-cluster-configuration%20%22Direct%20link%20to%20AWS%20(EKS) Cluster Configuration")

The following section provides step-by-step instructions and Terraform examples for configuring an Amazon EKS cluster for Aiden Private SaaS deployment.

To create an Amazon EKS (Elastic Kubernetes Service) cluster using Terraform, you need to follow these steps:

1. **Set up the provider**: Configure the AWS provider for Terraform
2. **Define network and security resources**: Create VPC, subnets, IGW, NAT gateways, route tables, and other networking components
3. **Create object storage**: Set up S3 buckets for log storage and backups
4. **Configure IAM**: Create IAM roles and policies for pod access to S3
5. **Create EKS cluster**: Provision the EKS cluster with worker nodes

### VPC Configuration

VPC and Network Setup

This step creates a VPC in at least 2 availability zones with multiple subnets per availability zone (at least 1 public subnet and 'n' private subnets).

```hcl
// Creates one VPC in at least 2 availability zones with multiple subnets per availability zone

module "vpc" {

  source               = "terraform-aws-modules/vpc/aws"

  version              = "5.5.1"

  name                 = "<vpc_name>"

  cidr                 = "<vpc_cidr>"

  azs                  = "<vpc_availability_zones>"

  private_subnets      = "<cidr_private_subnet>"

  public_subnets       = "<cidr_public_subnet>"

  enable_nat_gateway   = true

  single_nat_gateway   = true

  enable_dns_hostnames = true

  public_subnet_tags   = {

    "Terraform"        = "true"

    "Environment"      = "opsverse-cluster"

  }

  private_subnet_tags  = {

    "Terraform"        = "true"

    "Environment"      = "opsverse-cluster"

  }

}
```

### S3 Bucket Configuration

S3 Bucket for Object Storage

This step creates an S3 bucket for Aiden to store logs and backups.

```hcl
module "s3_bucket_opsverse" {

  source = "../modules/s3"

  bucket_name = "opsverse-bucket"

  bucket_tags = {

    Name        = "opsverse-bucket"

    Environment = "production"

  }

}
```

**S3 Module Files:**

```hcl
// filename: ../modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false : true

  block_public_policy       = var.public_access ? false : true

  ignore_public_acls        = var.public_access ? false : true

  restrict_public_buckets   = var.public_access ? false : true

}

// filename: ../modules/s3/variables.tf

variable "bucket_name" {}

variable "public_access" {

  default = false

}
```

note

It is recommended to create the S3 bucket in the same region as the cluster.

### IAM Role Creation

IAM Role for Pod Access

This step creates a role for Aiden pods (specifically Loki pods) to access the S3 bucket to store and retrieve logs. The required role trust policy is as follows:

```json
{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Principal": {\
\
        "Federated": "arn:aws:iam::<yourAccount>:oidc-provider/oidc.eks.<region>.amazonaws.com/id/<yourEKSClusterIDProvider>"\
\
      },\
\
      "Action": "sts:AssumeRoleWithWebIdentity",\
\
      "Condition": {\
\
        "StringLike": {\
\
          "oidc.eks.<region>.amazonaws.com/id/<yourEKSClusterIDProvider>:sub": "system:serviceaccount:*:*"\
\
        }\
\
      }\
\
    }\
\
  ]

}
```

### IAM Policy Configuration

IAM Policy for S3 Access

This step defines an IAM policy that allows pods in the cluster to access the S3 bucket to store/retrieve logs and backup files.

**Sample Policy:**

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
        "s3:GetObject",\
\
        "s3:PutObject",\
\
        "s3:DeleteObject",\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::<yourBucketName>/*"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::<yourBucketName>"\
\
      ]\
\
    }\
\
  ]

}
```

**Terraform Configuration:**

```hcl
resource "aws_iam_role" "iam_for_loki_pods" {

  name = "eks-opsverse-s3-pod-role"

  assume_role_policy = <<EOF

{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Principal": {\
\
        "Federated": "${module.opsverse-eks-cluster.oidc_provider_arn}"\
\
      },\
\
      "Action": "sts:AssumeRoleWithWebIdentity",\
\
      "Condition": {\
\
        "StringLike": {\
\
          "${replace(module.opsverse-eks-cluster.oidc_provider_arn, "${element(split("/", module.opsverse-eks-cluster.oidc_provider_arn), 0)}/", "")}:sub": "system:serviceaccount:*:*"\
\
        }\
\
      }\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_policy" "loki_pod_permissions" {

  name   = "opsverse-eks-pod-permissions"

  policy = <<EOF

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
        "s3:GetObject",\
\
        "s3:PutObject",\
\
        "s3:DeleteObject",\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}/*"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "tag:GetResources",\
\
        "cloudwatch:GetMetricData",\
\
        "cloudwatch:GetMetricStatistics",\
\
        "cloudwatch:ListMetrics"\
\
      ],\
\
      "Resource": [\
\
        "*"\
\
      ]\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_role_policy_attachment" "loki_pod_permissions" {

  role       = aws_iam_role.iam_for_loki_pods.name

  policy_arn = aws_iam_policy.loki_pod_permissions.arn

}

output "loki_pod_role_arn" {

  value = aws_iam_role.iam_for_loki_pods.arn

}
```

note

When you create your EKS cluster, in the Terraform you can set `enable_irsa = "true"` to make sure you have an IAM OpenID Connect (OIDC) Provider for your EKS cluster.

### EKS Cluster Creation

EKS Cluster Configuration

This step creates a new EKS cluster with 1 worker node pool. Cluster configs such as name, Kubernetes version, networking/security, and object storage buckets can be defined. Specify the EC2 instances that will act as worker nodes in the cluster.

```hcl
provider "aws" {

  region = var.aws_region

}

module "opsverse-eks-cluster" {

  source  = "terraform-aws-modules/eks/aws"

  version = "19.21.0"

  cluster_name    = var.cluster_name

  cluster_version = "1.28"

  vpc_id          = module.vpc.vpc_id

  subnet_ids      = module.vpc.private_subnets

  enable_irsa     = "true"

  eks_managed_node_group_defaults = {

    disk_size      = 50

  }

  eks_managed_node_groups = {

    user_group_one = {

      name = "node-group-1"

      instance_types = ["m5a.xlarge"]

      ami_type       = "AL2_x86_64"

      capacity_type  = "ON_DEMAND"

      # By default, the module creates a launch template to ensure tags are propagated to instances, etc.,

      # so we need to disable it to use the default template provided by the AWS EKS managed node group service

      # use_custom_launch_template = false

      min_size     = 2

      max_size     = 4

      desired_size = 3

      root_volume_type = "gp2"

      key_name = var.keypair_name

      subnet_ids      = module.vpc.private_subnets

    }

  }

}
```

### Post-Deployment Information

Information Required After Cluster Creation

After the successful cluster creation, please send the following details to your StackGen Customer Success representative:

- **S3 bucket name**
- **ARN details**

This will help StackGen set up Aiden and offer you a smooth experience when creating Aiden apps.

## Deployment Options

There are 2 options when creating the cluster:

### Option 1: Using Existing VPC and Subnets

Deploy EKS Cluster with Existing VPC

If a VPC and subnets already exist in AWS, the same VPC and subnets can be used to create a cluster. Follow the steps below.

note

This is a generic working example snippet that creates an EKS cluster (assuming a VPC and subnets already exist) with the following resources:

- EKS Cluster with 1 worker node group that will have 3 nodes (4 vCPU and 16 GB Memory each)
- S3 bucket for Loki to store the logs and for the backups of VictoriaMetrics, ClickHouse, etc.
- IAM role to access the created S3 bucket
- IAM policy that defines the scope of the IAM role

Please feel free to add more granular resources (IGW/NAT Gateways, Route tables, ACM, etc.) as per your organization's security and networking standards.

**S3 Module:**

```hcl
// aws/private-saas/modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

  tags = merge(var.bucket_tags)

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false : true

  block_public_policy       = var.public_access ? false : true

  ignore_public_acls        = var.public_access ? false : true

  restrict_public_buckets   = var.public_access ? false : true

}

// aws/private-saas/modules/s3/variables.tf

variable "bucket_name" {}

variable "bucket_tags" {

  type    = map(string)

  default = {}

}

variable "public_access" {

  default = false

}
```

**EKS Cluster Configuration:**

```hcl
// aws/private-saas/opsverse-eks-iam/eks.tf

# Creates a 3-node EKS cluster. You may additionally want to:

#   - add more subnets to span whichever networks you want

#   - add manage_aws_auth="true" in case you do auth maps here too

#   - change cluster/module name to one that fits your org conventions

provider "aws" {

  region = var.aws_region

}

module "opsverse-eks-cluster" {

  source  = "terraform-aws-modules/eks/aws"

  version = "19.21.0"

  cluster_name    = var.cluster_name

  cluster_version = "1.28"

  // Need at least 2 AZs for EKS to create cluster

  # Uncomment this if a customer already has a VPC and Subnets

  subnet_ids      = [\
\
                   "${var.subnet_ids[0]}",\
\
                   "${var.subnet_ids[1]}",\
\
                   "${var.subnet_ids[2]}",\
\
                    ]

  vpc_id          = "${var.vpc_id}"

  enable_irsa     = "true"

  eks_managed_node_group_defaults = {

    disk_size      = 50

  }

  eks_managed_node_groups = {

    user_group_one = {

      name = "node-group-1"

      instance_types = ["m5a.xlarge"]

      ami_type       = "AL2_x86_64"

      capacity_type  = "ON_DEMAND"

      # By default, the module creates a launch template to ensure tags are propagated to instances, etc.,

      # so we need to disable it to use the default template provided by the AWS EKS managed node group service

      # use_custom_launch_template = false

      min_size     = 2

      max_size     = 4

      desired_size = 3

      root_volume_type = "gp2"

      key_name = var.keypair_name

      subnets = [\
\
        "${var.subnet_ids[0]}",\
\
        "${var.subnet_ids[1]}",\
\
        "${var.subnet_ids[2]}"\
\
      ]

    }

  }

}
```

**IAM Configuration:**

```hcl
// aws/private-saas/opsverse-eks-iam/iam.tf

# Creates a role for the Loki pods to access the pre-created S3 bucket

# for Loki backend.

#

# Assumption, the bucket var.s3_bucket is already created in same region

#

# Note: if you changed module name in eks.tf from "opsverse-eks-cluster", please

#       update this script to replace "opsverse-eks-cluster".

resource "aws_iam_role" "iam_for_loki_pods" {

  name = "eks-opsverse-s3-pod-role"

  assume_role_policy = <<EOF

{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Principal": {\
\
        "Federated": "${module.opsverse-eks-cluster.oidc_provider_arn}"\
\
      },\
\
      "Action": "sts:AssumeRoleWithWebIdentity",\
\
      "Condition": {\
\
        "StringLike": {\
\
          "${replace(module.opsverse-eks-cluster.oidc_provider_arn, "${element(split("/", module.opsverse-eks-cluster.oidc_provider_arn), 0)}/", "")}:sub": "system:serviceaccount:*:*"\
\
        }\
\
      }\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_policy" "loki_pod_permissions" {

  name   = "opsverse-eks-pod-permissions"

  policy = <<EOF

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
        "s3:GetObject",\
\
        "s3:PutObject",\
\
        "s3:DeleteObject",\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}/*"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "tag:GetResources",\
\
        "cloudwatch:GetMetricData",\
\
        "cloudwatch:GetMetricStatistics",\
\
        "cloudwatch:ListMetrics"\
\
      ],\
\
      "Resource": [\
\
        "*"\
\
      ]\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_role_policy_attachment" "loki_pod_permissions" {

  role       = aws_iam_role.iam_for_loki_pods.name

  policy_arn = aws_iam_policy.loki_pod_permissions.arn

}

output "loki_pod_role_arn" {

  value = aws_iam_role.iam_for_loki_pods.arn

}
```

**Provider and Variables:**

```hcl
// aws/private-saas/opsverse-eks-iam/provider.tf

terraform {

  required_providers {

    aws = {

      # region  = "us-west-2"

      source  = "hashicorp/aws"

      version = "~> 5.33.0"

    }

  }

  required_version = ">= 1.3"

}

// aws/private-saas/opsverse-eks-iam/s3.tf

module "s3_bucket_opsverse" {

  source = "../modules/s3"

  bucket_name = "opsverse-bucket"

  bucket_tags = {

    Name        = "opsverse-bucket"

    Environment = "production"

  }

}

// aws/private-saas/opsverse-eks-iam/variables.tf

variable "cluster_name" {}

variable "aws_region" {}

variable "keypair_name" {}

variable "s3_bucket" { }

variable "subnet_ids" { type = list }

variable "vpc_id" {}

variable "aws_profile" {}

// aws/private-saas/opsverse-eks-iam/vars.tfvars

aws_profile = "default"

aws_region = "us-west-2"

cluster_name = "opsverse-eks-cluster"

s3_bucket = "opsverse-bucket"

subnet_ids = [\
\
    "<subnet_id-1>",\
\
    "<subnet_id-2>",\
\
    "<subnet_id-3>"\
\
]

vpc_id = "<vpc_id>"

keypair_name = "bastion"
```

### Option 2: Creating New VPC and Subnets

Deploy EKS Cluster with New VPC

If a VPC and subnets don't exist in AWS and have to be created from scratch, follow the steps below.

note

This is a generic working example snippet that creates an EKS cluster with the following resources:

- A VPC in at least 2 availability zones
- Multiple subnets per availability zone (At least 1 public subnet and 'n' private subnets)
- EKS Cluster with 1 worker node group that will have 3 nodes (4 vCPU and 16 GB Memory each)
- S3 bucket for Loki to store the logs and for the backups of VictoriaMetrics, ClickHouse, etc.
- IAM role to access the created S3 bucket
- IAM policy that defines the scope of the IAM role

Please feel free to add more granular resources (IGW/NAT Gateways, Route tables, etc.) as per your organization's security and networking standards.

**S3 Module:**

```hcl
// aws/private-saas/modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

  tags = merge(var.bucket_tags)

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false : true

  block_public_policy       = var.public_access ? false : true

  ignore_public_acls        = var.public_access ? false : true

  restrict_public_buckets   = var.public_access ? false : true

}

// aws/private-saas/modules/s3/variables.tf

variable "bucket_name" {}

variable "bucket_tags" {

  type    = map(string)

  default = {}

}

variable "public_access" {

  default = false

}
```

**EKS Cluster Configuration:**

```hcl
// aws/private-saas/opsverse-eks-iam/eks.tf

# Creates a 3-node EKS cluster. You may additionally want to:

#   - add more subnets to span whichever networks you want

#   - add manage_aws_auth="true" in case you do auth maps here too

#   - change cluster/module name to one that fits your org conventions

provider "aws" {

  region = var.aws_region

}

module "opsverse-eks-cluster" {

  source  = "terraform-aws-modules/eks/aws"

  version = "19.21.0"

  cluster_name    = var.cluster_name

  cluster_version = "1.28"

  vpc_id          = module.vpc.vpc_id

  subnet_ids      = module.vpc.private_subnets

  enable_irsa     = "true"

  eks_managed_node_group_defaults = {

    disk_size      = 50

  }

  eks_managed_node_groups = {

    user_group_one = {

      name = "node-group-1"

      instance_types = ["m5a.xlarge"]

      ami_type       = "AL2_x86_64"

      capacity_type  = "ON_DEMAND"

      # By default, the module creates a launch template to ensure tags are propagated to instances, etc.,

      # so we need to disable it to use the default template provided by the AWS EKS managed node group service

      # use_custom_launch_template = false

      min_size     = 2

      max_size     = 4

      desired_size = 3

      root_volume_type = "gp2"

      key_name = var.keypair_name

      subnet_ids      = module.vpc.private_subnets

    }

  }

}
```

**IAM Configuration:**

```hcl
// aws/private-saas/opsverse-eks-iam/iam.tf

# Creates a role for the Loki pods to access the pre-created S3 bucket

# for Loki backend.

#

# Assumption, the bucket var.s3_bucket is already created in same region

#

# Note: if you changed module name in eks.tf from "opsverse-eks-cluster", please

#       update this script to replace "opsverse-eks-cluster".

resource "aws_iam_role" "iam_for_loki_pods" {

  name = "eks-opsverse-s3-pod-role"

  assume_role_policy = <<EOF

{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Effect": "Allow",\
\
      "Principal": {\
\
        "Federated": "${module.opsverse-eks-cluster.oidc_provider_arn}"\
\
      },\
\
      "Action": "sts:AssumeRoleWithWebIdentity",\
\
      "Condition": {\
\
        "StringLike": {\
\
          "${replace(module.opsverse-eks-cluster.oidc_provider_arn, "${element(split("/", module.opsverse-eks-cluster.oidc_provider_arn), 0)}/", "")}:sub": "system:serviceaccount:*:*"\
\
        }\
\
      }\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_policy" "loki_pod_permissions" {

  name   = "opsverse-eks-pod-permissions"

  policy = <<EOF

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
        "s3:GetObject",\
\
        "s3:PutObject",\
\
        "s3:DeleteObject",\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}/*"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "s3:ListBucket"\
\
      ],\
\
      "Resource": [\
\
        "arn:aws:s3:::${var.s3_bucket}"\
\
      ]\
\
    },\
\
    {\
\
      "Effect": "Allow",\
\
      "Action": [\
\
        "tag:GetResources",\
\
        "cloudwatch:GetMetricData",\
\
        "cloudwatch:GetMetricStatistics",\
\
        "cloudwatch:ListMetrics"\
\
      ],\
\
      "Resource": [\
\
        "*"\
\
      ]\
\
    }\
\
  ]

}

EOF

}

resource "aws_iam_role_policy_attachment" "loki_pod_permissions" {

  role       = aws_iam_role.iam_for_loki_pods.name

  policy_arn = aws_iam_policy.loki_pod_permissions.arn

}

output "loki_pod_role_arn" {

  value = aws_iam_role.iam_for_loki_pods.arn

}
```

**Network Configuration:**

```hcl
// aws/private-saas/opsverse-eks-iam/network.tf

# Creates one VPC in at least 2 availability zones with multiple subnets per availability zone (At least 1 public subnet and 'n' private subnets)

module "vpc" {

  source               = "terraform-aws-modules/vpc/aws"

  version              = "5.5.1"

  name                 = var.vpc_name

  cidr                 = var.vpc_cidr

  azs                  = var.vpc_network_azs

  private_subnets      = var.private_subnet_cidr

  public_subnets       = var.public_subnet_cidr

  enable_nat_gateway   = true

  single_nat_gateway   = true

  enable_dns_hostnames = true

  public_subnet_tags   = {

    "Terraform"        = "true"

    "Environment"      = "opsverse-cluster"

  }

  private_subnet_tags  = {

    "Terraform"        = "true"

    "Environment"      = "opsverse-cluster"

  }

}
```

**Provider and Variables:**

```hcl
// aws/private-saas/opsverse-eks-iam/provider.tf

terraform {

  required_providers {

    aws = {

      # region  = "us-west-2"

      source  = "hashicorp/aws"

      version = "~> 5.33.0"

    }

  }

  required_version = ">= 1.3"

}

// aws/private-saas/opsverse-eks-iam/s3.tf

module "s3_bucket_opsverse" {

  source = "../modules/s3"

  bucket_name = "opsverse-bucket"

  bucket_tags = {

    Name        = "opsverse-bucket"

    Environment = "production"

  }

}

// aws/private-saas/opsverse-eks-iam/variables.tf

variable "cluster_name" {}

variable "aws_region" {}

variable "keypair_name" {}

variable "s3_bucket" { }

variable "vpc_id" {}

variable "aws_profile" {}

variable "vpc_name" {}

variable "vpc_cidr" {}

variable "vpc_network_azs" { type = list }

variable "private_subnet_cidr" { type = list }

variable "public_subnet_cidr" { type = list }

// aws/private-saas/opsverse-eks-iam/vars.tfvars

aws_profile = "default"

aws_region = "us-west-2"

cluster_name = "opsverse-eks-cluster"

s3_bucket = "opsverse-bucket"

keypair_name = "bastion"

# This is relevant if VPC and Subnets has to be created by the Terraform. Ignore if these are already present.

vpc_name            = "opsverse-vpc"

vpc_network_azs     = ["us-west-2a", "us-west-2b"]

vpc_cidr            = "10.242.0.0/16"

private_subnet_cidr = ["10.242.0.0/18", "10.242.64.0/18"]

public_subnet_cidr  = ["10.242.128.0/18", "10.242.192.0/18"]
```

## Additional Resources

For a complete working example, please refer to: [https://github.com/opsverseio/private-saas](https://github.com/opsverseio/private-saas)

- [Prerequisites](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#prerequisites)
  - [Cluster Version and Size](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#cluster-version-and-size)
  - [Cluster Resources and Configurations](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#cluster-resources-and-configurations)
- [Supported Cloud Providers](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#supported-cloud-providers)
- [AWS (EKS) Cluster Configuration](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#aws-eks-cluster-configuration)
  - [VPC Configuration](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#vpc-configuration)
  - [S3 Bucket Configuration](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#s3-bucket-configuration)
  - [IAM Role Creation](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#iam-role-creation)
  - [IAM Policy Configuration](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#iam-policy-configuration)
  - [EKS Cluster Creation](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#eks-cluster-creation)
  - [Post-Deployment Information](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#post-deployment-information)
- [Deployment Options](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#deployment-options)
  - [Option 1: Using Existing VPC and Subnets](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#option-1-using-existing-vpc-and-subnets)
  - [Option 2: Creating New VPC and Subnets](/docs/aiden/1.0/deployment/private-saas/cluster-requirements#option-2-creating-new-vpc-and-subnets)
