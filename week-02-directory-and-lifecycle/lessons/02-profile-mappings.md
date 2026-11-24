# Lesson 2 · Profile mappings

=== "Theory"

    In Lesson 1 you gave two Okta users a field called **Lab Cost Center**. Open either user and you can read their code. Now open **Directory → Profile Editor** and look at the profile for an application. That profile has its own fields. How does Okta know which one should receive the code?

    A **profile mapping** answers that question for one integration. You choose a destination field and tell Okta how to calculate its value. You configure the mapping once. Okta reads the source value separately for each user. That is why one mapping can produce `FIN-0042` for one person and `OPS-0105` for another.

    ## Read the direction first

    The **source** is the profile Okta reads. The **target** is the profile whose field receives the result. The tab you open in **Mappings** determines which profile plays each part.

    | Direction | Where the value starts | Where it goes |
    | --- | --- | --- |
    | Okta User to App | A field on the person's Okta profile | A field on that person's profile for this integration |
    | App to Okta User | A field supplied by an app that supports inbound data | A field on the person's Okta profile, subject to its sourcing settings |

    Each direction has its own configuration. An outbound mapping alone gives the application no authority to update the Okta field. For an inbound flow, the integration must be able to bring data into Okta, and the destination field's sourcing settings determine who can supply its value.

    ## Read one mapping row

    Find the **target field** first. In this lesson its variable name is `costCenterCode`. Follow the same row to the source box. Entering `user.labCostCenter` tells Okta to read the current user's Okta profile. The part before the dot identifies the profile. The part after the dot identifies the field by its variable name. The two profiles can use different field names because the mapping explicitly connects them.

    An **expression** is a short instruction Okta evaluates to produce a value. A field reference is enough when the target needs the original code. If the target needs a prefix, the expression `"CC-" + user.labCostCenter` joins the literal text in quotes to the user's code. For a source value of `FIN-0042`, the result is `CC-FIN-0042`. The original Okta field still contains `FIN-0042`.

    ## What does Preview actually prove?

    **Preview** evaluates your proposed mapping with a user you select. Read the resulting value as well as the color. Okta can mark a mapping green even when the source supplies no value. Red indicates an invalid mapping. An empty mapping column means the destination has no mapping.

    **Save Mappings** keeps the rule. **Apply updates now** applies the saved mapping to existing assignments as applicable. **Provisioning** is a separate capability through which Okta can create or update an account in a connected application. To verify a real downstream update, you need a configured connection and evidence from the receiving system. In this lab the evidence ends at the app profile inside Okta. **SAML** is a standard that lets Okta send sign-in information to an app. In SAML and attribute mappings you will use a **SAML attribute statement** to tell Okta what name and value to include in that message.

    **Check if a later profile edit should run the mapping.** Where the integration exposes mapping timing, **Apply mapping on user create only** uses the mapping on creation. **Apply mapping on user create and update** also uses it for profile changes. If a value is correct in Preview but stale on an existing assignment, check this setting before rewriting the expression. Profile Push can send the full app-user profile when it sends an update, so mapping timing and the fields included in a request answer different questions. [Okta · Profile Push](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-selective-profile-push.htm)

    ## Official reading

    - [Map Okta attributes to app attributes](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-map-attributes.htm)
    - [Modify attributes with expressions](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-attribute-mappings-expressions.htm)
    - [Create a SAML app integration](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm)

=== "Hands-on Lab"

    Use your Integrator org, an administrator who can manage integrations and profile mappings, and the two test users from [Lesson 1](01-universal-directory-and-profile-attributes.md). Work through the two tabs in order. First create `LAB-Profile-Mappings`, an Okta app integration for mapping practice. Add **Cost Center Code** (`costCenterCode`) as the field that will receive the value from **Lab Cost Center** (`labCostCenter`) on the Okta user. The setup uses the SAML wizard to create the integration. Its sign-in address and app identifier are placeholders here. In the second tab you will preview the result and check what Okta stores when you assign a user.

    === "1. Prepare the two profiles"

        **1. Locate your source values.** Open **Directory → People**. Open the first test user, select **Profile**, and find **Lab Cost Center**. Repeat for the second user. You need one user with `FIN-0042` and another with `OPS-0105`. If the field is missing, complete Lesson 1 first.

        **2. Create the practice integration.** Open **Applications and Resources → Applications → Create App Integration**. Choose **Classic experience** if an experience picker appears, then **SAML 2.0 → Next**. Name the app `LAB-Profile-Mappings` and hide its icon from end users under **App visibility**. Select **Next**. If you already created this course integration, open it and continue with task 4.

        **3. Finish the setup.** Under **Single sign-on URL**, enter `https://example.invalid/acs`. Under **Audience URI (SP Entity ID)**, enter `urn:lab:profile-mappings`. The first field normally points to the app that receives a sign-in message. The second identifies that app. These practice values give you an integration to configure inside Okta. Leave the other defaults, select **Next**, choose the internal customer app options if prompted, and select **Finish**. Leave the app unlaunched.

        **4. Create the destination field.** Open **Directory → Profile Editor → Apps** and locate **LAB-Profile-Mappings**. Open its **Profile** and select **Add Attribute**. Choose **string**, set the display name to **Cost Center Code**, the variable name to `costCenterCode`, and the description to **Cost center received from the Okta profile**. Leave it optional and save. If the field already exists, check its name and type. You should now see it on the app profile definition.

    === "2. Map, preview, and apply"

        **1. Connect the fields.** In **Directory → Profile Editor**, find the same app and open **Mappings**. Select **Configure User mappings** if prompted. Choose the tab that starts with **Okta User** and points to **LAB-Profile-Mappings**. Find **Cost Center Code** on the target side. In the source box on that row, enter `user.labCostCenter`. Keep the other rows as they are.

        **2. Compare two previews.** Select **Preview**, choose the first test user, and read the result on the **Cost Center Code** row. Repeat for the second user. You should see `FIN-0042` and `OPS-0105` respectively. If the field is green but blank, reopen that user's **People → Profile** record and read the source value. If the expression is red, compare the variable name, including capitalization, with the definition on **Okta User (default)**.

        **3. Try a transformation.** Change just that row to `"CC-" + user.labCostCenter` and preview the first user again. Look for `CC-FIN-0042`. Restore `user.labCostCenter`, preview again, then select **Save Mappings** and **Apply updates now** if prompted. The saved mapping should yield the original code.

        **4. Inspect an assignment.** Go to **Applications and Resources → Applications → LAB-Profile-Mappings → Assignments**. Select **Assign → Assign to People**, find the first test user, and select **Assign**. Review the proposed profile values, complete **Save and Go Back**, then select **Done**. On the assignment row, open the edit control and find **Cost Center Code**. Expect `FIN-0042`. Close the form. If the user was already assigned, inspect their existing assignment directly. If Preview was correct but this value differs, confirm the app instance, the assigned username, and that you saved and applied the direct mapping. Keep the practice integration for SAML and attribute mappings.
