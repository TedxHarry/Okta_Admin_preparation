# Lesson 4 · Test the policy and read the System Log

=== "Theory"

    ## What does the System Log prove?

    In **Reports → System Log**, narrow the time range and find the test user's `policy.evaluate.sign_on` and `user.session.start` events. In the relevant event, expand **DebugContext → DebugData** and read the named entries under **Behaviors**, when present. Read the policy evaluation separately to determine which requirement applied. A behavior result alone does not prove which rule matched or which authenticator the user completed.

    | Recorded value | What it tells you |
    | --- | --- |
    | `POSITIVE` | Okta detected the named change. |
    | `NEGATIVE` | Okta evaluated the behavior and detected no change. |
    | `UNKNOWN` | Okta had too little history to evaluate the behavior. |
    | `BAD_REQUEST` | The attempt lacked a signal Okta needed, such as a location or device identifier. |

    Okta documents MFA prompts for `POSITIVE`, `UNKNOWN`, and `BAD_REQUEST` when MFA is configured for the applicable behavior rule. A `NEGATIVE` result does not trigger MFA through that behavior. Another applicable requirement can still prompt for MFA. For an app rule with a custom expression, inspect the policy evaluation for that attempt before attributing a prompt to the expression. Record the user, app, rule, behavior result, and sign-in outcome together.

    If an expected prompt is missing, check the app's attached policy, the user's group membership, the rule order, the active behavior name, and the session used for the attempt. If there is a prompt in both the familiar and changed tests, compare the Catch-All Rule, the Global Session Policy, and the user's existing proof. Treat `UNKNOWN` as a history problem and `BAD_REQUEST` as a missing input problem. These observations call for different retests.

    **Reset Behavior Profile** clears one user's tracked history and starts building it again from subsequent activity. Find it on the user record under **Directory → People → More Actions**. It changes the baseline for subsequent tests. To change a behavior definition itself, use the edit, activate or deactivate, and delete actions in **Security → Behavior Detection**. See [System Log behavior events](https://help.okta.com/oie/en-us/Content/topics/security/behavior-detection/logs-behavior-detection.htm), [reset a user behavior profile](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/reset-behavior-detection.htm), and [manage behavior settings](https://help.okta.com/oie/en-us/Content/topics/security/behavior-detection/manage-behavior-detection.htm).

    ## Build a comparison you can interpret

    A **baseline** is a result you capture before introducing the change you want to measure. Keep app, user, and network stable when you compare familiar and unfamiliar browsers. A **control user** stays outside the rule's target group and can reach the same app, so the group filter can be verified independently of the device signal. Compare actual policy and verification events across attempts. A successful second sign-in on the same browser can change subsequent familiarity because the original successful attempt becomes part of the user's history.

    When you deliberately change one condition for a troubleshooting exercise, restore it and repeat from a comparable context. Record the **outcome**, the result of each event, separately from the behavior name. A positive behavior result describes a change in sign-in context. An authentication result tells you whether proof succeeded. The matched rule connects the two.

=== "Hands-on Lab"

    --8<-- "test-and-review.md"

=== "Revision"

    | Evidence | What it tells you |
    | --- | --- |
    | Behavior result | Whether Okta recognized a change, lacked history, or lacked input |
    | Policy evaluation | Which rule or requirement Okta evaluated for the session or app |
    | Verification result | Whether an authenticator was used successfully |

    ??? question "1. How do UNKNOWN and BAD_REQUEST differ?"

        UNKNOWN indicates too little history. BAD_REQUEST indicates missing input in the current request. Retest after building history or restoring the missing signal, respectively.

    ??? question "2. What should you check when both the familiar and changed runs prompt for MFA?"

        Compare which app rule was selected each time and check the Catch-All Rule, global session requirement, and any enrollment prompt.

    ??? question "3. Why does the control user need access to the same test app?"

        Otherwise app assignment can stop the request before the comparison proves whether group membership controls the rule.
