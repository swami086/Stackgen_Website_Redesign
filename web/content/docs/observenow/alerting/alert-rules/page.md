---
title: "Creating an Alert Rule"
product: "observenow"
sourcePath: "/observenow/alerting/alert-rules"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/alert-rules"
status: "ok"
---

Alert rules define the conditions under which an alert should be triggered.

## Creating an Alert Rule

1. Navigate to Alerting > Alert rules
2. Click "New alert rule"
3. Choose a data source (e.g., Prometheus, Loki, InfluxDB)
4. Define the query using PromQL, LogQL, or the appropriate query language
5. Set alert conditions:
   - Specify the evaluation interval
   - Define the condition (e.g., "IS ABOVE", "IS BELOW")
   - Set the threshold value
6. Configure alert details:
   - Name the alert
   - Choose a folder for organization
   - Add labels for categorization and routing
   - Set annotations for additional context
7. Save the rule

![](https://docs.stackgen.com/assets/images/A1ybFzEd4Yg88MHjQbQjT-kyJB0tzmTr9P83vYNilrH-20240802-023847-6a719385028b2e7cb21d29a8f0d19572.png)

## Types of Alert Rules

- Grafana-managed rules
- Data source-specific rules (e.g., Prometheus, Loki)
- Recording rules
