---
title: "Prompt Structure Best Practice"
product: "aiden"
sourcePath: "/aiden/2.0/new-conversation"
sourceUrl: "https://docs.stackgen.com/aiden/2.0/new-conversation"
status: "ok"
---

Use **\+ New Conversation** button to start a fresh thread with clear context and expected outcomes. In Aiden 2.0, better prompts lead to faster, more reliable results.

**Available for roles:** AdminWorkspace AdminWorkspace User

**Scope:** Workspace

You can start a new conversation when you need to:

- Triage a new incident or alert.
- Investigate a service failure.
- Request automation for a workflow.
- Run a scoped analysis for one workspace.
- Avoid mixing unrelated tasks in an existing thread.

## Prompt Structure Best Practice

For best results, structure prompts in this order:

1. **Role and objective**: Tell Aiden what role it should simulate and what success looks like.
2. **Context and source data**: Include alert details, entity identifiers, timestamps, labels, and integration names.
3. **Constraints**: State what tools or integrations to use or avoid.
4. **Expected output format**: Specify exact sections you want in the response.
5. **Next action requirement**: Ask Aiden to persist, classify, or route the result if needed.

## Sample Prompts

tip

- Keep one objective per conversation.
- Include exact integration names to avoid ambiguity.
- Provide explicit output sections if the result is used by downstream systems.
- Reuse successful prompts as templates for your team.

- ### Incident triage prompt [](/docs/aiden/2.0/new-conversation#incident-triage-prompt%20%22Direct%20link%20to%20Incident%20triage%20prompt%22)






```text
You are assisting an on-call SRE. Investigate this firing alert and summarize likely root cause, impact, immediate mitigation, and recovery checks.

Service: <service-name>

Alert: <alert-title>

Started at: <timestamp>

Use only these integrations: <integration-names>

Output sections: root cause, blast radius, impact, mitigation, verification, follow-up hardening.
```

- ### Deployment failure prompt [](/docs/aiden/2.0/new-conversation#deployment-failure-prompt%20%22Direct%20link%20to%20Deployment%20failure%20prompt%22)






```text
Act as a release engineer. A deployment failed in production after the latest change.

Compare current and previous deploy state, identify likely regression point, and propose rollback or fix-forward plan.

Use only workspace integrations and provide exact validation steps before and after mitigation.
```

- ### Noisy alert reduction prompt [](/docs/aiden/2.0/new-conversation#noisy-alert-reduction-prompt%20%22Direct%20link%20to%20Noisy%20alert%20reduction%20prompt%22)






```text
Review this alert stream and identify noise patterns.

Recommend ingestion filters, severity normalization, and auto-investigation rules that reduce alert fatigue without hiding true incidents.

Return: findings, filter rules, risk notes, and rollout plan.
```

- ### Post-incident hardening prompt [](/docs/aiden/2.0/new-conversation#post-incident-hardening-prompt%20%22Direct%20link%20to%20Post-incident%20hardening%20prompt%22)






```text
Based on this incident summary, propose hardening actions across observability, runbooks, and policy guardrails.

Prioritize by impact and implementation effort.

Return a 30-60-90 day action plan.
```

- ### Advanced Example: Full On-Call SRE Prompt [](/docs/aiden/2.0/new-conversation#advanced-example-full-on-call-sre-prompt%20%22Direct%20link%20to%20Advanced%20Example:%20Full%20On-Call%20SRE%20Prompt%22)


Use this format when you need detailed triage and an explicit handoff payload.





```text
You are assisting an on-call SRE minimizing MTTR for a Grafana alert. Alert: "5xx alerts detected for service "consoleapi" and operation "post"". UID: sha256:c7ab3e03dc64c9e4. State: firing. Service/context: consoleapi. Active since: 2026-05-21T08:08:50.000Z. Use the same tenant integrations as the SRE war room: grafana=grafana-integration. Grafana data in this UI is from integration "grafana-integration". Prefer these integration names when calling tools, do not substitute a different Grafana or SCM instance. Labels: __alert_rule_uid__=dffw24qy938qoe, alertname=APM5xxErrors, grafana_folder=OpsVerse-Alerts, normalizedOperation=post, service=consoleapi. Annotations: __orgId__=1, __value_string__=[ var='A' labels={normalizedOperation=post, service=consoleapi} value=1 ], [ var='C' labels={normalizedOperation=post, service=consoleapi} value=1 ], __values__={"A":1,"C":1}, description=5xx alerts detected for service "consoleapi" and operation "post", summary=5xx alerts detected for service "consoleapi" and operation "post". Respond with: (1) likely root cause and blast radius, (2) customer/user impact, (3) immediate mitigation steps, (4) how to verify recovery, (5) follow-up hardening. When your analysis is complete, persist the outcome by calling the SRE Copilot app MCP tool submit_alert_triage_result (POST /mcp) with alert_uid from metadata, status (completed, partial, or failed), summary, root_cause, impact, mitigation, verification, alert_category (needs_attention, validated, needs_review, false_positive), and alert_title / alert_severity from the alert context.
```


- [Prompt Structure Best Practice](/docs/aiden/2.0/new-conversation#prompt-structure-best-practice)
- [Sample Prompts](/docs/aiden/2.0/new-conversation#sample-prompts)
  - [Incident triage prompt](/docs/aiden/2.0/new-conversation#incident-triage-prompt)
  - [Deployment failure prompt](/docs/aiden/2.0/new-conversation#deployment-failure-prompt)
  - [Noisy alert reduction prompt](/docs/aiden/2.0/new-conversation#noisy-alert-reduction-prompt)
  - [Post-incident hardening prompt](/docs/aiden/2.0/new-conversation#post-incident-hardening-prompt)
  - [Advanced Example: Full On-Call SRE Prompt](/docs/aiden/2.0/new-conversation#advanced-example-full-on-call-sre-prompt)
