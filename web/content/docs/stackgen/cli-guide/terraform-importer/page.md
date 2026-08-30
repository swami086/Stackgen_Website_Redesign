---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/cli-guide/terraform-importer"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/terraform-importer"
status: "ok"
---

Terraform-importer lets you bring existing Terraform into StackGen as an **appStack**. You can import modules, resources, environments, and optional backend settings from a Terraform project you already maintain.

note

This guide covers **`terraform-importer`** (Terraform **configuration** import). To import a **`.tfstate`** file with **`stackgen import state`**, see [Sync State File to appStack](/docs/stackgen/cli-guide/usage/import).

**What you will learn:**

- Who should use this guide and what you can do with the CLI
- How to install the CLI and run your first import
- How StackGen reads your Terraform folder and `env/` files
- What the import strategy file is and how to manage it
- How to fix common import errors

## Overview

Terraform-importer reads Terraform from a folder on your machine and creates or updates a StackGen **appStack** from that code. It can:

- Import **modules** and **resources** from your root Terraform files
- Create **environments** from files in an `env/` folder (when you use one)
- Apply an **import strategy** so module placement stays consistent across runs
- Import **only environments** later if the appStack already exists

By default, `import appstack` uses your **current working directory** as the Terraform source. You can also point to another folder with `--input-tf-source-dir`.

## Key Benefits

- **Import existing Terraform**

Bring modules, resources, and environments from your repo into StackGen as an **appStack** without rebuilding the layout by hand.

- **Preview before you import**

Run **`import inspect`** to confirm what the CLI reads from your folder before anything changes in your tenant.

- **Repeatable import strategy**

Use **`.stackgen/import-strategy.json`** to keep module placement and root backend handling consistent across import runs.

- **Refresh environments only**

Run **`import environments`** on an existing appStack when you only need to update files under **`env/`**.


## Who This Guide is For

| Who | What you can do |
| --- | --- |
| **Platform and DevOps teams** | Run imports for many teams, review import strategy files, align remote modules with the **module catalog**, and help others troubleshoot failed imports |
| **Application teams** | Import a Terraform project your team already owns into StackGen so you can manage it as an **appStack** with environments and modules in one place |

note

This guide assumes you are comfortable running commands in a terminal and working with basic Terraform concepts (modules, variables, backends).

## Before You Start

| Requirement | Why you need it |
| --- | --- |
| Terraform source to import | A valid Terraform project (`.tf` files and optional `env/` folder) |
| **Admin** role in StackGen | Required to run imports against your tenant |
| **`stackgen` CLI** installed | For example: `brew install stackgenhq/stackgen/stackgen` |
| Active StackGen login | Run `stackgen login` before you import |

note

As of **2026-08-05**, **terraform-importer** stable is **v0.11.13** (Homebrew). Run `terraform-importer version` to confirm your installed version. Upgrade with `brew upgrade terraform-importer` if you are behind.

## Install the CLI

Click to view

### Install

```bash
brew tap stackgenhq/stackgen

brew install terraform-importer
```

### Upgrade

```bash
brew upgrade terraform-importer
```

### Check Your Version

```bash
terraform-importer version
```

## First Import

Follow these steps for your first import:

1. Open a terminal in the Terraform folder you want to import (recommended).





```bash
cd ~/terraform-project
```

2. Run **`terraform-importer import inspect`** to confirm StackGen can read your files.





```bash
terraform-importer import inspect
```

3. Run **`terraform-importer import appstack`** to create the appStack in StackGen.





```bash
terraform-importer import appstack
```


You do not have to pass a source path when you run **`import appstack`** from the Terraform root folder.

### Commands You Will Use

| Command | What it does |
| --- | --- |
| `import inspect` | Read-only check. Shows what the CLI found without changing StackGen |
| `import appstack` | Full import into a StackGen appStack |
| `import environments` | Imports only environment files into an **existing** appStack |
| `import strategy generate` | Optional. Rebuilds `.stackgen/import-strategy.json` by hand |
| `import strategy validate` | Optional. Checks that your strategy file matches current Terraform |

## Terraform Layout

Click to view

StackGen expects a **root** Terraform folder. A typical layout looks like this:

```text
terraform-project/

  main.tf

  variables.tf

  outputs.tf

  env/

    dev.tfvars

    dev_backend.tf

    prod.tfvars

    prod_backend.tf
```

**Guidelines:**

- Set `--input-tf-source-dir` to the **root** of your Terraform project when you are not running commands from that folder.
- The `env/` folder is **optional**, but we recommend it when you have more than one environment.
- Keep environment files under `env/` so the CLI can find them automatically.
- Use `--include-files` and `--include-subdirs` only when you need extra files or folders beyond the default scan.

