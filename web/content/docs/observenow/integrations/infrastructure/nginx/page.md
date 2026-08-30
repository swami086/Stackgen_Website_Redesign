---
title: "Single Machine"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/nginx"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/nginx"
status: "ok"
---

## Single Machine

The [Prometheus Nginx exporter](https://github.com/nginxinc/nginx-prometheus-exporter) can be used on a standalone machine to collect metrics from an `nginx server`.

### Prerequisite(s) [](/docs/observenow/integrations/infrastructure/nginx#prerequisites%20%22Direct%20link%20to%20Prerequisite(s)")

### StackGen Single Machine agent

The StackGen single machine agent should be running on this machine. If that's not the case, [it can be installed using these steps](/docs/observenow/integrations/infrastructure/individual-vms).

### stub\_status module

The Nginx server should have the `stub_status` module enabled for the metrics collection to work. Availability of this module can be checked by running this command:

```shell
nginx -V 2>&1 | grep -o with-http_stub_status_module
```

If this module is not already enabled, it can be enabled by following the steps outlined in [this document](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html#stub_status).

### Add a location for stub\_status

Update the `nginx.conf` file and add a `location` for the `stub_status` module. This enables the nginx server to return metrics on the configured `location` URI. Here is an example:

```lua
server {

    listen localhost;

    server_name status.localhost;

    keepalive_timeout 0;

    access_log off;

    allow 127.0.0.1;

    deny all;

    location /stub_status {

        stub_status on;

    }

}
```

For more details, please see - [Nginx metrics through stub\_status](https://github.com/nginxinc/nginx-prometheus-exporter).

### Install Nginx Prometheus Metric Exporter

The `nginx prometheus exporter` can be installed using this command:

```shell
# for amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e nginx

# for arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e nginx
```

The agent will begin scraping the metrics automatically. The script will drop the scrape target into `/etc/opsverse/targets/`, so the agent will begin automatically scraping.

- [Single Machine](/docs/observenow/integrations/infrastructure/nginx#single-machine)
  - [Prerequisite(s)](/docs/observenow/integrations/infrastructure/nginx#prerequisites)
  - [StackGen Single Machine agent](/docs/observenow/integrations/infrastructure/nginx#stackgen-single-machine-agent)
  - [stub\_status module](/docs/observenow/integrations/infrastructure/nginx#stub_status-module)
  - [Add a location for stub\_status](/docs/observenow/integrations/infrastructure/nginx#add-a-location-for-stub_status)
  - [Install Nginx Prometheus Metric Exporter](/docs/observenow/integrations/infrastructure/nginx#install-nginx-prometheus-metric-exporter)
