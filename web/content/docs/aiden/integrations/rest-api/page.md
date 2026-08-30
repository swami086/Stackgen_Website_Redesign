---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/integrations/rest-api"
sourceUrl: "https://docs.stackgen.com/aiden/integrations/rest-api"
status: "ok"
---

This unversioned path redirects to the Aiden 1.0 documentation. See the [Aiden 1.0 REST API integration](/docs/aiden/1.0/integrations/rest-api) page.

Connect Aiden with your custom REST API endpoints to extend its capabilities beyond standard integrations. Once configured, Aiden can interact with your external services, webhooks, and custom applications through natural language conversations, enabling seamless data exchange and workflow automation.

## Integration Capabilities

With REST API integration, Aiden can help you:

- Perform HTTP requests with versatile client functionality. Supports `GET`, `POST`, `PUT`, `DELETE`, and `PATCH` methods with custom headers, authentication, and payload management.
- Use dynamic variable substitution using `{{variable_name}}` syntax.
- Reuse endpoints with pre-configured API storage.
- Handle failures gracefully. Comprehensive error handling and timeout management.
- Call APIs flexibly. Direct API calls or customer-configured API templates

## Enable REST API Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the REST API Integration card.

3. Enter the integration configuration parameters:

![REST API](https://docs.stackgen.com/img/restapi.png)








   - **Title**: Name for your configuration.

   - **Description**: Short summary shown in lists and tooltips. Include details like Purpose, auth type, and expected result.

   - **URL**: Full endpoint URL Aiden will call. Use [variables in headers or body](https://restfulapi.net/resource-naming/) rather than embedding secrets in the URL.



     Security Best Practices





     - Never hardcode secrets in URL, headers, or payload; use variables mapped to a secure store.
     - Restrict who can view or edit configurations via Roles.
     - Use HTTPS and verify hostnames.
     - Log only non-sensitive request metadata in Aiden’s audit logs.
     - Check out the [OWASP API Security Top 10](https://owasp.org/API-Security/) best practices documentation.

   - **Method**: [HTTP verb](https://www.rfc-editor.org/rfc/rfc9110) used for the request. You can perform the following operations:
     - **GET**: Read data without modifying state.
     - **POST**: Create or submit data (webhooks, ticket creation).
     - **PUT**: Replace entire resource.
     - **PATCH**: Partially update a resource.
     - **DELETE**: Remove a resource.
   - **Headers**: Key-value pairs added to the request. For example:


     - **Authorization**: Bearer `{{ZENDESK_TOKEN}}`
     - **Content-Type**: `application/json`
     - **Idempotency-Key**: `{{uuid}}`

note

     - You can add multiple headers.
     - Use placeholders for [secrets](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication) and [dynamic values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers).

   - **Sample Payload**: Example request body Aiden will use as a template or for validation.
     - JSON recommended; form-encoded also possible if the endpoint requires it.

     - Supports variables with double curly braces, e.g., `{{user_id}}`, `{{email}}`, `{{input}}`.

     - **Examples**:


       - `Webhook (POST) { "event": "user.created", "user_id": "{{user_id}}", "email": "{{email}}", "source": "aiden" }`
       - `Create Zendesk Ticket (POST) { "ticket": { "subject": "{{subject}}", "comment": { "body": "{{description}}" }, "requester": { "email": "{{email}}" }, "priority": "{{priority}}" } }`
       - `Patch GitHub Issue (PATCH) { "title": "{{title}}", "body": "{{body}}", "state": "{{state}}" }`

note

You can use `{{variable}}` syntax for dynamic variables that Aiden will substitute when making the API call.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Call the `Customer Data API` configured endpoint with `customer_id` variable set to 12345.
- `POST` user registration data to the signup endpoint with email and password fields.
- Update product inventory via `PUT` request with quantity `{{new_quantity}}` variable.
- Execute the `Weather API` call for location `San Francisco` with 5 second timeout.

- [Integration Capabilities](/docs/aiden/1.0/integrations/rest-api#integration-capabilities)
- [Enable REST API Integration](/docs/aiden/1.0/integrations/rest-api#enable-rest-api-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/rest-api#sample-prompts)
