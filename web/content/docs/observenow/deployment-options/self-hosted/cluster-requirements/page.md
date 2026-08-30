---
title: "Requirements"
product: "observenow"
sourcePath: "/observenow/deployment-options/self-hosted/cluster-requirements"
sourceUrl: "https://docs.stackgen.com/observenow/deployment-options/self-hosted/cluster-requirements"
status: "ok"
---

To install StackGen instances onto your own cloud using the `self hosted` model, a K8s cluster is required on your cloud.

tip

Most customers run a managed Kubernetes (e.g., EKS, AKS, or GKE on AWS, Azure, or GCP, respectively) and that's what the examples below will show. However, any Kubernetes cluster will work as long as it meets the requirements below.

This page will show some requirements and examples - in this case, these are the validations ran against `ObserveNow`

## Requirements

### Cluster Version and Size

- Kubernetes version: v1.25+
- Minimum of 3 worker nodes ( _with at least 2 vCPUs and 8GB RAM each_)
- VPC configured with CIDR block of `/21` or smaller to ensure there are **at least** 2048 IPs available for the cluster

## Cluster creation

In general, below mentioned things are needed in a cluster ( _irrespective of the provider_) that runs any of the apps offered by `OpsVerse`:

1. **Networking and security resources:** The creation of network resources (`VPC` in AWS and GCP / `VNET` in Azure and other appropriate resources like subnets, gateways, route tables, certificate manager, etc) is crucial for creating a secure and well-connected infrastructure that runs all the apps smoothly.
2. \*\*EKS cluster: \*\*Specify the cluster and its configuration such as name, k8s version, node group (name, OS, type of OS), network and security configs, etc.
3. \*\*Object storage buckets: \*\*Object storage buckets are a type of storage service provided by cloud providers ( _Called S3 in AWS, Google Cloud Storage (GCS) in GCP, and Azure Blob Storage in Azure_). They are designed to store and retrieve vast amounts of unstructured data in the form of objects. Object storage is a must for StackGen's [ObserveNow](https://opsverse.io/observenow-observability/) to function properly.
4. **IAM resources:** IAM (Identity and Access Management) resources are components used to manage secure access to the services and resources provided by the cloud providers. They allow admins to control who can access the cloud infrastructure and what actions a user/automated bot account can perform. This is needed as StackGen's ObserveNow frequently talks to object storage buckets.
5. **Access to Object Storage:** IAM should be set in such a way that the pods running in the cluster should have access to the object storage. This is very crucial for StackGen's ObserveNow as the app relies on object storage for log storage/retrieval and backup operations.
1. **AWS**: Create an IAM role and a policy
2. **GCP**: Create an IAM service account that binds to Workload Identity
3. **Azure**: Create a storage account key via the Azure Portal to access the storage container

### AWS

To create an Amazon EKS (Elastic Kubernetes Service) cluster using Terraform, the following steps need to be followed:

**Set up the provider**: Providers are a logical abstraction of an upstream API. They are responsible for understanding API interactions and exposing resources. Configure the appropriate provider.

\*\*Define the network and security resources: \*\*Specify the EKS cluster and its configuration such as name, version, networking, object storage buckets

1. **Network configs:** Define the configs to create VPC, Subnets, IGW, NAT, Route tables, and other appropriate resources.
2. **Security configs: Define the configs to create IAM and certificate manager.**

Here is a terraform snippet that has all the configs to create the resources:

info

The terraform code snippets used in these examples can also be found here: [https://github.com/opsverseio/private-saas](https://github.com/opsverseio/private-saas)

```json
// Creates one VPC in atleast 2 availability zones with multiple subnets per availability zone (Atleast 1 public subnet and 'n' private subnets)

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

**Object storage bucket (S3):** This step creates an S3 bucket for the ObserveNow to store the logs and the backups. Here is a terraform snippet that has all the configs to create the resource:

```json
module "s3_bucket_opsverse" {

  source = "../modules/s3"

  bucket_name = "opsverse-bucket"

  bucket_tags = {

    Name        = "opsverse-bucket"

    Environment = "production"

  }

}

// filename: ../modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false: true

  block_public_policy       = var.public_access ? false: true

  ignore_public_acls        = var.public_access ? false: true

  restrict_public_buckets   = var.public_access ? false: true

}

// filename: ../modules/s3/variables.tf

variable "bucket_name" {}

variable "public_access" {

  default = false

}
```

info

_NOTE_: It is recommended to create the S3 bucket in the same region as the cluster.

**IAM (Identity and Access Management):**

- **Role creation:** This step creates a role for the ObserveNow instance ( _Specifically Loki pods to access the S3 bucket to store and retrieve the logs)._ The required role is as follows:

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
      "Condition":  {\
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

- **Configure IAM policy for the role/Object Storage Access:** This step defines an IAM role in such a way that the pods in the cluster should be able to access the S3 bucket to store/retrieve the logs and backup files.

Here is a sample policy to attach to the created role:

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
```

