---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/model-context-protocol"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/model-context-protocol"
status: "ok"
---

Connect Aiden with your Model Context Protocol (MCP) server to enable intelligent model context exchange and AI-driven orchestration between systems. Once enabled, Aiden can communicate with your MCP-compatible services to fetch model metadata, execute contextual tasks, and streamline model-based workflows using natural language commands.

## Integration Capabilities

- Integrate with remote SSE-based MCP servers.

- **Manage Multiple MCP Configurations**: You can configure multiple MCP connections within StackGen to work with different MCP servers in parallel. This is useful when you need to:


  - Connect to different MCP servers for different teams or environments.
  - Maintain separate configurations for development, staging, and production.
  - Support multiple projects with distinct MCP requirements.

Each MCP configuration operates independently, so you can add, modify, or remove configurations without affecting your other connections. Aiden automatically switches between MCP configurations as needed based on your current context and requirements.

## Enable MCP Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel on the left.

2. Hover and click the **Activate** button on the Model Context Protocol (MCP) Integration card.

3. Enter the integration configuration parameters:



![MCP](https://docs.stackgen.com/assets/images/mcp-2d299bb7155502da9e203ea85054cb48.png)










   - **URL**: The endpoint of your MCP server.

   - **Server Name**: A unique identifier or friendly name for your MCP server connection.

   - **Additional Configuration** (Optional): You can provide JSON or key-value pairs for advanced configuration parameters, such as timeout limits, authentication modes, or custom endpoints such as:





     ```json
     { "timeout": 30, "authMode": "Bearer" }
     ```








     - **Description**: Provide a brief description of the MCP instance or its intended usage within your environment. For example, `Used for model context synchronization between DevOps and Aiden environments.`
     - **Headers**: Add any custom HTTP headers required by your MCP server. Use the **\+ Add Headers** button to include one or more key-value pairs.

       - **Key**: The header name. For example, `Authorization`.
       - **Value**: The header value or token. For example, `Bearer <your-access-token>`.
4. Click **Save** to enable the integration.

5. To configure additional MCP connections, click **\+ Add New Configuration** and follow steps 3-4.



![Configure Multiple MCP](https://docs.stackgen.com/assets/images/mcpmultiple-8059ab7008453cbba117634e5d97260e.png)


Once configured, Aiden will automatically establish a connection with your MCP server and begin exchanging contextual model data to improve task understanding and response precision.

## Additional References

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)

## Limitations

- This integration supports only SSE-based MCP servers; `StreamableHTTP` is not yet supported.
- The StackGen Aiden MCP integration currently supports only Tools. Prompts and Resources are not supported at the momemt.
