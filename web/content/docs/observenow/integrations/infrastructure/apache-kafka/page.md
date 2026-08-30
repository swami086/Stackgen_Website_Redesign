---
title: "Enable this section to pull metrics from kafka"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/apache-kafka"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/apache-kafka"
status: "ok"
---

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can be used to collect metrics from Kafka.

Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
# Enable this section to pull metrics from kafka

kafka-exporter:

  enabled: true

  image:

    repository: danielqsj/kafka-exporter

    # Overrides the image tag whose default is the chart appVersion.

    tag: latest

  annotations:

    prometheus.io/scrape: "true"

  kafkaServer:

    - <kafka-server-service-name>.<namespace>.svc.cluster.local:<port>
```

Refer [values.yaml](https://github.com/prometheus-community/helm-charts/blob/main/charts/prometheus-kafka-exporter/values.yaml) file from Prometheus community for additional value configurations and default values.

## Collecting Metrics from Strimzi Based Kafka Deployment

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can also be used to collect metrics from a Strimzi based kafka deployment.

To instrument metrics (`JMX` and `kafka-exporter`) from a Strimzi based kafka deployment follow the given steps:

- Deploy the following `config-map` in the same `namespace` as your kafka deployment:

```text
    kind: ConfigMap

  apiVersion: v1

  metadata:

    name: kafka-metrics

    labels:

      app: strimzi

  data:

    kafka-metrics-config.yml: |

      # See https://github.com/prometheus/jmx_exporter for more info about JMX Prometheus Exporter metrics

      lowercaseOutputName: true

      rules:

      # Special cases and very specific rules

      - pattern: kafka.server<type=(.+), name=(.+), clientId=(.+), topic=(.+), partition=(.*)><>Value

        name: kafka_server_$1_$2

        type: GAUGE

        labels:

        clientId: "$3"

        topic: "$4"

        partition: "$5"

      - pattern: kafka.server<type=(.+), name=(.+), clientId=(.+), brokerHost=(.+), brokerPort=(.+)><>Value

        name: kafka_server_$1_$2

        type: GAUGE

        labels:

        clientId: "$3"

        broker: "$4:$5"

      - pattern: kafka.server<type=(.+), cipher=(.+), protocol=(.+), listener=(.+), networkProcessor=(.+)><>connections

        name: kafka_server_$1_connections_tls_info

        type: GAUGE

        labels:

          cipher: "$2"

          protocol: "$3"

          listener: "$4"

          networkProcessor: "$5"

      - pattern: kafka.server<type=(.+), clientSoftwareName=(.+), clientSoftwareVersion=(.+), listener=(.+), networkProcessor=(.+)><>connections

        name: kafka_server_$1_connections_software

        type: GAUGE

        labels:

          clientSoftwareName: "$2"

          clientSoftwareVersion: "$3"

          listener: "$4"

          networkProcessor: "$5"

      - pattern: "kafka.server<type=(.+), listener=(.+), networkProcessor=(.+)><>(.+):"

        name: kafka_server_$1_$4

        type: GAUGE

        labels:

        listener: "$2"

        networkProcessor: "$3"

      - pattern: kafka.server<type=(.+), listener=(.+), networkProcessor=(.+)><>(.+)

        name: kafka_server_$1_$4

        type: GAUGE

        labels:

        listener: "$2"

        networkProcessor: "$3"

      # Some percent metrics use MeanRate attribute

      # Ex) kafka.server<type=(KafkaRequestHandlerPool), name=(RequestHandlerAvgIdlePercent)><>MeanRate

      - pattern: kafka.(\w+)<type=(.+), name=(.+)Percent\w*><>MeanRate

        name: kafka_$1_$2_$3_percent

        type: GAUGE

      # Generic gauges for percents

      - pattern: kafka.(\w+)<type=(.+), name=(.+)Percent\w*><>Value

        name: kafka_$1_$2_$3_percent

        type: GAUGE

      - pattern: kafka.(\w+)<type=(.+), name=(.+)Percent\w*, (.+)=(.+)><>Value

        name: kafka_$1_$2_$3_percent

        type: GAUGE

        labels:

          "$4": "$5"

      # Generic per-second counters with 0-2 key/value pairs

      - pattern: kafka.(\w+)<type=(.+), name=(.+)PerSec\w*, (.+)=(.+), (.+)=(.+)><>Count

        name: kafka_$1_$2_$3_total

        type: COUNTER

        labels:

          "$4": "$5"

          "$6": "$7"

      - pattern: kafka.(\w+)<type=(.+), name=(.+)PerSec\w*, (.+)=(.+)><>Count

        name: kafka_$1_$2_$3_total

        type: COUNTER

        labels:

          "$4": "$5"

      - pattern: kafka.(\w+)<type=(.+), name=(.+)PerSec\w*><>Count

        name: kafka_$1_$2_$3_total

        type: COUNTER

      # Generic gauges with 0-2 key/value pairs

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.+), (.+)=(.+)><>Value

        name: kafka_$1_$2_$3

        type: GAUGE

        labels:

          "$4": "$5"

          "$6": "$7"

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.+)><>Value

        name: kafka_$1_$2_$3

        type: GAUGE

        labels:

          "$4": "$5"

      - pattern: kafka.(\w+)<type=(.+), name=(.+)><>Value

        name: kafka_$1_$2_$3

        type: GAUGE

      # Emulate Prometheus 'Summary' metrics for the exported 'Histogram's.

      # Note that these are missing the '_sum' metric!

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.+), (.+)=(.+)><>Count

        name: kafka_$1_$2_$3_count

        type: COUNTER

        labels:

          "$4": "$5"

          "$6": "$7"

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.*), (.+)=(.+)><>(\d+)thPercentile

        name: kafka_$1_$2_$3

        type: GAUGE

        labels:

          "$4": "$5"

          "$6": "$7"

          quantile: "0.$8"

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.+)><>Count

        name: kafka_$1_$2_$3_count

        type: COUNTER

        labels:

          "$4": "$5"

      - pattern: kafka.(\w+)<type=(.+), name=(.+), (.+)=(.*)><>(\d+)thPercentile

        name: kafka_$1_$2_$3

        type: GAUGE

        labels:

          "$4": "$5"

          quantile: "0.$6"

      - pattern: kafka.(\w+)<type=(.+), name=(.+)><>Count

        name: kafka_$1_$2_$3_count

        type: COUNTER

      - pattern: kafka.(\w+)<type=(.+), name=(.+)><>(\d+)thPercentile

        name: kafka_$1_$2_$3

        type: GAUGE

        labels:

          quantile: "0.$4"

    zookeeper-metrics-config.yml: |

      # See https://github.com/prometheus/jmx_exporter for more info about JMX Prometheus Exporter metrics

      lowercaseOutputName: true

      rules:

      # replicated Zookeeper

      - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+)><>(\\w+)"

        name: "zookeeper_$2"

        type: GAUGE

      - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+)><>(\\w+)"

        name: "zookeeper_$3"

        type: GAUGE

        labels:

          replicaId: "$2"

      - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+), name2=(\\w+)><>(Packets\\w+)"

        name: "zookeeper_$4"

        type: COUNTER

        labels:

          replicaId: "$2"

          memberType: "$3"

      - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+), name2=(\\w+)><>(\\w+)"

        name: "zookeeper_$4"

        type: GAUGE

        labels:

          replicaId: "$2"

          memberType: "$3"

      - pattern: "org.apache.ZooKeeperService<name0=ReplicatedServer_id(\\d+), name1=replica.(\\d+), name2=(\\w+), name3=(\\w+)><>(\\w+)"

        name: "zookeeper_$4_$5"

        type: GAUGE

        labels:

          replicaId: "$2"

          memberType: "$3"
