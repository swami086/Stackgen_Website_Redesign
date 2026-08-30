---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/cliruns"
sourceUrl: "https://docs.stackgen.com/docs/concepts/cliruns"
status: "ok"
---

## Overview

The CLI Runs tab in StackGen bridges the gap between StackGen’s **Web UI** and **CLI workflows**, providing comprehensive visibility into all appStack lifecycle actions, regardless of the interface used.

This tab ensures that key actions, such as provisioning and destruction initiated through the CLI, are seamlessly captured and reflected in the Web UI.

**Local CLI runs** (provision and related workflows run from your machine) push logs to the UI and appear under **CLI Runs** / Action Runs. Update the StackGen CLI for this cut: older CLI versions will not work for **provision** and **drift** commands after this change.

Many of your projects, including DevOps and Engineering, prefer using the StackGen CLI for its speed and scriptability, but this can create a visibility gap where actions triggered via CLI are not reflected in the UI. This gap impacts auditability, operational transparency, and cross-team collaboration. The **CLI Runs** tab resolves this issue by bringing together CLI and Web UI activities into a single, unified view.

Let’s explore the CLI Runs dashboard in more detail.

## CLI Runs Dashboard

![CLI Runs](https://docs.stackgen.com/assets/images/cliruns-f87058f3a9bc886f3bf19b07609a827f.png)

To view the CLI Runs dashboard, follow these steps:

1. From the StackGen Home page, click **CLI Runs** from the navigation panel to the left.

2. You can filter your CLI Runs by the **Run Type** or the **appStack**.



![CLI Runs](https://docs.stackgen.com/assets/images/cliruns-93e216597a74666f1945115ea0297bb1.jpg)













note





Currently, StackGen supports the following CLI runs in the CLI Runs Dashboard:



   - Plan
   - Apply
   - Destroy
   - Drift

3. You can view your run log to view your CI runs if you have used the `--ci-job-url=<your ci url>` flag while running your CLI job.





```bash
stackgen provision --appstack-id="your appstack id" --var="region=<region>" --ci-job-url=<your ci job url> --apply
```











![Run Logs](https://docs.stackgen.com/assets/images/clirunlogs-d7ff4feb13e63aacfca3e4b99009ca00.jpg)

4. To view the changes of your runs in detail, click on any of the rows in the dashboard. You will be able to view the following details:



![Run Logs](https://docs.stackgen.com/assets/images/clidashboard-fba1ae297bb76a3becd3ee89a5a14f8f.jpg)










   - **Drift Snapshot**: A brief snapshot of your CLI Run. Let's break down what each section means:
     - **Number of resources**: This count reflects the total number of resources that were part of the CLI run, whether they were changed, removed, or newly created. It gives you a quick sense of the overall scale of the operation. Example: If your appStack provisions a VPC, an EC2 instance, and a security group, the total number of resources would be 3.
     - **Changes**: A summary of all additions, updates, and deletions.
     - **Resources removed from cloud**: Resources that were deleted from your cloud environment.
     - **Resources changed in cloud**: Resources that were updated (e.g., a change in configuration, tags, or size) during the CLI run.
     - **Resources created in cloud**: New resources added during the run.
   - **Search and Filter**: You can filter your resources using the filter to the top by Drift Type, Resource Type, Resource Tags, Region or you can search for your resource using the search bar.
5. You will notice that the resources appear with an icon next to it. Let’s understand what each of these symbols mean:



| Symbol | Description |
| --- | --- |
| **—** | There is no change in the configuration. |
| **—** | The resource has been removed from the cloud but still exists in the configuration. |
| **~** | The resource exists in cloud, but its configuration has changed. |
| **+** | A new resource has been added to the cloud that wasn’t previously defined. |

6. Clicking on any of the resources opens up the diff. You can view the changes that happened before and after a CLI run.



![Diff](https://docs.stackgen.com/assets/images/diff-612ba46ea025f0053f26751f1a003c57.png)

7. Additionally, you can navigate to **CLI Runs** from your appStack:



![CLI from appStack](https://docs.stackgen.com/assets/images/cliappstack-65dd5887cae8f4ecba8e6fbf620f2318.jpg)
