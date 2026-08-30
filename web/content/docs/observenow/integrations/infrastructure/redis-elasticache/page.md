---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/redis-elasticache"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/redis-elasticache"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from Redis/ElastiCache.

## Kubernetes

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
redis-exporter:

  enabled: true

  auth:

    # Use password authentication

    enabled: false

    # Use existing secret (ignores redisPassword)

    secret:

      name: ""

      key: ""

    # Redis password (when not stored in a secret)

    redisPassword: ""

    # Set up PasswordFile if setting Auth for multiple endpoints

    redisPasswordFile:

      secret:

        name: "redis-secret" # Set to "" if not using auth

        key: "config" # Set to "" if not using auth
```

If you need to scrape multiple redis servers with authentication, create a file named `authentication.txt` and populate with passwords for your connection strings:

```json
{

  "redis://user@redis-server:17811": "password",

  "redis://redis-server-2:6379": "password2"

}
```

To create a secret from this file, use the command `kubectl create secret generic redis-secret -n devopsnow --from-file=config=authentication.txt`

tip

Refer [values.yaml](https://github.com/prometheus-community/helm-charts/blob/main/charts/prometheus-redis-exporter/values.yaml) file from Prometheus community for additional value configurations and default values.

Add the following `YAML` snippet to the property `victoria-metrics-agent.config.extraScrapeConfigs` in your `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
extraScrapeConfigs:

  - job_name: redis_exporter_targets

    metrics_path: /scrape

    relabel_configs:

    - source_labels:

      - __address__

      target_label: __param_target

    - source_labels:

      - __param_target

      target_label: instance

    - replacement: devopsnow-agent-redis-exporter.devopsnow:9121

      target_label: __address__

    metric_relabel_configs:

    - source_labels:

      - instance-name

      regex: (.+)

      target_label: instance

      action: replace

    static_configs:

    - targets:

      - redis://user@redis-server:6379

      labels:

        instance-name: unique-redis-servername

    - targets:

      - redis://redis-server-2:6379
```

## Single Machine

Alternatively, you can install the [Prometheus Redis exporter](https://github.com/oliver006/redis_exporter) on a single machine.

**Prerequisite(s)**:

- you have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

_Run_ this command to install the Redis exporter as a systemd unit:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e redis

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e redis
```

- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping
- If you need to **update Redis connection info**, after you install, you may edit `/etc/systemd/system/prom-redis-exporter.service` with the appropriate [CLI args you want](https://github.com/oliver006/redis_exporter#command-line-flags), and then restart the service:

```shell
sudo systemctl restart prom-redis-exporter
```
