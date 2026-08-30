---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/circleci"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/circleci"
status: "ok"
---

Connect Aiden with your CircleCI CI/CD platform to get intelligent assistance with pipeline management, build debugging, and delivery workflows. Once enabled, Aiden becomes your CircleCI expert, helping you investigate build failures, monitor pipeline health, identify flaky tests, trigger runs, and optimize resource usage through natural conversations.

By combining the CircleCI integration with other integrations like GitHub, Kubernetes, and cloud providers, Aiden can provide holistic DevOps support spanning your entire software delivery lifecycle, from code commits to deployed services.

## Integration Capabilities

With the CircleCI integration, Aiden can:

- **Monitor pipeline health** by retrieving the status of the latest pipelines for any project and branch, including workflow statuses and failing steps.
- **Debug failed builds** by fetching detailed failure logs from jobs and diagnosing the root cause with actionable remediation steps.
- **Identify flaky tests** by analyzing test execution history for intermittent failures across recent pipeline runs.
- **Fetch job test results** including pass/fail breakdowns, skipped tests, and the exact error messages of failing tests.
- **Rerun failed workflows** from the point of failure without re-running jobs that already passed.
- **Trigger new pipeline runs** for any project and branch, with optional pipeline parameters.
- **List followed projects** to discover all projects available in your CircleCI account.
- **Analyze compute resource usage** to identify overprovisioned jobs and estimate credit savings.

## Prebuilt Skills

When you enable the CircleCI integration, Aiden comes with prebuilt skills for common operations:

| Skill | Description |
| --- | --- |
| **Pipeline Health Overview** | Get the status of the latest pipelines for a project branch and summarize overall pipeline health. |
| **Debug Failed Build** | Retrieve detailed failure logs from a recent build and diagnose the root cause. |
| **Identify Flaky Tests** | Analyze test execution history to find tests that intermittently fail. |
| **Rerun Failed Workflow** | Rerun a failed workflow from the point of failure without re-running passing jobs. |
| **Get Job Test Results** | Fetch and summarize test results for a job, including pass/fail breakdown. |
| **Find Underused Compute Resources** | Identify overprovisioned jobs to reduce CI costs. |
| **Trigger Pipeline** | Trigger a new CircleCI pipeline run for a specific project and branch. |

## Create Custom Skills

On top of the built-in capabilities, you can create custom skills to extend Aiden's CircleCI support, for example:

- Set up automated pipeline health checks across all followed projects.
- Build a self-service workflow to approve and trigger deployments to production.
- Automate post-failure triage: retrieve logs, identify root cause, and create a GitHub issue.
- Generate weekly CI performance reports summarizing build times and failure rates.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable CircleCI Integration

### Generate a CircleCI Personal API Token

Aiden authenticates with CircleCI using a Personal API Token associated with your user account.

1. Log in to your [CircleCI account](https://app.circleci.com/).
2. Click your avatar in the bottom-left corner and go to **User Settings**.
3. Select **Personal API Tokens** from the left menu.
4. Click **Create New Token**, give it a descriptive name (e.g., `Aiden`), and click **Add API Token**.
5. Copy the token. It will only be shown once.

For full instructions, see the [CircleCI API Token documentation](https://circleci.com/docs/managing-api-tokens/).

### Steps to Enable CircleCI Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the CircleCI integration card.
3. Enter the integration configuration parameters:
   - **CircleCI API Token**: The personal API token used to authenticate with CircleCI.
     - Generate it under **User Settings** → **Personal API Tokens**.
     - The token is associated with your user account and inherits your access level across projects and organizations.
   - **CircleCI Base URL** _(optional)_: The base URL for your CircleCI instance. Only required for **CircleCI Server** (self-hosted) deployments.


     - Leave blank if you are using **CircleCI Cloud** (`https://circleci.com`).
     - For on-premises installations, enter your server URL (e.g., `https://circleci.example.com`).

Security Best Practices

     - Create a dedicated API token for Aiden and label it clearly so you can revoke it independently.
     - Use an account with only the project access Aiden needs — avoid organization admin tokens unless required.
     - Rotate tokens periodically (e.g., every 60–90 days).
     - Revoke the token immediately from **User Settings** → **Personal API Tokens** if it is ever exposed.

   - **Create prebuilt skills**: Enable this to automatically load CircleCI prebuilt skills into your workspace when the integration is saved.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- Get the status of the latest pipeline for the `main` branch of `my-service`.
- Why did the latest build fail on the `feature/auth` branch?
- Are there any flaky tests in the `api` project?
- Rerun the failed workflow from the last pipeline run on `main`.
- Show me the test results for the last job in `payment-service`.
- Trigger a new pipeline for `my-service` on the `staging` branch.
- Which jobs are using the most compute resources in my followed projects?
- List all the projects I follow on CircleCI.

## Limitations

- Aiden's CircleCI integration operates within the permissions of the API token provided. It can only access projects and organizations that the token owner has access to.
- Write operations (such as triggering pipelines or rerunning workflows) require confirmation before Aiden proceeds.
- CircleCI Server (self-hosted) deployments must supply the `CircleCI Base URL` parameter.

## Additional References

- [CircleCI Personal API Tokens](https://circleci.com/docs/managing-api-tokens/)
- [CircleCI API v2 Documentation](https://circleci.com/docs/api/v2/)
- [CircleCI MCP Server (GitHub)](https://github.com/CircleCI-Public/mcp-server-circleci)
- [Pipelines Overview](https://circleci.com/docs/pipelines/)
- [Rerunning Workflows](https://circleci.com/docs/rerun-failed-tests/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/circleci#integration-capabilities)
- [Prebuilt Skills](/docs/aiden/1.0/integrations/circleci#prebuilt-skills)
- [Create Custom Skills](/docs/aiden/1.0/integrations/circleci#create-custom-skills)
- [Enable CircleCI Integration](/docs/aiden/1.0/integrations/circleci#enable-circleci-integration)
  - [Generate a CircleCI Personal API Token](/docs/aiden/1.0/integrations/circleci#generate-a-circleci-personal-api-token)
  - [Steps to Enable CircleCI Integration](/docs/aiden/1.0/integrations/circleci#steps-to-enable-circleci-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/circleci#sample-prompts)
