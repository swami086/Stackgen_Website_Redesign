---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/confluence"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/confluence"
status: "ok"
---

Connect Aiden with your Confluence instance to get help with documentation, spaces, and pages. Once enabled, Aiden can search content, manage spaces and pages, and work with your Confluence knowledge base in natural language.

## Integration Capabilities

With Confluence integration, Aiden can:

- **List spaces** and discover space keys for your Confluence instance.
- **Search content** using Confluence Query Language (CQL) to find pages, blog posts, and attachments.
- **Fetch pages** by space, title, or ID with full content and metadata.
- **Create and update pages** with custom content, structure, and layout.
- **Manage labels** on pages and other content.
- **Add and manage comments** on pages.
- **Navigate documentation** across spaces and include relevant Confluence links in responses.

## Custom Skills

On top of the built-in capabilities, you can create custom skills for Confluence, for example:

- Enforce documentation standards across spaces.
- Create self-service workflows for onboarding or runbooks.
- Automate page creation or updates from templates.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable Confluence Integration

### Create Your Confluence API Token

1. Log in to your [Atlassian account](https://id.atlassian.com/) and go to your Confluence site (e.g. `https://your-domain.atlassian.net/wiki`).
2. Navigate to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens) \> **Security** \> **Create and manage API tokens**.
3. Click **Create API token**, give it a label (e.g., "Aiden"), and copy the token. Store it securely; it will not be shown again.

### Steps to Enable Confluence Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the Confluence integration card.
3. Enter the following integration configuration:
   - **Domain**: Your Atlassian domain (e.g., `your-company` for `https://your-company.atlassian.net`).
     - Use only the subdomain part, without `.atlassian.net`.
   - **Username**: Your Atlassian account email address.

   - **Confluence API Token**: The API token created in the steps above.


     - Make sure that the token has the Confluence permissions required for the operations you want Aiden to perform (read, write, etc.).

Security Best Practices

     - Create a dedicated API token for Aiden with the minimum required permissions.
     - Use read-only access if you only need Aiden to search and view content.
     - Rotate API tokens regularly (e.g., every 60–90 days).
     - Monitor Confluence audit logs for Aiden's activity.
     - Do not share tokens or expose them in code or logs.

   - **Create prebuilt skills**: Aiden supports pre-built skills for Confluence. Enable **Create prebuilt skills** if you want these skills available.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- List all Confluence spaces.
- Search for pages about "deployment" in the last 30 days.
- List out the documentation for the API service.
- Create a new page in the Engineering space with the given outline.
- Add a comment to the incident post-mortem page.
- Find pages with the label "runbook" in the DevOps space.
- What's in the onboarding documentation space?
- Update the changelog page with the latest release notes.
- Search for pages mentioning "Kubernetes" across all spaces.

## Additional References

- [Confluence REST API](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/)
- [Confluence Query Language (CQL)](https://developer.atlassian.com/server/confluence/advanced-searching-using-cql/)
- [Manage API tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/confluence#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/confluence#custom-skills)
- [Enable Confluence Integration](/docs/aiden/1.0/integrations/confluence#enable-confluence-integration)
  - [Create Your Confluence API Token](/docs/aiden/1.0/integrations/confluence#create-your-confluence-api-token)
  - [Steps to Enable Confluence Integration](/docs/aiden/1.0/integrations/confluence#steps-to-enable-confluence-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/confluence#sample-prompts)
