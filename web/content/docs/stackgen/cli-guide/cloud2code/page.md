---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code"
status: "ok"
---

## Overview

Managing cloud dependencies and provisioning infrastructure efficiently is critical for most DevOps and Engineering projects. With the **Cloud to Code CLI** feature, you can:

- Gain clear visibility into your cloud environment through our **topology page**, allowing you to identify resource dependencies effortlessly.
- Generate modernized **Infrastructure as Code (IaC) templates** for your cloud resources. No prior IaC setup is required, saving you valuable time and effort.
- Retrieve a **comprehensive list of all deployed resources** in your cloud with a simple query.
- Use your generated **state file** to create a **discovery** in StackGen. To learn more, refer to the [Cloud Discovery guide](/docs/stackgen/concepts/clouddiscovery).

### Clouds Supported

Cloud-to-Code currently supports AWS, Azure, and GCP.

note

You’ll need to contact [StackGen Support](mailto:support@stackgen.com) to use this CLI tool.

### Key Features

- **Dependency Management**: Automatically detect managed and unmanaged resources and resolve dependencies within various resources.
- **Bulk Operations**: Scan and generate IaC for your resources in bulk.

### Security First Approach

Cloud to Code prioritizes security by design. To protect sensitive information and prevent potential security breaches, Cloud to Code intentionally excludes secrets, passwords, and other sensitive credentials when importing your cloud resources. This security-first approach ensures that sensitive data remains protected and is never exposed in your generated Infrastructure as Code files. We've listed the resources for which, you'll need to manually configure the secrets.

**Resources Requiring Manual Secret Configuration**

For the following AWS resources, you'll need to provide secrets and sensitive configuration values manually, as these are intentionally excluded from the import process for security reasons:

- `aws_mq_broker`: Broker passwords and credentials.
- `aws_elasticache_replication_group`: Authentication tokens and passwords.
- `aws_rds_cluster`: Database master passwords.
- `aws_iam_server_certificate`: Certificate private keys.

This approach follows cloud security best practices by ensuring that sensitive credentials are managed through secure secret management systems rather than being stored in plain text within your IaC files.

## Use Cases

Your teams can now accelerate their **cloud migration** and enforce **best practices** for Infrastructure-as-Code (IaC) by seamlessly onboarding your cloud resources.

As a **DevOps engineer**, you can:

- Automate **large-scale infrastructure provisioning** and maintain consistency across environments.
- Enhance **developer workflows** by automating environment setup and managing dependencies efficiently.

We’ve listed some of the ways you can leverage this feature.

### Import Specific AWS S3 Buckets by Name

Click to view

This feature allows you to import specific S3 buckets into the IaC setup so that the buckets you’ve specified are automatically imported into your `tfstate` file, eliminating the need to configure your resources manually.

Run the following command to view the list of all S3 buckets in your cloud:

```sh
aws s3 ls
```

Now, run the command below after you’ve replaced the bucket names with the ones you'd like to import from your cloud:

```sh
cloud2code import aws --region us-east-1 --ids bucket_name_1,bucket_name_2 --resource-type aws_s3_bucket --output-dir /Users/abc/Downloads/terraform
```

### Bulk Import Resources Using Tags

Click to view

Import all AWS cloud resources with a Production tag from the DevOps project, thus ensuring consistency in infrastructure management.

```sh
cloud2code import aws --region us-east-1 --tags Environment:Production,Project:DevOps --output-dir /Users/abc/Downloads/terraform
```

### Import Only Specific Resource Types Using Tags

Click to view

Fetch S3 buckets and EC2 instances tagged as Production. This allows you to import only the required resource types and prevent the import of irrelevant configurations.

```sh
cloud2code import aws --region us-east-1 --tags Environment:Production --include aws_s3_bucket,aws_instance --output-dir /Users/abc/Downloads/terraform
```

### Import All Resources Within a Region

Click to view

Import all resources within a region and automatically create a discovery on StackGen.

