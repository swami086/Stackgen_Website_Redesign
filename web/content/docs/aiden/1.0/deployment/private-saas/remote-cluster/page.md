---
title: "Prerequisites"
product: "aiden"
sourcePath: "/aiden/1.0/deployment/private-saas/remote-cluster"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/deployment/private-saas/remote-cluster"
status: "ok"
---

StackGen supports deployments to remote clusters hosted and managed by the customer (also referred to as "Private SaaS" or "Remote"). This guide provides step-by-step instructions to bootstrap a new remote cluster.

Once a remote cluster is bootstrapped, it can be used to deploy any of the StackGen apps.

## Prerequisites

Prerequisites for Remote Cluster Bootstrap

Before bootstrapping a remote cluster, ensure you have completed the following prerequisites:

### Cluster Access

- **Check the context / kubeconfig**: Verify that your kubeconfig is pointing to the correct cluster where you want to deploy StackGen.
- **Install required tools**: Ensure that the `kubectl` and `helm` binaries are installed and accessible in your PATH.

### AWS-Specific Requirements (if applicable) [](/docs/aiden/1.0/deployment/private-saas/remote-cluster#aws-specific-requirements-if-applicable%20%22Direct%20link%20to%20AWS-Specific%20Requirements%20(if%20applicable)")

If you are deploying on AWS EKS:

- **Private subnet tags**: Check that the private subnets associated with your EKS cluster have the tag `kubernetes.io/role/internal-elb` set to `1`. This is required for internal load balancers to function correctly.
- **SSL Certificate**: If the load balancer certificate is being maintained in AWS Certificate Manager (ACM), send the associated ARN to the StackGen POC for configuration.

### Coordination with StackGen Team

important

This deployment process requires supervision from the StackGen team and is a collaborative step. Please coordinate with the StackGen team before proceeding with the bootstrap process to ensure proper setup and configuration.

## Install the Bootstrap Components

Installing Argo CD and Sealed Secrets

Argo CD is used as the remote agent to manage the cluster, providing GitOps-based continuous deployment capabilities. Along with it, Bitnami Sealed Secrets is used to securely transfer secrets to the cluster using public-key encryption.

### Bootstrap Script

Run the following script to install these two components:

```bash
curl -s https://raw.githubusercontent.com/devopsnow-deployments/tools/main/scripts/remote-cluster-bootstrap.sh | \
     bash -s \
      cluster_name=<cluster_name> \
      cluster_type=remote \
      cluster_provider=<cloud_provider> \
      cluster_region=<cluster_region> \
      namespace=devopsnow \
      opsverse_repo_username=<repo_username> \
      opsverse_repo_password=<repo_password> \
      opsverse_registry_username=<registry_username> \
      opsverse_registry_password=<registry_password> \
      opsverse_application_sourceRepoURL=https://github.com/devopsnow-deployments/<customer_name>.git
```

### Required Parameters

- **cluster\_name**: The name of your Kubernetes cluster
- **cluster\_type**: Set to `remote` for remote cluster deployments
- **cluster\_provider**: Your cloud provider (e.g., `aws`, `gcp`, `azure`)
- **cluster\_region**: The region where your cluster is located (e.g., `us-west-2`)
- **namespace**: The namespace where components will be installed (default: `devopsnow`)
- **opsverse\_repo\_username**: Repository username for accessing StackGen repositories
- **opsverse\_repo\_password**: Repository password (credentials have a short-lived TTL, generally 7 days)
- **opsverse\_registry\_username**: Container registry username
- **opsverse\_registry\_password**: Container registry password
- **opsverse\_application\_sourceRepoURL**: GitHub repository URL for your customer-specific deployment configurations

note

Values for `opsverse_repo_username`, `opsverse_repo_password`, `opsverse_registry_username`, and `opsverse_registry_password` are custom values for each customer. These credentials have a short-lived TTL (generally 7 days). Please reach out to StackGen POC to get these values.

### Substituting Placeholders

Substitute all placeholders (marked with `<>`) with the actual values for your deployment.

tip

The bootstrap script is publicly accessible for review at the GitHub repository URL shown in the command above.

### Example Command

