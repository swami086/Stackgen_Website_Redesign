---
title: "Accessing Activity Logs"
product: "stackgen"
sourcePath: "/docs/concepts/activity-logs"
sourceUrl: "https://docs.stackgen.com/docs/concepts/activity-logs"
status: "ok"
---

The **Activity Logs** page provides a centralized view of all system events, allowing platform engineers and administrators to track actions across the StackGen platform. This feature captures and indexes every agent invocation, chat interaction or user interaction. In other words, the **5 W's**: Who, What, When, Where, Why, making them available for search, filtering, and drill-down inspection.

![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs-0327f98dc45418402fc69b616a8ca608.png)

With Activity Logs, you can:

- Audit system usage and agent activity.
- Filter by user, appStack, action, or time range.
- Inspect detailed event payloads for troubleshooting and compliance.
- Review **secret store** lifecycle: **create**, **update**, and **delete** operations in the **secret store** produce entries in activity logs, with **JSON-style detail** for what happened and **which user** performed the action.
- Review **environment configuration** changes: updates to project **environment configuration** (for example creating a default environment) also appear in the activity table with action identifiers such as `PROJECT_DEFAULT_ENVIRONMENT_CREATED`.

![Activity Logs table showing Project Default Environment Created with PROJECT_DEFAULT_ENVIRONMENT_CREATED action](https://docs.stackgen.com/assets/images/may26-environment-configuration-audit-log-6009297150c11f2d777d0a8307734787.png)

The most common use cases of these logs are:

- **Audit**: See which user added or removed resources from a topology.
- **Compliance**: Track ownership and changes across appStacks.
- **Debugging**: Inspect resource-level JSON logs for troubleshooting.

Let's learn about Activity Logs in detail.

## Accessing Activity Logs

Click to view

Follow these steps to view Activity Logs:

1. From the StackGen Home page, click **Activity Logs**.

2. You will see a table which lists log entries with:



![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs1-fc9cae33a1cfbcd5f3e1b8dba10d7b7c.png)










   - **Time**: When the action occurred.
   - **Type**: Event category (e.g., appStack Created, Topology Resource Added).
   - **Action**: System action identifier (e.g., `APPSTACK_CREATED`, `TOPOLOGY_RESOURCE_ADDED`).
   - **appStack**: The resource ID associated with the event.
   - **Logs**: Drill-down link to view detailed event data.

## Filtering Activity Logs

Click to view

Use the filters (2) above the table to refine results:

![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs1-fc9cae33a1cfbcd5f3e1b8dba10d7b7c.png)

- **Search Action**: Filter by action type (e.g., `TOPOLOGY_RESOURCE_ADDED`).
- **Search appStack**: Narrow results to a specific **appStack ID**.
- **Start Date / End Date**: Select a date range for events.
- **Refresh**: Click Refresh to view latest logs.

## Viewing Detailed Logs

Click to view

Click the link for a an activity log under the **Logs** column to open a `JSON` view of the event.

![Activity Logs](https://docs.stackgen.com/assets/images/activitylogs2-46293d46016fb492b5df91fd681a827a.png)

The log details include metadata such as:

- `appstackID`
- `createdBy`
- `resourceType`
- `resourceID`
- `topologyID`

You can use this view to debug resource changes or validate actions.
