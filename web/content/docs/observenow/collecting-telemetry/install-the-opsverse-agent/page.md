---
title: "Kubernetes"
product: "observenow"
sourcePath: "/observenow/collecting-telemetry/install-the-opsverse-agent"
sourceUrl: "https://docs.stackgen.com/observenow/collecting-telemetry/install-the-opsverse-agent"
status: "ok"
---

The StackGen agent can be installed in seconds on a variety of environments to begin sending your telemetry (metrics, logs, and traces) to your ObserveNow backend.

This section will document how to install the agent on **Kubernetes**, **Docker Swarm**, **Standalone Linux Machines**, and **Standalone Microsoft Windows Machines**

## Kubernetes

Monitoring a Kubernetes cluster is as simple as running a helm chart command on the cluster.

### Getting Started

To collect `metrics`, `logs`, and `traces` from a Kubernetes cluster and its applications, run the following command:

```text
$ helm upgrade --install devopsnow-agent -n devopsnow --create-namespace observe-agent \

    --repo https://registry.devopsnow.io/chartrepo/public \

    -f <path to opsverse-values.yaml file>
```

Following is an example `values.yaml` file:

```yaml
cluster_name: first-cluster

logs:

  host: <logsHost>

  username: devopsnow

  password: <password>

  multiline:

    snippet: |

      - multiline:

          firstline: '^\d{2,4}\-\d{2,4}\-\d{2,4} \d{2,4}\:\d{2,4}\:\d{2,4}\.\d{1,6}'

          max_lines: 200

victoria-metrics-agent:

  remoteWriteUrls:

    - https://<metricsHost>/api/v1/write

  extraArgs:

    remoteWrite.basicAuth.password: <password>

    remoteWrite.basicAuth.username: devopsnow

    remoteWrite.label: cluster=first-cluster

otelcollector:

  enabled: true

  jaeger:

    url: "https://<tracesHost>/api/v2/spans"

    auth: "Basic <`echo -n 'devopsnow:<password>' | base64`>"
```

## Single Machine

Some workloads run on a single machine - for example, a 64-bit Linux VM. You may also install the agent to collect metrics from that node ( _and any subsequent_ [_prometheus exporters_](https://prometheus.io/docs/instrumenting/exporters/) _you install on it_) for end-to-end observability.

To do so, simply run:

```sh
# for amd64 machines

$ curl -L https://opsverse-public.s3.amazonaws.com/agent/single-node/installer.sh -o installer.sh && chmod +x ./installer.sh

# for arm64 machines

$ curl -L https://opsverse-public.s3.amazonaws.com/agent/single-node/installer-arm64.sh -o installer.sh && chmod +x ./installer.sh

sudo ./installer.sh -- -m <metricsHost> -l <logsHost> -t <tracesHost>  -p <password>
```

You can then verify the agent is running:

```sh
$ sudo systemctl status opsverse-agent
```

info

If some other service is using the port 12345, you might get an error with `opsverse-agent` logs as `Failed to start OpsVerse Agent`

To resolve this error, go to `/etc/systemd/system/opsverse-agent.service`file and add this `-server.http.address=127.0.0.1:<port>`at the last of `ExecStart`command. Please replace the placeholder `<port>` with port other than 12345.

For example: The`/etc/systemd/system/opsverse-agent.service` file should look like

```javascript
...

ExecStart= /usr/local/bin/opsverse-telemetry-agent --config.file=/etc/opsverse/agent-config.yaml -config.expand-env -server.http.address=127.0.0.1:12347

...
```

Now restart the agent by using the command and this should resolve the issue:

```javascript
$ sudo systemctl restart opsverse-agent
```

### Scrape Additional Targets

Some services already expose a `/metrics` endpoint that the agent can scrape and ship.

For the agent to automatically begin collecting those metrics, simply drop a JSON file inside `/etc/opsverse/targets/` specifying where to scrape.

For example, you have a local `etcd` running, your file `/etc/opsverse/targets/etcd.json` may look like:

```json
[\
\
  {\
\
    "labels": {\
\
      "job": "integrations/etcd"\
\
    },\
\
    "targets": [\
\
      "localhost:2379"\
\
    ]\
\
  }\
\
]
```

For services that don't expose a `/metrics` endpoint, we run [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/) for those services and scrape those targets instead.

## Docker Compose

StackGen agents can be installed using `docker compose`.

### Structure

1. Download the StackGen-agent.zip file by using the command below and unzip it.

```text
$ curl -LO https://github.com/OpsVerseIO/installers/raw/main/opsverse-agent.zip

$ unzip opsverse-agent.zip
```

NOTE: You should have three files in the `opsverse-agent` folder; `.env`, `docker-compose.yaml` and `agent/config/agent.yaml`

### Configuration

1. `.env` is the only file you need to edit. The editable variables in the `.env` file can be found in your StackGen Admin Console.
2. After editing the variables in the `.env` file, run the below command:

```text
$ docker-compose up -d
```

## Microsoft Windows

Installing StackGen Agent on machines running Microsoft Windows

### Getting Started

To install StackGen Agent on Windows machine, follow the steps below:

Download the [StackGen-agent-windows-installer.zip](https://github.com/OpsVerseIO/installers/raw/main/StackGen-agent-windows.zip).

- Unzip the file.
- Open Windows Powershell as an `administrator` in the same path (i.e inside the StackGen-agent-windows-installer folder) and run the `installation.ps1` using the command `./installation.ps1`
- During the installation, the installer will ask,
  - Enter a unique hostname.
  - In the next step, the installer will ask the values of ObserveNow Metrics URL, ObserveNow Logs URL and the Password. You can find them in your StackGen Admin Console under `ObserveNow` \> `Integrations` \> `URLs and Integration Credentials`.
  - That’s it. The installer will set up and configure StackGen ObserveNow agents to capture metrics from the Windows instance.
  - Once the setup is complete, you should be able to see your Windows host machine in Grafana, and start seeing machine-specific metrics/logs flowing in."

You should be able to see the services up and running in `Services.msc`

Under `Apps` section of your ObserveNow instance, click on Grafana icon and go to the `Explore` section to explore logs and metrics collected by the agent.

![](https://docs.stackgen.com/assets/images/hAx5QPcsQ6zdSVUBbPKV2_image-539c6bacfd976edfe19df3652f865ee5.png)

- [Kubernetes](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#kubernetes)
  - [Getting Started](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#getting-started)
- [Single Machine](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#single-machine)
  - [Scrape Additional Targets](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#scrape-additional-targets)
- [Docker Compose](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#docker-compose)
  - [Structure](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#structure)
  - [Configuration](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#configuration)
- [Microsoft Windows](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#microsoft-windows)
  - [Getting Started](/docs/observenow/collecting-telemetry/install-the-opsverse-agent#getting-started-1)
