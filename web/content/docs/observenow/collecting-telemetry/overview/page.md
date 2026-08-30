---
title: "Supported Observability Signals"
product: "observenow"
sourcePath: "/observenow/collecting-telemetry/overview"
sourceUrl: "https://docs.stackgen.com/observenow/collecting-telemetry/overview"
status: "ok"
---

StackGen's Observability stack (ObserveNow) brings together your telemetry (`metrics`, `logs`, and `APM traces`) under one umbrella.

## Supported Observability Signals

info

`Metrics`, `logs`, and `traces` are core observability signals. But to get further visibility into an entire Engineering organization, ecosystem, and developer experience, checkout the Backstage-powered StackGen ONE

### Metrics

Metrics are useful for describing the _what and when something is happening_ and the trends in your applications. With metrics, you are able to see patterns, anomalies, and able to set thresholds for alerts on real-time usage.

For example, a metric for CPU usage percentage can show when your app begins using high CPU cycles. Or a metric for the total number of times users have signed into your app can be used to alert product owners when there's either a sudden surge or no new logins.

### Logs

Logs are useful for describing the _why something is happening_ in your application. Applications that spit out good logs can help pinpoint the exact cause of an issue. For example, if a metric show high CPU usage for an app, you can look at the apps logs to see what it's doing to help root cause

### Traces

Traces, in this modern world of distributed services, help describe the _where something is happening_. For example, in modern systems, a request may traverse several different apps (frontend, backend, databases, etc), and it's important to trace that single request all the way through your services. If a specific service seems to be a bottleneck, traces help quickly identify which one.

## Agent

info

Please see the [Install the StackGen Agent](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) section for details running the agent in your environment.

StackGen's agent can be used to collect telemetry from a variety of infrastructure and applications.

## Integrations

info

How to integrate more than just the default into ObserveNow!

Once installed, the Agent will send several default metrics, logs, and any enabled traces to your ObserveNow instance.

An Observability stack (like ObserveNow) provides the maximum value when telemetry from the underlying infrastructure (hosts, containers, DBs, K8s etc) is combined with telemetry from the applications.

info

The links to your left discuss how to integrate some popular applications specific to your environment

### Infrastructure

The underlying tools and apps upon which your product-level applications are running (e.g., Kubernetes, PostgreSQL, MongoDB, etc)

### Cloud Providers

The base providers for your infrastructure's virtual hardware and managed services (e.g., AWS, GCP, Azure, etc)

### Applications

The apps and services your team writes and deploys for your business - usually developed in a variety of programming languages and frameworks (e.g., Java, Go, Python, Node, etc)

### Extending With Custom Instrumentation

info

The links to your left discuss the common ways to instrument applications for emitting custom telemetry.

Applications developed on various tech stacks can easily be instrumented to send metrics and traces to your ObserveNow backend.

In addition to left-side navigation links, the following documents provide general information on instrumentation:

- [Prometheus Instrumentation](https://prometheus.io/docs/practices/instrumentation/)
- [Prometheus Client Libraries](https://prometheus.io/docs/instrumenting/clientlibs/)

- [Supported Observability Signals](/docs/observenow/collecting-telemetry/overview#supported-observability-signals)
  - [Metrics](/docs/observenow/collecting-telemetry/overview#metrics)
  - [Logs](/docs/observenow/collecting-telemetry/overview#logs)
  - [Traces](/docs/observenow/collecting-telemetry/overview#traces)
- [Agent](/docs/observenow/collecting-telemetry/overview#agent)
- [Integrations](/docs/observenow/collecting-telemetry/overview#integrations)
  - [Infrastructure](/docs/observenow/collecting-telemetry/overview#infrastructure)
  - [Cloud Providers](/docs/observenow/collecting-telemetry/overview#cloud-providers)
  - [Applications](/docs/observenow/collecting-telemetry/overview#applications)
  - [Extending With Custom Instrumentation](/docs/observenow/collecting-telemetry/overview#extending-with-custom-instrumentation)
