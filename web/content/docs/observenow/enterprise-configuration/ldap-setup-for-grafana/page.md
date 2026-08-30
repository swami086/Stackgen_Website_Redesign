---
title: "Ldap Setup For Grafana"
product: "observenow"
sourcePath: "/observenow/enterprise-configuration/ldap-setup-for-grafana"
sourceUrl: "https://docs.stackgen.com/observenow/enterprise-configuration/ldap-setup-for-grafana"
status: "ok"
---

info

This section applies only to **StackGen Private SaaS** deployments.

Create a secret in the namespace where the Observability stack is installed using the following example as a reference:

```yaml
apiVersion: v1

kind: secret

metadata:

  name: ldap-config

data:

  ldap.toml: |-

      [[servers]]

      # Ldap server host (specify multiple hosts space separated)

      host = "ldap"

      # Default port is 389 or 636 if use_ssl = true

      port = 389

      # Set to true if ldap server supports TLS

      use_ssl = false

      # Set to true if connect ldap server with STARTTLS pattern (create connection in insecure, then upgrade to secure connection with TLS)

      start_tls = false

      # set to true if you want to skip ssl cert validation

      ssl_skip_verify = false

      # set to the path to your root CA certificate or leave unset to use system defaults

      # root_ca_cert = "/path/to/certificate.crt"

      # Authentication against LDAP servers requiring client certificates

      # client_cert = "/path/to/client.crt"

      # client_key = "/path/to/client.key"

      # Search user bind dn

      bind_dn = "cn=admin,dc=example,dc=org"

      # Search user bind password

      # If the password contains # or ; you have to wrap it with triple quotes. Ex """#password;"""

      bind_password = 'admin'

      # User search filter, for example "(cn=%s)" or "(sAMAccountName=%s)" or "(uid=%s)"

      # Allow login from email or username, example "(|(sAMAccountName=%s)(userPrincipalName=%s))"

      search_filter = "(uid=%s)"

      # An array of base dns to search through

      search_base_dns = ["ou=People,dc=support,dc=example,dc=org"]

      # group_search_filter = "(&(objectClass=posixGroup)(memberUid=%s))"

      # group_search_filter_user_attribute = "distinguishedName"

      # group_search_base_dns = ["ou=groups,dc=grafana,dc=org"]

      # Specify names of the ldap attributes your ldap uses

      [servers.attributes]

      name = "givenName"

      surname = "sn"

      username = "cn"

      member_of = "memberOf"

      email =  "email"
```

To configure StackGen ObserveNow Grafana to use this new Azure AD Config, login to the [StackGen Admin Console](https://console.opsverse.io/), navigate to your ObserveNow stack, enable LDAP Authentication, and add the name of the secret which you created in the previous steps.

danger

You can also work with the **StackGen Support Team** to configure your Grafana instance to use LDAP for authentication or if you have any other customization requirements.
