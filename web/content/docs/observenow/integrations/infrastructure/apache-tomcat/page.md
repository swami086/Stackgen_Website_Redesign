---
title: "Metrics"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/apache-tomcat"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/apache-tomcat"
status: "ok"
---

StackGen ObserveNow can pull logs and metrics from Apache Tomcat using the [**jmx\_exporter**](https://github.com/prometheus/jmx_exporter/) that can be configured using the StackGen Agent. Please follow the steps below to configure the agent to monitor your Tomcat installation

info

**Prerequisite**: StackGen ObserveNow Agent installed on the VM running Tomcat following the steps [mentioned here](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)

Assuming you have the ObserveNow agent up and running on the VM, you can follow the nest steps to configure Tomcat observability

# Metrics

## Install the JMX Exporter

```bash
# for amd64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-amd64.sh | sudo bash -s -- -e jmx

# for arm64

curl https://raw.githubusercontent.com/OpsVerseIO/installers/main/prometheus-exporters/install-exporter-arm64.sh | sudo bash -s -- -e jmx
```

## Configure JMX Exporter for Tomcat

Open `/etc/opsverse/exporters/jmx/config.yaml` and add the following config into it:

```yaml
lowercaseOutputLabelNames: true

lowercaseOutputName: true

whitelistObjectNames: ["java.lang:type=OperatingSystem", "Catalina:*"]

blacklistObjectNames: []

rules:

  - pattern: 'Catalina<type=Server><>serverInfo: (.+)'

    name: tomcat_serverinfo

    value: 1

    labels:

      serverInfo: "$1"

    type: COUNTER

  - pattern: 'Catalina<type=GlobalRequestProcessor, name=\"(\w+-\w+)-(\d+)\"><>(\w+):'

    name: tomcat_$3_total

    labels:

      port: "$2"

      protocol: "$1"

    help: Tomcat global $3

    type: COUNTER

  - pattern: 'Catalina<j2eeType=Servlet, WebModule=//([-a-zA-Z0-9+&@#/%?=~_|!:.,;]*[-a-zA-Z0-9+&@#/%=~_|]), name=([-a-zA-Z0-9+/$%~_-|!.]*), J2EEApplication=none, J2EEServer=none><>(requestCount|processingTime|errorCount):'

    name: tomcat_servlet_$3_total

    labels:

      module: "$1"

      servlet: "$2"

    help: Tomcat servlet $3 total

    type: COUNTER

  - pattern: 'Catalina<type=ThreadPool, name="(\w+-\w+)-(\d+)"><>(currentThreadCount|currentThreadsBusy|keepAliveCount|connectionCount|acceptCount|acceptorThreadCount|pollerThreadCount|maxThreads|minSpareThreads):'

    name: tomcat_threadpool_$3

    labels:

      port: "$2"

      protocol: "$1"

    help: Tomcat threadpool $3

    type: GAUGE

  - pattern: 'Catalina<type=Manager, host=([-a-zA-Z0-9+&@#/%?=~_|!:.,;]*[-a-zA-Z0-9+&@#/%=~_|]), context=([-a-zA-Z0-9+/$%~_-|!.]*)><>(processingTime|sessionCounter|rejectedSessions|expiredSessions):'

    name: tomcat_session_$3_total

    labels:

      context: "$2"

      host: "$1"

    help: Tomcat session $3 total

    type: COUNTER
```

## Configure Tomcat to use JMX Exporter

In the same directory where `catalina.sh` is, create a file named `setenv.sh` ( _usually_`/opt/tomcat/bin/`) and add the following into the directory

```bash
#! /bin/sh

export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/usr/local/bin/jmx_prometheus_javaagent-1.1.0.jar=9404:/etc/opsverse/exporters/jmx/config.yaml"
```

tip

Ensure the file is executable using the command `chmod +x setenv.sh`

Restart Tomcat and in a few seconds you should start seeing Tomcat metrics in the Metrics Explorer in your ObserveNow Grafana

# Logs

## Configure Observe Agent

To pull Apache Tomcat logs into ObserveNow, you only need to add a new block to the agent config. Open up `/etc/opsverse/agent-config.yaml` and under `logs -> configs -> scrape_ configs` add the following block:

```yaml
- job_name: tomcat

  static_configs:

    - labels:

        job: tomcat

        host: <hostname> # Add unique hostname

        __path__: /opt/tomcat/logs/* # This path may be different depending on how Tomcat was installed
```

## Restart Observe Agent

Restart Observe Agent with `sudo systemctl restart opsverse-agent` and you should see logs in your ObserveNow Grafana under the `Logs` datasource with the label `job = tomcat`
