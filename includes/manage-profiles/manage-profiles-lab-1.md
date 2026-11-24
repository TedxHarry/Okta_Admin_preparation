## Lab 1 · Read the three profile types { #lab-1 }

Compare a schema with its stored values. Then locate the first place an app attribute differs from the value you expected.

### Prepare the test records

Use an isolated Okta Identity Engine org and an admin who can view Profile Editor and edit disposable users and groups. Use one Okta-sourced test user of the default user type with an editable Department. Create a native Okta group named `Lab-M3-Profile-Readers` and add only that user. An existing profile-enabled app integration and assigned test user are optional.

### 1. Compare the user schema and the user’s values

1. Go to **Directory → Profile Editor**. On **Users**, use the **Okta** filter and open **Okta User (default)**. Locate First Name and Department. Record each field’s display name, variable name, and data type as shown.
2. Go to **Directory → People → test user → Profile**. Record the existing Department value. Click **Edit**, enter `Lab-M3-Support` in Department, and save. Reopen the profile and verify the new value.
3. Return to the default user schema. Compare Department’s definition with your original notes. Expected result: the stored value changed on your user record and the schema definition stayed the same.

### 2. Compare the group schema, values, and members

1. In **Directory → Profile Editor → Groups**, use the **Okta** filter and open the Okta group profile. Find Name and Description.
2. In **Directory → Groups**, open `Lab-M3-Profile-Readers`. On its **Profile** tab, record the Name and add the Description `Module 3 profile practice`. Save and verify the value.
3. Open the group’s **People** list. Verify the test user is still the only member. Record one line of evidence from the Profile tab and another from the People list.

### 3. Inspect an app profile or use the sample records

1. If you have a profile-enabled integration, open **Directory → Profile Editor → Users → Apps** and select its profile. Choose one readable app attribute and note its variable name. Open **Mappings** for that integration if available. Record which field supplies the value under **Okta to app**. On the app’s **Assignments → People** page, use the pencil icon for the assigned test user if the integration exposes a user editor. Check the assigned value without saving changes.
2. If you do not have a suitable integration or receiving account, use the simulated records below. Identify the first mismatch and which configuration you would inspect.

| Record | Evidence |
| --- | --- |
| Okta user profile | Department is `Lab-M3-Support`. |
| App user profile | `departmentCode` is `OPS`. |
| Receiving app account | Department code is `OPS`. |

<details class="revision-answer">
<summary>Show the expected finding</summary>
<p>The first mismatch is on the Okta side, between the Okta user profile and the app user profile. Verify that the records belong to the intended user and integration, then inspect the Okta-to-app mapping and assignment values. If the app user value later becomes correct while the receiving account stays stale, check outbound provisioning and the target write.</p>
</details>

### Reset the lab

Restore the test user’s original Department. Remove the disposable group when you no longer need it. If you inspected an existing app integration, no mapping change is needed.

[View the default user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-user-profile.htm) · [View the default group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-group-profile.htm) · [View app mappings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-existing-app-mapping.htm)
