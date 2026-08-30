---
title: "Go Tracing Instrumentation"
product: "observenow"
sourcePath: "/observenow/integrations/applications/go"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/go"
status: "ok"
---

## Go Tracing Instrumentation

OpenTelemetry is the recommended approach to instrument for tracing. For your Go applications, please follow the instructions in the following document to instrument:

- [OpenTelemetry Go Libraries](https://opentelemetry.io/docs/instrumentation/go/libraries/)

### Summary of Steps

1. Determine what framework (standard or 3rd-party) your Go apps are using (e.g., `net/http`, `gorilla/mux`, etc)
2. Navigate to [OpenTelemetry Registry](https://opentelemetry.io/registry/?language=go&component=instrumentation) to find if the packages from (1) have an already existing instrumentation library
3. Import the instrumented libraries into your app and initialize them (the trace initialization can be a one-time addition to your own shared library or, alternatively, some `initTracer()` func in each app)
4. Wrap the handler functions to achieve the "auto" instrumentation

### Example

The example in the above links shows the above steps for the `net/http` package.

Here is another example:

- This sample Go app is using the `gofiber/fiber` package.
- We've found that instrumentation libraries exist on the OpenTelemetry Registry and clicked to verify the library names.
- Import the instrumented libraries:

```go
 import (

      ...

       "context"

       "github.com/gofiber/contrib/otelfiber"

       "go.opentelemetry.io/otel"

       "go.opentelemetry.io/otel/sdk/resource"

       // If wanting to use standard output exporter for testing

       // "go.opentelemetry.io/otel/exporters/stdout/stdouttrace"

       "go.opentelemetry.io/otel/exporters/zipkin"

       "go.opentelemetry.io/otel/propagation"

       sdktrace "go.opentelemetry.io/otel/sdk/trace"

       semconv "go.opentelemetry.io/otel/semconv/v1.4.0"

        ...

 )
```

- Trace initialization:

```go
func initTracer() *sdktrace.TracerProvider {

       exporter, err := zipkin.New("http://otel-collector.devopsnow.svc.cluster.local:9411")

       // Use the standard out exporter instead if local testing

       // exporter, err := stdouttrace.New(stdouttrace.WithPrettyPrint())

       if err != nil {

               fmt.Println(err)

       }

       tp := sdktrace.NewTracerProvider(

               sdktrace.WithSampler(sdktrace.AlwaysSample()),

               sdktrace.WithBatcher(exporter),

               sdktrace.WithResource(

                       resource.NewWithAttributes(

                               semconv.SchemaURL,

                               semconv.ServiceNameKey.String("my-cool-app"),

                       )),

       )

       otel.SetTracerProvider(tp)

       otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))

       return tp

}
```

(4) Tell the app to use the middleware to auto-wrap your handlers

```go
 func main() {

	tp := initTracer()

	defer func() {

		if err := tp.Shutdown(context.Background()); err != nil {

			fmt.Printf("Error shutting down tracer provider: %v", err)

		}

	}()



 	app := fiber.New()



	app.Use(otelfiber.Middleware("my-cool-app"))

 	routes.Setup(app)



 	port := "8000"

    ...
```

For production use, you'll be using the Zipkin exporter (as seen in the code).

This will make the Go application to emit spans which will be collected by the `OpenTelemetry` collector installed as part of the `OpsVerse agent` and forwarded to the tracing backend.

- [Go Tracing Instrumentation](/docs/observenow/integrations/applications/go#go-tracing-instrumentation)
  - [Summary of Steps](/docs/observenow/integrations/applications/go#summary-of-steps)
  - [Example](/docs/observenow/integrations/applications/go#example)
