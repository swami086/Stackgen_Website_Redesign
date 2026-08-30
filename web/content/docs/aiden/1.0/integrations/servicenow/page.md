---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/servicenow"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/servicenow"
status: "ok"
---

Connect Aiden with your ServiceNow instance to get intelligent assistance with IT service management, incident operations, change management, project tracking, and workflow automation. Once enabled, Aiden can help you manage your ServiceNow environment as naturally as discussing it with an ITSM engineer.

## Integration Capabilities

With ServiceNow integration, Aiden can:

- **Manage incidents**: create, update, comment on, and resolve incidents with urgency, impact, and assignment details.
- **Handle change requests**: create and update normal, standard, or emergency change requests with risk, priority, and scheduling.
- **Track projects**: create and update projects with managers, dates, and state transitions.
- **Browse agile epics**: list and filter epics from ServiceNow Agile Development.
- **Manage workflows**: list, inspect, create, and update workflow definitions tied to any ServiceNow table.
- **Add comments and work notes**: post customer-visible comments or internal work notes to incidents.

## Custom Skills

On top of the built-in capabilities, you can create custom skills to extend Aiden's ServiceNow support, for example:

- Automate incident triage based on category, urgency, and assignment group rules.
- Build a self-service workflow to create and assign change requests on behalf of developers.
- Generate a daily summary of open high-priority incidents and pending change requests.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable ServiceNow Integration

### Create a ServiceNow Service Account

Aiden authenticates with ServiceNow using HTTP Basic Auth (username and password). It is recommended to create a dedicated service account rather than using a personal user account.

1. Log in to your ServiceNow instance as an administrator.
2. Navigate to **User Administration** → **Users**.
3. Click **New** to create a new user. Set a meaningful username (e.g., `aiden-integration`) and a strong password.
4. Assign the appropriate roles to the service account based on the operations you want Aiden to perform:
   - `itil`: required for incident and change request operations.
   - `project_manager`: required for project management operations.
   - `flow_designer` or `workflow_admin`: required for workflow operations.
5. Save the user record and note the username and password.

### Steps to Enable ServiceNow Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** in the left navigation.
2. Hover and click **Activate** on the ServiceNow integration card.
3. Enter the integration configuration parameters:
   - **Instance URL**: The base URL of your ServiceNow instance (e.g., `https://your-instance.service-now.com`).
     - Find this in your browser's address bar when logged into ServiceNow.
     - Do not include a trailing slash or any path suffix.
   - **Username**: The username of the ServiceNow service account created for Aiden.

   - **Password**: The password for the service account.



     Security Best Practices





     - Create a dedicated service account for Aiden with the minimum roles required.
     - Use read-only roles if you only need Aiden to query and report on data.
     - Rotate the service account password regularly (every 60–90 days recommended).
     - Monitor ServiceNow audit logs to track activity performed by the Aiden user.
     - Avoid using personal admin credentials for this integration.

   - **Create prebuilt skills**: Aiden supports pre-built skills for ServiceNow. Enable **Create prebuilt skills** to make these skills available.
4. Click **Save** to enable the integration.

### Sample Prompts

Here are some example prompts you can use:

- Show me all open high-priority incidents assigned to the Network team.
- Create an incident for a database connectivity outage affecting the production environment.
- Update incident `INC0012345`, mark it as resolved with a note that the server was rebooted.
- Add a work note to `INC0012345` saying the issue is under investigation by the DBA team.
- List all emergency change requests scheduled for this week.
- Create a normal change request for deploying the `v2.1.0` release to production next Friday.
- What projects are currently active in ServiceNow?
- Show me all workflows that operate on the incident table.
- Get the details of the workflow with `sys_id abc123def456`.

## Additional References

- [ServiceNow REST API Documentation](https://docs.servicenow.com/bundle/washingtondc-api-reference/page/integrate/inbound-rest/concept/c_RESTAPI.html)
- [ServiceNow Table API](https://docs.servicenow.com/bundle/washingtondc-api-reference/page/integrate/inbound-rest/concept/c_TableAPI.html)
- [ServiceNow User Administration](https://docs.servicenow.com/bundle/washingtondc-platform-administration/page/administer/users-and-groups/concept/c_UserAdministration.html)
- [ServiceNow Roles Reference](https://docs.servicenow.com/bundle/washingtondc-platform-administration/page/administer/roles/concept/c_Roles.html)

- [Integration Capabilities](/docs/aiden/1.0/integrations/servicenow#integration-capabilities)
- [Custom Skills](/docs/aiden/1.0/integrations/servicenow#custom-skills)
- [Enable ServiceNow Integration](/docs/aiden/1.0/integrations/servicenow#enable-servicenow-integration)
  - [Create a ServiceNow Service Account](/docs/aiden/1.0/integrations/servicenow#create-a-servicenow-service-account)
  - [Steps to Enable ServiceNow Integration](/docs/aiden/1.0/integrations/servicenow#steps-to-enable-servicenow-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/servicenow#sample-prompts)
