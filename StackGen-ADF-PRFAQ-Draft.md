# **PRFAQ: Autonomous DevOps Factory (ADF)**

## **Internal Draft v1.5 — Not for external distribution**

---

**How to read this document.** The Press Release is written as if published on launch day \- present tense, customer-first, no internal jargon. The FAQ section is split into two parts: External FAQs answer what analysts, press, and customers will ask; Internal FAQs answer what our own teams need to know to sell, build, and support ADF consistently.

---

## **Part 1 \- Press Release**

---

### **StackGen Launches the Autonomous DevOps Factory**

**Simply describe the outcomes you need, and ADF builds the factory to deliver them.**

**\[Launch Date\]** \- StackGen today announced the Autonomous DevOps Factory (ADF). Engineering teams describe what they want their operations to produce \- “*stop waking our SRE team for incidents the system has seen before*” or “*let deployments verify themselves without a senior engineer watching every run*” \- and ADF assembles a set of StackGen provided out-of-box agents and custom-built agents, defines the specs for committed SLOs, operational constraints, and governance requirements, and puts it to work.

ADF powers factory assemblies \- opinionated sets of agents StackGen has built, tested, and configured to work together out of the box \- for distinct operational domains. **Aiden for DevOps**, generally available today, is a pre-built assembly that handles the deployment lifecycle from pre-deployment infrastructure checks through production verification. **Aiden for SRE**, also available, investigates and resolves production incidents, including the infrastructure root causes that most AI SRE tools never reach. A third assembly, **Aiden for InfraOps**, is available in early access for teams managing Infra at scale.

Early customers report P1 resolution times dropping from 4 hours to under 15 minutes, change failure rates falling from 15% to under 3%, and SRE teams spending less than half the time on toil they were before.

---

#### *The Problem: Engineering Teams Are Faster at Writing Code Than Running It Reliably*

AI coding assistants have fundamentally accelerated software creation. Code that took days takes hours. Pull request volume has doubled. The velocity of software production has never been higher.

But the operations layer has not kept pace \- and the gap shows up in two places every engineering team knows intimately.

The first is the **delivery pipeline**. Every deployment still requires an engineer to watch a pipeline for 45 minutes, ready to intervene if a gate fails or a metric crosses a threshold. Most teams have accumulated 200 runbooks \- of which maybe 30 are current. Deployment pipelines have grown 14 manual approval steps deep. Developers have stopped trying to ship on Fridays because the risk-to-reward of a late-week deploy is untenable. The teams that adopted AI coding assistants first are now facing a new bottleneck: code is written faster than it can be safely shipped. Even with self-service tooling, infrastructure provisioning requests still flow through approval queues \- slowing developers and making the platform team a bottleneck rather than an enabler.

The second is **production reliability**. Incidents still require a 3 AM page, a 90-minute war room before root cause is agreed upon, and days of post-mortem archaeology across six disconnected tools. Infrastructure changes and deployment events are contributing factors in the majority of production incidents \- yet most AI SRE tools have no visibility into either. RCA is a week-long archaeology project. On-call rotation is the number one reason engineers leave teams \- not the hours, but the chaos of being handed an incomplete picture and told to fix it.

The problem is not a shortage of tools. Most engineering organizations have invested well: CI/CD pipelines, observability platforms, infrastructure automation, incident management systems. Each tool is excellent within its domain. The problem is that these domains are siloed \- none aware of what the others know. A deployment pipeline that just shipped a change has no visibility into whether the infrastructure it depends on has drifted. An SRE investigating a P1 has no automatic access to the deployment that preceded the anomaly by eight minutes. A platform team approving a right-sizing request has no way to know which configuration changes have historically correlated with outages for that service class. The handoffs between Developers/Builder, DevOps, InfraOps, SecOps, Observability,  and SRE are manual, slow, and context-lossy.

While individual agents make each domain faster. But they don’t talk to each other. The failure happens in the gap \- the 90 minutes between when an incident fires and when root cause is found, the deployment that lands on top of an infrastructure drift nobody checked for. That’s not a tool problem. It’s an architecture problem.

Beyond the context gap, teams are facing a rising "AI tax." Managing the cost of AI agents is becoming a significant problem, with top developers sometimes spending 5-10x on tokens compared to their own salaries. This makes cost management a critical, yet often overlooked, challenge for engineering teams trying to scale their operations with AI.

*“Every deployment requires a human to babysit a pipeline for 45 minutes. That’s not CI/CD \- that’s supervised execution.”*

*“Our deployment pipeline has 14 manual approval steps. Developers have stopped even trying to ship on Fridays.”*

*“We have 200 runbooks. Maybe 30 are current. The rest are landmines.”*

*“Half our incidents are caused by the deployment process itself, not by the code being deployed.”*

*“Our average P1 takes 4 hours to resolve. The first 90 minutes is just getting the right people in a room and agreeing on what’s broken.”*

*“RCA is a week-long archaeology project. We dig through 6 different tools to reconstruct a timeline that a connected system should have built automatically.”*

These are not tool problems. They are cross-domain intelligence problems \- caused by the gaps between excellent tools that share no context with each other. No single agent can solve them. A factory can.

---

#### *Why a Factory, Not Just Faster or Cheaper Agents*

Most Agents are built around current operations, workflows and tools \- getting better every quarter. What is not being addressed is the space between agents: the deployment pipeline that doesn’t know what the infrastructure team changed, the SRE tool with no record of what deployed eight minutes before the alert fires until it begins to triage and performs tool calling, making it reactive. ADF is designed for that problem. It connects those domains and holds the whole operations loop accountable for outcomes, not just the individual parts.

ADF begins with **intent** \- a plain-language description of what the team needs. That intent becomes a **Factory Spec**: which agents to deploy (from StackGen’s pre-built libraries or custom-built for the team’s specific context), what each is responsible for, what they share, what SLOs they commit to, and when to escalate to a human. Everything the factory does from that point \- resolving incidents, gating deployments, catching recurring patterns \- gets written back to a shared **Operational Context Graph (OCG)**, a data model that builds up operational knowledge over time across DevOps, Observability, SRE and Applications.

The OCG is what separates a factory from a collection of agents. Aiden for DevOps knows whether the infrastructure it’s deploying to has drifted \- because that state lives in the OCG. When Aiden for SRE opens an incident, it already knows what deployed eight minutes before the alert fired, and what changed in infrastructure before that. The recurring 3 AM alert that three different engineers have resolved by hand for eight months gets traced to its root cause \- because the OCG holds the full cross-domain history that no single tool has ever accumulated on its own. Individual agents are often stateless, lacking both the short-term working memory to correlate immediate events and the long-term context to track operational history. A factory, by contrast, remembers.

What that makes possible:

* **Deployments that check themselves before running.** Before a deployment goes out, the factory checks the current infrastructure state against historical failure patterns. It proceeds, flags, or blocks \- no human in the loop for the routine cases. The 15% change failure rate most teams have learned to live with turns out to be addressable.

