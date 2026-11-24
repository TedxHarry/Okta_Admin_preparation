## Lab 7 · Pause and offboard { #lab-7 }

Use an Okta Identity Engine lab org, an administrator who can manage test-user lifecycle and app assignments and read the System Log, and a new, disposable Okta-managed test user with an inbox you control. Keep separate browser sessions for the administrator and test user. Reuse `LAB-Manage-Users-Bookmark` from [Lab 6](hands-on-labs.md#lab-6) or create it using that lesson. The **Bookmark App** opens a public URL and gives you an assignment and tile to inspect. Use **Everyone** as the membership you compare. Confirm that the bookmark is granted to the test user only through an individual assignment for this exercise.

### 1. End a session and compare suspension

1. **Establish a baseline.** Create and activate a new disposable user using [Lab 2](hands-on-labs.md#lab-2). Open **Applications and Resources → Applications → LAB-Manage-Users-Bookmark → Assignments → Assign → Assign to People**, select the user, and finish the assignment. In the test-user browser, sign in and find the tile. In the admin browser, record the account status, the **Everyone** membership, and the individual assignment.
2. **End the session.** In **Directory → People**, open the test user's record and select **More Actions → Clear User Sessions** and confirm the Okta session action. Revisit the protected dashboard in the test browser. Expect to be prompted to sign in again. Complete a fresh sign-in and verify the bookmark still appears. If the action is unavailable, check whether the user's status or recent activation explains it and record the limitation.
3. **Suspend and test again.** On the test user, select **More Actions → Suspend**. Confirm the status and revisit the dashboard. Try a fresh sign-in. It should be blocked. In the admin browser, verify that the group membership and individual assignment remain.
4. **Lift the suspension.** Open the same user from the **Suspended** filter and select **Activate**. Check a fresh sign-in and verify the existing bookmark assignment still works.

### 2. Deactivate, reactivate, and verify

1. **Deactivate the test user.** From the **Directory → People** list, choose **More Actions → Deactivate**. Select only the disposable test user, choose **Deactivate Selected**, and confirm. Wait for deactivation to finish.
2. **Compare the evidence.** Open the user under **Deactivated**. Verify that fresh Okta sign-in fails, **Everyone** still appears, and the bookmark's **Assignments** view no longer includes the user. If the assignment is still visible, check whether background processing has finished and compare the exact username.
3. **Reactivate and restore the grant.** Select **Activate** on the deactivated record and complete any required activation or credential setup. Verify a fresh sign-in. Inspect the bookmark assignment before changing anything. With the lab's direct-only starting grant, expect to reassign it. If the bookmark has returned, check the app's assigned groups against the user's memberships and explain the access path.
4. **Close out the exercise.** In **Reports → System Log**, narrow the time range and inspect the affected user, action, and outcome for the lifecycle changes. Remove the lab app grant when finished. For optional deletion practice on this disposable user, deactivate it again, wait for **Deactivated**, then open the user and confirm **Delete**. Search for the same username under **Directory → People** and verify the record is gone.

**Independent check.** A teammate needs a temporary hold for a leave of absence and should return with the same app grants. Choose the action, predict what happens to the existing Okta session and app assignments, and name the evidence you would collect before and after restoring access.

[Okta · System Log filters and search](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm) · [Suspend, deactivate, and restore a user](../../week-02-directory-and-lifecycle/lessons/03-user-account-lifecycle.md)
