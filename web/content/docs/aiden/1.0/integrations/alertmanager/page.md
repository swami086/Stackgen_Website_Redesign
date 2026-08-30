---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/alertmanager"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/alertmanager"
status: "ok"
---

Connect Aiden with your Prometheus Alertmanager to get intelligent assistance with inspecting active alerts, managing silences, and understanding how alerts are routed. Once enabled, Aiden can explain what is firing, why it is firing, and where notifications are being sent, all through natural conversations.

Alertmanager handles alerts sent by Prometheus, taking care of deduplication, grouping, silencing, and routing to the right receivers. By integrating Alertmanager with Aiden, you can interrogate your alerting state conversationally instead of navigating the Alertmanager UI or hand-parsing its configuration.

## Integration Capabilities

With AlertManager integration, Aiden can:

- List and inspect active alerts.
- List, create, and expire silences.
- List configured receivers.
- Inspect the Alertmanager configuration and routing tree.

## Enable AlertManager Integration

### Prerequisites

Before enabling the integration, ensure:

- You have a running Prometheus Alertmanager instance.
- Aiden can reach the Alertmanager URL from its network.
- You have any authentication headers required to access the Alertmanager API (if your instance is protected).

### Steps to Enable AlertManager Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the AlertManager Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `AlertManager, Prod`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **AlertManager URL**: The base URL of your Alertmanager instance (for example, `https://alertmanager.example.com`).
   - **Headers** (optional): Any HTTP headers required to authenticate with your Alertmanager API, such as an authorization header.
   - **Query Timeout (seconds)** (optional): Maximum time to wait for Alertmanager responses. Defaults to 30 seconds and can be set between 30 and 300 seconds.
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the AlertManager integration:

**Active Alerts:**

- Show me all active alerts in Alertmanager.
- Which critical alerts are currently firing?
- List the alerts for the `payments` service.

**Silences:**

- List all active silences.
- Create a silence for `alertname="HighCPU"` for the next 2 hours.
- Expire silence `<silence-id>`.

**Receivers and Routing:**

- List all configured receivers.
- Show me the Alertmanager routing tree.
- Which receiver handles alerts with severity `critical`?

## Limitations

- Routing tree inspection does not simulate routing for a specific label set.

## Additional References

- [Prometheus Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)
- [Alertmanager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/alertmanager#integration-capabilities)
- [Enable AlertManager Integration](/docs/aiden/1.0/integrations/alertmanager#enable-alertmanager-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/alertmanager#prerequisites)
  - [Steps to Enable AlertManager Integration](/docs/aiden/1.0/integrations/alertmanager#steps-to-enable-alertmanager-integration)
