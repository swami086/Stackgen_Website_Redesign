---
title: "StackGen-provided Policies"
product: "stackgen"
sourcePath: "/docs/concepts/policies"
sourceUrl: "https://docs.stackgen.com/docs/concepts/policies"
status: "ok"
---

Policies help organizations apply security, governance, and operational requirements to cloud infrastructure managed in StackGen. StackGen validates policies during infrastructure design and deployment workflows. Depending on the policy type, StackGen can validate module configuration inputs on the Topology canvas or Terraform resources in generated infrastructure as code (IaC).

StackGen supports two policy categories:

- [StackGen-provided policies](/docs/stackgen/concepts/policies#stackgen-provided-policies)
- [Custom Policies](/docs/stackgen/concepts/policies#custom-policies)

## StackGen-provided Policies

StackGen provides built-in policies that you can select when creating an appStack.

These policies are designed to help organizations apply common security and compliance requirements. Available policies include coverage for the following frameworks:

| Framework | Framework | Framework |
| --- | --- | --- |
| FedRAMP | GDPR | HIPAA |
| MARS-E | NIST 800-171 | NIST 800-53 |
| NIST CSF | SOC 2 | PCI DSS |

When you select a StackGen-provided policy for an appStack, StackGen applies the policy checks to the applicable resources in that appStack.

StackGen-provided policies can help you:

- Apply common compliance requirements without creating policies from scratch.
- Use consistent controls across appStacks.
- Identify configuration issues during infrastructure design and deployment.

Select the policies that apply to your organization's requirements when you create an appStack.

## Custom Policies

Custom Policies let you define governance requirements that are specific to your organization.

You can create and manage Custom Policies by using the StackGen CLI or the StackGen UI. Supported authoring options depend on the policy type:

- Use the **StackGen CLI** to create and manage JSON-based policies.
- Use the **StackGen UI** to create Module Restriction Policies and OPA/Rego Security Policies.

For the full guide, see [Custom Policies](/docs/stackgen/concepts/policies/custom-policies).

### Security Policies

Security Policies use OPA/Rego and can run at one of two levels:

- **Module level:** Evaluates the inputs configured for a catalog module on the Topology canvas. Feedback can appear when you edit and save the module.
- **Resource level:** Evaluates Terraform or OpenTofu provider resources in the compiled **plan**. When the policy is enforced through a **Governance Configuration**, results show as warnings on the **Policy Scan** tab only after a successful plan and a policy scan (automatic **Run policy scan after plan**, or **Re-run scan**). Canvas edits alone do not trigger resource-level warnings.

note

Each Security Policy targets **one** catalog module or **one** Terraform provider resource type. You cannot attach multiple resource types to a single Security Policy. For details and the mandatory-tags example, see [One policy per resource type or module](/docs/stackgen/concepts/policies/custom-policies#one-policy-per-resource-type-or-module).

For more information, see [How StackGen validates custom policies](/docs/stackgen/concepts/policies/custom-policies#how-stackgen-validates-custom-policies) and [When resource-level policies run](/docs/stackgen/concepts/policies/custom-policies#when-resource-level-policies-run).

### Common Custom Policy use cases

Custom Policies can support requirements such as:

- **Resource configuration:** Require specific settings, such as encryption for storage resources.
- **Access control:** Define IAM roles and permissions that support least-privilege access.
- **Networking:** Apply requirements for firewall rules, VPC configuration, and traffic controls.
- **Module restrictions:** Control which catalog modules a project can use and, optionally, which module versions are allowed.
- **Resource mapping:** Define approved mappings or relationships between resources in an appStack.

You can apply Custom Policies to specific projects or across your organization by assigning them through [Governance Configurations](/docs/stackgen/concepts/rbac/governance/governanceconfig).

## Policy violations

The **Policy Violations** section identifies resources or configurations that do not meet the requirements of StackGen-provided policies or Custom Policies.

When StackGen detects a violation, you can review it in the **Policy Violations** tab. The violation details identify the affected resource or configuration and provide information that can help you investigate and resolve the issue.

For more information, see [Policy Violations](/docs/stackgen/support-and-kb/troubleshooting/policy-violation).

- [StackGen-provided Policies](/docs/stackgen/concepts/policies#stackgen-provided-policies)
- [Custom Policies](/docs/stackgen/concepts/policies#custom-policies)
  - [Security Policies](/docs/stackgen/concepts/policies#security-policies)
  - [Common Custom Policy use cases](/docs/stackgen/concepts/policies#common-custom-policy-use-cases)
