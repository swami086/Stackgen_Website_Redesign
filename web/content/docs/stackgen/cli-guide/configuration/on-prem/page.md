---
title: "Connecting StackGen CLI to Your On-Prem StackGen Instance"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration/on-prem"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration/on-prem"
status: "ok"
---

If you are using StackGen On-Premises, you need to configure authentication to connect StackGen CLI with your self-hosted instance. This setup allows your organization to manage infrastructure within its internal environment while leveraging StackGen’s automation capabilities.

## Connecting StackGen CLI to Your On-Prem StackGen Instance

```shell
export STACKGEN_URL="https://stackgen.<acme.org>"
```

1. Log in to your account at local domain.

2. Navigate to your personal access token settings at PAT settings.

3. Select 'Generate New Token'.

4. Generate a new token by following the prompts.

5. Copy your token (PAT).

6. Run the following command in your terminal to set the token:





```shell
export STACKGEN_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN>
```

7. Replace `<YOUR_PERSONAL_ACCESS_TOKEN>` with your actual token.
