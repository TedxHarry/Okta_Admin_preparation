# Lesson 2 · Configure a group-scoped behavior rule

=== "Theory"

    ## What makes a sign-in new?

    Okta evaluates familiar context over a recent history, with the window depending on the behavior type. A context can become unfamiliar again when it falls outside that window. Okta tracks sign-in events with distinct session context, so repeatedly opening an app in the same session is a poor way to build history or test a context change.

    | Behavior type | What Okta evaluates | Documented default |
    | --- | --- | --- |
    | New City | Whether the inferred city appears in the user's recent successful sign-ins. | 20 successful sign-ins |
    | New State | Whether the inferred state or region appears in that history. | 15 successful sign-ins |
    | New Country | Whether the inferred country appears in that history. | 10 successful sign-ins |
    | New Geo-Location | Whether the estimated location is outside the configured radius of the locations in that history. | 20 successful sign-ins, 20 km radius |
    | New Device | Whether the browser or other sign-in client is familiar. A browser the user has never used for Okta sign-in can register as new on the same physical computer. | 20 successful sign-ins |
    | New IP | Whether the public IP address Okta sees appears in the user's history. | 50 successful sign-ins |
    | Velocity | The apparent travel speed inferred from distance and elapsed time between two successive sign-in attempts. | 805 km/h (500 mph) |
    | New ASN | Whether the autonomous system number appears in the user's history. An **ASN** identifies a network that advertises routes on the internet. | 50 successful sign-ins |

    Administrators can tune a behavior's history window or threshold where the type supports it. You can create more than one named behavior of the same type. Look in **Security → Behavior Detection** to see the active definition and its exact name. The type describes what is measured. The name identifies the definition the rule references. Okta lists `New IP`, `New Device`, `New Location`, `New Velocity`, and `New ASN` as default names available to security expressions.

    Location comes from IP geolocation, so a VPN exit, mobile network, or a change in routing can affect the location Okta observes. A changed browser and a changed network are separate inputs. **Risk scoring** evaluates several signals together and returns a risk level. A particular behavior result alone does not tell you the overall risk level. **Device Assurance** checks a device against stated requirements such as an operating system version. A browser recognized by Behavior Detection can still fail a Device Assurance requirement. See [behavior types](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/type-behavior-detection.htm), [behavior names and expressions](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/about-behavior-policy-rule.htm), and [risk and behavior evaluation](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-risk-behavior-eval.htm).

    ## How does the rule select an authentication requirement?

    In an **app sign-in policy**, the app determines which policy applies. Within that policy, rule priority determines the order Okta checks the rules. The first matching rule supplies the authentication requirement. Put the behavior rule above the **Catch-All Rule**, the final fallback for requests that match none of the earlier rules. Read the existing fallback before changing it. Its requirements apply to every request that reaches it for any app sharing that policy.

    A group-scoped app rule has two independent requirements. **User's group membership includes** selects the group. **The following custom expression is true** tests the sign-in behavior. Okta requires Adaptive MFA for app sign-in behavior conditions. Enter the exact name of an active behavior in the security expression. Keep the action focused on additional authentication. Okta documents Behavior Detection as a way to require MFA and does not support denying access solely because a behavior changed.

    ```text
    security.behaviors.contains('New Device')
    ```

    The expression checks whether `New Device` appears in `security.behaviors`, the list of matching behavior names for the app sign-in request. The System Log can separately record a behavior evaluation status such as `UNKNOWN` or `BAD_REQUEST`. Use the recorded policy evaluation to identify the rule that applied. [Okta Expression Language in Identity Engine](https://developer.okta.com/docs/reference/okta-expression-language-in-identity-engine/#security-context) In the same expression, `||` means either condition may satisfy the expression and `&&` means both must satisfy it. Group membership is still required if the rule specifies a group. The expression and the group condition each have to match.

    | Group membership | Behavior expression | Rule selection if no earlier rule matched |
    | --- | --- | --- |
    | In the target group | True | The group-scoped behavior rule supplies the authentication requirement. |
    | In the target group | False | Okta continues to the next rule, eventually reaching the Catch-All Rule if nothing else matches. |
    | Outside the target group | True or false | This group-scoped rule is skipped. Okta continues through the remaining rules. |

    The **Global Session Policy** has its own behavior condition, **And Behavior is**, for the Okta session rule. Use the app sign-in rule to control proof for access to a particular app. Use the session rule to control proof when establishing the Okta session. Okta's global session guidance says to use **At every sign in** for a behavior-based MFA rule and to avoid combining a behavior condition with per-device or per-session MFA. Check both policy layers when a prompt appears regardless of the app rule.

    See [add a behavior condition to an app sign-in rule](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm), [app sign-in rule priority and conditions](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm), [global session rule settings](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/add-okta-sign-on-policy-rule.htm), and [Behavior Detection and evaluation](https://help.okta.com/oie/en-us/Content/Topics/Security/proc-security-behavior-detection.htm).

    ## Configuration fields by behavior type

    Open **Security → Behavior Detection → Add Behavior** and select the type. Give each definition a name you can recognize in the rule and log.

    | Type | Fields that control evaluation |
    | --- | --- |
    | [Location](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/location-behavior-detection.htm) | Set **Location granularity** to City, State or Region, Country, or Latitude - Longitude. The last option exposes **Radius from location**, with a minimum of 5 km. Set **Evaluate against past** to at least one. |
    | [IP](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/ip-behavior-detection.htm) | Set **Evaluate against past** to the history window for public IP addresses. |
    | [Device](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/device-behavior-detection.htm) | Set **Evaluate against past** to the history window for sign-in clients. |
    | [Velocity](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/velocity-behavior-detection.htm) | Set **Velocity** in km/h to the apparent travel-speed threshold used between sign-ins. |
    | [ASN](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/asn-behavior-detection.htm) | Set **Evaluate against past** to the history window for the network identifier. |

    ## Manage the named definition

    A policy uses the behavior by name. If you rename, deactivate, or remove a custom behavior, review the policies that reference it and retest the affected rules. Multiple conditions can be composed with supported operators, and Okta limits a behavior heuristic to ten conditions. A **heuristic** here means an expression combining behavior conditions. When testing AND and OR, check the result of each named signal. For OR, either true input satisfies the expression. For AND, both must be true. Treat unknown or missing log data as an observation to investigate before drawing conclusions about the expression.

    [Manage behavior settings](https://help.okta.com/oie/en-us/Content/topics/security/behavior-detection/manage-behavior-detection.htm) · [Behavior conditions in an app sign-in rule](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm)

=== "Hands-on Lab"

    --8<-- "configure-group-rule.md"

    After Lab 4, use the [extended signals and history lab](../../modules/behavior-detection/hands-on-labs.md#lab-5) to compare New IP and New Device conditions.

=== "Revision"

    | Setting | What it changes |
    | --- | --- |
    | Behavior definition | What signal Okta measures and the history window or threshold |
    | Rule group | Which users the rule can match |
    | Custom expression | Which behavior results satisfy the expression |
    | Rule action | The proof Okta requires for a matching request |

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **A rule that uses two signals and a control**

    A dedicated app rule requires membership in Pilot and an expression that matches New Device OR New IP. User A is a pilot with New Device only. User B is a pilot with both. User C is a control with both.

    1. What changes when OR becomes AND?
    2. A member's behavior is positive but Catch-All applies. What do you check?
    3. The expression field is missing on one test org. What do you check before configuring another policy?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Under OR, A and B can match. Under AND, only B can match. C fails the separate group condition in both tests. These predictions assume the correct app policy and no earlier matching rule.</li>
    <li>Check the actual app policy and rule order, the group membership, the exact active behavior name in the expression, and the other saved conditions. Compare the named behavior and selected rule in the same attempt.</li>
    <li>Verify Adaptive MFA and the App sign-in policy editor in that org, then confirm required permissions and controls. Global session behavior configuration answers a different policy question.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. The app rule requires pilot membership and either New Device or New IP. Which attempt can match it? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Pilot with neither</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B" data-correct> <span>B. Pilot with New IP only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Control with New Device only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Control with both behaviors</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> OR applies inside the expression. The separate group condition still must match.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which inputs test the group and expression conditions independently? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Control with a matching behavior and the same app assignment</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B"> <span>B. Only a pilot with both behaviors</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Pilot with exactly one matching behavior</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Pilot with neither behavior</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and C and D.</strong> Use cases where one condition can change while the other stays comparable.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A positive behavior result proves the group-scoped step-up rule was selected. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Check the app&#x27;s actual policy evaluation. The group or an earlier rule can change the selected branch.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    ??? question "1. Does a New Device result imply a new physical computer?"

        Okta measures the sign-in client. A different browser on the same computer can be seen as new.

    ??? question "2. Can a user outside the group match the group-scoped rule by using a new browser?"

        The membership condition still has to match. Okta moves to the next app rule when that condition fails.

    ??? question "3. What changes if you replace OR with AND in the behavior expression?"

        Both named conditions have to satisfy the expression for AND. Either condition can satisfy OR.

    ### Scenario and interview practice

    **Troubleshooting scenario.** Your rule combines New Device OR New IP and scopes it to the pilot group. One pilot has only New IP true. A control has both true. What happens, assuming no earlier match?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>The pilot satisfies the expression and membership condition. The control satisfies the expression but fails the group condition. Confirm the selected rule for each in System Log and keep both users assigned to the target.</p>
    </details>

    **Interview question.** An interviewer asks how you would test AND versus OR without relying on prompts. What would you use?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Hold the group and app constant, run a case where one named behavior matches and the other does not, and compare the actual behavior statuses and selected rules. Include a both-match case and account for the separate session policy.</p>
    </details>
