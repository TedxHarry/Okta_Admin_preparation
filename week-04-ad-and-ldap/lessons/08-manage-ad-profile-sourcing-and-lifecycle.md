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

    ### Compare disabling, deleting, and moving a user in AD

    Start by identifying the AD change. A password check, an import, and the stored Okta status can report different results.

    | AD change | Fresh AD-delegated sign-in | What to look for in Okta |
    | --- | --- | --- |
    | **Disable in a selected OU** | AD denies validation for the disabled account. | The record still exists in scope. After Okta processes the AD status change, the eligible source action determines whether Okta keeps the existing status, suspends, or deactivates the user. |
    | **Delete the AD account** | The original account is gone, so its credentials cannot be validated. | A full import reconciles the missing account. An incremental import does not process the deletion. |
    | **Move an enabled AD account outside the selected OU** | With AD JIT enabled, Okta denies the sign-in even while the account remains enabled in AD. | A subsequent incremental import does not deactivate the user for this move. Okta's FAQ documents a full import detecting the missing in-scope user and deactivating it. Before reconciliation, the Okta user can still show Active. |

    Check the actual AD record, the import type and outcome, and the stored **People** status. If an import safeguard pauses the operation, inspect the scope change and the warning before proceeding. [AD integration FAQ](https://help.okta.com/oie/en-us/content/topics/directory/directory_faq_okta_and_ad_groups.htm) · [On-demand import types](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-users-on-demand.htm) · [Import safeguards](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-safeguard.htm)

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

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** An enabled AD user was moved outside the selected OU and can no longer start a fresh Okta sign-in with JIT enabled. People still shows Active. Is that evidence of a broken integration?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>The sign-in path can reject a user who is out of JIT scope before account-state reconciliation. Check the actual OU, JIT configuration, and last import mode. An incremental import does not detect the scope removal for deactivation. Verify the full-import result and applicable lifecycle policy.</p>
    </details>

    **Interview question.** HR remains the primary profile source and AD supplies one field. Who controls Okta lifecycle, and how would you prove the answer in a lab?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Verify primary source order for the linked user and configured source lifecycle actions. Compare a field change from AD with a separately approved source lifecycle change on a disposable account. The attribute override grants field authority only.</p>
    </details>
