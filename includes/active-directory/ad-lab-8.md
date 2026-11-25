## Lab 8 · Verify AD-sourced attributes, deactivation, and recovery { #lab-8 }

Use a disposable linked AD user and an unaffected user outside the exercise. Change only the settings of an isolated AD integration. Keep a native Okta admin session. Record the original profile source priority, mappings, lifecycle settings and any app assignment you will monitor. Disable JIT for the test user path if you want to isolate import timing.

### 1. Determine the winning field source

1. In **Provisioning → To Okta → Profile & Lifecycle Sourcing**, verify **Allow Active Directory to source Okta users**. In **Directory → Profile Sources**, confirm which source applies to this linked user.
2. In **Directory → Profile Editor**, inspect the AD inbound mapping for Department and set the test field to inherit from its intended source. Change Department on the disposable AD user, process the import, and verify the same value on the same Okta user ID.
3. If a second supported source is linked to this user, compare its source priority and a field-level override using a separate optional test field. Verify the field's value and the profile source separately. Restore both the original field settings and source order after the comparison.

### 2. Compare lifecycle decisions

1. Select **Do Nothing** for source deactivation. Disable the test AD account and process the supported import. Compare the AD state, the resulting Okta state, and a fresh delegated sign-in. Verify the control user is unaffected, then re-enable the test AD account and reimport.
2. Set **Suspend Okta user** and allow reactivation of suspended users for a clean comparison. Disable the test user again and import. Verify suspension and retained test app assignments where present. Re-enable the AD account and verify the configured Okta reactivation path.
3. Repeat with **Deactivate Okta user** and the corresponding reactivation option. Check the Okta user, supported downstream provisioning outcome where applicable, and actual receiving account. Compare reactivation with restoration of app assignment. Check each independently.
4. Restore the original integration settings and test data. If the test user is still inactive, determine the current matching and status before applying an admin reactivation. Use the disconnect documentation to predict the effect on a separate test-only user if you intend to practice disconnecting it.

[Make AD the profile source](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_enable_profile_source.htm) · [Deactivate and delete user accounts](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm)
