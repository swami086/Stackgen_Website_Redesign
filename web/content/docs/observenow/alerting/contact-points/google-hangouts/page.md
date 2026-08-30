---
title: "Create a space on Google Hangouts Chat"
product: "observenow"
sourcePath: "/observenow/alerting/contact-points/google-hangouts"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/contact-points/google-hangouts"
status: "ok"
---

## Create a space on Google Hangouts Chat

- Navigate to [https://chat.google.com/](https://chat.google.com/) with your Google account.
- Click `New chat` button and click `Create a space`
- Inside the `Create a space` pop-up, add emoji (optional) and provide a name for the space.
- Choose the space type as per your requirements:
  - Collaboration: To collaborate on projects, plans, or topics and to easily share files, assign tasks, and organize your conversations by threads.
  - Announcements: To broadcast and share updates with your group. Only space managers can post, manage permissions, and members. This cannot be changed after creation.
- Choose the space access settings as per your requirements and click `create`.

## Get the Google Hangouts Chat space webhook

- Click on the space name that you have just created and navigate to `Apps & integrations` and click `Webhooks`.
- Now click `+ Add webhooks` button:
  - Provide a name for the webhook and Avatar URL ( _optional_).
  - Click `Save`.
- A webhook will be created and displayed under `Webhooks` section of the same page.
- Copy the webhook URL by clicking on `⋮` and `Copy link`.

## Setup Contact points on Grafana for Google Hangouts Chat

- Navigate to `Contact points` tab in the `Alerting` section of the Grafana instance.
- Click on `Add contact point`, provide a name to the contact point and select `Google Hangouts Chat` from the `Integration` drop down.
- Add the webhook URL you just copied under `URL`.
- To send a test alert to confirm whether the webhook works or not, you can click `Test` to ensure the test alert is being sent to Google Hangouts Chat space.
- Add the following snippet under the `Title` option in the `Optional Google Hangouts Chat settings` section:

```javascript
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ if .CommonLabels.cluster }}[{{ .CommonLabels.cluster }}]{{ end }} {{ .CommonLabels.alertname }}
```

- Add the following snippet under the `Text Body` option in the `Optional Google Hangouts Chat settings` section:

```javascript
<b>Alert Details:</b>

{{- if .CommonLabels.alertname }}

- Alert Name: {{ .CommonLabels.alertname }}

{{- end }}

{{- if .CommonLabels.cluster }}

- Cluster: {{ .CommonLabels.cluster }}

{{- end }}

{{- if .CommonLabels.instance }}

- Instance: {{ .CommonLabels.instance }}

{{- end }}

{{- if .CommonLabels.job }}

- Job: {{ .CommonLabels.job }}

{{- end }}

{{- if .CommonLabels.namespace }}

- Namespace: {{ .CommonLabels.namespace }}

{{- end }}

{{- if .CommonLabels.node }}

- Node: {{ .CommonLabels.node }}

{{- end }}

{{- if .CommonLabels.pod }}

- Pod: {{ .CommonLabels.pod }}

{{- end }}

{{- if .CommonLabels.service }}

- Service: {{ .CommonLabels.service }}

{{- end }}

{{- if .CommonLabels.severity }}

- Severity: {{ .CommonLabels.severity }}

{{- end }}

<b>Annotations:</b>

{{- if .CommonAnnotations.description }}

- Description: {{ .CommonAnnotations.description }}

{{- end }}

{{- if .CommonAnnotations.summary }}

- Summary: {{ .CommonAnnotations.summary }}

{{- end }}
```

- You can also disable the resolve message \[OK\] that is sent when alerting state returns to false.
- Click `Save contact point`

You can now use this contact point while setting [Notification Policies](/docs/observenow/alerting/notification-policies) for your alerts.
