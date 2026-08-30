---
title: "Metrics FAQs"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/kubernetes"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/kubernetes"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) is used to collect logs and several out-of-the box metrics from your Kubernetes cluster. The agent also enables the collection of APM traces by default. Follow the [instructions documented here](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) to run the agent on a Kubernetes cluster.

However, there may be additional tweaks you want to make for your specific environment. This page will show common config changes you can make to the agent's `values.yaml` and re-run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

## Metrics FAQs

### How can I fine-tune my metrics configuration?

Moving the metrics scrape config to the property `victoria-metrics-agent.config.scrape_configs` in your `values.yaml` file will enable you to customize it. The default metrics scrape config is:

```yaml
victoria-metrics-agent:

  ...

  config:

    ...

    scrape_configs:

      - job_name: 'kubernetes-apiservers'

        kubernetes_sd_configs:

          - role: endpoints

        scheme: https

        tls_config:

          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt

          insecure_skip_verify: true

        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        # Keep only the default/kubernetes service endpoints for the https port. This

        # will add targets for each API server which Kubernetes adds an endpoint to

        # the default/kubernetes service.

        relabel_configs:

          - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]

            action: keep

            regex: default;kubernetes;https

      - job_name: 'kubernetes-nodes'

        # Default to scraping over https. If required, just disable this or change to

        # `http`.

        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape

        # endpoints for cluster components. This is separate to discovery auth

        # configuration because discovery & scraping are two separate concerns in

        # Prometheus. The discovery auth config is automatic if Prometheus runs inside

        # the cluster. Otherwise, more config options have to be provided within the

        # <kubernetes_sd_config>.

        tls_config:

          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt

          # If your node certificates are self-signed or use a different CA to the

          # master CA, then disable certificate verification below. Note that

          # certificate verification is an integral part of a secure infrastructure

          # so this should only be disabled in a controlled environment. You can

          # disable certificate verification by uncommenting the line below.

          #

          insecure_skip_verify: true

        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:

          - role: node

        relabel_configs:

          - action: labelmap

            regex: __meta_kubernetes_node_label_(.+)

          - target_label: __address__

            replacement: kubernetes.default.svc:443

          - source_labels: [__meta_kubernetes_node_name]

            regex: (.+)

            target_label: __metrics_path__

            replacement: /api/v1/nodes/$1/proxy/metrics

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      - job_name: 'kubernetes-nodes-cadvisor'

        # Default to scraping over https. If required, just disable this or change to

        # `http`.

        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape

        # endpoints for cluster components. This is separate to discovery auth

        # configuration because discovery & scraping are two separate concerns in

        # Prometheus. The discovery auth config is automatic if Prometheus runs inside

        # the cluster. Otherwise, more config options have to be provided within the

        # <kubernetes_sd_config>.

        tls_config:

          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt

          # If your node certificates are self-signed or use a different CA to the

          # master CA, then disable certificate verification below. Note that

          # certificate verification is an integral part of a secure infrastructure

          # so this should only be disabled in a controlled environment. You can

          # disable certificate verification by uncommenting the line below.

          #

          insecure_skip_verify: true

        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:

          - role: node

        # This configuration will work only on kubelet 1.7.3+

        # As the scrape endpoints for cAdvisor have changed

        # if you are using older version you need to change the replacement to

        # replacement: /api/v1/nodes/$1:4194/proxy/metrics

        # more info here https://github.com/coreos/prometheus-operator/issues/633

        relabel_configs:

          - action: labelmap

            regex: __meta_kubernetes_node_label_(.+)

          - target_label: __address__

            replacement: kubernetes.default.svc:443

          - source_labels: [__meta_kubernetes_node_name]

            regex: (.+)

            target_label: __metrics_path__

            replacement: /api/v1/nodes/$1/proxy/metrics/cadvisor

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      # Scrape config for service endpoints.

      #

      # The relabeling allows the actual service scrape endpoint to be configured

      # via the following annotations:

      #

      # * `prometheus.io/scrape`: Only scrape services that have a value of `true`

      # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need

      # to set this to `https` & most likely set the `tls_config` of the scrape config.

      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.

      # * `prometheus.io/port`: If the metrics are exposed on a different port to the

      # service then set this appropriately.

      - job_name: 'kubernetes-service-endpoints'

        kubernetes_sd_configs:

          - role: endpoints

        relabel_configs:

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]

            action: keep

            regex: true

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]

            action: replace

            target_label: __scheme__

            regex: (https?)

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]

            action: replace

            target_label: __metrics_path__

            regex: (.+)

          - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]

            action: replace

            target_label: __address__

            regex: ([^:]+)(?::\d+)?;(\d+)

            replacement: $1:$2

          - action: labelmap

            regex: __meta_kubernetes_service_label_(.+)

          - source_labels: [__meta_kubernetes_namespace]

            action: replace

            target_label: kubernetes_namespace

          - source_labels: [__meta_kubernetes_service_name]

            action: replace

            target_label: kubernetes_name

          - source_labels: [__meta_kubernetes_pod_node_name]

            action: replace

            target_label: kubernetes_node

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      # Scrape config for slow service endpoints; same as above, but with a larger

      # timeout and a larger interval

      #

      # The relabeling allows the actual service scrape endpoint to be configured

      # via the following annotations:

      #

      # * `prometheus.io/scrape-slow`: Only scrape services that have a value of `true`

      # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need

      # to set this to `https` & most likely set the `tls_config` of the scrape config.

      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.

      # * `prometheus.io/port`: If the metrics are exposed on a different port to the

      # service then set this appropriately.

      - job_name: 'kubernetes-service-endpoints-slow'

        kubernetes_sd_configs:

          - role: endpoints

        relabel_configs:

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape_slow]

            action: keep

            regex: true

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]

            action: replace

            target_label: __scheme__

            regex: (https?)

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]

            action: replace

            target_label: __metrics_path__

            regex: (.+)

          - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]

            action: replace

            target_label: __address__

            regex: ([^:]+)(?::\d+)?;(\d+)

            replacement: $1:$2

          - action: labelmap

            regex: __meta_kubernetes_service_label_(.+)

          - source_labels: [__meta_kubernetes_namespace]

            action: replace

            target_label: kubernetes_namespace

          - source_labels: [__meta_kubernetes_service_name]

            action: replace

            target_label: kubernetes_name

          - source_labels: [__meta_kubernetes_pod_node_name]

            action: replace

            target_label: kubernetes_node

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      - job_name: 'prometheus-pushgateway'

        honor_labels: true

        kubernetes_sd_configs:

          - role: service

        relabel_configs:

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]

            action: keep

            regex: pushgateway

      # Example scrape config for probing services via the Blackbox Exporter.

      #

      # The relabeling allows the actual service scrape endpoint to be configured

      # via the following annotations:

      #

      # * `prometheus.io/probe`: Only probe services that have a value of `true`

      - job_name: 'kubernetes-services'

        metrics_path: /probe

        params:

          module: [http_2xx]

        kubernetes_sd_configs:

          - role: service

        relabel_configs:

          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]

            action: keep

            regex: true

          - source_labels: [__address__]

            target_label: __param_target

          - target_label: __address__

            replacement: blackbox

          - source_labels: [__param_target]

            target_label: instance

          - action: labelmap

            regex: __meta_kubernetes_service_label_(.+)

          - source_labels: [__meta_kubernetes_namespace]

            target_label: kubernetes_namespace

          - source_labels: [__meta_kubernetes_service_name]

            target_label: kubernetes_name

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      # Example scrape config for pods

      #

      # The relabeling allows the actual pod scrape endpoint to be configured via the

      # following annotations:

      #

      # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`

      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.

      # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.

      - job_name: 'kubernetes-nodes'

        kubernetes_sd_configs:

          - role: pod

        relabel_configs:

          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]

            action: keep

            regex: true

          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]

            action: replace

            target_label: __metrics_path__

            regex: (.+)

          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]

            action: replace

            regex: ([^:]+)(?::\d+)?;(\d+)

            replacement: $1:$2

            target_label: __address__

          - action: labelmap

            regex: __meta_kubernetes_pod_label_(.+)

          - source_labels: [__meta_kubernetes_namespace]

            action: replace

            target_label: kubernetes_namespace

          - source_labels: [__meta_kubernetes_pod_name]

            action: replace

            target_label: kubernetes_pod_name

          - source_labels: [__meta_kubernetes_pod_phase]

            regex: Pending|Succeeded|Failed

            action: drop

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop

      # Example Scrape config for pods which should be scraped slower. An useful example

      # would be stackriver-exporter which queries an API on every scrape of the pod

      #

      # The relabeling allows the actual pod scrape endpoint to be configured via the

      # following annotations:

      #

      # * `prometheus.io/scrape-slow`: Only scrape pods that have a value of `true`

      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.

      # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.

      - job_name: 'kubernetes-pods-slow'

        kubernetes_sd_configs:

          - role: pod

        relabel_configs:

          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape_slow]

            action: keep

            regex: true

          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]

            action: replace

            target_label: __metrics_path__

            regex: (.+)

          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]

            action: replace

            regex: ([^:]+)(?::\d+)?;(\d+)

            replacement: $1:$2

            target_label: __address__

          - action: labelmap

            regex: __meta_kubernetes_pod_label_(.+)

          - source_labels: [__meta_kubernetes_namespace]

            action: replace

            target_label: kubernetes_namespace

          - source_labels: [__meta_kubernetes_pod_name]

            action: replace

            target_label: kubernetes_pod_name

          - source_labels: [__meta_kubernetes_pod_phase]

            regex: Pending|Succeeded|Failed

            action: drop

        metric_relabel_configs:

          - source_labels: [ __name__ ]

            regex: 'go_.*|coredns_.*'

            action: drop

          - regex: 'id|helm_sh_chart|app_kubernetes_io_managed_by|controller_revision_hash|pod_template_generation'

            action: labeldrop
