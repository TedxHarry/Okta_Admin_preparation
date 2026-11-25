# Lesson 8 · Manage AD profile sourcing and lifecycle

=== "Theory"

    ## Decide what AD controls

    A **profile source** supplies authoritative data for a linked Okta user. AD profile sourcing is enabled by default when you install the agent. You can inspect it under **Directory → Directory Integrations → AD instance → Provisioning → To Okta → Profile & Lifecycle Sourcing**. A link identifies the directory account for this user. The source priority and inbound mapping determine which data can update the user's Okta profile.

    | Question | Control |
    | --- | --- |
    | Which system supplies the whole profile by default? | **Directory → Profile Sources** and the sources linked to the user. |
    | Which system supplies one field? | The attribute's **Source priority** and inbound mapping in **Profile Editor**. |
    | Which system verifies the password at sign-in? | The integration's delegated authentication setting and the effective sign-in policy. |
    | What happens when AD disables or re-enables the user? | The eligible highest-priority source and its lifecycle rules. An attribute-level override changes field sourcing. |
    | Can Okta update the AD object? | A separate outbound mapping, enabled provisioning operation, target OU, and effective AD permissions. |

    Review the **AD app user profile** to see the directory attributes Okta receives. The integration has a default schema and can discover supported attributes already present in AD. Use its **App to Okta User** mapping to populate the target field. Review the **Okta User to App** mapping separately before allowing writes to an AD-sourced attribute. Okta can send a full profile in some outbound updates, and default values or aged data can overwrite directory fields. Validate the destination record and ownership before expanding write scope.

    [AD profile sourcing](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_enable_profile_source.htm) · [Work with AD attributes](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-user-profiles-attributes.htm) · [Profile sourcing and outbound update risks](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm)

    ## Compare source-driven lifecycle outcomes

    **Do Nothing** leaves the Okta lifecycle state under its existing control when the source disables the account. **Suspend** blocks sign-in and retains app assignments. **Deactivate** revokes app assignments and can deactivate accounts in supported apps where deprovisioning is enabled. Only the highest-priority source for that user can drive Okta suspension or deactivation through this mechanism. Reactivation is defined separately for suspended and deactivated Okta users.

    A disabled AD account cannot pass AD password validation through delegated authentication. Okta status may be a separate question depending on the source settings and when the change is processed. Check the AD account, the latest import or refresh, the Okta status, and a fresh sign-in attempt. For a removed directory record or a user moved out of scope, use the documented full-import reconciliation path. Review any safeguard warning before proceeding.

    **Disconnect** removes the AD relationship for a user and changes who manages the account. It is an account management operation with password and access consequences. Read the documented prerequisites and effects for the disconnected account, including how that user will authenticate, before running it.

    [AD lifecycle and reactivation options](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_enable_profile_source.htm) · [Okta suspension and deactivation effects](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Disconnect users from AD](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_disconnect_users.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-8.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Source priority | Determines the default owner and lifecycle authority. |
    | Attribute priority | Can select a different source for one field. |
    | Reactivation | Verify the configured action, account status, return of app access, and target account state. |

    ### Check your recall

    **Does an attribute override grant a lower-priority directory the right to deactivate the Okta user?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The field can come from the lower-priority directory. Lifecycle authority still follows the highest-priority source for that Okta user.</p>
    </details>

    **The AD account is disabled and Okta still shows Active. Which evidence do you check?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check the linked directory, the latest processed import or refresh, profile source priority, and the selected AD deactivation action. A fresh delegated sign-in exercises the AD account status separately.</p>
    </details>

    **What must you verify after reactivating a user in the source?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check the integration's reactivation setting, the Okta user status, fresh sign-in, and any app assignments and downstream accounts the user needs.</p>
    </details>
