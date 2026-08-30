---
title: "Use the StackGen Software as a Service"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/cloud"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/cloud"
status: "ok"
---

If you are using StackGen Cloud (SaaS), you need to configure authentication to connect StackGen CLI with your cloud-based dashboard. This ensures secure access to StackGen's fully managed infrastructure provisioning services.

## Use the StackGen Software as a Service

1. Log in to your account at [StackGen Cloud](https://cloud.stackgen.com/).

2. Navigate to your personal access token settings page.

3. Select **Generate New Token**.

4. Generate a new token by following the prompts.

5. Copy your token.

6. Run the following command in your terminal to set the token:





```shell
export STACKGEN_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN>
```









Replace `<YOUR_PERSONAL_ACCESS_TOKEN>` with your **Cloud Personal Access Token**. This token enables StackGen CLI to authenticate your requests and interact with the cloud platform. Ensure you store it securely and do not share it publicly.

7. Configure the **`URL`** for your StackGen Cloud:





```bash
export STACKGEN_URL="https://cloud.stackgen.com/"
```

8. Authenticate the CLI (same flow as `stackgen login` or `stackgen configure`):





```bash
stackgen login
```
