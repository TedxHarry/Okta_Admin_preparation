# Lesson 4 · Manage group and integration schemas

=== "Theory"

    The Okta group schema defines fields stored on an Okta group. An integration schema describes fields available through an app, directory, or identity provider. Identify the destination record and the system that owns its schema before adding a field.

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

    Read the field definition in the correct schema first. Check the stored value on the group or app user, then identify mappings, assignments, or claims that depend on it.

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **The field is in the source but absent in the editor**

    AD has a target field that is missing from the integration's schema picker. A native group's Support Queue is well defined. A federation claim reads one of the integration properties.

    1. Where do you add or source each field?
    2. How do you test whether a selected group value gets to one app user?
    3. What could break if you retire an integration field used by a claim?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Define the native group field on the group schema, then save its value on the specific group. Verify directory schema discovery and the integration profile before mapping the AD field.</li>
    <li>Use a member in one assignment group and a member in two. Verify the eligible destination type, assignment values, and effective app-user record.</li>
    <li>Both profile maps and sign-in claims can depend on it. Inventory references and use separate persisted-value and fresh-sign-in tests after the approved change.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. An integration&#x27;s field is referenced in an outbound mapping and a SAML assertion. Which step comes first when retiring it? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Delete it and inspect the next failed sign-in</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Deprovision every assignment</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. Find and update both dependencies, then test both flows</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Remove it from the Okta user schema only</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> Mapping and federation can use the field independently. Verify both paths using an approved test record.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which evidence can establish why an overlapping member gets a particular queue value? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Values assigned by each applicable group</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Group priority or array-combination setting</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C"> <span>C. The imported AD group&#x27;s source alone</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. App user attribute type and configuration</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and D.</strong> The destination type and assignment configuration determine how applicable values are resolved.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. Removing a group-profile field affects only its display label, even if a configured mapping reads it. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> A mapping can depend on the field. Identify dependencies and test before deleting it.</p>
    </details>
    </fieldset>
    </div>

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

    ### Scenario and interview practice

    **Troubleshooting scenario.** Two group assignments provide Support Queue values, and a user belongs to both. The app shows one queue. Where do you establish whether that is intended?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Inspect the app user schema and the applicable group assignment values. Check group priority and the setting for priority or combining values if the destination is an eligible array. Verify the actual saved app-user value.</p>
    </details>

    **Interview question.** A connector field is about to be renamed. What would you capture so you can tell whether import, provisioning, or federation broke?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Record the integration schema field, mappings in each direction, claim expressions, and one known test user's stored values. Test import, target write, and a fresh assertion separately after the change.</p>
    </details>
