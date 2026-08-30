---
title: "Prerequisites"
product: "observenow"
sourcePath: "/observenow/integrations/cloud-providers/amazon-web-services-aws/amazon-managed-workflows-for-apache-airflow-mwaa"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/cloud-providers/amazon-web-services-aws/amazon-managed-workflows-for-apache-airflow-mwaa"
status: "ok"
---

Airflow instance deployed using Amazon Managed Workflows for Apache Airflow (AWS MWAA) can be instrumented for collecting traces.

info

**Note**: Inbuilt OpenTelemetry integration for **Apache Airflow** is available only from [**v2.10.0** and above](https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html#opentelemetry-traces-for-apache-airflow-37948)

## Prerequisites

tip

You have an active OpenTelemetry Collector which is configured to send data to your ObserveNow. For simplicity, you can use the **ObserveNow Agent OpenTelemetry Collector**( [K8s](/docs/observenow/collecting-telemetry/install-the-opsverse-agent) or [standalone VM](/docs/observenow/integrations/infrastructure/individual-vms)) or the **ObserveNow Server OpenTelemetry Collector** which are preconfigured to forward telemetry to your ObserveNow instance.

Ensure your ingress for OpenTelemetry collector is accessible to your MWAA infrastructure/VPC

## Traces

Navigate to your AWS MWAA instance. Edit the instance, Navigate to `Configure advanced settings` **\>**`Airflow configuration options` to add the following configuration values:

```none
traces.otel_on = True

traces.otel_host = <otel_collector_host> # This will be <username>:<password>@<otel_collector_host> if you use the default ObserveNow OTel ingress

traces.otel_port = <otel_collector_port> # This will be 443 if you use the ObserveNow OTel ingress

traces.otel_service = mwaa

traces.otel_ssl_active = True # This can be set to False if you don't want to use SSL
```

An example traces configuration is shown below -

![](https://docs.stackgen.com/assets/images/lXn9LpVt8_5bY6sXyeAS5-L_Nr2-3ZZiI3P0xoWmzft-20241024-133037-1556d9895a3e870dc412c16e8bc37c67.jpg)

For more configuration options for traces, you can check the [Airflow OpenTelemetry Traces documentation](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#traces).

warning

If you set `otel_debugging_on` to `True`, airflow will print traces to the console instead of sending it to configured host.

Save the configurations and once the MWAA environment is updated you should be able to see traces coming to your Grafana, under the "Traces" datasource.

![](https://docs.stackgen.com/assets/images/lXn9LpVt8_5bY6sXyeAS5-9oJlh-M0PdxzLu3roB286-20241024-140703-00f83e85f260bcd130c8b9a0f41183f5.png)
