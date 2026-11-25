# Lesson 4 · Delegate AD authentication and manage agent health

=== "Theory"

    **Delegated authentication** sends password validation to the directory. For an AD-delegated sign-in, Okta sends the request to an available Okta AD agent, the agent passes the credentials to a domain controller, and the result returns to Okta. Okta evaluates its own session and app sign-in requirements. A valid AD password may satisfy one step and still leave another authenticator or policy requirement to complete.

    Okta enables delegated authentication by default for a new AD integration. Inspect the actual instance under **Directory → Directory Integrations → AD instance → Provisioning → Integration → Delegated Authentication**. The **Test Delegated Authentication** control checks the directory credential path. An actual sign-in additionally tests the user's account status, enrollment, policy, and app assignment. Profile sourcing controls who supplies profile data. An integration can delegate passwords to AD while another source supplies the user's profile.

    [Enable AD delegated authentication](https://help.okta.com/oie/en-us/content/topics/security/enable_delegated_auth.htm) · [AD delegated authentication flow](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_delegated_authentication.htm)

    ## What makes failover work

    Each agent opens its own connection to Okta. Okta assigns work to an available agent and removes unavailable agents from the queue. The agent relies on Windows to select a domain controller. For high availability, install at least two agents on separate servers in each integrated domain. Two agents still rely on their shared infrastructure, so check domain-controller, DNS, proxy, and network dependencies separately.

    The agent-to-Okta path uses outbound HTTPS on TCP 443. A host in a **demilitarized zone (DMZ)**, a segmented network, also needs the documented routes back to AD. DNS and Kerberos support domain location and authentication. LDAP and the Global Catalog support directory access. Remote Procedure Call (RPC) uses an endpoint mapper and dynamically assigned ports, and Kerberos password change has a separate port. Use Okta's DMZ table for precise ports and protocols, then verify each host can use the services it needs.

    [Multiple agents and failover](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-multiple-agents.htm) · [DMZ ports](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-install-dmzports.htm)

    ## Read the evidence in order

    | Observation | Where to investigate |
    | --- | --- |
    | All agents unavailable | Check Windows Services, each host's outbound path to Okta, and instance registration. |
    | Agent available and delegated credential test fails | Check the submitted login, directory account status, and the agent host's route to its domain controller. |
    | Credential test passes and live sign-in fails | Read the actual sign-in's **System Log** event and check user status, enrollment, session, and app sign-in requirements. |
    | Delegated requests are slow | Open **View Logs** on the AD instance. Compare the documented agent-processing and domain-controller timings where present. Agent processing time includes domain-controller time. |

=== "Hands-on Lab"

    Use [a connected test domain](01-connect-active-directory.md) and a disposable, active, linked AD user. Run the integration's delegated-authentication test, then sign in from a separate browser session. Match the time and user in **View Logs** and check the actual sign-in outcome.

    To verify failover, register a second agent on a separate supported host in the same domain. Verify both in Okta. Stop the first host's agent service, wait until Okta reports it unavailable, then repeat a fresh password sign-in. Capture the result and restart the service. Verify both agents are available again.

=== "Revision"

    **The integration credential test succeeds, but the user cannot finish signing in. Where do you look next?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Find that user's actual sign-in in System Log. Check account status, authenticator enrollment, session policy, app sign-in policy, and assignment as applicable.</p>
    </details>
