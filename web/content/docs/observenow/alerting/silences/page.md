---
title: "Creating a Silence"
product: "observenow"
sourcePath: "/observenow/alerting/silences"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/silences"
status: "ok"
---

Silences allow you to temporarily mute notifications for specific alert rules or groups of alerts.

### Creating a Silence

1. Go to **Alerting --> Silences**
2. Click **"New silence"**
3. Set duration and expiration:
   - Choose a start time
   - Set an end time or duration
4. Define matching labels:
   - Use label matchers to target specific alerts
5. Add a comment explaining the reason for the silence
6. Create the silence

### Managing Silences

- View active and expired silences
- Edit existing silences
- Expire silences manually when no longer needed

### Best Practices for Silences

- Use short-lived silences during maintenance windows
- Regularly review and clean up expired silences
- Implement a process for documenting and approving long-term silences
