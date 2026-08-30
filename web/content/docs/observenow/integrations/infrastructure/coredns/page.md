---
title: "Prerequisites"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/coredns"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/coredns"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from CoreDNS running in your Kubernetes Cluster.

### Prerequisites

- StackGen Agent should be running in the same cluster where CoreDNS pods are running

## Configuration

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
observe-agent:

  victoria-metrics-agent:

    extraScrapeConfigs:

      - job_name: 'coredns'

        kubernetes_sd_configs:

          - role: pod

        relabel_configs:

          - source_labels: [__meta_kubernetes_pod_label_k8s_app]

            action: keep

            regex: kube-dns
```

warning

If you already have an `extraScrapeConfigs` block defined in `victoria-metrics-agent` in your values.yaml, you can simply append the job to the end of the existing config

## Visualization

You can use the [community-provided CoreDNS Grafana dashboard](https://grafana.com/grafana/dashboards/14981-coredns/) to visualise your CoreDNS metrics

![CoreDNS Dashboard](https://docs.stackgen.com/assets/images/ibl_P5JvALfaq64lBhWg8-1VqNx51udVpN_u4cPX9AP-20241003-075256-7836df14697f57c9b65be8041d232b71.png)
