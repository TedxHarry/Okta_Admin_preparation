# Lesson 3 · Modify the Catch-All Rule

=== "Theory"

    The **Catch-All Rule** describes what happens when an app sign-in attempt reaches the end of the app policy without matching an earlier rule. It provides the baseline authentication requirement for the requests that reach it. Okta starts a new app sign-in policy with a Catch-All Rule that allows access after any two factor types. An existing app policy may have a different configuration, so inspect it before making an exam task change.

    ## Predict the result before saving

    Read the selected app policy from top to bottom. The first matching rule applies. The result of evaluating the behavior and the factor requirement are separate. Keep the group-specific rule above the fallback. When the rule condition fails, continue reading until another rule applies. An earlier broad rule can intercept traffic a later rule was meant to handle.

    | Request that reaches the app policy | App-rule selection in the two-rule setup |
    | --- | --- |
    | Target group and behavior expression true | The earlier behavior rule supplies the requirement. |
    | Target group and expression false | The Catch-All Rule supplies the requirement. |
    | Outside the target group | The Catch-All Rule supplies the requirement regardless of the behavior expression. |

    ## Know how far the change reaches

    App policy association controls which apps inherit the fallback. App assignment controls which users receive a given app. Group membership in a rule controls which of those sign-in requests the rule matches. A change to the shared fallback affects every app using the policy for requests that reach that rule. The **Applications** tab shows the apps that use the policy. The **Rules** tab shows the order and what each matching request requires.

    **Reauthentication** means asking the user for fresh proof when a rule says earlier proof is too old or cannot be reused. Enforcement depends on the matched app rule, the applicable global session policy, and proof already present in the session. A password-only app fallback may still be reached after a global session rule has required MFA. Look at the app rule and the session event before treating a visible prompt as evidence about the fallback.

    Locate the exact app policy and examine its Catch-All Rule before changing it. Capture the original access decision, factor requirements, and reauthentication settings. After saving, reopen the fallback and the earlier behavior rule to check both the result and priority. Then verify from fresh sign-in attempts that reach each branch.

    [Create an app sign-in policy](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/create-auth-policy.htm) · [Assign apps to a policy](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/share-auth-policies.htm) · [Authentication scenarios](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/asop-authentication-scenarios.htm)

=== "Hands-on Lab"

    --8<-- "edit-catch-all.md"

=== "Revision"

    | Question | Find the answer in |
    | --- | --- |
    | Which apps receive the fallback change? | The policy's Applications tab |
    | Which request reaches the fallback? | The policy's ordered rules |
    | Why is the user still asked for another factor? | The matched app and global session rules and the user's authentication context |

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. Two apps share the same policy and only the pilot needs its fallback changed. What is the appropriate configuration? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A" data-correct> <span>A. Use and verify a dedicated app policy for the pilot where supported</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Change the enrollment policy for both apps</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Edit the shared Catch-All immediately</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Move the pilot user ahead of the app in policy priority</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A.</strong> The fallback applies to requests reaching it under that policy. Isolating the app association limits the change.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which checks belong in Catch-All rollback notes? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A"> <span>A. Only the friendly policy name</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Affected app associations</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Existing fallback authentication and reauthentication requirements</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Earlier rule order and baseline policy evaluation</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B and C and D.</strong> Capture enough to restore which policy applies and what it required.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A password-only app fallback guarantees the browser will never ask for another factor. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Global session policy or enrollment can still require another step. Inspect each layer&#x27;s evidence.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    ??? question "1. What happens to a request that already matched the earlier behavior rule?"

        The earlier rule supplies the authentication requirement. Okta reaches the fallback only for requests that skip all earlier rules.

    ??? question "2. Can an app's password-only fallback erase MFA required by a global session rule?"

        The global session requirement still applies. Compare the session and app policy evaluations to see which rule caused the prompt.

    ??? question "3. What do you inspect before editing the fallback?"

        Verify the policy's app associations, rule order, and existing access and authentication settings.

    ### Scenario and interview practice

    **Troubleshooting scenario.** A pilot app and a production app share the same policy. The pilot requires you to set a password-only fallback. What change avoids applying it to both?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Use a dedicated policy for the eligible pilot app and verify its application association before editing. Record the original association and rule settings for rollback. Verify the actual fallback on the pilot and confirm the production app retains its intended policy.</p>
    </details>

    **Interview question.** A log shows Catch-All on a familiar browser, but the user still completes MFA. How do you explain the evidence to a teammate?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Identify the app rule and the global session rule in the relevant evaluations. The app rule can require password while the session layer or enrollment asks for an additional step. Check the recorded verification method for that sign-in.</p>
    </details>
