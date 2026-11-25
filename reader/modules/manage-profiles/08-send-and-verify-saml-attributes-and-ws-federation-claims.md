# Lesson 8 · Send and verify SAML attributes and WS-Federation claims

=== "Theory"

    Security Assertion Markup Language (SAML) carries identity data to a receiving service during sign-in. An assertion is the identity statement that the receiver evaluates. The receiving application validates the configured SAML signature. Trace an attribute from its stored value into the assertion and then into the receiver's claim handling.

    ### Separate stored values, provisioning, and sign-in claims

    | Layer | Evidence to inspect |
    | --- | --- |
    | Okta user profile | The built-in or custom value stored on the person in Universal Directory. |
    | App user profile | The value on that app assignment after an Okta-to-app mapping or assignment override. |
    | Provisioning | The operation that creates or updates a downstream account, when a compatible connector is configured. |
    | Federation | The attribute name and value emitted in the new SAML assertion or WS-Federation response. |
    | Receiver | The user or session the application identified, the claims it accepted, and how it used them. |

    A **rich assertion** carries extra user information such as Department or Cost Center. A service provider can use those values to create or update a record or make an authorization decision if it is configured to do so. Verify any such result at the receiver. Group-based app assignment controls who is assigned the integration. A group claim provides group information to the receiver when configured.

    [About rich assertions and claims](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-rich-saml.htm) · [Profile mapping directions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm)

    ### Configure a SAML app and its claims

    In a custom SAML 2.0 app, **Single sign-on URL** is the receiving Assertion Consumer Service (ACS) endpoint. **Audience URI (SP Entity ID)** identifies the service provider. **NameID** identifies the subject according to the receiver’s matching requirements. Use the URLs and identifier supplied by your test receiver, then configure the receiver with Okta’s identity provider metadata or the corresponding issuer, endpoint, and signing certificate.

    Add user claims on the app’s **Sign On → Attribute Statements** page. Use the syntax for the editor you opened:

    | Editor | Department expression | Custom cost center expression |
    | --- | --- | --- |
    | Current custom claims, **Add expression** | `user.profile.department` | `user.profile.labM3ClaimCostCenter` |
    | Legacy attribute statements, where exposed | `user.department` | `user.labM3ClaimCostCenter` |

    Use the exact attribute names the receiver expects, such as `department` and `costCenter`. Use one editor for each name because legacy and current statements are additive. The legacy editor can also reference supported app-user properties with `appuser.<variableName>`. Check which profile owns the intended value before selecting the expression. Okta omits a SAML claim when its expression returns empty. If every expression returns empty, Okta can emit an empty `AttributeStatement` element, which some receivers reject. Test populated and blank inputs.

    [Create a SAML app](https://help.okta.com/en-us/Content/topics/apps/apps_app_integration_wizard_saml.htm) · [Configure custom claims](https://help.okta.com/oie/en-us/content/topics/apps/federated-claims-overview.htm) · [Legacy attribute statements](https://help.okta.com/oie/en-us/content/topics/apps/define-attribute-statements.htm)

    ### Compare the preview with a real sign-in

    Use the wizard’s assertion preview where available to check the configuration it displays. If the preview is in the creation wizard and your claims are added later under **Sign On**, use a fresh actual assertion for those claims. Assign the SAML app through a test group whose membership is managed by a rule. Use default-type users for the rule test. Verify the assigned user reaches the app and the control user remains unassigned.

    When the receiver rejects sign-in, check the ACS, audience, certificate, and NameID against the receiver’s configuration. If sign-in succeeds and an app field is missing, compare the saved profile, statement expression, emitted claim name and value, and the receiver’s mapping in that order.

    [Inspect a SAML assertion](https://developer.okta.com/docs/guides/saml-tracer/) · [Custom user type limitations](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-types-known-issues.htm)

    ### Read WS-Federation evidence

    Okta documents **Template WS-Federation** for sending Universal Directory fields to a WS-Fed receiver. Use that integration’s settings and the receiver’s documentation. **Realm** identifies the application in the WS-Fed request, **ReplyTo URL** is the receiver endpoint, and **Audience Restriction** must match what the receiver expects. Verify the WS-Fed response and then how the receiver used each required claim.

    [Configure Template WS-Federation](https://help.okta.com/en-us/content/topics/apps/apps_configure_okta_template_ws_federation.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-8.md"

=== "Revision"

    ### Check your recall

    **1. The wizard preview shows a valid assertion before you add claims on Sign On. How do you verify those new claims?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Run a fresh sign-in with the assigned test user, inspect the emitted attribute names and values, and confirm what the receiver accepted.</p>
    </details>

    **2. Cost Center is stored correctly in Okta and appears in the assertion. The app still shows a blank value. Where do you look next?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check the receiver’s claim name and mapping. If it is expected to persist a value, verify its account update behavior as well.</p>
    </details>

    **3. Which WS-Federation setting points to the receiving endpoint?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>ReplyTo URL. Verify the Realm and Audience Restriction separately against the receiver configuration.</p>
    </details>
