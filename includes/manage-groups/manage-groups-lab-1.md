## Lab 1 · Identify the group and its owner { #lab-1 }

Use an Okta Identity Engine lab org. You need an account that can view the target group and its app assignments. For the setup below, use a test administrator who can manage test users and groups and create and assign a Bookmark App. Keep separate admin and test-user browser sessions.

| Lab object | Purpose |
| --- | --- |
| **A** and **B** | Two active disposable Okta-managed users. A is the member to verify. B is the control user who stays outside the group. You can reuse the two users from [Manage Users](../manage-users/hands-on-labs.md#lab-2). |
| `LAB-M2-Finance-Access` | A native Okta group created for this exercise. Use a dedicated group with no existing rules or policy assignments. |
| `LAB-M2-Finance-Bookmark` | A Bookmark App pointing to `https://example.com/`. Its tile lets you verify assignment. The destination has no provisioned account in this exercise. |

### 1. Set up a member and a control

1. If you need new users, choose **Directory → People → Add Person**. Create two users with distinct email-format usernames and inboxes you control, select **Activate now**, and complete any setup prompts. Sign in once as each before testing. Keep B out of the test group and give B no direct assignment to the test bookmark.
2. Go to **Directory → Groups → Add Group**. Enter `LAB-M2-Finance-Access` and the description `Module 2 test group for source and assignment checks`, then save. Open the group, choose **Assign people**, and assign A only. Check the group's **People** list before proceeding.
3. Go to **Applications and Resources → Applications → Browse App Catalog**, find **Bookmark App**, and choose **Add Integration**. Enter `LAB-M2-Finance-Bookmark` and `https://example.com/`, then choose **Done**. In the app's **Assignments → Assign → Assign to Groups**, select the test group and finish the assignment. Keep the icon visible on the dashboard.

If your role can only inspect, ask the lab admin to prepare the objects above. You can complete the search and evidence checks with the appropriate read permissions. [Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Okta · Create a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm) · [Okta · Manually assign people to a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm) · [Okta · Create a bookmark](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm) · [Okta · Assign app integrations](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-assign-applications.htm)

### 2. Find the group and follow the access path

1. In **Directory → Groups**, search for `LAB-M2-Finance`. Locate the intended result. Try `Finance-Access` in the basic search and compare it with **Advanced Search → group name → Contains**. Clear any old filters and use the **Group source type** filter to confirm the group is native Okta.
2. Open the group and record the group ID from the Admin Console URL in your lab notes. In **People**, find user A by exact username and verify B is absent. In **Directory → People**, open A and check **Groups** as a second view. If a group count is stale, inspect the member list.
3. Open the bookmark's **Assignments** tab. Under **Groups**, verify that `LAB-M2-Finance-Access` grants the app. Under **People/Users**, look for A and verify that B is absent. If B appears, check for another assignment path before proceeding.
4. Sign in to the End-User Dashboard as A and B in separate sessions. Expect A to see the bookmark and B to lack it. If A is assigned but sees no tile, check the app visibility and the signed-in username before touching membership.

**Evidence to record:** group name, source, group ID, A and B membership results, grant path, and dashboard result for each test user. Redact account identifiers and tenant details from anything you share.

### 3. Explain the same-name ticket

If you have a connected test directory, open an existing disposable imported group and compare its source and membership with your native group. Inspect the upstream group with the directory administrator if you have access. This comparison is read-only.

If you do not have a directory connector, use this **simulated evidence**. The labels below describe two records rather than instructions for creating an AD integration.

| Evidence | Native record | Imported record |
| --- | --- | --- |
| Display name | Finance Access | Finance Access |
| Group ID in the ticket | Record A | Record B |
| Source | Okta | AD test directory |
| App assignment | Research Bookmark | Payroll Training |
| Membership authority for this case | Okta manual membership | AD source group, with write-back unavailable |

The ticket says Jordan needs **Payroll Training**. Identify the record to investigate, where to check or change membership, and what evidence you would use after import. Then explain why adding Jordan to the native group would fail to meet the ticket.

<details class="revision-answer">
<summary>Show the ticket outcome</summary>
<p>Use Record B because it is the group assigned to Payroll Training. Confirm the correct AD group and arrange the membership change at its source. After import, verify Jordan in that exact group's member list and check Payroll Training's assignment. Record A grants a different app.</p>
</details>

**Pass check.** You can identify a group by its source and ID, prove membership and assignment separately, and name the right place to make a membership change. Keep the test group, users, and bookmark for later Manage Groups exercises. If you finish here, remove only the grants and membership you added to these disposable objects.
