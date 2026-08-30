---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/rbac"
sourceUrl: "https://docs.stackgen.com/docs/concepts/rbac"
status: "ok"
---

For Platform and DevOps Engineers

Important

With the July 2025 release, **Teams** has been renamed to **Projects** across the StackGen platform. This change reflects our broader vision of enabling cross-functional collaboration around infrastructure, code, and compliance workflows under clearly scoped project workspaces. All existing functionality remains the same and only the terminology has been updated to better align with how you organize and manage appStacks, modules, and cloud environments in real-world settings. You’ll now see **Projects** wherever **Teams** was previously referenced in the UI, CLI, and documentation.

## Overview

StackGen provides robust Role-Based Access Control (RBAC) and Governance features, enabling you to enforce security, compliance, and operational consistency across multiple projects and cloud environments. This document outlines StackGen’s RBAC model and governance capabilities in a user-friendly manner for Admins, DevOps Engineers, and Developers.

## RBAC Levels and Roles

RBAC in StackGen ensures that only authorized users have access to infrastructure as code (IaC) resources and operations. The model is structured across different levels, namely **Enterprise**, **Projects** and **User**. Let's understand how RBAC permissions are scoped across these following levels:

### Project Assigned Roles

| Level | Permissions |
| --- | --- |
| **Admin/Devops** | - Admin and DevOps users can create governance configurations within a Project.<br>- Admin and DevOps users can enforce governance configurations for their assigned projects.<br>- Developers have limited access and cannot modify governance settings. |
| **Developer** | Developers can create and manage their own appStacks and repositories but cannot assign governance policies. |

### User Assigned Roles

A user in StackGen, depending on the tasks performed, can be assigned one of the following roles:

| Role | Description |
| --- | --- |
| **Admin** | - Full control over project creation and membership.<br>- Full control over governance configurations and assigning governance to projects to enforce security rules.<br>- Can manage user roles.<br> Examples: <br>- A governance configuration that enforces using specific IAM-permissions for accessing an S3 bucket<br>- A governance configuration that only allows developers to use specific AWS resources. |
| **DevOps** | Full control over governance configurations and assigning governance to projects to enforce security rules. |
| **Developer** | Basic access to resources within their workspace but cannot modify governance settings or access control policies. In **Topology**, Developer users can view files, but manual add actions in the files pane remain limited to **Admin** and **DevOps** users. |

### Enterprise Wide Sharing

You can manage policies and modules at the enterprise level, thus ensuring that they are shared across projects.

## User Groups

For enterprise-scale project access, create **user groups**, optionally nest groups, and assign a group to a project with a role ( **Admin**, **DevOps**, or **Developer**). You can sync groups from **Microsoft Entra ID** when StackGen enables that capability for your tenant.

See [User Groups](/docs/stackgen/concepts/rbac/user-groups) for steps, API notes, and current Entra sync limitations.

## Key Advantages of RBAC

Let's see how RBAC in StackGen can be applied to various user roles and across levels:

- **Custom IAM Policy Enforcement**: StackGen enables role-based access to cloud resources by enforcing IAM (Identity and Access Management) policies. This lets your Admin and DevOps users assign policies that restrict access to specific resources based on user roles.
- **Policy enforcement**: Security and compliance policies are enforced at different levels (Organization, Project, User). Thus ensuring that the Developers have limited access, ensuring they cannot override security policies set by Admin and DevOps users.
- **Governance configuration**: Admin and DevOps users can define and apply governance configurations to enforce security and compliance across projects. These governance rules ensure that your Infrastructure-as-Code (IaC) adheres to your organizational security policies.

## Assign Roles to Users (Members) Onboarded to StackGen [](/docs/stackgen/concepts/rbac#assign-roles-to-users-members-onboarded-to-stackgen%20%22Direct%20link%20to%20Assign%20Roles%20to%20Users%20(Members) Onboarded to StackGen")

By default, StackGen assigns the role of **Developer** to a user (member) that's onboarded to the platform. Administrators can change the default assignments by following these steps:

1. From the StackGen Home page, click the profile dropdown and select **Settings**.
2. Click **Members**.
3. You can select one or many users from the list. You can search for user(s) via the **Search bar** and refine your search by using the **Role** dropdown.
4. You can select the **Change Roles** option by either clicking the:
   - **More Actions** dropdown to change role assignments for multiple users.
   - The **ellipsis ⋮** icon under **Actions** column for a single user.
5. Select the roles that you want to assign to the users(s).
6. Click **Change Role**.

- [Overview](/docs/stackgen/concepts/rbac#overview)
- [RBAC Levels and Roles](/docs/stackgen/concepts/rbac#rbac-levels-and-roles)
  - [Project Assigned Roles](/docs/stackgen/concepts/rbac#project-assigned-roles)
  - [User Assigned Roles](/docs/stackgen/concepts/rbac#user-assigned-roles)
  - [Enterprise Wide Sharing](/docs/stackgen/concepts/rbac#enterprise-wide-sharing)
