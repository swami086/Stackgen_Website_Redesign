---
title: "Overview"
product: "stackgen"
sourcePath: "/docs/integrations/backstage-userguide"
sourceUrl: "https://docs.stackgen.com/docs/integrations/backstage-userguide"
status: "ok"
---

## Overview

The StackGen-Backstage user interface consists of three subtabs:

![Homepage](https://docs.stackgen.com/assets/images/backstagehome-13ab79a4161ca230575d090a05fb54db.png)

1. **Systems**: lists all available systems with key metadata. You’ll notice a **Sync** button next to the systems you’ve configured, used to create or update an appStack.

2. **Components and Resources**: While components are equivalent to a compute resource in StackGen (for example, AWS Lambda or HELM workload, etc.), resources on Backstage represent data storage entities. (for example, SQL database, s3 bucket, etc).

3. **Mappings**: you can map a resource type in Backstage to its equivalent in StackGen.



note





   - Currently, you cannot add more than one system to your integration. This is preconfigured for you by our Support Team when you request access to the StackGen-Backstage plugin.
   - You can only map your resource types to StackGen-supported ones. Currently, you cannot sync custom modules using the StackGen-Backstage integration.

The processes of syncing and creating an appStack on StackGen consist of the workflows listed below.

1. [**IaC from Backstage Systems**](/docs/stackgen/integrations/backstage-userguide#iac-from-backstage-systems): Use this feature when you have systems defined within backstage that consist of multiple components and resources.
   - **User Action**: Catalog components (e.g., microservices, libraries) and resources (e.g., databases, caches) in the Backstage System.

   - **System Support**: Backstage integration maps these entities to StackGen’s data model.



     note





     Defining a system is not a strict requirement in Backstage. It's possible that you may not have any systems configured. You can still use the **Components** and **Resources** tab to select the desired items and sync them with StackGen.
2. [**IaC from Backstage Cataloged Components and Resources**](/docs/stackgen/integrations/backstage-userguide#iac-from-cataloged-components-and-resources-in-backstage): Use when you have not defined a system but have a catalog of Components and Resources.
   - **User Action**: Select components or resources within Backstage.
   - **System Action**: StackGen auto-generates Infrastructure as Code (IaC) based on mappings from catalogued items to cloud resource templates.

Let’s learn about each method in detail.

## Prerequisites

- Before you begin, you need to install the [StackGen-Backstage Plugin](/docs/stackgen/integrations/backstage-plugin).
- Before generating an appStack in StackGen from Backstage, you’ll need to create and [configure a mapping](/docs/stackgen/integrations/backstage-userguide#create-a-mapping-between-backstage-and-stackgen-specs).

## Create a Mapping Between Backstage and StackGen Specs

Click to view

Mappings help you identify an equivalent of your backstage specification in StackGen. Follow these steps to create a mapping:

### Create a Mapping

1. From the plugin home page, navigate to **Mappings >** click **Create Mapping**.

2. Enter the mapping fields as follows:


![Mapping](https://docs.stackgen.com/assets/images/mapping-backstage-4b0038bf41ad8fd89fccae2673e1c606.png)










1. **Cloud Provider**: select the cloud provider for which you want to create an appStack. You can choose from the following list:


      - AWS
      - GCP
      - Azure
      - Civo

note

Currently, you can only create appStacks using StackGen-supported cloud providers.

2. **Mapping Name**: Enter a unique name for your mapping.

3. **Backstage Spec Type → StackGen Resource Type drop-downs**: Map each backstage type, for example, a `database` or a `service`, to a corresponding StackGen Resource, for example, e.g., `aws_rds` or `gcp_sql`.

4. You can create as many mappings as required by clicking **\+ ADD**.
3. Click **Create** to save your mapping.


### Modify a Mapping

You can view the list of your mappings under the **Mappings** tab.

- **To edit a mapping**, click the pencil **✎** icon next to the mapping of your choice.

- **To delete a mapping**:


1. Click the bin **🗑️** icon next to the mapping of your choice.
2. A **Delete Mapping** dialog will pop up.
3. Click **Delete**.

note

You cannot delete default mappings as they are required, but you can edit the values.

### Thinking of Updating a Mapping? Here’s What It Means for Your appStack

You can expect the following behaviour when you modify a mapping:

- **appStacks**: Any changes to your mapping will not get synced with StackGen automatically. You will need to manually sync your changes by updating an appStack.
- **Systems**: Only the components and resources that have a mapping will get synced with StackGen.
- **Components and Resources**: Based on your mapping, StackGen will overwrite the existing appStack with the components and resources you have added or deleted.

## IaC from Backstage Systems

Click to view

### Create an appStack

Before you create an appStack from your Backstage systems, you’ll need to create and configure the mapping between [Backstage and StackGen](/docs/stackgen/integrations/backstage-userguide#create-a-mapping-between-backstage-and-stackgen-specs).

1. From the StackGen plugin homepage, navigate to **Systems > Sync**.

2. From the **Sync System** dialog, click **Create appStack**.

3. Enter the following details:
1. **appStack Name**: Enter a unique name for your appStack.
2. **Cloud Provider**: Select the provider for your appStack from the dropdown.
3. **Mappings**: Select the mapping from the list of available mappings you’ve configured in Backstage for the selected cloud provider.
4. **Team**: Select the team where you want to create the appStack.
      You’ll notice that the system’s components and resources populate automatically.
4. Click **Create** to finish creating the appStack.



![Create appStack from Systems](https://docs.stackgen.com/assets/images/backstagecreatefromsystems-1632339e5dc60824582bb08d7017a607.png)

5. Click **View** to review your appStack on StackGen.


### Update an appStack

note

- With appStack updates, you can only update the Mapping. You will not be able to modify the appStack Name and the Cloud Provider.
- StackGen will not create new versions of your appStack, unlike the way it does on the cloud. Instead, it will overwrite your existing appStack based on the updated mappings.
- You can only update the **Mapping**.

1. From the StackGen plugin homepage, navigate to **Systems > Sync**.
2. From the **Sync System** dialog, click **Update appStack**.
3. Select your **Team** and the corresponding **appStack** from the respective dropdowns.
4. Click **Update** to apply your changes.

![Update appStacks](https://docs.stackgen.com/assets/images/backstageupdateappstacksystems-4c448db804cf3f39728543ed2cba9a18.png)

5. Click **View** to review your appStack on StackGen.

## IaC from Cataloged Components and Resources in Backstage

Click to view

### Create an appStack

Before you create an appStack from your Backstage systems, you’ll need to create and configure the mapping between [Backstage and StackGen](/docs/stackgen/integrations/backstage-userguide#create-a-mapping-between-backstage-and-stackgen-specs).

1. From the StackGen plugin homepage, navigate to **Components And Resources > Sync**.
2. Select the **Components and Resources** that you want to sync with StackGen from the list.
3. From the **Sync System** dialog, click **Create appStack**.
4. Enter the following details:
1. **appStack Name**: Enter a unique name for your appStack.
2. **Cloud Provider**: Select the provider for your appStack from the dropdown.
3. **Mappings**: Select the mapping from the list of available mappings you’ve configured in Backstage for the selected cloud provider.
4. **Team**: Select the team where you want to create the appStack.
      You’ll notice that the selected components and resources are listed automatically.
5. Click **Create** to finish creating the appStack.

![Create appStack from Components and Resources](https://docs.stackgen.com/assets/images/backstagecreateappstackcomp-e90cf8e8090688cdf3bcd77ed283803e.png)

6. Click **View** to review your appStack on StackGen.

### Update an appStack

note

- With appStack updates, you can only update the Mapping. You will not be able to modify the appStack Name and the Cloud Provider.
- StackGen will not create new versions of your appStack, unlike the way it does on the cloud. Instead, it will overwrite your existing appStack based on the updated mappings.
- You can only update the **Mapping**.

1. From the StackGen plugin homepage, navigate to **Systems > Sync**.

2. From the **Sync System** dialog, click **Update appStack**.

3. Select your **Team** and the corresponding appStack from the respective dropdowns.

4. Click **Update** to apply your changes.



![Update appStack from Components and Resources](https://docs.stackgen.com/assets/images/backstageupdatecomponent-e60da582c6ce28da180ede06ad28f39c.png)

5. Click **View** to review your appStack on StackGen.


- [Overview](/docs/stackgen/integrations/backstage-userguide#overview)
- [Prerequisites](/docs/stackgen/integrations/backstage-userguide#prerequisites)
- [Create a Mapping Between Backstage and StackGen Specs](/docs/stackgen/integrations/backstage-userguide#create-a-mapping-between-backstage-and-stackgen-specs)
  - [Create a Mapping](/docs/stackgen/integrations/backstage-userguide#create-a-mapping)
  - [Modify a Mapping](/docs/stackgen/integrations/backstage-userguide#modify-a-mapping)
  - [Thinking of Updating a Mapping? Here’s What It Means for Your appStack](/docs/stackgen/integrations/backstage-userguide#thinking-of-updating-a-mapping-heres-what-it-means-for-your-appstack)
- [IaC from Backstage Systems](/docs/stackgen/integrations/backstage-userguide#iac-from-backstage-systems)
  - [Create an appStack](/docs/stackgen/integrations/backstage-userguide#create-an-appstack)
  - [Update an appStack](/docs/stackgen/integrations/backstage-userguide#update-an-appstack)
- [IaC from Cataloged Components and Resources in Backstage](/docs/stackgen/integrations/backstage-userguide#iac-from-cataloged-components-and-resources-in-backstage)
  - [Create an appStack](/docs/stackgen/integrations/backstage-userguide#create-an-appstack-1)
  - [Update an appStack](/docs/stackgen/integrations/backstage-userguide#update-an-appstack-1)
