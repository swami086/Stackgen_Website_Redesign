---
title: "Getting Started"
product: "observenow"
sourcePath: "/observenow/integrations/application-profiling/linux-kernel-cpu-profiling"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/application-profiling/linux-kernel-cpu-profiling"
status: "ok"
---

The Linux Kernel CPU profiler can be enabled in observe-agent to collect machine level CPU statistics. Our profiler internally leverages `eBPF` to collect stats so enabling this adds minimal amount of latency on your overall system.

info

Since the profiler internally uses `eBPF` it needs your cluster to be running with a Linux kernel version >= `4.9`

### Getting Started

Ensure that `ObserveNow Profiling` is enabled for your stack. This sets up the profiling server along with a username and password to login.

Login to the profiling server with your credentials, and then navigate to `Settings` -\> `API keys` -\> `Add API Key` and create a new API Key with following config:

```yaml
Name: ObserveAgentKey

Role: Agent

Valid for: 0 # No expiry
```

Make sure you copy the API Key created and add the following YAML snippet to the agent's `values.yaml` and run the agent based on [these instructions](https://github.com/devopsnowinc/docs/blob/StackGen/docs/observenow/install-StackGen-agent/#kubernetes).

```yaml
pyroscope-ebpf:

  enabled: true

  args:

    - "ebpf"

    - "--application-name"

    - "agent.ebpf"

    - "--server-address"

    - "<ADD_SERVER_ENDPOINT_HERE>"

    - "--auth-token"

    - "<ADD_APIKEY_HERE>"
```

You should see kernel-level CPU statistics start getting pushed to your profiling server within a few minutes.

For more `pyroscope` options, visit [this repo](https://github.com/pyroscope-io/pyroscope)
