---
title: "First Time Installation"
product: "aiden"
sourcePath: "/aiden/1.0/deployment/self-hosted/installation"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/deployment/self-hosted/installation"
status: "ok"
---

Once you have a new Kubernetes cluster created as per the guidelines provided in the [Cluster Requirements](/docs/aiden/1.0/deployment/self-hosted/cluster-requirements) document, you can install Aiden using the following steps.

## First Time Installation

### Step 1: Download Config Generator

Download the config generator for your operating system and architecture:

- **Linux AMD64**: [opsverse-config-generator-linux-amd64](https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-linux-amd64)
- **Linux ARM64**: [opsverse-config-generator-linux-arm64](https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-linux-arm64)
- **macOS AMD64**: [opsverse-config-generator-darwin-amd64](https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-darwin-amd64)
- **macOS ARM64**: [opsverse-config-generator-darwin-arm64](https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-darwin-arm64)
- **Windows AMD64**: [opsverse-config-generator-windows-amd64.exe](https://opsverse-public.s3.amazonaws.com/self-host/LATEST/opsverse-config-generator-windows-amd64.exe)

### Step 2: Run the Config Generator

Run the following command and follow the instructions on your screen:

```bash
./opsverse-config-generator-<os>-<architecture>
```

At the end of the process, you will be presented with two `values.yaml` files, which will be preconfigured with all the base configurations required for installing Aiden.

important

Save the `values.yaml` file since it contains all the configuration for your Aiden deployment and will be required when you want to update components/versions or upgrade Aiden components. It can also be committed to git if you want to follow a GitOps workflow.

### Step 3: Install the Operators

Install the operators required for your stack by running the following Helm install command against your cluster with one of the config files generated in the previous step:

```bash
helm upgrade --install operators-now -n observe --create-namespace opsverse-operators --repo https://<username>:<password>@registry.devopsnow.io/chartrepo/internal -f operator-values.yaml
```

info

Make sure to replace `<username>` and `<password>` above with the credentials you have received from your StackGen Customer Success representative.

### Step 4: Install Aiden

Installing Aiden is now simply a matter of running the Helm install command against your cluster with the other config file generated in Step 2:

```bash
helm upgrade --install <custname>-<stackname> -n observe --create-namespace opsverse-onow --repo https://<username>:<password>@registry.devopsnow.io/chartrepo/internal -f values.yaml
```

info

Make sure to replace `<username>` and `<password>` above with the credentials you have received from your StackGen Customer Success representative.

That's it! If you look at your cluster, you should see Aiden components coming up. Give it a few minutes to ensure all pods are up and running.

### Step 5: Add DNS Entries

The Helm command should also provide a list of ingresses created that need to be added to your DNS service (e.g., Route53). You can also run the following command to get a list of ingresses along with the address to use for your DNS service:

```bash
kubectl get ingress -A
```

Once you add your ingresses to DNS and let DNS propagate, you should be able to access different components of Aiden from your browser.

warning

Make sure your Certificate ACM ARN is correct in the config, otherwise your HTTPS endpoints may fail with a certificate error.

## Making Updates

Since everything is driven by Helm charts, making updates is as simple as updating the `values.yaml` file you created in the previous steps and re-running the Helm install command again. Charts can also be updated using the `helm repo update` command to ensure you are always running the latest chart version.

note

Make sure to review the compatibility and deprecations in new chart versions to ensure you don't end up pushing breaking changes to your Aiden deployment.

- [First Time Installation](/docs/aiden/1.0/deployment/self-hosted/installation#first-time-installation)
  - [Step 1: Download Config Generator](/docs/aiden/1.0/deployment/self-hosted/installation#step-1-download-config-generator)
  - [Step 2: Run the Config Generator](/docs/aiden/1.0/deployment/self-hosted/installation#step-2-run-the-config-generator)
  - [Step 3: Install the Operators](/docs/aiden/1.0/deployment/self-hosted/installation#step-3-install-the-operators)
  - [Step 4: Install Aiden](/docs/aiden/1.0/deployment/self-hosted/installation#step-4-install-aiden)
  - [Step 5: Add DNS Entries](/docs/aiden/1.0/deployment/self-hosted/installation#step-5-add-dns-entries)
