---
title: "How Integrations Work"
product: "aiden"
sourcePath: "/aiden/1.0/integrations"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations"
status: "ok"
---

Aiden's true power lies in its ability to directly interact with your infrastructure, tools, and services. Through its robust integrations architecture, Aiden can access real-time system data, enabling it to provide precise, context-aware assistance for your DevOps queries and tasks.

## How Integrations Work

When you enable an integration, Aiden gains secure, controlled access to that specific system. For example:

- With the Prometheus integration, Aiden can analyze real-time metrics and answer questions like _What's the error rate trend for our payment service over the last 6 hours?_
- Through AWS integration, Aiden can inspect your cloud resources and help with queries like _Why did our EC2 costs spike last week?_
- With database integrations (Postgres, MySQL), Aiden can investigate performance issues and help optimize queries.

Check out the list of [Supported Integrations](/docs/aiden/1.0/integrations/supported-integrations) and get started.

## Set Up a StackGen-Aiden Integration

To enable an Integration follow these steps:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Click **Activate** for the Integration that you want to enable.

3. Enter the integration configuration parameters.

4. Click **Save**. Below is a snapshot of enabling the AWS integration.



![aws integration](https://docs.stackgen.com/assets/images/integration-cd3003cf934c9cc511d51f06799c2954.png)

5. Aiden supports pre-built skills for some of the integrations. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.



![Pre-built](https://docs.stackgen.com/assets/images/awsprebuiltskills-b67525aa13e28a8d92f22eeaec9a5729.png)


Once activated, you can immediately start asking queries related to the enabled integration. If you attempt to query an integration that is not set up, Aiden will prompt you to enable it first.

By leveraging integrations, Aiden empowers you to seamlessly bridge the gap between general DevOps knowledge and specific operational data, making it an indispensable tool for modern development and operations teams.
