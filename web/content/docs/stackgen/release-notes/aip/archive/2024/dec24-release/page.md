---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/archive/2024/dec24-release"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/archive/2024/dec24-release"
status: "ok"
---

We're excited to unveil our December 2024 release, packed with powerful features and enhancements designed to make infrastructure management easier, more secure, and more efficient than ever. From expanded CLI capabilities to advanced governance tools and seamless GCP integration, this update empowers teams to streamline their workflows and maintain compliance effortlessly. Dive in to explore how StackGen continues to evolve to meet your infrastructure needs.

- [What's New](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#stackgen-cli)
  - [Governance and Custom Policy Management](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#governance-and-custom-policy-management)
  - [GCP Integration With IAM Support](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#gcp-integration-with-iam-support)
  - [Custom Resource Versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning)
  - [Seamless Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#seamless-connections-for-cloud-resources)
  - [Enhanced Helm Support](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#enhanced-helm-support)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#user-interface-enhancements)
  - [Enhanced Migration Topology Visibility](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#enhanced-migration-topology-visibility)
  - [Custom Resource Versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning-1)
  - [Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#connections-for-cloud-resources)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#supported-resources)
  - [Azure](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#azure)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#whats-fixed)
  - [Dragging and Dropping Helm Workloads Into the Topology Canvas Throws an Error](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#dragging-and-dropping-helm-workloads-into-the-topology-canvas-throws-an-error)
  - [Policy Violations for S3 Buckets Are Not Getting Resolved Automatically](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#policy-violations-for-s3-buckets-are-not-getting-resolved-automatically)
  - [CLI Throws an Error for `NOTEMPTY` Condition While Sideloading Policies](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#cli-throws-an-error-for-notempty-condition-while-sideloading-policies)
  - [Toggle for All Azure Policies Is Not Working](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#toggle-for-all-azure-policies-is-not-working)
  - [Missing Resource Icons in Governance Configurations](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#missing-resource-icons-in-governance-configurations)
  - [Resource Restriction Policies That Are Not Part of Governance Are Displayed](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#resource-restriction-policies-that-are-not-part-of-governance-are-displayed)
  - [appStack Creation Fails Due to Conflicting Policies](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#appstack-creation-fails-due-to-conflicting-policies)

## What's New

### StackGen CLI

The StackGen CLI now supports the following actions:

- `provision` \- [Provisions](/docs/stackgen/cli-guide/usage/provision-infra-with-cli) your appStack.
- `destroy` \- [Teardown](/docs/stackgen/cli-guide/usage/destroy-stackgen-infra) your infrastructure.

To learn how these commands work run `stackgen [command] --help`.

### Governance and Custom Policy Management

Managing resource policies just got easier! With this release, DevOps users can create governance pre-configurations, customized policy bundles, and assign them to specific teams. This ensures your resources stay secure and compliant while giving each team exactly what they need.

- **Governance Pre-Configurations**
Group and assign policies to teams for consistent resource management and automatically apply policies to appStacks created by your team members. For example, assign a governance pack to a team that includes `read-only` roles for data storage and `full-access` roles for application hosting.

- **Custom Policy Options**
  - **Custom IAM Roles:** Create roles tailored to your resources, for example, allow `read-only` and `audit` roles for data storage resources.
  - **Resource Mapping:** Easily map resources in your appStack, like automatically map references to a general-purpose database to your preferred service.
  - **Resource Restrictions:** Manage the access to resources your teams can use. You can choose to limit one team to storage and compute resources while another team can use analytics tools.
  - **Security and Compliance Settings:** Set rules for resource-specific compliance. Ensure encryption and monitoring are automatically applied to all sensitive resources.
- **Easy Role-Based Control**
  - Assign configurations to specific teams or all users with just a few clicks. You can give your developers access to non-production resources, while operations teams manage production systems.

**Where It Works**

- **Supported Clouds:** All Clouds
- **Supported Resources:** All supported resources

With these updates, you can enforce policies without micromanaging. Teams get the access they need, and you maintain security and compliance effortlessly. Try it today and streamline your governance workflows!

### GCP Integration With IAM Support

We’re excited to announce the integration of Google Cloud Platform (GCP) into StackGen with enhancements to Identity and Access Management (IAM) functionality. Here’s what you need to know:

- **Simplified IAM Management**: IAM role bindings can now be managed directly within individual resources, such as storage buckets and service accounts. This approach mirrors the GCP Console, making it intuitive for users who are already familiar with GCP.

- **Project-Level IAM Controls**:
  - Manage IAM roles at the project level with the flexibility to override or add role bindings.
  - Create and manage custom roles with specific permissions.

**Why This Matters**

These changes make it easier to manage permissions while respecting existing IAM policies. The new streamlined approach reduces complexity, ensuring you have control over access without any additional steps.

**How This Helps**

- **Consistency:** The new design aligns with the GCP Console experience, making the StackGen platform more intuitive.
- **Future Updates:** Going forward, all new GCP resources with IAM capabilities will follow this user-friendly approach..

### Custom Resource Versioning

We’re excited to introduce a new **Custom Resource Versioning** feature that lets you manage and upgrade custom resources in your topologies easier than ever!

**Start Simple, Upgrade Anytime**: Create the initial version of a custom resource, then upgrade it seamlessly when needed.

**How It Works**

- **Automatic Mapping**: Attributes that haven’t changed are carried over automatically.
- **Upgrade Action**: Apply the new version with the click of a button.

info

- **Attribute Updates**: You can add, update, or delete any attribute of an existing custom resource and create a new version. Doing so lets you maintain multiple variants of your custom resource.
- **Switch between versions**: You can switch between various versions and revert to the older ones.

For a visual walkthrough, check out the section on [custom versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning-1).

### Seamless Connections for Cloud Resources

We’ve made it easier than ever to manage your cloud resources by introducing automatic resolution for resource and compute dependencies.

- **Automatic Dependency Resolution**: When a compute instance (like an ECS task) is linked to a resource (like Dynamo), or when two resources connect (such as Athena and S3), these relationships are automatically recognized and resolved with the relevant details.
- **Simplified Environment Variables**: If dependencies are set using environment variables, you only need one variable to establish the connection.

**Supported Platforms and Resources**

- **Cloud Platforms**: AWS and Azure
- **Compute Types**: ECS tasks, Helm charts
- **Resources**: All currently supported resources

With these updates, managing dependencies in your cloud infrastructure is easy and more intuitive than ever. For a visual walkthrough, check out the section on [Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#connections-for-cloud-resources).

### Enhanced Helm Support

#### Enhanced Helm Support in Topology Canvas

We’ve made enhancements to the Topology canvas to enable you to manage K8 Helm resources more easily and efficiently.

- **Edit Workload Resource Bundles**: You can now edit resource bundles directly on the topology canvas, including adding or deleting resources within a resource bundle. This gives you the flexibility to manage and update shared configurations across multiple deployments with ease.



![EditHelmResource1](https://docs.stackgen.com/assets/images/helmEdit1RN1124-40fe44d6f61edd976b034db5f63e5402.png)

- **Share Configurations Outside Your K8 Resource Bundle Deployments**: Kubernetes (Helm) deployments can now have configurations, such as Ingress, Horizontal Pod Autoscaler (HPA), and Service Accounts outside or within the resource bundle. This helps streamline resource management by reusing common settings across different workloads.



![EditHelmResource1](https://docs.stackgen.com/assets/images/helmEdit2RN1124-2fd8c61a6105340a66a6a34cef70ba99.png)


#### Support for Adding Helm Charts Through Repository

We have enhanced the **Add Custom Helm Chart** feature to support importing custom charts from your application source code repository.

![EditHelmResource1](https://docs.stackgen.com/assets/images/helmImportRepoRN1124-7690fe56d24417e0ecce83caac777452.png)

All you need is the `URL` of the repository that contains your Helm chart, and you're all set.

## User Interface Enhancements

### Enhanced Migration Topology Visibility

To provide you with better context during migrations, we now display both the source cloud pre and post-migration topology.

**Why It Matters**

- **View the original resource structure and dependencies** in the source cloud and understand how the topology would evolve after the migration process.

- **Side-by-Side Comparison**: View both topologies within a single interface for easy reference.



![Split View](https://docs.stackgen.com/assets/images/splitviewRn1124-9c8bcc499a4704c1262e0e7b892b1364.png)

- **Improved Clarity**: Identify changes and ensure your migration aligns with your expectations.

- **Simplified Troubleshooting**: Quickly spot any discrepancies between pre and post-migration states.


**How It Helps You**

Whether you’re validating the success of a migration or planning resource adjustments, this update provides the transparency you need for a smooth and error-free cloud transition.

### Custom Resource Versioning

The new Custom Resource Versioning feature simplifies managing and upgrading resources. You can start with an initial version and upgrade it easily whenever needed. Unchanged attributes are automatically carried over, and upgrades can be applied with a single click. You can also add, update, or delete attributes, maintaining multiple versions of your custom resource, and effortlessly switch between or revert to older versions as needed. For more information, refer to the [Custom Resource Versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning) section of the Release Notes.

#### Create a New Version of Your Custom Resource

Here's how you can create a new version of your **Custom Resource**:

1. Navigate to the **Topology** editor of your appStack.

2. Click the **\+ Add New Resource** button at the bottom-left corner.

3. Click on the gear icon next to your **Custom Resource**. To create a new **Custom Resource**, refer to the [article](/docs/stackgen/concepts/resources/custom-module).

4. Click **\+ Add New Version** button.



![Create Resource Version1](https://docs.stackgen.com/assets/images/AddNewResourceVersion1-cc079c8a89be0b86247fa9fde5eb0757.png)

5. You can modify your resource as required and then click **Create Resource Version**.



![Create Resource Version2](https://docs.stackgen.com/assets/images/AddNewResourceVersion2-9fed00c952967a9dadfb47eedc569d93.png)













note





You can change the default **Version Name** to create your own. For example, you can switch from 1.0, and 2.0 to 1.0, 1.1, 1.3, etc.

6. Once saved, you can navigate back to the **Topology** editor and click your **Custom Resource** to open the details panel.



note





Adding a newly versioned custom resource will not automatically update the version of a previously added custom resource. You will need to manually switch to the newer version. Alternatively, you can add the same custom resource with varying versions to your resource topology.

7. Click the dropdown next to the **Resource Name**, to select and switch between your custom resource versions.



![Create Resource Version3](https://docs.stackgen.com/assets/images/AddNewResourceVersion3-13fa53081258dd00ade09623b3e30892.png)

8. Click **Save**.


### Connections for Cloud Resources

Now you can create attribute dependencies for your **Cloud Resource Connections**. To know more about this enhancement in detail, refer to the section [Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#seamless-connections-for-cloud-resources)

You will see connection icons next to a **Resource Connection**

![Create Resource Version3](https://docs.stackgen.com/assets/images/ResourceConnections3-ea7ac1f790c6cd97c58f2e6c8e5645b3.png)

StackGen will automatically recognize dependencies and relationships between various compute instances or resources and resolve your connections with relevant details.

![Create Resource Version1](https://docs.stackgen.com/assets/images/ResourceConnections1-10da4f507f7fc94451716e83395b565e.png)

If dependencies are set using environment variables, you only need one variable to establish the connection. You can configure references and also select the attribute values for each of the connections.

![Create Resource Version2](https://docs.stackgen.com/assets/images/ResourceConnections2-5081b31c3620058768f46c4c77af9712.png)

## Supported Resources

### Azure

We now support the following **Azure** technologies:

| Resource Name |
| --- |
| Log Analytics Solution |
| Log Analytics Workspace |
| Kubernetes Cluster |
| Monitor Autoscale Setting |
| Availability Set |
| Linux Virtual Machine Scale Set |
| Proximity Placement Group |
| Virtual Machine |
| Virtual Machine Scale Set |
| CosmosDB Account |
| CosmosDB SQL Container |
| CosmosDB SQL Database |
| MySQL Flexible Server |
| PostgreSQL Server |
| Redis Cache |
| Databricks Workspace |
| EventHub |
| Application Gateway |
| Load Balancer (LB) |
| Subnet |
| Virtual Network |

Refer to the section on [Supported Resources](/docs/stackgen/setup/supported-tech) to know the resources supported by StackGen.

## What's Fixed

### Dragging and Dropping Helm Workloads Into the Topology Canvas Throws an Error

We've fixed the issue with dragging and dropping a Helm Workload into the Topology canvas. Previously, dragging and dropping **Helm Workloads** that were part of **appStacks** created with **Governance**, with a **Resource Restriction Policy** would throw an error: `Forbidden - Export not allowed for resource types [group] in this appstack`.

### Policy Violations for S3 Buckets Are Not Getting Resolved Automatically

Policy violations for **S3 Buckets** will now get resolved automatically when you click `Fix all violations` from the **Policy Violations Panel** under the **Warnings** section.

![Policy Violations](https://docs.stackgen.com/assets/images/FixViolationsRN1124-343a14dc4d2b922fbcbff5fa955b4888.png)

### CLI Throws an Error for `NOTEMPTY` Condition While Sideloading Policies

We've updated the validation logic to allow the `NOTEMPTY` operator without a value. Previously, **Policies** with an empty `NOTEMPTY` operator were not being uploaded because of the validation error.

**Sample Policy**

```bash
   {

      "attribute": {

					"name": "enable_versioning",

				    "default": true,

					"data_type": "bool"

				},

				"operator": "NOTEMPTY",

}
```

**Sample Error**

```bash
Error:

{"msg":"Invalid policy file","errCode":"","extras":["error validating policy schema [0.rules.0.conditions.1: value is required]"]}

  ERROR   security rules upload failed!
```

### Toggle for All Azure Policies Is Not Working

We have resolved the issue with the toggle for allowing you to seamlessly enable all **Azure policies**. Previously, the toggle to enable all **Azure policies** at once was not working. You would need to enable all policies manually.

![Toggle for Azure](https://docs.stackgen.com/assets/images/ToggleAzurePolicyRN1124-943c463645f8675b5c53dc73fd439dbc.png)

### Missing Resource Icons in Governance Configurations

**Resource Type** icons are now displayed for all resources while creating governance configurations on the **Policies** page for a more consistent visual experience.

![Resource Type Icon](https://docs.stackgen.com/assets/images/ResourceTypeIconRN1124-df699e76514726eee4dabe3c61baa27b.png)

### Resource Restriction Policies That Are Not Part of Governance Are Displayed

We have updated the display logic to show only **Resource Restriction Policies** that are part of the active **Governance Configuration** while excluding others from the list. Previously, **Resource Restriction Policies** that were not part of the **Governance Configuration**, were being incorrectly displayed as included while viewing the list of **Included Policies**.

![Resource Restriction Policies](https://docs.stackgen.com/assets/images/ResourceRestrictionRN1124-a662510fd60e7f6dfacfe516bb6153df.png)

### appStack Creation Fails Due to Conflicting Policies

We have enhanced the appStack creation process to ensure that all security policies defined in the **Governance Configuration** are included, even if they don't match the selected deployment strategy (e.g., AWS Lambda or AWS ECS).

Previously, while creating an appStack with a governance configuration, certain security policies were excluded due to the selected cloud service which caused the appStack creation process to fail due to these missing policies.

- [What's New](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#whats-new)
  - [StackGen CLI](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#stackgen-cli)
  - [Governance and Custom Policy Management](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#governance-and-custom-policy-management)
  - [GCP Integration With IAM Support](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#gcp-integration-with-iam-support)
  - [Custom Resource Versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning)
  - [Seamless Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#seamless-connections-for-cloud-resources)
  - [Enhanced Helm Support](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#enhanced-helm-support)
- [User Interface Enhancements](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#user-interface-enhancements)
  - [Enhanced Migration Topology Visibility](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#enhanced-migration-topology-visibility)
  - [Custom Resource Versioning](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#custom-resource-versioning-1)
  - [Connections for Cloud Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#connections-for-cloud-resources)
- [Supported Resources](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#supported-resources)
  - [Azure](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#azure)
- [What's Fixed](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#whats-fixed)
  - [Dragging and Dropping Helm Workloads Into the Topology Canvas Throws an Error](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#dragging-and-dropping-helm-workloads-into-the-topology-canvas-throws-an-error)
  - [Policy Violations for S3 Buckets Are Not Getting Resolved Automatically](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#policy-violations-for-s3-buckets-are-not-getting-resolved-automatically)
  - [CLI Throws an Error for `NOTEMPTY` Condition While Sideloading Policies](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#cli-throws-an-error-for-notempty-condition-while-sideloading-policies)
  - [Toggle for All Azure Policies Is Not Working](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#toggle-for-all-azure-policies-is-not-working)
  - [Missing Resource Icons in Governance Configurations](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#missing-resource-icons-in-governance-configurations)
  - [Resource Restriction Policies That Are Not Part of Governance Are Displayed](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#resource-restriction-policies-that-are-not-part-of-governance-are-displayed)
  - [appStack Creation Fails Due to Conflicting Policies](/docs/stackgen/release-notes/aip/archive/2024/dec24-release#appstack-creation-fails-due-to-conflicting-policies)
