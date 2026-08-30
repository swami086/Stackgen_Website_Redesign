---
title: "How Remote Runners Work"
product: "aiden"
sourcePath: "/aiden/settings/runners"
sourceUrl: "https://docs.stackgen.com/aiden/settings/runners"
status: "ok"
---

Remote Runners allow Aiden to securely access tools and integrations that run within your private environment, without exposing them to the internet. This lets Aiden interact with your Databases, internal Tools, MCP servers, API endpoints, and other resources within your VPC while maintaining complete security and privacy.

## How Remote Runners Work

Remote Runners operate through a secure agent-based architecture. Let's see how it works:

1. **Agent Installation**: You install a Remote Runner agent within your Kubernetes cluster.



**Coming soon**





We will extend support for other environments in upcoming releases.

2. **Task Creation**: When Aiden wants to access a tool from your environment, it creates tasks for the Remote Runner.

3. **Task Execution**: The Remote Runner executes the task within your secure environment.

4. **Response Delivery**: The Remote Runner sends the response back to Aiden for further processing.


This architecture ensures that your internal resources remain private and secure while still being accessible to Aiden for automation and management tasks.

## Setting Up Remote Runners

### Step 1: Create a Remote Runner

1. Navigate to **Settings > Remote Runners**.
2. Click **Create New Runner**.
3. This generates a unique ID for your Remote Runner, which you'll use later to configure the Remote Runner Agent.

### Step 2: Install the Remote Runner Agent

Deploy the Remote Runner agent using the following Helm command:

```bash
helm upgrade --install remote-runner -n remote-runner --create-namespace aiden-remote-runner --repo https://registry.devopsnow.io/chartrepo/public --set remote-runner.configMap.SERVER_URL=<aiden_endpoint> --set remote-runner.configMap.RUNNER_ID=<unique_runner_id>
```

note

- `SERVER_URL` is the endpoint for Aiden in your StackGen tenant. The format would be `https://<tenant_name>.cloud.stackgen.com/ai`.
- If you access Aiden via [https://aiden.stackgen.com](https://aiden.stackgen.com/), the `SERVER_URL` should be [https://aiden.stackgen.com](https://aiden.stackgen.com/).

Once deployed, you can monitor the status of your Remote Runner:

- **Online Status**: Check the Remote Runners settings page to see if your runner status is **Online**.
- **Ready State**: When online, the Remote Runner is ready to listen for and execute commands from Aiden.

### Step 3: Configure Integration Support

1. From the Aiden Home page, navigate to any Aiden integration that supports Remote Runners.
2. Click the integration card and enable the **Use Remote Runner** check box.
3. From the **Select Remote Runner** dropdown, select the Remote Runner of your choice from the list of configured runners.
4. Click **Validate and Save**.

## Benefits

- **Security**: Keep sensitive infrastructure and data within your VPC without public internet exposure.
- **Flexibility**: Allow Aiden access to internal databases, APIs, MCP Servers, and Tools inside your private environment.
- **Control**: Maintain full control over access to internal resources.
- **Compliance**: Strengthen adherence to enterprise security and compliance standards while still enabling automation.

## Troubleshooting

If your Remote Runner isn't showing online:

1. Verify that the Helm installation completed successfully.
2. Check the Remote Runner agent logs in your Kubernetes cluster.
3. Ensure that there is network connectivity between the agent and Aiden.
4. Confirm that you've configured the Remote Runner ID correctly .

For additional support, contact [**support@stackgen.com**](mailto:support@stackgen.com) or refer to the [Integration-specific guide](/docs/aiden/1.0/integrations/supported-integrations).

- [How Remote Runners Work](/docs/aiden/1.0/settings/runners#how-remote-runners-work)
- [Setting Up Remote Runners](/docs/aiden/1.0/settings/runners#setting-up-remote-runners)
  - [Step 1: Create a Remote Runner](/docs/aiden/1.0/settings/runners#step-1-create-a-remote-runner)
  - [Step 2: Install the Remote Runner Agent](/docs/aiden/1.0/settings/runners#step-2-install-the-remote-runner-agent)
  - [Step 3: Configure Integration Support](/docs/aiden/1.0/settings/runners#step-3-configure-integration-support)
