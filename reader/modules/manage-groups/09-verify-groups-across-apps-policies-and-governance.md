# Lesson 9 · Verify groups across apps, policies, and governance

=== "Theory"

    “I am in the group, but I cannot open the app” can mean the tile is missing, Okta denied sign-in, or the app opened with the wrong permissions. Ask the user which happened, then record the precise username, app instance, and attempt time. Use those details to tie the current settings to the right event.

    ### Follow the evidence from group to target

    | Check | Evidence to collect |
    | --- | --- |
    | User and group | In **Directory → Groups**, open the exact group and check the user in its member list. Record the source and whether the member was added manually or by rule. |
    | App assignment | In the app’s **Assignments**, check **Groups** for the grant and **People** for the user. Check for an individual assignment or a second group. If assignment exists and the tile is missing, check app visibility. |
    | Provisioning | For a provisioning-enabled app, check the account operation and match the Okta user to the downstream username or ID. Assignment can exist while account creation or an update is still pending or has failed. |
    | App sign-in | Verify which policy is attached to the app, where the matching rule is in the list, and which conditions the attempt met. Check the outcome in **Reports → System Log**. |
    | Access inside the app | Compare the target account state, group memberships, and roles. A successful Okta sign-in can still lead to an authorization error inside the target app. |

    For sign-in evidence, filter on `eventType eq "policy.evaluate_sign_on"` and narrow to the user and attempt time. Read the app or policy context and rule targets when present. **ALLOW** indicates an allowed evaluation, **CHALLENGE** calls for more verification, and **DENY** indicates a denied evaluation. One Identity Engine event may include both global session and app authentication policy results. Check which policy produced the result before deciding what to change.

    [Verify group membership](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm) · [Configure app settings](https://help.okta.com/oie/en-us/content/topics/apps/apps-configure-settings.htm) · [System Log event types](https://developer.okta.com/docs/reference/api/event-types/)

    ### Use groups to scope authentication rules

    A **policy scope** is the set of requests a rule can match. An app sign-in rule can include or exclude groups. Okta evaluates the rules in order. Use a group-specific rule above the catch-all and test a user inside the group and a control user outside it. Both users need the app assignment to make that comparison useful.

    **Behavior Detection** evaluates recent sign-in context such as device, location, or IP history. In an app sign-in rule, you can combine a group condition with a behavior condition expressed in Okta Expression Language for security context. This requires Adaptive MFA. The group defines who the rule can apply to, and the behavior condition tests what happened on the attempt. Establish a baseline before interpreting a new-device or new-location result.

    **Device Assurance** checks device characteristics such as a supported operating-system version. For the documented app-policy workflow, enable Okta FastPass, create the platform-specific Device Assurance policy, and apply it to a rule with device state **Registered**. If a rule accepts several Device Assurance policies, any one of those may satisfy that condition. The other rule conditions, including group scope, still have to match. Inspect fallback rules as well. A device that misses the assurance condition can reach a later rule, so a permissive catch-all can change the outcome.

    [Add an app sign-in policy rule](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm) · [Configure Behavior Detection](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/configure-behavior-detection.htm) · [Add a behavior condition](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm) · [Add Device Assurance to an app policy](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/device-assurance-policy-rule.htm)

    ### Verify what governance and admin roles control

    With Okta Identity Governance, an authorized admin can set **End User Display Name** and **End User Display Description** on an Okta-sourced group. These values explain what users are requesting or reviewers are certifying. For Access Requests, check that an active request condition references the group. This display behavior applies to requests processed by conditions. For Access Certifications, select the display attributes when configuring reviewer context. Trace permissions through the actual group record, membership, and app or role assignments.

    Group administration delegates management tasks within the admin’s assigned scope. Separately, an administrative role can be assigned to an eligible group. Okta group rules cannot assign users to admin groups, and a group already targeted by a rule cannot be granted admin privileges. Check the role and its scope before treating membership as ordinary app access.

    [Update group profile attributes](https://help.okta.com/oie/en-us/content/topics/identity-governance/update-default-group-profile-ar.htm) · [Group administrators](https://help.okta.com/oie/en-us/content/topics/security/administrators-group-admin.htm) · [Group rule restrictions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-9.md"

=== "Revision"

    ### Certification cheat sheet

    | Symptom | First evidence |
    | --- | --- |
    | Tile missing | App assignment and dashboard visibility. |
    | App assigned, sign-in denied | Attached policy, matching rule, and a time-matched System Log event. |
    | Sign-in succeeds, role missing | Downstream account, group membership, and role. |
    | Group-scoped device rule misses | Group membership, device registration, assurance result, and the fallback rule. |
    | Friendly name changed | Governance display configuration and the underlying group ID. |

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **An approval, a device, and an app denial**

    A request is approved for a named access label, a user is assigned to the app, and the user's registered device still fails an earlier policy rule.

    1. What proves the approved entitlement was delivered?
    2. Why can the sign-in fail even after the grant and device registration succeed?
    3. Does a governance approval prove that a role or delegated admin action succeeded?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Trace the approval to its exact access configuration and group ID, then verify the actual membership, assignment, and receiving grant where applicable.</li>
    <li>Application assignment, group-scoped policy selection, device registration, and device assurance are separate. Inspect the matched rule and its decision for the fresh attempt.</li>
    <li>Verify the specific grant, role and scope, plus the audit records for the individual operation. Approval evidence alone does not show enforcement or an executed action.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. Both users are assigned to the app. One matches a different authentication rule. What identifies the applied rule? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Assigned group&#x27;s display label</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. App tile color</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. The relevant policy evaluation event</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. The user&#x27;s profile description</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> Use the event for that attempt to identify the actual rule instead of inferring it from membership.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which checks help when a registered device fails a group-scoped authentication rule? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. The device posture or assurance requirement</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. The order and match results for the app&#x27;s rules</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C"> <span>C. The presence of an app assignment alone</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. The user&#x27;s actual group membership</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and D.</strong> Membership, registration, and device assurance are distinct conditions.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. Governance shows a friendly group label. That label alone proves which concrete group and downstream grant were delivered. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Trace the request or review to the exact group, then verify membership and the target grant.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. Two users are assigned to the same app. Only one is denied. Which evidence shows whether a group-scoped rule caused the difference?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Compare the users’ policy group membership and the attached app policy. Match each attempt to its System Log event and compare the rule targets and outcomes.</p>
    </details>

    **2. A registered device fails the assurance condition in the first rule. Where do you look next?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check which later rule matches, including the catch-all. That fallback can determine whether the attempt is denied or allowed.</p>
    </details>

    **3. An access request shows a friendly group name. What proves the access it represents?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Trace the active request condition to the group’s ID. Inspect that group’s app or role assignments and verify the user’s actual membership.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A group member has app assignment and a registered device, but gets a different authentication rule from a peer. What evidence would resolve the discrepancy?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Compare the actual app policy, rule order, group membership, device assurance result, and each policy-evaluation event. Registration and device posture are different checks. Use the recorded rule to decide which condition needs investigation.</p>
    </details>

    **Interview question.** A reviewer approved a friendly group label. How would you prove the intended entitlement reached the user?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Identify the exact group referenced by the request configuration. Verify the approved user was granted that group and trace the app assignment and relevant downstream evidence. A display label alone does not identify the entitlement.</p>
    </details>
