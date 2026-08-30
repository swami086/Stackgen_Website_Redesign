---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/civo"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/civo"
status: "ok"
---

Connect Aiden with your Civo account to get intelligent assistance with Kubernetes cluster management and cloud operations. Once enabled, Aiden can help you inspect resources, manage clusters, and automate routine cloud tasks through natural conversations.

Civo is a cloud platform built around fast, managed Kubernetes. By integrating Civo with Aiden, you can query and operate your Civo resources conversationally instead of switching between the dashboard and CLI.

## Integration Capabilities

With Civo integration, Aiden can:

- Query resource information using natural language.
- Manage Kubernetes clusters.
- Monitor cluster health and performance.
- Automate cloud operations.
- Create self-service workflows.

## Enable Civo Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active Civo account with appropriate permissions.
- You can generate an API key from your Civo account.

### Generate Civo API Key

To integrate with Aiden, you will need an API key from your Civo account:

1. Log in to your Civo account.
2. Go to **Account Settings** and open the **Security** section.
3. Copy your **API Key** (or regenerate it if needed).

Important

Store your API key securely. Treat it like a password and rotate it if you suspect it has been exposed.

### Steps to Enable Civo Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the Civo Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `Civo, Prod`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **API Key**: The API key you copied from your Civo account.
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the Civo integration:

- List all my Kubernetes clusters in Civo.
- What is the health status of the `production` cluster?
- Show me the node pools and sizes for the `staging` cluster.
- Which clusters are running in the LON1 region?
- Summarize the resources running in my Civo account.

## Additional References

- [Civo API Documentation](https://www.civo.com/api)
- [Civo Documentation](https://www.civo.com/docs)

- [Integration Capabilities](/docs/aiden/1.0/integrations/civo#integration-capabilities)
- [Enable Civo Integration](/docs/aiden/1.0/integrations/civo#enable-civo-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/civo#prerequisites)
  - [Generate Civo API Key](/docs/aiden/1.0/integrations/civo#generate-civo-api-key)
  - [Steps to Enable Civo Integration](/docs/aiden/1.0/integrations/civo#steps-to-enable-civo-integration)
