# Lesson 3 · Suspend, deactivate, and restore a user

=== "Theory"

    In Foundations you activated a user for the first time. Now start with someone who already has access. Open their record under **Directory → People** and ask two questions. Can this person sign in to Okta? Which applications has Okta assigned to them? Those questions have different answers when you suspend a user.

    ## What changes when you suspend someone?

    A **session** begins when Okta accepts a sign-in and lets the browser continue as that user. Suspending the user ends their active Okta sessions and blocks new ones. Okta keeps the user record, group memberships, and app assignments. This is why you can still find the person on an application's **Assignments** tab while their sign-in is blocked.

    **Unsuspend** means to lift that hold. In the Admin Console the button on the suspended user's record reads **Activate**. The person can start a fresh sign-in, subject to the usual sign-in policies. The assignments you saw during suspension are already there.

    ## What changes when you deactivate someone?

    **Deactivate** starts a broader removal of access. Okta stops its sessions, removes app assignments, and deletes the user's Okta password. The directory record and group memberships remain. In **People**, the status reads **Deactivated**. The corresponding lifecycle state is also called **Deprovisioned**.

    Think back to the two assignment paths from Foundations. A **direct assignment** connects one person to one app. A **group assignment** grants the app through a group. After you reactivate a user, a retained group membership can give them the app again. A previous direct grant may need to be made again. Seeing **Active** tells you about the Okta account. To find out whether app access returned, open the app and inspect the assignment.

    | What you inspect | After suspension | After deactivation completes |
    | --- | --- | --- |
    | Fresh Okta sign-in | Blocked | Blocked |
    | User in Directory → People | Present, Suspended | Present, Deactivated |
    | Existing app assignments | Retained | Removed |
    | Existing Okta group memberships | Retained | Retained |
    | What restoring access involves | Activate the user and sign in again | Reactivate, complete any credential setup, and check how each app is assigned |

    ## Where does Okta's evidence end?

    The **Assignments** tab shows what Okta granted. A separate account inside a connected application has its own status. Disabling that separate account depends on whether the integration can send a deactivate request to the app and whether you enabled it. That kind of account change in the receiving app is called **downstream deprovisioning**. A bookmark simply opens a URL. It has no downstream account to disable. Likewise, an Okta session and a session maintained by another application are distinct. To investigate either, check the system that issued it.

    Two other actions answer different needs. **Unlock** addresses a sign-in lockout, such as exceeding a password-attempt limit. **Delete** permanently removes a previously deactivated user. If you need to reopen the same directory record later, leave it deactivated.

    ## Official reading

    - [Suspend and unsuspend users](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm)
    - [User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm)
    - [Deactivation, deletion, and their effects](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-deactivate-user-account.htm)
    - [Reactivate a user profile](https://help.okta.com/oie/en-us/content/Topics/provisioning/lcm/lcm-reactivate-user.htm)

=== "Hands-on Lab"

    Use a **new Okta-managed test user** with a mailbox you control. Keep the admin session in your normal browser and use a private window for the test user. You need permission to manage users and assign `LAB-Assignment-Bookmark`, the Foundations Okta bookmark app that opens `https://example.com/`. Work through both tabs with the same account.

    === "1. Suspend and resume"

        **1. Establish a working sign-in.** In **Directory → People → Add person**, create the test user with **Activate now**. Leave Department blank so the Finance rule from Foundations does not assign the bookmark. Complete activation and any required enrollment in the private window. Open the End-User Dashboard. Keep this window open so you can test the session.

        **2. Give the user one direct assignment.** In the admin window open **Applications and Resources → Applications → LAB-Assignment-Bookmark → Assignments → Assign → Assign to People**. Find the new username, select **Assign**, then **Save and Go Back → Done**. Find their row again and verify the assignment is individual. If the bookmark is missing, create it using [Foundations, Lesson 4](../../week-01-foundations/lessons/04-application-assignment-and-dashboard.md). Refresh the test dashboard and locate the bookmark tile.

        **3. Suspend and inspect both sides.** Go to **Directory → People**, open the test user, and select **More Actions → Suspend**. Confirm the username before submitting. Look for **Suspended**. Reopen the bookmark's **Assignments** tab and find the same user. Now refresh the test dashboard and attempt a fresh sign-in with the test credentials. The assignment remains visible to the admin while Okta blocks the user's access.

        **4. Restore sign-in.** In **Directory → People**, filter by **Suspended**, open the same person, and select **Activate**. Sign in again in the private window. Locate the bookmark on the dashboard. You have recovered access without assigning the bookmark a second time.

    === "2. Deactivate and rebuild access"

        **1. Identify what should survive.** On the test user's record, open **Groups** and note the **Everyone** membership. Open the bookmark's **Assignments** tab and locate the individual assignment again. These two observations give you something specific to compare after deactivation.

        **2. Deactivate this user only.** From the **Directory → People** list, choose **More Actions → Deactivate**. Select only the disposable username, choose **Deactivate Selected**, and confirm **Deactivate**. Okta processes deactivation in the background. Wait for completion, then use the **Deactivated** status filter to reopen the record. Compare **Groups** and the app's **Assignments** list with task 1. Expect to find the membership and see the individual assignment gone.

        **3. Reactivate the same record.** From the deactivated user's page, select **Activate** and follow the offered activation or password setup flow. Complete any email step in the test browser. Once the record shows **Active**, sign in and inspect the dashboard. Check the bookmark assignment in the admin window too. If the bookmark already returned, examine whether a group grants it before making a direct assignment.

        **4. Restore the direct grant and trace the changes.** If the bookmark is missing, repeat **Assign → Assign to People** for this user and refresh the test dashboard. In the admin window open **Reports → System Log**, narrow the time range to the lab, and search for the disposable username. Expand the suspension and deactivation entries. Read **Actor** to identify who initiated each action and **Target** to identify whose account changed. The user's current status shows where the account ended up. The log lets you reconstruct how it got there.
