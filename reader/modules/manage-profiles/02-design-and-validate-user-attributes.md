# Lesson 2 · Design and validate user attributes

=== "Theory"

    The help desk wants a Support Region for routing requests and a Staff Reference for identifying people. Several people can belong to the same region. Each issued staff reference belongs to one person. Give the two fields different rules so Okta accepts the values each process expects.

    ### Choose the field and its type

    Check the existing schema in **Directory → Profile Editor → Okta → Okta User (default)** or the applicable custom user type. Reuse a **base attribute** when it already represents the same concept. Add a **custom attribute** for new information. The **display name** is the label in Okta. The **variable name** is the identifier used in mappings and expressions. Use a descriptive identifier that avoids reserved names such as `id` and `status`. Creating a field whose name differs from an existing one only by case can cause reference collisions.

    | Data you need to store | Suitable type | Example |
    | --- | --- | --- |
    | A label or identifier, including leading zeros | String | `000123` |
    | A whole number used as a quantity | Integer | `12` |
    | A quantity that may include a fraction | Number | `12.5` |
    | A true or false value | Boolean | `true` |
    | Several values of the same supported type | String, integer, or number array | `["NA", "EU"]` |
    | A standardized code or relationship | Country code, language code, or linked object where appropriate | A country field or a user relationship |

    [Profile types and reserved names](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profiles.htm) · [Custom user attribute settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm)

    ### Choose which values are allowed

    | Setting | Decision it controls |
    | --- | --- |
    | Enum | Restricts values to a list. Each entry has a label and a stored value, such as **North America** and `NA`. Boolean fields already have their own value type. |
    | Minimum and maximum length | Controls the supported field’s value length. Use it when a downstream format depends on length. |
    | Required | Makes the attribute mandatory where enforced. Check existing accounts and user creation or import flows before requiring it. |
    | Default | Supplies a configured value in supported creation flows. Check the saved value on a new record. Verify existing records separately. |
    | User permission | **Hide**, **Read Only**, or **Read-Write** governs end-user access to the field. Check the admin’s permissions separately. |

    Keep an identifier such as Staff Reference as a string so its leading zeros survive. If a custom string is left empty when editing a user in the Admin Console, Okta documents that an empty string can be saved. A search for the presence of the field can return that record. If a mapping must handle missing data, consider an empty string and a null value separately. Okta documents using the API to set null.

    [Custom user attribute settings and empty strings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm) · [End-user edit permissions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-edit-attributes.htm)

    ### Enforce uniqueness after checking existing values

    Okta allows up to five unique custom attributes per user type. If two types use the same attribute name and both declare it unique, the values share a namespace across those types. A type that has the same field with uniqueness disabled does not participate in that check.

    When you enable uniqueness on an existing field, Okta scans the existing values. If duplicates are found, the restriction checkbox clears. Resolve the duplicate values and enable the restriction again. Once enabled, a new duplicate edit is rejected. Users whose imported values would violate the restriction can also fail import. Verify the validation status first, then reopen the affected records after each attempted edit.

    [How uniqueness works](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-custom-uniqueness.htm) · [Enable uniqueness on an existing field](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enforce-custom-uniqueness.htm)

    ### Inspect the built-in name and username settings

    First Name and Last Name are required by default. Okta allows them to be optional for Okta-sourced users. Before importing a record with a missing name, inspect the target user schema and verify that the import can accept the missing value. Review applications and mappings that still expect names.

    The default Okta username format is **Email format**. **Custom character restriction** defines allowed characters, while **None** accepts a nonempty username without a format constraint. For example, `a-z.13579` allows lowercase letters, periods, and the listed digits. This schema control concerns the Okta login. The username sent to an app is configured separately.

    [Make names optional](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-first-last-optional.htm) · [Username format restrictions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-character-restriction.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-2.md"

=== "Revision"

    ### Certification cheat sheet

    | Need | Setting or check |
    | --- | --- |
    | Keep leading zeros | Store the value as a string. |
    | Limit values to approved options | Define an enum and verify the stored value. |
    | Make an existing field unique | Resolve duplicates and verify the validation status. |
    | Import an Okta-sourced record with a missing name | Verify that the corresponding name is optional. |
    | Diagnose a blank string in search | Distinguish an empty string from null. |

    ### Check your recall

    **1. Staff Reference must preserve `000123`. Which type fits?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Use a string. The leading zeros are part of the identifier.</p>
    </details>

    **2. You turn on uniqueness and the checkbox clears. Where do you look?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check Profile Editor’s validation status. If it found duplicates, correct the records, then enable uniqueness again and verify it stays enabled.</p>
    </details>

    **3. Can two types both accept the same Staff Reference if each declares that same attribute name unique?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>No. The types share a namespace for that unique attribute name.</p>
    </details>
