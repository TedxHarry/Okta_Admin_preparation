## Lab 4 · Test the policy and prove it in the System Log { #lab-4 }

Complete Labs 1–3. Use one app entry point, one network for the browser comparison, and the same test member. Let earlier successful sign-ins establish familiar context in the regular browser profile. Sign out of Okta and the app as applicable before each fresh attempt. Keep the ordinary browser profile and its site data between familiar tests. Use a different browser or a new browser profile for the changed test. Private mode can change the cookie context each time and is a poor familiar control.

=== "Run the sign-in matrix"

    | Test | What to do | What to verify |
    | --- | --- | --- |
    | Member, familiar browser | Reuse the regular profile from enrollment after signing out. Complete a fresh sign-in to the target app. | Look for `NEGATIVE` for the named behavior and the Catch-All Rule. The app fallback requires password. An additional session or enrollment prompt can still occur. |
    | Member, unfamiliar browser | Open the same app from a browser or profile that this member has never used for this org. Use the same network. When prompted for another factor, select and approve Okta Verify Push. | Look for `POSITIVE`, selection of the group-scoped app rule, and evidence of successful additional verification. Record what actually happened. |
    | Control, unfamiliar browser | Use a new profile for the control. Confirm the user can reach the app and is outside `BD Lab Step-Up`. | The behavior may be `POSITIVE` for this user too. The app falls through because the membership condition fails. Verify which rule matched. |
    | Member, repeat browser | Sign out and try the member again from the browser used successfully in the unfamiliar-browser test. Preserve its site data. | Check whether the context is now familiar and the fallback applies. If Okta still sees a change, compare the actual behavior result and whether the client identifier persisted. |

    Note the user, app, time, browser, network, prompt, and sign-in outcome for each run. Treat the table as expected evidence under the configured test conditions. If a first attempt returns `UNKNOWN`, collect successful sign-ins with usable context and repeat the comparison. If it returns `BAD_REQUEST`, inspect the signal for the attempt and retest from a standard supported browser. A prompt by itself does not establish the behavior result.

=== "Read the events and diagnose a mismatch"

    1. In the admin session, open **Reports → System Log**. Restrict the date range to the test and search by username plus relevant event types. In the advanced search field you can start with this filter, substituting the actual test user's login:

        ```text
        actor.alternateId eq "lab-member@example.com" and (eventType eq "policy.evaluate.sign_on" or eventType eq "user.session.start" or eventType eq "user.authentication.auth_via_mfa")
        ```

    2. Expand the matching `policy.evaluate.sign_on` and `user.session.start` records. Under **DebugContext → DebugData**, inspect **Behaviors** where present and look for the named condition. In policy events, inspect **Target** and **Outcome** to identify which policy or rule Okta evaluated, when those details are present. Read the matching authenticator verification record and its details for the method used. If events are sparse, search the username and time without the event-type filter. Compare app and session targets before connecting events, using the transaction or session identifiers when present.
    3. Record one matching behavior run and one fallback run. Separate the behavior result, app rule, prompt actually seen, and successful authenticator verification. If the member matched the fallback on a `POSITIVE` run, inspect the app attachment, rule order, exact behavior name, active status, and membership. If both runs show Push, inspect the Catch-All requirement, global session MFA, existing authentication, and enrollment prompts.
    4. To practice fault isolation, temporarily remove the member from `BD Lab Step-Up` in the lab. Use a new browser profile to observe the fallback despite a changed device signal when the condition evaluates positive. Restore the membership and use another fresh profile to produce a comparable change. Verify that the group rule applies again. A previously successful unfamiliar profile can already be known by the time you retest it.

=== "Restore the lab"

    If you are going straight to the practice use cases, retain only the lab users, phone enrollments, and named groups you plan to reuse. For a complete reset, restore an edited policy's recorded settings or reattach the app to its original policy. Remove the lab rule before deleting a behavior it references. Remove the temporary global session policy and enrollment policy if you created them, then remove test assignments and dispose of the test users and their phone enrollments when no longer needed. Verify a fresh sign-in follows the intended restored policy.

[Behavior Detection System Log events](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/logs-behavior-detection.htm) · [System Log filters](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm)
