# **AIOS: Core Differentiators**

*Note: AIOS is an internal product name. Externally, we should only refer to these features as platform features of Aiden, or Aiden Agentic Operating System, etc.*

## **The Enterprise Operating System for Governed Agents**

Most AI products start with a model and a chat interface. AIOS starts with the requirements of real operational work: agents need the right context, clear limits on what they can do, repeatable ways to execute, and a record that teams can trust.

AIOS brings together specialized agents, shared organizational knowledge, enforceable governance, and a deterministic infrastructure control plane. It gives enterprises a common foundation for building applications that can investigate, recommend, and carry out operational work—not simply answer questions in a chat window.

> **AIOS gives enterprises a way to make agents grounded, governed, and useful in the systems where work actually happens.**

*Availability and integrations vary by deployment and configuration. Advanced Context Graph and Institutional Learning capabilities should be positioned according to the customer’s enabled product scope.*

## **Agent Platform**

### **Persona Agents**

**What it is: Purpose-built** agents configured for a specific role, responsibility, and set of approved capabilities. A persona defines the job an agent is there to do—its mission, operating instructions, relevant knowledge, available tools, and boundaries for when to act, ask for input, or escalate. This creates a clear layer between a general-purpose model and an agent built for a real enterprise function.

**What it enables:** Teams can use agents designed for a real job—such as investigating an operational issue, handling a DevOps request, or supporting infrastructure work—instead of relying on one generic assistant for everything. Different agents can apply the same organizational standards while bringing the right context and process to the task at hand.

**Why it matters:** Enterprise work is organized around teams, roles, and responsibilities. Specialized agents create clearer ownership, more consistent behavior, and a better fit for how teams already operate. They also make it easier to introduce AI in a focused, manageable way rather than asking a single general-purpose agent to do everything.

### **Skills and Deterministic Workflows**

**What it is:** Skills package reusable task expertise: the inputs an agent needs, the tools it may use, the checks it should perform, and the output it should produce. Workflows define explicit multi-step procedures, decision points, validations, and handoffs for recurring work. Together, they turn an organization’s preferred ways of working into reusable building blocks for agents and operators.

**What it enables:** AIOS combines the flexibility of an agent with approved, repeatable processes for work that should not be reinvented every time. An agent can investigate ambiguity, gather information, and make recommendations, while a workflow provides a reliable path for known tasks such as triage, remediation, provisioning, or request fulfillment.

**Why it matters:** Enterprises need more than a helpful answer. They need a dependable path from request to outcome—especially for operational work with known procedures, dependencies, and risk. Skills and workflows help turn tribal knowledge and proven operating practices into reusable capability that can be applied consistently across people, teams, and agent runs.

### **Activity and Replay \- Audit**

**What it is:** A live view of agent and workflow activity, plus the ability to replay completed work step by step. It captures the progress of an investigation or workflow, the sequence of steps taken, the outcomes produced, and the points where a person participated or approved work. This creates an operational record that is designed for review, not just a conversational history.

**What it enables:** Operators can follow work while it is running, understand what happened afterward, and revisit prior runs for debugging, postmortems, and training. A successful investigation or workflow becomes a concrete artifact that teams can inspect and learn from rather than a result that disappears into a chat transcript.

**Why it matters:** Agents must be operable like production software. Activity and replay replace black-box behavior with practical visibility for operators, making it easier to build trust, identify improvements, and support accountable use in real operational environments.

### **Cost Governance and Model Choice**

**What it is:** Controls and visibility for model usage, token costs, budgets, and model/provider selection by agent or workflow. AIOS gives teams a way to configure the model that best fits a particular task and to see the resulting usage in the context of the agent, workflow, and team using it. Instead of treating model spend as a single black-box bill, organizations can manage it as part of their agent operating model.

**What it enables:** Teams can use the right model for the job: higher capability where quality or reasoning depth matters most, and lower-cost or faster options where appropriate. Leaders can track usage across agents, workflows, and teams, then set budgets and alerts that support broader adoption without losing control of spend.

**Why it matters:** Scaling agents is an operating and economics challenge, not just a model-quality challenge. AIOS gives enterprises a way to manage both—so model selection becomes a practical product and operating decision instead of an unmanaged infrastructure cost.

## **Governance and Controlled Execution**

### **Policy Engine**

**What it is:** An OPA/Rego-based policy layer that checks an agent’s planned tool calls and workflow actions against enterprise rules before they run. Policies can express the conditions under which an agent may act, including permitted tools, environments, actions, and required constraints. Because the rules are defined as policy rather than buried in a prompt, organizations can apply and evolve a consistent control model across agents and workflows.

**What it enables:** Organizations can define what an agent may do, which tools it may use, which environments it can access, and what conditions must be met before an action proceeds. Policy can be consistently applied across agents and workflows, rather than embedded as informal guidance in individual prompts.

**Why it matters:** A prompt can suggest safe behavior. An enforceable policy can require it. AIOS puts a deterministic control layer around probabilistic agent execution, allowing enterprises to use agents in consequential workflows without relying solely on the model to respect organizational boundaries.

