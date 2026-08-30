---
title: "Quick Start"
product: "stackgen"
sourcePath: "/docs/concepts/modules/stackgen-yaml"
sourceUrl: "https://docs.stackgen.com/docs/concepts/modules/stackgen-yaml"
status: "ok"
---

Add `stackgen.yaml` to a custom Terraform module to tell StackGen how that module should render in the UI.

The file goes in `.stackgen/stackgen.yaml` (or `.stackgen/stackgen.yml`) at the module root. StackGen used to use **properties.json** and **metadata.json** for the same purpose. Those are now one YAML file.

Use this when you build a module from an abstract or work in the **Module Editor**. **Autogenerate stackgen.yaml** creates or refreshes the file. From there you set the canvas label and icon, how inputs appear in the configure panel, how modules connect on the topology, and how existing cloud resources are discovered for import.

You can validate `stackgen.yaml` **schema keys** and structure while you author or update custom modules:

- **API / CLI**: Validate schema keys programmatically during custom module development. This cut checks schema keys for how the module is presented on the canvas. It is not full semantic or runtime validation of every canvas behavior. See [v2026.7.7](/docs/stackgen/release-notes/aip/2026/july/v2026-7-7#stackgen-yaml-syntax-validation).
- **appStack-owned Module Editor**: When you create or edit `stackgen.yaml` for an **appStack-owned** module, StackGen validates incorrect keys. You get an error toast, and an error count appears in red next to `stackgen.yaml` in the side pane so you can fix schema issues before you publish.

## Quick Start

1. Create `.stackgen/` in your Terraform module root.
2. Add `stackgen.yaml`.
3. Commit and push the module.
4. Import or refresh the module in StackGen.

## What Goes in the File

| Block | What it does |
| --- | --- |
| `representation` | Icon, label, and description on the Topology canvas and side panel |
| `container` | Container behavior: delete rules and how other modules connect in |
| `variables` | Labels, controls, and validation for each Terraform variable |
| `variable_groups` | Sections in the configure panel |
| `connections` | Predefined wiring between modules (outputs to inputs) |
| `discovery` | How StackGen finds an existing cloud resource to import |

Set `version: "1.0"` at the top of the file.

## Representation

The `representation` block sets how the module appears on the **Topology** canvas and in the configure resource side panel.

You can set a short `description`, an `icon`, side panel `label` and `icon`, and how the canvas node is titled. Use `node.label.static` for the default title and `node.label.template` with `${variable_name}` once the user fills in a variable. Set `node.display_type: container` when the module should render as a container. `node.label_attribute` names the variable the template reads (for example `name` or `bucket_name`).

**Example**

Add this under `representation` in `.stackgen/stackgen.yaml`:

```yaml
representation:

  description: |

    DynamoDB table module with container, discovery, and connection metadata.

  icon: aws-dynamodb-table

  side_panel:

    label: DynamoDB Table

    icon: aws-dynamodb-table

  node:

    label:

      static: DynamoDB Table

      template: DynamoDB Table - ${name}

    display_type: container

    label_attribute: name
```

The above configuration will:

- Show the description and `aws-dynamodb-table` icon on the canvas.
- Title the side panel **DynamoDB Table**.
- Show **DynamoDB Table** on the node, then **DynamoDB Table -** plus the `name` value after the user sets it.
- Render the node as a container.

After you edit the file, commit, push, and re-import or refresh the module so StackGen picks up the changes.

Click to view representation fields

| Field | Description |
| --- | --- |
| `description` | Short summary shown in the UI |
| `icon` | StackGen icon id (for example `aws-dynamodb-table`) |
| `side_panel.label` | Title in the configure resource panel |
| `side_panel.icon` | Icon in the configure resource panel |
| `node.label.static` | Default node title on the canvas |
| `node.label.template` | Node title with `${variable_name}` placeholders |
| `node.display_type` | Canvas node type (for example `container`) |
| `node.label_attribute` | Variable name used with the template |

## Container

We've added native **child module** support for custom **container** modules. Custom containers can mirror the nested visual behavior of built-in **VPC** and **subnet** configurations on the **Topology** canvas.

**Previously**, nested child modules and parent/child attribute mapping were limited to platform-built containers. **Now**, you configure the same nested canvas behavior in the custom module's `stackgen.yaml`.

**How to configure**

1. Set `node.display_type` to `container` under `representation.node` (see [Representation](/docs/stackgen/concepts/modules/stackgen-yaml#representation)).
2. Add a `container` block with `type`, `on_delete`, and `connection_rules` so parent and child modules map attributes when a child is placed on a parent.

**Key Features**

- **Child Module Support** \- Nest child modules on the canvas the same way you group built-in networking containers.
- **Connection Rules and Attribute Mapping** \- Define which parent and child modules can connect (for example a **VPC** parent and a **subnet** child). When you drag a child onto the parent, valid attributes (such as a **VPC ID**) map automatically from those rules.
- **Deletion Types** \- Control what happens when the parent is deleted with `on_delete`:
  - **detach** \- Nested child modules stay on the canvas.
  - **cascade** \- The parent and all nested children are removed together.

note

Visual grouping and attribute mapping rely on your custom connection rules for canvas continuity. This is **not** a Terraform restriction. StackGen will allow uncommon connections (for example connecting an **S3** bucket to a route table) when your YAML rules dictate it.

For YAML template examples or implementation questions, contact [support@stackgen.com](mailto:support@stackgen.com) or your Customer Service Manager.

See [v2026.6.12](/docs/stackgen/release-notes/aip/2026/june/v2026-6-12#container-type-modules-support).

**Example**

```yaml
container:

  type: networking

  on_delete: cascade

  connection_rules:

    - source_module_name: aws_vpc

      connection_type: DATA

      mapping:

        source_attribute: vpc_id

        target_attribute: vpc_id

        data_type: string
```

The above configuration will:

- Treat the module as a `networking` container.
- Remove nested children when the container is deleted (`cascade`).
- Let an `aws_vpc` module connect with a `DATA` link from `vpc_id` to `vpc_id`.

Click to view container fields

| Field | Description |
| --- | --- |
| `type` | Container category (for example `networking`) |
| `on_delete` | `cascade` removes children on delete; `detach` keeps them |
| `connection_rules` | List of allowed inbound connections |
| `connection_rules[].source_module_name` | Module that connects into the container |
| `connection_rules[].connection_type` | Connection label (for example `DATA`) |
| `connection_rules[].mapping.source_attribute` | Attribute on the source module |
| `connection_rules[].mapping.target_attribute` | Attribute on the container module |
| `connection_rules[].mapping.data_type` | Expected type (for example `string`) |

## Variables and Variable Groups

Each key under `variables` matches a variable in `variables.tf`. Use it to set the field `label`, `description`, `type`, `ui_control`, `options`, and `validation`. For `object` and `list` types, nest fields under `attributes` with the same shape.

Use `variable_groups` to group variables into tabs or sections in the configure panel.

**Example**

```yaml
variables:

  billing_mode:

    label: Billing Mode

    description: The billing mode of the DynamoDB table.

    ui_control: dropdown

    options:

      - PROVISIONED

      - PAY_PER_REQUEST

    validation:

      required: true

    type: string

  server_side_encryption:

    label: Server-Side Encryption

    type: object

    default_editor: form

    variable_label: Encryption block

    attributes:

      enabled:

        label: Enabled

        type: bool

      kms_key_arn:

        label: KMS Key ARN

        type: string

variable_groups:

  - label: DynamoDB Stream & Billing

    variables:

      - billing_mode

      - stream_enabled

  - label: Advanced Settings

    variables:

      - server_side_encryption
```

The above configuration will:

- Show **Billing Mode** as a required dropdown.
- Render encryption as a form with **Enabled** and **KMS Key ARN** fields.
- Split variables into **DynamoDB Stream & Billing** and **Advanced Settings** sections.

Click to view variable fields

| Field | Description |
| --- | --- |
| `label` | Display name in the config panel |
| `description` | Help text |
| `type` | Terraform type (`string`, `bool`, `object`, `list`, and so on) |
| `terraform_variable_type` | Explicit Terraform type when it differs from `type` |
| `ui_control` | UI widget (`text`, `dropdown`, `select`, `object`, and so on) |
| `options` | Allowed values for dropdown or select |
| `value_type` | Value type hint for the UI |
| `validation` | Rules such as `required` or `maxObjects` |
| `attributes` | Nested fields for `object` or `list` items |
| `default_editor` | Editor for complex types (for example `form`) |
| `variable_label` | Label for a nested object block |

**`ui_control` values:**`text`, `password`, `select`, `dropdown`, `dictionary`, `textarea`, `object`, `hcl`, `yaml`, `json`, `shell`, `markdown`, `text_list`, `textarea_list`, `dictionary_list`, `object_list`.

Terraform variable defaults still come from `variables.tf`, not from `stackgen.yaml`.

### `any` and `any(list)` variables

**Previously**, complex open-ended types did not have a reliable attributes UI. **Now**, variables of Terraform type `any` or `any(list)` open in **HCL Expression** (Terraform expression) mode by default.

- The attributes UI stays in expression mode for these types. There is no deterministic form UI for arbitrary `any` values, so you do not switch to a normal editor for that field.
- Override that default only by explicitly defining a `ui_control` (or `ui-control`) in `stackgen.yaml`.
- If an `any` or `any(list)` variable has no default value, StackGen flags it as **Action Required** so incomplete open-ended inputs show up before you move on.

See [v2026.7.9](/docs/stackgen/release-notes/aip/2026/july/v2026-7-9#any-type-variable-rendering).

## Connections

The `connections` list tells StackGen how to wire modules together on the topology. Each entry has a `source` module, a `target` module, an optional `label` (for example `DATA` or `TRIGGER`), and `references` that map outputs to inputs.

**Example**

```yaml
connections:

  - source: aws_s3_bucket

    target: aws_lambda_function

    label: DATA

    references:

      - from: aws_s3_bucket

        to: aws_lambda_function

        output: arn

        input: bucket_arn

  - source: aws_sqs_queue

    target: aws_lambda_function

    label: TRIGGER

    references:

      - from: aws_sqs_queue

        to: aws_lambda_function

        output: queue_url

        input: queue_url
```

The above configuration will:

- Connect S3 to Lambda with a `DATA` link (`arn` to `bucket_arn`).
- Connect SQS to Lambda with a `TRIGGER` link (`queue_url` to `queue_url`).

Click to view connection fields

| Field | Description |
| --- | --- |
| `source` | Source module name |
| `target` | Target module name |
| `label` | Connection type (`DATA`, `TRIGGER`, and so on) |
| `references` | Output-to-input mappings |
| `references[].from` | Module that exposes the output |
| `references[].to` | Module that receives the input |
| `references[].output` | Output attribute name |
| `references[].input` | Input attribute name |

## Discovery

The `discovery` block tells StackGen how to import an existing resource. Set the Terraform resource `type`, the `data_source` to read it, whether drag-and-drop discovery is allowed (`dnd_supported`), and a `references` map from stackgen attributes to resource outputs.

**Example**

```yaml
discovery:

  type: aws_dynamodb_table

  dnd_supported: false

  data_source: data_aws_dynamodb_table

  references:

    table_name:

      from: aws_dynamodb_table

      output: name

    table_arn:

      from: aws_dynamodb_table

      output: arn
```

The above configuration will:

- Discover `aws_dynamodb_table` resources using `data_aws_dynamodb_table`.
- Map `table_name` and `table_arn` from the resource outputs.
- Disable drag-and-drop discovery (`dnd_supported: false`).

Click to view discovery fields

| Field | Description |
| --- | --- |
| `type` | Terraform resource type to discover |
| `dnd_supported` | `true` or `false` for drag-and-drop discovery |
| `data_source` | Terraform data source name |
| `references.<name>.from` | Resource the output comes from |
| `references.<name>.output` | Output attribute name |

Click to view full schema (v1)

```yaml
version: string

representation:

  description: string              # optional

  icon: string                     # optional

  side_panel:

    label: string

    icon: string

  node:

    label:

      static: string

      template: string

    display_type: string

    label_attribute: string        # optional

container:                         # optional

  type: string                     # optional

  on_delete: string                # optional; "cascade" | "detach"

  connection_rules:                # optional

    - source_module_name: string

      connection_type: string      # optional

      mapping:

        source_attribute: string

        target_attribute: string

        data_type: string          # optional

variables:

  <name>: string                   # map key

    label: string                  # optional

    description: string            # optional

    ui_control: string             # optional

    options: any[]                 # optional

    value_type: string             # optional

    validation:                    # optional

      <key>: any

    attributes:                    # optional; recursive Variable map

      <name>: ...                  # same Variable shape

    default_editor: string         # optional

    variable_label: string         # optional

    type: string                   # optional

    terraform_variable_type: string # optional

variable_groups:

  - label: string

    description: string

    variables: string[]

connections:

  - source: string

    target: string

    label: string                  # optional

    references:                    # optional

      - from: string

        to: string

        output: string

        input: string

discovery:

  type: string

  dnd_supported: boolean

  data_source: string

  references:

    <attribute_name>:

      from: string

      output: string
```

Click to view full DynamoDB example

```yaml
version: "1.0"

representation:

  description: |

    DynamoDB table module with container, discovery, and connection metadata.

  icon: aws-dynamodb-table

  side_panel:

    label: DynamoDB Table

    icon: aws-dynamodb-table

  node:

    label:

      static: DynamoDB Table

      template: DynamoDB Table - ${name}

    display_type: container

    label_attribute: name

container:

  type: networking

  on_delete: cascade

  connection_rules:

    - source_module_name: aws_vpc

      connection_type: DATA

      mapping:

        source_attribute: vpc_id

        target_attribute: vpc_id

        data_type: string

variables:

  billing_mode:

    label: Billing Mode

    description: The billing mode of the DynamoDB table.

    ui_control: dropdown

    options:

      - PROVISIONED

      - PAY_PER_REQUEST

    value_type: string

    validation:

      required: true

    type: string

    terraform_variable_type: string

  stream_enabled:

    label: Stream Enabled

    description: Enable DynamoDB Streams.

    type: bool

    options:

      - true

      - false

  server_side_encryption:

    label: Server-Side Encryption

    description: Encryption settings for the table.

    type: object

    default_editor: form

    variable_label: Encryption block

    validation:

      required: false

      maxObjects: 1

    attributes:

      enabled:

        label: Enabled

        description: Whether server-side encryption is enabled.

        type: bool

      kms_key_arn:

        label: KMS Key ARN

        description: The ARN of the KMS key used for encryption.

        type: string

  global_secondary_index:

    type: list

    validation:

      maxObjects: 20

    attributes:

      name:

        label: Index Name

        type: string

      hash_key:

        label: Hash Key

        type: string

      projection_type:

        label: Projection Type

        type: string

        options:

          - ALL

          - KEYS_ONLY

          - INCLUDE

variable_groups:

  - label: DynamoDB Stream & Billing

    description: Configure DynamoDB stream and billing options.

    variables:

      - billing_mode

      - stream_enabled

  - label: Indexes

    description: Configure secondary indexes.

    variables:

      - global_secondary_index

  - label: Advanced Settings

    description: Advanced DynamoDB settings.

    variables:

      - server_side_encryption

connections:

  - source: aws_s3_bucket

    target: aws_lambda_function

    label: DATA

    references:

      - from: aws_s3_bucket

        to: aws_lambda_function

        output: arn

        input: bucket_arn

      - from: aws_s3_bucket

        to: aws_lambda_function

        output: id

        input: bucket_id

  - source: aws_sqs_queue

    target: aws_lambda_function

    label: TRIGGER

    references:

      - from: aws_sqs_queue

        to: aws_lambda_function

        output: queue_url

        input: queue_url

discovery:

  type: aws_dynamodb_table

  dnd_supported: false

  data_source: data_aws_dynamodb_table

  references:

    table_name:

      from: aws_dynamodb_table

      output: name

    table_arn:

      from: aws_dynamodb_table

      output: arn
```

- [Quick Start](/docs/stackgen/concepts/modules/stackgen-yaml#quick-start)
- [What Goes in the File](/docs/stackgen/concepts/modules/stackgen-yaml#what-goes-in-the-file)
- [Representation](/docs/stackgen/concepts/modules/stackgen-yaml#representation)
- [Container](/docs/stackgen/concepts/modules/stackgen-yaml#container)
- [Variables and Variable Groups](/docs/stackgen/concepts/modules/stackgen-yaml#variables-and-variable-groups)
  - [`any` and `any(list)` variables](/docs/stackgen/concepts/modules/stackgen-yaml#any-and-anylist-variables)
