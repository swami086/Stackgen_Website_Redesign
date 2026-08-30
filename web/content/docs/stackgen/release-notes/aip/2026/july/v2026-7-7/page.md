---
title: "In-Chat Help, Slack Notifications, Knowledge Hub Editing, and stackgen.yaml Validation"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/july/v2026-7-7"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/july/v2026-7-7"
status: "ok"
---

## In-Chat Help, Slack Notifications, Knowledge Hub Editing, and stackgen.yaml Validation

The July 2026 weekly **v2026.7.7** release adds in-chat product **help** in **Aiden**, first-cut **Slack** outbound notifications, and a **CLI** / **API** path to validate `stackgen.yaml` when you author custom modules. It also lets you link **multiple authentication providers** to the same account, complete the product switcher with **Aiden** to **StackGen** navigation, and warn clearly when you create **secrets** from a **personal workspace**.

For **Aiden** teams, **Knowledge Hub** gains in-UI editing and source-link navigation, plus clearer **LLM** credit errors and more controlled subagent behavior. For **StackGen** core, **AWS** account onboarding is clearer (including access key auth alongside assume role), custom **security policy** creation keeps more workflow context, and **project** switching is improved. **Community Edition** onboarding now drops new users into the sandbox first.

Explore the sections below to see what's new, enhanced, changed, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Aiden** | [In-Chat Product Help](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#in-chat-product-help) |
| **Integrations** | [Slack Notifications Integration](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#slack-notifications-integration) |
| **Custom Modules** | [stackgen.yaml Syntax Validation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#stackgen-yaml-syntax-validation) |
| **Auth** | [Multiple Authentication Providers](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#multiple-authentication-providers) |
| **UX** | [Aiden to StackGen Product Switcher](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aiden-to-stackgen-product-switcher) |
| **Security** | [Personal Workspace Secrets Warning](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#personal-workspace-secrets-warning) |
| **What's Enhanced** | **Aiden** | [Knowledge Hub UI and Editing](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#knowledge-hub-ui-and-editing) |
| [LLM Credit Errors and Subagent Reliability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#llm-credit-errors-and-subagent-reliability) |
| **Governance** | [Custom Security Policy Creation UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#custom-security-policy-creation-ux) |
| **Cloud Accounts** | [AWS Cloud Account Onboarding](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-cloud-account-onboarding) |
| **UX** | [Project Switcher UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#project-switcher-ux) |
| **What's Changed** | **Onboarding** | [Community Edition Sandbox-First Onboarding](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#community-edition-sandbox-first-onboarding) |
| **What's Fixed** | **OCI** | [appStack-Owned Modules in OCI appStacks](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#appstack-owned-modules-in-oci-appstacks) |
| **Custom Modules** | [stackgen.yaml Dropdown Controls in Attribute Panel](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#stackgen-yaml-dropdown-controls-in-attribute-panel) |
| **Cloud Accounts** | [AWS Credential Handling](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-credential-handling) |

## What's New

### In-Chat Product Help

Click to view

We've added in-chat **product help** in **Aiden** so you can learn how the platform works without leaving the conversation.

**Previously**, understanding product concepts meant leaving chat and searching the docs on your own. **Now**, type `help` in any chat for a general orientation, or use `/help` with a specific question (for example, what a runbook is, or what a knowledge artifact is). Answers are pulled from StackGen documentation and link back to the relevant docs pages.

**Key Features**

- **Generic Help** \- Type `help` and press Enter for a broad overview of how to use the product.
- **Targeted Help** \- Use `/help` with a question when you need a tailored explanation of a concept or workflow.
- **Docs-Backed Answers** \- Responses are grounded in product documentation and point you back to the documentation site.

**Why It Matters**

You get product guidance inside the chat you already use, instead of breaking context to hunt through docs for basic concepts.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden).

### Slack Notifications Integration

Click to view

Availability

This is the first cut of Slack integration. It supports outbound notifications from Aiden into Slack only. A full Slack application for interactive chat with Aiden is still in development and is not generally available in production yet. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager if you need a demo of the in-progress Slack app.

We've added a first-cut **Slack** integration so **Aiden** can send outbound notifications into a configured Slack workspace.

**Key Features**

- **Slack Integration Setup** \- From **Integrations**, add a Slack integration and provide the connection details for your workspace.
- **Outbound Notifications** \- Ask Aiden to send a message to a Slack channel, or use notification steps in workflows so teams get updates without watching the UI.

**Current Constraints**

- Outbound notifications only. Two-way interactive Aiden in Slack is not part of this cut.
- The broader Slack application remains under development. Demo access may be available; it is not a production GA path yet.

**Why It Matters**

Teams can push Aiden-driven updates into the Slack channels they already monitor, then expand to richer Slack-native interaction when the full app lands.

Read more in Slack.

### stackgen.yaml Syntax Validation

Click to view

We've added a **CLI** / **API** path to validate **StackGen YAML** (`stackgen.yaml`) syntax when you author or update **custom modules**.

**Previously**, custom module authors had no dedicated validation endpoint to check StackGen YAML before relying on canvas preview. **Now**, you can validate `stackgen.yaml` through the API (and related CLI tooling) to confirm schema keys and structure as you iterate on how the module renders on the canvas.

**Key Features**

- **API Validation** \- Call a validation endpoint to check `stackgen.yaml` programmatically during custom module development.
- **CLI Support** \- Use the same validation capability from CLI tooling so checks fit the module authoring loop.
- **Schema Key Checks** \- Validation focuses on schema keys and YAML structure for how the module is presented on the canvas (display names, parameters, and related UI).

**Current Constraints**

- This cut is limited to the **API** path and to **schema keys**. It is not full semantic or runtime validation of every canvas behavior.

**Why It Matters**

Teams that build and maintain custom modules at scale can catch StackGen YAML schema issues through an API, instead of discovering them only after preview or drag-and-drop.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

### Multiple Authentication Providers

Click to view

We've added support for **multiple authentication providers** on the same account in both **Aiden** and **StackGen** core.

**Previously**, signing in with Google, GitHub, or another provider could create separate tenants and accounts, which made it painful when a PoC used one identity provider and production needed another. **Now**, you can associate more than one sign-in method with the same account (for example both Google and GitHub) so the same tenant stays available across providers.

**Key Features**

- **Link Multiple Providers** \- Connect additional identity providers to an existing account instead of ending up with disconnected tenants.
- **Aiden and StackGen Core** \- The same multi-provider login model applies in Aiden and in the StackGen infrastructure product.
- **PoC to Production Continuity** \- Teams that start on one provider and later standardize on another can keep the same tenant without a separate account migration.

**Why It Matters**

SaaS customers who change identity providers between evaluation and production can keep one account and tenant, instead of rebuilding access around a second login method.

Read more in [Multiple authentication providers on a tenant](/docs/stackgen/setup/settings#multiple-authentication-providers-on-a-tenant).

### Aiden to StackGen Product Switcher

Click to view

We've added the reverse product switcher so you can move from **Aiden** back to **StackGen** core.

**Previously**, **v2026.7.3** added a switcher from StackGen to Aiden, but returning from Aiden to core StackGen was not available yet. **Now**, the same switch pattern works in Aiden, so you can move either direction between the products.

**Key Features**

- **Switch to StackGen** \- From the Aiden UI, use the product switcher to open StackGen core.
- **Round-Trip Navigation** \- With the StackGen to Aiden switcher from **v2026.7.3**, teams that use both products can move between them without hunting for separate URLs.

**Why It Matters**

Users who work in both products get a consistent switcher in each direction, matching how teams move between infrastructure and Aiden workflows day to day.

Read more in [Product switcher](/docs/stackgen/setup/stackgen-ui#product-switcher-stackgen-and-aiden).

### Personal Workspace Secrets Warning

Click to view

We've added a clear warning when you create **secrets** from a **personal workspace**.

**Previously**, you could create secrets in a personal workspace without a strong signal that the location might be wrong for shared or production use. **Now**, the UI shows an explicit warning in that flow so the scope is obvious before you proceed.

**Key Features**

- **Clear Warning** \- Creating secrets from a personal workspace surfaces a warning so you confirm scope before the secret is created.

**Why It Matters**

Teams are less likely to place secrets in a personal workspace when they intended a shared project or org-scoped location.

Read more in [Secret Store](/docs/stackgen/setup/settings#secret-store).

## What's Enhanced

### Knowledge Hub UI and Editing

Click to view

We've enhanced the **Knowledge Hub** so you can navigate back to source systems more easily and create or edit knowledge content directly in the UI.

**Previously**, connected sources such as Confluence were harder to traverse, and editing hub content often meant leaving the product without a clear path. **Now**, connected document trees link back to the source, and you can add or edit Markdown content inside the product for hub-owned artifacts.

**Key Features**

- **Source Link Navigation** \- From a connected knowledge tree (for example Confluence), follow links back to the destination document in the source system.
- **In-UI Create and Edit** \- Create documents and edit Markdown content directly in the Knowledge Hub for content owned in the product.
- **One-Way Sync from Third Parties** \- Connected providers remain the source of truth. Sync is one-way into StackGen (manual or configured auto sync). Editing a third-party document opens the provider rather than writing back from StackGen.

**Why It Matters**

A clearer Knowledge Hub makes operational guidance easier to keep accurate and reachable, which helps teams use Aiden with better grounded context.

note

**Runbooks** and **documents** both live in the Knowledge Hub, but they are used differently at runtime. Runbooks are pulled as a whole into agent context so they can be followed deterministically. Documents and knowledge artifacts are retrieved by relevancy from vector storage based on the current conversation.

Read more in [Knowledge Hub](/docs/aiden/1.0/concepts/knowledgehub).

### LLM Credit Errors and Subagent Reliability

Click to view

We've enhanced **Aiden** error reporting and agent reliability when credits run out and when subagents are used during a run.

**Previously**, running out of LLM credits could fail in a way that was hard to interpret, and some runs used subagents too aggressively. **Now**, credit exhaustion surfaces clearer errors, and subagent usage is more controlled so runs stay more predictable.

**Key Features**

- **LLM Credit Error Reporting** \- When LLM credits are exhausted, Aiden reports the failure clearly instead of a vague break in the run.
- **Subagent Reliability** \- Reliability updates reduce overly aggressive subagent usage so agent runs stay more controlled.

**Why It Matters**

Operators can tell when credits are the blocker, and day-to-day Aiden runs behave more consistently.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden).

### Custom Security Policy Creation UX

Click to view

We've enhanced the **Create Security Policy** workflow so you keep more context while you author and evaluate policies in **StackGen** core.

**Previously**, it was easy to lose track of how a policy was produced once you moved into evaluation. **Now**, the flow preserves workflow context, including the prompts that generated a policy when you evaluate it.

**Key Features**

- **Workflow Context** \- Stay oriented through the create and evaluate path instead of dropping context between steps.
- **Generation Prompt Visibility** \- When you evaluate a policy, you can see the prompts that created it, which makes review and iteration clearer.

**Why It Matters**

Platform and security teams iterating on custom policies can see why a policy looks the way it does, then evaluate and refine it without reconstructing the authoring history by hand.

Read more in [Custom Policies](/docs/stackgen/concepts/policies/custom-policies#create-policies-via-ui).

### AWS Cloud Account Onboarding

Click to view

We've enhanced **AWS** cloud account onboarding so required fields are clearer, and you can authenticate with either assume role or access key credentials.

**Previously**, it was hard to tell which fields were required when onboarding AWS accounts, and access key based auth was not available in StackGen core. **Now**, the onboarding UX makes the required inputs explicit for each method, and you can use **assume role** (the original StackGen path) or **access key ID** and **secret access key**.

**Key Features**

- **Clearer Required Fields** \- The UI makes it obvious which fields you must fill for the auth method you choose.
- **Assume Role** \- Continue using StackGen's original assume role flow for AWS account connection.
- **Access Key Authentication** \- Authenticate with access key ID and secret access key in StackGen core, in addition to assume role.

**Why It Matters**

Teams onboarding cloud accounts spend less time guessing required inputs, and customers who need access key based auth can complete AWS setup inside StackGen core without a separate workaround.

Read more in [Secret Store](/docs/stackgen/setup/settings#secret-store).

### Project Switcher UX

Click to view

We've enhanced the **project switcher** in **StackGen** core so moving between projects is clearer in day-to-day navigation.

**Previously**, project switching in the core UI was harder to use in common navigation paths. **Now**, project switcher interactions are improved for typical project and workspace transitions.

**Key Features**

- **Improved Project Switching** \- Clearer project switcher behavior for common project and workspace navigation paths.

**Current Constraints**

- This is a partial implementation. The **Personal Workspace** path with an existing appStack scenario still needs follow-up work.

**Why It Matters**

Clearer project switching reduces friction for users who jump across projects while building and reviewing appStacks.

Read more in [Navigating UI](/docs/stackgen/setup/stackgen-ui#project-switcher) and [StackGen Settings](/docs/stackgen/setup/settings#projects).

## What's Changed

### Community Edition Sandbox-First Onboarding

Click to view

**Community Edition** onboarding now drops new users into the **sandbox** by default instead of asking them to choose between connecting their own observability stack and using the sandbox up front.

**Previously**, after login, Community Edition presented a choice between connecting your own stack or entering the sandbox. **Now**, after a short welcome, **Let's get started** takes you straight into sandbox setup and discovery so you can explore with sandbox data immediately. When you are ready to connect your own environment, **Integrate now** returns you to the credentials flow.

**What Changed**

- **Welcome First** \- A short welcome screen explains Community Edition before you start.
- **Sandbox by Default** \- New users land in the sandbox discovery path instead of choosing connect vs sandbox first.
- **Integrate When Ready** \- **Integrate now** brings you back to enter credentials and activate with your own environment.

**Why It Matters**

People trying Community Edition can experience the product with sandbox data sooner, then convert to a real integration when they are ready.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden) and [Discovery](/docs/aiden/1.0/aiden-sre/discovery).

## What's Fixed

### appStack-Owned Modules in OCI appStacks

Click to view

We fixed an issue preventing **appStack-owned** modules from working correctly in **OCI** appStacks.

Previously, appStack-owned modules could fail to behave correctly inside OCI appStacks. appStack-owned modules now work correctly in OCI appStacks.

Read more in [Edit and Sync appStack-Owned Modules](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates) and [OCI provider early access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access).

### stackgen.yaml Dropdown Controls in Attribute Panel

Click to view

We fixed an issue where dropdown UI controls defined in `stackgen.yaml` did not render correctly in the attribute panel.

Previously, dropdown controls declared in StackGen YAML could fail to show as expected when editing module attributes. Dropdown UI controls defined in `stackgen.yaml` now render correctly in the attribute panel.

Read more in [Custom Module Rendering](/docs/stackgen/concepts/modules/stackgen-yaml).

### AWS Credential Handling

Click to view

We fixed issues in how **AWS** credentials were handled during cloud account setup and use.

Previously, AWS credential handling could fail or behave incorrectly in onboarding and related flows. AWS credentials are now handled correctly alongside the clearer onboarding UX in this release.

Read more in [Secret Store](/docs/stackgen/setup/settings#secret-store).

- [What's New](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#whats-new)
  - [In-Chat Product Help](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#in-chat-product-help)
  - [Slack Notifications Integration](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#slack-notifications-integration)
  - [stackgen.yaml Syntax Validation](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#stackgen-yaml-syntax-validation)
  - [Multiple Authentication Providers](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#multiple-authentication-providers)
  - [Aiden to StackGen Product Switcher](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aiden-to-stackgen-product-switcher)
  - [Personal Workspace Secrets Warning](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#personal-workspace-secrets-warning)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#whats-enhanced)
  - [Knowledge Hub UI and Editing](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#knowledge-hub-ui-and-editing)
  - [LLM Credit Errors and Subagent Reliability](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#llm-credit-errors-and-subagent-reliability)
  - [Custom Security Policy Creation UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#custom-security-policy-creation-ux)
  - [AWS Cloud Account Onboarding](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-cloud-account-onboarding)
  - [Project Switcher UX](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#project-switcher-ux)
- [What's Changed](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#whats-changed)
  - [Community Edition Sandbox-First Onboarding](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#community-edition-sandbox-first-onboarding)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#whats-fixed)
  - [appStack-Owned Modules in OCI appStacks](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#appstack-owned-modules-in-oci-appstacks)
  - [stackgen.yaml Dropdown Controls in Attribute Panel](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#stackgen-yaml-dropdown-controls-in-attribute-panel)
  - [AWS Credential Handling](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-credential-handling)
