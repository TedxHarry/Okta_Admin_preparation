# Lesson 7 · Connect LDAP and delegate LDAP authentication

=== "Theory"

    **Lightweight Directory Access Protocol (LDAP)** is a protocol used to query and work with a directory. The **Okta LDAP Agent** connects to an existing LDAP server so Okta can import directory data and delegate password validation. The **LDAP Interface** is an Okta cloud endpoint that accepts LDAP requests from applications and uses Okta Universal Directory for authentication.

    | Product component | Where the request goes |
    | --- | --- |
    | AD agent | Okta → Windows agent → AD domain controller. |
    | LDAP agent | Okta → LDAP agent → existing LDAP directory. |
    | LDAP Interface | LDAP-speaking app → Okta cloud LDAP endpoint → Okta Universal Directory. |

    [LDAP agent capabilities](https://help.okta.com/oie/en-us/content/topics/directory/ldap-feature-support.htm) · [LDAP Interface](https://help.okta.com/oie/en-us/content/topics/directory/ldap-interface-main.htm)

    ## Understand what the agent searches

    A **distinguished name (DN)** specifies an entry's location in the directory tree. The **root or base DN** sets where a search starts. The **bind DN** is the identity the agent uses to connect and look up directory entries. A **filter** chooses which entries count as users or groups below the configured search base. Schema settings tell Okta how to identify each entry and read group members. The unique identifier attribute should hold a stable, unique value. LDAP over TLS (**LDAPS**) encrypts the connection between the agent and the LDAP server and requires a certificate the agent trusts.

    Register the agent to the intended Okta org and configure the integration for the actual LDAP provider. Validate user and group search bases, filters, identifier, and mapped fields. Confirm the bind identity can read the intended entries. An agent may connect while an overly restrictive base or filter returns no users.

    [Install the LDAP agent](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-install-configure.htm) · [Configure LDAP integration settings](https://help.okta.com/oie/en-us/content/topics/directory/ldap-configure-integration-settings.htm) · [LDAP imports and matching](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-configure-ldap-import-settings.htm)

    ## Test delegated authentication

    Open **Security → Delegated Authentication → LDAP** and enable LDAP delegated authentication. Use **Test Delegated Authentication** with a non-admin directory user to verify credentials. Then sign in as that linked user in a separate browser session and inspect System Log. To enable LDAP JIT, select **Create and update users on login** under the directory integration's **Provisioning → To Okta** settings. Enable delegated authentication for this flow. If the Okta username is produced by a custom expression, LDAP JIT looks up the account using the applicable UID or email format. Okta lists instance-level JIT and delegated authentication as AD capabilities that the LDAP integration lacks. LDAP import scope uses search bases and filters. Password-change and recovery support depends on the LDAP distribution and agent configuration.

    [Enable LDAP delegated authentication](https://help.okta.com/oie/en-us/content/topics/security/security_authentication.htm) · [LDAP integration features](https://help.okta.com/oie/en-us/content/topics/directory/ldap-feature-support.htm)

    ## Verify each LDAP connection and operation

    The LDAP agent needs a supported Windows or Linux host, an Okta registration identity, and a distinct LDAP bind user. Its connection to the existing LDAP server uses the server's endpoint, search parameters, and configured trust. Its connection to Okta uses the org registration and network path from the agent host.

    An **object class** describes the type and attributes of an LDAP entry. An integration filter uses object classes or attribute conditions to select directory records. An import reads those records with the bind user's rights. Delegated sign-in validates the end user's password against LDAP via the agent. Recovery is a further operation with its own supported LDAP distribution, agent version, server behavior, and permissions. A successful import establishes none of those recovery outcomes.

    An **incremental LDAP import** uses `modifyTimestamp` to find changed entries. Review **Maximum clock skew** and the LDAP server index for that attribute when incremental imports produce unexpected results. Check the separate user and group search configuration before treating missing memberships as an authentication problem.

    [LDAP prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-prerequisites.htm) · [LDAP import settings](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-configure-ldap-import-settings.htm) · [LDAP sign-in and recovery](https://help.okta.com/oie/en-us/content/topics/security/security_authentication.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-7.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | LDAP Agent | Connects Okta to an existing LDAP directory. |
    | LDAP Interface | Lets LDAP clients connect to the Okta cloud endpoint. |
    | LDAP checks | Verify TLS, bind, search, import and end-user sign-in independently. |

    ### Check your recall

    **An application needs to issue LDAP requests against Okta. Which component serves those requests?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The LDAP Interface serves the application. Use the LDAP agent when Okta needs to connect to an existing external directory.</p>
    </details>

    **LDAP imports records, but sign-in fails. What should you test?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Verify the linked user and username format, then use the LDAP delegated credential test and the actual sign-in log.</p>
    </details>

    **Okta unlocked an LDAP-sourced user. Where do you check for a continued lockout?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check the LDAP directory directly. The Okta self-service unlock can leave the directory account locked.</p>
    </details>

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** A full LDAP import sees an edited user, but incremental import misses it. What must you compare before changing the search base?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Check that the entry's modifyTimestamp changed and that the server supports the expected timestamp behavior. Compare the import cutoff, clock skew, and index or filter behavior. Since the full import sees it, first investigate change detection.</p>
    </details>

    **Interview question.** A team installed an LDAP Agent because a legacy app needs to bind to Okta. How would you correct the architecture?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Ask which system should accept the LDAP request. The LDAP Agent connects Okta to an external LDAP directory. For an application that needs to make supported LDAP requests against Okta, evaluate the LDAP Interface and test the actual client flow.</p>
    </details>
