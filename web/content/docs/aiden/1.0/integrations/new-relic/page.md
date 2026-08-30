---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/new-relic"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/new-relic"
status: "ok"
---

Connect Aiden with your New Relic account to get intelligent assistance with application performance monitoring, infrastructure observability, and telemetry analysis. Once enabled, Aiden can query your data, investigate errors and traces, and correlate signals across your stack as naturally as discussing them with an SRE or platform engineer.

New Relic is an observability platform that unifies metrics, events, logs, and traces from across your applications and infrastructure. By integrating New Relic with Aiden, you can ask questions in plain language, run NRQL analysis, and move from a symptom to a root cause without leaving the conversation.

Beta

The New Relic integration is currently in beta.

## Integration Capabilities

With New Relic integration, Aiden can:

- Query telemetry with NRQL across metrics, logs, spans, and events.
- Look up entities such as services, hosts, browsers, and lambdas.
- Inspect alert policies, conditions, and issues.
- Investigate APM errors and traces.
- Correlate logs and traces by entity GUID or service name.

## Enable New Relic Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active New Relic account with appropriate permissions.
- You know which region (US or EU) hosts your New Relic account.
- You can create a User API key from your New Relic account.

### Generate New Relic User API Key

To integrate with Aiden, you will need a User API key from your New Relic account:

1. Log in to your New Relic account.
2. Open the user menu and go to **API keys**.
3. Create a new **User key** and give it a descriptive name (e.g., "Aiden Integration").
4. Copy the generated key. It starts with `NRAK-`.

Important

Store your API key securely. Treat it like a password and rotate it if you suspect it has been exposed.

### Steps to Enable New Relic Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the New Relic Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `New Relic, Prod`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **User API Key**: The User API key you generated from New Relic (begins with `NRAK-`).
   - **Region**: Select the region that matches your New Relic account ( **US** or **EU**).
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the New Relic integration:

**NRQL and Telemetry:**

- Show me the error rate for the `checkout` service over the last hour.
- Run an NRQL query for average transaction duration by service today.
- What are the top 5 slowest transactions in the last 24 hours?

**Entities:**

- List the services reporting to New Relic.
- Show me the hosts for the `payments` application.
- Find the entity for the `web-frontend` service.

**APM Errors and Traces:**

- What errors is the `api` service throwing right now?
- Show me recent traces for failed requests in the `orders` service.

**Alerts:**

- List all alert policies.
- Show me the open issues for the production alert policy.
- What conditions are configured for the `High CPU` policy?

## Limitations

- Requires a New Relic User API key with appropriate permissions.
- The selected region (US or EU) must match the New Relic account.

## Additional References

- [New Relic API Keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/)
- [NRQL: New Relic Query Language](https://docs.newrelic.com/docs/nrql/get-started/introduction-nrql-new-relics-query-language/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/new-relic#integration-capabilities)
- [Enable New Relic Integration](/docs/aiden/1.0/integrations/new-relic#enable-new-relic-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/new-relic#prerequisites)
  - [Generate New Relic User API Key](/docs/aiden/1.0/integrations/new-relic#generate-new-relic-user-api-key)
  - [Steps to Enable New Relic Integration](/docs/aiden/1.0/integrations/new-relic#steps-to-enable-new-relic-integration)
