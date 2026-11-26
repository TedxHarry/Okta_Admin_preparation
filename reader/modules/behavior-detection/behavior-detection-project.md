# Behavior Detection capstone · Roll out and verify step-up authentication

Set up mobile Okta Verify, require an additional factor for a pilot group when Okta detects a new sign-in device, and set a password fallback for the isolated test app. Run both branches, prove what happened in the System Log, then diagnose and repair a group-scope fault. This guided project covers the four Behavior Detection configuration tasks in the [Okta Administrator Performance Exam study guide](https://certification.okta.com/page/administrator-performance-exam-study-guide).

Use an isolated Okta Identity Engine org, a phone with Okta Verify, and a separate admin browser session. Confirm **Security → Behavior Detection** is available and **Security → Authentication Policies → App sign-in** exposes **The following custom expression is true** in an app rule. Adaptive MFA is required for the behavior condition. If the editor is unavailable, complete mobile enrollment and open the **Read a sign-in investigation offline** tab in the [practice cases](practice-use-cases.md) for log practice. [Okta prerequisites](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm)

| Object | Lab value |
| --- | --- |
| Test users | Two active native Okta accounts with usable passwords. Use one as **Member** and one as **Control**. |
| Enrollment group | `BD Project Learners` contains both users. |
| Step-up group | `BD Project Step-Up` contains only Member. Keep your admin outside both groups. |
| App | Use the Okta Dashboard in a disposable org with its dedicated policy, or an assigned test app with its own direct sign-in entry point and dedicated policy. |
| Behavior and rule | `BD Project New Device` and `BD Project Device Step-Up`. |

=== "1. Set up users and mobile Push"

    1. In **Directory → People → Add Person**, create Member and Control and complete activation if required. In **Directory → Groups**, create the two lab groups and add the users as shown above. Open both groups to check the membership. For a separate app, open **Applications → Applications → test app → Assignments** and assign it to **BD Project Learners**.
    2. Open **Security → Authenticators → Setup → Okta Verify** and confirm that mobile QR enrollment and Push are available. Under **Enrollment**, create **BD Project Enrollment** for **BD Project Learners**. Keep Password available and set Okta Verify to **Required** with no grace period. Place the scoped policy ahead of a broader matching enrollment policy if needed.
    3. Open the end-user sign-in page as Member in a regular browser profile reserved for that user. At the Okta Verify prompt select **Set up**. On the phone, select **Add account → Organization**, scan the browser's QR code, and allow notifications. If you already reached the Dashboard, use **Settings → Security Methods** to find the setup action. Verify that Okta Verify appears for the intended test account. Repeat in a different regular profile for Control. Keep the two accounts labeled clearly on the phone.
    4. Keep both regular browser profiles and their site data for later testing. If the existing app rules already offer Push, choose it and complete the request you initiated, including the number challenge if shown. Otherwise complete the Push verification in Phase 4.

    [Mobile enrollment paths and Push troubleshooting](hands-on-labs.md#lab-1) · [Okta Verify options](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-okta-verify-options.htm)

=== "2. Create the behavior and rule"

    1. Go to **Security → Behavior Detection → Add Behavior → Device**. Name it **BD Project New Device**. Set **Evaluate against past** to **20**, save, and confirm the definition is active.
    2. In **Security → Authentication Policies → App sign-in**, open the dedicated Dashboard policy, or create **BD Project App Policy** for the separate app. For the separate app, record its original policy and attach it through the lab policy's **Applications** tab, or use **Switch policy** from the current association. Verify that the chosen policy lists only the intended test target. Record its existing rule order, fallback, and app entry URL.
    3. Open **Rules → Add rule** and name it **BD Project Device Step-Up**. Under **User's group membership includes**, select **BD Project Step-Up**. Under **The following custom expression is true**, paste:

        ```text
        security.behaviors.contains('BD Project New Device')
        ```

    4. Set **Access is** to **Allowed after successful authentication**, then set **User must authenticate with** to **Password + Another factor**. Keep Okta Verify Push eligible. Choose **Every sign-in attempt** for the additional factor where offered. Save and reopen the rule to verify its exact group and expression. Put the rule above the Catch-All Rule and above any earlier rule that would match the same pilot user first.

    [Group-scoped rule lab](hands-on-labs.md#lab-2) · [App behavior conditions](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm)

=== "3. Modify the Catch-All Rule"

    1. In the test app policy's **Rules** tab, open the **Catch-All Rule**. Record its original access decision, factor requirements, and reauthentication settings. Set **Access is** to **Allowed after successful authentication** and **User must authenticate with** to **Password**. Keep the existing reauthentication setting unless the task specifies one. Save, reopen, and confirm the password fallback and unchanged step-up priority.
    2. In **Security → Global Session Policy**, check the policy and session rule that apply to the test users. Record any existing session MFA requirement. A test can select the app's password fallback and still prompt because of that session rule. Compare the app rule in the log in either case. To isolate the prompts in a disposable lab org, follow the [lab's scoped session-policy option](hands-on-labs.md#lab-3).
    3. In the two regular browser profiles, sign in successfully to the same test target. For a separate app, start at its own sign-in page and follow the redirect to Okta. For Dashboard, use its end-user sign-in URL. This seeds the familiar browser baseline and confirms both users can reach the target.

    [App sign-in rules](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm)

=== "4. Run the sign-in comparison"

    Keep the app, network, and enrolled phone fixed. Sign out of the app and Okta after each run. Start each unfamiliar-browser attempt directly from the recorded target URL. A successful sign-in to another Okta app from the new profile can make that browser familiar before you reach the target. Open each test below and write down its time, user, prompt, and result.

    === "Member · Familiar"

        Use Member's regular browser profile and leave its site data in place. Sign in to the target. Look for `NEGATIVE` for **BD Project New Device** and selection of the **Catch-All Rule**. Record any separate session prompt if present.

    === "Member · Unfamiliar"

        Open the target in a different regular browser profile that Member has never used in this org. Look for `POSITIVE` and selection of **BD Project Device Step-Up**. When asked for another factor, choose Okta Verify Push and approve the request you just started. Keep this profile for the repeat test.

    === "Control · Unfamiliar"

        Start from a fresh profile for Control. Look for a changed context and verify the **Catch-All Rule** applied. Even a positive behavior result falls through when the user is outside **BD Project Step-Up** and no earlier rule applies.

    === "Member · Repeat"

        Return to the profile Member used for the successful unfamiliar test. Preserve site data and start a fresh sign-in. Check whether the named behavior is now `NEGATIVE` and the fallback applies. If it remains positive, check whether the browser retained its site data and compare the actual events.

    [Device detection and browser context](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/improved-new-device-behavior-detection.htm)

=== "5. Prove the match and repair a fault"

    1. In the admin browser, open **Reports → System Log**. Narrow the time range to a test run and paste this filter with the actual test username:

        ```text
        actor.alternateId eq "lab-member@example.com" and (eventType eq "policy.evaluate_sign_on" or eventType eq "user.session.start" or eventType eq "user.authentication.auth_via_mfa")
        ```

    2. Open the matching policy evaluation and session-start events. In **DebugContext → DebugData → Behaviors**, when present, find **BD Project New Device** and record its status. In the policy event's **Target**, identify the app policy and selected rule where shown. Check the matching user's successful verification event for `factor` or `factorType` with value `push`. Correlate by time, actor, and transaction or session ID when available.
    3. In **Directory → Groups → BD Project Step-Up → People**, remove Member from the step-up group. Keep the enrollment group intact. Start from another unfamiliar profile and confirm the app now falls through despite a positive device result. Add Member back to the step-up group. Use a different unused profile for the retest and verify a positive result reaches the step-up rule and completes Push.
    4. If your result differs, open the matching symptom and follow the check before changing any other setting.

    ??? note "Positive behavior but the fallback matched"

        Verify the target app is attached to the intended policy, then check the saved rule priority, Member's group, and the exact name of the active behavior in the expression. Correct the mismatch. Retest using a fresh profile and confirm the app rule in the policy event.

    ??? note "Both tests asked for another factor"

        Compare the app rule in each event. If the familiar run selected the Catch-All Rule, inspect its saved factor requirement and the applicable global session and enrollment requirements. Use the app rule evidence to compare branches even if both browser runs showed prompts.

    ??? note "The log shows UNKNOWN or BAD_REQUEST"

        For `UNKNOWN`, collect successful sign-ins with usable context, then retry from a familiar profile and a new one. For `BAD_REQUEST`, check whether the sign-in provided usable device context and retry from a supported regular browser. Use the policy event to see which rule actually applied.

    ??? note "The policy challenged but Push is unproven"

        Check that the user chose Push and that Okta Verify shows the correct test account with notifications allowed. Find the correlated successful verification event. A Push dispatch or a successful code verification alone does not establish that the user completed Push.

    [System Log behavior outcomes](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/logs-behavior-detection.htm) · [Policy event catalog](https://developer.okta.com/docs/reference/api/event-types/) · [Find factor details](https://support.okta.com/help/s/article/how-to-locate-factor-information-in-okta-system-log)

=== "6. Extend the test or restore"

    1. To continue, keep the working policy and run the [guided New IP, AND/OR, and behavior history lab](hands-on-labs.md#lab-5). Use a disposable account for the history reset because it clears that user's recorded behavior history.
    2. When finished, restore the original Catch-All settings and rule order if you edited the dedicated Dashboard policy. Remove the project rule. For a separate app, move it back to its original policy and delete the now-unused lab policy. Remove the project behavior after removing policies or rules that reference it.
    3. Remove the project enrollment and temporary global session policies if created. Restore any authenticator settings you changed. Remove test app assignments, groups, and disposable users you no longer need. Remove the corresponding test accounts from Okta Verify on your phone.
    4. Use your separate admin session to check the restored app association and policy settings. Verify with a fresh sign-in from an account that should have access under the restored policy. Keep only sanitized notes for review.

[All Behavior Detection labs](hands-on-labs.md) · [Independent practice cases](practice-use-cases.md) · [Exam objectives and official reading](source-and-lab-plan.md)
