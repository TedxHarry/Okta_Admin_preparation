# Lesson 4 · Manage group and integration schemas

=== "Theory"

    An Okta group needs a Support Queue label. An Active Directory (AD) integration needs to read a field from a directory user. Those changes belong to different profiles. Start by locating the record that should hold the value and identifying which system owns its definition.

    ### Choose the schema to change

    | If you need to… | Open in Directory → Profile Editor | What to verify |
    | --- | --- | --- |
    | Store metadata on Okta-created groups | **Groups → Okta → Okta group** | The field appears on the group’s **Profile**. |
    | Describe a user field supported by an app integration | **Apps → app profile** | The selected integration exposes the intended field and type. |
    | Read an existing AD user attribute | **Directories → directory profile** | The field appears in **Pick Schema Attributes** after discovery. |
    | Read a field supplied by an inbound identity provider (IdP) | **Identity Providers → IdP profile** | The external name matches the attribute the IdP sends. |

    A schema change makes the field available on profiles of that kind. Enter a value on an individual record or configure a mapping separately. Adding Support Queue to the group schema does not change group membership. Adding a directory attribute to Okta’s schema does not create a field in AD.

    [Add group attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-group-attributes.htm) · [Add integration attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-attribute.htm) · [Add AD schema attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-remove-custom-schema.htm)

    ### Define a custom group field

    On the default Okta group profile, choose **Add attribute**. Select the data type and enter the display name, variable name, and description. Group attributes support strings, numbers, integers, Booleans, and string, number, or integer arrays. An enum can restrict supported non-Boolean values to a defined list. Check length, uniqueness, and required settings against existing groups before enabling them.

    A string is enough when each group has one Support Queue. For supported array attributes used in group-derived assignments, **Use Group Priority** uses the highest-priority group’s value and **Combine values across groups** combines values across applicable groups. Verify the result on a test user who belongs to more than one applicable group.

    Edit schema metadata in **Profile Editor → Groups → Okta group → Custom**. To edit a particular group’s value, open **Directory → Groups → group → Profile → Edit**. If you change the display label, reopen a populated group to verify that the label changed and the saved value remains.

    [Group attribute settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-group-attributes.htm) · [Edit a group attribute definition](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-custom-group-attributes.htm) · [View and edit group values](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-edit-group-attributes.htm)

    ### Bind an integration field to the source

    For AD, **schema discovery** builds the list of attributes Okta can read. The field must already exist in AD, be available in the user object hierarchy, and be discoverable with the integration’s permissions. Check the chosen directory, the attribute’s class or object placement, and read access if it does not appear in the picker.

    In an app or IdP profile, the **variable name** is the identifier used in Okta mappings. Where the editor shows **External name**, use the name the source assertion or profile API supplies. For example, an IdP may send `supportRegion`, while the Okta integration exposes the field as `sourceSupportRegion`. Use the external name as a literal source identifier. Verify a real source sample when the connector is available. Mapping that field into the Okta user profile is a separate step.

    [Add integration attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-attribute.htm) · [Discover directory schema attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-remove-custom-schema.htm)

    ### Trace dependencies before removing a field

    Check both mapping directions where available. Look for references in expressions, claim configuration, assignment settings, and downstream processes that consume the value. Record the definition and any test values you need to preserve. Remove or replace the references first, verify the remaining affected mappings, then remove the custom field with **Custom → X → Delete Attribute** on the selected profile. Reopen the schema and a relevant record to confirm the result. A directory field removed this way is removed from the Okta directory profile. Check the external system separately for any changes to its own schema or stored data.

    [Remove a mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-mapping.htm) · [Remove a group field](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-custom-group-attributes.htm) · [Delete a custom integration field](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-custom-attributes.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-4.md"

=== "Revision"

    ### Check your recall

    **1. You need to change the Support Queue on one group. Where do you make the edit?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Open that group under Directory → Groups and edit its Profile. Use Profile Editor when you need to change the field definition.</p>
    </details>

    **2. A field exists in AD but is missing from Pick Schema Attributes. What do you check?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Confirm the connected directory, the field’s placement in the user object hierarchy, and the integration’s permission to discover it.</p>
    </details>

    **3. The same integration field appears in a mapping and a SAML claim. What should you do before removing it?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Trace both references, replace or remove them as intended, and verify the affected value and claim before removing the schema field.</p>
    </details>
