## Lab 3 · Manage Universal Directory user types { #lab-3 }

Create a contractor schema, verify that a field applies only to that type, and move a disposable user to the default schema.

### Prepare the test org

Use an isolated Okta Identity Engine org with room for one additional custom type. Sign in as a Super Admin or Org Admin. Use one disposable default-type user as the control, and create a new contractor during the lab. Use test email addresses you control. The core exercise needs no app connector.

### 1. Create the contractor type and a field

1. In **Directory → Profile Editor**, click **Create Okta User Type**. Enter **Lab M3 Contractor** as the display name and `labM3Contractor` as the variable name. Save.
2. Open the new type’s **Profile** and choose **Add Attribute**. Create an optional **String** with display name **Lab M3 Sponsor Reference** and variable name `labM3SponsorRef`. Use **Read Only** for user permission and save.
3. In Profile Editor, open **Okta User (default)** and confirm that `labM3SponsorRef` is absent. Verify Department exists on both types and compare the data type they show.

### 2. Assign the type and compare the users

1. Go to **Directory → People → Add Person**. Select **Lab M3 Contractor** in the **User type** list before completing the remaining fields for your disposable user. Save, open the new record, and confirm the assigned type at the top.
2. On the contractor’s **Profile → Edit**, set Department to `Lab-M3-Support` and Sponsor Reference to `SP-482`. Save and reopen the profile to verify both values.
3. Open the default-type control. Compare the assigned type and field list. If the descriptive **User type** field is editable, record its original value, set it to `Contractor`, and save. Verify the profile header still shows the default type and Sponsor Reference is absent. Restore the original descriptive value after the check.

### 3. Verify the app mapping and group rule boundaries

1. If you have a disposable app with an editable profile mapping, open **Directory → Profile Editor → Apps → test app → Mappings**. Select **Lab M3 Contractor** and inspect **Okta to app**. Record one editable destination string and its current mapping. Use the contractor’s **Department** as the source for that field. Preview when the editor offers it, then save and apply updates only to the disposable integration.
2. Reopen the mapping for the **default** type and compare the same destination field. Verify that the saved mapping edit applies to the intended type. If the app exposes an app user profile or a connected receiver, assign the test user directly if needed, then verify the value on the assigned profile and target record.
3. In **Directory → Groups → Rules → Add Rule**, try an advanced condition using `user.labM3SponsorRef == "SP-482"` with the contractor selected for Preview. Use a disposable native Okta group if the form requires a target. Expect validation to reject the custom-type-only field. Cancel the draft.
4. If an app or the group-rule editor is unavailable, use these sample records. Identify which expected result belongs to which editor.

    | Test | Expected result |
    | --- | --- |
    | Contractor app-property mapping sends Department to a target string | The contractor mapping can send `Lab-M3-Support`. Inspect the saved mapping and any downstream update. |
    | Default app-property mapping sends a different field to the same target string | Check the default mapping separately. It can supply a different value. |
    | Group rule references `labM3SponsorRef` | The field exists only in the contractor schema and fails rule validation against the default schema. |

[Map a user type to an app](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-user-type.htm) · [Known issues for custom user types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-types-known-issues.htm)

### 4. Change the contractor’s assigned type

1. Record the contractor’s Department and Sponsor Reference. Open the person in **Directory → People** and click **Change** at the top of the profile. Select the default Okta user type.
2. Review the destination fields before confirming. Expect Department to transfer if its name and type match. Expect the destination to lack Sponsor Reference. Resolve any required destination field before clicking **Change user type**.
3. Reopen the profile and verify the type now shows default. Compare the persisted Department against the starting value and verify that Sponsor Reference is absent. Confirm the original default-type control was unaffected.

### Reset the lab

Restore any edited app mapping and remove disposable app assignments or rule-test groups you created. Retire the disposable contractor if it is no longer needed. If you choose to retire the custom type, first filter **Directory → People** by **Lab M3 Contractor** and verify zero users. Then open the type’s **Profile** and use **Delete** for that disposable type.

[Create a custom user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-user-type.htm) · [Assign a type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-assign-user-type.htm) · [Change a type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-change-user-type.htm) · [Delete a type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-user-type.htm)
