---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/rbac/governance"
sourceUrl: "https://docs.stackgen.com/docs/concepts/rbac/governance"
status: "ok"
---

For Platform and DevOps Engineers

## Overview

The governance process in StackGen begins with defining policies, where governance rules are defined and validated. These policies are then assigned to specific projects or appStacks to ensure targeted enforcement. Compliance is maintained through automated validation, continuously checking infrastructure against governance standards. When deviations occur, remediation steps are initiated, offering automated suggestions to restore compliance and uphold governance requirements.

![Governance Lifecycle](https://docs.stackgen.com/assets/images/GovernanceLifecycle-b97352da55f7719c431a273101b02f67.jpg)

## Governance Workflow

Governance in StackGen consists of three key steps: Governance Configuration, Governance Assignments, and Custom Policies. Together, these steps let you enforce access control, security, and compliance, ensuring that your teams can collaborate effectively within well-defined governance boundaries.

| Steps | Description |
| --- | --- |
| **Governance Configuration** | - Define a set of custom policies that regulate infrastructure resource usage.<br>- Can be assigned at the project level.<br>For example, restrict users within a project to create appStacks on AWS cloud. |
| **Governance Assignments** | - Assign governance configurations to projects or appStacks.<br>- Enforce security, compliance, and operational policies automatically.<br> For example, ensure that developers creating an appStack have a restriction on the number of resources they can add to the infrastructure |
| **Custom Policies** | Assign custom policies to appStacks, such as: <br>- Custom IAM Policies<br>- Resource Restriction Policies<br>- Resource Mapping / Override Policies<br>- Resource Security Policies<br>- Resource Pack Policies<br>Refer to the [CLI Guide](/docs/stackgen/cli-guide) to learn how to sideload these policies into StackGen. |

**Next**: Let's understand each of these one by one.
