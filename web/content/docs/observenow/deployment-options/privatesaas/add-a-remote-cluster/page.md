---
title: "Bootstrap the remote cluster"
product: "observenow"
sourcePath: "/observenow/deployment-options/privatesaas/add-a-remote-cluster"
sourceUrl: "https://docs.stackgen.com/observenow/deployment-options/privatesaas/add-a-remote-cluster"
status: "ok"
---

## Bootstrap the remote cluster

StackGen supports deployments to remote clusters hosted and managed by the customer ( _also referred to as "Private SaaS" or "Remote"_). This section has the steps to bootstrap a new remote cluster.

Once a remote cluster is bootstrapped, it can be used to deploy any of the StackGen apps.

## Prerequisites

- Check the context / kubeconfig and make sure that it is pointing to the right cluster.
- Ensure that the `kubectl` and `helm` binaries are installed.
- **(AWS Only)** Check that the private subnets associated with this EKS cluster have the tag `kubernetes.io/role/internal-elb` set to `1`
- ( **AWS Only)** SSL Cert: If the load balancer cert is being maintained in AWS ACM, send the associated ARN to the StackGen POC.

info

Please note that this needs supervision from the StackGen team and is a collaborative step. Please coordinate with the StackGen team before proceeding further.

## Install the bootstrap components

`Argo CD` is used as the remote agent to manage the cluster. Along with it, `Bitnami Sealed Secrets` is used to securely transfer secrets to the cluster. Run the following script to install these two components.

```curl
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

info

Values for keys `opsverse_repo_username`, `opsverse_repo_password`, `opsverse_registry_username`, and `opsverse_registry_password` are custom values for each customer. Credentials have a short-lived TTL ( _Generally 7 days_). Please reach out to StackGen POC to get these values.

Substitute the placeholders ( _Mentioned as <>_) with the actual values.

The [script](https://raw.githubusercontent.com/devopsnow-deployments/tools/main/scripts/remote-cluster-bootstrap.sh) is publicly accessible for review

For instance, following is the command if the cluster name is `opsverse-eks-cluster`, cluster\_provider is `aws`, cluster\_region is `us-west-2`, opsverse\_repo\_username is `opsverse-user`, opsverse\_repo\_password is `!DontRememberPassword`, opsverse\_registry\_username is `opsverse-user` , `opsverse_registry_password` is `!DontRememberPassword` and customer name is `opsdemo`

```shell
curl -s https://raw.githubusercontent.com/devopsnow-deployments/tools/main/scripts/remote-cluster-bootstrap.sh | \

     bash -s \

      cluster_name=opsverse-eks-cluster \

      cluster_type=remote \

      cluster_provider=aws \

      cluster_region=us-wast-2 \

      namespace=devopsnow \

      opsverse_repo_username="opsverse-user" \

      opsverse_repo_password="!DontRememberPasswor" \

      opsverse_repo_username="robot\$corcentric-bootstrap" \

      opsverse_registry_username="opsverse-user" \

      opsverse_registry_password="!DontRememberPasswor" \

      opsverse_application_sourceRepoURL=https://github.com/devopsnow-deployments/opsdemo.git
```

The output is expected to be something like this:

```shell
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

OpsVerse Remote Bootstrap

--------------------------

Cluster bootstrap has been completed successfully.

You can now register this cluster as a deployment target for OpsVerse

---- Some Important Links ---

Admin Console: <redacted>

Docs: https://docs.opsverse.io

Website: https://opsverse.io

Waiting for sealed-secrets component to create the key pair ...

Please send the following public key (base64 encoded) back to OpsVerse...

LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUV6VENDQXJXZ0F3SUJBZ0lSQU1LdDVQdiszczZob1paVjl2UXRyUVF3RFFZSktvWklodmNOQVFFTEJRQXcKQURBZUZ3MHlOREEwTWpNeE5ESTNORFZhRncwek5EQTBNakV4TkRJM05EVmFNQUF3Z2dJaU1BMEdDU3FHU0liMwpEUUVCQVFVQUE0SUNEd0F3Z2dJS0FvSUNBUUN5TURIYjJaYXFpQnhZRU5vYUN0TzQ0ZWxRMys1ekdvR0JPWmtNCkg5ZnZkanFTbStDek5kK0VrOXFFd0ZFbVdibjhkamdxZURWTU9aTlRVVjRadUFwNTdUZ0xoYnZwcExqVG1JeUcKSVEzaEtia0JzUnlqQldEUlJoS3hNZVNDdC9MK3BuL1JPcnJaV1NtK3AxbXVLcEgxS2JLS0gyajgrZk1qWXd6egoxM2dPQzhCRXAwNjJmOHVleEJ3cGNvVklHYjQ2OTVVY2RQM0p3VmFUME5aSmNJQk43TVRpZXZmWEY0UStLbmRKCm1zRGxzV3hXRlgrM3ZpTk9BSldEdjlDa3pSbXRsRGxBT3hHenY2OTlYRHlueTM2STIzVVoyd09SUDhFRnpUem8KSXIvdEtreFBIanlEWXhISEhYOVcwT0ZDa2Z2VXMyblB5NUk4ejhLZDYrU00ySkpBSWpnckJ3cDllUFlWSmxrawpxZno1a291bGhNckFjSWswcXpUdmpyMDRVYnlqeXQwdDcwcDNsTjFaNFB6ZEY3V0F2ZGNUd2REZUM4bU9sWTRiCjRVeW9QRTdUdTl3akVsVVNYbEY1VGtZYzkzMElXaTJlbUhWRUEwOVVETitoR2NlU2hrNGJTYXBhVm45K0cwK28KVmpmSk9KYmVRYmlkUFI1SXhjMjhVaWVSbUJ2dEdmWU9sTUMvblljcUg2UFRmUlQ2WVFQbXRNM0czc0tPa0t4OQpmSk5DRTBkT2FiZFA5RG8yZ0ppdkZJcGM0NmtJeFo1aGZzZ042U3FxeUluZm1rUjczQ0gwN0VpVWN3RzU2NXR2CjAyMmM5WWxYVGwxVVp2bGt0bWNIS2tqKzd5N3JabDF4cXEvRjVSb0hKZ2dGWUhnMjVsd2V4QnYvak1WbUlGQ28KQWJzNmp3SURBUUFCbzBJd1FEQU9CZ05WSFE4QkFmOEVCQU1DQUFFd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZApCZ05WSFE0RUZnUVVUNXkrNWpwaFBBK0dGL2N1WjlaUUhzek1PWXd3RFFZSktvWklodmNOQVFFTEJRQURnZ0lCCkFBSnlUa0VCeVFSenBhR0U0Z1FZYnNOOXl2ckR4OCtvRGpQWm1tbzBKNGFaMkcwMkJMaTNna0MwM3ZvNDdpbUwKTHhBalJUWi9RdzNvMjFraUlFV0NOdk0vcFp3SkphRUswWDZ1UEFTcmhHZEkwQnQ0d2xFVkMzRXJyOUp6NThnbwo5OS9HeGRzZkdKS3NmdnNmMzQ5MjFRdHlFMlJld1pmNzlIYm91MEtlb2Jhcm9EQ3UzcGpZY25ud2lyRlJ0amFwaDhyCmx6dWR0a1V6S0IyUk5WMWRHQ1ZhRVk4R2lzVDNOck9JQzNqVDlkVnRhcyttYkxuYStibS9SS1ROWmdrTisxREYKeWVzUTRJWlhMdDhObFpJRS9TYk51dG02UGtQZldrRDQwZTZHdnB3eGNRYTc2cmF6d00vWmhHOTROaWlMV0F0VgpuMjNaQmNRSmpwaTRMalpEWVJNUE1SS0d2QThsdjlLcWtoWjdSek5ua0lyRFZoNFJFZ3p2eHZtYVZNSW5MQ1Q3CktnVWNlaHZlRWI1dHVYOGZMczh4c1diS0JwYmgxd0p3NzFFMG9lYnMvOWpVRXhXbHJwNFpqQ1Bod0h1WGo2bWEKUW1qTmwydGxKMmRLdGRyL2FzZmtqYmFGRlNERmhzZjQyMlRGRmkzM3Q1cnYxUisvRm14T0J0TWVXYi9uWUhjc2YKZXdxd2VOYUpsWGl2TE8xUWhUR2R5TytBcVhHbUYvMGNmVGhjbkNvNDcwZjNucVNlbG1lVVA0Q04vSml5akV5VwpzN1FLZlVPd240aCRqZkhGcEhWbjQ3cURoN0dVK00wbXRIYnEwaG41djJZTkV4djJ2bXIrY0tYdmZMWHgxLwpBeWw0R2FrK0sxQzhTTkJHWEgvZEJyQXpRYnIzcElvY2Zack4rd0hzYjlWdQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
```

The above command generates a key pair in the remote cluster. Send the public key back to the StackGen POC.

Also, when `ArgoCD` is fully up, it will automatically pull the following additional components and deploy:

- `nginx-ingress` controller
- Jaeger, Prometheus and Victoria Metrics operators
- StackGen agent

## Check the status

The status of the bootstrap components can be checked with the following commands:

```text
kubectl get pods -n devopsnow
```

```shell
$ kubectl get pods -n opsverse

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

