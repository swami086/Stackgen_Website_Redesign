---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/stackgen"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/stackgen"
status: "ok"
---

StackGen provides comprehensive Infrastructure as Code (IaC) management and automation through appStacks, collection of cloud resources representing user applications. This integration offers full CRUD operations on appStacks, TFVar conversion for dynamic value injection, environment profile creation (dev/staging/prod), policy compliance checking, and automated push-to-git workflows with dynamic GitHub configuration.

## Integration Capabilities

With StackGen integration, Aiden can:

- Perform appStacks CRUD operations:
  - Create, read, update, and delete appStacks.
  - Clone appStacks across environments.
  - Diff and plan before apply.
  - Rollback to previous versions.
  - TFVar Conversion and Dynamic Injection.
- Convert input parameters to TFVars:
  - Inject secrets and dynamic values from environment profiles or vaults.
  - Validate variable schemas and types.
  - Render environment-specific overrides.
  - Environment Profiles (dev/staging/prod).
- Create and manage environment profiles:
  - Define per-environment variables, tags, regions, and scaling policies.
  - Promote configurations from **dev > staging > prod** with change controls.
  - Policy Compliance Checks.
- Run pre-commit and pre-apply policy checks:
  - Enforce guardrails (e.g., tagging, encryption at rest, public exposure).
  - Generate actionable remediation guidance and block non-compliant applies.
- Automated Push-to-Git:
  - Generate IaC changes and open PRs automatically.
  - Dynamic GitHub configuration (org/repo/branch, PR templates, reviewers).
  - Commit signing, conventional commit messages, and labels.
  - Sync state with PR status and required checks.
- Plans, Applies, and Observability:
  - Terraform init/plan/apply/destroy with stored state.
  - View plan summaries and resource deltas.
  - Maintain run history, logs, and artifacts per appStack and environment.
- Access Control and Audit:
  - Role-based permissions for create/apply/destroy and policy overrides.
  - Full audit trail on who changed what, when, and why?

## Custom Skills

On top of the several out-of-the-box capabilities, you can create custom skills to add additional functionality:

- Automated infrastructure health checks based on generated IaC.
- Custom compliance policy enforcement for specific organizational requirements.
- Multi-cloud deployment strategies with consistent configurations.
- Legacy application modernization workflows.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable StackGen Integration

### Generate your StackGen Personal Access Token

Follow the steps mentioned in the [PAT documentation](https://docs.stackgen.com/setup/pat).

### Steps to Enable StackGen Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the StackGen Integration card.

3. Enter the integration configuration parameters:



![stackgen](https://docs.stackgen.com/assets/images/stackgen-472712759b11ec3040056856b42736db.png)










   - **StackGen URL**: Your StackGen instance URL (for example:`https://your-org.stackgen.com`).
   - **Personal Access Token**: Paste the token you generated in the [step above](/docs/aiden/1.0/integrations/stackgen#generate-your-stackgen-personal-access-token).
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me all my appStacks and their current status.
- Convert the networking appStack to TFVars for the production environment.
- Create a new environment profile called `staging` for my web-app appStack.
- Check policy violations in my infrastructure appStack before deployment.
- Initialize push to git for my database appStack to the main branch.
- What are the outstanding actions required for my microservices appStack?

- [Integration Capabilities](/docs/aiden/1.0/integrations/stackgen#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/stackgen#custom-skills)
- [Enable StackGen Integration](/docs/aiden/1.0/integrations/stackgen#enable-stackgen-integration)
  - [Generate your StackGen Personal Access Token](/docs/aiden/1.0/integrations/stackgen#generate-your-stackgen-personal-access-token)
  - [Steps to Enable StackGen Integration](/docs/aiden/1.0/integrations/stackgen#steps-to-enable-stackgen-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/stackgen#sample-prompts)
