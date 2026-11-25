## Lab 5 · Compare New IP and New Device, then reset behavior history { #lab-5 }

Use the isolated app policy, test member, and sign-in entry point from Labs 1–4. Complete this optional lab before cleanup. Record the working device-only expression and verify the fallback still applies to nonmatching requests.

=== "Compare OR and AND"

    1. Open **Security → Behavior Detection → Add Behavior → IP**. Name the behavior `BD Lab New IP`, set **Evaluate against past** to `50`, and save. Confirm it is active. Keep the device behavior from Lab 2.
    2. Complete a successful sign-in from the member's familiar browser and usual network. In the System Log, verify Okta observed the expected public IP. Before comparing the operators, confirm a fresh attempt on that network reports `NEGATIVE` for the named IP behavior. If the signal is unavailable or changes unexpectedly, use the offline comparison below.
    3. Edit the custom expression on the existing group-scoped step-up rule. Keep the group and authentication requirements. Save the OR expression:

        ```text
        security.behaviors.contains('BD Lab New Device') || security.behaviors.contains('BD Lab New IP')
        ```

        Sign in directly to the target from a fresh browser profile on the familiar network. When the device behavior is positive and the IP behavior is negative, expect the step-up rule. Verify the actual signal values and rule in the log.

    4. Change only the operator to AND and save:

        ```text
        security.behaviors.contains('BD Lab New Device') && security.behaviors.contains('BD Lab New IP')
        ```

        Repeat with a different unused browser profile on the same familiar network. With the same one-positive, one-negative signal pattern, expect the Catch-All Rule. The browser from the first successful test can already be familiar. Verify both signals again before comparing the results.

    5. If you have another trusted network with a different public IP the member has never used, try a fresh sign-in from the familiar browser on that network. Check whether the IP behavior is positive and the device behavior remains negative. Under AND, that combination should also fall through. Record the actual results if the network or browser signal differs from your expectation.

    | Observed input for the member | Expected app rule with OR | Expected app rule with AND |
    | --- | --- | --- |
    | Device matches, IP does not match | Step-up rule | Catch-All Rule |
    | IP matches, device does not match | Step-up rule | Catch-All Rule |
    | Both match | Step-up rule | Step-up rule |
    | Neither matches | Catch-All Rule | Catch-All Rule |

    Use this table as the offline comparison if you cannot control the sign-in context. It assumes no earlier rule applies and both conditions produce a usable result. Restore the device-only expression and confirm that it saved before making the custom IP behavior inactive or deleting it. [Add IP behavior](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/ip-behavior-detection.htm) · [Behavior expressions](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/about-behavior-policy-rule.htm)

=== "Reset one disposable user's history"

    1. Use the disposable lab member after you finish the other sign-in tests, or use a separate enrolled disposable user in the same test groups. Verify the account can sign in and capture a familiar-context behavior result. Keep the admin session and the user's enrolled phone available.
    2. In the Admin Console, go to **Directory → People**. Select that user and use **More Actions → Reset Behavior Profile**. This clears that user's tracked behavior history. It leaves the app rule and enrollment configuration in place. Confirm you selected the intended disposable user before resetting.
    3. Start a fresh sign-in from the same browser and network. Record which behavior statuses, policy decision, and challenge Okta actually reports. A reset removes the familiar baseline, so avoid assuming the log must show a particular status on the first attempt.
    4. Complete successful sign-ins with usable context, then repeat the familiar comparison. Keep the browser data between attempts. Record how the evidence changes as Okta rebuilds the history. If it remains unavailable, document the observed status and the remaining missing evidence.

    [Reset a user behavior profile](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/reset-behavior-detection.htm) · [Manage behavior settings](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/manage-behavior-detection.htm)
