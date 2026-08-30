---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aiden/2026/july/v2026-7-9"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aiden/2026/july/v2026-7-9"
status: "ok"
---

The July 2026 Aiden release covers **OpenAI-Compatible LLM Gateways**, **Aiden Alert Source Integrations**, **Persona Agent and Activities UX**, and more.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Platform** | [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#openai-compatible-llm-gateways) |
| **Integrations** | [Aiden Alert Source Integrations](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#aiden-alert-source-integrations) |
| **What's Enhanced** | **Agents** | [Persona Agent and Activities UX](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#persona-agent-and-activities-ux) |
| **Agents** | [Agent Skills Creation UX](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#agent-skills-creation-ux) |
| **What's Fixed** | **Policies** | [Aiden Policy Try Examples Evaluation](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#aiden-policy-try-examples-evaluation) |

## What's New

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

## What's Fixed

### Aiden Policy Try Examples Evaluation

Click to view

We fixed an issue in **Aiden** policy testing where **Try examples** always returned a positive result for both allow and deny conditions.

Previously, running tests from the Try examples dropdown returned a positive outcome for both positive and negative cases. Allow and deny example evaluation now returns the correct result for the condition under test.

- [What's New](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#whats-new)
  - [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#openai-compatible-llm-gateways)
  - [Aiden Alert Source Integrations](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#aiden-alert-source-integrations)
- [What's Enhanced](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#whats-enhanced)
  - [Persona Agent and Activities UX](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#persona-agent-and-activities-ux)
  - [Agent Skills Creation UX](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#agent-skills-creation-ux)
- [What's Fixed](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#whats-fixed)
  - [Aiden Policy Try Examples Evaluation](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-9#aiden-policy-try-examples-evaluation)
