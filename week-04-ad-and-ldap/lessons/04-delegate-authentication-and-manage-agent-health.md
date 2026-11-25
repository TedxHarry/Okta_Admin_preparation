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

    ## What failover protects

    Agents send periodic messages to Okta. Okta documents that an agent is marked unavailable after 120 seconds without a message. The remaining available agents can validate subsequent delegated requests. Failover across agent hosts depends on a surviving path to the domain and Okta. A cached browser session cannot prove that a fresh password request reached a surviving agent.

    Okta calls out the Windows **Access this computer from the network** policy on the agent host as a dependency for delegated authentication. If a security baseline changes this policy and the agent is otherwise reachable, examine the user's effective rights before changing unrelated Okta settings. [AD delegated authentication flow and Windows policy](https://help.okta.com/oie/en-us/content/topics/directory/directory_ad_delegated_authentication.htm) · [Agent selection and availability](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-multiple-agents.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-4.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Credential test | Tests directory password validation. |
    | Fresh sign-in | Adds the user state, enrollment and effective Okta policy requirements. |
    | Failover | Verify one agent is unavailable, another available, and a new password attempt succeeds. |

    ### Check your recall

    **The integration credential test succeeds, but the user cannot finish signing in. Where do you look next?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Find that user's actual sign-in in System Log. Check account status, authenticator enrollment, session policy, app sign-in policy, and assignment as applicable.</p>
    </details>

    **What evidence shows the surviving agent handled a fresh sign-in?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Verify one peer is unavailable and one is available. Then use a fresh password attempt and compare the sign-in outcome and agent or System Log evidence.</p>
    </details>

    **What is the difference between the two AD timing fields?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Agent time includes domain-controller time. The domain-controller field reports time at that controller.</p>
    </details>
