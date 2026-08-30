---
title: "Install"
product: "stackgen"
sourcePath: "/docs/cli-guide/get-started/install-and-uninstall"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/get-started/install-and-uninstall"
status: "ok"
---

This guide covers both installing and uninstalling the StackGen CLI on different operating systems.

[**Install**](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install) [**Install a specific version**](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install-a-specific-cli-version-macos-and-linux) [**Install Dependencies**](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install-stackgen-cli-dependencies) [**Uninstall**](/docs/stackgen/cli-guide/get-started/install-and-uninstall#uninstall)

## Install

To install StackGen CLI, follow the appropriate method based on your operating system:

## Install a specific CLI version (macOS and Linux) [](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install-a-specific-cli-version-macos-and-linux%20%22Direct%20link%20to%20Install%20a%20specific%20CLI%20version%20(macOS%20and%20Linux)")

Click to view

Use the **`download-stackgen.sh`** script when you need a particular CLI release instead of the latest Homebrew build. The script supports **macOS** (`darwin`) and **Linux** only. It does not download Windows binaries.

Download the script from the [stackgen-cli repository](https://github.com/stackgenhq/stackgen-cli/blob/main/scripts/download-stackgen.sh):

```bash
curl -fsSL -o download-stackgen.sh https://raw.githubusercontent.com/stackgenhq/stackgen-cli/main/scripts/download-stackgen.sh
```

### Script usage

```bash
download-stackgen.sh <version> <architecture> [options]
```

| Argument or option | Description |
| --- | --- |
| `version` | Release version, for example `0.82.0` or `v0.82.0` |
| `architecture` | `amd64` or `arm64`. Aliases: `x86_64`, `aarch64` |
| `-o`, `--os` | Target OS: `darwin` or `linux`. If omitted, the script detects your OS. |
| `-d`, `--dir` | Output directory for the binary. Default is the current directory. |
| `-O`, `--output` | Output file name. Default is `stackgen`. |
| `-h`, `--help` | Show script help. |

The script downloads a tarball from:

`https://releases.stackgen.com/binaries/stackgen-cli/v<version>/stackgen-cli_<version>_<os>_<arch>.tar.gz`

note

Use a CLI version that matches your StackGen server. Backend APIs can change between CLI releases.

**Examples**

#### Usage 1: Download for the current OS (auto-detected) [](/docs/stackgen/cli-guide/get-started/install-and-uninstall#usage-1-download-for-the-current-os-auto-detected%20%22Direct%20link%20to%20Usage%201:%20Download%20for%20the%20current%20OS%20(auto-detected)")

```bash
chmod +x download-stackgen.sh

./download-stackgen.sh 0.82.0 arm64
```

The above command will download the `0.82.0` binary for your OS and write `stackgen` to the current directory.

#### Usage 2: Download for Linux on amd64

```bash
./download-stackgen.sh v0.82.0 amd64 --os linux
```

The above command will download the Linux amd64 tarball for version `0.82.0`.

#### Usage 3: Install to a directory on your PATH

```bash
./download-stackgen.sh 0.82.0 arm64 --dir /usr/local/bin
```

The above command will install the `stackgen` binary to `/usr/local/bin`.

After install, run `stackgen version` to confirm the binary. See [Check StackGen Version](/docs/stackgen/cli-guide/configuration/check-stackgen-version).

For **Windows**, use [Option 3: Using `.exe` File](/docs/stackgen/cli-guide/get-started/install-and-uninstall#option-3-using-exe-file) and download the `.zip` for the version you need.

## macOS

Click to view

Install Homebrew if not already installed by running:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install StackGen:

```shell
brew install stackgenhq/stackgen/stackgen
```

Verify the Installation:

```shell
stackgen version
```

### Updating StackGen CLI on macOS

Update StackGen CLI using:

```bash
brew upgrade stackgen
```

You can verify the updated version with:

```bash
stackgen version
```

## Linux

Click to view

Follow these steps to install StackGen using Homebrew on your Linux system.

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


### Update StackGen CLI on Linux

Update StackGen CLI using:

```bash
brew upgrade stackgen
```

You can verify the updated version with:

```bash
stackgen --version
```

## Windows

StackGen CLI can be used on Windows in the following ways:

### Option 1: Using Docker

Click to view

StackGen CLI runs on Windows using Docker. To start a StackGen CLI container, use the following command:

```shell
docker run -it --rm -p 50525:50525 -v ~/.stackgen:/home/stackgen/.stackgen ghcr.io/stackgenhq/stackgen:latest
```

note

This command launches a temporary StackGen CLI container, switching the terminal prompt to the StackGen CLI environment where StackGen commands can be executed.

#### Updating StackGen CLI with Docker

If you're using the Docker-based CLI, pull the latest image:

```bash
docker pull ghcr.io/stackgenhq/stackgen:latest
```

Then run the CLI as usual:

```bash
docker run -it --rm -p 50525:50525 -v ~/.stackgen:/home/stackgen/.stackgen ghcr.io/stackgenhq/stackgen:latest
```

### Option 2: Using Windows Subsystem for Linux (WSL) [](/docs/stackgen/cli-guide/get-started/install-and-uninstall#option-2-using-windows-subsystem-for-linux-wsl%20%22Direct%20link%20to%20Option%202:%20Using%20Windows%20Subsystem%20for%20Linux%20(WSL)")

Click to view

Alternatively, users can install WSL and run the StackGen CLI using the Linux installation steps. This approach allows for a native Linux environment within Windows.

1. Install WSL and a Linux distribution (e.g., Ubuntu) by following the [WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install).
2. Open WSL and follow the [Linux installation steps above](/docs/stackgen/cli-guide/get-started/install-and-uninstall#linux).

#### Updating StackGen CLI with WSL

If you're using WSL with Homebrew, follow the same upgrade command as Linux/macOS:

```bash
brew upgrade stackgen
```

You can verify the updated version with:

```bash
stackgen version
```

### Option 3: Using `.exe` File

Click to view

1. **Install Terraform**: Check if you’ve installed **Terraform** by running the following command:





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

2. **Download `stackgen.exe`**: To download the `.exe` file, click the link [https://releases.stackgen.com/binaries/v0.77.0/stackgen-cli\_0.77.0\_windows\_amd64.zip](https://releases.stackgen.com/binaries/v0.77.0/stackgen-cli_0.77.0_windows_amd64.zip).

3. **Set up StackGen CLI using `.exe`**: To use the StackGen CLI on Windows, add the folder containing the `.exe` file to your **System Environment Variables** under the **Path** variable. This lets you to run the Cloud-to-Code CLI directly from the terminal window. Follow these steps to set up the StackGen CLI:
1. Extract the contents of the `.zip` file and save the executable (`.exe`) files in a folder you want to add to your system `PATH`.

2. Open **Start** and search for **Edit the system environment variables**, and then open it.

3. In the **System Properties** window, click **Environment Variables**.

4. Under **User** variables, find and select the **Path** variable, then click **Edit**.

5. In the **Edit Environment Variable** window, click **New**.

6. Paste the full folder path where the `.exe` file is stored (e.g., `C:\Tools\stackgen`), then click **OK** to save.

7. Restart your terminal and run the Cloud-to-Code CLI to confirm it works:





      ```shell
      stackgen --version
      ```

**Update StackGen CLI**

To update your StackGen CLI with the latest version, run the following command:

- Chocolatey
- Scoop

If you have Chocolatey installed, run:

```bash
choco upgrade stackgen
```

If you don’t have Chocolatey, install it from [chocolatey.org](https://chocolatey.org/).

Run the following command:

```bash
scoop update stackgen
```

If you do not have Scoop installed, check out the [scoop.sh](https://github.com/ScoopInstaller/Scoop?tab=readme-ov-file#installation) documentation.

## Install StackGen CLI Dependencies

Click to view

You will need to install the following before you provision or deploy your appStacks:

- **terraform**: Refer to the [terraform](https://developer.hashicorp.com/terraform/install) documentation to install terraform.
- **OpenTofu**: Follow the steps to [install OpenTofu](https://opentofu.org/docs/intro/install/).

## Uninstall

Click to view

If you need to uninstall StackGen CLI from your system, follow the appropriate instructions for your operating system:

### macOS

To uninstall StackGen CLI from macOS:

```bash
brew uninstall stackgen
```

### Linux

To uninstall StackGen CLI from Linux:

```bash
brew uninstall stackgen
```

### Windows

#### From Docker

If you've been using StackGen CLI with Docker, there's no formal uninstallation needed as each container is temporary.

To remove the Docker image:

```bash
docker rmi ghcr.io/stackgenhq/stackgen:latest
```

You can also remove any related Docker volumes if desired:

```bash
docker volume prune
```

#### From WSL

To uninstall StackGen CLI from Windows Subsystem for Linux:

1. Open your WSL terminal
2. Run the same uninstall command as Linux:

```bash
brew uninstall stackgen
```

- [Install](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install)
- [Install a specific CLI version (macOS and Linux)](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install-a-specific-cli-version-macos-and-linux)
  - [Script usage](/docs/stackgen/cli-guide/get-started/install-and-uninstall#script-usage)
- [macOS](/docs/stackgen/cli-guide/get-started/install-and-uninstall#macos)
  - [Updating StackGen CLI on macOS](/docs/stackgen/cli-guide/get-started/install-and-uninstall#updating-stackgen-cli-on-macos)
- [Linux](/docs/stackgen/cli-guide/get-started/install-and-uninstall#linux)
  - [Update StackGen CLI on Linux](/docs/stackgen/cli-guide/get-started/install-and-uninstall#update-stackgen-cli-on-linux)
- [Windows](/docs/stackgen/cli-guide/get-started/install-and-uninstall#windows)
  - [Option 1: Using Docker](/docs/stackgen/cli-guide/get-started/install-and-uninstall#option-1-using-docker)
  - [Option 2: Using Windows Subsystem for Linux (WSL)](/docs/stackgen/cli-guide/get-started/install-and-uninstall#option-2-using-windows-subsystem-for-linux-wsl)
  - [Option 3: Using `.exe` File](/docs/stackgen/cli-guide/get-started/install-and-uninstall#option-3-using-exe-file)
- [Install StackGen CLI Dependencies](/docs/stackgen/cli-guide/get-started/install-and-uninstall#install-stackgen-cli-dependencies)
- [Uninstall](/docs/stackgen/cli-guide/get-started/install-and-uninstall#uninstall)
  - [macOS](/docs/stackgen/cli-guide/get-started/install-and-uninstall#macos-1)
  - [Linux](/docs/stackgen/cli-guide/get-started/install-and-uninstall#linux-1)
  - [Windows](/docs/stackgen/cli-guide/get-started/install-and-uninstall#windows-1)
