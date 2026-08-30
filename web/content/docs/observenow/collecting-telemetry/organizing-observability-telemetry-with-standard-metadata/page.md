---
title: "Introduction"
product: "observenow"
sourcePath: "/observenow/collecting-telemetry/organizing-observability-telemetry-with-standard-metadata"
sourceUrl: "https://docs.stackgen.com/observenow/collecting-telemetry/organizing-observability-telemetry-with-standard-metadata"
status: "ok"
---

# Introduction

Effective observability requires not just collecting telemetry data but organizing it in a way that makes it accessible and actionable. This document outlines our recommended approach to structuring observability telemetry using four key metadata dimensions: Environment, Product, Service, and Version. This consistent metadata framework enables powerful querying, correlation, and troubleshooting capabilities across your entire technology stack.

info

Implementing this metadata framework is optional but highly recommended. StackGen pre-packaged dashboards and alerts will work even without these metadata dimensions. However, adding them significantly enhances your observability capabilities and troubleshooting efficiency.

# Core Metadata Dimensions

Following are the recommended core metadata labels:

- `environment`\- Identifies the deployment context where services run (for example - dev, staging, production, DR).
- `product` \- Groups related services that together deliver a specific business capability or application.
- `service` \- Specifies the individual deployable component or microservice within a product.
- `version` \- Tracks the specific code release or build running in the environment.

# Benefits of Standardized Metadata

## Cross-Signal Correlation

By applying consistent metadata across different telemetry types, you can correlate related signals:

- Connect high-level application metrics with underlying infrastructure metrics like container/host CPU/Memory
- Link log entries to specific transactions and traces
- Correlate application performance with user experience metrics
- Group together all related telemetry for easy visualization and alerting

## Simplified Querying

Standardized metadata enables powerful filtering and aggregation:

- Filter by environment to focus on production issues
- Compare metrics across different versions of the same service
- Aggregate telemetry across all services in a product
- Isolate problems to specific deployment environments or to specific product teams

## Enhanced Troubleshooting

When investigating incidents, standardized metadata provides critical context:

- Quickly determine affected environments, products, and services
- Compare behavior between working and non-working versions
- Identify blast radius of issues across service boundaries
- Trace problems from user-facing symptoms to root causes

# Enabling Metadata in Different Environments

## Traces: OpenTelemetry Instrumentation

For services instrumented with OpenTelemetry, add these as additional attributes:

- Add `environment`, `product`, `service`, and `version` attributes to your OpenTelemetry configuration
- This applies to services running in both Kubernetes and non-Kubernetes environments
- If these additional attributes are not included, the StackGen ingestion pipeline automatically adds these attributes with `default` as the value

## Metrics and Logs: K8s Based Services

For services running in Kubernetes:

- Add the metadata as Kubernetes labels to your pods
- StackGen agents will automatically detect and include these labels in collected metrics

Example pod specification:

```yaml
apiVersion: v1

kind: Pod

metadata:

  name: payment-service

  labels:

    environment: "production"

    product: "payment-platform"

    service: "payment-api"

    version: "v1.2.3"
```

## Services Running on VMs and Standalone Servers

For services running on virtual machines or standalone servers:

- Add the metadata as labels in the StackGen agent's configuration YAML file

## Other Integrations (Kafka, Databases, etc.) [](/docs/observenow/collecting-telemetry/organizing-observability-telemetry-with-standard-metadata#other-integrations-kafka-databases-etc%20%22Direct%20link%20to%20Other%20Integrations%20(Kafka,%20Databases,%20etc.)")

For third-party services and integrations:

- Follow the documentation for those specific StackGen integrations
- If you need assistance, contact the StackGen support team for guidance on specific integrations
