---
title: "Authentication"
product: "aiden"
sourcePath: "/aiden/1.0/settings/api/aiden-apis"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/settings/api/aiden-apis"
status: "ok"
---

The Aiden API provides comprehensive endpoints for interacting with the Aiden AI assistant, managing skills, integrations, and knowledge base context. All APIs are RESTful and return JSON responses.

**Base URL**: `https://aiden.stackgen.com/api`

## Authentication

### API Key Format

Aiden API uses API key authentication with the keys in the format `aiden-<key>`.

### Authorization Header

Include your API key in the Authorization header for all requests:

```json
Authorization: Bearer aiden-<key>
```

### API Key Management

- You can manage API keys through the [API Keys](https://aiden.stackgen.com/api-keys) page.
- Each API key is associated with a specific user and customer.
- Keep your API keys secure and never expose them in client-side code

## API Endpoints

All APIs are available under [https://aiden.stackgen.com/api](https://aiden.stackgen.com/api).

### 1\. Ask

Click to view

Send questions to Aiden and receive streaming responses.

#### POST `/v1/ask`

**Request Body**

```json
{

    "query": "string",

    "conversationId": "uuid" (optional)

}
```

**Response**: Streaming JSON response with the following fields:

```json
{

    "response": "string",

    "skill": {

        "id": "string",

        "name": "string"

    },

    "conversationId": "string",

    "interactionId": "string"

}
```

**Example**

```json
curl -X POST "https://aiden.stackgen.com/api/v1/ask" \

  -H "Authorization: Bearer aiden-<your_api_key>" \

  -H "Content-Type: application/json" \

  -d '{

      "query": "What is the current CPU usage of my EC2 instances?"

  }'
```

### 2\. Skills

Manage AI skills that define Aiden's capabilities.

#### GET `/v1/skills`

Click to view

Retrieve all available skills for the authenticated user.

**Query Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `include_global` | `boolean` | Include global skills (optional). |
| `include_disabled` | `boolean` | Include disabled skills (optional). |

**Response**

```json
{

  "skills": [\
\
    {\
\
        "id": "uuid",\
\
        "name": "string",\
\
        "description": "string",\
\
        "skill_steps": [\
\
          {\
\
            "agent": "string",\
\
            "action": "string",\
\
            "parameters": [{}]\
\
        }\
\
      ],\
\
      "is_enabled": "boolean",\
\
      "is_global": "boolean",\
\
      "created_at": "datetime",\
\
      "updated_at": "datetime"\
\
    }\
\
  ]

}
```

**Example**

```json
curl -X GET "https://aiden.stackgen.com/api/v1/skills?include_global=true" \

  -H "Authorization: Bearer aiden-<your_api_key>"
```

#### GET `/v1/skills/{id}`

Click to view

Retrieve details of a specific skill.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the skill. |

**Response**

```json
{

    "id": "uuid",

    "name": "string",

    "description": "string",

    "skill_steps": [\
\
        {\
\
          "agent": "string",\
\
          "action": "string",\
\
          "parameters": [{}]\
\
        }\
\
    ],

    "is_enabled": "boolean",

    "is_global": "boolean",

    "created_at": "datetime",

    "updated_at": "datetime"

}
```

**Example**

```json
curl -X GET "https://aiden.stackgen.com/api/v1/skills/550e8400-e29b-41d4-a716-446655440000" \

  -H "Authorization: Bearer aiden-<your_api_key>"
```

#### POST `/v1/skills`

Click to view

Create a new skill.

**Request Body**

```json
{

    "name": "string",

    "description": "string",

    "skill_steps": [\
\
        {\
\
            "agent": "string",\
\
            "action": "string",\
\
            "parameters": [{}]\
\
        }\
\
  ],

  "is_global": "boolean" (optional)

}
```

**Response**

```json
{

    "id": "uuid",

    "name": "string",

    "description": "string",

    "skill_steps": [\
\
        {\
\
            "agent": "string",\
\
            "action": "string",\
\
            "parameters": [{}]\
\
        }\
\
  ],

  "is_enabled": "boolean",

  "is_global": "boolean",

  "created_at": "datetime",

  "updated_at": "datetime"

}
```

**Example**

```json
curl -X POST "https://aiden.stackgen.com/api/v1/skills" \

  -H "Authorization: Bearer aiden-<your_api_key>" \

  -H "Content-Type: application/json" \

  -d '{

      "name": "AWS EC2 Instance Analyzer",

      "description": "Analyzes EC2 instances for performance and cost optimization",

      "skill_steps": [\
\
          {\
\
              "agent": "AWS Expert",\
\
              "action": "Fetch all EC2 instances and their details",\
\
              "parameters": [{}]\
\
          },\
\
          {\
\
              "agent": "AWS Expert",\
\
              "action": "Analyze instances for optimization opportunities",\
\
              "parameters": [{}]\
\
          }\
\
      ]

  }'
```

#### PATCH `/v1/skills/{id}`

Click to view

Update an existing skill.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the skill. |

**Request Body**

```json
{

    "name": "string" (optional),

    "description": "string" (optional),

    "skill_steps": [\
\
        {\
\
            "agent": "string",\
\
            "action": "string",\
\
            "parameters": [{}]\
\
        }\
\
    ] (optional),

    "is_enabled": "boolean" (optional),

    "is_global": "boolean" (optional)

}
```

**Response**

```json
{

    "id": "uuid",

    "name": "string",

    "description": "string",

    "skill_steps": [\
\
        {\
\
        "agent": "string",\
\
        "action": "string",\
\
        "parameters": [{}]\
\
        }\
\
  ],

  "is_enabled": "boolean",

  "is_global": "boolean",

  "created_at": "datetime",

  "updated_at": "datetime"

}
```

**Example**

```bash
curl -X PATCH "https://aiden.stackgen.com/api/v1/skills/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer aiden-<your_api_key>" \
  -H "Content-Type: application/json" \
  -d '{

    "name": "Updated AWS EC2 Instance Analyzer",

    "is_enabled": true

  }'
```

#### DELETE `/v1/skills/{id}`

Click to view

Delete a skill.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the skill. |

**Response**

```json
{

  "status": "OK"

}
```

**Example**

```bash
curl -X DELETE "https://aiden.stackgen.com/api/v1/skills/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer aiden-<your_api_key>"
```

### 3\. Integrations

Manage third-party service integrations.

#### GET `/v1/integrations`

Click to view

Retrieve all available integrations and current configurations.

**Response**

```json
  {

      "integrations": [\
\
      {\
\
          "name": "string",\
\
          "description": "string",\
\
          "is_enabled": "boolean",\
\
          "allow_multiple": "boolean",\
\
          "is_global": "boolean",\
\
          "icon": "string"\
\
      }\
\
    ],

    "configurations": [\
\
        {\
\
            "id": "uuid",\
\
            "integration_type": "string",\
\
            "parameters": "string",\
\
            "is_enabled": "boolean"\
\
        }\
\
    ]

}
```

**Example**

```bash
curl -X GET "https://aiden.stackgen.com/api/v1/integrations" \
  -H "Authorization: Bearer aiden-<your_api_key>"
```

#### GET `/v1/integrations/{id}`

Click to view

Retrieve details of a specific integration configuration.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the integration. |

**Response**

```json
{

    "id": "uuid",

    "integration_type": "string",

    "parameters": "string",

    "is_enabled": "boolean"

}
```

**Example**

```bash
curl -X GET "https://aiden.stackgen.com/api/v1/integrations/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer aiden-<your_api_key>"
```

#### POST `/v1/integrations`

Click to view

Create a new integration configuration.

**Request Body**

```json
{

    "integration_type": "string",

    "parameters": "object",

    "create_prebuilt_skills": "boolean"

}
```

**Response**

```json
{

    "id": "uuid",

    "integration_type": "string",

    "parameters": "object",

    "is_enabled": "boolean"

}
```

**Example**

```bash
curl -X POST "https://aiden.stackgen.com/api/v1/integrations" \
  -H "Authorization: Bearer aiden-<your_api_key>" \
  -H "Content-Type: application/json" \
  -d '{

    "integration_type": "AWS",

    "parameters": {

      "aws_access_key_id": "your_access_key",

      "aws_secret_access_key": "your_secret_key",

      "aws_region": "us-west-2"

    },

    "create_prebuilt_skills": true

  }'
```

#### PATCH `/v1/integrations/{id}`

Click to view

Update an existing integration configuration.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the integration. |

**Request Body**

```json
{

    "parameters": "object" (optional),

    "is_enabled": "boolean" (optional)

}
```

**Response**

```json
{

    "id": "uuid",

    "integration_type": "string",

    "parameters": "object",

    "is_enabled": "boolean"

}
```

**Example**

```bash
curl -X PATCH "https://aiden.stackgen.com/api/v1/integrations/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer aiden-<your_api_key>" \
  -H "Content-Type: application/json" \
  -d '{

    "parameters": {

      "aws_access_key_id": "updated_access_key",

      "aws_secret_access_key": "updated_secret_key",

      "aws_region": "us-east-1"

    },

    "is_enabled": true

  }'
```

#### DELETE `/v1/integrations/{id}`

Click to view

Delete an integration configuration.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `UUID` | Unique identifier of the integration. |

**Response**

```json
{

    "status": "OK"

}
```

**Example**

```bash
curl -X DELETE "https://aiden.stackgen.com/api/v1/integrations/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer aiden-<your_api_key>"
```

### 4\. Knowledge Base

Manage contextual information for personalized AI responses.

#### GET `/v1/context`

Click to view

Retrieve the current knowledge base context.

**Response**

```json
{

    "baseContext": "string"

}
```

**Example**

```bash
curl -X GET "https://aiden.stackgen.com/api/v1/context" \
  -H "Authorization: Bearer aiden-<your_api_key>"
```

#### POST `/v1/context`

Click to view

Create or update the knowledge base context. The system automatically processes the context into embeddings for semantic search.

**Request Body**

```json
{

    "baseContext": "string"

}
```

**Response**

```json
{

    "status": "OK"

}
```

**Example**

```bash
curl -X POST "https://aiden.stackgen.com/api/v1/context" \
  -H "Authorization: Bearer aiden-<your_api_key>" \
  -H "Content-Type: application/json" \
  -d '{

    "baseContext": "This is important knowledge for Aiden to use when answering questions. Our organization uses AWS EC2 instances in us-west-2 region primarily for web applications, and RDS for PostgreSQL databases."

  }'
```

## Best Practices

- **Security**: Always keep your API keys secure and rotate them regularly.
- **Rate Limiting**: Implement appropriate rate limiting in your applications.
- **Error Handling**: Handle HTTP error responses appropriately.
- **Context Management**: Keep your knowledge base context updated for better AI responses.
- **Skill Organization**: Use descriptive names and descriptions for skills.
- **Integration Testing**: Test integration configurations before enabling them.

## Support

For additional support or questions about the Aiden API, please contact the support team at [support@stackgen.com](mailto:support@stackgen.com).

- [Authentication](/docs/aiden/1.0/settings/api/aiden-apis#authentication)
  - [API Key Format](/docs/aiden/1.0/settings/api/aiden-apis#api-key-format)
  - [Authorization Header](/docs/aiden/1.0/settings/api/aiden-apis#authorization-header)
  - [API Key Management](/docs/aiden/1.0/settings/api/aiden-apis#api-key-management)
- [API Endpoints](/docs/aiden/1.0/settings/api/aiden-apis#api-endpoints)
  - [1\. Ask](/docs/aiden/1.0/settings/api/aiden-apis#1-ask)
  - [2\. Skills](/docs/aiden/1.0/settings/api/aiden-apis#2-skills)
  - [3\. Integrations](/docs/aiden/1.0/settings/api/aiden-apis#3-integrations)
  - [4\. Knowledge Base](/docs/aiden/1.0/settings/api/aiden-apis#4-knowledge-base)
