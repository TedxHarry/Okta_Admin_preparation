# Lesson 6 · Group Push

=== "Theory"

    In [Lesson 5](05-application-provisioning.md), you gave a test user an app assignment and looked up the account that Okta provisioned. A target app can also have groups of its own. **Group Push** lets Okta create or link a group in a supported app and manage who belongs to that group.

    ## Why the lab uses two groups

    Start with the app's **Assignments** tab. The **assignment group** determines who gets the app through group membership. With account provisioning enabled, that assignment can result in an account in the target. Next open **Push Groups**. The **push group** tells Okta which downstream group and membership to maintain. An active user needs an app assignment and a usable target account before you can expect to see them in the pushed group.

    | Where you make the change | What you verify |
    | --- | --- |
    | **Assignments** for the app | The user has an app assignment and a receiving account. |
    | **Push Groups** for the app | The Okta group is linked to the intended target group and its push status is healthy. |
    | Membership of the Okta push group | The receiving group shows the expected users. |
    | The receiving application's access settings | The target group has whatever permissions the app administrator configured for it. |

    Use two distinct groups. Okta supports dedicating one group to assignment and another to Group Push. The same test user can belong to both. This lets you remove membership from the downstream group while the app assignment and account are still in place.

    ## Push, link, and check membership

    When you select **Find groups by name**, you choose the Okta group to push. **Find groups by rule** selects groups based on criteria. That rule chooses which *groups* to send. A Directory group rule decides which *users* belong to an Okta group.

    On an integration that supports **Group Linking**, you can attach an Okta group to an existing target group instead of creating a new target group. Before linking, inspect its current members. Once Okta manages the group, a **Push Now** can replace the target app's membership with Okta's membership. Check the connector documentation for its behavior. For Active Directory, Okta documents that **Push Now** sends the newest members and keeps existing memberships.

    ### An import and a link move group information in different directions

    **Import Groups** brings existing groups from a supported app into Okta. Check **Provisioning → Integration** on the app, then find the imported group's source under **Directory → Groups**. Clearing **Import Groups** removes the imported groups on the next scheduled or manual import. Review assignments, mappings, and rules that depend on those groups before changing it. Some dependencies block disabling import. [Okta · Enable group import](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-groups-app-provisioning.htm) · [Okta · Remove imported groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-groups-provisioning-apps.htm)

    **Link Group** starts with an Okta group and connects it to a group already present in the receiving app. Check that the connector supports linking and that provisioning is enabled. In the app's **Push Groups** tab, select **Refresh App Groups** if the target is missing from the picker. After linking, Okta shows the link on **Push Groups** and hides the separate imported app-group entry under **Directory → Groups**. Unlinking makes that entry visible again if the app group is kept. Verify the group and its members in the receiving app. [Okta · Configure Group Linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-configure-enhanced-group-push.htm)

    ## What to check when the group is empty

    An empty group tells you that there is a group object in the app. Look up one missing user. Do they have an app assignment? Do they have an active account in the target? Are they active in Okta and a member of the push group? In **Push Groups → Errors**, open the push status details and address the cause before retrying. In the target app, verify the membership directly.

    When removing access, remove the user from the **push group first** and verify that the target membership is gone. Then remove the app assignment, if intended. If you pause a push mapping, the target group stays and later Okta membership changes stop syncing until you resume. If you unlink the mapping, Okta gives you a choice to leave or delete the target group.

    ## Official reading

    - [Manage Group Push](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-group-push-main.htm)
    - [App assignments and Group Push](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/app-assignments-group-push.htm)
    - [Enable Group Push](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-enable-group-push.htm)
    - [Troubleshoot Group Push](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-group-push-troubleshoot.htm)

=== "Hands-on Lab"

    Use the test user and SCIM integration from [Lesson 5](05-application-provisioning.md) if the target supports SCIM group creation and membership updates. You need a **Push Groups** tab in Okta and read access to the target's groups and user records. Start after you remove the user's direct assignment from `LAB-SCIM-Lifecycle`, the Okta connector created in Lesson 5. If you use another test connector, verify its Group Push support and use its documented provisioning settings.

    You will create two Okta groups. `LAB-SCIM-App-Users` assigns the integration so the user can have an account in the receiving app. `LAB-SCIM-Push-Members` controls who belongs to a separate group inside the receiving app. You will add the same test user to both so you can see which change affects the account and which affects group membership.

    === "1. Assign the app and push a group"

        **1. Create two Okta groups.** In **Directory → Groups → Add group**, create `LAB-SCIM-App-Users` and `LAB-SCIM-Push-Members`. Check that the push group name is unused in the receiving app. Add the active test user to **LAB-SCIM-App-Users** and leave the push group empty.

        **2. Assign the app through the first group.** Open **Applications and Resources → Applications → LAB-SCIM-Lifecycle → Assignments → Assign → Assign to Groups**. Choose **LAB-SCIM-App-Users**, complete the assignment, and verify that the test user's target account is active. If you reused the Lesson 5 user, inspect the existing target account after assignment. If the account is still inactive, check the provisioning task and resolve that before pushing membership.

        **3. Push the second group.** On the same integration, open **Push Groups → Push Groups → Find groups by name**. Select **LAB-SCIM-Push-Members** and choose to create a new downstream group if the connector presents a choice. Leave **Push group memberships immediately** selected and save. Check for a healthy push status, then find the new, empty group in the target app.

        **4. Add and verify one member.** In **Directory → Groups → LAB-SCIM-Push-Members**, add the same test user. Reopen the target group after synchronization and look for that exact user. Compare the target's group membership with the user's separate app assignment in Okta.

    === "2. Troubleshoot and remove access in order"

        **1. Pause the push.** On the **Push Groups** tab, open the status menu for **LAB-SCIM-Push-Members** and select **Deactivate group push**. Confirm the target group still exists with its member. Keep the app assignment in place.

        **2. Make one controlled membership change.** In **Directory → Groups**, remove the test user from **LAB-SCIM-Push-Members**. Compare Okta's empty group with the target group, where the member is still present while synchronization is paused. Check that the test user still appears on the app's **Assignments** tab through **LAB-SCIM-App-Users**.

        **3. Resume and reconcile.** Return to **Push Groups**, activate the push again, and check the target group. If it still shows the old member, confirm the intended membership on the Okta group before selecting **Push Now**. On this app, membership maintained directly in the target can be overwritten. Use **Push Now** for this dedicated test group and verify that the membership is removed. If an error appears, open **Errors** and read **Push Status** before retrying. Confirm that the app account remains active.

        **4. Remove the assignment last.** Once the target membership is gone, remove the test user from **LAB-SCIM-App-Users**. Verify the assignment is gone and the receiving account is inactive if **Deactivate Users** is enabled. Compare the two outcomes. One action removed group membership inside the app. The other removed the app assignment and initiated deprovisioning.

    If you do not have a group-capable target yet, use the [Foundations group assignment lab](../../week-01-foundations/lessons/04-application-assignment-and-dashboard.md) to practice tracing the user's app assignment. The target group and membership checks in this lesson require a working Group Push connection.
