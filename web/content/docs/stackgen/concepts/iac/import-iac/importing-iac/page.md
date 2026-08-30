---
title: "Import IaC"
product: "stackgen"
sourcePath: "/docs/concepts/iac/import-iac/importing-iac"
sourceUrl: "https://docs.stackgen.com/docs/concepts/iac/import-iac/importing-iac"
status: "ok"
---

StackGen allows you to seamlessly **import existing infrastructure** into the **Topology Canvas**, enabling you to visualize and manage your cloud resources. Whether starting from scratch or integrating existing configurations, importing **Terraform state (`.tfstate`) or JSON files** provides a quick and efficient way to work with your infrastructure.

## Import IaC

You can import your existing infrastructure in the following ways:

- [Import Terraform State (`.tfstate`)](/docs/stackgen/concepts/iac/import-iac/importing-iac#import-terraform-state-tfstate)
- [Import JSON Files](/docs/stackgen/concepts/iac/import-iac/importing-iac#import-json-files)

## Import Terraform State (`.tfstate`)

note

Use this method to import resources that are already deployed and managed via Terraform.

This option allows you to **import Terraform-managed infrastructure** into StackGen for visualization and further configuration.

1. Navigate to the **Topology Canvas**.
2. Click **Import IaC** and select **Terraform State (`.tfstate`)**.
3. Upload your `.tfstate` file.
4. StackGen will automatically parse the file and render the imported resources in the **Topology Canvas**.
5. Modify and connect the resources as needed.

## Import JSON Files

note

Use this method if you have JSON-based infrastructure definitions from other IaC tools.

This option allows you to **import JSON-based infrastructure configurations** into StackGen.

1. Navigate to the **Topology Canvas**.
2. Click **Import IaC** and select **JSON File**.
3. Upload your JSON file.
4. StackGen will process the file and display the resources within the **Topology Canvas**.
5. You can adjust the configurations and establish dependencies between resources.

## Best Practices

- Ensure that the **Terraform State (`.tfstate`) or JSON file is correctly structured** and contains the relevant resource configurations.
- After importing, **review resource dependencies** and make necessary adjustments before exporting IaC.
- Use the **Import Logs** feature to check for best practices violations, misconfigurations, or security risks.

By integrating your existing infrastructure into StackGen, you can **simplify management, enhance visibility, and enforce governance policies** across your cloud resources.

### Carve Out appStacks from a TFState Import

After importing a large `.tfstate`, you can now **split it into multiple smaller appStacks**. For example, break down a monolithic state into networking, compute, and storage appStacks, so that different teams can own and manage their parts independently.

- **Selective Imports**: choose only the resources you need.
- **Multiple appStacks**: create several smaller appStacks from one large `.tfstate`. You can further [share your infrastructure across projects](/docs/stackgen/concepts/iac/shareinfra).
- **Validation Built-In**: run `terraform plan` or `tofu plan` against the exported appStacks to confirm zero drift. This helps platform teams enforce compliance and best practices, while enabling developers to quickly discover and reuse approved appStacks.

![TFState Import](https://docs.stackgen.com/img/appstacktfstateimport.png)‹›

−100%+⌂

Large .tfstate file

Whether you create an appStack from deployment files or Cloud Asset Discovery, you can carve out smaller appStacks for your teams.

1 / 8

Once you import a `.tfstate` file via [Discovery](/docs/stackgen/concepts/clouddiscovery), follow these steps:

1. You can select the resources you require from the list of resources and create your appStack.

2. Click [Download Iac](/docs/stackgen/concepts/iac/exporting-iac#download-iac-zip) and [Download TFState of Discovery](/docs/stackgen/concepts/iac/exporting-iac#download-iac-zip) to export your IaC in a Terraform folder.

3. Unzip your `terraform.zip` by running from the downloaded path:





```bash
unzip iac.zip<your downloaded zip file>
```

4. Run the following from the `./terraform` folder path:


- If you want to provision and deploy your IaC using OpenTofu, follow these commands:





```bash
tofu init
```













```bash
tofu plan
```













```bash
tofu apply
```

- If you want to provision and deploy your IaC using Terraform, follow these commands:





```bash
terraform init
```













```bash
terraform plan
```













```bash
terraform apply
```


- [Import IaC](/docs/stackgen/concepts/iac/import-iac/importing-iac#import-iac)
- [Import Terraform State (`.tfstate`)](/docs/stackgen/concepts/iac/import-iac/importing-iac#import-terraform-state-tfstate)
- [Import JSON Files](/docs/stackgen/concepts/iac/import-iac/importing-iac#import-json-files)
- [Best Practices](/docs/stackgen/concepts/iac/import-iac/importing-iac#best-practices)
  - [Carve Out appStacks from a TFState Import](/docs/stackgen/concepts/iac/import-iac/importing-iac#carve-out-appstacks-from-a-tfstate-import)
