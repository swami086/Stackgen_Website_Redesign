---
title: "Custom Module Management"
product: "stackgen"
sourcePath: "/docs/concepts/resources/custom-module/rbac-for-custom-modules"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/custom-module/rbac-for-custom-modules"
status: "ok"
---

Role-Based Access Control (RBAC) for Custom Modules provides structured access control for managing infrastructure components within StackGen. It enables organizations to define roles that determine who can create, modify, and share custom modules across personal workspaces, projects, and enterprises.

## Custom Module Management

The Custom Module system streamlines infrastructure provisioning, allowing users and projects to define reusable configurations. RBAC ensures that module creation and sharing align with organizational policies and governance structures.

## Access Scope and Permissions

Custom modules operate within three access scopes:

- **Enterprise Scope**: Both Admin and DevOps users at the enterprise level can create and share modules across all projects within the enterprise.
- **Project Scope**: Admin and DevOps users at the project level can create and manage modules for their specific project. This includes **appStack-owned** modules: **Project DevOps** can create them and publish updates to the appStack. See [Edit and Sync appStack-Owned Modules](/docs/stackgen/concepts/resources/custom-module/appstack-owned-module-updates).
- **Personal Workspace Scope**: Individual users with appropriate roles (Admin or DevOps) can create and manage modules within their private workspace.

### Role-Based Permissions

| Role | Create Custom Modules | Custom Module Versioning | Import Custom Modules | Share with Projects | Share with Enterprise | Read Access |
| --- | --- | --- | --- | --- | --- | --- |
| Developer | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| DevOps (Project) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Admin (Project) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| DevOps (Enterprise) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin (Enterprise) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Custom Module Creation and Sharing

### Create Custom Modules

You can create and configure custom modules directly within StackGen. The process includes:

#### Define Configuration

- Specifying a Resource Name and Resource Type
- Assigning a Version
- Providing a Terraform IaC configuration

#### Share Modules

- Selecting **Enterprise** to make the module available across all projects
- Selecting **Projects** to choose one or multiple projects for access
- Keeping in **Personal Workspace** for private use only

### Import Modules

Custom modules can be imported from external sources, such as:

- Git repositories
- Terraform code snippets

Imported modules can be configured and integrated into infrastructure workflows.

### Share Custom Modules

- **Personal Workspace Level**: Users can create modules for their own private use or choose to share them with projects or enterprise.
- **Project-Level Sharing**: DevOps and Admin users at the project level can share modules within their project.
- **Enterprise-Level Sharing**: DevOps and Admin users at the enterprise level can share modules across all projects, ensuring organization-wide consistency.

## Personal Workspaces

Personal workspaces are private environments that only the individual user can access. These workspaces function as independent projects where users have exclusive control over their resources. However, role-based permissions still apply in personal workspaces - users with Developer role cannot create custom modules even in their personal workspace, while users with Admin or DevOps roles can create and manage custom modules within their own workspace.

### Custom Modules in Personal Workspaces

Custom modules created within a personal workspace (by users with appropriate roles) can be:

- **Used privately**: Modules can be created for exclusive use by the user who created them
- **Shared selectively**: The creator can choose to share modules with specific projects or enterprise-wide
- **Kept isolated**: Modules can remain in the personal workspace without visibility to other users

This provides users with Admin or DevOps roles a private sandbox environment to experiment with infrastructure configurations before potentially sharing them more broadly.

## Override Mapping Policy

Override Mapping Policies are used within Cloud to Code and `tfstate` import to map resources to custom configurations. These policies can be included in a governance configuration to ensure that infrastructure deployments align with organizational standards.

### Key Features

- **Module References**: Override mapping policies can reference both built-in Terraform modules OR custom modules that have been imported.
- **Enterprise-Level Mapping**: Modules shared at the enterprise level can be referenced within override mapping policies created at the project level.
- **Governance Compliance**: Ensures consistency in infrastructure deployments across the organization.

### Scope Restrictions

- Override mapping policies need to be explicitly created at the project level to leverage enterprise-shared modules.
- Project-specific override mapping policies can reference enterprise-level custom modules.
- Custom modules are not automatically included in project policies without explicit mapping.

- [Custom Module Management](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#custom-module-management)
- [Access Scope and Permissions](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#access-scope-and-permissions)
  - [Role-Based Permissions](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#role-based-permissions)
- [Custom Module Creation and Sharing](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#custom-module-creation-and-sharing)
  - [Create Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#create-custom-modules)
  - [Import Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#import-modules)
  - [Share Custom Modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#share-custom-modules)
- [Personal Workspaces](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#personal-workspaces)
  - [Custom Modules in Personal Workspaces](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#custom-modules-in-personal-workspaces)
- [Override Mapping Policy](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#override-mapping-policy)
  - [Key Features](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#key-features)
  - [Scope Restrictions](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules#scope-restrictions)
