## Lab 2 · Design and validate user attributes { #lab-2 }

Build two fields for a test help desk. Verify which edits save, then diagnose a uniqueness check that finds older duplicates.

### Prepare two test users

Use an isolated Okta Identity Engine org and a Super Admin who can edit the default user schema and test user records. Create or reuse two disposable, Okta-sourced users with the default user type. Call them **User A** and **User B** in your notes. This exercise needs no connected app.

### 1. Define the two fields

1. Go to **Directory → Profile Editor → Okta → Okta User (default)**. Click **Add Attribute** for each field in the table. Use **Read Only** for end-user permissions, leave the fields optional, and leave defaults blank. Record the names exactly so you can find the fields again.
2. For Support Region, select **Define enumerated list of values**. Add the label **North America** with value `NA` and the label **Europe** with value `EU`. Save the schema definition.
3. For Staff Reference, set minimum and maximum length to **6** if the string editor exposes those settings. Start with uniqueness cleared. Save the field.

| Display name | Variable name | Type | Initial settings |
| --- | --- | --- | --- |
| Lab M3 Support Region | `labM3SupportRegion` | String | Optional, enum |
| Lab M3 Staff Reference | `labM3StaffReference` | String | Optional, six characters where available, uniqueness off |

### 2. Test valid, invalid, and blank values

1. Go to **Directory → People → User A → Profile → Edit**. Set Support Region to **North America** and Staff Reference to `000123`. Save and reopen the profile. Verify that the staff reference still begins with zeros. Verify that the label you selected corresponds to `NA` in the schema.
2. Reopen User A’s profile for editing. Inspect the available region choices. An unlisted region such as **Asia Pacific** should be unavailable in the enum control. If length validation was configured, try saving `123` in Staff Reference. Record the rejection and cancel the edit or restore `000123`. Reopen the record to verify what was actually saved.
3. Clear User B’s optional Support Region and save if the editor offers a blank choice. Record the displayed result. The console view alone does not distinguish an empty string from null. Compare the documented behavior before writing a mapping that treats blanks as missing.
4. Save `000123` as User B’s Staff Reference. Confirm that it saves while uniqueness is off. Both users now have the duplicate this lab needs.

### 3. Enable uniqueness and resolve the duplicate

1. In **Profile Editor → Okta User (default)**, filter to **Custom** and edit Staff Reference. Select **Value must be unique for each user**, click **Save Attribute**, and wait for validation to finish.
2. Check the status message and reopen the field. Expect Okta to report a duplicate and clear the restriction. Change User B’s Staff Reference to `000124`.
3. Enable uniqueness again. After validation, verify the restriction stays selected. Try saving `000123` for User B and record the rejection. Cancel the edit and verify A still has `000123` and B still has `000124`.

### 4. Review required, default, and username settings

1. In the same isolated org, add a disposable string named `labM3IntakeChannel` with display name **Lab M3 Intake Channel**. Mark the field required and leave its default blank. Open **Directory → People → Add Person** and inspect the field on the default-user create form. With all other required fields filled for a disposable account, try submitting with Intake Channel blank. Record the result. If a record is created, use it as evidence and remove it during reset.
2. If the schema editor exposes **Default value**, set it to `manual` and reopen **Add Person**. Create a disposable user with the offered default. Reopen that user's profile to verify the actual saved value. Check one older user separately and record the result. If the setting is unavailable, use the documented default-value behavior to explain what a delegated admin would need when creating a user.
3. In Profile Editor’s **Base** list, open First Name, Last Name, and Username. Record the current required settings and the selected username format. For a blank Last Name import, identify the setting you would check before import. For the hypothetical custom restriction `a-z.13579`, predict whether `alex.15` and `alex.20` match. Open the answer after writing your prediction.

<details class="revision-answer">
<summary>Show expected results for the name and username checks</summary>
<p>Check whether Last Name is optional for the Okta-sourced user schema. The custom character set admits <code>alex.15</code>. It rejects <code>alex.20</code> because digits 2 and 0 are outside that set.</p>
</details>

### Reset the lab

Remove the lab-only fields from the disposable schema when you no longer need this practice. Verify that no lab mapping or rule uses them before removal. Retire any disposable users created by this lab according to your test-org cleanup plan.

[Create and configure user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm) · [Enable attribute uniqueness](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enforce-custom-uniqueness.htm) · [Inspect name requirements](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-first-last-optional.htm) · [Inspect username format restrictions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-character-restriction.htm)
