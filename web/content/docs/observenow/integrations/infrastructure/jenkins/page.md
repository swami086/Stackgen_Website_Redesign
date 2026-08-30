---
title: "Installation"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/jenkins"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/jenkins"
status: "ok"
---

Jenkins supports [OpenTelemetry](https://plugins.jenkins.io/opentelemetry/) and [Prometheus metrics](https://plugins.jenkins.io/prometheus/#plugin-content-jenkins-prometheus-metrics-plugin) plugins that help collect metrics and traces from Jenkins.

## Installation

The plugins can be installed via two methods:

1. Using the " **Plugin Manager**" (`Manage Jenkins > Plugins > Available Plugins` )in the Jenkins web UI.
2. Using the [Jenkins CLI](https://www.jenkins.io/doc/book/managing/plugins/#install-with-cli)

Install both the [OpenTelemetry](https://plugins.jenkins.io/opentelemetry/) and [Prometheus metrics](https://plugins.jenkins.io/prometheus/#plugin-content-jenkins-prometheus-metrics-plugin) plugins.

## Configuration

Once the plugins are installed, they need to be configured to send metrics to StackGen's `ObserveNow` stack. Navigate to `Manage Jenkins > System` and configure the plugins as following.

### OpenTelemetry

For OpenTelemetry, configure the `OTLP Endpoint` and set the `Exporter Timeout (ms)` and `Metrics Exporter Interval (ms)` inside the Advanced tab as below.

text

```none
OTLP Endpoint = http://otel-collector.devopsnow.svc.cluster.local:4318

Exporter Timeout (ms) = 30000

Metrics Exporter Interval (ms) = 60000
```

:::

![](https://docs.stackgen.com/assets/images/BlTNJp7v7nSoF3OP-T7KI_screenshot-2024-03-04-at-121026-pm-6c1bb2aaeeedc257d55ffeb2902fdad9.png)

### Prometheus

The following `annotations` must be added in the Jenkins deployment file to enable scraping of metrics via Prometheus. For a [bitnami helm chart based Jenkins deployment](https://github.com/bitnami/charts/tree/main/bitnami/jenkins/#installing-the-chart) add the following snippet to the `values.yaml` file of the Jenkins deployment.

```yaml
service:

  annotations: {

    prometheus.io/scrape: "true",

    prometheus.io/port: "8080",

    prometheus.io/path: "/prometheus/"

  }
```

tip

Make sure that the `path` inside Prometheus system values is set to `prometheus`(this is the default value for path).

## Visualization

Once the required telemetry is enabled, the `Jenkins Overview` dashboard that is pre-packaged with your `ObserveNow` stack can be used to visualize incoming traffic.

![Jenkins Dashboard](https://docs.stackgen.com/assets/images/IJJpUnmaf7N0rU6EwEyWj_screen-shot-2024-03-26-at-50905-pm-5d44baa5c59aa8b60c014c3095e63017.png)

- [Installation](/docs/observenow/integrations/infrastructure/jenkins#installation)
- [Configuration](/docs/observenow/integrations/infrastructure/jenkins#configuration)
  - [OpenTelemetry](/docs/observenow/integrations/infrastructure/jenkins#opentelemetry)
  - [Prometheus](/docs/observenow/integrations/infrastructure/jenkins#prometheus)
