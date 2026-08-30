---
title: "CLI Local Module Upload, HashiCorp Vault, LLM Gateways, and Aiden UX"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/july/v2026-7-9"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/july/v2026-7-9"
status: "ok"
---

## CLI Local Module Upload, HashiCorp Vault, LLM Gateways, and Aiden UX

The July 2026 weekly **v2026.7.9** release adds **CLI** upload of custom modules from a local directory (`--dir`), **HashiCorp Vault** as an external secret source, and early-access **OpenAI-compatible LLM gateways** in **Aiden**. It also unlocks more **Aiden** alert integrations on the platform UX ( **Datadog**, **New Relic**, **Squadcast**, and **Dynatrace**), and improves **Persona Agent**, **Activities**, and **agent skills** authoring.

For **StackGen** core, variables of type `any` or `any(list)` render in **HCL Expression** mode by default and are flagged as **Action Required** when they have no default. Policy evaluation shows generation prompts on the **Evaluation** tab (with a path back to **Generation**), and several policy and catalog UI issues are fixed.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Custom Modules** | [CLI Local Module Upload](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#cli-local-module-upload) |
| **Security** | [HashiCorp Vault External Secret Source](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#hashicorp-vault-external-secret-source) |
| **Aiden** | [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#openai-compatible-llm-gateways) |
| **Integrations** | [Aiden Alert Source Integrations](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#aiden-alert-source-integrations) |
| **What's Enhanced** | **Aiden** | [Persona Agent and Activities UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#persona-agent-and-activities-ux) |
| [Agent Skills Creation UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#agent-skills-creation-ux) |
| **Custom Modules** | [Any-Type Variable Rendering](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#any-type-variable-rendering) |
| **Governance** | [Policy Generation Prompt on Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#policy-generation-prompt-on-evaluation) |
| **What's Fixed** | **Governance** | [Security Policy Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#security-policy-evaluation) |
| [Aiden Policy Try Examples Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#aiden-policy-try-examples-evaluation) |
| **Catalog** | [Enterprise Catalog Assign Button](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#enterprise-catalog-assign-button) |
| **UX** | [Attributes Side Panel Icons](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#attributes-side-panel-icons) |

## What's New

### CLI Local Module Upload

Click to view

We've added support to upload custom modules from a **local directory** through the **StackGen CLI**, using the `--dir` flag on `stackgen upload custom-modules`.

**Previously**, CLI custom module upload required a Git source (repository URL, ref, branch, tag, and related flags). **Now**, you can upload Terraform module code from a local directory as a blob into StackGen, without first syncing that module into a Git repository.

**Key Features**

- **Local Directory Upload** \- Pass `--dir` with the path to your local Terraform module. Do not combine `--dir` with Git source flags (`--repo-url`, `--ref`, `--branch`, `--tag`, `--subdir`, `--secret-name`).
- **Direct Catalog Publish** \- Publish modules into StackGen when the platform is your module source of truth, instead of requiring a Git-backed import path first.
- **Module Source Preference** \- Generated Terraform can reference modules from the **StackGen Registry** by default. To vendor modules into the generated Terraform directory instead, set **Module Source** to **Local** in preferences.

**Why It Matters**

Teams that keep modules outside a synced Git workflow can still get them into the StackGen catalog and use StackGen as the registry for those modules.

Read more in [Upload Custom Modules](/docs/stackgen/cli-guide/usage/upload/custom-modules) and [Module Catalog](/docs/stackgen/concepts/modules/catalog#stackgen-registry-module-source).

### HashiCorp Vault External Secret Source

Click to view

Availability

This is the first version of HashiCorp Vault support. Vault configurations vary; test your auth method, secret paths, and scale before production use. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager if you need guidance.

We've added **HashiCorp Vault** as an option when connecting an **external secret store**.

**Previously**, external secret stores supported cloud secret managers such as **AWS Secrets Manager**. **Now**, you can ingest secrets from **HashiCorp Vault** as well. This is especially useful for on-prem environments that already store credentials in Vault.

**Key Features**

- **Vault Provider** \- Choose HashiCorp Vault when you add an external secret store connection.
- **Shared Across Products** \- Once configured, Vault-backed secrets can be used from both **StackGen** core and **Aiden**.
- **Configure in StackGen Core** \- Set up the Vault connection in StackGen core secret settings. Aiden uses the same connection after it is configured.

**Current Constraints**

- First-cut support. Additional Vault scenarios and larger-scale testing are still in progress.
- Connection setup is done in StackGen core today, even when Aiden consumes the secrets.

**Why It Matters**

On-prem teams that already use Vault can keep secrets in Vault and reference them from StackGen and Aiden, instead of copying them into another store.

Read more in [Secret Store](/docs/stackgen/setup/settings#secret-store).

### OpenAI-Compatible LLM Gateways

Click to view

Availability

This feature is early access. The configuration UX works, but still needs polish. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager for enablement and guidance.

We've added support for **OpenAI-compatible LLM gateways** in **Aiden**, so you can route model traffic through a gateway that exposes multiple models behind one OpenAI-compatible API.

**Previously**, Aiden model setup did not include a path for OpenAI-compatible LLM routers or gateways. **Now**, you can add a gateway (for example OpenRouter), provide the gateway URL and API key, and select from the models that gateway returns.

**Key Features**

- **OpenAI-Compatible Gateways** \- Connect any LLM gateway that exposes an OpenAI-compatible API.
- **Model Discovery** \- After you save the connection, Aiden lists the models available from that gateway.
- **Purpose-Based Model Selection** \- Choose different models for different purposes (for example tool calling vs general requests), including cheaper or specialized models where that fits the workload.

**Current Constraints**

- Early access. The setup and management UX still needs improvement.
- Available models and capabilities depend on the gateway you connect. Confirm tool calling and other requirements for your use case.

**Why It Matters**

Teams that already run an LLM gateway for cost control, model access, or approved provider lists can use that gateway with Aiden instead of wiring each model provider separately.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden).

### Aiden Alert Source Integrations

Click to view

We've expanded **Aiden** alert and observability integrations on the platform **Integrations** UX, including **Aiden 2.0** availability for sources that were already familiar from earlier Aiden experiences.

**Previously**, some alert sources were available in earlier Aiden surfaces but were not fully unlocked on the current Integrations page. **Now**, **Datadog** and **New Relic** are available in Community Edition, **Squadcast** is available as an integration, and **Dynatrace** is available as an integration (Community Edition UI for Dynatrace is still pending).

**Key Features**

- **Datadog** \- Available from **Integrations** on Aiden 2.0 for parity with earlier Datadog support.
- **New Relic** \- Unlocked in the Community Edition Integrations UX.
- **Squadcast** \- Available as an alert and incident integration.
- **Dynatrace** \- Available as an integration. Community Edition UI enablement for Dynatrace is still pending.

**Current Constraints**

- **Dynatrace** is available as an integration, but it is not available in the Community Edition UI yet.

**Why It Matters**

SRE and ops teams can connect the alert sources they already use from the current Aiden Integrations page, with clearer Aiden 2.0 coverage for Datadog and related sources.

Read more in [Datadog](/docs/aiden/1.0/integrations/datadog), [New Relic](/docs/aiden/1.0/integrations/new-relic), [Squadcast](/docs/aiden/1.0/integrations/squadcast), [Dynatrace](/docs/aiden/1.0/integrations/dynatrace), and [Supported Integrations](/docs/aiden/1.0/integrations/supported-integrations).

## What's Enhanced

### Persona Agent and Activities UX

Click to view

We've enhanced the **Persona Agent** management UX and the **Activities** experience in **Aiden**.

**Previously**, Persona Agents were shown mainly as tiles, and activity detail was harder to reach from conversation history. **Now**, agents appear in a table view with more detail and actions, and activities are easier to open from history, from a chat, and from the execution timeline.

**Key Features**

- **Persona Agent Table View** \- Review agents in a table with more detail (including who created the agent) and clearer actions.
- **Per-Agent Activity Detail** \- See activities for an agent, when to use them, tools in use, and related workflows.
- **Conversation History Hover** \- Hover a chat in conversation history to preview related activities.
- **In-Chat Activities** \- Open a chat to review each activity and its status, then jump into the execution timeline (graph view). Cost and replay behavior for those views is unchanged.

**Why It Matters**

It is easier to find the right agent, see what it ran, and inspect execution detail without leaving the chat and history flows you already use.

Read more in [Functional Agents](/docs/aiden/1.0/functional-agents) and [History](/docs/aiden/1.0/history).

### Agent Skills Creation UX

Click to view

We've enhanced the **agent skills** creation flow so you can create and edit skills from more entry points in the product.

**Previously**, skills were primarily imported from a source repository ( **GitHub**, **GitLab**, or **Azure DevOps**). **Now**, you can generate a skill from a prompt, import from a local folder, or upload a skill file, then edit the skill in the same screen after generation or import completes.

**Key Features**

- **Generate from Prompt** \- Enter a prompt and generate skill content from that description.
- **Import from Folder** \- Import skill content from a local directory.
- **Upload Skill File** \- Upload a skill file directly in the creation flow.
- **In-Screen Editing** \- Edit the skill in the same screen after generation or import finishes.
- **Existing Source Import** \- Continue importing skills from GitHub, GitLab, or Azure DevOps as before.

**Why It Matters**

You can create and refine agent skills from a prompt, a local folder, or a file, not only from a connected SCM repository.

Read more in [Skills](/docs/aiden/1.0/skills) and [Skills Best Practices](/docs/aiden/1.0/concepts/skills/skillsbestpractice).

### Any-Type Variable Rendering

Click to view

We've enhanced how variables of type `any` or `any(list)` render in the attributes experience, and how missing defaults are flagged.

**Previously**, these open-ended variable types did not default to expression mode, and missing defaults were easier to miss. **Now**, `any` and `any(list)` variables render in **HCL Expression** mode by default, and variables without a default are flagged as **Action Required**.

**Key Features**

- **HCL Expression by Default** \- Variables of type `any` or `any(list)` render in HCL Expression mode by default.
- **ui-control Override** \- Override that default only by explicitly defining a `ui-control` in `stackgen.yaml`.
- **Action Required Flag** \- Variables of type `any` or `any(list)` that do not have a default value are flagged as **Action Required**.

**Why It Matters**

Open-ended module inputs open in the right editor by default, and incomplete `any` values show up as action items before you move on.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

### Policy Generation Prompt on Evaluation

Click to view

We've enhanced the **Policy** Evaluation experience so the generation prompt stays visible, and you can return to Generation when you need to edit it.

**Previously**, it was easy to lose the prompt that produced a policy once you moved into evaluation. **Now**, generation prompts are visible on the **Evaluation** tab, and you can navigate from Evaluation back to the **Generation** tab to edit the prompt.

**Key Features**

- **Prompt on Evaluation Tab** \- See the policy generation prompt while you evaluate the policy.
- **Return to Generation** \- Move from the Evaluation tab back to the Generation tab to edit the prompt and continue iterating.

**Why It Matters**

You can review a policy with the authoring prompt in view, then jump back to Generation without rebuilding the workflow by hand.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies#create-policies-via-ui).

## What's Fixed

### Security Policy Evaluation

Click to view

We fixed an issue where policy evaluation did not work correctly for existing security policies.

Previously, evaluating existing security policies could fail or behave incorrectly. Policy evaluation now works correctly for existing security policies.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies).

### Aiden Policy Try Examples Evaluation

Click to view

We fixed an issue in **Aiden** policy testing where **Try examples** always returned a positive result for both allow and deny conditions.

Previously, running tests from the Try examples dropdown returned a positive outcome for both positive and negative cases. Allow and deny example evaluation now returns the correct result for the condition under test.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies#create-policies-via-ui).

### Enterprise Catalog Assign Button

Click to view

We fixed an issue where the **Assign** button used to assign modules to projects in the **Enterprise Catalog** table did not render correctly.

Previously, the Assign button could fail to display as expected in the Enterprise Catalog table. The Assign button now renders correctly for module-to-project assignment.

Read more in [Module Catalog](/docs/stackgen/concepts/modules/catalog).

### Attributes Side Panel Icons

Click to view

We fixed an issue where policy violation and **Action Required** icons were not fully visible in the attributes side panel.

Previously, those icons could be clipped or hard to see in the attributes panel. Policy violation and Action Required icons are now fully visible in the attributes side panel.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml#any-and-anylist-variables).

- [What's New](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#whats-new)
  - [CLI Local Module Upload](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#cli-local-module-upload)
  - [HashiCorp Vault External Secret Source](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#hashicorp-vault-external-secret-source)
  - [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#openai-compatible-llm-gateways)
  - [Aiden Alert Source Integrations](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#aiden-alert-source-integrations)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#whats-enhanced)
  - [Persona Agent and Activities UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#persona-agent-and-activities-ux)
  - [Agent Skills Creation UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#agent-skills-creation-ux)
  - [Any-Type Variable Rendering](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#any-type-variable-rendering)
  - [Policy Generation Prompt on Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#policy-generation-prompt-on-evaluation)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#whats-fixed)
  - [Security Policy Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#security-policy-evaluation)
  - [Aiden Policy Try Examples Evaluation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#aiden-policy-try-examples-evaluation)
  - [Enterprise Catalog Assign Button](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#enterprise-catalog-assign-button)
  - [Attributes Side Panel Icons](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#attributes-side-panel-icons)
