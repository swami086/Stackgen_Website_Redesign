---
title: "Access Your Observenow Instance"
product: "observenow"
sourcePath: "/observenow/getting-started/access-your-observenow-instance"
sourceUrl: "https://docs.stackgen.com/observenow/getting-started/access-your-observenow-instance"
status: "ok"
---

After [launching an ObserveNow instance](/docs/observenow/getting-started/launch-an-observenow-instance), click on `ObserveNow` card and your new ObserveNow instance should appear on your Admin Console under `Active Apps`.

The ObserveNow stack will have three tabs:

- **Apps**: The `Apps` tab will have the apps endpoints of your ObserveNow stack such as Grafana, Jaeger, VMUI and Pyroscope.

![](https://docs.stackgen.com/assets/images/iwwwiv9LUqDUHh7hE9-i__screenshot-2024-03-04-at-124441-3662cb146250f9ddc1c202ff71210050.png)

-\> Click on the Grafana icon to access your Grafana instance:

![](https://docs.stackgen.com/assets/images/cZ7nHPc6Pp_m4dGFmFFkX_screenshot-2024-03-04-at-131501-d35f4fbc0f17fe4eaef86061cb3acb63.png)

This should open up a new tab for your managed Grafana, you can login with your Google SSO or login as admin (the initial password is provided back at the `App drawer > Agent tab > expand URLs and Integration Credentials`).

Once logged in, your dashboards will be empty. They'll automatically begin populating when you start sending your telemetry (metrics, logs, and traces).

-\> Click on the Jaeger icon to access the Jaeger UI. You can search, compare and monitor traces.

![](https://docs.stackgen.com/assets/images/hkM_A9YuLyqefBYyEjGvQ_screenshot-2024-03-04-at-132033-1ca1fd3a91ae4a9b23ad3e8e264d0dd8.png)

-\> Click on the VMUI icon to access Victoria Metrics UI for query troubleshooting, metrics cardinality and exploring query results via graphs and tables.

![](https://docs.stackgen.com/assets/images/FGLsEryzOLomjUl1K5V9b_screenshot-2024-03-04-at-134316-079b30a2b3332d2ec6f4fee7c81850f3.png)

- **Integrations**: The `Integrations` tab will have all the URLs and integrations credentials to integrate with you app. Go under `Agents` and you can choose the agents and integrate to observe your infrastructure.

![](https://docs.stackgen.com/assets/images/5Ghz4CPx6MbNE0uatXg5v_screenshot-2024-03-04-at-132520-d75f5d4fdc8ead601deee5335846e5a1.png)

info

In addition to the agents available, we support a large number of Prometheus exporters available on [this](https://prometheus.io/docs/instrumenting/exporters/) documentation.

- **Data Ingestion**: The `Data ingestion` tab provides you the information on the data that is being ingested in GBs.

![](https://docs.stackgen.com/assets/images/CGgIWMmTNQI-O2PorfLrU_screenshot-2024-03-04-at-132905-5e72d6e2b0337f0ab3b7fefc12499f6f.png)
