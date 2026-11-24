# Lesson 1 · Universal Directory and profile attributes

=== "Theory"

    ## The directory, the profile, and the schema

    **Universal Directory (UD)** is where Okta keeps the user information it uses for tasks such as evaluating group rules and mapping data to apps. You worked with an individual record in **Directory → People** in Foundations. In this module, you will also use **Directory → Profile Editor** to manage the fields available on profiles.

    A **profile** contains values for one user. An **attribute** is a named field on that profile. A **schema** defines what fields a profile supports and what kind of values those fields accept. If you add a field to the default user schema, you make that field available on profiles of that user type. You still need to populate a value for each user who needs one, or configure another mechanism to populate it.

    A **cost center** is a way an organization groups expenses for tracking. In this lesson you will store a short cost-center code on each test user's profile.

    | Question | Where to look |
    | --- | --- |
    | Does this user type have a field for the cost center? | **Directory → Profile Editor**, then open the Okta user profile definition. |
    | What value does this user have in that field? | **Directory → People → user → Profile**. |
    | How will this value reach the app? | Find the applicable profile mapping. An app can have its own profile and field definitions. |

    A **base attribute** comes with the profile, such as First name. A **custom attribute** is a field you add because the profile needs to hold another piece of information. The lab uses a custom field called **Lab Cost Center**.

    ## Decide what the field should store

    | Setting | Decision for this lab |
    | --- | --- |
    | **Display name** | `Lab Cost Center`, the label you look for in the console. |
    | **Variable name** | `labCostCenter`, the name you will reference in a future mapping. |
    | **Data type** | **string**. The values are codes such as `FIN-0042`, so they need to retain letters and formatting. |
    | **Attribute required** | Leave optional. You are introducing the field for a small exercise and existing users may have no value. |
    | **Default value** | Leave blank so each learner can supply the right code on each test profile. |
    | **User permission** | Set **Read Only** so end users cannot edit the field themselves. Use an administrator with profile-editing permission to enter the lab values. |

    Field settings affect every user of the selected type. The values you edit in the lab affect only the two test accounts. Pick the profile definition first, then make the smallest change needed for the exercise.

    **An empty text field can still have a stored value.** When you leave a user attribute value empty and save in the Admin Console, Okta documents that it stores an empty string (`""`). A null value represents the absence of a value. A search that asks whether the field is present can still return a profile with an empty string. When you investigate a rule or mapping, check the value the rule actually compares. [Okta · Custom user attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm)

    ## Okta profiles and app profiles

    A user's **Okta profile** stores the value inside Okta. An **app user profile** represents the user's attributes for a particular integration. The app might call a field something different or expect a different format. A **profile mapping** tells Okta which source value supplies which destination field and whether the value needs to be transformed. Adding a field to the Okta user profile makes it available for use in mappings.

    This lesson ends when the values are correct on both Okta profiles. You will practice moving data between profiles in Universal Directory and lifecycle and mapping a custom value into a SAML integration in SAML and attribute mappings.

    ## Official reading

    - [Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/)
    - [Add custom attributes to an Okta user profile](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm)

=== "Hands-on Lab"

    ## Store two cost-center codes in Universal Directory

    Use your Integrator org and the two Okta-managed test users from Foundations. This walkthrough assumes both accounts use the default **User** type. Use an admin account with permission to edit the user schema and update both test profiles.

    ### 1. Open the definition for the default Okta user type

    1. Go to **Directory → Profile Editor** in the Admin Console.
    2. Choose **Okta** in the filters. Find **Okta User (default)** and select **Profile**. If the Profile action is unavailable, select **User (default)**.
    3. Find the existing **First name** field. Compare its display label and variable name before creating a field of your own.

    ### 2. Add the optional lab field

    1. Select **Add Attribute**. Choose **string** and enter **Lab Cost Center** for **Display name** and `labCostCenter` for **Variable name**. Use **Cost-center code for the course lab** as the description.
    2. Leave **Attribute required** off, leave the default value blank, and select **Read Only** under **User permission**.
    3. Save. Verify that the custom field appears on the default Okta user profile definition. If you already created this field, verify its settings and reuse it.

    ### 3. Give each test user a different value

    1. Open **Directory → People** and select the first test user. On **Profile**, select **Edit**, enter `FIN-0042` in **Lab Cost Center**, and save.
    2. Repeat with the second test user. Enter `OPS-0105`.
    3. Reopen both profiles. Check that each shows its own code and retains the leading zeros.

    ### 4. Verify the definition and values separately

    1. Return to **Profile Editor** and verify both the variable name and the string type. Return to **People** to verify the value stored on each account.
    2. If the field is missing on a test user's record, check their user type and confirm that you edited the Okta profile definition for that type. If the field appears blank, verify that the edit was saved for the intended user.
    3. Keep the field and both values for the mapping exercise.