### **Identity, Scope, and Approval Boundaries**

**What it is:** AIOS carries the right user, workspace, tenant, and application context through a task, so the agent operates within the same organizational boundaries as the person initiating work. It also supports explicit approval points for work that an organization defines as sensitive, consequential, or irreversible. Identity, scope, and approval are treated as part of execution—not as an afterthought once an action has already begun.

**What it enables:** Agents can work within the correct permissions and data boundary, while high-impact actions can be routed to an authorized human for review. The same agent can move quickly on routine, low-risk work while pausing for confirmation when a change could affect production systems, access, or business operations.

**Why it matters:** Enterprise agents should not become a permission-bypass layer. AIOS supports the right level of autonomy for each task: fast for routine work and deliberate for high-risk work. This helps organizations introduce agentic automation without giving up the accountability and approval controls they already rely on.

## **Shared Context and Infrastructure Control Plane**

### **Knowledge Hub and Discovery**

**What it is:** A shared source of organization-specific documentation, runbooks, conventions, policies, and discovered environment context. Knowledge Hub organizes the material that tells an agent how the company works, while Discovery helps bring relevant facts about the operating environment into that shared foundation. Together, they make operating knowledge available in a form agents can use instead of leaving it scattered across documents, systems, and individual experts.

**What it enables:** Agents can work from the company’s actual procedures and context rather than relying only on general model training. They can use approved runbooks, follow local conventions, and incorporate relevant knowledge when responding to a request or preparing a workflow.

**Why it matters:** The value of an enterprise agent comes from its understanding of the organization: how systems are run, what rules apply, and what good work looks like. Knowledge Hub and Discovery make that organizational knowledge available as a shared foundation rather than leaving it trapped in disconnected documentation or individual experience.

### **Context Graph**

**What it is:** A relationship-aware context layer that connects operational data and enterprise knowledge. Where data sources are connected, it can represent services, alerts, infrastructure, repositories, recent changes, runbooks, policies, and documentation as related parts of a searchable, traversable operating environment. Rather than treating every source as an isolated document or search result, Context Graph makes the relationships between those entities available to an agent.

**What it enables:** An agent can start with a service, alert, or resource and retrieve the surrounding context it needs to understand the situation: related systems, relevant knowledge, recent changes, dependencies, and supporting evidence. Instead of separately searching multiple systems, the agent can follow the relationships that connect an operational issue to the information needed to investigate it.

**Why it matters:** Traditional retrieval finds text that looks relevant. Context Graph helps an agent understand how operational information is connected. That distinction is essential for work such as incident investigation, service troubleshooting, and change-aware operations—where the right answer depends on more than locating a similar document.

### **AppStacks: Governed Infrastructure Building Blocks**

**What it is:** AppStacks bring together curated infrastructure-as-code modules, deployment configuration, and infrastructure policies into a governed application and infrastructure definition. They give teams a structured way to define the infrastructure patterns they are prepared to build and operate, including the approved reusable modules and constraints that shape a deployable environment. AppStacks make the infrastructure blueprint itself a managed product artifact—not just generated code.

**What it enables:** Infrastructure workflows can use approved building blocks to compose, validate, and deploy infrastructure rather than generating unconstrained IaC from scratch. Teams can standardize on reusable modules and apply infrastructure policies as part of the path from a request or application intent to a deployable environment.

**Why it matters:** AppStacks connect agent intent to deterministic infrastructure execution. AIOS helps interpret and coordinate the work; AppStacks help ensure the resulting infrastructure follows approved patterns and policies. This gives enterprises an alternative to treating generative IaC as a free-form output that must be manually reconstructed and revalidated every time.

> **AIOS governs how an agent acts. AppStacks govern what infrastructure the agent is allowed to create.**

### **Memory and Learning**

**What it is:** A controlled layer for carrying useful context forward across work. Memory helps an agent retain the relevant thread of a task and workspace, while Institutional Learning captures durable knowledge from completed work and can recommend reusable knowledge, skills, and workflow improvements based on successful execution patterns. The goal is to preserve what the organization has validated—not to grant an agent new authority on its own.

**What it enables:** Teams can preserve useful procedures, validations, and resolution patterns so future work can start from proven organizational knowledge instead of rediscovering the same solution. Over time, repeated successful work can inform proposed improvements to the knowledge and reusable capabilities available in a workspace.

**Why it matters:** AIOS becomes more valuable in a customer’s environment over time. Instead of every agent session starting from a blank slate, the platform can retain and reuse what has worked. Learning remains governed: proposed changes are reviewable and require authorized approval before they change how agents operate.

## **From Platform Capabilities to Operational Applications**

AIOS is the shared foundation for domain-specific operational applications. Each application can combine specialized agents, shared context, governed workflows, policy enforcement, and human oversight—then apply those capabilities to a specific team and operational problem.

### **Aiden for SRE**

