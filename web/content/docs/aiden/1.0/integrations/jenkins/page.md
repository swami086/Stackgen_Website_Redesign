---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/jenkins"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/jenkins"
status: "ok"
---

Connect Aiden with your Jenkins server to get intelligent assistance with continuous integration and deployment. Once enabled, Aiden can help you understand builds, manage pipelines, and automate deployment workflows through natural conversations.

Jenkins is an automation server widely used to build, test, and deploy software. By integrating Jenkins with Aiden, you can inspect and operate your CI/CD workflows conversationally instead of navigating the Jenkins UI.

## Integration Capabilities

With Jenkins integration, Aiden can:

- Assist with build automation.
- Help with pipeline management.
- Support deployment automation.

## Enable Jenkins Integration

### Prerequisites

Before enabling the integration, ensure:

- You have a running Jenkins instance that Aiden can reach from its network.
- You have a Jenkins user with the permissions needed for the operations you want Aiden to perform.
- You can generate an API token for that user.

### Generate Jenkins API Token

To integrate with Aiden, you will need a Jenkins API token:

1. Log in to your Jenkins instance.
2. Click your username, then go to **Security** (or **Configure**).
3. Under **API Token**, click **Add new Token**, generate it, and copy the value.

Important

Store your API token securely. Jenkins shows the token only once at creation time. If you lose it, generate a new one.

### Steps to Enable Jenkins Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.
2. Hover and click the **Activate** button on the Jenkins Integration card.
3. Enter the integration configuration parameters:
   - **Configuration Name**: A descriptive name for this integration configuration (e.g., `Jenkins, CI`).
   - **Configuration Description** (optional): Additional details about this configuration.
   - **Jenkins URL**: The base URL of your Jenkins instance (for example, `https://jenkins.example.com`).
   - **Username**: The Jenkins user Aiden authenticates as.
   - **API Token**: The API token you generated for that user.
4. Click **Save** to enable the integration.

## Sample Prompts

Here are some sample prompts you can use with the Jenkins integration:

- List the latest builds for the `web-app` job.
- Why did the most recent `deploy-prod` build fail?
- Show me the status of the `nightly-tests` pipeline.
- Trigger a build for the `api-service` job.
- Summarize the recent build history for the `payments` pipeline.

## Additional References

- [Jenkins Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/)
- [Managing Jenkins API Tokens](https://www.jenkins.io/doc/book/security/managing-security/#api-token)

- [Integration Capabilities](/docs/aiden/1.0/integrations/jenkins#integration-capabilities)
- [Enable Jenkins Integration](/docs/aiden/1.0/integrations/jenkins#enable-jenkins-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/jenkins#prerequisites)
  - [Generate Jenkins API Token](/docs/aiden/1.0/integrations/jenkins#generate-jenkins-api-token)
  - [Steps to Enable Jenkins Integration](/docs/aiden/1.0/integrations/jenkins#steps-to-enable-jenkins-integration)
