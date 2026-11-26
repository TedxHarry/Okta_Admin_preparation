# Active Directory capstone · Run a directory lifecycle project

Connect a VMware test domain to Okta, follow users through import and first sign-in, then trace profile updates, app access, recovery, and offboarding across both systems.

Use an isolated AD domain, a supported Windows Server agent host with connectivity to both AD and Okta, and an Okta Identity Engine test org with **Add Active Directory**. Keep a native Okta administrator signed in separately so you can recover access without the test directory. Use disposable directory objects and test mailboxes. Keep passwords, tenant identifiers, and activation links out of your notes.

| Test object | Starting state and purpose |
| --- | --- |
| `Okta-Lab` | Selected test OU for the core exercise. An OU is an organizational unit in AD. |
| `Okta-Lab-Control` | Test OU excluded from the integration's user scope. |
| `okta-lab-import` | AD user in scope. Create a disposable native Okta account with the matching username before confirming the import. |
| `okta-lab-new` | AD user in scope who starts outside Okta. Confirm the import while leaving immediate activation off. |
| `okta-lab-jit` | Create in AD after the final import in the first-sign-in comparison. |
| `okta-lab-control` | Enabled AD user in the excluded OU, with no Okta account. |
| `Okta-Lab-Users` | AD security group in the selected group OU. Used to drive access through a native Okta group. |