```sh
cloud2code import aws --region us-east-1 --name my-aws-discovery --output-dir "/Users/abc/Downloads/terraform"
```

Using the Cloud to Code CLI, your developers can also perform the following actions.

### Exclude Resource Types from Import

Click to view

Import all resources tagged as Production, excluding IAM roles, Route53 records, and IAM policies, so you do not override any security-related IAM configurations while importing your infrastructure.

```sh
cloud2code import aws --region us-east-1 --tags Environment:Production --exclude aws_iam_role,aws_iam_policy,aws_route53_record,aws_iam_role_policy,aws_iam_role_policy_attachment --output-dir “/Users/abc/Downloads/terraform”
```

### Import Specific Resource Types With Multiple Tags

Click to view

Fetch all S3 buckets and EC2 instances from the `us-east-1` region with `Environment:Production` and `CreatedBy:user1` tags to selectively retrieve the required resources for optimised infrastructure provisioning.

```sh
cloud2code import aws --region us-east-1 --tags "Environment:Production,CreatedBy:user1" --include aws_s3_bucket,aws_instance --output-dir “/Users/abc/Downloads/terraform”
```

### Expected Terraform Plan Differences

When you run `terraform plan` on resources imported by Cloud to Code, you may see differences reported for certain resource types. These differences are expected and do not result in actual changes to your cloud infrastructure. They occur due to how Terraform handles state refresh and how AWS APIs return data versus how Terraform expects it.

**Resources with Expected Plan Differences**

The following resources may show differences in `terraform plan` even when all values remain unchanged or there is no impact:

- **`aws_cloudwatch_metric_alarm`**: Terraform may report differences during state refresh, but these do not cause actual changes to your CloudWatch alarms.

- **`aws_dynamodb_table`**: AWS API returns datetime values in the format `Sun, 09 Apr 2124 23:31:35 UTC`, but Terraform may not accept this exact format back in the plan. This is a formatting difference and does not affect the actual resource configuration.

- **`aws_batch_job_definition`**: The `deregister_on_new_version` parameter is automatically set to `true` by AWS, even if the value passed is `null`. This is the default behavior and results in an in-place update that does not change the actual resource state.

- **`aws_iam_group_membership`**: Terraform plan may indicate redeployment is required, even when all values are passed correctly. This is an in-place update and does not actually redeploy or modify the group membership.


These differences are cosmetic and do not impact your infrastructure. You can safely apply these plans without concern for unintended changes.

- [Overview](/docs/stackgen/cli-guide/cloud2code#overview)
  - [Clouds Supported](/docs/stackgen/cli-guide/cloud2code#clouds-supported)
  - [Key Features](/docs/stackgen/cli-guide/cloud2code#key-features)
  - [Security First Approach](/docs/stackgen/cli-guide/cloud2code#security-first-approach)
- [Use Cases](/docs/stackgen/cli-guide/cloud2code#use-cases)
  - [Import Specific AWS S3 Buckets by Name](/docs/stackgen/cli-guide/cloud2code#import-specific-aws-s3-buckets-by-name)
  - [Bulk Import Resources Using Tags](/docs/stackgen/cli-guide/cloud2code#bulk-import-resources-using-tags)
  - [Import Only Specific Resource Types Using Tags](/docs/stackgen/cli-guide/cloud2code#import-only-specific-resource-types-using-tags)
  - [Import All Resources Within a Region](/docs/stackgen/cli-guide/cloud2code#import-all-resources-within-a-region)
  - [Exclude Resource Types from Import](/docs/stackgen/cli-guide/cloud2code#exclude-resource-types-from-import)
  - [Import Specific Resource Types With Multiple Tags](/docs/stackgen/cli-guide/cloud2code#import-specific-resource-types-with-multiple-tags)
  - [Expected Terraform Plan Differences](/docs/stackgen/cli-guide/cloud2code#expected-terraform-plan-differences)
