---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/appstacks"
sourceUrl: "https://docs.stackgen.com/docs/concepts/appstacks"
status: "ok"
---

## Overview

An **appStack** is a collection of resources that represent your application or cloud system. These resources, when considered together, allow for StackGen to analyze your application’s architecture and generate the appropriate Infrastructure as Code (IaC). This IaC can then be used to deploy the infrastructure required to support your application.

## Key Features of an appStack

When you create an appStack, enforcement policies are set and locked in place. These policies ensure consistency and compliance with your application’s requirements.

note

- You can view these policies in the Policies tab of an appStack.
- **Configuration Requirements**: When creating an appStack, you’ll need to provide organization-specific information to help StackGen accurately analyze and configure your application’s environment. This step is crucial for ensuring the generated IaC meets your application's needs.

## Why Use StackGen appStacks?

- **Streamlined IaC Generation**: By organizing your application resources into appStacks, you enable StackGen to generate IaC tailored to your architecture.
- **Consistency**: Locked enforcement policies maintain application integrity across versions.
**Flexibility**: You can create multiple appStacks for different environments or cloud services.

You can create appStacks in the following ways:

- **From scratch**: Start here, if you do not have an infrastructure in place or you want to plan and design your infrastructure.
- **From source code**: Connect StackGen with your application source code repository where your infrastructure image file is hosted.
- **From deployment files**: Have an infrastructure file in place? You can upload your `.tfstate` or terraform plan `.json` file into StackGen and let us do the rest.
- **Using an appStack for cloud migration**: Migrate your appStack to the cloud using StackGen.

Get started with [creating an appStack](/docs/stackgen/concepts/appstacks/createappstacks) and experience the simplicity and control that StackGen has to offer you.
