# Module 1 · Manage Users hands-on labs

Choose a tile to jump to the full exercise on this page. The capstone is on this page. You will create and activate users, bring in account data, trace who controls a profile value, and decide how to restore or remove access. Each lab ends with evidence you can use to explain the result.

## Before you start

Use an isolated **Okta Identity Engine** lab org, two email addresses or aliases you control, and a separate administrator account. Your admin permissions must cover the actions you practice, including user lifecycle, Profile Editor, app and group assignments, or System Log access. Use a separate browser profile or private session for test-user sign-in. Keep passwords, recovery links, tenant URLs, and personal data out of your notes.

| Lab object | Where it comes from |
| --- | --- |
| **A** and **B** | Two disposable Okta-managed users you create in Lab 2. Use unique usernames and inbox addresses you can receive mail at. |
| **CSV user** | A third disposable user created from your org's People CSV template in Lab 3. |
| **Lab Cost Center** | A custom text field named `m1LabCostCenter` that you create in Lab 4. |
| `LAB-Manage-Users-Bookmark` | A test integration that opens `https://example.com/`, created in Lab 6 and reused in Lab 7. |

The CSV exercise needs the People CSV import action. The connector exercises need an isolated supported integration, source-side access, and the corresponding Okta features. Run the core checks first and use the supplied decision exercises when an external system is unavailable.

## What this module prepares you for

Use the [official Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) for the full exam scope. The exercises below build core user administration skills and introduce specific exam tasks. Keep these boundaries in mind when you plan your practice.

| Area | Practice here | Continue in the course |
| --- | --- | --- |
| User administration | Find and edit a user, create and activate users, import a People CSV, restore sign-in, and offboard a user. | Use the capstone to bring these tasks together without following a recipe. |
| Part I · AD and LDAP integration | Compare import and first sign-in, identify password ownership, and try the connected extension if you have a test directory. | [Active Directory and LDAP](../../week-04-ad-and-ldap/lessons/01-connect-active-directory.md) covers the agent setup. The [exam coverage map](../../exam/coverage.md) tracks the remaining directory exercises. |
| Part I · Profiles, sourcing, and write-back | Trace a profile source, create a custom field, and diagnose an inbound mapping. Use the two-source extension if you have the necessary connections. | [Profile sourcing and priority](../../week-02-directory-and-lifecycle/lessons/04-profile-sourcing-and-source-priority.md), [provisioning](../../week-02-directory-and-lifecycle/lessons/05-application-provisioning.md), [Group Push](../../week-02-directory-and-lifecycle/lessons/06-group-push.md), and [Workflows](../../week-02-directory-and-lifecycle/lessons/07-okta-workflows.md). |
| Part II · Custom app integration | Create a custom user field and assign a test app to a group. Use the bookmark to verify assignment and launch. | [Custom SAML attributes and group assignment](../../week-03-saml-and-mappings/lessons/02-custom-saml-attributes-and-group-assignment.md) covers the group rule, expression, SAML integration, mapping, and receiving-app verification. |
| Part II · Monitoring and troubleshooting | Reproduce a sign-in problem, choose a recovery action, and find a successful retry and inspect the factor recorded in the System Log. | [System Log and access investigations](../../week-01-foundations/lessons/05-system-log-and-access-investigations.md) and the factor-specific practice tracked in the [exam coverage map](../../exam/coverage.md). |
| Part II · Behavior Detection and Device Assurance | The sign-in labs introduce the account, authenticator, and session evidence used in later practice. | The dedicated configurations and policy testing are tracked in the [exam coverage map](../../exam/coverage.md). |

## Choose a lab { #manage-users-lab-grid }

- [1. Read a user record](#lab-1){ #__tabbed_1_1 }

    Find a user and distinguish the profile, status, and assignments.

- [2. Create and activate users](#lab-2){ #__tabbed_1_2 }

    Compare Activate later with Activate now, then verify both test sign-ins.

- [3. Import and match users](#lab-3){ #__tabbed_1_3 }

    Import a user from a CSV and compare how a connected import can propose a match.

- [4. Trace ownership and mappings](#lab-4){ #__tabbed_1_4 }

    Create a test field and trace an unexpected value to its source or mapping.

- [5. Recover sign-in](#lab-5){ #__tabbed_1_5 }

    Choose and verify the right sign-in recovery action.

- [6. Trace app access](#lab-6){ #__tabbed_1_6 }

    Compare direct and group-based app access. Remove group memberships one at a time and verify when the bookmark disappears.

- [7. Pause and offboard](#lab-7){ #__tabbed_1_7 }

    Compare clearing a session, suspending a user, and deactivating a user. Check sign-in, assignments, and the System Log.

- [Capstone](#capstone)

    Practice one contractor’s onboarding, sign-in recovery, leave of absence, and offboarding.

--8<-- "lab-1.md"

--8<-- "lab-2.md"

--8<-- "lab-3.md"

--8<-- "lab-4.md"

--8<-- "lab-5.md"

--8<-- "lab-6.md"

--8<-- "lab-7.md"

<span id="__tabbed_1_8"></span>

## Capstone

**Ticket.** A new contractor needs the test bookmark. A week later the contractor reports a lost enrolled phone. After the account returns to normal, the contractor goes on leave and will come back with the same access. At the end of the contract, access must be removed.

Use a fresh disposable account and the bookmark from Lab 6. Before granting the bookmark, sign in as the contractor, confirm the tile is missing, and explain which admin view proves the assignment is absent. Grant it and retest. Carry out the remaining lifecycle actions using the ticket as your brief. If a spare authenticator is unavailable, write the exact action and verification you would use for recovery.

| Evidence to produce | What it should show |
| --- | --- |
| User record and first sign-in | The account was created, activated, and could sign in. |
| Assignment and dashboard | The tile was missing before the grant. After the change, you can trace it to the direct grant or test group you chose and show the tile in the user's dashboard. |
| Recovery action and result | The selected method is re-enrolled and a fresh sign-in succeeds, or your written procedure identifies the missing lab prerequisite. |
| Leave and return | Sign-in was blocked while the bookmark assignment remained, and worked after the hold was lifted. |
| Offboarding | The record is **Deactivated**, the bookmark assignment is gone, and the System Log identifies the action on the test user. |

**Reset.** Remove any remaining lab-only app grants and group memberships. Remove the dedicated bookmark or groups only when your later labs do not need them. Clear the custom field values, restore any external test mappings you changed, and keep or retire the disposable users according to your lab cleanup plan.
