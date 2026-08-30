---
title: "Kubernetes Agent Configuration"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/snmp-enabled-hardware"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/snmp-enabled-hardware"
status: "ok"
---

StackGen ObserveNow has support to pull metrics from most SNMP-enabled hardware, such as firewalls, switches, modems and IOT devices.

To setup `SNMP Exporter`, we create a set of targets/urls to monitor. And the StackGen agent queries the exporter with these targets/urls which generates endpoint metrics.

A sample configuration is shown below

info

Please ensure that the SNMP-enabled device is accessible from the machine/cluster running the StackGen Agent

## Kubernetes Agent Configuration

Add the following `YAML` snippets to the StackGen agent's `values.yaml` file.

```yaml
snmp-exporter:

  enabled: true
```

And add the following scrape config:

```yaml
victoria-metrics-agent:

  extraScrapeConfigs:

  - job_name: 'snmp'

    static_configs:

      - targets:

        - 192.168.1.2  # SNMP device.

        - switch.local # SNMP device.

        - tcp://192.168.1.3:1161  # SNMP device using TCP transport and custom port.

    metrics_path: /snmp

    params:

      auth: [public_v2]

      module: [if_mib]

    relabel_configs:

      - source_labels: [__address__]

        target_label: __param_target

      - source_labels: [__param_target]

        target_label: instance

      - target_label: __address__

        replacement: devopsnow-agent-snmp-exporter.devopsnow:9116
```

and reinstall the helm chart using the following command:

```shell
helm upgrade --install devopsnow-agent -n devopsnow \

    --repo https://registry.devopsnow.io/chartrepo/public \

    -f <path to opsverse-values.yaml file>
```

info

To add custom auth/modules, create a configmap with the auth modules as shown at the end of this page, then set the following in values.yaml:

```yaml
snmp-exporter:

  extraConfigmapMounts:

    - name: snmp-exporter-configmap

      mountPath: /run/secrets/snmp-exporter

      subPath: snmp-custom.yaml

      configMap: snmp-exporter-configmap-configmap # Your Configmap here

      readOnly: true

      defaultMode: 420

  extraArgs: ["--config.file=/run/secrets/snmp-exporter/snmp-custom.yaml"]
```

## Single Machine Configuration

Alternatively, you can install the [Prometheus SNMP Exporter](https://github.com/prometheus/snmp_exporter) on a single machine.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)

Run this command to install the `SNMP Exporter`

```shell
# for amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e snmp

# for arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e snmp
```

- Edit the StackGen agent config file by using the following command:

```shell
sudo vi /etc/opsverse/agent-config.yaml
```

- Add the SNMP exporter job under `scrape_configs` and edit the fields as required.

```shell
- job_name: 'snmp-exporter'

    static_configs:

      - targets:

        - 192.168.1.2  # SNMP device.

        - switch.local # SNMP device.

        - tcp://192.168.1.3:1161  # SNMP device using TCP transport and custom port.

    metrics_path: /snmp

    params:

      auth: [public_v2]

      module: [if_mib]

    relabel_configs:

      - source_labels: [__address__]

        target_label: __param_target

      - source_labels: [__param_target]

        target_label: instance

      - target_label: __address__

        replacement: 127.0.0.1:9116  # The SNMP exporter's hostname:port.
```

info

To add custom auth, edit `/etc/opsverse/exporters/snmp/snmp-config-custom.yml` to add a custom auth module and restart the `snmp-exporter` service using `systemctl restart prom-snmp-exporter.service`.

**Sample:**
