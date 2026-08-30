---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-sql-server"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/microsoft-azure/azure-metrics/azure-sql-server"
status: "ok"
---

# Kubernetes

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can collect metrics from Azure SQL Server.

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

    - job_name: az-sql-metrics

      scrape_interval: 30s

      metrics_path: /probe/metrics/list

      params:

        name:

          - az_sql

        template:

          - '{name}_{metric}'

        subscription:

          - <resource-subscription-id>

        resourceType:

          - Microsoft.sql/servers/databases

        metric:

          - app_cpu_billed

          - app_cpu_percent

          - app_memory_percent

          - availability

          - blocked_by_firewall

          - cpu_percent

          - cpu_limit

          - cpu_used

          - physical_data_read_percent

          - allocated_data_storage

          - storage

          - storage_percent

          - deadlock

          - connection_failed

          - connection_failed_user_error

          - ledger_digest_upload_failed

          - xtp_storage_percent

          - log_write_percent

          - sessions_count

          - sessions_percent

          - connection_successful

          - ledger_digest_upload_success

          - workers_percent

          - sql_instance_cpu_percent

          - sql_instance_memory_percent

          - sqlserver_process_core_percent

          - sqlserver_process_memory_percent

          - tempdb_data_size

          - tempdb_log_size

          - tempdb_log_used_percent

          - diff_backup_size_bytes

          - full_backup_size_bytes

          - log_backup_size_bytes

      static_configs:

        - targets:

            - http://devopsnow-agent-azure-metr.devopsnow.svc.cluster.local:8080
```
