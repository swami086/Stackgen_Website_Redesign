---
title: "Self Hosted"
product: "observenow"
sourcePath: "/observenow/deployment-options/self-hosted"
sourceUrl: "https://docs.stackgen.com/observenow/deployment-options/self-hosted"
status: "ok"
---

tip

Option to self host the StackGen products within your cloud is available for our enterprise customers. Please work with your customer success rep to get this enabled.

StackGen products can be run within customer's cloud in a self-hosted model. Following are the high level steps involved in self hosting the StackGen stack:

- Prepare a K8s cluster based on these cluster requirements \[ [doc](/docs/observenow/deployment-options/self-hosted/cluster-requirements)\]
- Optionally, pull the required container images into a private container registry
- Run the StackGen installer and generate the helm values file
- Use helm to install the stack
