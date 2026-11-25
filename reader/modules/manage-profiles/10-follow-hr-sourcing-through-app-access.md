# Lesson 10 · Follow HR sourcing through app access

=== "Theory"

    An **authoritative source** is the system that supplies the trusted value for a profile field or lifecycle decision. In HR-driven provisioning, a human resources system supplies worker data, Okta uses that data to decide who receives access, and an app connector carries out supported changes in the receiving application. Each system stores its own record, so you can verify where a change stopped.

    ## Read the path from the worker to the app

    | Stage | What Okta or the receiving system does | Where to verify |
    | --- | --- | --- |
    | **1. Import** | The HR connector reads worker records and exposes supported fields in its integration profile. The import or sync must process the worker and the relevant change. | Compare the HR worker record, the import result, and fields on the imported integration record. |
    | **2. Match and confirm** | Matching determines which Okta user an incoming account belongs to. An existing match links the source account. Confirming a new result can create the user, and the integration's activation settings determine whether the new Okta user is activated. | Review import results, then open the user under **Directory → People**. Check the linked source account, unique Okta user, and account status. |
    | **3. Apply source priority and inbound mapping** | The highest-priority eligible source supplies the profile by default. An attribute-level override can select a different source for one field. The **App to Okta User** mapping supplies the actual field value. | Check **Directory → Profile Sources**, the field's **Source priority** and inbound mapping in **Directory → Profile Editor**, then the saved user profile. |
    | **4. Evaluate a group rule** | An active rule uses stored Okta user attributes to maintain membership in an Okta group. The same correctly mapped HR attribute can drive access to multiple assigned apps. | Check the rule condition and exceptions under **Directory → Groups → Rules**, then verify actual membership on the group. |
    | **5. Assign the application** | Assigning the app to the group gives its eligible members an app assignment. Another group or a direct assignment can retain access after a rule removes one membership. | In the app's **Assignments** tab, verify the user and any other assignment path. |
    | **6. Provision the receiving account** | With a working connection and supported **To App** actions enabled, Okta can create or link a target account, update mapped fields, or deactivate the account when its assignment ends. | Check the outbound mapping, provisioning outcome, target account ID, and the actual field or account status in the receiving app. |

    During setup, a test of the integration credentials establishes that the connection works for that check. An import confirms the worker is readable, and the saved Okta profile confirms which value reached the rule. A rule preview shows whether its condition matches. The group and app records show what Okta changed. The receiving record shows whether the connector accomplished the intended operation.

    [Match imported users and configure sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm) · [Profile sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm) · [Provision apps](https://help.okta.com/oie/en-us/content/topics/apps/provisioning_deprovisioning_overview.htm)

    ## Configure Workday as an ongoing source

    Okta documents both importing worker records from Workday and keeping Workday as the ongoing profile source. For ongoing sourcing, connect the Workday integration under **Provisioning → Integration** using a Workday integration system user with the required read access. Under **Provisioning → To Okta → Profile & Lifecycle Sourcing**, enable **Allow Workday to source Okta users**. In **Directory → Profile Sources**, place Workday above AD if Workday controls the worker profile and Okta provisions an AD account downstream. Attribute overrides can still give another source ownership of a specific field.

    Set matching criteria before enabling automatic confirmations. Start with a manual import and compare the source account and match candidate. Confirm the worker attributes available to the inbound mapping. Workday's **Department Field** setting defaults to **Business Unit**. Check which worker attribute you are using before writing a rule based on Department.

    A scheduled import processes changes on the connector's schedule. Workday **Real-Time Sync (RTS)** uses configured Workday business processes to notify Okta for supported changes. Some changes require a scheduled import to reconcile. When diagnosing an offboarding delay, check whether the termination is effective and eligible for processing, when the import or RTS ran, and whether the integration has specific immediate termination reasons or time zone settings.

    [Workday integration, import settings, and termination timing](https://help.okta.com/oie/en-us/content/topics/provisioning/workday/workday-provisioning.htm) · [Workday Real-Time Sync](https://help.okta.com/oie/en-us/content/topics/provisioning/workday/workday-rts.htm)

    ## Predict a move or a termination

    A **mover** changes roles or departments while remaining employed. A changed attribute can take away a rule-granted membership while the Okta account stays active. If the old app has no remaining assignment and supports **Deactivate Users**, the connector can deactivate the target account. If another assignment remains, inspect it before expecting the target account to be disabled.

    A **leaver** has an effective termination in HR. Okta applies the action configured for the eligible highest-priority source when it processes the change.

    | **When a user is deactivated in the app** | Effect on the Okta user and access |
    | --- | --- |
    | **Do Nothing** | The source still supplies profile data. Its deactivation signal does not change Okta account status through this setting. |
    | **Suspend** | Okta blocks sign-in and ends Okta sessions. App assignments remain, so suspension alone does not prove that a receiving account was disabled. |
    | **Deactivate** | Okta deactivates the user and revokes app assignments. Supported app deprovisioning runs where enabled. Inspect the receiving account and any application-side sessions separately. |

    An attribute override does not give that field's source authority to deactivate the user. Reactivation has separate configuration and matching requirements. After reactivation, verify that the intended access was restored and check the receiving account before assuming app access is available again.

    [Profile and lifecycle sourcing options](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm) · [User suspension and deactivation effects](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm) · [Automatically deactivate app users](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-automatic-deactivate.htm)

    ## Choose what to write back

    A profile update writes mapped fields to a target user account. **Group Push** writes a group or its membership to a supported target. Keep the app assignment group separate from the push group. A downstream app can consume values from Okta without supplying those same fields back to Okta.

    When a single integration both supplies profile data and receives updates, review its default and explicit outbound mappings. Okta documents that an outbound push can include the full app user profile. An unmapped inbound field can still receive a default outbound value. Imports at different times can also leave the outbound write carrying an older value from another system. Decide which system owns each field and verify the value saved at the destination before enabling that direction broadly.

    [Profile sourcing and outbound update risks](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Profile Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-selective-profile-push.htm) · [Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-push.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-10.md"

=== "Revision"

    **1. The HR connector imported the new Department. The user's Okta profile still has the old one. What do you check first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Check the linked worker account, the Okta user's primary source, Department's attribute-level source, and the inbound mapping from that source. The group rule uses the stored Okta value.</p>
    </details>

    **2. A mover leaves the rule-managed group but still appears on the old app's Assignments tab. What do you check?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Find any direct or additional group assignments. If the last assignment is gone and the receiving account remains active, check the Deactivate Users setting and connector outcome.</p>
    </details>

    **3. HR termination suspends the Okta user. What additional proof would establish that the downstream account is inactive?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Check a successful deprovisioning operation where applicable and read the status on the actual receiving account. Okta suspension retains app assignments.</p>
    </details>

    **4. A directory supplies Department through an attribute override. Can its deactivation signal override the HR source's lifecycle setting?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 4">Show answer</summary>
    <p>The field override changes who supplies Department. The highest-priority profile source for the user controls the sourced deactivation or suspension decision.</p>
    </details>
