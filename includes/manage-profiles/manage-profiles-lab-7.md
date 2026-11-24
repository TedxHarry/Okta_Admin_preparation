## Lab 7 · Configure profile sources and attribute priority { #lab-7 }

Trace conflicting Department values, change which source supplies the field, and verify what an HR change does to group membership.

### Prepare a scoped test

For live practice, use an isolated Okta Identity Engine org with two supported provisioning integrations allowed to source the same disposable default-type user. Use HR as **Source A** and a directory as **Source B** where available. Configure each connector with its vendor-supported setup and import process. If you have one source, run the single-source HR portion when available and use the sample for the priority comparison.

Use an active test user and an unaffected default-type control user. Before changing configuration, record the original source order, each integration’s lifecycle options, inbound mappings, test source values, and Department source priority. Do not change shared production source order or enable outbound updates for this exercise.

| Record | Initial Department |
| --- | --- |
| Source A / HR account | `Operations` |
| Source B / directory account | `Finance` |
| Control Okta user | `Training` |

### 1. Baseline the primary source

1. Verify the source app accounts are linked to the same intended Okta user. In each capable integration’s **Provisioning → To Okta → Profile & Lifecycle Sourcing**, verify that the integration is allowed to source users. Where offered in the test integration, choose **Do Nothing** for deactivation and leave automated reactivation off for this attribute exercise.
2. In **Profile Editor → integration → Mappings → App to Okta User**, map each source’s Department to Okta’s Department. On the default Okta user profile, set Department to **Inherit from profile source**. Confirm the control account is outside both integrations.
3. In **Directory → Profile Sources**, put Source A above B. Run the connectors’ supported imports and verify the test user’s saved Department in **Directory → People**. Record the actual profile source and value. Expect `Operations` with both links and mappings in place.

### 2. Compare global order with field priority

1. In the isolated org, put B above A, run the supported import or sync for B, and verify which source and Department the record now shows. Expect `Finance` once B supplies the profile. If the old value persists, check connector timing, account matching, and the stored app user value before proceeding.
2. Restore A above B and verify that A again supplies the profile. On the default Okta user schema’s Department attribute, choose **Override profile source** and select B. Confirm B’s inbound mapping is saved. Run the supported import or sync and verify that Department is `Finance` while the primary source is still A. Record both observations.
3. Restore **Inherit from profile source** for Department. Run the supported import from A and verify `Operations` before the group rule exercise.

### 3. Follow an HR edit to a group rule

1. In **Directory → Groups**, create a native group named **Lab M3 Support Staff**. Keep it unassigned to apps. Under **Rules**, create a basic condition that matches Department exactly to `Support` and assigns that group. Preview the test user and control, then save and activate the rule. Initially, neither user should qualify.
2. Change the test worker’s Department in HR from `Operations` to `Support`. Run the supported import. Verify the HR record, the stored Okta Department, and membership in **Lab M3 Support Staff**. The control should remain outside the group.
3. Restore the test worker’s Department to `Operations` while the rule is active and run the import again. Verify what happened to membership. If the user remains in the group, check the imported value, any other assignment path, and rule activity before cleanup.

### 4. Compare self-service with source-owned values

In an isolated org, add an optional custom string field named **Lab M3 Contact Note** to the default Okta user schema. Select **Inherit from Okta** and **Read-Write**. Using the test user’s own session, find their personal profile settings and verify they can edit the lab field if that experience is available. Compare it with Department, which is externally sourced in the live lab. Save a disposable value and confirm it in **Directory → People**. If the option is unavailable, record the configuration and use the sample to explain the expected ownership.

### Sample evidence for learners without a connector

These records are simulated. The relevant imports have completed unless the row says otherwise.

| Configuration or event | Expected Okta result |
| --- | --- |
| A above B, Department inherited, both sources mapped | Department is `Operations`. |
| B above A, Department inherited, both sources mapped | Department is `Finance`. |
| A above B, Department overridden to B and mapped | Primary source remains A. Department is `Finance`. |
| A above B, Department inherited, no inbound mapping from A | Department is null. B’s mapping does not act as a fallback. |
| A above B, Department inherited and mapped, HR changes to `Support` | The imported Okta Department is `Support`. The active rule can add the user. The unchanged control remains outside the group. |
| An Okta-sourced lab field is Read-Write | The user can edit the lab field in a supported self-service profile experience. Department still follows its configured external source. |

### Reset the lab

Restore the original inbound mappings, source order, lifecycle options, Department source setting, and source data. Verify the restored Okta profile after the supported imports. Deactivate the disposable rule and retire it and its test group after checking the lab membership. Remove the self-service lab field once no references remain.

[Profile source priority](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm) · [Set a field’s source](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-define-attribute-profile-source.htm) · [Create a group rule](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm)
