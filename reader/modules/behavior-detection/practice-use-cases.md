# Module 5 · Behavior Detection practice use cases and capstone

Complete the [guided labs](hands-on-labs.md) before trying these tasks independently. Start with your own configuration and evidence. Open the review answers after you finish each case. The suggested times are practice targets.

=== "1. Build and prove the policy"

    **Target time: 35 minutes.** Use an isolated app policy and two active test users who can both reach the same app. If you reuse the guided lab user, verify their mobile enrollment, or use a new user to practice a fresh enrollment. Start from a clean policy with the original fallback recorded so you can show the change you made.

    1. Set up mobile Okta Verify for the member and prove one successful Push.
    2. Create a named behavior for new browsers within a 20-sign-in history window. Create a target group with the member in it and the control outside it.
    3. Configure the target app so the member needs a password plus another factor when the named behavior matches. Modify its Catch-All Rule to require a password for requests that fall through.
    4. Test one familiar member sign-in, one unfamiliar member sign-in, and one unfamiliar control sign-in. Prove which rule was selected for each attempt. Record the behavior result and which factor was verified. If one run does not give usable evidence, diagnose it and repeat.

    | Evaluate your own result | Evidence to collect |
    | --- | --- |
    | Enrollment and Push | Correct test account on the phone and a successful verification linked to the same attempt. |
    | Behavior and group | Named active behavior, saved expression, selected group, and deliberate rule priority. |
    | Fallback | Correct app and policy, saved password requirement and original setting captured for restoration. |
    | Sign-in tests | Three labeled attempts with app rule, behavior result, and authentication outcome. |

    ??? question "Show the expected configuration and evidence"

        The app rule evaluates both group membership and the named active behavior before the password-plus-another-factor requirement applies. An outside-group request reaches the fallback even when its device result is positive, assuming no other rule matches first. A familiar member request with a false expression also falls through. Prove the selected policy from the log and record any separate MFA requirement from the global session rule. A successful verification event and the phone experience together support your Push result.

=== "2. Diagnose and repair"

    **Target time: 20 minutes.** Use the case 1 configuration. Make the controlled practice change yourself or have another learner make it. Move the test app back to its original policy, then launch the same app and try the member in a fresh browser context. Keep the behavior definition, group, and step-up rule as they were.

    1. Find the attempt and identify the policy and rule actually used. Compare that policy with the one that contains your behavior rule.
    2. Locate the app association in the Admin Console. Restore the intended association and verify both users can still launch the app.
    3. Rerun the member in another new browser profile. Then compare a familiar member or out-of-group request. Prove the correction with the resulting policy evaluations and the successful authenticator verification where it applies.

    ??? question "Show the repair reasoning"

        The rule can be correct and still receive no requests from the app if that app now uses a different policy. Check the evaluated app policy and its Applications list before changing the behavior expression, membership, or fallback. After restoring the association, use an unused browser context for a fresh new-device test. A browser that signed in successfully during diagnosis may already be familiar.

=== "3. Read a sign-in investigation offline"

    Read the following fictional records as a shortened investigation. Each row represents observations correlated for one test attempt.

    | Attempt | In target group | Named behavior result | App rule | Observed proof |
    | --- | --- | --- | --- | --- |
    | A | Yes | NEGATIVE | Catch-All Rule | Password |
    | B | Yes | POSITIVE | Step-Up on New Device | Password and successful Push |
    | C | No | POSITIVE | Catch-All Rule | Password |
    | D | Yes | UNKNOWN | Step-Up on New Device | Password and an additional prompt |
    | E | Yes | BAD_REQUEST | Evidence incomplete | Prompt outcome unavailable |

    1. Which rows demonstrate that browser familiarity and group scope affect the app rule independently?
    2. Why did a member see a prompt in D without a recorded positive behavior?
    3. Can you conclude E matched the fallback? What do you inspect next?

    ??? question "Show the explanation"

        Compare A and B for behavior with group membership held constant. Compare B and C for group scope with a positive behavior result in both. D lacks enough behavior history, and Okta documents that UNKNOWN can prompt for MFA when the applicable behavior rule is configured for MFA. The recorded rule is the evidence for that specific attempt. For E, check whether the sign-in supplied a usable device identifier and correlate the policy evaluation and verification events before assigning a branch. [System Log behavior outcomes](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/logs-behavior-detection.htm)

[Restore the lab settings](hands-on-labs.md#lab-4) when you finish.
