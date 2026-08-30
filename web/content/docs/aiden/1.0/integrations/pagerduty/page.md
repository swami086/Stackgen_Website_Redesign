---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/pagerduty"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/pagerduty"
status: "ok"
---

Connect Aiden with your PagerDuty account to get intelligent assistance with incident management, on-call scheduling, and escalation policies. Once enabled, Aiden becomes your incident management expert, helping you respond to incidents, manage on-call rotations, and analyze incident patterns through natural conversations.

PagerDuty is an incident management platform that helps teams detect and respond to operational issues in real-time. By integrating PagerDuty with Aiden, you can streamline your incident response workflows, quickly access on-call information, and gain insights into your incident patterns—all through conversational interactions.

## Integration Capabilities

With PagerDuty integration, Aiden can:

- List and view incidents with filtering by status, urgency, and date range.
- Create and resolve incidents.
- Add notes and responders to incidents.
- View on-call schedules and current on-call users.
- Manage escalation policies.
- List and manage services and teams.
- Analyze incident patterns and related incidents.
- View past incidents and outlier incident information.

## Enable PagerDuty Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active PagerDuty account with appropriate permissions.
- You have access to generate API tokens from your PagerDuty user profile.

### Generate PagerDuty API Token

To integrate with Aiden, you'll need to generate a User API Token from your PagerDuty account:

1. Log in to your PagerDuty account.
2. Navigate to **My Profile** by clicking your avatar in the top-right corner.
3. Select the **User Settings** tab.
4. Under **API Access**, click **Create New API User Token**.
5. Provide a description for the token (e.g., "Aiden Integration").
6. Click **Create Token** and copy the generated token.

Important

Store your API token securely. You won't be able to view it again after closing the dialog.

### Steps to Enable PagerDuty Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the PagerDuty Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration.
   - **Configuration Description** (optional): Additional details about this configuration.
   - **API Token**: The User API Token you generated from your PagerDuty profile.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some sample prompts you can use with the PagerDuty integration:

**Incident Management:**

- Show me all open incidents assigned to me.
- What are the high urgency incidents from the last 24 hours?
- Create a new incident for the API service with title "Database connection timeout".
- Resolve incident PD12345 and add a note about the root cause.
- Add a note to incident PD67890 saying we're investigating the issue.

**On-Call and Schedules:**

- Who's currently on call for the platform team?
- Show me the on-call schedule for the next week.
- List all schedules I'm part of.

**Services and Teams:**

- List all services in my PagerDuty account.
- Show me the details of the payment-service.
- What teams are configured in our account?
- Who are the members of the infrastructure team?

**Escalation Policies:**

- Show me the escalation policy for the web service.
- List all escalation policies.

**Incident Analysis:**

- Show me incidents related to PD12345.
- What were the past incidents similar to this one?
- List all incidents created in the last week with their resolution times.

## Limitations

- Requires a PagerDuty API token with appropriate permissions for the operations you want to perform.
- Write operations (creating incidents, adding notes, etc.) require the corresponding permissions on your API token.

## Additional References

- [PagerDuty MCP Server Integration Guide](https://support.pagerduty.com/main/docs/pagerduty-mcp-server-integration-guide)
- [PagerDuty MCP API Documentation](https://developer.pagerduty.com/api-reference/d71edf8527b5e-pager-duty-mcp-api)
- [PagerDuty API Access Keys](https://support.pagerduty.com/docs/api-access-keys)

- [Integration Capabilities](/docs/aiden/1.0/integrations/pagerduty#integration-capabilities)
- [Enable PagerDuty Integration](/docs/aiden/1.0/integrations/pagerduty#enable-pagerduty-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/pagerduty#prerequisites)
  - [Generate PagerDuty API Token](/docs/aiden/1.0/integrations/pagerduty#generate-pagerduty-api-token)
  - [Steps to Enable PagerDuty Integration](/docs/aiden/1.0/integrations/pagerduty#steps-to-enable-pagerduty-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/pagerduty#sample-prompts)
