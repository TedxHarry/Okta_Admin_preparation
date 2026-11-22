# Week 3 capstone · Deliver a custom SAML integration

A test application needs single sign-on (SSO) for users whose Department is `Lab-SAML-Capstone`. The app also needs a cost-center value under the name `cost_center`. Build the integration from these requirements. Use the users and concepts from earlier lessons, and show your evidence from Okta through to the receiving app.

## Starting state

- Use an isolated Okta lab org, two active disposable users, and a SAML service provider you administer. It must let you inspect received attributes or expose the value in the app profile. Obtain its ACS URL, Entity ID, user matching requirements, and supported initiation flow.
- Create `LAB-SAML-Capstone` as the Okta SAML integration for the test app. Create `LAB-SAML-Capstone-Users` as the Okta group that grants the integration. Give the first user Department `Lab-SAML-Capstone` so they match the rule. Give the second user Department `Lab-SAML-Control` so you can test a user outside the rule. Record their previous Department values.
- The first user should have cost-center value `CAP-3100`, and the control user should have `CAP-3200`. Add a new optional string attribute named `capstoneCostCenter` on the Okta user profile so this run tests creating a field independently.
- With Okta alone, complete the configuration and mapping preview using [Lesson 1's preview setup](../lessons/01-saml-sign-in.md). Use a real test SP for sign-in and app verification.

=== "1. Build from the requirements"

    1. Record which values come from the SP and which come from Okta. Create a custom SAML 2.0 integration named `LAB-SAML-Capstone` and configure trust on the test app.
    2. Create and activate an Expression Language group rule that uses the exact Department value in the requirements. Show that the first user joins and the control user stays outside.
    3. Create an optional string field on the app user profile in Okta. Map `capstoneCostCenter` into that field and show the expected values for both users in the mapping preview.
    4. Configure the SAML statement named `cost_center` using the editor available to your integration. Assign the app to the capstone group only. Show the assigned group and the resulting user assignment. If you need to recall which expression applies in which editor, see [Custom SAML attributes and group assignment](../lessons/02-custom-saml-attributes-and-group-assignment.md).

=== "2. Prove access and data reached the app"

    1. Run a fresh sign-in as the eligible user. Verify the expected identity, intended audience, and `cost_center` value of `CAP-3100` in the response. Check that the receiving app accepted the sign-in and shows the expected cost-center value for that user.
    2. As the control user, check whether the app is assigned. Try a clean sign-in with the integration's supported flow and verify the user does not get access through this integration. If the user is eligible through another assignment path, locate that path before changing the rule.
    3. Change the eligible user's cost center to `CAP-3101` while preserving their Department. Compare the saved profile, the mapping result, a fresh assertion, and the receiving app. Explain where you would investigate if the assertion has the new value but the app still shows the old one.

=== "3. Investigate and hand off"

    1. On the dedicated test integration, temporarily change the SAML statement name to `cost_center_capstone_test`. Keep the SP expecting `cost_center`. Use a fresh sign-in and the browser trace to locate the mismatch. Verify what the app reports, restore the required claim name, and retest. If you need help, see [Troubleshoot SAML](../lessons/03-saml-troubleshooting-and-sso.md).
    2. In your handoff, show the group rule and its two outcomes, the saved attribute mapping, the actual claim name and value, and the receiving app's result. State the first check you would make for a missing assignment, an audience error, and a missing custom attribute. Use a text summary with synthetic values rather than sharing a full sign-in trace.
    3. Restore the test users' original Department values. Check the capstone group's resulting membership and record any remaining state in the test app.
