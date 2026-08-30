---
title: "Configure Storage Backend in StackGen"
product: "stackgen"
sourcePath: "/docs/concepts/topology/backend-configuration"
sourceUrl: "https://docs.stackgen.com/docs/concepts/topology/backend-configuration"
status: "ok"
---

StackGen leverages persisted state data to efficiently track and manage your infrastructure resources. To enable seamless collaboration, you can define a **Storage Backend** to store state in a remote object storage solution. Thus, ensuring that multiple team members can securely access and modify state data while working on StackGen.

The **Storage Backend** feature also enables centralised state management for your cloud deployments, ensuring infrastructure consistency across teams.

## Configure Storage Backend in StackGen

Follow these steps to configure your storage backend:

### Prerequisites

You’ll have to pre-create backend resources in your cloud, as **OpenTofu** requires backend configuration at the time of initialisation.

### Enable Storage Backend

To enable storage backend, follow these steps:

1. From the StackGen home page, navigate to **appStacks > Backend Configuration**.
2. Turn the **Enable Storage Backend** toggle on.
3. From the **Select the backend type** dropdown, choose the storage backend where you want to manage state files for your teams. The State Backend feature provides centralized storage solutions such as:
   - AWS S3
   - Google Cloud Storage (GCS)
   - Azure Storage
   - PostgreSQL
   - Local storage (not recommended for teams)
   - Remote Storage
   - Terraform Cloud
     You can override backend configurations per the environment. For example, you can use S3 for Prod and PostgreSQL for Dev.
4. Enter the parameters under the **Configure Storage Backend Parameters** field to set up your storage backend.

note

StackGen considers the local backend as the default storage backend unless specified.

5. Once done, click **Save**.

### AWS S3 state locking

For an **AWS S3** backend, use native S3 locking with `use_lockfile`. You do not need a DynamoDB table.

Use `use_lockfile` for new S3 backends. DynamoDB locking still works for existing setups, but it is deprecated. Set `use_lockfile` under **Configure Storage Backend Parameters** unless you must keep a DynamoDB lock table.

## Configure Storage Backend for Environment Profiles

StackGen allows overriding storage backend configurations based on the environment. For example, you can configure **S3** as the storage backend for your **Production** and **PostgreSQL** for your **Development** environments.

Additionally, you can modify backend configurations per profile by setting environment-specific values while maintaining a base configuration. To do so, fill out the environment-specific parameters for the backend while creating your **Environment Profile**. To learn more, refer to the [Environment Profile Management for Applications](/docs/stackgen/concepts/topology/environment-profile) documentation.

- [Configure Storage Backend in StackGen](/docs/stackgen/concepts/topology/backend-configuration#configure-storage-backend-in-stackgen)
  - [Prerequisites](/docs/stackgen/concepts/topology/backend-configuration#prerequisites)
  - [Enable Storage Backend](/docs/stackgen/concepts/topology/backend-configuration#enable-storage-backend)
  - [AWS S3 state locking](/docs/stackgen/concepts/topology/backend-configuration#aws-s3-state-locking)
