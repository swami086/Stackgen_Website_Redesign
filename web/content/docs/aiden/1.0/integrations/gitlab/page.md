---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/gitlab"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/gitlab"
status: "ok"
---

Connect Aiden with your GitLab repositories to get intelligent assistance with code management, infrastructure as code, and CI/CD workflows. Once enabled, Aiden becomes your DevOps coding partner, helping you manage configurations, troubleshoot pipelines, and implement best practices through natural conversations.

GitLab is a DevOps platform that combines source control, CI/CD, and project management. By integrating GitLab with Aiden, you can build a knowledge base from your repositories and act on your code and pipelines conversationally.

## Integration Capabilities

With GitLab integration, Aiden can:

- Automatically build a knowledge base from your repositories.
- Review and optimize Infrastructure as Code.
- Generate and update IaC configurations.
- Create developer self-service workflows.
- Provide security recommendations for Dockerfiles and Kubernetes manifests.
- Set up and configure CI/CD pipelines.
- Debug CI/CD pipeline issues.
- Create merge requests with suggested improvements.
- Manage repository configurations.
- Analyze code dependencies and configurations.

## Enable GitLab Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active GitLab account with appropriate permissions.
- You can create a Personal Access Token or Project Access Token with the `api` scope.
- For self-managed GitLab, you know the base URL of your instance.

### Generate GitLab Token

To integrate with Aiden, you will need a GitLab access token:

1. Log in to your GitLab account.
2. Create a **Personal Access Token** (under your user **Preferences** \> **Access tokens**) or a **Project Access Token** (under a project's **Settings** \> **Access tokens**).
3. Grant the token the `api` scope.
4. Copy the generated token.

Security best practices

- Create a token with the minimum required permissions and scope.
- Limit project access to only what is necessary.
- Rotate the token regularly.
- Consider using required reviews for Aiden-generated merge requests.

### Steps to Enable GitLab Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the GitLab Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `GitLab, Platform`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **GitLab Token**: The Personal or Project Access Token you generated (with `api` scope).
   - **GitLab URL** (optional): The base URL of your self-managed GitLab instance (for example, `https://gitlab.example.com`). Leave blank for GitLab SaaS.
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the GitLab integration:

- Review the Terraform changes in merge request !245 in the `acme/iac` project.
- Improve the security of the `cart-service` Dockerfile.
- What is causing the pipeline failure in the `auth-service` project?
- Generate a `.gitlab-ci.yml` for Node.js testing similar to the `auth-service`.
- Create a merge request to optimize our Kubernetes resource configs.
- Help me understand the structure of our Ansible playbooks.

## Additional References

- [GitLab Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [GitLab Project Access Tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html)

- [Integration Capabilities](/docs/aiden/1.0/integrations/gitlab#integration-capabilities)
- [Enable GitLab Integration](/docs/aiden/1.0/integrations/gitlab#enable-gitlab-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/gitlab#prerequisites)
  - [Generate GitLab Token](/docs/aiden/1.0/integrations/gitlab#generate-gitlab-token)
  - [Steps to Enable GitLab Integration](/docs/aiden/1.0/integrations/gitlab#steps-to-enable-gitlab-integration)
