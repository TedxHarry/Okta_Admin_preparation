# Lesson 1 · Read the three profile types

=== "Theory"

    Okta Universal Directory stores user profiles, group profiles, and app user profiles. A receiving application can also store its own account record. Identify the record that holds the value and the operation that updates it before changing a profile or mapping.

    ### Separate the schema from the record

    A **schema** defines the fields a record can contain, their data types, and related settings such as whether a value is required. A **profile** holds the values on one record. For example, the schema defines Department as a field. A particular Okta user’s profile might contain `Support` in that field. Changing a value affects that record. Changing a schema can affect every record that uses it.

    Use **Directory → Profile Editor** to inspect schemas and mappings. Use **Directory → People → user → Profile** to see an actual Okta user’s values. The default user schema applies to the default user type. If a user has a custom user type, inspect that type’s schema.

    ### Identify the three profile types

    | Type | What it describes | Where to inspect the definition |
    | --- | --- | --- |
    | Okta user profile | The user’s attributes in Universal Directory, such as name, email, and Department. | **Directory → Profile Editor → Users → Okta → Okta User (default)** or the applicable custom type. |
    | Okta group profile | Attributes of an Okta-sourced group. Name and Description are base fields. | **Directory → Profile Editor → Groups → Okta → Okta group profile**. |
    | App user profile | The attributes Okta maintains for a user on a specific app integration. The integration controls which fields it exposes. | **Directory → Profile Editor → Users → Apps → app profile**. Depending on what you are inspecting, use the Directories or Identity Providers filter instead. |

    A **base attribute** is supplied by the profile definition. A **custom attribute** extends the schema. The default Okta user profile has base fields such as First Name and Last Name. The default group profile can be extended for Okta-sourced groups. Group membership is a separate relationship you read from the group’s **People** list. App or directory schema extension depends on what the integration supports and what Okta can discover. A field added to Okta’s user schema does not automatically become a field in the app’s schema.

    [Profile types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profiles.htm) · [View the default user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-user-profile.htm) · [View the default group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-group-profile.htm)

    ### Trace one field before editing it

    A **profile mapping** tells Okta which value to read and which field receives it. **App to Okta** mappings can bring source data into the Okta user profile. **Okta to app** mappings can populate app user attributes. A **profile source** supplies the authoritative profile or field value. Provisioning controls whether supported updates reach the downstream account.

    Verify that each record refers to the same user and integration. If the Okta user value is wrong, inspect inbound mapping and source ownership. If the app assignment value differs from the intended mapping result, inspect the outbound mapping and assignment. If the app assignment is correct and the receiving account still differs, inspect the connector and the write outcome.

    [Attribute mapping directions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm) · [Manage profile and attribute sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-sourcing-main.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-1.md"

=== "Revision"

    ### Certification cheat sheet

    | Question | Where to look |
    | --- | --- |
    | What fields can this user have? | Profile Editor and the user’s assigned user type. |
    | What value does this person have? | The actual user profile under Directory → People. |
    | What fields describe this Okta group? | Groups in Profile Editor. Check the group’s People list for membership. |
    | Which direction sends Okta values to the app schema? | Okta to app. Verify the app user record and any downstream write separately. |

    ### Check your recall

    **1. You need to see whether Department exists on the schema and whether Jules’s Department is populated. Where do you look?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Check the appropriate user type in Profile Editor for the field, then open Jules’s actual user profile under Directory → People for its value.</p>
    </details>

    **2. Does adding a Description to an Okta group change the people in it?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>A Description change edits the group record. Verify the current membership separately in the group’s People list.</p>
    </details>

    **3. The Okta user and app user records are correct, but the receiving app still has the old value. What do you investigate?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Confirm the downstream account link, whether the connector can update that field, and whether the update ran successfully.</p>
    </details>

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** HR says Jamie's Department is Finance, Okta People says Operations, and the app user record says Sales. Where do you start tracing the mismatch?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Start with the source value and then the inbound mapping and saved Okta user profile. After fixing the first wrong boundary, check outbound mapping and saved app user value. Verify the receiving application separately if it still differs.</p>
    </details>

    **Interview question.** A team says the group profile has the right value. They assume the value also exists on every member. How would you verify that claim?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Open the group schema and group record to confirm the field is group data, then inspect a member's Okta user profile and any applicable app assignment mapping. Membership alone does not copy a group attribute onto the user.</p>
    </details>
