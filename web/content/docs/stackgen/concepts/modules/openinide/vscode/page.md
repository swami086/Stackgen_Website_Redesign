---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/modules/openinide/vscode"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/openinide/vscode"
status: "ok"
---

## Overview

The StackGen Extension for Visual Studio Code brings the power of StackGen’s Terraform module creation and management directly into Visual Studio Code, enabling you to create, edit, and publish infrastructure modules more efficiently. This extension is designed to work seamlessly with StackGen’s **Open in IDE** feature, so you can transition smoothly between the StackGen web UI and your local development environment.

### Features

- **Module Explorer**: Browse, open, and modify all your StackGen Terraform modules directly from VS Code.
- **Direct Sync**: Any changes you save are automatically synced back to StackGen.

## Get Started with the StackGen Extension

Follow these steps to set up and start using the extension:

### Prerequisites

Click to view

- Ensure that you have [Visual Studio Code](https://visualstudio.microsoft.com/) installed.
- Generate the StackGen [Personal Access Token (PAT)](/docs/stackgen/setup/pat) and use it once you install the extension.
- You will need an active [StackGen account](https://cloud.stackgen.com/login/).

### Install the Stackgen Extension

Click to view

1. From the Visual Studio Code Marketplace, search for **StackGen**.

2. Click **Install**.

3. Configure Your [Personal Access Token (PAT)](/docs/stackgen/setup/pat) in the StackGen Web UI. By default, once you install the StackGen extension, it will ask you to provide the PAT.

4. Copy and paste the **PAT** and hit **Return**.



![Enter PAT](https://docs.stackgen.com/assets/images/patrequest-b9b0e4424bb8ce2890ee3edc97122ee8.png)

5. StackGen will ask you to create a working directory or set one as shown below:



![Configure working dir](https://docs.stackgen.com/assets/images/workingdir-91bc766a66773b126c098074a7f89ce5.png)


### Configure StackGen Extension

Click to view

1. From the VS Code activity bar to the left, click the **StackGen** icon to launch the **Explorer**.

2. Click **Change Environment URL** and add the **URL** for your StackGen environment.



![Configure URL](https://docs.stackgen.com/assets/images/configureide-1d0b6b410d083b520d06e637e779071a.png)


The **Environment Configuration** pane allows you to manage your StackGen environment settings. From here, you can:

- **Update PAT**: Replace your Personal Access Token (PAT) used for authenticating with StackGen services.
- **Delete PAT**: Remove the existing PAT from your local configuration if you no longer want the extension to connect to StackGen.
- **Change Working Directory**: Select a different workspace folder where modules will be downloaded, saved, and edited.
- **Change Environment URL**: Specify or update the StackGen environment base URL (for example, if you are using a self-hosted deployment or staging environment).

3. The **Modules** panel at the bottom lists custom modules that are created in the **Modules** page. You can edit and update these. To sync modules from the **StackGen Web UI**, simply click the refresh icon in the Infrastructure menu.



![Configure URL](https://docs.stackgen.com/assets/images/refereshmodules-b6d89bbd19091eda87767a869d9d1b57.png)

4. Alternatively, you can also click **Open in IDE** from the **StackGen Web UI** and select **Open in VSCode**.



![Configure URL](https://docs.stackgen.com/assets/images/openinvscode-15d24cd2a12b942e86dfc973d1463151.png)

5. Your Module code will look something like this:



![Configure URL](https://docs.stackgen.com/assets/images/modulecodevs-25cd2f2cc453e833383c7d2e2fa4087a.png)

6. You can make your changes and hit **Save**. These changes will now be reflected in the **StackGen Web UI Code Editor**, and you can visualize the same in the **Preview** pane.



![Configure URL](https://docs.stackgen.com/assets/images/iconpanel-56fb35324df6715ecff5d03accf0b15c.png)











Clicking the icons will perform the following actions:
   - **🔗 Link**: This will redirect you to the module editor page in the StackGen Web UI.
   - **>\_ Terminal**: Run the Terraform commands for the module.
   - **💾 Save**: Save your changes in the working project folder in your system and sync it back to StackGen, where your module is created and stored.
   - **☁️ Download**: Download the module to your system.

- [Overview](/docs/stackgen/concepts/modules/openinide/vscode#overview)
  - [Features](/docs/stackgen/concepts/modules/openinide/vscode#features)
- [Get Started with the StackGen Extension](/docs/stackgen/concepts/modules/openinide/vscode#get-started-with-the-stackgen-extension)
  - [Prerequisites](/docs/stackgen/concepts/modules/openinide/vscode#prerequisites)
  - [Install the Stackgen Extension](/docs/stackgen/concepts/modules/openinide/vscode#install-the-stackgen-extension)
  - [Configure StackGen Extension](/docs/stackgen/concepts/modules/openinide/vscode#configure-stackgen-extension)
