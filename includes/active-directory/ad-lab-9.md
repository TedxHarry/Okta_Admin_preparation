## Lab 9 · Diagnose and recover a directory integration { #lab-9 }

Use the test integration, one ordinary linked user, and the test OU from the initial labs. A second agent is needed only for the rolling maintenance exercise. Capture only synthetic evidence and omit sensitive details from exported logs and screenshots.

### 1. Diagnose an import that misses a user

1. Record the working integration, user-store link and agent availability. Create a new test user in an unselected disposable OU while JIT is off. Import and inspect the results.
2. Verify the AD object exists and the agent is available. Compare the user's OU with **Provisioning → Integration → User OUs connected to Okta**. Find the first difference between the configured scope and the user's location.
3. Move only the disposable record to the preselected test OU. Run another import and verify the expected candidate now appears. Resolve the match intentionally. Verify that correcting scope did not import unrelated users.

### 2. Audit agent maintenance and advanced options

1. In **Agents**, inventory agent hosts, versions, and connection state. Find where Okta exposes agent update, scheduling, and per-agent status for your org. If using a two-host sandbox and an approved update is available, update one agent, verify it returns to available, and run a delegated password sign-in and a scoped import before updating the peer.
2. Locate the AD agent log and the corresponding Okta events for your tests. Match the time and operation. For a skipped or failed task, note the first observed error and the recovered outcome.
3. If the sandbox exposes DirSync, navigate to **Agents → DirSync Readiness Check** and inspect the results per agent. Use the official permission and compatibility requirements before enabling the setting. If this is already enabled, verify the import type and preserve the original configuration for cleanup.
4. For each optional feature described in Theory, identify who owns credential validation or membership and which extra components or permissions are required. Keep password synchronization, migration, Desktop SSO, and provisioning script changes in a separate sandbox when you choose to run their linked procedures.

[Manage AD agents](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-manage-integration.htm) · [Automatically update agents](https://help.okta.com/oie/en-us/content/topics/directory/agent-auto-update-main.htm) · [Locate AD agent logs](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-log-info.htm)
