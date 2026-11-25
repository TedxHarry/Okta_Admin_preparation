# Lesson 6 · Transform values and manage usernames

=== "Theory"

    Okta Expression Language (EL) calculates values for mappings and supported username settings. Check the source field, the expected output type, and the saved result before relying on an expression.

    ### Choose the input for the mapping direction

    | Reference | Use in Profile Editor |
    | --- | --- |
    | `source.fieldName` | Reads the source on the left in either mapping direction. |
    | `user.fieldName` | Reads the Okta user profile in **Okta User to App**. |
    | `appUser.fieldName` | Reads the in-context integration profile in **App to Okta User**. |

    Use the attribute’s **variable name** from the source schema. For an outbound mapping, use the finalized value on the Okta user profile. An explicitly named app reference can exist in some contexts, but a change to an external profile does not by itself trigger an outbound mapping. Move the inbound value into the Okta user profile first if another integration needs it.

    [Modify attributes with expressions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-attribute-mappings-expressions.htm) · [Attribute mapping directions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm)

    ### Predict the result before saving

    | Need | Expression | Example result |
    | --- | --- | --- |
    | Combine two fields | `user.firstName + " " + user.lastName` | `Alex Rivera` |
    | Normalize case | `String.toUpperCase(user.labM3TeamCode)` | `ops` becomes `OPS`. |
    | Extract an email prefix | `String.substringBefore(user.email, "@")` | `alex@example.com` becomes `alex`. |
    | Convert a numeric string for an integer field | `Convert.toInt(user.labM3SeatCount)` | The string `"007"` becomes the integer `7`. |

    Use conversion for quantities. Keep an identifier as a string if its leading zeros matter. Test invalid input before mapping a free-text field to a numeric destination. A blank guard handles missing data, while a nonnumeric string still needs a defined input validation or error-handling plan.

    A conditional uses `condition ? valueIfTrue : valueIfFalse`. This example handles both null and the empty string. Both branches return a string for the same destination.

    ```text
    (user.labM3TeamCode == null || user.labM3TeamCode == "") ?
      "UNASSIGNED" : String.toUpperCase(user.labM3TeamCode)
    ```

    For this expression, a value containing only spaces is still a string with characters. If your input can contain whitespace and the destination expects a short code, define how to normalize it and add a preview case for it. Review the expression reference for the specific editor. A function that works in Profile Editor may be unavailable in a group rule, SAML statement, or username format editor.

    [Okta Expression Language reference](https://developer.okta.com/docs/reference/okta-expression-language/) · [Modify attributes with expressions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-attribute-mappings-expressions.htm)

    ### Calculate a value once for a group rule

    | Editor | What the expression produces |
    | --- | --- |
    | **Profile Editor → Mappings** | A value that fits the destination field, such as text, an integer, an array, or a Boolean. |
    | **Directory → Groups → Rules** | A Boolean that decides membership. It can read stored Okta attributes, test array membership, and use supported group membership checks. |
    | **An app's claim editor** | A value that can be sent to the receiving application. Use the syntax and return type for that claim editor. |

    A group rule cannot run `Convert.toInt()` or `Time` functions directly. In **App to Okta User**, convert trusted numeric text into an Okta integer or map a date comparison to an Okta Boolean. The rule can then use a numeric comparison or test the stored Boolean. Check the source field and its format before mapping. A valid preview shows the calculated result. Check the saved Okta user profile after the integration processes the mapping so you know what value the group rule reads.

    To compare dates, `Time.fromIso8601ToWindows()` converts a timestamp in ISO 8601 format to a comparable numeric value. An ISO 8601 timestamp such as `2026-01-01T00:00:00.000Z` includes a date, a time, and the `Z` designator for UTC. Convert both the input and the cutoff in the mapping. Use an explicit missing-value result and make sure populated inputs are valid timestamps. The stored result changes when the mapping runs, so a calculation in a mapping does not schedule a future membership change by itself.

    [Group-rule expression limits](https://developer.okta.com/docs/reference/okta-expression-language/#expressions-in-group-rules) · [Date comparison in a profile mapping](https://developer.okta.com/docs/reference/okta-expression-language/#time-functions) · [SAML claim expression editors](08-send-and-verify-saml-attributes-and-ws-federation-claims.md)

    ### Identify which username you are changing

    | Username or setting | Where to inspect |
    | --- | --- |
    | Okta login generated on an inbound flow | Open the source integration’s **App to Okta User** mapping and inspect the username row. **Override with mapping** can replace the selected format with a field or expression where supported. |
    | Application username for an assigned user | For apps that expose it, inspect **Sign On → Application username format** and the update setting. Check the username on the user’s app assignment. |
    | Username mapping managed through Profile Editor | For AD, LDAP, and SAML identity provider integrations, inspect the appropriate direction in **Profile Editor**. Follow the integration’s documentation to identify the specific login field. |
    | SAML subject identifier or downstream account username | Inspect the SAML NameID configuration or the receiving account, as applicable. Confirm the target still identifies the intended user. |

    The outbound Profile Editor procedure for automatic app username updates uses **Okta User to App → Override with mapping → userName → Apply mapping on user create and update**. Use the app’s **Sign On** settings when the app exposes username format and timing there. Verify the setting that applies to your integration before changing a profile value. Some apps let end users supply their own credentials, which can block an admin-defined format change.

    Before applying a new username format, check required syntax, collisions, length limits, and what the receiving app uses to identify existing accounts. An updated username on the app assignment proves a change in Okta. Inspect provisioning or a new test sign-in to verify the corresponding result on the receiver.

    [Expressions and app username settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-expressions.htm) · [Override an inbound username format](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-username-format.htm) · [Automatically update an app username](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-auto-update-app-username.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-6.md"

=== "Revision"

    ### Check your recall

    **1. In an inbound mapping, which references can read the incoming department code?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Use source.departmentCode or appUser.departmentCode when that is the source schema’s variable name.</p>
    </details>

    **2. The source sends `"007"` as an account identifier. Should you map it through `Convert.toInt`?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Keep it as a string if the leading zeros are part of the identifier. Integer conversion produces 7.</p>
    </details>

    **3. An app assignment shows a new username. Where do you verify that the receiving app uses it?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Check the receiving account and provisioning result for a connector write, or inspect the identifier sent and accepted during a test sign-in.</p>
    </details>

    **4. Which editor converts the HR text `"12"` to a number for a group condition?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 4">Show answer</summary>
    <p>Use Convert.toInt in the inbound profile mapping to populate an integer field. Verify 12 on the saved Okta profile, then compare the integer field to the rule's threshold.</p>
    </details>
