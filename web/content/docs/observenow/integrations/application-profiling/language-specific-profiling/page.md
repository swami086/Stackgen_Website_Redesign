---
title: "Java Instrumentation"
product: "observenow"
sourcePath: "/observenow/integrations/application-profiling/language-specific-profiling"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/application-profiling/language-specific-profiling"
status: "ok"
---

`ObserveNow Profiler` allows you to instrument applications with language specific SDKs to allow you to bring in profiling information to allow easier identification of code hotspots and provide more visibility into CPU/Memory usage of your code. To instrument your applications, you can use the following guide depending on your application language.

To use any of these instrumentations, ensure you have `ObserveNow Profiler` enabled for your stack.

Login to the profiling server with your credentials, and then navigate to `Settings` -\> `API keys` -\> `Add API Key` and create a new API Key with following config:

```yaml
Name: AppProfilingKey

Role: Agent

Valid for: 0 # No expiry
```

Make sure you copy the API Key created as we'll use this key below.

## Java Instrumentation

Download the latest version of `pyroscope.jar` from [pyroscope release page](https://github.com/pyroscope-io/pyroscope-java/releases)

Set environment variables and then use the pyroscope jar you downloaded as a `javaagent` to start profiling your application

```shell
export PYROSCOPE_FORMAT="jfr"

export PYROSCOPE_PROFILER_ALLOC=0

export PYROSCOPE_APPLICATION_NAME=java-instrumentation

export PYROSCOPE_SERVER_ADDRESS=<ADD_SERVER_ENDPOINT_HERE>

export PYROSCOPE_AUTH_TOKEN=<ADD_APIKEY_HERE>

java -javaagent:pyroscope.jar -jar your-application.jar
```

## NodeJS Instrumentation

Install the NodeJS SDK using `npm install @pyroscope/nodejs`

You can then initialize profiling using the following block of code:

```nodejs
const Pyroscope = require('@pyroscope/nodejs');

Pyroscope.init({  serverAddress: '<ADD_SERVER_ENDPOINT_HERE>',

                  authToken: <ADD_APIKEY_HERE>,

                  appName: 'nodeJSAppName' });

Pyroscope.start()
```

For more configuration options, you can use the [Pyroscope NodeJS SDK repo](https://github.com/pyroscope-io/pyroscope-nodejs/)

## Python Instrumentation

Install the Python SDK using `pip install pyroscope-io`

Then you can initialize profiling using the following block of code:

```python
import pyroscope

pyroscope.configure(

  application_name = "my.python.app",

  server_address   = "<ADD_SERVER_ENDPOINT_HERE>",

  auth_token = "<ADD_APIKEY_HERE>"

)
```

For more configuration options, you can reference the [Pyroscope Python SDK](https://github.com/pyroscope-io/pyroscope-rs/tree/main/pyroscope_ffi/python)
