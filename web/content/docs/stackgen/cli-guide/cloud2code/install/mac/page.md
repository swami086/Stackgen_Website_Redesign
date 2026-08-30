---
title: "Install Homebrew"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/install/mac"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/install/mac"
status: "ok"
---

This guide provides step-by-step instructions for installing and setting up the **Cloud-to-Code CLI** on **macOS** using **Homebrew**. It also includes guidance on installing and upgrading **Terraform** and **StackGen CLI**, ensuring your system is fully configured to work with **Cloud-to-Code**.

### Install Homebrew

If you do not have Homebrew installed, run the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Terraform

Check if you’ve installed Terraform by running the following command:

```bash
terraform version
```

Run the following command to install Terraform using Homebrew:

```bash
brew install terraform
```

### Install Cloud To Code CLI

To install the latest version of the Cloud-to-Code CLI tool using Homebrew, run the following:

```bash
brew install stackgenhq/homebrew-stackgen/cloud2code
```

To verify Cloud-to-Code installation, run the following:

```bash
cloud2code version
```

### Install StackGen CLI

Cloud-to-Code CLI lets you download a tfstate from the cloud. However, to provision the same using StackGen CLI, you would need to install StackGen CLI separately. To do so, run the following command if you haven’t done so already:

```bash
brew install stackgenhq/stackgen/stackgen
```

To verify StackGen CLI installation, run the following:

```bash
stackgen version
```

### Upgrade Cloud to Code CLI

To check the version of your Cloud to Code CLI installed, run the command:

```bash
cloud2code version
```

To upgrade to the latest version of the Cloud to Code CLI tool, run the following:

```bash
brew upgrade stackgenhq/homebrew-stackgen/cloud2code
```

Your Cloud-to-Code installation is complete! To get started, follow the appropriate guide for your cloud provider to generate and deploy your infrastructure.
