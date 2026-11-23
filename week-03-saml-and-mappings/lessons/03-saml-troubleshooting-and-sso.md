# Lesson 3 · Troubleshoot SAML and choose an SSO method

=== "Theory"

    A user says, “SSO is broken.” **Single sign-on (SSO)** lets an app rely on a user's sign-in through an identity provider such as Okta. Start by finding the last thing that worked. Did Okta let the user launch the integration? Did the browser deliver a SAML response? Did the service provider accept it? Did the app match the expected account and read the required attributes? Each answer tells you which configuration to inspect next.

    ## Use three sources of evidence

    Reproduce one sign-in with a test user in a fresh private browser window, with any previous private windows closed. This starts the test without reusing a sign-in from another account. Note the app instance and approximate time. Find the matching Okta System Log event, inspect the decoded SAML message if a response was sent, and check the service provider's result. Keep the trace within your lab because it can contain sign-in data and user information.

    | Evidence | What it helps you establish | Next check |
    | --- | --- | --- |
    | **Okta System Log** | Which user and integration Okta evaluated, and the outcome it recorded. | Filter by the test username and time. Look for the relevant app SSO event, such as `user.authentication.sso`, and inspect **Target** and **Outcome**. |
    | **Browser trace** | Which flow ran, where the browser sent the response, and which attributes Okta supplied. | Compare the ACS and SAML fields to the service provider configuration. |
    | **Receiving app** | Whether the app trusted the response, found a local account, and used the attributes it received. | Read the actual app error, login audit result, or signed-in profile for this attempt. |

    Think through the chain before editing. A successful Okta event narrows your search to later steps when the browser trace also shows a delivered response. The receiving app provides its own evidence of acceptance.

    ## Match symptoms to configuration

    | Symptom | What to compare |
    | --- | --- |
    | **Tile missing or launch blocked** | Check the user's assignment paths, tile visibility, account status, and the authentication policy applied to that integration. |
    | **Audience or destination error** | Compare `Audience` with the SP's Entity ID and compare the POST URL and response destination with the configured ACS. Confirm that the values came from the same test app instance. |
    | **Signature or issuer validation error** | Compare the expected IdP issuer and public signing certificate at the app with the current Okta integration. Confirm whether the SP requires the response, assertion, or both to be signed. |
    | **Expired or not yet valid** | Compare the assertion's time conditions with the SP clock and the time of the request. Use a fresh response during testing. |
    | **User unknown after response validation** | Compare NameID's value and format with the identifier the SP uses for account matching. Check whether the expected account exists. |
    | **Expected attribute missing from the app** | Inspect the assertion first. If the field is absent or wrong there, trace the Okta value, mapping, and statement. If it is correct there, check the app's incoming attribute name and update behavior. |

    For a signing certificate change, coordinate with whoever administers the SP. Check whether it refreshes IdP metadata or requires you to import the new certificate. Confirm whether it can trust both certificates during the change, agree on the activation order, and test a fresh sign-in. Plan the rollback with the same administrator. Okta's **Sign On** tab shows the certificate for the integration you are changing.

    ## How SAML fits into single sign-on

    **Single sign-on (SSO)** describes the sign-in experience. The integration method determines what the app receives and which evidence will help you diagnose a failure.

    | Method | What the app receives or uses | Administrator checks |
    | --- | --- | --- |
    | **SAML 2.0** | An XML response carrying an assertion. | ACS, SP Entity ID, IdP issuer and signing certificate, NameID, attributes, and the SP's authentication result. |
    | **OpenID Connect (OIDC)** | An **ID token**, a signed JWT with claims about the authentication and user. In an authorization code flow, the app exchanges a code for tokens. | Issuer, client ID, redirect URI, the configured grant and claims, and the app's token-validation result. |
    | **Secure Web Authentication (SWA)** | A username and password for the app's sign-in form. | The target sign-in page and the configured credentials. |

    OAuth 2.0 provides an authorization framework. In an OIDC sign-in using OAuth flows, the **ID token** tells the client about authentication. An **access token** is used to access an API within the granted permissions. This lesson provides a protocol comparison. To practice administering OIDC, you also need a lab that creates a client, executes a sign-in, and verifies what the application accepts.

    ## Official reading

    - [Troubleshoot SAML flows with SAML Tracer](https://support.okta.com/help/s/article/How-to-troubleshoot-with-SAML-Tracer)
    - [Okta System Log event types](https://developer.okta.com/docs/reference/api/event-types/)
    - [Manage signing certificates](https://help.okta.com/en-us/content/topics/apps/manage-signing-certificates.htm)
    - [OpenID Connect and OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview)
    - [Create SWA app integrations](https://help.okta.com/en-us/Content/Topics/Apps/apps_app_integration_wizard_swa.htm)

=== "Hands-on Lab"

    Use a working [Module 4 custom SAML integration](02-custom-saml-attributes-and-group-assignment.md), one disposable user, and a test SP you administer. Establish a successful sign-in and verify the user's `cost_center` at the app before starting. Keep two browser sessions available, one for administration and one for testing.

    === "1. Diagnose two different failures"

        **1. Record the working path.** In the test session, sign in and match the app and test user across the System Log, the SAML trace, and the SP's signed-in view. Record whether the sign-in began at Okta or the SP. Note the outcome at each point.

        **2. Isolate a missing assignment.** Change the test user's Department to the nonmatching lab value from Lesson 2. Wait for rule processing, then try a new launch. Check **Directory → People**, the rule and its target group, and the app's **Assignments**. Restore the qualifying value and verify that the assignment and sign-in return. If the user still receives the app during the test, inspect other assignment paths before touching SAML settings.

        **3. Isolate an attribute mismatch.** On the dedicated test app integration, temporarily rename the `cost_center` statement to `cost_center_lab_check`. Leave the expression and the receiving app's expected field name as they were. Start a fresh sign-in and find the temporary name in the assertion. Inspect how the test SP reports the missing expected field. If it allows access, the app-side value may be blank or retain an older value depending on its configuration. If it requires the attribute, capture its validation error. Restore `cost_center` and prove the expected field is received again.

    === "2. Troubleshoot independently"

        **1. Compare two sets of integration settings.** Open the test SP's SAML configuration. Write down which values the SP provides to Okta and which values Okta provides to the SP. Identify the owner and evidence for ACS, Entity ID, IdP issuer, signature requirements, signing certificate, NameID, and the app's required attribute name.

        **2. Diagnose a trust error from evidence.** For a practice exercise with no trust-setting changes, take the values from the successful trace and work through this case. The SP reports an audience mismatch, but the response was posted to the correct ACS. Identify which XML element and which SP setting you would compare. Then explain which evidence would change your diagnosis if the error instead named the signing certificate.

        **3. Demonstrate a clean retest.** Start from a fresh user session. Show the user's assigned path, the expected assertion attribute, and successful sign-in and attribute handling at the SP. Describe how you would distinguish an Okta sign-in failure, an SP trust failure, and a successful sign-in with missing app data using only the evidence you collected.
