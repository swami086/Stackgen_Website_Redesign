---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/clouddiscovery"
sourceUrl: "https://docs.stackgen.com/docs/concepts/clouddiscovery"
status: "ok"
---

## Overview

Discover your existing cloud infrastructure before creating an appStack. StackGen supports **Day-0 Resource Discovery**, so you can inspect existing resources from a Terraform state (`.tfstate`) file before you create an appStack.

**Create appStack from this Discovery** (steps **4** and **5** below) depends on matching **custom modules** in your Module Catalog. Read the callout before step **4** before you create the appStack.

## Pre-appStack Creation: Day-0 Resource Discovery

Cloud Asset Discovery can be performed before creating an appStack to ensure that the imported infrastructure aligns with its intended configuration.

1. **Access Cloud Asset Discovery**
1. From the StackGen Home Page, click **Cloud Asset Discovery** from the navigation panel on the left.

2. Click **Start Discovery** to begin importing your infrastructure.



      ![Start Discovery](https://docs.stackgen.com/assets/images/startdiscovery-cbc2e1a8545bffa5361b7541f60ba1f7.png)













      note





      After the first discovery, the UI will change to show a **\+ New** button.







      ![New Button](https://docs.stackgen.com/assets/images/discoveryrerun-47ca3b732932450506451b40b15c00cf.png)
2. **Import a Terraform State File (`.tfstate`)**: Upload an existing `.tfstate` file to retrieve infrastructure details. You can either drag your deployment file or click the **Click to upload IaC files** panel to upload your file, then click **Proceed**.



![Upload tfstate](https://docs.stackgen.com/assets/images/uploadtfdiscovery-7f3367dd96b290aa12f7aea679fe551d.png)













note





StackGen supports both **UI and [CLI-based imports](/docs/stackgen/cli-guide/cloud2code)**.

3. StackGen will identify all the resources within your `.tfstate` file.



![Discovered Resources](https://docs.stackgen.com/assets/images/discoveredresources-1312451358156f215b18b4443535780a.png)













Modules required before you create an appStack





Steps **4** and **5** map discovered Terraform resource types to modules in your catalog. For that mapping to work, you need **custom modules** that declare:



   - How each Terraform resource type from state maps to a module
   - How **references** are formed in **`.stackgen/stackgen.yaml`**

That discovery-oriented metadata lives in the separate **[discovery-modules](https://github.com/stackgenhq/discovery-modules)** repository. See the [README](https://github.com/stackgenhq/discovery-modules/blob/main/README.md) for mappings, `stackgen.yaml` references, and upload examples.

These modules are **not** the same as the general-purpose modules in **[stackgen-modules](https://github.com/stackgenhq/stackgen-modules)**. Use discovery modules for this flow. Use `stackgen-modules` when you want the broader StackGen-maintained catalog (see [Module Catalog](/docs/stackgen/concepts/modules/catalog#onboarding-stackgen-modules-stackgen-modules)).

| Situation | What to expect |
| --- | --- |
| **New environment** | Upload the discovery-oriented modules and assign them to your project **before** you click **Create appStack from this Discovery**. If **no** matching modules are available, appStack creation from discovery will not work. |
| **Partial coverage** | Some resource types may not have a matching module yet. The flow can still proceed for resources that match. StackGen errors only when there are **not enough** modules to create the appStack. |
| **Built-in modules** | Relying on **platform built-in** modules for this path is being phased out. Prefer **custom modules** from your catalog. For how to upload them, see [Module Catalog](/docs/stackgen/concepts/modules/catalog) and [`stackgen upload custom-modules`](/docs/stackgen/cli-guide/usage/upload/custom-modules). |

4. Click **Create appStack from this Discovery** to create your appStack.
   - You can select all resources or a few and then click the forward arrow **→** to create your appStack.

   - To unselect a resource, select the resources and click the back arrow **←**.



     ![Select Resources](https://docs.stackgen.com/assets/images/discoveryselectresources-536fa3d09d0c187fc8d35dd75b55e522.jpg)
5. Click **Create appStack**, you will be redirected to the **Topology Canvas**.



![appStack from Discovery](https://docs.stackgen.com/assets/images/appstackdiscovery-e284cf68cecc6336ee07c30b4b900775.jpg)










   - You can edit the appStack name and description via the **Edit appStack Details** dialog.



     ![Edit appStack Name](https://docs.stackgen.com/assets/images/editappstackname-7e8ac7b35c862685115e341cdf473efd.jpg)

### Modify Resource Selection After Creation

At any point in time, if you want to go back and select or deselect resources from your appStack:

1. Click the **Source** icon from the appStack details menu.



![source](https://docs.stackgen.com/assets/images/sourcediscovery-e61dbf09a9f27ee42630b0e1d175bb7e.jpg)

2. You can select the resources you want and click the forward arrow **→** to include them in your appStack.



![Add Resources](https://docs.stackgen.com/assets/images/selectresourcesource-610084bd377b41af35145a18ef320a49.jpg)













note





You cannot remove resources added while creating the base appStack.


- Click **Update Topology**. Your appStack will be updated with the selected resources.



![Discovery appStack](https://docs.stackgen.com/assets/images/discoveryappstackcloud-d0437d88fd6200c2bd52ff3c5200d860.jpg)


## Push Terraform state to a remote backend

For appStacks created from a **Cloud Discovery** workflow, StackGen exposes a UI action in state backend settings to push the segregated appStack **Terraform** state file to its mapped remote backend (for example **Amazon S3** or **Google Cloud Storage**).

**Previously**, this push was available through the CLI (`stackgen state push`). **Now**, Cloud Discovery appStacks can run the same kind of push from the web UI.

**Key Features**

- **UI Push Action** \- Use the action in state backend settings to push the appStack state to the configured remote backend.
- **Cloud Discovery Only** \- Manually built appStacks do not show this control. It is unique to appStacks generated from Cloud Discovery.
- **Failure Checks** \- StackGen aborts with an error if credentials are expired, cloud permissions are wrong, or the backend storage config is misconfigured.
- **CLI Still Available** \- Use [`stackgen state push`](/docs/stackgen/cli-guide/usage/state) when you prefer a terminal workflow.

warning

**Destructive data overwrite:** A push writes the remote state file immediately and entirely overwrites the destination state. There is no intermediate prompt to block an unintended overwrite. Confirm you intend to replace remote state before you push.

warning

**Cloud Discovery deletion dependency:** Source state view, download, and remote push controls depend on the parent Cloud Discovery record. If you delete that discovery from history, those controls are permanently removed from the appStack UI. Do not delete the discovery until you are sure you will not need to push or manage that appStack's state again.

See [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#push-tf-state-to-remote-backend) and [IaC from Cloud Discovery](/docs/stackgen/concepts/appstacks/createappstacks/fromdiscovery).

## Post-appStack Creation: Continuous Drift Monitoring

You can now run **Day 0 drift** on the selected resources in your appStack and continue to monitor for drift on an ongoing basis. Check out the [Drift Detection](/docs/stackgen/concepts/drift) document to learn more.

You can also create appStacks from your `.tfstate` discoveries. Refer to the [IaC from Cloud Discovery](/docs/stackgen/concepts/appstacks/createappstacks/fromdiscovery) and [Importing IaC](/docs/stackgen/concepts/iac/import-iac/importing-iac) articles for detailed steps.

- [Overview](/docs/stackgen/concepts/clouddiscovery#overview)
- [Pre-appStack Creation: Day-0 Resource Discovery](/docs/stackgen/concepts/clouddiscovery#pre-appstack-creation-day-0-resource-discovery)
  - [Modify Resource Selection After Creation](/docs/stackgen/concepts/clouddiscovery#modify-resource-selection-after-creation)
