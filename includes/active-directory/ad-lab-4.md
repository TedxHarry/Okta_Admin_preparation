## Lab 4 · Verify delegated sign-in and AD agent failover { #lab-4 }

Use a linked, active test AD user whose current password you know. Keep a separate native Okta admin session. The failover exercise needs a second supported Windows server in the same integrated domain and a second registered agent.

### 1. Compare the agent test and a sign-in

1. Open **Directory → Directory Integrations → AD instance → Provisioning → Integration → Delegated Authentication**. Verify **Enable delegated authentication to Active Directory** is selected and save if changed. Use **Test Delegated Authentication → Authenticate** with the test account. Check the result before attempting a browser sign-in.
2. Sign in as the user in a private window or separate browser profile. Use the password method to exercise the AD path. Complete the additional requirements from the Okta sign-in policies if prompted.
3. Open the instance's **View Logs** or **Reports → System Log**. Compare the user, time, and outcome. Where the event includes them, read the AD agent processing and domain-controller timings. Compare a credential success with the result of any subsequent authenticator or app policy evaluation.
4. Test one incorrect password below the lockout threshold. Find the failed event and compare it with a valid password attempt. Use a disposable account and stop if the account or provider reports a lockout.

### 2. Verify automatic failover

1. On the second Windows host, use the installation path from Lab 1 to register a second agent with the same org and integrated domain. Match the agent versions and verify both hosts appear as available on **Agents**.
2. Stop the first lab agent in Windows **Services**. Wait for Okta to show that agent unavailable. The documented heartbeat timeout is 120 seconds. Verify the other agent is still available. Keep the test org isolated during the stop.
3. Repeat a fresh delegated password sign-in. Compare the agent inventory and attempt result. If authentication fails, verify the surviving agent is registered for the intended AD instance and can reach a domain controller.
4. Start the first agent. Verify both hosts return to available and repeat the baseline test. Restore any lab-only authentication setting changed for the exercise.

[Enable AD delegated authentication](https://help.okta.com/oie/en-us/content/topics/security/enable_delegated_auth.htm) · [Multiple AD agents](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-multiple-agents.htm)
