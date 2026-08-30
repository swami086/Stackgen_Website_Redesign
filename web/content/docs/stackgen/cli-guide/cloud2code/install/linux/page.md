---
title: "Install Homebrew"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/install/linux"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/install/linux"
status: "ok"
---

This guide provides step-by-step instructions for installing and setting up the **Cloud-to-Code CLI** on **macOS** using **Homebrew**. It also includes guidance on installing and upgrading **Terraform** and **StackGen CLI**, ensuring your system is fully configured to work with **Cloud-to-Code**.

### Install Homebrew

If you do not have Homebrew installed, run the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

note

This script installs Homebrew for Linux if you’re on a non-macOS system. It places it under `/home/linuxbrew/.linuxbrew`.

Set up the environment path:

echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc

Change `.bashrc` as per your current shell source `~/.bashrc`.

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

1. **Install Git**: Git is required for Homebrew and StackGen.





```shell
sudo yum install git -y
```

2. **Install Homebrew**: Homebrew is a package manager that simplifies software installation. Set up the environment path:





```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. **Configure Homebrew for Your Shell**: Add Homebrew to your shell’s environment variables. If you’re using a different shell like `zsh` or `fish`, replace `.bashrc` accordingly.





```shell
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
```

4. **Apply the Changes**: Reload your shell configuration so the new settings take effect.





```shell
source ~/.bashrc
```

5. **Install StackGen**: Now use Homebrew to install StackGen.





```shell
brew install stackgenhq/stackgen/stackgen
```

6. Update StackGen CLI on Linux:





```bash
brew upgrade stackgen
```

7. You can verify the updated version with:





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
brew upgrade cloud2code
```

Your Cloud-to-Code installation is complete! To get started, follow the appropriate guide for your cloud provider to generate and deploy your infrastructure.
