---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/firehydrant"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/firehydrant"
status: "ok"
---

Connect Aiden with your FireHydrant account to get intelligent assistance with incident management, runbooks, retrospectives, and on-call workflows. Once enabled, Aiden becomes your incident operations expert—helping you triage and manage incidents, walk through runbooks, review post-mortem reports, and analyze incident metrics through natural conversations.

FireHydrant is a reliability platform built for engineering teams to standardize their incident response. By integrating FireHydrant with Aiden, you can interact with your incident data conversationally, surface the right information at the right time, and reduce the overhead of navigating the FireHydrant UI during a live incident.

## Integration Capabilities

With FireHydrant integration, Aiden can:

- List, create, and update incidents with full details including severity, priority, impacts, and milestones.
- Post stakeholder status updates to keep teams informed during an active incident.
- Retrieve event timelines for individual incidents.
- List and retrieve runbooks to guide incident response.
- List post-mortem reports and retrieve retrospectives attached to specific incidents.
- List teams, services, environments, and functionalities from the service catalog.
- List and manage on-call escalation policies (team-scoped) and Signals call routes.
- List and manage incident roles and organization roles with permissions.
- Retrieve incident metrics including MTTR, MTTD, and milestone funnel data.
- List alerts, webhooks, status pages, status update templates, and change catalog entries.
- List and inspect third-party integrations configured in your FireHydrant account.

## Enable FireHydrant Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active FireHydrant account with appropriate permissions.
- You have access to create a bot token from your FireHydrant organization settings.

### Generate FireHydrant API Token

To integrate with Aiden, you'll need a bot token from your FireHydrant organization:

1. Log in to your FireHydrant account.
2. Navigate to **Organization Settings** → **Bot Users**.
3. Click **Create Bot User** and give it a descriptive name (e.g., "Aiden Integration").
4. Once created, copy the generated bot token (it begins with `fhb-`).

Important

Store your bot token securely. FireHydrant bot tokens are shown only once at creation time. If you lose it, you'll need to generate a new one.

### Steps to Enable FireHydrant Integration

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the FireHydrant Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `FireHydrant, Prod`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **API Token**: The bot token you generated from your FireHydrant organization settings.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some sample prompts you can use with the FireHydrant integration:

**Incident Management:**

- Show me all open incidents in FireHydrant.
- Get the details of incident `<incident-id>`.
- Create a new SEV2 incident titled "Payment service degraded".
- Update the severity of incident `<incident-id>` to SEV1.
- Post a stakeholder update on incident `<incident-id>` saying "We have identified the root cause and are working on a fix."
- Show the event timeline for incident `<incident-id>`.

**Runbooks & Retrospectives:**

- List all runbooks in FireHydrant.
- Show me the runbook for database outages.
- List all post-mortem reports.
- Get the retrospective for incident `<incident-id>`.

**On-Call & Escalation:**

- Show all escalation policies across our teams.
- List all Signals call routes.
- Show call routes for the platform team.

**Teams & Services:**

- List all teams in FireHydrant.
- Show all services in the service catalog.
- List all environments configured in FireHydrant.

**Metrics & Reporting:**

- Show incident metrics (MTTR, MTTD) for the last 30 days.
- Get milestone funnel metrics for incidents this month.

**Roles & Permissions:**

- List all incident roles.
- Show me the permissions for my current user.
- List all organization roles.

## Limitations

- Escalation policies in FireHydrant are **team-scoped**. Aiden fetches policies by listing teams first and then querying each team's policies. If no teams are configured in your account, no escalation policies will be returned.
- Write operations (creating incidents, posting updates, managing roles) require the bot token to have the corresponding permissions in FireHydrant.
- The `Analytics` and `Audit Events` entitlements may be restricted depending on your FireHydrant plan.

## Additional References

- [FireHydrant API Documentation](https://developers.firehydrant.io/docs/api)
- [FireHydrant Bot Users](https://app.firehydrant.io/organizations/bots)
- [FireHydrant Signals & Escalation Policies](https://docs.firehydrant.com/docs/signals-escalation-policies)
- [FireHydrant Runbooks](https://docs.firehydrant.com/docs/runbooks)

- [Integration Capabilities](/docs/aiden/1.0/integrations/firehydrant#integration-capabilities)
- [Enable FireHydrant Integration](/docs/aiden/1.0/integrations/firehydrant#enable-firehydrant-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/firehydrant#prerequisites)
  - [Generate FireHydrant API Token](/docs/aiden/1.0/integrations/firehydrant#generate-firehydrant-api-token)
  - [Steps to Enable FireHydrant Integration](/docs/aiden/1.0/integrations/firehydrant#steps-to-enable-firehydrant-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/firehydrant#sample-prompts)
