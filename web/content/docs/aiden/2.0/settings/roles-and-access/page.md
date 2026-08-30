---
title: "Role hierarchy"
product: "aiden"
sourcePath: "/aiden/2.0/settings/roles-and-access"
sourceUrl: "https://docs.stackgen.com/aiden/2.0/settings/roles-and-access"
status: "ok"
---

Aiden 2.0 organizes access across two levels: the **Organization** (Tenant) and the **Workspace**. Each level has an admin role and a non-admin role, with a clear hierarchy from Org Admin down to Workspace User.

## Role hierarchy

| Role | Level | What they can do |
| --- | --- | --- |
| **Admin** | Organization | - Full access.<br>- Create and manage workspaces, configure tenant-level integrations, invite users, and add apps. |
| **Workspace Admin** | Workspace | - Operate and configure the workspaces they administer. <br>- Invite other Workspace Admins and Workspace Users to those workspaces.<br>- Cannot grant Org Admin access. |
| **Workspace User** | Workspace | - Use the apps in a workspace.<br>- Cannot configure workspace or tenant settings. |

## Who Can Sccess Settings

- An **Admin** invites users at the Org level and assigns them to workspaces.
- A **Workspace Admin** invites other **Workspace Admins** or **Workspace Users** to the workspaces they administer. A **Workspace Admin** cannot grant **Org Admin** access.

| Feature / Settings | Admin | Workspace Admin | Workspace User |
| --- | --- | --- | --- |
| Workspace Settings | ✅ | ✅ | ❌ |
| Org Settings (integrations, members, workspaces) | ✅ | ❌ | ❌ |
| Apps (New Conversation, Discovery, Alerts, Investigations, etc.) | ✅ | ✅ | ✅ |
