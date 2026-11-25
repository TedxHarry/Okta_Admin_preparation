# Lesson 5 · Manage password policy and directory recovery

=== "Theory"

    A **password authenticator** lets a user prove their identity with a password. In Okta Identity Engine, open **Security → Authenticators → Setup → Password → Actions → Edit** to inspect password policies. The policy selects an authentication provider and applies rules to the users in scope. Identify where the password lives before changing requirements or recovery settings.

    | Setting | What to check |
    | --- | --- |
    | Okta-managed password | Okta stores and validates the password and enforces the applicable Okta password requirements. |
    | AD-delegated password | AD validates the password and applies its directory password requirements. Select **Use Active Directory requirements** for AD-sourced users. AD enforces password length and complexity. Okta's custom complexity selections can change the guidance the user sees. |
    | LDAP-delegated password | LDAP validates the password. Inspect both the LDAP server's password policy and Okta's applicable Password settings. |
    | Failed attempts and recovery | Okta documents settings that also apply to AD and LDAP users. Compare the failed-attempt thresholds on both sides. Okta recommends setting its threshold significantly lower to reduce directory lockouts. Review which recovery methods the rule allows and which the user has enrolled. |

    [Configure the Password authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm)

    ## Trace a password reset back to AD

    In a delegated AD reset from Okta, the recovery policy determines whether the user may proceed. The Okta AD agent then needs permissions to make the change on the target AD user. A successful directory import establishes that the agent could read the user. A successful reset requires a separate operation and rights.

    | Permission on user objects in the target OU | Why it matters |
    | --- | --- |
    | **Reset Password** control access right | Authorizes the agent's service account to reset the password. |
    | Write **pwdLastSet** | Lets the service account change password-last-set state as required by the flow. |
    | Write **lockoutTime** | Lets the service account change the AD lockout state as required by the flow. |

    Inspect the Windows service's runtime identity and its effective rights on the affected AD object. Confirm those rights reach the user through OU inheritance. Verify both the outcome in the Okta System Log and the result in AD. For a successful reset, use a fresh sign-in to verify the new AD password.

    [Okta service account permissions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm)

=== "Hands-on Lab"

    Use a native Okta user and a disposable delegated AD user. Include both in the intended Password policy scope and keep a separate administrator session. Record their effective password requirements and self-service recovery methods. Confirm the test users are enrolled in the required methods.

    1. Test one password candidate that meets the Okta user's policy and violates a known AD requirement. Compare what happens when each test user tries to set it.
    2. Review the AD agent account's scoped reset rights on the test OU. Complete recovery for the AD user with a password meeting AD requirements.
    3. Verify the AD result and a fresh delegated sign-in. With a separate disposable user outside the reset permission scope, compare the error and the unchanged directory state.

=== "Revision"

    **Why might delegated sign-in work while a reset through Okta fails?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Sign-in exercises password validation. Recovery also needs an applicable Okta recovery rule and directory permissions on the target user. Check where the operation failed.</p>
    </details>
