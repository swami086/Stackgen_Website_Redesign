---
title: "Key Features"
product: "stackgen"
sourcePath: "/docs/concepts/modules/scanmodules"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/scanmodules"
status: "ok"
---

StackGen supports full compliance scanning for **Custom Terraform Modules**, enabling your teams to detect and fix security and policy violations **before deployment**, regardless of whether modules are created natively in StackGen or imported from external sources, such as Git, `.tfstate`, or code editors.

With custom policies using `JSON` format, StackGen ensures that even homegrown Terraform modules remain compliant throughout the infrastructure lifecycle.

## Key Features

- **Pre-Deployment Compliance for All Modules**: All custom modules are scanned for violations before they are deployed as part of an appStack.
- **Real-time Compliance Scans**: StackGen's **Scan** feature provides real-time violation feedback, allowing you to address issues as they arise.
- **Compliance Logs**: All violations found during module authoring are logged as **Scan Results** and displayed with severity, policies failed, and remediation guidance.

## Supported Custom Module Scanning Scenarios

| Source | Details |
| --- | --- |
| Custom Modules (TF code in Git) | Compliance scanning triggered during appStack creation. |
| Custom Modules via TFState Import | Snapshot scanning with actionable violation insights. |
| Custom Modules created in the StackGen Module Editor | Scan custom modules via the Catalog Page. |
| TF Code scanned in external IDEs (VS Code / Cursor) | Scan custom modules via the Catalog Page once the module is synced and published to the Web UI. |

## How It Works

1. **Author a Custom Module**: Whether you build your module in the **StackGen Module Editor** or import from Git or `.tfstate`, StackGen detects it as a custom module.

2. **Scanning**: Compliance scanning runs when you:
   - **Create a custom module**, publish it, and scan it via the Catalog page for compliance.
   - **Import into the appStack**: This is visible in the compliance dashboard.
   - **Edit code in VS Code or Cursor via plugins**: Once you save and sync your changes to the module editor, publish it, and scan it via the catalog.
3. **Violation Detection**: Violations are shown in following ways:
   - **Displayed in a violations dialog** in Catalog (Module Editor/IDE)
   - **Listed in the Compliance Dashboard** (Module used in an appStack)
4. **Fix and Iterate**: Each violation includes:


   - Policy name
   - Severity
   - Impacted resource
   - Recommended remediation (with code context)

You can remediate this in the module editor and run the scan again to view if all violations have been passed or fix it further in case they fail.

note

Note: Only custom modules created via the Module Editor are editable. Editing is not supported for any other custom module types.

You can scan a module in two ways:

- [Scan with StackGen Security](/docs/stackgen/concepts/modules/scanmodules#scan-with-stackgen-security)
- Scan with Wiz

### Scan with StackGen Security

Click to view

Let’s say you created custom Terraform modules by copying and pasting Terraform code. And the same is being used in your appStack.

- You can edit your module in the module editor or IDE.

- You can publish this custom module for reuse and availability in the Catalog.



![Custom Module Editor](https://docs.stackgen.com/assets/images/editcustommodule-3ae45250ca5abc6f6356d80945b0e615.png)


With compliance scanning enabled, StackGen scans the custom module code. You can do this by navigating to **Catalog > Actions > Scan** for your module from the list.

![Scan Results](https://docs.stackgen.com/assets/images/scanresults-373b5c486906691f3c9b0aa50e929f43.png)

You can fix violations in the module editor or an IDE and scan them again to have a compliant module.

![Fix Violation](https://docs.stackgen.com/assets/images/fixedviolation-a782855d8fca0b8ff77de870f4f4a951.png)

### Scan with Wiz

You can scan your IaC using Wiz to highlight misconfigurations, severity levels, and remediation guidance, all without having to deploy the module. Follow the [Wiz integration guide](/docs/stackgen/integrations/wiz) to learn more.

- [Key Features](/docs/stackgen/concepts/modules/scanmodules#key-features)
- [Supported Custom Module Scanning Scenarios](/docs/stackgen/concepts/modules/scanmodules#supported-custom-module-scanning-scenarios)
- [How It Works](/docs/stackgen/concepts/modules/scanmodules#how-it-works)
  - [Scan with StackGen Security](/docs/stackgen/concepts/modules/scanmodules#scan-with-stackgen-security)
  - [Scan with Wiz](/docs/stackgen/concepts/modules/scanmodules#scan-with-wiz)
