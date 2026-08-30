---
title: "What's New"
product: "stackgen"
sourcePath: "/docs/release-notes/aiden/2026/may/v2026-5-5"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aiden/2026/may/v2026-5-5"
status: "ok"
---

The May 2026 Aiden release covers **Functional Agents**, **Observability and Alert Integration**.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Agents** | [Functional Agents](/docs/stackgen/release-notes/aiden/2026/may/v2026-5-5#functional-agents) |
| **Integrations** | [Observability and Alert Integration](/docs/stackgen/release-notes/aiden/2026/may/v2026-5-5#observability-and-alert-integration) |

## What's New

### Functional Agents

Click to view

**Functional Agents** (also referred to as personal agents) are customizable AI entities in **Aiden** that you can configure with specific expertise and operational guidelines.

**Key Features**

- **Persona customization** \- Define specific roles for an agent, such as a **Cloud Infra Architect**, to handle specialized tasks.

- **Expert integration** \- When you define an agent, select which **expert** it is allowed to work with so the agent uses the correct domain knowledge.

- **Custom instructions** \- Provide unique instructions to each agent to govern how it responds and the standards it should follow.

- **Thought process visibility** \- When an agent generates output (for example **Terraform** code), its internal reasoning and thought process are visible, including which agent produced the response.

- **Agent filtering** \- Filter your list of agents by text to quickly find the right persona for a conversation.



![Aiden sidebar navigation with Functional Agents menu item highlighted](https://docs.stackgen.com/assets/images/may26-functional-agents-3055ffaa8fe70927ef0f35c3d2fe9c93.png)


**Why It Matters**

Specialized personas and transparent reasoning give you more accurate, context-aware assistance, so teams can generate infrastructure code and troubleshoot complex environments according to their own organizational standards.

### Observability and Alert Integration

Click to view

**Aiden** now provides enhanced visibility and automated context-gathering for infrastructure alerts and investigations.

**Key Features**

- **Full alert payloads** \- For environments with **Grafana** or **Observe** configured, **Aiden** can display the complete information payload for any captured alert.

- **Investigation detail visibility** \- The **Investigation** tab now renders all detailed data related to a specific infrastructure investigation in one view.

- **Contextual conversations** \- Start a new **Aiden** conversation that automatically includes the full payload of an investigation for more accurate, data-driven assistance.

- **Chain of thought rendering** \- The internal reasoning and chain of thought for an investigation are visible in both the dedicated investigation view and the main chat window.



![Alert Payload modal showing JSON labels severity and summary for a URLEndpointDown alert](https://docs.stackgen.com/assets/images/may26-alert-payload-54d3fb2238df19eb487e854193625210.png)





![Initial Investigation view showing Show Thoughts toggle severity metrics and alert specification details](https://docs.stackgen.com/assets/images/may26-investigation-detail-3ddb4b90b81772fdaf9aeb1830c3db72.png)


**Why It Matters**

By surfacing full alert payloads and maintaining the chain of thought throughout the investigation, **Aiden** gives **DevOps** teams immediate, deep context. This reduces the time spent manually gathering data from external observability tools during critical incidents.

- [What's New](/docs/stackgen/release-notes/aiden/2026/may/v2026-5-5#whats-new)
  - [Functional Agents](/docs/stackgen/release-notes/aiden/2026/may/v2026-5-5#functional-agents)
  - [Observability and Alert Integration](/docs/stackgen/release-notes/aiden/2026/may/v2026-5-5#observability-and-alert-integration)
