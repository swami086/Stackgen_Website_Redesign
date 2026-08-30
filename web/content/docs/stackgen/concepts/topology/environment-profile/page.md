---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/topology/environment-profile"
sourceUrl: "https://docs.stackgen.com/docs/concepts/topology/environment-profile"
status: "ok"
---

## Overview

The **Environment Profile Management** feature lets you configure different environments for your applications, ensuring that resources and configurations are appropriately set for development, testing, production, etc.

Applications go through multiple deployment stages, such as **Development (Dev)**, **Quality Assurance (QA)**, and **Production (Prod)**, etc.. Each environment may require different configurations, such as database size and memory allocation, auto-scaling parameters, and unique naming conventions for cloud resources

With **StackGen’s Environment Profiles**, you can:

- Define configurations specific to each environment
- Manage variations in cloud resource settings efficiently

**Example: Using Different S3 Bucket Names**

For example, you may want to use different S3 bucket names for each environment:

- **Production**: `be-test-bucket`
- **QA**: `be-test-qa`
- **Dev**: `be-test-dev`

By variablizing the `bucket_name` field, you can ensure that the S3 bucket names are unique for each environment.

## Using Environment Profile Management for Applications

Follow these steps to enable, configure, and download the IaC for your enviornment profiles:

### Prerequisites

- You should plan the infrastructure before enabling environment profiles.
- You must [variablize field values](/docs/stackgen/concepts/topology/environment-profile#create-environment-variable-attributes) first to configure them differently across your environments.

### Create an appStack

Define your infrastructure architecture. To learn more about creating an appStack, refer to the [Creating appStacks](/docs/stackgen/concepts/appstacks/createappstacks) documentation.

note

You cannot make changes to your appStacks while the **Environment Profiles** toggle is active.

### Create Environment Variable Attributes

Identify configurable fields that differ across your environments (e.g., S3 bucket names, database sizes, etc.).

caution

Once you variablize a field, you cannot reverse it. To learn more about Known Issues with environment variables, refer to the [Feb 2025 - Known Issues](/docs/stackgen/help-center/known-issues/mar2025#in-progress-creating-an-environment-variable-with-a-duplicate-name-throws-no-error) section.

Follow these steps to variablize your Resource attributes:

1. Navigate to the appStack where you want to enable Environment Profiles. In our example, we’ve used an appStack for the **AWS** cloud.
2. Click the resource to open the configuration panel.
3. Click **(x)** next to the attribute label to open the **Create TF Var: Tags dialog**.

1. Enter the Variable Name.
2. Click **Add** to create a default mapping of AWS tags to assign to the bucket. If you do not override it, this value will be selected by default for your environment profile.
3. Click **Create** once done.

### Create Environment Profiles

## Creating Environment Profiles

Follow these steps to create environment profiles:

1. Toggle the **Environment Profiles** to create multiple profiles (e.g., Dev, Stage, Prod).
2. You will see a confirmation screen. Click **Let’s get started →** to open the **Create your first environment** dialog box.
3. Enter a name for your first Environment Profile. In our case, we’ll create a **Dev Environment**.

note

You can assign colors to your environment profiles to distinguish between various environments you create.

4. You can enable the **Enable Storage Backend** toggle to configure how data is stored for a specific topology or a structured system, such as a distributed application, a data pipeline, or a cloud service. For more information, refer to the [**Backend State**](/docs/stackgen/concepts/topology/backend-configuration) documentation.
5. Once done, click **Create Environment Profile**.
6. Your environment profile will be displayed in a drop-down to the **top left** of your topology canvas.

- To edit an environment profile, click the pencil icon next to the environment profile dropdown.
- To create a new environment profile, click the environment profile dropdown and click **\+ Create new profile**.
- To change the values of variablized fields, click the **Resource**, change the values and click **Save**.

Once you’ve configured your environment profiles, you can view the structure of the IaC under the **IaC** tab. In addition to the base `backend.tf` file, an individual `backend.tf` file will be placed under an `env` folder that corresponds to your `.env` profile.

![Env Folder](https://docs.stackgen.com/assets/images/envfolders-4a2250f5d7a7c12d9fd38a1f427ae2d2.jpg)

### Download and Deploy Infrastructure

Export and deploy environment-specific Infrastructure as Code (IaC). Refer to the CLI Guide to learn more about [provisioning or deploying your appStacks](/docs/stackgen/cli-guide/usage/provision-infra-with-cli).

- [Overview](/docs/stackgen/concepts/topology/environment-profile#overview)
- [Using Environment Profile Management for Applications](/docs/stackgen/concepts/topology/environment-profile#using-environment-profile-management-for-applications)
  - [Prerequisites](/docs/stackgen/concepts/topology/environment-profile#prerequisites)
  - [Create an appStack](/docs/stackgen/concepts/topology/environment-profile#create-an-appstack)
  - [Create Environment Variable Attributes](/docs/stackgen/concepts/topology/environment-profile#create-environment-variable-attributes)
  - [Create Environment Profiles](/docs/stackgen/concepts/topology/environment-profile#create-environment-profiles)
- [Creating Environment Profiles](/docs/stackgen/concepts/topology/environment-profile#creating-environment-profiles)
  - [Download and Deploy Infrastructure](/docs/stackgen/concepts/topology/environment-profile#download-and-deploy-infrastructure)
