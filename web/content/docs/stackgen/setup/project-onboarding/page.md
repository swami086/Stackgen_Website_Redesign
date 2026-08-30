---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/setup/project-onboarding"
sourceUrl: "https://docs.stackgen.com/docs/setup/project-onboarding"
status: "ok"
---

Use guided onboarding to create a **Project** and complete its initial setup in a single flow. This guide explains who can use project onboarding, what the onboarding flow includes, and how to continue setup after the project is created.

warning

Project creation and guided onboarding are intended for **Admin** and **DevOps** users.

**What you will learn:**

- What guided onboarding includes during project creation
- How to create a project step by step
- How to prefill values from an existing project
- What happens after onboarding is complete

## Overview

Guided onboarding replaces the earlier basic project creation form with a multi-step workflow. Depending on your tenant configuration, the flow can include:

- **Project details**
- **Members**
- **SCM / Git configuration**
- **Environment setup**
- **Governance**
- **Summary**

This structure helps you complete core project configuration before the project is created.

## Who can create projects

| Capability | Admin | DevOps | Developer |
| --- | --- | --- | --- |
| Create a project with guided onboarding | Yes | Yes | No |
| Add members during onboarding | Yes | Yes | No |
| Configure project setup during onboarding | Yes | Yes | No |
| Review project dashboard after creation | Yes | Yes | Yes |

## Create a project

Click to view

Follow these steps to create a project:

1. Open **Settings > Projects**.
2. Click **\+ New Project**.
3. In the first step, enter the **Project name** and **Project description**.
4. Add members if needed, and adjust the **Role within Project** for each member you add. You can invite teammates to the project by email (including people who have not signed up yet). See [Invite teammates to a project by email](/docs/stackgen/setup/settings#invite-teammates-to-a-project-by-email) and [v2026.7.3](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#invite-teammates-to-projects-by-email).
5. Continue through the onboarding steps for **SCM**, **environment setup**, **governance**, and **summary**.
6. Review the summary and finish project creation.

![Create project and configure wizard step 1 of 5 with Prefill from another project optional section and project details fields](https://docs.stackgen.com/assets/images/apr26-project-onboarding-a22c2e8e2b0c91d7416bfe9293021b55.png)

note

You can skip optional setup steps and complete them later from the **Project Dashboard**.

## Prefill from another project

Click to view

Use **Prefill from another project** when the new project should start from an existing project baseline.

1. In the first onboarding step, open **Prefill from another project**.
2. Select the **Source project**.
3. Click **Apply copy**.
4. Review the copied values before you continue.

StackGen can copy items such as:

- **Members**
- **SCM defaults**
- **Environment names**
- **Governance**

The copied values remain editable before you save the project.

![Prefill from another project optional section with Source project dropdown and Apply copy button during project onboarding](https://docs.stackgen.com/assets/images/apr26-copy-project-settings-9b13fee1b46756ab3ed93bf5f60d67aa.png)

## After project creation

When onboarding is complete, StackGen opens the **Project Dashboard**. Use this page to review:

- Project-level metrics such as **appStacks**, **members**, **modules**, and **environments**
- The setup guide for any step you skipped
- Links to **Members**, **Environment Configuration**, and related project pages

If you skipped an optional onboarding step, return to it from the setup guide.

## Benefits

- Guided onboarding helps you capture project setup in a consistent sequence.
- Project creation, membership setup, and follow-up configuration are grouped into one flow.
- Prefill support helps teams start new projects from an existing baseline instead of repeating the same setup manually.

## Best practices

tip

- Add the right members and roles during onboarding so project access is correct from the start.
- Use **Prefill from another project** only when the source project is a valid baseline for the new project.
- Review copied values before you finish, especially **SCM**, **environment**, and **governance** settings.
- Use the **Project Dashboard** to complete any optional steps that were skipped during onboarding.
