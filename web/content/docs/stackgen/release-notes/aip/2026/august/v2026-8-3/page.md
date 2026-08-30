---
title: "Aiden Integration Parity, Chat Landing, Multi-Tenant Access, and Model Testing"
product: "stackgen"
sourcePath: "/docs/release-notes/aip/2026/august/v2026-8-3"
sourceUrl: "https://docs.stackgen.com/docs/release-notes/aip/2026/august/v2026-8-3"
status: "ok"
---

## Aiden Integration Parity, Chat Landing, Multi-Tenant Access, and Model Testing

The August 2026 weekly **v2026.8.3** release continues **Aiden 1.0** parity and customer-requested integrations: **New Relic**, **Dynatrace**, **Coralogix**, **FireHydrant**, **ServiceNow** as a first-class source, plus **Jenkins** and **Prisma Cloud**. It adds **alert payload** visibility for writing filters, promotes **chat** as a platform app and default workspace landing page, and adds a **model test** control when you onboard LLMs.

Tenancy and authentication keep moving forward: you can belong to **multiple tenants** under the same DNS namespace and switch between them, invite people into a tenant **regardless of email domain**, and use **multiple authentication providers** within a tenant. **Jira** intake for Aiden for DevOps gets multiple fixes. Validated open-source model guidance covers **DeepSeek** and **Kimi** options customers can consider.

Explore the sections below to see what's new, enhanced, and fixed in this update.

