---
title: "Key Features"
product: "stackgen"
sourcePath: "/docs/concepts/topology/resources-tab"
sourceUrl: "https://docs.stackgen.com/docs/concepts/topology/resources-tab"
status: "ok"
---

The **Resources tab** in StackGen provides a more efficient way to visualize infrastructure in a tabular format. This feature is particularly beneficial when managing large deployments, such as those in cloud-to-code or cloud-to-cloud migrations, where you may have thousands of resources. The Resources tab offers a streamlined, manageable way of viewing topologies, enabling you to easily verify, filter, and navigate large numbers of resources.

![Resources Tab](https://docs.stackgen.com/assets/images/resources-tab-78a3cbf26646903e6e6df1ef8aa12743.png)

## Key Features

- **Tabular Visualization**

Resources are displayed in a list format, giving you a clear and organized overview of large topologies. This is ideal for environments where you're managing thousands of resources, such as cloud-to-code or cloud-to-cloud use cases.

- **Enhanced Navigation**

The Resources tab improves usability by offering filters and search options, allowing you to locate resources based on metadata like name, resource type, tags, and resource ID.

- **Resource Metadata Display**

Each row in the list shows essential metadata about the resource, such as the resource name, ID, resource type, and tags. This allows for quick and easy identification and filtering of resources.

## User Flow for Resources

### **Access the Resources Tab**

To view your resources in a table format, navigate to your appStack and click the three-dot `(⋮)` toggle next to the IaC tab to reveal the **Resources**, **Policies**, and **Cost Estimate** tabs. Select the Resources tab to switch to a searchable, filterable list of resources from the graphical view, which can be cumbersome when working with large numbers of resources.

### **Navigate the List**

In the Resources tab, each resource is displayed in a table row with the following columns:

- **Resource Name**: The name of the resource.
- **Resource ID**: The unique ID of the resource.
- **Resource Type**: The type of the resource.
- **Tags**: Any tags assigned to the resource.

You can sort and filter the data based on any of these columns to help you find specific resources faster.

### **Search and Filter**

A search bar at the top of the table allows you to quickly find resources by name or resource type. Filters can be applied to display resources that match resource types, enabling you to narrow down the list based on your needs.

## Configure Resources

From the Resources tab, you can click on any individual resource (e.g., a Lambda function) to open its side panel and configure metadata, runtime, and dependencies. This view gives you full control over how the resource behaves.

In this section, you can:

- Edit runtime parameters like architecture (x86\_64), handler (main.lambda\_handler), and timeout.
- Specify metadata like description, memory size, and whether the resource should be marked as an external resource or a data source.
- Tag resources for filtering and governance using the Resource Tags panel.

This inline configuration experience is useful during pre-deployment planning or while debugging a failed topology scan.

## View Dependencies

Below the resource list, you’ll find a **Dependencies panel** that outlines upstream and downstream connections between resources, for example, IAM roles, CloudWatch log groups, or other supporting infrastructure.

This helps you quickly identify:

- Which IAM role a function uses.
- Which services depend on the selected resource.
- Whether resource linkage is broken or misconfigured.

This view is especially useful when debugging complex appStacks with multiple interconnected components.

- [Key Features](/docs/stackgen/concepts/topology/resources-tab#key-features)
- [User Flow for Resources](/docs/stackgen/concepts/topology/resources-tab#user-flow-for-resources)
  - [**Access the Resources Tab**](/docs/stackgen/concepts/topology/resources-tab#access-the-resources-tab)
  - [**Navigate the List**](/docs/stackgen/concepts/topology/resources-tab#navigate-the-list)
  - [**Search and Filter**](/docs/stackgen/concepts/topology/resources-tab#search-and-filter)
