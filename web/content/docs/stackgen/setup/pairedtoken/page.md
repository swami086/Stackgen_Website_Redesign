---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/setup/pairedtoken"
sourceUrl: "https://docs.stackgen.com/docs/setup/pairedtoken"
status: "ok"
---

Paired API tokens are a powerful feature that allows you to create secondary tokens linked to your Personal Access Token (PAT). This is particularly useful for automated systems and credential rotation scenarios where you need to maintain a long-lived master token while regularly rotating the tokens used for actual API operations.

Think of it this way: your Personal Access Token is like a master key that you keep secure and rarely use, while the paired token is a working key that you can rotate more frequently without affecting your master key.

## Overview

Stackgen provides two endpoints for managing paired API tokens:

`<stackgen_url>/appcd/api/v1/auth/pairedApiKey`

- `POST`: Create (or regenerate) a paired Personal Access Token (PAT) with a new TTL. The created token is returned in the response.
- `DELETE`: Remove the currently associated paired PAT token.

## How Paired Tokens Work

A token returned from the `POST` endpoint is always associated with the token used to make the request. This means the paired token inherits the permissions and scope of the Personal Access Token that created it.

**Important limitations:**

- A token can only have one paired token at a time
- Calling the `POST` endpoint multiple times with the same token will invalidate the previous returned token and create a new one
- The paired token is completely dependent on its parent PAT—if the PAT is invalidated, the paired token becomes unusable

note

Regenerating or Deleting a token via the Stackgen UI will invalidate all tokens (including the paired token) associated with the token being regenerated. This is a safety feature to ensure that when you rotate your master token, all associated credentials are also rotated.

## API Token Behavior

Understanding how paired tokens behave will help you use them effectively in your workflows:

**Creating a Paired Token:**

- Calling the `POST` endpoint generates a new paired API token for the current personal access token used in the request.
- The new paired token will have the TTL (Time To Live) that you specify in the request body.


note





Creating a new paired token does not modify the TTL of the calling Personal Access Token (PAT); the TTL of a PAT is locked when it is created. This means you can create short-lived paired tokens from a long-lived PAT, giving you flexibility in your security strategy.


**Regenerating a Paired Token:**

- If a paired token already exists when you call `POST`, the system automatically handles the rotation:
  - The existing paired token is immediately invalidated and removed (it will no longer work for API calls)
  - A new paired token is created with the TTL you specify
  - This happens atomically, so there's no window where you have two valid paired tokens

**Deleting a Paired Token:**

- Calling the `DELETE` endpoint removes the currently associated paired token, if one exists.
- When you call the delete endpoint, the personal access token used for the request remains completely valid and unaffected. Only the associated paired token is invalidated.
- This is useful when you want to revoke access for automated systems without affecting your master token.

## Common Use Cases and Sample Flows

Here are practical scenarios that demonstrate how paired tokens can solve real-world problems:

### Use Case 1: Automated System with Rotating Credentials

**Scenario:** You're a DevOps engineer setting up an automated system that needs to make API calls to Stackgen, but you want to implement regular credential rotation for security compliance.

**The Flow:**

1. **Initial Setup:** You create a Personal Access Token (PAT) with a long expiration (e.g., 1 year) and store it securely in a secrets manager like AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault. This is your master token that you'll rarely touch.

2. **First Paired Token Creation:** Your automated system retrieves the PAT from the secrets manager and uses it to call the `POST` endpoint, creating a new paired token with a 30-day TTL. This gives you a working token that expires relatively soon.

3. **Using the Paired Token:** The automated system stores the newly issued paired token securely and uses it for all authenticated API calls to Stackgen. This token is what your CI/CD pipelines, monitoring systems, or other automation actually use.

4. **Credential Rotation:** When it's time to rotate credentials (either on a schedule or in response to a security event), the automated system uses the PAT to call the `DELETE` endpoint, which invalidates and removes the previously issued paired token. Then it immediately calls `POST` again to create a fresh paired token.


