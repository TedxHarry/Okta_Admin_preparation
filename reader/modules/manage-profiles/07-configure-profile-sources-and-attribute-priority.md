# Lesson 7 · Configure profile sources and attribute priority

=== "Theory"

    When several integrations link to the same user, Okta uses source priority and attribute-level settings to determine which system supplies each field. Verify the source assignment and the inbound mapping before interpreting the stored value.

    ### Identify the primary profile source

    A **profile source** is an app or directory configured to supply Okta user data. When no external profile source applies, Okta is the source. A user can have multiple connected accounts, but has one primary profile source at a time. The order of eligible sources and the user’s assignments determine which source applies. Verify that the imported accounts match the intended Okta user before comparing their values.

    To enable an integration that supports sourcing, open **Applications and Resources → Applications → app → Provisioning → To Okta → Profile & Lifecycle Sourcing**. Select **Allow the app to source Okta users** and review deactivation and reactivation separately. **Do Nothing** allows profile sourcing and prevents an app deactivation from driving Okta lifecycle changes. Okta documents that only the highest-priority profile source for the user can deactivate or suspend that user through this sourcing behavior.

    In **Directory → Profile Sources**, inspect the order and use the priority arrows where appropriate. Newly enabled sources are placed at the bottom. Reordering can affect all users for whom those sources compete. Use a scoped test org and confirm assignments and impact before changing the order.

    [Profile sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Make an app the profile source](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-app-profile-source.htm) · [Prioritize profile sources](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm)

    ### Choose who supplies an individual field

    Open the applicable **Okta user type** in **Directory → Profile Editor** and inspect the attribute’s **Source priority**. Attribute-level sourcing applies to the Okta user profile. App user profiles have their own mappings and assignment values.

    | Source priority | Result to verify |
    | --- | --- |
    | **Inherit from profile source** | The primary source supplies the field through its inbound mapping. |
    | **Inherit from Okta** | Okta supplies the field. If users should edit it themselves, also set **User permission → Read-Write** where supported. **Read Only** and **Hide** control end-user access to the field. |
    | **Override profile source** | The selected source supplies the field through an **App to Okta User** mapping, while the user’s primary profile source can remain unchanged. |

    Saving the source choice alone does not populate a field. Okta documents that an unmapped attribute from the primary source is null and does not fall through to lower-priority sources. After choosing an override, configure the selected source’s inbound mapping and verify that a supported import supplies the value. A field-level override can select AD for a particular field while HR remains the user's primary source. Use **Directory → People → test user → Profile** to check the persisted value. For an externally controlled field, make the correction at its source and verify the import. For user self-service, test the field under the intended user’s permissions.

    [Set an attribute source](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-define-attribute-profile-source.htm) · [Map profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [Allow users to edit attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-edit-attributes.htm)

    ### Trace an HR change to access

    When an HR-driven value changes, confirm the import updated the correct Okta record. An active rule can evaluate the stored value and update group membership for a default-type user. Verify the resulting membership separately. If membership is unexpected, check the actual Department, the rule’s status, and its exceptions.

    If the same integration also receives profile updates from Okta, review the inbound and outbound mappings together before enabling writes. Okta documents overwrite and timing risks when sourcing and **Update User Attributes** are enabled on the same integration. Record the resulting value in both systems during testing.

    [Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm) · [Profile sourcing and downstream updates](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-7.md"

=== "Revision"

    Read the applicable primary source and the field's source priority together. Verify the inbound mapping and persisted value. Check lifecycle authority separately when a field uses an override.

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. HR is primary and a lower directory has a Department value. You need AD to supply Department while HR remains primary. What do you inspect first? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. The SAML claim name</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. App assignment group priority</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. Department&#x27;s attribute-level source override</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Global session policy priority</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> An override can let another source supply a field without changing the user&#x27;s primary source.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which tests check the practical effect of a field override? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. User with both linked sources</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. User without the alternate source</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. An upstream edit followed by verification of the saved field</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Only a preview for a fully populated user</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> Compare both source populations and confirm which value persists after processing.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. An attribute source override also changes which source controls the user&#x27;s lifecycle. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Field ownership and lifecycle authority are distinct. Check the applicable primary source and lifecycle settings.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. HR is the primary source and has no mapping for Department. AD has a populated value and a mapping. What happens with Inherit from profile source?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Okta documents a null value when the primary source has no mapping for the field. The lower-priority source does not automatically supply it.</p>
    </details>

    **2. How can AD supply one field while HR remains the primary profile source?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Set the attribute’s Source priority to Override profile source, select AD, and configure and verify the AD-to-Okta mapping.</p>
    </details>

    **3. An HR change is visible in HR but the expected group membership has not changed. What should you verify first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Verify that the import linked to the correct Okta user and updated that user’s stored Department. Then inspect the active rule and its exceptions.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** HR supplies a blank Department, and a directory below HR has a value. The field should stay blank unless a separate business rule permits a directory fallback. What would you inspect?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Read the field's Source priority, applicable source order, and any configured fallback expression. Verify the stored results for an HR blank and for an HR populated record. Inherited sourcing does not mean Okta automatically takes the first nonempty value from any source.</p>
    </details>

    **Interview question.** A team wants one AD field to override HR for only one use case. What would you check before recommending an attribute override?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Confirm the population and authoritative value, the field's applicability, and the effect on all consumers of the Okta field. Test a user with both sources and one without the alternate source. Verify lifecycle sourcing independently.</p>
    </details>
