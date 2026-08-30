---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/vmware-vcenter"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/vmware-vcenter"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from VMWare vCenter.

## Kubernetes

warning

Documentation Coming Soon

## Single Machine

Alternatively, you can install the [Prometheus VMWare vCenter exporter](https://github.com/pryorda/vmware_exporter) on a single machine.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

_Run_ this command to install the VMWare Prometheus exporter as a systemd unit:

```shell
# for amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e vmware

# for arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e vmware
```

- After you install, **update the vSphere host and credentials info** at `/etc/opsverse/exporters/vmware/config.yaml` (you may further tweak with [any available options](https://github.com/pryorda/vmware_exporter#configuration-and-limiting-data-collection), and then restart the service:
- The agent will begin scraping the metrics automatically; the script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping
- _Dashboards_: Tentatively, you may import from [here](https://github.com/pryorda/vmware_exporter/tree/v0.18.3/dashboards)
