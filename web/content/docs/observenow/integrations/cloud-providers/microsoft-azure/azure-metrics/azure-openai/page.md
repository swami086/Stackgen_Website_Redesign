---
title: "Azure Openai"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-openai"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-openai"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can collect metrics from Azure OpenAI.

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

    - job_name: az-openai-metrics

      scrape_interval: 30s

      metrics_path: /probe/metrics/list

      params:

        name:

          - az_openai

        template:

          - '{name}_{metric}'

        subscription:

          - <azure-subscription-id>

        resourceType:

          - microsoft.cognitiveservices/accounts

        metric:

          - RAISystemEvent

          - RAITotalRequests

          - RAIHarmfulRequests

          - RAIRejectedRequests

          - SuccessRate

          - TotalErrors

          - TotalCalls

          - SuccessfulCalls

          - ServerErrors

          - Ratelimit

          - DataOut

          - DataIn

          - ClientErrors

          - BlockedCalls

          - ProcessedPromptTokens

          - TokenTransaction

          - GeneratedTokens

          - AzureOpenAIRequests

          - AzureOpenAIContextTokensCacheMatchRate

          - AzureOpenAITimeToResponse

          - ActiveTokens

          - FineTunedTrainingHours

          - Latency

          - RAIAbusiveUserCount

          - AzureOpenAIProvisionedManagedUtilization

          - AzureOpenAIProvisionedManagedUtilizationV2

        validateDimensions:

          - 'true'

      static_configs:

          - targets:

              - http://devopsnow-agent-azure-metr.devopsnow.svc.cluster.local:8080
```