Here is a terraform snippet that has all the configs to create the resource:

```json
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
      "Condition":  {\
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

info

NOTE: When you create your EKS cluster, in the Terraform you can set `enable_irsa = "true"` to make sure you have an IAM OpenID Connect (OIDC) Provider for your EKS cluster

**EKS cluster creation**: This step creates a new EKS cluster that has 1 worker node pool. Cluster configs such as name, k8s version, networking/security, and object storage buckets can be defined. Specify the EC2 instances that will act as worker nodes in the cluster.

```json
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

info

**After the successful cluster creation, please send the following details to your StackGen POC:**

1. **S3** **bucket name**
2. **ARN details**

This will help your StackGen to set up the ObserveNow and offer you a smooth experience when creating the StackGen apps.

There are 2 options when creating the cluster:

_**Option 1**_\*\*: To use an already existing VPC and subnets and proceed with the cluster creation\*\*

If a VPC and subnets already exist in AWS, the same VPC and subnets can be used to create a cluster. Follow the below-mentioned steps:

**Example snippet:**

info

**NOTE:** This is a generic working example snippet that creates an EKS ( _Assuming a VPC and subnets already exist_) cluster with the following resources:

1. EKS Cluster with 1 worker node that will have 3 nodes (4 vCPU and 16 GB Memory each)
2. S3 bucket for Loki to store the logs and for the backups of VictoriaMetrics, ClickHouse, etc.
3. IAM role to access the created S3 bucket.
4. IAM policy that defines the scope of the IAM role.

**Please feel free to add more granular resources (IGW/NAT Gateways, Route tables, ACM, etc.) as per your organization's security and networking standards.**

```json
// aws/private-saas/modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

  tags = merge(var.bucket_tags)

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false: true

  block_public_policy       = var.public_access ? false: true

  ignore_public_acls        = var.public_access ? false: true

  restrict_public_buckets   = var.public_access ? false: true

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
      "Condition":  {\
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

_**Option 2**_\*\*: To create a new VPC and subnets and proceed with the cluster creation\*\*

If a VPC and subnets don't exist in AWS and have to be created from scratch, follow the below-mentioned steps:

**Example snippet:**

info

**NOTE:** This is a generic working example snippet that creates an EKS cluster with the following resources:

1. A VPC in at least 2 availability zones
2. Multiple subnets per availability zone ( _At least 1 public subnet and 'n' private subnets_)
3. EKS Cluster with 1 worker node that will have 3 nodes (4 vCPU and 16 GB Memory each)
4. S3 bucket for Loki to store the logs and for the backups of VictoriaMetrics, ClickHouse, etc.
5. IAM role to access the created S3 bucket.
6. IAM policy that defines the scope of the IAM role.

**Please feel free to add more granular resources (IG/NAT Gateways, Route tables, etc.) as per your organization's security and networking standards.**

```json
// aws/private-saas/modules/s3/main.tf

resource "aws_s3_bucket" "bucket" {

  bucket = var.bucket_name

  acl    = var.public_access ? "public-read" : "private"

  tags = merge(var.bucket_tags)

}

resource "aws_s3_bucket_public_access_block" "public_access_policy" {

  bucket = aws_s3_bucket.bucket.id

  block_public_acls         = var.public_access ? false: true

  block_public_policy       = var.public_access ? false: true

  ignore_public_acls        = var.public_access ? false: true

  restrict_public_buckets   = var.public_access ? false: true

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
      "Condition":  {\
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

// aws/private-saas/opsverse-eks-iam/network.tf

# Creates one VPC in atleast 2 availability zones with multiple subnets per availability zone (Atleast 1 public subnet and 'n' private subnets)

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

Please refer to this working example for more details: [https://github.com/opsverseio/private-saas](https://github.com/opsverseio/private-saas)

### GCP

warning

**Please work with your customer success rep to get PrivateSaaS enabled on your GCP account**

### Azure

warning

**Please work with your customer success rep to get PrivateSaaS enabled on your Azure account**

- [Requirements](/docs/observenow/deployment-options/self-hosted/cluster-requirements#requirements)
  - [Cluster Version and Size](/docs/observenow/deployment-options/self-hosted/cluster-requirements#cluster-version-and-size)
- [Cluster creation](/docs/observenow/deployment-options/self-hosted/cluster-requirements#cluster-creation)
  - [AWS](/docs/observenow/deployment-options/self-hosted/cluster-requirements#aws)
  - [GCP](/docs/observenow/deployment-options/self-hosted/cluster-requirements#gcp)
  - [Azure](/docs/observenow/deployment-options/self-hosted/cluster-requirements#azure)
