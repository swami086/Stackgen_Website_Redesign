---
title: "Overview"
product: "aiden"
sourcePath: "/aiden/1.0/deployment/self-hosted"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/deployment/self-hosted"
status: "ok"
---

The option to self-host StackGen Aiden within a your cloud is available if you're an enterprise customers. Please work with your customer success representative to get this enabled.

Aiden can be run within your cloud on a self-hosted model. This deployment model gives you full control over your infrastructure while leveraging StackGen's capabilities.

## Overview

Self-hosting StackGen allows you to deploy and manage the entire StackGen stack within your own Kubernetes cluster, providing enhanced control, security, and compliance capabilities.

## Deployment Steps

Following are the high-level steps involved in self-hosting Aiden:

1. **Prepare a Kubernetes cluster**: Set up a K8s cluster based on the [cluster requirements](/docs/aiden/1.0/deployment/self-hosted/cluster-requirements).
2. **Configure container registry** (optional): Pull the required container images into a private container registry for enhanced security and compliance.
3. **Generate Helm values**: Run the StackGen installer to generate the Helm values file with your specific configuration.
4. **Install the stack**: Use Helm to install the Aiden on your cluster.

## Guides

Prepare your cluster, optionally mirror images to a private registry, then run the installer and Helm steps to bring up Aiden.

- [**Cluster requirements**\\
\\
Kubernetes prerequisites, sizing, and examples (managed clusters such as EKS, AKS, or GKE, or any cluster that meets the documented requirements).](/docs/aiden/1.0/deployment/self-hosted/cluster-requirements)
- [**Docker and private registry**\\
\\
Optional: pull Aiden container images into a private registry (for example AWS ECR) using the image-override workflow.](/docs/aiden/1.0/deployment/self-hosted/docker)
- [**Installation**\\
\\
Download the config generator, produce Helm values, and install the stack with Helm after your cluster is ready.](/docs/aiden/1.0/deployment/self-hosted/installation)
