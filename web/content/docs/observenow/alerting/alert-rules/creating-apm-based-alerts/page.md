---
title: "Creating Apm Based Alerts"
product: "observenow"
sourcePath: "/observenow/alerting/alert-rules/creating-apm-based-alerts"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/alert-rules/creating-apm-based-alerts"
status: "ok"
---

StackGen ObserveNow uses `ClickHouse` as the storage engine for managing the APM and distributed traces data. This `Clickhouse` is configured as a `datasource` within Grafana. This enables the users to create rich alerting on top of the APM and distributed traces data.

To create APM based alerts, on the `Create New Alert` screen, select `ClickHouseObserve` as the datasource and use the `SQL Editor` or the `Query Builder` interfaces to construct the query.

![](https://docs.stackgen.com/assets/images/A1ybFzEd4Yg88MHjQbQjT-LadfRgazkANH1BnceAMDq-20240802-030749-f9ef804cbd6517e928a53dfb14a0f9a0.png)

All the remaining steps are similar to those of regular alerts.
