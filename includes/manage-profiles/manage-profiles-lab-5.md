## Lab 5 · Build and verify inbound and outbound mappings { #lab-5 }

Follow a test value through Okta and into an app. Compare a create-only mapping with an update-enabled mapping, then use an inbound example to trace the opposite direction.

### Prepare the test field and integration

Use an isolated Okta Identity Engine org. For live outbound verification, use a disposable app integration that supports manual mappings, account creation, and user attribute updates. Identify an optional writable string on the receiving app and check it is visible in the app’s Okta profile. Record the field’s name, the original mapping, and the provisioning settings. If a supported app is unavailable, complete the sample exercise below.

In **Directory → Profile Editor**, add an optional string named **Lab M3 Mapped Code** with variable name `labM3MappedCode` to the default Okta user type. Use two disposable default-type users, **A** and **B**, with no existing accounts in the target. In **Directory → People → user → Profile → Edit**, give A the code `OPS` and B the code `FIN`. Leave both users unassigned while you prepare the mapping.

### 1. Map outbound and compare create with update

1. In **Directory → Profile Editor → Apps → test app → Mappings**, choose the default user type if prompted. Open **Okta User to App**. Map the optional target string from `user.labM3MappedCode` and select **Apply mapping on user create only** if available. Preview A and B and confirm their respective values. Keep other required mappings intact.
2. Save the mapping. Assign A directly to the test app and confirm the app assignment and downstream account show `OPS`. Change A’s Okta code to `ENG` and reopen both app records. With create-only timing, the field should still show `OPS` unless another operation or configuration changed it.
3. For the same destination row, switch to **Apply mapping on user create and update**. Save and apply updates if appropriate for the isolated integration. Assign B, record the receiving value `FIN`, and then change B’s Okta code to `SUP`. Verify the app user profile, the provisioning outcome, and the value `SUP` on the receiving account. Use the app’s operation history or Okta System Log if available. If an option is unavailable, compare using the simulated records below.
4. Where the app exposes **Provisioning → To App → Attribute Mappings**, find the same field. Compare its source and **Apply on** setting with the mapping you configured.

[Configure an outbound mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes.htm) · [Profile Push and timing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-selective-profile-push.htm)

### 2. Inspect an assignment override if available

Use B’s individual assignment. In **Applications → test app → Assignments**, open the edit icon. If the test field supports a documented override and shows the **Reset** option after editing, set a temporary value such as `OVERRIDE`, save, and verify the assignment profile. Reset the field and verify that the default mapping supplies the expected value again. If overrides are unavailable in the test org, use the sample record below.

### 3. Trace an inbound mapping

**Live option.** Use a separate disposable source integration that can import profiles and is already allowed to source an optional test field for a matched test user. In **Profile Editor → source integration → Mappings → App to Okta User**, select the default user type and map a known populated source string into that field. Record the original mapping. Preview the correct user if offered, save, and use the connector’s supported import or sync operation. Confirm the input on the source app user profile and the resulting value on the actual Okta user profile. If the integration does not own that field, use the sample rather than changing source priority for unrelated users.

**Sample option.** These are simulated records. Explain which setting, data, or operation you would check next.

| Case | Evidence | Question |
| --- | --- | --- |
| Inbound missing value | Source app user has `departmentCode = OPS`. The target Okta field is unmapped. | Which mapping direction brings in the source value? |
| Create-only | A’s Okta value is now `ENG`. The app user and target both show `OPS`. | Why can the initial value remain? |
| Update-enabled | B’s preview and app user show `SUP`. The target still shows `FIN`. | Where is the first unexpected value? |
| Individual override | The default mapping evaluates to `SUP`. B’s app assignment shows `OVERRIDE`. | Where should you check before changing the shared mapping? |

<details class="revision-answer">
<summary>Show the expected findings</summary>
<p>Use App to Okta User for the inbound field, then verify source priority and the saved Okta profile. Create-only timing keeps the initial mapping result through a later source edit. The update-enabled example first differs at the receiving account, so inspect provisioning and the target response. For the override case, inspect the individual assignment and use Reset if appropriate.</p>
</details>

### 4. Remove the lab mapping and reset

1. On your disposable outbound mapping, clear the lab source or use **Do not map** where offered. Save and reopen the row to verify it is unmapped. Check the existing app user and downstream values separately and record what remains.
2. Restore the original inbound and outbound mappings and any provisioning settings changed for the exercise, then remove any lab-only assignments. Confirm no references remain before removing the disposable Okta field. Follow the test app’s cleanup procedure for its downstream test accounts.

[Map inbound profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [Override assignment values](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-app-mapping.htm) · [Remove mappings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-mapping.htm)
