---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/jsm"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/jsm"
status: "ok"
---

Connect Aiden with your Jira Service Management (JSM) instance to work with service desks, Assets (CMDB), SLAs, Knowledge Base, and Opsgenie alerts and on-call schedules. Once enabled, Aiden can search assets, check SLAs, query the Knowledge Base, and surface on-call information in natural language.

## Integration Capabilities

With JSM integration, Aiden can:

- **List service desks** and their IDs for Knowledge Base and SLA operations.
- **Search the Knowledge Base** across service desks to find articles and documentation.
- **Check SLA status** for JSM issues (breached, time remaining).
- **List Assets workspaces** and object types for CMDB-style queries.
- **Search Assets** using AQL (Asset Query Language) to find configuration items by type, name, or attributes.
- **Get object details** for specific assets in an Assets workspace.
- **List Opsgenie alerts** (when an Opsgenie API key is configured).
- **Show on-call schedules** and current on-call users for JSM Ops (consolidated Jira/Opsgenie accounts).

## Custom Skills

On top of the built-in capabilities, you can create custom skills for JSM. For example:

- Automate incident triage using alerts and on-call context.
- Enforce SLA monitoring and escalation workflows.
- Build self-service asset lookup or CMDB reporting.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable JSM Integration

### Create Your Atlassian API Token

1. Log in to your [Atlassian account](https://id.atlassian.com/) and go to your JSM site (e.g. `https://your-domain.atlassian.net`).
2. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens) → **Security** → **Create and manage API tokens**.
3. Click **Create API token**, give it a label (e.g., "Aiden JSM"), and copy the token. Store it securely; it will not be shown again.

### Create Your Opsgenie API Key (Optional) [](/docs/aiden/1.0/integrations/jsm#create-your-opsgenie-api-key-optional%20%22Direct%20link%20to%20Create%20Your%20Opsgenie%20API%20Key%20(Optional)")

If you want Aiden to list Opsgenie alerts:

1. Log in to [Opsgenie](https://app.opsgenie.com/) and go to **Settings** → **Integrations** → **API**.
2. Create an API key with the required permissions (e.g, Read Alerts).
3. Copy the key and store it securely.

### Steps to Enable JSM Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the Jira Service Management (JSM) integration card.
3. Enter the integration configuration parameters:
   - **Site URL / Domain**: Your Atlassian site domain (e.g., `your-company` for `https://your-company.atlassian.net`).
     - Use only the subdomain part, without `.atlassian.net`.
   - **Email**: Your Atlassian account email address.

   - **API Token**: The Atlassian API token created in the steps above.

   - **Opsgenie API Key** (optional): Your Opsgenie GenieKey for listing alerts. Leave blank if you only need JSM Assets, Service Desk, SLA, and on-call features.



     Security Best Practices





     - Create a dedicated API token for Aiden with the minimum required permissions.
     - Use read-only access where possible.
     - Rotate API tokens regularly (e.g., every 60–90 days).
     - Monitor JSM and Opsgenie audit logs for Aiden's activity.
     - Do not share tokens or expose them in code or logs.

   - **Create prebuilt skills**: Aiden supports pre-built skills for JSM (e.g., Who is on call, Alert triage, SLA status, Knowledge Base search, Asset lookup). Enable **Create prebuilt skills** if you want these skills available.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- Who is on call right now?
- List open Opsgenie alerts.
- What's the SLA status for SUP-123?
- Search the Knowledge Base for "password reset" in the IT service desk.
- List all service desks and Assets workspaces.
- Find laptops in the Assets workspace with the name containing "dev".
- Search Assets for servers in the production environment.
- Get details for asset ID 12345 in the CMDB workspace.
- Show me on-call schedules for the DevOps team.
- Are there any breached SLAs for the Help Desk project?

## Additional References

- [Jira Service Management REST API](https://developer.atlassian.com/cloud/jira/service-desk/rest/)
- [JSM Assets (CMDB) API](https://developer.atlassian.com/cloud/jira/service-desk/asset/)
- [Opsgenie API](https://docs.opsgenie.com/docs/api-overview)
- [Manage Atlassian API tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/jsm#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/jsm#custom-skills)
- [Enable JSM Integration](/docs/aiden/1.0/integrations/jsm#enable-jsm-integration)
  - [Create Your Atlassian API Token](/docs/aiden/1.0/integrations/jsm#create-your-atlassian-api-token)
  - [Create Your Opsgenie API Key (Optional)](/docs/aiden/1.0/integrations/jsm#create-your-opsgenie-api-key-optional)
  - [Steps to Enable JSM Integration](/docs/aiden/1.0/integrations/jsm#steps-to-enable-jsm-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/jsm#sample-prompts)
