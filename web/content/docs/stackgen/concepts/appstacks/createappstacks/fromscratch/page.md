---
title: "Fromscratch"
product: "stackgen"
sourcePath: "/docs/concepts/appstacks/createappstacks/fromscratch"
sourceUrl: "https://docs.stackgen.com/docs/concepts/appstacks/createappstacks/fromscratch"
status: "ok"
---

For Platform and DevOps Engineers

You can create an appStack from scratch to build a new infrastructure. Drag and drop resources, including resource packs and custom policies, to create and visualize your deployment architecture.

Follow these steps to generate secure and compliant IaC based on your opinionated path:

1. From the navigation bar on the left, click **appStacks**.

2. Click the **\+ New appStack** button.

3. Click **From scratch**.

4. Select the target cloud service that you would like to use.



note





   - You can choose only one cloud service provider from the list.
   - Supported cloud providers include **AWS**, **Azure**, **GCP**, **Civo**, and **Oracle Cloud Infrastructure (OCI)**.
   - Leave **Include default policies** on if you want StackGen built-in policies attached automatically.
   - Clear **Include default policies** if you want to create the appStack without StackGen built-in policies.

Availability

**OCI** has no built-in modules yet. Use custom OCI modules and run plan and apply with the **CLI**. OCI resource icons are available in the UI.

See [OCI provider early access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access). Provider support for **OCI** and a **generic** cloud type (for example **GitHub** modules) started in [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#oci-and-generic-cloud-support).

![Create New appStack Start from scratch with Include default policies toggle and cloud provider choices](https://docs.stackgen.com/assets/images/apr26-default-policy-toggle-eb5e16f8483fc8df8cf8cd91a0c7fec2.png)

5. You will be redirected to the **Topology** tab.

6. You can now begin creating your appStack from scratch by adding and cofiguring Resources, Resource Connections, etc.
   - You can edit the appStack name and description via the edit appStack modal.

     ![newappstackfromscratch](https://docs.stackgen.com/assets/images/newappstackfromscratch-af96dd8c7dfd65db9635f19114da9eb7.png)
7. To view policies with which your IaC complies with, click the **Policies** tab.



![Policies](https://docs.stackgen.com/assets/images/appstacksSelectPolicies-5e9ba36f2c43783d57563153927b5f22.jpg)













note





   - You will not be able to modify policies if a governance policy is assigned to an appStack security policy.
   - You can use the search bar to search and select or unselect policies.
   - **Custom policies**: are created and uploaded by your **Admins** via the [**CLI**](/docs/stackgen/cli-guide/usage/upload/upload-resources). These uploaded policies are then assigned to relevant projects via Governance Configuration page.

![Topology redirect](https://docs.stackgen.com/assets/images/appstackfromsctopology-519afcce159b761360c88d93b88ef7ea.jpg)
