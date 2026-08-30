---
title: "Integrations Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/github"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/github"
status: "ok"
---

Connect Aiden with your GitHub repositories to get intelligent assistance with code management, infrastructure as code, and CI/CD workflows. Once enabled, Aiden becomes your DevOps coding partner, helping you manage configurations, troubleshoot workflows, and implement best practices through natural conversations.

## Integrations Capabilities

With GitHub integration, Aiden can:

- Explore repository files and codebases.
- Build a knowledge base about your infrastructure configurations.
- Create pull requests with suggested improvements for infra and config changes.
- Review infrastructure code and configuration changes.
- Debug GitHub Actions workflow issues.
- Generate new configuration files based on existing patterns.
- Analyze deployment history and failures.
- Recommend security and best practice enhancements.

## Enable GitHub Integration

Follow these steps to enable the Integration:

1. Generate a [GitHub Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).



Security best practices





   - Create a token with minimum required permissions.
   - Limit repository access to only what's necessary.
   - Regularly rotate the PAT.
   - Enable branch protection on critical repositories.
   - Consider using required reviews for Aiden-generated PRs.

2. From the Aiden home page, click **Integrations** from the navigation panel to the left.

3. Hover and click the **Activate** button on the GitHub Integration card.

4. Enter the **GitHub Personal Access Token**.



![github token](https://docs.stackgen.com/assets/images/github-43a96500511c4241dbc64726f9d9de3b.png)

5. Click **Save** to enable the integration.


## Sample Prompts

Here are a few sample prompts that you can use:

- Review the Terraform changes in PR#245 in repo acme/iac.
- Can you improve the security of the cart-service Doeckerfile?
- What's causing the CI pipeline failure in the auth-service repo?
- Generate a GitHub Actions workflow for Node.js testing similar to that of the auth-service.
- Create a PR to optimize our Kubernetes resource configs.
- Help me understand the structure of our Ansible playbooks.
