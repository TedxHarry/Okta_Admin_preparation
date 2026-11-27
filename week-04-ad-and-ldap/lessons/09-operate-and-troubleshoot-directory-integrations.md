# Lesson 9 · Operate and troubleshoot directory integrations

=== "Theory"

    ## Identify the first failing operation

    Identity data can cross several boundaries in one transaction. Identify whether the failure happened during registration, directory discovery, import, matching, lifecycle processing, credential validation, policy evaluation, or a write to a target record. Start with the identity, time, directory instance, and operation. Compare the observed result with the expected result before changing configuration.

    | Observation | Where to look first |
    | --- | --- |
    | Service fails to start | Windows Services, the service identity, and startup error. |
    | Service runs and agent is unavailable | Agent registration, outbound network path to Okta, proxy and TLS requirements, and the agent log. |
    | Agent is available and expected object is absent | Directory connectivity, bind or runtime read permissions, replication visibility, selected OU or LDAP search base, and filters. |
    | User is in the import results and cannot sign in | Confirm the intended match, activation status, account link, authentication provider, and the effective login format. |
    | Credential test passes and sign-in fails | Find the actual sign-in in System Log and check enrollment, account state, and the policy that applied. |
    | Password validates and reset fails | Check the required recovery methods and service-account rights on the exact directory user. |
    | Group exists and member is missing | Compare the user's scope and account link, parent and child group scope, import type, and manual or rule exceptions. |
    | Okta stores the expected mapped value and AD differs | Check the outbound operation, assignment, target record, agent permissions, and the resulting provisioning task. |

    Reproduce with one disposable record, correct one cause, and repeat the same operation. An agent log helps show host-side activity. **System Log** shows Okta-side events. AD and LDAP hold the authoritative final record for a directory write. [AD agent logs](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-log-info.htm) · [LDAP agent logs](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-log-info.htm) · [AD FAQ](https://help.okta.com/oie/en-us/content/topics/directory/directory_faq_okta_and_ad_groups.htm)

    ## Operate a production integration

    Inventory host, instance, service identity, and version before any change. Use the supported **Agents** controls to check availability and update status. With multiple agents, update or rotate one host at a time and use a fresh delegated sign-in and scoped import while its peer remains available. Confirm versions are consistent afterward. Where supported, schedule auto-updates and check the resulting events in System Log. Manage agent runtime identity through Okta's documented change procedure and preserve only the required directory access.

    **DirSync** is an AD change-tracking control for incremental imports. It requires a supported org and agents, the documented **Replicating Directory Changes** right, and an all-agent readiness check. It performs a full import after the feature is toggled. Review known integration restrictions before enabling it. Agent thread changes, additional domain registration, and domain renames each have a documented procedure and can affect the availability or scope of existing integrations.

    [Agent auto-update](https://help.okta.com/oie/en-us/content/topics/directory/agent-auto-update-main.htm) · [Change an agent's service identity](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-change-user.htm) · [Agent management and DirSync](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-manage-integration.htm)

    ## Recognize related deployment options

    | Option | Purpose and dependency |
    | --- | --- |
    | **Desktop Single Sign-On** | Lets eligible domain users authenticate through their Windows identity. Follow Okta's Desktop SSO requirements for Kerberos, browser and zone behavior, and the JIT setting if first sign-in should create the user. |
    | **AD to Okta password synchronization** | Uses the separate AD Password Sync Agent on integrated domain controllers. Check its compatibility and requirements before deployment. |
    | **Okta to AD password synchronization** | Uses the documented **Sync Password** setting and scoped directory password rights. Review the restrictions with delegated authentication and the AD Password Sync Agent. |
    | **Password migration** | Transfers AD passwords to Okta in a phased process as eligible users sign in with their passwords. Verify which system authenticates a migrated user and what happens to users who have yet to migrate. |
    | **AD provisioning PowerShell hooks** | Run supported custom logic during AD provisioning. They require explicit setup, script controls, and testing on the agents. Validate failures and side effects in a disposable OU first. |
    | **Bidirectional AD group management** | Provides a supported option for governing eligible AD groups. Verify availability and supported group configuration before changing the membership management model. |

    These options require additional features, hosts, or operational controls. Use the linked procedures for their prerequisites and the administration decisions. [Desktop SSO](https://help.okta.com/oie/en-us/content/topics/directory/ad-desktop-sso-main.htm) · [Password synchronization](https://help.okta.com/oie/en-us/content/topics/directory/password-sync-main.htm) · [Password migration](https://help.okta.com/oie/en-us/content/topics/directory/ad-password-migration.htm) · [AD PowerShell scripts](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-powershell-script.htm) · [Bidirectional AD group management](https://help.okta.com/oie/en-us/content/topics/directory/ad-bidirectional-group-management-configure.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-9.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Agent inventory | Track host, integration, runtime identity and version. |
    | Logs | Compare host-side and Okta-side evidence for the same operation. |
    | Maintenance | Verify a fresh sign-in and a scoped import before proceeding to the next host. |

    ### Check your recall

    **What does a failed agent heartbeat tell you about a user's password?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>It tells you the agent is unavailable. Check the surviving agent and domain-controller path before drawing a conclusion about the user's credentials.</p>
    </details>

    **What should you compare when an auto-update succeeds but the first post-update import fails?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Compare the agent version and availability, the scoped import and its outcome, the agent log, the AD path and runtime permissions, and the same operation on a surviving peer where applicable.</p>
    </details>

    **Which component receives password changes for AD-to-Okta password synchronization?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The separate AD Password Sync Agent installed on the integrated domain controllers. The standard AD integration agent handles operations such as imports and delegated authentication.</p>
    </details>

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** After an agent update, imports fail, but delegated sign-in works. What baseline would you capture before rolling back?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Compare affected instances, agent versions, the last good import, failing job messages, and agent logs. Test a small known import and verify directory read scope and agent connectivity. Sign-in is useful evidence for a separate operation.</p>
    </details>

    **Interview question.** How do you validate a maintenance change for a directory integration that handles imports, sign-in, and writes?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Exercise each required path with test records before and after the change. Record agent availability, one fresh delegated authentication, a scoped import, and a scoped write where enabled. Compare the same objects and operation results.</p>
    </details>
