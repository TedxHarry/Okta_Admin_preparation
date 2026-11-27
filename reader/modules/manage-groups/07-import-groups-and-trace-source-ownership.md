# Lesson 7 · Import groups and trace source ownership

=== "Theory"

    You find two groups named Travel in Okta. One came from Active Directory and the other from Microsoft Office 365. Before changing membership, identify the exact record, its source integration, and which record supplies the app assignment. Two imports can represent the same business group without producing the same Okta group record.

    ### Identify the owner of the membership

    A **group import** brings a group and its membership information into Okta from a supported connection. The **source integration** is the specific directory or app connection that supplied the record. For a source-controlled group, change membership in the system that owns it, then verify the change after import. A native Okta group can be managed directly in Okta, including by an Okta group rule.

    In **Directory → Groups → All**, search for the display name and open each candidate. Record the source and the Okta group ID from the group record URL. Compare the member list with the source record. If there is an access ticket, also open **Assignments → Groups** on the affected app to identify which group actually supplies the assignment. Keep group ownership distinct from the source that controls the user’s profile.

    [Okta group types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-types.htm) · [Review group imports](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-review-group-imports.htm)

    ### Import from a provisioning-enabled app

    The connector must support inbound group import. Review its configuration guide and confirm the provisioning connection works. In **Applications and Resources → Applications → app → Provisioning → Integration → Edit**, check **Import Groups** and save. Okta documents the checkbox as enabled by default for this workflow. For an app that offers on-demand import, use **Import → Import Now**. Choose the supported import mode if the app prompts for one. If new or changed users need confirmation, review their matches before confirming them.

    After the import, use the run summary when available and check **Directory → Groups** for the exact group and membership. Okta emails designated administrators counts when the import detects changes. The summary and email help establish what the run did. The member list and source record show whether the specific change landed.

    To remove the groups imported from that app, first review group policy rules, mappings, and downstream app assignments. Okta can block disabling group import while these dependencies exist. Once the dependency changes are approved and completed, clear **Import Groups** under the integration settings, select **Continue**, and save. The next scheduled or manual import removes the app’s imported groups from Okta. This setting applies to the integration’s imported groups as a set. A single source membership change belongs in the source system.

    [Enable group import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-groups-app-provisioning.htm) · [Run a manual app import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-app.htm) · [Remove imported app groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-groups-provisioning-apps.htm)

    ### Understand scope and nesting in Active Directory

    An **organizational unit (OU)** is a container for objects in an Active Directory (AD) domain. The Okta AD agent reads groups from connected domains and the selected group OUs. Go to **Directory → Directory Integrations → Active Directory → Provisioning → Integration** and review **Group OUs connected to Okta**. Check user OU scope separately. If your org exposes object filters, confirm that each intended object passes its filter.

    A **nested group** is a group that belongs to another group. If Alex is a member of AD Field Operations and AD Field Operations is a member of AD Travel, Okta represents Alex as a member of each imported group when both groups are in scope and the nesting is supported. Okta stores those user memberships on separate group records. An in-scope parent with an out-of-scope child can produce incomplete membership. Check both objects and the user’s link before changing the rule or app assignment.

    | AD group scope | Documented boundary |
    | --- | --- |
    | Domain Local group with members from several domains | Unsupported. |
    | Universal Security group with members from several domains | Supported when the domains have two-way trust. |
    | Universal Security group with cross-forest membership | Unsupported. |

    If **Skip users during import** is selected, groups can appear while membership updates wait until a user import completes. For large-group import failures reporting **HTTP 413 (Payload Too Large)**, check the membership size and distinguished-name lengths. Okta documents splitting large direct memberships into smaller nested groups as one remedy. Confirm the resulting groups stay in scope and verify the resolved membership afterward.

    [Import groups from Active Directory](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-groups.htm) · [Configure AD import settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm)

    ### Compare LDAP and Office 365 import cases

    **LDAP** is a directory protocol. For an inbound LDAP Agent integration, check **Group Search Base**, **Group Object Class**, **Group Object Filter**, and the **Member Attribute**. For example, an LDAP group class can store member distinguished names, while a POSIX group can use member login IDs. Use **Test Configuration** with a test account and confirm that the expected groups are returned. The LDAP Interface serves LDAP queries to clients. For inbound import, inspect the LDAP Agent integration settings.

    With the Office 365 scenario Okta documents, an AD forest supplies a group through the AD agent and also syncs it to Microsoft Entra ID. A provisioning-enabled Office 365 integration can bring that group into Okta again. Compare source and Okta IDs, then check rules, mappings, and app assignments before retiring either record.

    [Modify LDAP integration settings](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-modify-integration-settings.htm) · [Office 365 group duplication](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-duplication-365.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-7.md"

=== "Revision"

    ### Certification cheat sheet

    | Scenario | First check |
    | --- | --- |
    | An imported group has the wrong member | Confirm the group ID and source. Compare the source membership and the last import. |
    | An AD parent group is missing an indirect member | Check the child group’s OU and filter, the user’s import state, and the directory boundary. |
    | An LDAP group is missing | Check the search base, object filter, membership attribute, and the result of **Test Configuration**. |
    | Two groups have the same name | Compare the Okta IDs, integration sources, and assignment dependencies. |
    | Disabling an app’s group import is blocked | Inspect group policy rules, mappings, and app assignments. Verify removal after the next import. |

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **Membership has different owners**

    An AD nested group's membership is incomplete. A separately imported Office 365 group has a user who should be removed. A native group with the same display name is present.

    1. What do you check on the AD branch?
    2. Where do you correct the other imported membership?
    3. What do you review before disabling group import for an integration?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Verify upstream nesting and user, parent, and child scope, then compare the applicable import or JIT behavior. Identify the exact imported group by its source and ID.</li>
    <li>Determine the owning system and edit the authoritative upstream membership if that integration imports it. Sync with the supported operation and verify the exact group and its members in Okta.</li>
    <li>Inventory affected app grants, mappings, and policy references. Verify the connector&#x27;s removal timing and follow up on the next applicable import.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. An AD parent group is visible. A user from a nested child group is absent. What is the best next hypothesis to test? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. The default app password is invalid</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. A Group Push retry imports the child</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. The parent group must be native</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. The user&#x27;s or child&#x27;s OU may be outside the import scope</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> Confirm the AD hierarchy and relevant user and group scopes before changing the Okta rule.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which checks help before turning off imported groups on an integration? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A"> <span>A. Only how many groups have long names</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Existing group-derived app grants</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Policies or mappings that reference the groups</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. The source owner and applicable import timing</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B and C and D.</strong> Disabling import can affect dependencies. Inventory them and verify results at the next relevant import.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. You can assume every upstream membership was resolved as soon as the parent group object appears in Okta. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Inspect the actual members and nested scope. Importing a group object and resolving membership are different checks.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. Where do you add a person to an imported group whose membership is controlled by the source?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Add the person in the owning directory or app, then verify the same group and user after import.</p>
    </details>

    **2. AD contains Alex in a child group. The in-scope parent is present in Okta, but the child OU is excluded. What do you investigate?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check the child group’s scope and any group filters, the user’s link and import state, and whether the nesting is supported across the relevant domains.</p>
    </details>

    **3. When are imported app groups removed from Okta after Import Groups is disabled and saved?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>During the next scheduled or manual import, once dependencies have been resolved and Okta accepts the setting change.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** The source shows a child group membership. The in-scope parent imports, but the user is missing from the Okta view of the parent. What two boundaries do you check?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Check the user's import scope and the group scope for both parent and child, then compare actual AD nesting and the import mode. A visible parent record does not establish that every nested membership was imported.</p>
    </details>

    **Interview question.** An imported app group is no longer needed. Your colleague plans to disable all group import immediately. What would you review first?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Check which group grants, mappings, and policies rely on imported groups and identify who owns the source. Confirm the intended scope and verify the result after the next applicable import. Disabling the integration setting affects more than one group.</p>
    </details>
