---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/mysql"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/mysql"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from MySQL DBs.

You can also install the [RDS exporter](/docs/observenow/integrations/infrastructure/amazon-rds) on a single machine if you're running MySQL DB on RDS.

## Kubernetes

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
mysql-exporter:

  enabled: true

  # # Set a name for this DB. Will be used in dashboards and annotations

  podLabels:

    db-name: "your-db-name"

  # # Not recommended for production usage

  # # For production, define a secret with the DATA_SOURCE_URL as the key

  # # See the example provided in the file

  mysql:

    host: <connection url>

    pass: <password>

    user: <username>

  # For production

    # existingSecret: mysql-secret-name

  # The secret should be of this format

  # Key: DATA_SOURCE_URL

  # Value: Base64 encoded value of username:password@(mysql host:post)/

  # apiVersion: v1

  # data:

  #   DATA_SOURCE_NAME: <base64 encoded string>

  # kind: Secret

  #   name: mysqld-exporter-prometheus-mysql-exporter

  #   namespace: default
```

## Single Machine

Alternatively, you can install the [Prometheus MySQL exporter](https://github.com/prometheus/mysqld_exporter) on a single machine.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)
- [Required Grants](https://github.com/prometheus/mysqld_exporter#required-grants) on DB are enabled

_Run_ this command to install the MySQL exporter as a systemd unit:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e mysqld

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e mysqld
```

- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping
- If you need to **update MySQL connection info**, after you install, you may edit `/etc/opsverse/exporters/mysqld/.my.cnf` and then restart the service:

```shell
sudo systemctl restart prom-mysqld-exporter
```