For instance, if your cluster name is `opsverse-eks-cluster`, cluster provider is `aws`, cluster region is `us-west-2`, and customer name is `opsdemo`, the command would look like this:

```bash
curl -s https://raw.githubusercontent.com/devopsnow-deployments/tools/main/scripts/remote-cluster-bootstrap.sh | \
     bash -s \
      cluster_name=opsverse-eks-cluster \
      cluster_type=remote \
      cluster_provider=aws \
      cluster_region=us-west-2 \
      namespace=devopsnow \
      opsverse_repo_username="opsverse-user" \
      opsverse_repo_password="!DontRememberPassword" \
      opsverse_registry_username="opsverse-user" \
      opsverse_registry_password="!DontRememberPassword" \
      opsverse_application_sourceRepoURL=https://github.com/devopsnow-deployments/opsdemo.git
```

### Expected Output

The output is expected to be something like this:

```text
Validating input arguments ...

All required arguments are present. Continuing ...

Installing ArgoCD CRD

customresourcedefinition.apiextensions.k8s.io/applications.argoproj.io configured

Installing the bootstrap components to the namespace devopsnow ...

WARNING: Kubernetes configuration file is group-readable. This is insecure. Location: <redacted>

WARNING: Kubernetes configuration file is world-readable. This is insecure. Location: <redacted>

Release "remote-bootstrap-now" does not exist. Installing it now.

NAME: remote-bootstrap-now

LAST DEPLOYED: Tue Apr 23 19:56:18 2024

NAMESPACE: devopsnow

STATUS: deployed

REVISION: 1

TEST SUITE: None

NOTES:

--------------------------

StackGen Remote Bootstrap

--------------------------

Cluster boostrap has been completed successfully.

You can now register this cluster as a deployment target for StackGen

---- Some Important Links ---

Admin Console: <redacted>

Docs: https://docs.opsverse.io

Website: https://opsverse.io

Waiting for sealed-secrets component to create the key pair ...

Please send the following public key (base64 encoded) back to StackGen...

LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUV6VENDQXJXZ0F3SUJBZ0lSQU1LdDVQdiszczZob1paVjl2UXRyUVF3RFFZSktvWklodmNOQVFFTEJRQXcKQURBZUZ3MHlOREEwTWpNeE5ESTNORFZhRncwek5EQTBNakV4TkRJM05EVmFNQUF3Z2dJaU1BMEdDU3FHU0liMwpEUUVCQVFVQUE0SUNEd0F3Z2dJS0FvSUNBUUN5TURIYjJaYXFpQnhZRU5vYUN0TzQ0ZWxRMys1ekdvR0JPWmtNCkg5ZnZkanFTbStDek5kK0VrOXFFd0ZFbVdibjhkamdxZURWTU9aTlRVVjRadUFwNTdUZ0xoYnZwcExqVG1JeUcKSVEzaEtia0JzUnlqQldEUlJoS3hNZVNDdC9MK3BuL1JPcnJaV1NtK3AxbXVLcEgxS2JLS0gyajgrZk1qWXd6egoxM2dPQzhCRXAwNjJmOHVleEJ3cGNvVklHYjQ2OTVVY2RQM0p3VmFUME5aSmNJQk43TVRpZXZmWEY0UStLbmRKCm1zRGxzV3hXRlgrM3ZpTk9BSldEdjlDa3pSbXRsRGxBT3hHenY2OTlYRHlueTM2STIzVVoyd09SUDhFRnpUem8KSXIvdEtreFBIanlEWXhISEhYOVcwT0ZDa2Z2VXMyblB5NUk4ejhLZDYrU00ySkpBSWpnckJ3cDllUFlWSmxrawpxZno1a291bGhNckFjSWswcXpUdmpyMDRVYnlqeXQwdDcwcDNsTjFaNFB6ZEY3V0F2ZGNUd2REZUM4bU9sWTRiCjRVeW9QRTdUdTl3akVsVVNYbEY1VGtZYzkzMElXaTJlbUhWRUEwOVVETitoR2NlU2hrNGJTYXBhVm45K0cwK28KVmpmSk9KYmVRYmlkUFI1SXhjMjhVaWVSbUJ2dEdmWU9sTUMvblljcUg2UFRmUlQ2WVFQbXRNM0czc0tPa0t4OQpmSk5DRTBkT2FiZFA5RG8yZ0ppdkZJcGM0NmtJeFo1aGZzZ042U3FxeUluZm1rUjczQ0gwN0VpVWN3RzU2NXR2CjAyMmM5WWxYVGwxVVp2bGt0bWNIS2tqKzd5N3JabDF4cXEvRjVSb0hKZ2dGWUhnMjVsd2V4QnYvak1WbUlGQ28KQWJzNmp3SURBUUFCbzBJd1FEQU9CZ05WSFE4QkFmOEVCQU1DQUFFd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZApCZ05WSFE0RUZnUVVUNXkrNWpwaFBBK0dGL2N1WjlaUUhzek1PWXd3RFFZSktvWklodmNOQVFFTEJRQURnZ0lCCkFBSnlUa0VCeVFSenBhR0U0Z1FZYnNOOXl2ckR4OCtvRGpQWm1tbzBKNGFaMkcwMkJMaTNna0MwM3ZvNDdpbUwKTHhBalJUWi9RdzNvMjFraUlFV0NOdk0vcFp3SkphRUswWDZ1UEFTcmhHZEkwQnQ0d2xFVkMzRXJyOUp6NThnbwo5OS9HeGRzZkdKS3NmdnNmMzQ5MjFRdHlFMlJld1pmNzlIYm91MEtlb2Jhcm9EQ3UzcGpZY25ud2lyRlJ0amFwaDhyCmx6dWR0a1V6S0IyUk5WMWRHQ1ZhRVk4R2lzVDNOck9JQzNqVDlkVnRhcyttYkxuYStibS9SS1ROWmdrTisxREYKeWVzUTRJWlhMdDhObFpJRS9TYk51dG02UGtQZldrRDQwZTZHdnB3eGNRYTc2cmF6d00vWmhHOTROaWlMV0F0VgpuMjNaQmNRSmpwaTRMalpEWVJNUE1SS0d2QThsdjlLcWtoWjdSek5ua0lyRFZoNFJFZ3p2eHZtYVZNSW5MQ1Q3CktnVWNlaHZlRWI1dHVYOGZMczh4c1diS0JwYmgxd0p3NzFFMG9lYnMvOWpVRXhXbHJwNFpqQ1Bod0h1WGo2bWEKUW1qTmwydGxKMmRLdGRyL2FzZmtqYmFGRlNERmhzZjQyMlRGRmkzM3Q1cnYxUisvRm14T0J0TWVXYi9uWUhjc2YKZXdxd2VOYUpsWGl2TE8xUWhUR2R5TytBcVhHbUYvMGNmVGhjbkNvNDcwZjNucVNlbG1lVVA0Q04vSml5akV5VwpzN1FLZlVPd240aCRqZkhGcEhWbjQ3cURoN0dVK00wbXRIYnEwaG41djJZTkV4djJ2bXIrY0tYdmZMWHgxLwpBeWw0R2FrK0sxQzhTTkJHWEgvZEJyQXpRYnIzcElvY2Zack4rd0hzYjlWdQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
```

