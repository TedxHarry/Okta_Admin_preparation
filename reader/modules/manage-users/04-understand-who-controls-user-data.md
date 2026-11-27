# Lesson 4 · Understand who controls the user’s data

=== "Theory"

    Open a user in **Directory → People → Profile** and find **Department**. That screen tells you the value Okta has right now. To explain why it has that value, work backward. **Which system is allowed to supply Department? Which field does Okta read there? Has the update reached this account yet?** Those are three different checks.

    ## A link tells Okta which account belongs to the person

    Say a human resources system and Active Directory (AD) both have a record for the same employee. Matching, which you learned in [Lesson 3](03-import-users-and-first-sign-in.md), lets Okta link each external record to the right Okta account. Once you know which records belong to the same person, you can answer two more questions.

    | Decision | What it means | Where to inspect it |
    | --- | --- | --- |
    | **Sourcing** | Which system supplies the Okta profile or a particular field. | **Directory → Profile Sources** for the profile and **Profile Editor → Source priority** for the field. |
    | **Mapping** | Which field Okta reads, how it interprets the value, and which destination field receives it. | **Directory → Profile Editor → Mappings** for the integration. Use the **App to Okta User** direction for incoming data. |

    An import can link a source record and still leave a field blank. The link establishes which person the record belongs to. A mapping tells Okta where the data should go. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    ## How Okta chooses the profile source

    If the user has no applicable external profile source, Okta supplies its own profile. To let an external app supply it, the app must support profile sourcing. In a supported app’s **Provisioning → To Okta → Profile & Lifecycle Sourcing**, look for **Allow [app] to source Okta users**. After enabling it, the integration can appear under **Directory → Profile Sources**. A newly added source starts at the bottom of that priority list. [Okta · Make an app the profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-app-profile-source.htm) · [Okta · Prioritize profile sources](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm)

    Read the order for the person you’re investigating. Suppose the HR integration is listed above AD. A user linked to both can use HR as their primary profile source. A user linked only to AD can still be sourced by AD. The priority list determines which applicable integration wins for each person. When you move a source up or down, check which other users have accounts linked to both sources before making that change. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Prioritize profile sources](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm)

    ## Decide who supplies an individual field

    **Attribute-level sourcing** gives one field its own source selection. Open the relevant profile in **Directory → Profile Editor**, select the field’s information control, and look for **Source priority**. An **attribute** is the field itself. Its value is what you see on one person’s profile.

    | Source priority option | What happens |
    | --- | --- |
    | **Inherit from profile source** | The field follows the applicable profile source. This is the default. |
    | **Inherit from Okta** | Okta supplies the field, even if an external system supplies the profile as a whole. Who can edit it is still a permissions question. |
    | **Override profile source** | Choose another source for that field. The original source can still control the rest of the profile. Save the field and check its incoming mapping. |

    Suppose HR should supply **Department**, AD should supply **work email**, and Okta should hold **preferred display name**. Keep the main profile sourced by HR. Let Department inherit that source, override work email to use AD, and set preferred display name to inherit from Okta. Changing the work email source changes who supplies that field. It does not make AD responsible for the whole account. [Okta · Designate profile sources for user attributes](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-about-attribute-sourcing.htm) · [Okta · Define the attribute profile source](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-define-attribute-profile-source.htm)

    ## Follow the value from the source into Okta

    A blank cell on the screen can represent different data. Okta documents that saving an empty text value in the profile can store an empty string (`""`). An unmapped sourced field can be null. Check the profile or mapping evidence before treating those cases as the same. [Okta · Add custom user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm)

    Imagine HR is first in priority and both source accounts are linked. The Okta Department field is blank, but AD has **Finance**. If Department inherits from the primary source and HR has no mapping into it, Okta does not pull the value from the next integration in the list. Okta documents that an unmapped attribute has a **null** value, meaning there is no stored value. If you deliberately override Department to AD, the corresponding AD-to-Okta mapping is still required. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    Read the **App to Okta User** mapping from its source field to its destination field. You can map a field directly or use an **expression**, which tells Okta how to build or transform the value. Check required destination attributes, use **Preview** on the affected person, and then compare the result with **Directory → People → Profile** after the relevant update. Green in Preview can mean a valid mapping whose input has no value. Red points to an invalid mapping. An empty mapping column means there is no mapping. Saving the mapping and applying updates when available are separate from previewing it. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    One documented exception matters when you map directory data. Okta says `onPremisesSamAccountName`, `onPremisesDomainName`, and `onPremisesUserPrincipalName` do not sync by default in this mapping workflow. Adding those mappings without enabling sync can cause provisioning to fail. Check the documented support requirement before relying on those fields. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    ## A profile change and an account-status change have different controls

    **Lifecycle settings** govern what happens to the user account as the person joins, changes roles, or leaves. A supported source can be set to **Do Nothing**, **Suspend**, or **Deactivate** when the source user is deactivated. **Do Nothing** still allows the source to supply profile attributes. Okta checks the user’s highest-priority profile source before allowing source-driven suspension or deactivation. The integration can also offer options to reactivate suspended or deactivated Okta users when their source account returns. Okta documents that source-driven reactivation requires an exact match. Review the import result when the user instead appears pending activation. [Okta · Edit app provisioning settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm) · [Okta · Make an app the profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-app-profile-source.htm)

    If you enable outbound **Update User Attributes** for the same app that sources the profile, you now have two directions to check. **App to Okta User** can bring values into Okta. **Okta User to App** can send values back. Okta documents that outbound updates can overwrite data owned by another source or send an older value back while an inbound update is still pending. Before enabling both directions, identify who should write each field and trace both mappings. After a change, compare the source record, the Okta profile, and the receiving app’s record. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm)

    ## Where to look when the result surprises you

    | What you see | Where to look first |
    | --- | --- |
    | **A field is missing from the profile.** | Check the person’s user type and its field definitions in **Profile Editor**. |
    | **The field exists but has no value.** | Check the field’s **Source priority**, its inbound mapping, and the original value on the linked source account. |
    | **An edit is unavailable or the value changes back.** | Check who supplies the field, who can edit it, and whether an import or outbound push ran after the edit. |
    | **Preview shows the right value but People still shows the old value.** | Confirm you previewed the correct person and direction. Check whether the mapping was saved and whether updates or the connector’s import have run. |
    | **Okta has the right value but the user’s app access changed unexpectedly.** | Check whether a group rule reads the field, then inspect the group membership and the app’s assignments. If the app’s own profile field is wrong, check the outbound mapping and app record. |
    | **The account status changed.** | Find the applicable profile source and check its **Profile & Lifecycle Sourcing** settings and import results. |

    The user record shows the outcome. To explain it, follow the path back to the setting that decided which system could supply the change. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

