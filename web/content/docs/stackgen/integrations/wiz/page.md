---
title: "Use Cases for IaC Violations"
product: "stackgen"
sourcePath: "/docs/integrations/wiz"
sourceUrl: "https://docs.stackgen.com/docs/integrations/wiz"
status: "ok"
---

StackGen integrates with [Wiz](https://www.wiz.io/), a leading Cloud Security Posture Management (CSPM) platform, to help enterprises identify and address infrastructure vulnerabilities more efficiently.

This integration enables your platform engineers to view and manage live infrastructure violations directly within the StackGen module catalog. By using Wiz scan data within StackGen’s governance workflows, your teams can quickly prioritize which Terraform modules require remediation.

In addition, your developers can view violations within an appStack, allowing them to stay informed about existing misconfigurations and adopt secure coding practices earlier in the development lifecycle.

## Use Cases for IaC Violations

Click to view

StackGen integrates with Wiz to detect Infrastructure-as-Code (IaC) violations at both the code and variable levels. We've listed the two most common examples below.

- **Code-Level Violations**: Wiz policy requires all S3 buckets to have logging enabled for security and compliance. If any Terraform module in the StackGen catalog defines an S3 resource without logging, Wiz flags it as a violation.

**Sample Insecure Code**: Here, you have an S3 bucket without a logging configuration defined.





```hcl
      resource "aws_s3_bucket" "example" {

      bucket = "my-insecure-bucket"



      tags = {

          Name        = "My bucket"

          Environment = "Dev"

      }

}
```









S3 buckets without logging enabled fail the **Encryption and visibility policy** defined in Wiz.

- **Violations detected by Wiz based on variable values defined within Terraform IaC**: StackGen provides a Simulator UI that allows developers to test variable values across different scenarios. In the example below, Wiz policy will block public access to S3 buckets.

Here's a sample code for a Terraform IaC that goes under the `main.tf`:





```hcl
resource "aws_s3_bucket" "example" {

bucket = "my-bucket"

}



resource "aws_s3_bucket_public_access_block" "example" {

bucket = aws_s3_bucket.example.id



block_public_acls       = var.block_public_acls  # value controlled by variable

block_public_policy     = true

ignore_public_acls      = true

restrict_public_buckets = true

}
```









The variable in your `terraform.tfvars` for determining access to S3 buckets is defined under `block_public_acls`

Now let's see in which instances will the IaC pass and fail.
  - **Sample Secure Terraform Configuration**: In the sample code below, the variable value in the `terraform.tfvars` is set to `block_public_acls = true`.





    ```hcl
    resource "aws_s3_bucket" "example" {

    bucket = "my-bucket"

    }



    resource "aws_s3_bucket_public_access_block" "example" {

    bucket = aws_s3_bucket.example.id



    block_public_acls       = true # ✅ No violation

    block_public_policy     = true

    ignore_public_acls      = true

    restrict_public_buckets = true

    }
    ```









    **Result**: Since public ACLs are blocked as required by the Wiz policy there will be no violations reported.

  - **Sample Insecure Terraform Configuration**: In the sample code below, the variable value in the `terraform.tfvars` is set to `block_public_acls = false`.





    ```hcl
    resource "aws_s3_bucket" "example" {

    bucket = "my-bucket"

    }



    resource "aws_s3_bucket_public_access_block" "example" {

    bucket = aws_s3_bucket.example.id



    block_public_acls       = false # ❌ Violation detected

    block_public_policy     = true

    ignore_public_acls      = true

    restrict_public_buckets = true

    }
    ```









    **Result**: Since the S3 bucket allows public ACLs, Wiz will report this as violation.

Now that you have seen how StackGen-Wiz integration works, let's see how to enable the Wiz integration and run a scan in detail.

## Steps to Enable and Use the StackGen Wiz Integration

### Before you Begin

You will need to keep your Wiz Client Id and Secret. Follow the Wiz documentation to retrieve the same.

### Step 1. Configure a Wiz Secret

Click to view

Make sure you create the secret under the appropriate scope as it will only be shared with the Projects you specify, and scans can be run only on modules created within those Projects.

Follow these steps to configure your Wiz secret:

1. From the StackGen Home page, navigate to **Settings > Secret Store**.

2. Click **New Secret**.



![Wiz secret](https://docs.stackgen.com/assets/images/wiz1-770a0b3bbbde4c106e9557527d22667d.png)

3. Enter a **Name** and **Description** for your secret.

4. From the **Secret Type** drop-down, select **Wiz (CSPM providers)**.

5. Enter the following details:
   - **Wiz Client ID**
   - **Client Secret**


     note





     - These credentials must have minimum permissions to trigger an IaC scan.
     - You can only have one Wiz secret per Project. If multiple Wiz secrets exist, the scan will fail with an error.

   - **Wiz Auth URL**: The Wiz OAuth token endpoint URL. Defaults to `https://auth.app.wiz.io/oauth/token`. You can change this as per your hosted instance.
   - **Share it with other projects (Optional)**: If you want to share this secret with a Project, select the desired **Project** from the list. Members of that Project will be able to use this secret for scanning modules.
6. Click **Create Secret**.


### Step 2. Run a Wiz Scan

Click to view

Follow these steps to Run a Wiz Scan:

1. From the StackGen Home page, navigate to **Module Catalog**.

2. Locate the module you want to scan and click the **ellipsis ⋮** icon under the **Actions** column.

3. Select **Scan with Wiz**.
   - The system will automatically use the configured Wiz secret.

   - If no valid Wiz secret exists, you’ll see an error message.

   - You will get a report of the Wiz security analysis of your IaC, highlighting misconfigurations, severity levels, and remediation guidance, all without having to deploy the module.



     ![Scan results](https://docs.stackgen.com/assets/images/wiz2-75d22959475d87e5abe799a8cda11fec.png)

   - You can click each severity to filter the violations list.



     ![Scan results](https://docs.stackgen.com/assets/images/wiz4-9009d278cb6857c95a0e4c94da067fe3.png)
4. **>\> Advanced Scan**: If you want to test the violations that could occur for dynamic variables, you can do so by clicking **>\> Advanced Scan**, fill out the variable values and click **Run Advanced Scan**.



![Advanced scan](https://docs.stackgen.com/assets/images/wiz3-27795b49c6e7eb27fdfaa91cf8886a20.png)

5. To view the detailed scan report on Wiz click **View Report**.


- [Use Cases for IaC Violations](/docs/stackgen/integrations/wiz#use-cases-for-iac-violations)
- [Steps to Enable and Use the StackGen Wiz Integration](/docs/stackgen/integrations/wiz#steps-to-enable-and-use-the-stackgen-wiz-integration)
  - [Before you Begin](/docs/stackgen/integrations/wiz#before-you-begin)
  - [Step 1. Configure a Wiz Secret](/docs/stackgen/integrations/wiz#step-1-configure-a-wiz-secret)
  - [Step 2. Run a Wiz Scan](/docs/stackgen/integrations/wiz#step-2-run-a-wiz-scan)
