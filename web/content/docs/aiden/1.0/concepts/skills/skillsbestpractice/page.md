---
title: "Think in Outcomes, Not Prompts"
product: "aiden"
sourcePath: "/aiden/1.0/concepts/skills/skillsbestpractice"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/concepts/skills/skillsbestpractice"
status: "ok"
---

Skills let you create **custom workflows** or **custom deterministic behaviors** by teaching **Aiden** how to perform repeatable, multi-step tasks reliably and at scale. Well written skills reduce ambiguity, improve accuracy, and ensure consistent results across queries.

You can **assign a skill to an agent or expert**. In a multi-step skill, you can **assign individual steps to different experts**—so the right expertise handles each part of the workflow. This is a handy and important feature when building skills.

In this article, we cover best practices for designing skills that Aiden can understand, execute, and reuse effectively.

## Think in Outcomes, Not Prompts

Every skill should start with a **clear outcome**. Before writing a skill, define what success looks like:

- What problem does this skill solve?
- What should the final response contain?

**Examples**

- Generate a CPU and memory usage report for pods in a Kubernetes namespace.
- Scan AWS S3 buckets for HIPAA compliance.

A focused outcome keeps the skill simple and predictable.

## Break Work into Explicit Steps

Skills work best when tasks are broken into **clear, sequential steps**. Each step should answer one question: `What does Aiden need to do *now*?`

Avoid bundling unrelated actions into a single instruction.

**Example**
Instead of: `“Analyze pod usage and generate insights”`, prefer using:

1. Identify pods in the specified namespaces.
2. Collect CPU and memory usage, requests, and limits.
3. Calculate utilization percentages.
4. Generate a structured report with insights.

When you use multiple steps, you can **assign each step to an expert**. That way, specialized agents handle the steps that match their expertise (for example, one expert for data retrieval, another for analysis or reporting), which improves reliability and consistency.

## Be Precise with Instructions

Vague prompts lead to inconsistent behavior.

When writing skill steps:

- Say _what_ to fetch.
- Say _how_ to process it.
- Say _how_ to present it.
- **Avoid Using**: Fetch relevant metrics and analyze them.
- **Prefer**: Collect CPU and memory usage, requests, and limits for each pod and calculate utilization percentages.

Precision reduces interpretation, and improves reliability.

## Define the Output Shape

Always specify the **expected output format**. This helps Aiden produce consistent responses every time the skill is used. You can define:

- Tables
- Reports
- Bullet summaries
- Required fields or sections

Structured outputs are easier to read, compare, and automate against.

## Make Data Retrieval Explicit

If a step depends on accurate data, don’t rely on inference. This is especially important for metrics, compliance checks, and infrastructure data. Explicit data instructions significantly improve consistency and trust. You can do that by providing:

- Exact query templates.
- Clear data sources.
- Required filters or groupings.
- **Scope the Data Your Skill Operates On**: Define the **scope of data** that the skill will ask Aiden to fetch, analyze, and generate a response from. Large scope often leads to inconsistent or incomplete results.
  - **Example:** For the **CPU and Memory usage Report** use-case, if you have multiple clusters where each cluster has multiple namespaces, and you write a skill to fetch usage metrics for each pod from each namespace of all the clusters. It amounts to a large set of data that Aiden will need to process and analyse. In such cases, Aiden will mostl probably generate inconsistent and incomplete responses.
- **Recommendation:**run and test the defined skill for completeness of the required data in the response, and then scope down or scope up the skill requirements accordingly.
  - **Scope down, if results are incomplete or unreliable:** For example, change the skill definition from _“CPU and memory usage of pods from all clusters”_ to _“CPU and memory usage of pods from a single cluster”_ or _“from a namespace within a cluster”_; and update the skill steps accordingly.
  - **Scope up**: only when the scoped-down skill reliably produces accurate and complete results should you expand your data set.



    Defining a manageable scope and updating the skill’s steps to match it improves consistency and completeness.

## Iterate Based on Results

Skills are not “set and forget.” After creating a skill you'll need to:

1. Test it with real queries.
2. Review accuracy and consistency.
3. Refine steps that produce unreliable results.

If Aiden struggles with a step, make that step more explicit.

**Rule of thumb:** If Aiden has to guess, the skill needs refinement.

### Single-Step vs Multi-Step Skills

- Some skills work better as: **Single-step skills** where all instructions are in one step.
- Others perform better as **Multi-step skills** where you have one instruction per step.

There’s no universal rule. You can **assign the whole skill to an agent or expert**, or in multi-step skills **assign each step to a different expert**. Assigning steps to experts is especially useful for complex workflows where different steps benefit from different expertise (for example, infrastructure vs. compliance vs. reporting).

Try both and choose the structure that produces the most reliable results.

### Common Pitfalls

- **Vague Instructions**that leave too much room for interpretation.
  - Identify resources.
  - Analyze metrics.
  - Generate a report.
- **Undefined Output**: Without a defined format, responses may vary each time the skill runs.
- **Implicit Data Sources**: Relying on indirect or inferred data sources can reduce accuracy and repeatability.

## Skills vs Prompts

