## Capstone · Onboard, secure, and offboard directory users { #capstone }

Connect a disposable directory to a lab Okta org. Prove that an imported user and a first-sign-in user arrive through different paths, that directory access changes reach the right records, and that you can diagnose one failure using evidence. Complete the tasks before opening the worked solution.

### Starting state

Use an isolated Okta Identity Engine org with **Add Active Directory** available and a native Okta admin who can still sign in without the lab directory. Use one supported AD agent host, a test domain, and separate in-scope and out-of-scope OUs. For the failover extension, use a second agent host. For the LDAP extension, use a supported LDAP test deployment. The offline exercise below uses supplied evidence and needs neither directory.

| Test identity | Initial directory state | Intended use |
| --- | --- | --- |
| `m4-cap-import` | Active AD account in the import OU. Create a native Okta test record with a matching username before import. | Prove a link preserves the existing Okta identity. |
| `m4-cap-new` | Active AD account in the selected OU and absent from Okta. | Compare confirmation with activation. |
| `m4-cap-jit` | Create in AD after the final user import for this comparison. Member of the in-scope AD security group. | Prove first-sign-in account creation and imported group assignment. |
| `m4-cap-control` | Active in an unselected AD OU and absent from Okta. | Prove import and JIT scope boundaries. |
| `m4-cap-outbound` | Native Okta user with no AD account, for the outbound extension. | Verify a separate, authorized write to AD. |

### 1. Connect, import, and activate

- Set up the AD agent with scoped read access and verify the host, agent, and selected OUs. Create one in-scope AD security group that can source a test access rule.
- Record the integration's scope, lifecycle, delegated authentication, JIT, and schedule settings before changing them. Keep scheduled imports off until the first-sign-in comparison is complete. Configure exact matching and review one proposed existing match and one new user. Keep the new user staged after confirmation. Inspect the existing link, staged new user, and absent control.
- Enable delegated authentication and JIT. Compare a fresh eligible user, the staged confirmed user, and the out-of-scope user in fresh browser sessions. Activate the staged user through its import or People path and verify sign-in separately.
- Capture the relevant evidence without passwords or activation codes. Explain why account status, delegation result, and app access are separate observations.

### 2. Verify access, password recovery, and offboarding

- Use the imported AD group as a source condition for a native Okta group. Assign only a disposable app, such as a Bookmark app linking to a safe test page, to the native group. Verify the AD source group, native group and Okta app assignment. An app tile verifies assignment in Okta. Use a separate supported provisioning-enabled target if you also need to prove an external app account changes.
- Configure a scoped Password rule and have the agent reset a linked test user's AD password using its delegated AD permissions. Prove a fresh delegated sign-in with the new credential. Record the recovery and sign-in outcomes with no credential material.
- Remove the JIT user from the AD source group and verify the rule-managed membership and app assignment change after the appropriate refresh. Check the user remains active if you only changed group membership.
- On the isolated AD integration, set **When a user is deactivated in the app** to **Deactivate Okta user**. This changes behavior for the integration. Run the comparison using the disposable test users. Disable one AD test account and process the relevant sync or full import. Compare the AD account state, Okta user status, app assignment, and a fresh sign-in. Restore the test account or retire it according to the original lab settings.

### 3. Exercise resilience and additional directory paths

| Available environment | Task | Proof |
| --- | --- | --- |
| Two AD agent hosts | Stop one agent, confirm its availability changes, and authenticate through the remaining path. Restore the stopped agent. | Both baseline agent states, changed state, fresh sign-in outcome, and restored inventory. |
| Scoped outbound AD write access | Provision `m4-cap-outbound` to a separate disposable target OU and update a test field. Push a separate group. | The same AD account before and after the attribute update, the pushed group membership, and the preserved provisioning assignment. |
| Supported LDAP test server | Configure LDAP delegated authentication and prove a real sign-in using a linked standard LDAP user. | Agent status, linked user, credential test, and actual sign-in evidence. |

### 4. Assess the live result