=== "Hands-on Lab"

    --8<-- "lab-4.md"


=== "Revision"

    ## Trace who controls the value

    | Question | Where to look |
    | --- | --- |
    | Which source account belongs to this person? | Review the linked account and import result. Matching establishes the relationship. |
    | Which source supplies the overall profile? | **Directory → Profile Sources**. Read the order of sources that apply to this user. |
    | Can one field use a different source? | **Directory → Profile Editor → field information → Source priority**. Use **Inherit from profile source**, **Inherit from Okta**, or **Override profile source**, where available. |
    | How does a value travel? | Open the integration's **Mappings**. **App to Okta User** is inbound. **Okta User to App** is outbound. Preview the intended user and check the destination after applying the change. |
    | What happens when the source account is disabled? | Check the integration's **Profile & Lifecycle Sourcing** setting. Owning profile values and driving Okta account state are separate decisions. |

    **When a field is blank.** Check schema → source priority → inbound mapping → source value → last update. An unmapped field from the primary source can be null even if another source has data. A text field explicitly saved empty can contain an empty string instead.

    **Exam focus.** Be able to predict what happens with two linked sources, change a test field's source or mapping, and verify the result. For write-back, trace the outbound mapping and confirm the receiving system changed.

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **The profile changed, the owner did not**

    HR owns the user profile. A connected AD directory owns Department through an attribute override. A local support label should stay editable in Okta. The AD account is disabled.

    1. Which system controls each data path?
    2. Does the override let AD send a lifecycle decision for this user?
    3. What three observations verify the intended split after a sync?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Verify the primary source for overall ownership, Department&#x27;s override and AD-to-Okta mapping for that field, and an Okta-sourced setting for the local label where available.</li>
    <li>The override assigns authority to supply Department. Check the applicable primary profile source and its lifecycle configuration before concluding that the AD disable should change Okta&#x27;s status.</li>
    <li>Read the changed upstream Department, the persisted Okta Department and local label, and the effective Okta user state. Check the AD credential path separately if it is used.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. HR imports the right value. The Okta profile still shows the old one. Which mapping direction is the first relevant one? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Okta User to App</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B" data-correct> <span>B. App to Okta User</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Group Push</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. SAML attribute statement</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Inspect the route into the stored Okta profile before investigating downstream behavior.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. A field changes back at the next import. Which checks can identify why? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. The inbound mapping from the applicable source</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. The value on the linked upstream record</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C"> <span>C. The outbound app mapping only</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Attribute source priority</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and D.</strong> A mapped source can supply the field on sync. Tile presentation is unrelated.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A local-only support field and an HR-managed department must coexist. Which pairing fits? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Both inherited from the HR source</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. Support field inherits from Okta where supported, and Department is sourced from HR</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="C"> <span>C. Both populated only in the receiving app</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> The split gives separate ownership to the local support field and the HR field. Test that a sync preserves both outcomes.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. HR is the primary source, its Department mapping is missing, and AD has a value. What does Okta use?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>The inherited field can be null. Check the primary mapping or set an intentional field override with its own inbound mapping.</p>
    </details>

    **2. Preview shows the expected value but People still shows the old one. What is next?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Verify the exact user and direction, then check whether the mapping was saved, updates applied, and any required import completed.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A user's cost center repeatedly returns to Finance after you edit it in Okta. Their other fields retain your edits. How do you find the writer?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Inspect the field's Source priority and the sources linked to that user. Then check the relevant inbound mapping and import or System Log timing. Correct the value upstream or use an approved field-level sourcing change.</p>
    </details>

    **Interview question.** HR should own Department, but the help desk should maintain a local support label. How would you design and prove that split?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Keep Department mapped from HR and configure the support field to inherit from Okta where supported. Change both values in a test record, run the next HR sync, then confirm Department follows HR while the local label persists.</p>
    </details>