### Public Key Submission

The above command generates a key pair in the remote cluster. **Send the public key back to the StackGen POC** to complete the secure secret transfer setup.

### Additional Components

Also, when ArgoCD is fully up, it will automatically pull the following additional components and deploy:

- **nginx-ingress controller**: Provides ingress capabilities for external access to services
- **Jaeger, Prometheus and Victoria Metrics operators**: Observability and monitoring operators
- **StackGen agent**: The StackGen agent for cluster management and monitoring

## Check the Status

Verifying Bootstrap Component Status

After running the bootstrap script, verify that all components are running correctly.

### Check Pod Status

The status of the bootstrap components can be checked with the following command:

```bash
kubectl get pods -n devopsnow
```

You can also check pods in the `opsverse` namespace:

```bash
kubectl get pods -n opsverse
```

### Expected Pod Status

You should see output similar to the following, with all pods in `Running` status:

```text
NAME                                                              READY   STATUS    RESTARTS   AGE

devopsnow-agent-agent-ct2zf                                       1/1     Running   0          136m

devopsnow-agent-agent-dmlq4                                       1/1     Running   0          136m

devopsnow-agent-agent-swq2s                                       1/1     Running   0          136m

devopsnow-agent-kubestatemetrics-5c9df46dcc-9jls4                 1/1     Running   0          10h

operators-now-jaeger-operator-869c5b7c6b-wwqnz                    1/1     Running   0          10h

operators-now-prometheus-o-operator-65bc895dbb-8bhbm              1/1     Running   0          10h

operators-now-vmop-d99957474-cd7kp                                1/1     Running   0          10h

remote-bootstrap-now-argocd-application-controller-b47b5c7qvjcv   1/1     Running   0          10h

remote-bootstrap-now-argocd-redis-576c9468d7-62qzf                1/1     Running   0          10h

remote-bootstrap-now-argocd-repo-server-86f6b58cc4-rn6rt          1/1     Running   0          10h

remote-bootstrap-now-argocd-server-7cfdbb6569-7x9qm               1/1     Running   0          10h

remote-bootstrap-now-sealedsecrets-787cfb47dc-6zxpm               1/1     Running   0          10h
```