Use the core evidence below before marking the live capstone complete. If you lack a second agent or LDAP server, record that extension as **Not run**. The simulated work below can demonstrate diagnosis without a live integration.

| Core task | Evidence to mark it complete |
| --- | --- |
| Agent and scope | The intended domain shows an available agent. The selected user and group OUs include the lab objects and exclude the control OU. |
| Import and activation | The matched user keeps the same Okta ID. The newly confirmed user is staged before manual activation, then can complete the intended sign-in. |
| JIT and control | The fresh AD user is absent in Okta before sign-in and linked correctly afterward. The previously confirmed staged user is ineligible for JIT activation. The outside-scope user remains absent after the attempt. |
| Groups and assignment | The imported group's membership, rule-driven Okta group, and app assignment agree. Removing the AD membership removes the rule-driven access path after the update is processed. |
| Recovery | Okta records successful recovery, and a fresh delegated sign-in accepts the new AD password. Capture outcomes without recording the password. |
| Offboarding and rollback | The disabled test AD account produces the configured Okta state after processing. The app assignment and fresh sign-in are checked separately. The unaffected control and native Okta admin remain in their original states. |

### 5. Diagnose a fault with the laptop offline

The observations below are simulated. For each symptom, write the first evidence you would request. Reveal the evidence after you have chosen where to look. Then identify the cause, the smallest corrective change, and how you would verify the repair.

| Case | Initial observation |
| --- | --- |
| 1 | A fresh AD user never reaches Okta. |
| 2 | An imported user cannot finish their first sign-in. |
| 3 | The current password works, but account recovery fails. |
| 4 | The AD source group exists in Okta, but an expected app assignment is missing. |
| 5 | The Okta app user shows the new Department, but AD still has the old value. |
| 6 | The test user still shows Active in Okta after source disablement. |

<details class="revision-answer">
<summary>Reveal the evidence</summary>
<ol>
<li>The agent is available. AD shows the account enabled. The user's OU is absent from the integration's selected user OUs.</li>
<li>Import confirmation completed. The Okta user is Staged. JIT is enabled.</li>
<li>The user completes Okta recovery verification. The AD reset write fails for an account outside the OU with delegated reset rights.</li>
<li>The expected user is absent from the imported group. The user belongs through a nested child group outside the regular import scope.</li>
<li>Update User Attributes is enabled. The provisioning task reports a write authorization error on the target AD account.</li>
<li>The AD disablement was processed. AD is the highest-priority source. The integration's lifecycle action is Do Nothing.</li>
</ol>
</details>

<details class="revision-answer">
<summary>Show the worked solution and verification criteria</summary>

<ul>
<li><strong>Scope:</strong> Verify the object's OU against the selected user OUs. Move the lab object into scope or choose the intended scoped configuration. Repeat first sign-in with an eligible account and verify the new Okta record.</li>
<li><strong>Activation:</strong> A confirmed record is ineligible for JIT activation. Activate the staged user through the admin flow and verify their status and a fresh sign-in.</li>
<li><strong>Recovery:</strong> Verify the effective Reset Password, pwdLastSet, and lockoutTime rights for the agent on the specific user. Repeat with authorized scope and verify the actual AD credential change.</li>
<li><strong>Group membership:</strong> Fix the nested group's import scope and verify resolved membership. Then trace the active rule, native group, and app assignment.</li>
<li><strong>Write-back:</strong> Compare the destination user and the agent's effective write access to the exact AD attribute. Verify the recovered task and the value on that same AD record.</li>
<li><strong>Lifecycle:</strong> Do Nothing retains the Okta lifecycle state through this source event. Configure the intended deactivation or suspension action in the sandbox, repeat with an isolated test identity, and compare both account states and the actual sign-in.</li>
</ul>

</details>

### Restore the lab

Restore service availability and the original AD integration scope, import schedule, JIT, delegated authentication, lifecycle and activation settings. Restore Password policies, source priority, and any changed test-user attributes. Remove or deactivate temporary rules and test assignments. Retire only the host registrations, groups, and permissions you created for the capstone if you no longer need them. Verify your native Okta admin and the unaffected control remain in their intended states.
