---
title: "Integrations Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/grafana"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/grafana"
status: "ok"
---

Connect Aiden with your Grafana platform to get intelligent insights from your observability stack through a unified interface. Once enabled, Aiden can leverage your Grafana data sources to analyze metrics, logs, and other observability data through natural language conversations.

## Integrations Capabilities

With Grafana integration, Aiden can:

- Access and analyze metrics from Prometheus data sources.
- Query and investigate logs from Loki data sources.
- Compare metric trends across different time periods.
- Perform detailed root cause analysis (RCA).
- Analyze firing alerts.
- Correlate logs and metrics to help troubleshoot issues.
- Investigate performance bottlenecks and anomalies.
- Analyze resource utilization patterns.
- Generate insights from your observability data.

## Supported Datasources

The Grafana integration currently supports accessing the following data sources:

- **Prometheus**: For all metrics data.
- **Loki**: For all logging data.
- Read or manage Grafana-based alerts.
- Read the list of Grafana dashboards.

Additional support for data sources will be added in future updates.

## Create Custom Skills

On top of the several out of the box capabilities, you can create custom skills to add additional capabilities. Here are some examples:

- Create automated health checks based on Grafana datasources
- Set up cross-datasource correlation for complex troubleshooting
- Develop custom anomaly detection for specific services

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Grafana Integration

### Generate your Grafana API Key

note

- You need to be an Admin in Grafana.
- **Security Best Practices**:

  - Create a dedicated API key for Aiden with minimum required permissions.
  - Use an API key with at least the Editor permission as Aiden will need to query the data sources, which need the ability to Explore.
  - Regularly rotate API keys (every 60-90 days recommended).
  - Ensure your Grafana API key has appropriate permissions for the data sources you want Aiden to access. For using Prometheus and Loki data sources, the API key needs at least `Editor` role for these data sources.

1. Navigate to **Administration > Users and access > Service accounts**.



![service accounts](https://docs.stackgen.com/assets/images/grafana1-17d763f67ccd89afd6df4ea1d130122b.png)

2. Click the **Add Service Account** button and follow the on-screen instructions to create a Service Account.



![add service account](https://docs.stackgen.com/assets/images/grafana2-473fd60ac75e628036c1e998bdcbc1b0.png)

3. Create a **Service Account Token** by clicking the **Add Service Account Token** button and follow the on-screen instructions:



![Generate token](https://docs.stackgen.com/assets/images/grafana3-af86253417985f67b81d0cdafe3355a3.png)


### Steps to Enable Grafana Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Grafana Integration card.

3. Enter the integration configuration parameters:



![grafana](https://docs.stackgen.com/assets/images/grafana4-27e3e25eb42e1d6e3940df7fdc827564.png)










   - **Grafana URL**: This is the web address (endpoint) of your Grafana server. It tells Aiden where to send API requests for dashboards, panels, alerts, and metrics.

     - If Grafana is self-hosted, you can find this in your deployment or ingress configuration.
     - If you’re using [Grafana Cloud](https://grafana.com/docs/grafana-cloud/get-started/), the URL will look like: `https://<your-stack>.grafana.net`.
     - Check out [HTTP API Overview](https://grafana.com/docs/grafana/latest/developers/http_api/).
   - **API Token**: This is the [authentication token](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/) Aiden uses to access the [Grafana API](https://grafana.com/docs/grafana/latest/administration/service-accounts/migrate-api-keys/) securely.

     - You can create one by navigating to **Grafana > ⚙️ Settings > API Keys > New API Key**.
     - Choose an appropriate role and permissions:
       - **Viewer**: Read-only access (recommended for monitoring).
       - **Editor**: Modify dashboards.
       - **Admin**: Full control (use sparingly).
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me CPU usage trends for the payment service over the last 24 hours.
- What error logs correlate with the latency spike at 3 PM yesterday?
- Compare memory usage between production and staging environments.
- Are there any services showing abnormal error rates?
- Find all error logs from the authentication service during the last incident.
- Which services have the highest request latency right now?
- Create a report of resource utilization trends for all production services.
- Tech store orders are failing. Find out why.
- Analyze the resource usage of pods in production and provide recommendations for right-sizing.

## Additional References

- [Grafana HTTP API Reference](https://grafana.com/docs/grafana/latest/developers/http_api/)
- [Grafana Dashboard API](https://grafana.com/docs/grafana/latest/developers/http_api/dashboard/)
- [Grafana Alerting API](https://grafana.com/docs/grafana/latest/alerting/set-up/provision-alerting-resources/http-api-provisioning/)

- [Integrations Capabilities](/docs/aiden/1.0/integrations/grafana#integrations-capabilities)
- [Supported Datasources](/docs/aiden/1.0/integrations/grafana#supported-datasources)
- [Create Custom Skills](/docs/aiden/1.0/integrations/grafana#create-custom-skills)
- [Enable Grafana Integration](/docs/aiden/1.0/integrations/grafana#enable-grafana-integration)
  - [Generate your Grafana API Key](/docs/aiden/1.0/integrations/grafana#generate-your-grafana-api-key)
  - [Steps to Enable Grafana Integration](/docs/aiden/1.0/integrations/grafana#steps-to-enable-grafana-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/grafana#sample-prompts)
