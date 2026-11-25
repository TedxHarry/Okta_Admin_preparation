## Lab 7 · Connect an LDAP directory and delegate authentication { #lab-7 }

Use a supported test LDAP server, a supported Windows or Linux LDAP agent host, and an Okta org that exposes **Add LDAP Directory**. Prepare a trusted LDAP over TLS endpoint, a scoped bind identity, a test directory subtree containing one group, and one standard test user for import. Create a second user only after completing the final import, for the JIT test. This exercise uses an LDAP directory integration and its agent.

### 1. Install and configure the LDAP agent

1. In **Directory → Directory Integrations → Add Directory → Add LDAP Directory**, select **Set Up LDAP**. On the agent host use the platform-specific installer from Okta. Follow the documented LDAPS trust setup for that host before enabling the SSL connection option.
2. Enter the LDAP server endpoint, root DN, bind DN, and bind password. Register the agent to the test Okta org using the authorized registration identity. Verify the integration and the agent status.
3. In **Directory → Directory Integrations**, open the LDAP agent entry marked **Not yet configured**. Choose the provider that matches your directory. Okta fills in provider defaults, which you should verify against your server. Once the configured integration is in use, changing providers requires a new integration.
4. For a concrete walkthrough, use the documented **OpenLDAP** provider with the layout below. The hostname and DNs are examples. Use them only if your test directory was prepared with that layout. The bind user's DN and password must match your server.

| Setting | OpenLDAP lab value | What it controls |
| --- | --- | --- |
| LDAP provider | OpenLDAP | Provider-specific schema defaults. |
| Server and TLS | `ldap.lab.example:636`, with SSL enabled | The test server endpoint. The agent must trust its certificate. |
| Root DN and bind DN | `dc=lab,dc=example` and `cn=okta-bind,ou=service,dc=lab,dc=example` | The directory root and the scoped account that reads the required entries. |
| User search base and filter | `ou=People,dc=lab,dc=example` and `(objectClass=inetOrgPerson)` | The subtree and object class used to find the test users. |
| Group search base and filter | `ou=Groups,dc=lab,dc=example` and `(objectClass=groupOfUniqueNames)` | The subtree and object class used to find the test group. |
| Group member attribute | `uniqueMember` | Contains a member's full DN. Create the group with the import user's DN in this attribute. |
| Unique identifier and DN attributes | `entryUUID` and `entryDN` | The stable object identifier and its directory name. Confirm the agent can read the identifier. |

Enter the import user in **Example username** and choose **Test Configuration**. Verify the returned user's DN and the expected group, then save. If the agent connects but finds no user, check the user search base, object class filter, and bind access to the unique identifier. [OpenLDAP provider reference](https://help.okta.com/oie/en-us/content/topics/directory/ldap-openldap.htm) · [Okta screenshots for Test Configuration](https://support.okta.com/help/s/article/How-to-Determine-Required-Attributes-for-LDAP-Object-Class?language=en_US)

### 2. Import and verify LDAP password validation

1. Under **Provisioning → To Okta**, record the original schedule, delegated authentication, and JIT settings. Keep scheduled imports off during this comparison. Review the LDAP username format and matching settings, then run a test import, confirm the intended match or new user, and activate as needed. Verify the user-to-directory link and stored profile.
2. Open **Security → Delegated Authentication → LDAP**. Edit and enable delegated authentication to LDAP. Run **Test Delegated Authentication** with the import user's LDAP credentials and save the setting. The LDAP delegated authentication setting is under **Security**. Perform this comparison in the isolated org if other LDAP integrations share that setting. Use a fresh browser session to test actual sign-in and inspect the user and outcome in the System Log.
3. After the final import finishes, create the second LDAP user. Verify they are absent from **Directory → People**. Enable **Create and update users on login** for the LDAP integration where available. Sign in as that user, then check the new Okta user and linked directory account. Restore the original schedule, delegated authentication, JIT, and any recovery settings changed during testing.
4. Compare an LDAP connection failure with a valid connection that returns no matching entry. Use the LDAP agent log, configured search base and filters, and System Log to identify the first failing stage. For recovery, check the Password authenticator and provider support before testing an actual reset. LDAP self-service unlock in Okta does not unlock the on-premises LDAP account.

[LDAP prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-prerequisites.htm) · [Install LDAP agent and set up LDAPS](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-manage-integration.htm) · [Enable delegated authentication for LDAP](https://help.okta.com/oie/en-us/content/topics/security/security_authentication.htm) · [LDAP logs](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-log-info.htm)
