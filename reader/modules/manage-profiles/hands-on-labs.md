# Module 3 · Manage Profiles hands-on labs

Choose a tile to jump to the full exercise on this page. Use a disposable Okta Identity Engine org and the prerequisites shown in each lab.

## Choose a lab { #manage-profiles-lab-grid }

- [1. Read the three profile types](#lab-1)

    Compare user, group, and app definitions with their actual records.

- [2. Design and validate user attributes](#lab-2)

    Test a region list, a staff reference, and uniqueness on existing data.

- [3. Manage Universal Directory user types](#lab-3)

    Create a contractor schema and verify what transfers when a user changes type.

- [4. Manage group and integration schemas](#lab-4)

    Add and retire a group field and trace a discovered directory attribute.

- [5. Build and verify inbound and outbound mappings](#lab-5)

    Follow a mapped value from its source to the receiving app and compare create-only and update timing.

- [6. Transform values and manage usernames](#lab-6)

    Preview conditional values and verify an app username after an alias change.

- [7. Configure profile sources and attribute priority](#lab-7)

    Compare two sources, override one field, and trace an HR edit to a group rule.

- [8. Send and verify SAML attributes and WS-Federation claims](#lab-8)

    Assign a test SAML app by group and verify its claims at the receiver.

- [9. Troubleshoot profile changes end to end](#lab-9)

    Repair a stale mapping and verify a connector write and a Workflows update.

- [10. Follow HR sourcing through app access](#lab-10)

    Trace a hire, transfer, and termination from HR to the receiving account.

- [Capstone · Verify profile changes from schema to app](#capstone)

    Map a contractor field, verify an employee’s claims, and repair a sign-in data issue.

--8<-- "manage-profiles-lab-1.md"

--8<-- "manage-profiles-lab-2.md"

--8<-- "manage-profiles-lab-3.md"

--8<-- "manage-profiles-lab-4.md"

--8<-- "manage-profiles-lab-5.md"

--8<-- "manage-profiles-lab-6.md"

--8<-- "manage-profiles-lab-7.md"

--8<-- "manage-profiles-lab-8.md"

--8<-- "manage-profiles-lab-9.md"

--8<-- "manage-profiles-lab-10.md"

## Capstone · Verify profile changes from schema to app { #capstone }

Build two test identities with different schema requirements, deliver profile data to an app, and diagnose an incorrect claim. Complete the exercise before opening the worked solution.

### Starting state

Use an isolated Okta Identity Engine org, an admin who can configure user schemas, group rules, and app integrations, and a disposable SAML service provider you control. Obtain its ACS URL, entity ID, NameID requirements, and access to its assertion or session diagnostics. The contractor path needs a disposable integration with editable app-profile mappings. If an integration is unavailable, use the simulated evidence below for that path.

| Test identity | Assigned type | Profile data | Expected access |
| --- | --- | --- | --- |
| Employee | Default | Department `Lab-M3-Operations`, cost center `CC-214` | Rule-based access to the SAML app |
| Contractor | New custom type | Sponsor reference `SP-482` | Direct assignment to the contractor test integration |
| Control | Default | Department `Lab-M3-Training`, cost center `CC-900` | Outside the SAML group and unassigned to both integrations |

Use active disposable users for the sign-in and group-rule tests. Use fields that exist only on the intended schema and record the variable name of each field you create.

### 1. Build the schemas and app access

1. Add an optional string for Cost Center to the default user schema. Create a contractor user type with its own optional Sponsor Reference string. Create or prepare the three test users. Verify the employee has the cost center value, the contractor has the assigned custom type and sponsor reference, and the default control schema lacks Sponsor Reference.
2. In a separate contractor test app, map Sponsor Reference through **Okta User to App** for the contractor type. Assign the contractor directly where supported. Verify the selected type, outbound mapping, and app user value. If a connector writes the value externally, check the receiving account separately.
3. Create a native Okta group and an active Department rule that selects `Lab-M3-Operations`. Preview the employee and control. Create a custom SAML 2.0 integration using the receiver’s settings and assign it through that group. Verify the employee’s app assignment and the control’s absence.
4. In the SAML integration’s app schema, add optional Department and Cost Center destinations if the integration supports editable app properties. Map the employee’s Okta values into those fields and verify the saved app user record. On **Sign On**, configure claims named `department` and `costCenter` using the expression syntax for the claim editor you chose. Check the expected names and values at the receiver after a fresh sign-in.

### 2. Investigate an incorrect claim

Ask a partner to introduce the fault after you record the baseline, or set it up yourself. In the employee SAML app, change only the **costCenter claim expression** to read Department. For current claims, the faulty expression is `user.profile.department`. For a legacy direct statement, use `user.department`. Keep the user and app-profile values intact.

**Ticket:** The employee can sign in, but the app shows `Lab-M3-Operations` as the cost center. Restore `CC-214` and demonstrate where the value first became wrong.

Trace the employee’s Okta profile, any saved app properties, the emitted assertion, and the receiver. Record a hypothesis the evidence rules out. Repair the statement, run a fresh sign-in, verify both claims in the receiver, and recheck the control user’s assignment.

### Evidence to submit

| Checkpoint | Evidence |
| --- | --- |
| Schema and type | Assigned type and field values for the employee and contractor, plus the control’s schema comparison. |
| Contractor mapping | The selected mapping type and the assigned app user’s sponsor value, or an explanation based on the simulated records. |
| Employee assignment | Group rule outcome, app assignment, and the unassigned control. |
| Incident | The first incorrect value and the evidence that rules out one other cause. |
| Repair | Correct department and cost center in a fresh assertion and at the receiver. Label any simulated evidence. |

### Simulated evidence

Use these records for a path you cannot run live.

| Checkpoint | Evidence |
| --- | --- |
| Contractor | Assigned type is Contractor. Its Okta Sponsor Reference is `SP-482`. The direct app assignment’s Sponsor Reference is blank. Profile Editor shows the mapping configured only for the default type. |
| Employee profile and assignment | Okta Department is `Lab-M3-Operations` and Cost Center is `CC-214`. Both mapped app-profile values match. The employee is assigned through the group. |
| Employee SAML assertion and receiver | Both show `department = Lab-M3-Operations` and `costCenter = Lab-M3-Operations`. |
| Control | The rule excludes the control user, and neither app lists that user as assigned. |

<details class="revision-answer">
<summary>Show the worked solution</summary>
<ol>
<li>For the contractor, select the contractor type in the app’s outbound mapping. Map its Sponsor Reference to the destination and verify the assignment profile after applying the mapping.</li>
<li>For the employee, the Okta and app-profile values rule out a bad stored Cost Center. The first incorrect value is in the assertion. Point the costCenter claim at the correct variable. Use <code>user.profile.&lt;costCenterVariable&gt;</code> in the current editor, or the corresponding direct or mapped app-user expression in the legacy editor.</li>
<li>Start a fresh employee sign-in. Verify <code>department = Lab-M3-Operations</code> and <code>costCenter = CC-214</code> on the assertion and confirm the receiver uses both. Verify the control remains unassigned.</li>
</ol>
</details>

### Reset the lab

Remove disposable assignments and disable the lab rule before retiring the group and test integrations. Restore any profile values you changed. If you retire the custom user type, verify that it has no assigned users first. Check mapping and claim references before removing lab fields.

[Manage Universal Directory user types](03-manage-universal-directory-user-types.md) · [Build profile mappings](05-build-and-verify-inbound-and-outbound-mappings.md) · [Configure and verify SAML claims](08-send-and-verify-saml-attributes-and-ws-federation-claims.md)
