## Lab 1 · Enroll and verify mobile Okta Verify { #lab-1 }

Use a nonproduction Okta Identity Engine org, a separate admin session, and an Android or iOS device with the latest Okta Verify app. You need rights to manage users, groups, authenticators, and policies and to read the System Log. For Labs 2–4, confirm **Security → Behavior Detection** is available and your org has **Adaptive MFA** enabled for app sign-in behavior conditions. Check that the rule editor exposes **The following custom expression is true** and accepts a named behavior expression before relying on a timed run. If the feature is unavailable, complete enrollment and practice interpreting the sample evidence on the module practice page.

=== "Choose a test target"

    Choose one target for the whole module.

    | Target | What to record before enrollment |
    | --- | --- |
    | **Okta Dashboard** | The org's end-user sign-in URL and the dedicated Dashboard app sign-in policy in **Security → Authentication Policies**. Use an isolated lab org and confirm the policy covers only the Dashboard. |
    | **Separate test app** | The app's current policy and its direct sign-in entry point. For a SAML app that supports service-provider-initiated sign-in, this is the app's own login page or URL that starts the redirect to Okta. Use the Dashboard route if the app can only be reached by signing in to Okta and clicking a tile. |

    Inspect the active policy for the selected target. Note whether an existing rule requires a second factor and permits Okta Verify Push. If it does, use it for an early Push test. Otherwise, confirm enrollment in this lab and complete the Push test in Lab 4 after the step-up rule is configured.

    Okta lists Adaptive MFA in the [Integrator Free Plan org configuration](https://developer.okta.com/docs/reference/org-defaults/). Verify the behavior controls in your own org.

=== "Prepare users and enrollment"

    1. Create two active, native Okta test users with usable initial passwords. Use the **member** for the group-scoped rule and the **control** to test the same app from outside that group. Keep the admin account out of both lab groups and use separate browser profiles for administration and test sign-in.
    2. In **Directory → Groups**, create `BD Lab Learners` and add both users. This group scopes the enrollment policy. Create `BD Lab Step-Up` and add only the member. This separate group scopes the behavior rule. Verify both memberships on the group records.
    3. In **Security → Authenticators → Setup**, open **Okta Verify** or add it if it is missing. Verify that the enrollment options allow the mobile QR-code path and that **Push notification** is available under the verification options. Prefer an org where these settings already support the lab, since authenticator setup is org-wide.
    4. Open **Security → Authenticators → Enrollment**. Add a policy named `BD Lab Enrollment` for `BD Lab Learners`. Keep Password available and set Okta Verify to **Required** with no grace period for this exercise. Keep any required default rule for the policy. Place the lab policy ahead of a broader matching enrollment policy if needed. Verify the group and enrollment setting after saving.

=== "Enroll and prove Push"

    1. In a regular browser profile reserved for the member, open the test org's end-user sign-in URL. Sign in as the member. Select **Set up** for Okta Verify when prompted. If the user already reached the Dashboard, check the account menu's **Settings → Security Methods** for the available Okta Verify setup action.
    2. On the phone, open Okta Verify. Select **Add account** or **+**, choose **Organization**, then follow the prompt to scan the QR code shown in the computer browser. Finish the setup, allow notifications, and complete any verification requested. Keep the QR code and account details out of screenshots.
    3. Confirm the test user has an Okta Verify enrollment in their Dashboard security methods or their admin user record. If the target already has a Push-capable two-factor path, use a fresh sign-in from this same regular profile to test it. When another method is offered first, select the alternative verification method and choose Okta Verify Push. Approve only the request you just initiated and complete any number challenge. If there is no eligible path, continue to Lab 2 and verify Push in Lab 4.
    4. Repeat setup for the control in a different regular browser profile. Verify both test users can sign in successfully. If the lab policy or a fresh sign-in never offers Push, check the applicable enrollment policy, the Okta Verify verification methods, the device's notification permission and connection, and whether the sign-in rule permits Push. A successful six-digit code proves code verification. Prove Push separately.
    5. Keep the regular browser profiles and their site data. In Lab 4 you will reuse the member's normal profile as familiar context and introduce a different profile only for the changed-context attempt. Keep both enrollments until the practice use cases are done.

**Evidence to save for practice:** the group's two members, the separate step-up group with one member, the enrollment policy settings, the user-side Okta Verify enrollment, and a successful Push attempt if the selected target already supports it. Collect the Push evidence in Lab 4 otherwise.

[Enrollment policy](https://help.okta.com/okta_help.htm?id=authenticator-grace-period&type=oie) · [Okta Verify options](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-okta-verify-options.htm) · [Android QR enrollment](https://help.okta.com/eu/en-us/content/topics/end-user/ov-new-install-qr-android.htm) · [iOS QR enrollment](https://help.okta.com/eu/en-us/content/topics/end-user/ov-new-install-qr-ios.htm) · [Enable Okta Verify Push Notifications](https://www.youtube.com/watch?v=1QzNfnThJGc&list=PLIid085fSVdshfpe-065q9Hi1kChFu2Tg&index=52)
