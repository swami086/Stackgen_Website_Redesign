---
title: "Overview"
product: "observenow"
sourcePath: "/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester"
status: "ok"
---

* * *

## Overview

This Helm chart deploys the RDS Logs Ingester, a tool designed to fetch logs from Amazon RDS instances and optionally forward them to a Loki instance for log management. The deployment is configurable, allowing users to specify RDS instances, Loki API credentials, and resource limits.

### Key Features:

- Fetch logs from specified RDS instances.
- Optional integration with Loki for log forwarding.
- Support for custom labels on top of ingesting the RDS instance tags
- Configurable via Helm values for easy customization.

* * *

## Configuration

### Prerequisites:

- If using AWS AccessID/SecretKey credentials: A Kubernetes secret named `aws-credentials` containing AWS access keys and region. Use the following command to create a generic secret to store the `AWS Credentials`:

```shell
kubectl create secret generic aws-credentials --from-literal=AWS_ACCESS_KEY_ID=<redacted> --from-literal=AWS_SECRET_ACCESS_KEY=<redacted> -n <namespace>
```

- If using Service Account based auth, an IAM role ARN with the appropriate permissions/policies attached to be able to interact with the API
  - _Note: It is recommended to use Service Account based auth as a better security practice_
  - If storing the AWS credentials in a secret, consider implementing sealed secrets for much greater security: [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets)
- An image pull secret for accessing the private Docker registry ( _included in the helm chart_)

* * *

## Creating a Role with OIDC Web Identity for Kubernetes Authentication in AWS EKS

This guide outlines the process for creating a role with OIDC (OpenID Connect) web identity in AWS EKS (Elastic Kubernetes Service), attaching policies, and configuring a Kubernetes service account for authentication.

## Step 1: Create a Role with OIDC Web Identity

### Navigate to IAM

- Open the AWS Management Console.
- Access the IAM (Identity and Access Management) service and follow the steps presented in the following AWS documentation to create a new IAM Role:
  - [Creating a new IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html)
