# Manage Users capstone · Run a user lifecycle project

You administer a small test workforce. Onboard three users, update a profile, grant and remove access, work three recovery tickets, and close out a departure. Each phase uses records from the previous phase. Open the hints when you need the console path, then use the evidence tables to check the result.

Use a disposable Okta Identity Engine org, a separate administrator and browser profile, and test inboxes or aliases you control. The administrator needs permissions for users, groups, app assignments, Profile Editor, System Log, and the User Accounts report. Use a dedicated test prefix such as `LAB-M1-PROJECT`. Keep credentials, email reset links, and actual user data out of your evidence.

| Test record | What it is for |
| --- | --- |
| **A · Contractor** | Manual creation with activation later. Use A for a profile change, an individual app grant, forgotten-password recovery, and a temporary leave. |
| **B · Employee** | Manual creation with activation now. Use B for two group-based app grants and a lockout ticket. |
| **C · Departure record** | People CSV import. Use C for selected-authenticator recovery if you have a spare device, then for deactivation, reactivation, and deletion. |
| **D · Temporary credential** | A separate disposable account for the administrator-set password comparison if your org offers it. |
| **Readers, Reviewers, and a Bookmark App** | Create these in the project. The two groups give B separate paths to the same integration. The bookmark points to `https://example.com/` and lets you test assignment and dashboard visibility. |

Use the **Connected systems** tab for directory import and matching, first-sign-in creation, external profile ownership, and downstream offboarding. Each branch lists the test systems needed. If a system is unavailable, complete its evidence exercise and record that the live branch remains open.

