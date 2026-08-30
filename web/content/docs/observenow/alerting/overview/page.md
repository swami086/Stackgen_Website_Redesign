---
title: "Comprehensive Telemetry Support"
product: "observenow"
sourcePath: "/observenow/alerting/overview"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/overview"
status: "ok"
---

In observability systems, alerting serves a critical function as the proactive element that connects data collection to action. StackGen ObserveNow uses Grafana as the primary alerting tool. Support for Prometheus Alertmanager too is available.

Here are some important features supported by the alerting component:

## Comprehensive Telemetry Support

The alerting component is designed to support alerts based on all types of telemetry data, providing a unified alerting experience across various observability signals:

- **Metrics-based Alerts**:
  - Alerts can be configured using time-series data from various metrics data sources.
  - This includes support for threshold-based alerts, rate of change alerts, and alerts based on anomalies.
- **Log-based Alerts**:
  - Alerts can be triggered based on log data, allowing for detection of specific events or patterns in log streams.
  - This functionality supports alerting on log volume, specific log messages, or complex log patterns.
  - Use cases may include alerting on application errors, security events, or system-level issues captured in logs.
- **APM (Application Performance Monitoring) Alerts**:
  - Alerts can be set up based on application performance data, providing insights into the behavior and health of applications.
  - This includes alerting on metrics such as response times, error rates, and transaction volumes.
  - APM alerts can help identify performance bottlenecks, slow database queries, or degraded user experiences.
- **Trace-based Alerts**:
  - While less common, alerts can also be configured based on distributed tracing data.
  - This allows for alerting on service dependencies, latency between services, or specific error conditions in trace spans.
  - Since StackGen uses Clickhouse as the storage engine for traces data, SQL can be used to access this data for creating alerts.
- **Multi-signal Alerts**:
  - Grafana's alerting system allows for the creation of complex alerts that combine multiple types of telemetry.
  - For example, an alert could be triggered based on a combination of high error rates in metrics, specific error messages in logs, and slow transaction times in APM data.

## Notification System

The alerting system integrates with a wide range of notification channels to ensure timely and effective communication of alerts. Out-of-the-box support is provided for common platforms such as email, Slack, PagerDuty, OpsGenie, Microsoft Teams, and Telegram. Additionally, the `webhook` functionality allows for integration with virtually any system capable of receiving HTTP POST requests, enabling custom notifications to fit diverse operational workflows. This extensive notification support ensures that alerts can be seamlessly incorporated into existing processes, regardless of the communication tools an organization employs.

## Advanced Routing Policies

The alerting system provides extensive support for complex routing policies, enabling organizations to create sophisticated notification workflows. These policies can be based on various factors including alert labels, severity, time of day, and team assignments. The system supports hierarchical routing trees, allowing for granular control over alert escalation and distribution.

## Anomaly Based Alerting

Support for anomaly based alerts based alerts is available on top of the alerting system. Please contact your StackGen customer success manager to learn more about anomaly detection.
