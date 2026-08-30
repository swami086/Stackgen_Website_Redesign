---
title: "Instrumenting your app"
product: "observenow"
sourcePath: "/observenow/integrations/applications/python"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/python"
status: "ok"
---

## Instrumenting your app

Please follow the steps outlined in [this document](https://github.com/prometheus/client_python).

## Setting the POD annotations

Once your application is emitting metrics, your POD in K8s will need to be annotated to enable the agent to scrape the metrics. Following are the relevant annotations:

```yaml
prometheus.io/scrape: 'true'

prometheus.io/path: '/data/metrics'   # (If the metrics are served on a path other than /metrics)

prometheus.io/port: '80' # (if the metrics are served on a port other than the container port)
```

### Trace context (TraceId, SpanId and TraceFlags) injection into logs [](/docs/observenow/integrations/applications/python#trace-context-traceid-spanid-and-traceflags-injection-into-logs%20%22Direct%20link%20to%20Trace%20context%20(TraceId,%20SpanId%20and%20TraceFlags) injection into logs")

It is very simple to configure trace context (traceId, spanId, and trace flags) injection into user logs in Python applications. Please follow the below mentioned steps to inject the trace context to the logs:

There is no out of the box auto-instrumentation to inject the trace context. Instead, you'll have to get a context from current span and attach it to the log statement.

**Step 1:** Import the library.

```python
from opentelemetry import trace
```

**Step 2:** Get the current span context.

```python
ctx = trace.get_current_span().get_span_context()
```

**Step 3:** Get `trace_id` and `span_id` from the context.

```python
trace_id = '{trace:032x}'.format(trace=ctx.trace_id)

span_id  = '{span:016x}'.format(span=ctx.span_id)
```

**Step 4:** Inject trace context (`trace_id` and `span_id`) to the log.

```python
log.info('Sample log with trace_id=%s span_id=%s', trace_id, span_id)
```

info

Please ensure the aforementioned code block is added to a file where your application requests are traced with OTel Python instrumentation.

## Single Machine

If you are running a python application in a VM, ensure you have installed StackGen Agent and OpenTelemetry Collector using steps in the StackGen Docs, and then instrument your application using the docs below:

**Django**: [https://opentelemetry-python.readthedocs.io/en/latest/examples/django/README.html](https://opentelemetry-python.readthedocs.io/en/latest/examples/django/README.html)

**FastAPI**: [https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/fastapi/fastapi.html](https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/fastapi/fastapi.html)

**Flask**: [https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/flask/flask.html](https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/flask/flask.html)

- [Instrumenting your app](/docs/observenow/integrations/applications/python#instrumenting-your-app)
- [Setting the POD annotations](/docs/observenow/integrations/applications/python#setting-the-pod-annotations)
  - [Trace context (TraceId, SpanId and TraceFlags) injection into logs](/docs/observenow/integrations/applications/python#trace-context-traceid-spanid-and-traceflags-injection-into-logs)
