---
title: "Prerequisites"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints"
status: "ok"
---

StackGen Agent can be configured to collect metrics from any HTTP endpoint that exposes exposes metrics in a Prometheus-compatible format.

### Prerequisites

- StackGen Agent should be able to access the HTTP Endpoint that is emitting the metrics.

## Configuration

### Kubernetes Agent

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
observe-agent:

  victoria-metrics-agent:

    extraScrapeConfigs:

      - job_name: 'my_service_job'

        static_configs:

          - targets: ['http://example.com/metrics']
```

warning

If you already have an `scrape_configs` block defined in `victoria-metrics-agent` in your values.yaml, you can simply append the job to the end of the existing config

Please ensure that the URL/target that is being configured is emitting the metrics by navigating to the URL/target in the browser.

### Standalone Agent

Create a new file in `/etc/opsverse/targets/` named `your-service-name.json` and add the following details into it:

```json
[\
\
  {\
\
    "labels": {\
\
      "job": "my_service_job"\
\
    },\
\
    "targets": [\
\
      "http://example.com/metrics"\
\
    ]\
\
  }\
\
]
```

Save this file and restart the agent and StackGen agent will start scraping the new endpoint as well.

- [Prerequisites](/docs/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints#prerequisites)
- [Configuration](/docs/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints#configuration)
  - [Kubernetes Agent](/docs/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints#kubernetes-agent)
  - [Standalone Agent](/docs/observenow/integrations/infrastructure/prometheus-compatible-metrics-endendpoints#standalone-agent)
