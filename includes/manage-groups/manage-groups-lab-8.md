## Lab 8 · Push groups and link an existing target group { #lab-8 }

Provision a test account, push a group, and diagnose why one member is missing. Then link an existing group and compare the preserve and delete outcomes.

### Set up the lab

Use an isolated Okta Identity Engine org and a disposable target app. You need permission to manage the integration and its assignments in Okta and to read users and create or delete lab groups in the target. Check the exact integration’s provisioning features in the OIN catalog. Use a connector with working **Create Users** and **Group Push** for the first exercise. Use a connector with **Group Linking** for the second. Keep the lab groups separate from policy, role, and production access assignments.

If you have no supported connector, start at [Investigate the sample push records](#lab-8-push-records).

| Lab object | Purpose and starting state |
| --- | --- |
| Test users **A** and **B** | Two active Okta users. Start without access to the disposable target integration. |
| `Lab-GR8-App` | Okta group that assigns the app. Start with A only. |
| `Lab-GR8-Push` | Okta group that will create a new target group. Start with A and B. |
| `Lab-GR8-Link` | Okta group that will manage an existing target group. Start with A only. |
| `Lab-GR8-Existing` | Empty target group you create before linking. Record its target ID. |

Create the Okta groups in **Directory → Groups → All → Add group**. Use **Assign People** to add the listed test users. Check that the target has no pre-existing `Lab-GR8-Push` group. If the connector requires additional fields for account creation, complete them from its provisioning guide.

### 1. Assign and verify the first account

1. Open **Applications and Resources → Applications → your test app → Provisioning**. Check that provisioning is enabled and account creation is configured.
2. In **Assignments → Assign → Assign to Groups**, assign the app to `Lab-GR8-App` only. Save and finish the dialog.
3. In **Assignments → People**, confirm A has type **Group** and B is absent. In the target’s user list, verify A’s account using its username or ID. Keep this baseline so you can compare it with the group result.

### 2. Push a new group and fix a missing membership

1. On the integration’s **Push Groups** tab, choose **Push Groups → Find groups by name**. Select `Lab-GR8-Push`. Choose **Create Group** if the connector offers a match action. Enable **Push group memberships immediately** and save.
2. Record the Push Status. In the target, locate the newly created group and record its ID. For connectors that process eligible members of a partially assigned group, A should appear and B should be absent. If the connector reports an error instead, record the status and check which account it could not resolve.
3. Compare the group members in Okta with **Assignments → People** and the target account list. B is in the push group but lacks the app assignment and corresponding account.
4. Add B to `Lab-GR8-App`. Verify B’s app assignment and target account first. From the push row, use **Push Now** once the target membership is safe to synchronize. Verify A and B appear in the target. If the row is in **Errors**, inspect the detail and retry after the account prerequisite is fixed.
5. Remove B from `Lab-GR8-Push` only. Verify B leaves the downstream group while B’s app assignment and target account remain. Use the push status and target member list together as evidence.

[Enable Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enable-group-push.htm) · [Troubleshoot Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-push-troubleshoot.htm)

### 3. Link the existing group and compare unlink outcomes

1. If your connector supports linking, create the empty `Lab-GR8-Existing` in the target and record its ID. In Okta, open **Push Groups → Refresh App Groups**. If your connector does not support linking, use cases 2–4 below to compare the expected results.
2. Choose **Push Groups → Find groups by name**. Select `Lab-GR8-Link`, choose **Link Group** from **Match results and push action**, and select `Lab-GR8-Existing`. Review the mapping and save. If immediate synchronization was deferred, start the push from the saved row.
3. Verify the linked target group still has its original ID and now includes A. Note whether the imported copy is visible separately in **Directory → Groups**. A cosmetic name difference is acceptable if you left automatic renaming disabled.
4. On the linked row, open its status menu and choose **Unlink pushed group → Leave the group in the target app**. Verify it still exists by ID and the mapping is gone. Check whether the group is shown again as an imported group. Record the state of the source Okta group and its references.
5. Compare that result with the new group you created in step 2. On the `Lab-GR8-Push` mapping only, choose **Unlink pushed group → Delete the group in the target app** if offered. Verify the target group is gone, the Okta source group remains, and A and B still have their app assignments.

[Configure Group Linking](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-configure-enhanced-group-push.htm) · [Group Push operations](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-push-operations.htm)

### 4. Investigate the sample push records { #lab-8-push-records }

These records are simulated. Identify what you would change and the evidence you would collect for each case.

| Case | What the records show |
| --- | --- |
| 1. Missing member | `Lab-GR8-Push` includes A and B. The target group lists A. Only A is assigned to the app and present in its user list. |
| 2. Duplicate name | An Okta push-by-rule attempt reports a duplicate name. The target already has a disposable group with that name and ID `T-42`. The connector supports linking. |
| 3. Preserve the target | The group with ID `T-42` is linked. You need to end the mapping and keep the target group. |
| 4. Delete the lab target group | Another Okta group created a new disposable target group. You need to remove that downstream group and retain its Okta source. |

<details class="revision-answer">
<summary>Show expected findings</summary>
<ol>
<li>Add B through the assignment group, verify the target account, then repush and verify B in the target group.</li>
<li>Use by-name Group Linking for that existing group. Verify the mapping uses T-42 and inspect its member list after syncing.</li>
<li>Unlink and select Leave the group in the target app. Verify T-42 remains and the mapping is gone.</li>
<li>Unlink and select Delete the group in the target app on the disposable mapping. Confirm the target group is gone and the original Okta group remains.</li>
</ol>
</details>

### Optional practice · Push a group by rule

If the integration offers **Find groups by rule**, create a fresh Okta group with a unique lab-only name and add A. Confirm A is still assigned and provisioned. On **Push Groups → Find groups by rule**, name the rule and use the most specific available name condition so it matches only this group. Review the condition before creating the rule. Verify the group appears under **By rule**, then verify the target group ID and member list. At cleanup, remove the disposable rule and inspect the mapping and target group separately. If the target group remains, remove it through the connector’s documented procedure.

[Enable Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enable-group-push.htm)

### Reset the lab

Finish membership removal and verify it in the target before removing any remaining app assignments for these test users. Remove only the lab’s push mappings, then unassign the app from `Lab-GR8-App`. Clean up the disposable Okta groups and any preserved target group only when you no longer need the exercise. Check the target app’s documented account cleanup behavior.
