---
title: "What Aiden Helps You Do"
product: "aiden"
sourcePath: "/aiden/2.0"
sourceUrl: "https://docs.stackgen.com/aiden/2.0"
status: "ok"
---

Aiden 2.0 is an Agentic AI Operating System (OS) for DevOps and reliability. It actively investigates, automates, and acts across your stack. It is built for organizations that already run multiple DevOps tools and need one operating model for investigation, automation, governance, and action.

## What Aiden Helps You Do

You can use Aiden 2.0 for practical DevOps tasks across day-to-day operations:

- Investigate production incidents and reduce mean time to resolution.
- Analyze alerts from connected observability systems.
- Guide CI or CD troubleshooting with context from your stack.
- Support platform and reliability workflows with repeatable prompts.
- Help teams apply governance controls without losing execution speed.

Like Aiden 1.0, the goal is to let your engineers operate in natural language while Aiden handles context stitching across tools.

If you used Aiden 1.0, the biggest change is structure and control:

- Clear hierarchy for scope and ownership.
- Reusable building blocks across teams.
- Explicit guardrails for integrations and tool access.
- Workspace-centric configuration and ownership model.
- Explicit separation of reliability, automation, governance, and platform functions.
- Clearer controls for integrations, approvals, and member access.
- Better support for repeatable team workflows.

## Core Model in Aiden 2.0

Aiden 2.0 has the following hierarchy: **Organization -> Workspace -> Apps**

- **Organization**: Your top-level organization boundary.
- **Workspace**: Team or environment context where integrations, skills, policies, and workflows are managed.
- **Apps**: Tools and capabilities added to a workspace based on use case.

This model helps you isolate context, control access, and scale operations safely.

### How Aiden Works

Behind the scenes, Aiden uses an agentic architecture where specialized agents and skills work together on scoped workspace data. In practice, this means:

- Requests are interpreted in workspace context first.
- Connected integrations provide operational evidence.
- Skills and workflow logic shape execution behavior.
- Governance and approval checkpoints control sensitive actions.

This keeps results relevant to your environment and aligned with your operating model.

## What You Configure in Aiden 2.0

In Aiden 2.0, you can configure the following:

- **Workspaces**: Create and manage workspace boundaries, ownership, and operational scope.
- **Alerts**: Configure alert ingestion, triage flow, and investigation triggers for your workspace.
- **Activity**: View recent workspace-level actions, runs, and operational events.
- **Agent skills**: Create, manage, and assign skills that agents can use while executing tasks.
- **Knowledge Base**: Add and manage workspace knowledge sources that improve context and response quality.
- **Approvals**: Define and review approval checkpoints for controlled actions.
- **Platform**
  - **Members**: Manage workspace membership and access.
  - **Integrations**: Connect and manage tool integrations used by the workspace.

- [What Aiden Helps You Do](/docs/aiden/2.0#what-aiden-helps-you-do)
- [Core Model in Aiden 2.0](/docs/aiden/2.0#core-model-in-aiden-20)
  - [How Aiden Works](/docs/aiden/2.0#how-aiden-works)
