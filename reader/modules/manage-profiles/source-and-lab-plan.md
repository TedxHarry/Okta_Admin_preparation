# Manage Profiles · Source and lab plan

Use this plan to track the theory, hands-on task, and reference for each lesson. Work on one lesson at a time. Each published lesson uses Theory, Hands-on Lab, and Revision tabs with answers that open individually. The full labs also appear on the standalone page.

| Lesson | Theory | Hands-on verification |
| --- | --- | --- |
| 1. Read the three profile types | Find the Okta user, Okta group, and app user definitions. Compare a schema with actual user and group values. | Compare all three records or diagnose the supplied app-profile sample. |
| 2. Design and validate user attributes | Base and custom fields, data types, required values, defaults where supported, length, enum values, uniqueness and collision handling, username restrictions, and optional first and last names. | Add a test field and try valid, invalid, duplicate, and blank values. Compare settings against existing data. |
| 3. Manage Universal Directory user types | Create, assign, change, and delete types. Cover constraints, known issues, type-specific mappings, and the effect of migration on fields. | Compare default and custom users. Change a disposable user’s type and verify what remains. Test mappings with a supported app or use the supplied records. |
| 4. Manage group and integration schemas | Add, edit, and remove group attributes. Discover supported attributes for apps, directories, and identity providers. Trace dependencies before removal. | Create and verify a native group field. With a supported connector, discover a test directory field and check its mappings before removal. |
| 5. Build and verify inbound and outbound mappings | Find, create, edit, override, and remove mappings. Compare Profile Editor with provisioning settings and distinguish preview, saved value, and target write. | Map a test value and verify all available records. Compare create-only and update behavior on a supported target. |
| 6. Transform values and manage usernames | Use Okta Expression Language for strings, conditionals, missing data, and type conversion. Compare username formats and overrides for Okta, apps, and relevant directory or identity provider flows. | Predict a mapping for positive and blank inputs, preview each case, and verify username behavior after a controlled profile change. |
| 7. Configure profile sources and attribute priority | Whole-profile and field-level sourcing, HR as a source, source order, mappings when sourcing is enabled, editing rights, and user self-service permissions. | Trace a field across two linked sources when available. Test one field override or use a recorded comparison when no connector is available. |
| 8. Send and verify SAML attributes and WS-Federation claims | Distinguish stored profile data, provisioning writes, and claims sent at sign-in. Cover rich SAML assertions, WS-Federation boundaries, and receiver verification. | Create a custom SAML app, assign it by group rule, map built-in and custom fields, and inspect the assertion and receiver. Use a labeled WS-Federation claim sample unless a supported target is available. |
| 9. Troubleshoot profile changes end to end | Trace a stale or wrong value through the source record, Okta user profile, mapping, application user record, connector, and downstream account or claim. | Diagnose a controlled failure, then compare direct write-back and a Workflows run using the changed record and operation evidence. |
| [Capstone](hands-on-labs.md#capstone) | Trace fields for an employee and a contractor from schema through app assignment and mapping. | Create a contractor type and field, then verify its app property mapping with a direct test assignment where supported. Use a default-type employee for the separate group-rule and SAML flow. Recover a deliberately broken mapping and verify an unaffected control. |

## Environment and evidence

- Use an isolated Okta Identity Engine org with permission to edit the disposable profiles and mappings. Use separate admin and test-user sessions when the lab tests a sign-in.
- Schema, user type, and value exercises use native Okta objects. Live external sourcing, outbound provisioning, and receiving-app claims require a supported connection and test identities. Provide simulated records when the connector is unavailable and label them as such.
- For each write, capture the original setting, the intended result, one positive case, and an unaffected or invalid case where it clarifies the behavior. Verify the actual record after saving.
- Check whether mappings are referenced before removing a field or type. Keep changes scoped to disposable integrations and restore setup when a later exercise depends on it.

## Certification coverage

Use the Performance Exam as the primary certification map. The Hands-On Configuration guide adds explicit practice for custom user types. Each row specifies the result to verify. All nine lessons are available, including end-to-end troubleshooting, directory write-back, and Workflows practice. The [capstone](hands-on-labs.md#capstone) is available.

| Guide objective | Where to practice | Evidence to capture |
| --- | --- | --- |
| Performance Part I and Hands-On Part I · HR as a source and external attributes driving group rules | Lessons 7 and 9. Trace Department from a supported HR source into Okta and into a rule-managed group. Use a labeled HR import case when no HR connector is available. | Source change, resulting Okta Department, recorded rule membership, and an unaffected control. |
| Both Part I guides · Know when to use profile sourcing | Lessons 1 and 7. Compare an Okta-managed profile with an externally sourced profile. | Identify which system supplies the field and where the correction belongs. |
| Both Part I guides · Multiple sources and attribute priority | Lesson 7. Use two linked sources with conflicting values. Compare source priority and a field-level override. | Record the winning source and resulting field value before and after each change. |
| Both Part I guides · Write-back to directories and apps | Lessons 5 and 9. Track one mapped app update and a separate supported directory write-back case. Explain the direction and distinguish a preview from a write. | Confirm the receiving account and returned value. Where a connector is unavailable, inspect labeled source, mapping, event, and target records. |
| Both Part I guides · Lifecycle Management requirements for app writes | Lessons 5 and 9. Compare app assignment, connector capability and credentials, enabled update settings, and create-only or update mapping behavior. | Record the operation outcome and the resulting target value. Explain why a field can stay stale despite a correct Okta profile. |
| Both Part I guides · Advanced lifecycle with Okta Workflows | Lesson 9's lifecycle extension. Trace a test event through a workflow that reads a mapped value and updates a disposable record. Use Execution History or a labeled sample. | Match the trigger, evaluated value, action output, and changed record. |
| Hands-On Part II · Create a custom user type, assign users, and add a field to that type | Lessons 2 and 3 and the capstone. Create a contractor type, add a field to that type, assign a test user, and verify the field against a default-user control. | The custom schema contains the field, the intended user has the type and value, and the default-user schema lacks it. |
| Performance Part II · Create a group and group rule, then assign the group to an app | Lesson 8 and the capstone. Apply the group-rule skills from [Manage Groups](../manage-groups.md) to a disposable application using default-type test users. Custom-type users have a separate property-mapping exercise. | Rule-managed membership, group assignment, and an unassigned control. |
| Performance Part II and Hands-On Part II · Use Expression Language, add a SAML integration, and create and map attributes | Lessons 2, 5, 6, and 8. Build a custom SAML 2.0 app, map one built-in field and one custom field, and configure the SAML attribute statements needed by the receiver. | Save and verify the mapping, check the expression on populated and blank inputs, and inspect the assertion's attribute names and values. |
| Performance Part II · Verify data from a group-assigned user in the application | Lesson 8 and the capstone. Sign in as the group-assigned test user and verify both values at the SAML receiver. | Receiver-side evidence for the correct user and attributes. An assertion preview is a separate checkpoint. |

Other exam domains, including AD agent configuration, Behavior Detection, Device Assurance, and authentication troubleshooting, are tracked in the [course exam coverage map](../../exam/coverage.md).

## Okta learning and lesson checks

Use Okta's learning path alongside the module. Pair **Map and Transform Profile Attributes** with Lessons 5 and 6, and **Prioritize Profile Sources to Finesse User Lifecycle** with Lesson 7. The course labs provide the setup, verification, and cleanup for each exercise. Use the Revision tab to practice predicting the result before opening each answer.

- Every lesson identifies the record, field, and source before asking the learner to edit anything.
- Every configuration lab gives expected results and a way to verify them after saving. Test a blank, invalid, or unaffected case when it reveals a distinct behavior.
- When a live exercise needs an external connector, receiving app, or workflow permission, identify that dependency and include a labeled evidence exercise. Record live completion separately from the evidence exercise.
- Mark a task available when the matching lesson and standalone lab are published. Record tenant execution when the required environment can be tested.

[Administrator Performance Exam study guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) · [Administrator Hands-On Configuration Exam study guide](https://certification.okta.com/page/okta-administrator-hands-on-configuration-exam-study-guide) · [Okta learning · Manage User Profiles in Universal Directory](https://learning.okta.com/path/manage-user-profiles-in-ud)

## Okta documentation by lesson

The [Manage profiles](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-profiles-main.htm) documentation is the entry point. The task links below are grouped by where learners will use them.

### 1. Read the three profile types

[The Okta user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profiles.htm) · [The Okta group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profiles.htm) · [The app user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profiles.htm) · [View the Okta default user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-user-profile.htm) · [View the Okta default group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-group-profile.htm) · [View existing application attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-existing-app-mapping.htm)

### 2. Design and validate user attributes

[Make the user profile first and last name optional](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-first-last-optional.htm) · [Create a custom character restriction for the Okta user name](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-character-restriction.htm) · [Add custom attributes to an Okta user profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-user-attributes.htm) · [About custom attribute uniqueness enforcement](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-custom-uniqueness.htm) · [Enforce custom attribute uniqueness](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enforce-custom-uniqueness.htm)

### 3. Manage Universal Directory user types

[About custom user types in Universal Directory](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-usertypes-about.htm) · [Universal Directory custom user types known issues](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-types-known-issues.htm) · [Create a custom user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-user-type.htm) · [Map a user type to an application](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-user-type.htm) · [Create a user and assign a user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-assign-user-type.htm) · [Change the user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-change-user-type.htm) · [Delete a user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-user-type.htm)

### 4. Manage group and integration schemas

[Create a group](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm) · [Add custom attributes to a default Okta group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-group-attributes.htm) · [Add custom attributes to apps, directories, and identity providers](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-custom-attribute.htm) · [Edit Okta default group profile custom attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-custom-group-attributes.htm) · [Remove custom attributes from a default Okta group profile](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-custom-group-attributes.htm) · [Delete custom app, directory, and identity provider attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-custom-attributes.htm) · [Add or remove custom directory schema attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-remove-custom-schema.htm)

### 5. Build and verify inbound and outbound mappings

[App to Okta attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm) · [Okta to app attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-mappings.htm) · [About selective profile push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-selective-profile-push.htm) · [View existing application attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-existing-app-mapping.htm) · [Map Okta attributes to app attributes in the Profile Editor](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes.htm) · [Map application attributes on the Provisioning page](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-attributes-provisioning.htm) · [Edit application attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-mapping.htm) · [Override application attribute mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-app-mapping.htm) · [Remove mapping](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-remove-mapping.htm) · [Map profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm)

### 6. Transform values and manage usernames

[Okta Expression Language](https://developer.okta.com/docs/reference/okta-expression-language/) · [Modify attributes with expressions](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-attribute-mappings-expressions.htm) · [Override a user name format](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-username-format.htm) · [Override an app user name](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-override-app-username.htm) · [Automatically update an app username](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-auto-update-app-username.htm)

### 7. Configure profile sources and attribute priority

[About profile sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [About attribute-level sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-attribute-sourcing.htm) · [Prioritize profile sources](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-prioritize-profile-source.htm) · [Make an app the profile source](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-app-profile-source.htm) · [Define the attribute profile source](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-define-attribute-profile-source.htm) · [Map profile attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-profile-attribute.htm) · [Edit user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-user-attributes.htm) · [Allow users to edit attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-edit-attributes.htm)

### 8. Send and verify SAML attributes and WS-Federation claims

[Rich SAML assertions and WS-Federation claims](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-rich-saml.htm) · [Federated claims](https://help.okta.com/oie/en-us/content/topics/apps/federated-claims-overview.htm) · [Configure Template WS-Federation](https://help.okta.com/en-us/Content/topics/apps/apps_configure_okta_template_ws_federation.htm)

### 9. Troubleshoot profile changes end to end

[Work with profiles and attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-profile-attributes-main.htm) · [Manage profile and attribute sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-sourcing-main.htm) · [Configure AD provisioning](https://help.okta.com/en-us/Content/topics/directory/ad-agent-configure-provisioning.htm) · [Configure app provisioning](https://help.okta.com/oie/en-us/Content/Topics/provisioning/lcm/lcm-provision-application.htm) · [System Log event types](https://developer.okta.com/docs/reference/api/event-types/)

