# Lesson 3 · Build and test a basic group rule

=== "Theory"

    A Finance analyst joins the company. Today someone adds them to the right group by hand. Next month the analyst moves to Operations. Who remembers to remove that membership? A **group rule** makes the membership follow a condition you can test. In this lesson, the rule reads **Department** from the Okta user profile and adds qualifying users to a test group.

    ## Read the rule from left to right

    Open **Directory → Groups → Rules → Add Rule**. Choose **Use basic condition** under **IF**. The condition checks profile text, source group membership, or a supported combination. The configured action names the target groups.

    | Rule setting | What it means | Example |
    | --- | --- | --- |
    | **IF → profile attribute** | Okta reads a string attribute on the user profile and compares it with the configured value. | Department equals `Lab-M2-Finance`. |
    | **IF → Group membership** | Okta checks a group the person already belongs to. This is a **source group** for this condition. | User belongs to `LAB-M2-Rule-Source`. |
    | **Then Assign to** | Okta adds a qualifying person to the selected **target groups** when the rule runs. | Add the person to both test targets. |
    | **Except The following users** | An exception excludes a named user from this rule even if the condition would otherwise match. | Keep one disposable user outside this rule while testing a special case. |

    If an HR system or directory provides Department, first map that value to the Okta user profile. Check the value that Okta currently has before predicting the rule's result. Using an attribute to decide who receives access through a group is an example of **attribute-based access control (ABAC)**.

    [Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm)

    ## Compare a source selection with a target selection

    Suppose **IF** checks membership in `Source A`. **Then Assign to** lists `Target One` and `Target Two`. A user who qualifies receives both target memberships when the rule runs. Adding another target expands what a qualifying user receives. Adding another source changes who qualifies.

    For multiple source groups, read the wording beside the Basic membership picker and verify it in **Preview**. The existing course example shows **includes any of the following**, where membership in either listed source is enough. If the requirement is membership in both source groups, use an explicit advanced condition and test the expected cases. The next lesson covers that expression.

    Use independent source groups for this exercise. A **cascading rule** reads a group maintained by another rule. When two rules depend on each other, changes are harder to trace and can slow evaluation. If one condition should populate multiple targets, keep the targets together on that rule.

    [Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · Group rules best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm)

    ## Preview, save, activate, then verify

    1. **Preview.** Use a user who should qualify and a user who should miss. A Preview result evaluates the condition for that user.
    2. **Save.** A new saved rule starts **Inactive**. Verify the target group has not changed due to the rule.
    3. **Activate.** From the rule's **Actions**, choose **Activate**. The rule applies across the org. Use uniquely named disposable targets and review the condition before you activate it.
    4. **Verify.** Open the target group's **People** list. Confirm the expected username and how it was added. Check the current profile or source group again if the membership is unexpected.
    5. **Move the test user.** Change the source value or source membership and verify the result after processing. When this rule was the only path into the target, the membership should leave when the user no longer qualifies.

    An app assigned to a target group can make this configuration an access change. Keep the lab targets disconnected from apps, policies, and admin roles. Okta prohibits using group rules to assign users to admin groups. Okta also documents that import safeguards do not trigger when a group rule lowers an app's membership. Use Preview and make the target and scope part of your review.

    [Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · Verify group membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm) · [Okta · Group rules best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm)

    ## Check the input before changing the rule

    | What you see | First place to look |
    | --- | --- |
    | Expected match shows as a miss | Compare the string in the user's Okta profile with the rule value, or check the user in the exact source group's **People** list. |
    | Preview matches but the user is outside the target | Check that the rule is active, the intended target is selected, the user is eligible, and processing has completed. Review exceptions. |
    | User still appears after the condition stops matching | Inspect how the membership was granted and whether another path still applies. Check the exact user in the membership list, since counts can lag. |
    | User was manually removed from a rule-managed target | Look for the user in **Except The following users**. A direct removal can add the user to the exception list. |

    [Okta · Manual group user management](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-users-manually.htm) · [Okta · Verify membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-3.md"

=== "Revision"

    ## Basic rule cheat sheet

    | Cue | Remember |
    | --- | --- |
    | **IF** | Checks a string on the Okta user profile, a source group membership, or a supported combination. |
    | **Then Assign to** | Lists the groups every qualifying user receives when the rule runs. |
    | **Except** | Excludes named users from the rule. Check it after a manual removal from a rule-managed target. |
    | **Preview** | Compare a match and a miss without applying new target memberships. |
    | **Save → Activate** | A saved rule starts inactive. Activation applies the rule across the org. |
    | **Verification** | Inspect the exact target, member, and membership origin. Retest a user who stops qualifying. |

    **Exam focus.** Create a basic group rule, use test users to prove its condition, and verify target membership. The custom app integration use case builds on this skill by asking you to use Okta Expression Language and assign a group to an app. [Okta Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide)

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. A Basic rule requires any of groups A or B and Department Finance. Which user qualifies? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A" data-correct> <span>A. Finance in group B only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Operations in group A only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Operations in both groups</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Finance in neither group</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A.</strong> The user must satisfy one listed group and the separate Department condition.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Before activating a rule that targets two groups, which previews detect common scope mistakes? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A"> <span>A. Only a member of both source groups</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. One qualifying user in only the second source group</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. A user in a source group with the wrong Department</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. A Finance user in neither source group</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B and C and D.</strong> These cases test the OR inside the membership condition and the AND across conditions.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A matching Preview from an inactive rule proves the user now belongs to its targets. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Preview evaluates the condition. Verify processing and stored memberships after activation.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. A Preview matches, but the saved rule is inactive. Should the user already appear in the target because of this rule?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>No. Preview checks qualification. Verify no rule-driven membership after saving, then activate and inspect the target.</p>
    </details>

    **2. The rule checks one source group and lists two targets. What should a matching user receive?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Both target memberships. The source group is the input to the test.</p>
    </details>

    **3. The user moved departments and should lose a rule-managed membership. Which value do you confirm first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Confirm Department on the user's Okta profile. If it is sourced upstream, verify that the source change and mapping have reached Okta before diagnosing the rule.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A Basic rule says the user must be in any of East or West and have Department Finance. It targets Reports and Expenses. Predict the outcome for East-only Finance, West-only Operations, and Finance users in neither group.

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>The East-only Finance user meets the group test and the department test, so the rule targets both groups. The other two each fail one required condition. Preview one case for each condition before activating.</p>
    </details>

    **Interview question.** You inherit a Basic group rule tied to an app. What test proves its scope before a change goes live?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Read the actual condition and target groups. Preview qualifying and nonqualifying users, including single-source-group cases, and inspect exceptions. After an approved activation, verify the saved memberships and app assignment on the test cohort.</p>
    </details>