### Enable the Argo CD UI and check the apps

Running the following command will make the Argo CD UI accessible on [https://localhost:8001](https://localhost:8001/)

```shell
kubectl port-forward -n opsverse svc/remote-bootstrap-now-argocd-server 8001:80
```

Use `admin` as the username and please reach out to StackGen POC for the default password.

## Deploy the observability stack

info

The deployment will happen by an StackGen admin through the below inputs by the customer

### Input

The following details are required for deploying the observability stack:

- DNS Names
- Name of the object storage bucket to be used for log storage (e.g., S3 bucket, GCS bucket, or Azure storage container)
- ARN of the role with access to this S3 bucket (or GCP IAM Service Account or Azure storage account key)

### Deployment

This is done by the StackGen admin remotely by pushing the deployment configs to the GitHub repo polled by the `Argo CD` agent.

### DNS entries

Find out the host name of the `nginx-ingress``LoadBalancer` using the following command:

```shell
echo `kubectl get svc -n nginx-ingress nginx-ingress-now-ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'`
```

Set the above host name as a CNAME record for all the DNS entries identified in the previous step.

### Access Grafana

Access the grafana URL in a browser. SSO can be used to login to Grafana. By default, SSO based users are granted `Viewer` permission in Grafana. This permission can be changed by logging in as the `admin` user. To find out the `admin` users password, run the following command:

```shell
echo `kubectl get secret -n <orgName>-<instanceName>-observe grafana-secret -o jsonpath='{.data.admin-password}' | base64 -D`
```

## Collect telemetry and start observing

At this point, your observability backend is fully ready to receive telemetry data. Follow the steps under the [collection](/docs/observenow/collecting-telemetry/overview) section to collect telemetry from your infrastructure.

- [Bootstrap the remote cluster](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#bootstrap-the-remote-cluster)
- [Prerequisites](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#prerequisites)
- [Install the bootstrap components](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#install-the-bootstrap-components)
- [Check the status](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#check-the-status)
  - [Enable the Argo CD UI and check the apps](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#enable-the-argo-cd-ui-and-check-the-apps)
- [Deploy the observability stack](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#deploy-the-observability-stack)
  - [Input](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#input)
  - [Deployment](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#deployment)
  - [DNS entries](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#dns-entries)
  - [Access Grafana](/docs/observenow/deployment-options/privatesaas/add-a-remote-cluster#access-grafana)
