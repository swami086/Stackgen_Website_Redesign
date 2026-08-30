---
title: "Integration Capabilities"
product: "aiden"
sourcePath: "/aiden/1.0/integrations/elasticsearch"
sourceUrl: "https://docs.stackgen.com/aiden/1.0/integrations/elasticsearch"
status: "ok"
---

Connect Aiden with your Elasticsearch service to get intelligent assistance with real-time search, analysis, and visualization of your data. Once enabled, Aiden can help you fetch targeted logs, perform log analytics, and troubleshoot the root cause through natural conversations.

## Integration Capabilities

With Elasticsearch, Aiden can:

- Fetch your Elasticsearch indices and their mappings.
- Fetch and summarize targeted logs.
- Perform log analytics.

## Enable Elasticsearch Integration

### Create your Elasticsearch API Token

1. Open your terminal (macOS/Linux) or Command Prompt/PowerShell (Windows).

2. Make sure [curl](https://curl.se/download.html) is installed (it usually is by default).

3. Run the below command as-is, replacing the placeholders with your actual credentials.





```curl
curl -u "<es_username>:<es_password>" -X POST "https://<your_es_url>/_security/api_key" -H "Content-Type: application/json" -d'

     {

           "name": "opsverse-aiden-es-key",

           "role_descriptors": {

                 "aiden_read_only": {

                       "cluster": ["monitor"],

                       "index": [\
\
                     {\
\
                           "names": ["logs-*"],\
\
                           "privileges": ["read", "view_index_metadata"]\
\
                     }\
\
                ]

            }

         }

     }
```











note





If you’re testing against a self-signed endpoint, prefer installing/trusting the CA instead of using `-k`.





Replace the placeholders with your credentials:



| Placeholder | Description | Example |
| --- | --- | --- |
| `<es_username>` | Your Elasticsearch username. | `elastic` |
| `<es_password>` | Your Elasticsearch password. | `MyS3cretP@ss` |
| `<your_es_url>` | Your cluster endpoint. | `https://localhost:9200` |


The response to the above command will be in the following format:





```json
{

         "id":"this_is_a_dummy_id",

         "name":"opsverse-aiden-es-key",

         "api_key":"<generated_api_key>",

         "encoded":"<base64_endcode_key>"

}
```











note





Make sure to use the `base 64` encoded api key while configuring the integration.


### Steps to Enable Elasticsearch Integration

Follow these steps to enable the Integration:

1. From the Aiden home page, click **Integrations** from the navigation panel to the left.

2. Hover and click the **Activate** button on the Elasticsearch Integration card.

3. Enter the integration configuration parameters:



![elasticsearch](https://docs.stackgen.com/assets/images/elasticsearch-76350cb8dde72ba372a9c6062b067800.png)










   - **URL**: The endpoint of your Elasticsearch cluster.

     For example: `https://search-your-cluster.region.elastic-cloud.com:9243`

   - **API Key**: The API key used to authenticate with your Elasticsearch cluster.
     - Follow the instructions provided in the [section](/docs/aiden/1.0/integrations/elasticsearch#create-your-elasticsearch-api-token) above to generate the key.
4. Click **Save** to enable the integration.


### Sample Prompts

Here are a few sample prompts that you can use:

- Fetch all the error-level logs in the past 2 hours.
- Can you tell me how many warn-level logs were found on 9th May?
- Summarize any errors from the logs of the `vm-agent` pod present in the observe namespace.

## Limitations

The Elasticsearch integration can process up to 1,000 log lines at a time.

## Additional References

- [Elasticsearch API Key Documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key)

- [Integration Capabilities](/docs/aiden/1.0/integrations/elasticsearch#integration-capabilities)
- [Enable Elasticsearch Integration](/docs/aiden/1.0/integrations/elasticsearch#enable-elasticsearch-integration)
  - [Create your Elasticsearch API Token](/docs/aiden/1.0/integrations/elasticsearch#create-your-elasticsearch-api-token)
  - [Steps to Enable Elasticsearch Integration](/docs/aiden/1.0/integrations/elasticsearch#steps-to-enable-elasticsearch-integration)
  - [Sample Prompts](/docs/aiden/1.0/integrations/elasticsearch#sample-prompts)