|  | Feature | Link |
| **What's New** | **Aiden** | [Aiden Integration Parity](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#aiden-integration-parity) |
| [Chat as Default Workspace Landing](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#chat-as-default-workspace-landing) |
| **Observability** | [Alert Payload for Filters](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#alert-payload-for-filters) |
| **LLMs** | [LLM Model Test on Onboarding](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#llm-model-test-on-onboarding) |
| **Platform** | [Multi-Tenant Access and Cross-Domain Invites](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multi-tenant-access-and-cross-domain-invites) |
| **What's Enhanced** | **Platform** | [Multiple Auth Providers Within a Tenant](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multiple-auth-providers-within-a-tenant) |
| **LLMs** | [Validated Open-Source LLM Guidance](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#validated-open-source-llm-guidance) |
| **What's Fixed** | **Aiden** | [Jira DevOps Intake Fixes](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#jira-devops-intake-fixes) |

## What's New

### Aiden Integration Parity

Click to view

We've expanded **Aiden** integrations for **Aiden 1.0** parity and customer requests, including first-class and onboarding-ready sources.

**Previously**, some observability, ITSM, and security tools that customers needed for Aiden 1.0 migrations or PoCs were missing or incomplete on the current Aiden path. **Now**, the following are available as integrations you can enable from Aiden (including onboarding flows where called out below).

**Key Features**

- **New Relic** \- Available and enabled in the Aiden onboarding and integrations experience.
- **Dynatrace** \- Available and enabled in the Aiden onboarding and integrations experience.
- **Coralogix** \- Available as an Aiden integration.
- **FireHydrant** \- Available as an Aiden integration.
- **ServiceNow** \- Available as a **first-class** source in Aiden.
- **Jenkins** \- Available as an Aiden integration (customer request).
- **Prisma Cloud** \- Available as an Aiden integration (customer request).

**Why It Matters**

Migration and demo work that depended on Aiden 1.0-style sources can move forward on the current platform without waiting for one-off enablement for these tools.

Read more in [New Relic](/docs/aiden/1.0/integrations/new-relic), [Dynatrace](/docs/aiden/1.0/integrations/dynatrace), [Coralogix](/docs/aiden/1.0/integrations/coralogix), [FireHydrant](/docs/aiden/1.0/integrations/firehydrant), [ServiceNow](/docs/aiden/1.0/integrations/servicenow), [Jenkins](/docs/aiden/1.0/integrations/jenkins), [Prisma Cloud](/docs/aiden/1.0/integrations/prismacloud), and [Supported Integrations](/docs/aiden/1.0/integrations/supported-integrations).

### Chat as Default Workspace Landing

Click to view

We've added **chat** as a **platform app** and as a **default landing page** for workspaces.

**Previously**, some customers landed on workspace settings or were pushed toward **Aiden for SRE** or **Aiden for DevOps** even when those apps did not match the use case. **Now**, workspace switching can open the **chat** interface, and you can create workspaces that use **chat** as the default app.

**Key Features**

- **Chat as a Platform App** \- Chat is available as a workspace-level app, not only inside SRE or DevOps flows.
- **Default Landing** \- Configure a workspace so users land on chat when they switch into that workspace.
- **Use-Case Fit** \- Support customers who need a general Aiden chat workspace without forcing SRE or DevOps app framing.

**Why It Matters**

Field and customer teams can demo and run Aiden for general assistant use cases without routing users through settings or an app they will not use.

Read more in [Access Aiden](/docs/aiden/1.0/accessaiden) and [Manage Workspaces](/docs/aiden/1.0/settings/workspaces).

### Alert Payload for Filters

Click to view

We've added **alert payload** detail so you can see the raw alert JSON when you write filters.

**Previously**, writing alert filters (for example JMESPath-style filters) was harder because you did not have the payload in view while you authored the filter. **Now**, open an alert to inspect the **alert payload** and use that JSON when you build or refine filters.

**Key Features**

- **Payload on Alert Detail** \- Open an alert to view the payload content.
- **Filter Authoring** \- Use the payload structure as the reference for filter expressions.

**Why It Matters**

You can write accurate alert filters against the real payload shape instead of guessing field names from memory.

Read more in [Alerts](/docs/aiden/1.0/aiden-sre/alerts).

### LLM Model Test on Onboarding

Click to view

We've added a **Test model** control when you onboard LLMs so you can confirm a model responds before you rely on it.

**Previously**, a model could appear in a provider list (for example through an OpenAI-compatible gateway such as OpenRouter) even when chat completion calls failed. **Now**, you can run a test from settings during onboarding. A successful test confirms the model responded. A failed test shows that API calls for that model are not working, so you can avoid activating a dead model.

**Key Features**

- **Test Before Activate** \- Use **Test model** while onboarding or configuring a model.
- **Success and Failure Feedback** \- See whether the model responded successfully or whether calls are failing.
- **Gateway Reality Check** \- Useful when a provider lists a model but chat completions no longer work for that model ID.

**Current Constraints**

- Re-opening an already saved model may not show the same test detail panel again. If you need to re-test, re-onboard the provider under a new name (current workaround called out in release validation).
- Mapping a model to task types in the UI remains single-select in this cut. Multi-select is a known follow-up. API or Terraform setup remains a workaround for broader assignment.

**Why It Matters**

Teams can stop adding models that list successfully but fail at runtime, before those models reach demos or customer workspaces.

Read more in [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#openai-compatible-llm-gateways).

### Multi-Tenant Access and Cross-Domain Invites

Click to view

Availability

Tenancy and authentication changes are rolling out gradually. Not every environment has multi-tenant switching enabled yet (for example some shared demo environments may still be single-tenant). Expect growing pains while this lands broadly. Contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager if you need enablement.

We've added the ability to belong to **multiple tenants** under the same DNS namespace and to invite people into a tenant **regardless of their email domain**.

**Previously**, getting StackGen or Aiden staff into a customer environment often meant joining the customer IdP (for example Entra), and shared demo tenants made it hard to keep isolated demo data. **Now**, where enabled, you can switch between tenants you belong to, and tenant admins can invite collaborators (for example CS or SE) directly in product without requiring the same email domain.

**Key Features**

- **Multi-Tenant Membership** \- One login under a DNS namespace can belong to more than one tenant. Switch enterprises or tenants from the UI when the feature is enabled for that environment.
- **Cross-Domain Invites** \- Invite users into a tenant even when their email domain differs from the tenant’s usual domain.
- **Org Admin vs User Affordance** \- The UI distinguishes org admin from regular user membership on the tenant switcher (icon difference).

**Why It Matters**

Field and CS teams can get isolated tenants for demos or PoCs, and customers can invite StackGen helpers into their tenant without IdP onboarding as the only path.

Read more in [StackGen Settings](/docs/stackgen/setup/settings#members) and [Navigating UI](/docs/stackgen/setup/stackgen-ui#tenant-switching).

## What's Enhanced

### Multiple Auth Providers Within a Tenant

Click to view

We've enhanced tenant authentication so a **single tenant** can allow **more than one** authentication provider.

**Previously**, **v2026.7.7** covered linking multiple providers to the same account so PoC and production logins did not fork into separate tenants. **Now**, a tenant can enable multiple providers side by side (for example **Google** for invited StackGen staff and **Entra ID** for the customer), and each person authenticates with the provider the tenant allows for them.

**Key Features**

- **Per-Tenant Multi-Provider** \- Enable more than one auth provider on the same tenant.
- **Invite Without Shared IdP** \- Customer admins can allow an alternate provider so invited collaborators sign in without joining the customer IdP.
- **Customer-Controlled Access** \- The customer still has to allow the provider path you will use. There is no bypass of tenant authentication policy.

**Current Constraints**

- Custom OAuth (client ID and secret) setup for some providers can still be a manual StackGen-assisted process. More self-serve auth configuration is planned.
- OTP-based and fuller self-serve PoC tenant flows called out as follow-ups are not the focus of this cut.

**Why It Matters**

PoCs and support engagements can mix customer SSO with an alternate login for invited helpers, without forcing everyone onto one IdP.

Read more in [Multiple Authentication Providers (v2026.7.7)](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#multiple-authentication-providers), [StackGen Settings](/docs/stackgen/setup/settings#account), and [Microsoft Entra ID (Azure AD) OAuth](/docs/stackgen/support-and-kb/how-tos/entra).

### Validated Open-Source LLM Guidance

Click to view

We've validated selected open-source LLM options for harder Aiden workloads and can point customers to models we are comfortable recommending from that testing.

**Previously**, teams asked which open-source models were safe to try with Aiden without a clear StackGen-tested shortlist. **Now**, validation work includes **DeepSeek** (including flash-class options called out in release reviews) and **Kimi** ( **Kimi K3** / related Kimi options discussed for customer use). Use these as guidance for customer conversations, not as a guarantee for every task type.

**Key Features**

- **Hard-Task Focused Validation** \- Testing focused on harder workloads, not only trivial prompts.
- **Customer Guidance** \- Field teams can share that these models were exercised in StackGen validation when customers ask about open-source options.

**Current Constraints**

- Validation is not a full certification matrix for every task type. Ask engineering for the analysis write-up when you need method detail.
- Always run **Test model** in your environment before you activate a model for demos or production.

**Why It Matters**

Customer and SE conversations about open-source LLMs can start from a short, StackGen-exercised list instead of untested model IDs.

Read more in [OpenAI-Compatible LLM Gateways](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#openai-compatible-llm-gateways) and [Access Aiden](/docs/aiden/1.0/accessaiden).

## What's Fixed

### Jira DevOps Intake Fixes

Click to view

We fixed multiple issues that blocked or degraded **Jira** as a trigger path for **Aiden for DevOps**.

Previously, Jira-backed DevOps ticket intake needed several reliability fixes to behave more like the Linear path shown in earlier demos. Jira intake for Aiden for DevOps works more reliably after these fixes.

Read more in Aiden for DevOps and [Jira](/docs/aiden/1.0/integrations/jira).

- [What's New](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#whats-new)
  - [Aiden Integration Parity](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#aiden-integration-parity)
  - [Chat as Default Workspace Landing](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#chat-as-default-workspace-landing)
  - [Alert Payload for Filters](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#alert-payload-for-filters)
  - [LLM Model Test on Onboarding](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#llm-model-test-on-onboarding)
  - [Multi-Tenant Access and Cross-Domain Invites](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multi-tenant-access-and-cross-domain-invites)
- [What's Enhanced](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#whats-enhanced)
  - [Multiple Auth Providers Within a Tenant](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#multiple-auth-providers-within-a-tenant)
  - [Validated Open-Source LLM Guidance](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#validated-open-source-llm-guidance)
- [What's Fixed](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#whats-fixed)
  - [Jira DevOps Intake Fixes](/docs/stackgen/release-notes/aip/2026/august/v2026-8-3#jira-devops-intake-fixes)
