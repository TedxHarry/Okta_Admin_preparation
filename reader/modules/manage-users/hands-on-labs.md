# Module 1 · Manage Users hands-on labs

Work through one tab at a time. You will create and activate users, bring in account data, trace who controls a profile value, and decide how to restore or remove access. Each lab ends with evidence you can use to explain the result.

## Before you start

Use an isolated **Okta Identity Engine** lab org, two email addresses or aliases you control, and a separate administrator account. Your admin permissions must cover the actions you practice, including user lifecycle, Profile Editor, app and group assignments, or System Log access. Use a separate browser profile or private session for test-user sign-in. Keep passwords, recovery links, tenant URLs, and personal data out of your notes.

| Lab object | Where it comes from |
| --- | --- |
| **A** and **B** | Two disposable Okta-managed users you create in Lab 2. Use unique usernames and inbox addresses you can receive mail at. |
| **CSV user** | A third disposable user created from your org's People CSV template in Lab 3. |
| **Lab Cost Center** | A custom text field named `m1LabCostCenter` that you create in Lab 4. |
| `LAB-Manage-Users-Bookmark` | A test integration that opens `https://example.com/`, created in Lab 6 and reused in Lab 7. |

The CSV exercise needs the People CSV import action. The connector exercises need an isolated supported integration, source-side access, and the corresponding Okta features. Run the core checks first and use the supplied decision exercises when an external system is unavailable.

=== "1. Read a user record"

    1. Open **Directory → People** and find a disposable or existing training account using its exact username. The username may look like an email address. Open **Profile** and compare **Username** and **Primary email**.
    2. Record the status on the user record and the **User type** if displayed. Clear any **Status** filter before deciding that a username is missing. Practice by selecting a filter that excludes the user, then clearing it.
    3. Open **Groups** and **Applications**. Write down one group and one app assignment, or record that the app list is empty. If an app is listed, open its **Assignments** tab from **Applications and Resources → Applications** and use the People/Users and Groups views to trace how the user receives it.
    4. Write a two-sentence ticket update. State whether the Okta user exists, what status you observed, and which view you would check next for a missing app. Include only the username alias and field labels in your evidence.

    **Pass check.** You can find the same record with the status filter cleared and distinguish a user's account state from their app assignment. This exercise makes no configuration changes.

    [Lesson 1](01-read-an-okta-user-record.md) · [Okta · Manage users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-people.htm)

=== "2. Create and activate users"

    1. Go to **Directory → People → Add Person**. Create user A with **Activate later**. Use the default user type unless your lab org specifies another. Record the username and the status you see before starting activation.
    2. Create user B with **Activate now**, using the available user-managed setup option so B can complete setup from the test inbox. Record the status before the first sign-in. In a separate user session, complete the offered setup and any required enrollment.
    3. Return to A's record. Use **Activate** and follow the prompts. Check the test inbox, complete the offered setup, then sign in separately as A. If a message is missing, check the address on the user record, spam, and any resend action appropriate to the current status.
    4. For each user, record the status at creation, after activation starts where observable, and after successful sign-in. The exact intermediate status depends on the activation option and what the user must finish.

    **Pass check.** Both users can sign in and you can explain which account needed an extra admin action to start activation. Keep A and B for the next labs.

    [Lesson 2](02-create-and-activate-a-user.md) · [Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Okta · Activate user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm)

=== "3. Import and match users"

    1. Open **Directory → People → More Actions → Import users from CSV** and download your org's template. Preserve its headings. Add one new test user with a unique username and fill in required fields using an inbox you control.
    2. Upload the file, read the validation results, and correct any errors in the file before submitting. For a controlled validation check, try leaving a required field empty in a separate copy, then restore it before you commit the valid import.
    3. Leave **Automatically activate new users** off for the valid import. Find the exact test username in **People**, compare the imported profile fields to the input row, and record the status. Use Lab 2's activation procedure if you want the user to sign in later.
    4. Compare two simulated source records against A. In the first, a unique employee identifier matches A and the last name changed. In the second, only the display name matches. Explain which record you would link under an exact, mapped employee-ID match rule, and what evidence you would check before confirming the second record.

    **Connected extension.** With a supported lab integration, open its **Provisioning → To Okta** settings and review matching and confirmation. Disable automatic confirmation for the exercise if available and safe in the isolated org. Stage an existing match and a new user in the source, run **Import → Import Now**, and compare the proposed results before confirming only the intended records. Record source and Okta identifiers and the outcome. For **Just-in-Time (JIT)**, use a separate eligible user in a configured test directory or identity provider. Check that the account is absent from Okta, perform first sign-in through that source, then verify the new record and its source. Those paths require external systems. The People CSV exercise demonstrates importing from a file.

    **Pass check.** The CSV user is visible with the expected field values, and you can explain how a connected import could link an existing user instead of proposing a new record. Keep the CSV user only if you need it for further practice.

    [Lesson 3](03-import-users-and-first-sign-in.md) · [Okta · Import from CSV](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm) · [Okta · Match imported attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-matching-imported-users.htm) · [Okta · Add users with JIT](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-add-users-jit.htm)

