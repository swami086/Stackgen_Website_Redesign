---
title: "Steps to Configure your Microsoft Entra ID (Azure AD) OAuth 2.0 [](/docs/stackgen/support-and-kb/how-tos/entra#steps-to-configure-your-microsoft-entra-id-azure-ad-oauth-20%20%22Direct%20link%20to%20Steps%20to%20Configure%20your%20Microsoft%20Entra%20ID%20(Azure%20AD) OAuth 2.0\")"
product: "stackgen"
sourcePath: "/docs/support-and-kb/how-tos/entra"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/how-tos/entra"
status: "ok"
---

This guide walks you through registering a new application in Microsoft Entra ID (formerly Azure Active Directory) to obtain the required OAuth 2.0 credentials: Client ID, Client Secret, and Token URL.

**Callback URL (Redirect URI):**

Use the following URL when configuring your application’s redirect settings:

```text
https://<domain>.cloud.stackgen.com/auth/callback
```

## Steps to Configure your Microsoft Entra ID (Azure AD) OAuth 2.0 [](/docs/stackgen/support-and-kb/how-tos/entra#steps-to-configure-your-microsoft-entra-id-azure-ad-oauth-20%20%22Direct%20link%20to%20Steps%20to%20Configure%20your%20Microsoft%20Entra%20ID%20(Azure%20AD) OAuth 2.0")

### Access the Microsoft Entra Admin Center

