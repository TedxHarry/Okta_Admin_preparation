# Lesson 2 · Configure a group-scoped behavior rule

=== "Theory"

    ## What makes a sign-in new?

    Okta evaluates familiar context over a recent history, with the window depending on the behavior type. A context can become unfamiliar again when it falls outside that window. Okta tracks sign-in events with distinct session context, so repeatedly opening an app in the same session is a poor way to build history or test a context change.

    | Behavior type | What Okta evaluates | Documented default |
    | --- | --- | --- |
    | New City | Whether the inferred city appears in the user's recent successful sign-ins. | 20 successful sign-ins |
    | New State | Whether the inferred state or region appears in that history. | 15 successful sign-ins |
    | New Country | Whether the inferred country appears in that history. | 10 successful sign-ins |
    | New Geo-Location | Whether the estimated location is outside the configured radius of the locations in that history. | 20 successful sign-ins, 20 km radius |
    | New Device | Whether the browser or other sign-in client is familiar. A browser the user has never used for Okta sign-in can register as new on the same physical computer. | 20 successful sign-ins |
    | New IP | Whether the public IP address Okta sees appears in the user's history. | 50 successful sign-ins |
    | Velocity | The apparent travel speed inferred from distance and elapsed time between two successive sign-in attempts. | 805 km/h (500 mph) |
    | New ASN | Whether the autonomous system number appears in the user's history. An **ASN** identifies a network that advertises routes on the internet. | 50 successful sign-ins |

    Administrators can tune a behavior's history window or threshold where the type supports it. You can create more than one named behavior of the same type. Look in **Security → Behavior Detection** to see the active definition and its exact name. The type describes what is measured. The name identifies the definition the rule references. Okta lists `New IP`, `New Device`, `New Location`, `New Velocity`, and `New ASN` as default names available to security expressions.

    Location comes from IP geolocation, so a VPN exit, mobile network, or a change in routing can affect the location Okta observes. A changed browser and a changed network are separate inputs. **Risk scoring** evaluates several signals together and returns a risk level. A particular behavior result alone does not tell you the overall risk level. **Device Assurance** checks a device against stated requirements such as an operating system version. A browser recognized by Behavior Detection can still fail a Device Assurance requirement. See [behavior types](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/type-behavior-detection.htm), [behavior names and expressions](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/about-behavior-policy-rule.htm), and [risk and behavior evaluation](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-risk-behavior-eval.htm).

    ## How does the rule select an authentication requirement?

    In an **app sign-in policy**, the app determines which policy applies. Within that policy, rule priority determines the order Okta checks the rules. The first matching rule supplies the authentication requirement. Put the behavior rule above the **Catch-All Rule**, the final fallback for requests that match none of the earlier rules. Read the existing fallback before changing it. Its requirements apply to every request that reaches it for any app sharing that policy.

    A group-scoped app rule has two independent requirements. **User's group membership includes** selects the group. **The following custom expression is true** tests the sign-in behavior. Okta requires Adaptive MFA for app sign-in behavior conditions. Enter the exact name of an active behavior in the security expression. Keep the action focused on additional authentication. Okta documents Behavior Detection as a way to require MFA and does not support denying access solely because a behavior changed.

    ```text
    security.behaviors.contains('New Device')
    ```

    The expression checks whether `New Device` appears in `security.behaviors`, the list of matching behavior names for the app sign-in request. The System Log can separately record a behavior evaluation status such as `UNKNOWN` or `BAD_REQUEST`. Use the recorded policy evaluation to identify the rule that applied. [Okta Expression Language in Identity Engine](https://developer.okta.com/docs/reference/okta-expression-language-in-identity-engine/#security-context) In the same expression, `||` means either condition may satisfy the expression and `&&` means both must satisfy it. Group membership is still required if the rule specifies a group. The expression and the group condition each have to match.

    | Group membership | Behavior expression | Rule selection if no earlier rule matched |
    | --- | --- | --- |
    | In the target group | True | The group-scoped behavior rule supplies the authentication requirement. |
    | In the target group | False | Okta continues to the next rule, eventually reaching the Catch-All Rule if nothing else matches. |
    | Outside the target group | True or false | This group-scoped rule is skipped. Okta continues through the remaining rules. |

    The **Global Session Policy** has its own behavior condition, **And Behavior is**, for the Okta session rule. Use the app sign-in rule to control proof for access to a particular app. Use the session rule to control proof when establishing the Okta session. Okta's global session guidance says to use **At every sign in** for a behavior-based MFA rule and to avoid combining a behavior condition with per-device or per-session MFA. Check both policy layers when a prompt appears regardless of the app rule.

    See [add a behavior condition to an app sign-in rule](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm), [app sign-in rule priority and conditions](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm), [global session rule settings](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/add-okta-sign-on-policy-rule.htm), and [Behavior Detection and evaluation](https://help.okta.com/oie/en-us/Content/Topics/Security/proc-security-behavior-detection.htm).

    ## Configuration fields by behavior type

    Open **Security → Behavior Detection → Add Behavior** and select the type. Give each definition a name you can recognize in the rule and log.

    | Type | Fields that control evaluation |
    | --- | --- |
    | [Location](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/location-behavior-detection.htm) | Set **Location granularity** to City, State or Region, Country, or Latitude - Longitude. The last option exposes **Radius from location**, with a minimum of 5 km. Set **Evaluate against past** to at least one. |
    | [IP](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/ip-behavior-detection.htm) | Set **Evaluate against past** to the history window for public IP addresses. |
    | [Device](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/device-behavior-detection.htm) | Set **Evaluate against past** to the history window for sign-in clients. |
    | [Velocity](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/velocity-behavior-detection.htm) | Set **Velocity** in km/h to the apparent travel-speed threshold used between sign-ins. |
    | [ASN](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/asn-behavior-detection.htm) | Set **Evaluate against past** to the history window for the network identifier. |

    ## Manage the named definition

    A policy uses the behavior by name. If you rename, deactivate, or remove a custom behavior, review the policies that reference it and retest the affected rules. Multiple conditions can be composed with supported operators, and Okta limits a behavior heuristic to ten conditions. A **heuristic** here means an expression combining behavior conditions. When testing AND and OR, check the result of each named signal. For OR, either true input satisfies the expression. For AND, both must be true. Treat unknown or missing log data as an observation to investigate before drawing conclusions about the expression.

    [Manage behavior settings](https://help.okta.com/oie/en-us/Content/topics/security/behavior-detection/manage-behavior-detection.htm) · [Behavior conditions in an app sign-in rule](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm)

=== "Hands-on Lab"

    --8<-- "configure-group-rule.md"

    After Lab 4, use the [extended signals and history lab](../../modules/behavior-detection/hands-on-labs.md#lab-5) to compare New IP and New Device conditions.

=== "Revision"

    | Setting | What it changes |
    | --- | --- |
    | Behavior definition | What signal Okta measures and the history window or threshold |
    | Rule group | Which users the rule can match |
    | Custom expression | Which behavior results satisfy the expression |
    | Rule action | The proof Okta requires for a matching request |

    ??? question "1. Does a New Device result imply a new physical computer?"

        Okta measures the sign-in client. A different browser on the same computer can be seen as new.

    ??? question "2. Can a user outside the group match the group-scoped rule by using a new browser?"

        The membership condition still has to match. Okta moves to the next app rule when that condition fails.

    ??? question "3. What changes if you replace OR with AND in the behavior expression?"

        Both named conditions have to satisfy the expression for AND. Either condition can satisfy OR.
