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

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **Maintenance checks disagree**

    After an update, heartbeat is healthy and delegated sign-in works. An incremental import fails and a scoped write returns an access error.

    1. Which evidence do you gather before rolling back the agent?
    2. Do the import and write errors prove the same cause?
    3. Which result would justify calling the change fully validated?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Compare agent version, last good operation, instance and timestamps, then review logs for each failing path. Record a small test import, a fresh delegated sign-in, and a scoped write with target verification.</li>
    <li>Treat them as separate until logs link them. Check import query and scope for the read. Check effective service permissions, target object and operation for the write.</li>
    <li>Compare before and after evidence for every enabled path affected by the work. One healthy heartbeat or successful user sign-in covers only its own operation.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. After maintenance, delegated sign-in works but imports fail. Which check is the most targeted first step? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Turn off delegation</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Reset the user&#x27;s password</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Change app policy</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. Compare the failing import with the last good run and inspect agent and directory-read evidence</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> Isolate the failed operation. Authentication success does not establish that the import&#x27;s query and scope work.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which tests should be in an AD agent change comparison when all these paths are enabled? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. A scoped import</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. A fresh delegated authentication</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. A scoped directory write and receiving verification</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Only agent availability in the console</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> One healthy service indicator cannot validate all agent-dependent operations.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A heartbeat loss shows that a specific user&#x27;s password was wrong. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> A heartbeat reports service connectivity. Require user-specific authentication evidence to judge credential validation.</p>
    </details>
    </fieldset>
    </div>

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
