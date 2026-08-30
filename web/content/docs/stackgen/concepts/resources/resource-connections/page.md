---
title: "Types of Resource Connections"
product: "stackgen"
sourcePath: "/docs/concepts/resources/resource-connections"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/resource-connections"
status: "ok"
---

Resource Connections in StackGen define **how resources relate to each other** in your infrastructure. They help StackGen understand **what must be created first** and **which resources use values from others**, so it can generate correct Infrastructure as Code (IaC).

StackGen supports **two types of connections** to model this clearly:

- **Order**: one resource must be created before another. For example, a Subnet must be created after its VPC.
- **Reference**: one resource uses a value (ID, ARN, name, endpoint) from another

You configure resource connections visually in the **Topology** view.

## Types of Resource Connections

### Depends On

Use **Depends On** when one resource must be created **after** another resource, but does **not** use any of its values. Doing so will determine the order for creating a resource during `terrform apply`. This helps you prevent provisioning errors. This connection does not pass data between two resources.

**Common examples**

- A **KMS Alias** depends on a **KMS Key**.
- An **IAM Policy** depends on an **IAM Role**.
- A **Route53 record** depends on a **Load Balancer**.

**When to Use Depends On**: if the resource only needs another resource to exist first.

### Inferred

Use **Inferred** when one resource needs to **use a value** from another resource. StackGen automatically maps attributes such as (but not limited to):

- IDs
- ARNs
- Names
- Endpoints

An inferred connection passes values automatically, creates implicit dependencies and reduces manual configuration.

**Common examples**

- A **KMS Alias** referencing a **KMS Key ID**.
- An **Athena query** using an **S3 bucket name**.
- An **IAM Policy** referencing resource ARNs.
- An **S3 Object** associated with an **S3 Bucket**.

**When to use an inferred connection**: if one resource needs a value from another resource.

## How to Connect Resources

Connect ResourcesappStacks > appStack > Topology > Select resource > Drag connection handle from source to target resource

1. Hover and select the connection handle for the source resource you want to connect.
2. Drag the connection handle to the target resource.
3. Choose the connection type:
   - **Depends On** for creation order.
   - **Inferred** for value-based references.
4. If required, configure the attribute mappings.
5. Click **Save**

Once connected, StackGen validates connections and prevents unsupported or invalid configurations. StackGen prevents circular references between resources, which are not supported by Terraform.

### What's Supported

- **Databases to Compute Instances** (e.g., linking an RDS instance to an EC2 instance for secure database access using IAM authentication).
- **Databases to Applications** (e.g., Web applications to MySQL or PostgreSQL).
- **Event triggers to Functions or Services** (e.g., Storage bucket events triggering serverless functions).
- **Networking resources** (e.g., Subnets to VPCs, Load balancers to backend services).
- **Service mesh integrations** (e.g., Kubernetes pods communicating via Istio or Linkerd).
- **Logging and monitoring connections** (e.g., Compute resources sending logs to a monitoring service).

### What's Not Supported

- **Unsupported custom modules lacking defined connection parameters:** If a custom module does not have explicitly defined outputs, such as endpoint URLs, IAM roles, or connection strings, StackGen cannot establish a valid connection to other resources. This means that any resource relying on these outputs for networking, authentication, or API calls will not be able to reference or interact with the custom module properly.
- **Resources with conflicting security or compliance restrictions** (e.g., policies preventing direct database connections).
- **Cross-cloud provider connections** without a compatible bridging mechanism (e.g., directly linking an AWS EC2 instance to a GCP Cloud SQL database).
- **Resources without network reachability** (e.g., private subnets without necessary routing or peering).
- **External third-party APIs** unless explicitly supported by StackGen.

- [Types of Resource Connections](/docs/stackgen/concepts/resources/resource-connections#types-of-resource-connections)
  - [Depends On](/docs/stackgen/concepts/resources/resource-connections#depends-on)
  - [Inferred](/docs/stackgen/concepts/resources/resource-connections#inferred)
- [How to Connect Resources](/docs/stackgen/concepts/resources/resource-connections#how-to-connect-resources)
  - [What's Supported](/docs/stackgen/concepts/resources/resource-connections#whats-supported)
  - [What's Not Supported](/docs/stackgen/concepts/resources/resource-connections#whats-not-supported)
