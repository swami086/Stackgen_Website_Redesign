---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/azure"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/azure"
status: "ok"
---

Connect Aiden with your Azure cloud platform to get intelligent assistance with resource management, infrastructure operations, and cloud optimization. Once enabled, Aiden becomes your Azure cloud expert, helping you manage resources through natural conversations.

### Integration Capabilities

With the Azure integration, Aiden can:

- Monitor and manage virtual machines and compute resources.
- Track storage accounts and blob containers.
- Analyze virtual network configurations.
- Review Azure Active Directory settings.
- Investigate Azure Monitor metrics.
- Optimize cloud resource utilization.
- Analyze Azure billing and costs.

### Create Custom Skills

On top of the several out of the box capabilities, you can create custom skills to add additional capabilities. Here are some examples:

- Check your Azure account for a set of compliance policies.
- Setup a developer self service task to create a set of Azure resources.
- Analyze and debug connectivity issues following a specific set of checks.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Azure Integration

### Prerequisites

To integrate with Aiden, provide credentials like `Client ID`, `Client Secret`, and `Tenant ID` associated with a service principal in your Azure cloud. The service principle should have a **Basic Reader** role attached to it.

Follow this official [Azure Documentation](https://learn.microsoft.com/en-us/cli/azure/azure-cli-sp-tutorial-1?tabs=bash) to create a service principal.

Use the Azure CLI or the [Bash Environment in Azure Cloud Shell](https://shell.azure.com/) to execute the following CLI command to create a service principal.

```shell
az ad sp create-for-rbac --name "stackgen-aiden-sp" --role Reader --scopes /subscriptions/<azure_subsription_id>
```

The output of the above command after execution will be as follows:

```shell
{

  "appId": "myAppId",

  "displayName": "myServicePrincipalName",

  "password": "myServicePrincipalPassword",

  "tenant": "myTentantId"

}
```

Use the `appId` as the `Client Id` , `password` as the `Client Secret` and the `tenant` as the `Tenant Id` to configure the Azure Integration with Aiden.

### Steps to Enable Azure Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Azure Integration card.

3. Enter the integration configuration parameters. Refer to the [prerequisites](/docs/aiden/1.0/integrations/azure#prerequisites) to learn how to find these details:



![azure integration](https://docs.stackgen.com/assets/images/azure-917e9c9e4e90ad7c6ebd03f171199796.png)










   - **Client ID**: This is the Application (Client) ID of the Azure AD app you registered.


     - You can find it in the Azure Portal by navigating to **Azure Active Directory > App registrations > Your App > Overview**.
     - Check out the Azure documemtation to learn how to [Register an application in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

Security Best Practices

     - Create a dedicated service principal for Aiden.
     - Implement least-privilege access using Azure RBAC.
     - Regularly rotate client secrets.
     - Monitor Aiden's activities through Azure Activity Logs.
     - Ensure your Azure service principal has appropriate RBAC permissions for the tasks you want Aiden to perform.
     - [Follow Azure’s best practices for managing app secrets](https://learn.microsoft.com/en-us/entra/identity-platform/security-best-practices-for-app-registration).
     - Use [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal) to store credentials securely.

   - **Client Secret**: This is the password (or key) that authenticates your app’s identity.

     - It’s created under your app’s **Certificates & secrets** section.
     - The secret is only visible once when created, store it securely in a secrets manager.
     - Learn how to [create a client secret securely](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#option-2-create-a-client-secret).
   - **Tenant ID**: This identifies your Azure Active Directory tenant, the organization’s identity boundary in Azure.

     - You can find it in the Azure Portal by navigating to **Azure Active Directory > Overview > Tenant ID**.
     - Check out Azure documentation on [How to find your Microsoft Entra tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant)
   - **Create prebuilt skills**: Aiden supports pre-built skills for Azure integration. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me all storage accounts in the development resource group.
- What's our current Azure spending trend?
- Stop all non-production VMs in East US.
- Check if any AKS clusters are running outdated versions.
- List virtual networks with overlapping address spaces.

## Additional References

- [Register an application in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [Register a Microsoft Entra app and create a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#option-2-create-a-client-secret)
- [How to find your Microsoft Entra tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant)
- [Application and service principal objects in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals?tabs=browser)
- [Assign Azure roles using the Azure portal](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal)
- [Security best practices for application properties in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/security-best-practices-for-app-registration) [Quickstart: Set and retrieve a secret from Azure Key Vault using the Azure portal](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal)

- [Integration Capabilities](/docs/aiden/1.0/integrations/azure#integration-capabilities)
- [Create Custom Skills](/docs/aiden/1.0/integrations/azure#create-custom-skills)
- [Enable Azure Integration](/docs/aiden/1.0/integrations/azure#enable-azure-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/azure#prerequisites)
  - [Steps to Enable Azure Integration](/docs/aiden/1.0/integrations/azure#steps-to-enable-azure-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/azure#sample-prompts)