**Why This Works:** This approach enforces strict security by allowing you to manually control when paired tokens are rotated while keeping the PAT secure for long-term use. The PAT never needs to be rotated unless you want to change it, but you can rotate the paired token as frequently as your security policy requires.

### Use Case 2: Refreshing a Paired Token Before Expiration

**Scenario:** You're a developer managing a production system that uses a paired token. You want to refresh the token before it expires to ensure continuous operation without service interruption.

**The Flow:**

1. **Initial State:** You have a Personal Access Token (PAT) and an associated paired token that's currently being used by your production systems.

2. **Secure Storage:** You store the PAT securely for long-term use (e.g., in AWS Secrets Manager, Azure Key Vault, or another secure storage solution). This token has a long expiration and serves as your master credential.

3. **Proactive Token Refresh:** Prior to the expiration of the existing paired token (e.g., 7 days before expiration), an automated process:
   - Retrieves the PAT from your secure storage
   - Calls the `POST` endpoint using the PAT to generate a new paired token with an updated TTL
   - Extracts the new token from the response
   - Stores the new token securely, replacing the original stored token in your secrets manager
4. **Graceful Transition:** This approach allows existing processes using the previous paired token to continue functioning without interruption until they naturally restart or refresh their credentials. Meanwhile, any newly started processes automatically retrieve the updated paired token from the configured secret store.


**Why This Works:** By refreshing the token before expiration, you avoid service disruptions. The old token remains valid until processes naturally pick up the new one, ensuring zero downtime during credential rotation.

note

Creating a new paired token does not modify the TTL of the calling Personal Access Token (PAT); the PAT enforces its own expiration independently. This means you can create multiple paired tokens over time from the same long-lived PAT.

## Create or Regenerate a Paired Token

Use this endpoint to create a new paired token or regenerate an existing one. If a paired token already exists for your Personal Access Token, it will be automatically invalidated and replaced with the new one.

**Endpoint**: `POST /appcd/api/v1/auth/pairedApiKey`

### Request Details

**Authentication:** You must authenticate this request using a valid Stackgen Personal Access Token. Include it in your request as a cookie (see the curl example below) or as an Authorization header, depending on your API client configuration.

**Request Body**

The request body is a JSON object with a single required field:

```json
  {

      "ttl": "2026-06-10T16:56:03.081Z"

  }
```

**Request Parameters:**

- `ttl` (required, string): The Time To Live (TTL) for the paired token. This must be an ISO 8601 formatted date-time string indicating when the token should expire. The date must be in the future and cannot be more than one year from the current date.

note

- TTL must be less than one year from the current date. This is a security measure to ensure tokens don't remain valid for excessive periods.
- The request must be authenticated using a valid Stackgen personal access token. Without proper authentication, the request will fail with an authentication error.

### Response Details

Upon successful creation, the endpoint returns a JSON object containing the newly created paired token and its metadata:

```json
{

      "apiKeyName": "rotatingToken",

      "description": "This is a demo token to show token refresh capabilities",

      "ttl": "2026-06-10T16:56:03.081Z",

      "sessionType": "apiKey",

      "createdAt": "2025-12-10T16:56:03.18388Z",

      "apiKey": "stackgen_H8m3NmyIbGk7b4ZFDvWNPU30UPaaRqyLDtk6"

}
```

**Response Fields:**

| Field Name | Type | Description |
| --- | --- | --- |
| `apiKeyName` | string | The name assigned to this paired token. This is typically set automatically by the system. |
| `description` | string | A human-readable description of the token's purpose. This helps you identify the token's use case when managing multiple tokens. |
| `ttl` | string | The expiration date and time for the token in ISO 8601 format. After this time, the token will no longer be valid for authentication. |
| `sessionType` | string | The type of session this token represents. For paired tokens, this will always be `"apiKey"`. |
| `createdAt` | string | The timestamp when the token was created, in ISO 8601 format. This is useful for tracking token age and rotation schedules. |
| `apiKey` | string | **This is the actual token value you'll use for authentication.** Store this securely immediately, as it's only returned once in this response. If you lose it, you'll need to create a new paired token. |

