---
title: "Requirements"
product: "stackgen"
sourcePath: "/docs/concepts/topology/dynamic-resource-tagging-terraform-merge"
sourceUrl: "https://docs.stackgen.com/docs/concepts/topology/dynamic-resource-tagging-terraform-merge"
status: "ok"
---

Use **variables**, **locals**, and **`merge`** to apply a consistent tagging pattern across the whole stack, with extra keys on subnets (for example **Public** vs **Private** and Kubernetes ELB roles).

### Requirements

- **Terraform Config:** **Variables** and **Locals** live under **Terraform Configuration** on the appStack. See [Topology canvas, Terraform Config](/docs/stackgen/concepts/topology#3-terraform-config).
- **Tags on modules:** Enable expression mode for **Common Tags** or **Tags** where needed. See [Terraform expressions](/docs/stackgen/concepts/topology/configure-resource#terraform-expressions).
- **Deploy / check tags:** Use **AWS** after running **Plan & Deploy**. See [Plan and Deploy (SaaS)](/docs/stackgen/concepts/iac/plan-and-deploy-saas) and [Plan, Deploy, and Destroy](/docs/stackgen/concepts/iac#plan-deploy-and-destroy).

## Overview

Tags can be structured in **three layers**:

1. **Static variables** – defaults that rarely change (for example **Project**, **Owner**).
2. **Dynamic locals** – values that depend on context (for example **Environment**, **ManagedBy**).
3. **Tier-specific locals** – only on some resources (for example **Public** vs **Private** subnet roles).

## Step 1: Define Global Variables

Navigate to **Terraform Configuration** \> **Variables** and add the blocks below.

Click to view: `common_tags`

```terraform
variable "common_tags" {

  description = "Common tags for all resources"

  type        = map(string)

  default = {

    Project = "StackGenTest"

    Owner   = "DevOps"

  }

}
```

The locals configuration in step 2 uses `environment` and `application_name`. Add them as strings. Use an empty default if you want these tag keys to be omitted until values are set.

Click to view: `environment` and `application_name`

```terraform
variable "environment" {

  description = "Environment name for tagging (optional)"

  type        = string

  default     = ""

}

variable "application_name" {

  description = "Application name for tagging (optional)"

  type        = string

  default     = ""

}
```

## Step 2: Configure Locals

Navigate to **Terraform Configuration** \> **Locals**.

Click to view: calculated `common_tags`

This block merges the base map with **ManagedBy**. It only adds **Environment** / **ApplicationName** when the matching variable is not empty.

```terraform
locals {

  common_tags = merge(

    var.common_tags,

    {

      ManagedBy = "Terraform"

    },

    var.environment != "" ? { Environment = var.environment } : {},

    var.application_name != "" ? { ApplicationName = var.application_name } : {}

  )

}
```

Click to view: tier-specific subnet tags

```terraform
locals {

  public_subnet_tags = {

    "kubernetes.io/role/elb" = "1"

    Tier                     = "Public"

  }

  private_subnet_tags = {

    "kubernetes.io/role/internal-elb" = "1"

    Tier                              = "Private"

  }

}
```

## Step 3: Set Expressions on the Topology Canvas

Open **Topology**, select each module, and set **Common Tags** or **Tags** (expression mode) to the value in the table.

| Resource | Expression | Description |
| --- | --- | --- |
| **VPC** module | `merge(var.common_tags, local.common_tags)` | Static defaults plus dynamic metadata. |
| **Public** subnet | `merge(local.common_tags, local.public_subnet_tags)` | Common metadata plus public ELB-oriented tags. |
| **Private** subnet | `merge(local.common_tags, local.private_subnet_tags)` | Common metadata plus internal ELB-oriented tags. |

note

**`merge` and duplicate keys**

If the same key appears in more than one map inside one `merge(...)`, the value from the **rightmost** map wins.

note

**Subnets**

Use `merge(local.common_tags, local.public_subnet_tags)` and `merge(local.common_tags, local.private_subnet_tags)` exactly as above, without changes, so subnets inherit **Project** / **Owner** (through `local.common_tags`), **Environment** / **ManagedBy** (from the dynamic part of `local.common_tags`), and **Tier** plus the Kubernetes role keys.

## Step 4: Verify in AWS Console

After **Plan & Deploy** completes successfully, view the deployed resources in the **AWS** console and check tags.

Click to view: expected tags on resources

- **VPC:** **Project**, **Owner**, **ManagedBy**, and **Environment** / **ApplicationName** when you set those variables.
- **Public** subnet: the same base set from your merges, plus **Tier: Public** and **`kubernetes.io/role/elb`** = **`1`**.
- **Private** subnet: the same pattern, plus **Tier: Private** and **`kubernetes.io/role/internal-elb`** = **`1`**.

## Best Practices for Dynamic Resource Tagging

Click to view

**VPC expression**

`local.common_tags` already merges `var.common_tags` in the locals block above. Using `merge(var.common_tags, local.common_tags)` on the **VPC** is redundant but safe to use.

**Name**

Modules often set **Name** themselves (for example `-public-subnet-1`). Avoid using broad merges that overwrite **Name** unless intended.

warning

If your merged map sets **Name**, you can replace the name the module would have used. Verify this before deployment.

**Casing**

**AWS** tags are case-sensitive. Stick to one convention ( **Project** vs **project**) so cost tools do not see two different keys.

caution

Mixed casing for the same logical tag can create duplicate keys in reports.
