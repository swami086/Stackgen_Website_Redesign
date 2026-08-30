---
title: "Integrations Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/gcp"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/gcp"
status: "ok"
---

Connect Aiden with your Google Cloud Platform (GCP) to get intelligent assistance with resource management, infrastructure operations, and cloud optimization. Once enabled, Aiden becomes your GCP expert, helping you manage resources through natural conversations.

### Integrations Capabilities

With GCP integration, Aiden can help you:

- Monitor and manage virtual machines and compute resources.
- Track storage accounts and fetch their sizes.
- Analyze virtual network configurations.
- Optimize cloud resource utilization.
- Analyze GCP billing and costs.
- Review IAM permissions and policies.

## Enable GCP Integration

### Prerequisites

1. To integrate a Google Cloud Project with Aiden, create a service account email in that corresponding project named **StackGen Aiden SA** and attach the `Basic Viewer` role to it.

2. Additionally, you will need to provide more permissions to access and perform actions on your cloud resources as you start using the GCP integration. We recommend you create a new custom role named `StackGen_Aiden_GCP` and add permissions to the role whenever required. Attach this role to the service account you created in the step above.

You can add permissions like `compute.instances.start`, `compute.instances.stop` (required to start/stop a VM) to the custom role. This will enable Aiden to start or stop a VM as you command.



![GCP](https://docs.stackgen.com/assets/images/gcp1-1f3f12394a24ada1136cd684c89d0dba.png)

3. Now navigate to the **Permissions** page of the newly created service account and click the **Grant Access** button under the **View by Principles** tab. Add the principal named `aiden-sa@opsverse-aiden.iam.gserviceaccount.com`, attach the `Service Account Token Creator` role to it, and click **Save**.



![GCP](https://docs.stackgen.com/assets/images/gcp2-8b78047e051c8a40707d7ef5a133b8ca.png)


### Steps to Enable GCP Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the GCP Integration card.

3. Enter the integration configuration parameters:



![GCP](https://docs.stackgen.com/assets/images/gcp-e50f8e656e832c61a3ef9ae040c97318.png)










   - **Service Account Email**: This is the email address of the GCP service account that Aiden will use to authenticate and interact with your Google Cloud resources.

     - You can create and view this in the **Google Cloud Console** by navigating to **IAM & Admin > Service Accounts**.
     - Make sure to assign the minimum required IAM roles (e.g., `Viewer` or custom least-privilege roles) to maintain security.
     - Check out Google documentation on [Creating and Managing Service Accounts](https://cloud.google.com/iam/docs/service-accounts-create) and [Understanding Service Accounts](https://cloud.google.com/iam/docs/service-account-overview).
   - **Project ID**: This is the unique identifier for your GCP project where your resources (VMs, Cloud Storage, Databases, etc.) are organized and billed. The Project ID is used in configuration and API calls.

     - You can find your Project ID in the Google Cloud Console by navigating to Home > Dashboard, or by running the following command:





       ```bash
       gcloud projects list
       ```









       Aiden uses this ID to know which GCP project’s resources to access or modify.

     - Learn more about [Identifying Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) and check out [Google Cloud Resource Hierarchy Overview](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me all storage buckets present in the EU region in my Google cloud.
- List down the names of all the running VMs present in my Google Cloud.
- Start the `<name>` VM present in the NA region present in my Google cloud.
- What is the size of the storage bucket named `<bucket_name>` present in my Google cloud?

## Additional References

- [Using Service Accounts for Authentication](https://cloud.google.com/docs/authentication/client-libraries)
- [Cloud SDK (gcloud) Command Reference](https://cloud.google.com/sdk/gcloud/reference)
- [GCP IAM Roles and Permissions](https://cloud.google.com/iam/docs/roles-permissions)

- [Integrations Capabilities](/docs/aiden/1.0/integrations/gcp#integrations-capabilities)
- [Enable GCP Integration](/docs/aiden/1.0/integrations/gcp#enable-gcp-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/gcp#prerequisites)
  - [Steps to Enable GCP Integration](/docs/aiden/1.0/integrations/gcp#steps-to-enable-gcp-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/gcp#sample-prompts)
