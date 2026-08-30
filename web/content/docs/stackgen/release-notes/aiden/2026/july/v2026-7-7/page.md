---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aiden/2026/july/v2026-7-7"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aiden/2026/july/v2026-7-7"
status: "ok"
---

The July 2026 Aiden release covers **In-Chat Product Help**, **Slack Notifications Integration**, **Multiple Authentication Providers**, and more.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Platform** | [In-Chat Product Help](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#in-chat-product-help) |
| **Integrations** | [Slack Notifications Integration](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#slack-notifications-integration) |
| **Platform** | [Multiple Authentication Providers](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#multiple-authentication-providers) |
| **Platform** | [Aiden to StackGen Product Switcher](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#aiden-to-stackgen-product-switcher) |
| **What's Enhanced** | **Platform** | [Knowledge Hub UI and Editing](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#knowledge-hub-ui-and-editing) |
| **Agents** | [LLM Credit Errors and Subagent Reliability](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#llm-credit-errors-and-subagent-reliability) |

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

### Aiden to StackGen Product Switcher

Click to view

We've added the reverse product switcher so you can move from **Aiden** back to **StackGen** core.

**Previously**, **v2026.7.3** added a switcher from StackGen to Aiden, but returning from Aiden to core StackGen was not available yet. **Now**, the same switch pattern works in Aiden, so you can move either direction between the products.

**Key Features**

- **Switch to StackGen** \- From the Aiden UI, use the product switcher to open StackGen core.
- **Round-Trip Navigation** \- With the StackGen to Aiden switcher from **v2026.7.3**, teams that use both products can move between them without hunting for separate URLs.

**Why It Matters**

Users who work in both products get a consistent switcher in each direction, matching how teams move between infrastructure and Aiden workflows day to day.

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

### LLM Credit Errors and Subagent Reliability

Click to view

We've enhanced **Aiden** error reporting and agent reliability when credits run out and when subagents are used during a run.

**Previously**, running out of LLM credits could fail in a way that was hard to interpret, and some runs used subagents too aggressively. **Now**, credit exhaustion surfaces clearer errors, and subagent usage is more controlled so runs stay more predictable.

**Key Features**

- **LLM Credit Error Reporting** \- When LLM credits are exhausted, Aiden reports the failure clearly instead of a vague break in the run.
- **Subagent Reliability** \- Reliability updates reduce overly aggressive subagent usage so agent runs stay more controlled.

**Why It Matters**

Operators can tell when credits are the blocker, and day-to-day Aiden runs behave more consistently.

- [What's New](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#whats-new)
  - [In-Chat Product Help](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#in-chat-product-help)
  - [Slack Notifications Integration](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#slack-notifications-integration)
  - [Multiple Authentication Providers](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#multiple-authentication-providers)
  - [Aiden to StackGen Product Switcher](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#aiden-to-stackgen-product-switcher)
- [What's Enhanced](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#whats-enhanced)
  - [Knowledge Hub UI and Editing](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#knowledge-hub-ui-and-editing)
  - [LLM Credit Errors and Subagent Reliability](/docs/stackgen/release-notes/aiden/2026/july/v2026-7-7#llm-credit-errors-and-subagent-reliability)
