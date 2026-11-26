# Manage Users capstone · Run a user lifecycle project

You administer a small test workforce. Onboard three users, update a profile, grant and remove access, work three recovery tickets, and close out a departure. Each phase uses records from the previous phase. Follow the console steps in each tab. Use the expected results to check your work as you go.

Use a disposable Okta Identity Engine org, a separate administrator and browser profile, and test inboxes or aliases you control. The administrator needs permissions for users, groups, app assignments, Profile Editor, System Log, and the User Accounts report. Use a dedicated test prefix such as `LAB-M1-PROJECT`. Keep credentials, email reset links, and actual user data out of your evidence.

| Test record | What it is for |
| --- | --- |
| **A · Contractor** | Manual creation with activation later. Use A for a profile change, an individual app grant, forgotten-password recovery, and a temporary leave. |
| **B · Employee** | Manual creation with activation now. Use B for two group-based app grants and a lockout ticket. |
| **C · Departure record** | People CSV import. Use C for selected-authenticator recovery if you have a spare device, then for deactivation, reactivation, and deletion. |
| **D · Temporary credential** | A separate disposable account for the administrator-set password comparison if your org offers it. |
| **Readers, Reviewers, and a Bookmark App** | Create these in the project. The two groups give B separate paths to the same integration. The bookmark points to `https://example.com/` and lets you test assignment and dashboard visibility. |

Use the **Connected systems** tab for directory import and matching, first-sign-in creation, external profile ownership, and downstream offboarding. Each branch lists the test systems needed. Continue with the core phases if a connected system is unavailable.

