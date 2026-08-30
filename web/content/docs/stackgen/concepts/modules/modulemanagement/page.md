---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/modules/modulemanagement"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/modulemanagement"
status: "ok"
---

## Overview

You typically define Terraform (`.tf`) files to create reusable modules. With the Module Editor, you can:

- Create custom modules within the appStack and edit them in the Module editor.
- Edit the module directly within the editor.
- Publish your modules. But you will need to reference and reuse them within the appStack post-publish.
- View the associated Terraform code that is displayed alongside the module.

## Fix a Compliance Violation via StackGen

1. **Identify Compliance Violations**: From the Catalog page, run a scan to detect and view compliance violations.



![Identify a Compliance Violation](https://docs.stackgen.com/assets/images/fixviolations-2d220d3ba77e659a799f5d89a057cf2d.png)











Alternatively, if your custom module is used within an appStack, you can view it under the compliance dashboard.

2. **Fix in Terraform Code**: Resolve the issue by updating the relevant **Terraform Custom Module**. You can do so via the:


- **Module Editor**



![Identify a Compliance Violation](https://docs.stackgen.com/assets/images/fixinmoduleeditor-3eda783569253caa17bb3b01a07a2f61.png)

- or the **IDE**



![Identify a Compliance Violation](https://docs.stackgen.com/assets/images/fixinide-9f85809bd6ef0fa3383c3c2536171390.png)


3. **Save**, **Publish**, and **Scan again**: Violations that you fix are listed under the **Passed** tab.



![Identify a Compliance Violation](https://docs.stackgen.com/assets/images/passedviolation-d25dba147c83968cb09d9000513c653a.png)


You’re all set!

## References

- You can edit custom modules in the IDE and sync changes to StackGen, check out [Open in IDE](/docs/stackgen/concepts/modules/openinide).
- You can also fix custom module policy violations detected in the [Compliance dashboard](/docs/stackgen/concepts/compliance).
