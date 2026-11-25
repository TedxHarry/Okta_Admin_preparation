## Lab 5 · Configure password policies and delegate AD reset rights { #lab-5 }

Use an Okta-managed test user and a disposable linked AD test user. Keep a separate native Okta admin session. Use only disposable AD accounts and an OU where you can review and delegate the agent's permissions. Confirm an effective recovery method is available to the AD test user.

### 1. Read requirements at their source

1. Open **Security → Authenticators → Setup → Password → Actions → Edit**. Review the provider and group scope of the existing test policies. For this isolated exercise, create or reuse an Okta provider policy scoped to the native test user and an AD provider policy scoped to the AD test user.
2. Under the AD policy, use **Use Active Directory requirements**. In AD, identify the effective minimum length, complexity, history, and failed-attempt limit for the test user. Check for a fine-grained password policy if applicable. Record the actual rules that apply to each user.
3. Add or review a rule that permits **Password reset** and the intended recovery methods. Check that test-user enrollment meets the rule's requirements. Compare both lockout settings without locking a shared account. Okta recommends an Okta threshold no higher than half of the directory threshold.
4. Compare a password candidate that meets the Okta test policy and violates the known AD minimum, while satisfying any other common checks configured for the lab. Use disposable passwords and secure entry fields. Record acceptance or rejection and the point at which each test returns it.

### 2. Grant and verify AD reset rights

1. In Windows **Services**, check **Log On As** for the Okta AD Agent. In **Active Directory Users and Computers**, turn on **View → Advanced Features** and inspect the test OU's **Properties → Security → Advanced**. Verify the agent service identity and existing inherited rights before adding anything.
2. Follow Okta's [service account permission reference](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm) to delegate **Reset Password** and Write Property for **pwdLastSet** and **lockoutTime** on descendant user objects in the test OU. Review the resulting entries and effective access on the actual user. Keep the service account's normal read permissions and scope reset writes to the designated OU.
3. From the test user's Okta sign-in page, choose **Forgot password?** and finish the configured recovery flow. Confirm the reset result in Okta, then test a fresh delegated sign-in with the new AD password. Inspect the AD record or audit trail and compare the correct test user and time.
4. If you have a second linked test user outside the delegated reset scope, compare a reset there after confirming that no broader inherited permission already authorizes it. Use the outcome to distinguish missing recovery enrollment from an AD permission problem. Restore original policy settings and remove only lab-created permissions once the remaining exercises no longer need them.

[Configure the Password authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm) · [Service account permissions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm)