Aiden for SRE can use the Knowledge Hub and Context Graph to ground an investigation in a service, alert, related context, available runbooks, and relevant changes. Persona agents and workflows help structure the investigation, while policies and approval boundaries govern any consequential action. The outcome is an SRE experience that can bring together the context normally spread across observability, code, cloud, and knowledge systems.

**Illustrative example:** An alert identifies elevated errors for a service. AIOS can retrieve the linked service context, relevant runbook, and recent change references where connected, then guide the SRE through a structured investigation. If remediation is needed, the workflow can prepare the proposed action and pause at the organization’s required approval boundary.

### **Aiden for DevOps**

Aiden for DevOps can turn operational requests into reviewed, policy-aware work. It can use shared knowledge to match a request to the relevant procedure, use deterministic workflows to guide execution, and keep sensitive actions behind the appropriate approval boundary. This creates a more controlled path from a DevOps request to an inspectable outcome without replacing the enterprise’s existing operating controls.

**Illustrative example:** A ticket requests temporary access during an active incident. The DevOps application can gather the request details, apply the organization’s access process and relevant scope, and route the request through the appropriate review step. The result is a tracked, policy-aware operational flow rather than an unstructured request in chat or a ticket queue.

### **Infrastructure Operations and Provisioning**

For infrastructure work, AIOS can interpret intent and coordinate governed workflows while AppStacks provide the approved IaC modules and infrastructure policies used to validate and deploy the resulting environment. This creates a direct path from a request to controlled infrastructure execution: agents coordinate the work, policies set the boundaries, and approved building blocks determine what gets created.

**Illustrative example:** A developer requests a new application environment. AIOS can collect the required intent and constraints, while AppStacks selects from approved modules for the environment and evaluates the resulting configuration against infrastructure policies. If the request falls outside an approved pattern, the workflow can ask for clarification or route it for review instead of producing ungoverned IaC.

### **A Foundation for More Operational Applications**

The same AIOS capabilities can support additional operational use cases wherever teams need specialized agents, organization-specific context, repeatable work, enforceable controls, and visibility into execution. The platform is designed to provide a common operating layer instead of creating a separate, disconnected agent system for every team.

## **From AI Experiments to Governed Operational Capability**

AIOS is an enterprise foundation for agents that understand the organization’s context, follow its operating procedures, act within its rules, and improve through reviewed learning.

By combining agent specialization, shared context, enforceable governance, and deterministic infrastructure controls, AIOS helps enterprises move from isolated AI experiments to governed operational capability.



PRFAQ: Aiden for DevOps (AFD)
Internal Memo - Not for external distribution

How to read this document
Part 1 is the external-facing press release: the customer story, product mechanism, and launch narrative in the form it could take publicly. 
Part 2 answers questions analysts, press, and customers are likely to ask. 
Part 3 is intentionally separate: it is the internal source of truth for positioning, limitations, roadmap boundaries, and sales guidance; it is not redundant with Part 2 and must not be distributed externally without review.

Part 1 — Press Release
StackGen introduces Aiden for DevOps to turn ticketed requests into reviewed action
Aiden for DevOps brings ticket intake, explainable triage, workflow selection, human approval, and execution follow-up into one governed operating loop.
StackGen today announced Aiden for DevOps, a governed operations application that helps DevOps, platform, SRE, and on-call teams turn incoming tickets into reviewed operational action. Aiden for DevOps brings work from connected issue trackers into a single Requests Inbox, interprets request context, recommends an appropriate workflow, and waits for an operator to approve action before work begins. For example, an operator can review a ticket asking to “restore the failed staging deployment” or “grant temporary incident access,” validate Aiden’s proposed workflow, and approve a controlled next step with the request’s context and execution record kept together.
Aiden for DevOps is an application built on the Aiden Agentic OS. It combines a ticket-centered request-operations experience with the underlying platform’s connected operational context and knowledge, deterministic workflows, policy guardrails, activity visibility, and auditability. When configured with approved data sources, tools, and credentials, the platform is designed to help teams bring the right context into operational decisions while preserving enterprise-defined policy and human approval requirements.
At launch, Aiden for DevOps will offer a focused Requests Inbox, workflow recommendation and operator approval, ticket-side collaboration, execution visibility, workflow creation from repeated no-match requests, and conversations for follow-up. Available as GA on Aug 19th. The product is designed to start with a connected Linear or Jira workspace; customers can add the relevant infrastructure-action connection when they are ready to perform corresponding operational work.


