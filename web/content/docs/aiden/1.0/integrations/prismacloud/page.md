---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/prismacloud"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/prismacloud"
status: "ok"
---

Connect Aiden with Prisma Cloud CNAPP/CSPM to get intelligent assistance with cloud security posture management, compliance reporting, and policy violation remediation. Once enabled, Aiden becomes your cloud security expert, helping you understand your compliance posture, surface open violations, and guide remediation across your cloud environments through natural conversations.

Prisma Cloud is a Cloud Native Application Protection Platform (CNAPP) from Palo Alto Networks that provides visibility, compliance, and threat detection across multi-cloud environments. By integrating Prisma Cloud with Aiden, you can quickly generate compliance reports, investigate policy violations, and obtain remediation guidance—all through conversational interactions.

Prisma Cloud is available in two editions:

- **Enterprise Edition (SaaS / CNAPP)**: The hosted Prisma Cloud platform at prismacloud.io. Uses Access Key / Secret Key authentication.
- **Compute Edition (Self-Hosted / Twistlock)**: A self-hosted Prisma Cloud Compute Console. Supports Basic Auth (username/password) or Bearer Token authentication.

## Integration Capabilities

With Prisma Cloud integration, Aiden can:

- Generate PCI DSS compliance reports with per-requirement pass/fail breakdown.
- Get compliance posture summary and scoring across all standards.
- List open policy violation alerts scoped by account, severity, or compliance standard.
- Retrieve remediation steps and alternative controls for each policy violation.
- Drill into specific compliance requirements and sections for evidence gathering.
- Discover cloud accounts and account groups for environment scoping.
- View existing compliance report configurations.

## Enable Prisma Cloud Integration

### Prerequisites

Before enabling the integration, ensure:

- You have an active Prisma Cloud account (Enterprise or Compute Edition).
- **Enterprise Edition**: You have permission to create Access Keys in the Prisma Cloud console.
- **Compute Edition**: You have console credentials or a Bearer Token for your self-hosted instance.

### Enterprise Edition: Generate Access Keys

To integrate with Aiden using Prisma Cloud Enterprise Edition:

1. Log in to your Prisma Cloud console at [prismacloud.io](https://app.prismacloud.io/).
2. Navigate to **Settings** → **Access Keys**.
3. Click **Add New** and provide a name (e.g., "Aiden Integration").
4. Copy both the **Access Key ID** and **Secret Key** — the Secret Key is only shown once.
5. Note your regional API URL (defaults to `https://api.prismacloud.io`; override for other regions — see the field help text in the integration form for all regional URLs).

Important

The Access Key requires at least Read permissions on Compliance and Alerts to use Aiden's capabilities. Store the Secret Key securely as it cannot be retrieved after creation.

### Compute Edition: Authentication

For self-hosted Prisma Cloud Compute Console, you can authenticate using:

- **Basic Auth**: Your console admin username and password.
- **Bearer Token**: A token obtained from your Compute Console API.

You will need the base URL of your Compute Console, including port 8083 (e.g., `https://console.example.com:8083`).

### Steps to Enable Prisma Cloud Integration

Follow these steps to enable the integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Prisma Cloud integration card.

3. Select your **Edition**:
   - **Enterprise Edition (SaaS / CNAPP)**: For Prisma Cloud hosted at prismacloud.io.
   - **Compute Edition (Self-Hosted / Twistlock)**: For a self-hosted Compute Console.
4. Enter the integration configuration parameters for your edition:

**Enterprise Edition:**


   - **Configuration Name**: A descriptive name for this integration configuration.
   - **Configuration Description** (optional): Additional details about this configuration.
   - **API URL** (optional, Advanced): Regional API base URL. Defaults to `https://api.prismacloud.io`. Override for non-US regions.
   - **Access Key ID**: Your Prisma Cloud access key ID.
   - **Secret Key**: The secret key associated with your access key.

**Compute Edition:**
   - **Configuration Name**: A descriptive name for this integration configuration.
   - **Configuration Description** (optional): Additional details about this configuration.
   - **Console URL**: Base URL of your Compute Console, including port 8083.
   - **Authentication Type**: Choose between Basic Auth (username/password) or Bearer Token.
   - **Username** / **Password**: Required for Basic Auth.
   - **Bearer Token**: Required for Bearer Token authentication.
5. Click **Save** to enable the integration.


### Sample Prompts

Here are some sample prompts you can use with the Prisma Cloud integration:

**Compliance Reporting:**

- Generate a PCI DSS compliance report for my AWS accounts.
- What is my overall compliance posture across all standards?
- Show me the pass/fail breakdown for PCI DSS Requirement 6.
- Which compliance requirements are failing for my Azure environment?

**Policy Violations:**

- List all open high-severity alerts in my production account.
- Show me policy violations related to S3 bucket exposure.
- What are the critical violations affecting my compliance score?
- Are there any alerts related to unencrypted storage in account X?

**Remediation:**

- How do I remediate the "MFA not enabled for root account" violation?
- What are the alternative controls for the failed IAM policy check?
- Show me remediation steps for all failing PCI DSS requirements.

**Account and Environment Scoping:**

- List all cloud accounts connected to Prisma Cloud.
- What account groups are configured?
- Show me all compliance report configurations.

## Limitations

- **Enterprise Edition** requires an Access Key with at least Read permissions on Compliance and Alerts.
- **Compute Edition** tools use the Compute REST API — CSPM/CNAPP compliance features (compliance posture, alerts, account discovery) require Enterprise Edition.
- Binary report downloads are not supported; reports are synthesised from live API data.

## Additional References

- [Prisma Cloud Access Keys](https://docs.prismacloud.io/en/classic/cspm-admin-guide/manage-prisma-cloud-administrators/create-access-keys)
- [Prisma Cloud API Reference](https://pan.dev/prisma-cloud/api/cspm/)
- [Prisma Cloud Compute API Reference](https://pan.dev/compute/api/)
- [Prisma Cloud Regional API URLs](https://pan.dev/prisma-cloud/api/cspm/api-urls/)

- [Integration Capabilities](/docs/aiden/1.0/integrations/prismacloud#integration-capabilities)
- [Enable Prisma Cloud Integration](/docs/aiden/1.0/integrations/prismacloud#enable-prisma-cloud-integration)
  - [Prerequisites](/docs/aiden/1.0/integrations/prismacloud#prerequisites)
  - [Enterprise Edition: Generate Access Keys](/docs/aiden/1.0/integrations/prismacloud#enterprise-edition-generate-access-keys)
  - [Compute Edition: Authentication](/docs/aiden/1.0/integrations/prismacloud#compute-edition-authentication)
  - [Steps to Enable Prisma Cloud Integration](/docs/aiden/1.0/integrations/prismacloud#steps-to-enable-prisma-cloud-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/prismacloud#sample-prompts)
