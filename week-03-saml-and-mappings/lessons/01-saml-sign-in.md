# Lesson 1 · SAML sign-in with Okta

=== "Theory"

    When a user signs in to a SAML application through Okta, two systems take part. Okta verifies the user's identity and sends a message to the application. The application checks that message, identifies a user, and decides whether to open its own session.

    ## Who sends the message, and who reads it?

    **SAML** stands for Security Assertion Markup Language. It defines messages in XML that an identity system and an application can exchange for single sign-on. Okta is the **identity provider (IdP)** in this lesson. The receiving app is the **service provider (SP)**.

    The **SAML Response** is the message that travels back to the SP. An **assertion** inside the response carries claims about the user. It can tell the app who the user is, how and when the user authenticated, and which additional values the app should receive. The app uses its configuration to interpret those values.

    | Name | What it means | Where to check it |
    | --- | --- | --- |
    | **ACS URL** | The app's endpoint that receives the SAML response. ACS stands for Assertion Consumer Service. | The SP supplies it. In Okta, enter it as **Single sign-on URL**. |
    | **SP Entity ID** | The identifier the app uses for itself. It can look like a URL or another URI. | The SP supplies it. In Okta, enter it as **Audience URI (SP Entity ID)**. It appears as an audience in the assertion. |
    | **IdP issuer** | The identifier the app expects from Okta. | Get the value from the Okta integration's SAML setup details or IdP metadata. |
    | **IdP sign-in URL** | The Okta endpoint the app uses to start a SAML request in an app-initiated flow. | Get the value from the Okta integration, then configure it on the SP. |
    | **NameID** | The subject identifier the app uses to recognize the user, often an application username or email. | Match the app's expected value and format. Inspect the assertion's **Subject** to verify it. |
    | **Signing certificate** | The public certificate the app can use to verify Okta's signature. | Get the active certificate from the integration's **Sign On** tab or IdP metadata. |

    **Metadata** is a machine-readable description of SAML configuration. An SP can publish metadata containing its entity ID and ACS URL. Okta can provide IdP metadata containing its issuer, sign-in endpoint, and public signing certificate. The setup form on each side tells you which of those values it needs.

    ## Where sign-in starts

    In **IdP-initiated** sign-in, the user starts at Okta, usually by opening a dashboard tile. Okta processes its sign-in requirements and the browser submits the SAML response to the SP. The SP must support receiving a response without first sending its own authentication request.

    In **SP-initiated** sign-in, the user starts at the app. The app sends a SAML authentication request through the browser to Okta. After Okta verifies the user as required, the browser carries the response to the app's ACS. In a trace, compare the request and response to see where the sign-in began.

    ## Follow the evidence to the right system

    An **Okta assignment** determines who can use that app integration through Okta. After authentication, the SP checks the response and opens its own session if the checks pass. Depending on its configuration, it may check the signature and signing certificate, issuer, audience, destination or recipient, time conditions, and the subject it can map to an app user.

    | What you observe | First place to look |
    | --- | --- |
    | The assigned user cannot find the tile. | Check app visibility and **Assignments** in Okta. |
    | Okta stops the sign-in before a response is sent. | Check the user's sign-in outcome in Okta and the policy applied to the integration. |
    | The browser posts a response and the app rejects it. | Read the SP's error and compare the field it names with the configured values. Start with issuer, audience, ACS, and certificate if the error concerns trust or routing. |
    | The app accepts the sign-in but selects the wrong account. | Compare the assertion's **NameID** with the identifier the SP expects to match. |

    The wizard's **Preview the SAML Assertion** shows what the configuration can produce. A browser trace shows what Okta sent during a particular sign-in. To verify that the SP accepted it, look for the receiving app's signed-in view or a successful authentication event on the SP.

    ## Official reading

    - [Create SAML app integrations in Okta Identity Engine](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm)
    - [Application Integration Wizard SAML field reference](https://help.okta.com/en-us/Content/Topics/Apps/aiw-saml-reference.htm)
    - [Manage signing certificates and SAML setup details](https://help.okta.com/en-us/content/topics/apps/manage-signing-certificates.htm)
    - [Test SAML sign-in with SAML-tracer](https://developer.okta.com/docs/guides/saml-tracer/main/)
    - [SAML technical overview from OASIS](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

=== "Hands-on Lab"

    Use an Okta lab org and one disposable test user. The first tab includes a preview path you can complete with Okta alone. For a real sign-in in the second tab, you need a SAML-enabled test app you administer. Get the SP's ACS URL, Entity ID, matching identifier, and supported sign-in flow from that app before configuring it. Use its documentation to verify whether you need to create the test user on the SP first.

    === "1. Configure and preview the SAML message"

        **1. Create the integration.** Go to **Applications and Resources → Applications → Create App Integration**. Select **Classic experience** if prompted, then **SAML 2.0 → Next**. Name the application `LAB-SAML-Sign-In`. If you are doing the preview-only path, hide its dashboard tile under **App visibility**.

        **2. Enter the receiving application's details.** On **Configure SAML**, put the SP's ACS URL in **Single sign-on URL** and its Entity ID in **Audience URI (SP Entity ID)**. Match **Name ID format** and **Application username** to the identity your SP expects. For preview practice with Okta alone, use `https://example.invalid/saml/acs` and `urn:lab:saml-sign-in`, select **EmailAddress** if offered, and choose **Okta username** for the application username. Use the placeholder integration only for preview until you supply a real SP.

        **3. Inspect the preview.** Select **Preview the SAML Assertion**. Find the issuer, the subject's `NameID`, and the audience. Compare the audience with the Entity ID you entered. Compare any recipient or destination shown with the ACS configuration. Treat sample user values in the preview as examples. Close the preview, select **Next**, complete the internal-app options if prompted, and select **Finish**.

        **4. Locate the IdP setup details.** Reopen the integration and select **Sign On**. Locate **SAML Setup → View SAML setup instructions** and the active entry under **SAML Signing Certificates**. Identify the IdP values the receiving app would need. The preview route ends here. Save the integration for the live practice when you have a test SP.

    === "2. Test a sign-in at the receiving app"

        **1. Set up the SP side.** If you started with placeholders, update the Okta integration with your test SP's actual settings. In the test app, import the Okta IdP metadata if supported, or enter the Okta issuer, sign-in URL, and active public signing certificate from **Sign On**. Use the SP's required message signature settings and leave verification enabled. Make the Okta dashboard tile visible if you will test IdP-initiated sign-in.

        **2. Assign the disposable user.** In the Okta integration, open **Assignments → Assign → Assign to People** and assign the test user. Check the application username on the assignment. If your SP requires a preexisting local user, verify that its expected login matches the intended NameID.

        **3. Run the sign-in and inspect the response.** Open a separate browser session for the test user. If you use SAML-tracer, start it in the test browser before signing in. Open the tile for an IdP-initiated test, or start at the SP if it requires SP initiation. Find the response posted to the configured ACS. In the decoded SAML view, compare issuer, audience, and NameID with the expected values. Keep the trace local because it can contain a live assertion and user data.

        **4. Verify the receiving app accepted the sign-in.** Check the user shown in the signed-in app or the SP's authentication log. If the SP also supports the other initiation flow, run it and compare where the browser starts and whether there is an authentication request. If the SP rejects the response, use its error to identify which setting to compare. If Okta blocks the sign-in before issuing a response, use the Okta System Log and check the user's assignment and authentication policy.
