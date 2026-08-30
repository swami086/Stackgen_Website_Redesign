---
title: "Azure App Services"
product: "observenow"
sourcePath: "/observenow/azure-app-services"
sourceUrl: "https://docs.stackgen.com/observenow/azure-app-services"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can collect metrics from Azure App Services.

Add the following `YAML` snippets to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

info

Replace the placeholders `<azure-client-id>, <azure-tenant-id>, <azure-client-secret>` in the following YAML with the appropriate values.

```yaml
azure-metrics-exporter:

  enabled: true

  env:

    DEBUG: "true"

    VERBOSE: "true"

    AZURE_CLIENT_ID: "<azure-client-id>"

    AZURE_TENANT_ID: "<azure-tenant-id>"

    AZURE_CLIENT_SECRET: "<azure-client-secret>"
```

The below job snippet must be added under `extraScrapeConfigs` of `victoria-metrics-agent` config in the agent.

info

Replace the placeholders `<azure-subscription-id>` in the following YAML with the appropriate values.

```yaml
victoria-metrics-agent:

  extraScrapeConfigs:

    - job_name: az-app-svc-metrics

      scrape_interval: 30s

      metrics_path: /probe/metrics/list

      params:

        name:

          - az_app_svc

        template:

          - '{name}_{metric}'

        subscription:

          - <azure-subscription-id>

        resourceType:

          - Microsoft.web/sites

        metric:

          - InstanceCount

          - AverageMemoryWorkingSet

          - AverageResponseTime

          - CpuTime

          - BytesReceived

          - BytesSent

          - FileSystemUsage

          - HealthCheckStatus

          - Http101

          - Http2xx

          - Http3xx

          - Http401

          - Http403

          - Http404

          - Http406

          - Http4xx

          - Http5xx

          - IoReadBytesPerSecond

          - IoReadOperationsPerSecond

          - IoWriteBytesPerSecond

          - IoWriteOperationsPerSecond

          - MemoryWorkingSet

          - Requests

          - HttpResponseTime

        validateDimensions:

          - 'true'

      static_configs:

          - targets:

              - http://devopsnow-agent-azure-metr.devopsnow.svc.cluster.local:8080
```
