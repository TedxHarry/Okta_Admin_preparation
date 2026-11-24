## Lab 6 · Trace app access { #lab-6 }

### Set up a test app and two test users

Use an Okta Identity Engine lab org, two active test users whose sign-ins you control, and an admin account with Super Admin or App Admin permissions for the bookmark. You also need permission to manage the lab groups and read the System Log. Keep the admin and test-user browser sessions separate.

1. In **Applications and Resources → Applications**, choose **Browse App Catalog**, search for **Bookmark App**, and choose **Add Integration**. Set the label to `LAB-Manage-Users-Bookmark`, enter `https://example.com/`, and finish the form. Leave its dashboard icon visible and confirm the new integration has no assignments. The bookmark opens a public URL and gives you a tile to inspect. [Okta · Create a Bookmark App integration](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm)
2. In **Directory → Groups**, use **Add Group** to create `LAB-Bookmark-Readers` and `LAB-Bookmark-Reviewers`. Open each group, use **Assign people**, and add B only. Verify B on the **People** tab of both groups. You can reuse A and B from [Lab 2](hands-on-labs.md#lab-2). [Okta · Manually assign people to a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm)

### Assign, trace, and remove access

1. Open the bookmark's **Assignments → Assign → Assign to People**. Find A and choose **Assign**, then finish the dialog. Repeat with **Assign to Groups** for Readers and Reviewers. Leave B without an individual assignment. Verify both groups in the **Groups** filter.
2. Open each user's **Applications** tab and inspect how the bookmark is assigned. Compare the app's **People/Users** and **Groups** filters with user B's group memberships. Sign in as each test user and confirm the bookmark appears and opens the URL.
3. Open **Directory → Groups → LAB-Bookmark-Readers**. Use the remove control on B's row under **People** and confirm. Before refreshing the dashboard, predict whether the tile should stay. It should remain because **Reviewers** still grants the bookmark. Verify that user B is still assigned and can see the tile.
4. Remove user B from **Reviewers**. Verify that user B loses the assignment and the tile in a fresh session. Verify that user A still has the individual assignment.
5. Back in the app's **Assignments** tab, find A under **People** or **Users** and select **X** on A's assignment. Confirm the removal. Verify that neither user appears as assigned and neither sees the bookmark. The two groups can still appear as assigned because removing a member does not unassign the group itself.

| Lab state | User A | User B |
| --- | --- | --- |
| After granting access | Assigned directly | Assigned through two groups |
| After removing B from Readers | Assigned | Still assigned through Reviewers |
| After removing B from Reviewers | Assigned | No assignment |
| After removing A's direct assignment | No assignment | No assignment |

### Explain the evidence and reset the lab

Open **Reports → System Log** and narrow the time window to the lab. Inspect the relevant group membership or app assignment events, including the actor, target, and outcome. Use the current **Assignments** view to prove who still receives the app. A membership removal event tells you which path changed. The remaining assignment explains why user B could still see the tile after the first removal. [Okta · System Log filters and search](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm)

For independent practice, restore both of user B's group memberships. Remove the **Readers** group assignment from the app itself and explain why B keeps access. Remove the **Reviewers** assignment and verify that B still belongs to both groups while losing the app. This time you changed what the groups grant. In the earlier exercise you changed who belonged to the groups. Finish by removing the two test users from the dedicated lab groups if you want to return the exercise to an empty starting state.

For the broader configuration sequence, see [Application assignment and the End-User Dashboard](../../week-01-foundations/lessons/04-application-assignment-and-dashboard.md). For target account creation and deactivation, see [Application provisioning](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md).
