---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/clickhouse"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/clickhouse"
status: "ok"
---

Connect Aiden with your ClickHouse database to get intelligent assistance with database operations and maintenance. Once enabled, Aiden can run queries on your behalf and help you tune them for better performance through natural conversations.

ClickHouse is a column-oriented database for fast online analytical processing (OLAP) over large datasets. By integrating ClickHouse with Aiden, you can explore your data and optimize queries conversationally instead of hand-writing and profiling SQL.

## Integration Capabilities

With ClickHouse integration, Aiden can:

- Perform queries on your behalf.
- Assist with query optimization.

## Enable ClickHouse Integration

### Prerequisites

Before enabling the integration, ensure:

- You have a running ClickHouse instance that Aiden can reach from its network.
- You have database credentials with the permissions needed for the operations you want Aiden to perform.

### Steps to Enable ClickHouse Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the ClickHouse Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `ClickHouse, Analytics`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **Host**: The hostname or address of your ClickHouse instance.
   - **Username**: The database user Aiden authenticates as.
   - **Password**: The password for the database user.
   - **Database Name**: The database Aiden connects to.
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the ClickHouse integration:

- Show me the row count for the `events` table.
- Query the top 10 pages by views in the last 24 hours.
- Why is this query slow, and how can I optimize it?
- Suggest a better ordering key for the `events` table.
- Summarize the schema of the `orders` table.

## Limitations

- Only one ClickHouse configuration is supported at a time.
- Aiden can act only on the database and with the permissions granted to the configured user.

## Additional References

- [ClickHouse Documentation](https://clickhouse.com/docs)
- [ClickHouse SQL Reference](https://clickhouse.com/docs/en/sql-reference)

- [Integration Capabilities](/docs/aiden/1.0/integrations/clickhouse#integration-capabilities)
- [Enable ClickHouse Integration](/docs/aiden/1.0/integrations/clickhouse#enable-clickhouse-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/clickhouse#prerequisites)
  - [Steps to Enable ClickHouse Integration](/docs/aiden/1.0/integrations/clickhouse#steps-to-enable-clickhouse-integration)
