---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/frontend-monitoring/web-application-instrumentation"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/frontend-monitoring/web-application-instrumentation"
status: "ok"
---

## Overview

StackGen Observe Frontend Monitoring provides a seamless way to collect logs, traces and metrics from web application frontends and bring them into your ObserveNow instance. This allows complete visibility into all aspects of your stack, and ensures you can use a single software stack to provide end to end observability.

## Setup

StackGen Frontend Monitoring works seamlessly with the `Grafana Faro SDK` so to enable frontend-monitoring, you can use the Faro SDK

Install the `Faro Web SDK` package using the following command:

```shell
npm i -S @grafana/faro-web-sdk
```

or

```shell
yarn add @grafana/faro-web-sdk
```

Import and Initialize the package by including the following code snippet to your application:

For HTML and Javascript based application:

```javascript
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';

const faro = initializeFaro({

  url: 'https://<opsverse-frontend-monitoring-collector-endpoint>/collect',

  app: {

    name: '<your-webapp-name>',

  },

  instrumentations: [...getWebInstrumentations({captureConsole: true, captureConsoleDisabledLevels: [LogLevel.DEBUG]})]

});
```

### Enable Tracing

To enable frontend-tracing support, you can use the `Grafana Faro Tracing SDK` using the following command:

```shell
npm i -S @grafana/faro-web-tracing
```

or

```shell
yarn add @grafana/faro-web-tracing
```

and then update the initialization to also enable `TracingInstrumentation`

```javascript
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';

const faro = initializeFaro({

  url: 'https://<opsverse-frontend-monitoring-collector-endpoint>/collect',

  app: {

    name: '<your-webapp-name>',

  },

  instrumentations: [...getWebInstrumentations({captureConsole: true, captureConsoleDisabledLevels: [LogLevel.DEBUG]}), new TracingInstrumentation()]

});
```

Once you run your application you should see application logs and traces being exported to the provided collector URL in the console/network tab of the browser developer tools.

info

**Note**: For more advanced, granular controls, please refer to the [Grafana Faro SDK documentation](https://github.com/grafana/faro-web-sdk/blob/main/docs/sources/tutorials/quick-start-browser.md#advanced).

## Visualization

StackGen ObserveNow comes pre-baked with a Frontend Monitoring Dashboard that you can use as a starting point to visualize your frontend performance.

![Frontend Monitoring Dashboard](https://docs.stackgen.com/assets/images/w7zrSDG-u13UUy950Z0FU_screenshot-2024-04-08-at-65525-pm-ab96a0ed7677c7e46eb67240a8d6345e.png)

- [Overview](/docs/observenow/integrations/frontend-monitoring/web-application-instrumentation#overview)
- [Setup](/docs/observenow/integrations/frontend-monitoring/web-application-instrumentation#setup)
  - [Enable Tracing](/docs/observenow/integrations/frontend-monitoring/web-application-instrumentation#enable-tracing)
