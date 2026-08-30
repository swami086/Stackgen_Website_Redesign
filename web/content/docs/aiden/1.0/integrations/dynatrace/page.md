---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/dynatrace"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/dynatrace"
status: "ok"
---

Connect Aiden with your Dynatrace observability platform to get intelligent assistance with application performance monitoring, infrastructure monitoring, security analysis, and log management. Once enabled, Aiden becomes your Dynatrace expert, helping you analyze performance data and troubleshoot issues through natural conversations.

By combining the Dynatrace integration with other integrations like Kubernetes, AWS, Azure, and GCP, Aiden can provide holistic observability support that spans your entire technology stack. This interconnected approach enables Aiden to correlate performance issues with infrastructure changes, helping you identify root causes faster and optimize your application performance end-to-end.

## Integration Capabilities

With Dynatrace integration, Aiden can:

- Query data from Grail using Dynatrace Query Language (DQL).
- Generate DQL queries from natural language using Davis CoPilot.
- Verify and explain DQL query syntax.
- List and analyze problems detected by Davis AI.
- List and investigate security vulnerabilities.
- List and analyze application exceptions.
- Find and explore monitored entities (hosts, services, applications, Kubernetes clusters, etc.).
- Get Kubernetes events from your monitored clusters.
- Retrieve environment information about your Dynatrace tenant.

## Create Custom Skills

On top of the several out-of-the-box capabilities, you can create custom skills to add additional capabilities. Here are some examples:

- Create automated performance health check reports.
- Set up custom alerting workflows based on problem patterns.
- Generate weekly SLA compliance reports.
- Build deployment impact analysis workflows.
- Configure automated root cause analysis procedures.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Dynatrace Integration

### Generate Dynatrace Platform Token

To integrate with Aiden, provide your Dynatrace credentials, including `Platform Token` and `Environment URL`. Your Platform Token should have appropriate permissions to access the APIs for monitoring data, problems, and entities.

Check out the official [Dynatrace documentation](https://docs.dynatrace.com/docs/dynatrace-api/basics/dynatrace-api-authentication) to create a Platform Token with the necessary scopes.

### Steps to Enable Dynatrace Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Dynatrace Integration card.

3. Enter the integration configuration parameters:



![Dynatrace](https://docs.stackgen.com/assets/images/dynatrace-46bc466a02041c2cf6d0e89f90551e69.png)










   - **Environment URL**: The URL of your Dynatrace environment (tenant).

     - This is typically in the format `https://{your-environment-id}.live.dynatrace.com` for SaaS environments or `https://{your-domain}/e/{environment-id}` for Managed environments.
     - You can find this in your browser's address bar when logged into Dynatrace.
   - **Platform Token**: The API token used to authenticate with Dynatrace.

     - You can generate this token by navigating to **Dynatrace > Settings > Access Tokens** or **Account Management > Identity & Access Management > OAuth clients**.
     - Make sure the token has the required scopes for querying data, accessing problems, and reading entities.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- What problems have been detected in the last 24 hours?
- Show me all active problems affecting production services.
- List security vulnerabilities found in my environment.
- Find all services related to the payment application.
- What exceptions occurred in the checkout service this week?
- Show me the Kubernetes events for my production cluster.
- What hosts are currently being monitored?
- Explain what this DQL query does: `fetch logs | filter status == "ERROR"`
- Query the average response time for the order-service over the last 7 days.
- What is the status of my Dynatrace environment?

## Limitations

Currently, the Aiden-Dynatrace integration has the following limitations:

- Only `read` and `query` operations are supported as of now. You cannot make any configuration changes through Aiden.
- DQL queries are subject to Dynatrace's query timeout and result size limits.
- Some advanced Davis AI features may require additional token scopes.

## Additional References

- [Dynatrace API Documentation](https://docs.dynatrace.com/docs/dynatrace-api)
- [Dynatrace Query Language (DQL) Reference](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language)
- [Access Token Scopes](https://docs.dynatrace.com/docs/dynatrace-api/basics/dynatrace-api-authentication#token-scopes)
- [Davis AI Documentation](https://docs.dynatrace.com/docs/observe-and-explore/davis-ai)

- [Integration Capabilities](/docs/aiden/1.0/integrations/dynatrace#integration-capabilities)
- [Create Custom Skills](/docs/aiden/1.0/integrations/dynatrace#create-custom-skills)
- [Enable Dynatrace Integration](/docs/aiden/1.0/integrations/dynatrace#enable-dynatrace-integration)
  - [Generate Dynatrace Platform Token](/docs/aiden/1.0/integrations/dynatrace#generate-dynatrace-platform-token)
  - [Steps to Enable Dynatrace Integration](/docs/aiden/1.0/integrations/dynatrace#steps-to-enable-dynatrace-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/dynatrace#sample-prompts)
