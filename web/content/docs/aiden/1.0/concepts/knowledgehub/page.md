---
title: "Augmenting Integrations"
product: "aiden"
sourcePath: "/aiden/1.0/concepts/knowledgehub"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/concepts/knowledgehub"
status: "ok"
---

Knowledge Bases enable Aiden to understand your unique infrastructure, processes, and organizational practices. Think of it as onboarding Aiden to your team by sharing crucial context about how things work in your environment. You can define the Base Knowledge in StackGen Aiden via the Knowledge Hub.

## Augmenting Integrations

Knowledge Bases significantly enhance Aiden's ability to work with your integrated tools by providing essential context about your setup. For example:

- We use the label `env` in our Prometheus metrics to denote the environment (prod/staging/dev).
- Our AWS resources follow the naming convention: `{team}-{env}-{service}`.
- All production databases have tags: `environment=prod`, `backup=daily`.

This context helps Aiden formulate more precise queries and actions when working with your integrated systems.

Coming Soon: Automated Context Collection

In the near future, Aiden will automatically build Knowledge Bases by analyzing your integrated tools and systems. This automated discovery will work alongside your manually provided information to create a comprehensive understanding of your environment. For instance, Aiden will be able to:

- Discover common patterns in your cloud resource tags.
- Learn about your monitoring label schemas.
- Understand your deployment patterns.
- Map service dependencies.

## Writing Effective Knowledge Bases

For detailed guidance, examples (including discovery-generated content), and best practices, see [Writing Effective Knowledge Base Articles](/docs/aiden/1.0/concepts/writing-effective-knowledge-base).

Write your Knowledge Bases as if you're explaining your setup to a new senior DevOps engineer. For example:

`We use a centralized ArgoCD instance for all our deployments. Applications are segregated using ArgoCD projects, with each team having their own project. All production deployments require approval from two team leads.`

Some key areas to document:

- Deployment workflows and practices.
- Infrastructure architecture and patterns.
- Security policies and compliance requirements.
- Development environments and configurations.
- Release processes and gates.
- Incident response procedures.

### Knowledge Base Best Practices

- **Keep it Natural**: Write in plain language. You do not have to use any special formatting or structures.
- **Be Specific**: Include details that make your setup unique,
- **Include Context**: Add explanations for why certain choices were made.
- **Document Exceptions**: Note any special cases or variations in your processes.

## Getting Started

Start with documenting your most frequently used processes and your tool-specific configurations. This helps Aiden immediately provide more accurate assistance, especially when working with your integrated systems.

Follow these steps to configure Base Knowledge via Knowledge Hub:

1. From the StackGen Home page, navigate to **Knowledge Hub > click Manage on the Base Knowledge card**.
2. Choose your preferred input method. You can configure the Knowledge Base using three input methods inside the Knowledge Hub:
   - **Text Input**: type or paste content directly. Ensure that your title and description is extremely targeted so that Aiden can refer to the defined context when it references the knowledge hub.



     ![Text](https://docs.stackgen.com/assets/images/knowledgehub-38bea0a8467e70c7ead7e86b7652399c.png)

   - **Upload Files**: upload knowledge base docs. Current we support `.txt`, `.pdf`, `.docx`, and `.md` file uploads with a maximum size of 10 MB.



     ![Upload file](https://docs.stackgen.com/assets/images/fileupload-e3643465d0d112cbfaddf28ddd7fa19c.png)

   - **Fetch from URL**: You can import publicly accessible knowledge base via a URL link.


     ![Fetch from URL](https://docs.stackgen.com/assets/images/fetchfromurl-d03b4a42edcaae6e6baef0f2a4151bf0.png)
3. Click **Save** once done.

You can view Knowledge Base Documents below the Knowledge Base definition pane where you can:

- Search documents.
- View knowledge base source: Text Input, File Upload, or URL.
- View the size and added date.
- Delete documents.
- Edit Knowledge Base created via Text Input.

## Important Notes About Managing Base Knowledge

### Uploaded Documents

- Uploaded files (TXT, PDF, DOCX, MD) cannot be viewed or edited inside Knowledge Hub.
- To update the content of an uploaded document, you must edit the original file, then upload the updated version again.

### Fetched URLs

- When knowledge is added via Fetch from URL, the content is pulled directly from the source URL.
- You cannot edit URL-based knowledge within Knowledge Hub.
- To update this knowledge, you must edit the content at the source URL, then re-fetch it in the Knowledge Hub.

- [Augmenting Integrations](/docs/aiden/1.0/concepts/knowledgehub#augmenting-integrations)
- [Writing Effective Knowledge Bases](/docs/aiden/1.0/concepts/knowledgehub#writing-effective-knowledge-bases)
  - [Knowledge Base Best Practices](/docs/aiden/1.0/concepts/knowledgehub#knowledge-base-best-practices)
- [Getting Started](/docs/aiden/1.0/concepts/knowledgehub#getting-started)
- [Important Notes About Managing Base Knowledge](/docs/aiden/1.0/concepts/knowledgehub#important-notes-about-managing-base-knowledge)
  - [Uploaded Documents](/docs/aiden/1.0/concepts/knowledgehub#uploaded-documents)
  - [Fetched URLs](/docs/aiden/1.0/concepts/knowledgehub#fetched-urls)
