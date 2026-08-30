---
title: "Before You Begin"
product: "stackgen"
sourcePath: "/docs/support-and-kb/how-tos/awssso"
sourceUrl: "https://docs.stackgen.com/docs/support-and-kb/how-tos/awssso"
status: "ok"
---

This guide walks you through configuring **AWS Identity Center** to integrate with StackGen using SAML. By completing these steps, you will be able to sign in to StackGen using your AWS credentials.

## Before You Begin

Click to view

Before starting, make sure you have:

- **AWS Identity Center** access with permissions to create and manage custom applications.
- A valid StackGen organization domain (e.g., `acme.cloud.stackgen.com`).
- Access to **StackGen Admin Console** or the ability to share connection details with the [StackGen support](mailto:support@stackgen.com) team.
- Basic understanding of **SAML** authentication concepts (optional but helpful).

## Create a Custom Application in AWS Identity Center

Click to view

To connect AWS and StackGen, you first need to set up a custom **SAML 2.0** application in AWS Identity Center. This application defines how AWS communicates with StackGen during authentication.

1. Sign in to the **AWS Identity Center** Console.
2. Navigate to the **Applications** section.
3. Click **Add a new application >** choose **Custom SAML 2.0 application**.
4. Enter the following details:
   - **Application Name**: StackGen (or a descriptive name of your choice).

   - **Application Start URL**:





     ```bash
     https://<your-domain>.cloud.stackgen.com
     ```








     - **Example**: If your domain is acme, use [https://acme.cloud.stackgen.com](https://acme.cloud.stackgen.com/).
   - **Application ACS URL**:





     ```bash
     https://<your-domain>.cloud.stackgen.com/auth/callback
     ```

   - **Application SAML Audience**:





     ```bash
     stackgen-authenticator
     ```
5. Copy the **Application Sign-in URL**. You’ll need this later.
6. Download the **IAM Identity Center Certificate**.

## Configure SAML Attributes

Click to view

Next, you’ll map AWS user attributes so StackGen can identify and authenticate your users.

1. Under application’s settings, navigate to **Attribute mappings**.

2. Map the following attributes:





```bash
Email → ${user:email}
```


## Share Connection Details with StackGen

Click to view

Finally, provide StackGen with the details required to complete the integration. Send the following information to the [StackGen support](mailto:support@stackgen.com) team.:

- The **IAM Identity Center Sign-in URL** that you copied.
- The **IAM Identity Center Certificate** you downloaded.

Once StackGen configures these details, your **AWS SAML** integration will be ready. Your users can now sign in through **AWS Identity Center** to access StackGen.

## Next Steps

Click to view

Once your AWS SAML integration is set up:

1. Assign users or groups in AWS Identity Center:
1. Navigate to your custom StackGen application in AWS Identity Center.
2. Assign the appropriate users or groups who should have access to StackGen.
2. Test the login flow:
1. Open the **Application Start URL**:





      ```bash
      https://<your-domain>.cloud.stackgen.com
      ```

2. Try signing in with a user assigned to the application in AWS Identity Center.
3. Verify StackGen access
1. Ensure the user lands on the StackGen **Home** page after authentication.
2. Check that the email matches the attribute mapping you configured.
4. Roll out the authentication method to your team:
1. Assign additional users or groups in AWS Identity Center as needed.
2. Communicate the new login flow to your organization.

## Troubleshooting

Click to view

If something doesn’t work as expected, check the following:

- **Certificate mismatch error**: Ensure you shared the latest IAM Identity Center certificate with StackGen.

- **Login loop**: Verify the **ACS URL** exactly matches the format:





```bash
https://<your-domain>.cloud.stackgen.com/auth/callback
```

- **Invalid audience error**: Confirm that the **SAML Audience** is set to `stackgen-authenticator`.

- **User not found**: Make sure the **Email** attribute is correctly mapped to `${user:email}`.


If issues persist, contact [StackGen support](mailto:support@stackgen.com) with a screenshot of the error and your application configuration details.
