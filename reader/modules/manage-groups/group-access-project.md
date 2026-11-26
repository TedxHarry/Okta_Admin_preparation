# Manage Groups capstone · Run a group access project

Build group-based access, move a user to another department, and restore access after a rule exception. Start with four active non-admin test users on the default Okta user type, with editable Department fields. Use a disposable Okta Identity Engine org and a Super Admin or Org Admin who can also manage the test apps. Keep the admin sign-in separate from the four test sign-ins. If reusing users, record their original Department values.

In this project a **source group** supplies a rule input and a **target group** receives the rule's assignments. Prefix every group, rule, app, and policy you create with `LAB-M2-PROJECT-`. Start with fresh names so no existing assignment, policy, or role affects the results.

=== "1. Create groups and test users"

    1. Open **Directory → Groups → Add Group**. Create **Source A**, **Source B**, **Support Access**, **Support Reporting**, and **Operations Access**, each with the project prefix. Add a description that identifies its purpose. Leave all three target groups empty.
    2. Open Source A's **Profile → Edit** and update its description to `Project group rule input A`. Save and reopen the profile. Verify that the updated description appears. If your console shows similarly named groups, open the intended group and confirm its source and ID before editing.
    3. In **Directory → People → user → Profile → Edit**, set each test user's **Department** to the value below. Then open each source group's **People → Assign people** and add the users shown.

        | Test user | Source A | Source B | Department |
        | --- | --- | --- | --- |
        | A-only | Add | Leave out | `M2-Project-Support` |
        | B-only | Leave out | Add | `M2-Project-Operations` |
        | Both | Add | Add | `M2-Project-Support` |
        | Neither | Leave out | Leave out | `M2-Project-Support` |

    4. Verify each source group's **People** list, then open each user's **Groups** tab and check the same memberships from the user side. In **Reports → System Log**, filter for `eventType eq "group.user_membership.add"` and inspect one project membership event. Check that the actor, test user, and group match your change.

    [Manage groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-groups-main.htm) · [Assign people to a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm)

=== "2. Build a Basic rule"

    1. Open **Directory → Groups → Rules → Add Rule**. Name the rule **Support Eligibility** with the project prefix. Under **IF**, select **Use basic condition → Group membership**. Choose the **includes any** option and select both source groups. Under **Then Assign to**, select **Support Access** and **Support Reporting**.
    2. Leave the exception list empty and use **Preview** for each test user. With the membership condition alone, A-only, B-only, and Both should match. Neither should miss. The two source choices are alternatives. A matching user receives both target memberships after the rule runs.
    3. Add a profile condition that checks **Department equals `M2-Project-Support`**. Preview again. A-only and Both should match. B-only still meets the membership condition but fails Department. Neither meets Department but fails membership. Verify that your console shows the intended match behavior before saving.
    4. **Save** the rule. Verify it is **Inactive** and the target groups are empty. Choose **Actions → Activate** and confirm if prompted. Open **People** in both target groups and verify that only A-only and Both are members.

    | User | Basic membership alone | Basic membership plus Support department |
    | --- | --- | --- |
    | A-only | Match | Match |
    | B-only | Match | Miss |
    | Both | Match | Match |
    | Neither | Miss | Miss |

    [Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm)

