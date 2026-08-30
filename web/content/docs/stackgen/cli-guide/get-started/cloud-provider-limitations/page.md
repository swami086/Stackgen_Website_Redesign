---
title: "AWS"
product: "stackgen"
sourcePath: "/docs/cli-guide/get-started/cloud-provider-limitations"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/get-started/cloud-provider-limitations"
status: "ok"
---

We've listed the known limitations related to specific cloud providers when working with StackGen. These limitations stem from the underlying cloud providers and are not resolvable within StackGen itself.

[**AWS**](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#aws)

- [data.archive\_file: File Deleted When Path Not Found](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#dataarchive_file-file-deleted-when-path-not-found)
- [aws\_mq\_broker: Password Field Cannot Be Retrieved](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#aws_mq_broker-password-field-cannot-be-retrieved)

[**OCI**](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci)

- [Early Access: Custom Modules and CLI Plan and Apply](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci-early-access-custom-modules-and-cli-plan-and-apply)

## AWS

### `data.archive_file`: File Deleted When Path Not Found

Click to view

**Summary**: Terraform may attempt to delete the `data.archive_file` resource if the file path is not valid after code generation.

**Cause**: When the IaC is downloaded, the file path specified in the `data.archive_file` block may no longer point to a valid file in the local environment. Terraform detects this as a missing file and flags it for deletion during `plan`.

**Workaround**: After downloading the generated IaC, update the filename path in the `data.archive_file` block to point to a valid local file. This ensures Terraform recognizes the resource correctly and avoids deletion.

### `aws_mq_broker`: Password Field Cannot Be Retrieved

Click to view

**Summary**: Terraform plan will fail because AWS does not return the password field for `aws_mq_broker`.

**Cause**: AWS security constraints prevent the retrieval of passwords for existing managed message brokers. When StackGen attempts to infer the state or run a plan, the missing password field triggers an error.

**Workaround**: Manually re-enter the password in your Terraform configuration if you need to re-create or update the resource. The password cannot be recovered from AWS once the broker is created.

## OCI

### Early Access: Custom Modules and CLI Plan and Apply

Click to view

**Summary**: **Oracle Cloud Infrastructure (OCI)** is available as a cloud provider. There are no built-in OCI modules. Plan and apply for OCI use the **CLI**.

**Cause**: Built-in modules and full UI Plan/Deploy for OCI are not ready yet. OpenTofu support for the OCI provider is limited, so StackGen uses the CLI with custom modules.

**Workaround**: Use custom OCI modules and run plan and apply with the StackGen CLI. See [OCI provider early access](/docs/stackgen/release-notes/aip/2026/july/v2026-7-3#oci-provider-and-cli-early-access), [OCI and generic cloud framework (v2026.6.12)](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#oci-and-generic-cloud-support), and [IaC from Design](/docs/stackgen/concepts/appstacks/createappstacks/fromscratch).

- [AWS](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#aws)
  - [`data.archive_file`: File Deleted When Path Not Found](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#dataarchive_file-file-deleted-when-path-not-found)
  - [`aws_mq_broker`: Password Field Cannot Be Retrieved](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#aws_mq_broker-password-field-cannot-be-retrieved)
- [OCI](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci)
  - [Early Access: Custom Modules and CLI Plan and Apply](/docs/stackgen/cli-guide/get-started/cloud-provider-limitations#oci-early-access-custom-modules-and-cli-plan-and-apply)