=== "1. Onboard and find users"

    1. Create A with **Activate later** and B with **Activate now**. Capture their initial statuses. Start A's activation separately, complete each user's setup in their own session, and confirm both can sign in.
    2. Download the **People** CSV template. Add only C using a unique username and a working test inbox. Upload a copy with one required field missing, review the validation error, then import the corrected file with automatic activation off. Find C and record the status before activating C for the later phases.
    3. If the option is available, create D with an administrator-set temporary password. Use the offered first-sign-in password-change setting. Verify the password change and subsequent sign-in. Handle the temporary credential through your test environment's approved secure process.
    4. Find A by exact username. Compare the username, primary email, profile source, and status. Then apply a **Status** filter that excludes A and remove it. Use the **Choose field** filter to find the synthetic test records by profile attribute, and try a created or updated date range covering this exercise.

    ??? question "Open the console hints"

        Use **Directory → People → Add Person** for A, B, and D. For A, use **Activate** from the staged record or People list and complete the offered activation steps. Use **People → More Actions → Import users from CSV** for C. Download the actual template so its headings and required fields match your org. In the filter drawer, select an available base or custom field and choose the appropriate match operator. If a record is missing, clear other active filters and confirm the exact username and org.

    **Evidence.** Record the account state before and after activation, the CSV validation result, and a successful fresh sign-in for each activated user. Verify C appears once. For D, record the password-change prompt or the specific option unavailable in your org.

    [Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Activate users](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm) · [People CSV import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm) · [Filter users by dates and attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

=== "2. Update profiles and export"

    1. Add a disposable optional **string** attribute called **Project Cost Center** to the default Okta user profile. Set A's value to `FIN-0042` and leave B's value empty. Reopen both profiles and explain why the field exists for both users while only one has a value.
    2. Change A's cost center to `OPS-0042` as a mover update. Find A using the custom field if the filter is available. Verify the persisted value and the profile source. Keep the leading zeros in the cost center.
    3. Open the **User Accounts** report. Choose a user or status filter that lets you find a test record. Export the filtered report using **CSV Export**. Open the file locally, find the correct username and status, and compare them with **People**. Record only the filter and a sanitized result. If report access is unavailable, identify the required permission and mark the export as pending.
    4. A linked HR app is the primary profile source. It has no incoming mapping for the cost center. A lower-priority directory has a populated value. Predict what Okta stores while the field inherits the primary source, and name the settings you would inspect before correcting it.

    ??? question "Open the console hints and sourcing answer"

        Create the field in **Directory → Profile Editor → Okta User (default)**, then edit the value under **Directory → People → A → Profile**. For export, open **Reports → Reports → Entitlements and Access → User Accounts**. Under **Edit Filters**, use **Okta username → Equals** with A's username. Choose **Apply**, then **CSV Export**. In the sourcing ticket, the unmapped inherited value is null. Inspect the user's primary source, the attribute's Source priority, and the **App to Okta User** mapping. A field-level override and a working inbound mapping are two separate pieces of the change.

    **Evidence.** Show the field type, A and B's saved values, the People filter result, and one sanitized report row or the recorded reporting prerequisite.

    [Map profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [User Accounts report](https://help.okta.com/oie/en-us/Content/topics/reports/access/user-account-report.htm)

=== "3. Grant and remove app access"

    1. Create the Bookmark App and sign in as A and B before any assignments. Record whether either sees the tile. Create the two native Okta groups using your project prefix.
    2. Grant the bookmark directly to A. Add B to **Readers** and **Reviewers**, and assign the bookmark to both groups. Verify the app's **People** and **Groups** assignment views and both users' dashboards.
    3. Remove B from **Readers**. Predict the dashboard result and verify which grant remains. Then remove B from **Reviewers** and verify that B loses the assignment and tile while A keeps the individual grant.
    4. Remove A's individual app assignment and verify the change. Restore it for the suspension exercise. For a second comparison, return B to both groups. Unassign **Readers**, then **Reviewers**, from the app. Verify B loses the app after the final grant is removed and still belongs to both groups. Leave the group grants off for the remaining phases.

    ??? question "Open the assignment hints"

        Create the bookmark from **Applications and Resources → Applications → Browse App Catalog → Bookmark App**. Use the app's **Assignments → Assign to People** for A and **Assign to Groups** for Readers and Reviewers. Change B's group membership in the respective group's **People** tab. To change what a group grants, use the removal control on the app's **Groups** assignment row. Refresh the dashboard or start a fresh session after verifying the current assignment.

    **Evidence.** Compare the user's group membership, the app assignment type, and dashboard visibility. Capture a relevant membership or assignment event from **Reports → System Log**. A bookmark tests the Okta grant and tile. Use the connected branch to test a receiving account.

    [Create a bookmark](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm) · [Manage application assignments](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-manage-assignments.htm)

=== "4. Work recovery tickets"

    | Ticket | Your task | Evidence |
    | --- | --- | --- |
    | A forgot the password | Initiate the individual password recovery and complete it through A's controlled inbox. | Record the admin action and A's successful fresh sign-in. |
    | B knows the password, but the account is locked | Review the lab lockout threshold first. If you can reproduce a lockout on disposable B, recover the account without changing its known password. | Show the **Locked out** status, the recovery action, and the successful retry. If your policy lacks this state, explain the action and mark the live task pending. |
    | C lost one enrolled phone | Use a spare supported authenticator and a known recovery or reenrollment path. Remove only the selected test enrollment and complete setup again. | Show the selected authenticator action, reenrollment, and a successful fresh sign-in. If you lack a spare device or usable recovery path, do this as a written ticket. |

    Compare the recovery event with a later sign-in or verification event. In a tight time range in **Reports → System Log**, try:

    ```text
    eventType eq "user.session.start" and outcome.result eq "SUCCESS"
    ```

    When the retry includes an authenticator verification, inspect the successful event and its **DebugContext → DebugData → factor** or **factorType** where present:

    ```text
    eventType eq "user.authentication.auth_via_mfa" and outcome.result eq "SUCCESS"
    ```

    ??? question "Open the recovery hints"

        On the user's **People** record, use **Reset or Remove password** for the forgotten password, **More Actions → Unlock Account** for the locked user, and **More Actions → Reset Authenticators** for the selected enrollment. Check whether the account is Okta-managed, whether the action is available to your role, and what the effective enrollment policy requires next. Start the verification from a new test-user session.

    **Scoped Help Desk extension.** If you have a second disposable administrator and a Super Admin who can assign a scoped role, create a dedicated test group containing B only. Assign Help Desk Admin to the disposable operator for that group only. Compare the actions visible for B with the result when looking for A outside the scope. Use a separate operator session and remove the role assignment afterward. Avoid changing your main admin account.

    [Reset a password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-individual.htm) · [Unlock a user](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-unlock-individual.htm) · [Reset authenticators](https://help.okta.com/oie/en-us/content/topics/security/mfa/mfa-reset-users.htm) · [Help desk administrators](https://help.okta.com/oie/en-us/content/Topics/security/administrators-help-desk-admin.htm)

=== "5. Pause, offboard, and restore"

    1. Give A its individual bookmark grant if needed and sign in as A. Clear A's Okta sessions. Revisit a protected Okta page from the original test browser, then prove A can still start a fresh sign-in and retains the app grant.
    2. Suspend A for a planned leave. Capture the status, test a fresh sign-in, and verify its grant remains. Lift the suspension and prove A can sign in and see the same tile.
    3. Give C the bookmark as an individual grant only. If you have a connected receiving app, first record C's target account and follow the **Connected systems** tab before proceeding. Deactivate C. Verify the completed status, a blocked fresh sign-in, the Okta assignment result, and the lifecycle event. Check the target account separately if connected.
    4. Reactivate C. Complete any offered setup and inspect its assignments before restoring anything. Record which grants are present, verify a fresh sign-in, then restore the individual test grant only if needed for your comparison.
    5. When C is no longer needed, collect its evidence, deactivate C again, and wait for completion. Delete only the disposable C record if you are ready to retire it permanently. Search for C afterward with restrictive filters cleared. Save the deletion event if available.

    ??? question "Open the lifecycle hints"

        Under **Directory → People → user → More Actions**, choose **Clear User Sessions** or **Suspend** as appropriate. Use the **Suspended** filter and **Activate** to lift the suspension. For deactivation, use **People → More Actions → Deactivate** and select only C. On the deactivated record use **Activate** for recovery or **Delete** when the final exercise calls for permanent removal. App-side sessions and accounts have their own verification.

    **Evidence.** Show the before-and-after status, a matching sign-in result, the grant that remained or changed, and the relevant System Log event. Keep the browser session evidence separate from app-side account or session evidence.

    [Suspend and unsuspend](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm) · [Deactivate and delete](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Universal Logout for supported apps](https://help.okta.com/oie/en-us/content/Topics/apps/universal-logout-amfa.htm)

=== "Connected systems"

    Use distinct test identities for the import and first-sign-in branches. For a live run, use only an isolated source, scoped test records, and a target you can inspect. If your lab has no connector, answer the fallback exercise under each branch and record which verification you still need to perform live.

    | Branch | Live prerequisite | Work to complete |
    | --- | --- | --- |
    | **App CSV assignment** | A separate test app exposing **Import from CSV** and its template. | Inspect the app user schema and inbound mapping, import one test row, then verify the import result and app assignment. Without this app, compare the People template with the required app fields in the official procedure and state which output you would verify. |
    | **Connected import and matching** | A supported source integration, one existing matching Okta user, and one unlinked source record. | Review **User Creation & Matching**, run an import, and confirm only the intended link or new record. Compare the Okta user ID before and after matching and record the imported account link. Without a source, explain how you would handle a match on a unique mapped employee ID versus a name-only partial match. |
    | **Just-in-Time creation** | Configured AD delegated authentication and JIT, or a supported inbound identity provider configured for JIT. | Use a fresh source identity absent from **People**. Authenticate through the configured source and verify the created user and link. For AD, keep this user out of the confirmed import comparison. Without a source, predict the difference between an eligible new user and an AD user already confirmed on Import Results. |
    | **Externally sourced profile field** | One linked sourcing integration. Two eligible sources are needed for an override comparison. | Change one harmless mapped field at the source, run the supported sync, and verify the app profile, inbound mapping, and persisted Okta value. With two sources, compare inherited and override values and restore the original selection. Without the integration, use the sourcing ticket in Phase 2. |
    | **Downstream offboarding** | A test app with provisioning and its deactivation feature configured, plus access to its receiving account. | Before Phase 5, provision C and record the target account identifier. After deactivation, check the provisioning event and target status. If the app has a separate session, test it independently. Without the connector, explain why a missing bookmark alone cannot prove downstream revocation. |

    If an import unexpectedly proposes widespread removals, inspect **Reports → Import Monitoring**, compare the source scope and affected records, and decide whether to cancel the affected import or resume. If your lab cannot reproduce the warning, explain your decision for this record set: the source scope unexpectedly dropped an OU containing users who should retain access.

    [App CSV assignment](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-users-csv.htm) · [Imported-user matching](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-matching-imported-users.htm) · [AD JIT](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-add-update-jit.htm) · [Resolve an import safeguard warning](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-resolve-import-safeguard.htm) · [Connect a provisioning target](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md)

=== "Blind incident and cleanup"

    **Ticket.** A reviewer should lose access to the training app. The request says a membership was removed, but the user still sees the tile after a fresh sign-in. Their other reporting access must stay in place.

    | Evidence available | Recorded result |
    | --- | --- |
    | User status | Active |
    | System Log at the change time | Membership removal from **Readers** succeeded |
    | Training app → Assignments | User assignment type is **Group**. The app lists **Readers** and **Reviewers**. |
    | User → Groups | **Reviewers** and **Reports** |
    | Reporting app → Assignments | Granted through **Reports** |

    State the remaining access path, the smallest change that meets the request, and what you would verify in both app assignments and the user's dashboard. To replay the ticket live, restore the training bookmark's two group grants, return B to both groups, and create a separate reporting bookmark assigned through a third disposable group containing B. Remove B from Readers to reproduce the ticket. Prove that your fix removes the training bookmark and leaves reporting access in place.

    ??? question "Reveal the incident answer"

        **Reviewers** still grants the training app. Remove only B's **Reviewers** membership if that group has no other required grants. Confirm the training assignment and tile disappear and the reporting assignment remains. In a real org, inspect every grant that Reviewers gives the user before removing membership. The successful Readers event only proves that one membership changed.

    **Close the project.** Restore any test policies, enrollment settings, source mappings, and import schedules that you changed. Remove the temporary Help Desk scope and the project-only app and group grants. Retire only the disposable records you created. Clear test field values before removing the field if it is no longer referenced. Keep only sanitized evidence and mark each connected branch **live**, **simulated**, or **pending**.

## Project coverage

| Guided lab | Where you use it in the project |
| --- | --- |
| [1. Read a user record](hands-on-labs.md#lab-1) | Phases 1 and 2. Identify, filter, and export users and trace their profile and status. |
| [2. Create and activate](hands-on-labs.md#lab-2) | Phase 1. Create staged and immediately activated users and compare first sign-in. |
| [3. Import and match](hands-on-labs.md#lab-3) | Phase 1 and Connected systems. Validate CSV, compare app CSV and connected matching, and test JIT with a distinct identity. |
| [4. Trace ownership and mappings](hands-on-labs.md#lab-4) | Phase 2 and Connected systems. Edit a local value, diagnose an unmapped field, and verify a source-side update. |
| [5. Recover sign-in](hands-on-labs.md#lab-5) | Phase 4. Resolve password, lockout, and authenticator tickets with a fresh-sign-in check. |
| [6. Trace app access](hands-on-labs.md#lab-6) | Phase 3 and the blind incident. Compare individual and overlapping group grants. |
| [7. Pause and offboard](hands-on-labs.md#lab-7) | Phase 5 and Connected systems. Compare session clearing, suspension, deactivation, reactivation, and deletion. |

[Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) · [Course exam coverage](../../exam/coverage.md)
