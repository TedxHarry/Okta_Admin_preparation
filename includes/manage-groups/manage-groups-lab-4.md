## Lab 4 · Write an advanced group rule { #lab-4 }

Use an isolated Okta Identity Engine org, a Super Admin or Org Admin who can manage group rules, and four active disposable non-admin Okta users. Reuse lab users where suitable or create additional accounts under **Directory → People → Add Person**. Finish setup before testing. Use users whose Department you can safely edit and record the original values for cleanup.

### 1. Build four membership cases

Create three empty native groups under **Directory → Groups → Add Group**. Use `LAB-M2-OEL-Source-A`, `LAB-M2-OEL-Source-B`, and `LAB-M2-OEL-Target`. Use fresh names if those objects already exist. Leave these groups unassigned to apps, policies, and admin roles. Manage the source groups manually so another rule will not change the inputs.

| Test user | Source A | Source B | Department |
| --- | --- | --- | --- |
| A-only | Member | Outside | `Lab-M2-Advanced-Finance` |
| B-only | Outside | Member | `Lab-M2-Advanced-Operations` |
| Both | Member | Member | `Lab-M2-Advanced-Finance` |
| Neither | Outside | Outside | `Lab-M2-Advanced-Finance` |

1. Open each source group and use **People → Assign people** to set the memberships from the table. Verify the exact four usernames across both **People** lists. Keep the target empty.
2. In **Directory → People**, open each user and set **Department** in **Profile → Edit**. Save and verify the persisted values. Use the exact strings in the table.
3. Open each of the three group records. Record each group ID from the Admin Console address. Keep the two source IDs and target ID labeled in your notes.

### 2. Compare Basic and advanced Preview

1. In **Directory → Groups → Rules → Add Rule**, give the draft rule a temporary name. Select **Use basic condition → Group membership**, choose both source groups, and select `LAB-M2-OEL-Target` under **Then Assign to**. Record the picker wording and the Preview result for each user. Cancel without saving.
2. Open **Add Rule** again and name it `LAB-M2-OEL-Eligibility`. Set the same target. Select **Use Okta Expression Language (advanced)** and replace the placeholders in this expression with your source IDs:

```text
isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID")
```

3. Preview all four users. A-only, B-only, and Both should match. Neither should miss. Compare these results with the Basic Preview. If the Basic picker says **any**, expect the two result sets to agree.
4. Replace `OR` with `AND` and Preview all four again. Only Both should match. Then test `isMemberOfGroup("SOURCE_A_ID") AND !isMemberOfGroup("SOURCE_B_ID")`. Only A-only should match. Keep the rule unsaved during these comparisons.

### 3. Add a Department check and prove a live change

1. Replace the test expression with the following, again substituting your source IDs:

```text
(isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID"))
  AND user.department == "Lab-M2-Advanced-Finance"
```

2. Preview all four users with the exception list empty. A-only and Both should match. B-only fails the Department check. Neither fails the membership check. If your lab schema allows an empty Department, temporarily clear A-only's value and Preview that user again. Restore the Finance value and confirm the match returns.
3. Add **Both** to **Except The following users**. Save the rule and verify it is **Inactive**. Confirm the target remains empty. Choose **Actions → Activate** and confirm if prompted.
4. Open **LAB-M2-OEL-Target → People** and verify that A-only enters. Both remains outside because of the named exception. The other two should stay outside for the reasons found in Preview.
5. Change A-only's Department to `Lab-M2-Advanced-Operations`. Wait for processing, then confirm A-only leaves the target while remaining in Source A. Verify your result in the target's **People** list and in **Directory → People → A-only → Groups**. If the result differs, check the rule state, exact group IDs, exception list, current Department, and whether another grant exists.

**Pass check:** record four Preview results for Basic, OR, and AND, one result for negation, the combined-condition results before exclusions, and a live add and removal. Explain why the excluded user stayed outside despite meeting the expression.

**Cleanup:** verify the target is empty, deactivate your test rule, then restore the original Department values. Remove only the memberships you added to your dedicated source groups if you are finished with these objects.

[Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · OEL group functions](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions) · [Okta · Verify membership changes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-verify-group-membership.htm)
