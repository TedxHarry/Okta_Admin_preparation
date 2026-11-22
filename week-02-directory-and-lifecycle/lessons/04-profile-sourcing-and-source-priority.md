# Lesson 4 · Profile sourcing and source priority

=== "Theory"

    Open a user under **Directory → People → Profile**. The Department field shows one value. If it shows **Finance**, where did that value come from? The answer could be an edit in Okta, an import from Active Directory, or data from an HR system. The field label looks the same in each case. The **profile source** tells you which system Okta relies on for the user's profile.

    ## How an external system becomes a source

    When you manage a user directly in Okta, Okta supplies the profile. When a supported app or directory owns that information, you can enable profile sourcing for the integration in **Provisioning → To Okta**. For example, HR can supply employee details and send changes as people join, move between departments, or leave.

    Three settings work together. **Matching** identifies which Okta user an incoming account belongs to. A **mapping** tells Okta which incoming field supplies the value for a particular Okta field. **Sourcing** determines which system gets to supply that value. If the result is wrong, check the three settings separately.

    | Question | Where to look |
    | --- | --- |
    | Did Okta link the incoming account to the intended person? | The integration's import, matching, or account-linking results. |
    | Which integration takes priority for a person linked to more than one source? | **Directory → Profile Sources**. Check which integrations apply to that user and their order. |
    | Does this particular field use a different source? | **Directory → Profile Editor → Okta User profile**. Open the field and inspect **Source priority**. |
    | Which input supplies the field, and how does Okta transform it? | The integration's mappings in the direction **App to Okta User**. |
    | What did Okta actually store? | The user's **Profile** in **Directory → People**, after the connector processes the update. |

    ## Source priority applies to each user

    You can enable more than one profile source in the org. Okta uses the highest-priority applicable source for a user's profile. Start by asking which source accounts are linked to that user. A user linked only to AD can be sourced by AD even when an HR integration sits above it in the priority list. If both apply, the order matters.

    There is a separate choice for individual fields. **Attribute-level sourcing** lets one system own a field even when another owns the profile overall. An HR system can supply Department while AD supplies a directory-managed identifier. A value that employees or admins maintain in Okta can be sourced from Okta.

    | Source priority on an Okta attribute | What it tells Okta |
    | --- | --- |
    | **Inherit from profile source** | Use the source selected for this user's profile. |
    | **Inherit from Okta** | Let Okta supply this field. The field's user permissions still control who can edit it. |
    | **Override profile source** | Use the configured source priority for this field. The choice is scoped to this attribute. |

    An override tells Okta where a field can come from. The inbound mapping still needs to read the right source field. If the result is blank, open the source account and look for a value, then inspect the relevant inbound mapping and import result.

    ## Follow a change from the source to app access

    Start with **Department** in the source system. When its integration processes an update, Okta can store the new Department on the matched user's profile. An active Okta group rule that reads Department can then change the user's membership. If that group grants an app, the user's group-based assignment can change too. Check the profile first, then the group, then the app. If a user also has a direct assignment or another qualifying group, they may retain access.

    A source can also drive account status changes. On an integration that offers **Profile & Lifecycle Sourcing**, inspect how Okta should respond when the source deactivates or reactivates a user. The source order applies to the user profile, and the integration's lifecycle settings tell Okta how to act on a status change. Selecting a different source for one field changes who supplies that field. For a write-back in the other direction, inspect the outbound mapping and the connector's supported update settings.

    ## Official reading

    - [Profile sourcing](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm)
    - [Make an app the profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-app-profile-source.htm)
    - [Prioritize profile sources](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-prioritize-profile-source.htm)
    - [Define the attribute profile source](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-define-attribute-profile-source.htm)
    - [Manage User Profiles in Universal Directory](https://learning.okta.com/path/manage-user-profiles-in-ud)

=== "Hands-on Lab"

    Start with the two Okta-managed users and **Lab Cost Center** from [Lesson 1](01-universal-directory-and-profile-attributes.md). The second tab requires two connected sources in an isolated org. In either tab, make changes only to course test records and fields.

    === "1. Trace an Okta-owned value"

        **1. Inspect the org's source list.** Go to **Directory → Profile Sources**. If the page is available, read the rows in priority order. An empty list means no external source has been configured there. If the menu is missing, continue in **Profile Editor**. The available menus depend on org features and your admin permissions.

        **2. Locate the field's ownership setting.** Open **Directory → Profile Editor → Okta → Okta User (default)**. Open **Lab Cost Center** using the information control and read **Source priority** if it appears. In an org where both test users are managed in Okta, you can edit their values through **People**. Inspect **User permission** separately. The **Read Only** setting from Lesson 1 governs end-user editing.

        **3. Change the input and follow the mapping.** Go to **Directory → People**, open the first test user, and change **Lab Cost Center** from `FIN-0042` to `FIN-0043`. If you completed [Lesson 2](02-profile-mappings.md), open **Profile Editor → LAB-Profile-Mappings → Mappings → Okta User to App** and preview the row for **Cost Center Code** with both users. Expect `FIN-0043` and `OPS-0105`. You changed a value on one Okta profile, so the same mapping yields a new result for that user. Restore `FIN-0042`.

        **4. Follow a value into app access.** Use the [Week 1 Finance rule and bookmark](../../week-01-foundations/labs/06-finance-joiner-and-mover.md) with a test user who receives the app through the Finance group. Move their Department from **Finance** to **Operations** in **People → Profile**. After the rule processes, check the person's **Groups** and the bookmark's **Assignments**. Restore the original Department. In the next tab, the same kind of change arrives through a source integration.

    === "2. Compare two external sources"

        Use an isolated org with profile sourcing enabled, permission to change source priority and mappings, and two working inbound integrations that support profile sourcing. Each source must have a **test account already linked to the same Okta user**. Use the verified account-match or linking procedure for each connector. The [AD learning path](https://learning.okta.com/path/integrate-with-active-directory) introduces the AD setup. With one linked source, you can practice adding the inbound mapping and switching a field between that source and Okta. Complete the priority comparison when both sources are available.

        **1. Prepare two different values.** In each source, choose a writable test string field and map it **App to Okta User → Lab Cost Center**. Set its value in the first source to `FIN-0042` and in the second to `OPS-0105`. In each integration's **Provisioning → To Okta** settings, confirm that profile sourcing is enabled. Record the original order, field sourcing setting, mapping rows, and both source values for cleanup. For this exercise, keep both source accounts active.

        **2. Try the inherited source.** In **Directory → Profile Sources**, move the first source above the second using the **Priority** controls. In the Okta User profile definition, set **Lab Cost Center → Source priority → Inherit from profile source**. Run the connector's supported import or synchronization and complete any required confirmation. Read **Directory → People → test user → Profile**. Expect `FIN-0042`. Then reverse the order, process a new sync with the newly prioritized source, and look for `OPS-0105`. If the import only fetches changed records, update the test source value and compare with that new value.

        **3. Give the field its own source.** Restore the first source above the second. Open **Lab Cost Center** in **Profile Editor**, choose **Override profile source**, and give the second source priority for the field. Save, process an update from the second source, and check the same user profile. The code should now come from the second source while the first source still has priority for the overall profile. If the value differs, inspect the source account link, inbound mapping, attribute override, and import status in that order.

        **4. Try Okta ownership and review the lifecycle settings.** Set **Lab Cost Center** to **Inherit from Okta**. As an admin with profile-editing permission, enter `LAB-LOCAL` on the test profile. Process a source update for the linked test account and verify that **Lab Cost Center** still shows the Okta-managed value. In **Provisioning → To Okta** for the profile source, locate its lifecycle options. Read which action is configured for deactivation and which statuses the connector can reactivate. Restore the original source order, field sourcing setting, mapping rows, and source values. Run the appropriate sync to return the test profile to its starting values and verify them in **People**. The live source-driven deactivation exercise belongs in the directory and provisioning labs, where you can compare the source status, the Okta status, and the app access that follows.