The Problem
DevOps request volume is growing, but the operational review capacity behind it is not. Teams are asked to move faster on access, deployment, credential, environment, and incident-support work while still protecting production systems and preserving accountability.
Ticket queues do not contain the full operational decision
A ticket may say that a deployment failed or that an engineer needs temporary access, but it often lacks a normalized category, priority, service, environment, and a clear path to safe execution. Operators must reconstruct that context, determine urgency, identify the right procedure, and decide whether automation is appropriate. The result is context switching between the source tracker, chat, documentation, workflow tools, and the infrastructure systems where work is eventually performed.
Automation without an operating loop creates a control gap
Teams need more than a model that can propose an action. They need to understand why a request was classified a certain way, see why a workflow was recommended, correct a weak inference, and decide whether the work should proceed. They also need the original ticket, review discussion, decision, and execution result to remain connected—rather than treating the ticket as a disconnected trigger for opaque automation.
This is not simply a shortage-of-tools problem. It is an operational control-loop problem: teams need a way to move from request to action without losing context, judgment, or accountability.
Customer evidence texture placeholder — replace with validated research before external use.
“We spend too much time translating a short ticket into the operational context required to act safely.”
“The hard part is not finding an automation—it is knowing whether this is the right automation for this request.”
“Requesters want updates in the tracker they already use, while operators need a real execution record.”
“We want repeatable work to become easier over time without making every incoming ticket an automatic production change.”
The real problem: operational teams need governed throughput, not unchecked automation.
Why DevOps Request Operations, Not a General-Purpose Agent
Aiden for DevOps is a DevOps request-operations product because the unit of work is a request that must be understood, reviewed, acted on, and recorded—not merely a prompt that produces an answer. The mechanism is a governed loop that connects ticket context, operational knowledge, workflow recommendation, policy-aware decisioning, human approval, and an execution record.
That framing matters. Aiden for DevOps is not a replacement for Linear, Jira, or an organization’s system of record. Nor is it positioned as an unrestricted agent with standing authority to make production changes. It adds an operations layer around existing tickets so the team can consistently decide and control what happens next.
What this makes possible:
Explainable triage — Aiden surfaces category, priority, service, environment, automation eligibility, confidence, reasoning, and extracted request details so operators can review or correct the decision.
Reviewed workflow selection — Aiden recommends a workflow and explains why it fits; operators can inspect close matches or choose another path when the recommendation is weak or ambiguous.
Human-approved execution — A ticket arriving in the inbox does not itself authorize action. An operator explicitly approves the selected work before execution begins.
Ticket-to-operations collaboration — Teams can post a triage summary and review link back to the source ticket, preserving the requester’s familiar system of record while giving operators a richer review surface.
Reusable operational coverage — When no workflow is a good fit, the operator can review a suggested workflow draft and convert repeated work into a reusable, governed starting point.
Platform-backed governance — Through the Aiden Agentic OS, the experience can use configured operational data and knowledge, deterministic multi-step workflows, policy guardrails, activity visibility, and auditability.
How It Works
Bring requests into a focused operations inbox. Aiden for DevOps aggregates selected Linear or Jira work into a Requests Inbox that teams can filter, search, assign, and review.
Understand and explain the request. Aiden identifies relevant request context—including likely category, priority, service, environment, and automation eligibility—and shows its reasoning and confidence for operator review.
Recommend and review the next workflow. Aiden suggests a matching workflow, explains the match, and gives the operator the ability to correct triage, override the selection, ask questions, defer work, or create a reviewed draft when no workflow fits.
Approve, execute, and preserve the record. Only after explicit approval does the selected workflow begin. The request retains execution status and a transcript, while configured ticket-side updates can keep requesters informed in the source system.
Named Example Flows
Incident access request
Intent stated: “Grant temporary SSH access to the incident team’s bastion.”
Aiden brings the ticket into the inbox, identifies likely urgency and environment context, recommends the closest access workflow, and waits for an operator to review and approve it. See Appendix D for the worked example.
Failed staging deployment
Intent stated: “The staging pipeline failed during deployment—please restore the service.”
Aiden classifies the ticket, surfaces relevant context, recommends a recovery workflow, and retains the approval and execution record with the request. See Appendix D for the worked example.
Credential rotation
Intent stated: “Rotate the staging database credentials.”
Aiden proposes the relevant workflow or, if no suitable workflow exists, a reviewable draft that can become reusable coverage for future requests. The operator separately approves the actual request before any execution. See Appendix D for the worked example.
Early Customer Perspectives
Placeholder Example 1
“Before Aiden, our on-call engineers had to reconstruct the request, locate the procedure, and manually narrate each decision back in the ticket. With Aiden for DevOps, we can review the proposed path in one place and keep the requester connected without making the ticket itself an unchecked command.” — VP of Cloud
Placeholder Example 2
“We want more automation, but only when the team can see the context, approve the action, and understand what happened afterward. Aiden gives us a practical way to turn recurring requests into governed workflows rather than asking engineers to repeat the same operational reasoning every time.” — Senior DevOps Engineer
Availability and Access
GA: Aug 19
Aiden for DevOps is designed to begin with a connected Linear or Jira workspace. Infrastructure actions require the corresponding approved connection, credentials, and permissions. Contact StackGen for pricing. Learn more or request access at [URL].
About StackGen
StackGen helps enterprises build and operate cloud infrastructure through governed automation and AI. 

