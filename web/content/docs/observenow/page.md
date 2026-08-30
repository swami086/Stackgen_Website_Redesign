---
title: "Quickstart"
product: "observenow"
sourcePath: "/observenow"
sourceUrl: "https://docs.stackgen.com/observenow"
status: "ok"
---

**ObserveNow** is StackGen’s managed observability stack. It brings your **metrics, logs, and traces** into one place so you can monitor systems, troubleshoot incidents, and explore telemetry with familiar tools (including **Grafana**, **Jaeger**, **VictoriaMetrics**, and **Pyroscope**).

You run or connect **agents** to send data into your instance, then use the bundled UIs for dashboards, queries, and distributed tracing. ObserveNow is available as a hosted option or for **self-hosted** deployment, depending on your organization’s needs.

## Quickstart

Spin up an instance, open Grafana and related apps, and confirm you can reach your stack.

- [**Launch an instance**\\
\\
Create an ObserveNow stack from the Admin Console and get endpoints for Grafana, Jaeger, VMUI, and Pyroscope.](/docs/observenow/getting-started/launch-an-observenow-instance)
- [**Access your stack**\\
\\
Open each app from the Apps tab, sign in to Grafana, and see how telemetry will appear as you connect agents.](/docs/observenow/getting-started/access-your-observenow-instance)

## Telemetry and agents

Understand how data flows in, install collectors, and keep metadata consistent across services.

- [**Collecting telemetry**\\
\\
How metrics, logs, and traces move into ObserveNow and what to plan before you deploy agents widely.](/docs/observenow/collecting-telemetry/overview)
- [**Install the agent**\\
\\
Deploy the StackGen agent on hosts or Kubernetes to scrape and forward observability data.](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)
- [**Standard metadata**\\
\\
Use consistent labels and metadata so dashboards, alerts, and queries stay usable at scale.](/docs/observenow/collecting-telemetry/organizing-observability-telemetry-with-standard-metadata)

## Integrations

Instrument applications, infrastructure, and cloud platforms using the integration library.

- [**Kubernetes**\\
\\
Collect cluster and workload telemetry with the Kubernetes agent and related exporters.](/docs/observenow/integrations/infrastructure/kubernetes)
- [**Applications**\\
\\
Start from language guides such as Java, Go, Python, Node, and OpenTelemetry on Kubernetes.](/docs/observenow/integrations/applications/java)
- [**Cloud providers**\\
\\
Connect AWS, GCP, Azure, and managed services so cloud metrics and logs land in ObserveNow.](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws)

## Operate and visualize

Tune alerting, explore data in Grafana, and manage shared dashboards for your teams.

- [**Alerting**\\
\\
Configure alert rules, contact points, notification policies, and silences.](/docs/observenow/alerting/overview)
- [**Visualization**\\
\\
Learn how ObserveNow surfaces metrics, logs, and traces in the built-in UIs.](/docs/observenow/visualization/overview)
- [**Dashboards**\\
\\
Manage Grafana dashboards, sharing, and variables for your organization.](/docs/observenow/dashboards/managedashboard)

## Enterprise configuration

Harden access and delivery for Grafana and related services in your organization.

- [**Azure AD (OAuth2)**\\
\\
Sign in to Grafana with Azure AD using OAuth2.](/docs/observenow/enterprise-configuration/azure-ad-oauth2-setup)
- [**LDAP**\\
\\
Integrate directory authentication for Grafana.](/docs/observenow/enterprise-configuration/ldap-setup-for-grafana)
- [**SMTP**\\
\\
Send mail from Grafana for invites, alerts, and notifications.](/docs/observenow/enterprise-configuration/smtp-setup-for-grafana)

## Deployment options

Choose SaaS, private SaaS, or self-hosted deployment to match your security and data residency needs.

- [**Compare options**\\
\\
SaaS on StackGen Cloud, private SaaS on your cloud, or self-hosted clusters.](/docs/observenow/deployment-options/flexible-options)
- [**Self-hosted installation**\\
\\
Install and configure ObserveNow on infrastructure you control.](/docs/observenow/deployment-options/self-hosted/installation)

Use the **sidebar** for the full catalog, including infrastructure integrations (databases, Kafka, nginx, and more), RUM, endpoint monitoring, and pre-packaged alerts.
