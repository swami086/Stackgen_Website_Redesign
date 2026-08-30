---
title: "Enable PostgreSQL Integration"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/postgresql"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/postgresql"
status: "ok"
---

Connect Aiden with your PostgreSQL databases for intelligent assistance with query optimization. Once enabled, Aiden becomes your database expert, helping you analyze and optimize your PostgreSQL queries through natural language conversations.

## Enable PostgreSQL Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the PostgreSQL Integration card.

3. Enter the integration configuration parameters:



![postgresql](https://docs.stackgen.com/assets/images/postgresql-024c0c7588c2c2c9f323b8e06b0fcd8f.png)










   - **Database Name**: The name of the specific PostgreSQL database you want to connect to.
   - **Username**: The username authorized to access the PostgreSQL database.
   - **Password**: The password associated with the username entered above.
   - **Host**: The server address where your PostgreSQL database is hosted. It can be a domain name or IP address. **For example**:

     - **Local**: `localhost` or `127.0.0.1`
     - **Cloud**: `db-instance-name.region.rds.amazonaws.com`
   - **Create prebuilt skills**: Aiden supports pre-built skills for PostgreSQL integration. You can select the **Create prebuilt skills** checkbox if you want to enable these pre-built skills.
4. Click **Save** to enable the integration.


## Additional References

- [Database Connection Control Functions](https://www.postgresql.org/docs/current/libpq-connect.html)
- [Environment Variables](https://www.postgresql.org/docs/current/libpq-envars.html)
- [The Password File](https://www.postgresql.org/docs/current/libpq-pgpass.html)
