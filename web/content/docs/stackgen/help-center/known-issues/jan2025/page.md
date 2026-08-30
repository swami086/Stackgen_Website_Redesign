---
title: "Topology"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/jan2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/jan2025"
status: "ok"
---

We've listed all the Known Issues for the January 2025 release here. Once these Issues are resolved in a release, they will be listed under the bug fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/jan25-release).

- [Loss of Existing Attributes and Connections While Converting a Resource Into Data Source](/docs/stackgen/help-center/known-issues/jan2025#fixed-loss-of-existing-attributes-and-connections-while-converting-a-resource-into-data-source)

## Topology

### Fixed Loss of Existing Attributes and Connections While Converting a Resource Into Data Source

Click to view

**Summary**: Converting a resource into a data source may result in attribute name conflicts and incorrect resource identification.

**Cause**:

- **Attribute Conflicts**: If attribute names overlap between managed resources and data types, the current conversion process does not automatically retain the values of their attributes. You will need to manually verify and enter the necessary values.

- **Composite Resource Conversion**: Attempts to convert managed resources into data sources may fail.


**Fix**: The Convert to Data Source option is now available only for resources with valid attribute mappings. This ensures that when you convert a resource, its key attributes are correctly preserved and linked, reducing the chance of losing values or connections.

- [Topology](/docs/stackgen/help-center/known-issues/jan2025#topology)
  - [Fixed Loss of Existing Attributes and Connections While Converting a Resource Into Data Source](/docs/stackgen/help-center/known-issues/jan2025#fixed-loss-of-existing-attributes-and-connections-while-converting-a-resource-into-data-source)
