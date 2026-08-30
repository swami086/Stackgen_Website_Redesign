---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions"
status: "ok"
---

## Overview

This document outlines the process of automatically instrumenting AWS Lambda functions using OpenTelemetry (OTel) layers. It details the necessary steps for adding Lambda layers, configuring environment variables, and integrating the OpenTelemetry Collector for effective observability.

warning

This integration works for **Metrics** and **Traces**. Since OpenTelemetry \*\*Logs \*\*support is unstable for most languages, we recommend using [the CloudWatch exporter](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws#collecting-aws-cloudwatch-logs) for bringing AWS Lambda logs into ObserveNow

## Supported Languages

OpenTelemetry provides auto-instrumentation support for the following AWS Lambda runtimes: **Java, JavaScript, Python, Ruby**

## Steps for Instrumentation

### Step 1: Add the OTel Collector Lambda Layer

Before instrumenting your application, you must add the OpenTelemetry Collector Lambda layer. Follow these steps:

1. Open the [AWS Management Console](https://console.aws.amazon.com/)
2. Navigate to the Lambda function you intend to instrument
3. In the **Layers** section of the Designer, click **Add a layer**
4. Under **Specify an ARN**, enter the ARN for the OTel Collector Lambda layer, ensuring to replace <region> with the appropriate AWS region for your Lambda function.Find the [most recent Collector layer release](https://github.com/open-telemetry/opentelemetry-lambda/releases) here
5. Make sure to use the layer in the same region as your Lambda functions. The community publishes layers in all available regions. **Example**: `arn:aws:lambda:<region>:184161586896:layer:opentelemetry-collector-amd64-0_11_0:1`

info

**Note:** Ensure that the layers are deployed in the same AWS region as your Lambda function, as Lambda layers are region-specific resources.

### Step 2:Add the Instrumentation Lambda Layer

Add the instrumentation layer corresponding to your selected programming language by following the same steps as above:

- For **Python example**: `arn:aws:lambda::184161586896:layer:opentelemetry-python-0_10_0:1`
- Find the [most recent instrumentation layer release](https://github.com/open-telemetry/opentelemetry-lambda/releases) for your language and use it’s ARN after changing the <region> tag to the region your Lambda

info

**Note:** Ensure that the layers are deployed in the same AWS region as your Lambda function, as Lambda layers are region-specific resources.

### Step 3: Configure Environment Variables

- Adjust the entry point of your application by configuring the `AWS_LAMBDA_EXEC_WRAPPER` environment variable according to your programming language.

  - For **Node.js, Java, or Ruby**: `AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-handler`
  - For **Python**: `AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-instrument`
- Create an environment variable to specify the configuration file for the OpenTelemetry Collector: `OPENTELEMETRY_COLLECTOR_CONFIG_FILE=/var/task/collector.yaml`

### Step 4: Configure the OpenTelemetry Collector

The configuration of the OTel Collector Lambda layer follows the OpenTelemetry standard.

By default, the OTel Collector Lambda layer uses the `config.yaml`. Since we want to use a customization, create a `collector.yaml` file in the root directory

```yaml
receivers:

  otlp:

    protocols:

      grpc:

        endpoint: 0.0.0.0:4317

      http:

        endpoint: 0.0.0.0:4318



exporters:

  otlphttp:

    endpoint: "https://<opsverse-otel-endpoint>/"

    headers:

      Authorization: "Basic Base64{<username>:<password>}"

    retry_on_failure:

      max_elapsed_time: 600s



  prometheusremotewrite:

    endpoint: "https://<opsverse-metrics-endpoint>/api/v1/write"

    headers:

      Authorization: "Basic Base64{<username>:<password>}"

    resource_to_telemetry_conversion:

      enabled: true

    retry_on_failure:

      max_elapsed_time: 600s

service:

  pipelines:

    traces:

      receivers: [otlp]

      exporters: [otlphttp]

    metrics:

      receivers: [otlp]

      exporters: [prometheusremotewrite]


```

### Step 5: View the metrics in ObserveNow

Metrics collected from Lambda function can be viewed under the `Explore` section of ObserveNow `Grafana`

![](https://docs.stackgen.com/assets/images/w5IaNzsqTMCcCXIMv0kWd-dDMMCFH54kcwDcMZ60tVP-20240926-095304-b12c8e5edd33210590e6e60559862d3c.png)

### Step 6: View the traces in ObserveNow

Traces collected from Lambda function can be viewed under the `Explore` section of ObserveNow`Grafana`

![](https://docs.stackgen.com/assets/images/w5IaNzsqTMCcCXIMv0kWd-gKnXWt926n_fNXrCSu-Wo-20240926-095525-30686c8d9607fa0cfc555a865d426037.png)

- [Overview](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#overview)
- [Supported Languages](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#supported-languages)
- [Steps for Instrumentation](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#steps-for-instrumentation)
  - [Step 1: Add the OTel Collector Lambda Layer](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-1-add-the-otel-collector-lambda-layer-)
  - [Step 2:Add the Instrumentation Lambda Layer](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-2add-the-instrumentation-lambda-layer)
  - [Step 3: Configure Environment Variables](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-3-configure-environment-variables)
  - [Step 4: Configure the OpenTelemetry Collector](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-4-configure-the-opentelemetry-collector)
  - [Step 5: View the metrics in ObserveNow](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-5-view-the-metrics-in-observenow)
  - [Step 6: View the traces in ObserveNow](/docs/observenow/integrations/cloud-providers/amazon-web-services-aws/aws-lambda-functions#step-6-view-the-traces-in-observenow)
