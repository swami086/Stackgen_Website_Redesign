---
title: "Slack"
product: "observenow"
sourcePath: "/observenow/alerting/contact-points/slack"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/contact-points/slack"
status: "ok"
---

Refer the following steps to create a slack based contact point in Grafana.

- Create a slack app and an incoming webhook following [these instructions](https://api.slack.com/messaging/webhooks).
- Navigate to `Contact points` tab in the `Alerting` section of the Grafana instance.
- Click on `Add contact point`, give a name to the contact point and select `Slack` from the `Integration` drop down.
- Add the webhook created from the first step under the `Webhook URL` option.
- Add the following snippet under the `Title` option in the `Optional Slack settings` section:

```shell
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ if .CommonLabels.cluster }}[{{ .CommonLabels.cluster }}]{{ end }} {{ .CommonLabels.alertname }}
```

- Add the following snippet under the `Text Body` option in the `Optional Slack settings` section:

```shell
           {{ with index .Alerts 0 -}}

        :chart_with_upwards_trend: *<{{ .GeneratorURL }}|Graph>*

        {{- if .Annotations.runbook }}   :notebook: *<{{ .Annotations.runbook }}|Runbook>*{{ end }}

      {{ end }}

  *Alert details:*

  {{ range .Alerts -}}

  {{ if .Labels.severity }}>*Severity:* `{{ .Labels.severity }}`{{ end }}

  >*Description:* {{ .Annotations.description }}

  {{ if .Annotations.printDetails }}>

  >*Details:*

  {{ range .Labels.SortedPairs }}>• *{{ .Name }}:* `{{ .Value }}`

  {{ end }}

  {{ end }}

  {{ end }}
```

info

While this standard alert template should be sufficient for most use-cases, you can also customize the alert template using the [Grafana documentation.](https://grafana.com/blog/2023/04/05/grafana-alerting-a-beginners-guide-to-templating-alert-notifications/)