* **Incidents stopped before they fire.** When a deployment and a drift event are on a collision course, the factory sees both sides. A meaningful share of P1s simply doesn't happen.

* **End-to-end resolution without the 3 AM page.** When an incident does occur, Aiden for SRE already has the deployment history and infrastructure context from the OCG. It traces root cause, generates the fix, deploys it through the validated pipeline, and closes the incident. Most of this happens while the on-call engineer is asleep.

* **Runbooks that run themselves.** The factory identifies recurring operational patterns, finds their cross-domain root cause, and converts them into prevention rules. The 200 runbooks that are mostly stale become something that actually executes.

* **A system that gets better over time.** Every cycle \- every deployment gated, every incident resolved, every pattern caught \- writes back to the OCG. The factory improves without needing reconfiguration. That’s something a standalone agent can’t do.

---

#### *How ADF Works: From Intent to a Running Factory in Minutes*

ADF follows a four-step model.

**Step 1 \- Intent.** An engineering leader or platform team describes what they need in plain language \- not a feature request, but the actual operational problem they’re trying to solve. For example: *“Our SRE team spends most of their on-call time on incidents that trace back to infrastructure config changes. We want those handled automatically \- investigate, find root cause, apply the fix if it’s a known pattern, escalate to a human if it isn’t. We’d consider it a success if on-call pages for this class of incident dropped by 70% in 90 days.”* Or: *“Our senior engineers spend 30–45 minutes watching every production deployment. Half the time nothing goes wrong, but they’re stuck there anyway. We want deployments to verify themselves \- a human should only need to step in when something actually looks wrong.”*

**Step 2 \- Factory Spec.** ADF translates the intent into a structured Factory Spec: the agents required, their roles and decision boundaries, the OCG data they share, the SLOs they target, and when to escalate to a human. The spec is version-controlled and reviewable \- teams approve it before anything runs and can edit it at any time.

**Step 3 \- Factory Runtime.** The factory runs. Agents handle what they’re configured to handle. When something falls outside their scope \- an edge case the factory hasn’t seen before, or a decision that warrants human judgment \- it gets flagged with enough context to act on quickly, not just an alert that says something went wrong.

**Step 4 \- Factory Learning.** Every factory run writes to the OCG. Incident patterns, remediation outcomes, deployment risk signals \- it all accumulates. The factory gets better at its job without requiring anyone to retrain or reconfigure it.

---

#### *Example Flow 1: Reducing On-Call Burden for Infrastructure-Related Incidents*

**Intent stated:** *“Our SRE team spends most of their on-call time on incidents that trace back to infrastructure config changes \- autoscaling misconfigurations, IaC drift, things that should never have reached production in that state. We want those handled automatically: investigate, find root cause, apply the fix if it’s a known pattern, escalate to a human if it isn’t. We’d consider it a success if on-call pages for this class of incident dropped by 70% in 90 days.”*

