---
title: "Log In to StackGen"
product: "stackgen"
sourcePath: "/docs/quickstart/appstacks"
sourceUrl: "https://docs.stackgen.com/docs/quickstart/appstacks"
status: "ok"
---

An appStack is a collection of resources that represent your application or cloud system. These resources, when considered together, allow for StackGen to analyze your application’s architecture and generate the appropriate Infrastructure as Code (IaC). This IaC can then be used to deploy the infrastructure required to support your application.

To get started with StackGen and generate infrastructure as code (IaC) for deployment, [log in](/docs/stackgen/quickstart/appstacks#log-in-to-stackgen) to StackGen and then follow these steps:

1. [Create an appStack](/docs/stackgen/quickstart/appstacks#create-an-appstack-1)
2. [View and edit the topology](/docs/stackgen/quickstart/appstacks#view-and-edit-the-topology)
3. [Generate IaC files](/docs/stackgen/quickstart/appstacks#generate-iac-files)

note

This process assumes you have an existing application codebase that you would like to scan and build infrastructure. If you would like to start from a blank canvas, check out our [IaC From Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch). If you would like to use our CLI, check out [Create an appStack](/docs/stackgen/cli-guide/usage/appstack/create).

## Log In to StackGen

Click to view

You can login to StackGen with the following accounts:

- [GitHub](/docs/stackgen/quickstart/appstacks#github)
- [GitLab](/docs/stackgen/quickstart/appstacks#gitlab)
- [Google](/docs/stackgen/quickstart/appstacks#google)

note

If you are not already logged into the authentication accounts listed above, StackGen will prompt you to log in before you authorize it.

### GitHub

When you log in with GitHub, you will be asked to authorize StackGen with **read-only** access to your organization, projects, and personal information. Additionally, you will need to grant StackGen access to any repositories that are not already configured to [allow the application to access organization data](https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data). Click **Authorize StackGen** to proceed.

### GitLab

When you log in with GitLab, you will be asked to authorize StackGen with **read access** to your personal information and authentication via **OpenID Connect**. Additionally, you will need to grant access to any repositories that are not already configured to allow the application to access organization data. Click **Authorize** to proceed.

### Google

When you log in with Google, you are linking your Google account with StackGen. Selecting the account would mean that you are agreeing to share your name, email address, language preference, and profile picture with StackGen. Click **Continue** to proceed.

## Create an appStack

Click to view

To generate the IaC files your application needs, you need to create an appStack. You can create in the following ways:

- [IaC from Cloud Discovery](/docs/stackgen/concepts/appstacks/createappstacks/fromdiscovery)
- [IaC From Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch)
- [Create appStacks from Templates](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates)

## View and Edit the Topology

Click to view

The **Topology Canvas** in StackGen is a visual design tool for creating, managing, and validating cloud infrastructure. You can drag and drop cloud resources, configure their settings, establish connections, and export Infrastructure as Code (IaC). It provides an interactive way to plan and validate infrastructure before deployment. Learn more about the [Toplogy Canvas here](/docs/stackgen/concepts/topology).

## Generate IaC Files

Click to view

When you're ready to deploy your infrastructure, StackGen offers two methods for exporting your Infrastructure as Code (IaC) to streamline your workflow. You can either download your IaC in a .zip file or push it directly to a Git repository. Learn more about the [Iac tab in the Topology Canvas and exporting Iac](/docs/stackgen/concepts/iac).

- [Log In to StackGen](/docs/stackgen/quickstart/appstacks#log-in-to-stackgen)
  - [GitHub](/docs/stackgen/quickstart/appstacks#github)
  - [GitLab](/docs/stackgen/quickstart/appstacks#gitlab)
  - [Google](/docs/stackgen/quickstart/appstacks#google)