=== "1. Onboard and find users"

    1. Open **Directory → People → Add Person**. Choose **Okta User (default)** if prompted. Enter A's name, unique username, and test email. Select **Activate later → Save**. Find A in **People** and verify the status is **Staged**.
    2. Open **Add Person** again. Enter B's name and a different username and inbox. Select **Activate now → Save**. Check B's inbox and finish any account and authenticator setup in the test-user browser. Sign in as B and check **People** for **Active**.
    3. Find A in **People** and select **Activate**. Confirm the activation, then open A's test inbox and finish the offered setup. Sign in as A and verify **Active**. If the email is missing, check the saved email address and spam folder before using any available resend action.
    4. Open **People → More Actions → Import users from CSV**. Download the tenant template, keep the headers, and enter C's unique username and inbox. Upload a separate copy missing a required value and read the validation error. Upload the corrected file, leave **Automatically activate new users** off, and choose **Import Users**. Verify C appears once and requires activation. Activate C and complete a fresh sign-in.
    5. If **I will set password** is available in **Add Person**, create D with **Activate now** and **User must change password on first login**. Enter the temporary credential in D's separate browser session, complete the password change, and confirm the new credential works.
    6. Search **People** for A's exact username. Open **Profile** and compare **Username** with **Primary email**. Check the account status and any source shown. Apply a **Status** filter that excludes A, then clear it and verify A returns. In **Choose field**, filter by a test profile value, then try a **Created** or **Updated** date filter covering this run.

    [Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Activate users](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm) · [People CSV import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm) · [Filter users by dates and attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

=== "2. Update profiles and export"

    1. Open **Directory → Profile Editor → Okta User (default) → Profile → Add Attribute**. Set **Data type** to **string**, **Display name** to **Project Cost Center**, and **Variable name** to `m1ProjectCostCenter`. Leave it optional and save.
    2. Open **Directory → People → A → Profile → Edit**, set **Project Cost Center** to `FIN-0042`, and save. Open B's profile and confirm the field exists there with an empty value. Both users share the same profile schema. Only A received a value.
    3. Edit A's profile again and change the value to `OPS-0042`. Save and reopen A's profile to confirm the new value. If the field is available under **People → Choose field**, filter for `OPS-0042` and verify A appears.
    4. Open **Reports → Reports → Entitlements and Access → User Accounts → Edit Filters**. Select **Okta username → Equals**, enter A's username, and choose **Apply → CSV Export**. Open the CSV locally and verify that A's username and status match **People**. If the report is unavailable, use an admin role listed in the linked report guide and retry.
    5. For a source-owned field, open **Directory → Profile Editor**, inspect the attribute's **Source priority**, then open the source integration's **Mappings → App to Okta User**. If the field inherits the primary profile source and that source has no mapping, expect a null value even if a lower-priority directory has data. Use the **Connected systems** tab to verify an actual source update.

    [Map profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [User Accounts report](https://help.okta.com/oie/en-us/Content/topics/reports/access/user-account-report.htm)

=== "3. Grant and remove app access"

    1. In **Applications and Resources → Applications → Browse App Catalog**, find **Bookmark App** and choose **Add Integration**. Name it `LAB-M1-PROJECT-Training`, enter `https://example.com/`, and save. Sign in as A and B before assigning it. The tile should be absent for both.
    2. In **Directory → Groups → Add Group**, create **Readers** and **Reviewers** with the project prefix. Open each group's **People** tab, select **Assign people**, and add B.
    3. Open the bookmark's **Assignments → Assign → Assign to People** and assign A. Use **Assign to Groups** to assign Readers and Reviewers. Check the app's **People** and **Groups** views, then sign in as A and B. Both should see the tile.
    4. In **Directory → Groups → Readers → People**, remove B. B should still have the tile through Reviewers. Remove B from Reviewers too and verify B loses the assignment and tile. A should keep the individual assignment.
    5. Remove A's individual assignment using the **X** on A's app assignment row. Verify the tile disappears, then reassign A for the leave exercise. Return B to both groups. On the app's **Assignments → Groups** view, remove the Readers assignment and then the Reviewers assignment. Verify B loses the app after the second removal while remaining in both groups.
    6. Open **Reports → System Log** at the time of the test. Find B's group removal or the app unassignment event and check the actor, target, and result. Leave both group grants off before you move on.

    [Create a bookmark](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm) · [Manage application assignments](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-manage-assignments.htm)

=== "4. Work recovery tickets"

    1. **Forgotten password.** Open **Directory → People → A → Reset or Remove password** and choose the email reset option. Open the link in A's controlled inbox, set a new password, then sign in from a fresh test session. A should reach the dashboard.
    2. **Locked account.** Check the effective password policy's lockout threshold first. If your disposable org permits a controlled test, use B to reproduce the lockout. Verify **Locked out** under **People**, then choose **B → More Actions → Unlock Account**. Sign in with B's original password. If you cannot reproduce the status, continue with A's and C's recovery exercises.
    3. **Lost phone.** Confirm C has a test enrollment and a working recovery or reenrollment path. In **Directory → People → C → More Actions → Reset Authenticators**, select only the test authenticator and confirm. Sign in separately as C, follow the setup prompts to enroll it again, and verify a fresh sign-in. If you lack a spare device or recovery path, leave this task pending.
    4. **Temporary password reset.** If your org offers **Create a temporary password** under the individual reset action, try it with D. Sign in as D with the temporary credential, finish the password-change prompt, and verify the replacement password works.

    Compare the recovery event with a later sign-in or verification event. In a tight time range in **Reports → System Log**, try:

    ```text
    eventType eq "user.session.start" and outcome.result eq "SUCCESS"
    ```

    When the retry includes an authenticator verification, inspect the successful event and its **DebugContext → DebugData → factor** or **factorType** where present:

    ```text
    eventType eq "user.authentication.auth_via_mfa" and outcome.result eq "SUCCESS"
    ```

    **Scoped Help Desk extension.** If you have a second disposable administrator and a Super Admin who can assign a scoped role, create a dedicated test group containing B only. Assign Help Desk Admin to the disposable operator for that group only. Compare the actions visible for B with the result when looking for A outside the scope. Use a separate operator session and remove the role assignment afterward. Avoid changing your main admin account.

    [Reset a password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-individual.htm) · [Unlock a user](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-unlock-individual.htm) · [Reset authenticators](https://help.okta.com/oie/en-us/content/topics/security/mfa/mfa-reset-users.htm) · [Help desk administrators](https://help.okta.com/oie/en-us/content/Topics/security/administrators-help-desk-admin.htm)

=== "5. Pause, offboard, and restore"

    1. Sign in as A in the test browser and open the dashboard. In the admin browser, open **Directory → People → A → More Actions → Clear User Sessions** and confirm the Okta session action. Reload the dashboard in A's browser. Expect a sign-in prompt. Sign in again and verify the training tile remains.
    2. Open **A → More Actions → Suspend** and confirm. Check for **Suspended** and verify that a fresh sign-in fails while A's app assignment remains. From the **Suspended** list, open A and click **Activate**. Test a fresh sign-in and verify the tile returns.
    3. Give C the training bookmark through **Assignments → Assign to People**. If you have a receiving app, provision C using the **Connected systems** tab before continuing. In **Directory → People → More Actions → Deactivate**, select only C and choose **Deactivate Selected**. Wait for **Deactivated**, check that a fresh sign-in fails, and verify the bookmark assignment is gone. Check the receiving record separately if connected.
    4. Open C under **Deactivated**, choose **Activate**, and complete any credential setup. Sign in again and inspect the app assignments before restoring the direct grant. C's account status and app assignments can recover separately.
    5. When the verification is complete, deactivate C again. Wait for **Deactivated**, open C, select **Delete**, and confirm only for this disposable record. Clear restrictive filters in **People** and search for C's exact username. It should no longer appear. Find the applicable actions under **Reports → System Log** using the test time and user.

    [Suspend and unsuspend](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm) · [Deactivate and delete](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Universal Logout for supported apps](https://help.okta.com/oie/en-us/content/Topics/apps/universal-logout-amfa.htm)

=== "Connected systems"

    Use an isolated integration and a different test identity for each import or first-sign-in path. Use the linked setup labs when the connector is new to you.

    1. **App CSV assignment.** Open **Applications → test app → Import → Import from CSV**. Download its template, add one disposable row, and upload it. Review validation and finish the import. Open **Assignments → People** and confirm the expected user. If the app lacks **Import from CSV**, use a separate eligible test app for this branch.
    2. **Connected import and matching.** Open the supported integration's **Provisioning → To Okta → User Creation & Matching**. Choose a supported exact match and leave automatic confirmation off for this exercise. Record the existing Okta user's ID. Run **Import → Import Now**, inspect the proposed match and new row, then confirm only the verified rows. Reopen the matched user and confirm the Okta ID stayed the same and the correct source account is linked.
    3. **First sign-in with AD JIT.** In the [AD lab](../../week-04-ad-and-ldap/lessons/03-activate-ad-users-and-configure-jit.md), enable delegated authentication and **Create and update users on login** for the test integration. Use an eligible source user absent from **People** and keep that user out of the confirmed import. Sign in with the AD test account and verify the new Okta record, linked source, and sign-in event. For an inbound identity provider, use its configured linking and JIT path.
    4. **Source-owned profile field.** Record the existing source value and **App to Okta User** mapping. Update the disposable value at its source, run the integration's supported sync, then compare the imported app profile and **People → user → Profile**. With two linked sources, follow [the attribute-priority lab](../manage-profiles/hands-on-labs.md#lab-7) and verify the stored value before and after the override.
    5. **Downstream offboarding.** Set up the [test provisioning integration](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md) with deactivation enabled, assign C, and verify C's receiving account. After Phase 5 deactivation, find the provisioning result in **System Log** and open the account at the receiver to confirm the target state. If the app keeps its own session, check it separately.
    6. **Import safeguard.** If a test import pauses, open **Reports → Import Monitoring**, open the warning, and compare the changed source scope with the affected users. For an unexpected scope change, choose **Cancel the Affected Import and Resume Other Imports**. Restore the intended scope, rerun the import, and verify only the intended changes. If the fixture cannot trigger the safeguard, use the linked procedure to see where the warning and recovery controls appear.

    If a connector or test target is unavailable, keep the relevant branch pending and continue with the other tabs.

    [App CSV assignment](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-users-csv.htm) · [Imported-user matching](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-matching-imported-users.htm) · [AD JIT](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-add-update-jit.htm) · [Resolve an import safeguard warning](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-resolve-import-safeguard.htm) · [Connect a provisioning target](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md)

=== "Troubleshoot access and clean up"

    **Ticket.** B should lose access to Training while keeping access to Reporting.

    1. Restore the Training bookmark's Readers and Reviewers grants in **Applications → Training → Assignments → Assign to Groups**. Add B to both groups. Create a second bookmark named `LAB-M1-PROJECT-Reporting`, create a disposable **Reports** group, add B to it, and assign that group to Reporting. Verify both tiles as B.
    2. Remove B from **Directory → Groups → Readers → People**. Sign in again as B. Both tiles should still appear. In **Reports → System Log**, find the successful Readers removal. This event confirms that one membership changed.
    3. Open **Training → Assignments → Groups** and compare its groups with **Directory → People → B → Groups**. B is still in Reviewers, which still grants Training. Confirm that Reporting is assigned through Reports.
    4. Remove B from **Reviewers → People**. Leave the Reports membership intact. Verify B is gone from the Training assignment and still present in Reporting. Sign in as B and check that only the Reporting tile remains.

    **Close the project.** Restore any test policies, enrollment settings, source mappings, and import schedules that you changed. Remove the temporary Help Desk scope and the project-only app and group grants. Retire only the disposable records you created. Clear test field values before removing the field if it is no longer referenced. Keep only sanitized evidence and mark each connected branch **live**, **simulated**, or **pending**.

## Project coverage

| Guided lab | Where you use it in the project |
| --- | --- |
| [1. Read a user record](hands-on-labs.md#lab-1) | Phases 1 and 2. Identify, filter, and export users and trace their profile and status. |
| [2. Create and activate](hands-on-labs.md#lab-2) | Phase 1. Create staged and immediately activated users and compare first sign-in. |
| [3. Import and match](hands-on-labs.md#lab-3) | Phase 1 and Connected systems. Validate CSV, compare app CSV and connected matching, and test JIT with a distinct identity. |
| [4. Trace ownership and mappings](hands-on-labs.md#lab-4) | Phase 2 and Connected systems. Edit a local value, diagnose an unmapped field, and verify a source-side update. |
| [5. Recover sign-in](hands-on-labs.md#lab-5) | Phase 4. Resolve password, lockout, and authenticator tickets with a fresh-sign-in check. |
| [6. Trace app access](hands-on-labs.md#lab-6) | Phase 3 and the guided access incident. Compare individual and overlapping group grants. |
| [7. Pause and offboard](hands-on-labs.md#lab-7) | Phase 5 and Connected systems. Compare session clearing, suspension, deactivation, reactivation, and deletion. |

[Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) · [Course exam coverage](../../exam/coverage.md)
