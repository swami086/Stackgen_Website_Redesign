---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/aws"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/aws"
status: "ok"
---

Connect Aiden with your AWS infrastructure to get intelligent assistance with cloud operations, cost management, and resource optimization. Once enabled, Aiden can help you manage your AWS resources as naturally as discussing them with a cloud architect.

### Integration Capabilities

With AWS integration, Aiden can:

- Monitor and analyse cloud resource usage and costs.
- Manage EC2 instances and other compute resources.
- Track S3 bucket creation and configuration.
- Review IAM policies and permissions.
- Investigate CloudWatch metrics and logs.
- Analyze AWS billing and provide cost insights.

### Create Custom Skills

On top of the several out of the box capabilities, you can create custom skills to add additional capabilities. Here are some examples:

- Check your AWS account for a set of compliance policies.
- Setup a developer self service task to create a set of AWS resources.
- Analyze and debug connectivity issues following a specific set of checks.

Check out the [Skills](/docs/aiden/1.0/skills) page for more information.

## Enable AWS Integration

Aiden supports two ways to authenticate with AWS. Choose the one that matches your setup:

| Integration Type | When to use |
| --- | --- |
| **AWS Assume Role** _(Recommended)_ | You want Aiden to assume an IAM role — more secure, no long-lived credentials. |
| **Access Keys** | You prefer to authenticate using an IAM user's Access Key ID and Secret Access Key. |

Select your integration type below and follow the corresponding steps.

* * *

### AWS Assume Role (Recommended) [](/docs/aiden/1.0/integrations/aws#aws-assume-role-recommended%20%22Direct%20link%20to%20AWS%20Assume%20Role%20(Recommended)")

#### AWS Assume Role Configuration for Private Aiden Deployments

##### Step 1: Create an IAM Role for Kubernetes ServiceAccount (IRSA) [](/docs/aiden/1.0/integrations/aws#step-1-create-an-iam-role-for-kubernetes-serviceaccount-irsa%20%22Direct%20link%20to%20Step%201:%20Create%20an%20IAM%20Role%20for%20Kubernetes%20ServiceAccount%20(IRSA)")

**1.A — Attach permissions to the IRSA role**

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
        "sts:AssumeRole",\
\
        "sts:AssumeRoleWithWebIdentity",\
\
        "sts:TagSession"\
\
      ],\
\
      "Resource": "*"\
\
    }\
\
  ]

}
```

**1.B — Configure trust relationship for IRSA**

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
        "Federated": "arn:aws:iam::<yourAccount>:oidc-provider/oidc.eks.<region>.amazonaws.com/id/<yourEKSClusterIDProvider>"\
\
      },\
\
      "Action": [\
\
        "sts:AssumeRoleWithWebIdentity",\
\
        "sts:TagSession"\
\
      ],\
\
      "Condition": {\
\
        "StringLike": {\
\
          "oidc.eks.<region>.amazonaws.com/id/<yourEKSClusterIDProvider>:sub": "system:serviceaccount:*:*"\
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

##### Step 2: Create the Target IAM Role Aiden Will Access

**2.A — Configure trust relationship (trusted by IRSA role)**

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
        "AWS": "<ROLE-ARN-FROM-STEP-1>"\
\
      },\
\
      "Action": [\
\
        "sts:AssumeRole",\
\
        "sts:TagSession"\
\
      ]\
\
    }\
\
  ]

}
```

**2.B — Attach required permissions to this role**

Example: Allow listing S3 buckets only

```json
{

  "Version": "2012-10-17",

  "Statement": [\
\
    {\
\
      "Sid": "ListAllS3BucketsOnly",\
\
      "Effect": "Allow",\
\
      "Action": "s3:ListAllMyBuckets",\
\
      "Resource": "*"\
\
    }\
\
  ]

}
```

note

Copy the Role ARN created in this step — you will need it in Step 3.

##### Step 3: Configure Aiden Integration

1. Navigate to **Aiden → Integrations**.
2. Select **AWS Assume Role**.
3. Paste the Role ARN from Step 2.
4. Click **Validate and Save**.

* * *

#### SaaS Usage (Important) [](/docs/aiden/1.0/integrations/aws#saas-usage-important%20%22Direct%20link%20to%20SaaS%20Usage%20(Important)")

Using Aiden as SaaS?

If you are using Aiden as a **SaaS** deployment, **skip Step 1 entirely**. No IRSA role is required and no EKS OIDC configuration is needed.

For Step 2, configure the trust policy of your target role to trust Aiden's SaaS role directly:

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
        "AWS": "arn:aws:iam::205376326832:role/prod-aiden-pod-role"\
\
      },\
\
      "Action": [\
\
        "sts:AssumeRole",\
\
        "sts:TagSession"\
\
      ]\
\
    }\
\
  ]

}
```

That's it — Aiden will now assume this role directly from the SaaS environment.

* * *

### Access Keys

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the AWS Integration card.

3. Enter the integration configuration parameters:



![aws integration](https://docs.stackgen.com/assets/images/integration-cd3003cf934c9cc511d51f06799c2954.png)










   - **Access Key ID**: This is your public identifier for the AWS account or IAM user. You can find it via your AWS IAM Console under **Security Credentials > Access Keys**. Check out AWS documentation on how to [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) and learn about [Security Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)



     **Security Best Practices**





     - Create a dedicated IAM user for Aiden with minimum required permissions. We recommend starting off with the [ReadOnlyAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html) AWS managed policy.
     - Regularly rotate access credentials.
     - Monitor Aiden's AWS activities through [**CloudTrail**](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html).
     - Ensure your AWS credentials have appropriate permissions for the tasks you want Aiden to perform.

   - **Secret Access Key**: This is your private key that acts like a password. Check out the [AWS blog](https://aws.amazon.com/blogs/security/how-to-find-update-access-keys-password-mfa-aws-management-console/) to learn more.

   - **Create prebuilt skills**: Aiden supports pre-built skills for AWS integration. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.



     ![Pre-built](https://docs.stackgen.com/assets/images/awsprebuiltskills-b67525aa13e28a8d92f22eeaec9a5729.png)
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Show me S3 buckets created in the last 48 hours.
- Are there any public S3 buckets?
- What's driving our AWS costs this month compared to last?
- Scale down the dev environment EC2 instances.
- Review security group configurations in prod.
- Are there any overly permissive security groups in us east?
- For my new project, provision all necessary the dev and QA infra.

## Additional References

- [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
- [How to quickly find and update your access keys, password, and MFA setting using the AWS Management Console](https://aws.amazon.com/blogs/security/how-to-find-update-access-keys-password-mfa-aws-management-console/)
- [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [ReadOnlyAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html)
- [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey)
- [What Is AWS CloudTrail?](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)
- [Policies and permissions in AWS Identity and Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)

- [Integration Capabilities](/docs/aiden/1.0/integrations/aws#integration-capabilities)
- [Create Custom Skills](/docs/aiden/1.0/integrations/aws#create-custom-skills)
- [Enable AWS Integration](/docs/aiden/1.0/integrations/aws#enable-aws-integration)
  - [AWS Assume Role (Recommended)](/docs/aiden/1.0/integrations/aws#aws-assume-role-recommended)
  - [Access Keys](/docs/aiden/1.0/integrations/aws#access-keys)
  - [Sample Prompts](/docs/aiden/1.0/integrations/aws#sample-prompts)
