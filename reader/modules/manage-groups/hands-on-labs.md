# Module 2 · Manage Groups hands-on labs

Choose a lab to jump to its full instructions on this page. Work in a disposable Okta Identity Engine test org and use separate admin and test-user browser sessions.

## Choose a lab { #manage-groups-lab-grid }

- [1. Identify the group and its owner](#lab-1)

    Find the group by source and ID, verify a group assignment, and compare a native group with an imported group.

- [2. Create a group and manage membership](#lab-2)

    Create two native groups, change one membership, and verify the result in the System Log.

- [3. Build and test a basic group rule](#lab-3)

    Preview a Department rule, verify a mover, and use one source group to populate two targets.

- [4. Write an advanced group rule](#lab-4)

    Test AND, OR, negation, and a Department condition on four users, then verify a live membership change.

- [5. Change, verify, and troubleshoot rules](#lab-5)

    Edit a rule, diagnose an automatic exception, and verify the membership changes in the System Log.

- [6. Assign apps and resolve group priority](#lab-6)

    Trace overlapping bookmark assignments and compare which app values users inherit.

- [7. Import groups and trace source ownership](#lab-7)

    Verify a source-side membership change and investigate duplicate groups and import scope.

- [8. Push groups and link an existing target group](#lab-8)

    Verify provisioning and pushed membership, then link an existing group and compare unlink choices.

- [9. Verify groups across apps, policies, and governance](#lab-9)

    Compare an allowed and denied sign-in and verify which group-scoped rule applied.

- [Capstone · Joiner, mover, and access review](#capstone)

    Configure department access, verify a transfer, and resolve a missing-app ticket.

--8<-- "manage-groups-lab-1.md"

--8<-- "manage-groups-lab-2.md"

--8<-- "manage-groups-lab-3.md"

--8<-- "manage-groups-lab-4.md"

--8<-- "manage-groups-lab-5.md"

--8<-- "manage-groups-lab-6.md"

--8<-- "manage-groups-lab-7.md"

--8<-- "manage-groups-lab-8.md"

--8<-- "manage-groups-lab-9.md"

## Capstone · Joiner, mover, and access review { #capstone }

Build department-based app access, verify a transfer, and resolve a ticket where a qualifying user is still missing an app. Complete the ticket and evidence table before opening the worked solution.

### Starting state

Use a disposable Okta Identity Engine org, an admin who can create group rules and assign Bookmark Apps, and three active non-admin test users with editable Okta profiles. Verify each user can sign in before beginning. Keep admin and test-user sessions in separate browser profiles. Record original Department values if you reuse users.

Create fresh groups, rules, and app integrations with a unique lab prefix. Use fictional users and public example URLs. A Bookmark App verifies assignment and dashboard visibility. The optional extension uses a receiving app you administer.

| Test user | Department at the start | Role in the exercise |
| --- | --- | --- |
| Joiner | `Lab-Groups-Support` | New Support user who should qualify through a rule. |
| Mover | `Lab-Groups-Support` | Existing Support user who transfers to Operations. |
| Control | `Lab-Groups-Training` | Test user expected to remain outside both access groups. |

| Access group to create | Membership requirement | Apps assigned through the group |
| --- | --- | --- |
| Support Access | Active test users whose Department is `Lab-Groups-Support` | Workspace and Support Desk |
| Operations Access | Active test users whose Department is `Lab-Groups-Operations` | Workspace |

Use a **Workspace** Bookmark App for `https://example.com/` and a **Support Desk** Bookmark App for `https://example.org/`. Both tiles should be visible to assigned users. The only grants to these integrations should come from the groups in the table.

### 1. Configure and prove the baseline

Build the groups, rules, and app assignments from the requirements. Preview the Joiner and Control for the Support rule and verify the saved rules are active before checking results. For the Operations rule, explain why the three users should initially miss the condition. Verify group membership, app assignment, and the dashboard for all three users. Check how Okta reports the Joiner’s membership.

### 2. Process the transfer

Change the Mover’s Department to `Lab-Groups-Operations`. After processing, verify the Mover left Support Access and joined Operations Access. Explain why the Workspace tile should remain after processing even though its assignment path changed. Verify Support Desk is gone for the Mover and still present for the Joiner. Confirm the Control has neither app.

### 3. Investigate the failed assignment

Use an instructor or partner to set up the incident if available. Ask them to remove only the Joiner directly from the **Support Access** group’s member list, leaving the profile and app assignments alone. If practicing solo, make that change yourself after recording the baseline. Set it up only after confirming the Joiner’s membership is managed by the Support rule.

**Ticket:** The Joiner is still in the Support department but no longer sees Workspace or Support Desk. Restore the intended rule-managed access and show what caused the loss. Preserve the Mover and Control results.

Check the exact user, rule, group, and app records. Record a hypothesis that the evidence rules out. Correct the lab configuration, then verify the Joiner’s membership and both dashboard tiles. Capture one membership removal and one rule-driven addition from **Reports → System Log**. Use the actor, targets, event time, and rule ID where available to explain the difference.

### Evidence to submit

| Checkpoint | Record |
| --- | --- |
| Before the transfer | Each user’s Department, group membership and assignment method, and which tiles appear. |
| After the transfer | The Mover’s old and new memberships, Workspace’s remaining grant path, and Support Desk’s assignment result. |
| At the incident | The Joiner’s unchanged Department, missing group membership, exact cause, and a rejected hypothesis with supporting evidence. |
| After the repair | Both restored tiles for the Joiner, relevant System Log events, and the unaffected Mover and Control results. |

<details class="revision-answer">
<summary>Show the worked solution and expected results</summary>
<ol>
<li>Create one basic Department equality rule per group. Preview each rule, save, and activate. Assign Workspace to both groups and Support Desk only to Support Access. The Joiner and Mover should initially be in Support Access and see both tiles. The Control should see neither.</li>
<li>After the Mover’s Department change, the Mover should be in Operations Access only. Workspace is still assigned through Operations Access. Support Desk has no remaining grant. The Joiner stays in Support Access and retains both tiles.</li>
<li>Manually removing the rule-managed Joiner adds an exception to the Support rule. The unchanged Department rules out a profile mismatch. The current group-level app assignments rule out accidental removal of those grants.</li>
<li>Deactivate the Support rule, edit it, remove only the Joiner from the exception list, save, and reactivate. Verify rule-managed membership returns, both apps are assigned, and both tiles are visible in a refreshed user session. Recheck the Mover and Control.</li>
<li>Search for <code>group.user_membership.remove</code> for the manual removal and <code>group.user_membership.add</code> for the recovery. In the addition event, use <code>triggeredByGroupRuleId</code> in Debug Data to tie the addition to the Support rule. Match the records to the user and group by target and time.</li>
</ol>
</details>

### Optional extension · Verify at a receiving app

If you have a disposable SAML app or provisioning-enabled integration, apply the same assignment design to it. For SAML, verify the expected users can reach the receiving app and inspect any group-derived data you deliberately configured. For provisioning, check the actual target accounts and documented update or deactivation behavior. If you add Group Push, use a separate push group and verify the target membership directly. Record the corresponding target evidence beside the Okta assignments.

### Reset the lab

If you used Group Push, verify downstream membership removal before unassigning the app. Deactivate the disposable rules before restoring test profiles. Clear the lab app assignments, then clean up the lab rules and groups. Verify the two tiles are gone from the test dashboards. Restore any original Department values recorded during setup.

[Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Create a Bookmark App](https://help.okta.com/oie/en-us/content/topics/apps/apps-create-bookmark.htm) · [Manual group user management](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-users-manually.htm) · [Find rule activity in System Log](https://support.okta.com/help/s/article/how-to-search-system-log-for-actions-created-by-group-rules)
