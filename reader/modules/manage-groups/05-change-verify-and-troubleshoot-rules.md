# Lesson 5 · Change, verify, and troubleshoot rules

=== "Theory"

    A user’s Department matches the rule, but the user is missing from the target group. Start by checking the rule state, the user’s profile and status, and the rule’s exclusions. Then use the group member list and System Log to verify the outcome.

    ### Read the rule state and user state separately

    A new rule starts **Inactive**. When you activate it, Okta evaluates users across the org in the background. Changes to a user’s profile, group membership, or lifecycle state can trigger an active rule. For a rule that only checks Department, use an **Active** test user. Okta documents additional behavior when you explicitly test user status in the expression. If Department originates in an external system such as Workday or Active Directory, check the value mapped to the **Okta user profile**.

    [Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Group rules best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm)

    ### Predict what each action will do

    | Action | Effect to verify |
    | --- | --- |
    | Deactivate an active rule | Existing memberships stay in place. The inactive rule stops processing new and updated users. |
    | Edit and save an inactive rule | The new configuration is saved. Activate it to apply the settings. |
    | Reactivate after editing | Okta evaluates users in the background. Check which users entered and which left after processing. |
    | Manually remove a rule-managed user from the target group | Okta adds the user to that rule’s **Except The following users** list. |
    | Delete and choose **Leave users in the group** | Users added by the rule stay in the group. The deleted rule stops managing them. |
    | Delete and choose **Remove users from the group** | Okta removes the memberships assigned by the rule. Deleting the rule is permanent. |

    Go to **Directory → Groups → Rules**. Find the rule by group name, condition, or expression. Record the current condition, target groups, exceptions, and sample members. For an active rule, use **Actions → Deactivate**, then **Actions → Edit**. Preview a matching user and a control user before you save, then use **Actions → Activate**. A control user is a test user you expect to remain outside the group. Check the target group and any apps assigned through it before and after the change. If you need to restore the original rule, use the same edit sequence and verify the resulting memberships.

    [Edit group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-group-rules.htm) · [Effects of deactivation and deletion](https://support.okta.com/help/s/article/what-happens-if-group-rules-are-deactivated-and-deleted?language=en_US)

    ### Trace how the membership was granted

    A single group can contain members added manually and members added by a rule. Open the group’s **People** list and check how each user was added. A manually added user who qualifies for a new rule targeting that group can become managed by the rule. If an admin manually removes a rule-managed member, inspect the rule’s exception list before changing the user profile. A profile change alone will leave that exception in effect.

    A **cascading rule** checks a group populated by another rule. For example, one rule puts Support users in a regional support group and another uses that membership to populate a reporting group. If both groups should always have the same membership, configure one Department rule with both targets. Where the groups serve different audiences, review both conditions before combining them. Okta advises avoiding cascades because they can slow rule evaluation.

    Import safeguards protect against certain mass unassignments during imports. Okta says those safeguards do not trigger when a rule drops app membership, including when an import changes an attribute used by a rule. Review app assignments and expected membership changes before activating an edit.

    [Manual group user management](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-users-manually.htm) · [Clear a rule exception](https://support.okta.com/help/s/article/removing-user-from-exception-list-in-group-rule?language=en_US) · [Group rules best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm)

    ### Diagnose the result

    | What you see | What to check next |
    | --- | --- |
    | **Edit** is missing | Check whether the rule is active and whether you are a Super Admin or Org Admin. Group admins who manage all groups can view and search rules. Admins scoped to individual groups cannot. |
    | A user should qualify but is missing | Check the rule state, user status, exact Okta profile value or source membership, target group, and exceptions. Preview the user and compare with a known match. |
    | A group count looks unchanged | Open the group’s member list. The count on **Groups → All** can be stale, and rule processing may still be in progress. |
    | A user is present unexpectedly | Check the member’s assignment method and look for another rule targeting the same group. If the user still has app access, check direct assignment and other assigned groups. |

    In **Reports → System Log**, use the change time to narrow the search. A rule update or activation event shows a configuration action. A membership event shows that a user was added or removed. Expand an addition event and look for **Debug Data → triggeredByGroupRuleId** to tie that addition to a specific rule. Compare the event’s targets with the user and group you expected, then verify current membership in the group. An empty log search alone does not establish why a user failed to qualify.

    [Group rule restrictions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm) · [Verify group membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm) · [Find rule actions in the System Log](https://support.okta.com/help/s/article/how-to-search-system-log-for-actions-created-by-group-rules)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-5.md"

=== "Revision"

    ### Certification cheat sheet

    | Topic | Recall |
    | --- | --- |
    | Edit an active rule | Deactivate → edit → preview → save → activate → verify. |
    | Deactivate or delete | Deactivation preserves membership. Deletion prompts you to keep or remove rule-assigned memberships. |
    | A user matches and is still missing | Check user status, Okta profile data, target group, and the rule’s exception list. |
    | Rule evidence | The group member list shows current state. The System Log shows when it changed and can identify the rule that added a user. |
    | Limits and scope | 2,000 rules per org, 100 target groups per rule, 100 named exceptions per rule. Rules cannot assign users to groups with admin privileges. |

    [Rule limitations](https://support.okta.com/help/s/article/okta-group-rule-limitations-and-restrictions?language=en_US) · [Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm)

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **Preview is correct, access is still wrong**

    The rule is inactive during a change. A current member is still in its target. A second eligible user had been removed manually. A third receives the same target from another rule.

    1. Predict what an inactive rule does in these cases.
    2. What check explains why the second user might still be absent after activation?
    3. What happens if the owner deletes the rule instead?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Existing membership remains and new changes are not evaluated through the inactive rule. Another active grant path can independently keep the third user in the target.</li>
    <li>Check the user&#x27;s exclusion in the saved rule, actual profile input, eligibility, and processing. Resolve a manual exclusion only when the exception is no longer approved.</li>
    <li>Inspect the keep/remove-memberships choice during deletion. Verify any other membership and app grant paths separately after completing the approved change.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. Which sequence changes an active rule and verifies the new outcome? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Edit active → save → assume membership</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Delete rule → replace all groups</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. Deactivate → edit and preview → save → activate → verify</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Deactivate → test from an existing user only</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> Okta allows edits to inactive rules. After reactivation, verify actual qualification and membership changes.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. A user qualifies in Preview and is absent from the target. Which checks belong before rewriting the expression? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. User exclusions and eligibility</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Selected target and processing status</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C"> <span>C. Receiving app&#x27;s icon</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Rule active state</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and D.</strong> A valid condition can coexist with an inactive rule, exclusion, or a different target.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. Stopping a rule by deactivating it immediately removes the memberships it assigned before the stop. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Deactivation stops future evaluation. Existing rule-assigned memberships remain.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. You deactivate a rule before editing it. What happens to the people it already added?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>They remain in the target group. The inactive rule stops processing new or updated users.</p>
    </details>

    **2. You manually removed a rule-managed member. Their Department still matches. Where do you look first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Look in Except The following users on the rule. Okta adds the user there on manual removal. If the exception is unintended, deactivate the rule, remove the exception, save, reactivate, and verify the member returns.</p>
    </details>

    **3. Which evidence ties a group addition to the rule that caused it?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Find the group.user_membership.add event for the user and group. Inspect triggeredByGroupRuleId in Debug Data.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A rule is deactivated for editing. Existing app users still have access, and a newly qualifying user has no grant. Explain both observations and the next check.

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Deactivation pauses evaluation and preserves memberships already assigned by the rule. Edit, preview, save, and reactivate when authorized. Compare the new user's target membership and the app grant after processing.</p>
    </details>

    **Interview question.** Preview says a user qualifies, but they never join the target. What would you check before editing the condition?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Check active state, correct target, user eligibility, and the exception list. Review membership and rule events. If another operator removed the user and created an exception, resolve the exception deliberately before changing the expression.</p>
    </details>