Part 2 — External FAQs
The questions analysts, press, and customers will ask.
Q1. What is Aiden for DevOps?
Aiden for DevOps is a ticket-centered DevOps request-operations application. It brings connected requests into a Requests Inbox, explains what it understands about each request, recommends a workflow, and requires operator approval before action begins. It keeps the original request, triage decision, workflow choice, execution status, and follow-up conversation connected in a single review loop.
Q2. How does the core mechanism work?
Aiden for DevOps follows four steps: intake, explainable triage, reviewed workflow selection, and approved execution with a preserved record. A ticket from a configured Linear or Jira source enters the Requests Inbox; Aiden surfaces relevant context and a workflow recommendation; an operator can correct the result or choose another workflow; and only explicit approval begins the selected work. The request then retains status and execution history, while configured ticket updates can keep the requester informed.
Q3. How is Aiden for DevOps different from Claude Code?
Claude Code is a powerful developer agent designed to help developers work with code and development tasks. Aiden for DevOps addresses a different operating problem: the shared, governed handling of ticketed production and operational requests across a DevOps team.
The key comparison is not model capability. It is the operational control loop. Aiden for DevOps centralizes intake from connected tickets, makes triage and workflow recommendations visible and editable, applies an operator approval boundary before execution, and maintains a request-level record of the decision and outcome. That is designed for teams that need a shared review and governance model around operational work—not simply an agent acting within an individual developer environment.
Q4. How is Aiden for DevOps different from a ticketing or IT service-management platform?
Ticketing and service-management platforms are systems of record for requests, ownership, discussions, and process. They do that job well. Aiden for DevOps is not intended to replace them.
Instead, it adds an operational review-and-action layer around ticketed DevOps work: it extracts and explains operational context, recommends a workflow, captures a human decision before work begins, maintains an execution record, and can return a review link and triage summary to the ticket. The source ticket remains part of the operating loop.
Q5. What information does Aiden use to make a recommendation?
Aiden for DevOps uses the connected ticket and the request context it can extract—such as likely category, priority, service, environment, and automation eligibility—along with configured workflow and integration context. Through the underlying Aiden Agentic OS, it is designed to leverage connected operational data and knowledge sources where configured.
Recommendations are presented with reasoning and confidence for human review. Customers should configure only approved data sources, tools, credentials, and policies appropriate to their environment.
Q6. What will Aiden for DevOps save my team?
Aiden for DevOps is designed to reduce the operational friction of turning a ticket into a reviewed action. StackGen does not yet publish validated customer outcome metrics for this product, so customers should evaluate value against their own baseline.
Triage effort
Value dimension: Less manual reconstruction of request category, urgency, service, environment, and likely next step.
When it shows up: Recurring access, credential, deployment, environment, and incident-support requests.
Budget owner: Platform engineering, SRE, DevOps, and engineering operations leaders.


Context switching
Value dimension: A focused review surface connects the source request, Aiden’s triage, workflow decision, conversation, and execution record.
When it shows up: Teams operating across a ticket tracker, chat, operational documentation, and infrastructure tools.
Budget owner: Engineering productivity and operations leadership.


Consistency of operational decisions
Value dimension: Repeatable workflows and visible triage fields help teams handle similar requests more consistently while preserving operator override.
When it shows up: High-volume or recurring work where different on-call engineers otherwise reconstruct the same decision repeatedly.
Budget owner: Platform/SRE leadership and service owners.


Governance and risk control
Value dimension: The product is designed to separate a ticket’s arrival from authorization to execute, preserving explicit review, configured policy, and an inspectable record.
When it shows up: Infrastructure-affecting work where a team requires accountable approval and evidence of what happened.
Budget owner: Engineering leadership, security, risk, and operations owners.


Workflow coverage over time
Value dimension: No-match requests can become reviewed workflow drafts rather than remaining permanently one-off work.
When it shows up: Teams with recurring request patterns but incomplete documented automation coverage.
Budget owner: Platform engineering and DevOps enablement.
Value area
Customer baseline to measure
Important caveat
Triage efficiency
Time from ticket arrival to reviewed next-step decision
Results depend on request quality, workflow coverage, and team adoption.
Throughput
Requests completed or reviewed per operator/team
Aiden is approval-gated; faster does not mean autonomous execution.
Governance
Approval coverage, decision traceability, exceptions
Customer policy and credential configuration determine the control model.
Requester experience
Ticket update latency and follow-up resolution
Ticket-side replies depend on provider-specific setup and permissions.
Reuse
Repeated requests captured by reviewed workflows
Draft workflow creation is not automatic authorization or autonomous execution.


Q7. Who is Aiden for DevOps for?
The clearest first users are DevOps, platform, SRE, and on-call teams that receive recurring operational work through Linear or Jira—especially requests involving access, credentials, deployment recovery, environment provisioning, and incident support. It is also relevant to engineering or platform leaders who want a more consistent approval and workflow layer around infrastructure-affecting work.
Q8. Is Aiden for DevOps available today?
[Availability placeholder.] Aiden for DevOps is planned to begin with connected Linear and Jira experiences. The final launch tier, dates, eligibility, and access path will be announced at launch. ServiceNow should not be represented as generally available until its setup and end-to-end experience are validated.
Q9. How is Aiden for DevOps priced?
Contact StackGen for pricing. [Insert approved packaging, licensing, and purchase-path details when available.]
Q10. Does Aiden for DevOps replace human judgment or authorize changes automatically?
No. Aiden for DevOps is designed around an explicit human approval boundary. It can classify, explain, and recommend; operators can correct triage, choose another workflow, ask follow-up questions, defer work, or create a workflow draft. A ticket arrival or a chat interaction is not itself authorization to execute. Infrastructure actions also depend on configured connections, approved credentials, permissions, and enterprise-defined policies.

