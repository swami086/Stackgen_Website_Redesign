---
title: "Enable Performance Counters on IIS"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/microsoft-iis"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/microsoft-iis"
status: "ok"
---

If you use [**Microsoft Internet Information Services**](https://www.iis.net/) **(IIS)** to host your applications, you can instrument your IIS Server to bring IIS specific metrics into StackGen ObserveNow for more comprehensive monitoring. Follow the steps below to enable the IIS Integration.

tip

**Prerequisite**: StackGen Agent has been installed on the same Windows machine where IIS is running [following these instructions](/docs/observenow/collecting-telemetry/install-the-opsverse-agent)

## Enable Performance Counters on IIS

Start `Server Manager`, Navigate to the `Local Server` tab, scroll down to the `Performance` section, Right click the server and select `Start Performance Counters`

## Update Windows Exporter Configuration

Navigate to `C:\Program Files\Grafana Agent` and open up `windows-agent-config.yaml`. On the `collectors > enabled` add **"iis"** at the end. For eg.

`enabled: cpu,os,cs,process,system,net,time,memory,logical_disk,service,iis`

## Restart Windows Exporter

In the start bar, type `services.msc` and hit enter to bring up the list of running services. Find `opsverse-windows-exporter`, right click on it, and choose `Restart` to restart the service.

And that's it. You should now see IIS specific metrics flow into your ObserveNow stack

## Visualization

StackGen offers a dashboard for visualizing IIS Metrics which can be enabled on request in your ObserveNow Grafana

![IIS Monitoring Dashboard](https://docs.stackgen.com/assets/images/ibl_P5JvALfaq64lBhWg8-I8PRl6Kcygc0x_59IqWKR-20241014-155508-473b0afb8d98c7f94c7e30863470bb63.png)
