---
title: "In-Progress Module Usage in appStacks for MCP Returns Incorrect Results"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/feb2026"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/feb2026"
status: "ok"
---

We've listed all the Known Issues for the February 2026 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/2026/february/feb26-release).

- [Module Usage in appStacks for MCP Returns Incorrect Results](/docs/stackgen/help-center/known-issues/feb2026#in-progressmodule-usage-in-appstacks-for-mcp-returns-incorrect-results)
- [Incorrect "Used in appStacks" Count for appStack-Owned Module Published to Catalog](/docs/stackgen/help-center/known-issues/feb2026#in-progressincorrect-used-in-appstacks-count-for-appstack-owned-module-published-to-catalog)
- [Connection Between Modules Not Created When Referencing with module.identifier.attribute](/docs/stackgen/help-center/known-issues/feb2026#in-progressconnection-between-modules-not-created-when-referencing-with-module-identifier-attribute)

### In-Progress Module Usage in appStacks for MCP Returns Incorrect Results

Click to view

**Summary**: When you configure StackGen MCP for the stage environment and use the module usage tool call in an IDE, the tool returns incorrect data. Instead of listing all appStacks where the module is used, it only returns the last appStack.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to manually check which appStacks use the module until this issue is fixed.

### In-Progress Incorrect "Used in appStacks" Count for appStack-Owned Module Published to Catalog

Click to view

**Summary**: When you create an appStack-owned module, use it in an appStack, and then promote the module to the catalog, the "Used in appStacks" count shown in the catalog is incorrect. The count displays 0 even though the module is already being used in an appStack.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution.

**Workaround**: There is no known workaround at the moment. You may need to manually track module usage until this issue is fixed.

### In-Progress Connection Between Modules Not Created When Referencing with module.identifier.attribute

Click to view

**Summary**: When you create two custom modules, configure them with identifiers, and reference a module attribute into the other module using the syntax `module.identifier.attribute`, the connection between modules is not created. The inferred connection is not shown on the UI, and sometimes after refresh the connection goes away if it was created.

**Cause**: The cause of this issue is currently unknown. We are investigating the issue and will update this section when we have more information on the root cause and a solution. The issue is intermittent and does not happen every time.

**Workaround**: There is no known workaround at the moment. You may need to manually create the connection until this issue is fixed.