- Check if the Kubernetes cluster already has an associated OIDC URL. If one is not associated with the cluster, use the following steps to create a new one:
  - [Creating OIDC Provider](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
  - [Authenticating Users via OIDC Provider](https://docs.aws.amazon.com/eks/latest/userguide/authenticate-oidc-identity-provider.html)

* * *

### Create Role Flow:

**Configure Trusted Entity and Audience**

![](https://docs.stackgen.com/assets/images/RSxrnJFO0JiU0zUmp1B0Q_1-2217efb7e1105f997f3c363c26c8642c.png)

**Attach Policies**

_skip this part as we will be adding custom minimal permissions later on, post role-creation._

![](https://docs.stackgen.com/assets/images/URQqoUs3nOUB5iDKw1WiN_1-7033ed729a5f832866047af907f0e0d3.png)

**Review and Create Role**

Click **Next: Tags** (optional), then **Next: Review and Create**

![](https://docs.stackgen.com/assets/images/OLnEXiCWKvNU-f2yVeh3F_1-5f6537f9b58f19d18f3f7494ba1d1100.png)

* * *

## Step 2: Attach Custom Policy to the Role

### Attach Custom Inline Policies

- After following the above step to create a role, navigate to the newly created role to add custom permissions:

_click on the_`Add permissions` _option and select_`Create inline policy`

![](https://docs.stackgen.com/assets/images/uHg2UlX0dp045uuxpDbGW_1-de9b460d92648e92ed87f27f59052bfb.png)

_use the following inline policy to set permissions:_

```json
  {

    "Version": "2012-10-17",

    "Statement": [\
\
      {\
\
        "Effect": "Allow",\
\
        "Action": [\
\
          "rds:DownloadDBLogFilePortion",\
\
          "rds:DescribeDBLogFiles",\
\
          "rds:DescribeDBInstances"\
\
        ],\
\
        "Resource": "arn:aws:rds:*:<12_digit_aws_account_id>:db:*"\
\
      }\
\
    ]

  }
```

* * *

## Step 3: Verify Trust Relationship and Policy

- Go to the **Trust relationships** tab.
- Confirm the correct OIDC details.

_use the following template to edit the Role's Trust Relationship_:

```json
    {

      "Version": "2012-10-17",

      "Statement": [\
\
          {\
\
              "Effect": "Allow",\
\
              "Principal": {\
\
                  "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/<OPENID_CONNECT_URL>"\
\
              },\
\
              "Action": "sts:AssumeRoleWithWebIdentity",\
\
              "Condition": {\
\
                  "StringEquals": {\
\
                      "<OPENID_CONNECT_URL>:aud": "sts.amazonaws.com",\
\
                      "<OPENID_CONNECT_URL>:sub": "system:serviceaccount:*:rds-ingester-sa"\
\
                  }\
\
              }\
\
          }\
\
      ]

    }
```

_Note: do not include the_`https:` _prefix when using the OIDC URL from the EKS console_:

![](https://docs.stackgen.com/assets/images/oh8V7-xo_rJAtvJzHwC-R_1-7d86aa9b1339cf40bc4f37c389366116.png)

* * *

## Step 4: Associate Role with Kubernetes Service Account and Configure Chart Values

### Configure Service Account in Kubernetes

- Annotate the service account field in `values.yaml` with the IAM role ARN
- _add the ARN value under the_`serviceAccount.aws.roleArn` _field_

```yaml
  RDSLogsIngester:

    replicaCount: 1

    namespace: stage

    serviceAccount:

      details:

        name: rds-ingester-sa

        tokenName: rds-ingester-token

      aws:

        roleArn: "arn:aws:iam::<AWS_ACCOUNT_ID>:role/<ROLE_NAME>"

  ... rest of values
```

_you can find the_`roleArn` _value in the summary section of the role console:_

![](https://docs.stackgen.com/assets/images/vl846qVni37gffkrazBtN_1-056b740fc9586ef9f17940c27375175a.png)

:

* * *

### Configurable Values:

**In the**`values.yaml` **file, users can configure**

- `dbInstances` RDS instances to be monitored
- `replicaCount`: Number of pod replicas.
- `serviceAccount`: Specifies the service account details.
- `configMap`: Contains configurable parameters such as Loki API information.
- `image`: Docker image details including the repository, tag, and pull secret.
- `awsCredentialsSecret`: The name of the secret containing AWS credentials.
- `namespace`: Kubernetes namespace for deployment.
- `resources`: Resource requests and limits for the pod.

_Database Instances_: You can define multiple RDS instances under dbInstances with specific identifiers, regions, and log file filters. Customize the labels for each database to categorize your logs effectively.

_Loki Integration_: The chart is configured to push logs to Loki. Credentials for Loki are specified under the `loki.credentials` field. This is crucial for secure and efficient log management.

_Service Account and AWS Role_: A Kubernetes service account linked to an AWS IAM role (rds-ingester-sa) is used for AWS operations.

_Resource Requests and Limits_: Set under resources, these parameters ensure efficient utilization of your cluster's resources.

_Customization Options_: Modify values such as `replicaCount`, `namespace` etc. as per your requirements in a custom `values.yaml`

* * *

## Example `values.yaml` configuration:

```yaml
RDSLogsIngester:

  replicaCount: 1

  namespace: stage

  serviceAccount:

    details:

      name: rds-ingester-sa

      tokenName: rds-ingester-token

    aws:

      roleArn: "arn:aws:iam::<AWS_ACCOUNT_ID>:role/rds-ingester"

  configMap:

    basic:

      name: rds-config

    dbInstances:

      - identifier: rds-test-db-1

        region: us-east-1

        # These labels will be added to the log line before they are sent to the output destination

        labels:

          env: prod

          #change the key (ex, label1) as well

          testlabel: prod

          label2: value2

        # This filter is used to filter the RDS log files that are scraped

        logFileFilter: "slow-query-.*"

      - identifier: rds-test-db

        region: us-east-1

        # These labels will be added to the log line before they are sent to the output destination

        labels:

          env: prod

          testlabel: prod

          label2: value2

        # This filter is used to filter the RDS log files that are scraped

        logFileFilter: "error.*"

    output:

      writeToStdout: "true"

      loki:

        writeToLokiApi: "true"

        host: "<redacted>"

        credentials:

          loki_username: "<username>"

          loki_password: "<password>"

          secretName: loki-remote-write-credentials

  image:

    details:

      repository: registry.devopsnow.io/public/opsverseinc/rds-logs-ingester

      tag: sa-v18

    pull:

      secret: devopsnow-private-docker-reg-crd-rds-ingester

  resources:

    requests:

      memory: "64Mi"

      cpu: "250m"

    limits:

      memory: "128Mi"

      cpu: "500m"
```

* * *

## Deploying the Chart

To deploy the chart, use the following commands:

_Using custom_`values.yaml`:

```shell

helm upgrade --install rds-logs-ingester -n <namespace> --create-namespace <namespace> \

    --repo https://registry.devopsnow.io/chartrepo/public \

    -f rds-ingester-values.yaml
```

_Additional useful helm commands_:

```shell
# Package the chart

helm package [CHART_PATH] --version [VERSION]

# Install the chart

helm install [RELEASE_NAME] [CHART_PATH] --namespace [NAMESPACE]

# Upgrade the chart

helm upgrade [RELEASE_NAME] [CHART_PATH] --namespace [NAMESPACE]

# Rollback the chart

helm rollback [RELEASE_NAME] [REVISION]
```

* * *

## Resources Created by the Chart

The Helm chart creates the following Kubernetes resources:

- Deployment: Manages the lifecycle of the RDS Logs Ingester pods.
- ServiceAccount: Manages identity for processes that run in a Pod.
- ConfigMap: Contains non-confidential data in key-value pairs.
- Secret: Manages sensitive information, such as passwords and tokens.

* * *

## Additional Resources:

- [Configuring Service Account to Assume IAM Role](https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html)
- [Kubernetes Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/service-accounts.html)

* * *

## Conclusion

This Helm chart simplifies the deployment and management of the RDS Logs Ingester in a Kubernetes environment. By adjusting values in the `values.yaml` file, users can tailor the deployment to their specific needs.

* * *

### Screenshots:

- Logs ingested in Loki, as viewed in Grafana.

![](https://docs.stackgen.com/assets/images/uDdiwLpMRHaKr3HY8gs0r_1-a07a90485b409a8a6777a170304bdffa.png)

- [Overview](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#overview)
  - [Key Features:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#key-features)
- [Configuration](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#configuration)
  - [Prerequisites:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#prerequisites)
- [Creating a Role with OIDC Web Identity for Kubernetes Authentication in AWS EKS](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#creating-a-role-with-oidc-web-identity-for-kubernetes-authentication-in-aws-eks)
- [Step 1: Create a Role with OIDC Web Identity](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#step-1-create-a-role-with-oidc-web-identity)
  - [Navigate to IAM](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#navigate-to-iam)
  - [Create Role Flow:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#create-role-flow)
- [Step 2: Attach Custom Policy to the Role](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#step-2-attach-custom-policy-to-the-role)
  - [Attach Custom Inline Policies](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#attach-custom-inline-policies)
- [Step 3: Verify Trust Relationship and Policy](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#step-3-verify-trust-relationship-and-policy)
- [Step 4: Associate Role with Kubernetes Service Account and Configure Chart Values](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#step-4-associate-role-with-kubernetes-service-account-and-configure-chart-values)
  - [Configure Service Account in Kubernetes](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#configure-service-account-in-kubernetes)
  - [Configurable Values:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#configurable-values)
- [Example `values.yaml` configuration:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#example-valuesyaml-configuration)
- [Deploying the Chart](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#deploying-the-chart)
- [Resources Created by the Chart](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#resources-created-by-the-chart)
- [Additional Resources:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#additional-resources)
- [Conclusion](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#conclusion)
  - [Screenshots:](/docs/observenow/integrations/infrastructure/amazon-rds/amazon-rds-logs-ingester#screenshots)
