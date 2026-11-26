# Manage Profiles capstone · Trace a profile from Okta to an app

Create test fields, map them to app records, and verify the claims an app receives at sign-in. Then change one value at a time and follow it through the systems until you find where it stops updating.

Use a disposable Okta Identity Engine org and an administrator who can edit schemas, mappings, group rules, and test integrations. Use fresh, non-admin users and prefix disposable objects with `LAB-M3-PROJECT-`. Keep the admin and test-user sessions separate. Use synthetic values and keep actual assertions, credentials, and tenant identifiers out of your notes.

| Record | Starting state | Use |
| --- | --- | --- |
| **Employee** | Default user type, Department `M3-Project-Support`, Cost Center `cc-104` | Outbound mapping, group eligibility, and SAML sign-in |
| **Control** | Default user type, Department `M3-Project-Training`, Cost Center blank | Blank mapping input and an unassigned SAML user |
| **Contractor** | Separate local user, initially on the default type | Apply the Contractor type and verify its app mapping |

Start with the schema tab. Live app mappings need a disposable integration with editable app-profile attributes. The SAML tab needs a service provider you control, and the source tabs need the listed connectors. The worked values let you follow the tests when an integration is unavailable.

=== "1. Build the profile schema"

    1. Open **Directory → Profile Editor → Okta User (default) → Profile → Add Attribute**. Add an optional **string** named **Project Cost Center** with variable name `m3ProjectCostCenter`. Keep it a string so values such as `cc-104` retain their format.
    2. Add an optional string named **Project Region** with variable name `m3ProjectRegion`. Enable **Define enumerated list of values**, add `NA` and `EU` as allowed values, and save. In **Directory → People → Employee → Profile → Edit**, set the Department, Cost Center, and Region (`NA`). On Control set the Department from the table and leave Cost Center blank. Reopen both records. The field should exist on both users, with a saved value only on Employee.
    3. Open **Directory → Groups → Add Group** and create **LAB-M3-PROJECT-Support**. In **Profile Editor → Groups**, open the default group profile and add an optional string named **Project Support Queue** with variable name `m3ProjectSupportQueue`. Open the group's **Profile → Edit** and set it to `SUPPORT-LAB`. Reopen the group. That value belongs to the group profile.
    4. In **Directory → Profile Editor**, use **Create Okta User Type** to add a disposable Contractor type. In its profile, add an optional string named **Project Sponsor Reference** with variable name `m3ProjectSponsorRef`. Open Contractor in **People**, use **Change** by the user type, select the new type and complete any required fields. Set Sponsor Reference to `SP-482` and verify the assigned user type and stored value. Keep the SAML group rule on the default-type Employee and Control users.

    [Manage profiles](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-profiles-main.htm) · [User attribute validation](hands-on-labs.md#lab-2) · [Custom user types](hands-on-labs.md#lab-3) · [Group and integration schemas](hands-on-labs.md#lab-4)

=== "2. Build an outbound mapping"

    1. In **Directory → Profile Editor → Apps**, select a disposable app with manual attribute mapping. Open its **Profile** and use an optional writable string destination, or add an optional **Project App Cost Center** string if the app allows custom fields. For a provisioning test, use a field that the receiving app actually supports. Record the original mapping and keep required fields intact.
    2. Open the test integration's **Mappings → Okta User to App**. Select the default Okta user type if prompted. In the destination row, enter:

        ```text
        (user.m3ProjectCostCenter == null || user.m3ProjectCostCenter == "") ?
          "UNASSIGNED" : String.toUpperCase(user.m3ProjectCostCenter)
        ```

    3. Use **Preview** for Employee and Control where selectable. Employee should evaluate to `CC-104`. Control's blank input should evaluate to `UNASSIGNED`. Save the mapping and apply updates when appropriate for the isolated integration. Assign Employee to this app and check the saved field under **Applications → test app → Assignments → People → Edit**. If provisioning is enabled, open the receiving account and check the same value there.

        | Okta input | Expected mapped value |
        | --- | --- |
        | `cc-104` | `CC-104` |
        | `cc-205` | `CC-205` |
        | Empty string or null | `UNASSIGNED` |

        <span id="profile-mapping-explorer"></span>

    4. On a separate compatible contractor test app, choose the Contractor type in **Profile Editor → app → Mappings**. Under **Okta User to App**, map `user.m3ProjectSponsorRef` to an optional writable string where supported. Assign Contractor directly and verify `SP-482` on the app user record. The default-type cost center example and the contractor example use separate mappings.
    5. If the test app exposes application username mapping, follow [the username update exercise](hands-on-labs.md#lab-6). Change only a disposable app alias and compare the saved app username with the unchanged Okta login.

    [Map Okta attributes to an app](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes.htm) · [Map a user type to an app](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-user-type.htm) · [Expression Language](https://developer.okta.com/docs/reference/okta-expression-language/)

=== "3. Verify SAML claims"

    1. Get the ACS URL, audience or entity ID, and NameID requirements from your disposable SAML receiver. In **Applications and Resources → Applications → Create App Integration**, select **SAML 2.0** and name the integration **LAB-M3-PROJECT-Claims**. Enter the receiver's settings and complete trust setup with the Okta metadata or certificate and endpoints required by that receiver.
    2. In **Directory → Groups → Rules → Add Rule**, create a Basic Department condition equal to `M3-Project-Support` and target **LAB-M3-PROJECT-Support**. Preview Employee and Control, save, and activate. Verify Employee joins the group and Control stays outside. Assign the SAML app to the group through **Assignments → Assign → Assign to Groups**. Employee should appear in the app's People list.
    3. In the app's **Sign On → Attribute Statements**, add `department` and `costCenter`. Use the syntax for the editor shown in your org. Add each claim name once.

        | Claim | Current claims editor | Legacy direct statement |
        | --- | --- | --- |
        | `department` | `user.profile.department` | `user.department` |
        | `costCenter` | `user.profile.m3ProjectCostCenter` | `user.m3ProjectCostCenter` |

    4. Sign in as Employee from a fresh session and open the app. Use the receiver's diagnostics to verify `department = M3-Project-Support` and `costCenter = cc-104`. These claims read the Okta user profile directly. In the separate mapping exercise the app user value was `CC-104`. Check Control's assignment and dashboard to verify that Control receives no grant.
    5. With a real receiver, verify the result there. If only the wizard's **Preview the SAML Assertion** is available, treat it as configuration preview and keep receiver verification pending. Use [the WS-Federation example](hands-on-labs.md#lab-8) to compare a claim name supplied by Okta with the name a receiver expects.

    [Configure SAML claims](https://help.okta.com/oie/en-us/content/topics/apps/federated-claims-overview.htm) · [Custom SAML integration setup](../../week-03-saml-and-mappings/lessons/02-custom-saml-attributes-and-group-assignment.md)

=== "4. Find and repair a stale value"

    1. **Create versus update.** On a disposable connector that offers mapping timing, set the Cost Center destination to **Apply mapping on user create only** before assigning a fresh test user whose cost center is `cc-104`. Confirm the initial mapped value is `CC-104`. Change that user's input to `cc-205`. Reopen the app assignment and receiver. The create-only mapping does not automatically recalculate the field from this later input change. A provisioning update can still send the full stored app profile, including the previously mapped value.
    2. Change the destination to **Apply mapping on user create and update**. Save and apply updates where offered, then make a new input change. Check the stored Okta field, mapping preview, saved app-user field, provisioning result, and receiver in that order. If the app user is correct but the target stays stale, check **Provisioning → To App → Update User Attributes** and the connector result for that update. If the user was already assigned when provisioning was enabled, check the assignment for the documented **Provision Users** action.
    3. **Wrong claim.** On the test SAML app, temporarily change only the `costCenter` statement to read Department. Run a fresh sign-in. Expect the cost-center claim to show `M3-Project-Support`. Compare that with Employee's unchanged `cc-104` in the Okta profile, then restore the expression from Phase 3 and verify the new assertion supplies `cc-104`. This isolates a claim configuration error from a stored attribute or provisioning error.
    4. For an individually assigned user, inspect the app assignment for a field override if its connector supports one. Where available, reset the test field to its mapped value. Reopen the assignment and verify the stored result. Use [the mapping and override lab](hands-on-labs.md#lab-5) or [the provisioning troubleshooting lab](hands-on-labs.md#lab-9) for connector-specific controls.

    [Profile Push timing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-selective-profile-push.htm) · [Provision existing assignments](https://help.okta.com/oie/en-us/content/topics/apps/apps-manage-assignments.htm)

=== "5. Compare inbound sources"

    Use another disposable, default-type user linked to one or two supported test sources. Record the baseline source order and field settings before editing. A second source is needed only for the priority comparison.

    1. Open **Directory → Profile Editor → source integration → Mappings → App to Okta User**. Map a populated source Department value to the Okta Department field. Check the source and the destination in Preview where offered, save, and run the source's supported import. Open **People → test user → Profile** and verify the actual stored result.
    2. With two test sources linked to the same user, populate Source A with `Operations` and Source B with `Finance`. In **Directory → Profile Sources**, place A above B in the isolated org. Set Department to **Inherit from profile source** in the appropriate Okta schema, confirm the mappings, and run the supported sync. Verify primary source A and Department `Operations`.
    3. In the same Okta schema, edit Department's **Source priority** to **Override profile source** and select B. Confirm B's inbound mapping still supplies Department, then run its supported sync. Verify that the primary source remains A and Department becomes `Finance`. Restore the original source settings and verify the restored outcome.

        | Configuration | Expected stored Department after sync |
        | --- | --- |
        | A remains primary, Department inherits it | `Operations` |
        | A remains primary, Department is overridden to mapped B | `Finance` |
        | Department inherits A and A has no inbound Department mapping | Null |

    [Map inbound attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [Set attribute source priority](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-define-attribute-profile-source.htm) · [Two-source lab](hands-on-labs.md#lab-7)

=== "6. Connect HR changes and clean up"

    1. With a supported test HR connector and receiving app, follow [the HR lifecycle lab](hands-on-labs.md#lab-10). Link a disposable HR user, map Department into Okta, and assign the receiving app through the corresponding Department group. Verify the linked profile, group membership, app assignment, and actual receiver account.
    2. Move the worker to a nonmatching department at the source and run the supported import. Verify the Okta profile changes first, then check the group and app grant. Verify the receiving app's resulting account state if the connector is configured to deprovision. On a separate disposable worker, run the configured termination test from the same lab and trace the source, Okta account status, app assignment, and target account.
    3. If Workflows is available, use [the profile troubleshooting extension](hands-on-labs.md#lab-9) to inspect the triggering event, test input, and action result for the update. Confirm the stored destination value independently.
    4. Restore the original source settings and mappings. Deactivate temporary group rules, remove project app assignments, and clean up disposable test accounts at the receiver. Remove schema fields and the custom type only after checking their references and moving any test users off the type. Keep only synthetic evidence.

## Verify the result

| Layer | Evidence |
| --- | --- |
| Universal Directory | Correct user type, stored field value, and source ownership |
| App profile | Correct destination value on the app assignment after the mapping applies |
| Provisioning | Successful operation and the expected value on the receiving record |
| SAML | Fresh assertion and expected claim value at the receiver |
| Rule-driven access | Expected group membership and app assignment for Employee, with Control outside |

[All ten Manage Profiles labs](hands-on-labs.md) · [Certification coverage and source material](source-and-lab-plan.md)
