---
title: "Auto Instrumenting via the OpenTelemetry Operator"
product: "observenow"
sourcePath: "/observenow/integrations/applications/opentelemetry-operator-for-kubernetes"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/opentelemetry-operator-for-kubernetes"
status: "ok"
---

When installing the [StackGen Agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) onto your Kubernetes cluster, we also give the option to install the [OpenTelemetry Operator for Kubernetes](https://github.com/open-telemetry/opentelemetry-operator).

With the Operator on your cluster, it will auto-instrument your Kubernetes apps by injecting the OpenTelemetry instrumentation libraries into your app container.

This auto-instrumentation (via annotations) allow you enable traces without changing application code.

## Auto Instrumenting via the OpenTelemetry Operator

- Install the StackGen Agent ( [steps here](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)) with the following flag enabled in your `values.yaml` file:

```yaml
oteloperator:

  enabled: true
```

warning

If you've already installed the agent, please **uninstall it first**: `helm uninstall -n devopsnow devopsnow-agent` and then re-install.

The OTel Operator chart installs CRDs, and Helm ( _out of_ [_best practice_](https://helm.sh/docs/chart_best_practices/custom_resource_definitions/)) only installs CRDs at install time; they are ignored during `helm upgrade ...`

- After the agent is installed, simply add the following **annotation** to your _Pod_ (depending on the language of your app):

### Java

```shell
instrumentation.opentelemetry.io/inject-java: devopsnow/devopsnow-agent-otel-operator-instrumentation
```

### NodeJS

```shell
instrumentation.opentelemetry.io/inject-nodejs: devopsnow/devopsnow-agent-otel-operator-instrumentation
```

### Python

```shell
instrumentation.opentelemetry.io/inject-python: devopsnow/devopsnow-agent-otel-operator-instrumentation
```

info

Only the `key` changes per language. The `value` is the same (an `Instrumentation` spec which was created during Step (1) - pointing to your OpenTelemetry Collector)

For **example**, a sample NodeJS app may have the following annotation:

```yaml
apiVersion: apps/v1

kind: Deployment

metadata:

  ...

spec:

  ...

  template:

    metadata:

      annotations:

        instrumentation.opentelemetry.io/inject-nodejs: "devopsnow/devopsnow-agent-otel-operator-instrumentation"

  ...
```

- Once rolled out, you'll begin seeing traces come into `Grafana Explore` under the `Traces` data source. You can also use the `APM Insights` dashboard in Grafana to get high level insights into your application traces.

- [Auto Instrumenting via the OpenTelemetry Operator](/docs/observenow/integrations/applications/opentelemetry-operator-for-kubernetes#auto-instrumenting-via-the-opentelemetry-operator)
  - [Java](/docs/observenow/integrations/applications/opentelemetry-operator-for-kubernetes#java)
  - [NodeJS](/docs/observenow/integrations/applications/opentelemetry-operator-for-kubernetes#nodejs)
  - [Python](/docs/observenow/integrations/applications/opentelemetry-operator-for-kubernetes#python)
