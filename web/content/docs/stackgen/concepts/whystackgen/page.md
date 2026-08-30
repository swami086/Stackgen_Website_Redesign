---
title: "What is IaC?"
product: "stackgen"
sourcePath: "/docs/concepts/whystackgen"
sourceUrl: "https://docs.stackgen.com/docs/concepts/whystackgen"
status: "ok"
---

## What is IaC?

**Infrastructure as Code (IaC)**, is an automated and standardized approach to infrastructure management that removes manual intervention and streamlines cloud deployments. StackGen redefines traditional IaC practices by introducing **Generative Infrastructure from Code**, which derives IaC configurations directly from application source code or other high-level inputs such as templates and designs.

## Why StackGen?

IaC should be a help, not hinder. Yet 97% of users report challenges with IaC, with top concerns around enforcing consistent configurations across environments (56%) and managing multiple tools, which can create steep learning curves and compatibility issues (54%). These issues slow down the entire ecosystem of infrastructure, from software deployment to long-term care and maintenance.

StackGen solves these problems with Infrastructure from Code. It automates IaC creation, cleanup, and refactoring by analyzing, visualizing, and generating secure, compliant infrastructure for every deployment. The Infrastructure from Anywhere to Everywhere approach enables users to bring their own code, standards, and cloud preferences, translating them into consistent IaC for seamless deployment across any cloud environment. This eliminates the need for manual configuration, accelerates workflows, and simplifies infrastructure management. StackGen benefits DevOps, platform engineers, and developers by streamlining processes, reducing errors, and enhancing infrastructure efficiency across any environment.

### How Does StackGen Work?

**Infrastructure from Anywhere to Everywhere**

- **Infrastructure from Code (Code-to-Code)**: Auto-generate IaC based on application code with golden standards applied. Deploy to AWS, Azure, or GCP. Build for new applications or refactor legacy applications from the ground up. For developers.
- **Infrastructure from Design (Canvas-to-Code)**: Drag and drop resources, including resource packs and custom policies, to create and visualize your deployment architecture. Generate secure and compliant IaC based on your preferred architectural standards. For platform engineers and DevOps.
- **Infrastructure from State Files (Cloud-to-Code)**: Ingest your existing IaC files, enhance and remediate them to ensure reliable, standardized, and secure IaC. Generate IaC for resources created manually or by ClickOps. For platform engineers and DevOps.
- **Infrastructure from Cloud (Cloud-to-Cloud)**: Migrate infrastructure by translating your IaC from one cloud to another cloud. For platform engineers and DevOps.

### How StackGen Implements IaC?

- **Infrastructure from Code**: StackGen analyzes the application code (e.g., Python or Java) and auto-generates IaC files, such as Terraform or Helm charts. This eliminates the need for developers to write infrastructure configurations manually.
- **Security-First Design**: The generated IaC adheres to pre-defined golden standards for security and compliance. This means that security policies (e.g., SOC2, HIPAA, and NIST-CSF) are embedded during the IaC creation process, ensuring compliance without additional effort.
- **Policy-Driven Automation**: StackGen integrates policies and best practices directly into IaC generation, providing built-in validation for scalability, security, and reliability. This avoids issues that might arise from post-creation scanning or manual remediation.
- **Modularity and Portability**: Developers can visually design infrastructure or use existing templates. StackGen can migrate IaC configurations across different cloud providers (e.g., AWS, Azure) while preserving compliance and security standards.
- **Accelerated Deployment**: The tool removes bottlenecks in the software development lifecycle (SDLC) by automating IaC generation. This reduces cognitive overhead for developers, allowing them to focus on coding while ensuring rapid and secure deployments.

### Unique Features from the StackGen Approach

- **Application-Centric**: It works with your existing application code and integrates infrastructure without requiring major changes to the source.
- **Standardization by Default**: All configurations are consistent and policy-compliant, which reduces errors and improves maintainability.
- **Visual and Intuitive**: Supports drag-and-drop infrastructure design, making it accessible even to projects with limited cloud expertise.

StackGen's approach to IaC simplifies cloud operations, reduces human error, and speeds up the path from development to production, making it a compelling choice for projects aiming to modernize their infrastructure practices.

- [What is IaC?](/docs/stackgen/concepts/whystackgen#what-is-iac)
- [Why StackGen?](/docs/stackgen/concepts/whystackgen#why-stackgen)
  - [How Does StackGen Work?](/docs/stackgen/concepts/whystackgen#how-does-stackgen-work)
  - [How StackGen Implements IaC?](/docs/stackgen/concepts/whystackgen#how-stackgen-implements-iac)
  - [Unique Features from the StackGen Approach](/docs/stackgen/concepts/whystackgen#unique-features-from-the-stackgen-approach)
