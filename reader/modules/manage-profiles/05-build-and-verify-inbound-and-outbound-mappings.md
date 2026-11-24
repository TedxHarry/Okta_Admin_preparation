# Lesson 5 · Build and verify inbound and outbound mappings

=== "Theory"

    HR sends a department code of `OPS`. Okta stores that code on the user’s Universal Directory profile. A ticketing app expects the same value in its Team field. Build one mapping into Okta and a separate mapping out to the app. Verify each destination before testing the next hop.

    ### Choose the mapping direction

    | Direction in Profile Editor | Source | Destination |
    | --- | --- | --- |
    | **App to Okta User** | The source integration’s app user profile, such as an HR or directory profile. | The Okta user profile. The applicable sourcing configuration determines which source supplies the field. |
    | **Okta User to App** | The Okta user profile. | The receiving integration’s app user profile. A supported provisioning operation can then write the value to the downstream account. |

    For example, map HR’s `departmentCode` to an Okta string such as `labM3MappedCode`. Map that Okta field to the ticketing integration’s Team field. Use the Okta user profile as the source of the outbound mapping. When the inbound record changes, confirm the new value reaches the Okta user profile before expecting an outbound update. A group membership change by itself does not reapply an existing attribute mapping. An assignment that creates a new account is a separate provisioning event.

    [Attribute mapping directions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm) · [Map inbound profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    ### Build and preview the mapping

    Go to **Directory → Profile Editor → integration → Mappings**. If prompted, select **Configure User mappings** and the intended user type. Open the appropriate direction. Find the destination field and select the source in the dropdown, or enter an expression where needed. Confirm the destination field accepts the source data type and any required enum values. Check every required field before saving.

    In **Preview**, select the intended test user and inspect the evaluated value. Green can mean a valid mapping with no value, red means validation failed, and an empty mapping row means the field is unmapped. Compare the actual result with the expected value before choosing **Save Mappings** and **Apply updates now** when offered. Apply updates only after confirming who could be affected. App integrations that use entitlement management and automatic attribute discovery have their own mapping behavior and do not support manual mapping through this procedure.

    For a provisioning-enabled app, **Applications and Resources → Applications → app → Provisioning → To App** or **To Okta** also exposes the **Attribute Mappings** section. Use it to inspect an individual field, its sample value, and the available timing. **Show Unmapped Attributes** can reveal an optional field. Where supported, use the edit icon to change its mapping, or use **Go to Profile Editor** for the full mapping. The sample user can differ from the user you intend to test.

    [Map attributes in Profile Editor](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes.htm) · [View existing app mappings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-existing-app-mapping.htm) · [Map attributes on the Provisioning page](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes-provisioning.htm)

    ### Separate timing, overrides, and target writes

    | Setting or result | What it tells you |
    | --- | --- |
    | **Apply mapping on user create only** | The mapping supplies the initial value. Later source edits do not automatically recalculate this field through that mapping. |
    | **Apply mapping on user create and update** | The mapping can supply a new value when the Okta user profile changes. Outbound writes still depend on the app, assignment, and provisioning settings. |
    | **Do not map** or clearing a mapping | The mapping no longer supplies a value. Verify any existing app user or downstream value separately. |
    | Assignment-level override, where supported | An individual override can replace the default mapping result. A group assignment may supply its own value. Inspect the assignment before editing the shared mapping. |

    Per-field timing controls when Okta applies the mapping. Okta documents that Profile Push can send the full app user profile during an update, including stored values for fields set to create-only or unmapped. Use a test integration to inspect actual values and connector behavior. Enabling **Update User Attributes** can trigger a one-time sync for current app members. Before testing, confirm the integration is isolated and record its original settings.

    To edit or remove a mapping, open the same direction and destination row, change or clear the source, save, and verify the intended outcome. For an assignment-level override, Okta’s documented Early Access feature exposes **Edit** and **Reset** for supported individual assignments. Inspect the group app assignment separately when the value is group-owned.

    [Profile Push and timing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-selective-profile-push.htm) · [Automatic user attribute updates](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-automatic-user-attribute-update.htm) · [Assignment overrides](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-app-mapping.htm) · [Remove a mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-mapping.htm)

    ### Find the first unexpected value

    1. Read the source field on the specific user’s record.
    2. Check the mapping direction, destination, selected user type, and preview output.
    3. Verify the saved destination profile value. For outbound mapping, inspect the app assignment and any value override.
    4. If the app user value is correct but the receiving record differs, check assignment, provisioning settings, the connector operation, and the target’s accepted value or error.
    5. For a source-managed inbound field, confirm the latest import qualified to update that field and inspect the actual Okta user profile. Profile source priority and field overrides are covered in Lesson 7.

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-5.md"

=== "Revision"

    ### Check your recall

    **1. The incoming HR value is correct but the Okta user field is empty. Which mapping direction do you inspect first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Inspect App to Okta User on the HR integration. Verify the source row, destination field, and whether the source is allowed to populate the field.</p>
    </details>

    **2. An app value changed when the account was created and stayed at its old value after an Okta profile edit. Which per-field option can explain that?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Apply mapping on user create only. The mapping supplies the initial value and does not recalculate it from subsequent profile edits.</p>
    </details>

    **3. Preview is green and shows the expected value. Which evidence establishes a successful downstream write?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Verify the saved app user value, the provisioning operation, and the actual value on the receiving account. A valid preview establishes mapping evaluation.</p>
    </details>
