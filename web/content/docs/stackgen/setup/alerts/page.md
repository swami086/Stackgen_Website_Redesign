---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/setup/alerts"
sourceUrl: "https://docs.stackgen.com/docs/setup/alerts"
status: "ok"
---

StackGen supports sending drift and appStack event notifications to external systems like Slack, Email, and Discord. Follow these steps to configure notification channels and subscribe appStacks to them.

### Prerequisites

Before you enable notifications for an appStack or Drifts, ensure you have set up the following:

- [Create a Secret Store for your application](/docs/stackgen/setup/settings#secret-store)
- [Create a Notification Channel](/docs/stackgen/setup/settings#create-a-notification-channel): As a DevOps or Admin you can set the granularity of notifications you would want to receive on a channel. StackGen will only notify you about the events and appStacks (all or selected) on the channel.

### Subscribe to an appStack for Notifications

Click to view

important

- Make sure that your DevOps or Admin team has configured the notification channel with the appropriate granularity. This includes selecting the required events and choosing whether alerts apply to one, multiple, or all appStacks.

- Keep in mind that the notification channel configuration overrides appStack selections. If a channel is not configured for a specific appStack, you will not receive alerts for it, even if you've enabled alerts for the appStack.


Follow these steps to subscribe to an appStack(s) for notifications:

1. From the StackGen Home page, navigate to **appStacks**.

2. From the list of appStacks, click the **ellipses ⋮** icon under the **Actions** column next to the appStack you want to receive alerts for.

3. Click the bell 🔔 icon.

4. In the **Subscribe to notifications** panel, toggle **ON** the desired notification channels (Slack, Email, Discord). You can also use the **Type** drop-down to choose from various applications.



![appStack Alerts](https://docs.stackgen.com/assets/images/appstackalerts-7b0a4c9d6c8059cb7dde46448fb737fe.png)

5. Click **Done**.


These notifications cover infrastructure lifecycle events such as:

- **ILM events**: such as plan, apply, drift, and destroy.
- **appStack events**: such as appStack creation, updates, archiving, unarchiving, deletion, imports, and exports.

### Subscribe to an appStack for Drift Notifications

Click to view

Follow these steps to subscribe to an appStack for drift notifications on your application:

1. From the StackGen Home page, navigate to **Drifts**.

2. From the listed appStacks, click the bell 🔔 icon next to the appStack where you want to receive drift alerts.

3. In the **Subscribe to drift notifications** panel, toggle **ON** the desired notification channels (Slack, Email, Discord). You can also use the **Type** drop-down to choose from various applications.



note





Make sure that your DevOps or Admin team has configured a notification channel to receive **Drift** alerts.







![Drift Alerts](https://docs.stackgen.com/assets/images/driftalerts-f98455a55a2fff1f12b83d1619b9142f.png)

4. Click **Done**.


You will now get real-time alerts when a drift is detected on the selected appStack(s).
