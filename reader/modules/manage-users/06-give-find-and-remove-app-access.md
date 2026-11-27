# Lesson 6 · Give, find, and remove app access

=== "Theory"

    A user can sign in to Okta, but the app they need is missing. Or they moved teams and can still open an app they no longer need. Start with the exact user and app integration. An **app integration** is Okta's configuration for a particular app. An **app assignment** makes that integration available to a user. To fix either ticket, first find the path that grants the assignment.

    ## Give access at the right scope

    Open **Applications and Resources → Applications**, select the integration, and open **Assignments**. Choose **Assign → Assign to People** to make a **direct assignment** for a specific user. Choose **Assign → Assign to Groups** to make a **group assignment** that applies to the group's members. Complete any app-specific fields Okta prompts for and verify the result in **Assignments**. Group assignment suits access that several people need for the same job. Direct assignment can suit an approved exception for one person. [Okta · Assign app integrations](https://help.okta.com/oie/en-us/Content/Topics/Apps/apps-assign-applications.htm)

    ## Find where the access comes from

    Start with the view that matches the question. Use both sides when you need to explain an unexpected result.

    | Question | Where to look | What to record |
    | --- | --- | --- |
    | What apps does this person receive? | **Directory → People → user → Applications** | Find the exact app and check whether the assignment shows **Individual** or a group name. |
    | Who receives this app? | **Applications → app → Assignments** | Use the **People/Users** filter to find the user and **Groups** to see which groups are assigned. |
    | Which assigned groups does the user belong to? | Compare the app's assigned groups with the user's **Groups** tab or the **People** tab on the group. | Record each matching group. One displayed group can be the group that supplies the app settings even when more than one assigned group applies. |

    Suppose Maya belongs to Finance and Approvers, and both groups are assigned to the expense app. Removing Maya from Finance removes one path. Approvers still grants the app. If the groups supply different app profile or role values, their priority can also affect which values Maya receives. [Okta · Identify the assignment owner](https://help.okta.com/oie/en-us/content/topics/apps/apps-convert-to-group-managed.htm) · [Okta · Manage app integration assignments](https://help.okta.com/oie/en-us/Content/Topics/apps/apps-manage-assignments.htm) · [Okta · Prioritize application groups](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-prioritize-app-group.htm)

    ## Remove the assignment that matches the request

    | Intended change | Action | What to verify |
    | --- | --- | --- |
    | Remove one person's direct assignment | In the app's **Assignments** view, find the individual assignment and select **X** to remove it. | Check the user again and inspect any assigned groups that still cover them. |
    | Remove one person's group-derived access | Identify the group that grants access and who controls its membership. For a manually managed Okta group, change the user's membership if that is the intended scope. For directory- or rule-managed membership, review the controlling source or rule. | Check other grant paths. Before changing a shared group membership, check which other apps or policies depend on it. |
    | Stop an entire group from receiving the app | In the app's **Assignments → Groups** view, remove that group's app assignment. | Check a member who had only that path and a member who still qualifies through another path. |

    If the group must keep its other uses and one person needs to lose just this app, review how access is grouped before removing membership. Removing a group's app assignment affects the group as a whole. [Okta · Manage app integration assignments](https://help.okta.com/oie/en-us/Content/Topics/apps/apps-manage-assignments.htm) · [Okta · Trace app access through multiple groups](https://help.okta.com/en-us/content/topics/identity-governance/access-certification/remediation.htm)

    ## Verify the assignment, the tile, and the receiving app

    Check the current assignment in the Admin Console. Then use a fresh session as the test user to check their **End-User Dashboard**, the page that shows their app tiles. An assigned app can have its icon hidden from users. If a visible tile is expected but missing, check the exact integration, the user's assignment, and the app's visibility settings.

    For a connected app, check sign-in and the receiving account separately. The app's sign-in policy controls what users must prove before Okta allows sign-in. **Provisioning** creates or updates the receiving account when the integration supports it and the relevant features are enabled. With **Deactivate Users** configured, unassignment can send a deactivation to the receiving app. Verify the actual target account and follow the app's session handling if the request concerns an existing session. [Okta · App visibility and assignments](https://help.okta.com/en-us/Content/Topics/apps/apps-configure-settings.htm) · [Okta · Configure provisioning for an app integration](https://help.okta.com/en-us/Content/Topics/provisioning/lcm/lcm-provision-application.htm)

=== "Hands-on Lab"

    --8<-- "lab-6.md"


=== "Revision"

    ## Trace every app assignment

    | Task | Where to go |
    | --- | --- |
    | Give access to one person | **Applications and Resources → Applications → app → Assignments → Assign to People**. |
    | Give access through a group | Use **Assign to Groups** in the same app. Verify the group assignment and the person's membership. |
    | Find what the person receives | **Directory → People → user → Applications**. Compare that view with the app's **Assignments → People/Users** and **Groups** views. |
    | Remove access | Remove the applicable direct assignment or group grant at the right scope. Check every other grant. A group membership change can also affect unrelated apps or policies. |
    | Find why a tile is missing | Verify the assignment, dashboard icon visibility, and which user is signed in. If the tile is present and launch fails, check the app policy and the target account. |

    **Worked example.** B receives the bookmark from Readers and Reviewers. Removing B from Readers leaves the Reviewers path. Removing that last path removes the grant if there is no direct assignment. An assigned group can remain on the app even when B is no longer a member.

    **Exam focus.** Practice assigning a group and verifying the result. The bookmark proves assignment and tile launch. The [custom SAML lab](../../week-03-saml-and-mappings/lessons/02-custom-saml-attributes-and-group-assignment.md) verifies mapped data at the receiving application.

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. User membership in Team A is removed. Team B still assigns the same app. What should you expect from the Okta assignment? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. It becomes a Group Push mapping</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. It turns into a disabled user</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Always removed</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. It can remain through Team B</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> The remaining group continues to provide an assignment.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which observations answer different access questions when the app tile is missing? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A"> <span>A. Whether the push group exists, by itself</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Whether the user is assigned to the app</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Whether dashboard visibility is enabled for that integration</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Whether a fresh direct launch succeeds</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B and C and D.</strong> Assignment, presentation, and successful launch are separate observations.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. The app shows an assigned group with no current members. Does this establish that a specific user still has that app? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Yes</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. No</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> A group-to-app configuration can remain without current members. Inspect the actual user assignment and other grant paths.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. A group still appears on the app after its last test user leaves. Is that expected?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Yes. The group assignment and its user memberships are separate relationships.</p>
    </details>

    **2. The user is assigned and the app tile is missing. What do you check next?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check dashboard visibility, the exact integration, and the user session. Check the sign-in policy and target account separately if launch fails.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A user was removed from the Finance group. The app is still in their Assignments tab and another group also grants it. Which change actually removes the assignment?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Trace every group and direct grant on the user and the app. Remove the additional path only if the user is no longer entitled to it. Verify the final Okta assignment and, where provisioning applies, the downstream account result.</p>
    </details>

    **Interview question.** The dashboard tile is missing, but a direct app URL works. What does that tell you and what evidence would you collect?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Check assignment and the integration's dashboard visibility or supported launch mode. The direct launch proves that path works for the tested user. Compare it with the expected tile configuration before changing access grants.</p>
    </details>
