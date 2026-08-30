---
title: "Notification Policies"
product: "observenow"
sourcePath: "/observenow/alerting/notification-policies"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/notification-policies"
status: "ok"
---

Notification Policies are used to route different alerts to different contact points based on label matchers. Grafana provides a root notification policy by default which is used if there is no notification policy set or if an alert doesn't match any existing notification policy. To create a notification policy, refer the following steps:

1. Navigate to **Alerting** → **Notification Policies** in the menu on the left.
2. Click on **\+ New specific policy** button.
3. Click on **\+ Add matcher.**
4. Add the label based on which the alert needs to be routed. Multiple matchers can be added, and the alert will be matched to the policy only if all the matchers added are present as alert labels.
5. A nested policy can also be added to further narrow down labels.
6. To know more about how routing works with multiple notification policies and nested policies [click here](https://grafana.com/docs/grafana/latest/alerting/fundamentals/notification-policies/notifications/).

The notification policies can be edited and deleted at will barring the root notification policy which cannot be deleted.
