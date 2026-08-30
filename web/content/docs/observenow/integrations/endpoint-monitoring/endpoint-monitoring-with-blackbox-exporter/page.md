---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter"
status: "ok"
---

## Overview

[Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) is used for endpoint monitoring and can help generate meaningful uptime and availability metrics. Blackbox Exporter allows blackbox probing of endpoints over HTTP, HTTPS, DNS, TCP, ICMP and gRPC.

While most of the exporters use static configurations and then expose metrics accordingly, Blackbox Exporter works a little differently.

To setup `Blackbox Exporter`, we define modules which contain a set of targets/urls to monitor. Prometheus agent queries the blackbox exporter with these targets/urls which generates endpoint metrics like uptime, latency etc.

A sample configuration is shown below

## Configuration

Add the following `YAML` snippets to the StackGen agent's `values.yaml` file.

```yaml
victoria-metrics-agent:

  extraScrapeConfigs:

    - job_name: 'blackbox-exporter'

      scrape_timeout: 30s

      scrape_interval: 30s

      metrics_path: /probe

      params:

        module: [http_2xx]

      static_configs:

        - targets:

          - <Add target endpoint(s) here>

      relabel_configs:

        - source_labels: [__address__]

          target_label: __param_target

        - source_labels: [__param_target]

          target_label: instance

        - target_label: __address__

          replacement: devopsnow-agent-blackbox-exporter.devopsnow:9115
```

```yaml
blackbox-exporter:

  enabled: true
```

Run the below command:

```shell
helm upgrade --install devopsnow-agent -n devopsnow \

    --repo https://registry.devopsnow.io/chartrepo/public \

    -f <path to opsverse-values.yaml file>
```

## Single Machine

Alternatively, you can install the [Prometheus Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) on a single machine.

**Prerequisite(s)**:

- You have the [StackGen Agent running on the machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)

_Run_ this command to install the `Blackbox Exporter` as a systemd unit:

```shell
# for amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e blackbox

# for arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e blackbox
```

- Edit the StackGen agent config file by using the following command:

```shell
sudo vi /etc/opsverse/agent-config.yaml
```

- Add the Blackbox exporter job under `scrape_configs` and edit the fields as required.

```yaml
- job_name: 'blackbox-exporter'

  metrics_path: /probe

  params:

    module: [http_2xx]

  static_configs:

    - targets:

      - <Add target endpoints here>

  relabel_configs:

    - source_labels: [__address__]

      target_label: __param_target

    - source_labels: [__param_target]

      target_label: instance

    - target_label: __address__

      replacement: localhost:9115
```

- Edit the Blackbox exporter's config file by using the following command:

```shell
sudo vi /etc/opsverse/exporters/blackbox/config.yaml
```

info

If the below content is already present in the config file, you can ignore the below step.

- Add the below module to Blackbox exporter's config file.

```yaml
modules:

  http_2xx:

    prober: http

    timeout: 5s

    http:

      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]

      method: GET

      preferred_ip_protocol: "ip4"

      ip_protocol_fallback: false

      no_follow_redirects: false

      fail_if_ssl: false

      fail_if_not_ssl: false

      tls_config:

        insecure_skip_verify: true
```

- Restart the `prom-blackbox-exporter` service and also the StackGen Agent by using the following commands:

```shell
sudo systemctl restart prom-blackbox-exporter

sudo systemctl restart opsverse-agent
```

- Check status to confirm everything is working fine.

```shell
sudo systemctl status prom-blackbox-exporter

sudo systemctl status opsverse-agent
```

### Custom Modules for Blackbox Exporter

You can configure custom modules in Blackbox exporter by defining the module in the blackbox config file and then updating `scrape_configs` section of `agent-config.yaml` to use the custom module. Some examples are provided below:

### Appending Custom Headers with requests

Add the following module to the `modules` section in `/etc/opsverse/exporters/blackbox/config.yaml`

```yaml
http_2xx_with_header:

  prober: http

  timeout: 5s

  http:

    valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]

    method: GET

    headers: # These are your custom headers

      Authentication: Bearer <your-token>

      Accept-Language: en-US

    preferred_ip_protocol: "ip4"

    ip_protocol_fallback: false

    no_follow_redirects: false

    fail_if_ssl: false

    fail_if_not_ssl: false

    tls_config:

      insecure_skip_verify: true
```

Then restart the `blackbox-exporter` as described above and update `scrape_configs` in `/etc/opsverse/agent-config.yaml` by adding the custom module to the `params` block:

```yaml
module: [http_2xx_with_header]  # Use the custom module
```

The exporter will now send the defined headers to every target it is monitoring

### Sending POST body to target

Add the following module to the `modules` section in `/etc/opsverse/exporters/blackbox/config.yaml`

```yaml
http_post_2xx:

  prober: http

  timeout: 5s

  http:

    valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]

    method: POST

    headers:

      Content-Type: application/json

    body: '{"foo": "bar"}' # This can be a custom body you want to send to the target

    preferred_ip_protocol: "ip4"

    ip_protocol_fallback: false

    no_follow_redirects: false

    fail_if_ssl: false

    fail_if_not_ssl: false

    tls_config:

      insecure_skip_verify: true
```

Then restart the `blackbox-exporter` as described above and update `scrape_configs` in `/etc/opsverse/agent-config.yaml` by adding the custom module to the `params` block:

```yaml
module: [http_post_2xx]  # Use the custom module
```

The exporter will now make a `POST` request with predefined body to every target it is monitoring

For more examples of custom `blackbox-exporter` modules, you can see the [blackbox-exporter examples page](https://github.com/prometheus/blackbox_exporter/blob/master/example.yml).

## Visualisation

**StackGen ObserveNow** provides an out of the box Blackbox Exporter/Endpoint Monitoring dashboard that can be used to provide a visual overview of your monitored endpoints.

![](https://docs.stackgen.com/assets/images/ceSO80-cbQV1Q697sTSqT_blackbox-image-1-fe8203717cdab9d2072148b9513dcdf0.png)

![](https://docs.stackgen.com/assets/images/hVqesc-dDvKOzSZ0lktNZ_blackbox-image-2-4e536d25c3edb528955d93e508106fd5.png)

- [Overview](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#overview)
- [Configuration](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#configuration)
- [Single Machine](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#single-machine)
  - [Custom Modules for Blackbox Exporter](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#custom-modules-for-blackbox-exporter)
  - [Appending Custom Headers with requests](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#appending-custom-headers-with-requests)
  - [Sending POST body to target](/docs/observenow/integrations/endpoint-monitoring/endpoint-monitoring-with-blackbox-exporter#sending-post-body-to-target)
