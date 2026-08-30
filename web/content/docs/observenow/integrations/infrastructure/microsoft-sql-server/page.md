---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/microsoft-sql-server"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/microsoft-sql-server"
status: "ok"
---

## Kubernetes

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from MS SQL Server.

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
deployment:

  enabled: true

mssql:

  enabled: true

  config: |

    - connection_string: "sqlserver://<USERNAME>:<PASSWORD>@<SERVICE_NAME>.<NAMESPACE>.svc.cluster.local:1433"

      instance: <unique-db-server-name>
```

info

If you have one or multiple Microsoft SQL Servers that you want to integrate, make sure to add them as a list in the `mssql.config` inside the agent as shown above

You can further append configurations for MSSQL in the config section as per your requirements following this [documentation](https://grafana.com/docs/agent/latest/static/configuration/integrations/mssql-config/#:~:text=Full%20reference%20of%20options%3A)

## Standalone VM

You can configure the [StackGen agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) on a single machine to collect metrics from your MSSQL Server(Microsoft SQL Server).

**Prerequisite(s)**:

- **Required MSSQL Grants** \- It is recommended that you have a dedicated user set up for monitoring an mssql instance. The user for monitoring must have the following grants in order to populate the metrics:

```sql
GRANT VIEW ANY DEFINITION TO <MONITOR_USER>

GRANT VIEW SERVER STATE TO <MONITOR_USER>
```

Add the MSSQL `YAML` snippet given below to `/etc/opsverse/agent-config.yaml` and then restart the service using:

```shell
sudo systemctl restart opsverse-agent
```

```yaml

# add this integrations and configure `mssql` as given below to enable MSSQL integration

integrations:

  mssql:

    enabled: true

    connection_string: "sqlserver://<USERNAME>:<PASSWORD>@<HOST>:<PORT>"

    instance: "<unique-db-server-name>"
```

You can further append configurations for MSSQL as per your requirements following this [documentation](https://grafana.com/docs/agent/latest/static/configuration/integrations/mssql-config/#:~:text=Full%20reference%20of%20options%3A)
