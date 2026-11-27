# Lesson 2 · Create a group and manage membership

=== "Theory"

    A new Finance analyst needs access for a project. Before anyone assigns an app, you need a group with a clear purpose and an accurate member list. In [Lesson 1](01-identify-the-group-and-its-owner.md), you learned to identify the group and its source. Now you will create two Okta groups and show exactly what changes when you remove one membership.

    ## Create a group with a purpose you can explain

    A **native Okta group** is created in Okta. Its **group profile** holds the group's name and description. Under **Directory → Groups → Add Group**, choose a name that identifies the population or the resource. Use the description to say what the group is for and who should belong. Save, reopen the group, and confirm its source and profile.

    A population group such as `Finance Analysts` describes who people are in the organization. An access group such as `Finance Reports Readers` describes what its members should receive. A group can serve both purposes in a small lab. In an environment where the same population needs several different levels of access, naming them by purpose makes later assignments and reviews easier to explain.

    | Change | What it changes | What to verify |
    | --- | --- | --- |
    | Create a group | Adds a group record in Okta. | Find the new group and confirm its name, source, and description. |
    | Edit the description | Updates metadata on the existing group. | Reload **Profile** and check the saved description. |
    | Add or remove a person | Changes a membership for that user and group. | Check the group's **People** list and the user's **Groups** tab. |
    | Assign the group to an app | Makes the app available through the group. | Check the app's **Assignments** and test the user's access when relevant. |

    [Okta · Create a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm) · [Okta · View and edit group attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-edit-group-attributes.htm)

    ## Change only the membership you intend

    Open the exact group under **Directory → Groups**. Choose **Assign people** and search using the account's username. To remove one member, use **Remove** beside that person's entry. Okta also offers **Remove all people in group** under **More Options**. That action has a different scope. First determine who could lose app access or move into a different sign-in policy if the group were emptied.

    Additions and removals can run in the background. Check the specific user's result after the operation completes. The member count on the Groups list can lag, so verify **People** inside the group and **Groups** on the user profile. If you are investigating an app after removal, check whether another group or an individual assignment still grants it.

    [Okta · Manually assign people](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm) · [Okta · Remove people](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-group-people.htm) · [Okta · Verify membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm)

    ## Check who manages the member and what you can change

    In a native group, some members can be managed **Manually** and others **By rule**. A matching rule can take over management of a user who was added manually. Manually removing a rule-managed user can add that account to the rule's exception list. If the person was removed by mistake, inspect that exception before expecting the rule to add them back. The rule-editing lesson covers that process in depth.

    A **Group Membership Admin** can add or remove members within their assigned scope. That role alone does not let the admin create or delete groups or manage groups that carry administrative privileges. Check your scope and use a suitable lab administrator if **Add Group**, **Edit**, or a membership action is unavailable. For imported groups, verify which source controls the membership before changing anything in Okta.

    If your org uses **Govern Okta admin roles**, a group assignment that grants an admin role the user already holds through an admin role bundle can cause Okta to revoke that bundle. Use regular non-admin test users and groups for the lab.

    [Okta · Manual group user management](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-users-manually.htm) · [Okta · Group Membership Admin](https://help.okta.com/oie/en-us/content/Topics/security/administrators-group-membership-admin.htm) · [Okta · Admin-role bundle caveat](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm)

    ## Verify the action in the System Log

    In **Reports → System Log**, narrow the date range to your test. Use `eventType eq "group.user_membership.add"` or `eventType eq "group.user_membership.remove"`. Find the event for the user and group you changed. Expand it and inspect **Actor**, **Target**, and **Outcome**. The log explains what was recorded at the time of the operation. The group’s **People** list and the user’s **Groups** tab show the membership you can observe now.

    [Okta · System Log filters and search](https://help.okta.com/oie/en-us/Content/Topics/reports/syslog-filters.htm) · [Okta · Event Types](https://developer.okta.com/docs/reference/api/event-types/)

    ## Optional: group labels for governance

    If your org supports **Okta Identity Governance (OIG)** and the relevant feature is enabled, a native group can expose **End User Display Name** and **End User Display Description** on its profile. Those fields help requesters and reviewers understand the access. For Access Requests, the user-friendly values apply to requests handled by an active **request condition** that references the group in its access scope. For Access Certifications, check the **reviewer context** configuration. Start with the internal group name and description for core lab practice.

    [Okta · Update group profile attributes](https://help.okta.com/oie/en-us/content/topics/identity-governance/update-default-group-profile-ar.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-2.md"

=== "Revision"

    ## Create, edit, and verify

    | If you need to… | Start here |
    | --- | --- |
    | Create a native group | **Directory → Groups → Add Group**. Enter a clear name and description, save, and verify the source. |
    | Edit the description | Open the group, then **Profile → Edit → Save**. Reopen the profile and confirm the saved text. |
    | Add or remove one member | Use **Assign people** or **Remove** inside the exact group. Search for the exact username. |
    | Confirm the outcome | Check **group → People**, **user → Groups**, and the membership event in **Reports → System Log**. |
    | Diagnose an unexpected removal | Inspect membership origin and the rule's exclusion list. If an app is involved, check for additional assignment paths. |

    **Exam focus.** Group creation and membership are foundational to the custom app integration use case. Be able to create the intended group, prove the individual membership, and explain where you would look for app assignment or rule-based changes. [Okta Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide)

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. A delegated admin can edit membership for an existing group. Which separate capability must you check before assigning group creation work? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A" data-correct> <span>A. Permission to create groups with the relevant scope</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Read an app assignment</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Change dashboard theme</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Manage password expired users</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A.</strong> Membership management does not confer creation privileges. Read the assigned role and scope.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. An approved removal is for one native group. Which evidence establishes the intended change? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. The matching removal event where available</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B"> <span>B. A push success event for a different app</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. The exact group and user IDs</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. The group and user&#x27;s resulting membership views</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and C and D.</strong> Verify the object changed, the resulting state, and the audit trail separately.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A member is removed manually from a rule-managed group and still meets the condition. What is the best first check? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Retest Group Push only</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B"> <span>B. Reset factors</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="C"> <span>C. Change the Department value</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="D" data-correct> <span>D. Inspect the rule&#x27;s excluded users</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> A manual removal can create an exclusion, which can keep the rule from re-adding the user.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. A Group Membership Admin can add users to an existing managed group. Does that role alone let them create a group?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>No. The role can manage membership within its scope. Group creation requires a role with that permission.</p>
    </details>

    **2. A is in Readers and Reviewers. You remove A from Readers. Where do you confirm that Reviewers membership remains?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check A's Groups tab and the Reviewers group's People list. The removal event should identify Readers as the affected group.</p>
    </details>

    **3. A rule-managed user still meets the rule's condition after a manual removal. What should you check?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Check the rule's exception list. A manual removal can place that user in the list and keep the rule from adding them back.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A delegated administrator can open a group but sees no Assign people action. Another admin can add a member to a similarly named group. What do you compare?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Check the exact group, its source and whether its membership is writable in Okta. Then inspect the administrator's role and group scope. A similarly named native group does not prove the same permissions or ownership apply.</p>
    </details>

    **Interview question.** You must remove a member from one group without changing another group's access. How do you document the outcome?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Record the verified user and group IDs, confirm memberships before and after, and find the removal event for the exact group. If the request is about an app, separately verify the surviving assignment path.</p>
    </details>
