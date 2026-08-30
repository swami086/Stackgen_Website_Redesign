---
title: "NodeJS Metrics Instrumentation"
product: "observenow"
sourcePath: "/observenow/integrations/applications/javascript-node-js-and-browser"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/javascript-node-js-and-browser"
status: "ok"
---

## NodeJS Metrics Instrumentation

### Instrumenting your app

Please follow the steps outlined in the following documents:

- [Node prom-client](https://github.com/siimon/prom-client)
- [Example implementation](https://codersociety.com/blog/articles/nodejs-application-monitoring-with-prometheus-and-grafana)

### Setting the POD annotations

Once your application is emitting metrics, your POD in K8s will need to be annotated to enable the agent to scrape the metrics. Following are the relevant annotations:

```yaml
prometheus.io/scrape: 'true'

prometheus.io/path: '/data/metrics'   # (If the metrics are served on a path other than /metrics)

prometheus.io/port: '80' # (if the metrics are served on a port other than the container port)
```

## Node.JS Tracing Instrumentation

OpenTelemetry is the recommended approach to instrument for tracing. Please follow the instructions in the following document to instrument your Node application:

- [OpenTelemetry Node.JS Instrumentation](https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/)

When your `tracing.js` file (from above) is created, make sure to edit the `traceExporter:` to export using the [Zipkin exporter](https://opentelemetry.io/docs/instrumentation/js/exporters/#zipkin) to this location:

```javascript
  ...

+ const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');

  ...

- traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),

+ traceExporter: new ZipkinExporter({

+   serviceName: 'my-cool-app',

+   url: 'http://otel-collector.devopsnow.svc.cluster.local:9411',

+ }),
```

info

The Zipkin URL above (`http://otel collector.devopsnow.svc.cluster.local:9411`) is available on all your clusters to which you installed the `OpsVerse agent`

This will allow the Node app to emit spans which will be collected by the `OpenTelemetry` collector installed as part of the `OpsVerse agent` and forwarded to the tracing backend.

### Trace context (TraceId, SpanId and TraceFlags) injection into logs [](/docs/observenow/integrations/applications/javascript-node-js-and-browser#trace-context-traceid-spanid-and-traceflags-injection-into-logs%20%22Direct%20link%20to%20Trace%20context%20(TraceId,%20SpanId%20and%20TraceFlags) injection into logs")

It is very simple to configure traceId, spanId, and trace flags data injection into user logs in JavaScript applications. Based on the logging framework that is in use, follow the below mentioned steps to print the `trace_id` to the logs:

### Winston

The following steps can be followed to to inject trace context with [winston](https://www.npmjs.com/package/winston) logger with [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston):

**Step 1:** Install the following dependency.

```shell
npm install --save @opentelemetry/instrumentation-winston
```

**Step 2:** Add the following block of code where OpenTelemetry JS instrumentation is configured (usually `tracing.js` file).

```javascript
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');

registerInstrumentations({

instrumentations: [\
\
   new WinstonInstrumentation(),\
\
   // other instrumentations\
\
],

});
```

info

The examples below apply to OpenTelemetry JS instrumentation version `0.23.0` or above.

More information available [here](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-winston).

### Bunyan

The following steps can be followed to to inject trace context with [bunyan](https://www.npmjs.com/package/bunyan) logger with [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan):

**Step 1:** Install the following dependency.

```shell
npm install --save @opentelemetry/instrumentation-bunyan
```

**Step 2:** Add the following block of code where OpenTelemetry JS instrumentation is configured (usually `tracing.js` file).

```javascript
const { BunyanInstrumentation } = require('@opentelemetry/instrumentation-bunyan');

registerInstrumentations({

instrumentations: [\
\
   new BunyanInstrumentation(),\
\
   // other instrumentations\
\
],

});
```

### Pino

The following steps can be followed to to inject trace context with [pino](https://www.npmjs.com/package/pino) logger with [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-pino):

**Step 1:** Install the following dependency.

```shell
npm install --save @opentelemetry/instrumentation-pino
```

**Step 2:** Add the following block of code where OpenTelemetry JS instrumentation is configured (usually `tracing.js` file).

```text
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');

registerInstrumentations({

instrumentations: [\
\
   new PinoInstrumentation(),\
\
   // other instrumentations\
\
],

});
```

### Custom logger

In the case of custom loggers, the most important thing is to know how to obtain the `traceId`, `spanId`, and `trace flag`. Follow the steps below:

**Step 1:** Install the following dependency.

```shell
npm install --save @opentelemetry/api
```

**Step 2:** Extract the trace context (`traceId`, `spanId`, and `trace flag`) using the following snippet:

```javascript
# Import the dependency which helps us to extract trace context

const api = require('@opentelemetry/api');

# Get the current span.

let current_span = api.trace.getSpan(api.context.active());

# Obtain trace_id, span_id and trace flag.

let trace_id = current_span.spanContext().traceId;

let span_id = current_span.spanContext().spanId;

let trace_flags = current_span.spanContext().traceFlags;
```

Example usage:

```javascript
console.log(`Sample log trace_id:”${trace_id}” span_id:”${span_id}” trace_flags:”${trace_flags}”`);
```

## Browser Tracing Instrumentation

OpenTelemetry is the recommended approach to instrument for tracing. Please follow the instructions in the following document to instrument your HTML/JS browser application:

- [OpenTelemetry HTML and JS Instrumentation](https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/)

To start emitting spans to your observability backend, your `document-load.js` file (from above) should look like the following to export in Zipkin format to a TBA trace proxy host:

```text
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

import { ZoneContextManager } from '@opentelemetry/context-zone';

import { registerInstrumentations } from '@opentelemetry/instrumentation';

const provider = new WebTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');

const { BatchSpanProcessor } = require("@opentelemetry/tracing");

// You can also define your custom headers which will be added automatically.

const options = {

  // the opentelemetry collector

  url: 'http://<jaeger-collector-proxy>',

}

const exporter = new ZipkinExporter(options);

provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter(options)));

provider.register({

  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional

  contextManager: new ZoneContextManager(),

});

// Registering instrumentations

registerInstrumentations({

  instrumentations: [\
\
    new DocumentLoadInstrumentation(),\
\
  ],

});
```

This will allow your browser app to emit events to a proxy collector (which validates events are coming from your whitelisted URLs) directly to your Jaeger collector (`https://<jaeger-collector-host>/api/v2/spans`). There are processors running on the collector that will generate the RUM metrics.

- [NodeJS Metrics Instrumentation](/docs/observenow/integrations/applications/javascript-node-js-and-browser#nodejs-metrics-instrumentation)
  - [Instrumenting your app](/docs/observenow/integrations/applications/javascript-node-js-and-browser#instrumenting-your-app)
  - [Setting the POD annotations](/docs/observenow/integrations/applications/javascript-node-js-and-browser#setting-the-pod-annotations)
- [Node.JS Tracing Instrumentation](/docs/observenow/integrations/applications/javascript-node-js-and-browser#nodejs-tracing-instrumentation)
  - [Trace context (TraceId, SpanId and TraceFlags) injection into logs](/docs/observenow/integrations/applications/javascript-node-js-and-browser#trace-context-traceid-spanid-and-traceflags-injection-into-logs)
  - [Winston](/docs/observenow/integrations/applications/javascript-node-js-and-browser#winston)
  - [Bunyan](/docs/observenow/integrations/applications/javascript-node-js-and-browser#bunyan)
  - [Pino](/docs/observenow/integrations/applications/javascript-node-js-and-browser#pino)
  - [Custom logger](/docs/observenow/integrations/applications/javascript-node-js-and-browser#custom-logger)