Part 3 — Internal FAQs
The source of truth for internal alignment, field readiness, and responsible product claims.
Q11. Why call this “Aiden for DevOps” and “DevOps Request Operations”?
Aiden for DevOps is the product name. DevOps Request Operations is the category framing: it communicates that the product manages the lifecycle from ticketed request to reviewed operational action.
Use the category to distinguish the product from ticket summarizers, generic chat experiences, point automations, and unrestricted agent narratives. Do not imply that the product replaces an ITSM/ticketing system or is a fully autonomous production operator.
Q12. How does Aiden for DevOps map to the long-term Aiden vision?
Aiden for DevOps is an app on top of the Aiden Agentic OS. It is a concrete operational surface for the platform’s broader objective: moving from prompt-led assistance toward governed agents that can understand connected context, use approved tools, follow deterministic workflows, operate under policy boundaries, preserve evidence, and record outcomes.
The Requests Inbox is therefore not the entirety of Aiden; it is a focused adoption wedge for an important governed-agent loop. Avoid presenting internal product terms or unshipped platform concepts externally unless explicitly approved.
Q13. How should we position Context Graph in this PR-FAQ?
Use this language: “Aiden for DevOps is built on the Aiden Agentic OS, which can connect available operational data and knowledge sources so agents have better context for governed operational decisions.”
Do not claim that Context Graph provides universal or real-time visibility into every customer system. It should be described as context across connected and configured data/knowledge sources. Any detailed release status, supported sources, or performance claims require product validation.
Q14. How should we describe learning and self-improvement?
Describe it as an intended platform feedback loop, not as proven autonomous learning: recorded decisions, execution outcomes, operator corrections, and reusable workflow coverage can create inputs for teams to improve how work is handled over time.
Safer language: “Aiden is designed to help teams learn from reviewed operational work and improve reusable workflow coverage over time.” Do not say the product independently self-improves in production, changes policies, or modifies workflows without human review unless that behavior is specifically validated and approved for launch.
This is currently on the roadmap. 
Q15. What is our response when Claude Code comes up?
Start with a concession: Claude Code is a powerful developer agent for software-development tasks.
Reframe the comparison: for Aiden for DevOps, the primary customer problem is not whether an individual agent can generate or execute a command. It is whether a DevOps organization can operate a shared ticket-to-action process with visible context, centralized approval, repeatable workflows, and a record of what happened.
Differentiate: Aiden for DevOps centralizes requests from connected trackers, shows editable triage and workflow rationale, applies an explicit operator approval gate, and retains a request-level execution record with ticket-side collaboration. Do not say Claude Code cannot access production or is inherently dangerous; teams can grant many tools credentials. The distinction is the product’s default control model for operational work.
Q16. What is our response when a customer says, “We already have Jira/Linear/ServiceNow”?
Start with a concession: existing ticketing and service-management systems are essential systems of record and should remain so.
Reframe the comparison: the unresolved problem is the operations step between receiving a request and deciding, executing, and documenting the correct next action.
Differentiate: Aiden for DevOps adds explainable triage, workflow recommendation, an approval boundary, execution visibility, and configured ticket-side updates around the existing request. It complements the ticket system rather than attempting to replace it.
For ServiceNow specifically, be candid: do not sell it as a fully available self-service experience until onboarding, filtering, collaboration, and validation are confirmed end to end.
Q17. What should we be transparent about today?
Early maturity: Requests Inbox acceptance material describes the experience as Beta. Position it as a focused request-operations surface, not a complete service-management suite.
Approval-gated by design: The product is not an unrestricted autonomous DevOps operator. Human review is a product strength and a practical boundary.
Tracker scope: Linear and Jira are the current visible onboarding choices. ServiceNow is limited/in validation, not broadly self-service.
Provider-specific ticket collaboration: Ticket-side replies require appropriate permissions, setup, and provider-specific behavior; do not imply identical round trips across providers.
Ambiguous requests still need judgment: When workflow matches are close, the operator must choose or override. That is intentional.
Workflow drafts are not automatic execution: A no-match request can create a reviewed draft, but creation and approval of the actual request remain separate decisions.
Connection dependencies: Intake/triage can begin with a tracker connection; performing infrastructure work requires the relevant approved tool connection, credentials, and permissions.
Desktop-first experience: The current product works best on desktop; do not market a mobile-first operations workflow.
No published proof yet: No validated customer adoption, ROI, time-saved, reliability, or competitive-win data is available in this draft.
Q18. What is the roadmap story?
Near-term, the product story should remain centered on strengthening the governed request-to-action loop: connected ticket intake, explainable triage, workflow matching and creation, approval-gated execution, ticket collaboration, and reliable underlying orchestration.
Do not commit in external material to unvalidated ServiceNow availability, proactive scheduling, a complete blocked-work management experience, broader dashboards/alerts/discovery/investigations, FinOps integrations, Alibaba Cloud, Azure China, or other adjacent capabilities. Customer-specific ticket-to-workflow implementations are expected to be delivered through CS/FDE work while engineering hardens the underlying orchestration.
Q19. What should analysts hear?
Aiden for DevOps is a governed agent application for DevOps request operations. The thesis is that enterprises need more than a conversational interface or a one-off automation: they need a visible operating loop that connects enterprise context, workflow selection, policy, human approval, execution, and evidence.
Analyst conversations should focus on the relationship between the application and the Aiden Agentic OS: Aiden for DevOps makes platform capabilities tangible through a request-centered workflow. Avoid unsupported claims about universal autonomy, broad integration availability, production outcomes, or category leadership.
Q20. What is the sales playbook for the first conversation?
Start with the request types: access, credentials, deployments, environments, and incident support.
Ask where requests arrive today, how operators decide what is safe to do, and how the team records the decision and result.
Establish the approval and governance requirements before demonstrating automation.
Show the ticket-to-reviewed-action loop: source ticket → inbox → explainable triage → workflow match → operator approval → execution record → ticket follow-up.
Qualify required tracker, infrastructure-action, permissions, and credential setup early.
Do not lead with a claim of full autonomy or unsupported ROI; lead with governed throughput, visible control, and reusable operational coverage.
Q21. What are the core Aiden Agentic OS components relevant to Aiden for DevOps?
At the application level, Aiden for DevOps uses a Requests Inbox, request triage, workflow recommendations, an approval step, ticket-side collaboration, and execution visibility.
At the platform level, describe the relevant Agentic OS components as: configured operational data and knowledge context (including Context Graph), specialized agent behavior, deterministic multi-step workflows, approved tools and credentials, pre-execution policy guardrails, real-time activity visibility, explainability, and an auditable/replayable record of work. Cost/model controls may be relevant for platform conversations but should not be a primary product claim here unless packaging and customer value are validated.
Q22. How do these components interact during a request?
A connected source ticket provides the initial request context. Aiden interprets the request and surfaces its triage decision for review. The product retrieves and applies the relevant configured workflow and operational context, then presents the recommendation and any required approval boundary. After the operator approves, Aiden invokes only the configured and authorized actions within applicable policies and records the resulting activity and outcome with the request.
The essential rule is that configured context and policies inform the decision, but the request remains reviewable and human approval applies where required. See Q21 for the component model and Q23 for the hierarchy of controls.
Q23. How does the control hierarchy work—and how does the product improve over time?
The control hierarchy is: customer-defined policies and permissions establish what actions are allowed; approved integrations and credentials establish what the system can access; deterministic workflows define the repeatable procedure; request-specific context and triage determine the proposed path; and human approval authorizes execution where required. The execution record then captures what was considered, decided, and done.
Over time, teams can use operator corrections, no-match requests, reviewed workflow drafts, execution records, and outcome analysis to improve workflow coverage and operational handling. This is a managed learning loop—not an assertion that Aiden autonomously changes workflows, policies, or production behavior without review.