### Troubleshooting

If any pods are not in `Running` status, check the pod logs:

```bash
kubectl logs <pod-name> -n <namespace>
```

## Enable the Argo CD UI

Accessing Argo CD User Interface

The Argo CD UI provides a web-based interface to monitor and manage your GitOps deployments.

### Port Forwarding

Running the following command will make the Argo CD UI accessible on `https://localhost:8001`:

```bash
kubectl port-forward -n opsverse svc/remote-bootstrap-now-argocd-server 8001:80
```

### Login Credentials

- **Username**: `admin`
- **Password**: Please reach out to StackGen POC for the default password.

note

The Argo CD UI allows you to view the status of all applications managed by Argo CD, including the bootstrap components and any StackGen applications deployed to the cluster.

## Deploy the Observability Stack

Deploying the Observability Stack

The observability stack deployment is performed by a StackGen admin remotely, using the inputs provided by the customer.

### Required Inputs

The following details are required for deploying the observability stack:

1. **DNS Names**: The DNS names that will be used to access the observability services
2. **Object Storage Bucket**: Name of the object storage bucket to be used for log storage (e.g., S3 bucket, GCS bucket, or Azure storage container)
3. **IAM Access**: ARN of the role with access to the S3 bucket (or GCP IAM Service Account or Azure storage account key)

### Deployment Process

The deployment is done by the StackGen admin remotely by pushing the deployment configs to the GitHub repo that is polled by the Argo CD agent. The Argo CD agent will automatically detect the changes and deploy the observability stack to your cluster.

### DNS Configuration

After deployment, you need to configure DNS entries to point to your cluster's ingress controller.

#### Find the Load Balancer Hostname

Find out the host name of the nginx-ingress LoadBalancer using the following command:

