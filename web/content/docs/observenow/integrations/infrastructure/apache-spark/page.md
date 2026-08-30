---
title: "Metrics"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/apache-spark"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/apache-spark"
status: "ok"
---

## Metrics

For a [bitnami helm chart based spark deployment](https://github.com/bitnami/charts/tree/main/bitnami/spark) add the following snippet to the `values.yaml` file of the spark deployment:

```yaml
metrics:

  enabled: true

  masterAnnotations:

    prometheus.io/scrape: 'true'

    prometheus.io/path: '/metrics/'

    prometheus.io/port: '{{ .Values.master.containerPorts.http }}'

  workerAnnotations:

    prometheus.io/scrape: 'true'

    prometheus.io/path: '/metrics/'

    prometheus.io/port: '{{ .Values.worker.containerPorts.http }}'
```
