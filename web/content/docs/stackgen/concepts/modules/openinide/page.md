---
title: "Why Use Open in IDE"
product: "stackgen"
sourcePath: "/docs/concepts/modules/openinide"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/openinide"
status: "ok"
---

The Open in IDE button (top right corner) lets you seamlessly transfer your Terraform module code from this visual interface into a full development environment.

## Why Use Open in IDE

- For advanced editing (refactoring, search and replace, custom scripts).
- To use Terraform extensions, linters, and formatters.
- To integrate with source control (Git).
- To preview and test your infrastructure as code before publishing.

## How It Works

When you click **Open in IDE**, you get options to open your module project in an external code editor:

1. **Opens your Module in VSCode**: Instantly launches Visual Studio Code, the popular code editor.

2. **Loads your Terraform project directory** in a new VSCode window.

3. **Lets you continue editing**, linting, formatting, and committing your code using all of VSCode’s extensions and tools.

4. **All changes you commit are saved directly in your project folder** after you save your changes to modules in VS Code. You can then return to this visual editor to see updates reflected in the **StackGen Module Editor Web UI**.



note





You will need to install the [StackGen Extension for VS Code](/docs/stackgen/concepts/modules/openinide/vscode) via the **VS Code Marketplace**.


## Coming Soon

We will start supporting the following IDEs over the next release.

- Cursor
- NVIM
- Windsurf
