# Lesson 4 · Understand who controls the user’s data

=== "Theory"

    Open a user in **Directory → People → Profile** and find **Department**. That screen tells you the value Okta has right now. To explain why it has that value, work backward. **Which system is allowed to supply Department? Which field does Okta read there? Has the update reached this account yet?** Those are three different checks.

    ## A link tells Okta which account belongs to the person

    Say a human resources system and Active Directory (AD) both have a record for the same employee. Matching, which you learned in [Lesson 3](03-import-users-and-first-sign-in.md), lets Okta link each external record to the right Okta account. Once you know which records belong to the same person, you can answer two more questions.

    | Decision | What it means | Where to inspect it |
    | --- | --- | --- |
    | **Sourcing** | Which system supplies the Okta profile or a particular field. | **Directory → Profile Sources** for the profile and **Profile Editor → Source priority** for the field. |
    | **Mapping** | Which field Okta reads, how it interprets the value, and which destination field receives it. | **Directory → Profile Editor → Mappings** for the integration. Use the **App to Okta User** direction for incoming data. |

    An import can link a source record and still leave a field blank. The link establishes which person the record belongs to. A mapping tells Okta where the data should go. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    ## How Okta chooses the profile source

    If the user has no applicable external profile source, Okta supplies its own profile. To let an external app supply it, the app must support profile sourcing. In a supported app’s **Provisioning → To Okta → Profile & Lifecycle Sourcing**, look for **Allow [app] to source Okta users**. After enabling it, the integration can appear under **Directory → Profile Sources**. A newly added source starts at the bottom of that priority list. [Okta · Make an app the profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-app-profile-source.htm) · [Okta · Prioritize profile sources](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm)

    Read the order for the person you’re investigating. Suppose the HR integration is listed above AD. A user linked to both can use HR as their primary profile source. A user linked only to AD can still be sourced by AD. The priority list determines which applicable integration wins for each person. When you move a source up or down, check which other users have accounts linked to both sources before making that change. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Prioritize profile sources](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm)

    ## Decide who supplies an individual field

    **Attribute-level sourcing** gives one field its own source selection. Open the relevant profile in **Directory → Profile Editor**, select the field’s information control, and look for **Source priority**. An **attribute** is the field itself. Its value is what you see on one person’s profile.

    | Source priority option | What happens |
    | --- | --- |
    | **Inherit from profile source** | The field follows the applicable profile source. This is the default. |
    | **Inherit from Okta** | Okta supplies the field, even if an external system supplies the profile as a whole. Who can edit it is still a permissions question. |
    | **Override profile source** | Choose another source for that field. The original source can still control the rest of the profile. Save the field and check its incoming mapping. |

    Suppose HR should supply **Department**, AD should supply **work email**, and Okta should hold **preferred display name**. Keep the main profile sourced by HR. Let Department inherit that source, override work email to use AD, and set preferred display name to inherit from Okta. Changing the work email source changes who supplies that field. It does not make AD responsible for the whole account. [Okta · Designate profile sources for user attributes](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-about-attribute-sourcing.htm) · [Okta · Define the attribute profile source](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-define-attribute-profile-source.htm)

    ## Follow the value from the source into Okta

    A blank cell on the screen can represent different data. Okta documents that saving an empty text value in the profile can store an empty string (`""`). An unmapped sourced field can be null. Check the profile or mapping evidence before treating those cases as the same. [Okta · Add custom user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm)

    Imagine HR is first in priority and both source accounts are linked. The Okta Department field is blank, but AD has **Finance**. If Department inherits from the primary source and HR has no mapping into it, Okta does not pull the value from the next integration in the list. Okta documents that an unmapped attribute has a **null** value, meaning there is no stored value. If you deliberately override Department to AD, the corresponding AD-to-Okta mapping is still required. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    Read the **App to Okta User** mapping from its source field to its destination field. You can map a field directly or use an **expression**, which tells Okta how to build or transform the value. Check required destination attributes, use **Preview** on the affected person, and then compare the result with **Directory → People → Profile** after the relevant update. Green in Preview can mean a valid mapping whose input has no value. Red points to an invalid mapping. An empty mapping column means there is no mapping. Saving the mapping and applying updates when available are separate from previewing it. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    One documented exception matters when you map directory data. Okta says `onPremisesSamAccountName`, `onPremisesDomainName`, and `onPremisesUserPrincipalName` do not sync by default in this mapping workflow. Adding those mappings without enabling sync can cause provisioning to fail. Check the documented support requirement before relying on those fields. [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

    ## A profile change and an account-status change have different controls

    **Lifecycle settings** govern what happens to the user account as the person joins, changes roles, or leaves. A supported source can be set to **Do Nothing**, **Suspend**, or **Deactivate** when the source user is deactivated. **Do Nothing** still allows the source to supply profile attributes. Okta checks the user’s highest-priority profile source before allowing source-driven suspension or deactivation. The integration can also offer options to reactivate suspended or deactivated Okta users when their source account returns. Okta documents that source-driven reactivation requires an exact match. Review the import result when the user instead appears pending activation. [Okta · Edit app provisioning settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm) · [Okta · Make an app the profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-app-profile-source.htm)

    If you enable outbound **Update User Attributes** for the same app that sources the profile, you now have two directions to check. **App to Okta User** can bring values into Okta. **Okta User to App** can send values back. Okta documents that outbound updates can overwrite data owned by another source or send an older value back while an inbound update is still pending. Before enabling both directions, identify who should write each field and trace both mappings. After a change, compare the source record, the Okta profile, and the receiving app’s record. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm)

    ## Where to look when the result surprises you

    | What you see | Where to look first |
    | --- | --- |
    | **A field is missing from the profile.** | Check the person’s user type and its field definitions in **Profile Editor**. |
    | **The field exists but has no value.** | Check the field’s **Source priority**, its inbound mapping, and the original value on the linked source account. |
    | **An edit is unavailable or the value changes back.** | Check who supplies the field, who can edit it, and whether an import or outbound push ran after the edit. |
    | **Preview shows the right value but People still shows the old value.** | Confirm you previewed the correct person and direction. Check whether the mapping was saved and whether updates or the connector’s import have run. |
    | **Okta has the right value but the user’s app access changed unexpectedly.** | Check whether a group rule reads the field, then inspect the group membership and the app’s assignments. If the app’s own profile field is wrong, check the outbound mapping and app record. |
    | **The account status changed.** | Find the applicable profile source and check its **Profile & Lifecycle Sourcing** settings and import results. |

    The user record shows the outcome. To explain it, follow the path back to the setting that decided which system could supply the change. [Okta · Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

=== "Hands-on Lab"

    ## Trace ownership and mappings

    Use an isolated Okta Identity Engine lab org, an admin who can edit profiles and the profile schema, and test users A and B from [Lab 2](02-create-and-activate-a-user.md#__tabbed_1_2). The connected extension requires access to a supported test integration. See the [module lab setup](hands-on-labs.md#before-you-start) for shared prerequisites and test data.

    1. Open **Directory → Profile Editor → Okta**. For the default user type from Lab 2, open **Okta User (default) → Profile**, or click **User (default)** if there is no Profile button. Select **Add Attribute**. Enter **Data type** `string`, **Display name** `Lab Cost Center`, and **Variable name** `m1LabCostCenter`. Leave **Attribute required** clear and save. If the field already exists from a previous run, verify its definition and reuse it.
    2. In **Directory → People → user A → Profile → Edit**, set **Lab Cost Center** to `FIN-0042` and **Save**. Leave B's field unset. Reopen both profiles and record the field definition, the two values, and the profile source shown for each test account. The zeros in the numeric portion belong to the text value.
    3. Work this sourcing case before reading the next step. A linked HR app ranks above a linked directory. The HR app supplies the user's profile but has no inbound mapping for the optional cost-center field. The directory has that field populated. Predict what Okta shows while the field inherits the primary profile source.
    4. Check your prediction. With the primary source unmapped for the inherited field, Okta documents a null value. Inspect **Directory → Profile Editor → Mappings → App to Okta User** and the field's source priority before changing the user record.

    **Pass check.** A and B use the same user type. A displays `FIN-0042` and B has no displayed cost center. Explain why a schema change made the field available to both users, why an A-only profile edit changed just A's value, and why an unmapped primary source does not automatically pull from the second source in the example.

    **Connected extension.** Use a lab user linked to a supported sourcing app. Confirm the app can source the user and populate a harmless test attribute in the source. Preview the inbound mapping for that user. Record the source field, destination, and preview value, then apply the mapped change within the isolated lab and compare the user profile. If a second eligible source is available, try an attribute-level override for the test field and verify what changed. Restore any mapping and source priority you changed. Clear A's lab field when finished or keep it for the capstone.

    [Okta · User Profiles](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

=== "Revision"

    ## Trace who controls the value

    | Question | Where to look |
    | --- | --- |
    | Which source account belongs to this person? | Review the linked account and import result. Matching establishes the relationship. |
    | Which source supplies the overall profile? | **Directory → Profile Sources**. Read the order of sources that apply to this user. |
    | Can one field use a different source? | **Directory → Profile Editor → field information → Source priority**. Use **Inherit from profile source**, **Inherit from Okta**, or **Override profile source**, where available. |
    | How does a value travel? | Open the integration's **Mappings**. **App to Okta User** is inbound. **Okta User to App** is outbound. Preview the intended user and check the destination after applying the change. |
    | What happens when the source account is disabled? | Check the integration's **Profile & Lifecycle Sourcing** setting. Owning profile values and driving Okta account state are separate decisions. |

    **When a field is blank.** Check schema → source priority → inbound mapping → source value → last update. An unmapped field from the primary source can be null even if another source has data. A text field explicitly saved empty can contain an empty string instead.

    **Exam focus.** Be able to predict what happens with two linked sources, change a test field's source or mapping, and verify the result. For write-back, trace the outbound mapping and confirm the receiving system changed.

    ### Check your recall

    1. HR is the primary source, its Department mapping is missing, and AD has a value. What does Okta use?
    2. Preview shows the expected value but People still shows the old one. What is next?

    <details>
    <summary>Show answers</summary>
    <ol>
    <li>The inherited field can be null. Check the primary mapping or set an intentional field override with its own inbound mapping.</li>
    <li>Verify the exact user and direction, then check whether the mapping was saved, updates applied, and any required import completed.</li>
    </ol>
    </details>
