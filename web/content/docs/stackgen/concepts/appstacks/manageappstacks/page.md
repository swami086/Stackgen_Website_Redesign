---
title: "appStack listing"
product: "stackgen"
sourcePath: "/docs/concepts/appstacks/manageappstacks"
sourceUrl: "https://docs.stackgen.com/docs/concepts/appstacks/manageappstacks"
status: "ok"
---

## appStack listing

The **appStacks** page lists appStacks in the current project. Use the **Cloud Provider** filter to narrow the table, then click **Refresh** next to the filter to reload the list after you create, import, or update an appStack elsewhere. You do not need a full browser reload to see new rows.

![appStacks listing page showing Refresh link next to Cloud Provider filter](https://docs.stackgen.com/assets/images/may26-appstack-listing-refresh-e7b241318293c05bf30cca028acc5146.png)

## Key Aspects of Managing appStacks

Managing appStacks involves overseeing the lifecycle of your application's infrastructure to ensure consistent, secure, and efficient deployments. Now you can streamline your application infrastructure, maintain cloud compatibility, and scale operations with confidence.

Here's an overview of the key aspects for managing an appStack:

## appStack Actions

Clicking the **ellipsis ⋮** icon under the **Actions** column for an appStack opens the appStack **Actions** panel.

![appStack Actions](https://docs.stackgen.com/assets/images/appstackActions-4468661914ea101e8e95ac443a2ebbb0.jpg)

Let's discuss each of these actions in detail.

### Version Control

Maintain versioning for appStacks to track changes and ensure auditability. This feature allows for seamless management of infrastructure updates or migrations.

![Version Control](https://docs.stackgen.com/assets/images/appstackversioncontrol-f8528ef011a7ec21ff5adcad470529ae.jpg)

### Duplicate

When working with an appStack, you may need to experiment with changes in your infrastructure, without affecting your existing setup. Instead of modifying your current appStack directly, you can create a separate version to work with, while keeping your original setup intact.

For example, if you have an appStack for your production environment, you might want to test new features or configurations without altering it, as this is live and any changes you make here will have a direct impact on your customers. By creating a copy of the appStack, you ensure that your primary setup remains stable while allowing you the freedom to explore and innovate. This approach allows for safe testing, iterative development, and a structured way to manage different versions of your app stack.

Simply click **Duplicate**, follow the process of configuring an appStack, and you're done!

### Delete and Archive

You can delete appStacks you no longer need. However, StackGen doesn't permanently delete them by default. It archives them instead, so you can easily restore them later if needed.

![appStack Delete](https://docs.stackgen.com/assets/images/deleteappstack-09838a86b247ba7866773df1f8cde837.jpg)

You can choose to **Permanently Delete** or **Restore** your appStack by clicking the **Archived** tab:

![Delete Permanently or Restore](https://docs.stackgen.com/assets/images/restoreDeletepermanently-972f505f5088fabbec678236e1da430c.jpg)

Additionally you can also delete your appStack version within your appStack via the menu to the top:

![appStack Menu](https://docs.stackgen.com/assets/images/appstackversions-3a67c84d5d58c9a752afcb065491d913.jpg)

## appStack Tabs

![appStack Tabs](https://docs.stackgen.com/assets/images/appstacktabs-b3684fbb2d0b3567f1d2fc7cf82beea2.jpg)

### Topology

Use visual topology tools to represent and modify the appStack. You can add, edit, or remove resources, configure properties, and define dependencies to align with application requirements.

### Policies

Built-in policies ensure all changes comply with organizational and cloud provider guidelines. This minimizes the risk of misconfigurations and enhances operational reliability.

### IaC

Leverage tools like Terraform and Helm to generate and deploy Infrastructure as Code. This automates provisioning, making deployments faster and less error-prone.

### appStack Notifications

You can enable notifications on any of the IaC Lifecycle or appStack events so that you can keep a track of changes made to your appStacks. Check out the documentation on [Enabling appStack Notifications](/docs/stackgen/setup/alerts)
to learn more.

### Managing Governance Configuration for a Specific appStack

You can Assign or Update Governance for an appStack. Your StackGen **Admin** or **DevOps** Teams can directly configure a specific governance version for each appStack via the appStack management screen. You can also remove a governance configuration from an appStack, and change governance policies as needed.

Follow these steps to assign governance to a specific appStack:

1. From the StackGen Home page, navigate to **appStacks**.
2. Select the appStack you want to configure.
3. Click the **ellipsis ⋮** icon under the **Actions** column and select **Governance Configurations** from the menu.
4. In the configuration panel:
1. Select a governance configuration from the **Available Governance Configurations** dropdown.
2. Choose the desired version of the governance configuration (e.g., Version 2 (latest)).
5. To remove an assigned governance configuration, click the trash icon next to the selected configuration.
6. Once done, click **Apply** to save changes.

- [appStack listing](/docs/stackgen/concepts/appstacks/manageappstacks#appstack-listing)
- [Key Aspects of Managing appStacks](/docs/stackgen/concepts/appstacks/manageappstacks#key-aspects-of-managing-appstacks)
- [appStack Actions](/docs/stackgen/concepts/appstacks/manageappstacks#appstack-actions)
  - [Version Control](/docs/stackgen/concepts/appstacks/manageappstacks#version-control)
  - [Duplicate](/docs/stackgen/concepts/appstacks/manageappstacks#duplicate)
  - [Delete and Archive](/docs/stackgen/concepts/appstacks/manageappstacks#delete-and-archive)
- [appStack Tabs](/docs/stackgen/concepts/appstacks/manageappstacks#appstack-tabs)
  - [Topology](/docs/stackgen/concepts/appstacks/manageappstacks#topology)
  - [Policies](/docs/stackgen/concepts/appstacks/manageappstacks#policies)
  - [IaC](/docs/stackgen/concepts/appstacks/manageappstacks#iac)
  - [appStack Notifications](/docs/stackgen/concepts/appstacks/manageappstacks#appstack-notifications)
  - [Managing Governance Configuration for a Specific appStack](/docs/stackgen/concepts/appstacks/manageappstacks#managing-governance-configuration-for-a-specific-appstack)
