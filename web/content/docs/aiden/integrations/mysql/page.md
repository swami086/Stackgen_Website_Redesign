---
title: "Enable MySQL Integration"
product: "aiden"
sourcePath: "/aiden/integrations/mysql"
sourceUrl: "https://docs.stackgen.com/aiden/integrations/mysql"
status: "ok"
---

This unversioned path redirects to the Aiden 1.0 documentation. See the [Aiden 1.0 MySQL integration](/docs/aiden/1.0/integrations/mysql) page.

Connect Aiden with your MySQL databases for intelligent assistance with query optimization. Once enabled, Aiden becomes your database expert, helping you analyze and optimize your MySQL queries through natural language conversations.

## Enable MySQL Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the MySQL Integration card.

3. Enter the integration configuration parameters:



![mysql](https://docs.stackgen.com/assets/images/mysql-b6baa873a2dd28c317af65fa6f3b00ad.png)










   - **Database Name**: This is the name of the specific database you want your application or integration to connect to inside the MySQL server. Think of the MySQL server as a container that can hold many databases. Each database can contain multiple tables (like spreadsheets).You must specify which database you want to use.

     **For example**: If your MySQL server hosts databases like `terraform_state`, `app_config`, and `metrics_store`, and your IaC setup needs to store Terraform state files, you might enter the **Database Name**: `terraform_state`

   - **Username**: This is the MySQL user account that has permission to access the database.

   - **Password**: This is the password for the MySQL username you provided.

   - **Host**: This is the address of the MySQL server where your database lives.

     For example:
     - **Local**: `localhost` or `127.0.0.1`
     - **Cloud**: `db-instance-name.region.rds.amazonaws.com`
   - **Create prebuilt skills**: Aiden supports pre-built skills for MySQL integration. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.
4. Click **Save** to enable the integration.


## Additional References

- [Connecting to the MySQL Server Using Command Options](https://dev.mysql.com/doc/refman/8.0/en/connecting.html)
- [End-User Guidelines for Password Security](https://dev.mysql.com/doc/refman/8.0/en/password-security-user.html)
- [Command Options for Connecting to the Server](https://dev.mysql.com/doc/refman/8.0/en/connection-options.html)
- [Connecting to your MySQL DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToInstance.html)
