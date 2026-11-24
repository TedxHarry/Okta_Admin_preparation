## Lab 9 · Troubleshoot profile changes end to end { #lab-9 }

Diagnose a stale Department in a disposable receiving app, then compare that evidence with a Workflows update to a disposable Okta profile. Use the sample records wherever a live connection is unavailable.

### 1. Reproduce and repair a mapping problem

Use a test integration that supports manual mappings and profile updates. Use one assigned default-type test user with an editable Okta Department, and one control who is outside the integration. Record the original mapping and provisioning settings. Confirm the connector can write the selected optional target string.

1. In **Profile Editor → test app → Mappings → Okta User to App**, map `user.department` to the destination field. Verify the test user’s initial Department is `Operations` on the Okta profile, app user profile, and receiving account. Leave **Update User Attributes** enabled for the disposable integration.
2. In the same outbound row, temporarily replace the source expression with the constant `"Operations"`. Save. Change the user’s Okta Department to `Support` and inspect the source, Preview, saved app user value, and receiver. Identify the first checkpoint that fails to return `Support`.
3. Restore the field mapping to `user.department` with **Apply mapping on user create and update** where supported. Save and apply updates to the isolated integration. If a new profile change is needed to trigger your connector, change the test user’s Department to `Training`, verify that signal, and then change it back to `Support`.
4. Verify `Support` on the app user and the receiving account. Check the provisioning result for the correct user, app, and time. If the target still differs, locate the first different value again. Confirm the unassigned control was unaffected.

### 2. Check a directory write-back

If you have a separate disposable AD connection configured for outbound provisioning, use an already linked Okta-sourced test user with a known target account and an optional AD string supported for updates, such as Department where configured. With **Update User Attributes** enabled and the outbound field mapped, change the Okta user’s value to a distinct test value such as `Lab-Writeback`. Verify the resulting value in the directory and capture the connector outcome. Check the account identity before attributing the update to Okta. Use the sample below if this connection is unavailable.

### 3. Trace a Workflows write

Use a disposable Okta-sourced user and a Workflows connection authorized to read and edit the lab profile. Add an optional string to the default Okta user schema with the variable name `labM3WorkflowEcho`. Keep it Okta-sourced.

1. Create a flow using the Okta **User Okta Profile Updated** event. Add **Continue If** to compare the event’s **Okta User → ID** with the disposable user’s ID. This limits the lab write to that user.
2. Pass the event’s user ID into **Read User**. Expose the returned **Department** and **Lab M3 Workflow Echo** fields where the card lets you select outputs. Use **Continue If** to proceed only when Department equals `Lab-WF-Support`, then add another **Continue If** to proceed only when the echo field differs from Department.
3. Add **Update User**. Set **Update Semantics → Partial** and **Pass Empty Values? → No**. Use the same test user ID and map the Department output to **Lab M3 Workflow Echo**. Leave unrelated fields unselected.
4. Save and activate the lab flow. If permitted for synthetic data, enable saving inputs and outputs so the run can show each card’s values. Allow the event registration to complete, then set the disposable user’s Department to `Lab-WF-Support`.
5. Open **Execution History**. Check the trigger’s user ID, the value returned by **Read User**, and the result of **Update User**. Reopen the Okta profile and verify the echo is `Lab-WF-Support`. If the flow receives an event from its own update, verify it stops before writing again. A run for the other user should stop at the first ID check.

[Read User](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/actions/readuser.htm) · [Update User](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/actions/updateuser.htm) · [Build and test a flow](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-build-a-flow.htm) · [Continue If](https://help.okta.com/wf/en-us/content/topics/Workflows/function-reference/branching/branching_continueif.htm) · [Save flow data to execution history](https://help.okta.com/wf/en-us/content/Topics/Workflows/execute/execution-history-save.htm)

### Sample evidence

These records are simulated. For each case, identify the first unexpected result and the evidence that would confirm the repair.

| Case | Observations |
| --- | --- |
| Inbound value stalled | HR has `Support`. Its imported app user record has `Support`. The Okta user still shows `Operations`. |
| Outbound mapping wrong | Okta shows `Support`. Preview and the app user both show `Operations`. |
| Directory write-back stalls | Okta and the AD app profile show `Lab-Writeback`. The connector reports an authorization error. The actual AD user still has its old value. |
| Workflow event repeats | The first run reads Department `Lab-WF-Support`, writes the echo, and completes. A follow-up event reads the same value in both fields. |
| Claim reaches receiver | A fresh assertion contains the correct attribute name and value. The receiver’s field is empty. |

<details class="revision-answer">
<summary>Show the expected findings</summary>
<p>For inbound, inspect the user’s source priority and the source-to-Okta mapping. For outbound, correct the mapping that evaluates to the old value, then verify the persisted app value and target write. For AD, confirm the connector identity’s rights on the specific account and attribute, then verify the next successful write in AD. The workflow follow-up should stop before Update User. For the claim, inspect receiver-side mapping and its use of the field.</p>
</details>

### Reset the lab

Turn off the disposable flow before restoring Department or removing the echo field. Restore original inbound and outbound mappings, provisioning settings, and test values. Verify any downstream test record you changed. Retire the disposable app assignment and flow when the evidence has been captured.
