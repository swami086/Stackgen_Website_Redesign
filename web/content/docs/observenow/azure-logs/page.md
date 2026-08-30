---
title: "Azure Logs"
product: "observenow"
sourcePath: "/observenow/azure-logs"
sourceUrl: "https://docs.stackgen.com/observenow/azure-logs"
status: "ok"
---

Follow the steps to send logs from various Azure resources to the ObserveNow stack:

1. Create an Azure Event Hub following [this document](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-create).

2. Navigate to the `Diagnostic Setting` of the resource whose logs will be sent.

3. Select `Add diagnostic setting` and select the log categories to be exported.

4. Select `Stream to an event hub` in the destination details section and add the details of the event hub created in the first step.

5. Log into the [StackGen Console](https://console.opsverse.io/auth/login) and navigate to your ObserveNow stack.

6. Under the stack details navigate to Integrations --> Azure Integration --> Logs and select `Enable`.

7. Fill in the connection string of the event hub in the text box and hit save. To get the connection string for your event hub follow [this document](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#azure-portal).


Once all the above steps are completed successfully, the logs should appear in Grafana with the label: `{job="loki.source.azure_event_hubs"}`
