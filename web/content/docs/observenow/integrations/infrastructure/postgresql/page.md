---
title: "Verify `pg_stat_statements` is installed"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/postgresql"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/postgresql"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from PostgreSQL databases.

In order to collect metrics from PostgreSQL, you must first enable the [pg\_stat\_statements](https://www.postgresql.org/docs/current/static/pgstatstatements.html) extension which generates PostgreSQL metrics.

## Verify `pg_stat_statements` is installed

Run the following command in your database to check if `pg_stat_statements` is enabled

```pgsql
SHOW shared_preload_libraries;
```

If you do not see an entry for `pg_stat_statements`, you can install it using the next step. Otherwise, skip to the **Enable on your database** section

### Install `pg_stat_statements`

Add the following snippet into your `postgresql.conf` file:

```none
shared_preload_libraries = 'pg_stat_statements'
```

Restart your PostgreSQL server and verify you have `pg_stat_statements` enabled

info

instances running PostgreSQL 11+ and should have `pg_stat_statements` enabled by default. But if not, you can follow their respective documentation on enabling `pg_stat_statements` in your PostgreSQL server.

## Enable `pg_stat_statements` on your database

Connect to the PostgreSQL database you want to collect metrics from and install `pg_stat_statements` using the following commands:

```pgsql
\c mydatabase

mydatabase=# CREATE EXTENSION if not exists pg_stat_statements;
```

## Configure StackGen Agent to Collect Metrics from PostgreSQL

Add the following `YAML` snippets to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

First enable the postgres exporter by adding the following `YAML` snippet in the agent values.

```yaml
# Enabled the postgres exporter in the agent

postgres-exporter:

  enabled: true

  annotations:

    prometheus.io/scrape: 'true'
```

Once the postgres exporter in configured, add the `extraScrapeConfigs` under `victoria-metrics-agent` (must be already present in the agent values) as below.

```yaml
victoria-metrics-agent:

  extraScrapeConfigs:

    - job_name: 'postgres'

      static_configs:

        - targets:

          - postgresql://<username>:<password>@<server>:5432

          - postgresql://<username>:<password>@<server>:5432/?sslmode=disable # use sslmode=disable param if ssl is disabled

      metrics_path: /probe

      relabel_configs:

        - source_labels: [__address__]

          target_label: __param_target

        - source_labels: [__param_target]

          target_label: instance

        - source_labels: [instance]

          regex: 'postgresql://[^:]+:[^@]+@([^:]+):[0-9]+.*'

          target_label: instance

          replacement: '${1}'

        - target_label: __address__

          replacement: devopsnow-agent-postgres-exporter.devopsnow.svc.cluster.local
```

Reinstall the helm chart with the updated `values.yaml` file and you should see the `postgres-exporter` pod come up and postgres metrics should have started flowing into your ObserveNow instance

info

You may need to use `sslmode: require` in the config above with Amazon RDS PostgreSQL instances since Amazon RDS forces SSL connections since PostgreSQL 15+

Alternatively, you can disable the force ssl behaviour on Amazon RDS by following [these instructions](https://stackoverflow.com/a/77787495) _(Requires a server restart)_.

## Single Machine

Alternatively, you can install the [Prometheus Postgres exporter](https://github.com/prometheus-community/postgres_exporter) on a single machine.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)

_Run_ this command to install the Postgres exporter as a systemd unit:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e postgres

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e postgres
```

- First you need to **update Postgres user and password info**, after you install, you may edit `/etc/opsverse/exporters/postgres/postgres_exporter.env` and then restart the service:
- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping

- [Verify `pg_stat_statements` is installed](/docs/observenow/integrations/infrastructure/postgresql#verify-pg_stat_statements-is-installed)
  - [Install `pg_stat_statements`](/docs/observenow/integrations/infrastructure/postgresql#install-pg_stat_statements)
