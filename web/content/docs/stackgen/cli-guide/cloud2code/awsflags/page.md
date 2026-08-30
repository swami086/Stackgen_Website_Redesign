---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/awsflags"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/awsflags"
status: "ok"
---

AWS-specific flags in Cloud to Code help you control which AWS resources are imported into Terraform configuration files. Here's how they work:

## Usage

To import only two S3 buckets by name in `us-east-1`, instead of scanning the whole account for every supported type, run:

```bash
cloud2code import aws --region us-east-1 \
  --ids=bucket_name_1 --ids=bucket_name_2 \
  --resource-type=aws_s3_bucket
```

note

You must pass **`--region`**. If you omit it, Cloud to Code returns **`Error: AWS region is required`**.

Flag names and defaults can change between Cloud to Code releases. The sections below describe current `cloud2code import aws` behavior for a typical release.

## How Each Flag is Used

Region Flag - Click to view

- **`--region` (Required)**: Sets the AWS region for the import. The resource you import must actually live in this region. A wrong region can produce errors such as **Cannot import non-existent remote object**. For S3 buckets with no location constraint (null location), AWS treats the bucket as **`us-east-1`**, so use **`--region us-east-1`** in that case.

**Usage**





```bash
cloud2code import aws --region us-east-1 --include aws_s3_bucket,aws_instance
```









The above command imports from **`us-east-1`** and limits the run to the resource types you list (see **`--include`**).


Include Flag - Click to view

- **`--include` (Optional, for precise control)**: Limits the import to the Terraform resource types you list (for example `aws_s3_bucket`). You can repeat **`--include`** or pass comma-separated values, depending on how you invoke the CLI. Use this when you do not want every supported type scanned in the region.

**Usage**





```bash
cloud2code import aws --region us-east-1 \
    --include=aws_s3_bucket --include=aws_instance
```









This imports only S3 buckets and EC2 instances in that region (subject to AWS permissions and Cloud to Code support).

Do **not** use **`--include`** on the same command as **`--ids`**. That combination has been observed to cause a **fatal ARN or ID parsing error**. Either target explicit resources with **`--ids`**, or scan by type with **`--include`**.


Exclude Flag - Click to view

- **`--exclude` (Optional, for precise control)**: Skips importing the resource types you list. Each value must be a **supported** type for Cloud to Code. Unsupported names can return **resource type is not supported**.

**Usage**





```bash
cloud2code import aws --region us-east-1 \
    --tags=Environment=Production \
    --exclude aws_iam_role,aws_iam_policy,aws_route53_record \
    --exclude=aws_iam_role_policy,aws_iam_role_policy_attachment
```









This applies your tag filter but skips the IAM and Route53 types shown in **`--exclude`**.


Tags Flag - Click to view

- **`--tags` (Optional, for filtering)**: Filters resources by tag. The CLI documents the format as **`NAME=VALUE`**. For multiple tags, repeat **`--tags`**, for example **`--tags Environment=Production --tags Team=DevOps`**.

The flag contract is **`NAME=VALUE`**, so use **`=`** for every tag unless your release documents otherwise.

**Usage**

```bash
cloud2code import aws --region us-east-1 \
  --tags=Environment=Production --tags=Team=DevOps
```

The above command filters by those tags.

**`--tags` alone does not limit which resource types are scanned.** Tags narrow matches **inside** each type Cloud to Code considers, but the run can still touch **all supported types** in the account for that region, which can be slow. Pair **`--tags`** with **`--include`** when you only want certain types.

Ids and ARNs Flag - Click to view

- **`--ids` (Optional, for precise control)**: Imports specific resource IDs. Use a comma-separated list per `--ids=` value, and repeat **`--ids=`** for multiple buckets. Prefer **`--ids`** over **`--arns`**: **`--arns`** is **deprecated**; use **`--ids`** instead.

For **`aws_lb`**, pass the **full load balancer ARN** in **`--ids`**, not the short name. A name-only value can fail with a message that the value **is not a valid load balancer ARN**.

**Usage**





```bash
cloud2code import aws --region us-east-1 \
    --ids=bucket_name_1 --ids=bucket_name_2 \
    --resource-type=aws_s3_bucket
```









The above command imports only those two buckets.

To look up an Application or Network Load Balancer ARN with the AWS CLI:





```bash
aws elbv2 describe-load-balancers --region us-east-1 \
    --query "LoadBalancers[?LoadBalancerName=='<your-alb-name>'].LoadBalancerArn" \
    --output text
```









Pass that ARN with **`--resource-type aws_lb`** and the same **`--region`** as the load balancer.


Resource Type Flag - Click to view

- **`--resource-type` (Optional, but recommended with `--ids`)**: Sets the Terraform type (for example **`aws_s3_bucket`**). If you omit it, the type **may be inferred** from ARNs or IDs. Inference works for some cases (for example **S3**) and fails for others (for example **ELB**, with errors such as **unsupported service: elasticloadbalancing**). When you use **`--ids`**, pass **`--resource-type`** unless you already know type inference works for that resource in your environment.

View ARN Flag - Click to view

- **`--view-arn` (Optional)**: ARN of an AWS Resource Explorer **view** used to compare imported results.

**Usage**





```bash
cloud2code import aws --region us-east-1 \
    --view-arn arn:aws:resource-explorer-2:us-east-1:123456789012:view/my-view
```