warning

**Important:** The `apiKey` field in the response contains the actual token value. Make sure to store this securely as soon as you receive it. This token will not be shown again, and you'll need to create a new paired token if you lose it.

### Example Request

Here's a complete example using `curl`:

```curl
    curl --request POST \

      --url https://<stackgen_url>/appcd/api/v1/auth/pairedApiKey \

      --header 'Content-Type: application/json' \

      --cookie appcd_session=stackgen_H8m3NmyIbGk7b4ZFDvWNPU30UPaaRqyLDtk6 \

      --data '{

        "ttl": "2026-06-10T16:56:03.081Z"

      }'
```

Replace `<stackgen_url>` with your actual Stackgen instance URL, and replace the `appcd_session` cookie value with your valid Personal Access Token.

## Delete a Paired Token

Use this endpoint when you need to revoke a paired token, such as during a security incident, when rotating credentials, or when you no longer need the automated system that was using it.

**Endpoint**: `DELETE /appcd/api/v1/auth/pairedApiKey`

### Request Details

**Authentication:** You must authenticate this request using a valid Stackgen Personal Access Token. The paired token associated with this PAT will be deleted.

**Request Body:** This endpoint does not require a request body. The paired token to be deleted is determined by the Personal Access Token used for authentication.

**What Happens:**

- The paired API token associated with the Personal Access Token passed in the request is immediately invalidated and removed
- The Personal Access Token used for the request remains completely valid and unaffected
- Any systems currently using the deleted paired token will receive authentication errors on their next API call
- You can create a new paired token at any time by calling the `POST` endpoint again

note

Deleting a paired token is a one-way operation. Once deleted, the token cannot be recovered. If you need to use a paired token again, you'll need to create a new one using the `POST` endpoint.

### Example Request

Here's a complete example using `curl`:

```curl
  curl --request DELETE \

    --url https://<stackgen_url>/appcd/api/v1/auth/pairedApiKey \

    --header 'Content-Type: application/json' \

    --cookie appcd_session=stackgen_H8m3NmyIbGk7b4ZFDvWNPU30UPaaRqyLDtk6
```

Replace `<stackgen_url>` with your actual Stackgen instance URL, and replace the `appcd_session` cookie value with your valid Personal Access Token.

- [Overview](/docs/stackgen/setup/pairedtoken#overview)
- [How Paired Tokens Work](/docs/stackgen/setup/pairedtoken#how-paired-tokens-work)
- [API Token Behavior](/docs/stackgen/setup/pairedtoken#api-token-behavior)
- [Common Use Cases and Sample Flows](/docs/stackgen/setup/pairedtoken#common-use-cases-and-sample-flows)
  - [Use Case 1: Automated System with Rotating Credentials](/docs/stackgen/setup/pairedtoken#use-case-1-automated-system-with-rotating-credentials)
  - [Use Case 2: Refreshing a Paired Token Before Expiration](/docs/stackgen/setup/pairedtoken#use-case-2-refreshing-a-paired-token-before-expiration)
- [Create or Regenerate a Paired Token](/docs/stackgen/setup/pairedtoken#create-or-regenerate-a-paired-token)
  - [Request Details](/docs/stackgen/setup/pairedtoken#request-details)
  - [Response Details](/docs/stackgen/setup/pairedtoken#response-details)
  - [Example Request](/docs/stackgen/setup/pairedtoken#example-request)
- [Delete a Paired Token](/docs/stackgen/setup/pairedtoken#delete-a-paired-token)
  - [Request Details](/docs/stackgen/setup/pairedtoken#request-details-1)
  - [Example Request](/docs/stackgen/setup/pairedtoken#example-request-1)