=== "3. Try advanced expressions"

    1. Open Source A and Source B and copy their Okta group IDs from the corresponding group records. Open **Rules → Add Rule**. Enter a disposable preview-rule name, choose **Use Okta Expression Language (advanced)**, and select **Support Access** as the target. Keep this rule unsaved so the Basic rule remains the only live grant to that target.
    2. Replace `SOURCE_A_ID` and `SOURCE_B_ID` with your group IDs, then preview all four users:

        ```text
        isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID")
        ```

        A-only, B-only, and Both should match. Change `OR` to `AND` and preview again. Only Both should match.

    3. Replace the expression with the following and preview again:

        ```text
        isMemberOfGroup("SOURCE_A_ID") AND !isMemberOfGroup("SOURCE_B_ID")
        ```

        Only A-only should match. Now add the Department condition using parentheses to keep the source-group alternatives together:

        ```text
        (isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID"))
          AND user.department == "M2-Project-Support"
        ```

        A-only and Both should match. Cancel the preview rule when finished.

    <span id="group-rule-explorer"></span>

    [Okta Expression Language](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions) · [Array attribute extension](hands-on-labs.md#lab-4)

=== "4. Assign apps and move a user"

    1. Open **Directory → Groups → Rules → Add Rule**. Create **Operations Eligibility** with the project prefix. Use a Basic rule for **Department equals `M2-Project-Operations`** and target **Operations Access**. Preview B-only and A-only. B-only should match. Save and activate the rule.
    2. In **Applications and Resources → Applications → Browse App Catalog**, add two **Bookmark App** integrations. Name them **Workspace** and **Support Desk** with the project prefix and use `https://example.com/` and `https://example.org/` as their URLs. Make both tiles visible.
    3. Open **Workspace → Assignments → Assign → Assign to Groups** and assign Support Access and Operations Access. Assign Support Desk to Support Access only. Check each app's **Assignments → People** and verify the tiles from the test users' dashboards.
    4. In **Directory → People → Both → Profile → Edit**, change Department to `M2-Project-Operations`. After processing, verify that Both leaves Support Access and Support Reporting, joins Operations Access, and keeps Workspace. In the fresh dashboard session, only Support Desk should disappear for Both.

        | User | Tiles before move | Tiles after move |
        | --- | --- | --- |
        | A-only | Workspace, Support Desk | Workspace, Support Desk |
        | B-only | Workspace | Workspace |
        | Both | Workspace, Support Desk | Workspace |
        | Neither | None | None |

    5. For a direct-assignment comparison, grant Support Desk to Neither through **Assignments → Assign to People**. Verify **Individual** on the assignment row and check the tile. Remove that individual grant and verify the tile disappears. If you use a supported app with group-configurable attributes, practice [group priority and combined values](hands-on-labs.md#lab-6) on a separate test integration.

    [Assign an app to groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-app-group.htm)

=== "5. Repair a rule exception"

    1. Confirm A-only is in Support Access through the active Support Eligibility rule. Open **Directory → Groups → Support Access → People** and remove A-only. Verify A-only still has `M2-Project-Support` and remains in Source A.
    2. Open **Directory → Groups → Rules** and inspect Support Eligibility. Verify A-only appears under **Except The following users**. In a fresh test session A-only should lose the tiles supplied by Support Access. Neither and Both should keep their previous results.
    3. Use **Actions → Deactivate**, then **Actions → Edit**. Remove only A-only from **Except The following users**. Save and **Activate**. Verify A-only returns through the rule and sees both tiles again.
    4. In **Reports → System Log**, search the test time for `eventType eq "group.user_membership.remove"`, then search for `eventType eq "group.user_membership.add"`. Match the events to A-only and Support Access. In the rule-driven addition, look for `triggeredByGroupRuleId` in **Debug Data** if present.

    [Edit group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-group-rules.htm) · [Find rule activity in the System Log](https://support.okta.com/help/s/article/how-to-search-system-log-for-actions-created-by-group-rules)

=== "6. Connect a directory or app"

    Complete each branch only with the indicated test integration.

    1. **Import a group.** Use a connected test directory or an app that supports group import. Put a test user in a fresh source group, run the supported import, then find that group in **Directory → Groups**. Compare the source, group ID, and **People** list. Remove the test member in the source, import again, and verify the changed membership in Okta. Use the [import lab](hands-on-labs.md#lab-7) for connector-specific setup.
    2. **Push a group.** Use a provisioning-enabled connector that supports Group Push. Create separate project-prefixed **App Assignment** and **Push Members** groups. Assign the receiving app to App Assignment, add A-only to that group, and verify the receiving account exists before adding A-only to Push Members. In the app's **Push Groups → Find groups by name**, select Push Members, choose **Create Group** if offered, and save. Verify the push status and receiving membership. Remove A-only from Push Members, verify removal downstream, then remove the separate app assignment if finished.
    3. **Link an existing group.** If the connector supports linking, create a disposable empty group in the receiving app and note its ID. Follow [the Group Linking exercise](hands-on-labs.md#lab-8), verify the ID remains the same, and use **Leave the group in the target app** when testing unlink without deletion.
    4. **Check policy scope.** With a disposable SAML or OIDC app, use [the group-scoped sign-in lab](hands-on-labs.md#lab-9). Assign both test users, set a dedicated rule for a group containing only one, then test both users and compare the app policy events. Restore the app's original policy after the test.
    5. **Check delegated administration or governance.** Use a separate scoped Group Membership Admin to compare an in-scope group with an out-of-scope group. Remove the test role assignment afterward. If the org exposes Identity Governance display fields, follow [the governance extension](hands-on-labs.md#lab-9) to verify the requester's display name separately from the group name.

    [App assignments and Group Push](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/app-assignments-group-push.htm) · [Group Membership Admin](https://help.okta.com/oie/en-us/content/topics/security/administrators-group-membership-admin.htm)

=== "7. Retire the test groups"

    1. If you ran the connected branch, verify pushed membership removal in the receiving app, unlink or retire only your test push mappings, and restore any original app policy before you remove its scope group.
    2. Deactivate the two project rules under **Directory → Groups → Rules → Actions**. When deleting each lab rule, choose the option to remove its rule-managed memberships. Verify the affected target groups afterward.
    3. Open each lab app's **Assignments → Groups**. Remove the project assignments and verify the test tiles are gone in fresh sessions. Check for remaining rule, assignment, policy, or admin-role dependencies before retiring a group.
    4. In **Directory → Groups**, select only the project-created Okta groups and use the available delete action. In **People**, restore the test users' original Department values if you reused them. Clean up project-created bookmarks when finished.
