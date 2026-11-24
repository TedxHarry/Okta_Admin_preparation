## Lab 8 · Send and verify SAML attributes and WS-Federation claims { #lab-8 }

Configure two claims, assign the app through a group rule, and verify the result at the receiver. If you lack a live receiver, use the sample evidence at the end.

### Prepare the test records and receiver

Use a disposable Okta Identity Engine org and a SAML service provider you control. Obtain its ACS URL, audience or entity ID, supported NameID format, and test account-matching requirements. Use only synthetic test profile values. Prepare two active default-type users and a native Okta group named **Lab M3 SAML Support**.

| User | Department | Custom Cost Center | Expected group membership |
| --- | --- | --- | --- |
| Assigned test user | `Lab-Support` | `CC-104` | Member after the rule runs |
| Control user | `Lab-Training` | `CC-900` | Outside the group |

In **Directory → Profile Editor → Okta User (default)**, add an optional string field **Lab M3 Claim Cost Center** with variable name `labM3ClaimCostCenter`. Set both users’ test values under **Directory → People**. Record any original values you changed.

### 1. Create and assign a SAML app

1. In **Applications and Resources → Applications → Create App Integration**, select **Classic experience** if offered and choose **SAML 2.0**. Name the app **Lab M3 SAML Claims**.
2. Enter the receiver’s ACS in **Single sign-on URL** and its entity ID in **Audience URI (SP Entity ID)**. Configure NameID and application username to match your test receiver. Use **Preview the SAML Assertion** if available to inspect the wizard’s XML. Finish the app setup.
3. Configure the receiver with the app’s Okta identity provider metadata, or its issuer, endpoint, and signing certificate according to the receiver’s requirements.
4. In **Directory → Groups → Rules → Add Rule**, create a basic Department equality condition for `Lab-Support` and assign **Lab M3 SAML Support**. Preview both users, save, and activate the rule. Verify the assigned test user joins while the control stays outside.
5. In the SAML app’s **Assignments → Assign → Assign to Groups**, assign only **Lab M3 SAML Support**. Verify both users’ assignment status using the group and the app’s People view.

### 2. Map the fields and verify the claims

1. Where the app profile supports editable properties, open **Directory → Profile Editor → Apps → Lab M3 SAML Claims**. Add optional app-profile strings with variable names `labM3AppDepartment` and `labM3AppCostCenter`. Under **Mappings → Okta User to App**, map `user.department` and `user.labM3ClaimCostCenter` to their respective destinations. Preview the assigned user, save, apply to the disposable app, and verify the two values on the assignment profile if available.
2. In **Sign On → Attribute Statements → Add expression**, add `department` with `user.profile.department` and `costCenter` with `user.profile.labM3ClaimCostCenter`. If the app exposes the legacy editor for your exercise, the equivalent direct user expressions are `user.department` and `user.labM3ClaimCostCenter`. To test the app-profile path in the legacy editor, use the mapped `appuser.labM3AppDepartment` and `appuser.labM3AppCostCenter` values in place of the direct expressions. Use one statement per emitted name.
3. Sign in as the assigned test user in a fresh browser session and launch the app. Use the receiver’s diagnostics or an approved local SAML tracer to inspect the test assertion. Verify NameID and the values `department = Lab-Support` and `costCenter = CC-104`. Record what the app actually consumed.
4. Check the unassigned control user in their own Dashboard session and in the app assignment list. Keep the control outside the app.
5. Clear Cost Center on the assigned user and run a fresh sign-in using the direct user claim. Inspect whether the empty claim is omitted. Restore `CC-104` and verify it returns in a new assertion. If you used an app-profile expression instead, inspect whether the mapped app user value actually cleared before predicting the claim.

### 3. Read a sample WS-Federation response

This is simulated evidence for a Template WS-Federation integration. The receiver expects `https://lab.example.com/wsfed` as its realm and audience, `https://lab.example.com/wsfed/callback` as ReplyTo, and a claim named `costCenter`.

| Checkpoint | Example evidence |
| --- | --- |
| Okta user profile | Cost Center is `CC-104`. |
| SAML response from the separate lab app | `costCenter = CC-104` is present. |
| WS-Fed response | Correct audience and subject. Claim name is `cost_center`, value is `CC-104`. |
| WS-Fed receiver | Sign-in succeeds. Its `costCenter` field is blank. |

<details class="revision-answer">
<summary>Show the expected finding</summary>
<p>The first mismatch is the WS-Fed claim name. Compare the Template WS-Federation attribute statement with the receiver’s expected name and update the test mapping to match the agreed contract. Retest with a fresh response and verify what the receiver consumed.</p>
</details>

### Reset the lab

Restore the original test profile values. Remove the disposable app assignment and disable the lab rule before retiring the app and group. Remove custom lab fields after checking their references. Keep only the claim names and synthetic test values needed for your notes.

[Create a group rule](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Map attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes.htm) · [Configure SAML claims](https://help.okta.com/oie/en-us/content/topics/apps/federated-claims-overview.htm) · [Configure Template WS-Federation](https://help.okta.com/en-us/Content/topics/apps/apps_configure_okta_template_ws_federation.htm)
