# Lesson 1 · Identify the group and its owner

=== "Theory"

    A manager asks you to add Jordan to `Finance Access`. Search in **Directory → Groups** and you might find a group created in Okta and a similarly named group imported from Active Directory. Before changing membership, answer three questions. **Which group did the manager mean? Which system controls its membership? What does that group grant?**

    ## Separate the user, membership, and access grant

    In [Manage Users](../manage-users.md), you found a user record and checked which apps it received. Here you start with the group. An **Okta group** is a collection of users. **Membership** is the relationship between a user and the group. A **group assignment** gives members an app through that group. A group can also be a condition in an app sign-in policy. The policy can add requirements such as multifactor authentication (MFA) when a member signs in.

    | Question | Evidence to inspect |
    | --- | --- |
    | Which group am I looking at? | Check its name and source in **Directory → Groups**. Open the record and capture its unique group ID if you need to distinguish similar names. |
    | Is Jordan a member? | Open the group's **People** list and find Jordan by the exact username. Cross-check **Directory → People → Jordan → Groups**. |
    | Does the group grant the app? | Open the exact integration under **Applications and Resources → Applications → app → Assignments**. Filter by **Groups** and find the group. Check **People/Users** for Jordan's assignment. |
    | Can Jordan use the app? | Verify the dashboard or fresh app sign-in. Check visibility and sign-in policy when appropriate. For a provisioned app, verify the receiving account separately. |

    Jordan can belong to a group without receiving the app if the app is unassigned to that group. Jordan can also receive the app through another group or a direct grant. Check the existing assignment paths before changing membership. [Okta · Groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-groups.htm) · [Okta · Manage app integration assignments](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-manage-assignments.htm)

    ## Find the exact group

    In **Directory → Groups**, start with the full group name or the start of its name. The ordinary search matches the beginning of the name. Typing `Access` may miss a group called `Finance Access`. Use **Advanced Search** with an available **Contains** filter on group name or description for a middle fragment of at least three characters, or use **Equals** for an exact name. Use the **Group source type** filter to narrow similar results. Check whether an old source or advanced filter is hiding the group.

    Open the group before using its ID. Okta documents that the Admin Console URL contains its unique **group ID**, which identifies that group even when another result has a similar name. Record the group ID and source together for your own test evidence. Confirm a specific member in **People** because the displayed group count can lag a membership change. [Okta · View group members](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-group-members.htm) · [Okta · Find a group ID](https://support.okta.com/help/s/article/how-to-find-group-ids-through-the-okta-user-interface)

    ## Find the membership authority

    **Source** tells you where the group comes from. **Membership authority** tells you where to make the change. **Admin permission** tells you whether your role allows that change. A business owner can approve a request, while a directory team or a rule can still be responsible for performing the change.

    | Group source | Where to start |
    | --- | --- |
    | **Native Okta** | For manually managed membership, use **Directory → Groups → group → People** with the right permissions. For rule-managed membership, inspect the rule and its input. A synced user attribute can still be owned upstream. |
    | **Active Directory (AD)** | Identify the connected AD instance and the specific source group. For ordinary imported membership, make the change in AD and verify after import. If Bidirectional Group Management is configured for that group, follow the documented write-back path and verify both sides. |
    | **LDAP directory** | Identify the connected Lightweight Directory Access Protocol (LDAP) directory and the group there. Verify the connector's supported membership operations and check the source and the imported result. |
    | **Application** | Identify the importing app integration and source group. In the ordinary provisioning-enabled import flow, memberships are managed in the source app. If the group participates in a supported Group Linking configuration, check the link and current authority before editing. |

    A **Group Membership Admin** can manage membership of the groups in scope. That role and any broader group or app permissions should be checked separately. If a membership control is missing, look at the group source and your assigned permissions before concluding what action is possible. [Okta · Group source types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-types.htm) · [Okta · Group membership administrators](https://help.okta.com/oie/en-us/content/Topics/security/administrators-group-membership-admin.htm) · [Okta · Application group import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-groups-app-provisioning.htm) · [Okta · Bidirectional Group Management](https://help.okta.com/oie/en-us/content/topics/directory/ad-bidirectional-group-management.htm) · [Okta · Group Linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enhanced-group-push-main.htm)

    ## Read special groups and nested AD membership

    **Everyone** is the default group for users in the org. Review that scope before using it in an assignment or policy. **Okta Administrators** represents the org's admins. Okta documents it for sign-on policy use and restricts its use to a Super Admin setting the global policy. Its membership count is hidden. Use a disposable native group for the lab.

    Suppose AD contains `Finance-Parent`, which contains `Finance-Child`, and Jordan belongs to `Finance-Child`. After a supported import of both groups and their memberships, Jordan can appear as a user member in both imported Okta group records. Okta represents the resulting user memberships in each group. The parent–child group relationship stays in AD. If a membership is missing, compare the AD group scope and the imported records before changing the Okta-side access assignment. [Okta · Groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-groups.htm) · [Okta · Import groups from Active Directory](https://help.okta.com/oie/en-us/Content/topics/directory/ad-agent-import-groups.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-1.md"

=== "Revision"

    ## Group identity, ownership, and access

    | Cue | What to remember |
    | --- | --- |
    | Similar names | Match **name + source + group ID**. A plain search matches the beginning of the name. Use **Advanced Search → Contains** where supported for middle fragments. |
    | Native versus imported | Native manual membership can be managed in Okta with the right permission. For imported membership, find the source authority and check whether an explicit write-back or linking feature applies. |
    | Source versus permission | Source tells you where the group comes from. Membership authority tells you where to change it. Your admin role tells you what you can do. |
    | User is in the group | Verify the exact username in **People**. Check the app's **Assignments** separately and check the dashboard or sign-in for the resulting user experience. |
    | AD nesting | Imported nested AD memberships can appear as user memberships in each eligible Okta group. Read the original hierarchy in AD. |
    | Special groups | **Everyone** has broad membership. **Okta Administrators** has a specific sign-on policy purpose. Use a dedicated test group for practice. |

    **Exam focus.** Be ready to explain the difference between an Okta group and an AD-sourced group, identify the authority that controls membership, and prove whether the group grants an app. This is the starting point for group rules and custom app assignment. [Okta Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide)

    ### Check your recall

    **1. Two Finance groups look alike. How do you choose the one to investigate?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Match the group source and exact group ID, then verify which group is assigned to the intended app. For an imported group, also identify the upstream group and integration.</p>
    </details>

    **2. Jordan is a member of the AD child group and appears in the parent group in Okta. Where do you verify the hierarchy?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check the hierarchy in AD. In Okta, verify the imported user memberships in the two group records separately.</p>
    </details>

    **3. Jordan belongs to the right group, but the app tile is missing. What is your next check?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Check the app's Assignments tab for the group and for Jordan. If assigned, confirm the correct dashboard session and check app tile visibility.</p>
    </details>
