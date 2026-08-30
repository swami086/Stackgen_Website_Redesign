---
title: "SpringBoot Metrics Instrumentation"
product: "observenow"
sourcePath: "/observenow/integrations/applications/java"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/java"
status: "ok"
---

## SpringBoot Metrics Instrumentation

### Instrumenting your app

Please follow the installation steps outlined in this [document](https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html).

tip

Make sure add the `management.endpoints.web.exposure.include=prometheus` property in you `application.properties` file

### Setting the POD annotations

Once your application is emitting metrics, your POD in K8s will need to be annotated to enable the agent to scrape the metrics. Following are the relevant annotations:

```yaml
prometheus.io/scrape: 'true'

prometheus.io/path: '/actuator/prometheus'

prometheus.io/port: '8080'
```

## Java Tracing Instrumentation

OpenTelemetry is the recommended approach to instrument for tracing. Please follow the instructions in the following document to instrument your application:

- [OpenTelemetry Java Agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation)

This is achieved by including OpenTelemetry Java agent as shown in this example:

```shell
java -javaagent:path/to/opentelemetry-javaagent-all.jar \

     -Dotel.resource.attributes=service.name=your-service-name \

     -Dotel.traces.exporter=zipkin \

     -Dotel.metrics.exporter=none \

     -Dotel.exporter.zipkin.endpoint=http://otel-collector.devopsnow.svc.cluster.local:9411 \

     -jar myapp.jar
```

Following `args` will need to be set:

- `otel.resource.attributes=service.name=your-service-name`
- `otel.traces.exporter=zipkin`
- `otel.metrics.exporter=none`
- `otel.exporter.zipkin.endpoint=http://otel-collector.devopsnow.svc.cluster.local:9411`

This will make the Java application to emit spans which will be collected by the `OpenTelemetry` collector installed as part of the `OpsVerse agent` and forwarded to the tracing backend.

## Trace context (TraceId, SpanId and TraceFlags) injection into logs [](/docs/observenow/integrations/applications/java#trace-context-traceid-spanid-and-traceflags-injection-into-logs%20%22Direct%20link%20to%20Trace%20context%20(TraceId,%20SpanId%20and%20TraceFlags) injection into logs")

Trace ID, Span ID and trace flags can be printed to logs using MDC. The Mapped Diagnostic Context (MDC) is an instrument for distinguishing interleaved log output from different sources. Log output is typically interleaved when a server handles multiple clients near-simultaneously. The MDC is managed on a per thread basis. It contains thread-local contextual information which is later copied to each logging event captured by a logging library.

### Log4j instrumentation

**Step 1:** Add instrumented `log4j2` and `opentelemetry-api` libraries into the project dependencies:

**Maven projects:**

```java
<dependency>

    <groupId>io.opentelemetry.instrumentation</groupId>

    <artifactId>opentelemetry-log4j-2.13.2</artifactId>

    <version>1.9.2-alpha</version>

    <scope>runtime</scope>

</dependency>

<dependency>

    <groupId>io.opentelemetry</groupId>

    <artifactId>opentelemetry-api</artifactId>

    <version>1.26.0</version>

</dependency>
```

**Gradle projects:**

```java
dependencies {

     runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-log4j-2.13.2:1.9.2-alpha")

     implementation("io.opentelemetry:opentelemetry-api:1.26.0")

}
```

info

Any recent versions can be picked for both dependencies.

**Step 2:** Update the `log4j2.xml` configuration file, typically stored in resources directory, with `traceId` and `spanId`. The following is an example configuration.

```shell
<?xml version="1.0" encoding="UTF-8"?>

<Configuration status="WARN">

    <Appenders>

        <Console name="Console" target="SYSTEM_OUT">

            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} traceId: %X{trace_id} spanId: %X{span_id} - %msg%n" />

        </Console>

    </Appenders>

    <Loggers>

        <Root level="All" >

            <AppenderRef ref="Console"/>

        </Root>

    </Loggers>

</Configuration>
```

info

If you are using SpringBoot and you don't have an explicit `log4j2.xml` file, please add the following block in `application.properties` file.

```shell
logging.pattern.level=%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} traceId: %X{trace_id} spanId: %X{span_id} - %msg%n
```

### Logback instrumentation

**Step 1:** Add instrumented `logback` library into the project dependencies:

**Maven projects:**

```java
<dependency>

    <groupId>io.opentelemetry.instrumentation</groupId>

    <artifactId>opentelemetry-logback-1.0</artifactId>

    <version>1.9.2-alpha</version>

    <scope>runtime</scope>

</dependency>
```

**Gradle projects:**

```java
dependencies {

     runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-logback-1.0:1.9.2-alpha")

}
```

info

Any recent versions can be picked for the dependency.

**Step 2:** Update the `logback.xml` configuration file, typically stored in the resources directory, with traceId, spanId, and sampled keys. The following is an example configuration.

