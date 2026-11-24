## Lab 2 · Create a group and manage membership { #lab-2 }

Use an isolated Okta Identity Engine lab org and an administrator who can create native groups, edit their profiles, manage their membership, and view the System Log. Reuse active non-admin users **A** and **B** from [Lab 1](hands-on-labs.md#lab-1), or use two other disposable non-admin users in the same org. A will join both groups. B stays outside both as a **control user**, so you can detect an unintended membership change.

| Group | Description | Purpose in this lab |
| --- | --- | --- |
| `LAB-M2-Manual-Readers` | `Lab 2 readers test group` | Add A and remove A later. |
| `LAB-M2-Manual-Reviewers` | `Lab 2 reviewers test group` | Add A and verify that this membership stays in place when you remove A from Readers. |

### 1. Create the groups and edit the profile

1. In **Directory → Groups**, search for each intended name. If a prior run already created a group, reuse it only after confirming it is disposable and has the expected starting state. Otherwise choose **Add Group**, enter the first name and description from the table, and **Save**. Repeat for the other group.
2. Open each group. Confirm it is native Okta and starts without A or B. Record each group's exact name and ID. Keep these two lab groups free of apps, rules, policies, and admin roles for this exercise.
3. Open **LAB-M2-Manual-Readers → Profile → Edit**. Set the description to `Lab 2 native group for one-member removal practice` and **Save**. Reopen **Profile**. Expect the new description and the same group ID.
4. Compare the two groups' **People** views. The description edit should leave their membership as you found it in step 2.

### 2. Add the same user to both groups

1. Open **LAB-M2-Manual-Readers** and choose **Assign people**. Search for A by exact username, select **Assign** on A's row, and finish the assignment dialog. Record the time and leave B unassigned.
2. Repeat for **LAB-M2-Manual-Reviewers**. Wait for membership processing before verifying.
3. Open **People** inside each group and confirm A appears and B does not. If the membership origin is visible, expect manual management.
4. Open **Directory → People → A → Groups**. Confirm both groups appear. Open B's record and confirm neither appears.

### 3. Remove one membership and collect evidence

1. Open **LAB-M2-Manual-Readers → People**. Find A and select **Remove** for A's entry. If prompted, confirm the exact user and group.
2. Reopen **People** in both groups and A's **Groups** tab. Compare the results to the table. If they differ, check for background processing, a rule-managed origin, or a second group with a similar name.
3. Open **Reports → System Log**. Set the time range around the test and search `eventType eq "group.user_membership.remove"`. Open the event for A and Readers. Record the actor that performed the removal, the affected targets, and the outcome. Repeat with `eventType eq "group.user_membership.add"` if you want the before-and-after event trail.
4. Compare one-person removal with the **Remove all people in group** option. Explain who would be affected if the group also contained B or granted a shared app. Leave the bulk action unsubmitted.

| Evidence | After both additions | After removing A from Readers |
| --- | --- | --- |
| Readers | A is present. B is absent. | A and B are absent. |
| Reviewers | A is present. B is absent. | A remains. B is absent. |
| A's Groups view | Readers and Reviewers appear. | Reviewers remains. Readers is absent. |
| System Log | Addition events identify A and each affected group. | The removal event identifies A and Readers. |

### Optional: inspect OIG display fields

If your org exposes the group display fields, open **Readers → Profile → Edit** and compare the internal name and description with **End User Display Name** and **End User Display Description**. If you have an existing disposable request condition for the group, compare the values shown on its requester view after refreshing the condition as documented. If your org lacks the feature, record which values an access reviewer should see under a supported setup and keep the core result separate.

**Pass check:** you can show the saved description, A's removal from Readers, A's continuing membership in Reviewers, and the removal event. Keep the two groups only if you want to reuse them in rule exercises. Otherwise remove A's remaining test membership and record any cleanup you completed.

[Okta · Create a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm) · [Okta · Edit group profiles](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-edit-group-attributes.htm) · [Okta · Assign people](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-group-people.htm) · [Okta · Remove people](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-group-people.htm) · [Okta · System Log](https://help.okta.com/oie/en-us/Content/Topics/reports/syslog-filters.htm) · [Okta · Governance display attributes](https://help.okta.com/oie/en-us/content/topics/identity-governance/update-default-group-profile-ar.htm)