## Environment Discovery

Click to view

When you use an `env/` folder, the CLI scans it inside `--input-tf-source-dir`.

| File in `env/` | What StackGen does |
| --- | --- |
| `<name>.tfvars` | Creates environment `<name>` and loads its variables |
| `<name>_backend.tf` | Attaches backend configuration to environment `<name>` |
| Only `.tfvars` (no `_backend.tf`) | Still creates the environment, without a backend |
| Only `_backend.tf` (no `.tfvars`) | Still creates the environment, without variables |
| Invalid backend file | Skips the file and logs a warning |

note

Assigning a **root** backend to an environment (strategy key **`root_backend.env`** in `.stackgen/import-strategy.json`) is **separate** from this auto-discovery. See [Root Backend](/docs/stackgen/cli-guide/terraform-importer#root-backend) below.

## Run Inspect

Run **`import inspect`** before **`import appstack`** so you can fix folder or file issues early.

```bash
terraform-importer import inspect --input-tf-source-dir ./terraform-project
```

For more detail in the terminal:

```bash
terraform-importer import inspect --input-tf-source-dir ./terraform-project --verbose
```

**Stop and fix issues before you import if you see:**

- **`no Terraform files found`**
- **Zero** environments when you expected several
- Module or resource counts that look much too low

## Inspect Output

Click to view

| Section in inspect output | What it tells you |
| --- | --- |
| **Total blocks** | How many Terraform blocks the CLI parsed in total |
| **Block counts** | Counts by type (`resource`, `data`, `module`, and so on) |
| **Modules** | How many module calls were found, and how many are local vs remote |
| **Environments** | Environment names, variable counts, and whether a backend was found |

**Before you import, confirm:**

- The module count matches what you expect in Terraform
- Every environment name you need appears in the list
- Backends appear for environments that need remote state

## Import Strategy

Click to view

An **import strategy** is a small plan that tells the importer **where each Terraform module should land** in the StackGen appStack.

- The CLI saves this plan as JSON at **`.stackgen/import-strategy.json`** (under a `.stackgen` folder in your project).
- Think of it as a **decision file**: it keeps imports repeatable when you or someone else runs import again on the same code.

**Why StackGen uses a strategy file:**

- You get the same module placement every time you import
- Your team can review or edit the plan before or after import
- You avoid surprises when the Terraform layout changes

**What the default strategy tries to do:**

- Place many module calls at the **appStack root** (`root: true`) for a simple first migration
- StackGen applies **governance rules** at the root, so the strategy also controls which modules can stay at root vs sit nested under another module
- You can regenerate the file when your Terraform layout changes

## Strategy File

Click to view

**Example strategy file:**

```json
{

    "version": "v1",

    "name": "modules_at_root",

    "assignments": {

        "module.network": {

            "root": true

        },

        "module.compute": {

            "root": true

        }

    },

    "root_backend": {

        "env": "default"

    }

}
```

| Field | What it means |
| --- | --- |
| `version` | Strategy format version. Must be **`v1`** |
| `name` | A short name for this strategy (non-empty, valid identifier) |
| `assignments` | Maps each module address to placement rules |
| `assignments.<key>` | Module address, for example `module.my_module` |
| `assignments.<key>.root` | When **`true`**, the module is placed at appStack root |
| `root_backend` | Optional. Controls where a **root** backend block goes |
| `root_backend.env` | Environment name that receives the root backend during import |

## Modules at Root

Click to view

This section matters most when imports fail or modules land in unexpected places.

**What the auto-generated strategy usually does:**

- **Local** modules (for example `source = "./modules/network"`): **`root: true`**
- **Remote** modules (Git, registry, HTTPS): **`root: false`** by default
- You can set **`root: true`** in the strategy file when you want a module at root

**StackGen rule at appStack root:**

- Only modules that appear in your organization **module catalog** can stay at root when they come from a **remote** source
- The **module catalog** is the approved module list your platform or DevOps team maintains

| Module source | What happens when `root: true` |
| --- | --- |
| **Local** (`./modules/...`) | StackGen creates an appStack-scoped module, then uses it at root |
| **Remote** (Git, registry, HTTPS) | The same remote source must **already exist** in the module catalog |

**When import fails:**

- Strategy says **`root: true`** for a **remote** module, but that source is **not** in the module catalog

**How to fix it:**

1. Ask your platform or DevOps team to add the remote module to the **module catalog**, then run import again.
2. **Workaround (not recommended):** set **`root: false`** for that module in the strategy file. The importer nests the module under another local module so import can finish.

**Quick guide:**

- Need a remote module at root? Get it into the **module catalog** first.
- Not in the catalog yet? Use **`root: false`** for that module, or wait until it is cataloged.

## Root Backend

Click to view

If your Terraform has a **root** backend block (for example in `backend.tf`), StackGen handles it through the strategy file:

- The root backend **cannot** stay in the root Terraform configuration after import.
- You choose which **environment** receives that backend using **`root_backend.env`** in `.stackgen/import-strategy.json`.
- The importer writes backend content to **`env/<env>_backend.tf`** in the imported output.

| Situation | What the importer does |
| --- | --- |
| Target environment does not exist yet | Creates the environment and adds the backend |
| Target environment exists but has no backend | Assigns the root backend to that environment |
| Target environment already has its own backend | **Validation fails** so you do not get two backends on one environment |
| **`root_backend.env`** is an empty string (`""`) | Skips importing the root backend |

**When the CLI auto-generates a strategy:**

- If it finds a root backend block, it often sets **`root_backend.env`** to **`default`**.
- If there is no root backend block, **`root_backend`** stays empty.

## Invalid Strategy

Click to view

Import stops with a strategy error when:

- The JSON file is malformed
- **`version`** is not **`v1`**
- **`name`** is empty or not a valid identifier
- An assignment key is not a module address (must look like **`module.<name>`**)
- The strategy references a module that is not in your current Terraform
- A module in your Terraform is **missing** from **`assignments`**
- **`root_backend.env`** is set but your Terraform has **no** root backend block
- **`root_backend.env`** points to an environment that **already** has its own backend block

**How to fix it:**

1. Delete the **`.stackgen/`** folder and run **`terraform-importer import appstack`** again, or
2. Run **`terraform-importer import strategy generate`**, fix the file if needed, then import again

## Strategy Lifecycle

Click to view

When you run **`terraform-importer import appstack`**:

1. If **`.stackgen/import-strategy.json`** does not exist, the CLI **creates** it for you.
2. The new file includes module assignments and may set **`root_backend.env`** to **`default`** when it finds a root backend.
3. If the file **already exists**, the CLI **reuses** it.
4. The CLI **validates** the strategy against your current Terraform.
5. If validation fails, import stops until you fix or regenerate the file.

note

- You do **not** need to run **`import strategy generate`** before every import.
- To start fresh, delete **`.stackgen/`** or run **`import strategy generate`** to overwrite the file.
- To avoid committing strategy files, add **`.stackgen/`** to **`.gitignore`**.
- To point a root backend at a different environment, edit **`root_backend.env`**, run **`import strategy validate`**, then import.

## Update Strategy

Click to view

Use these commands when you want to **refresh** the strategy file yourself (for example after you add or remove a root backend).

**Generate at the default path:**

```bash
terraform-importer import strategy generate \
  --input-tf-source-dir ./terraform-project
```

**Generate at a custom path:**

```bash
terraform-importer import strategy generate \
  --input-tf-source-dir ./terraform-project \
  --output-strategy-file ./terraform-project/.stackgen/import-strategy.json
```

**Validate before import:**

```bash
terraform-importer import strategy validate \
  --input-tf-source-dir ./terraform-project \
  --import-strategy-file ./terraform-project/.stackgen/import-strategy.json
```

note

- Regenerate the strategy when you add or remove a root backend in Terraform.
- Use **`root_backend.env`** to pick which environment receives the root backend.
- After you edit the JSON by hand, always run **`import strategy validate`**.

## Import Examples

Click to view

**Set the appStack name and cloud provider:**

```bash
terraform-importer import appstack \
  --input-tf-source-dir ./terraform-project \
  --appstack-name my-appstack \
  --appstack-cloud-provider aws
```

**Pass environment files explicitly:**

```bash
terraform-importer import appstack \
  --input-tf-source-dir ./terraform-project \
  --environment-files "env/dev.tfvars,env/prod.tfvars"
```

**Include extra files and folders:**

```bash
terraform-importer import appstack \
  --input-tf-source-dir ./terraform-project \
  --include-files ".terraform.version,terraform.tfvars" \
  --include-subdirs "modules,shared"
```

**Point to a specific strategy file:**

```bash
terraform-importer import appstack \
  --input-tf-source-dir ./terraform-project \
  --import-strategy-file ./terraform-project/.stackgen/import-strategy.json
```

**Put the root backend on the `dev` environment:**

```json
{

    "version": "v1",

    "name": "all-modules-at-root",

    "assignments": {},

    "root_backend": {

        "env": "dev"

    }

}
```

**Validate, then import:**

```bash
terraform-importer import strategy validate \
  --input-tf-source-dir ./terraform-project \
  --import-strategy-file ./terraform-project/.stackgen/import-strategy.json

terraform-importer import appstack \
  --input-tf-source-dir ./terraform-project \
  --import-strategy-file ./terraform-project/.stackgen/import-strategy.json
```

## Environments Only

Use this when the **appStack already exists** in StackGen and you only need to refresh **environment** files:

```bash
terraform-importer import environments \
  --appstack-name my-appstack \
  --environment-files "env/dev.tfvars,env/prod.tfvars"
```

note

- **`--appstack-name`** is required for **`import environments`**
- **`--environment-files`** is required for **`import environments`**
- Run the command from your Terraform project folder, or use paths that are correct from where you run it

## Flags

### Global Flags

| Purpose | Flag | Notes |
| --- | --- | --- |
| Debug logs | `-d`, `--debug` | Prints detailed logs |
| Mute logs | `--mute` | Turns off logger output |

### Flags by Command

| Command | Flags |
| --- | --- |
| `import inspect` | `--input-tf-source-dir`, `--environment-files`, `--verbose` |
| `import strategy generate` | `--input-tf-source-dir`, `--output-strategy-file` |
| `import strategy validate` | `--input-tf-source-dir`, `--import-strategy-file` |
| `import appstack` | `--input-tf-source-dir` (default `.`), `--appstack-name` (optional; defaults to the source directory base name), `--appstack-cloud-provider` (default `aws`), `--environment-files`, `--include-files`, `--include-subdirs`, `--import-strategy-file` |
| `import environments` | `--appstack-name` (required), `--environment-files` (required) |

## Common Errors

Click to view

### `no Terraform files found in the specified directory`

|  |  |
| --- | --- |
| **What went wrong** | The CLI is looking at the wrong folder |
| **What to do** | Set **`--input-tf-source-dir`** to your Terraform root, or `cd` into that folder |

### `import strategy is invalid`

|  |  |
| --- | --- |
| **What went wrong** | **`.stackgen/import-strategy.json`** is out of date or edited incorrectly |
| **What to do** | Delete **`.stackgen/`** and import again, or run **`import strategy generate`** |

### `no root backend block found in the provided tf configuration, cannot assign to env <name>`

|  |  |
| --- | --- |
| **What went wrong** | **`root_backend.env`** is set in strategy, but Terraform has no root backend block |
| **What to do** | Clear **`root_backend.env`**, or add a root backend in Terraform, then validate again |

### `discovered env <name> already has a backend block, cannot assign root backend block to it`

|  |  |
| --- | --- |
| **What went wrong** | **`root_backend.env`** points at an environment that already has a backend file |
| **What to do** | Pick another environment in **`root_backend.env`**, or remove that environment's backend file before import |

### Auth or API Errors (401 / 403) [](/docs/stackgen/cli-guide/terraform-importer#auth-or-api-errors-401--403%20%22Direct%20link%20to%20Auth%20or%20API%20Errors%20(401%20/%20403)")

|  |  |
| --- | --- |
| **What went wrong** | You are not logged in, or your session expired |
| **What to do** | Run **`stackgen login`**, then run import again |

### No Environments Imported

|  |  |
| --- | --- |
| **What went wrong** | The CLI did not find `env/` files and you did not pass **`--environment-files`** |
| **What to do** | Keep files under **`env/`**, or pass **`--environment-files`** explicitly |

### Suggested Troubleshooting Order

1. Run **`terraform-importer import inspect`**.
2. If strategy fails, regenerate ( **`rm -rf .stackgen`** or **`import strategy generate`**).
3. Run again with **`-d`** and share the logs if you still need help.

## FAQ

Click to view

**Do I need to run commands from the Terraform directory?**

You do not have to, but it is the easiest approach. If you run from elsewhere, set **`--input-tf-source-dir`** correctly.

**Is the `env/` folder required?**

No. It is optional. We recommend it when you want StackGen to detect environments automatically.

**Do I need to create the strategy file myself every time?**

No. **`import appstack`** creates it when the file is missing.

**What if the strategy file already exists?**

The CLI reuses it. If it no longer matches your Terraform, import fails until you fix or regenerate the file.

**Should I commit `.stackgen/` to Git?**

That is up to your team. Add **`.stackgen/`** to **`.gitignore`** if you do not want it in version control.

**My backend is in root `backend.tf`. What happens?**

Set **`root_backend.env`** in **`.stackgen/import-strategy.json`** (or use the auto-generated **`default`**) so the importer writes the backend to **`env/<env>_backend.tf`**.

**How do I choose which environment gets the root backend?**

Edit **`root_backend.env`** in **`.stackgen/import-strategy.json`**, run **`import strategy validate`**, then **`import appstack`**.

**Can I import only environments later?**

Yes. Use **`terraform-importer import environments`**.

**How do I get logs for support?**

Run the command again with **`-d`** and share the terminal output.

## Best Practices

Click to view

- Run **`import inspect`** before every first import on a new folder.
- Keep environment files under **`env/`** when you have multiple environments.
- Review **`.stackgen/import-strategy.json`** with your platform team before you rely on it in production.
- Add **`.stackgen/`** to **`.gitignore`** if strategy files are machine-local or experimental.
- After you edit the strategy file by hand, run **`import strategy validate`** before **`import appstack`**.

- [Overview](/docs/stackgen/cli-guide/terraform-importer#overview)
- [Key Benefits](/docs/stackgen/cli-guide/terraform-importer#key-benefits)
- [Who This Guide is For](/docs/stackgen/cli-guide/terraform-importer#who-this-guide-is-for)
- [Before You Start](/docs/stackgen/cli-guide/terraform-importer#before-you-start)
- [Install the CLI](/docs/stackgen/cli-guide/terraform-importer#install-the-cli)
  - [Install](/docs/stackgen/cli-guide/terraform-importer#install)
  - [Upgrade](/docs/stackgen/cli-guide/terraform-importer#upgrade)
  - [Check Your Version](/docs/stackgen/cli-guide/terraform-importer#check-your-version)
- [First Import](/docs/stackgen/cli-guide/terraform-importer#first-import)
  - [Commands You Will Use](/docs/stackgen/cli-guide/terraform-importer#commands-you-will-use)
- [Terraform Layout](/docs/stackgen/cli-guide/terraform-importer#terraform-layout)
- [Environment Discovery](/docs/stackgen/cli-guide/terraform-importer#environment-discovery)
- [Run Inspect](/docs/stackgen/cli-guide/terraform-importer#run-inspect)
- [Inspect Output](/docs/stackgen/cli-guide/terraform-importer#inspect-output)
- [Import Strategy](/docs/stackgen/cli-guide/terraform-importer#import-strategy)
- [Strategy File](/docs/stackgen/cli-guide/terraform-importer#strategy-file)
- [Modules at Root](/docs/stackgen/cli-guide/terraform-importer#modules-at-root)
- [Root Backend](/docs/stackgen/cli-guide/terraform-importer#root-backend)
- [Invalid Strategy](/docs/stackgen/cli-guide/terraform-importer#invalid-strategy)
- [Strategy Lifecycle](/docs/stackgen/cli-guide/terraform-importer#strategy-lifecycle)
- [Update Strategy](/docs/stackgen/cli-guide/terraform-importer#update-strategy)
- [Import Examples](/docs/stackgen/cli-guide/terraform-importer#import-examples)
- [Environments Only](/docs/stackgen/cli-guide/terraform-importer#environments-only)
- [Flags](/docs/stackgen/cli-guide/terraform-importer#flags)
  - [Global Flags](/docs/stackgen/cli-guide/terraform-importer#global-flags)
  - [Flags by Command](/docs/stackgen/cli-guide/terraform-importer#flags-by-command)
- [Common Errors](/docs/stackgen/cli-guide/terraform-importer#common-errors)
  - [`no Terraform files found in the specified directory`](/docs/stackgen/cli-guide/terraform-importer#no-terraform-files-found-in-the-specified-directory)
  - [`import strategy is invalid`](/docs/stackgen/cli-guide/terraform-importer#import-strategy-is-invalid)
  - [`no root backend block found in the provided tf configuration, cannot assign to env <name>`](/docs/stackgen/cli-guide/terraform-importer#no-root-backend-block-found-in-the-provided-tf-configuration-cannot-assign-to-env-name)
  - [`discovered env <name> already has a backend block, cannot assign root backend block to it`](/docs/stackgen/cli-guide/terraform-importer#discovered-env-name-already-has-a-backend-block-cannot-assign-root-backend-block-to-it)
  - [Auth or API Errors (401 / 403)](/docs/stackgen/cli-guide/terraform-importer#auth-or-api-errors-401--403)
  - [No Environments Imported](/docs/stackgen/cli-guide/terraform-importer#no-environments-imported)
  - [Suggested Troubleshooting Order](/docs/stackgen/cli-guide/terraform-importer#suggested-troubleshooting-order)
