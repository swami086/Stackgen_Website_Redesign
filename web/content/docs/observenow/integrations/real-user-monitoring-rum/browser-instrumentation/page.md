---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/real-user-monitoring-rum/browser-instrumentation"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/real-user-monitoring-rum/browser-instrumentation"
status: "ok"
---

danger

**\[DEPRECATED\]** This page has been deprecated in favor of [Frontend Monitoring](/docs/observenow/integrations/frontend-monitoring/web-application-instrumentation)

StackGen Browser RUM uses OpenTelemetry standards to enable high quality, ubiquitous, and portable telemetry to enable effective observability.

## Overview

StackGen Browser RUM uses OpenTelemetry standards to enable high quality, ubiquitous, and portable telemetry to enable effective observability.

warning

Currently the library supports only [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for Trace header propagation. [Axios has known issues](https://github.com/open-telemetry/opentelemetry-js/issues/1076).

## Setup

Install the StackGen RUM package using the following command:

```shell
npm install --save opsverse-rum
```

Import and Initialize the package by including the following code snippet to your application:

For HTML and Javascript based application:

```javascript
    import("opsverse-rum").then((res) => {

        if(res){

            res.start({

                authKey: "<B64EncodedBasicAuthToCollectorUrl>",

                serviceName: "example-service",

                collectorUrl: "<OpenTelemetryCollectorUrl>",

                samplingRatio: "1" //min: 0.0 and max: 1.0

            });

        }

    })
```

OR

```javascript
    import { OpsVerseBrowserRum } from ‘opsverse-rum’

    if (typeof window !== "undefined" && OpsVerseRum) {

        OpsVerseBrowserRum.start({

            authKey: "<B64EncodedBasicAuthToCollectorUrl>",

            serviceName: "example-service",

            collectorUrl: "<OpenTelemetryCollectorUrl>",

            samplingRatio: "1" //min: 0.0 and max: 1.0

        });

    }
```

For NestJS based application add the following snippet to you `App.js` file:

```javascript
    import dynamic from "next/dynamic";

    const [libraryLoaded, setLibraryLoaded] = React.useState(false);

    const OpsVerseRumLibrary = dynamic(

        () =>

        import("opsverse-rum").then((res) => {

            if (res) {

                setLibraryLoaded(true);

            }

        }),

        { ssr: false }

    );

    React.useEffect(() => {

    if (!libraryLoaded) return;

        OpsVerseBrowserRum.start({

            authKey: "<B64EncodedBasicAuthToCollectorUrl>",

            serviceName: "example-service",

            collectorUrl: "<OpenTelemetryCollectorUrl>",

            samplingRatio: "1" //min: 0.0 and max: 1.0

        });

    }, [libraryLoaded]);

    return (

        <>

            <Component {...pageProps} />

            <OpsVerseRumLibrary />

        </>

    )
```

Once you run your application you should see traces being exported to the provided collector URL in the console/network tab of the browsers developer toolbar.