=== "1. Connect the lab domain"

    1. Start the VMware domain controller and agent host. In **Active Directory Users and Computers**, prepare the two test OUs, the import and new users, the outside-scope control, and the AD security group. Use unique usernames and populate the required names and email fields. Leave the JIT user out of AD until Phase 3.
    2. On the agent host, use the [VMware and network preflight](hands-on-labs.md#ad-lab-preflight) to check domain discovery, connectivity to the domain controller, and the outbound path to the Okta org. Replace the examples with the actual lab DNS names. An agent connection test and an import are later checks of the whole path.
    3. In **Directory → Directory Integrations → Add Directory → Add Active Directory**, download and install the agent on the supported host. Register it to the test org and verify the intended domain and agent availability. If you already have a disposable integration, open it and verify the same state. Check Windows **Services → Okta AD Agent → Log On As** to identify the runtime identity.
    4. Under the AD instance's **Provisioning → Integration**, record the original **User OUs** and **Group OUs**, then select the test OUs. Verify `Okta-Lab-Control` is excluded from user scope. Under **To Okta → General**, record the username format, import schedule, activation email option, JIT, and **Skip users during import**. Record the original matching, lifecycle, and delegated authentication settings as well. Use these values for the restore step.

    [AD Agent prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-prerequisites.htm) · [Install and configure the AD agent](hands-on-labs.md#lab-1)

=== "2. Import and confirm users"

    1. Under **Provisioning → To Okta → General**, set **Schedule Import** to **Never** where offered for this lab. Keep **Create and update users on login** off and **Skip users during import** cleared. Let any running import finish before the comparison.
    2. In **Directory → People → Add Person**, create the disposable native Okta counterpart of `okta-lab-import` using the integration's generated username. Record its Okta user ID before import. If the AD record is already linked, use a new disposable AD and native Okta matching pair. Keep `okta-lab-new` absent in Okta.
    3. In **Provisioning → To Okta → User Creation & Matching**, choose exact username matching and turn off automatic confirmation and activation for the test. Open **Import → Import Now → Full import**. Compare the proposed existing match and new row, then use **Confirm Assignments** for those two rows only. Leave immediate activation off for the new user.
    4. In **People**, verify the matched account retained its Okta ID and has the intended AD link. Verify the newly confirmed user is **Staged** and the outside-scope user is absent. Keep the staged account for Phase 3.
    5. For an incremental update, change a mapped Department value on a disposable linked user in AD and run **Incremental import**. Check the same Okta user ID and the saved value. For a separate confirmed test user moved out of scope, compare incremental and full import as shown in the [import lab](hands-on-labs.md#lab-2). Restore that user's original OU before continuing.

    [Configure import and account settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm) · [Confirm imported assignments](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-confirm-user-assignments.htm)

=== "3. Compare JIT and delegated sign-in"

    1. In **Directory → Directory Integrations → AD instance → Provisioning → Integration → Delegated Authentication**, enable **Enable delegated authentication to Active Directory**. Run **Test Delegated Authentication → Authenticate** with an enabled disposable AD user. Verify the credential test succeeded before moving to actual browser sign-ins.
    2. Under **Provisioning → To Okta → General**, enable **Create and update users on login**. After the last manual import has finished, create `okta-lab-jit` in the selected user OU and add it to `Okta-Lab-Users`. Keep the schedule off or follow the [JIT lab's Skip users during import procedure](hands-on-labs.md#lab-3) if you cannot pause scheduling. Verify the user is absent in **People** before signing in.
    3. Use a fresh test browser session for each attempt. Sign in as the in-scope JIT user, then verify its newly created Okta record, AD account link, and group. Attempt a sign-in as the staged confirmed user. It should remain staged until you activate it in **People**. After activation, verify a fresh sign-in. Attempt the outside-scope user's sign-in and confirm it remains absent from Okta.

        | Identity | Expected evidence |
        | --- | --- |
        | Fresh in-scope AD user | A linked Okta account is created after successful first sign-in and any required enrollment. |
        | Already confirmed and staged | JIT leaves the account staged. Admin activation is a separate step. |
        | Outside the selected AD user OUs | No newly created Okta account from the attempt. |

    4. Open **Reports → System Log** and compare the sign-in attempts by user and timestamp. A successful delegated credential test shows that AD accepted the credentials. The fresh sign-in also passes through Okta account state and authentication policies.

    [AD JIT provisioning](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-add-update-jit.htm) · [Delegated sign-in lab](hands-on-labs.md#lab-4)

=== "4. Verify group access and recovery"

    1. Open the imported `Okta-Lab-Users` group in **Directory → Groups** and verify its AD source and the JIT user's membership. Create a fresh native Okta group named **LAB-M4-Project Access**. In **Rules → Add Rule**, use the imported group's membership as the Basic condition and set the native group as the target. Preview the JIT user where supported, save, and activate.
    2. Assign a disposable **Bookmark App** to **LAB-M4-Project Access** from the app's **Assignments → Assign to Groups**. Verify the JIT user's source membership, rule-managed target membership, and dashboard tile. Remove that user's membership from the group in **Active Directory Users and Computers**. In Okta, run **Import → Import Now → Full import** with user import enabled. After it finishes, recheck the source group, rule-managed group, and app grant. The tile should disappear if this was the only grant. Restore the starting membership if you will use it for the lifecycle comparison.
    3. In **Security → Authenticators → Setup → Password → Actions → Edit**, open the relevant test policy. Scope the AD provider policy and Password reset rule to the disposable recovery user and verify an enrolled recovery method. Compare the effective AD password requirements with the Okta-managed policy.
    4. Follow the [scoped AD reset rights lab](hands-on-labs.md#lab-5) to check the agent service account on the test OU and actual test user. Verify effective **Reset Password**, `pwdLastSet`, and `lockoutTime` permissions before adding any missing lab rights. From the user's Okta sign-in page select **Forgot password?**, complete the recovery flow, and verify a fresh delegated sign-in with the new AD password.

    [Configure the Password authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm) · [AD agent account permissions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm)

=== "5. Follow offboarding and write-back"

    1. Under **Provisioning → To Okta → Profile & Lifecycle Sourcing**, confirm AD is allowed to source the disposable linked user. Inspect source order in **Directory → Profile Sources** and confirm the relevant inbound mapping in **Profile Editor**. Edit a lab field in AD, import it, and verify its persisted Okta value.
    2. For the import-only comparison, temporarily turn off JIT on this isolated instance. With the disposable AD user active and assigned to the test app, select **When a user is deactivated in the app → Deactivate Okta user**. Disable that user in AD and run a full import. Compare the AD account, Okta user status, app assignment, and a fresh sign-in. The Okta assignment check is separate from any receiving account deactivation.
    3. For the outbound branch, use a separate lab target OU and a native Okta test user with no existing AD account. Verify that the target OU is selected and the agent has the scoped create and write permissions. In the AD integration's **Provisioning → To App**, enable the required **Create Users** and **Update User Attributes** options for the test. Follow [the outbound AD lab](hands-on-labs.md#lab-6) to select the exact target OU in the provisioning group's **Directories** settings and check the outbound mapping.
    4. Assign the native Okta test user through the provisioning group. Verify the new AD user in the chosen OU. Change one mapped test attribute in Okta and check the provisioning result and the same AD account. If using Group Push, use a separate push group, check the receiving membership, and remove that membership before removing the provisioning assignment.

    [AD sourcing and lifecycle comparison](hands-on-labs.md#lab-8) · [App assignments and Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/app-assignments-group-push.htm)

=== "6. Diagnose and restore the lab"

    Use the table to choose a starting point. For a live troubleshooting run, reproduce one issue in the isolated domain, change the relevant setting, and repeat only the affected operation.

    <span id="directory-diagnosis-explorer"></span>

    | Symptom | Check first | Verify after repair |
    | --- | --- | --- |
    | A fresh AD user never appears in Okta | Compare the user's OU with the selected user OUs. Check agent availability and JIT. | An eligible user in scope can sign in and gets a linked Okta record. |
    | An imported account cannot finish first sign-in | Inspect the account's import confirmation and Okta status. | Activate the staged record and verify a fresh sign-in. |
    | AD password sign-in works, but reset fails | Check recovery enrollment, then the runtime identity's effective reset rights on the actual user. | The reset succeeds and a fresh delegated sign-in uses the new password. |
    | The expected app tile is missing | Check AD membership, imported member list, native rule result, and app assignment in that order. | The intended group path grants the app, and the test user sees the tile. |
    | An outbound field stays stale in AD | Compare the mapping, provisioning result, and effective write permissions on the target object. | The same target account shows the new value and the write has a successful result. |

    **Optional live branches.** With a second supported AD agent host registered to the same integration, follow [the failover lab](hands-on-labs.md#lab-4) to test a fresh delegated sign-in with one agent stopped, then restore it. With a supported LDAP test server and agent host, follow [the LDAP lab](hands-on-labs.md#lab-7) to verify a linked LDAP user and a fresh delegated sign-in in that environment.

    **Restore.** Restore the test integration's original scope, sourcing, lifecycle, import, matching, JIT, and delegated authentication settings. Restore Password policy settings. Re-enable the disposable AD user if you are keeping it and verify the configured reactivation result. Clean up lab-created rules, grants, and directory permissions. Verify the native admin can still sign in.

[All Active Directory labs](hands-on-labs.md) · [Exam objectives and official reading](source-and-lab-plan.md)
