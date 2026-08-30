---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/kubernetes"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/kubernetes"
status: "ok"
---

Connect Aiden with your Kubernetes clusters to get intelligent assistance with cluster management, resource monitoring, and deployment operations. Once enabled, Aiden becomes your Kubernetes expert, helping you manage resources and troubleshoot issues through natural conversations.

### Integration Capabilities

With Kubernetes integration, Aiden can:

- Monitor pod status and health across namespaces.
- Track deployment and replica set configurations.
- Analyze node resources and capacity.
- Investigate service connectivity issues.
- Review job and cronjob execution status.
- Manage stateful sets and daemon sets.
- Monitor namespace resources and quotas.

## Enable Kubernetes Integration

### Prerequisites

Before enabling the integration, ensure:

- You have access to a Kubernetes cluster (on-premises or cloud-managed).
- You have `kubectl` configured and can access your cluster.
- Helm is installed on your system.
- You have cluster admin permissions or sufficient RBAC permissions to create namespaces and deploy resources.

### Steps to Enable Kubernetes Integration

Follow these steps to enable the Integration:

1. **Create a Remote Runner**

First, navigate to:
   - **Organizations** \> **Remote Runner** \> **Create new remote runner**
   - Copy the remote runner ID.
2. **Install Remote Runner on Kubernetes**

Run the following command to install the remote runner on your Kubernetes cluster (works for both AMD and ARM architectures):





```bash
helm upgrade --install aiden-remote-runner \
     -n aiden-remote-runner \
     --create-namespace \
     aiden-remote-runner \
     --repo https://registry.devopsnow.io/chartrepo/public \
     --set remote-runner.configMap.RUNNER_ID=<RUNNER_ID> \
     --set remote-runner.configMap.SERVER_URL=https://cloud.stackgen.com/ai \
     --set remote-runner.image.tag=latest
```











Important





Replace `<RUNNER_ID>` with the remote runner ID you copied in step 1.

3. **Verify Installation**

After installation, verify that the remote runner pod is running:





```bash
kubectl get pods -n remote-runner
```









You should see a pod in `Running` status.

4. From the Aiden home page, click **Integrations** from the navigation panel to the left.

5. Hover and click the **Activate** button on the Kubernetes Integration card.

6. Enter the integration configuration parameters and click **Save** to enable the integration.


## RBAC Permissions

### Default Permissions

By default, the Aiden Remote Runner is deployed with read-only cluster-wide permissions (get, list, watch) for the following resources:

- pods
- services
- nodes
- namespaces
- deployments
- replicasets
- statefulsets
- daemonsets
- jobs
- cronjobs

Security Best Practices

- Start with read-only permissions and add write permissions only when needed.
- Use namespace-scoped permissions when possible instead of cluster-wide permissions.
- Regularly review and audit RBAC permissions.
- Follow the principle of least privilege.

### Customizing Permissions

You can customize RBAC permissions by overriding the `clusterRole.rules` configuration in your Helm values file or via `--set` flags.

**Example: Grant Write Access to Pods**

Create a `custom-values.yaml` file:

```yaml
remote-runner:

  clusterRole:

    rules:

      - apiGroups:

          - ""

        resources:

          - "pods"

        verbs:

          - "get"

          - "list"

          - "watch"

          - "create"

          - "delete"
```

Then apply it with your Helm command:

```bash
helm upgrade --install aiden-remote-runner \
  -n aiden-remote-runner \
  --create-namespace \
  aiden-remote-runner \
  --repo https://registry.devopsnow.io/chartrepo/public \
  --set remote-runner.configMap.RUNNER_ID=<RUNNER_ID> \
  --set remote-runner.configMap.SERVER_URL=https://cloud.stackgen.com/ai \
  --set remote-runner.image.tag=latest \
  -f custom-values.yaml
```

### Sample Prompts

Here are a few sample prompts that you can use:

- Show me all pods in the production namespace that are not running.
- What's the resource usage across all nodes in the cluster?
- List all deployments that have been updated in the last 24 hours.
- Are there any pods with failed restarts in the staging namespace?
- Show me services without any endpoints.
- What's the status of all cronjobs scheduled for today?

## Additional References

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Cluster Access](https://kubernetes.io/docs/tasks/access-application-cluster/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/kubernetes#integration-capabilities)
- [Enable Kubernetes Integration](/docs/aiden/1.0/integrations/kubernetes#enable-kubernetes-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/kubernetes#prerequisites)
  - [Steps to Enable Kubernetes Integration](/docs/aiden/1.0/integrations/kubernetes#steps-to-enable-kubernetes-integration)
- [RBAC Permissions](/docs/aiden/1.0/integrations/kubernetes#rbac-permissions)
  - [Default Permissions](/docs/aiden/1.0/integrations/kubernetes#default-permissions)
  - [Customizing Permissions](/docs/aiden/1.0/integrations/kubernetes#customizing-permissions)
  - [Sample Prompts](/docs/aiden/1.0/integrations/kubernetes#sample-prompts)
