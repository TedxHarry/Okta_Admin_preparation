## Lab 5 · Change, verify, and troubleshoot rules { #lab-5 }

Edit a disposable rule, watch membership change, and recover a user who remains excluded after a profile correction.

### Set up the test users and group

Use an Okta Identity Engine test org and sign in to the Admin Console as a Super Admin or Org Admin. You can start here without completing earlier labs.

1. Go to **Directory → People**. Create or reuse three **Active**, Okta-sourced test users without admin roles. On each user’s **Profile** tab, record the original Department if you are reusing the account, then edit and save the values below. Finish account activation if a user is pending.
2. Go to **Directory → Groups → All → Add group**. Create an Okta group named `Lab-GR5-Target`. This group is the rule’s destination. Start with an empty group and leave it without app assignments or admin roles.
3. Open the group and use **Assign People** to add only the manual member below. Confirm the user appears in the group before creating the rule.

| Test user label | Department | Role in the lab |
| --- | --- | --- |
| Previous match | `Lab-GR5-Original` | Joins under the original condition and leaves after the edit. |
| New match | `Lab-GR5-Revised` | Joins after the edit and is later removed to test the exception. |
| Manual member | `Lab-GR5-Control` | Stays in the group through a manual grant and serves as a negative Preview case. |

### 1. Establish the baseline

1. Go to **Directory → Groups → Rules → Add Rule**. Name the rule `Lab-GR5-Department`. Use a **basic condition** with **Department** and the equality comparison for `Lab-GR5-Original`. In **Then Assign to**, select `Lab-GR5-Target`. Leave the exception list empty.
2. In **Preview**, select the previous match, then the new match. Expect the first user to qualify and the second to fail the condition. Save the rule, then select **Actions → Activate**.
3. Open `Lab-GR5-Target` and view its members. Wait for processing and refresh the member list if needed. Confirm that the previous match is rule-managed, the manual member is manually managed, and the new match is absent. Record the time and membership baseline.

### 2. Change the rule and compare the membership

1. On **Directory → Groups → Rules**, find `Lab-GR5-Department` and select **Actions → Deactivate**. Check that the previous match and manual member are still listed on the group.
2. Select **Actions → Edit**. Change the Department value to `Lab-GR5-Revised`. Preview all three users. Expect only the new match to meet the revised condition. Save and select **Actions → Activate**.
3. Refresh the target group’s member list after processing. Record the actual result against the expected one below. If the membership differs, confirm the group and rule names, exact profile values, account statuses, and the rule’s active state before making another change.

| Checkpoint | Previous match | New match | Manual member |
| --- | --- | --- | --- |
| Original rule active | By rule | Absent | Manually |
| Rule deactivated | Present | Absent | Manually |
| Revised rule active and processed | Absent | By rule | Manually |

### 3. Diagnose and clear an unexpected exception

1. In the target group, manually remove **only** the new match from the member list. Confirm the user is absent.
2. In **Directory → People**, change that user’s Department to `Lab-GR5-Control` and save. Change it back to `Lab-GR5-Revised` and save again. Refresh the group after processing. The account is active, the current Department matches, and the user should still be absent.
3. On **Rules**, confirm the rule is active. Deactivate it, open **Edit**, and inspect **Except The following users**. Record that the new match was listed there. Remove only that exception, save, and reactivate.
4. Check the group again. Confirm the new match returns under the rule, the previous match is still absent, and the manual member is still present.

### 4. Verify the evidence in System Log

1. Go to **Reports → System Log**. Set the time range to cover this lab. Use this filter for the rule edit, then repeat it with `policy.rule.activate` and `policy.rule.deactivate`. Open a matching event for `Lab-GR5-Department` and note the actor, target, and time.

    ```text
    eventType eq "policy.rule.update" and target.detailEntry.policyType eq "group_rule"
    ```

2. Search for `eventType eq "group.user_membership.add"`. Open the event for the new match and `Lab-GR5-Target`. Expand **Debug Context → Debug Data** and record `triggeredByGroupRuleId`. Use that ID to narrow the search for additions made by your rule.

    ```text
    eventType eq "group.user_membership.add" and debugContext.debugData.triggeredByGroupRuleId eq "<rule-ID>"
    ```

3. Search for `eventType eq "group.user_membership.remove"` and look for the previous match leaving after the rule edit and the later manual removal of the new match. Compare the times, actor, and targets. Use the group member list to confirm the final state.

[Find group-rule events](https://support.okta.com/help/s/article/how-to-search-system-log-for-actions-created-by-group-rules) · [Find membership additions and removals](https://support.okta.com/help/s/article/search-okta-system-log-for-group-membership-additions-and-removals)

### Reset the lab

Delete only your disposable rule from **Rules → Actions → Delete**. If needed, deactivate it first. Choose **Remove users from the group** and verify the rule-managed user is gone while the manual member remains in this fixture. Remove the manual member and delete the disposable group. Restore any original Department values you recorded on reused test users.

[Effects of deactivating and deleting a rule](https://support.okta.com/help/s/article/what-happens-if-group-rules-are-deactivated-and-deleted?language=en_US)
