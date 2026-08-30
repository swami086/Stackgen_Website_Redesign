---
title: "Azure Ad Oauth2 Setup"
product: "observenow"
sourcePath: "/observenow/enterprise-configuration/azure-ad-oauth2-setup"
sourceUrl: "https://docs.stackgen.com/observenow/enterprise-configuration/azure-ad-oauth2-setup"
status: "ok"
---

ObserveNow Admin App can be configured to use Azure AD OAuth2 for Authentication and Authorization. This allows organizations using **Azure AD** (aka [**Microsoft Entra ID**](https://www.microsoft.com/en-in/security/business/microsoft-entra)) to manage user Identity and Access Management (IAM). To enable Azure AD based auth, please follow the following steps:

- On the [Azure Portal](https://portal.azure.com/) navigate to **Microsoft Entra ID** -\> **Manage** -\> **App Registrations** -\> **New Registration**
- Give a unique name, choose " _Single Tenant_" for **Supported Account Types**, and add the following URLs in redirect URLs:
  - `https://console.opsverse.io`
  - `https://console.opsverse.io/login/azuread`
- For the newly registered app, note the **Application (client) ID**, then click on Endpoints and note the **OAuth 2.0 authorization endpoint (v2)** and **OAuth 2.0 token endpoint (v2)** URLs
- Navigate to **Certificates & Secrets** and create a new Client Secret with a unique name. Keep expiry as high as possible. Note the **Value** of the new client-secret.
- Navigate to **App Roles.** The actual app roles might differ based on the set of StackGen tools being used. For example, in the case of ObserveNow, following are the recommended roles:
  - Grafana Viewer - Users/Groups - Viewer - Users with View Access
  - Grafana Editor - Users/Groups - Editor - Users with Edit Access
  - Grafana Admin - Users/Groups - Admin - Users with Admin Access
- Navigate to **Enterprise Applications** and search for your application. Within this application, you should be able to add Users/Groups and assign App Roles defined above to determine the level of access they should have.

To configure StackGen application to use this new Azure AD Config, login to the [StackGen Admin Console](https://console.opsverse.io/), navigate to the `Settings` page, enable Azure AD Authentication, and add the values for **Application (client) ID, OAuth 2.0 authorization endpoint (v2), OAuth 2.0 token endpoint (v2)** and\*\* Client-Secret \*\*which you created in the previous steps.

info

You can also work with the **StackGen Support Team** to configure your StackGen App instance to use Azure AD for authentication or if you have any other customization requirements.
