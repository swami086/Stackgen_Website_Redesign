---
title: "Resource Actions"
product: "stackgen"
sourcePath: "/docs/concepts/resources"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources"
status: "ok"
---

Resources are the fundamental components used to build and manage cloud infrastructure in StackGen. These resources represent cloud services like virtual machines, storage, networking, IAM roles, and more. You can select and configure these resources using the Topology Canvas, providing a visual and interactive approach to infrastructure design.

## Resource Actions

You can perform several actions with resources within the **Topology Canvas**:

- **Add:** Drag and drop resources from the **Add New Resource** panel.
- **Configure:** Modify the resource properties to meet your requirements, such as instance type, network configuration, and access permissions.
- **Delete:** Right-click on a resource and select the **delete** option to remove it from the canvas.
- **Connect:** Link resources to define dependencies, such as connecting an IAM role to a compute instance.

For a full list of supported resources, refer to the [Supported Technologies](/docs/stackgen/setup/supported-tech/supported-technologies-list) page.

## Custom Modules

In addition to standard cloud resources, StackGen also supports **[Custom Modules](/docs/stackgen/concepts/resources/custom-module)**. These are user-defined resources that allow you to model and deploy unique infrastructure components that are not natively supported by cloud providers.

**Key Features**

- Custom Modules are designed for specialized or non-standard infrastructure needs.
- You can create Custom Modules using the StackGen UI or CLI.
- Once created, Custom Modules behave like any other resource on the canvas and can be connected, configured, and versioned.

Custom Modules help extend StackGen’s flexibility to accommodate any use case, even if it falls outside the standard cloud offerings.
