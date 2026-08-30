---
title: "What Is Shared Infrastructure?"
product: "stackgen"
sourcePath: "/docs/concepts/iac/shareinfra"
sourceUrl: "https://docs.stackgen.com/docs/concepts/iac/shareinfra"
status: "ok"
---

## What Is Shared Infrastructure?

StackGen allows you to share outputs from one appStack so they can be reused by other appStacks or projects.
This is useful when you have separate stacks for networking, applications, or other infrastructure components, and need one appStack to reference resources from another.

Cloud StackMasterCentral IaCTerraform StateappStack WithShared DependenciesDependentStores tfstateReferences outputsvia remote\_state

**Use this feature when**:

- You’ve deployed an appStack (e.g., networking) and want other appStacks (e.g., application) to reuse its outputs such as `VPC IDs`, `subnet IDs`, or `security group IDs`.
- You want to make infrastructure outputs available to a specific Project in StackGen.

## How It Works

When you click Share infra via appStack page:

1. StackGen locates the Terraform state (`tfstate`) for the selected appStack.
2. The output values defined in that state file are extracted. For example, `VPC IDs`, `Subnet IDs`, `Load Balancer DNS names`, `Security Group IDs`.
3. These outputs are published to the target project in StackGen.
4. Any appStack in that project can reference these shared values in its own Terraform configuration without redeploying the original appStack.
5. If the original appStack is updated and re-shared, dependent appStacks will receive the updated values on their next provision.

This allows different teams or environments to work independently while still reusing common infrastructure resources.

**Example Scenarios**

- **Multiple Environment Profiles**: If your appStack was provisioned with profiles like `dev` and `prod`, sharing it will make all profile outputs available.
- **Remote Backend**: If your remote backend is enabled, sharing will still provide Terraform state outputs to the target project automatically.

Let's see how you can share your infrastructure in multiple ways.

## Steps to Share Your Infrastructure

### Prerequisites

- The appStack you want to share must already be provisioned. You can use `terraform init` or StackGen CLI to provision your IaC.

  - To provision your IaC using StackGen CLI, run the following command:





    ```bash
    stackgen provision --apply --appstack-id=<appstackId> --project-id=<projectId> --var="region=<region>"
    ```









    You will also see the appStack specific CLI when you click **Share Infra** via the appStack page.



    ![share infra](https://docs.stackgen.com/assets/images/shareinfra-40ee2038a134bc4e8c7c10e875b28d78.png)
- Ensure that you have the correct access permissions (DevOps or Admin) for sharing the appStack in the target project.

### Share Your Infrastructure

You can share infrastructure that is provisioned or deployed in the following ways:

- **Provisioned or Deployed appStack**: Provision or deploy an appStack using StackGen CLI or Terraform to share your infrastructure across projects.

- **StackGen CLI**: You can create an [appStack](/docs/stackgen/cli-guide/usage/appstack/create) from scratch or [import a `tfstate`](/docs/stackgen/cli-guide/usage/import) file to StackGen.
You can simply click **Share Infra** via the appStack page once provisioned.



![share infra cli](https://docs.stackgen.com/assets/images/clishareinfra-3a6c59621a74a4a9e870c4726e87d1d7.png)

- **appStacks created using Cloud Asset Discovery**: You can share infrastructure from [appStack created using Cloud Asset Discovery](/docs/stackgen/concepts/clouddiscovery).

- **appStacks provisioned with a remote backend**: Share your infrastructure after provisioning or deploying an appStack with remote [Backend](/docs/stackgen/concepts/topology/backend-configuration) enabled.

- **Coming soon**: Share infrastructure after provisioning or deploying an appStack with environment profiles.


To share your Infrastructure across Projects, follow these steps:

1. From the StackGen Home page, navigate to **appStacks > select your appStack > click the ellipsis ⋮ icon.**

2. Select **Share Infra**.
   - If you haven't provisioned your infrastructure, you will get a prompt to do the same, as shown below:



     ![share infra cli](https://docs.stackgen.com/assets/images/shareinfra-40ee2038a134bc4e8c7c10e875b28d78.png)
3. Assign the relevant **Project** from the drop-down and click **Share Infra** once done.



![share infra cli](https://docs.stackgen.com/assets/images/sharedinfra2-a93405a7adbb27400c7339cd3bb5e765.png)










   - To stop sharing your infra with a particular Project, click the delete icon next to the listed projects.



     ![assign shared infra with projects](https://docs.stackgen.com/assets/images/sharedinfra3-871b368e7108065808f19de2a7bbe3e7.png)

### Use Shared Infrastructure in Your appStack

Once you've shared your infrastructure with a Project, your Developers can use these values in their appStacks created within this Project.

Let's see how to do that.

1. Navigate to your Project and create an appStack.

2. While configuring resources, you'll notice a settings ⚙️ icon that appears next to the field with shared infrastructure values.



![Use shared infra in appStacks](https://docs.stackgen.com/assets/images/sharedinfra4-57f336c3f7188e775b02c9721495c7d5.png)

3. Select the value from the **Available Shared Values** drop-down and click **Save**.

4. You can now **Download the `IaC.zip`**.



![Download iac](https://docs.stackgen.com/assets/images/sharedinfra5-db6608c9b41197e3694a25c3b30de2e5.png)

5. In your CLI, enter the `$path` where the `.zip` file is stored and run the following commands:





```bash
unzip <your zip file name>
```













```bash
terraform init
```













```bash
terraform plan
```











![terraform plan](https://docs.stackgen.com/assets/images/sharedinfra6-4cd11366cd1a5544c0db3e685faca22e.png)















```bash
terraform apply
```


You have now deployed an appStack where the output is referenced to your shared infrastructure. This approach avoids duplication and maintains alignment with the pre-provisioned infrastructure.

- [What Is Shared Infrastructure?](/docs/stackgen/concepts/iac/shareinfra#what-is-shared-infrastructure)
- [How It Works](/docs/stackgen/concepts/iac/shareinfra#how-it-works)
- [Steps to Share Your Infrastructure](/docs/stackgen/concepts/iac/shareinfra#steps-to-share-your-infrastructure)
  - [Prerequisites](/docs/stackgen/concepts/iac/shareinfra#prerequisites)
  - [Share Your Infrastructure](/docs/stackgen/concepts/iac/shareinfra#share-your-infrastructure)
  - [Use Shared Infrastructure in Your appStack](/docs/stackgen/concepts/iac/shareinfra#use-shared-infrastructure-in-your-appstack)
