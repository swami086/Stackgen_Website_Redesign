---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/harness"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/harness"
status: "ok"
---

Connect Aiden with your Harness CI/CD platform to get intelligent assistance with pipeline management, deployment operations, and continuous delivery workflows. Once enabled, Aiden becomes your Harness expert, helping you manage deployments and CI/CD processes through natural conversations.

By combining the Harness integration with other integrations like GitHub, AWS, Azure, GCP, and Kubernetes, Aiden can provide holistic DevOps support that spans your entire software delivery lifecycle, from code commits to monitoring deployed applications. This interconnected approach enables Aiden to provide context-aware assistance across your entire DevOps toolchain, helping you streamline workflows, troubleshoot issues more effectively, and optimize your CI/CD processes end-to-end.

## Integration Capabilities

With Harness integration, Aiden can:

- Retrieve detailed information about specific pipelines.
- List available pipelines across your organization.
- Display information about configured services.
- View environment configurations and deployments.
- Monitor pipeline execution status.
- Investigate deployment history and outcomes.
- Analyze pipeline performance metrics.
- Compare deployments across environments.

## Create Custom Skills

On top of the several out of the box capabilities, you can create custom skills to add additional capabilities. Here are some examples:

- Set up automated deployment verification checks.
- Create a deployment approval workflow.
- Configure multi-environment deployment strategies.
- Establish deployment rollback procedures.
- Generate deployment reports for specific timeframes

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Harness Integration

### Generate Harness API Key

To integrate with Aiden, provide your Harness account credentials including `API Key` and `Account ID`. The API Key should have appropriate permissions to view and manage pipelines, services, and environments.

Check out the official [Harness documentation](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/) to create an API key with the necessary permissions.

### Steps to Enable Harness Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Harness Integration card.

3. Enter the integration configuration parameters:



![Harness](https://docs.stackgen.com/assets/images/harness-ac7ea1862a5c40ae3b0e39a4c60f58b3.png)










   - **Account ID**: The unique account identifier associated with your Harness account.

     - You can find your `Account ID` in the Harness dashboard by navigating to **Harness Dashboard > Account Settings > Account Details**.
     - **API Key**: The API key used to authenticate with Harness.

       - You can generate this token by navigating to **Harness Dashboard > Account Settings > API Keys > + New API Key**.
       - Make sure the API key has the required scopes for pipeline and deployment access.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me the details of the payment-service pipeline.
- List all pipelines in the production project.
- What services are configured in our Harness account?
- Show environments available for the order-processing service.
- When was the last successful deployment to production?
- Compare deployment success rates across environments.
- What's the average deployment time for our critical services?

## Limitations

Currently the Aiden-Harness integration only supports `read` and `list` operations for pipelines, executions, services and environments.

## Additional References

- [Get started with Harness API](https://developer.harness.io/docs/platform/automation/api/api-quickstart)
- [API permissions reference](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference)

- [Integration Capabilities](/docs/aiden/1.0/integrations/harness#integration-capabilities)
- [Create Custom Skills](/docs/aiden/1.0/integrations/harness#create-custom-skills)
- [Enable Harness Integration](/docs/aiden/1.0/integrations/harness#enable-harness-integration)
  - [Generate Harness API Key](/docs/aiden/1.0/integrations/harness#generate-harness-api-key)
  - [Steps to Enable Harness Integration](/docs/aiden/1.0/integrations/harness#steps-to-enable-harness-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/harness#sample-prompts)
