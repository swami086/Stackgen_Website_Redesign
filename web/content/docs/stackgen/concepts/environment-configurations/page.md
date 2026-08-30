---
title: "What you can configure"
product: "stackgen"
sourcePath: "/docs/concepts/environment-configurations"
sourceUrl: "https://docs.stackgen.com/docs/concepts/environment-configurations"
status: "ok"
---

This guide will walk you through the process of creating and managing Environment Configuration Templates in StackGen at a project level.

warning

Only **Admins** and **DevOps** can create and manage Environment Configuration Templates at the project level.

Environment Configuration Templates let you define default environments, variables, and state backends at the project level. These templates act as **blueprints** that are **automatically applied** to every **new appStack** in the project **after** the template is set, so you get consistent setups for development, testing, production, and other environments.

## What you can configure

- **Environments** \- Define default environments (for example, Dev, QA, Stage).
- **Variables** \- Specify default IaC variables and environment-specific override values.
- **State backend** \- Configure the Terraform state backend for each environment.

## How templates work

Templates apply only to **new** appStacks. When you create an appStack after setting up the project-level template, the template is applied automatically. Existing appStacks that were created before the template was set will not have the template applied to them.

note

- **Templates only** \- Configurations in **Project Settings** are blueprints. They apply only to new appStacks you create.
- **Existing appStacks** \- Changing the project template does not update appStacks that already exist.
- **Personal projects** \- This feature is not available for personal projects.

## Project templates and appStack updates

This page covers **project-level** environment configuration templates. If you use StackGen **MCP** in a supported IDE, you can also add or remove **environment configurations** and **S3** state backends on the current **appStack**.

Those **MCP** changes do **not** update the project template. They apply only to the appStack you are editing.

## Role-based capabilities

| Capability | Admin | DevOps | Developer |
| --- | --- | --- | --- |
| Create project-level template | Yes | Yes | No |
| Edit or delete project-level template | Yes | Yes | No |
| View project-level template | Yes | Yes | No |
| Modify configurations within an appStack | Yes | Yes | Yes |
| Add Terraform Block to override template for an existing appStack | Yes | Yes | Yes |
| Apply template to new appStacks (automatic) | Yes | Yes | Yes |
| Use in personal projects | No | No | No |

note

- appStacks created before the project-level template was set do not have the template applied.
- To apply different configurations to an existing appStack after the project-level template was set, go to the appStack, click **\+ Add New** and select **Terraform Block**. This overrides the project-level template for that appStack only.

## Where to access templates

| Location | Purpose |
| --- | --- |
| **Project Settings > Environment Configuration** | Create and edit the project-level template. |
| **appStack > Topology > Add New > Terraform Block** | View and modify configurations after they have been applied to an appStack. |

Manual changes to project **environment configuration** are recorded in [Activity Logs](/docs/stackgen/concepts/activity-logs).

## Create an Environment Configuration Template

Click to view

Follow these steps to create an Environment Configuration Template:

1. Open the project where you want to create the template.
2. Go to **Project Settings > Environment Configuration** and click **\+ Add New Environment**.
3. Enter the name of the new environment and click **Add Environment**.
4. Define **default variables** and **environment-specific overrides**:
   - Click **\+ New Variable** to create default variables that apply to every environment you created in the previous step. Give it a `variable name` and `default value` and click **Create Variable**.
   - Set environment-specific **override values** for these variables. These values are written to the Terraform resource files.
5. Configure the **state backend** for each environment:
   - **Guided step** \- Use the guided interface for common backends (S3, Postgres, GCS, Azure RM). For example, select `local` as the backend type and set the path to `/temp/tf.tfstate`.
   - **Code editor** \- Use the code editor for full flexibility, including options not supported in the guided step. Example S3 backend:

note

**Edit behavior** \- If a backend was configured with the guided step, **Edit Configuration** opens the guided step. If it was created in the code editor, **Edit Configuration** opens the code editor. You can switch from the guided step to the code editor to add unsupported configurations.

```json
terraform {

  backend "s3" {

    bucket = "test bucket"

  }

}
```

6. Click **Done** when finished.

caution

**Deleting configurations** \- Deleting an environment configuration from project settings does **not** remove it from appStacks that use it. To remove it, delete it from each appStack that uses it.

## Verify Environment Profiles and Variables in New appStacks

Click to view

Follow these steps to create and verify a new appStack:

After you save the project-level template, it is applied automatically when you create a new appStack.

1. **Create a new appStack** (for example, from scratch) and select the cloud provider.
2. **Verify environments** \- The appStack shows all environments defined in your template (for example, Dev, QA, test one).
3. **Verify variables** \- Click **\+ Add New** and select **Terraform Block** to open the Terraform configuration. In the variables tab, confirm that the default variables and their environment overrides are present.
4. **Verify backend** \- Confirm that the state backends are copied for each environment.
5. **Verify IaC** \- After dragging a resource (for example, an S3 bucket) onto the canvas and saving, open the **IaC** tab. Confirm that the environment-specific variables and state backend configuration blocks are present (for example, S3 backend for dev, local backend for test one).
