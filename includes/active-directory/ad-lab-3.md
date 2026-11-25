## Lab 3 · Activate imported users and compare AD JIT { #lab-3 }

Use the same test domain and an Okta org that supports AD delegated authentication. Use the staged imported user `okta-lab-new` from Lab 2, a fresh AD user `okta-lab-jit` created after the import, and a new outside-scope AD control user `okta-lab-outside`. The first two belong in a selected user OU. Use a separate test-user browser session for each sign-in.

### 1. Compare import activation choices

1. In **Provisioning → To Okta → User Creation & Matching**, record the separate **Auto-confirm new users** and **Auto-activate new users** settings. Under **General**, note the activation-email option. Verify the confirmed import user under **Directory → People** before activating them.
2. Keep the confirmed user staged for the first part of the JIT test. If you want to compare activation at confirmation and activation after confirmation, create a second disposable imported user. Select **Auto-activate users after confirmation** for that second import result and compare what **People** shows before the first sign-in.
3. If you test delivery, use an inbox you control and explicitly check the activation-email setting first. Compare account status with the actual inbox delivery and any enrollment prompts. A sign-in or enrollment prompt can still depend on the effective Okta policies.

### 2. Verify first-sign-in creation and its boundaries

1. Check **Provisioning → Integration → Delegated Authentication** and use the credential test described in Lab 4. Under **Provisioning → To Okta → General**, enable **Create and update users on login**. Confirm the selected user and group OUs. Add `okta-lab-jit` to the test AD security group from Lab 1, in the selected group OU.
2. Verify the fresh user is not in **People**. In a clean browser session, open the Okta sign-in page and use the test user's effective AD login and password. Satisfy any prompted enrollment. Verify the created Okta user, connected AD account, saved profile and imported group membership. Check the user's sign-in in **Reports → System Log**.
3. Sign in as the staged confirmed user. Verify JIT does not activate that confirmed import. Activate the user in **People**, then use a fresh sign-in to verify the separate import activation path.
4. Try the outside-scope user. Verify the failed attempt and that the Okta user was not created. Review OU scope and username format before repeating. Keep the outside-scope control outside the import configuration.
5. For an existing JIT user, change a mapped test attribute in AD, sign in again, and inspect the profile. Use sign-in timing and logs when available. Opening or refreshing that profile in the Admin Console can itself cause a JIT refresh. Restore the original attribute and the prior JIT settings when done.

[AD Just-In-Time provisioning](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-add-update-jit.htm) · [Configure AD imports and activation email](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm)
