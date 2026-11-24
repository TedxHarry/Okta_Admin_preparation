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
