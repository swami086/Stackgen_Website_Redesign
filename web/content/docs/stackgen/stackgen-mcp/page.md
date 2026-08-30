---
title: "StackGen MCP Capabilities"
product: "stackgen"
sourcePath: "/docs/stackgen-mcp"
sourceUrl: "https://docs.stackgen.com/docs/stackgen-mcp"
status: "ok"
---

The **Model Context Protocol (MCP)** lets assistants in **Claude**, **Cursor**, **VS Code**, and similar tools call StackGen APIs through a standard tool list. You authenticate with a [StackGen personal access token (PAT)](/docs/stackgen/setup/pat) and either run the CLI locally ( **STDIO**) or connect to StackGen over HTTPS ( **SSE**).

This guide covers how those modes differ, how **Admin (Producer)** and **User (Consumer)** MCP differ, and exact configuration for common IDEs. Replace every sample URL and token placeholder with values from **your** StackGen tenant.

## StackGen MCP Capabilities

- **Live context**: Models can read current infrastructure and project state from StackGen instead of guessing.
- **Actions in-product**: Approved operations (see [Admin vs User MCP](/docs/stackgen/stackgen-mcp#admin-mcp-and-user-mcp-sse)) run against the same APIs as the UI, within the PAT's permissions. That includes **create** and **delete** for custom modules at **appStack-owned** or **tenant** scope on Admin MCP. See [Custom module create and delete](/docs/stackgen/mcp/mcp/mcp-capabilities#custom-module-create-and-delete).
- **appStack snapshots**: On the **User** MCP side, assistants can work with **appStack snapshots** so you can inspect history and restore previous states from the IDE.
- **Environment configuration updates**: Supported clients can add or remove **appStack** environment configurations and **S3** state backends through MCP.
- **One integration pattern**: The same MCP idea works across clients; only the config file shape changes.
- **Authenticated access**: Every call is tied to the PAT you configure. (see [Tools match your token](/docs/stackgen/stackgen-mcp#tools-match-your-token) section).

The **UI** still creates snapshots automatically for normal appStack edits. Over **MCP**, snapshot actions are prompt-driven. If you want a specific save point before an assistant-driven change, create one explicitly. For product behavior after setup, see [appStack Snapshots](/docs/stackgen/concepts/appstacks/manageappstacks/snapshots) and [Environment Configurations](/docs/stackgen/concepts/environment-configurations).

## STDIO vs SSE

|  | **STDIO** | **SSE** |
| --- | --- | --- |
| **Mechanism** | The IDE (or Claude CLI) starts **`stackgen mcp`** on your machine. The StackGen [CLI](/docs/stackgen/cli-guide/get-started/install-and-uninstall) hosts the MCP session. | The IDE opens HTTPS connections to StackGen MCP routes. No local `stackgen mcp` process is required for that path. |
| **Typical config** | One server entry (for example `stackgen-mcp`) in Claude, VS Code, or Cursor. | Two server entries: **`stackgen-admin`** and **`stackgen-user`** ( [Cursor](/docs/stackgen/stackgen-mcp#sse-config-cursor), [VS Code](/docs/stackgen/stackgen-mcp#sse-configuration-in-visual-studio-code)). |
| **Extra tooling** | Installing [`cloud2code`](/docs/stackgen/cli-guide/cloud2code/install) can expose additional tools on this path. | Available tools still depend on your PAT's role and permissions. |

### Admin MCP and User MCP (SSE) [](/docs/stackgen/stackgen-mcp#admin-mcp-and-user-mcp-sse%20%22Direct%20link%20to%20Admin%20MCP%20and%20User%20MCP%20(SSE)")

For **SSE**, StackGen exposes separate endpoints so **platform and module work** stays distinct from **appStack and topology work**. The **STDIO** path is a **single** local server unless you add more entries yourself.

|  | **Admin MCP** (Producer) | **User MCP** (Consumer) |
| --- | --- | --- |
| **Personas** | Admin, DevOps | Developer |
| **Purpose** | Projects, policies, custom modules, secrets | appStacks, topology (resources), snapshots |
| **Examples** | List projects, list policies, scan / create / delete custom modules, list secrets | List or create appStacks, add, delete, or configure resources, get or restore snapshots |
| **Prompts** | Depends on client and token | In supported clients, prompts such as **Create Infrastructure** |

**Rule of thumb:** use the **Admin** URL for **governance and module lifecycle**. Use the **User** URL for **work inside an appStack or on the canvas**.

#### Tools match your token

note

StackGen **registers only tools your PAT may invoke**. If you point the **Admin** MCP URL at a **Developer** PAT, the tool list will be **smaller** than with an **Admin** or **DevOps** PAT on the same URL. Use a PAT whose role matches the work you need.

If the client cannot connect, fix URL and `Bearer` token before comparing tool lists.

## Prerequisites

- **StackGen CLI** (for **STDIO** only): Follow the [install and uninstall guide](/docs/stackgen/cli-guide/get-started/install-and-uninstall) and ensure `stackgen` is on the `PATH` for the environment where the IDE launches MCP.
- **[PAT](/docs/stackgen/setup/pat)**: Create or reuse a token for the tenant you are targeting.
- **Base URL**: Use your real StackGen base URL (examples in this doc use `https://cloud.stackgen.com`; substitute yours, **no trailing slash** before path segments like `/api/mcp/...`).
- **SSE paths** (for remote MCP): `https://<your-base-url>/api/mcp/admin` and `https://<your-base-url>/api/mcp/user` (see [Cursor](/docs/stackgen/stackgen-mcp#sse-config-cursor) or [VS Code](/docs/stackgen/stackgen-mcp#sse-configuration-in-visual-studio-code) examples).

## Configure your IDE

Choosing a path

**STDIO** is a practical default when you already run the StackGen CLI on the same machine. **SSE** fits when your IDE supports remote MCP over HTTPS and you want **separate Admin and User** servers without a local MCP subprocess. If you use [`cloud2code`](/docs/stackgen/cli-guide/cloud2code/install), you can unlock more tools on the **STDIO** path.

Pick your tool below. JSON samples may include `//` comments; if your editor rejects them, remove the comment lines or use JSONC where supported.

### Claude

Click to view

Register a local **STDIO** server that runs `stackgen mcp`:

```bash
claude mcp add stackgen \
    --env STACKGEN_URL=https://cloud.stackgen.com \
    --env STACKGEN_TOKEN="<STACKGEN_PAT>" \
    -s user -- stackgen mcp
```

Replace `https://cloud.stackgen.com` with your base URL and `<STACKGEN_PAT>` with your [PAT](/docs/stackgen/setup/pat).

#### HTTP (remote): `stackgen-admin` and `stackgen-user`

To register **two** remote MCP servers over **HTTP** transport (recommended by Anthropic for hosted endpoints), run one command per server. Export **`STACKGEN_URL`** to your tenant base URL (no trailing slash), or substitute a full URL string for each `url` argument.

Replace **`<STACKGEN_PAT>`** with your real PAT value inside the header (same token rules as [above](/docs/stackgen/stackgen-mcp#admin-mcp-and-user-mcp-sse)).

```bash
claude mcp add --transport http stackgen-admin "${STACKGEN_URL}/api/mcp/admin" \
  --header "Authorization: Bearer <STACKGEN_PAT>" -s user

claude mcp add --transport http stackgen-user "${STACKGEN_URL}/api/mcp/user" \
  --header "Authorization: Bearer <STACKGEN_PAT>" -s user
```

`-s user` saves both entries to user scope, consistent with the STDIO example. If your Claude CLI version documents **`sse`** instead of **`http`**, swap `--transport http` for `--transport sse` and keep the same URL and header.

See the [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp) for current flags and ordering.

#### Flags (STDIO) [](/docs/stackgen/stackgen-mcp#flags-stdio%20%22Direct%20link%20to%20Flags%20(STDIO)")

| Flag | Description |
| --- | --- |
| `claude mcp add stackgen` | Starts registration of an MCP server named `stackgen` in Claude CLI. |
| `--env STACKGEN_URL=...` | Sets `STACKGEN_URL` for the `stackgen mcp` process. Use your StackGen tenant base URL. |
| `--env STACKGEN_TOKEN="..."` | Sets `STACKGEN_TOKEN` to your [PAT](/docs/stackgen/setup/pat) so the CLI can authenticate to StackGen. |
| `-s user` | Writes the MCP server definition to user-level settings so it applies across Claude CLI sessions. |
| `-- stackgen mcp` | Separator plus command: Claude runs `stackgen mcp` to start the local STDIO MCP server. |

#### Flags (HTTP remote) [](/docs/stackgen/stackgen-mcp#flags-http-remote%20%22Direct%20link%20to%20Flags%20(HTTP%20remote)")

| Flag | Description |
| --- | --- |
| `--transport http` (or `sse`) | Connects to a remote MCP URL instead of running `stackgen mcp` locally. |
| Server name (`stackgen-admin`, `stackgen-user`) | Identifier for that MCP entry in Claude CLI. |
| URL argument | Full MCP URL, for example `"${STACKGEN_URL}/api/mcp/admin"`. |
| `--header "Authorization: Bearer ..."` | Sends your PAT on each request. Use a space after `Bearer`. |
| `-s user` | Stores the server in user-level settings. |

See the [Anthropic MCP CLI guide](https://code.claude.com/docs/en/mcp#option-3%3A-add-a-local-stdio-server) for STDIO, and [Claude Code MCP](https://docs.claude.com/en/docs/claude-code/mcp) for remote transport.

### Visual Studio Code

Click to view

1. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows).
2. Run **MCP: Open User Configuration** (wording may vary slightly by VS Code version).
3. Add a **STDIO** server inside `servers`:

```json
{

  "servers": {

    "stackgen-mcp": {

      "type": "stdio",

      "command": "stackgen",

      "args": "mcp",

      "env": {

        "STACKGEN_TOKEN": "<STACKGEN_TOKEN>",

        "STACKGEN_URL": "https://cloud.stackgen.com"

      }

    }

  }

}
```

Replace placeholders with your [PAT](/docs/stackgen/setup/pat) and base URL. Save; Copilot Chat and other MCP-aware features can use this server.

4. For **SSE** remote MCP, add **`stackgen-admin`** and **`stackgen-user`** under the same `servers` object (merge with `stackgen-mcp` if you keep STDIO too). Shape matches current VS Code MCP config; confirm against [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration) if your build differs.

#### SSE configuration in Visual Studio Code

Replace **`${STACKGEN_URL}`** with your tenant base URL if your editor does not expand it. Replace **`STACKGEN_PAT_TOKEN`** (or use **`<STACKGEN_PAT>`** below) with your real [PAT](/docs/stackgen/setup/pat) after `Bearer`.

```json
{

  "servers": {

    "stackgen-admin": {

      "type": "sse",

      "url": "${STACKGEN_URL}/api/mcp/admin",

      "headers": {

        "authorization": "Bearer <STACKGEN_PAT>"

      }

    },

    "stackgen-user": {

      "type": "sse",

      "url": "${STACKGEN_URL}/api/mcp/user",

      "headers": {

        "authorization": "Bearer <STACKGEN_PAT>"

      }

    }

  }

}
```

#### Flags (STDIO) [](/docs/stackgen/stackgen-mcp#flags-stdio-1%20%22Direct%20link%20to%20Flags%20(STDIO)")

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `servers` | Object | Root object for MCP server definitions in VS Code user MCP config. | `{ "stackgen-mcp": { ... } }` |
| `servers.stackgen-mcp` | Object | Configuration for the StackGen STDIO server instance. | See JSON above |
| `servers.stackgen-mcp.type` | String | Transport between IDE and MCP server. `stdio` uses a subprocess with stdin/stdout. | `"stdio"` |
| `servers.stackgen-mcp.command` | String | Executable to launch. | `"stackgen"` |
| `servers.stackgen-mcp.args` | String | Arguments for the command; together with `command` this starts MCP mode. | `"mcp"` |
| `servers.stackgen-mcp.env` | Object | Environment variables passed to the MCP process. | `STACKGEN_TOKEN`, `STACKGEN_URL` |
| `servers.stackgen-mcp.env.STACKGEN_TOKEN` | String | StackGen PAT. Replace `<STACKGEN_TOKEN>` with your real token. | `<STACKGEN_TOKEN>` |
| `servers.stackgen-mcp.env.STACKGEN_URL` | String | StackGen base URL for API calls from the CLI. | `"https://cloud.stackgen.com"` |

#### Flags (SSE: `stackgen-admin` and `stackgen-user`)

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `servers.stackgen-admin` / `servers.stackgen-user` | Object | Two SSE server definitions under `servers`. | See JSON above |
| `type` | String | `sse` for HTTPS MCP to StackGen. | `"sse"` |
| `url` | String | `${STACKGEN_URL}/api/mcp/admin` or `.../user`. | See JSON above |
| `headers.authorization` | String | `Bearer` plus PAT. Tool list follows [token permissions](/docs/stackgen/stackgen-mcp#admin-mcp-and-user-mcp-sse). | `Bearer <STACKGEN_PAT>` |

See [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) and the [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

### Cursor

Click to view

#### STDIO (single server) [](/docs/stackgen/stackgen-mcp#stdio-single-server%20%22Direct%20link%20to%20STDIO%20(single%20server)")

1. Open **Settings**, then **Tools & MCP** (or search for it).
2. Use **Add Custom MCP** (or equivalent) so Cursor opens your MCP config (often `mcp.json`).
3. Add:

```json
{

  "mcpServers": {

    "stackgen-mcp": {

      "type": "stdio",

      "command": "stackgen",

      "args": ["mcp"],

      "env": {

        "STACKGEN_TOKEN": "<STACKGEN_TOKEN>",

        "STACKGEN_URL": "https://cloud.stackgen.com"

      }

    }

  }

}
```

4. Replace `<STACKGEN_TOKEN>` with your [PAT](/docs/stackgen/setup/pat), adjust `STACKGEN_URL`, save, and restart Cursor if it does not pick up changes.

#### Flags (STDIO: `stackgen-mcp`)

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `mcpServers` | Object | Cursor root object for MCP server entries. | `{ "stackgen-mcp": { ... } }` |
| `stackgen-mcp` (key) | String | Server id shown in Cursor; you can rename it, but keep `command`/`args` correct. | `stackgen-mcp` |
| `type` | String | `stdio` runs `command` as a subprocess for MCP. | `stdio` |
| `command` | String | CLI binary on your `PATH`. | `stackgen` |
| `args` | Array | Arguments; `mcp` starts StackGen in MCP mode. | `["mcp"]` |
| `env.STACKGEN_TOKEN` | String | PAT for StackGen. | `<STACKGEN_TOKEN>` |
| `env.STACKGEN_URL` | String | StackGen base URL. | `https://cloud.stackgen.com` |

#### SSE configuration in Cursor

Use **SSE** when you want **two** servers: **`stackgen-admin`** (Producer) and **`stackgen-user`** (Consumer). Merge these entries into `mcpServers` alongside or instead of `stackgen-mcp`.

IDE-specific JSON

The block below matches **Cursor** (`mcpServers`). **VS Code** uses `servers` and [SSE for StackGen](/docs/stackgen/stackgen-mcp#sse-configuration-in-visual-studio-code) is documented above. **AntiGravity**, **Kiro**, and other editors may differ; keep the same **URLs** and **`Bearer` PAT** idea, then follow that product's MCP documentation.

- **URL**: Set each `url` to your base URL plus `/api/mcp/admin` or `/api/mcp/user`. If `${STACKGEN_URL}` is not expanded by your environment, paste the full URL (no trailing slash on the host).
- **Auth**: Set `authorization` to the literal word `Bearer`, one space, then your PAT (placeholder `<STACKGEN_PAT>` below).

```json
{

  "mcpServers": {

    "stackgen-admin": {

      "type": "sse",

      "url": "${STACKGEN_URL}/api/mcp/admin",

      "headers": {

        "authorization": "Bearer <STACKGEN_PAT>"

      }

    },

    "stackgen-user": {

      "type": "sse",

      "url": "${STACKGEN_URL}/api/mcp/user",

      "headers": {

        "authorization": "Bearer <STACKGEN_PAT>"

      }

    }

  }

}
```

Use **`stackgen-admin`** for producer-style operations (projects, policies, modules, secrets). Use **`stackgen-user`** for appStack and topology work and for prompts such as **Create Infrastructure** when Cursor exposes them.

#### Flags (SSE: `stackgen-admin` and `stackgen-user`)

The same fields apply to both entries; only the `url` path segment (`admin` vs `user`) differs.

| Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `stackgen-admin` / `stackgen-user` (keys) | String | Two server entries under `mcpServers`: Admin (Producer) and User (Consumer). | `stackgen-admin`, `stackgen-user` |
| `type` | String | Use `sse` for remote MCP over HTTPS to StackGen. | `sse` |
| `url` | String | `${STACKGEN_URL}/api/mcp/admin` or `${STACKGEN_URL}/api/mcp/user`. Replace `${STACKGEN_URL}` with your tenant base URL if it is not expanded automatically. No trailing slash on the base. | See JSON above |
| `headers` | Object | HTTP headers sent on MCP requests. | `authorization` |
| `headers.authorization` | String | `Bearer` followed by your PAT. The tools Cursor lists still follow [token permissions](/docs/stackgen/stackgen-mcp#tools-match-your-token). | `Bearer <STACKGEN_PAT>` |

See Cursor [MCP install links](https://cursor.com/docs/context/mcp/install-links).

## Troubleshooting

Click to view

- **Authentication**: Verify the PAT is valid, not expired, and issued for the same base URL you configured. For SSE, confirm the full `Bearer <token>` header.
- **Network**: Ensure firewalls and proxies allow HTTPS to your StackGen host (and local subprocess launch for STDIO).
- **Server not listed in IDE**: Restart the IDE or shell after editing config; for STDIO, confirm `which stackgen` works in the same environment the IDE uses.
- **SSE errors**: Use a base URL **without** a trailing slash before `/api/mcp/...`. Confirm you selected the Admin vs User URL that matches the task. If tools look incomplete, compare against a PAT whose role matches that surface.

- [StackGen MCP Capabilities](/docs/stackgen/stackgen-mcp#stackgen-mcp-capabilities)
- [STDIO vs SSE](/docs/stackgen/stackgen-mcp#stdio-vs-sse)
  - [Admin MCP and User MCP (SSE)](/docs/stackgen/stackgen-mcp#admin-mcp-and-user-mcp-sse)
- [Prerequisites](/docs/stackgen/stackgen-mcp#prerequisites)
- [Configure your IDE](/docs/stackgen/stackgen-mcp#configure-your-ide)
  - [Claude](/docs/stackgen/stackgen-mcp#claude)
  - [Visual Studio Code](/docs/stackgen/stackgen-mcp#visual-studio-code)
  - [Cursor](/docs/stackgen/stackgen-mcp#cursor)
