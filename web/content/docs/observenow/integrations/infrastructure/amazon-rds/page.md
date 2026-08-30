---
title: "Single Machine"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/amazon-rds"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/amazon-rds"
status: "ok"
---

## Single Machine

You can install the [RDS exporter](https://github.com/percona/rds_exporter) on a single machine.

The RDS exporter has two types of metrics: basic and advanced. To be able to use advanced metrics, make sure to set the Enable Enhanced Monitoring option in the settings of your Amazon RDS DB instance. You can do this by clicking on `Modify` \> `Additional configuration` \> `Enhanced Monitoring`.

![](https://docs.stackgen.com/assets/images/9bAw17-pd_cdFo-Uodia-_1-83b4cf03749566678f76b33ffd541fe5.png)

info

After enabling `Enhanced Monitoring`, please restart you RDS DB instance.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)
- You have enabled `Enhanced Monitoring` for your Amazon RDS

_Run_ this command to install the RDS exporter as a systemd unit:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e rds

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e rds
```

- First you need to update StackGen `agent-config.yaml` file. Go to `/etc/opsverse/agent-config.yaml` and add the below jobs in the `scrape_configs` section of the file.

```text
extraScrapeConfigs:

  - job_name: rds-basic

    scrape_interval: 60s

    scrape_timeout: 55s

    metrics_path: /basic

    honor_labels: true

    static_configs:

    - targets:

        - 127.0.0.1:9042

  - job_name: rds-enhanced

    scrape_interval: 10s

    scrape_timeout: 9s

    metrics_path: /enhanced

    honor_labels: true

    static_configs:

    - targets:

        - 127.0.0.1:9042
```

- Next, you need to edit the `rds-config.yaml` file. Go to `/etc/opsverse/exporters/rds/config.yaml` and add the necessary configurations.

```yaml
instances:

  - region: <region>

    instance: <instance_name>

    aws_access_key: <aws_access_key>

    aws_secret_key: <aws_secret_key>

    disable_basic_metrics: false

    disable_enhanced_metrics: false
```

- Restart the StackGen agent and the rds-exporter.

```shell
sudo systemctl restart prom-rds-exporter opsverse-agent
```

- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping.
