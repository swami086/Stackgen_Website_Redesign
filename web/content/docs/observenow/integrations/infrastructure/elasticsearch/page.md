---
title: "Enable this section to pull metrics from elasticsearch"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/elasticsearch"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/elasticsearch"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from Elasticsearch.

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
# Enable this section to pull metrics from elasticsearch

elasticsearch-exporter:

  enabled: true

  resources: {}

    # requests:

    #   cpu: 100m

    #   memory: 128Mi

    # limits:

    #   cpu: 100m

    #   memory: 128Mi

  service:

    type: ClusterIP

    httpPort: 9108

    metricsPort:

      name: http

    annotations:

      prometheus.io/scrape: "true"

      promtheus.io/port: "9108"

    labels: {}

  ## A list of environment variables from secret refs that will be passed into the exporter pod

  ## example:

  ## This will set ${ES_PASSWORD} to the 'password' key from the 'my-secret' secret

  ## extraEnvSecrets:

  ##   ES_PASSWORD:

  ##     secret: my-secret

  ##     key: password

  extraEnvSecrets: {}

  es:

    ## Address (host and port) of the Elasticsearch node we should connect to.

    ## This could be a local node (localhost:9200, for instance), or the address

    ## of a remote Elasticsearch server. When basic auth is needed,

    ## specify as: <proto>://<user>:<password>@<host>:<port>. e.g., http://admin:pass@localhost:9200.

    ##

    uri: https://<user>:<password>@<service-name/hostname>:9200

    sslSkipVerify: true

  web:

    ## Path under which to expose metrics.

    ##

    path: /metrics
```

Refer [values.yaml](https://github.com/prometheus-community/helm-charts/blob/main/charts/prometheus-elasticsearch-exporter/values.yaml) file from Prometheus community for additional value configurations and default values.
