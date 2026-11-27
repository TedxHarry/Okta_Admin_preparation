# Lesson 6 · Assign apps and resolve group priority

=== "Theory"

    A user belongs to two groups that both assign the same app. Removing one membership may leave the app assigned. The remaining group can also supply a different app role or license. To predict the result, trace the active assignment paths first, then inspect the values the user inherits.

    ### Trace the app assignment

    An **app assignment** is the link in Okta that makes an app integration available to a user. A direct assignment links the app to the person. A group assignment links the app to a group and makes the app available to eligible group members. The user’s group membership and the group’s app assignment are two records you can verify independently.

    To assign one app to several groups, open **Applications and Resources → Applications → app → Assignments → Assign → Assign to Groups**. For each group, click **Assign**, enter any app-specific assignment values, then click **Save and Go Back** and **Done**. To assign multiple apps from the group side, open **Directory → Groups → group → Manage Apps**, select each app, complete its assignment dialog, and click **Done**.

    | User’s membership | Travel bookmark assigned to East and West | Docs bookmark assigned to East |
    | --- | --- | --- |
    | East and West | Assigned | Assigned |
    | East only | Assigned | Assigned |
    | West only | Assigned | Absent |
    | Neither | Absent | Absent |

    This example assumes there are no individual assignments or other assigned groups. If the East and West user leaves East, West continues to supply Travel. Docs drops because East was its only assignment path.

    [Assign a single app to groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-app-group.htm) · [Assign multiple apps to a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-multiple-app-group.htm)

    ### Read assignment type before changing it

    On the app’s **Assignments** tab, switch between **Groups** and **People**. The Groups view shows which groups are assigned. The People view shows the user’s current assignment type. An **Individual** assignment may remain individual after the user joins an assigned group. To move that account to group management, confirm they belong to an assigned group and choose **Convert Assignments → Select assignments to convert**. Verify the type becomes **Group** and inspect any inherited app attributes. Simply unassigning an individual user can leave them without the app even if an assigned group exists.

    [Assign an app integration to a group](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-assign-app-groups.htm) · [Convert an individual assignment to a group assignment](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-convert-user-group.htm)

    ### Resolve conflicting values for the same app

    An **app user profile** holds the user’s attributes for one app integration. The app can collect group-level assignment values such as a role or license. **Application group priority** is the order of assigned groups on that app. When more than one applies to a group-managed user, priority can select which group supplies the assignment values. A user who belongs only to the lower-ranked group still receives that group’s applicable values.

    On the app’s **Assignments → Groups** view, drag the groups into order. In **Assignments → People**, open the pencil icon for the affected user. For integrations that expose the details, inspect the app values and the inherited group shown in the editor. If provisioning is enabled, verify the update in the target app as well. An Okta assignment alone only establishes Okta’s side of the record.

    | App’s group order | User belongs to | Group providing the priority-based value |
    | --- | --- | --- |
    | East above West | Both | East |
    | East above West | West only | West |
    | West above East | Both | West |

    For eligible app attributes, open **Directory → Profile Editor → Profile** for the app and edit the attribute. **Use Group Priority** takes that attribute’s value from the highest-priority applicable group. **Combine values across groups** combines eligible values from the applicable groups. The attribute must be a string, number, or integer array and its scope cannot be **User personal**. Object arrays are unsupported. Check the app’s schema and connector before assuming a specific role or license field supports combining.

    [Prioritize application groups](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-prioritize-app-group.htm) · [Inspect inherited assignment values](https://support.okta.com/help/s/article/How-to-see-from-which-group-the-user-inherits-the-assignment-for-an-app) · [Assign attribute group priority](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-app-group-priority.htm)

    ### Verify the layer that explains the result

    | Question | Where to check |
    | --- | --- |
    | Who gets the app? | App **Assignments** and each assigned group’s member list. |
    | Why is the app assigned but the tile missing? | The app’s visibility settings and the user’s dashboard session. |
    | Which app values does the user inherit? | App assignment group order, the user’s app assignment, and the app’s attribute settings. |
    | Which authentication requirements apply? | For an app governed by an app sign-in policy, check the policy’s rules in order. The first matching rule determines the applicable action. |
    | Was an external account or group changed? | Check provisioning results and the external app. Group Push is a separate operation. Use separate groups for app assignment and Group Push. |

    [App visibility and provisioning settings](https://help.okta.com/oie/en-us/content/topics/apps/apps-configure-settings.htm) · [App sign-in policy rules](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/add-app-signon-policy-mobile.htm) · [App assignments and Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/app-assignments-group-push.htm)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-6.md"

=== "Revision"

    ### Certification cheat sheet

    | Concept | Recall |
    | --- | --- |
    | One app, multiple groups | Open the app’s **Assignments → Assign to Groups**. |
    | Multiple apps, one group | Open the group’s **Manage Apps**. |
    | Individual to group | Confirm a matching group assignment, convert the selected user, and verify the **Group** type. |
    | Priority vs. combining | Read the app’s group order for a priority-based field. Check the schema and attribute settings for eligible array combining. |
    | Policy order | Read the app sign-in policy’s rules in order to determine the authentication requirement. |

    ### Check your recall

    **1. A user leaves East and remains in West. Both groups assign Travel. Why is Travel still assigned?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>West still supplies the group assignment. Check the user’s current membership and the app’s Groups assignments.</p>
    </details>

    **2. West moves above East. The user belongs only to East. Which group supplies the priority-based app value?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>East. Priority considers the assigned groups the user belongs to.</p>
    </details>

    **3. Both groups supply values for an eligible app string array. Which option keeps both groups’ values?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Choose Combine values across groups on the app attribute and inspect the resulting app profile.</p>
    </details>

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** Two assigned groups supply different Region values. Their order changes and the user remains in both. What can change and what should stay verified?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>A priority-based scalar can change to the higher-priority applicable group's value while the user remains assigned. Check the individual app user record, any applicable override, and the downstream value if provisioning updates it.</p>
    </details>

    **Interview question.** When would you combine group values instead of using group priority? How do you prove the result?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Combine when an eligible array should contain values from all applicable groups. Use priority when one group's value should win. Test an overlapping member and a single-group member and compare their saved app profiles.</p>
    </details>