=== "4. Trace ownership and mappings"

    1. In **Directory → Profile Editor**, open the Okta user profile for the type you used in Lab 2. Add an optional **string** attribute named **Lab Cost Center**, variable name `m1LabCostCenter`. Check that the field appears on A and B.
    2. In **Directory → People → user A → Profile → Edit**, set **Lab Cost Center** to `FIN-0042`. Leave B blank. Reopen both profiles and record the field definition, the two values, and the profile source shown for each test account. The zeros in the numeric portion belong to the text value.
    3. Work this sourcing case before reading the next step. A linked HR app ranks above a linked directory. The HR app supplies the user's profile but has no inbound mapping for the optional cost-center field. The directory has that field populated. Predict what Okta shows while the field inherits the primary profile source.
    4. Check your prediction. With the primary source unmapped for the inherited field, Okta documents a null value. Inspect **Directory → Profile Editor → Mappings → App to Okta User** and the field's source priority before changing the user record.

    **Connected extension.** Use a lab user linked to a supported sourcing app. Confirm the app can source the user and populate a harmless test attribute in the source. Preview the inbound mapping for that user. Record the source field, destination, and preview value, then apply the mapped change within the isolated lab and compare the user profile. If a second eligible source is available, try an attribute-level override for the test field and verify what changed. Restore any mapping and source priority you changed. Clear A's lab field when finished or keep it for the capstone.

    [Lesson 4](04-understand-who-controls-user-data.md) · [Okta · User Profiles](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-about-profile-sourcing.htm) · [Okta · Map profile attributes](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-map-profile-attribute.htm)

=== "5. Recover sign-in"

    1. Confirm user A can sign in, that the mailbox works, and that you have independent admin access. Open A in **Directory → People**. Use the individual **Reset or Remove password** action and choose the email reset option. Complete the reset from the test inbox, then verify a fresh sign-in.
    2. If your test password policy permits a controlled lockout, read the threshold and any auto-unlock interval first. Use only user A. When the record shows **Locked out**, choose **More Actions → Unlock Account**. Verify a fresh sign-in with A's valid password. If a lockout cannot be reproduced under the lab policy, read the available status and select the proper action in the scenario below.
    3. If you have a supported spare device or authenticator and can complete re-enrollment, open **More Actions → Reset Authenticators**. Select only the practice authenticator, then sign in as A and re-enroll as required by policy. Keep a usable enrollment or supported recovery route available before exercising this branch.
    4. Under **Reports → System Log**, filter to the test user's timeframe and find the recovery action and the later sign-in attempt. Record each outcome. A successful admin action and the user's successful new sign-in answer different questions.

    **Pass check.** Given a known password with a locked account, a forgotten password, or a lost enrolled phone, choose **Unlock**, **Reset password**, or **Reset Authenticators** and state how you would verify the fix. End with a working test sign-in and restore the expected enrollment.

    [Lesson 5](05-restore-sign-in-access.md) · [Okta · Reset a password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-individual.htm) · [Okta · Unlock a user](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-unlock-individual.htm) · [Okta · Reset authenticators](https://help.okta.com/oie/en-us/content/topics/security/mfa/mfa-reset-users.htm)

=== "6. Trace app access"

    Open [Lesson 6 → Hands-on Lab](06-give-find-and-remove-app-access.md#__tabbed_1_2). Use A and B from Lab 2. Assign the bookmark directly to A and grant it to B through two test groups. Remove B from one group at a time, then compare the current assignment with each test user's dashboard.

    **Pass check.** B keeps the app after the first membership removal and loses it after the last access path is removed. A's individual grant remains until you remove it. Keep the bookmark integration for Lab 7.

=== "7. Pause and offboard"

    Open [Lesson 7 → Hands-on Lab](07-pause-access-end-sessions-and-offboard-a-user.md#__tabbed_1_2). Follow its setup for a separate disposable account and a direct bookmark grant. Compare clearing the Okta session, suspending the user, and deactivating the user. Check the old session, a fresh sign-in, the assignment list, and the System Log.

    **Pass check.** You can show that clearing sessions allows a new sign-in, suspension retains the assignment, and completed deactivation removes it. Verify the test user's return and check whether you need to restore the bookmark assignment.

=== "Capstone"

    **Ticket.** A new contractor needs the test bookmark. A week later the contractor reports a lost enrolled phone. After the account returns to normal, the contractor goes on leave and will come back with the same access. At the end of the contract, access must be removed.

    Use a disposable account. Carry out the lifecycle actions you can safely exercise in your lab. If a spare authenticator is unavailable, write the exact action and verification you would use for recovery.

    | Evidence to produce | What it should show |
    | --- | --- |
    | User record and first sign-in | The account was created, activated, and could sign in. |
    | Assignment and dashboard | You can trace the bookmark to the direct grant or test group you chose. |
    | Recovery action and result | The selected method is re-enrolled and a fresh sign-in succeeds, or your written procedure identifies the missing lab prerequisite. |
    | Leave and return | Sign-in was blocked while the bookmark assignment remained, and worked after the hold was lifted. |
    | Offboarding | The record is **Deactivated**, the bookmark assignment is gone, and the System Log identifies the action on the test user. |

    **Reset.** Remove any remaining lab-only app grants and group memberships. Remove the dedicated bookmark or groups only when your later labs do not need them. Clear the custom field values, restore any external test mappings you changed, and keep or retire the disposable users according to your lab cleanup plan.
