---
title: "Accessing Git Configurations"
product: "stackgen"
sourcePath: "/docs/concepts/gitconfigurations"
sourceUrl: "https://docs.stackgen.com/docs/concepts/gitconfigurations"
status: "ok"
---

This guide walks you through how to create and manage Git configurations in StackGen so that you can seamlessly push changes in your appStacks to your chosen Git provider.

The Git Configurations page lets you to define and store your Git repository settings, including authentication tokens, target branches, and file paths that StackGen uses when pushing changes in your IaC code to your repositories.

Once a configuration is saved, it can be referenced by an appStack within the Project where you've created it. This allows you to:

- Push IaC changes directly to your Git repository.
- Automatically generate pull requests.
- Maintain consistent Git workflows across your project.

## Accessing Git Configurations

Click to view

You can access the Git configurations from two places:

1. **Project > Git Configurations**
2. **appStack > Configure Git**

Both options let you create, edit, or reuse your Git configurations.

## Create a Git Configuration

Click to view

### 1\. Select your Git Provider

Choose from four supported providers:

- **GitHub**
- **GitLab**
- **Azure DevOps**
- **Bitbucket**

This determines where StackGen will push IaC code.

### 2\. Select an Authentication Token

Under **Select existing token from secret store**, pick a stored token that grants write access to the selected Git provider.

If no token exists, click **Add new** to create one. Follow the steps to create [Secret Store](/docs/stackgen/setup/settings#secret-store).

note

- Tokens must have **repo write permissions**.
- Tokens are stored securely and reusable across configurations.
- If you are using GitLab, you'll need `api` and `write_repository` scopes enabled.

### 3\. Enter Repository Details

**Repository URL**: Enter the full Git repo URL where IaC code will be pushed. For example:

```text
https://github.com/your-org/your-repo
```

**Target Branch (Optional)**: Specify a branch to push to or to create a Pull Request against. The Default setting is your repository's primary branch (e.g., `main`).

**Target Path (Optional)**: Define where inside the repository the IaC files should be placed.

- `/` means root of the repo.
- `infrastructure/` or `iac/` stores IaC in a subfolder.

If your team keeps non-StackGen files inside the target path, add them to a **`.stackgenignore`** file at the repository root before you push. See [Use `.stackgenignore` with Push to Git](/docs/stackgen/concepts/iac/exporting-iac#use-stackgenignore-with-push-to-git).

**4\. Name Your Configuration**: Enter a meaningful name for your configuration so it can be easily reused by your team. For Example:

```text
GitHub Config - Dev Environment
```

This name appears in your appStack **Configure Push-to-git** dialog.

**5\. Save or Apply the Configuration**

Depending on where you're configuring Git:

- **Git Configurations** page > **Save Defaults**.
- **appStack Topology** page > **Push to Git** \> **Configure GitHub**.

Your configuration is now stored and ready to use.

## Using Git Configurations in an appStack

Click to view

To use an existing Git configuration, follow these steps:

1. From the StackGen home page, navigate to appStacks and click on the pretinent appStack.
2. Click **Push to Git** \> **Configure Git**.
3. Select one of your saved Git configurations.
4. Click **Push to GitHub**.

Once you click **Push to GitHub** StackGen will:

- Create or update your IaC files.
- Push them to the specified repo, branch, and path.
- Create a Pull Request.

## Best Practices

Click to view

- **Use separate tokens** for production vs. development projects.
- **Organize IaC in dedicated folders** like `infrastructure/` or `terraform/`.
- **Use meaningful configuration names** that reflect environment or purpose.
- **Verify token permissions** whenever you see authentication or push errors.

## Troubleshooting

Click to view

### Push fails with permission errors

- Ensure the authentication token has **repo write access**.
- Verify the repository `URL` is correct.

### IaC files appear in the wrong directory

- Check the **Target Path** value for typos or missing slashes.

### Git provider not accepting changes

- Confirm the branch exists, or allow StackGen to create a new PR branch.

- [Accessing Git Configurations](/docs/stackgen/concepts/gitconfigurations#accessing-git-configurations)
- [Create a Git Configuration](/docs/stackgen/concepts/gitconfigurations#create-a-git-configuration)
  - [1\. Select your Git Provider](/docs/stackgen/concepts/gitconfigurations#1-select-your-git-provider)
  - [2\. Select an Authentication Token](/docs/stackgen/concepts/gitconfigurations#2-select-an-authentication-token)
  - [3\. Enter Repository Details](/docs/stackgen/concepts/gitconfigurations#3-enter-repository-details)
- [Using Git Configurations in an appStack](/docs/stackgen/concepts/gitconfigurations#using-git-configurations-in-an-appstack)
- [Best Practices](/docs/stackgen/concepts/gitconfigurations#best-practices)
- [Troubleshooting](/docs/stackgen/concepts/gitconfigurations#troubleshooting)
  - [Push fails with permission errors](/docs/stackgen/concepts/gitconfigurations#push-fails-with-permission-errors)
  - [IaC files appear in the wrong directory](/docs/stackgen/concepts/gitconfigurations#iac-files-appear-in-the-wrong-directory)
  - [Git provider not accepting changes](/docs/stackgen/concepts/gitconfigurations#git-provider-not-accepting-changes)
