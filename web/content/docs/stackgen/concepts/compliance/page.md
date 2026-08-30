---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/compliance"
sourceUrl: "https://docs.stackgen.com/docs/concepts/compliance"
status: "ok"
---

## Overview

The StackGen **Compliance Dashboard** provides visibility into how your cloud infrastructure aligns with compliance frameworks, such as NIST, FedRAMP, and others.

The StackGen Compliance Dashboard lets you view both passed and failed policy checks that are mapped to specific control IDs, and allows you to download policy checks via CSV exports to simplify collaboration between your platform, security, and compliance projects.

The Compliance Dashboard is designed to support continuous compliance by helping you track what has been remediated by StackGen and what still needs attention.

![Compliance Overview](https://docs.stackgen.com/assets/images/complianceoverview-cd66d322fe8e6682242c0fc4d026c8f5.png)

## Why Use the Compliance Dashboard?

When building infrastructure with StackGen, policy enforcement is automated, but compliance reporting is still a manual burden for many DevOps and Compliance projects.

The Compliance Dashboard lets you:

- Track **policy violations** and **remediations**
- Understand **which controls have passed or failed**
- Export data to internal tracking tools or compliance platforms
- Prepare for audits with proof of compliance

## How Compliance Dashboard Fits Into Your Workflow

| Team | Team Goals Enabled by the Dashboard |
| --- | --- |
| Platform Engineering | See what StackGen remediated automatically, and what needs manual fix in IaC. |
| Security | Validate that security controls are enforced across environments. |
| Compliance | Export reports, track control coverage, and prepare for audits. |

## Understanding the Policy Enforcement and Compliance Dashboard Workflow

When you create an appStack in StackGen, policy enforcement happens automatically, ensuring that your infrastructure is secure and compliant.

Here’s how the workflow typically looks:

1. **Automatic Enforcement of Policies Based on Industry Best Practices**: StackGen automatically applies a set of [pre-defined security and compliance policies](/docs/stackgen/concepts/policies#stackgen-provided-policies) to your appStack. These are based on industry best practices and frameworks such as Mars-E, NIST, and others.
   - **Custom Policies enforced by DevOps and Admins**: As a DevOps engineer or administrator, you can define and enforce [custom policies](/docs/stackgen/concepts/policies/custom-policies) tailored to your organization's needs, such as least-privilege IAM rules, VPC configurations, or tag-based restrictions. These custom policies are applied at the **Project level**, meaning that they will be automatically enforced on any appStack created by members of the assigned Project.
2. **The Compliance Dashboard gives you visibility into both types of enforcements**:
   - Policies that were automatically applied by StackGen
   - Custom policies you've enforced
   - Violations detected, remediated, and still pending
   - Control IDs mapped to compliance frameworks for easy auditing
3. Any policy violations you fix will also be reflected as updated in the compliance dashboard.


## Navigating to the Compliance Dashboard

You can navigate to the Compliance Dashboard in the following ways:

- **From the StackGen Home page**: Click **Compliance** from the navigation panel to the left.



![Compliance Nav](https://docs.stackgen.com/assets/images/compliancenav-e06b364d9883eca4b47e6651bfb89165.jpg)

- **From within an appStack**: You can navigate to the **Compliance Dashboard** in the following ways:
  - **Policy Violations**: Click expandable **Policy Violations** bar at the bottom of your appStack page **\> View Compliance**.



    ![Policy Violations tab - appStack](https://docs.stackgen.com/assets/images/asspatckpolicynav-52c3e7f9a34e83d75a47c0b3e1e2b6d4.jpg)

  - **Policies tab**: From the appStack **Menu** bar to the top click **Policies > View Compliance**.



    ![Policy Violations tab - appStack](https://docs.stackgen.com/assets/images/appstackpoliciestabvew-2aa3705617fe269a72307284e0f7078a.jpg)

Let’s look at the Compliance Dashboard in detail.

## Understanding the Compliance Dashboard

The compliance dashboard consists of the following information:

![Compliance Dashboard](https://docs.stackgen.com/assets/images/compliancedashboard-b5799a9762de0c884ca9a75159f25a80.jpg)

1. **Top-level filter**
   - **Search Bar for Policy Lookup**: Use the search bar to quickly find specific policies from the list. You can search by policy name to locate relevant policies faster. Currently, it supports exact match, partial, or fuzzy search.

   - **Status Filter**: Use this filter to view policies based on their evaluation status, i.e., **Passed** or **Failed**

   - **Severity Filter**: Filter policies based on their severity level: **High**, **Medium**, or **Low**. This helps prioritize which violations need immediate attention.

   - **Resource Type Filter**: Filter policies by the type of cloud resource they apply to, such as EC2, S3, Lambda, VPC, etc. This makes it easier to focus on specific services within your appStack.

   - **Benchmarks Filter**: Filter policies based on the compliance benchmarks they are mapped to, such as **HIPAA**, **ISO**, **FedRAMP**, etc. This helps you focus on violations relevant to specific regulatory or security standards.

   - **appStack Filter**: Use this filter to view policies associated with a specific appStack. This helps you narrow down policy violations or passes within the context of a single application deployment, making it easier to troubleshoot or audit individual stacks.



     note





     - By default, the Compliance Dashboard displays the policy results (passed or failed) for the most recently created appStack. To view compliance details for a different appStack, use the **appStack filter** to select the one you want to review.
     - If you delete a recently created appStack, you will still be able to view the compliance dashboard until you hard delete an appStack by deleting it from the [Archived](/docs/stackgen/concepts/appstacks/manageappstacks#delete-and-archive) tab.

   - **Categories Filter**: Use this filter to group and view policies based on their functional categories, such as Compliance Validation, Data Protection, IAM, and Resilience. This helps you quickly identify and focus on specific areas of your cloud security posture.
2. **Data Snapshot**
   - **Total Benchmarks**: Displays the total number of compliance benchmarks assessed based on your current filter selections.
   - **Total Violations**: Shows the total count of policy violations detected according to the filters you have applied.
   - **High Severity Policies**: Displays the total number of policies with high severity that have been evaluated based on your current filter selections.
   - **Medium Severity Policies**: Shows the total number of policies with medium severity evaluated based on the selected filters.
   - **Low Severity Policies**: Displays the total number of policies with low severity evaluated according to the selected filters.
3. **Control IDs**: Unique identifiers assigned to each policy or compliance requirement. They help you track, reference, and audit specific controls across various compliance frameworks.

Clicking the **+** icon next to a Control ID expands the view, allowing you to filter and explore the various Control IDs associated with policies applied to your appStack.



![Control Ids](https://docs.stackgen.com/assets/images/controlids-718ecba35859a64da1ded2d7e532aef7.jpg)













important





Currently, StackGen supports only MARS-E Control IDs.

4. **Export as CSV**: Allows you to download the current list of policy violations and remediation details as a CSV file. This makes it easy to share, analyze, or integrate compliance data with your internal tools and audit processes.

5. **Rows per page**: Allows you to control how many rows are displayed on each page of the policy list for easier navigation and review.

6. **Page Navigation**: Use the page navigation controls to move between pages of the policy list, making it easy to browse through large sets of rows.


At any time, clicking on a policy row opens the **Policy Compliance** dialog, where you can view detailed information about the policy, such as a description of the policy, its evaluation status, and associated control IDs.

![Policy Compliance](https://docs.stackgen.com/assets/images/policycompliance-ddfad133bd2da4f00a2ed63bbf205ab0.png)

## Supported Frameworks

Here's the list of Frameworks that the Compliance Dashboard supports:

- MARS-E
- NIST
- HIPAA
- ISO
- GDPR
- FedRAMP
- CIS
- COBIT
- CSA CCM
- SOC2
- PCI
- AWS Security
