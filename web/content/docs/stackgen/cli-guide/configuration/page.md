---
title: "Choosing the Right Configuration"
product: "stackgen"
sourcePath: "/docs/cli-guide/configuration"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/configuration"
status: "ok"
---

StackGen requires configuration based on your deployment model. Whether using StackGen Cloud (SaaS) or StackGen On-Premises, setting up authentication ensures secure and seamless interaction with StackGen CLI.

## Choosing the Right Configuration

Before proceeding, determine which version of StackGen you are using:

- StackGen Cloud (SaaS): A fully managed solution hosted by StackGen, where infrastructure provisioning happens via the cloud. This option is ideal for teams looking for a hassle-free setup without maintaining on-prem infrastructure.
- StackGen On-Premises: A self-hosted deployment running within your organization’s network, giving full control over infrastructure management and security.

## Setting Up Authentication

Authentication is required for both versions to enable StackGen CLI to interact with your environment. Depending on your deployment, follow the relevant guide:

- [Configure StackGen Cloud (SaaS)](/docs/stackgen/cli-guide/configuration/cloud): Learn how to generate and set up a personal access token (PAT) to authenticate with the StackGen Cloud dashboard.
- [Configure StackGen On-Premises](/docs/stackgen/cli-guide/configuration/on-prem): Set up authentication for a self-hosted StackGen instance, including defining your on-prem StackGen server URL and generating an authentication token.

## Why Configuration Matters

Configuring StackGen correctly ensures:

- Secure Access: Personal access tokens (PATs) prevent unauthorized CLI usage.
- Seamless Automation: Once authenticated, StackGen CLI can execute commands without repeated login prompts.
- Environment-Specific Setup: On-prem users define custom server URLs, while SaaS users authenticate through the StackGen-hosted service.

Refer to the appropriate configuration guide to get started based on your deployment model.