Aiden supports both **prompts** and **skills**, but they serve different purposes. Understanding when to use each helps you get more accurate, consistent, and reusable results.

#### Prompts: One-Off Instructions

Prompts are best for **single, immediate requests**. Prompts are flexible, fast, and great for ad-hoc questions, but they rely heavily on interpretation.

They work well when:

- The task is simple.
- The request is exploratory.
- You don’t need consistent structure across runs.

**Example Prompt**: “What’s the CPU usage for pods in the `default` namespace?”

#### Skills: Repeatable Workflows

Skills are designed for **structured, repeatable tasks**. Once defined, the skill can be reused across queries without redefining the logic each time.

Skills can also be used via user-defined `Aiden Tasks` that run on a schedule (daily, weekly, and so on). This is a common use case: a task runs on a schedule and uses a skill to generate results in the format that the skill defines. For example, if you create a skill to _Generate a CPU and memory usage report for pods in a Kubernetes cluster_. It would be optimal to define separate tasks that run daily, each invoking that skill for a different cluster:

- Generate CPU and memory usage report for cluster A.
- Generate CPU and memory usage report for cluster B.
- Add further skills for the remaining clusters.

A skill defines:

- **What steps to follow**.
- **How data should be fetched**.
- **How results should be structured**.

They shine when:

- The task involves multiple steps.
- Accuracy and consistency matter.
- The same workflow is used repeatedly.

**Example Skill Outcome:** “Generate a standardized CPU and memory usage report for pods in one or more namespaces, including utilization insights.”

#### Key Differences at a Glance

| Feature | Prompts | Skills |
| --- | --- | --- |
| Purpose | One-off requests | Repeatable workflows |
| Structure | Free-form | Step-based |
| Consistency | Varies by query | Predictable and repeatable |
| Output Format | Often implicit | Explicitly defined |
| Best For | Exploration, quick questions | Reports, analysis, compliance checks |

### When to Use a Prompt

Use a prompt when:

- You’re asking a quick question
- You’re exploring or experimenting
- The output doesn’t need a fixed structure

Good Prompt Use Cases:

- Quick metric lookups
- Clarifying system behavior
- One-time explanations

### When to Use a Skill

Use a skill when:

- The task has **multiple steps**
- The same task will be reused
- Results must be **accurate and consistent**
- Output format matters

Good Skill Use Cases:

- Infrastructure analysis reports
- Compliance scans
- Audits and recurring checks
- Standardized summaries or dashboards

### Prompts Can Become Skills

Many skills start as prompts.

If you find yourself repeating the same prompt or refining it to get consistent results, it’s a strong signal that the logic should be turned into a skill.

**Example Evolution**

**Prompt**: “Check CPU and memory usage for pods and tell me if anything looks wrong.”

**Skill**:

1. Identify pods in the specified namespaces
2. Collect CPU and memory usage, requests, and limits
3. Calculate utilization percentages
4. Generate a structured report with insights

The skill removes guesswork and ensures consistency.

### Choosing the Right Option

Ask yourself:

- Will I run this more than once?
- Does this require multiple steps?
- Do I need a predictable output format?

If the answer is **yes**, a skill is the better choice. If not, a prompt is often enough. Prompts are great for asking questions. Skills are how you **teach Aiden how to work**. Use prompts to explore. Use skills to operationalize.

- [Think in Outcomes, Not Prompts](/docs/aiden/1.0/concepts/skills/skillsbestpractice#think-in-outcomes-not-prompts)
- [Break Work into Explicit Steps](/docs/aiden/1.0/concepts/skills/skillsbestpractice#break-work-into-explicit-steps)
- [Be Precise with Instructions](/docs/aiden/1.0/concepts/skills/skillsbestpractice#be-precise-with-instructions)
- [Define the Output Shape](/docs/aiden/1.0/concepts/skills/skillsbestpractice#define-the-output-shape)
- [Make Data Retrieval Explicit](/docs/aiden/1.0/concepts/skills/skillsbestpractice#make-data-retrieval-explicit)
- [Iterate Based on Results](/docs/aiden/1.0/concepts/skills/skillsbestpractice#iterate-based-on-results)
  - [Single-Step vs Multi-Step Skills](/docs/aiden/1.0/concepts/skills/skillsbestpractice#single-step-vs-multi-step-skills)
  - [Common Pitfalls](/docs/aiden/1.0/concepts/skills/skillsbestpractice#common-pitfalls)
- [Skills vs Prompts](/docs/aiden/1.0/concepts/skills/skillsbestpractice#skills-vs-prompts)
  - [When to Use a Prompt](/docs/aiden/1.0/concepts/skills/skillsbestpractice#when-to-use-a-prompt)
  - [When to Use a Skill](/docs/aiden/1.0/concepts/skills/skillsbestpractice#when-to-use-a-skill)
  - [Prompts Can Become Skills](/docs/aiden/1.0/concepts/skills/skillsbestpractice#prompts-can-become-skills)
  - [Choosing the Right Option](/docs/aiden/1.0/concepts/skills/skillsbestpractice#choosing-the-right-option)
