## Lab 6 · Transform values and manage usernames { #lab-6 }

Preview the same expression with a populated field and a blank field. Then test an app username change using a disposable alias.

### Prepare two test users and an integration

Use an isolated Okta Identity Engine org and two default-type users, **A** and **B**, with test email addresses you control. For live practice, choose a disposable app that offers a writable string mapping and an editable application username. You can do the expression and username parts on separate test integrations if needed. Use the sample cases below for features your integration does not expose.

In **Directory → Profile Editor → Okta User (default)**, add optional string fields **Lab M3 Team Code** (`labM3TeamCode`) and **Lab M3 App Alias** (`labM3AppAlias`). In **Directory → People → user → Profile → Edit**, set A’s team to `ops` and alias to `LAB-M3-ALEX`. Leave B’s team and alias blank. Record the integration’s original mapping, username format, and timing.

### 1. Preview a conditional mapping

1. In **Profile Editor → Apps → test app → Mappings → Okta User to App**, choose an optional destination string. Select the default user type if prompted.
2. Enter the expression below and preview A and B. Before saving, verify that A evaluates to `OPS` and B to `UNASSIGNED`. Try a null input only if you have a test record where the value is absent. The console can store a cleared string as an empty string.

    ```text
    (user.labM3TeamCode == null || user.labM3TeamCode == "") ?
      "UNASSIGNED" : String.toUpperCase(user.labM3TeamCode)
    ```

3. If the destination supports updates, save the expression with **Apply mapping on user create and update** and assign A only to the test app if needed. Check A’s saved app user field. Change the Okta value to `fin` and verify `FIN` on the app user profile. Where provisioning is enabled and the field is writable, check the corresponding target record. If you only ran Preview, record the result as expression evidence.

### 2. Change a test app username

1. Verify the target accepts the example format, including its domain, and the chosen alias is unique in the test integration and receiver. Replace `example.com` with the test domain the app expects, if needed.
2. In **Sign On**, use the custom **Application username format** and its update setting if available. For an integration that supports username mapping in **Profile Editor**, use **Okta User to App → Override with mapping** and select **Apply mapping on user create and update** for `userName`.
3. Preview A and B where supported using the expression below. A should use the lowercase alias and chosen domain. B should use the lowercase email. Check B’s expected value even if B remains unassigned.

    ```text
    (user.labM3AppAlias == null || user.labM3AppAlias == "") ?
      String.toLowerCase(user.email) :
      String.toLowerCase(user.labM3AppAlias) + "@example.com"
    ```

4. Save the change only on the test integration, apply it where required, and inspect A’s app assignment. Record the original Okta login and the app username. Change only A’s custom alias to `LAB-M3-ALEX2`, then verify the assignment now shows `lab-m3-alex2@example.com` or the corresponding username for your domain. Check the Okta login separately.
5. If your test app supports sign-in or account updates, verify the identifier received during a new sign-in or inspect the actual account and the provisioning result. A saved assignment value is the evidence to record when the receiver is unavailable.

### 3. Diagnose the sample input and username cases

| Case | Evidence | Predict or investigate |
| --- | --- | --- |
| Inbound code | The source integration’s variable is `departmentCode` and its value is `ops`. | Which reference would uppercase the value in **App to Okta User**? |
| No team code | The field is null or stores an empty string. | Which conditional branch runs? |
| Integer conversion | A mapped string is `"007"`. Another is `"OPS"`. | Which input is safe for an integer quantity and what happens to the leading zeros? |
| Stale app username | The new alias previews correctly but A’s app assignment still shows the original username. | Which format, update timing, and saved settings should you inspect first? |

<details class="revision-answer">
<summary>Show the expected findings</summary>
<p>Use <code>String.toUpperCase(source.departmentCode)</code> or the corresponding in-context <code>appUser</code> reference for the inbound mapping. A null or empty team code returns <code>UNASSIGNED</code>. The numeric string converts to 7 and loses its leading zeros. Validate or reject nonnumeric input before integer conversion. For the stale assignment, confirm the effective app username format, create-and-update timing, and whether the mapping was saved and applied to that user.</p>
</details>

### Reset the lab

Restore the original test mapping, username format, and update settings. Remove lab-only assignments and verify no mapping references the lab fields before removing them. Follow the receiving app’s test-account cleanup process if you provisioned accounts.

[Expression reference](https://developer.okta.com/docs/reference/okta-expression-language/) · [Profile Editor expression procedure](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-attribute-mappings-expressions.htm) · [Automatic app username updates](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-auto-update-app-username.htm)
