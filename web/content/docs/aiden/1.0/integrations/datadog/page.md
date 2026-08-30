---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/datadog"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/datadog"
status: "ok"
---

Connect Aiden with your Datadog observability platform to get intelligent assistance with monitoring, troubleshooting, and analyzing your infrastructure, applications, and services. Once enabled, Aiden can help you investigate logs, traces, metrics, and incidents as naturally as discussing them with an SRE or platform engineer.

## Integration Capabilities

With Datadog integration, Aiden can:

- **Query and analyze logs** from any source using search filters, time ranges, and indexes.
- **Investigate distributed traces** and spans to understand request flow and identify bottlenecks.
- **Query and visualize metrics** for time-series analysis and dashboards.
- **Manage monitors** and review alert configurations.
- **Track and investigate incidents** with context from logs, metrics, and traces.
- **List and manage dashboards** (create, update, delete) with custom widgets.
- **Monitor infrastructure**, including hosts, health, and resource usage.
- **List CI/CD pipeline events** filtered by pipeline name, status, provider, or branch.
- **Browse the Service Catalog** for service definitions, ownership, and metadata.
- **List teams** in your organization with optional filters.
- **Review log indexes** including retention, filters, and quotas.

## Custom Skills

On top of the built-in capabilities, you can create custom skills to extend Aiden’s Datadog support, for example:

- Run compliance checks across your Datadog monitors and dashboards.
- Create a self-service workflow to provision or update monitors.
- Automate incident triage and root cause analysis workflows.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Datadog Integration

Required permissions

To use MCP Server tools, your Datadog role must include:

- `mcp_read`: required for read actions (for example, querying monitors, searching logs, and viewing dashboards)
- `mcp_write`: required for create or update actions (for example, creating monitors and muting hosts)
You also need the matching Datadog resource permissions for each action. For example, reading monitors requires both `mcp_read` and **Monitors Read**.

[Datadog docs: Required permissions](https://docs.datadoghq.com/bits_ai/mcp_server/setup?tab=cursor#required-permissions)

### Create Your Datadog API and App Keys

1. Log in to your [Datadog account](https://app.datadoghq.com/) (or your organization’s Datadog site, e.g., `app.datadoghq.eu` for EU1).
2. Go to **Organization Settings** → **API Keys** (or **Application Keys**).
3. Create an **API Key** for Aiden to authenticate.
4. Create an **Application Key** with the scopes needed for the operations you want Aiden to perform (e.g,. logs read, metrics read, monitors read).

### Steps to Enable Datadog Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the Datadog integration card.
3. Enter the integration configuration parameters:
   - **API Key**: The Datadog API key used to authenticate with your organization.
     - Create it under **Organization Settings** → **API Keys**.
     - Ensure it has the scopes required for the operations you want Aiden to perform.
   - **App Key**: The Datadog Application key used for API access.
     - Create it under **Organization Settings** → **Application Keys**.
     - Grant read (and write, if needed) permissions for logs, metrics, monitors, dashboards, and other resources.
   - **Site**: The Datadog site for your organization (e.g. US1, EU1, US3, US5, AP1, AP2, US1-FED).


     - Choose the site that matches your Datadog account (e.g. `us1` for US1, `eu1` for EU1).

Security Best Practices

     - Create dedicated API and Application keys for Aiden with the minimum required permissions.
     - Use read-only keys if you only need Aiden to query and analyze data.
     - Rotate keys regularly (e.g., every 60–90 days).
     - Monitor Datadog audit logs for Aiden’s activity.
     - Ensure keys have the correct scopes for the tasks you want Aiden to perform.

   - **Create prebuilt skills**: Aiden supports pre-built skills for Datadog. Enable **Create prebuilt skills** if you want these skills available.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- Show me all error logs from the `api-service` in the last hour.
- What’s causing the latency spike in the `checkout` service?
- List all active monitors and their current status.
- Find traces for requests that returned 5xx errors today.
- Are there any open incidents? What’s their severity?
- Create a dashboard for CPU and memory usage by environment.
- Which hosts are unhealthy or have high load?
- List CI pipeline runs that failed in the last 24 hours.
- What metrics are available for `service:web`?
- Show me the service definitions in the catalog.

## Additional References

- [Datadog API Authentication](https://docs.datadoghq.com/account_management/api-app-keys/)
- [Datadog API Overview](https://docs.datadoghq.com/api/)
- [Log Queries](https://docs.datadoghq.com/logs/explorer/search_syntax/)
- [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/datadog#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/datadog#custom-skills)
- [Enable Datadog Integration](/docs/aiden/1.0/integrations/datadog#enable-datadog-integration)
  - [Create Your Datadog API and App Keys](/docs/aiden/1.0/integrations/datadog#create-your-datadog-api-and-app-keys)
  - [Steps to Enable Datadog Integration](/docs/aiden/1.0/integrations/datadog#steps-to-enable-datadog-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/datadog#sample-prompts)