Appendices
Appendix A — Metrics Reference
Status: No validated external metrics are currently available. Use this table as the measurement plan and replace targets only after a baseline and approved evidence source exist.
KPI
Baseline
Target / hypothesis
Evidence source
Status
Time from ticket intake to reviewed next step
[Measure]
[Set after pilot]
Request timestamps / pilot analysis
Placeholder
Time from approval to execution completion
[Measure]
[Set after pilot]
Execution record
Placeholder
Percent of incoming requests with reviewed triage
[Measure]
[Set after pilot]
Inbox and request audit
Placeholder
Workflow recommendation acceptance/override rate
[Measure]
[Set after pilot]
Request decision record
Placeholder
Approval coverage for infrastructure-affecting actions
[Measure]
[Set after policy design]
Approval/audit record
Placeholder
Repeat request types converted to reviewed workflows
[Measure]
[Set after pilot]
Workflow library and no-match analysis
Placeholder
Ticket-side follow-up completion
[Measure]
[Set after provider validation]
Source-ticket integration record
Placeholder

Appendix B — Glossary
Term
Definition
Aiden for DevOps
StackGen’s ticket-centered DevOps request-operations application.
Aiden Agentic OS
The underlying platform for governed, operationally capable agents using configured context, approved tools, workflows, guardrails, and auditability.
Requests Inbox
The focused operations queue that brings configured source tickets into a reviewable workspace.
Explainable triage
Aiden’s visible categorization and extraction of request context, including reasoning, confidence, and editable fields.
Workflow
A repeatable, deterministic multi-step operational procedure available for recommendation and, after approval, execution.
Approval boundary
The explicit operator decision required before an action begins where configured.
Context Graph
The Aiden Agentic OS capability for connecting available/configured operational data and knowledge sources to support contextual decisions; it is not a claim of universal or real-time visibility.
Policy guardrails
Enterprise-defined constraints that govern which actions may be used and under what conditions.
Execution transcript
The inspectable request-level history of action status and outputs associated with approved work.
No-match workflow draft
A suggested workflow that an operator can review and create when existing workflows do not fit a request; it does not itself authorize execution.

