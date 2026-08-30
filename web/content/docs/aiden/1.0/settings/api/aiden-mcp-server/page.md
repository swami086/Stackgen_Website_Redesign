---
title: "Configure MCP Clients to Access Aiden"
product: "aiden"
sourcePath: "/aiden/1.0/settings/api/aiden-mcp-server"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/settings/api/aiden-mcp-server"
status: "ok"
---

Aiden can be embedded directly into external tools like [Claude Desktop](https://claude.ai/download), [Cursor](https://cursor.com/), or [Windsurf](https://windsurf.com/), allowing developers to interact with Aiden without ever leaving their preferred environments.

## Configure MCP Clients to Access Aiden

Follow these steps to configure MCP clients to access Aiden:

1. Log in to [StackGen Aiden](https://aiden.stackgen.com/).
2. Navigate to **Settings > API Keys > Create New API Key**.
3. In your MCP Client application, enter the MCP Server configuration as shown below.

### Claude Desktop

Click to view

1. In your Claude Desktop, navigate to **Settings > Developer > Local MCP Servers**.
2. Choose **Edit Config** and add the following in the `claude_desktop_config.json` file:

```json
  {

      "mcpServers": {

      "aiden": {

          "command": "npx",

          "args": [\
\
              "mcp-remote",\
\
              "https://aiden-mcp.stackgen.com/mcp",\
\
              "--header",\
\
              "Authorization: Bearer ${APIKEY}"\
\
              ],

              "env": {

              "APIKEY": "<APIKey>"

            }

          }

      }

  }
```

3. Restart Claude Desktop.

You should now see Aiden available under MCP Integrations.

![Claude](https://docs.stackgen.com/assets/images/claude-0dd5d25bc379c5ac64f99bceab343729.png)

Now, when you ask DevOps related queries or clarifications, Claude Desktop will be able to use Aiden to get contextual information grounded on both up-to-date information, as well as your organization’s internal knowledge base.

### Cursor

Click to view

1. In your Cursor Desktop, navigate to **Settings > Cursor Settings > Tools & Integration**.

2. Choose **New MCP Server** and add the following JSON:





```json
       {

     "mcpServers": {

       "aiden": {

         "url": "https://aiden-mcp.stackgen.com/mcp",

         "headers": {

           "Authorization": "Bearer <APIKEY>"

         }

       }

     }

}
```


You will see the Aiden tool available in the Cursor MCP Tools list.

![cursor](https://docs.stackgen.com/assets/images/cursor-c4375bac9cad1b3bab47e9a3ad1d6ee2.png)

Now, when you ask DevOps related queries or clarifications, Cursor will be able to use Aiden to get contextual information grounded on both up-to-date information, as well as your organization’s internal knowledge base.

### Windsurf

Click to view

1. In your Windsurf console, navigate to **Settings > Windsurf Settings > Cascade > Manage MCPs**.

2. Click **View Raw Config** and add the following config:





```json
       {

         "mcpServers": {

             "aiden": {

             "serverUrl": "https://aiden-mcp.stackgen.com/mcp",

             "headers": {

                 "Authorization": "Bearer <APIKEY>"

         }

       }

     }

}
```

3. Save the file and click **Refresh** on the Manage MCP Servers page.


You will see the Aiden tool available as a MCP Server.

![windsurf](https://docs.stackgen.com/assets/images/windsurf-a0105e7fe46efb66d7358ad96694e94a.png)

Now, when you ask DevOps related queries or clarifications, Windsurf will be able to use Aiden to get contextual information grounded on both up-to-date information, as well as your organization’s internal knowledge base.

### Other MCP Clients

Click to view

1. Define the server endpoint as `https://aiden-mcp.stackgen.com/mcp`.
2. Pass the authorization header as `Bearer <APIKEY>`.

You should be able to use Aiden tools, prompts, and resources.

## Connecting to a Self-Hosted / Private SaaS Aiden Instance

If your organization runs a self-hosted or Private SaaS Aiden instance, you can point the MCP server at it by passing the `X-Aiden-Base-Url` header in your MCP client configuration. This overrides the default `https://aiden.stackgen.com` endpoint.

```json
{

  "mcpServers": {

     "aiden": {

     "url": "https://aiden-mcp.stackgen.com/mcp",

     "headers": {

        "Authorization": "Bearer <APIKEY>",

        "X-Aiden-Base-Url": "https://your-aiden-instance.example.com"

      }

    }

  }

}
```

**Note**: This requires the Aiden endpoint to be accessible from the MCP Server

## Benefits

By integrating Aiden into your preferred development environments, you can:

- Access Aiden's capabilities without leaving your workflow.
- Leverage Aiden's knowledge and skills to enhance your development process.
- Receive contextual information grounded on both up-to-date information and your organization's internal knowledge base.

## Support

For additional support or questions about the Aiden API, please contact the support team at [support@stackgen.com](mailto:support@stackgen.com).

- [Configure MCP Clients to Access Aiden](/docs/aiden/1.0/settings/api/aiden-mcp-server#configure-mcp-clients-to-access-aiden)
  - [Claude Desktop](/docs/aiden/1.0/settings/api/aiden-mcp-server#claude-desktop)
  - [Cursor](/docs/aiden/1.0/settings/api/aiden-mcp-server#cursor)
  - [Windsurf](/docs/aiden/1.0/settings/api/aiden-mcp-server#windsurf)
  - [Other MCP Clients](/docs/aiden/1.0/settings/api/aiden-mcp-server#other-mcp-clients)
