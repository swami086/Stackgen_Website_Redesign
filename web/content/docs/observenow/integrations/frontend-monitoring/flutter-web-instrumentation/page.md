---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/frontend-monitoring/flutter-web-instrumentation"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/frontend-monitoring/flutter-web-instrumentation"
status: "ok"
---

## Overview

StackGen Observe Frontend Monitoring can integrate with Flutter Web applications to bring in Real-User Monitoring (RUM) data from your Flutter applications.

## Setup

Add the following snippet into the `index.html` of your Flutter Web application in the `<head>` section

```javascript
<script>

  window.init = () => {

      window.GrafanaFaroWebSdk.initializeFaro({

        url: "https://<opsverse-frontend-monitoring-endpoint>/collect",

        app: {

          name: "my-flutter-app",

          version: "1.0.0",

        }

      });

    };

  // Dynamically add the tracing instrumentation when the tracing bundle loads

  window.addTracing = () => {

      window.GrafanaFaroWebSdk.faro.instrumentations.add(new window.GrafanaFaroWebTracing.TracingInstrumentation());

    };

</script>

<script src="https://unpkg.com/@grafana/faro-web-sdk@1.7.2/dist/bundle/faro-web-sdk.iife.js" onload="window.init()"></script>

<script src="https://unpkg.com/@grafana/faro-web-tracing@1.7.2/dist/bundle/faro-web-tracing.iife.js " onload="window.addTracing()"></script>
```

Once you run your application you should see application logs and traces being exported to the provided collector URL in the console/network tab of the browser developer tools. You can verify you see the logs from your application using the query `{app="frontend-logs"}`

info

**Note**: For more advanced, granular controls, please refer to the [Grafana Faro SDK documentation](https://github.com/grafana/faro-web-sdk/blob/main/docs/sources/tutorials/quick-start-browser.md#advanced).

## Visualization

StackGen ObserveNow comes pre-baked with a Frontend Monitoring Dashboard that you can use as a starting point to visualize your frontend performance.
