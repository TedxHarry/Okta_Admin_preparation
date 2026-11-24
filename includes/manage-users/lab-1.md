## Lab 1 · Read a user record { #lab-1 }

Use an Okta Identity Engine lab org and an admin account that can view a training user and its assignments. This lab is read-only. If People has no training user, create one in [Lab 2](hands-on-labs.md#lab-2), then return here. See the [module lab setup](hands-on-labs.md#before-you-start) for shared prerequisites and test data.

1. Open **Directory → People** and find a disposable or existing training account using its exact username. The username may look like an email address. Open **Profile** and compare **Username** and **Primary email**.
2. Record the status on the user record and the **User type** if displayed. Clear any **Status** filter before deciding that a username is missing. Practice by selecting a filter that excludes the user, then clearing it.
3. Open **Groups** and **Applications**. Write down one group and one app assignment, or record that the app list is empty. If an app is listed, open its **Assignments** tab from **Applications and Resources → Applications** and use the People/Users and Groups views to trace how the user receives it.
4. Write a two-sentence ticket update. State whether the Okta user exists, what status you observed, and which view you would check next for a missing app. Include only the username alias and field labels in your evidence.

**Pass check.** You can find the same record with the status filter cleared and distinguish a user's account state from their app assignment. This exercise makes no configuration changes.

**Try one more ticket.** You can view the user but cannot see **Suspend**. Identify where you would check your admin role and scope. Compare a Help Desk Admin's recovery permissions with the permission needed to suspend a user.

[Okta · Manage users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-people.htm)
