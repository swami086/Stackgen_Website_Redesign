---
title: "Metrics"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/ambassador-emissary-ingress"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/ambassador-emissary-ingress"
status: "ok"
---

StackGen's telemetry agents are pre-configured to collect telemetry from `Ambassador` components. This document provides info about configuring your `Ambassador` installation to emit metrics, logs and traces.

Additionally, [The official emissary site](https://www.getambassador.io/docs/edge-stack/latest/howtos/prometheus/) offers a general overview.

## Metrics

Include the following annotations in your ambassador Pod. If you are making use of the official Ambassador helm chart, you can achieve this by setting the following in the `values.yaml` file:

```yaml
podAnnotations:

  prometheus.io/scrape: 'true'

  prometheus.io/port: '8877'
```

## Logs

The recommended format for logging is `json`. Logging related customizations can be set using the following configurations.

```yaml
apiVersion: getambassador.io/v3alpha1

kind: Module

metadata:

  name: ambassador

spec:

  config:

    envoy_log_type: json

    envoy_log_format:

      {

      "upstream_service_time": "%RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)%",

      "method": "%REQ(:METHOD)%",

      "request_id": "%REQ(X-REQUEST-ID)%",

      "downstream_local_address": "%DOWNSTREAM_LOCAL_ADDRESS%",

      "x_forwarded_for": "%REQ(X-FORWARDED-FOR)%",

      "path": "%REQ(X-ENVOY-ORIGINAL-PATH?:PATH)%",

      "downstream_remote_address": "%DOWNSTREAM_REMOTE_ADDRESS%",

      "upstream_cluster": "%UPSTREAM_CLUSTER%",

      "authority": "%REQ(:AUTHORITY)%",

      "start_time": "%START_TIME%",

      "bytes_received": "%BYTES_RECEIVED%",

      "response_flags": "%RESPONSE_FLAGS%",

      "requested_server_name": "%REQUESTED_SERVER_NAME%",

      "response_code": "%RESPONSE_CODE%",

      "upstream_host": "%UPSTREAM_HOST%",

      "protocol": "%PROTOCOL%",

      "bytes_sent": "%BYTES_SENT%",

      "upstream_transport_failure_reason": "%UPSTREAM_TRANSPORT_FAILURE_REASON%",

      "upstream_local_address": "%UPSTREAM_LOCAL_ADDRESS%",

      "user_agent": "%REQ(USER-AGENT)%",

      "duration": "%DURATION%",

      "x_b3_traceid": "%REQ(X-B3-TRACEID)%",

      "trace_id": "%REQ(X-B3-TRACEID)%",

      "x_b3_parentspanid": "%REQ(X-B3-PARENTSPANID)%",

      "x_b3_spanid": "%REQ(X-B3-SPANID)%",

      "x_b3_sampled": "%REQ(X-B3-SAMPLED)%"

    }
```

## Tracing

Ambassador components can be configured to emit APM traces with the following configuration:

```yaml
apiVersion: getambassador.io/v3alpha1

kind:  TracingService

metadata:

  name:  tracing

spec:

  service: "http://otel-collector.devopsnow.svc.cluster.local:9411"

  driver: zipkin

  config: {}

#  tag_headers:

#  - ":authority"

#  - ":path"

#  sampling:

#    overall: 100
```

Note that the StackGen Otel collector is available in your K8s cluster at `http://otel-collector.devopsnow.svc.cluster.local:9411`.

## Visualization

Once the required telemetry is enabled, the `Ambassador` dashboard that is pre-packaged with your `ObserveNow` stack can be used to visualize incoming traffic.

![](https://docs.stackgen.com/assets/images/ZNTGB1HKgCQUFg4TbGRAK_amba-dash-110c68c7d93df1f5e19eb4a5d969ef6d.png)

![](https://docs.stackgen.com/assets/images/T8lBDXJtKsMrtAWokYjDz_amba-latencies-10b92599afd16a4d3d0bdc7947ccfee7.png)
