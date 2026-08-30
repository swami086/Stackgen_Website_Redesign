---
title: "Create a Skill"
product: "aiden"
sourcePath: "/aiden/1.0/skills"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/skills"
status: "ok"
---

Skills in Aiden are predefined capabilities that allow the system to perform specific actions based on your requests. Each skill consists of a series of steps that define how Aiden should respond to a particular type of query. Each step has an agent field that will execute that particular step.

Every time Aiden gets a query it internally runs a skill-matching system, based on which it decides whether it should use a particular skill and follow the steps within a skill or bypass it. If Aiden has matched skill and used it to generate a response, it will mention the skill used.

## Create a Skill

Before creating a skill, ensure that you have clearly defined its purpose. Consider the following before you create a skill:

- What specific task will this skill perform?
- What are the expected outcomes when the skill is executed?
- What steps will the skill run and what will be the outcome of each step?

Let's see how to create a skill in detail.

### Steps to Create a Skill in Aiden

Follow these steps after logging into the [StackGen Aiden](https://aiden.stackgen.com/signup) platform:

1. From the Aiden Home page, click **Skills** from the navigation panel to the left.

2. Click **Add Custom Skill**. You can enable the **Visual Editor** to define your skill or choose to define steps in text.



![text editor](https://docs.stackgen.com/assets/images/visualskill-ab6080f7a9df4db1a7332c0cff471c6c.png)

3. In both cases above, you will need to provide the following details in the **Add Custom Skill** dialog:
   - **Skill Name**: A clear and brief overview of when the skill should be used.
   - **Skill Description**: A brief overview of what the skill does and its intended use.
   - **Skill Steps**: A sequence of actions that Aiden will follow to execute the skill.

     1. Once you click **\+ Add Step**, you will have to select the following:

        - **Agent**: The agent that is the most capable of executing the skill step.

        - **Step Description**: A description of what the selected agent should do. We recommend that the description include a goal for each skill step and is detailed.



          ![text editor](https://docs.stackgen.com/assets/images/addskilltext-a53f28d2bf01702db221274ea7c4d336.png)
     2. Click **Save** once done.
4. You can see Aiden uses this skill to generate the response to a query relevant to this skill:



![Skill in use](https://docs.stackgen.com/assets/images/skilluse-34192c3e8f2827788266375940bea337.png)


- [Create a Skill](/docs/aiden/1.0/skills#create-a-skill)
  - [Steps to Create a Skill in Aiden](/docs/aiden/1.0/skills#steps-to-create-a-skill-in-aiden)
