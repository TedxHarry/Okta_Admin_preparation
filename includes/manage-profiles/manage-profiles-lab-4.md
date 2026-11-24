## Lab 4 · Manage group and integration schemas { #lab-4 }

Add a field to the default Okta group schema, edit one group’s value, and verify what happens when you retire the field. Then inspect an integration schema or use the supplied records.

### 1. Add a group field and set one value

1. Use an isolated Okta Identity Engine org and an admin who can edit the default group schema. Create two native test groups in **Directory → Groups** named **Lab M3 Queue A** and **Lab M3 Queue B**. Leave them unassigned to apps.
2. In **Directory → Profile Editor → Groups → Okta group**, choose **Add attribute**. Create an optional **String** with display name **Lab M3 Support Queue**, variable name `labM3SupportQueue`, and description **Queue code for schema practice**. Save.
3. Open **Directory → Groups → Lab M3 Queue A → Profile → Edit**. Set the new field to `SUPPORT-NA`, save, and reopen the group profile. Open Queue B’s profile and verify that the same field is available there with no value set.

### 2. Edit the definition, then remove the disposable field

1. In **Profile Editor → Groups → Okta group → Custom**, click the display name and change it to **Lab M3 Queue Code**. Save. The existing variable name is still the identifier for the field.
2. Reopen Queue A’s profile. Verify the new label and the saved value `SUPPORT-NA`. Reopen Queue B and verify it remains blank.
3. Confirm the lab field is unused by assignments or other configurations and record the test value before removal. In the Okta group schema’s **Custom** list, click **X** beside the lab field, then **Delete Attribute**. Verify the field no longer appears in the schema or on either group’s profile.

### 3. Inspect a directory schema or use the sample

**Live option.** Use a disposable AD connection with a known, readable user attribute already present in AD and absent from the Okta directory profile. Use an attribute that no production flow consumes. Have its exact name and a test user with a known value available.

1. In **Directory → Profile Editor**, select **Directories** and open the test directory’s **Profile**. Click **Add Attribute** and select the known field in **Pick Schema Attributes**. If it is missing, confirm the directory, user object hierarchy, and read permissions before trying again. Save and reopen the schema to verify the field’s name and type.
2. Open **Mappings** for the same directory and inspect both directions where available. Confirm the newly added field has no mapping or other references before removing it. If a mapping exists, record it and use the sample below for the removal decision. Use **Custom → X → Delete Attribute** only for the unmapped disposable field you added.
3. Verify the field is absent from the Okta directory schema and still exists in AD. This step verifies schema discovery and removal. Lesson 5 covers configuring and verifying a value mapping.

**Sample option.** If no AD connection is available, use these simulated records. Decide where you would look first and what would block safe removal.

| Record | Evidence |
| --- | --- |
| AD test directory | `trainingRegion` exists, but it is defined outside the user object hierarchy. |
| Okta directory profile | `trainingRegion` is missing from **Pick Schema Attributes**. |
| Separate inbound SAML IdP | The source sends `supportRegion`. The app profile exposes it as `sourceSupportRegion` and an inbound mapping uses that variable. |

<details class="revision-answer">
<summary>Show the expected findings</summary>
<p>Check whether the AD field belongs to an applicable user, parent, or auxiliary object and whether Okta can discover it. On the inbound IdP, the external name is <code>supportRegion</code> and the mapping uses the Okta variable <code>sourceSupportRegion</code>. Replace or remove that mapping deliberately before deleting the IdP profile field, then verify the intended result.</p>
</details>

### Reset the lab

Remove the two disposable groups when you no longer need them. If you used the live directory option, confirm only the test schema field was added and removed. Leave the source AD attribute in place.

[Edit group attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-edit-group-attributes.htm) · [Remove a group attribute](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-custom-group-attributes.htm) · [Add or remove AD schema attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-remove-custom-schema.htm)
