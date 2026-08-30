---
title: "Navigating to the Settings Page"
product: "stackgen"
sourcePath: "/docs/setup/settings"
sourceUrl: "https://docs.stackgen.com/docs/setup/settings"
status: "ok"
---

For Platform and DevOps Engineers

Important

With the July 2025 release, **Teams** has been renamed to **Projects** across the StackGen platform. This change reflects our broader vision of enabling cross-functional collaboration around infrastructure, code, and compliance workflows under clearly scoped project workspaces. All existing functionality remains the same and only the terminology has been updated to better align with how you organize and manage appStacks, modules, and cloud environments in real-world settings. You’ll now see **Projects** wherever **Teams** was previously referenced in the UI, CLI, and documentation.

The **Settings** page in StackGen provides a structured way to configure profile, user roles, security, collaboration, and governance.

## Navigating to the Settings Page

StackGen settings are split between the **User Menu** and **Enterprise Configuration** menus at the bottom of the left sidebar (see [Navigating UI](/docs/stackgen/setup/stackgen-ui#user-menu)).

**User Menu** (profile and personal access):

1. Click **User Menu** at the bottom of the sidebar.
2. Open **Profile details** for account information, or use links such as **Personal Access Tokens** from the same menu.

**Enterprise Configuration** (projects, members, secrets, and governance):

1. Click **Enterprise Configuration** at the bottom of the sidebar.
2. Open **All Projects**, **Members**, **Policy Management**, or **Governance Configurations** as needed.

You can still reach many of the same tasks from project scope. For example, open **Secret Store** from **Settings** while you work inside a project.

The StackGen settings page is grouped into the following sections:

- [Account](/docs/stackgen/setup/settings#account)
- [Project Management](/docs/stackgen/setup/settings#project-management)
  - [Members](/docs/stackgen/setup/settings#members)
  - [Projects](/docs/stackgen/setup/settings#projects)
  - [Notifications Channel](/docs/stackgen/setup/settings#notifications-channel)
  - [Projects Assigned](/docs/stackgen/setup/settings#projects-assigned)
  - [Secret Store](/docs/stackgen/setup/settings#secret-store)

Let's look at these sections in detail.

## Account

Click to view

- **Profile Details**: You can update personal information such as name, email, and company name. You can also choose a UI **theme** aligned with Aiden 2.0. See [Theme support](/docs/stackgen/setup/stackgen-ui#theme-support).
- **License Information**: You can find information about your **StackGen Tenant Id** here.
- **Personal Access Tokens (PATs)**: Generate and manage secure authentication tokens for API access and automation. To learn more about PATs, refer to the [Personal Access Token](/docs/stackgen/setup/pat) article.

note

You can enable sign-in with SSO (single sign-on with Microsoft Entra ID (Azure AD)), which is configured outside the Account section and outside the StackGen UI. To configure SSO, see [Configure Your Microsoft Entra ID (Azure AD) OAuth 2.0](/docs/stackgen/support-and-kb/how-tos/entra).

### Multiple authentication providers on a tenant

Where enabled, a tenant can allow more than one authentication provider at the same time (for example **Entra ID** for customer users and **Google** for invited collaborators). Each person signs in with a provider the tenant allows for them. The tenant admin still controls which providers are enabled. There is no bypass of tenant authentication policy.

Linking more than one provider to the same account (so PoC and production logins do not fork into separate tenants) is described in [v2026.7.7](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#multiple-authentication-providers). Tenant-level multi-provider and multi-tenant switching details are in [v2026.8.3](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multi-tenant-access-and-cross-domain-invites).

## Project Management

### Members

Click to view

StackGen onboards members via the **Org-specific IDs** used while logging-in to the platform. You can assign roles and Projects via the **Members** section.

### Invite teammates to a project by email

You can invite and add users to a **project** by email from the project membership UI, including people who have not signed up yet.

**What you can do**

- Invite a teammate by **email** and assign a **project role** before they log in.
- After they accept the invite, they land in the invited **project**.
- As the person who sent the invite, review users who are **invited** but have not joined or signed up yet.

**Why this matters**

Without email invite, an admin could not provision access until the teammate signed up first, then asked for access. Invite by email removes that back-and-forth.

See [v2026.7.3](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#invite-teammates-to-projects-by-email).

### Invite to a tenant across email domains

Where enabled, you can also **invite** people into a tenant even when their email **domain** differs from the tenant's usual domain. Use this when you need to add collaborators (for example StackGen CS or SE) without requiring them to join your corporate IdP first. Invited users still authenticate with a provider your tenant allows.

See [v2026.8.3](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multi-tenant-access-and-cross-domain-invites).

### User groups

Use **Groups** under user management to create groups, add users (and nested groups), and assign groups to projects with a role ( **Admin**, **DevOps**, or **Developer**). For Entra ID group sync caveats and API notes, see [User Groups](/docs/stackgen/concepts/rbac/user-groups).

See [v2026.8.4](/docs/stackgen/release-notes/aip/2026/august/v2026-8-4#user-groups-and-entra-id-group-sync).

To learn more about roles, refer to the article [RBAC Levels and Roles](/docs/stackgen/concepts/rbac#rbac-levels-and-roles).

For multi-tenant membership and switching, see [Tenant switching](/docs/stackgen/setup/stackgen-ui#tenant-switching).

### Projects

Click to view

Group users into **Projects** to streamline access control and collaboration. You will be able to view and manage Projects directly from the **Projects** page under **Settings**.

![Projects](https://docs.stackgen.com/assets/images/teamspage-40fb7aae7d7ac3a8bc6f995cc3f93123.jpg)

#### Create a Project

Project creation uses a guided onboarding flow. From the **Projects** page in **Settings**, you can define project details, members, **SCM**, **environments**, and **governance** before you finish.

To create a new project, follow these steps:

1. Click **\+ New Project**.
2. Enter the **Project Name** and **Project description**.
3. Add members if needed. By default, StackGen assigns the **Developer** role. Use **Role within Project** if you want to change the role before you continue.
4. Optional: use **Prefill from another project** if you want to copy settings from an existing project.
5. Continue through the guided steps for **SCM**, **environments**, **governance**, and **summary**.
6. Review the configuration and finish project creation.

![Create project and configure wizard step 1 of 5 with Prefill from another project optional section and project details fields](https://docs.stackgen.com/assets/images/apr26-project-onboarding-a22c2e8e2b0c91d7416bfe9293021b55.png)

note

If you skip optional onboarding steps, use the **Project Dashboard** setup guide to complete them later. For the full walkthrough, see [Create a Project with Guided Onboarding](/docs/stackgen/setup/project-onboarding).

#### Open StackBuilder Agent From a Project

![Assist Me](https://docs.stackgen.com/assets/images/assistmeprojects-2eb0fb7ef099990ea17561c16759dac9.png)

When you're done creating a project, you'll see an **Assist Me** link or click the clipboard icon to copy and open the link to the **StackBuilder Agent** for a specific project. You can create appStacks or run prompts that are project-specific using this link.

#### Modify a Project

To edit an existing project, add members (including invite by email), or edit their roles, follow these steps:

1. From the **Settings** page, navigate to **Projects** page.
2. From the list of available Projects, click the project that you want to edit.
3. Click Edit to modify the **Project** details.
4. Once finished, click **Done**.

#### Delete a Project

To delete a project, click the **ellipsis ⋮** icon next to the project under the **Actions** column, and click **Delete**

### Notifications Channel

Click to view

StackGen supports sending drift and appStack event notifications to external systems like Slack, Email, and Discord.

![Notifications Channel](https://docs.stackgen.com/assets/images/notificationschannels-b63cb4f1de4f3e6110b791df72a8533c.png)

#### Create a Notification Channel

Follow these steps to configure notification channels and subscribe your appStacks to them.

1. From the StackGen Home page, Navigate to **Settings > Notification Channels**.
2. Click **\+ Add new Notification Channel**.
3. Fill in the required fields:

- **Channel Name**: The name for your notification channel (e.g., `infra-alerts-slack`).
- **Channel Type**: Select the destination application (Slack, Email or Discord.).
- **Select Secret**: Choose from existing [secrets or add a new one](/docs/stackgen/setup/settings#secret-store) to authenticate the integration.
- Under Type of Events, choose the events this channel should receive alerts for:
  - **IaC Lifecycle Events**: The following ILM events are supported:

    - Plan
    - Apply
    - Drift
    - Destroy
  - **appStack Events**: The following appStack events are supported

    - Create
    - Update
    - Archive
    - Unarchive
    - Delete
    - Import
    - Export
- Under **Notify For**, select:

  - **All appStacks**: Receive alerts for every appStack.
  - **Selected appStacks**: Subscribe only to notifications from specific appStacks. All appStacks within the project are listed in the dropdown, and you can select one or multiple appStacks to subscribe to notifications.

4. Once done, click **Create Channel**.

You can view all the events that a particular channel is subscribed to under the **Events** column.

![Notified Events](https://docs.stackgen.com/assets/images/notifiedevents-6feebf417304bc31b229afaf8cbf8a62.png)

#### Delete a Notification Channel

Follow these steps to delete an existing **Notification Channel**:

1. From the StackGen Home page, Navigate to **Settings > Notification Channels**.
2. From the list of Notification Channels, click the **ellipses ⋮** icon under the **Actions** column for the channel you want to delete.
3. Click the bin **🗑️** to delete the channel.

### Projects Assigned

Click to view

The **Projects Assigned** dropdown lets you view the projects that you've been assigned to. Use this drop-down to switch between projects and create your infrastructure that is aligned with the policies and configurations assigned to the project.

#### Personal Workspace

You can still open and manage existing appStacks in a **Personal Workspace**.

- Creating a new **appStack** in a personal workspace is no longer supported from the UI.
- If you delete the last appStack in a personal workspace, StackGen redirects you to the first collaborative project you can access.

Use a shared **Project** for new work so governance, credentials, and team access apply from the start.

### Secret Store

Click to view

You can select a project from the **Projects** drop-down and then create the **Secret Store**.

![Secret Store](https://docs.stackgen.com/assets/images/secret-fca416a73ec08ff5c607ff451c1ea5f2.png)

The secret store lets you:

- Securely store sensitive credentials for your SCM provider.
- Share your secret store with your projects without compromising your credentials.
- Connect to external secret managers such as **AWS Secrets Manager** or **HashiCorp Vault** to reference secrets stored outside StackGen.

note

When you create secrets from a **personal workspace**, StackGen shows a warning so you confirm scope before you proceed. Prefer a shared **Project** for secrets that teams or production workflows should use.

See [v2026.7.7](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#personal-workspace-secrets-warning) for the personal workspace warning, [v2026.7.7](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-cloud-account-onboarding) for AWS assume role and access key auth, and [v2026.7.9](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#hashicorp-vault-external-secret-source) for HashiCorp Vault.

#### Types of Secret Stores

StackGen supports two types of secret stores:

1. [Internal Secret Store](/docs/stackgen/setup/settings#internal-secret-store)
2. [External Secret Store](/docs/stackgen/setup/settings#external-secret-store)

#### Internal Secret Store

Internal secrets are stored directly in StackGen and managed within the platform. These secrets are created and stored in StackGen's secure secret store.

![Create New Secret](https://docs.stackgen.com/assets/images/internalsecret-2f958c170fc9e10825c30cb98df677cd.png)

**To create an internal secret:**

1. From the StackGen Home page, navigate to **Settings > Secret Store**.
2. Click **\+ New Secret** under the **Internal Secrets** tab.
3. Fill in the required fields:
   - **Secret Name**: Enter a unique name to identify the secret.
   - **Secret Description**: Provide a description of what the secret is used for.
   - **Secret Type**: Select the type of secret (for example, AWS Cloud Provider, GitHub, or **CloudProvider: Azure (service principal)**).
   - **Scope**: Choose whether the secret is available to specific projects or the entire enterprise.
   - **Share with other projects (Optional)**: If sharing, select the projects that should have access to this secret.
4. Configure the secret-specific settings based on the selected secret type.

For **AWS EKS Cluster** secrets, the create form includes a **Setup Instructions** panel with step-by-step guidance and a sample **IAM** trust policy JSON so you can wire the secret correctly.

![Create New Secret form for AWS EKS Cluster with Setup Instructions panel and IAM trust policy JSON](https://docs.stackgen.com/assets/images/may26-secret-setup-instructions-770bd29e1f9f61aed22a44ed5b6c17c2.png)

For **AWS Cloud Provider** secrets:

- Choose one auth method. The UI separates **assume role** fields from **access key** fields so required inputs match the method you pick.
- **Assume role**: Provide the IAM role ARN and related trust policy settings. You can use any valid **IAM** role name when the trust policy is configured correctly for StackGen. A **`stackgen`** prefix on the role name is no longer required.
- **Access key**: Provide **access key ID** and **secret access key**.

See [v2026.7.7](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#aws-cloud-account-onboarding).

5. Click **Create Secret**.

![Create New Secret with Secret Type filter showing Azure DevOps and CloudProvider Azure service principal options](https://docs.stackgen.com/assets/images/apr26-azure-plan-deploy-4a280a2e1a82673ab83db4508409beb0.png)

Use the copy icon in the **Internal Secrets** table when you need the secret UUID for automation or integrations.

![Secret Store Internal Secrets table with copy icon and Copy Secret UUID tooltip](https://docs.stackgen.com/assets/images/apr26-copy-vault-uuid-f9565b4111ec4e5b1781d60508187775.png)

#### External Secret Store

External secrets are stored in third-party secret managers. StackGen connects to these systems to reference secrets without storing them locally, maintaining a single source of truth.

Supported external providers:

- **AWS Secrets Manager**
- **HashiCorp Vault** (first-cut support; test auth method, secret paths, and scale before production use)

Configure the connection in **StackGen** core secret settings. After it is connected, secrets from that store can be referenced from StackGen workflows (and from Aiden when your environment uses the same connection).

![Connect External Store](https://docs.stackgen.com/assets/images/externalsecret-fb27dd229594e580479144175671c7f4.png)

**To connect an external secret store:**

1. From the StackGen Home page, navigate to **Settings > Secret Store > External Secrets**.
2. Click **+New External Store**.
3. Fill in the details:
   - **Connection Name**: Enter a name to identify this external store connection.
   - **Description**: Provide a description of the connection.
   - **Provider Type**: Select **AWS Secrets Manager** or **HashiCorp Vault**.
4. Complete the provider-specific fields shown for that provider.
   - For **AWS Secrets Manager**, fields include **AWS Role ARN**, role session settings, optional **External ID**, **AWS Region**, and optional name or tag filters.
   - For **HashiCorp Vault**, complete the Vault connection fields shown in the UI for your auth method and secret paths.
5. Click **Connect External Store** to establish the connection.

Availability

HashiCorp Vault support is a first cut. Vault configurations vary. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager if you need guidance.

#### Linking External Secrets to Internal Secrets

You can reference an external secret from an external store within an internal secret by enabling the **Link external secrets** toggle. This allows you to use external secrets in your StackGen workflows while maintaining them in your external secret manager.

**To link an external secret to an internal secret:**

1. Create or edit an internal secret (follow the steps in [Internal Secret Store](/docs/stackgen/setup/settings#internal-secret-store)).
2. Enable the **Link external secrets** toggle.
3. Select the external store connection you want to link to.
4. The secret will now reference the external secret store, allowing you to use secrets from AWS Secrets Manager (or other supported providers) within StackGen without duplicating them.

note

Secrets will be created under the respective projects you select from the **Projects** drop-down while creating the secret store. For example, let's say you create a secret within **Project A** and share it with **Project B**, **C**, and **D**:

- If you navigate to **Project B** from the **Projects** drop-down and delete the shared secret via the ellipsis **⋮** icon under the **Actions** column, the secret will no longer be shared with **Project B** but will still be available under **Project** **A**, **C**, and **D**.
- If you delete the shared secret from **Project A**, it will also be deleted from **Projects B**, **C**, and **D**.

- [Navigating to the Settings Page](/docs/stackgen/setup/settings#navigating-to-the-settings-page)
- [Account](/docs/stackgen/setup/settings#account)
  - [Multiple authentication providers on a tenant](/docs/stackgen/setup/settings#multiple-authentication-providers-on-a-tenant)
- [Project Management](/docs/stackgen/setup/settings#project-management)
  - [Members](/docs/stackgen/setup/settings#members)
  - [Invite teammates to a project by email](/docs/stackgen/setup/settings#invite-teammates-to-a-project-by-email)
  - [Invite to a tenant across email domains](/docs/stackgen/setup/settings#invite-to-a-tenant-across-email-domains)
  - [User groups](/docs/stackgen/setup/settings#user-groups)
  - [Projects](/docs/stackgen/setup/settings#projects)
  - [Notifications Channel](/docs/stackgen/setup/settings#notifications-channel)
  - [Projects Assigned](/docs/stackgen/setup/settings#projects-assigned)
  - [Secret Store](/docs/stackgen/setup/settings#secret-store)
