---
title: "Define Governance for Terraform and Provider Versions"
product: "stackgen"
sourcePath: "/docs/concepts/rbac/governance/tf-provider-versions"
sourceUrl: "https://docs.stackgen.com/docs/concepts/rbac/governance/tf-provider-versions"
status: "ok"
---

As a StackGen Admin or DevOps user, you now have the ability to enforce stricter controls over Terraform and provider versions used in your appStacks. This helps ensure consistency, reliability, and compliance across your infrastructure code.

![Terraform and Provider version](https://docs.stackgen.com/assets/images/tf-provider-version-b489cf8cad9b34c224921a88c1f17edf.png)

These policies are automatically applied when you:

- Create appStacks
- Generate an IaC or pushed your IaC to Git.

**Automatic Version Checks in appStacks**

When you generate infrastructure code for an appStack, StackGen will:

- Check that the Terraform and provider versions match your organization’s policies.
- Automatically include the correct versions in the generated configuration.
- Prevent code generation if there’s a policy violation, and show clear error messages in the UI and CLI.

**Benefits You’ll Notice**

- No more version mismatches or unexpected errors while deploying infrastructure.
- Clear guidance on which versions are allowed, helping you stay compliant.
- More reliable infrastructure code with fewer manual checks.

Let's learn how to do this in detail.

## Define Governance for Terraform and Provider Versions

Click to view

You can define Terraform and provider blocks with intended versions as follows:

```hcl
terraform {

  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {

    aws = {

      source  = "hashicorp/aws"

      version = "~> 5.0"

    }

    awscc = { // AWS Cloud Control

      source  = "hashicorp/awscc"

      version = "~> 1.0"

    }

  }

}

provider "aws" {

  region = var.region

}
```

**Flags**

| Code Section | Description |
| --- | --- |
| `terraform { ... }` | Defines the Terraform settings block that specifies version requirements. |
| `required_version = ">= 1.0.0, < 2.0.0"` | Ensures that only Terraform versions between 1.0.0 (inclusive) and 2.0.0 (exclusive) can be used. |
| `required_providers { ... }` | Specifies version constraints for the providers required by this configuration. |
| `aws = { source = "hashicorp/aws", version = "~> 5.0" }` | Uses the official AWS provider from HashiCorp and requires any version in the 5.x range (e.g., 5.0.1, 5.1.0). |
| `awscc = { source = "hashicorp/awscc", version = "~> 1.0" }` | Uses the AWS Cloud Control provider from HashiCorp and requires any version in the 1.x range (e.g., 1.0.3, 1.1.0). |
| `provider "aws" { region = var.region }` | Specifies the AWS provider configuration, using a variable for region (e.g., `us-east-1`). |

## Create and Assign Governance for Terraform and Provider Versions

Click to view

1. Follow the steps for [creating a governance configuration](/docs/stackgen/concepts/rbac/governance/governanceconfig#create-a-governance-configuration).
2. Add your Terraform and provider block in **Step 5**.

![Terraform and Provider version](https://docs.stackgen.com/assets/images/tf-provider-version-b489cf8cad9b34c224921a88c1f17edf.png)

3. You can switch between **HCL** and **JSON** view depending on your preference.

## Limitations of Terraform and Provider Version Governance

Click to view

- **Locked Versions Cannot Be Changed Later**: Once a Terraform version or provider version is set and saved in a governance policy, it becomes locked for that project lineage and cannot be modified. Any required updates need a new governance version.

- **Limited to Specified Versions**: The policy only enforces version ranges that are explicitly specified. It does not automatically suggest or update to the latest compatible versions.

- **Policy Evaluation Happens at the Time of IaC Generation**: Version enforcement is applied when generating the infrastructure code (IaC) or pushing it to Git. It does not block manual edits to the Terraform files outside of StackGen.

- **No Support for Complex Conditional Logic**: Governance policies currently support only version constraints (e.g., `>= 1.0.0, < 2.0.0`). They do not support more complex rules, such as environment-based version selection.

- **Applies Only to Supported Providers**: Version enforcement applies only to providers explicitly listed in the policy. Custom or unsupported providers are not automatically governed.

- **No Retrospective Enforcement**: Policies are enforced from the point of configuration onward. Existing appStacks are not retroactively validated unless manually regenerated.