The above command ties the import to that Resource Explorer view for comparison behavior.


Profile and Credential Flags - Click to view

- **`--profile`, `--access-key`, `--secret-key`, `--session-token`, `--shared-credentials-file`, `--shared-config-file` (Optional)**: Lets you pick a named AWS profile or supply credentials and config paths explicitly. Prefer **`--profile`** or the default credential chain when you can.

**Usage**





```bash
cloud2code import aws --region us-east-1 \
    --include aws_s3_bucket,aws_instance \
    --profile my-aws-profile
```









The above command uses the **`my-aws-profile`** credentials from your AWS config.


warning

Avoid putting **`--access-key`** and **`--secret-key`** on the command line when possible, because shells and process listings can expose them.

## Global Flags on the Same Command

Global Flags - Click to view

For `cloud2code import aws`, these globals apply alongside the AWS flags above:

- `--auto-import` (default true)
- `--log-level` or `-l` (default `info`)
- `--log-type` or `-t` (default `json`)
- `--name`
- `--output-dir` or `-o`
- `--project`

StackGen tenant settings can also come from `~/.stackgen/config.yaml`.

`--name` is part of the global set above. If your install prints `unknown flag: --name`, omit the flag or use a newer Cloud2Code build.

Other installs may add globals (`--download-iac`, `--mode`, `--appstack-id`, `--migrate-to`, `--skip-default-policies`, and others). Those are not in the list above, so follow whatever your build supports. Pairs such as `--mode merge` with `--appstack-id` are sometimes described as updating an existing appStack, but some installs still return a new appStack id. Treat that as undefined unless your own release notes say otherwise.

### Example

```bash
export STACKGEN_URL="https://your-tenant.example.com"

export STACKGEN_TOKEN="your_token"

cloud2code import aws --region us-east-1 \
  --include aws_s3_bucket,aws_instance \
  --profile my-aws-profile \
  --log-level info
```

The above command sets StackGen connection details from the environment, limits types, uses your AWS profile, and prints logs at **info** level.

For **`STACKGEN_URL`**, **`STACKGEN_TOKEN`**, **`--project`**, and how they interact with **`~/.stackgen/config.yaml`**, read [Cloud to Code global flags](/docs/stackgen/cli-guide/cloud2code/globalflags#usage).

note

When StackGen is configured, a run that matches **no resources** (for example filters that exclude everything) has been observed to fail with messages such as **`failed to download IAC: 422 Unknown`**. Widen filters, fix **`--region`** or IDs, and confirm the resources exist before assuming a platform outage.

## When to Use Each Flag

| Scenario | Flags to use | Example command |
| --- | --- | --- |
| Import all supported types in a region (heavy; use with care) | `--region` | `cloud2code import aws --region us-east-1` |
| Import only certain resource types in a region | `--region` \+ `--include` | `cloud2code import aws --region us-east-1 --include aws_s3_bucket,aws_instance` |
| Filter by tag across the types Cloud to Code scans | `--region` \+ `--tags` | `cloud2code import aws --region us-east-1 --tags=Environment=Production --tags=Team=DevOps` |
| Filter by tag but only for types you care about | `--region` \+ `--tags` \+ `--include` | `cloud2code import aws --region us-east-1 --tags=Environment=Production --include=aws_s3_bucket --include=aws_instance` |
| Skip specific types while still using tags | `--region` \+ `--tags` \+ `--exclude` | See **`--exclude`** example above |
| Import specific resources by id | `--region` \+ `--ids` \+ `--resource-type` | `cloud2code import aws --region us-east-1 --ids=my-bucket --resource-type=aws_s3_bucket` |
| Compare with a Resource Explorer view | `--region` \+ `--view-arn` | `cloud2code import aws --region us-east-1 --view-arn <view-arn>` |
| Use a named AWS profile | `--region` \+ any import flags + `--profile` | `cloud2code import aws --region us-east-1 --include aws_s3_bucket --profile my-profile` |

## Common Issues

| What you might see | Likely cause | What to try |
| --- | --- | --- |
| **Error: AWS region is required** | **`--region`** missing | Add **`--region`** |
| ARN or ID parse failure | **`--ids`** combined with **`--include`** | Use only one of **`--ids`** or **`--include`** |
| **resource type is not supported** | Unsupported type in **`--include`** or **`--exclude`** | Use supported Terraform types only |
| **not a valid load balancer ARN** | **`aws_lb`** name passed instead of ARN | Use full ELB v2 ARN from **`aws elbv2 describe-load-balancers`** |
| **unsupported service: elasticloadbalancing** | **`--resource-type`** omitted for ELB | Set **`--resource-type`** explicitly |
| **Cannot import non-existent remote object** | Wrong **`--region`** | Match the resource region; default-location S3 buckets use **`us-east-1`** |
| **failed to download IAC** / **422** | Zero matching resources or bad filters | Loosen filters and confirm resources exist |

- [Usage](/docs/stackgen/cli-guide/cloud2code/awsflags#usage)
- [How Each Flag is Used](/docs/stackgen/cli-guide/cloud2code/awsflags#how-each-flag-is-used)
- [Global Flags on the Same Command](/docs/stackgen/cli-guide/cloud2code/awsflags#global-flags-on-the-same-command)
  - [Example](/docs/stackgen/cli-guide/cloud2code/awsflags#example)
