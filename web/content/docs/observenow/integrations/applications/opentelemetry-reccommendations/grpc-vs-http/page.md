---
title: "Grpc Vs Http"
product: "observenow"
sourcePath: "/observenow/integrations/applications/opentelemetry-reccommendations/grpc-vs-http"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/opentelemetry-reccommendations/grpc-vs-http"
status: "ok"
---

The [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) that is packaged as part of the ObserveNow Agent supports multiple different formats to consume telemetry data. The 2 most popular among these are **gRPC** ( _port 4317_) and **HTTP** ( _port 4318_). Depending on the support provided by the application SDK, you can choose to use either of the 2 protocols.

HTTP, in general, is more easy to work with and consumes _slightly_ less CPU overall, and is useful if your OTel Collector is exposed via a L7 HTTP load balancer ( _which does not support gRPC_)

gRPC on the other hand is what OpenTelemetry insists on every SDK/Collector supporting, and as such, [the spec for gRPC OTel](https://opentelemetry.io/docs/specs/otlp/#otlpgrpc) is more deeply defined and stable. However, gRPC can be a larger dependency for your application/SDK, especially if you are trying to manually instrument.

As such, both protocols do have their own merits, and this is something that you should keep in mind when deciding which protocol to use.

info

The OTel Collector packaged within ObserveNow has support for `gzip` compression as well. While the decision to use gRPC/HTTP may not have too much performance impact, the decision to use compression is more likely to have an impact on your tracing pipeline performance.
