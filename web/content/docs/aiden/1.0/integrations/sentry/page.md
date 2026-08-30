---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/sentry"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/sentry"
status: "ok"
---

Connect Aiden with your Sentry platform to bring application monitoring and error tracking into a unified conversational interface. Once enabled, Aiden can query Sentry issues, investigate stack traces, surface user impact metrics, review project and release health, and provide actionable debugging recommendations, all through natural language.

## Integration Capabilities

With Sentry integration, Aiden can help you:

- Monitor applications and track errors across projects. Get comprehensive visibility into issues and performance signals.
- Access and filter issues efficiently by status, level, and custom queries.
- Investigate issues in depth, view stack traces, user impact metrics, and event details.
- Manage projects at surface project-level settings and get configuration insights.
- Track releases and related error patterns by correlating releases with new or recurring issues.
- Get actionable debugging recommendations and get direct links to the Sentry dashboard for deeper investigation and remediation steps.

## Enable Sentry Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Sentry Integration card.

3. Enter the integration configuration parameters:



![Sentry](https://docs.stackgen.com/assets/images/sentry-05462d216c1b151aaf4980a2766bb4b3.png)










   - **Configuration Name**: Name for the Sentry integration setup.



     tip





     Use environment and purpose in the name, like `Sentry, Prod, Error Tracking`.

   - **Configuration Description**: An optional note describing the scope, usage, or owners of this configuration.
   - **Org Slug**: The unique identifier for your Sentry organization, used in API paths and URLs.

     - **Where to find it**: In the Sentry app URL after `/organizations/`.

       For example, `https://sentry.io/organizations/your-org-slug/`
     - Check out Sentry documentation on [What is my organization slug?](https://sentry.zendesk.com/hc/en-us/articles/26125841682075-What-is-my-organization-slug) and [Sentry URL and Org Slug Changes](https://sentry.zendesk.com/hc/en-us/articles/24872645861531-Sentry-URL-and-Org-Slug-Changes).
   - **Personal Token**: A Sentry API authentication token associated with your user account.


     - Typically needs read access to Issues, Events, Projects, and Releases. Use the least privileges necessary.
     - [How to Create a token in Sentry](https://docs.sentry.io/api/auth/)

Security Best Practices

     - Keep tokens secret.
     - Rotate tokens periodically.
     - Store your auth tokens in a secure secret manager, and revoke if exposed.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me all unresolved errors from the last 24 hours across all projects.
- Get detailed information about Sentry issue PROJ-123 including stack trace.
- List all projects in our Sentry organization with their current status.
- Show recent releases for the backend project and their associated issues.

## Limitations

- The StackGen-Aiden Sentry integration currently supports only read and list operations.

- [Integration Capabilities](/docs/aiden/1.0/integrations/sentry#integration-capabilities)
- [Enable Sentry Integration](/docs/aiden/1.0/integrations/sentry#enable-sentry-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/sentry#sample-prompts)
