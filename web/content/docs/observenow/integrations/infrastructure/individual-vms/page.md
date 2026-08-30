---
title: "Install and Run"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/individual-vms"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/individual-vms"
status: "ok"
---

StackGen's `Single Node Agent` can be used to collect metrics from individual VMs.

## Install and Run

Download and run the agent installer on the machine you wish to install the agent:

```shell
# for amd64 machines

$ curl -L https://opsverse-public.s3.amazonaws.com/agent/single-node/installer.sh -o installer.sh

# for arm64 machines

$ curl -L https://opsverse-public.s3.amazonaws.com/agent/single-node/installer-arm64.sh -o installer.sh

chmod +x ./installer.sh

sudo ./installer.sh -- -m <metricsHost> -l <logsHost> -t <tracesHost>  -p ********
```

info

If your machine already has the `/etc/opsverse/agent-config.yaml` file, the installer will prompt you to choose whether to overwrite it or to use the exiting one.

For no prompt (e.g., in scripts), you may pass the `-f` option to force the override the existing file. Alternatively, you can pass in `--no-config-override` to use the existing config without prompting.

If both options are used together, `--no-config-override` takes priority.

Verify the agent is running:

```shell
$ sudo systemctl status opsverse-agent
```

At this point, you should be able to see metrics and logs coming into your `ObserveNow` instance

## Updating Configurations

There may be cases where you have to update the agent config file (at `/etc/opsverse/agent-config.yaml`). For example, when you're adding a new log dir to forward or if you're updating backend credentials.

In those cases, after config update, simply restart the agent:

```shell
$ sudo systemctl restart opsverse-agent
```

## Collecting Container Metrics

If your node has containers running on it, it's best to install [cAdvisor](https://github.com/google/cadvisor) so that the agent can scrape the container metrics exposed by it as well.

You can do so by running the following on any 64-bit Linux machine:

```shell
# For amd64

$ curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e cadvisor

# For arm64

$ curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e cadvisor
```

This will drop the resulting scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping.

To view a convenient dashboard, you may import the Grafana dashboard ID `11600` (ensure you select the `MetricsServer` datasource when prompted).

## Collecting Application Traces

If your machine has applications running on them, you can instrument them with your favorite open tracing libraries (e.g., [OpenTelemetry](https://opentelemetry.io/docs/instrumentation/)), to begin sending them to your observability backend!

To begin seeing these traces, install the OpenTelemetry Collector on your 64-bit Linux machine:

```shell
# For amd64

$ curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e opsverse-otelcontribcol

# For arm64

$ curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e opsverse-otelcontribcol
```

You may optionally pass the traces collector URL, user, and password (found in the Admin Console under "URLs and Integrations") via the `-t`, `-u`, and `-p` flags, respectively.

info

For any changes to the config at `/etc/opsverse/exporters/opsverse-otelcontribcol/config.yaml`, restart the OpenTelemetry Collector:

`sudo systemctl restart prom-opsverse-otelcontribcol-exporter`

You may view [Application Integrations](/docs/observenow/integrations/applications/opentelemetry-operator-for-kubernetes) for tips on how to instrument apps to emit traces.