```

### How can I ignore an entire namespace?

Follow the instructions in the previous FAQ to setup your scrape configs for customization. You can ignore specific namespaces by adding the following snippet to the `relabel_configs` section of the relevant scrape jobs:

```yaml
        - action: drop

          regex: <namespace to be dropped>

          source_labels:

            - __meta_kubernetes_namespace
```

The following example snippet drops all metrics from the namespaces `default` and `test`:

```yaml
        - action: drop

          regex: default|test

          source_labels:

            - __meta_kubernetes_namespace
```

This strategy can be used with any of the other `labels` attached to your metrics.

### How can I collect metrics from just the specified namespaces?

Follow the instructions in the previous FAQ to setup your scrape configs for customization. You can mention specific namespaces by adding the following snippet to the `relabel_configs` section of the relevant scrape jobs:

```yaml
        - action: keep

          regex: <namespace to be included>

          source_labels:

            - __meta_kubernetes_namespace
```

The following example snippet includes just `default` and `prod` namespaces and drops metrics from all other namespaces.

```yaml
        - action: keep

          regex: default|prod

          source_labels:

            - __meta_kubernetes_namespace
```

This strategy can be used with any of the other `labels` attached to your metrics.

### How can I prevent a specific service/pod from getting scraped?

By default, StackGen Agent scrapes all services/pods which have the `prometheus.io/scrape: true` annotation. If you would like to prevent scraping a service/pod with this annotation you should remove this annotation from the service/pod.

Alternatively, you can add an additional annotation `opsverse.io/scrape-ignore: "true"` to the service/pod and that will prevent StackGen Agent from scraping the service/pod.

### How can I change the scrape interval for metrics?

Follow the instructions in the previous FAQ to setup your scrape configs for customization. You can change the scrape interval for metrics by adding the following snippet to the `victoria-metrics-agent.config` property of your `values.yaml` file:

```yaml
victoria-metrics-agent:

  config:

    global:

      scrape_interval: <scrape-interval>
