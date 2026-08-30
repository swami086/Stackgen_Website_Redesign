---
title: "Microsoft Teams"
product: "observenow"
sourcePath: "/observenow/alerting/contact-points/microsoft-teams"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/contact-points/microsoft-teams"
status: "ok"
---

Here are the detailed steps to configure a contact point to send alerts to Microsoft Teams in Grafana 10:

1. Navigate to the `Contact Points` section:

   - In the Grafana sidebar, click on `Alerting`
   - Select `Contact points` from the submenu
2. Create a new contact point:
   - Click the `Add contact point` button
   - Enter a name for the contact point (e.g., `Teams Alerts`)
3. Select `Microsoft Teams` as the integration:

   - In the `Integration` dropdown, choose `Microsoft Teams`
4. Configure the Teams webhook:
   - In the `Webhook URL` field, paste the webhook URL for your Microsoft Teams channel
   - To obtain this URL:
     - Open Microsoft Teams
     - Navigate to the desired channel
     - Click the "..." menu next to the channel name
     - Select "Connectors" e. Find "Incoming Webhook" and click "Configure"
     - Provide a name for the webhook and click "Create"
     - Copy the generated webhook URL
5. Customize the message settings (optional):
   - Use the `Message` field to customize the alert message format
   - You can use Go templating syntax to include dynamic content
6. Set optional parameters:
   - Configure any additional settings such as `Title` or `Thumbnail URL` if desired
7. Test the contact point:
   - Click the `Test` button to send a test message to the Teams channel
   - Verify that the message appears in the specified Teams channel
8. Save the contact point:
   - Click `Save contact point` to finalize the configuration

![](https://docs.stackgen.com/assets/images/A1ybFzEd4Yg88MHjQbQjT-3aD7Ghm3sfiyFqUV4M7sp-20240802-030251-0617f3849ccf7b61d03035987c1e82bb.png)

After completing these steps, the Microsoft Teams contact point will be available for use in notification policies and can receive alerts from Grafana.