```

- Add the following snippet under `spec.kafka.metricsConfig` in your kafka deployment file:

```yaml
  metricsConfig:

    type: jmxPrometheusExporter

    valueFrom:

      configMapKeyRef:

        name: kafka-metrics

        key: kafka-metrics-config.yml
```

- Add the following snippet under `spec.zookeeper.metricsConfig` in your kafka deployment file:

```yaml
  metricsConfig:

    type: jmxPrometheusExporter

    valueFrom:

      configMapKeyRef:

        name: kafka-metrics

        key: zookeeper-metrics-config.yml
```

- Add the following snippet under `spec` in your kafka deployment file:

```yaml
  kafkaExporter:

    topicRegex: ".*"

    groupRegex: ".*"
```

info

A sample Strimzi based kafka deployment with \`metrics instrumentation enabled can be found [here](https://github.com/strimzi/strimzi-kafka-operator/blob/main/examples/metrics/kafka-metrics.yaml)

- Once the above steps are completed add the following snippet under `victoria-metrics-agent.extraScrapeConfigs` of the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
    extraScrapeConfigs:

      - job_name: kubernetes-strimzi-kafka

        kubernetes_sd_configs:

        - role: pod

        metric_relabel_configs:

        - action: drop

          regex: go_.*

          source_labels:

          - __name__

        - action: drop

          regex: zookeeper_.*

          source_labels:

          - __name__

        relabel_configs:

        - action: keep

          regex: kafka-exporter

          source_labels:

          - __meta_kubernetes_pod_label_app_kubernetes_io_name

        - action: keep

          regex: Kafka|KafkaConnect|KafkaMirrorMaker|KafkaMirrorMaker2

          source_labels:

          - __meta_kubernetes_pod_label_strimzi_io_kind

        - action: labelmap

          regex: __meta_kubernetes_pod_label_(strimzi_io_.+)

          replacement: $1

          separator: ;

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_namespace

          target_label: namespace

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_name

          target_label: kubernetes_pod_name

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_node_name

          target_label: node_name

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_host_ip

          target_label: node_ip

      - job_name: kubernetes-strimzi-kafka-additional

        kubernetes_sd_configs:

        - role: pod

        metric_relabel_configs:

        - action: drop

          regex: go_.*

          source_labels:

          - __name__

        - action: drop

          regex: zookeeper_.*

          source_labels:

          - __name__

        relabel_configs:

        - action: keep

          regex: Kafka|KafkaConnect|KafkaMirrorMaker|KafkaMirrorMaker2

          source_labels:

          - __meta_kubernetes_pod_label_strimzi_io_kind

        - action: labelmap

          regex: __meta_kubernetes_pod_label_(strimzi_io_.+)

          replacement: $1

          separator: ;

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_namespace

          target_label: namespace

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_name

          target_label: kubernetes_pod_name

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_node_name

          target_label: node_name

        - action: replace

          regex: (.*)

          replacement: $1

          separator: ;

          source_labels:

          - __meta_kubernetes_pod_host_ip

          target_label: node_ip
```

