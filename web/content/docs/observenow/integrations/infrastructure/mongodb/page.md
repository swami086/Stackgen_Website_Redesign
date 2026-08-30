---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/mongodb"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/mongodb"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from MongoDB

## Kubernetes

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
mongodb-exporter:

  enabled: true

  annotations:

    prometheus.io/scrape: "true"

  # Option A:

  # [mongodb[+srv]://][user:pass@]host1[:port1][,host2[:port2],...][/database][?options]

  mongodb:

    uri: ""

  # (or) Alternatively, Option B:

  # Name of an externally managed secret (in the same namespace) containing the connection uri as key `mongodb-uri`.

  # If this is provided, the value mongodb.uri is ignored.

  existingSecret:

    name: ""

    key: "mongodb-uri"
```

## MongoDB Atlas

To configure an Atlas integration with [Prometheus](https://prometheus.io/), follow the steps below:

- Complete the procedure given in the [MongoDB documentation](https://www.mongodb.com/docs/atlas/tutorial/prometheus-integration/#procedure)
- After the setup, a generated snippet is provided. Copy and store it securely and replace the username, password and the url in the below snippet.

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
- job_name: "<job_name>"

  scrape_interval: 10s

  metrics_path: /metrics

  scheme : https

  basic_auth:

    username: <username>

    password: <password>

  http_sd_configs:

    - url: https://cloud.mongodb.com/prometheus/v1.0/groups/<placeholder>/discovery

      basic_auth:

        username: <username>

        password: <password>
```

## MongoDB

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
mongodb-exporter:

  enabled: true

  annotations:

    prometheus.io/scrape: "true"

  # Option A:

  # [mongodb[+srv]://][user:pass@]host1[:port1][,host2[:port2],...][/database][?options]

  mongodb:

    uri: ""

  # (or) Alternatively, Option B:

  # Name of an externally managed secret (in the same namespace) containing the connection uri as key `mongodb-uri`.

  # If this is provided, the value mongodb.uri is ignored.

  existingSecret:

    name: ""

    key: "mongodb-uri"
```

## Single Machine

Alternatively, you can install the [Prometheus MongoDB exporter](https://github.com/percona/mongodb_exporter) on a single machine.

**Prerequisite(s)**:

- you have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

_Run_ this command to install the MongoDB exporter as a systemd unit:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e mongodb

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e mongodb
```

- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping
- If you need to **update MongoDB connection info**, after you install, you may edit `/etc/systemd/system/prom-mongodb-exporter.service` with the appropriate [CLI args you want](https://github.com/percona/mongodb_exporter/blob/main/REFERENCE.md#flags), and then restart the service:
