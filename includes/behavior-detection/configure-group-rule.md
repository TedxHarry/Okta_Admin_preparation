## Lab 2 · Configure a group-scoped behavior rule { #lab-2 }

Complete Lab 1. Use a dedicated app sign-in policy in your lab org. A working test app from the SAML lessons is suitable. If you use the **Okta Dashboard** policy, use an isolated org and verify the policy's app scope before any edits. Use the same app for Labs 2–4. Keep the existing policy and application association available for cleanup.

=== "Define the signal and attach the policy"

    1. Open **Security → Behavior Detection → Add Behavior → Device**. Create a named behavior `BD Lab New Device` with **Evaluate against past** set to `20`. Save and confirm it is active. The rule will reference this exact name.
    2. Open **Security → Authentication Policies → App sign-in → Create policy**. Name the policy `BD Lab App Policy`. A new policy normally starts with a Catch-All Rule that allows any two factor types. Open **Rules** and record the actual requirements before making changes.
    3. Record the test app's original policy. On the lab policy's **Applications** tab, choose **Add app** and attach the test app. If the app requires switching policies, locate it on the original policy's **Applications** tab and use **Switch policy**, or consult the app's **Sign On** view for the applicable policy controls. Confirm the lab policy now lists the intended app. For the Dashboard route, use its dedicated policy listed under **Authentication Policies → App sign-in** and record its existing rules. Avoid editing a policy shared with unrelated apps.
    4. Verify both test users can reach the same app entry point. For a regular test app, grant app assignment to both users, for example through `BD Lab Learners`. Use the test app's actual sign-in entry point or tile when testing. For the Dashboard route, use the end-user sign-in URL. Keep the control outside `BD Lab Step-Up`.

=== "Set the group, expression, and action"

    1. In the selected policy, open **Rules → Add rule**. Name it `BD Lab Step-Up on New Device`.
    2. In **User's group membership includes**, select `BD Lab Step-Up`. Keep other scope conditions at their broad defaults for this lab. In **The following custom expression is true**, enter:

        ```text
        security.behaviors.contains('BD Lab New Device')
        ```

    3. Set **Access is** to **Allowed after successful authentication**, and **User must authenticate with** to **Password + Another factor**. Keep a Push-capable authenticator eligible. If your org exposes per-authenticator restrictions, confirm Okta Verify is allowed. Set the other-factor reauthentication frequency to **Every sign-in attempt** where the selected configuration offers it. Record the password reauthentication setting as well. In the test, choose Push explicitly if Okta offers other eligible methods.
    4. Save. Verify the rule is active and above the Catch-All Rule. If an existing earlier rule can match the same test users, move the lab rule above it in the isolated policy or use a dedicated policy with only the lab rule and fallback. Reopen the rule and read the saved group, expression, and authentication requirement.
    5. If the field is absent or the expression is rejected, check Adaptive MFA, the policy type, the behavior name and active status, and your permissions. Keep the expression in this app policy. A global session behavior rule controls the Okta session and will not validate the group-scoped app rule required in this exercise.

**Evidence to save for practice:** the active behavior, the attached app, the rule's group and expression, the authentication settings, and the saved priority order.

[Add device behavior](https://help.okta.com/oie/en-us/Content/Topics/security/behavior-detection/device-behavior-detection.htm) · [Assign an app to a policy](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/share-auth-policies.htm) · [Add a behavior condition](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm) · [Set Up an Authentication Policy](https://www.youtube.com/watch?v=fQLrgwg7mn4)
