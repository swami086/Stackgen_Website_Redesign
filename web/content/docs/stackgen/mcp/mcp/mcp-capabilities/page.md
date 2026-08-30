---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/mcp/mcp/mcp-capabilities"
sourceUrl: "https://docs.stackgen.com/docs/mcp/mcp/mcp-capabilities"
status: "ok"
---

Use StackGen **MCP** to let supported IDEs and assistants work with live StackGen data and approved StackGen actions. This guide explains what StackGen MCP can do, how capabilities differ between **Admin** and **User** MCP, and where MCP fits into day-to-day StackGen workflows.

**What you will learn:**

- What StackGen MCP capabilities are available
- How Admin and User MCP differ
- What kinds of appStack and project actions MCP can perform
- How MCP helps assistants work with live StackGen context instead of guessing

## Overview

The **Model Context Protocol (MCP)** lets assistants in tools such as **Claude**, **Cursor**, and **Visual Studio Code** connect to StackGen through a standard tool interface.

With StackGen MCP, the assistant can work with:

- Live StackGen context
- Approved StackGen actions
- appStack snapshots
- appStack environment configuration updates

This means assistants can work against current StackGen state instead of relying only on prompt text.

## Core capabilities

| Capability | What it enables |
| --- | --- |
| **Live context** | Read current infrastructure and project state from StackGen |
| **Approved actions** | Run supported actions against the same APIs used by the StackGen UI |
| **Custom module create and delete** | Create or delete custom modules at **appStack-owned** or **tenant** scope (Admin MCP) |
| **appStack snapshots** | Inspect snapshot history and restore earlier appStack states in supported MCP workflows |
| **Environment configuration updates** | Add or remove appStack environment configurations and **S3** state backends in supported MCP workflows |
| **Authenticated access** | Use PAT-scoped access so the available tools match the token permissions |

## Custom module create and delete

**Previously**, MCP did not include tools to create or delete custom modules. **Now**, Admin MCP can create and delete custom modules in two scopes.

| Scope | Where the module appears | Typical use |
| --- | --- | --- |
| **appStack-owned** | In that appStack's module view, not the global catalog | Modules owned by one appStack |
| **Tenant** | Main **Module Catalog** | Tenant-wide shared modules |

During create, MCP uses the source details you provide and returns logs for what was created and which configuration parameters were used. Matching delete flows remove modules in both scopes so you do not leave orphaned catalog entries.

See [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#mcp-module-management-tools) and [StackGen MCP](/docs/stackgen/stackgen-mcp).

## Admin MCP and User MCP

StackGen MCP separates governance and platform work from appStack and topology work.

|  | **Admin MCP** | **User MCP** |
| --- | --- | --- |
| **Typical users** | **Admin**, **DevOps** | **Developer** |
| **Primary scope** | Projects, policies, custom modules, secrets | appStacks, topology, snapshots |
| **Example work** | List projects, review policies, create or delete custom modules (appStack-owned or tenant), list secrets | List or create appStacks, add or update resources, review or restore snapshots |

Use **Admin MCP** for platform, governance, and module lifecycle work. Use **User MCP** for appStack-level work and topology changes.

## Example Prompts

Here are examples of the kinds of prompts you can use with StackGen MCP in a supported client.

Click to view

### Admin MCP examples

- `List the projects I can access in StackGen.`
- `Show me the policies available for this tenant.`
- `List the secrets available to this project.`
- `Show me the custom modules available in StackGen.`
- `Create a custom module for this appStack from the source I provide.`
- `Create a tenant-scoped custom module from this source.`
- `Delete this custom module.`

### User MCP examples

- `List the appStacks in my current project.`
- `Create an appStack for a basic web application.`
- `Show me the resources in this appStack.`
- `Create a snapshot before making changes to this appStack.`
- `Restore the most recent snapshot for this appStack.`

### Environment and topology examples

- `Show me the environment configurations for this appStack.`
- `Add an environment configuration for this appStack if the client supports it.`
- `Remove the S3 state backend from this appStack if it exists.`
- `Help me review this topology before I make changes.`

note

The exact tools and prompt results depend on the MCP client you use and the permissions attached to your **PAT**. If a client does not expose a capability, or your token does not allow it, the assistant may not be able to complete the action.

## appStack Capabilities Through MCP

For appStack work, MCP can help with tasks such as:

- Reviewing current appStack state
- Creating or updating appStacks
- Adding, deleting, or configuring resources
- Creating snapshots before assistant-driven changes
- Restoring earlier snapshots when needed
- Updating supported appStack environment configurations

The StackGen UI still creates snapshots automatically during normal appStack edits. Over MCP, snapshot actions are prompt-driven, so create a snapshot explicitly when you want a clear restore point before changes.

## PAT-based access

The tools available through StackGen MCP depend on the **PAT** you configure.

If the token has fewer permissions, the assistant will see fewer tools. The MCP server only registers tools that the token is allowed to use.

This helps keep MCP access aligned with the same permissions model used across StackGen.

## Why use StackGen MCP

- It gives assistants access to current StackGen data instead of inferred or stale context.
- It lets supported IDEs work with StackGen through one integration pattern.
- It helps separate governance work from appStack work by using the right MCP surface for each type of task.
- It makes MCP workflows easier to start because users can ask for common StackGen tasks in plain language.

## Best Practices

tip

- Use a **PAT** whose permissions match the work you want to perform.
- Use **Admin MCP** for project, policy, module, and secret workflows.
- Use **User MCP** for appStack, topology, and snapshot workflows.
- Create a snapshot explicitly before major assistant-driven appStack changes when you want a safe restore point.

## Next Steps

- [StackGen MCP](/docs/stackgen/stackgen-mcp): how to configure StackGen MCP.
- [appStack Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots): how to create and restore appStack snapshots.
- [Environment Configurations](/docs/stackgen/concepts/environment-configurations): how to configure environments for a project.
- [Personal Access Tokens](/docs/stackgen/setup/pat): how to create a personal access token.

- [Overview](/docs/stackgen/mcp/mcp/mcp-capabilities#overview)
- [Core capabilities](/docs/stackgen/mcp/mcp/mcp-capabilities#core-capabilities)
- [Custom module create and delete](/docs/stackgen/mcp/mcp/mcp-capabilities#custom-module-create-and-delete)
- [Admin MCP and User MCP](/docs/stackgen/mcp/mcp/mcp-capabilities#admin-mcp-and-user-mcp)
- [Example Prompts](/docs/stackgen/mcp/mcp/mcp-capabilities#example-prompts)
  - [Admin MCP examples](/docs/stackgen/mcp/mcp/mcp-capabilities#admin-mcp-examples)
  - [User MCP examples](/docs/stackgen/mcp/mcp/mcp-capabilities#user-mcp-examples)
  - [Environment and topology examples](/docs/stackgen/mcp/mcp/mcp-capabilities#environment-and-topology-examples)