```shell
<?xml version="1.0" encoding="UTF-8" ?>

<configuration>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">

        <encoder>

            <pattern><![CDATA[%date{HH:mm:ss.SSS} [%thread] %-5level %logger{15}#%line %X{req.requestURI} traceId: %X{trace_id} spanId: %X{span_id} %msg\n]]></pattern>

        </encoder>

    </appender>

    <appender name="OTEL" class="io.opentelemetry.instrumentation.logback.v1_0.OpenTelemetryAppender">

        <appender-ref ref="STDOUT" />

    </appender>

    <root>

        <level value="DEBUG" />

        <appender-ref ref="STDOUT" />

    </root>

</configuration>
```

info

If you are using SpringBoot and you don't have an explicit `logback.xml` file, please add the following block in `application.properties` file.

```shell
logging.pattern.level=%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} traceId: %X{trace_id} spanId: %X{span_id} - %msg%n
```

### Frameworks

### Spring Boot

For Spring Boot configuration which uses logback, you can add MDC to log lines by overriding the `logging.pattern.level` config in `application.properties` file using the following block:

```shell
logging.pattern.level=trace_id=%mdc{trace_id} span_id=%mdc{span_id} trace_flags=%mdc{trace_flags} %5p
```

info

SpringBoot uses Logback for logging by default. Logback can also be configured to handle complex logging needs. The aforementioned logging config will work both default and custom Logback logging configs.

## Java Access Logs Instrumentation

Springboot comes with an embedded Tomcat server. The access logs track user session activity and page hit counts. Springboot's access logs are by default written to a file and not to `stdout`. This means that most of the log collection agents do not automatically collect the access logs from containers. There are a few strategies to handle this scenario. We recommend updating the Springboot app's properties file to make the access logs written to `stdout`. This can be done by setting the following properties on the Springboot `app.properties` file. Note that the keys in `server.tomcat.accesslog.pattern` can be changed according to requirement. Usage of `json` logging pattern helps in creating dashboards and alerts using LogQL.

```java
server.tomcat.accesslog.enabled=true

server.tomcat.accesslog.pattern={\"ip\": \"%h\", \"user\": \"%l\", \"username\": \"%u\", \"time\": \"%t\", \"request\": \"%r\", \"status\":\"%s\", \"responsesize\": \"%b\"}

server.tomcat.accesslog.directory=/dev

server.tomcat.accesslog.prefix=stdout

server.tomcat.accesslog.buffered=false

# Don't use empty double quotes,

server.tomcat.accesslog.suffix=

server.tomcat.accesslog.file-date-format=
```

For more application-level configurations visit [Common Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html).

## Single Machine

### Metrics Instrumentation

For Single Machines, you can install the [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter) on a single machine.

**Prerequisite(s)**:

- you have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent).

_Run_ this command to download the Prometheus JMX Exporter agent to your machine:

```shell
# For amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e jmx

# For arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e jmx
```

At this point, you can start your Java runtime with the downloaded agent:

```shell
java -javaagent:/usr/local/bin/jmx_prometheus_javaagent-0.16.1.jar=9404:/etc/opsverse/exporters/jmx/config.yaml -jar yourJar.jar
```

- The agent will begin scraping the metrics automatically (because the script will drop the scrape target into `/etc/opsverse/targets/jmx-exporter.json` for the agent to auto-discover).
- If you change the port of the exporter (from `9404` in the `java ...` invocation above), please update `/etc/opsverse/targets/jmx-exporter.json` with the new port.

### Tracing Instrumentation

Follow the Java Tracing Instrumentation described above to emit and send traces to your Jaeger collector endpoint.

info

The -`Dotel.exporter.zipkin.endpoint` argument should be pointing to your jaeger collector.
Example: `https://your-jaegar-endpoint:9411/api/v2/spans`

- [SpringBoot Metrics Instrumentation](/docs/observenow/integrations/applications/java#springboot-metrics-instrumentation)
  - [Instrumenting your app](/docs/observenow/integrations/applications/java#instrumenting-your-app)
  - [Setting the POD annotations](/docs/observenow/integrations/applications/java#setting-the-pod-annotations)
- [Java Tracing Instrumentation](/docs/observenow/integrations/applications/java#java-tracing-instrumentation)
- [Trace context (TraceId, SpanId and TraceFlags) injection into logs](/docs/observenow/integrations/applications/java#trace-context-traceid-spanid-and-traceflags-injection-into-logs)
  - [Log4j instrumentation](/docs/observenow/integrations/applications/java#log4j-instrumentation)
  - [Logback instrumentation](/docs/observenow/integrations/applications/java#logback-instrumentation)
  - [Frameworks](/docs/observenow/integrations/applications/java#frameworks)
  - [Spring Boot](/docs/observenow/integrations/applications/java#spring-boot)
- [Java Access Logs Instrumentation](/docs/observenow/integrations/applications/java#java-access-logs-instrumentation)
- [Single Machine](/docs/observenow/integrations/applications/java#single-machine)
  - [Metrics Instrumentation](/docs/observenow/integrations/applications/java#metrics-instrumentation)
  - [Tracing Instrumentation](/docs/observenow/integrations/applications/java#tracing-instrumentation)
