---
title: "Why use groups"
product: "stackgen"
sourcePath: "/docs/concepts/rbac/user-groups"
sourceUrl: "https://docs.stackgen.com/docs/concepts/rbac/user-groups"
status: "ok"
---

For Platform and DevOps Engineers

Availability

**Entra ID group sync** requires StackGen to enable a tenant flag (Helm chart). It is not self-serve in the UI yet. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager.

**Automatic sync of user group membership** from Entra is not available in the current cut. That lands in a follow-up release.

The **Groups** UI is available on **Infra Ops** (StackGen core) today. Group APIs can be used across apps (for example Backstage). Expanding the UI beyond Infra Ops is planned.

Use **user groups** to manage project access at scale. Create a group, add users (and nested groups when needed), then assign the group to a project with a role ( **Admin**, **DevOps**, or **Developer**).

## Why use groups

- Scale RBAC when many users share the same project role.
- Mirror organization structure with nested groups.
- Align with **Microsoft Entra ID** groups when sync is enabled for your tenant.
- Automate membership changes through APIs when the UI is not enough.

## Create a group

1. Open the **Enterprise** experience and go to **User Management** (members and groups).
2. Open **Groups**.
3. Create a group and give it a clear name.
4. Add users to the group.
5. Optionally add **nested groups** if your organization uses nested access models.

## Assign a group to a project

1. Open the **project** you want to update.
2. Open project **members**.
3. Add a **user group** (search and select the group).
4. Choose the project role for that group: **Admin**, **DevOps**, or **Developer**.
5. Save.

Members of the group receive that project role based on group membership.

## Entra ID group sync

If your organization uses **Microsoft Entra ID**, StackGen can sync **groups** into StackGen when enablement is configured for the tenant.

| Capability | Status in this release |
| --- | --- |
| Sync **groups** from Entra | Available when StackGen enables the tenant flag |
| Customer self-serve sync setup in UI | Not available (support / Helm flag) |
| Automatic sync of **membership** inside groups | Not in this cut (follow-up) |

For Entra OAuth app registration used for sign-in, see [Configure Your Microsoft Entra ID (Azure AD) OAuth 2.0](/docs/stackgen/support-and-kb/how-tos/entra).

## API access

Group APIs support customers and integrations that manage access outside the Infra Ops UI (for example Backstage). Use the API when you need group operations across apps while the Groups UI remains Infra Ops scoped.

## Related docs

- [RBAC](/docs/stackgen/concepts/rbac)
- [Members](/docs/stackgen/setup/settings#members)
- [Navigating UI](/docs/stackgen/setup/stackgen-ui)
- [Microsoft Entra ID (Azure AD) OAuth](/docs/stackgen/support-and-kb/how-tos/entra)
- [v2026.8.4 User Groups and Entra ID Group Sync](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#user-groups-and-entra-id-group-sync)