```

`scrape_interval` can take values like `1s`, `1m`, `1h` for seconds, minutes, and hours respectively.

## Logs FAQs

### How can I fine-tune my logs configuration?

Moving the logs scrape config to the property `daemonSet.config` in your `values.yaml` file will enable you to customize it. The default logs scrape config is:

```yaml
    integrations:

      agent:

        enabled: true

        scrape_interval: 15s

        relabel_configs:

          - source_labels: [agent_hostname]

            action: replace

            target_label: node

      node_exporter:

        enabled: true

        scrape_interval: 15s

        relabel_configs:

          - source_labels: [agent_hostname]

            action: replace

            target_label: node

      prometheus_remote_write:

        - url: http://devopsnow-vmagent:8429/api/v1/write

    loki:

      positions_directory: /tmp/positions.yaml

      configs:

      - name: default

        clients:

          - url: https://{{ .Values.logs.host }}/loki/api/v1/push

            basic_auth:

              username: {{ .Values.logs.username }}

              password: {{ .Values.logs.password }}

        scrape_configs:

          - job_name: kubernetes-pods-name

            kubernetes_sd_configs:

              - role: pod

            pipeline_stages:

              - cri: {}

              - docker: {}

              {{ if .Values.logs.multiline.snippet }}

                {{- .Values.logs.multiline.snippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.dropSnippet }}

                {{- .Values.logs.pipelineStages.dropSnippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.maskPrivateInfoSnippet }}

                {{- .Values.logs.pipelineStages.maskPrivateInfoSnippet | nindent 10 }}

              {{- end }}

            relabel_configs:

              - source_labels:

                  - __meta_kubernetes_pod_label_name

                target_label: __service__

              - action: replace

                replacement: {{ .Values.cluster_name }}

                target_label: cluster

              - source_labels:

                  - __meta_kubernetes_pod_node_name

                target_label: __host__

              - action: drop

                regex: ""

                source_labels:

                  - __service__

              - action: labelmap

                regex: __meta_kubernetes_pod_label_(.+)

              - action: replace

                replacement: $1

                separator: /

                source_labels:

                  - __meta_kubernetes_namespace

                  - __service__

                target_label: job

              - action: replace

                source_labels:

                  - __meta_kubernetes_namespace

                target_label: namespace

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_name

                target_label: pod

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_container_name

                target_label: container

              - replacement: /var/log/pods/*$1/*.log

                separator: /

                source_labels:

                  - __meta_kubernetes_pod_uid

                  - __meta_kubernetes_pod_container_name

                target_label: __path__

          - job_name: kubernetes-pods-app

            kubernetes_sd_configs:

              - role: pod

            pipeline_stages:

              - cri: {}

              - docker: {}

              {{ if .Values.logs.multiline.snippet }}

                {{- .Values.logs.multiline.snippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.dropSnippet }}

                {{- .Values.logs.pipelineStages.dropSnippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.maskPrivateInfoSnippet }}

                {{- .Values.logs.pipelineStages.maskPrivateInfoSnippet | nindent 10 }}

              {{- end }}

            relabel_configs:

              - action: replace

                replacement: {{ .Values.cluster_name }}

                target_label: cluster

              - action: drop

                regex: .+

                source_labels:

                  - __meta_kubernetes_pod_label_name

              - source_labels:

                  - __meta_kubernetes_pod_label_app

                target_label: __service__

              - source_labels:

                  - __meta_kubernetes_pod_node_name

                target_label: __host__

              - action: drop

                regex: ""

                source_labels:

                  - __service__

              - action: labelmap

                regex: __meta_kubernetes_pod_label_(.+)

              - action: replace

                replacement: $1

                separator: /

                source_labels:

                  - __meta_kubernetes_namespace

                  - __service__

                target_label: job

              - action: replace

                source_labels:

                  - __meta_kubernetes_namespace

                target_label: namespace

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_name

                target_label: pod

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_container_name

                target_label: container

              - replacement: /var/log/pods/*$1/*.log

                separator: /

                source_labels:

                  - __meta_kubernetes_pod_uid

                  - __meta_kubernetes_pod_container_name

                target_label: __path__

          - job_name: kubernetes-pods-direct-controllers

            kubernetes_sd_configs:

              - role: pod

            pipeline_stages:

              - cri: {}

              - docker: {}

              {{ if .Values.logs.multiline.snippet }}

                {{- .Values.logs.multiline.snippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.dropSnippet }}

                {{- .Values.logs.pipelineStages.dropSnippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.maskPrivateInfoSnippet }}

                {{- .Values.logs.pipelineStages.maskPrivateInfoSnippet | nindent 10 }}

              {{- end }}

            relabel_configs:

              - action: replace

                replacement: {{ .Values.cluster_name }}

                target_label: cluster

              - action: drop

                regex: .+

                separator: ""

                source_labels:

                  - __meta_kubernetes_pod_label_name

                  - __meta_kubernetes_pod_label_app

              - action: drop

                regex: '[0-9a-z-.]+-[0-9a-f]{8,10}'

                source_labels:

                  - __meta_kubernetes_pod_controller_name

              - source_labels:

                  - __meta_kubernetes_pod_controller_name

                target_label: __service__

              - source_labels:

                  - __meta_kubernetes_pod_node_name

                target_label: __host__

              - action: drop

                regex: ""

                source_labels:

                  - __service__

              - action: labelmap

                regex: __meta_kubernetes_pod_label_(.+)

              - action: replace

                replacement: $1

                separator: /

                source_labels:

                  - __meta_kubernetes_namespace

                  - __service__

                target_label: job

              - action: replace

                source_labels:

                  - __meta_kubernetes_namespace

                target_label: namespace

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_name

                target_label: pod

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_container_name

                target_label: container

              - replacement: /var/log/pods/*$1/*.log

                separator: /

                source_labels:

                  - __meta_kubernetes_pod_uid

                  - __meta_kubernetes_pod_container_name

                target_label: __path__

          - job_name: kubernetes-pods-indirect-controller

            kubernetes_sd_configs:

              - role: pod

            pipeline_stages:

              - cri: {}

              - docker: {}

              {{ if .Values.logs.multiline.snippet }}

                {{- .Values.logs.multiline.snippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.dropSnippet }}

                {{- .Values.logs.pipelineStages.dropSnippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.maskPrivateInfoSnippet }}

                {{- .Values.logs.pipelineStages.maskPrivateInfoSnippet | nindent 10 }}

              {{- end }}

            relabel_configs:

              - action: replace

                replacement: {{ .Values.cluster_name }}

                target_label: cluster

              - action: drop

                regex: .+

                separator: ""

                source_labels:

                  - __meta_kubernetes_pod_label_name

                  - __meta_kubernetes_pod_label_app

              - action: keep

                regex: '[0-9a-z-.]+-[0-9a-f]{8,10}'

                source_labels:

                  - __meta_kubernetes_pod_controller_name

              - action: replace

                regex: ([0-9a-z-.]+)-[0-9a-f]{8,10}

                source_labels:

                  - __meta_kubernetes_pod_controller_name

                target_label: __service__

              - source_labels:

                  - __meta_kubernetes_pod_node_name

                target_label: __host__

              - action: drop

                regex: ""

                source_labels:

                  - __service__

              - action: labelmap

                regex: __meta_kubernetes_pod_label_(.+)

              - action: replace

                replacement: $1

                separator: /

                source_labels:

                  - __meta_kubernetes_namespace

                  - __service__

                target_label: job

              - action: replace

                source_labels:

                  - __meta_kubernetes_namespace

                target_label: namespace

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_name

                target_label: pod

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_container_name

                target_label: container

              - replacement: /var/log/pods/*$1/*.log

                separator: /

                source_labels:

                  - __meta_kubernetes_pod_uid

                  - __meta_kubernetes_pod_container_name

                target_label: __path__

          - job_name: kubernetes-pods-static

            kubernetes_sd_configs:

              - role: pod

            pipeline_stages:

              - cri: {}

              - docker: {}

              {{ if .Values.logs.multiline.snippet }}

                {{- .Values.logs.multiline.snippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.dropSnippet }}

                {{- .Values.logs.pipelineStages.dropSnippet | nindent 10 }}

              {{- end }}

              {{ if .Values.logs.pipelineStages.maskPrivateInfoSnippet }}

                {{- .Values.logs.pipelineStages.maskPrivateInfoSnippet | nindent 10 }}

              {{- end }}

            relabel_configs:

              - action: replace

                replacement: {{ .Values.cluster_name }}

                target_label: cluster

              - action: drop

                regex: ""

                source_labels:

                  - __meta_kubernetes_pod_annotation_kubernetes_io_config_mirror

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_label_component

                target_label: __service__

              - source_labels:

                  - __meta_kubernetes_pod_node_name

                target_label: __host__

              - action: drop

                regex: ""

                source_labels:

                  - __service__

              - action: labelmap

                regex: __meta_kubernetes_pod_label_(.+)

              - action: replace

                replacement: $1

                separator: /

                source_labels:

                  - __meta_kubernetes_namespace

                  - __service__

                target_label: job

              - action: replace

                source_labels:

                  - __meta_kubernetes_namespace

                target_label: namespace

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_name

                target_label: pod

              - action: replace

                source_labels:

                  - __meta_kubernetes_pod_container_name

                target_label: container

              - replacement: /var/log/pods/*$1/*.log

                separator: /

                source_labels:

                  - __meta_kubernetes_pod_annotation_kubernetes_io_config_mirror

                  - __meta_kubernetes_pod_container_name

                target_label: __path__
```

### How can I ignore an entire namespace?

You can ignore specific namespaces by adding the following snippet to the `pipelineStages` inside `logs` in your agent values file :

```yaml
logs:

  pipelineStages:

    dropSnippet: |

      - drop:

          source: "namespace"

          expression: "<regex-of-namespaces-to-be-dropped>"
```

The following example snippet drops all logs from the namespaces `default` and `test`:

```yaml
logs:

  pipelineStages:

    dropSnippet: |

      - drop:

          source: "namespace"

          expression: "default|test"
```

This strategy can be used with any of the other `labels` attached to your logs.

### How can I collect logs from just the specified namespaces?

Follow the instructions in the previous FAQ to set up your logs scraping configs for customization. You can mention specific namespaces by adding the following snippet to the `relabel_configs` section of the relevant scrape jobs:

```yaml
        - action: keep

          regex: <namespace to be included>

          source_labels:

            - __meta_kubernetes_namespace
```

The following example snippet includes just `default` and `prod` namespaces and drops logs from all other namespaces.

```yaml
        - action: keep

          regex: default|prod

          source_labels:

            - __meta_kubernetes_namespace
```

This strategy can be used with any of the other `labels` attached to your logs.

### How can I ignore all the log lines based on a regex?

You can drop all the log lines based on regex by adding the following snippet to the `pipelineStages` inside `logs` in your agent values file :

```yaml
logs:

  pipelineStages:

    dropSnippet: |

      - drop:

          expression: "regex"
```

This strategy can be used with any of the other `labels` attached to your logs.

This can be used in multiple scenarios. Below are few examples on how the regex-based log dropping can be used:

**Example #1:** If there is a need to drop all the log lines that are of level `DEBUG`, the following example snippet can be used to drop all the log lines of level `DEBUG`:

```yaml
logs:

  pipelineStages:

    dropSnippet: |

      - drop:

          expression: ".*DEBUG.*"
```

**Example #2:** If there is a need to drop all the log lines of a specific API, the following example snippet can be used to drop all the log lines of the specific API:

```yaml
logs:

  pipelineStages:

    dropSnippet: |

      - drop:

          expression: "<api_path_regex>"
```

### What is the multi-line snippet field in my values file?

Sometimes, applications may write a multiple-line event into a log file. We want these to be treated as a single log event, so this block identifies the timestamp as the first line of a multi-line log event.

This should suffice for the majority of use cases, but if your organization uses a different convention, the regex can be updated in this block if you want better multi-line support.

### How can I hide sensitive information from my logs?

Sometimes you may come across sensitive information like passwords, credit card numbers, etc visible in your logs. You might want to hide these or replace them with some other text, characters or remove them altogether.

This can be done by adding the `maskPrivateInfoSnippet` snippet to the `pipelineStages` inside `logs` in your agent values file as shown below. The below codeblock illustrates a few example usecases.

YAML

```yaml
# replace block 1 - replaces the password string following the word password with "****".

# replace block 2 - To obfuscate sensitive data, you can combine the replace stage with the Hash template method.

# replace block 3 - The given expression will remove the string following the numbers 11.11.11.11

logs:

  pipelineStages:

    maskPrivateInfoSnippet: |

      - replace:

          expression: "password (\\S+)"   # A Regex RE2 regular expression

          replace: "****"                 # Value to which the captured group will be replaced

      - replace:

          # creditcard

          expression: '((?:\d[ -]*?){13,16})'

          replace: '*creditcard*{{ .Value | Hash "salt" }}*'

      - replace:

          expression: "11.11.11.11 - (\\S+\\s)"

          replace: ""
```

:::

info

To know more about `replace` and how to define/configure the block, refer this [documentation](https://grafana.com/docs/loki/latest/send-data/promtail/stages/replace/).

### How can I add new labels to logs based on the contents of the log lines?

This can be achieved by using the `regex` pipeline stage at the agent. Here is an example of extracting the value of `duration` from a log line and adding it as an additional `label`:

```yaml
        - match:

            selector: '{filename=~".*mongo.log"}'

            stages:

              - regex:

                  expression: '\s(?P<duration>\d+)ms$'

              - labels:

                  duration:
```

This section is defined under the `pipeline_stages` sections of your log scrape configs.

## Traces FAQs

### What if I want to change the default sampling rate of the OpenTelemetry collector?

By default, we ingest 100% of traces exported to the OpenTelemetry collector. While this provides the most complete picture of the system being monitored, it can lead to increased ingestion costs. If you wish to sample a given percentage of traces instead, you can add an `otelcollector.traceSamplePercentage` key to your `values.yaml` when installing/updating the agent.

For example,

```yaml
  otelcollector:

    enabled: true

    traceSamplePercentage: 50

    ...
```

### How can I use tail sampling with the OpenTelemetry collector?

Tail sampling is where the decision to sample a trace happens after all the spans in a request have been completed. The tail sampling processor samples traces based on a set of defined policies.

warning

While tail sampling provides you the option to filter your traces based on specific criteria of the system being monitored, **it can lead to increased memory usage**.

To implement tail sampling in the OpenTelemetry collector, add the following YAML snippet to the agent's `values.yaml` under `otelcollector` config and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
otelcollector:

  enabled: true

  ...

  tail_sampling:

    enabled: true

    config:

      decision_wait: 10s

      num_traces: 10000

      expected_new_traces_per_sec: 250

      policies: |

        [\
\
          {\
\
            name: always-sample-policy,\
\
            type: always_sample\
\
          },\
\
        ]

  ...
```

info

The `config` section is configurable. Adjust the values and policies as per your requirements.

The configurable `config` consists of:

- `decision_wait`: The desired wait time from the arrival of the first span of trace until the decision about sampling it or not is evaluated.
- `num_traces`: The number of traces kept in memory. Typically most of the data of a trace is released after a sampling decision is taken.
- `expected_new_traces_per_sec`: This sets the expected number of new traces sent to the tail sampling processor per second. This helps with allocating data structures with closer to the actual usage size.
- `policies`: Policies are used to make sampling decisions. The default policy is set to `always_sample` which samples all traces. Multiple policies can be configured.

You can refer to this [documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md) for more information on tail sampling and to explore [sample policies](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/testdata/tail_sampling_config.yaml).

- [Metrics FAQs](/docs/observenow/integrations/infrastructure/kubernetes#metrics-faqs)
  - [How can I fine-tune my metrics configuration?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-fine-tune-my-metrics-configuration)
  - [How can I ignore an entire namespace?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-ignore-an-entire-namespace)
  - [How can I collect metrics from just the specified namespaces?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-collect-metrics-from-just-the-specified-namespaces)
  - [How can I prevent a specific service/pod from getting scraped?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-prevent-a-specific-servicepod-from-getting-scraped)
  - [How can I change the scrape interval for metrics?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-change-the-scrape-interval-for-metrics)
- [Logs FAQs](/docs/observenow/integrations/infrastructure/kubernetes#logs-faqs)
  - [How can I fine-tune my logs configuration?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-fine-tune-my-logs-configuration)
  - [How can I ignore an entire namespace?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-ignore-an-entire-namespace-1)
  - [How can I collect logs from just the specified namespaces?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-collect-logs-from-just-the-specified-namespaces)
  - [How can I ignore all the log lines based on a regex?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-ignore-all-the-log-lines-based-on-a-regex)
  - [What is the multi-line snippet field in my values file?](/docs/observenow/integrations/infrastructure/kubernetes#what-is-the-multi-line-snippet-field-in-my-values-file)
  - [How can I hide sensitive information from my logs?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-hide-sensitive-information-from-my-logs)
  - [How can I add new labels to logs based on the contents of the log lines?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-add-new-labels-to-logs-based-on-the-contents-of-the-log-lines)
- [Traces FAQs](/docs/observenow/integrations/infrastructure/kubernetes#traces-faqs)
  - [What if I want to change the default sampling rate of the OpenTelemetry collector?](/docs/observenow/integrations/infrastructure/kubernetes#what-if-i-want-to-change-the-default-sampling-rate-of-the-opentelemetry-collector)
  - [How can I use tail sampling with the OpenTelemetry collector?](/docs/observenow/integrations/infrastructure/kubernetes#how-can-i-use-tail-sampling-with-the-opentelemetry-collector)
