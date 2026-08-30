---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/visualization/overview"
sourceUrl: "https://docs.stackgen.com/observenow/visualization/overview"
status: "ok"
---

Grafana is used to visualize `metrics`, `logs` and `traces`.

All of these can be viewed on Grafana's `Explore` page:

- Log into Grafana and click on the `Explore` icon on the left-nav bar.
- If wanting to view metrics, make sure the Datasource at the top is pointing to `MetricServer`
- If wanting to view logs, make sure the Datasource at the top is pointing to `Loki / Logs`
- If wanting to view traces, make sure the Datasource at the top is pointing to `Jaeger / Traces`

Additional [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) and [LogQL](https://grafana.com/docs/loki/latest/logql/) tips and tricks are coming soon.
