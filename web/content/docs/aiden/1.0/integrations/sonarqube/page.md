---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/sonarqube"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/sonarqube"
status: "ok"
---

The SonarQube integration connects Aiden to your SonarQube Server or SonarQube Cloud organisation, giving your team a natural-language interface for code quality and security insights. Combined with other Aiden integrations such as GitHub, GitLab, or Jira, Aiden can correlate static analysis findings with pull requests, open issues for security vulnerabilities, and surface quality gate failures directly in incident workflows.

## Integration Capabilities

With the SonarQube integration, Aiden can:

- List all SonarQube projects and show their last analysis date and quality gate status
- Retrieve key code quality metrics: lines of code, coverage, complexity, duplications, and ratings
- Check quality gate pass/fail status with detailed condition breakdowns for projects and pull requests
- Search and filter code issues (bugs, vulnerabilities, code smells) by severity, type, status, or rule
- Investigate security hotspots — list, detail, and change their review status
- Look up SonarQube rule details to understand why an issue was flagged and how to fix it
- Retrieve raw source code for files flagged with issues
- List pull requests analysed by SonarQube and their quality gate results
- Detect duplicated code blocks across a project
- Monitor SonarQube Server health and system status (Server only)

## Create Custom Skills

You can combine SonarQube with other Aiden integrations to build powerful cross-tool workflows. For example, automatically open a Jira ticket for every BLOCKER vulnerability, or comment on a GitHub pull request with the quality gate summary. Here are a few skill ideas to get started:

- **Daily code quality digest** — fetch metrics for all projects and post a summary to Slack
- **PR quality gate guardian** — check SonarQube gate status before a PR is merged and surface failures
- **Vulnerability triage assistant** — find all CRITICAL vulnerabilities, look up each rule, and draft remediation notes
- **Technical debt sprint planner** — list top code smells by effort and create Jira tasks for each
- **Security hotspot review workflow** — list TO\_REVIEW hotspots, fetch rule details, and mark them as SAFE or ACKNOWLEDGED

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable SonarQube Integration

### Generate a User Token

SonarQube uses **User Tokens** for API authentication. Follow these steps to generate one:

1. Log in to your SonarQube instance (e.g. `https://sonarcloud.io` or your self-hosted URL).
2. Click your avatar in the top-right corner and select **My Account**.
3. Navigate to the **Security** tab.
4. Under **Generate Tokens**, enter a descriptive name (e.g. `aiden`) and click **Generate**.
5. Copy the token immediately — it will not be shown again.

For SonarQube Cloud, you can also follow the [official token documentation](https://docs.sonarsource.com/sonarqube-cloud/managing-your-account/managing-tokens/).

Security best practices

- Use a dedicated User Token for Aiden — do not share tokens between services
- Grant the token only the Browse permissions required for the projects Aiden needs to access
- Rotate the token periodically and revoke it if it is no longer needed

### Steps to Enable SonarQube Integration

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Find **SonarQube** in the integrations list and click **Configure**.
3. Click **Add Configuration**.
4. Enter the integration configuration parameters:
   - **Configuration Name**: A unique name for this integration instance (e.g. `Production SonarQube`)
   - **Configuration Description** _(optional)_: A brief description to help identify this configuration
   - **SonarQube URL**: The base URL of your SonarQube instance (e.g. `https://sonarcloud.io` for SonarQube Cloud, or `https://sonar.yourcompany.com` for self-hosted). Do not include a trailing slash.
   - **User Token**: The personal access token generated in the previous step
5. Click **Test Connection** to verify the connection.
6. Click **Save** to enable the integration.

## Sample Prompts

Here are a few sample prompts that you can use:

- "List all my SonarQube projects and their quality gate status"
- "What are the BLOCKER bugs in the my-service project?"
- "Show me the quality gate results for the latest pull request on the payments-api project"
- "How many open vulnerabilities does the checkout-service have? What are the most critical ones?"
- "Get the code coverage and duplication metrics for the auth-service project"
- "Show me all security hotspots that are TO\_REVIEW in the backend project"
- "What does the rule java:S2068 say and how do I fix it?"
- "Is my SonarQube Server healthy?"
- "Which files in the api-gateway project have the most code duplications?"
- "Find all FALSE-POSITIVE issues in the frontend project and list them"

## Limitations

- System health (`get_sonarqube_system_health`) and system status (`get_sonarqube_system_status`) tools are available for **SonarQube Server only** — they are not supported on SonarQube Cloud
- Advanced Security dependency risk analysis requires SonarQube Server **Enterprise edition** with Advanced Security enabled
- The integration uses the SonarQube REST API v1/v2; some newer v2-only endpoints may not be available on older SonarQube Server versions (pre-2025.1)
- Aiden cannot trigger new analyses — it can only read results from analyses already performed by your CI/CD pipeline

## Additional References

- [SonarQube REST API documentation](https://docs.sonarsource.com/sonarqube/latest/extension-guide/web-api/)
- [SonarQube Cloud documentation](https://docs.sonarsource.com/sonarqube-cloud/)
- [SonarQube Server documentation](https://docs.sonarsource.com/sonarqube-server/latest/)
- [Managing SonarQube User Tokens](https://docs.sonarsource.com/sonarqube-cloud/managing-your-account/managing-tokens/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/sonarqube#integration-capabilities)
- [Create Custom Skills](/docs/aiden/1.0/integrations/sonarqube#create-custom-skills)
- [Enable SonarQube Integration](/docs/aiden/1.0/integrations/sonarqube#enable-sonarqube-integration)
  - [Generate a User Token](/docs/aiden/1.0/integrations/sonarqube#generate-a-user-token)
  - [Steps to Enable SonarQube Integration](/docs/aiden/1.0/integrations/sonarqube#steps-to-enable-sonarqube-integration)
