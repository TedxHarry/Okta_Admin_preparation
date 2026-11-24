## Lab 6 · Assign apps and resolve group priority { #lab-6 }

Use two bookmarks to trace assignment paths. Then work through a profile comparison that shows which values a group-managed user would receive.

### Set up the test users, groups, and bookmarks

Use an isolated Okta Identity Engine org with Super Admin access and three Active, disposable non-admin users who can sign in. Use separate browser profiles for the admin and test users. This lab has no dependency on earlier labs.

1. Go to **Directory → Groups → All → Add group**. Create `Lab-GR6-East` and `Lab-GR6-West`. Open each group and use **Assign People** to set the memberships below.

    | Test user label | East | West |
    | --- | --- | --- |
    | Dual member | Yes | Yes |
    | East member | Yes | No |
    | Control | No | No |

2. Go to **Applications and Resources → Applications → Browse App Catalog**. Search for **Bookmark App**, open it, and click **Add Integration**. Enter the label `Lab-GR6-Travel` and the URL `https://example.com/`, then click **Done**. Repeat for `Lab-GR6-Docs` using `https://example.org/`. Keep the icons visible on the End-User Dashboard.
3. These bookmarks are dashboard links. You will test app assignments and tile visibility with them. They have no external account provisioning or app-role settings.

[Create a Bookmark App integration](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm)

### 1. Assign one app to two groups and give East a second app

1. Open **Applications and Resources → Applications → Lab-GR6-Travel → Assignments → Assign → Assign to Groups**. Assign East and West. Finish each dialog and click **Done**.
2. Open **Directory → Groups → Lab-GR6-East → Manage Apps**. Verify Travel is assigned. Assign Docs, complete the dialog, and click **Done**.
3. In each bookmark’s **Assignments** tab, filter by **Groups** to confirm its assigned groups, then by **People** to check which users have type **Group**. In the separate test browser, sign in as each user and compare the dashboard with this baseline.

    | Test user | Travel | Docs |
    | --- | --- | --- |
    | Dual member | Visible | Visible |
    | East member | Visible | Visible |
    | Control | Absent | Absent |

[Assign one app to several groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-app-group.htm) · [Assign apps from a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-multiple-app-group.htm)

### 2. Remove one path and explain the result

1. In **Directory → Groups → Lab-GR6-East**, remove the Dual member from the group’s People list. Leave their West membership in place.
2. After processing, check **Assignments → People** on both bookmarks. The Dual member should still have Travel through West and should be absent from Docs. Refresh the user dashboard, or sign out and back in if the view is stale. The East member should still see both bookmarks.
3. If a tile is missing while the person still appears under **Assignments → People**, check **General → App Settings** for application visibility and verify the test browser is signed in to the intended user.

### 3. Compare individual and group assignment

1. In **Lab-GR6-Docs → Assignments → Assign → Assign to People**, assign Docs directly to the Control user. Verify the person’s assignment type is **Individual**.
2. Add that user to East. Verify that East is assigned to Docs and check the user’s assignment type again. If it is still **Individual** and **Convert Assignments** is available, choose **Select assignments to convert**, select only this user, and click **Convert selected**. Verify that the user now shows type **Group** and still sees Docs.
3. If the bookmark does not expose conversion, keep the first assignment type as evidence and read the linked conversion procedure. If it already shows **Group**, record the observed state. Restore the Control user to neither group at cleanup.

[Convert an individual assignment to a group assignment](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-convert-user-group.htm)

### 4. Compare group priority and combined values

Use this paper exercise with an imaginary app called **Lab License Portal**. It has a group-configurable string array called **Licenses**. Treat the two license codes as values in a set for the comparison.

| Assigned group | Licenses value |
| --- | --- |
| East | `["BASE"]` |
| West | `["ANALYTICS"]` |

Predict the outcome before opening the answers.

| Case | User belongs to | Group order | Attribute setting |
| --- | --- | --- | --- |
| A | East and West | East above West | Use Group Priority |
| B | East and West | West above East | Use Group Priority |
| C | East and West | West above East | Combine values across groups |
| D | East only | West above East | Use Group Priority |

<details class="revision-answer">
<summary>Show expected values</summary>
<ul>
<li>A receives BASE.</li>
<li>B receives ANALYTICS.</li>
<li>C receives both BASE and ANALYTICS. Compare which values appear without relying on array order.</li>
<li>D receives BASE because East is the only applicable group.</li>
</ul>
</details>

**Optional live check.** If you have a disposable integration with an eligible, group-configurable app array attribute and two distinct accepted values, repeat A–D with that field. Use test identities in the target app, and avoid consuming paid licenses or changing a shared app schema. Set each group’s value in the app’s assignment dialog. Use **Assignments → Groups** to reorder groups, **Directory → Profile Editor → app Profile** to change the attribute setting, and **Assignments → People → Edit** to compare the affected app profile values. Use a group-managed dual member and an East-only user. If provisioning is enabled, verify the resulting values on the test account in the target app. Restore the original group order, attribute setting, and test assignments when finished.

[Group priority and Office 365 licenses](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-combine-values-use.htm) · [Supported attribute types and settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-app-group-priority.htm) · [Inspect assignment inheritance](https://support.okta.com/help/s/article/How-to-see-from-which-group-the-user-inherits-the-assignment-for-an-app)

### 5. Diagnose an assigned app that denies sign-in

Use this short scenario for a sign-in-enabled test app. The user is assigned through East and the app’s **People** view shows type **Group**. The first matching policy rule requires Okta FastPass, and the user has only enrolled a password. Identify which record proves assignment and which policy rule explains the sign-in result. Changing East’s assignment priority would only affect inherited app values. Inspect the app sign-in policy and the user’s enrolled authenticators to explain the failure.

[Add an app sign-in policy rule](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm)

### Reset the lab

Remove the two groups from the disposable bookmarks. If Docs still lists the Control user as **Individual**, remove that separate assignment. Verify the tiles are gone from the test dashboards. Remove the test members from the two groups, then delete the disposable groups and bookmarks if you no longer need them.
