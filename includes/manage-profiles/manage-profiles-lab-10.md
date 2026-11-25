## Lab 10 · Follow HR sourcing through app access { #lab-10 }

Trace three outcomes in the same integration chain. Use the simulated records if you have no HR sandbox or supported receiving app. The exercise has no AD dependency.

### Study the evidence without a connector

These are **simulated records**. The app supports user provisioning, including deactivation. Only the rule-managed group assigns the app. The HR integration is the highest-priority profile source and its lifecycle action is **Deactivate**.

| Test | Source and Okta evidence | Receiving app evidence |
| --- | --- | --- |
| Joiner | HR imports an active worker. The confirmed Okta user stores Department `Lab-Support`, matches the rule, and receives the app assignment. | Account `T-140` is active and stores the mapped Department. |
| Mover | Same worker transfers to `Lab-Operations`. Okta stays Active. The rule removes membership and the last app assignment disappears. | The same account `T-140` is inactive. |
| Leaver | A separate active worker with app access reaches an effective termination. The HR change is processed and Okta becomes Deactivated. | Account `T-141` becomes inactive after the connector processes the deprovisioning operation. |
| Failed downstream write | The leaver is Deactivated in Okta. The app connector reports an authorization error on the deprovisioning task. | Account `T-141` remains active. |

Explain which evidence distinguishes a mover from a leaver. Then locate the first failure in the last row and explain how you would verify the repair. For the joiner, identify a field or identifier that would show you linked the intended worker to the intended Okta user.

### Live practice prerequisites

Use an isolated Okta org, a supported test HR integration whose workers you can edit, and an app you control with working provisioning and observable target records. Reuse the [application provisioning lab](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md) to connect a test target with **Create Users**, **Update User Attributes**, and **Deactivate Users** enabled. Create two disposable HR workers for the mover and leaver tests. Give them synthetic attributes, unique usernames, and an eligible start date. Use an unrelated active test user as a control.

### 1. Bring workers into Okta

1. If using Workday, use the [official Workday integration setup](https://help.okta.com/oie/en-us/content/topics/provisioning/workday/workday-provisioning.htm) to configure its integration system user and the **Provisioning → Integration** settings. Confirm **Test API Credentials** passes. For a different supported HR connector, follow its documented permissions and import trigger.
2. Under the HR integration's **Provisioning → To Okta**, enable profile sourcing. Select **Deactivate** as the lifecycle action for this isolated exercise. Leave automated reactivation off. Confirm priority in **Directory → Profile Sources**. Map the actual HR field to Okta Department and confirm that field uses HR sourcing.
3. Give both workers Department `Lab-Support`. Import them and review their matches. Confirm the assignments and activate the resulting default-type users if needed. Record each Okta user ID, username, linked HR account, and saved Department. Confirm the control's Department is different.

### 2. Connect the rule to a real app assignment

1. Create the native Okta group **Lab HR Support App**. In **Directory → Groups → Rules**, add a rule that assigns it when Department equals `Lab-Support`. Preview the worker and control, then save and activate. Verify the two workers appear in the group and the control stays outside it.
2. On the test receiving app, verify the **Okta User to App** mapping for Department if the target supports it. Otherwise use a supported mapped field such as first name and keep Department as the rule input. Assign the app to **Lab HR Support App** under **Assignments → Assign → Assign to Groups**. Confirm both workers have only this assignment path.
3. Verify the connector creates or links each test account. Record the target IDs, active status, and mapped values. Verify the control has no app assignment.

### 3. Compare the mover with the leaver

1. Change the mover's Department to `Lab-Operations` in HR and process the import. Verify the stored Okta value, removal from **Lab HR Support App**, loss of the last app assignment, and deactivation of the original target account. The Okta user should remain **Active**.
2. With the second worker's app assignment still in place, use the sandbox HR system's supported termination operation. Run the supported sync after the change is eligible to be processed. Verify the HR status, Okta **Deactivated** status, app assignment removal, and inactive target account. Check **Reports → System Log** or **Dashboard → Tasks** for the provisioning outcome. If the target stays active, check the operation and target permissions before retrying.
3. Compare the two target IDs and the control account. Confirm the changes affected only the intended accounts. Leave the worker records available for inspection according to your sandbox's cleanup process. Retire the temporary rule and group and restore any test connector settings you changed.
