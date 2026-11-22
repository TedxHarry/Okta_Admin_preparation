# Lesson 2 · Custom SAML attributes and group assignment

=== "Theory"

    [Lesson 1](01-saml-sign-in.md) showed how the service provider checks a SAML response and matches the user. This lesson adds a question the app may ask after it identifies the user. Which cost-center code did Okta send? To answer, follow the data from Universal Directory to the named attribute in the assertion. Follow app eligibility through the group and the app assignment.

    ## Follow one cost-center value

    A **cost center** identifies where an organization tracks expenses. Here we store the test code `FIN-0042` in the Okta user's `labCostCenter` field. The same user can have a separate set of values for one app integration. That is their **app user profile**. An outbound **mapping** can read the code from the Okta user and store it in the integration's `costCenterCode` field.

    At sign-in, the app expects a named value called `cost_center`. A **SAML attribute statement** gives the value that name in the assertion. In the legacy editor, the statement can read the mapped app-user field. In the newer editor, the expression used in this lab reads the Okta user field directly. In both paths, check the saved input, the app-user mapping, and what the receiving app actually gets.

    | Place | Lab name or value | What to verify |
    | --- | --- | --- |
    | **Okta user profile** | `labCostCenter` holds `FIN-0042` for the first test user. | Open the person's **Profile** and read the stored value. |
    | **App user profile in Okta** | `costCenterCode` is populated by the outbound mapping `user.labCostCenter`. | Preview the specific mapping row, then inspect the assigned user's app profile if the integration exposes it. |
    | **SAML assertion** | The SP expects an attribute named `cost_center` with value `FIN-0042`. | Inspect **AttributeStatement** in a fresh response and check the receiving app's attribute view. |

    Match the statement name to the receiver's configuration. The statement controls the name the app sees, so you can change an Okta field's display label while keeping the SAML name the same.

    **NameID** lets the service provider identify the user according to its matching settings. A named attribute such as `cost_center` is additional data. The app decides what to do with the value. For example, it might display it, use it in its own access logic, or discard it if the attribute name does not match its configuration.

    ## Pick the expression for the editor you are using

    Okta uses different expression contexts for group rules, profile mappings, and the newer SAML claims editor. Start with the field you want to read and the editor in which the expression runs.

    | Where you write it | Expression used in the lab | Result |
    | --- | --- | --- |
    | **Group rule**, advanced condition | `user.department == "Lab-SAML-Finance"` | True or false for the current user's Department. |
    | **Profile Editor**, Okta User to App | `user.labCostCenter` | The value copied into `costCenterCode` on the app user profile. |
    | **Legacy SAML Attribute Statements** | `appuser.costCenterCode` | Reads the mapped app user field for the assertion. |
    | **Sign On → Attribute Statements → Add expression** | `user.profile.labCostCenter` | Reads the Okta profile field directly in the newer claims editor. Verify the app user mapping separately on this path. |

    With the newer editor's expression, a correct statement can still appear if the app user mapping is incomplete, because the claim reads the Okta profile directly. With the legacy expression above, the app user value is the input to the statement. That is why the lab checks both the mapped value and the assertion.

    ## Locate the gap before changing settings

    If the test user cannot start the app, check their **Department**, the rule and its target **People** list, and the integration's **Assignments**. If sign-in reaches the app but `cost_center` is absent or unexpected, check the exact stored variable name, the statement name, and the input the chosen expression reads. If the response contains the expected value and the app ignores it, check the attribute configuration and sign-in result at the SP. Compare these observations from the same test sign-in.

    ## Official reading

    - [Administrator Performance Exam study guide](https://certification.okta.com/page/administrator-performance-exam-study-guide)
    - [Create group rules](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-create-group-rules.htm) and [assign an app integration to a group](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-assign-app-groups.htm)
    - [Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)
    - [Define legacy SAML attribute statements](https://help.okta.com/en-us/content/topics/apps/define-attribute-statements.htm)
    - [Configure custom claims for app integrations](https://help.okta.com/en-us/Content/Topics/apps/federated-claims-overview.htm) and [Expression Language for Identity Engine](https://developer.okta.com/docs/reference/okta-expression-language-in-identity-engine/)

=== "Hands-on Lab"

    Use the two active Okta-managed test users from earlier lessons. For the full lab, prepare a test SAML SP you administer that lets you inspect received user attributes or map them into an app profile. Use a fresh custom SAML app instance so the control user can be tested without another assignment path. With Okta alone, you can create the group, test assignment, and preview the mapping. Real assertion delivery and SP-side verification require the receiving app.

    === "1. Prepare the group and the custom app"

        **1. Prepare the Okta user attribute.** In **Directory → Profile Editor → Okta User (default)**, create the optional string `labCostCenter` if you have not already done so in [Week 2, Lesson 1](../../week-02-directory-and-lifecycle/lessons/01-universal-directory-and-profile-attributes.md). In **Directory → People**, give the first test user `FIN-0042` and the second `OPS-0105`. Record the users' original Department values. Set the first user's Department to `Lab-SAML-Finance` and the second's to `Lab-SAML-Control`.

        **2. Create an expression-based group rule.** In **Directory → Groups**, create `LAB-SAML-Finance`. On **Rules → Add Rule**, set the advanced condition to `user.department == "Lab-SAML-Finance"`. Under **Then Assign to**, choose the new group. Save and activate the rule. In the group's **People** tab, verify that the first user matches and the control user stays outside.

        **3. Create the SAML app.** Follow [Lesson 1](01-saml-sign-in.md) to create a custom **SAML 2.0** integration named `LAB-SAML-Cost-Center`. Use the test SP's ACS, Entity ID, and NameID requirements. Configure the SP with the IdP details from this specific integration and prepare its test user record if required. If you are using the Okta-only preview path, use the placeholders from Lesson 1 and hide the tile until you configure an SP.

        **4. Add a field to the app user profile.** In **Directory → Profile Editor**, locate the new SAML app and open its **Profile**. Select **Add Attribute**. Create the optional **string** field with display name **Cost Center Code** and variable name `costCenterCode`. This adds a per-user field to this app instance's profile definition.

    === "2. Map, send, and verify"

        **1. Configure the outbound mapping.** In **Profile Editor**, select **Mappings** for the lab app. On **Okta User to App**, find **Cost Center Code** and enter `user.labCostCenter` as its source. Preview both test users and check for `FIN-0042` and `OPS-0105`. Save the mapping and apply updates if prompted. If the UI offers push timing for this row, allow both create and update so you can test a later change.

        **2. Add the assertion attribute.** Open the app in **Applications and Resources → Applications**. Use the editor your app exposes. For the newer interface, go to **Sign On → Attribute Statements → Add expression**, set the name to `cost_center`, set the expression to `user.profile.labCostCenter`, and save. If the app uses legacy statements, open **General → SAML Settings → Edit**, go to **Attribute Statements**, use `cost_center` as the name and `appuser.costCenterCode` as the value, then finish the wizard. Configure one statement with this name. If the SP expects a different attribute name, use that name on both sides.

        **3. Assign through the group.** Open **Assignments → Assign → Assign to Groups** and assign `LAB-SAML-Finance`. In **Assignments**, confirm the group is assigned and the first user receives the app. The second user has a valid profile value but should receive no assignment through this rule. Where the app assignment editor exposes **Cost Center Code**, inspect the first user's value.

        **4. Sign in and verify at the SP.** Start a fresh sign-in as the first test user using the flow your app supports. Use the [trace method from Lesson 1](01-saml-sign-in.md) to find `cost_center` inside **AttributeStatement** and verify `FIN-0042`. Then check the receiving app's user or attribute view for the same value and the same user. A successful app sign-in establishes that the SP accepted the response. An SP view or record of the received attribute is the evidence for the value at the app.

    === "3. Test changes and troubleshoot"

        **1. Test a changed profile value.** Change the assigned user's **Lab Cost Center** to `FIN-0043`. Preview the mapping, verify the assigned field where exposed, and start a fresh SAML sign-in. Compare the new assertion and the SP's view with the old value. If the mapped field is stale, check the mapping direction, save state, and push timing. If the assertion is correct but the SP profile is stale, check how the SP updates attributes at sign-in.

        **2. Test loss of eligibility.** Change the user's Department to `Lab-SAML-Control`. After rule processing, verify that the user leaves the group and loses the app assignment. Test a **new** sign-in in a clean session. An existing session maintained by the SP may have its own lifetime. Restore the original department values and the first user's initial cost-center code after observing both results.

        **3. Practice independently.** In a separate lab run, add a second optional text attribute and choose a new statement name the test SP can display. Use a narrow rule and two test users. Show the matching user, the saved outbound mapping, the assertion value, and the app-side result. Explain the first place you would look if the user lost the assignment, the assertion omitted the value, or the app failed to display a value present in the response.
