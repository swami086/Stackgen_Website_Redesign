---
title: "Available Flags"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/global-flags"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/global-flags"
status: "ok"
---

StackGen CLI provides global flags that can be used with various commands to modify their behavior, control output formats, and enable interactive execution. These flags help tailor the command-line experience to different use cases, whether in automation, debugging, or interactive mode.

## Available Flags

| Flag | Description |
| --- | --- |
| `-i, --interactive` | Runs the CLI in interactive mode, prompting for required inputs. |
| `--log int` | Sets the logging verbosity level: `2: DEBUG`, `3: INFO` (default), `4: WARN`, `5: ERROR`. |
| `-o, --output string` | Sets the output format: `json` for JSON output, or `human` (default) for human-readable output. |
| `--project string` | The project name or identifier. Can also be set using the `STACKGEN_PROJECT` environment variable. |
| `--workspace string` | Alias for `--project`. Can also be set using the `STACKGEN_WORKSPACE` environment variable. |
| `--stackgen-home string` | Artifact output directory. Default depends on your install (often under your home directory). |

These flags can be combined with StackGen CLI commands to fine-tune the command execution experience.

### Examples

#### Run a command in interactive mode

```bash
stackgen provision --interactive
```

This command runs `stackgen provision` in interactive mode and prompts for required inputs.

#### Set log level to debug

```bash
stackgen provision --log 2
```

This command runs `stackgen provision` with log level DEBUG (numeric `2`).

#### Change output format to JSON

```bash
stackgen resource type --output json
```

This command returns JSON for easier parsing. `stackgen resource type` lists supported resource types.

- [Available Flags](/docs/stackgen/cli-guide/usage/global-flags#available-flags)
  - [Examples](/docs/stackgen/cli-guide/usage/global-flags#examples)
