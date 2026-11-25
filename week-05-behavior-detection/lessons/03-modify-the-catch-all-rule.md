# Lesson 3 · Modify the Catch-All Rule

=== "Theory"

    The **Catch-All Rule** describes what happens when an app sign-in attempt reaches the end of the app policy without matching an earlier rule. It provides the baseline authentication requirement for the requests that reach it. Okta starts a new app sign-in policy with a Catch-All Rule that allows access after any two factor types. An existing app policy may have a different configuration, so inspect it before making an exam task change.

    ## Predict the result before saving

    Read the selected app policy from top to bottom. The first matching rule applies. The result of evaluating the behavior and the factor requirement are separate. Keep the group-specific rule above the fallback. When the rule condition fails, continue reading until another rule applies. An earlier broad rule can intercept traffic a later rule was meant to handle.

    | Request that reaches the app policy | App-rule selection in the two-rule setup |
    | --- | --- |
    | Target group and behavior expression true | The earlier behavior rule supplies the requirement. |
    | Target group and expression false | The Catch-All Rule supplies the requirement. |
    | Outside the target group | The Catch-All Rule supplies the requirement regardless of the behavior expression. |

    ## Know how far the change reaches

    App policy association controls which apps inherit the fallback. App assignment controls which users receive a given app. Group membership in a rule controls which of those sign-in requests the rule matches. A change to the shared fallback affects every app using the policy for requests that reach that rule. The **Applications** tab shows the apps that use the policy. The **Rules** tab shows the order and what each matching request requires.

    **Reauthentication** means asking the user for fresh proof when a rule says earlier proof is too old or cannot be reused. Enforcement depends on the matched app rule, the applicable global session policy, and proof already present in the session. A password-only app fallback may still be reached after a global session rule has required MFA. Look at the app rule and the session event before treating a visible prompt as evidence about the fallback.

    Locate the exact app policy and examine its Catch-All Rule before changing it. Capture the original access decision, factor requirements, and reauthentication settings. After saving, reopen the fallback and the earlier behavior rule to check both the result and priority. Then verify from fresh sign-in attempts that reach each branch.

    [Create an app sign-in policy](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/create-auth-policy.htm) · [Assign apps to a policy](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/share-auth-policies.htm) · [Authentication scenarios](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/asop-authentication-scenarios.htm)

=== "Hands-on Lab"

    --8<-- "edit-catch-all.md"

=== "Revision"

    | Question | Find the answer in |
    | --- | --- |
    | Which apps receive the fallback change? | The policy's Applications tab |
    | Which request reaches the fallback? | The policy's ordered rules |
    | Why is the user still asked for another factor? | The matched app and global session rules and the user's authentication context |

    ??? question "1. What happens to a request that already matched the earlier behavior rule?"

        The earlier rule supplies the authentication requirement. Okta reaches the fallback only for requests that skip all earlier rules.

    ??? question "2. Can an app's password-only fallback erase MFA required by a global session rule?"

        The global session requirement still applies. Compare the session and app policy evaluations to see which rule caused the prompt.

    ??? question "3. What do you inspect before editing the fallback?"

        Verify the policy's app associations, rule order, and existing access and authentication settings.
