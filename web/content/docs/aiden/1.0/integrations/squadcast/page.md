---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/squadcast"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/squadcast"
status: "ok"
---

Connect Aiden with your SquadCast account to get intelligent assistance with incident management and on-call operations. Once enabled, Aiden becomes your incident response assistant, helping you triage incidents, manage on-call rotations, and keep the right people informed through natural conversations.

SquadCast is an incident management and on-call platform that helps teams detect, respond to, and resolve operational issues. By integrating SquadCast with Aiden, you can act on incidents and look up on-call information conversationally, reducing the overhead of switching between tools during a live incident.

Beta

The SquadCast integration is currently in beta.

## Integration Capabilities

With SquadCast integration, Aiden can:

- List incidents and view incident details and timeline.
- Acknowledge, resolve, and reassign incidents.
- List teams and users in your organization.
- See who is currently on call for a team.
- View on-call schedules and rotations.

## Enable SquadCast Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active SquadCast account with appropriate permissions.
- You know which region (US or EU) hosts your SquadCast account.
- You can generate a refresh token from your SquadCast user profile.

### Generate SquadCast Refresh Token

To integrate with Aiden, you will need a refresh token from your SquadCast account:

1. Log in to your SquadCast account.
2. Navigate to **My Profile** and open the **API Tokens** section.
3. Create a new **User Token**.
4. Copy the generated refresh token.

Important

Store your refresh token securely. Treat it like a password and rotate it if you suspect it has been exposed.

### Steps to Enable SquadCast Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the SquadCast Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `SquadCast, Prod`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **API Refresh Token**: The user token you generated from your SquadCast profile.
   - **Region**: Select the region that matches your SquadCast account ( **US** or **EU**).
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the SquadCast integration:

**Incident Management:**

- Show me all triggered incidents in SquadCast.
- Get the details of incident `<incident-id>`.
- Show the timeline for incident `<incident-id>`.
- Acknowledge incident `<incident-id>`.
- Resolve incident `<incident-id>`.
- Reassign incident `<incident-id>` to the platform team.

**On-Call and Schedules:**

- Who is currently on call for the platform team?
- Show me the on-call schedule for the database team.
- List the on-call rotations for our team.

**Teams and Users:**

- List all teams in our SquadCast account.
- List the users in our organization.

## Limitations

- Requires a SquadCast API refresh token whose user role has sufficient permissions for the desired actions.
- On-call and schedule lookups are scoped to a team.

## Additional References

- [SquadCast API Documentation](https://apidocs.squadcast.com/)
- [SquadCast Developer Portal](https://developers.squadcast.com/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/squadcast#integration-capabilities)
- [Enable SquadCast Integration](/docs/aiden/1.0/integrations/squadcast#enable-squadcast-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/squadcast#prerequisites)
  - [Generate SquadCast Refresh Token](/docs/aiden/1.0/integrations/squadcast#generate-squadcast-refresh-token)
  - [Steps to Enable SquadCast Integration](/docs/aiden/1.0/integrations/squadcast#steps-to-enable-squadcast-integration)
