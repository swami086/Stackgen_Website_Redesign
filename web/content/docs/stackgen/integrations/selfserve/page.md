---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/integrations/selfserve"
sourceUrl: "https://docs.stackgen.com/docs/integrations/selfserve"
status: "ok"
---

important

The Backstage Self-service feature is available on request. Please reach out to [support@stackgen.com](mailto:support@stackgen.com) to avail this service.

## Overview

Backstage offers a **Developer Self-service Experience**, where your developers can scaffold backend services, frontend apps, CI/CD pipelines, and more, without involving your DevOps teams.

You can do this through **software templates** that capture repeatable infrastructure and service patterns.

![Backstage Self Serve Home](https://docs.stackgen.com/assets/images/backstageselfservehome-140d92ea03cf14b6f53ed48352d9905e.png)

## What Does StackGen Enable?

StackGen provides APIs that let projects go beyond just scaffolding code, enabling them to automate infrastructure provisioning alongside code creation.

With StackGen, your templates can:

- Scaffold application code
- Create appStack in Stackgen
- Export and then generate IaC
- Provision infrastructure

## Integration Steps: How It Works

1. **Create or reuse an existing Template:** Define the structure, parameters, and steps needed to scaffold your service or resource.
2. **Configure the required actions:** Use built-in or custom actions to perform specific tasks like provisioning resources, pushing code, or registering components.

Let's look at how this is done in detail.

## Steps to Create a Backstage Self-Service Template

### Prerequisites

Click to view

- You will need to add the StackGen config in `app-config.yaml` if you haven’t done it already:





```yaml
stackGen:

    baseUrl: "${BACKSTAGE_ADAPTER_URL}"

    apiToken: "${STACKGEN_PAT}"

    allowedTeams: "20f0e211-15ce-4d2c-1e12-0555bffee7bd,20f0e211-15ce-4d2c-2e22-0555bffee7bd"
```

- Add the custom action `stackGen:createAppstack` to your backstage backend


### Create or Reuse an Existing Template

Click to view

A typical Backstage `template.yaml` file defines the user interface and the execution workflow of a Backstage Software Template. It typically includes:

- `steps`: It is the input for your actions and consists of the sequence of actions to be executed.
- `output`: The results or links shown to the user after the template runs.

Let’s look at each of these configurations in detail:

- `steps` in your `template.yaml` will look like this:





```yaml
steps:

  - id: stackGen

    name: Create appStack

    action: stackGen:createAppstack

    input:

      appstack:

        name: "MyappStack"

        # Optional: teamId can be omitted if not needed

        teamId: "team-123"

        cloudProvider: "aws"

        resources:

          - resourceType: "aws_s3" # must be valid stackGen resourceType

            # Only one of 'configuration' or 'resourcePackId' should be provided

            configuration:

              bucket_name: "mybucket" # configuration keys for a stackGen resource must be valid otherwise values will not be set.
```

- `output` in your `template.yaml` will look like this:





```yaml
output:

    links:

    - title: 'View Created appStack in StackGen'

      url: '${{ steps.stackGen.output.appStackURL }}'
```

You can contact [**support@stackgen.com**](mailto:support@stackgen.com) to help you configure these supported properties.

### Advanced `template.yaml` Configurations

Click to view

You can additionally configure steps for:

- **Resource Packs**





```yaml
     - resourceType: "resourcePack"

       resourcePackId: "20f0e212-15ce-4d2c-1e12-0555bffee7bd" # resourcePackId should be valid.

       # No configuration here because resourcePackId is used
```

- Resource Groups like Helm





```yaml
    - resourceType: "helm_workload" # for a resourceType which is a group, children can be specified.

      children:

        - resourceType: "helm_workload"

          configuration:

            name: test-workload

            image: test-image

        - resourceType: helm_service

          configuration:

            name: test-service
```

Contact [**support@stackgen.com**](mailto:support@stackgen.com) to help you configure these supported properties. Check out the Backstage documentation to learn how to write [**template.yaml**](https://backstage.io/docs/features/software-templates/writing-templates/).

### Configure the `action` in Your Backstage Backend

Click to view

This is where the `stackGen:createAppstack` action (shown below) comes into play.

Here’s how the `action` works:

1. Validates the user input using Zod schemas.
2. Constructs a payload for StackGen’s `/v1/appstacks` API.
3. Makes a `POST` request to StackGen to create the appStack.
4. Returns the generated appStack URL.

```ts
import { createAppStackAction, downloadIaCAction } from '@stackgenhq/backstage-plugin-stackgen-backend';

...

export const scaffolderCustomExtension = createBackendModule({

  pluginId: 'scaffolder',

  moduleId: 'custom-extensions',

  register(env) {

    env.registerInit({

      deps: {

        scaffolder: scaffolderActionsExtensionPoint,

        config: coreServices.rootConfig,

        logger: coreServices.logger,

      },

      async init({ scaffolder, config, logger }) {

        scaffolder.addActions(

          createAppStackAction(config, logger),

          downloadIaCAction(config, logger)

          // ...other actions

        );

      },

    });

  },

});

...

backend.add(scaffolderCustomExtension);
```

If you have already configured actions, simply insert the function as shown below:

```ts
scaffolder.addActions(createAppstackAction(config, logger));
```

Check out the Backstage documentation to learn how to [register custom actions](https://backstage.io/docs/features/software-templates/writing-custom-actions/#registering-custom-actions).

## Sample `template.yaml` for creating an appStack

Click to view

```yaml
apiVersion: scaffolder.backstage.io/v1beta3

kind: Template

metadata:

  name: create-appstack-with-resource-pack

  title: Create appStack With Resource Pack

  description: Create a new appStack with cloud resources, Helm workload and a Resource Pack

spec:

  owner: user:guest

  type: service

  parameters:

    - title: appStack Info

      required:

        - name

      properties:

        name:

          type: string

          title: appStack Name

        teamId:

          type: string

          title: Team ID

          default: ""

    - title: Cloud Resources

      properties:

        s3:

          type: object

          title: S3 Bucket Configuration

          properties:

            s3BucketName:

              type: string

              title: S3 Bucket Name

        rds:

          type: object

          title: RDS Configuration

          properties:

            rdsEngine:

              type: string

              title: RDS Engine

              default: postgres

    - title: Helm Workload

      properties:

        workloadName:

          type: string

          title: Deployment Name

        image:

          type: string

          title: Image Name

        imageTag:

          type: string

          title: Image Tag

          default: latest

        replicas:

          type: number

          title: Replicas

          default: 3

        serviceName:

          type: string

          title: Service Name

        serviceLabel:

          type: string

          title: Service Label

          default: exampleApp

    - title: Resource Pack

      required:

        - resourcePackId

      properties:

        resourcePackId:

          type: string

          title: Resource Pack ID

          description: ID of the resource pack to include in resources

  steps:

    - id: stackgen

      name: Create appStack

      action: stackGen:createAppstack

      input:

        appstack:

          name: ${{ parameters.name }}

          cloudProvider: "aws"

          teamId: ${{ parameters.teamId }}

          resources:

            - resourceType: aws_s3

              configuration:

                bucket_name: ${{ parameters.s3.s3BucketName }}

            - resourceType: aws_rds

              configuration:

                rds_engine: ${{ parameters.rds.rdsEngine }}

                rds_master_password: "${var.rds_password}"

            - resourceType: helm_workload

              children:

                - resourceType: helm_workload

                  configuration:

                    name: ${{ parameters.workloadName }}

                    image: ${{ parameters.image }}

                    image_tag: ${{ parameters.imageTag }}

                    replicas: ${{ parameters.replicas }}

                    labels:

                      service: ${{ parameters.serviceLabel }}

                - resourceType: helm_service

                  configuration:

                    name: ${{ parameters.serviceName }}

            - resourceType: resourcePack

              resourcePackId: ${{ parameters.resourcePackId }}

  output:

    links:

      - title: 'View Created appStack in StackGen'

        url: ${{ steps.stackgen.output.appstackURL }}
```

## API References Used

`GET /v1/team/listTeams`: Retrieves available teams for resource ownership. Check out the API reference documentation at [StackGen Integrations Gateway API](https://main.dev.stackgen.com/integrations/api/swagger/index.html#/v1%20team/listTeams).

- [Overview](/docs/stackgen/integrations/selfserve#overview)
- [What Does StackGen Enable?](/docs/stackgen/integrations/selfserve#what-does-stackgen-enable)
- [Integration Steps: How It Works](/docs/stackgen/integrations/selfserve#integration-steps-how-it-works)
- [Steps to Create a Backstage Self-Service Template](/docs/stackgen/integrations/selfserve#steps-to-create-a-backstage-self-service-template)
  - [Prerequisites](/docs/stackgen/integrations/selfserve#prerequisites)
  - [Create or Reuse an Existing Template](/docs/stackgen/integrations/selfserve#create-or-reuse-an-existing-template)
  - [Advanced `template.yaml` Configurations](/docs/stackgen/integrations/selfserve#advanced-templateyaml-configurations)
  - [Configure the `action` in Your Backstage Backend](/docs/stackgen/integrations/selfserve#configure-the-action-in-your-backstage-backend)
