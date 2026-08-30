---
title: "Email"
product: "observenow"
sourcePath: "/observenow/alerting/contact-points/email"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/contact-points/email"
status: "ok"
---

Refer the following steps to create a slack based contact point in Grafana.

- Navigate to **Alerting** → **Contact Points** in the menu on the left.
- Click on **\+ Add template** button.
- Give the name as `email-subject` to the template.
- Paste the following snippet under `content` section.

```shell
[{{ .Status | toUpper }}] {{ if .CommonLabels.severity }}[{{ .CommonLabels.severity | toUpper }}]{{ end }} {{ if .CommonAnnotations.summary }} {{ .CommonAnnotations.summary }} {{ else }} {{ .CommonLabels.alertname }}{{ end }}
```

- Click on **Save template.**
- Click on **\+ Add contact point** button.
- Give a name to the contact point.
- Under the **Integration** drop down select `Email`.
- Under **Addresses** add the emails of the recipients separated by a `;`.
- Click on **Optional Email settings** and paste the following snippet in the **Subject** section.

```shell
{{ template "email-subject" . }}
```

- Click on **Save contact point**.

You can now use this contact point while setting [Notification Policies](https://app.archbee.com/docs/1ulRCVb1-XDIuIc5KKWDR/Vm7lvfDqn6T8zQ00Gk8sE#vqM0m) for your alerts.