Appendix C — Diagrams
Diagram 1 — The ticket-to-reviewed-action loop
Source ticket → Requests Inbox → Explainable triage → Workflow recommendation → Operator approval → Controlled execution → Execution record + ticket follow-up
How to read this diagram: The request remains connected to its source ticket throughout the process. Each stage adds enough context and control for the operator to make an accountable decision; no stage implies that ticket arrival alone authorizes an infrastructure action.
Diagram 2 — Aiden for DevOps on the Aiden Agentic OS
Connected tickets + configured operational data/knowledge → Aiden for DevOps request experience → deterministic workflows + policy guardrails + approved tools → reviewable activity and evidence
How to read this diagram: Aiden for DevOps is the application surface. The Agentic OS provides the underlying context, controls, and auditability. Actual behavior depends on configured integrations, approved credentials, policies, and human approval requirements.
Appendix D — Worked Examples
Example 1 — Temporary incident access
Intent stated: “Grant temporary SSH access to the incident team’s bastion.”
Factory / workflow role
Responsibility
Request triage
Extract access-request type, urgency, target environment, requester, and available context.
Access workflow
Present the configured access procedure and required information for review.
Policy/approval control
Require the designated operator approval before execution.
Ticket collaboration
Post the triage summary/review link to the source ticket when configured.
Execution record
Preserve status and transcript with the original request.

Stated SLO commitment: [Placeholder — define only after validated operational policy and measurement.]
Production narrative:
An on-call engineer opens a ticket requesting temporary access during an incident.
Aiden brings the ticket into the Requests Inbox and presents the likely request type, urgency, environment context, confidence, and reasoning.
The operator verifies or corrects the details and reviews the recommended access workflow.
The operator explicitly approves the work; the ticket itself did not authorize execution.
The request retains execution status and a reviewable transcript; configured ticket collaboration can notify the requester where they opened the work.
Before / after:
Before
With Aiden for DevOps
Operator reconstructs request context across ticket, chat, docs, and tools.
Request context, triage, workflow recommendation, and review decision are presented together.
Approval and execution evidence can be fragmented.
Approval and execution history remain attached to the request.
Requester may lack a clear operational update path.
Configured ticket-side summary and review link keep the source system in the loop.

ROI: [Not yet validated. Measure triage time, approval coverage, ticket update latency, and repeat-request workflow coverage during pilot.]
Example 2 — Failed staging deployment
Intent stated: “The staging pipeline failed during deployment—please restore the service.”
Factory / workflow role
Responsibility
Request triage
Identify likely deployment-recovery category, priority, service, environment, and evidence in the ticket.
Workflow matching
Recommend a configured recovery workflow and show why it fits; present close matches if necessary.
Operator decision
Let the operator correct triage, choose another workflow, defer, or approve execution.
Controlled execution
Invoke only configured and authorized actions after approval.
Evidence
Retain the request’s execution status/transcript and configured ticket follow-up.

Stated SLO commitment: [Placeholder — define only after validated operational policy and measurement.]
Production narrative:
An engineer files a Jira request after a staging deployment failure.
Aiden classifies the request and presents the extracted service/environment context and recovery-workflow recommendation.
The operator checks whether the proposed workflow fits the actual failure; ambiguous matches intentionally require a human choice.
After approval, the configured workflow begins and its progress/outcomes are retained with the request.
The operator can keep the Jira ticket connected through a triage summary, review link, or configured follow-up path.
ROI: [Not yet validated. Measure time to reviewed next-step decision, workflow match acceptance, resolution time, and requester update latency.]
Example 3 — Staging credential rotation with no existing workflow
Intent stated: “Rotate the staging database credentials.”
Factory / workflow role
Responsibility
Request triage
Classify the ticket as credential rotation and identify relevant environment/context.
No-match analysis
Determine that existing workflows do not provide a sufficiently confident fit.
Draft generation
Propose a workflow draft that the operator can review, edit, and create.
Separate approval
Require the operator to separately approve the actual request before execution.
Learning loop
Allow the reviewed workflow to become reusable coverage for similar future requests.

Stated SLO commitment: [Placeholder — define only after validated operational policy and measurement.]
Production narrative:
A service owner requests rotation of staging database credentials.
Aiden brings the request into the approval queue and evaluates available workflows.
When no existing workflow is a reliable fit, Aiden proposes a draft for operator review rather than pretending certainty.
The operator edits and creates the draft as appropriate, then separately approves the specific request if and when it is ready.
The team has converted a recurring category of work into a reviewable, reusable workflow without removing the approval boundary.
ROI: [Not yet validated. Measure repeated no-match frequency, reviewed workflow creation, subsequent workflow reuse, and operator review time.]


