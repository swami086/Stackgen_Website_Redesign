---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-cosmos-db"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-cosmos-db"
status: "ok"
---

# Kubernetes

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can collect metrics from Azure Cosmos DB Account.

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

info

The placeholders `<azure-client-id>, <azure-tenant-id>, <azure-client-secret>, <resource-subscription-id>`in the following YAML with the appropriate details.

```yaml
azure-metrics-exporter:

  enabled: true

  env:

    DEBUG: "true"

    VERBOSE: "true"

    AZURE_CLIENT_ID: "<azure-client-id>"

    AZURE_TENANT_ID: "<azure-tenant-id>"

    AZURE_CLIENT_SECRET: "<azure-client-secret>"

victoria-metrics-agent:

  extraScrapeConfigs:

    - job_name: az-cosmos-db-metrics

      scrape_interval: 30s

      metrics_path: /probe/metrics/list

      params:

        name:

          - az_cosmos_db

        template:

          - '{name}_{metric}'

        subscription:

          - <resource-subscription-id>

        resourceType:

          - Microsoft.DocumentDB/DatabaseAccounts

        metric:

          - DeleteAccount

          - CreateAccount

          - UpdateDiagnosticsSettings

          - UpdateAccountKeys

          - UpdateAccountNetworkSettings

          - UpdateAccountReplicationSettings

          - AutoscaleMaxThroughput

          - AutoscaledRU

          - DataUsage

          - DedicatedGatewayAverageCPUUsage

          - DedicatedGatewayAverageMemoryUsage

          - TotalRequests

          - DedicatedGatewayMaximumCPUUsage

          - DocumentCount

          - DocumentQuota

          - IndexUsage

          - IntegratedCacheEvictedEntriesSize

          - IntegratedCacheItemExpirationCount

          - IntegratedCacheItemHitRate

          - IntegratedCacheQueryExpirationCount

          - IntegratedCacheQueryHitRate

          - MaterializedViewCatchupGapInMinutes

          - MaterializedViewsBuilderAverageCPUUsage

          - MaterializedViewsBuilderAverageMemoryUsage

          - MaterializedViewsBuilderMaximumCPUUsage

          - MetadataRequests

          - NormalizedRUConsumption

          - PhysicalPartitionCount

          - ReplicationLatency

          - PhysicalPartitionSizeInfo

          - PhysicalPartitionThroughputInfo

          - ProvisionedThroughput

          - AddRegion

          - RegionFailover

          - OfflineRegion

          - OnlineRegion

          - RemoveRegion

          - ServerSideLatency

          - ServerSideLatencyDirect

          - ServerSideLatencyGateway

          - ServiceAvailability

          - SqlContainerCreate

          - SqlContainerDelete

          - SqlContainerThroughputUpdate

          - SqlContainerUpdate

          - SqlDatabaseCreate

          - SqlDatabaseDelete

          - SqlDatabaseThroughputUpdate

          - SqlDatabaseUpdate

          - TableTableCreate

          - TotalRequestsPreview

          - TotalRequestUnits

          - TotalRequestUnitsPreview



      static_configs:

        - targets:

            - http://devopsnow-agent-azure-metr.devopsnow.svc.cluster.local:8080
```
