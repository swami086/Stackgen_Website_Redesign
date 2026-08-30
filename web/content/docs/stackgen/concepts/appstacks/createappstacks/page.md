---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/appstacks/createappstacks"
sourceUrl: "https://docs.stackgen.com/docs/concepts/appstacks/createappstacks"
status: "ok"
---

## Overview

An appStack is a collection of resources that make up your application. These resources, when considered together, help StackGen understand your application’s architecture, and generate appropriate Infrastructure as Code (IaC) for provisioning and deploying the infrastructure your application needs. An appStack has enforcement policies set on it when it is first created. These policies cannot be altered, even if the appStack is versioned. The policies on an appStack can be viewed from the Policies tab in the Topology.

You can create appStacks in the following ways:

- **From scratch**: Start here, if you do not have an infrastructure in place.
- **From a template**: Reuse a layout by starting from an appStack you marked as a template. See [appStack templates](/docs/stackgen/concepts/appstacks/createappstacks/appstack-templates).
- **From Cloud Discovery**: Have an infrastructure file in place? You can upload your `.tfstate` or `.json` image file to StackGen and let us do the rest.

## Best Practices

- **Plan Ahead**: Determine the cloud provider and service you want to use before creating an appStack.
- **Review Policies**: Check the **Policies** tab within your appStack to ensure they align with your requirements.
- **Version Management**: If your application evolves, create new versions of your appStack while keeping enforcement policies in mind.

By following these guidelines, you can leverage appStacks to efficiently manage and deploy your application infrastructure with StackGen.

## Limitations

appStacks are limited to one cloud provider and one cloud service. If you wanted to see infrastructure for your app on both **AWS ECS** and **AWS EKS**, you would need to create two separate appStacks for your application.
