---
title: "Docker"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/install/windows"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/install/windows"
status: "ok"
---

This guide provides step-by-step instructions for installing and setting up the **Cloud-to-Code CLI** on **Windows OS** using either **Docker** or a standalone `.exe` file. It also covers the installation of **Terraform**.

## Docker

Click to view

Follow the steps below to set up the Cloud-to-Code CLI on Windows OS using Docker.

### Before You Begin

- **Recommended system requirements**: 4 vCPU and 8 GB RAM.
- Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) on your Windows system. If you have installed Docker already, you can use the CLI directly from the Docker container.

### Install Cloud-to-Code CLI

Open your Windows Terminal and run the following command to pull the latest version of the Cloud-to-Code CLI image:

```bash
docker pull ghcr.io/stackgenhq/cloud2code
```

If you do not have [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) installed, run the command:

```bash
winget install --id Microsoft.WindowsTerminal -e
```

### Install Terraform

Check if you’ve installed **Terraform** by running the following command:

```bash
terraform version
```

To install Terraform, run the following command:

- Chocolatey
- Scoop

tip

We recommend that you use Chocolatey for installing Terraform on Windows.

If you have Chocolatey installed, run:

```bash
choco install terraform
```

If you don’t have Chocolatey, install it from [chocolatey.org](https://chocolatey.org/).

Scoop is another Windows Package Manager that you can choose to install Terraform with.

Run the following command:

```bash
scoop install terraform
```

If you do not have Scoop installed, check out the [scoop.sh](https://github.com/ScoopInstaller/Scoop?tab=readme-ov-file#installation) documentation.

## Using `.exe` File

Click to view

### 1\. Install Terraform

Check if you’ve installed **Terraform** by running the following command:

```bash
terraform version
```

To install Terraform, run the following command:

- Chocolatey
- Scoop

tip

We recommend that you use Chocolatey for installing Terraform on Windows.

If you have Chocolatey installed, run:

```bash
choco install terraform
```

If you don’t have Chocolatey, install it from [chocolatey.org](https://chocolatey.org/).

Scoop is another Windows Package Manager that you can choose to install Terraform with.

Run the following command:

```bash
scoop install terraform
```

If you do not have Scoop installed, check out the [scoop.sh](https://github.com/ScoopInstaller/Scoop?tab=readme-ov-file#installation) documentation.

### 2\. Download `cloud2code.exe`

1. To download the `.exe` file, click the link [https://releases.stackgen.com/binaries/v0.5.1/cloud2code\_0.5.1\_windows\_amd64.zip](https://releases.stackgen.com/binaries/v0.5.1/cloud2code_0.5.1_windows_amd64.zip).

2. To update your Cloud-to-Code CLI with the latest version, run the following command:


- Chocolatey
- Scoop

If you have Chocolatey installed, run:

```bash
choco upgrade stackgen cloud2code
```

If you don’t have Chocolatey, install it from [chocolatey.org](https://chocolatey.org/).

Run the following command:

```bash
scoop update stackgen
```

If you do not have Scoop installed, check out the [scoop.sh](https://github.com/ScoopInstaller/Scoop?tab=readme-ov-file#installation) documentation.

### 3\. Set up Cloud-to-Code CLI using `.exe`

To use the Cloud-to-Code CLI on Windows, add the folder containing the `.exe` file to your **System Environment Variables** under the **Path** variable. This lets you to run the Cloud-to-Code CLI directly from the terminal window.

Follow these steps to set up the Cloud-to-Code CLI:

1. Extract the contents of the `.zip` file and save the executable (`.exe`) files in a folder you want to add to your system `PATH`.

2. Open **Start** and search for **Edit the system environment variables**, and then open it.

3. In the **System Properties** window, click **Environment Variables**.

4. Under **User** variables, find and select the **Path** variable, then click **Edit**.

5. In the **Edit Environment Variable** window, click **New**.

6. Paste the full folder path where the `.exe` file is stored (e.g., `C:\Tools\cloud2code`), then click **OK** to save.

7. Restart your terminal and run the Cloud-to-Code CLI to confirm it works:





```shell
cloud2code version
```


Your Cloud-to-Code installation is complete! To get started, follow the appropriate guide for your cloud provider to generate and deploy your infrastructure.

- [Docker](/docs/stackgen/cli-guide/cloud2code/install/windows#docker)
  - [Before You Begin](/docs/stackgen/cli-guide/cloud2code/install/windows#before-you-begin)
  - [Install Cloud-to-Code CLI](/docs/stackgen/cli-guide/cloud2code/install/windows#install-cloud-to-code-cli)
  - [Install Terraform](/docs/stackgen/cli-guide/cloud2code/install/windows#install-terraform)
- [Using `.exe` File](/docs/stackgen/cli-guide/cloud2code/install/windows#using-exe-file)
  - [1\. Install Terraform](/docs/stackgen/cli-guide/cloud2code/install/windows#1-install-terraform)
  - [2\. Download `cloud2code.exe`](/docs/stackgen/cli-guide/cloud2code/install/windows#2-download-cloud2codeexe)
  - [3\. Set up Cloud-to-Code CLI using `.exe`](/docs/stackgen/cli-guide/cloud2code/install/windows#3-set-up-cloud-to-code-cli-using-exe)