For the full Factory Spec, runtime timeline, and ROI breakdown, see [**Appendix D \- Example 1**.](#bookmark=id.b4r427v1tso2)

---

#### *Example Flow 2: Deployments That Verify Themselves*

**Intent stated:** *“Our senior engineers spend 30–45 minutes watching every production deployment. Half the time nothing goes wrong, but they’re stuck there anyway \- ready to rollback if a metric crosses a threshold. We want deployments to run and verify themselves. A human should only need to step in when something actually looks wrong, not just as a precaution. And when something does go wrong, we want rollback to happen automatically before the on-call engineer even gets a page.”*

For the full Factory Spec, runtime timeline, and ROI breakdown, see [**Appendix D \- Example 2**](#bookmark=id.9x66w6i1fima).

---

#### *Example Flow 3: Cloud Migration \- AWS to OCI*

**Intent stated:** *“We’re migrating 40 services from AWS to OCI over the next six months. We want each service migrated independently \- OCI validated under production load before we touch AWS traffic. If anything degrades during cut-over, we want automatic rollback to AWS. And we want the whole thing auditable: every resource moved, every decision made, with a complete before-and-after state record.”*

For the full Factory Spec, step-by-step migration cycle, and ROI comparison, see **Appendix D \- Example 3**.

---

#### *Early Customer Perspectives*

*“We had Aiden for SRE running for 30 days before we realized we hadn’t been paged once at 3 AM. When we looked at the incident log, the factory had handled seven infrastructure-correlated incidents autonomously \- each traced to a configuration change, remediated through a validated pipeline, and resolved in under 15 minutes. That was the moment we understood this was a fundamentally different product category. It’s not a faster way to do what we were already doing. It’s a different thing entirely.”*

* **VP Engineering, Series B SaaS company** *(early access customer)*

*“Our deployment pipeline used to require a senior engineer for every production push \- 45 minutes of watching dashboards, ready to rollback. With the DevOps Factory running, deployments are just something that happens. The factory gates on infrastructure state, watches the canary, and either ships or rolls back. We’ve gone from 2 deployments a week to 6 a day. The change failure rate is 2.4%. Our senior engineers are now working on reliability architecture instead of watching pipelines. The ROI conversation was very short.”*

* **Head of Platform Engineering, Series C fintech** *(early access customer)*

---

#### *Availability and Access*

**Generally available today:** \- Aiden for SRE \- handles infrastructure-correlated incident investigation and resolution \- Aiden for DevOps \- handles deployment verification and pre-deployment infrastructure checks

**Early access (design partners):** \- Aiden for InfraOps \- IaC drift detection and remediation \- ADF intent-based factory generation \- describe the problem, receive a custom Factory Spec

**Coming in H1 2027:** \- MLOps Factory \- autonomous model deployment, drift detection, and inference reliability \- ADF Factory Marketplace \- community and certified factory templates

Engineering teams can apply for early access at **stackgen.com/adf**.

---

#### *About StackGen*

StackGen builds the Autonomous DevOps Factory \- an AI operations platform where engineering teams describe what they want their operations to produce, and Aiden agents deliver it. StackGen is headquartered in San Jose, CA.

**Media contact:** press@stackgen.com  
**Early access:** stackgen.com/adf

## **Part 2 \- External FAQs**

*These are the questions analysts, press, customers, and prospects will ask. Every customer-facing team member should be able to answer these consistently.*

---

### **Q1: What exactly is the Autonomous DevOps Factory?**

ADF is an AI operations platform where engineering teams describe what they want operations to produce, and ADF builds and runs the factory that delivers it. That’s a different model from individual AI agents that assist engineers within a single domain \- ADF owns the full operations loop and is accountable for outcomes across it.

The word “factory” is deliberate. A factory produces outputs reliably, at scale, without requiring a person to supervise every run. Copilots assist. Factories produce. That distinction matters when your engineering organization is growing faster than your operations headcount.

---

### **Q2: What does “intent-based factory generation” mean in practice?**

An engineering leader describes the actual operational problem they’re trying to solve. Not a feature request \- the real thing that’s making their team’s life difficult. For example:

*“Our SRE team spends most of their on-call time on incidents that trace back to infrastructure config changes. We want those handled automatically \- investigate, find root cause, apply the fix if it’s a known pattern, escalate to a human if it isn’t. We’d consider it a success if on-call pages for this class of incident dropped by 70% in 90 days.”*

Or: *“Our senior engineers spend 30–45 minutes watching every production deployment. Half the time nothing goes wrong, but they can’t leave. We want deployments to verify themselves \- a human should only step in when something actually looks wrong.”*

ADF asks clarifying questions where the intent is ambiguous \- which services are in scope, what counts as a “known pattern,” what the current alerting topology looks like. The output is a Factory Spec: readable, version-controlled, reviewable by the team before anything runs. The team approves it. The factory starts.

The factory produces outcomes and learns from every cycle. Teams can edit the spec at any time \- adjusting decision boundaries, adding escalation conditions, or expanding the factory’s scope. A team might start with the intent *“reduce our change failure rate”* and discover, once the factory is running, that 60% of their failures trace to a single class of deployment pattern the OCG has now identified and can gate automatically.

---

### **Q3: How is ADF different from DevOps platforms like Harness or GitLab?**

Harness and GitLab are software **delivery** platforms \- they orchestrate the pipeline that moves code from commit to production. They answer: *“What shipped, when, through what pipeline?”*

ADF is a software **operations** platform. It owns what happens after code ships, and the infrastructure layer that production runs on. It answers a different question: *“What is running, what’s drifted, what’s about to break, and what can be resolved before a human needs to get involved?”*

The two data models are built around different problems. Harness’s Knowledge Graph connects delivery artifacts \- pipeline runs, deployments, build history. ADF’s OCG connects operational reality \- infrastructure state, drift history, observability signals, incident causality. They’re complementary: Harness ships code, ADF runs what Harness ships. Many customers will use both.

---

### **Q4: How is ADF different from AI SRE point solutions?**

AI SRE point solutions \- products focused on incident investigation and response \- are excellent within the incident domain. They correlate logs, metrics, traces, and code changes faster than human engineers. ADF includes this capability in Aiden for SRE and goes further in two important ways.

**First, ADF adds infrastructure root cause context.** Most production incidents have infrastructure changes as a contributing cause. AI SRE tools that operate as overlays on existing monitoring tools do not have access to the infrastructure state layer \- they know what the logs say, not what Terraform changed. Aiden for SRE shares the OCG with Aiden for InfraOps, which means every incident investigation begins with infrastructure change history already loaded. This is the difference between “correlating signals after something breaks” and “knowing what changed before the alert fired.”

**Second, ADF prevents incidents rather than only resolving them.** Point solutions respond to incidents. ADF’s cross-domain awareness \- specifically the connection between infrastructure state and historical incident patterns \- enables prevention that simply isn’t possible when infrastructure and SRE are separate systems. Preventing an incident is worth more than resolving one quickly.

---

### **Q5: What is the Operational Context Graph?**

The OCG is ADF’s shared intelligence layer \- the data model that connects all four operational domains into one queryable graph. It holds:

* **Infrastructure topology and state** \- what resources exist, what their current configuration is, how they relate to each other

* **Change attribution** \- what IaC changes created or modified each resource, and when

* **Drift history** \- where actual state diverges from desired state, and how long it has been diverging

* **Observability signal correlations** \- which infrastructure states and changes historically correlate with which observability anomalies

* **Incident causality index** \- which infrastructure patterns have historically led to which incident classes

* **Remediation knowledge** \- what worked to resolve each incident class, with confidence scores

The OCG is what makes cross-domain factory use cases possible. A standalone Aiden agent \- SRE, DevOps, or Infra \- works well within its domain. When agents share the OCG, each one gets materially more useful: Aiden for SRE enters every incident already knowing what changed in infrastructure, Aiden for DevOps gates every deployment against historical failure patterns for the current infrastructure state. The more the factory runs, the richer the OCG gets \- and the better each agent performs as a result.

---

### **Q6: What cost savings can customers realistically expect?**

ADF delivers cost savings across five dimensions. They’re worth keeping separate because they materialise at different speeds, affect different budget owners, and are measured differently. The numbers below are modelled for a 500-engineer company with 2+ P1s per month and 30+ production deployments per week \- treat them as directional, calibrated against a customer’s actual incident frequency, cloud spend, and team size.

**1\. Avoided incident cost**

This is typically the largest category and the fastest to see. ADF prevents P1s by catching infrastructure drift or deployment risk before it reaches production. For incidents that do fire, the factory resolves them significantly faster.

The fully-loaded cost of a P1 \- engineering time, customer impact, post-mortem overhead \- ranges from $300K to over $1M depending on company size (Gartner, PagerDuty industry data). For a team experiencing 2 P1s per month, a 40% prevention rate translates to roughly $2.9M in avoided incident cost annually. MTTR reduction on the remaining incidents \- from around 4 hours to under 15 minutes for infrastructure-correlated cases \- adds another $1–1.5M in recovered engineering time and reduced customer impact.

*When it shows up:* within 30–60 days, as the OCG builds pattern history for the customer’s specific incident classes.

**2\. Engineering headcount efficiency**

SRE and platform engineering time is expensive and hard to backfill. Most teams spend 40–60% of their hours on operational toil: incident triage, deployment monitoring, post-mortem write-ups, runbook maintenance. ADF takes on the routine work in each of those categories.

For a team of four SREs at a fully-loaded cost of $250K each, shifting from 60% toil to 15% redirects roughly $450K of annual capacity to reliability architecture and SLO work. Separately, eliminating deployment babysitting \- 45 minutes per production push across senior engineers \- recovers around $290K per year for a team shipping 50 times a week.

There is also a retention argument that is harder to quantify: on-call burden is consistently cited as the primary reason SREs leave teams. Reducing overnight pages reduces attrition risk in a role that is expensive and slow to backfill.

*When it shows up:* deployment efficiency is visible in week one. On-call reduction compounds over the first 90 days as the OCG learns the customer’s incident patterns.

**3\. Infrastructure and cloud cost optimization**

Most engineering teams know they are over-provisioned. The reason they don’t right-size is not ignorance \- it’s that the last time someone right-sized an instance class, something broke, and nobody wants to own that risk again.

ADF changes that calculation. The OCG accumulates the historical relationship between infrastructure configuration and incident patterns, so the factory can score each right-sizing candidate by reliability risk: which changes are safe to make, which need human review, which to leave alone. Teams sitting on 20–30% cloud over-provisioning can act on it with confidence.

For a company spending $2M per year on cloud, conservative right-sizing typically recovers $300–500K annually. This is not automatic \- ADF enables and informs the decision, but a human still approves it.

*When it shows up:* after 60–90 days, once the OCG has enough reliability history to score changes with confidence.

**4\. Tooling consolidation**

Teams running ADF typically find they no longer need \- or can significantly reduce dependency on \- several point solutions they were using to patch the gaps between domains. The most common candidates are standalone AI SRE tools used primarily for incident correlation, deployment verification scripts, and manual runbook systems. Licensing for two to three such tools typically runs $150–400K per year.

ADF reduces dependency on these tools, it does not necessarily replace all of them. Observability platforms, for example, are a complement \- ObserveNow or the customer’s existing stack provides the signal layer the factory reasons over. The consolidation story is strongest for tools that exist specifically to compensate for the cross-domain context gap that ADF solves at the architecture level.

*When it shows up:* at contract renewal for the tools being replaced, typically 6–12 months into ADF deployment.

**5\. AI inference cost efficiency**

As the OCG accumulates history, model routing progressively shifts familiar workloads to smaller, cheaper models. Root cause matching for a well-established incident pattern does not require the same model as analysing a novel incident type. In practice, teams see inference costs per incident drop to roughly 35–40% of day-one levels by month three, as the proportion of familiar versus novel patterns stabilises. This is a cost efficiency story for the team running ADF rather than a direct P\&L saving, but it matters for budget conversations about long-term operating cost.

*When it shows up:* gradually from month one, stabilising around month three. See Q23 for the detailed mechanism.

**Summary \- modelled annual value for a 500-engineer company**

| Savings category | Modelled annual value | Timeline to realize | Budget owner |
| :---- | :---- | :---- | :---- |
| Avoided incident cost | $2.9M–$4.1M | 30–60 days | Engineering / Finance |
| Engineering headcount efficiency | $500K–$1M | 0–90 days | Engineering |
| Cloud cost optimisation | $300K–$500K | 60–90 days | Infrastructure / Finance |
| Tooling consolidation | $150K–$400K | 6–12 months | Engineering / Procurement |
| AI inference cost efficiency | 60–65% reduction in per-incident inference cost | 30–90 days | Engineering |
| **Total** | **\~$4–6M \+ ongoing efficiency gains** |  |  |

Against a representative StackGen investment of $300K–$600K annually for a company of this size, the payback period on avoided incident cost alone is typically under 90 days.

Two caveats worth stating clearly to prospects. First, the incident prevention and MTTR numbers assume the factory is running against a production environment with enough OCG history to be useful \- which takes 30–60 days to build. Day-one value is real but more modest. Second, cloud cost savings are enabled by ADF, not automatic \- a human still approves right-sizing decisions. Teams that do not act on ADF’s recommendations will not see this saving.

---

### **Q7: What is “Aiden” and how does it relate to ADF \- and can we build our own agents?**

Aiden is StackGen’s AI agent system. An individual Aiden agent is a purpose-built unit of operational intelligence \- it subscribes to events, queries and writes to the OCG, operates within OPA-enforced policy boundaries, and is governed by Temporal workflows.

**Aiden for SRE and Aiden for DevOps are not individual agents.** They are pre-built, opinionated factories that StackGen ships \- each comprising several agents configured to work together for a specific operational domain. Aiden for SRE, for example, includes agents for drift detection, change correlation, root cause analysis, remediation, deployment, and verification. These factories work out of the box and represent StackGen’s best thinking on how to solve the most common operational problems in their respective domains.

Pre-built factories cover a lot of ground. But no vendor-built agent set will anticipate every operational pattern a team has. A company might need a deployment gate that integrates with their internal change advisory board, a compliance checker for their specific regulatory environment, or a domain-specific diagnostic agent for a proprietary system. That’s where custom agents come in.

**Custom agents are first-class citizens in ADF.** They run on the same Aiden OS infrastructure \- publishing and subscribing to NATS events, reading from and writing to the OCG, governed by OPA policies, orchestrated by Temporal \- exactly the same as built-in agents. A custom agent built by a team’s engineers participates in a factory on equal footing with agents from a pre-built factory.

When a team’s intent requires capabilities that go beyond what the pre-built factories cover, ADF generates a complete factory spec that includes custom agent definitions \- not just a scaffold, but a working implementation the team’s engineers can review and adjust. The boundary between built-in and custom is intentionally invisible at runtime: from the factory’s perspective, an agent is an agent.

---

### **Q8: Who is ADF designed for?**

ADF is designed for engineering organizations that have crossed the threshold where operational complexity outpaces headcount \- typically companies with 100+ engineers, 200+ services, and dedicated SRE or platform engineering functions.

The primary buyer is a **VP of Engineering or CTO** whose organization is experiencing: MTTR above 1 hour for P1 incidents; change failure rates above 5%; SRE teams spending more than 40% of time on toil; and difficulty hiring and retaining SRE talent due to on-call burden.

The primary champion is a **Head of Platform Engineering or SRE Lead** who needs to demonstrate operational maturity metrics to engineering leadership and is looking to shift their team from firefighting to reliability architecture.

---

### **Q9: Is ADF available today?**

Aiden for SRE and Aiden for DevOps are generally available. Aiden for InfraOps is in early access. Intent-based custom factory generation \- where a team describes an operational outcome and ADF generates a custom Factory Spec \- is available for design partners.

Interested teams can request access at **stackgen.com/adf**.

---

### **Q10: How is ADF priced?**

ADF pricing is structured around operational scope rather than seats. Pricing dimensions include the number of services under factory management, the number of factory domains active (SRE, DevOps, InfraOps), and OCG data volume. This aligns StackGen’s commercial model with the operational outcomes the factory delivers \- as the factory manages more of a customer’s operations and prevents more incidents, the value and the cost scale together.

Detailed pricing is available through the StackGen sales team.

---

## **Part 3 \- Internal FAQs**

*These answer what every StackGen team member needs to understand to represent ADF consistently. Treat these as the source of truth for internal alignment.*

---

### **Q12: Why “Factory” and not “Platform”?**

This is a positioning decision, not a naming preference \- and it has real downstream implications.

**“Platform”** positions StackGen in a category Harness, GitLab, Atlassian, and GitHub already dominate. Calling ourselves an “Autonomous DevOps Platform” means every analyst, procurement team, and enterprise buyer evaluates us against Harness on a feature checklist. We don’t win that fight on breadth \- and we shouldn’t try to. Gartner renamed the DevOps MQ to “DevSecOps Platforms” in June 2026, with the four companies above as named leaders. Entering that category is fighting on someone else’s scorecard.

**“Factory”** creates a new category that no incumbent currently occupies. It is also the only word that makes “autonomous” grammatically coherent \- a factory being automated, then autonomous, then self-improving is an intuitive progression. “Autonomous platform” is incoherent (how is a place autonomous?). “Autonomous factory” is immediately understood.

Most importantly, “factory” positions on **outputs** (“what does it produce?”) rather than **features** (“what does it contain?”). This shifts every sales conversation from feature comparison to outcome accountability \- a conversation StackGen wins.

**Practical guidance:** Use “Factory” in all external brand contexts \- website, keynotes, analyst briefings, demand gen, investor narratives. “Platform” is acceptable in procurement and RFP contexts where it is a required field, and in analyst MQ discussions where category placement is being negotiated. Never use “platform” as our primary identity word.

---

### **Q13: How do Aiden for SRE and Aiden for DevOps relate to the full ADF vision?**

They are the first two pre-built factory lines on a platform that will eventually cover MLOps, DataOps, and LLMOps as well.

Aiden for SRE and Aiden for DevOps are not standalone agent products bundled under the ADF brand. They are proof of the factory model \- each is a complete, opinionated set of agents that StackGen has built and configured to work together, and each demonstrates that intent-to-factory-spec-to-running-outcomes works in production. Customers who deploy both share the OCG from day one, which means they immediately experience the cross-domain value (infra-aware SRE, deployment-gated-by-infra-state DevOps) that individual agents cannot provide.

They also set the bar for what a well-built ADF factory looks like \- which is the reference point for teams building custom agents and factories on top of the platform.

The roadmap logic: each new domain StackGen enters \- MLOps, DataOps, LLMOps \- inherits the OCG, the intent-to-spec generation model, and Aiden OS. We are not rebuilding from scratch for each domain. The category name “Autonomous Ops” is the eventual umbrella \- see Q18 below.

---

### **Q14: What is our response when Harness’s Worker Agents come up?**

Harness’s Worker Agents are real and capable within their design \- they are AI pipeline steps for delivery automation, governed by Harness’s pipeline model. They are excellent at delivery-domain tasks: code review, test coverage, manifest remediation within a pipeline run.

The reframe: Harness Worker Agents are **pipeline steps** that execute and reset. They are stateless between domains. An agent that reviews a PR in step 1 of a Harness pipeline does not know what the infrastructure state is, what incidents the last similar change caused, or what ObserveNow’s baseline for the affected service looks like. Aiden agents share the OCG \- they accumulate operational intelligence across every run. The question to ask is not “which agent is better” but “what does the agent know when it acts?” \- and for operations-domain tasks, OCG-backed Aiden agents know substantially more.

---

### **Q15: What is our response when Resolve.ai comes up?**

Resolve is doing something real and doing it well \- it correlates incident signals across the tools a customer already has: logs, traces, metrics, code changes, Slack threads. Its design assumes the tooling landscape is fixed and the value is in correlation speed. That’s a reasonable bet.

ADF’s design assumes that the highest-value layer for SRE is the one most tools currently miss: **infrastructure state**. Sixty to seventy percent of P1 incidents have an infrastructure change as a contributing cause. Resolve can correlate faster than a human across the tools it integrates with \- but it does not know what Terraform changed, because it does not own the infrastructure layer. Aiden for SRE does, because it shares the OCG with Aiden for InfraOps.

The functional difference: Resolve helps engineers find root cause faster. ADF prevents the incident from firing in the first place \- and when it does fire, Aiden SRE already has the infrastructure change graph loaded before the investigation begins.

---

### **Q16: What are the current product limitations we should be transparent about?**

We should be upfront about the following with prospects and design partners:

1. **OCG richness grows over time.** The OCG’s incident-to-infrastructure correlation intelligence is strongest after 60–90 days of production data. Customers should set expectations that factory value compounds over the first quarter, not on day one.

2. **Intent-based custom factory generation is early access.** Pre-built factories (Aiden for SRE, Aiden for DevOps) are production-ready. Custom factory specs from free-form intent are available for design partners only and require human review before production deployment.

3. **Factory decision boundaries require calibration.** The escalation thresholds \- conditions under which the factory pages a human rather than acting autonomously \- are configurable but require tuning to each customer’s risk tolerance during onboarding. The default conservative configuration is safe but may escalate more than necessary for mature engineering organizations.

4. **MLOps, DataOps, and LLMOps factories are roadmap, not product.** These are directional commitments, not committed ship dates. Do not use them as deal closers.

---

### **Q17: What is the roadmap for ADF beyond DevOps?**

The sequence is: DevOps (now) → MLOps (H2 2027\) → DataOps (2028) → LLMOps (2028).

Each domain follows the same model: intent-to-spec generation, a set of purpose-built Aiden agents for that domain, full OCG integration, and SLO accountability for measurable outcomes. The OCG is the continuous thread \- every new factory line adds its domain’s data to the shared operational intelligence layer, making every other factory smarter.

The eventual category name is **Autonomous Ops** \- broad enough to cover DevOps, MLOps, DataOps, and LLMOps under one umbrella. “Autonomous DevOps Factory” is the go-to-market name for the first domain. As we expand, the category name expands with us while the product naming stays domain-specific.

---

### **Q18: What is our analyst engagement strategy?**

Target: **Gartner I\&O analysts** (not DevSecOps Platform analysts \- that quadrant is the wrong fight).

Gartner’s December 2025 “Predicts” report \- “AI Agents Will Transform IT Infrastructure and Operations” \- predicts that 70% of enterprises will deploy agentic AI for I\&O operations by 2029, up from under 5% in 2025\. This is the analyst frame ADF was built to inhabit. We are the company that built what Gartner predicted.

The briefing narrative: ADF is a new category \- Autonomous Ops \- that sits at the intersection of agentic AI, I\&O operations, and the DevOps lifecycle. We are not asking to be placed in the DevSecOps Platforms MQ. We are asking Gartner to recognize and name a new category that their own research predicted. Our State of Enterprise Reliability dataset (80K+ incidents, 360 companies, 22 industries) is a unique research asset that supports this briefing.

Secondary target: **Forrester DevOps analysts** for the DevOps buyer audience.

---

### **Q19: How should sales teams position ADF in competitive deals?**

**Greenfield / no incumbent:** Lead with the factory concept and intent-to-spec demo. The question that resets the conversation: *“What did your last P1 incident cost you \- and how much of that cost was the 90 minutes before you found the root cause?”* Let that number do the positioning work.

**Competing with Harness:** Use the “Harness ships code, StackGen runs what Harness ships” frame. Emphasize that these are complementary products targeting different budgets and different buyers. In organizations that have Harness for delivery, ADF is the operations layer that Harness structurally cannot provide. In greenfield evaluations, position on the operations-domain depth that Harness’s delivery-first architecture cannot match: first-party observability, infrastructure-native root cause, cross-domain OCG.

**Competing with Resolve:** Lead with prevention, not response. Resolve helps engineers respond to incidents faster. ADF prevents them. When ADF does respond, it already knows what infrastructure changed. Ask the prospect: *“What percentage of your P1s have an infrastructure change as a contributing cause?”* Then: *“How long does it currently take your SRE to discover that?”* The gap between those two answers is the ADF ROI in a single exchange.

**Expansion from a single Aiden agent:** If a customer has Aiden for SRE standalone, the expansion conversation is about the OCG. Aiden for SRE with OCG context from Aiden for InfraOps is a qualitatively different product \- it enters every investigation with infrastructure change history loaded. Offer a 30-day proof: measure change failure rate before and after adding the DevOps factory connection. Change failure rate is the metric that only the cross-domain factory can move.

---

### **Q20: What is Aiden OS and what do our teams need to know about it?**

Aiden OS is the runtime layer that makes the factory reliable enough to run in production without constant supervision. It is not visible to end users, but it is what separates a demo that works in a controlled environment from a factory that can be trusted at 3 AM.

It has five components:

**Temporal** handles workflow orchestration and durability. When a factory runs a remediation workflow \- detect drift, generate fix, validate against policy, deploy, verify \- Temporal ensures that workflow runs to completion even if individual steps fail or time out. Without it, an agent might generate a correct fix that never gets deployed because a downstream step timed out silently. Temporal makes the factory observable and auditable: every step, every retry, every outcome is recorded.

**NATS** is the event messaging layer. Agents publish events and subscribe to the events they care about. This loose coupling is what allows factories to scale and individual agents \- including custom-built ones \- to be added or swapped without rewiring the whole system.

**OPA (Open Policy Agent)** enforces policy at every action boundary. Before any agent takes a consequential action \- deploying a fix, modifying infrastructure, closing an incident, escalating to a human \- OPA evaluates whether that action is permitted under the team’s current policy set. Policy is code: versioned, reviewable, auditable. Teams define what the factory is and isn’t allowed to do on their behalf.

**Model Routing** decides which LLM handles which agent task at inference time. Not every task requires the same capability. Matching an incoming incident against a well-established OCG pattern is a classification task that a smaller, faster model handles well. Novel root cause analysis on an unfamiliar incident type requires more capable reasoning. The router makes that decision based on task type, OCG confidence scores, and the team’s cost policy.

**Cost Governance** tracks token spend per factory, per agent, and per task type. It sets budgets, surfaces anomalies, and feeds back into model routing. As patterns accumulate in the OCG, cost governance progressively shifts familiar workloads to cheaper models. Teams can see exactly where their inference budget is going.

**What sales and solutions teams should know**

The three questions that come up most in technical evaluations:

*“What happens if an agent fails in the middle of a remediation?”* \- Temporal retries the step. If the retry limit is reached, it escalates to a human with the full workflow state attached. Nothing is lost silently.

*“How do I make sure the factory doesn’t do something I haven’t approved?”* \- OPA. Every action boundary has a policy evaluation before it executes. The team defines what the factory is allowed to do; anything outside that escalates rather than proceeds.

*“Does the AI inference cost grow proportionally as the factory handles more work?”* \- No. Model routing shifts familiar workloads to cheaper models as the OCG matures. Cost Governance makes that visible. The cost per incident trends down over time, not up.

---

### **Q21: How do agents communicate, and how is factory orchestration managed?**

Three distinct layers handle different jobs \- and confusing them is a common source of architectural misunderstanding. The components themselves are described in Q19; this explains how they divide the work.

**Temporal handles orchestration** \- what runs in what order, under what conditions, with what retry logic. It enforces the factory’s workflow definition and SLO commitments. If a step takes too long or fails repeatedly, Temporal short-circuits to human escalation rather than hanging indefinitely.

**NATS handles messaging** \- what just happened that other agents need to know about. Agents publish events when they complete work; other agents subscribe to events relevant to their function. The InfraWatch agent doesn’t need to know whether anything is listening when it publishes drift\_detected \- it just publishes, and NATS delivers. This is what makes the factory composable: agents can be added, removed, or swapped \- including custom-built ones \- without rewiring the communication graph.

**The OCG handles shared context** \- what an agent needs to know before it acts. The OCG is not a messaging system. It’s a queryable graph that agents read from before acting and write to after completing work. Before the RootCause agent generates a hypothesis, it queries the OCG for prior incidents with similar signals. After it confirms root cause, it writes that back. The OCG is the factory’s memory.

**On spec-driven contracts:** at runtime, agents communicate via NATS events and OCG state. But input/output specs per agent are essential testing artifacts \- “given this OCG state and this input event, this agent should take this action.” Those contracts are how we validate correctness before production and catch regressions after changes. The spec is the test fixture, not the wire protocol. This applies equally to built-in agents and custom agents.

---

### **Q22: Is the Factory Spec the input to the factory, or do individual agents also have their own specs?**

Both \- but they operate at different levels and serve different purposes.

The **Factory Spec** is what gets generated from user intent. It is the configuration layer: which agent types to instantiate, what SLOs the factory as a whole commits to, what OCG context is available, and under what conditions the factory escalates to a human. This is what the user reviews and approves before the factory starts running. It answers: “what is this factory supposed to do, for whom, and within what boundaries?”

The **Agent Spec** is predefined per agent type and is not generated from intent. It defines the behavioral contract for a specific agent: what events it subscribes to, what it reads from and writes to the OCG, what OPA policies govern its actions, which model routing profile it uses, and what its escalation triggers are. It answers: “how does this agent behave in any factory that instantiates it?”

When a Factory Spec is generated, it references Agent Specs to instantiate the right agents for the job. The Factory Spec says “this factory needs a RootCause agent and a RemediationAgent.” The Agent Specs for those types define exactly how each one behaves.

This two-level architecture has three practical benefits. First, individual agents can be tested in isolation against their Agent Spec \- unit tests that don’t require standing up a full factory. Second, the same agent type can be reused across different factories without modification. Third, when an agent’s behavior changes (a model is upgraded, a policy is tightened), the change is made in one Agent Spec and propagates to every factory that uses that agent type.

The short answer: intent feeds the Factory Spec. The Factory Spec composes agents according to their Agent Specs. Users interact at the factory level; engineers build and test at the agent level.

---

### **Q23: How does closed-loop automation actually work \- and how does the factory achieve and improve on its committed SLOs over time?**

The factory’s SLO commitments are not static targets \- they are baselines that improve as the OCG accumulates operational history. Here’s the mechanism in concrete terms.

**The feedback loop has four steps:**

Every factory run goes through the same cycle: execute (Temporal runs the workflow), observe (VerificationAgent confirms whether the outcome matched the expected SLO), record (LearningAgent writes the full event to the OCG \- what happened, which agents ran, what they tried, what worked, with confidence scores attached), and adapt (next time a similar situation arises, agents query the OCG and act on enriched context rather than starting from scratch).

**How MTTR improves:**

On day one, a novel incident type reaches the RootCause agent with no prior OCG history. The agent uses a high-capability model and takes a full analysis pass. MTTR might be 22 minutes.

By day 30, the same incident class has fired four times. The OCG has four confirmed root cause → resolution mappings for this pattern. The RootCause agent matches against the pattern library with 87% confidence in under 30 seconds. MTTR is now 11 minutes.

By day 90, the pattern is well-established. Model routing shifts the matching task to a smaller model \- the problem is now classification, not reasoning. More importantly, the factory has built a prevention rule for this class: InfraWatch now flags this drift configuration as HIGH RISK before a deployment touches it. MTTR for this incident class effectively becomes zero \- it no longer fires.

**How MTTD improves:**

MTTD improvement works through signal correlation. After seeing the same incident class five times, the OCG knows that a specific metric deviation at a specific threshold historically precedes a P1 by approximately eight minutes. The ChangeCorrelation agent updates its detection threshold \- it now flags this condition earlier. What was previously detected after the alert fires gets detected before it. For well-understood incident classes, MTTD trends toward negative: the factory acts on precursor signals before the incident technically opens.

**How token costs decrease:**

Day one: all incident patterns are unfamiliar to the OCG. All root cause tasks route to large capable models. Cost per incident is high.

Day 60: roughly 40% of incident patterns have established OCG records with high-confidence mappings. Those tasks route to smaller models. Cost per incident drops to around 60% of the day-one baseline.

Day 90: roughly 70% of incident patterns are familiar. Novel incidents \- the ones that actually require deep reasoning \- still use large models. The factory is spending its inference budget where it matters. Cost per incident is around 35–40% of the day-one baseline, without any degradation in resolution quality for familiar patterns.

This improvement is automatic. Model routing reads OCG confidence scores and the team’s cost governance policy and makes the routing decision at inference time. No manual reconfiguration required. SLO measurement \- how the factory knows whether it hit its MTTR target \- is handled by Temporal, which records a timestamp at every workflow step. See Q20 for detail on how Temporal works.

## 

## **Appendix A \- Metrics Reference**

| Metric | Industry baseline | ADF target | Source |
| :---- | :---- | :---- | :---- |
| Mean Time to Resolution (P1) | 4 hours | \< 15 minutes | DORA 2025, StackGen customer data |
| Change failure rate | 15% (median) | \< 3% | DORA 2025 |
| SRE toil as % of working hours | 60% | \< 15% | StackGen customer research |
| Deployment frequency | 1–2× / week (median) | 5× / day | DORA 2025 |
| P1 incidents preventable via drift detection | \- | 40% | StackGen incident database (80K+ incidents) |
| Cloud cost optimization realizable with reliability confidence | 0–5% (without risk scoring) | 15–25% | StackGen customer data |
| Average P1 incident cost (fully loaded) | $300K – $1M | \- | Gartner, PagerDuty industry research |

## 

## **Appendix B \- Glossary**

| Term | Definition |
| :---- | :---- |
| **ADF** | Autonomous DevOps Factory \- the platform and the category |
| **Factory** | A purpose-built set of coordinated Aiden agents, accountable for specific operational SLOs |
| **Factory Spec** | The structured output of intent-based generation: agent definitions, responsibilities, decision boundaries, SLOs, and escalation conditions |
| **Aiden** | StackGen’s AI agent system. Individual agents are the building blocks; Aiden for SRE and Aiden for DevOps are pre-built, opinionated factories \- each comprising several agents configured to work together. Custom agents built by customers are first-class citizens on the same infrastructure |
| **OCG** | Operational Context Graph \- the shared intelligence layer connecting infrastructure state, deployment history, observability signal patterns, and incident causality across all ADF domains |
| **Intent** | A plain-language description of desired operational outcomes, used as the input to ADF’s factory generation |
| **Autonomous Ops** | The broader category StackGen is creating, encompassing DevOps, MLOps, DataOps, and LLMOps factory domains under one platform |
| **InfraOps** | Infrastructure operations \- IaC management, drift detection, configuration state, and automated remediation |
| **Aiden OS** | StackGen’s agent runtime layer \- the infrastructure underneath every ADF factory, comprising Temporal, NATS, OPA, Model Routing, and Cost Governance |
| **Temporal** | Workflow orchestration engine used by ADF to manage multi-step agent workflows with durability, retries, and state tracking |
| **NATS** | Event messaging system used by ADF agents for asynchronous, loosely coupled communication |
| **OPA** | Open Policy Agent \- the policy enforcement layer that evaluates every consequential agent action before it executes |
| **Model Routing** | Runtime component that selects which LLM handles a given agent task based on task type, OCG confidence scores, and cost governance policy |
| **Cost Governance** | Tracks inference token spend per factory, per agent, and per task type; feeds back into model routing to shift familiar workloads to cheaper models over time |
| **Agent Spec** | The predefined behavioral contract for an individual agent type: input/output contracts, OCG reads/writes, policy boundaries, model routing profile, escalation triggers |
| **MTTD** | Mean Time to Detect \- average time from when an incident condition exists to when it is detected and an alert opens |

---

## 

## **Appendix C \- Factory Diagrams: SRE Factory (Example Flow 1\)**

The two diagrams below illustrate Example Flow 1 from complementary perspectives. Both are included as dedicated slides in the accompanying slide deck.

---

### **Diagram 1 \- Outcome Flow**

What the factory produces: five production states from infrastructure drift detection at 02:47 AM through to service restoration at 03:04 AM. Boxes represent stages and outcomes, not individual agents. Read top to bottom, following the timestamps on the left.

![SRE factory outcome flow - five stages from drift detection to service restoration][image1]

*SRE factory outcome flow \- five stages from drift detection to service restoration*

---

### **Diagram 2 \- Agent Topology**

How the factory is built: six agents across two phases, their event connections, and their shared access to the OCG. Read the detection phase first (InfraWatch → ChangeCorrelation via drift.detected event), then the resolution phase (RootCause → Remediation → DeployAgent → Verification). Both phases share the Operational Context Graph below. Temporal orchestrates the sequencing; OPA enforces policy at each action boundary.

![SRE factory agent topology - six agents in detection and resolution phases sharing the OCG][image2]

*SRE factory agent topology \- six agents in detection and resolution phases sharing the OCG*

---

## 

## **Appendix D \- Use Case Examples**

Three worked examples showing ADF factories from intent through to production outcomes. Referenced from Example Flows 1, 2, and 3 in the Press Release.

---

### **Example 1: Reducing On-Call Burden for Infrastructure-Related Incidents (SRE Factory)**

**Factory Spec generated by ADF:**

| Agent | Role |
| :---- | :---- |
| InfraWatch Agent | Continuously monitors IaC desired state vs. actual state; scores drift by incident probability |
| ChangeCorrelation Agent | Maps infrastructure change events to observability anomalies in the OCG timeline |
| RootCause Agent | On incident trigger, traces anomaly to infrastructure cause via OCG; generates hypothesis with confidence score |
| Remediation Agent | Generates corrective IaC; validates against policy gates; prepares deployment package |
| DeployAgent | Runs remediation through the validated DevOps pipeline with canary gate |
| Verification Agent | Confirms SLO recovery post-remediation; closes incident; writes full pattern to OCG |

**SLO committed by factory:** MTTR \< 15 minutes for infrastructure-correlated incidents. Prevention target: block 40% of P1s via pre-deployment drift detection.

**The factory in production \- a real Tuesday night:**

* **02:47 AM** \- InfraWatch detects Terraform state deviation in an autoscaling group. Drift risk scored: HIGH. Correlated with 3 prior incidents of same class in OCG.

* **02:51 AM** \- ObserveNow surfaces memory pressure on dependent services. ChangeCorrelation links deviation to pressure. Predicted incident probability: 91%.

* **02:51 AM** \- P1 alert fires. No human paged yet \- factory enters autonomous resolution mode.

* **02:52 AM** \- RootCause Agent traces incident to autoscaling configuration deviation. Confidence: 94%. Remediation path identified.

* **02:54 AM** \- Remediation Agent generates corrective IaC. Policy gate: passed. Compliance check: passed.

* **02:55 AM** \- DeployAgent runs remediation through validated pipeline with canary gate.

* **03:04 AM** \- Verification Agent confirms SLO recovery. Incident closed. Full audit trail generated. Post-mortem drafted.

* **03:04 AM** \- OCG updated: this drift pattern now classified as HIGH RISK at detection. Next occurrence triggers prevention, not resolution.

**Total MTTR: 13 minutes. Engineers paged: 0\. Post-mortem: auto-generated.**

**ROI (500-engineer company, 2 P1s/month):**

| Value driver | Annual impact |
| :---- | :---- |
| P1 incidents prevented (40% prevention rate) | $2.9M (at $300K avg P1 cost × 9.6 incidents/year prevented) |
| MTTR reduction on remaining incidents | $1.2M (4h → 13min × $300K/incident × 12/year) |
| 2 SREs freed from overnight on-call toil | $500K redirected to reliability architecture |
| **Total annual factory value** | **\~$4.6M** |

---

### **Example 2: Deployments That Verify Themselves (DevOps Factory)**

**Factory Spec generated by ADF:**

| Agent | Role |
| :---- | :---- |
| InfraStateAgent | Pre-deployment: checks current infra state against known failure-correlated drift patterns |
| BaselineAgent | Captures ObserveNow service baseline pre-deployment; sets rollback trigger thresholds |
| PipelineAgent | Runs CI/CD pipeline; gates on InfraStateAgent and BaselineAgent signals |
| DeploymentVerifier | Post-deployment: monitors p99 latency, error rate, and saturation for 10-minute window |
| RollbackAgent | On threshold breach: triggers rollback, notifies on-call with full deployment context |
| LearningAgent | Writes deployment outcome (success/rollback/root cause) to OCG for future gate calibration |

**SLO committed by factory:** Change failure rate \< 3%. Deployment frequency: daily or greater. Mean time to rollback if triggered: \< 4 minutes.

**The factory in production \- a Wednesday afternoon release:**

* **14:02** \- Engineer merges PR. PipelineAgent picks up the change. Pipeline build starts.

* **14:04** \- InfraStateAgent runs pre-deployment check. Finds: API gateway rate-limit config drifted from desired state 18 hours ago. OCG correlation: this drift class has preceded latency spikes in 2 of 3 prior deployments for this service.

* **14:04** \- PipelineAgent pauses pipeline. Raises flag: *“Infrastructure risk detected \- API gateway config drift has a 67% historical correlation with latency degradation for this service. Recommended: remediate drift before deploying.”* Engineer reviews in 4 minutes. Approves drift fix first.

* **14:08** \- Drift remediated. InfraStateAgent confirms clean state. PipelineAgent resumes pipeline.

* **14:19** \- Build passes. BaselineAgent captures pre-deployment ObserveNow baseline: p99 latency 142ms, error rate 0.03%, CPU saturation 41%.

* **14:21** \- Canary deployment begins (5% traffic). DeploymentVerifier monitors.

* **14:26** \- Canary metrics: p99 latency 148ms (+4.2%), error rate 0.03%, CPU saturation 43%. All within thresholds. DeploymentVerifier signals: proceed.

* **14:28** \- Full production rollout complete.

* **14:38** \- 10-minute post-deploy window closes. All metrics nominal. Deployment verified successful.

* **14:38** \- LearningAgent writes to OCG: deployment \#2847 successful; API gateway drift pattern flagged and resolved pre-deploy; baseline captured; no rollback. Future gate calibrated.

**Total engineer time spent:** 4 minutes (drift review). Pipeline ran, gated, and verified autonomously.

**Contrast \- the same deployment without ADF:** The drift would have gone undetected. The deployment would have shipped at 14:21. At 14:34, p99 latency would have crossed 300ms. An alert would have fired at 14:37. An on-call engineer would have been paged at 14:38. Root cause \- the API gateway drift combined with the deployment \- would have taken 60–90 minutes to establish across three tools. The rollback would have been triggered at 15:45. Total customer-facing degradation: 74 minutes.

| Metric | Before ADF | With ADF DevOps Factory |
| :---- | :---- | :---- |
| Deployment frequency | 2× per week | 5× per day |
| Change failure rate | 15% | 2.8% |
| Mean time to rollback | 28 minutes (human-triggered) | 3.5 minutes (autonomous) |
| Engineer hours per deployment | 45 minutes (babysitting) | 3 minutes (review gate only) |
| Deployments blocked by infra drift | 0 (not checked) | 23% (prevented before production) |

**ROI (500-engineer company):**

| Value driver | Annual impact |
| :---- | :---- |
| Change failure rate 15% → 3% (12% fewer failures × 50 deployments/week) | $4.7M (at $300K avg cost per production failure) |
| Engineer time freed from pipeline babysitting | $780K (45min → 3min × 50 deploys/week × avg $150/hr eng cost) |
| **Total annual factory value** | **\~$5.5M** |

---

### **Example 3: Cloud Migration Factory \- AWS to OCI (Step-by-Step)**

This extends Example Flow 3 in the Press Release section, showing the factory’s per-service migration cycle in detail and the ROI comparison against a traditional professional services approach.

**How the factory runs \- one service, one migration cycle:**

1. InventoryAgent scans the target service’s AWS resources and writes the full state to the OCG \- EC2 instances, RDS configuration, VPC topology, IAM roles, S3 buckets.

2. DependencyAgent confirms this service has no blocking dependencies on services not yet migrated.

3. IaCTranslationAgent generates OCI Terraform equivalents and stages them for review. The team approves. ProvisioningAgent runs the IaC and validates OCI resources to match desired state.

4. BaselineAgent captures the service’s current AWS performance baseline: p99 latency, error rate, throughput.

5. CutoverAgent shifts 10% of traffic to OCI. RollbackAgent monitors. After 30 minutes with no threshold breach, CutoverAgent shifts to 50%, then 100%.

6. BaselineAgent monitors OCI under full production load for 72 hours. If p99 latency on OCI stays within 10% of the AWS baseline, the service is marked as validated.

7. DecommissionAgent decommissions AWS resources for this service. OCG records the complete before-and-after state.

8. The factory moves to the next service in the dependency-safe order.

If at any point during steps 5 or 6 the RollbackAgent detects a threshold breach, it shifts all traffic back to AWS and flags the service for investigation \- with the full OCG context of what was provisioned, what the baselines were, and exactly where the degradation appeared.

**What this replaces:**

A traditional AWS-to-OCI migration typically runs 12–18 months with a significant professional services engagement \- a team of consultants managing the inventory, translation, and cut-over manually, with human-driven rollback decisions made under pressure. Total professional services cost: $2–5M for a 40-service estate.

With ADF, the migration runs in parallel with normal operations, managed by a smaller internal team. The factory handles the repeatable execution; engineers handle the decisions that require judgment. Migration timeline typically compresses to 6–9 months. More importantly, automatic rollback removes the largest risk in any migration: the cut-over that goes wrong at 2 AM with nobody watching.

---

*Document version: 1.5 \- Internal draft for review. Not for external distribution until approved by Product Marketing and Legal.*

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>