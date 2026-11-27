# Lesson 4 · Test the policy and read the System Log

=== "Theory"

    ## What does the System Log prove?

    In **Reports → System Log**, narrow the time range and find the test user's `policy.evaluate_sign_on` and `user.session.start` events. In the relevant event, expand **DebugContext → DebugData** and read the named entries under **Behaviors**, when present. In the policy event, inspect **Target** for the app policy and rule, and **Outcome** for the recorded decision. A single Identity Engine event can include both global session and app evaluations. Then check the separate verification event for the method and its result. [Okta Event Types catalog](https://developer.okta.com/docs/reference/api/event-types/)

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

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **Four evidence rows, four next steps**

    In four distinct attempts, the device result is UNKNOWN, BAD_REQUEST, NEGATIVE, or POSITIVE. A Push dispatch was recorded for the positive attempt. The control user was never assigned to the app.

    1. What does each behavior result justify investigating?
    2. What else must be present to conclude the positive attempt passed step-up through Push?
    3. How do you rebuild a fair control and avoid changing device history accidentally?
    4. You reset one user’s Behavior Profile and the next attempt returns UNKNOWN. Did the active behavior definition change?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>For UNKNOWN build usable history. For BAD_REQUEST fix missing attempt context. NEGATIVE means no change detected, so inspect other rules for any challenge. POSITIVE means a change was detected and you still need the policy decision.</li>
    <li>Find the actual target app policy and selected step-up rule, then correlate successful verification identifying push. Dispatch alone shows an earlier step.</li>
    <li>Assign both users the same test app, keep only the pilot in the step-up group, and start directly at the target from familiar and unused browser profiles as appropriate. Use fresh sessions and correlate the records by attempt.</li>
    <li>The reset clears that user’s tracked history. It does not change the active definition or the app rule. Rebuild usable history and inspect the recorded rule before interpreting the next challenge. <a href="https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/reset-behavior-detection.htm">Okta · Reset a user behavior profile</a></li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. System Log shows BAD_REQUEST for a named device behavior. What check targets that result? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Treat it as proof that the user is outside the group</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Wait for more history only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. Restore usable device information for the test attempt</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Move the Catch-All above the pilot rule</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> BAD_REQUEST indicates missing information. UNKNOWN instead indicates insufficient history.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which records prove a changed device triggered the expected rule and the user completed Push? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Named behavior result from the attempt</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Selected app policy rule</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Correlated successful verification identifying push</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Push dispatch as the only proof</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> The evidence covers the signal, rule, and completed verification. A dispatch alone proves a request was sent.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. Which comparison reduces the chance of making the unfamiliar browser familiar before the test? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Clear site data from both profiles before each attempt</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B"> <span>B. Sign in on the Dashboard first, then open the app</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="C" data-correct> <span>C. Start the test at the app&#x27;s own entry point from an unused profile and compare with a known profile</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> Use the same account, network, and target. Change browser familiarity without first seeding history.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    ??? question "1. How do UNKNOWN and BAD_REQUEST differ?"

        UNKNOWN indicates too little history. BAD_REQUEST indicates missing input in the current request. Retest after building history or restoring the missing signal, respectively.

    ??? question "2. What should you check when both the familiar and changed runs prompt for MFA?"

        Compare which app rule was selected each time and check the Catch-All Rule, global session requirement, and any enrollment prompt.

    ??? question "3. Why does the control user need access to the same test app?"

        Otherwise app assignment can stop the request before the comparison proves whether group membership controls the rule.

    ### Scenario and interview practice

    **Troubleshooting scenario.** The log records a positive device result, an app-policy CHALLENGE, and a push dispatch. What is still missing from the conclusion that mobile Push succeeded?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Find the correlated successful authentication event identifying push. Use actor, time, and transaction or session identifiers where available. The challenge and dispatch establish earlier steps only.</p>
    </details>

    **Interview question.** A teammate opened the dashboard from a new profile before launching the target app. The target then logged NEGATIVE. How would you design a better comparison?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Start a new unfamiliar browser profile at the target's own entry point, keep the app and network fixed, and compare it against a fresh attempt in a known regular profile. Use the named behavior and recorded rule to compare the outcomes.</p>
    </details>
