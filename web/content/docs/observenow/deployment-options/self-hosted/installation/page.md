---
title: "First Time Installation"
product: "observenow"
sourcePath: "/observenow/deployment-options/self-hosted/installation"
sourceUrl: "https://docs.stackgen.com/observenow/deployment-options/self-hosted/installation"
status: "ok"
---

Once you have a new K8s Cluster created as per the guidelines provided in the Cluster Requirements doc, installing any StackGen stack can be done using the following steps:

## First Time Installation

### Download Config Generator

Download the config generator:

```shell
# Linux AMD64

https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-linux-amd64

# Linux ARM64

https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-linux-arm64

# OSX AMD64

https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-darwin-amd64

# OSX ARM64

https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-darwin-arm64

# Windows AMD64

https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-windows-amd64.exe
```

### Run the Config Generator

Run the following command and follow instructions on your screen

```shell
./opsverse-config-generator-<os>-<architecture>
```

At the end of the process, you will be presented with two `values.yaml` files, which will be preconfigured with all the base configurations required for installing your StackGen stack

info

Save this `values.yaml` file since it will contain all the configuration for your StackGen stack and will be required when you want to update components/versions or upgrade ObserveNow components. It can also be committed to git if you want to follow a GitOps workflow

### Install the Operators

Install the operators required for your stack by running the following `helm install` against your cluster with one of the config files generated in the previous step.

```yaml
 helm upgrade  --install operators-now -n observe --create-namespace opsverse-operators --repo https://<username>:<password>@registry.devopsnow.io/chartrepo/internal -f operator-values.yaml
```

warning

Make sure to replace username/password above with the credentials you have received from your StackGen Onboarding Representative

### Install the Stack

Installing your StackGen stack is now simply a matter of running `helm install` against your cluster with the other config file generated in the previous step.

```yaml
 helm upgrade  --install <custname>-<stackname> -n observe --create-namespace opsverse-onow --repo https://<username>:<password>@registry.devopsnow.io/chartrepo/internal -f values.yaml
```

warning

Make sure to replace username/password above with the credentials you have received from your StackGen Onboarding Representative

That's it! If you look at your cluster, you should see StackGen components coming up. Give it a few minutes to ensure all pods are up and running.

### Add DNS Entries

The helm command should also give a list of ingresses created that need to be added to your DNS service ( _eg._ [_Route53_](https://aws.amazon.com/route53/) ). You can also run `kubectl get ingress -A` to get a list of ingresses along with the address to use for your DNS service.

Once you add your ingresses to DNS and let DNS propagate, you should be able to access different components of your StackGen stack from your browser.

info

Make sure your Certificate ACM ARN is correct in the config, otherwise your HTTPS endpoints may fail with a certificate error.

## Making Updates

Since everything is driven by helm charts, making updates is as simple as updating the `values.yaml` file you had created in the previous steps and re-running the `helm install` command again. Charts can also be updated using `helm repo update` command to ensure you are always running the latest chart version. Make sure to look at the compatibility and deprecations in new chart versions to ensure you don't end up pushing breaking changes to your StackGen stack.

- [First Time Installation](/docs/observenow/deployment-options/self-hosted/installation#first-time-installation)
  - [Download Config Generator](/docs/observenow/deployment-options/self-hosted/installation#download-config-generator)
  - [Run the Config Generator](/docs/observenow/deployment-options/self-hosted/installation#run-the-config-generator)
  - [Install the Operators](/docs/observenow/deployment-options/self-hosted/installation#install-the-operators)
  - [Install the Stack](/docs/observenow/deployment-options/self-hosted/installation#install-the-stack)
  - [Add DNS Entries](/docs/observenow/deployment-options/self-hosted/installation#add-dns-entries)
