## Lab 9 · Verify groups across apps, policies, and governance { #lab-9 }

Investigate two sign-in attempts for the same app. Identify the failing layer, correct the test configuration, and capture evidence that the fix worked.

### Set up the test

Use an isolated Okta Identity Engine org, a dedicated SAML or OIDC test app that you can already launch successfully, and an admin who can manage the app and authentication policies. Use two active non-admin test users with enrolled authenticators that meet the app’s baseline policy. Keep separate admin and user browser profiles. If you lack a working federated test app or policy permissions, start with [Investigate the sample access ticket](#lab-9-ticket).

| Lab object | Purpose |
| --- | --- |
| `Lab-GR9-App` | Okta group that supplies the app assignment. Both **A** and **B** belong to it. |
| `Lab-GR9-Scope` | Okta group used only in the test policy. **A** is in scope. **B** is the control and stays outside. |
| `Lab-GR9-Policy` | Dedicated app sign-in policy for the disposable integration. |
| `Lab-GR9-Block` | Temporary rule that denies requests from members of the scope group. |

### 1. Verify a working baseline

1. In **Directory → Groups → All → Add group**, create the two groups and use **Assign People** to set the listed memberships.
2. Open the test app’s **Assignments → Assign → Assign to Groups** and assign only `Lab-GR9-App` from the lab. Verify both users in **Assignments → People**. If the app requires downstream accounts, confirm both exist first.
3. In each user’s browser profile, sign in and launch the app. Confirm both users can reach the target. Record the app name, two usernames, and attempt times. Resolve any baseline assignment or sign-in issues before continuing.

### 2. Create and verify a scoped denial

1. Go to **Security → Authentication Policies → App sign-in → Create policy**. Name it `Lab-GR9-Policy`. Record the test app’s current policy so you can restore it. In the new policy’s **Applications → Add app** view, attach just the disposable integration. Keep the new policy’s catch-all at its default two-factor requirement and confirm both users satisfy it before adding the test rule.
2. In the policy’s **Rules** tab, click **Add rule**, name it `Lab-GR9-Block`, and set **User’s group membership includes** to `Lab-GR9-Scope`. Leave unrelated conditions at their defaults. Under **THEN**, set **Access is** to **Denied** and save. Verify the rule is above the catch-all.
3. Start fresh sign-ins in separate browser profiles and launch the app again. Expect A’s attempt to match the deny rule and B’s attempt to proceed under the catch-all after satisfying authentication. Keep both users’ memberships in the app assignment group unchanged.
4. In **Reports → System Log**, set the time range around both tests and search for `eventType eq "policy.evaluate_sign_on"`. Open the entries corresponding to each user and app attempt. Record the policy context, rule and outcome when present. For B, a challenge can appear before the successful launch. Correlate by user, time, and app or target details.

[Create an app sign-in policy](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/create-auth-policy.htm) · [Assign an app to a policy](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/share-auth-policies.htm) · [Add a rule](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm)

### 3. Rule out a cause, correct the test, and retest

1. Test the hypothesis “A lost the app assignment.” Confirm A still belongs to `Lab-GR9-App` and appears in the app’s **People** view. Record the matching deny event and explain which evidence ruled out assignment loss.
2. Remove A from the temporary `Lab-GR9-Scope` group and verify A still has the app assignment. Repeat A’s sign-in in a fresh session. Verify the catch-all now applies and A reaches the app.
3. Record the starting symptom, the ruled-out hypothesis, the rule responsible, the change, and both before-and-after outcomes. If A can now sign in but lacks a role inside the target, check the downstream account and permissions as a separate issue.

### 4. Investigate the sample access ticket { #lab-9-ticket }

These records are simulated. Use them if you cannot run the live exercise, or as a second investigation after the live exercise.

| Evidence | Observation |
| --- | --- |
| Membership and assignment | A and B both have the app through `Lab-GR9-App`. Only A is in the policy scope group. |
| Target accounts | Both accounts exist and are active. |
| A’s app attempt | The app’s policy records **DENY** on the scoped rule. |
| B’s app attempt | The catch-all allows access after authentication. B reaches the target. |
| Separate target permission check | A later sign-in by user A succeeds after the policy change. The target app still reports “reporting role required.” |

1. State the failed hypothesis about the first incident and which records disprove it.
2. Explain the scoped denial and choose the evidence you would collect on retest.
3. For the later incident, identify the target role and membership records you would inspect.
4. Compare two separate policy examples. First, a scoped Behavior Detection rule matches only when a new-device signal is positive. B has a positive signal and remains outside the group. Second, a scoped Device Assurance rule requires a registered device with a minimum OS version. A is in scope but uses a registered device below that version. Identify which rule each user can fall through to, and explain why the fallback matters.

<details class="revision-answer">
<summary>Show the investigation answers</summary>
<ol>
<li>Both the group record and app People view show that A retains the assignment. The active target account also rules out a missing account in this ticket.</li>
<li>The group-scoped rule denies A. On retest, compare the group scope, the evaluated rule, its outcome, and the resulting app launch with the original attempt.</li>
<li>Inspect the target user’s reporting role and group membership. If a pushed group supplies the role, check its mapping and the target member list.</li>
<li>B misses the behavior rule because the group condition fails. A misses the assurance rule because the device condition fails. Both continue to later rules in their respective policies. The catch-all can allow, challenge, or deny based on its configuration.</li>
</ol>
</details>

### Optional practice · Verify a governance display name

If your org has Okta Identity Governance, open a disposable Okta-sourced group’s **Profile → Edit**. Set **End User Display Name** to **Lab Reporting Access** and describe the intended access in **End User Display Description**. Use an active request condition that references the group, or configure reviewer context in a disposable certification. Verify the visible label and compare it with the original group ID in **Directory → Groups**. For Access Requests, use the documented re-enable procedure if you need to refresh a test condition immediately. Restore the original display values and remove the test condition when finished.

[Update group profile attributes](https://help.okta.com/oie/en-us/content/topics/identity-governance/update-default-group-profile-ar.htm)

### Reset the lab

Switch the test app back to its original app sign-in policy. After verifying the original policy applies again, remove the disposable policy and its rule. Remove the lab assignment and test groups. Keep the test accounts and target integration if you plan to reuse them for the capstone.
