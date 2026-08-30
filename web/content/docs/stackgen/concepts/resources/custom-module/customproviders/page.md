---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/concepts/resources/custom-module/customproviders"
sourceUrl: "https://docs.stackgen.com/docs/concepts/resources/custom-module/customproviders"
status: "ok"
---

## Overview

The Custom Provider feature enables you to integrate your Terraform providers into the StackGen platform, even if those providers are not natively supported. This gives your teams the flexibility to use any infrastructure resource while keeping the core StackGen system lightweight and maintainable.

## Why Use Custom Providers?

If you are an enterprise user, the Custom Provider feature will give you the flexibility to use custom Terraform providers to manage your internal or private resources. These providers are often not publicly available, making it difficult for StackGen to support them directly. Custom Providers address this gap by allowing you to bring your own provider logic.

Using the custom provider feature involves two steps:

1. [Create a Custom Terraform Provider Locally](/docs/stackgen/concepts/resources/custom-module/customproviders#step-1-create-a-custom-terraform-provider-locally)
2. [Add Custom Provider to your Topology](/docs/stackgen/concepts/resources/custom-module/customproviders#step-2-add-custom-provider-to-your-topology)

## Step 1. Create a Custom Terraform Provider Locally

Click to view

To create and use a custom Terraform provider locally, follow these steps:

### 1\. Clone or Build Your Provider

To clone or build your custom provider, you can:

- Clone this [example repo](https://github.com/GabrielAraujo102023/hashicups-example) for a working provider setup.
- Create your own by following Terraform’s official [provider development guide](https://developer.hashicorp.com/terraform/plugin/framework) or this [tutorial video](https://www.youtube.com/watch?v=16qs7LJSyps).

### 2\. Start your Local Provider Service

To start your local provider service, run the following command:

```text
cd docker-compose

docker compose up
```

Then register a user:

```text
curl -X POST localhost:19090/signup \

-d '{"username":"education", "password":"test123"}'
```

### 3\. Update Your Terraform Configuration

Edit your `~/.terraformrc` file to support local provider installation by running the following command:

```text
provider_installation {

  filesystem_mirror {

    path = "/Users/{YOUR_USERNAME}/.terraform.d/plugins"

  }

  direct {

    exclude = ["localhost/*/*"]

  }

}
```

> Replace `{YOUR_USERNAME}` with your actual system username.

### 4\. Build and install the Provider

Run the command below:

```text
go build -o terraform-provider-hashicups

mkdir -p ~/.terraform.d/plugins/localhost/hashicups/1.0.0/darwin_arm64

mv terraform-provider-hashicups ~/.terraform.d/plugins/localhost/hashicups/1.0.0/darwin_arm64/

go install .
```

## Step 2. Add Custom Provider to your Topology

Click to view

Once your provider is ready and installed, you’ll need to add it to your Topology. Follow these steps to add a custom provider to your Custom Module:

### 1\. Add a custom provider to your Topology

1. From the **StackGen Home** page, navigate to **appStacks > select your appStack > Topology > + Add New Resource**.

2. Click the **+** icon next to the **Custom Modules** drop-down.

3. Click **\+ Add Custom Provider**.


![addcustomproviders](https://docs.stackgen.com/assets/images/addcustomprovider-4341819dacca4893ef76fd0db795be45.png)

4. Paste the following code in the input text box under provider configuration:





```text
terraform {

required_providers {

       hashicups = {

       source = "localhost/education/hashicups"

       }

}

}



provider "hashicups" {

host     = "http://localhost:19090"

username = "education"

password = "test123"

}
```


#### The input fields for the code blocks are as follows:

- `terraform block`: This block defines the required provider for your Terraform configuration.


  - `required_providers` tells Terraform which provider plugins your configuration depends on.
  - Here, the provider is `hashicups`, a custom provider (not an official one).
  - `source = "localhost/education/hashicups"` tells Terraform to look for the provider locally under the namespace `education` and the provider name `hashicups`.

> Think of a provider as a plugin that lets Terraform talk to an external system. In this case, it's the HashiCups app, which is a demo app by HashiCorp that is often used for teaching provider development.

- `provider block`: This configures the connection details for the `hashicups` provider.
  - `host` is the URL of the HashiCups backend API, running locally on port 19090.
  - `username` and `password` are used to authenticate with the HashiCups service.

### 2\. Verify Your Integration

When you export the topology, the provider configuration will be saved in the `custom_provider.tf` file inside the module folder.

![Custom Provider.tf](https://docs.stackgen.com/assets/images/createcustomprovider-a146df926dfdb2922456b55f68286464.png)

You can now run the following to apply your changes and verify if your setup works:

```text
terraform init    # Sets things up

terraform plan    # Shows what will happen

terraform apply   # Executes the plan
```

## Role Based Access Control

Click to view

Custom Cloud Provider access is dependent on the scopes used for your Custom Modules.

- If you have a custom module that is shared at an **Enterprise** level, the custom provider would be available enterprise wide.
- If you're creating the custom module at the **Project** level, custom provider will be shared with your project.
- If you've created a custom module in your **Personal Workspace**, it will only be visible to you and the same visibility is set for your custom provider.

Learn more about [RBAC for custom modules](/docs/stackgen/concepts/resources/custom-module/rbac-for-custom-modules).

Custom Providers let you extend our platform to support niche, private, or internal infrastructure tools via Terraform. This allows for rapid innovation and local control without bloating StackGen’s native provider list.

For help or troubleshooting, refer to the Terraform [provider development docs](https://developer.hashicorp.com/terraform/plugin/framework) or reach out via our [support channels](mailto:support@stackgen.com).

- [Overview](/docs/stackgen/concepts/resources/custom-module/customproviders#overview)
- [Why Use Custom Providers?](/docs/stackgen/concepts/resources/custom-module/customproviders#why-use-custom-providers)
- [Step 1. Create a Custom Terraform Provider Locally](/docs/stackgen/concepts/resources/custom-module/customproviders#step-1-create-a-custom-terraform-provider-locally)
  - [1\. Clone or Build Your Provider](/docs/stackgen/concepts/resources/custom-module/customproviders#1-clone-or-build-your-provider)
  - [2\. Start your Local Provider Service](/docs/stackgen/concepts/resources/custom-module/customproviders#2-start-your-local-provider-service)
  - [3\. Update Your Terraform Configuration](/docs/stackgen/concepts/resources/custom-module/customproviders#3-update-your-terraform-configuration)
  - [4\. Build and install the Provider](/docs/stackgen/concepts/resources/custom-module/customproviders#4-build-and-install-the-provider)
- [Step 2. Add Custom Provider to your Topology](/docs/stackgen/concepts/resources/custom-module/customproviders#step-2-add-custom-provider-to-your-topology)
  - [1\. Add a custom provider to your Topology](/docs/stackgen/concepts/resources/custom-module/customproviders#1-add-a-custom-provider-to-your-topology)
  - [2\. Verify Your Integration](/docs/stackgen/concepts/resources/custom-module/customproviders#2-verify-your-integration)
