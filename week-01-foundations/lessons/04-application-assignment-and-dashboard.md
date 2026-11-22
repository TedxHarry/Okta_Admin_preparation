# Lesson 4 · Application assignment and the End-User Dashboard

=== "Theory"

    ## What you assign in Okta

    An **app integration** is the configuration for an application inside an Okta org. It can hold the address to open, how Okta signs users in, and, for supported integrations, how Okta sends account changes to the application. Creating an integration gives you something to manage in the Admin Console. An **assignment** connects that integration to a user or group so Okta knows who should receive it.

    The **Okta Integration Network**, or **OIN**, is Okta’s catalog of integrations. You can add an integration from the catalog or configure a custom integration for an application you manage. In this lab, you will add the catalog’s **Bookmark App**. A bookmark opens a URL from the dashboard. It is useful here because you can see the effect of the assignment using a simple link.

    ## Two ways to assign an integration

    | Assignment | What you configure | What to verify |
    | --- | --- | --- |
    | **Direct** | Assign the integration to a specific user. | In the integration’s **Assignments → People** view, find the user and inspect the assignment type. |
    | **Group** | Assign the integration to a group. Members receive the assignment through their membership. | In **Assignments → Groups**, find the group. In **Assignments → People**, find the user. Check **Directory → Groups → People** inside the group to confirm membership. |

    When you use a group rule, there are two separate decisions. The rule determines whether the user belongs to the group. The app integration determines whether that group receives the app. You can assign an app to a group whose membership you manage manually too. Okta uses the resulting membership for the assignment either way.

    If a user leaves an assigned group, that path to the app goes away. To explain whether the user should still receive the app, check for another assignment path. When more than one assigned group applies, the group priority can also matter for application settings supplied by those groups. We will use separate users for the two assignment methods in this lab so the result is easy to trace.

    **Converting an assignment changes who manages it.** On the user's **Applications** view, **Individual** means Okta manages that assignment for the user. A group name means the group manages it. If you need to convert an individual assignment, assign the app to the intended group first, then use **Convert Assignments** where available. Verify the group name afterward. The group can now supply the user's app settings as well as their access. [Okta · Convert app assignments to group managed](https://help.okta.com/oie/en-us/content/topics/apps/apps-convert-to-group-managed.htm)

    ### When two groups assign different app values

    A user can get the same integration through two groups. Some apps let you set values such as the user's app role on each group assignment. If the values differ, **group priority** determines which group's assignment data the user gets. Open the app's **Assignments → Groups** to inspect the order. You can drag a group to change its priority. After changing the order in a test app, check the user's app assignment and compare the actual values with the intended ones. [Okta · Prioritize application groups](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-prioritize-app-group.htm)

    Supported app fields that hold a list can use **Combine values across groups**. In **Directory → Profile Editor**, open the app's profile and inspect the field. For example, this can combine license values from two groups in Office 365. A bookmark has no app role or license field to compare. [Okta · Attribute group priority](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-assign-app-group-priority.htm) · [Okta · Combine values across groups](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-combine-values-use.htm)

    For one app and several groups, start at the app's **Assignments → Assign → Assign to Groups**. For several apps and one group, open that group under **Directory → Groups** and select **Manage Apps**. [Okta · Assign one app to groups](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-assign-app-group.htm) · [Okta · Assign multiple apps to one group](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-assign-multiple-app-group.htm)

    ## Three things to check when a user asks for access

    1. **Assignment** tells you whether Okta has made the integration available to the user. Check the integration’s **Assignments** tab.
    2. **Dashboard visibility** controls whether the user sees a tile. Check the integration’s visibility settings and sign in as the affected test user. The dashboard you see as an administrator shows your own tiles.
    3. **Access inside the target application** depends on how the integration and application are configured. **Single sign-on (SSO)** lets the user use an existing identity session or authentication flow to sign in to a connected app. **Provisioning** is the separate process that creates or updates an account on a target system when the integration supports it and is configured to do so. A Bookmark App opens a URL and supports neither SSO nor provisioning for the destination. Seeing its tile shows that the link is available on the dashboard.

    When a tile is missing, start with the affected user’s identity and the exact integration label. Check **Assignments → People**. If the user is missing there and you expect a group assignment, check whether the correct group is assigned and whether the user belongs to it. If the user is assigned and the tile is missing, look for the option that hides the app icon and verify the dashboard in the right user session.

    ## Official reading

    - [Create a Bookmark App integration](https://help.okta.com/oie/en-us/content/Topics/apps/apps-create-bookmark.htm)
    - [Assign app integrations](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-assign-applications.htm)
    - [Manage app integration assignments](https://help.okta.com/oie/en-us/Content/Topics/apps/apps-manage-assignments.htm)
    - [Configure application visibility and other app settings](https://help.okta.com/en-us/Content/Topics/Apps/apps-configure-settings.htm)

=== "Hands-on Lab"

    ## Lab 4 · Trace an app assignment to the dashboard

    Work through the two sublabs in order. The second uses the same integration and test users as the first.

    === "1. Configure and test group assignment"

        ### 1. Check the two test users

        Use the Integrator org, the two active test users from Lesson 2, and the `LAB-Finance` group and `LAB-Finance-by-Department` rule from Lesson 3. The rule puts matching users into `LAB-Finance`. In this lab you will create `LAB-Assignment-Bookmark`, a Bookmark App integration that opens `https://example.com/`, and assign it to that group. Use an account with permission to create and assign a Bookmark App. Okta documents **Super Admin** or **App Admin** for that part of the lab. You also need permission to edit your two test profiles for the mover test.

        Open **Directory → Groups**, select `LAB-Finance`, and check **People**. The first user should be a member, with Department set to `Lab-Finance`. The second should be outside the group, with Department set to `Lab-Operations`. Keep the Admin Console and test-user sign-ins in separate browser profiles. An incognito window is another option if you close all incognito windows between test users.

        ### 2. Add a Bookmark App

        1. Go to **Applications and Resources → Applications → Browse App Catalog**.
        2. Search for **Bookmark App**, open the catalog entry, and select **Add Integration**.
        3. Enter `LAB-Assignment-Bookmark` as the label and `https://example.com/` as the URL. Keep the tile visible to users if the form offers a visibility option. Select **Done**.
        4. Open the new integration’s **Assignments** tab. Start with an empty assignment list for this lab app.

        ### 3. Assign the integration to the Finance group

        1. In the new integration, select **Assignments → Assign → Assign to Groups**.
        2. Find `LAB-Finance`, select **Assign** next to it, and select **Done** after completing any prompt. Use only the lab group.
        3. In **Assignments**, use the **Groups** filter to confirm that `LAB-Finance` is assigned. Use the **People** filter to confirm that the first test user now receives the integration and the second user does not.

        ### 4. Compare the two dashboards

        1. Sign in as the first test user and open their End-User Dashboard. Find `LAB-Assignment-Bookmark` and select it. It should open the example URL.
        2. In a separate test session, sign in as the second user. The tile should be absent. If it is present, check the integration’s People and Groups filters for an extra assignment before going on.

    === "2. Compare direct access and test a move"

        ### 5. Give the second user a direct assignment

        1. In the Admin Console, open the lab integration and select **Assignments → Assign → Assign to People**.
        2. Select **Assign** next to the second test user. Complete any assignment prompt, then select **Done**.
        3. In **Assignments → People**, compare the first user’s group assignment with the second user’s individual assignment. Refresh or reopen the second user’s dashboard and confirm the tile appears.

        ### 6. Change the first user’s department

        1. In **Directory → People**, open the first test user and use **Profile → Edit** to change **Department** from `Lab-Finance` to `Lab-Operations`. Save the change.
        2. Return to `LAB-Finance` and check its **People** tab after the rule updates membership.
        3. Return to the lab integration’s **Assignments → People**. The first user should lose the assignment through `LAB-Finance`. The second user should remain individually assigned. Refresh the test dashboards to confirm the difference.

        ### 7. Restore the department and trace the assignment back

        1. Change the first test user’s **Department** back to `Lab-Finance`.
        2. Verify the result in this order: the saved profile value, the group’s **People** tab, the integration’s **Assignments → People**, and the user’s dashboard.
        3. If the tile does not return, use the first missing result to decide where to investigate. A missing group member points to the profile or rule. Membership without the app assignment points to the integration’s Groups filter. An assignment with a missing tile points to visibility or the signed-in user.

        ### 8. Remove the second user’s direct assignment

        1. In the lab integration’s **Assignments → People**, find the second test user. Verify you have the individual assignment before selecting the **Unassign** control for that row and confirming.
        2. Confirm the second user’s tile disappears after refresh. Verify the first user still has the tile through `LAB-Finance`. Leave the integration and the Finance group in place for the next lab.