```bash
echo `kubectl get svc -n nginx-ingress nginx-ingress-now-ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'`
```

#### Configure DNS Records

Set the above host name as a CNAME record for all the DNS entries identified in the previous step. This will route traffic from your DNS names to the ingress controller in your cluster.

## Access Grafana

Accessing Grafana Dashboard

Grafana provides the visualization interface for your observability data.

### Accessing Grafana

Access the Grafana URL in a browser using the DNS name configured in the previous step.

### Authentication

- **SSO Login**: SSO can be used to login to Grafana. By default, SSO-based users are granted Viewer permission in Grafana.
- **Admin Access**: This permission can be changed by logging in as the admin user.

### Retrieve Admin Password

To find out the admin user's password, run the following command:

```bash
echo `kubectl get secret -n <orgName>-<instanceName>-observe grafana-secret -o jsonpath='{.data.admin-password}' | base64 -D`
```

Replace `<orgName>` and `<instanceName>` with your actual organization and instance names.

tip

The admin user has full permissions to manage Grafana, including creating dashboards, configuring data sources, and managing user permissions.

## Collect Telemetry and Start Observing

Begin Collecting Telemetry Data

At this point, your observability backend is fully ready to receive telemetry data.

### Next Steps

Follow the steps under the collection section to collect telemetry from your infrastructure. This typically involves:

1. **Configuring data sources**: Set up connections to your applications and infrastructure
2. **Installing agents**: Deploy collection agents where needed
3. **Configuring exporters**: Set up exporters for various systems and applications
4. **Verifying data flow**: Confirm that telemetry data is being received and processed

### Documentation

Refer to the StackGen documentation for detailed instructions on collecting telemetry from different sources and systems.

- [Prerequisites](/docs/aiden/1.0/deployment/private-saas/remote-cluster#prerequisites)
  - [Cluster Access](/docs/aiden/1.0/deployment/private-saas/remote-cluster#cluster-access)
  - [AWS-Specific Requirements (if applicable)](/docs/aiden/1.0/deployment/private-saas/remote-cluster#aws-specific-requirements-if-applicable)
  - [Coordination with StackGen Team](/docs/aiden/1.0/deployment/private-saas/remote-cluster#coordination-with-stackgen-team)
- [Install the Bootstrap Components](/docs/aiden/1.0/deployment/private-saas/remote-cluster#install-the-bootstrap-components)
  - [Bootstrap Script](/docs/aiden/1.0/deployment/private-saas/remote-cluster#bootstrap-script)
  - [Required Parameters](/docs/aiden/1.0/deployment/private-saas/remote-cluster#required-parameters)
  - [Substituting Placeholders](/docs/aiden/1.0/deployment/private-saas/remote-cluster#substituting-placeholders)
  - [Example Command](/docs/aiden/1.0/deployment/private-saas/remote-cluster#example-command)
  - [Expected Output](/docs/aiden/1.0/deployment/private-saas/remote-cluster#expected-output)
  - [Public Key Submission](/docs/aiden/1.0/deployment/private-saas/remote-cluster#public-key-submission)
  - [Additional Components](/docs/aiden/1.0/deployment/private-saas/remote-cluster#additional-components)
- [Check the Status](/docs/aiden/1.0/deployment/private-saas/remote-cluster#check-the-status)
  - [Check Pod Status](/docs/aiden/1.0/deployment/private-saas/remote-cluster#check-pod-status)
  - [Expected Pod Status](/docs/aiden/1.0/deployment/private-saas/remote-cluster#expected-pod-status)
  - [Troubleshooting](/docs/aiden/1.0/deployment/private-saas/remote-cluster#troubleshooting)
- [Enable the Argo CD UI](/docs/aiden/1.0/deployment/private-saas/remote-cluster#enable-the-argo-cd-ui)
  - [Port Forwarding](/docs/aiden/1.0/deployment/private-saas/remote-cluster#port-forwarding)
  - [Login Credentials](/docs/aiden/1.0/deployment/private-saas/remote-cluster#login-credentials)
- [Deploy the Observability Stack](/docs/aiden/1.0/deployment/private-saas/remote-cluster#deploy-the-observability-stack)
  - [Required Inputs](/docs/aiden/1.0/deployment/private-saas/remote-cluster#required-inputs)
  - [Deployment Process](/docs/aiden/1.0/deployment/private-saas/remote-cluster#deployment-process)
  - [DNS Configuration](/docs/aiden/1.0/deployment/private-saas/remote-cluster#dns-configuration)
- [Access Grafana](/docs/aiden/1.0/deployment/private-saas/remote-cluster#access-grafana)
  - [Accessing Grafana](/docs/aiden/1.0/deployment/private-saas/remote-cluster#accessing-grafana)
  - [Authentication](/docs/aiden/1.0/deployment/private-saas/remote-cluster#authentication)
  - [Retrieve Admin Password](/docs/aiden/1.0/deployment/private-saas/remote-cluster#retrieve-admin-password)
- [Collect Telemetry and Start Observing](/docs/aiden/1.0/deployment/private-saas/remote-cluster#collect-telemetry-and-start-observing)
  - [Next Steps](/docs/aiden/1.0/deployment/private-saas/remote-cluster#next-steps)
  - [Documentation](/docs/aiden/1.0/deployment/private-saas/remote-cluster#documentation)
