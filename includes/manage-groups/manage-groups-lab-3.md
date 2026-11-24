## Lab 3 · Build and test a basic group rule { #lab-3 }

Use an isolated Okta Identity Engine lab org, a Super Admin or Org Admin with access to group rules, and two active disposable non-admin users with editable Okta profiles. Reuse **A** and **B** from [Lab 1](hands-on-labs.md#lab-1) if their test profiles are safe to change. **B** is the control user who should stay outside the targets. Record the original Department values before editing. If a directory controls Department or other lab rules depend on it, use new Okta-managed test users and a distinct matching value you can safely edit.

| Lab object | What to use it for |
| --- | --- |
| `LAB-M2-Dept-Target` | Receives users who match the Department rule. |
| `LAB-M2-Rule-Source` | Holds the manually assigned input user for the membership rule. |
| `LAB-M2-Rule-Target-A` and `LAB-M2-Rule-Target-B` | Both receive users who meet the membership condition. |

Create all four in **Directory → Groups → Add Group**. Begin with empty groups and confirm they have no app, rule, policy, or admin-role assignments. Use fresh group names if an earlier run left conflicting objects.

### 1. Preview a Department rule

1. In **Directory → People**, open A's **Profile → Edit**. Set **Department** to `Lab-M2-Finance` and save. Repeat for B with `Lab-M2-Operations`. Reopen both profiles and read the persisted values.
2. Go to **Directory → Groups → Rules → Add Rule**. Name the rule `LAB-M2-By-Department`. Under **IF**, choose **Use basic condition** and select **Department** with the equality comparison. Enter `Lab-M2-Finance`.
3. Under **Then Assign to**, select `LAB-M2-Dept-Target`. Leave **Except The following users** empty. In **Preview**, search for and select A, then B by exact username. Expect a match for A and a miss for B. If either fails, correct the input or rule and retry Preview.
4. Save. On the **Rules** list, verify the rule is **Inactive**. Confirm the target remains empty. Open the rule's **Actions → Activate**, then confirm the action if prompted.
5. Open `LAB-M2-Dept-Target → People`. Verify A appears and B does not. If the membership origin is displayed, confirm A was added by the test rule.

### 2. Test a mover and an exclusion

1. Change A's Department to `Lab-M2-Operations` and save. Recheck the target after processing. A should leave because the rule was the only path in. B should stay outside.
2. Change A back to `Lab-M2-Finance` and verify A returns. Keep the membership removal in this exercise tied to the input change. Removing A directly from the target can create a rule exception.
3. For an exclusion exercise, create a temporary duplicate condition in **Add Rule** and include A under **Except The following users**. Check what the screen shows in Preview. Cancel without saving this duplicate. The design goal is to exclude A from this proposed rule while A still meets its Department condition. Keep the original rule and its results intact.

### 3. Send one source membership to two targets

1. In `LAB-M2-Rule-Source → People`, choose **Assign people**, locate A, and finish the assignment. Leave B outside. Open both target groups and verify they are empty.
2. From **Groups → Rules → Add Rule**, create `LAB-M2-Source-to-Two-Targets`. In **Use basic condition**, choose **Group membership** and select `LAB-M2-Rule-Source`. Under **Then Assign to**, add both `LAB-M2-Rule-Target-A` and `LAB-M2-Rule-Target-B`.
3. Preview A and B. Save, activate, and verify membership in both target **People** lists. Expect A in both groups and B in neither. If only one target receives A, check the full target list in the rule.
4. Remove A from `LAB-M2-Rule-Source` using the source group's **People** list. Wait for processing and confirm A is absent in both targets. If you want a second positive check, add A back to the source and verify both target memberships return.

| Test | Expected result |
| --- | --- |
| Department Preview for A and B | A matches. B misses. Both remain outside the target before activation. |
| Activated Department rule, A moves to Operations | A leaves the Department target. B stays outside. |
| Source rule with A in the source group | A appears in both membership-rule targets. B appears in neither. |
| A leaves the source group | A is removed from both membership-rule targets when no other path grants them. |

**Pass check:** show one Preview match and miss, the inactive state after saving, a membership gained and lost after activation, and the same person entering two targets through one source group. Record the test user's input, target groups, rule state, and member result.

**Cleanup:** while the rules are still active, remove A from the dedicated source group if needed and set A and B to a nonmatching Department value. Verify the test targets are empty, then deactivate your two test rules under **Rules → Actions**. Restore the original Department values. Keep the test groups only if needed for the advanced rule exercise.

[Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · Group rule best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm) · [Okta · Verify group membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm)
