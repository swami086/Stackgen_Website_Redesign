---
title: "Creating a PAT in StackGen"
product: "stackgen"
sourcePath: "/docs/setup/pat"
sourceUrl: "https://docs.stackgen.com/docs/setup/pat"
status: "ok"
---

For Platform and DevOps Engineers

A PAT (personal access token) allows an outside application to connect to the StackGen API as if it had your permissions. This token is not the same as the login you use for either StackGen or the outside application. Configuring a PAT means that you do not need to re-use your login, and the connection will not be compromised if your login is compromised. PAT connections are considered a best practice for API security.

A token has the same capabilities to access resources and perform actions on those resources that the owner of the token has. Once a token has been created, you use it to authenticate an application instead of using your own login.

## Creating a PAT in StackGen

Follow these steps to create a personal access token in StackGen:

1. Log in as a user with the appropriate permissions and choose **Account Settings** from your user profile.
2. Select the **Personal Access Tokens** menu item and select **Generate New Token**. You'll see the Personal Access Tokens dialog.
3. Use the fields to describe your token characteristics and select **Generate Token**.
4. Save your token.

## Use a PAT to Access the StackGen API

The process for using a PAT is described in [the CLI instructions](/docs/stackgen/cli-guide/configuration/cloud)
