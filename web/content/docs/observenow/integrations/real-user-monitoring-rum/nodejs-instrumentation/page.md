---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/real-user-monitoring-rum/nodejs-instrumentation"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/real-user-monitoring-rum/nodejs-instrumentation"
status: "ok"
---

danger

**\[DEPRECATED\]** This page has been deprecated in favor of [Frontend Monitoring](/docs/observenow/integrations/frontend-monitoring/web-application-instrumentation)

## Overview

In order to visualize and analyze your traces, you will need to export them to a tracing server. Follow the instructions below for setting up the backend and a exporter.

You may also want to use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources and [B3 Propagation](https://github.com/openzipkin/b3-propagation) headers which are used for trace context propagation across service boundaries.

## Setup

Please install the following packages using `npm install` or `yarn add`:

- [@opentelemetry/sdk-node](https://www.npmjs.com/package/@opentelemetry/sdk-node)
- [@opentelemetry/auto-instrumentations-node](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node)
- [@opentelemetry/resources](https://www.npmjs.com/package/@opentelemetry/resources)
- [@opentelemetry/semantic-conventions](https://www.npmjs.com/package/@opentelemetry/semantic-conventions)
- [@opentelemetry/exporter-zipkin](https://www.npmjs.com/package/@opentelemetry/exporter-zipkin)
- [@opentelemetry/core](https://www.npmjs.com/package/@opentelemetry/core)
- [@opentelemetry/propagator-b3](https://www.npmjs.com/package/@opentelemetry/propagator-b3)
- [@opentelemetry/api](https://www.npmjs.com/package/@opentelemetry/api)

Create a file `tracing.js` which will contain your tracing setup code.

```javascript
    /* tracing.js */

    // Require dependencies

    const opentelemetry = require("@opentelemetry/sdk-node");

    const {

    getNodeAutoInstrumentations,

    } = require("@opentelemetry/auto-instrumentations-node");

    const { Resource } = require("@opentelemetry/resources");

    const {

    SemanticResourceAttributes,

    } = require("@opentelemetry/semantic-conventions");

    const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");

    const { CompositePropagator } = require("@opentelemetry/core");

    const {

    B3Propagator,

    B3InjectEncoding,

    } = require("@opentelemetry/propagator-b3");

    const api = require("@opentelemetry/api");

    const options = {

        headers: {

            Authorization: "Basic <base64 encoded clientId:secret>",

        },

        url: "<OpsVerse collector url>",

    };

    const exporter = new ZipkinExporter(options);

    const sdk = new opentelemetry.NodeSDK({

        traceExporter: exporter,

        instrumentations: [getNodeAutoInstrumentations()],

        resource: new Resource({

            [SemanticResourceAttributes.SERVICE_NAME]: "<tracking-name>",

        }),

    });

    api.propagation.setGlobalPropagator(

        new CompositePropagator({

            propagators: [\
\
                new B3Propagator(),\
\
                new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),\
\
            ],

        })

    );

    sdk.start();
```

The above tracing setup and configuration should be run before your application code. One of the tools commonly used for this task is the [`-r,--require`](https://nodejs.org/api/cli.html#cli_r_require_module) module flag.

```shell
    node --require './tracing.js' app.js
```

You are now good to send [traces](https://opentelemetry.io/docs/concepts/signals/traces/) to any [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector). This library was specifically crafted so that you may additionally get Real User Monitoring(RUM) metrics if by sending to the OpenTelemetry Collector you launched via StackGen.
