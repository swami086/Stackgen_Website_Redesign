---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/integrations/jira"
sourceUrl: "https://docs.stackgen.com/aiden/integrations/jira"
status: "ok"
---

This unversioned path redirects to the Aiden 1.0 documentation. See the [Aiden 1.0 Jira integration](/docs/aiden/1.0/integrations/jira) page.

Connect Aiden with your Jira instance to get help with issues, projects, boards, and sprints. Once enabled, Aiden can search, create, and manage Jira work using natural language.

## Integration Capabilities

With Jira integration, Aiden can:

- **Search issues** using JQL (Jira Query Language) to find tickets by status, assignee, project, labels, and more.
- **Get issue details** including description, status, assignee, comments, and custom fields.
- **List and manage projects** and their configuration.
- **Work with boards and sprints**, including agile boards, sprint issues, and backlog.
- **Create and update issues** such as tasks, bugs, and stories.
- **Transition issues** through workflow states (e.g. To Do → In Progress → Done).
- **Manage links** between issues (blocks, relates to, duplicates, etc.).
- **Add comments and worklogs** to issues.
- **Include Jira links** in responses for quick navigation.

## Custom Skills

On top of the built-in capabilities, you can create custom skills for Jira, for example:

- Enforce sprint hygiene and backlog grooming workflows.
- Create self-service workflows for common issue types.
- Automate status updates or reporting across projects.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Jira Integration

### Create Your Jira API Token

1. Log in to your [Atlassian account](https://id.atlassian.com/) and go to your Jira site (e.g. `https://your-domain.atlassian.net`).
2. Navigate to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens) \> **Security** \> **Create and manage API tokens**.
3. Click **Create API token**, give it a label (e.g., "Aiden"), and copy the token. Store it securely; it will not be shown again.

### Steps to Enable Jira Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the Jira integration card.
3. Enter the integration configuration parameters:
   - **Domain**: Your Atlassian domain (e.g., `your-company` for `https://your-company.atlassian.net`).
     - Use only the subdomain part, without `.atlassian.net`.
   - **Username**: Your Atlassian account email address.
   - **Jira API Token**: The API token created in the steps above.
     - Make sure that the token has the Jira permissions needed for the operations you want Aiden to perform (read, write, etc.).



       Security Best Practices





       - Create a dedicated API token for Aiden with the minimum required permissions.
       - Use read-only access if you only need Aiden to search and view issues.
       - Rotate API tokens regularly (e.g., every 60–90 days).
       - Monitor Jira audit logs for Aiden's activity.
       - Do not share tokens or expose them in code or logs.
   - **Create prebuilt skills**: Aiden supports pre-built skills for Jira. Enable **Create prebuilt skills** if you want these skills available.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- List all the open issues assigned to me.
- What's the status of PROJ-123?
- List issues in the current sprint for the Backend team.
- Search for high-priority bugs in the API project.
- Create a new task in the Engineering project.
- Move PROJ-456 to In Progress.
- What issues are blocking the release?
- List the sprint burndown for the active sprint.
- Add a comment to PROJ-789 with the deployment status.
- List all projects I have access to.
- Find issues that haven't been updated in 7 days.
- Create a bug and link it to the parent story.

## Additional References

- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- [Jira Query Language (JQL)](https://www.atlassian.com/software/jira/delivery-tools/jql)
- [Manage API tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/jira#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/jira#custom-skills)
- [Enable Jira Integration](/docs/aiden/1.0/integrations/jira#enable-jira-integration)
  - [Create Your Jira API Token](/docs/aiden/1.0/integrations/jira#create-your-jira-api-token)
  - [Steps to Enable Jira Integration](/docs/aiden/1.0/integrations/jira#steps-to-enable-jira-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/jira#sample-prompts)
