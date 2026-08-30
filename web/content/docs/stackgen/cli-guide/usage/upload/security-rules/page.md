---
title: "Prerequisites"
product: "stackgen"
sourcePath: "/docs/cli-guide/usage/upload/security-rules"
sourceUrl: "https://docs.stackgen.com/docs/cli-guide/usage/upload/security-rules"
status: "ok"
---

Important

You will need a StackGen **Admin** or **DevOps** access to run this command.

The `stackgen upload security-rules` command allows you to upload custom security and compliance rules for resource protection. It accepts a JSON file as input and uploads the rules to your environment.

## Prerequisites

You need to be familiar with your resource configurations or templates in order to write the rules effectively.

## Usage

```bash
stackgen upload security-rules [flags]
```

Important

You will get an error if you add the same security rule twice. For example, `"rule_id": "AWS_S3_001",`.

```bash
ERROR   security rules upload failed!

2025-08-13 04:06:13 ERROR 409 Conflict version: 0.67.1 service: stackgen
```

## Flags

| Flag | Description |
| --- | --- |
| `-p, --security-rules-file-path string` | Path to security and compliance rules file. |
| `-h, --help` | Help for security-rules. |

## Example

### Upload security rules from a local file

```bash
stackgen upload security-rules -p /path/to/security_rules.json
```

This command will:

- Read the security rules from the specified JSON file,
- Upload the rules to the StackGen platform,
- Enforce these security requirements across your infrastructure.

## File Format

The security rules file should be in JSON format and define specific security requirements. Here's an example:

```json
[\
\
  {\
\
    "rule_id": "AWS_S3_001",\
\
    "name": "Bucket Name Must be test",\
\
    "version": "0.0.1",\
\
    "resource_type": "aws_s3",\
\
    "provider": "aws",\
\
    "description": "Ensure that S3 Buckets name is test.",\
\
    "benchmarks": [\
\
      "CIS",\
\
      "AWS Security",\
\
      "NIST",\
\
      "HIPAA",\
\
      "ISO",\
\
      "PCI",\
\
      "SOC2",\
\
      "GDPR"\
\
    ],\
\
    "category": "Data Protection",\
\
    "severity": "HIGH",\
\
    "rules": [\
\
      {\
\
        "logical_operator": "AND",\
\
        "conditions": [\
\
          {\
\
            "attribute": {\
\
              "name": "bucket_name",\
\
              "default": "test",\
\
              "data_type": "string"\
\
            },\
\
            "operator": "EQUALS",\
\
            "value": "test"\
\
          }\
\
        ],\
\
        "remediation": {\
\
          "description": "Name value should not be anything else than test for data protection."\
\
        }\
\
      }\
\
    ]\
\
  }\
\
]
```

Each rule in the array includes:

- `rule_id`: Unique identifier for the rule (e.g., "AWS\_S3\_001").
- `name`: Human-readable name of the rule.
- `version`: Version number of the rule.
- `resource_type`: The type of resource this rule applies to. The resource type can belong to any cloud provider and must match the resource type defined in your custom or StackGen template.
- `provider`: Cloud provider (aws, azure, gcp, etc.)
- `description`: Detailed explanation of what the rule enforces.
- `benchmarks`: List of compliance frameworks this rule helps satisfy.
- `category`: Categorization of the security control.
- `severity`: Impact level if this rule is violated (HIGH, MEDIUM, LOW).
- `rules`: Array of rule conditions with:
  - `logical_operator`: How conditions should be evaluated (AND, OR),
  - `conditions`: Specific checks against resource attributes,
  - `remediation`: Instructions for fixing violations.

## Supported Operators

Currently, StackGen CLI supports the following operators in the `.json` file:

- EQUALS
- NOTEQUALS
- NOTEMPTY
- EMPTY
- GREATERTHAN
- LESSTHAN
- CONTAINS
- DONOTCONTAIN
- CONTAINSOBJECTWITHKEY
- DONOTCONTAINSOBJECTWITHKEY
- CONTAINSSTRINGWITHKEY
- DONOTCONTAINSSTRINGWITHKEY
- DONOTCONTAINOBJECTWITHEMPTYKEY
- MAPOPERATIONS

You can use the following `logical_operators` in the `.json` file:

- AND
- OR

note

- Security rules help ensure compliance with organizational security policies.
- Each rule can target specific resource types and providers.
- Rules support various compliance benchmarks like CIS, HIPAA, and GDPR.
- Violations will be reported based on the specified severity level.

- [Prerequisites](/docs/stackgen/cli-guide/usage/upload/security-rules#prerequisites)
- [Usage](/docs/stackgen/cli-guide/usage/upload/security-rules#usage)
- [Flags](/docs/stackgen/cli-guide/usage/upload/security-rules#flags)
- [Example](/docs/stackgen/cli-guide/usage/upload/security-rules#example)
  - [Upload security rules from a local file](/docs/stackgen/cli-guide/usage/upload/security-rules#upload-security-rules-from-a-local-file)
