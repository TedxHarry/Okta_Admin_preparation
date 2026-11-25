# Lesson 3 · Activate AD users and configure Just-In-Time provisioning

=== "Theory"

    ## Choose when users enter Okta

    **Activation** is the account lifecycle step that lets a user proceed with sign-in or enrollment, subject to the org's policies. **Just-In-Time provisioning (JIT)** creates the Okta user when an eligible AD user first authenticates. Import can create the linked user ahead of time. Each path has its own triggers and activation settings.

    | Path | Creation trigger | Activation behavior |
    | --- | --- | --- |
    | Import with manual confirmation | An admin confirms a New record under **Import → Confirm Assignments**. | Select immediate activation at confirmation, or activate the new user later under **Directory → People**. |
    | Automated import and activation | The import finds a new user and applies the configured auto-confirm and auto-activate settings. | Verify both settings and check the activation-email option separately under **Provisioning → To Okta**. |
    | JIT | First successful AD delegated authentication or supported Desktop Single Sign-On (SSO) for an eligible new Okta user. | Okta creates and activates the user as part of the first-sign-in flow. JIT sends no activation email. |

    An AD user already confirmed in Import Results is ineligible for JIT activation, even if the Okta account is still staged. Activate that record through the import or admin process. JIT bypasses the import's **User Creation & Matching** settings. Existing AD-sourced profiles can still refresh through JIT at sign-in. Okta also documents a refresh when an admin loads or refreshes the profile. Remember that side effect when measuring which event updated a field.

    [JIT creation and updates](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-add-update-jit.htm) · [Confirm imported assignments](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-confirm-user-assignments.htm)

    ## Follow first sign-in

    1. Under **Directory → Directory Integrations → AD instance → Provisioning**, check delegated authentication under **Integration** and enable **Create and update users on login** under **To Okta → General**.
    2. Confirm that the user lives in a selected user OU. Review the sign-in name format. For a custom Okta username expression, Okta documents that AD authentication uses the last saved non-custom format. UPN is the default.
    3. The user submits their directory credentials. The AD domain controller validates them through the agent.
    4. For an eligible first sign-in, Okta creates the user and imports applicable profile and group data. JIT includes security groups in selected group OUs. The user proceeds through applicable Okta sign-in and enrollment requirements.
    5. Verify the linked AD account and the new user's status in **Directory → People**. Inspect group membership and the System Log for the same sign-in attempt.

    You can use JIT with scheduled imports or by itself. **Skip users during import** allows the import job to synchronize groups without onboarding new users in bulk. Okta documents that with this setting, group membership changes await a user import and all imports run as full imports. Read the group and user separately when checking the result.

    [AD import settings and JIT scope](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm) · [AD integration FAQ](https://help.okta.com/oie/en-us/content/topics/directory/directory_faq_okta_and_ad_groups.htm)

    ## Keep activation, sign-in, and app access distinct

    A confirmed user may remain staged until activated. Suppressing the activation email changes delivery. It leaves the activation decision to the process or admin you configured. An activated user can still have an enrollment step or fail an Okta sign-in policy. Verify **People**, the sign-in attempt, and any app assignment separately.

    **Desktop Single Sign-On** uses the Windows identity under its own prerequisites and policy. A Desktop SSO sign-in can also trigger JIT. It has a separate setup path from testing a typed AD password through the agent. [Desktop SSO and JIT](https://help.okta.com/oie/en-us/content/topics/directory/ad-desktop-sso-main.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-3.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Import and confirm | Review the resulting user and activate separately if staged. |
    | JIT | Eligible user plus directory authentication, scope, and a first sign-in. |
    | JIT refresh | Existing sourced profile can refresh at sign-in or when viewed by an admin. |

    ### Check your recall

    **Can first sign-in activate a staged user after an admin confirmed their AD import?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Use admin activation. A confirmed import result is outside the JIT creation and activation path.</p>
    </details>

    **Which configuration decides whether a new JIT user can enter from a particular AD OU?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check the selected user OUs, delegated authentication, and Create and update users on login. The import matching rules are bypassed for JIT.</p>
    </details>

    **What else can refresh an existing AD-sourced JIT profile?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Okta documents a refresh when an administrator loads or refreshes that profile in the Admin Console.</p>
    </details>
