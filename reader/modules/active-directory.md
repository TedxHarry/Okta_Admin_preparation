# Module 4 · Active Directory Integration

Connect a Windows AD domain to Okta. Follow a user from directory import or first sign-in through activation and access, then verify how the integration handles password recovery, group membership, outbound writes, and offboarding. Use the LDAP lesson to compare architecture, import, and delegated authentication.

[Start Lesson 1 · Connect Active Directory to Okta](../week-04-ad-and-ldap/lessons/01-connect-active-directory.md){ .md-button .md-button--primary }

Start with the **Theory** tab in each lesson. Use **Revision** to check your understanding before opening the hands-on instructions. [Exam objectives and official reading](active-directory/source-and-lab-plan.md)

## Lessons

1. [Connect Active Directory to Okta](../week-04-ad-and-ldap/lessons/01-connect-active-directory.md)
2. [Import and match Active Directory users](../week-04-ad-and-ldap/lessons/02-import-and-match-ad-users.md)
3. [Activate AD users and configure Just-In-Time provisioning](../week-04-ad-and-ldap/lessons/03-activate-ad-users-and-configure-jit.md)
4. [Delegate AD authentication and manage agent health](../week-04-ad-and-ldap/lessons/04-delegate-authentication-and-manage-agent-health.md)
5. [Manage password policy and directory recovery](../week-04-ad-and-ldap/lessons/05-manage-password-policy-and-directory-recovery.md)
6. [Import AD groups and write data back to AD](../week-04-ad-and-ldap/lessons/06-import-ad-groups-and-write-back-to-ad.md)
7. [Connect LDAP and delegate LDAP authentication](../week-04-ad-and-ldap/lessons/07-connect-ldap-and-delegate-ldap-authentication.md)
8. [Manage AD profile sourcing and lifecycle](../week-04-ad-and-ldap/lessons/08-manage-ad-profile-sourcing-and-lifecycle.md)
9. [Operate and troubleshoot directory integrations](../week-04-ad-and-ldap/lessons/09-operate-and-troubleshoot-directory-integrations.md)

## Lab environment

[Start the end-to-end AD project](active-directory/directory-integration-project.md){ .md-button .md-button--primary }

Read any **Theory** or **Revision** tab while your laptop is offline. Use the simulated capstone records to practice diagnosing an import, activation, recovery or write failure.

When you are ready for hands-on practice and your laptop is online, start with the [VMware and agent preflight](active-directory/hands-on-labs.md#ad-lab-preflight). [All hands-on labs](active-directory/hands-on-labs.md) · [Capstone](active-directory/hands-on-labs.md#capstone)

For live AD work, use an isolated VMware domain, one supported Windows Server agent host, and an Okta Identity Engine org that exposes **Add Active Directory**. Keep a native Okta admin independent of the lab directory. The AD failover lab needs a second host. The LDAP lab needs a supported reachable LDAP server and agent host. The outbound and Group Push exercises need scoped rights on the test target OU.

[AD integration prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-prerequisites.htm) · [LDAP integration prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-prerequisites.htm)
