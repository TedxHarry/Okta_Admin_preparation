# Lesson 7 · Pause access, end sessions, and offboard a user

=== "Theory"

    A user leaves a browser signed in on a shared computer. Another starts a leave of absence. A third has left the company. All three cases can start in **Directory → People**, but each calls for a different result. Decide whether to end a session, block the next sign-in temporarily, or remove the assignments that give the user access.

    ## Choose the action by what must change

    An **Okta session** lets a browser continue as a user after Okta accepts their sign-in. An app can establish a separate session of its own. An **app assignment** is the relationship that makes the integration available to the user, as you saw in [Lesson 6](06-give-find-and-remove-app-access.md).

    | Action | What happens in Okta | What to check next |
    | --- | --- | --- |
    | **Clear User Sessions** | Ends the user's existing Okta sessions. The account can still start a fresh sign-in if policy allows, and its app assignments remain. | Revisit a protected Okta page from the old session, then try a fresh sign-in. |
    | **Suspend** | Ends active Okta sessions and blocks new ones. Okta keeps the user record, group memberships, and app assignments. | Check **Suspended**, confirm a fresh sign-in is blocked, and find the assignments still in place. |
    | **Deactivate** | Ends Okta sessions, blocks sign-in, and removes app assignments. The user record and group memberships remain. | Wait for background processing, confirm **Deactivated**, and check connected apps separately. |
    | **Delete** | Permanently removes the deactivated Okta user record. | Check the intended record and your retention requirements before confirming. |

    [Okta · Clear a user session](https://support.okta.com/help/s/article/how-to-clear-user-session) · [Okta · Suspend and unsuspend users](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    ## Sign out the user and check the scope

    Open **Directory → People → user → More Actions → Clear User Sessions**. Okta documents this option for active users and notes that it can be absent during a password reset or just after reactivation. Read the confirmation dialog for the scope your org offers. **OAuth and OpenID Connect tokens** are credentials that connected apps can use to access resources or renew access. Token revocation, ending an Okta browser session, and ending a session maintained by a connected app each have their own evidence.

    Where **Universal Logout** is available, the dialog offers an option to include logout-enabled apps and Okta API tokens. Universal Logout is Okta's mechanism for requesting sign-out from supported, configured apps. If you need an existing session at a particular app to end, verify at that app. A fresh Okta sign-in prompt proves the old Okta session ended. [Okta · Clear a user session](https://support.okta.com/help/s/article/how-to-clear-user-session) · [Okta · Configure Universal Logout](https://help.okta.com/en-us/content/topics/apps/universal-logout-amfa.htm)

    ## Bring someone back after a pause or deactivation

    For a planned leave, open the person and choose **More Actions → Suspend**. When they return, filter **Directory → People** to **Suspended**, open their record, and choose **Activate**. In that state, **Activate** lifts the suspension. The existing assignments are already in place. Verify with a fresh sign-in before handing the account back. [Okta · Suspend and unsuspend users](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-suspend.htm)

    From a **Deactivated** record, **Activate** starts reactivation. Follow the activation or credential setup that the org presents. Then look up the app assignments individually. A retained group membership or a group rule can make an app available again. An app previously granted directly may need to be reassigned. A status of **Active** confirms the state of the Okta account. The app's **Assignments** tab tells you whether the user receives that app. [Okta · Reactivate a user profile](https://help.okta.com/oie/en-us/content/Topics/provisioning/lcm/lcm-reactivate-user.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    ## Verify offboarding in each system that held access

    For an Okta-managed user, deactivation also removes the Okta password. Okta documents that it revokes admin roles and unassigns the Okta Admin app. If the user held admin access, verify that separately during offboarding. Use disposable non-admin users for this module's exercises. [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm) · [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

    The documented bulk path is **Directory → People → More Actions → Deactivate**. Select the intended users, choose **Deactivate Selected**, and confirm. Wait for the background operation to finish. Check the user's **Deactivated** status, the app's assignments, and the relevant events in **Reports → System Log**. If the account is managed through Okta Privileged Access, Okta requires ending Privileged Access for that user first.

    **Downstream deprovisioning** means removing access at the receiving application, such as disabling its separate account. Check whether the integration supports and has enabled deactivation. Okta also documents exceptions for inactive, private, system, and deprecated apps. For a connected app, verify the account and any existing session at the target. [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Okta · Configure app provisioning](https://help.okta.com/en-us/Content/topics/provisioning/lcm/lcm-provision-application.htm)

    Use **Delete** after deactivation when you need to remove the Okta record permanently. From **Directory → People**, open the deactivated user, select **Delete**, and confirm. Okta prevents deletion of a technical or billing contact. Account references can remain for the applicable retention period. If your workflow needs a reversible stop, keep the user deactivated and retain the evidence required for the offboarding record. [Okta · Deactivate and delete user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)

=== "Hands-on Lab"

    --8<-- "lab-7.md"


=== "Revision"

    ## End access at the right level

    | Action | Okta sign-in | What remains or changes |
    | --- | --- | --- |
    | **Clear User Sessions** | The old Okta session ends. A fresh sign-in is possible if policy allows it. | The account and app assignments remain. Check the dialog for token or Universal Logout scope. |
    | **Suspend** | Existing Okta sessions end and new ones are blocked. | The user record, groups, and app assignments remain. Use **Activate** on the suspended record to lift the hold. |
    | **Deactivate** | Existing Okta sessions end and new ones are blocked. | App assignments and the Okta-managed password are removed. The user record and group memberships remain. Verify admin access removal if relevant. |
    | **Reactivate after deactivation** | The user can sign in after any required setup and policy checks. | Check which apps return through group membership or rules. Verify or restore individual grants as needed. |
    | **Delete** | The deactivated user can no longer sign in. | The Okta user record is permanently removed. Follow retention requirements before deleting. |

    **Console paths.** Open **Directory → People → user → More Actions** to clear sessions or suspend. For the documented deactivation flow, use **People → More Actions → Deactivate**, select the intended account, and wait for processing.

    **Exam focus.** Prove the result in four places when relevant: account status, a fresh sign-in, app assignments, and the System Log. For a connected app, also verify its account and session there. Downstream deprovisioning and Universal Logout depend on integration support and configuration.

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. The request is to block sign-in during a leave while retaining assignments. Which action fits? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Deactivate</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Delete</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Clear sessions only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. Suspend</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> Suspension blocks sign-in and keeps assignments. Clearing sessions alone still permits a fresh sign-in.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. A user has left the company. Which checks belong after Okta deactivation? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Okta state and assignment removal</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Supported connector deprovisioning outcome</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Receiving account and existing app-side session state</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Only the last Okta password change</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> Deactivation proves the Okta lifecycle step. Target account and session controls need their own evidence.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. Reactivating a deactivated user proves that every former direct app assignment was restored. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Check current group-derived and direct grants individually. Restore only the access that is still approved.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. Someone goes on leave and should keep their assignments. Which action fits?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Suspend. Verify that fresh sign-in is blocked and the assignments remain, then verify restoration when the hold is lifted.</p>
    </details>

    **2. The user is Deactivated in Okta. Does this prove the target application account and session ended?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Verify the connector’s deprovisioning support and settings, then check the target account and session separately.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A former employee is Deactivated in Okta but a SaaS browser tab still works. What would you verify to establish containment?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Check whether the app assignment was removed and whether the connector completed deprovisioning. Verify the target account status and revoke app-side sessions using the app's supported controls if needed. An Okta status alone covers the Okta identity.</p>
    </details>

    **Interview question.** A returning employee was deactivated and reactivated. Some apps returned and one did not. How would you restore only approved access?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Compare retained group memberships and current rules with the old direct grants. Confirm the approved entitlement before restoring a direct grant. Verify the target account and a fresh sign-in to each authorized app.</p>
    </details>
