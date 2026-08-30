---
title: "Metrics"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/apache-airflow"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/apache-airflow"
status: "ok"
---

# Metrics

## Instrumentation For Official Apache Helm Chart

If you are making use of the [official apache helm chart](https://github.com/apache/airflow/tree/main/chart), make sure the `statsd exporter` is enabled with proper service annotations, if not, you can enable it by adding the following snippet to the `values.yaml` file of the airflow deployment:

```yaml
statsd:

  enabled: true

  service:

    extraAnnotations:

      prometheus.io/port: "9102"

      prometheus.io/scrape: "true"
```

You will also need to add the following `extraMappings` snippet under the `statsd` configurations of the `values.yaml` file of the airflow deployment:

```yaml
statsd:

  extraMappings:

    - match: "(.+)\\.(.+)_start$"

      match_metric_type: counter

      name: "af_agg_job_start"

      match_type: regex

      labels:

        airflow_id: "$1"

        job_name: "$2"

    - match: "(.+)\\.(.+)_end$"

      match_metric_type: counter

      name: "af_agg_job_end"

      match_type: regex

      labels:

        airflow_id: "$1"

        job_name: "$2"

    - match: "(.+)\\.operator_failures_(.+)$"

      match_metric_type: counter

      name: "af_agg_operator_failures"

      match_type: regex

      labels:

        airflow_id: "$1"

        operator_name: "$2"

    - match: "(.+)\\.operator_successes_(.+)$"

      match_metric_type: counter

      name: "af_agg_operator_successes"

      match_type: regex

      labels:

        airflow_id: "$1"

        operator_name: "$2"

    - match: "*.ti_failures"

      match_metric_type: counter

      name: "af_agg_ti_failures"

      labels:

        airflow_id: "$1"

    - match: "*.ti_successes"

      match_metric_type: counter

      name: "af_agg_ti_successes"

      labels:

        airflow_id: "$1"

    - match: "*.zombies_killed"

      match_metric_type: counter

      name: "af_agg_zombies_killed"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler_heartbeat"

      match_metric_type: counter

      name: "af_agg_scheduler_heartbeat"

      labels:

        airflow_id: "$1"

    - match: "*.dag_processing.processes"

      match_metric_type: counter

      name: "af_agg_dag_processing_processes"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.tasks.killed_externally"

      match_metric_type: counter

      name: "af_agg_scheduler_tasks_killed_externally"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.tasks.running"

      match_metric_type: counter

      name: "af_agg_scheduler_tasks_running"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.tasks.starving"

      match_metric_type: counter

      name: "af_agg_scheduler_tasks_starving"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.orphaned_tasks.cleared"

      match_metric_type: counter

      name: "af_agg_scheduler_orphaned_tasks_cleared"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.orphaned_tasks.adopted"

      match_metric_type: counter

      name: "af_agg_scheduler_orphaned_tasks_adopted"

      labels:

        airflow_id: "$1"

    - match: "*.scheduler.critical_section_busy"

      match_metric_type: counter

      name: "af_agg_scheduler_critical_section_busy"

      labels:

        airflow_id: "$1"

    - match: "*.sla_email_notification_failure"

      match_metric_type: counter

      name: "af_agg_sla_email_notification_failure"

      labels:

        airflow_id: "$1"

    - match: "*.ti.start.*.*"

      match_metric_type: counter

      name: "af_agg_ti_start"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

        task_id: "$3"

    - match: "*.ti.finish.*.*.*"

      match_metric_type: counter

      name: "af_agg_ti_finish"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

        task_id: "$3"

        state: "$4"

    - match: "*.dag.callback_exceptions"

      match_metric_type: counter

      name: "af_agg_dag_callback_exceptions"

      labels:

        airflow_id: "$1"

    - match: "*.celery.task_timeout_error"

      match_metric_type: counter

      name: "af_agg_celery_task_timeout_error"

      labels:

        airflow_id: "$1"

    # === Gauges ===

    - match: "*.dagbag_size"

      match_metric_type: gauge

      name: "af_agg_dagbag_size"

      labels:

        airflow_id: "$1"

    - match: "*.dag_processing.import_errors"

      match_metric_type: gauge

      name: "af_agg_dag_processing_import_errors"

      labels:

        airflow_id: "$1"

    - match: "*.dag_processing.total_parse_time"

      match_metric_type: gauge

      name: "af_agg_dag_processing_total_parse_time"

      labels:

        airflow_id: "$1"

    - match: "*.dag_processing.last_runtime.*"

      match_metric_type: gauge

      name: "af_agg_dag_processing_last_runtime"

      labels:

        airflow_id: "$1"

        dag_file: "$2"

    - match: "*.dag_processing.last_run.seconds_ago.*"

      match_metric_type: gauge

      name: "af_agg_dag_processing_last_run_seconds"

      labels:

        airflow_id: "$1"

        dag_file: "$2"

    - match: "*.dag_processing.processor_timeouts"

      match_metric_type: gauge

      name: "af_agg_dag_processing_processor_timeouts"

      labels:

        airflow_id: "$1"

    - match: "*.executor.open_slots"

      match_metric_type: gauge

      name: "af_agg_executor_open_slots"

      labels:

        airflow_id: "$1"

    - match: "*.executor.queued_tasks"

      match_metric_type: gauge

      name: "af_agg_executor_queued_tasks"

      labels:

        airflow_id: "$1"

    - match: "*.executor.running_tasks"

      match_metric_type: gauge

      name: "af_agg_executor_running_tasks"

      labels:

        airflow_id: "$1"

    - match: "*.pool.open_slots.*"

      match_metric_type: gauge

      name: "af_agg_pool_open_slots"

      labels:

        airflow_id: "$1"

        pool_name: "$2"

    - match: "*.pool.queued_slots.*"

      match_metric_type: gauge

      name: "af_agg_pool_queued_slots"

      labels:

        airflow_id: "$1"

        pool_name: "$2"

    - match: "*.pool.running_slots.*"

      match_metric_type: gauge

      name: "af_agg_pool_running_slots"

      labels:

        airflow_id: "$1"

        pool_name: "$2"

    - match: "*.pool.starving_tasks.*"

      match_metric_type: gauge

      name: "af_agg_pool_starving_tasks"

      labels:

        airflow_id: "$1"

        pool_name: "$2"

    - match: "*.smart_sensor_operator.poked_tasks"

      match_metric_type: gauge

      name: "af_agg_smart_sensor_operator_poked_tasks"

      labels:

        airflow_id: "$1"

    - match: "*.smart_sensor_operator.poked_success"

      match_metric_type: gauge

      name: "af_agg_smart_sensor_operator_poked_success"

      labels:

        airflow_id: "$1"

    - match: "*.smart_sensor_operator.poked_exception"

      match_metric_type: gauge

      name: "af_agg_smart_sensor_operator_poked_exception"

      labels:

        airflow_id: "$1"

    - match: "*.smart_sensor_operator.exception_failures"

      match_metric_type: gauge

      name: "af_agg_smart_sensor_operator_exception_failures"

      labels:

        airflow_id: "$1"

    - match: "*.smart_sensor_operator.infra_failures"

      match_metric_type: gauge

      name: "af_agg_smart_sensor_operator_infra_failures"

      labels:

        airflow_id: "$1"

    # === Timers ===

    - match: "*.dagrun.dependency-check.*"

      match_metric_type: observer

      name: "af_agg_dagrun_dependency_check"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

    - match: "*.dag.*.*.duration"

      match_metric_type: observer

      name: "af_agg_dag_task_duration"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

        task_id: "$3"

    - match: "*.dag_processing.last_duration.*"

      match_metric_type: observer

      name: "af_agg_dag_processing_duration"

      labels:

        airflow_id: "$1"

        dag_file: "$2"

    - match: "*.dagrun.duration.success.*"

      match_metric_type: observer

      name: "af_agg_dagrun_duration_success"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

    - match: "*.dagrun.duration.failed.*"

      match_metric_type: observer

      name: "af_agg_dagrun_duration_failed"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

    - match: "*.dagrun.schedule_delay.*"

      match_metric_type: observer

      name: "af_agg_dagrun_schedule_delay"

      labels:

        airflow_id: "$1"

        dag_id: "$2"

    - match: "*.scheduler.critical_section_duration"

      match_metric_type: observer

      name: "af_agg_scheduler_critical_section_duration"

      labels:

        airflow_id: "$1"

    - match: "*.dagrun.*.first_task_scheduling_delay"

      match_metric_type: observer

      name: "af_agg_dagrun_first_task_scheduling_delay"

      labels:

        airflow_id: "$1"

        dag_id: "$2"
```

The [Airflow Cluster Dashboard](https://github.com/databand-ai/airflow-dashboards/blob/main/grafana/cluster-dashboard.json) can be added into your grafana instance for Visualization.

## Instrumentation For Community Helm Chart

If you are making use of the [community helm chart](https://github.com/airflow-helm/charts/tree/main/charts/airflow), you can enable metrics instrumentation by following any of the below mentioned methods.

### Configuring airflow exporter for Metrics

Using `airflow-exporter`, you can enable metrics by setting the following in the `values.yaml` file of the airflow deployment:

```yaml
airflow:

  extraPipPackages: ["airflow-exporter"]
```

and

```yaml
web:

  service:

    annotations:

      prometheus.io/path: /admin/metrics

      prometheus.io/port: "8080"

      prometheus.io/scrape: "true"
```

:::

### Configuring OpenTelemetry for Metrics

You can use otel for instrumenting airflow metrics by setting the following in the `values.yaml` file of the airflow deployment:

```yaml
airflow:

  extraPipPackages:

    - "apache-airflow[otel]"

  config:

    AIRFLOW__METRICS__OTEL_ON: "True"

    AIRFLOW__METRICS__OTEL_HOST: "<otel_collector_service_name>.<namespace>.svc.cluster.local"

    AIRFLOW__METRICS__OTEL_PORT: 4318

    AIRFLOW__METRICS__OTEL_PREFIX: "airflow"
```

For more configuration options for metrics, you can refer the [airflow otel metrics documentation](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics).
:::

Update your airflow deployment using the helm upgrade command and you should be able to see metrics coming to your Grafana.

* * *

# Traces

## Otel Instrumentation for Community Airflow helm chart

If you are making use of the [community helm chart](https://github.com/airflow-helm/charts/tree/main/charts/airflow), you can configure your Airflow instance to send traces to your Grafana.

info

Tracing can only be configured if you are using Airflow version `2.10.1` and above. For the versions below that, airflow does not support traces instrumentation.

To configure tracing, please add the [traces configuration](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/logging-monitoring/traces.html#setup-opentelemetry) and the `apache-airflow[otel]` package for your airflow by updating `values.yaml` as follows -

```yaml
airflow:

  extraPipPackages:

    - "apache-airflow[otel]"

  config:

    AIRFLOW__TRACES__OTEL_ON: "True"

    AIRFLOW__TRACES__OTEL_HOST: "<otel_collector_service_name>.<namespace>.svc.cluster.local"

    AIRFLOW__TRACES__OTEL_PORT: 4318

    AIRFLOW__TRACES__OTEL_TASK_LOG_EVENT: "True"

    AIRFLOW__TRACES__OTEL_SERVICE: "airflow"
```

For more configuration options for traces, you can check the [Airflow traces documentation](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#traces).

warning

If you set `otel_debugging_on` to `True`, airflow will print traces to the console instead of sending it to configured host.

Update your airflow deployment using the helm upgrade command and you should be able to see traces coming to your Grafana.

- [Instrumentation For Official Apache Helm Chart](/docs/observenow/integrations/infrastructure/apache-airflow#instrumentation-for-official-apache-helm-chart)
- [Instrumentation For Community Helm Chart](/docs/observenow/integrations/infrastructure/apache-airflow#instrumentation-for-community-helm-chart)
  - [Configuring airflow exporter for Metrics](/docs/observenow/integrations/infrastructure/apache-airflow#configuring-airflow-exporter-for-metrics)
  - [Configuring OpenTelemetry for Metrics](/docs/observenow/integrations/infrastructure/apache-airflow#configuring-opentelemetry-for-metrics-)
