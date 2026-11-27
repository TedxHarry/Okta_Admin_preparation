# Lesson 8 · Push groups and link an existing target group

=== "Theory"

    A user can appear in an app’s account list and still be missing from the group that grants a role there. Troubleshoot the account and group membership as separate operations.

    ### Follow the change from Okta to the target

    | Operation | What it does | Where to verify |
    | --- | --- | --- |
    | App assignment | Associates an Okta user with the app, directly or through an assignment group. | App **Assignments → People** |
    | User provisioning | Creates, updates, or deactivates the downstream account according to the enabled connector settings. | Provisioning result and the target app’s user list |
    | Group Push | Sends an Okta group and its eligible memberships to a supported downstream app. | **Push Groups** and the target group’s member list |
    | Group Linking | Connects an Okta group to an existing downstream group and makes Okta the source for that linked group. | The push mapping, existing target group ID, and target member list |

    Use separate Okta groups for app assignment and Group Push. A user who needs the downstream group first needs to be assigned and provisioned to the app. During offboarding, remove the person from the push group first, verify downstream membership removal, and then remove their app assignment if no other access is required. This gives the connector a chance to remove the membership while the account relationship still exists.

    [Group Push prerequisites](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-push-prerequisites.htm) · [App assignments and Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/app-assignments-group-push.htm)

    ### Choose how to push the group

    Check the provisioning capabilities for the exact integration in the **Okta Integration Network (OIN)** catalog. Provisioning must be enabled, the connector must support Group Push, and its credential needs the appropriate group write permissions in the target. To create groups in AD, the service account needs permission to create groups in the destination. Group Linking requires separate connector support.

    In **Applications and Resources → Applications → app → Push Groups → Push Groups**, choose **Find groups by name** to select a specific Okta group. Where offered, **Find groups by rule** uses a search rule to select which groups to push. That search rule selects groups, while an Okta group rule selects users for group membership. Keep the search narrow and inspect the matching groups. If the downstream group already exists, the rule-based push fails on the name collision. On a supported connector, use the by-name linking workflow for that existing group.

    Check **Push group memberships immediately** when you are ready to synchronize the member list. If you leave it cleared, check the saved status and start the push from the row when ready. **Push Now** synchronizes from Okta and can overwrite downstream memberships. Okta documents an AD exception where it pushes only the newest members and does not overwrite existing memberships. Compare both member lists before using it.

    [Enable Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enable-group-push.htm) · [Manage Group Linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enhanced-group-push-main.htm)

    ### Link an existing group and plan the unlink

    Record the target group’s ID and current members. In **Push Groups**, select **Refresh App Groups**, then use **Find groups by name** to select your source Okta group. Under **Match results and push action**, choose **Link Group**, select the existing target group, and save. Check the target ID afterward to verify that you used the existing group. Review the optional setting that renames target groups to match Okta before saving. An imported target group can disappear from the separate **Directory → Groups** listing while the link is active.

    | Action | What to verify |
    | --- | --- |
    | Deactivate Group Push | The target group remains. Changes from Okta stop syncing while the mapping is inactive. |
    | Unlink and leave the group | The target group remains and future pushes stop. An existing linked group can reappear as an imported group. Review the Okta group’s memberships and references after unlinking. |
    | Unlink and delete the target group | The downstream group and its membership entries are removed. For a group originally created by Group Push, the source Okta group remains. |

    Okta also documents linking a disposable Okta group to an existing application group as a workflow for deleting the app group. It changes ownership before deletion. Check the exact target object and its access dependencies before using that workflow.

    [Configure Group Linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-configure-enhanced-group-push.htm) · [Group Push operations](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-push-operations.htm) · [Delete an application group using linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enhanced-group-push-delete.htm)

    ### Choose the next check from the symptom

    | Symptom | Next check |
    | --- | --- |
    | Target group exists, but a member is missing | Check Okta user status, app assignment, target account, and membership in the push group. Fix the missing prerequisite, then repush and verify the target. |
    | Push reports an error | On **Push Groups → Errors**, open the information icon under **Push Status**. Read the failure time and cause, correct the issue, and retry the affected mapping. **Retry All Groups** acts on all errored groups. |
    | Push by rule reports a duplicate name | Confirm the existing target group and ownership. Use by-name linking on a supported connector or choose a distinct name for a genuinely new group. |
    | Someone removed a managed group directly in the target | Check the stale mapping. Okta documents unlinking it, importing from the target, and retrying the push. Verify the new target record and member list. |

    [Troubleshooting Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-push-troubleshoot.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-8.md"

=== "Revision"

    ### Certification cheat sheet

    | Concept | Recall |
    | --- | --- |
    | Assignment and provisioning | Assignment gives the user the app in Okta. Enabled provisioning handles the downstream account. |
    | Separate groups | Assign and provision through one group. Push downstream group membership through another. |
    | Create or link | Choose **Create Group** for a new target group and **Link Group** for an existing one on a supported connector. |
    | Confirm success | Verify the downstream user, group ID, and member list. |
    | Preserve a target group | Deactivate to pause the mapping or unlink and leave to end management and retain the group. |

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. A downstream user exists, but their intended team membership is missing. Which configuration do you inspect first? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. The SAML NameID alone</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. The user&#x27;s Okta password authenticator</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. The app tile ordering</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. The active Group Push mapping and push-group membership</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> An app user can exist before receiving any target group membership. Verify the separate push path.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Before concluding a Group Push repair worked, which checks establish the result? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. The exact receiving group is linked</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. The push result succeeded for the intended mapping</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. The receiving account appears as a member of that group</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. The user only sees a dashboard tile</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> Use the downstream group as final evidence. A tile establishes a separate access path.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. You need to remove a managed membership and end the corresponding app grant. Which order protects the membership update? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Delete the target group for everyone</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. Remove and verify pushed membership → remove the application grant → verify downstream lifecycle</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="C"> <span>C. Remove the user grant before processing the group membership</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Keep the target account available while removing its membership, then verify the impact of unassignment.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. A target group exists and one push-group member is missing. What do you verify first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Verify the user is active in Okta, assigned to the app, and provisioned in the target. Then confirm their membership in the separate push group and check Push Status before retrying.</p>
    </details>

    **2. A push-by-rule attempt hits an existing target group with the same name. How can you manage that exact group?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Confirm the connector supports Group Linking. Refresh App Groups, select the Okta group by name, choose Link Group, and verify the existing target ID.</p>
    </details>

    **3. Which choice ends the mapping while preserving the target group?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Choose Unlink pushed group and Leave the group in the target app. Confirm the group remains and that later Okta membership changes stop syncing.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A downstream user exists and can sign in. They lack a target team membership. Both the app and the target team are visible in Okta. Which evidence do you need?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Check the separate push group's membership, its active mapping to the exact target group, and the push outcome. Verify that account's target team membership. User provisioning and app assignment establish different results.</p>
    </details>

    **Interview question.** You must end a user's application access and remove their managed target-team membership. In what order would you act?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Remove them from the push group first and verify the receiving membership is gone. Then remove their app assignment if approved and verify the downstream user lifecycle result. The target account should remain available while the membership removal is being processed.</p>
    </details>
