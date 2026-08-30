---
title: "Usage"
product: "stackgen"
sourcePath: "/docs/cli-guide/cloud2code/gcpflags"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/cloud2code/gcpflags"
status: "ok"
---

GCP-specific flags in Cloud to Code help you control which GCP resources are imported into Terraform configuration files. Here's how they work:

## Usage

To import only networks in region `us-west2` from project `sample-team-project-444210`, instead of pulling `all` resources, run the command:

```bash
    cloud2code import gcp --project-id sample-team-project-444210 \
    --region us-west2 \
    --credentials /Users/testuser/.config/gcloud/adc.json
```

## How Each Flag is Used

- **`--project-id`, `--region, --credentials` (Required)**: These flags are mandatory and specifies the GCP Project ID, GCP Region and GCp Credentials File Path which resources will be imported. Without it, Cloud to Code will not know which project to access.



**Usage**





```bash
cloud2code import gcp --project-id sample-test-project-56789a --region us-west1 --credentials /Users/testuser/.config/gcloud/adc.json
```









The above code will import all resources from the specified `project-id` and `region`.

- **`--include` (Optional, for precise control)**: Import specific resource types. You can run this command when you need to import only specific resources instead of everything under a project and region.

**Usage**





```bash
cloud2code import gcp --project-id sample-test-project-56789a

  --region us-west2 --credentials /Users/testuser/.config/gcloud/adc.json

  --include google_bigquery_table --include google_bigquery_dataset
```









This imports only the specific BigQuery Table and Dataset, and ignores everything else.

- **`--exclude` (Optional, for precise control)**: Excludes importing specific resource types. You can run this command when you need to exclude specific resources instead of everything under a project and region.

**Usage**





```bash
cloud2code import gcp --project-id sample-test-project-56789a

  --region us-west2 --credentials /Users/testuser/.config/gcloud/adc.json

  --exclude google_compute_network --exclude google_compute_subnetwork
```









This excludes importing Network and Subnetwork in given project and region and imports everything else.


## When to Use Each Flag

| Scenario | Flags to Use | Example Command |
| --- | --- | --- |
| Import all resources in specific project and specific region | `--project-id` \+ `--region` \+ `--credentials` | `cloud2code import gcp --project-id <project-id> --region <region>` |
| Import specific resource types in a specific project in a specific region | `--project-id` \+ `--region` \+ `--credentials`\+ `--include` | `cloud2code import gcp --project-id <project-id> --region <region> --include <resource-type>` |
| Exclude importing specific resource types | `--project-id` \+ `--region` \+ `--credentials`\+ `--exclude` | `cloud2code import gcp --project-id <project-id> --region <region> --exclude <resource-type>` |
