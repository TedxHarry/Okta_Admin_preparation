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
| 7. Configure profile sources and attribute priority | Whole-profile and field-level sourcing, source order, mappings when sourcing is enabled, editing rights, and user self-service permissions. | Trace a field across two linked sources when available. Test one field override or use a recorded comparison when no connector is available. |
| 8. Send and verify SAML attributes and WS-Federation claims | Distinguish stored profile data, provisioning writes, and claims sent at sign-in. Cover rich SAML assertions, WS-Federation boundaries, and receiver verification. | Configure a custom SAML attribute and inspect the preview and receiver. Use a labeled WS-Federation claim sample unless a supported target is available. |
| 9. Troubleshoot profile changes end to end | Trace a stale or wrong value through the source record, Okta user profile, mapping, application user record, connector, and downstream account or claim. | Diagnose a controlled failure, fix the first incorrect layer, and capture before-and-after evidence. |
| Capstone | Trace fields for an employee and a contractor from schema through app assignment and mapping. | Create a custom user type and field, map the field, verify the app-facing value, and recover a deliberately broken mapping. Include an unaffected control user. |

## Environment and evidence

- Use an isolated Okta Identity Engine org with permission to edit the disposable profiles and mappings. Use separate admin and test-user sessions when the lab tests a sign-in.
- Schema, user type, and value exercises use native Okta objects. Live external sourcing, outbound provisioning, and receiving-app claims require a supported connection and test identities. Provide simulated records when the connector is unavailable and label them as such.
- For each write, capture the original setting, the intended result, one positive case, and an unaffected or invalid case where it clarifies the behavior. Verify the actual record after saving.
- Check whether mappings are referenced before removing a field or type. Keep changes scoped to disposable integrations and restore setup when a later exercise depends on it.

## Certification coverage

| Objective | Lessons and practice |
| --- | --- |
| Part I · Profile sourcing and write-back | Lessons 5, 7, and 9 cover mapping direction, source priority, field-level sourcing, and evidence of a target write. |
| Part II · Custom Application Integration | Lessons 2, 5, 6, and 8 cover creating and mapping custom attributes, using expressions, and inspecting app-facing values and SAML assertions. The capstone joins these tasks to group-based app assignment. |
| Custom user types | Lesson 3 covers creating a type, assigning users, and mapping the type to an application. These also appear in the Administrator Hands-On Configuration guide. |

[Administrator Performance Exam study guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) · [Administrator Hands-On Configuration Exam study guide](https://certification.okta.com/page/okta-administrator-hands-on-configuration-exam-study-guide)

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

[Rich SAML assertions and WS-Federation claims](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-rich-saml.htm) · [Federated claims](https://developer.okta.com/docs/guides/federated-claims/main/)

### 9. Troubleshoot profile changes end to end

[Work with profiles and attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-profile-attributes-main.htm) · [Manage profile and attribute sourcing](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-sourcing-main.htm) · [System Log event types](https://developer.okta.com/docs/reference/api/event-types/)

