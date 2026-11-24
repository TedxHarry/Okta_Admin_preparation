# Lesson 7 · Pause access, end sessions, and offboard a user

=== "Theory"

    A user leaves a browser signed in on a shared computer. Another starts a leave of absence. A third has left the company. All three cases can start in **Directory → People**, but each calls for a different result. Decide whether to end a session, block the next sign-in temporarily, or remove the assignments that give the user access.

    ## Choose the action by what must change

    An **Okta session** lets a browser continue as a user after Okta accepts their sign-in. An app can establish a separate session of its own. An **app assignment** is the relationship that makes the integration available to the user, as you saw in [Lesson 6](06-give-find-and-remove-app-access.md).

    | Action | What happens in Okta | What to check next |
    | --- | --- | --- |
    | **Clear User Sessions** | Ends the user's existing Okta sessions. The account can still start a fresh sign-in if policy allows, and its app assignments remain. | Revisit a protected Okta page from the old session, then try a fresh sign-in. |
    | **Suspend** | Ends active Okta sessions and blocks new ones. Okta keeps the user record, group memberships, and app assignments. | Check **Suspended**, confirm a fresh sign-in is blocked, and find the assignments still in place. |
    | **Deactivate** | Ends Okta sessions, blocks sign-in, and removes app assignments. The user record and group memberships remain. | Wait for background processing, confirm **Deactivated**, and check connected apps separately. |
    | **Delete** | Permanently removes the deactivated Okta user record. | Check the intended record and your retention requirements before confirming. |

    [Okta · Clear a user session](https://support.okta.com/help/s/article/how-to-clear-user-session) · [Okta · Suspend and unsuspend users](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    ## Sign out the user and check the scope

    Open **Directory → People → user → More Actions → Clear User Sessions**. Okta documents this option for active users and notes that it can be absent during a password reset or just after reactivation. Read the confirmation dialog for the scope your org offers. **OAuth and OpenID Connect tokens** are credentials that connected apps can use to access resources or renew access. Token revocation, ending an Okta browser session, and ending a session maintained by a connected app each have their own evidence.

    Where **Universal Logout** is available, the dialog offers an option to include logout-enabled apps and Okta API tokens. Universal Logout is Okta's mechanism for requesting sign-out from supported, configured apps. If you need an existing session at a particular app to end, verify at that app. A fresh Okta sign-in prompt proves the old Okta session ended. [Okta · Clear a user session](https://support.okta.com/help/s/article/how-to-clear-user-session) · [Okta · Configure Universal Logout](https://help.okta.com/en-us/content/topics/apps/universal-logout-amfa.htm)

    ## Bring someone back after a pause or deactivation

    For a planned leave, open the person and choose **More Actions → Suspend**. When they return, filter **Directory → People** to **Suspended**, open their record, and choose **Activate**. In that state, **Activate** lifts the suspension. The existing assignments are already in place. Verify with a fresh sign-in before handing the account back. [Okta · Suspend and unsuspend users](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm)

    From a **Deactivated** record, **Activate** starts reactivation. Follow the activation or credential setup that the org presents. Then look up the app assignments individually. A retained group membership or a group rule can make an app available again. An app previously granted directly may need to be reassigned. A status of **Active** confirms the state of the Okta account. The app's **Assignments** tab tells you whether the user receives that app. [Okta · Reactivate a user profile](https://help.okta.com/oie/en-us/content/Topics/provisioning/lcm/lcm-reactivate-user.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    ## Verify offboarding in each system that held access

    For an Okta-managed user, deactivation also removes the Okta password. Okta documents that it revokes admin roles and unassigns the Okta Admin app. If the user held admin access, verify that separately during offboarding. Use disposable non-admin users for this module's exercises. [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    The documented bulk path is **Directory → People → More Actions → Deactivate**. Select the intended users, choose **Deactivate Selected**, and confirm. Wait for the background operation to finish. Check the user's **Deactivated** status, the app's assignments, and the relevant events in **Reports → System Log**. If the account is managed through Okta Privileged Access, Okta requires ending Privileged Access for that user first.

    **Downstream deprovisioning** means removing access at the receiving application, such as disabling its separate account. Check whether the integration supports and has enabled deactivation. Okta also documents exceptions for inactive, private, system, and deprecated apps. For a connected app, verify the account and any existing session at the target. [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Okta · Configure app provisioning](https://help.okta.com/en-us/Content/topics/provisioning/lcm/lcm-provision-application.htm)

    Use **Delete** after deactivation when you need to remove the Okta record permanently. From **Directory → People**, open the deactivated user, select **Delete**, and confirm. Okta prevents deletion of a technical or billing contact. Account references can remain for the applicable retention period. If your workflow needs a reversible stop, keep the user deactivated and retain the evidence required for the offboarding record. [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

=== "Hands-on Lab"

    Use an Okta Identity Engine lab org, an administrator who can manage test-user lifecycle and app assignments and read the System Log, and a new, disposable Okta-managed test user with an inbox you control. Keep separate browser sessions for the administrator and test user. Reuse `LAB-Manage-Users-Bookmark` from [Lesson 6](06-give-find-and-remove-app-access.md) or create it using that lesson. The **Bookmark App** opens a public URL and gives you an assignment and tile to inspect. Use **Everyone** as the membership you compare. Confirm that the bookmark is granted to the test user only through an individual assignment for this exercise.

    === "1. End a session and compare suspension"

        1. **Establish a baseline.** Create and activate a new disposable user using [Lab 2](02-create-and-activate-a-user.md#__tabbed_1_2). Open **Applications and Resources → Applications → LAB-Manage-Users-Bookmark → Assignments → Assign → Assign to People**, select the user, and finish the assignment. In the test-user browser, sign in and find the tile. In the admin browser, record the account status, the **Everyone** membership, and the individual assignment.
        2. **End the session.** In **Directory → People**, open the test user's record and select **More Actions → Clear User Sessions** and confirm the Okta session action. Revisit the protected dashboard in the test browser. Expect to be prompted to sign in again. Complete a fresh sign-in and verify the bookmark still appears. If the action is unavailable, check whether the user's status or recent activation explains it and record the limitation.
        3. **Suspend and test again.** On the test user, select **More Actions → Suspend**. Confirm the status and revisit the dashboard. Try a fresh sign-in. It should be blocked. In the admin browser, verify that the group membership and individual assignment remain.
        4. **Lift the suspension.** Open the same user from the **Suspended** filter and select **Activate**. Check a fresh sign-in and verify the existing bookmark assignment still works.

    === "2. Deactivate, reactivate, and verify"

        1. **Deactivate the test user.** From the **Directory → People** list, choose **More Actions → Deactivate**. Select only the disposable test user, choose **Deactivate Selected**, and confirm. Wait for deactivation to finish.
        2. **Compare the evidence.** Open the user under **Deactivated**. Verify that fresh Okta sign-in fails, **Everyone** still appears, and the bookmark's **Assignments** view no longer includes the user. If the assignment is still visible, check whether background processing has finished and compare the exact username.
        3. **Reactivate and restore the grant.** Select **Activate** on the deactivated record and complete any required activation or credential setup. Verify a fresh sign-in. Inspect the bookmark assignment before changing anything. With the lab's direct-only starting grant, expect to reassign it. If the bookmark has returned, check the app's assigned groups against the user's memberships and explain the access path.
        4. **Close out the exercise.** In **Reports → System Log**, narrow the time range and inspect the affected user, action, and outcome for the lifecycle changes. Remove the lab app grant when finished. For optional deletion practice on this disposable user, deactivate it again, wait for **Deactivated**, then open the user and confirm **Delete**. Search for the same username under **Directory → People** and verify the record is gone.

    **Independent check.** A teammate needs a temporary hold for a leave of absence and should return with the same app grants. Choose the action, predict what happens to the existing Okta session and app assignments, and name the evidence you would collect before and after restoring access.

    [Okta · System Log filters and search](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm) · [Module 3 · Suspend, deactivate, and restore a user](../../week-02-directory-and-lifecycle/lessons/03-user-account-lifecycle.md)