1. Go to the [Microsoft Entra Admin Center](https://entra.microsoft.com/) and sign in with an account that has permissions to manage applications.
2. In the left navigation pane, click **App registrations**.

### Register a New Application

1. Click **\+ New registration** at the top of the App registrations page.
2. On the **Register an application** page, enter the following details:

   - **Name:** Enter a descriptive name for your application (e.g., _Acme StackGen Integration_).
   - **Supported account types:** Select the option that aligns with your organization's needs (e.g., _Accounts in this organizational directory only_).
3. For now, leave the **Redirect URI** field empty.
4. Click **Register** to create the application.

### Retrieve the Client ID (Application ID) [](/docs/stackgen/support-and-kb/how-tos/entra#retrieve-the-client-id-application-id%20%22Direct%20link%20to%20Retrieve%20the%20Client%20ID%20(Application%20ID)")

After registering your application, you'll be directed to its Overview page.

- Look for the value labeled **Application (client) ID**, this is your OAuth 2.0 Client ID.
- Copy the `GUID` shown and store it somewhere safe, as you’ll need it when configuring authentication in StackGen.

### Configure the Callback URL (Redirect URI) [](/docs/stackgen/support-and-kb/how-tos/entra#configure-the-callback-url-redirect-uri%20%22Direct%20link%20to%20Configure%20the%20Callback%20URL%20(Redirect%20URI)")

The Callback URL tells Microsoft Entra ID where to send authentication responses after login.

If you haven’t already set this up:

1. In your application's left navigation menu, go to **Authentication**.
2. Click **\+ Add a platform** and select **Web**.
3. Under **Redirect URIs**, enter your redirect URL, for example:





```text
https://acme.cloud.stackgen.com/auth/callback
```

4. Click **Configure** to save your changes.

### Generate the Client Secret

The Client Secret is a crucial credential your application uses to authenticate with Microsoft Entra ID.

1. In your application's left sidebar, navigate to **Certificates & secrets**.

2. Under the **Client secrets** section, click **\+ New client secret**.

3. In the dialog that appears:
   - **Description:** Enter a descriptive name for the secret (e.g., _StackGen Secret_).
   - **Expires:** Choose an appropriate expiration period. _(Remember to renew the secret before it expires.)_
4. Click **Add**.



warning





   - Immediately copy the **Value** of the new secret. This value is displayed only once, right after creation.
   - Do **not** confuse the Value with the Secret ID.
   - Store it securely, as this is your OAuth 2.0 Client Secret. If you lose this value, you will need to generate a new client secret.

### Locate the Token URL (OAuth 2.0 Token Endpoint) [](/docs/stackgen/support-and-kb/how-tos/entra#locate-the-token-url-oauth-20-token-endpoint%20%22Direct%20link%20to%20Locate%20the%20Token%20URL%20(OAuth%202.0%20Token%20Endpoint)")

The Token URL is the endpoint used by your application to exchange an authorization code for an access token.

To find your Token URL:

1. Return to your application's **Overview** page in Microsoft Entra ID.

2. At the top, click **Endpoints**.

3. A pane will appear listing several service URLs.

4. Locate and copy the URL labeled **OAuth 2.0 token endpoint (v1)**.



note





Microsoft Entra ID provides two versions of token endpoints (v1.0 and v2.0). For StackGen integration, make sure you use the v1.0 endpoint:




| Endpoint Name | Example Format |
| --- | --- |
| OAuth 2.0 token endpoint (v1) | `https://login.microsoftonline.com/{tenant-id}/oauth2/token` |


Copy this URL and store it safely as this is the `Token URL` that your application will use.

### Configuring Group Claims

For detailed information, see the [Microsoft Docs: Configure group claims and app roles](https://learn.microsoft.com/en-us/security/zero-trust/develop/configure-tokens-group-claims-app-roles).

We recommend creating dedicated groups for StackGen platform access. StackGen defines three default roles:

- **Admin**
- **DevOps**
- **Developer**

Create these corresponding roles in Microsoft Entra ID, so you can map StackGen’s roles to your users or groups. These [roles can be assigned](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal?pivots=portal) to individuals or groups as required, giving appropriate access to your users on the StackGen platform.

For managing StackGen **user groups** in product (create groups, assign groups to project roles, and Entra group sync when enabled), see [User Groups](/docs/stackgen/concepts/rbac/user-groups). Group sync enablement is support-assisted today, and automatic membership sync is a follow-up.

![Entra ID App Roles](https://docs.stackgen.com/assets/images/entra1-b7da80fe61fba3b9070ed50169911f7f.png)

For more details on roles and their permissions, see the [StackGen Documentation](/docs/stackgen/concepts/rbac#user-assigned-roles).

### Update Token Configuration

To configure Group Claims in Token Configuration, follow these steps:

1. Navigate to the **Token configuration** section for your app registration in Microsoft Entra ID.
2. Click **Add groups Claim**.
3. In the dialog:
   - Check **Group ID** to include group identifiers in tokens.
   - Check **Emit groups as role claims** to emit groups in the `roles` claim format.
4. Save your Settings.

After saving, verify the configuration in the app registration's **Manifest** section. Look for the `optionalClaims` block or `accessTokens[].additionalProperties = [“cloud_displayname”,”emit_as_roles”]` to ensure the correct settings, specifically that `accessToken`, `idToken`, and `saml2Token` each have an entry similar to:

```json
    "optionalClaims": {

    "accessToken": [\
\
            {\
\
                "name": "groups",\
\
                "essential": false,\
\
                "source": null,\
\
                "additionalProperties": ["cloud_displayname", "emit_as_roles"]\
\
            }\
\
        ],

        "idToken": [\
\
            {\
\
                "name": "groups",\
\
                "essential": false,\
\
                "source": null,\
\
                "additionalProperties": ["cloud_displayname", "emit_as_roles"]\
\
            }\
\
        ],

        "saml2Token": [\
\
            {\
\
                "name": "groups",\
\
                "essential": false,\
\
                "source": null,\
\
                "additionalProperties": ["cloud_displayname", "emit_as_roles"]\
\
            }\
\
        ]

    }
```

This ensures group information will be included in tokens as expected for StackGen integration.

## Summary of Required Credentials

Please provide the following three values to your StackGen Support Representative to complete the OAuth 2.0 configuration:

| Credential | Label in Microsoft Entra ID | Location |
| --- | --- | --- |
| **Client ID** | Application (client) ID | Overview page |
| **Client Secret** | Value | Certificates & secrets page (copied on creation) |
| **Token URL** | OAuth 2.0 token endpoint (v1) | Endpoints pane |

- [Steps to Configure your Microsoft Entra ID (Azure AD) OAuth 2.0](/docs/stackgen/support-and-kb/how-tos/entra#steps-to-configure-your-microsoft-entra-id-azure-ad-oauth-20)
  - [Access the Microsoft Entra Admin Center](/docs/stackgen/support-and-kb/how-tos/entra#access-the-microsoft-entra-admin-center)
  - [Register a New Application](/docs/stackgen/support-and-kb/how-tos/entra#register-a-new-application)
  - [Retrieve the Client ID (Application ID)](/docs/stackgen/support-and-kb/how-tos/entra#retrieve-the-client-id-application-id)
  - [Configure the Callback URL (Redirect URI)](/docs/stackgen/support-and-kb/how-tos/entra#configure-the-callback-url-redirect-uri)
  - [Generate the Client Secret](/docs/stackgen/support-and-kb/how-tos/entra#generate-the-client-secret)
  - [Locate the Token URL (OAuth 2.0 Token Endpoint)](/docs/stackgen/support-and-kb/how-tos/entra#locate-the-token-url-oauth-20-token-endpoint)
  - [Configuring Group Claims](/docs/stackgen/support-and-kb/how-tos/entra#configuring-group-claims)
  - [Update Token Configuration](/docs/stackgen/support-and-kb/how-tos/entra#update-token-configuration)
