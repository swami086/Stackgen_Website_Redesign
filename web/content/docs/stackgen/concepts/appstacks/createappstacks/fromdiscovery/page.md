---
title: "Push Terraform state to a remote backend"
product: "stackgen"
sourcePath: "/docs/concepts/appstacks/createappstacks/fromdiscovery"
sourceUrl: "https://docs.stackgen.com/docs/concepts/appstacks/createappstacks/fromdiscovery"
status: "ok"
---

For platform engineers and DevOps

StackGen helps you with Day 0 resource discovery of your existing cloud infrastructure. Once you run a discovery, you can select all or a few of the discovered resources to create an appStack.

You can do so either from the **Cloud Asset Discovery** flow, once the discovery is complete, by clicking the **Create appStack from this Discovery**, or by following the **appStack creation** flow.

Let’s see in detail how you can create an appStack from your discovered resources.

Custom modules required

Creating an appStack from discovery maps Terraform resource types in state to modules in your catalog. Upload the discovery-oriented **custom modules** from **[discovery-modules](https://github.com/stackgenhq/discovery-modules)** and assign them to your project first. Relying on platform **built-in** modules for this path is being phased out. For the full requirement, see [Cloud Asset Discovery](/docs/stackgen/concepts/clouddiscovery).

note

StackGen supports discovery only through an IaC file import, i.e., `.tfstate` and `.json`.

1. From the StackGen home page, navigate to **appStacks > + New appStack > appStack from Cloud Discovery**.

2. Select your discovery from the list of discoveries and click **Proceed**.



![From Discovery](https://docs.stackgen.com/assets/images/selectdiscovery-0571958a365ed03be4ab9073e8b26f29.jpg)

3. StackGen will list all the resources within your `.tfstate` file.
1. You can select all resources or a few and click the forward arrow **→** to create your appStack.

2. To unselect a resource, click the back arrow **←**.



      ![Selected Resources](https://docs.stackgen.com/assets/images/selectresources-c7bbdb051778ba6888699cb8c103e93b.jpg)
4. Click the **Create appStack** button. You will be redirected to the **Topology Canvas**.
   - You can edit the appStack name and description via the **Edit appStack Details** dialog.



     ![Edit appStack Name](https://docs.stackgen.com/assets/images/editappstackname-7e8ac7b35c862685115e341cdf473efd.jpg)
5. At any point in time, if you want to go back and select or deselect resources from your appStack:
1. Click the **Source** icon from the appstack details menu.



      ![Edit Source](https://docs.stackgen.com/assets/images/editdiscovery-d2dad8a235ab3475abe69a176926ea94.jpg)

2. You can select the resources required and click the forward arrow **→** to include them in your appStack.



      ![Add Resources](https://docs.stackgen.com/assets/images/addresourcediscovery-4af87ad1df1baf9a2446132a0a01cd4d.jpg)













      note





      You cannot remove the resources that you've added while creating the base appStack.

3. Click **Update Topology**. Your appStack will be updated with the selected resources.



      ![appStack](https://docs.stackgen.com/assets/images/asfromdiscovery-99808addddb96cad7e9f3e6acf340663.jpg)

## Push Terraform state to a remote backend

After you create an appStack from discovery, you can push its segregated **Terraform** state to the mapped remote backend from state backend settings in the UI (or with [`stackgen state push`](/docs/stackgen/cli-guide/usage/state)).

This UI action is only for **Cloud Discovery** appStacks. Pushing overwrites the remote state file immediately. Keep the parent Cloud Discovery record if you still need the state view, download, or push controls.

For the full caveats, see [Push Terraform state to a remote backend](/docs/stackgen/concepts/clouddiscovery#push-terraform-state-to-a-remote-backend) and [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#push-tf-state-to-remote-backend).
