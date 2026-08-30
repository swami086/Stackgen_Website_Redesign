---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/coralogix"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/coralogix"
status: "ok"
---

Connect Aiden with your Coralogix observability platform to get intelligent assistance with log and trace analysis, service discovery, root cause analysis, and alert management. Once enabled, Aiden can investigate incidents, map service dependencies from live telemetry, and manage your alert definitions — as naturally as discussing them with an SRE or platform engineer.

## Integration Capabilities

With Coralogix integration, Aiden can:

- **Query logs** using DataPrime syntax with time-range filters, severity filters, and aggregations.
- **Query distributed traces (spans)** to follow requests, identify slow operations, and trace failures to their root cause.
- **Discover services and infrastructure** by mining live telemetry to enumerate all services, subsystems, environments, and their call relationships.
- **Read currently firing alerts** and their metadata — severity, type, notification groups, and status.
- **Run RCA** by correlating logs and traces for an affected service around the alert's time window.
- **Manage alert definitions** — list, create, enable/disable, and delete alert rules.
- **Manage actions** — list, create, replace, order, and delete Coralogix webhook actions.
- **Manage dashboard folders** — list, create, retrieve, and delete folders.

## Custom Skills

On top of the built-in capabilities, you can create custom skills to extend Aiden's Coralogix support, for example:

- Automate alert-driven root cause analysis workflows.
- Build a self-service runbook that queries logs, traces, and alerts in sequence.
- Create a scheduled health check skill that audits alert coverage and surfaces unmonitored services.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Coralogix Integration

### Generate Your Coralogix API Key

1. Log in to your [Coralogix account](https://dashboard.coralogix.com/).
2. Go to **Settings** → **API Keys**.
3. Click **\+ New API Key** and name it (e.g. `aiden-integration`).
4. Ensure the key has access to the following scopes:
   - **Logs Query** (DataPrime read)
   - **Alerts** (read + write if you want Aiden to create/manage alerts)
   - **Actions** (read + write if you want Aiden to manage actions)
   - **Dashboard Folders** (read + write if you want Aiden to manage dashboard folders)
5. Copy the generated API key.

### Find Your Coralogix API Base URL

Coralogix uses region-specific API base URLs. Use the REST API endpoint for your region:

| Region | Base URL |
| --- | --- |
| US1 | `https://api.coralogix.com` |
| EU1 | `https://api.eu1.coralogix.com` |
| EU2 | `https://api.eu2.coralogix.com` |
| AP1 | `https://api.ap1.coralogix.com` |
| AP2 | `https://api.ap2.coralogix.com` |

note

Use the `api.*` domain, **not** the `app.*` or `ng-api.*` domain. The app URL is for the UI; the API URL is for REST API access.

### Steps to Enable Coralogix Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the Coralogix integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A label to identify this integration instance (e.g. `Coralogix Production`).

   - **Base URL**: The REST API base URL for your Coralogix region (e.g. `https://api.eu2.coralogix.com`). Do not include a trailing slash.

   - **API Key**: The Coralogix API key generated in the step above.



     Security Best Practices





     - Create a dedicated API key for Aiden with the minimum required permissions.
     - Use read-only scopes if you only need Aiden to query and analyze data.
     - Rotate the API key regularly (e.g., every 60–90 days).
     - Monitor Coralogix audit logs for Aiden's activity.

   - **Create prebuilt skills**: Aiden supports pre-built skills for Coralogix. Enable **Create prebuilt skills** if you want these skills available in your workspace.
4. Click **Save** to enable the integration.

### Pre-built Skills

When **Create prebuilt skills** is enabled, Aiden automatically creates the following multi-step skills:

| Skill | Description |
| --- | --- |
| **Alert-Driven Root Cause Analysis** | Reads firing alerts, correlates logs and traces for the affected service, and produces a structured RCA report. |
| **Service & Infrastructure Discovery** | Discovers all services, environments, and dependencies by mining live telemetry — no static config needed. |
| **Log & Trace Investigation for a Time Window** | Deep-dives into a specific service during a given time interval, correlating error logs with slow traces. |
| **Alert Health Check & Hygiene** | Audits all alert definitions against firing alerts and error rates, identifying coverage gaps and blind spots. |

### Sample Prompts

Here are some example prompts you can use:

- What services are sending telemetry to Coralogix right now?
- Show me all ERROR logs from the `payment-service` in the last 30 minutes.
- What alerts are currently firing? Which are P1?
- An alert fired for database connection failures. Run RCA and show me the related logs and traces.
- Show me the service dependency map based on traces.
- Query traces for `checkout-service` from the last hour and find the slowest spans.
- List all alert definitions and show which are currently disabled.
- Create an alert that triggers when ERROR log count exceeds 100 in 5 minutes for `api-gateway`.
- Show me error spans from the last 15 minutes grouped by service.
- What data sources are currently sending logs to Coralogix?

## Additional References

- [Coralogix API Keys](https://coralogix.com/docs/developer-portal/api-keys/)
- [Coralogix DataPrime Query Language](https://coralogix.com/docs/dataprime-query-language/)
- [Coralogix Alert Configuration](https://coralogix.com/docs/alerting/)
- [Coralogix Region Endpoints](https://coralogix.com/docs/coralogix-endpoints/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/coralogix#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/coralogix#custom-skills)
- [Enable Coralogix Integration](/docs/aiden/1.0/integrations/coralogix#enable-coralogix-integration)
  - [Generate Your Coralogix API Key](/docs/aiden/1.0/integrations/coralogix#generate-your-coralogix-api-key)
  - [Find Your Coralogix API Base URL](/docs/aiden/1.0/integrations/coralogix#find-your-coralogix-api-base-url)
  - [Steps to Enable Coralogix Integration](/docs/aiden/1.0/integrations/coralogix#steps-to-enable-coralogix-integration)
  - [Pre-built Skills](/docs/aiden/1.0/integrations/coralogix#pre-built-skills)
  - [Sample Prompts](/docs/aiden/1.0/integrations/coralogix#sample-prompts)
