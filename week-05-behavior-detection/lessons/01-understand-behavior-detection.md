# Lesson 1 · Understand Behavior Detection and enroll Okta Verify

=== "Theory"

    **Behavior Detection** compares a sign-in's context with the user's recent sign-in history. **Sign-in context** is information Okta observes about an attempt, such as the browser or client, public IP address, and location inferred from that address. A **behavior profile** is the history Okta uses to decide what is familiar for that user. The behavior supplies a condition. A policy rule uses that condition to decide what proof it requires.

    In this lesson, follow the decision from the user's enrollment through rule selection and the System Log. The [official Administrator Performance Exam study guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) assigns Behavior Detection 30% of Part II. Its tasks cover setting up mobile Okta Verify, configuring a behavior rule for a group, editing the authentication policy's Catch-All Rule, and testing both the policy and behavior.

    ## Which policy controls each part of sign-in?

    An **authenticator** is a method a user sets up to prove their identity. A **factor type** is the kind of proof it provides. A password represents knowledge. Okta Verify can provide possession, proof that the user controls an enrolled device. **Multifactor authentication (MFA)** uses more than one factor type. **Enrollment** associates an authenticator with the user's account so it can be used when policy calls for it.

    | Policy | What it controls | Where to look in the Admin Console |
    | --- | --- | --- |
    | **Authenticator enrollment policy** | Which authenticators users can or must set up. The applicable policy can make enrollment required, optional, or disabled. | **Security → Authenticators → Enrollment** |
    | **Global Session Policy** | How a user establishes an Okta session, whether the session rule requires MFA, and how long the session lasts. | **Security → Global Session Policy** |
    | **App sign-in policy** | What proof Okta requires for access to a particular app, including the Okta End-User Dashboard when you work with its authentication policy. The rule can set the allowed authenticator types and when the user must authenticate again. | **Security → Authentication Policies → App sign-in** |

    These controls work together. Enrollment makes a method available. The session and app policies determine what an attempt requires. An active Okta session may already contain proof the app accepts. If the app rule requires fresh or additional proof, Okta can prompt again. Before explaining a prompt, check the matching rule in each applicable policy, the user's enrollment, and whether the attempt reused a session.

    **Okta Verify** is the app the exam guide asks you to set up for the test user on a phone. On supported mobile devices, **Push** asks the user to approve a notification and can require a number challenge. **FastPass** is a separate Okta Verify method with its own requirements. An Okta Verify enrollment makes the configured methods available to that user. The sign-in rule and the org's authenticator configuration determine what the user can use for a particular attempt. See [authenticator enrollment policies](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/about-mfa-enrollment-policies.htm), [Okta Verify options](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-okta-verify-options.htm), and [app sign-in policy rules](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm).

    ## Enrollment, authentication, and mobile Push

    Installing Okta Verify puts the app on the phone. Enrollment connects that app to the intended Okta org and user. Authentication is a later step where the user proves control of the enrolled method. Verify all three steps independently. A phone can run Okta Verify without having an enrollment for the lab user. A successfully enrolled user can still lack Push if the authenticator's verification options do not offer it or the sign-in rule requires a different method.

    The browser used to sign in and the phone used to approve Push play different roles. Behavior Detection evaluates the browser or other sign-in client. Okta Verify on the phone can answer the authentication prompt for that browser session. Moving to a new browser while keeping the same phone lets you change the sign-in context and keep the enrolled factor available.

    Read [Okta Verify options](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-okta-verify-options.htm) for enrollment and verification controls. Follow the [Android](https://help.okta.com/eu/en-us/content/topics/end-user/ov-new-install-qr-android.htm) or [iOS](https://help.okta.com/eu/en-us/content/topics/end-user/ov-new-install-qr-ios.htm) setup path for your phone.

=== "Hands-on Lab"

    --8<-- "enroll-okta-verify.md"

=== "Revision"

    | What do you need to verify? | Where to look |
    | --- | --- |
    | Which methods can the user enroll? | Authenticator enrollment policy and authenticator setup |
    | Which proof starts the Okta session? | Matching Global Session Policy rule |
    | Which proof opens the requested app? | Matching app sign-in rule |
    | Did the test user complete Push? | The user experience and the matching verification event |

    ??? question "1. Why might an enrolled user see no Push option?"

        Check the configured Okta Verify methods, the authenticators allowed by the matched rule, and whether fresh verification is needed.

    ??? question "2. Does switching browsers require moving the Okta Verify enrollment?"

        The browser is the source of the sign-in context. The enrolled phone can remain the same while you test the changed browser.

    ??? question "3. Where do you make Okta Verify required for a test group?"

        In the authenticator enrollment policy that applies to the group. Confirm the org has already configured the authenticator and the test user's group matches the policy.

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** A push dispatch event appears and the user signs in after typing a six-digit code. Did the test prove that Push worked?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>It proved dispatch and code verification if those are the matching records. Repeat the test by selecting Push, approve the new request on the intended phone account, and correlate the successful verification event that reports push.</p>
    </details>

    **Interview question.** An enrolled mobile user sees Push in one app and only FastPass in another. Where would you look?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Compare the applicable app sign-in rules and their eligible methods, then check the global session requirements and the user's enrollment. A shared enrollment can satisfy different rules using different verification methods.</p>
    </details>
