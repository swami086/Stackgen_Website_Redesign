---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/microsoft-azure/azure-functions"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/microsoft-azure/azure-functions"
status: "ok"
---

## Overview

This document outlines the steps to integrate Azure Functions with a centralized monitoring solution using OpenTelemetry. It covers the setup for a central OpenTelemetry Collector, configuring Azure Event Hub for log streaming, and monitoring system metrics for Azure Functions. Following this guide will help establish an observability pipeline for capturing and visualizing metrics, logs, and traces, thereby enabling comprehensive monitoring of your Azure-based applications.

### **Prerequisites**

Before proceeding with the setup, ensure the following prerequisites are met:

- **Azure Subscription:** An active Azure subscription with appropriate permissions.
- **Virtual Machine (VM):**A VM instance provisioned in your cloud environment with the following specifications:

  - Minimum 2 CPUs and 4 GB RAM.
  - Ports **4317 (gRPC)** and **4318 (HTTP)** open for inbound traffic.
- **Azure CLI:** Installed on your local machine for managing Azure resources and configurations.

## Azure Monitor Receiver Configuration

**Steps to Configure Azure Monitor Receiver**

1. **Create a Service Principal**
   - Follow the instructions in the [**Create a service principal Azure Doc**](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal) documentation to create a service principal.
   - Name it `opsverse-collector-sp` and leave the redirect URI empty.
2. **Assign Read Permissions to Azure Monitor**
   - Follow the [**Assign Role**](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal) documentation to assign Read access to Azure Monitor.
   - You can assign permissions at the subscription level for broader access.
