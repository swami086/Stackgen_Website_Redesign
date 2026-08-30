---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/argocd"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/argocd"
status: "ok"
---

Connect Aiden with your ArgoCD installation to get intelligent assistance with GitOps deployments and Kubernetes application management. Once enabled, Aiden becomes your GitOps expert, helping you manage deployments and troubleshoot issues through natural conversations.

### Integration Capabilities

With ArgoCD integration, Aiden can:

- Monitor application deployment status.
- Analyze application health.
- Investigate sync failures.
- Compare desired vs actual states.
- Track configuration drift.
- Review resource configurations.

## Enable ArgoCD Integration

### Prerequisites

Before enabling the integration, ensure:

- The Argo CD API server is reachable from Aiden (e.g., via an ingress with an external URL).
- You have an Argo CD API token for a dedicated service account with least‑privilege RBAC (read/list as needed).
- Optional: Apply project‑level restrictions and monitor audit logs.

### Steps to Enable ArgoCD Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the ArgoCD Integration card.

3. Enter the integration configuration parameters:



![ArgoCD integration](https://docs.stackgen.com/assets/images/argocd-a467b8b76e850b180a4e533348cae6e1.png)










   - **URL**: This is the web address (endpoint) of your ArgoCD server.

     - If you’re using a self-hosted installation, you can find this address by running the command below and checking the `EXTERNAL-IP` or `LoadBalancer` endpoint:





       ```bash
       kubectl get svc -n argocd
       ```

     - Check out the Argo CD documemtation on [Getting Started (Access the API Server)](https://argo-cd.readthedocs.io/en/stable/getting_started/#access-the-api-server) and learn more about [API docs](https://argo-cd.readthedocs.io/en/stable/developer-guide/api-docs/)



       Security Best Practices





       - Use a dedicated ArgoCD service account for Aiden.
       - Implement role-based access control (RBAC) in ArgoCD.
       - Regularly rotate API tokens.
       - Monitor ArgoCD audit logs.
       - Consider using project-level restrictions.
   - **API Token**: This is the authentication token used to securely connect Aiden to your ArgoCD API.

     - You can create an API token by running:





       ```bash
       argocd account generate-token --account <service-account-name>
       ```

     - Make sure the associated service account has the right RBAC permissions for your use case (e.g., read-only or admin access).

     - Learn more about [Authentication and RBAC](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/).

     - Learn how to [Generate API Token](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/).
   - **Create prebuilt skills**: Aiden supports pre-built skills for ArgoCD integration. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- What's the sync status of the payment service?
- Why did the latest deployment to prod fail?
- Show me out-of-sync applications.
- Compare resource differences in the failed sync.

note

The current Aiden ArgoCD integration requires ArgoCD to have an ingress which is accessible from Aiden's network and an ArgoCD API token which has appropriate permissions.

## Limitations

1. Currently this integration only supports read and list operations.
2. This integration requires ArgoCD to be exposed via the internet-facing ingress.

## Additional References

- [argocd Command Reference](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/argocd#integration-capabilities)
- [Enable ArgoCD Integration](/docs/aiden/1.0/integrations/argocd#enable-argocd-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/argocd#prerequisites)
  - [Steps to Enable ArgoCD Integration](/docs/aiden/1.0/integrations/argocd#steps-to-enable-argocd-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/argocd#sample-prompts)
