## Lab 7 · Connect an LDAP directory and delegate authentication { #lab-7 }

Use a supported test LDAP server, a supported Windows or Linux LDAP agent host, and an Okta org that exposes **Add LDAP Directory**. Prepare a trusted LDAP over TLS endpoint, a scoped bind identity, a test directory subtree containing one group, and two standard test users. Use one user for import and leave the other for JIT. This exercise uses an LDAP directory integration and its agent.

### 1. Install and configure the LDAP agent

1. In **Directory → Directory Integrations → Add Directory → Add LDAP Directory**, select **Set Up LDAP**. On the agent host use the platform-specific installer from Okta. Follow the documented LDAPS trust setup for that host before enabling the SSL connection option.
2. Enter the LDAP server endpoint, root DN, bind DN, and bind password. Register the agent to the test Okta org using the authorized registration identity. Verify the integration and the agent status.
3. In the LDAP integration settings, choose the actual LDAP provider and review its schema defaults. Enter the user and group search bases and filters. Verify the immutable object identifier, username or UID mapping, group member attribute, and that the bind identity can read those attributes.
4. Test the configuration with the import user. If the connection succeeds and no user appears, inspect the search base, object class, filters and required identifier before changing credential settings.

### 2. Import and verify LDAP password validation

1. Under **Provisioning → To Okta**, review the LDAP username format and matching settings. Run a test import, confirm the intended match or new user, and activate as needed. Verify the user-to-directory link and stored profile.
2. Open **Security → Delegated Authentication → LDAP**. Edit and enable delegated authentication to LDAP. Run **Test Delegated Authentication** with the import user's LDAP credentials and save the setting. Use a fresh browser session to test actual sign-in and inspect the user and outcome in the System Log.
3. With the second user still absent from Okta, enable **Create and update users on login** for the LDAP integration where available. Sign in as that user, then check the new Okta user and linked directory account. Restore the JIT and recovery options after testing.
4. Compare an LDAP connection failure with a valid connection that returns no matching entry. Use the LDAP agent log, configured search base and filters, and System Log to identify the first failing stage. For recovery, check the Password authenticator and provider support before testing an actual reset. LDAP self-service unlock in Okta does not unlock the on-premises LDAP account.

[LDAP prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-prerequisites.htm) · [Install LDAP agent and set up LDAPS](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-manage-integration.htm) · [Enable delegated authentication for LDAP](https://help.okta.com/oie/en-us/content/topics/security/security_authentication.htm) · [LDAP logs](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-log-info.htm)