3. **Configure Authentication for the Service Principal**
   - Follow the [**Creating a client secret**](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal#option-3-create-a-new-client-secret) documentation to create a client secret. Be sure to copy the client secret, as it will be needed in the configuration file as client\_secret.
4. **Retrieve Client ID and Tenant ID**
   - Go to the **Azure Portal** and search for the application you created.
   - You will find the **Application (client) ID** and **Directory (tenant) ID** in the **Overview** section. These values will be used in your OpenTelemetry Collector configuration.

## Otel Collector Setup

### Azure Vm Installation Steps

- To install the StackGen Agent on your Azure VM, execute the following command. Make sure to replace the placeholders with your specific values: `curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e opsverse-otelcontribcol -t <collector_traces_endpoint> -m <collector_metrics_endpoint> -p <password> -u <username>`
- The traces collector URL,Metrics URL, user, and password can be found in the Admin Console under "URLs and Integrations"
- After the installation, navigate to the configuration file directory: `cd /etc/opsverse/exporters/opsverse-otelcontribcol`
- Open the `config.yaml` file in your preferred editor: `sudo nano config.yaml`
- Add the azuremonitor receiver block and a new metrics pipeline to the existing configuration.

```yaml
receivers:

  otlp:

    protocols:

      grpc:

        endpoint: 0.0.0.0:4317

      http:

        endpoint: 0.0.0.0:4318

  azuremonitor:

    subscription_id: "<Your_Subscription_ID>"

    tenant_id: "<Your_Tenant_ID>"

    client_id: "<Your_Client_ID>"

    client_secret: "<Your_Client_Secret>"

    resource_groups: ["<Your_Resource_Group>"]

    collection_interval: 60s



service:

  pipelines:

    metrics/am:

      receivers: [azuremonitor]

      exporters: [prometheusremotewrite]
```

- After modifying the configuration, restart the OpenTelemetry Collector to apply the changes: `sudo systemctl restart opsverse-otelcontribcol`
- Add a DNS label to the Public IP address of the collector VM for easier reference in azure portal like this: `opsverse-central-collector.centralindia.cloudapp.azure.com`

### Use Existing StackGen Agent

If your setup already includes a Kubernetes cluster running the StackGen agent, as per the [StackGen Agent Setup Guide](/docs/observenow/collecting-telemetry/install-the-opsverse-agent), you can reuse the same collector to send telemetry data from your Azure Function App.

1. **Expose an Ingress Endpoint for the Collector Service:**
   - Add an ingress endpoint for the OpenTelemetry Collector service in your Kubernetes cluster.
   - This endpoint will be used in the Azure Function App code instrumentation to define the OTLP export endpoint.
2. **Update the OpenTelemetry Collector Configuration:**
   - Modify the existing ConfigMap for the OpenTelemetry Collector in your cluster.
   - Add the following block under the receivers and service pipelines section.

```yaml
receivers:

  otlp:

    protocols:

      grpc:

        endpoint: 0.0.0.0:4317

      http:

        endpoint: 0.0.0.0:4318

  azuremonitor:

    subscription_id: "<Your_Subscription_ID>"

    tenant_id: "<Your_Tenant_ID>"

    client_id: "<Your_Client_ID>"

    client_secret: "<Your_Client_Secret>"

    resource_groups: ["<Your_Resource_Group>"]

    collection_interval: 60s



service:

  pipelines:

    metrics/am:

      receivers: [azuremonitor]

      exporters: [prometheusremotewrite]




```

- Restart the OpenTelemetry Collector Deployment: `kubectl rollout restart deployment <otel-collector-deployment-name>`

## Azure Event Hub Setup

### Setup Steps

1. **Create an Event Hubs Namespace:**
   - Navigate to the Azure Portal and select **Create a Resource**.
   - Search for **Event Hubs** and select **Create**.
   - Fill in the required details, including:
     - **Resource Group**: Choose an existing group or create a new one.
     - **Namespace Name**: Enter a unique name for your namespace.
     - **Region**: Choose the appropriate region.
   - Click **Review + Create** to provision the namespace.
2. **Create an Event Hub:**
   - Inside your Event Hubs namespace, go to **Event Hubs** and select **\+ Event Hub**.
   - Enter a name for your Event Hub ( logs) and click **Create**.
3. **Create a Shared Access Policy:**
   - In your Event Hub, go to **Shared access policies**.
   - Click **Add**, name the policy (e.g., opsverselisten), and select **Listen** permission.
   - Save and copy the **Connection string–primary key** for later use.

## View the metrics in ObserveNow

Ensure the following are met:

- You have an **Azure subscription** and an **Azure Function instance** running.
- The **Central Collector** is set up with the Azure Monitor exporter.

Metrics collected from Azure function can be viewed under the `Explore` section of ObserveNow `Grafana`

![](https://docs.stackgen.com/assets/images/w5IaNzsqTMCcCXIMv0kWd-X_MG7GJdug1EDYfBoqf4w-20241001-103909-7700be82ab0d7c850264f1c0cf3ccf60.png)

## View the traces in ObserveNow

To monitor your Azure Function App, use OpenTelemetry (Otel) SDKs to instrument your application for collecting and forwarding metrics and traces to a Central Collector.

### Installing the OpenTelemetry SDK

1. Install necessary packages in this example we are using node.js

```nodejs
npm install @opentelemetry/api

npm install @opentelemetry/auto-instrumentations-node

npm install @opentelemetry/exporter-trace-otlp-http
```

Set environment variables or configure a config file:

```nodejs
export OTEL_EXPORTER_OTLP_ENDPOINT="http://<Your-Central-Collector-DNS>:4318/v1/traces
```

Traces collected from Azure function can be viewed under the `Explore` section of ObserveNow`Grafana`

![](https://docs.stackgen.com/assets/images/w5IaNzsqTMCcCXIMv0kWd-FJQ5Gi2tx2ThL3px_0SOi-20241001-104902-817838d60180602377723281762a1d85.png)

## Logs Integration

1. **Configure Diagnostic Settings**
   - Navigate to the diagnostic settings of the Azure Function you want to log.
   - Click "Add diagnostic setting" and select the log categories for export.
   - Choose "Stream to an event hub" and input the Event Hub details created earlier.
2. **Integrate with StackGen Console**
   - Log into the StackGen Console and navigate to your ObserveNow stack.
   - Go to Integrations → Azure Integration → Logs, and enable the feature.
   - Input the Event Hub connection string created earlier and save.

After completing the integration, logs should appear in Grafana labeled as `{job="loki.source.azure_event_hubs"}`.

- [Overview](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#overview)
  - [**Prerequisites**](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#prerequisites)
- [Azure Monitor Receiver Configuration](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#azure-monitor-receiver-configuration)
- [Otel Collector Setup](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#otel-collector-setup-)
  - [Azure Vm Installation Steps](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#azure-vm-installation-steps)
  - [Use Existing StackGen Agent](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#use-existing-stackgen-agent)
- [Azure Event Hub Setup](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#azure-event-hub-setup)
  - [Setup Steps](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#setup-steps)
- [View the metrics in ObserveNow](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#view-the-metrics-in-observenow)
- [View the traces in ObserveNow](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#view-the-traces-in-observenow)
  - [Installing the OpenTelemetry SDK](/docs/observenow/integrations/cloud-providers/microsoft-azure/azure-functions#installing-the-opentelemetry-sdk)