To view in a convenient dashboard, you may search for the Grafana dashboard : `Kafka- JMX Dashboard` in Grafana or import the dashboard from the [strimzi repository](https://github.com/strimzi/strimzi-kafka-operator/blob/main/examples/metrics/grafana-dashboards/strimzi-kafka.json) (ensure you select the `MetricsServer` datasource when prompted).

## Collecting Metrics from Amazon Managed Streaming for Apache Kafka (MSK) [](/docs/observenow/integrations/infrastructure/apache-kafka#collecting-metrics-from-amazon-managed-streaming-for-apache-kafka-msk%20%22Direct%20link%20to%20Collecting%20Metrics%20from%20Amazon%20Managed%20Streaming%20for%20Apache%20Kafka%20(MSK)")

StackGen's [Kubernetes agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) can also be used to collect metrics from Amazon MSK.
To instrument metrics from a Amazon MSK deployment follow the given steps:

- Enable open monitoring for the MSK cluster by following [this document](https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html#enable-open-monitoring-after-creation).
- Add the following `YAML` snippet to the agent's `values.yaml` and run the agent based on these [instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

```yaml
observe-agent:

  victoria-metrics-agent:

    extraScrapeConfigs:

      - job_name: kafka-msk-jmx

        static_configs:

          - targets: ["<broker-1-endpoint>:11001","<broker-2-endpoint>:11001",...."<broker-n-endpoint>:11001"]

      - job_name: kafka-msk-node

        static_configs:

          - targets: ["<broker-1-endpoint>:11002","<broker-2-endpoint>:11002",...."<broker-n-endpoint>:11002"]
```

info

_Make sure the MSK broker endpoints are reachable over by the cluster in which the StackGen-agent is being deployed._
