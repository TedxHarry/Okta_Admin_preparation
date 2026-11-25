# Lesson 1 · Connect Active Directory to Okta

=== "Theory"

    Active Directory Domain Services, or **AD DS**, stores information about users, groups, computers, and other objects in a Windows domain. A **domain controller** runs AD DS and answers requests for that domain. The **Okta AD agent** is a Windows service that communicates with the domain and your Okta org. It gives Okta a way to work with the directory while the directory stays on your network.

    ## Know which part you are looking at

    | Part | What it does | Where you inspect it |
    | --- | --- | --- |
    | **Domain** | Holds directory objects under an administrative boundary. | Open **Active Directory Users and Computers** and expand the lab domain. |
    | **Organizational unit (OU)** | Organizes directory objects and gives you a boundary for tasks such as delegating administration or selecting an import scope. | Open the OU in AD. In Okta, inspect which user and group OUs are selected for the integration. |
    | **Domain controller** | Hosts the directory service and helps authenticate domain users. | Inspect AD DS on the lab Windows Server. |
    | **Agent host** | Runs the Okta agent service and reaches both the domain controller and the Okta cloud. | Inspect Windows Services and the host's network connections. |
    | **Okta directory integration** | Holds the relationship to the AD domain and its settings, such as import scope and account handling. | Open **Directory → Directory Integrations** and select the domain. |

    An OU and a security group answer different questions. An OU tells you where an object is stored in the directory tree. A security group contains members. In the lab you will put both a user object and a security group object inside the same OU, then add the user as a member of the group. Later, when a group or member is missing in Okta, you can check both where the objects live and how the membership was set.

    ## Follow the two connections

    The Windows service starts an **outbound HTTPS connection** to Okta. Outbound means the agent starts the connection from your network. HTTPS protects the data on that connection. Okta uses TCP port 443 for this web traffic. **TCP** is a network protocol the agent uses to open a connection. A **port** identifies which network service should receive a connection. The agent host also needs **DNS**, which lets it find the domain controller by name, and a network path to reach that server. If the agent is on a member server or in a segmented network, check those two paths independently. Okta documents additional AD-side ports for a DMZ deployment.

    During a directory import, the agent reads AD data so Okta can process it. With delegated authentication enabled, the agent can also help AD validate a user's password when they sign in to Okta. An agent showing healthy establishes that the integration is communicating. The Import tab and a delegated sign-in test provide evidence for those individual operations.

    ## Separate installation, registration, and runtime access

    | Identity | What it is used for |
    | --- | --- |
    | **Windows installer account** | Runs the installer with the Windows and directory permissions needed for the installation choices, such as creating the service account if required. |
    | **Okta registration admin** | Signs in to your Okta org during setup and authorizes the agent to register with that org. |
    | **AD agent service account** | Runs the Windows service and performs directory operations with the permissions granted to it. |

    In a standard installation, the wizard can create or reuse **OktaService**. An existing service account is also an option if it has the documented rights. Match the permissions to the work. Reading objects for synchronization requires read access. Password reset and outbound provisioning require additional rights for the relevant directory objects. Use the documented permissions for each action and keep the runtime identity outside **Domain Admins**.

    ## Choose where the agent runs

    Use a supported Windows Server **member server** in the same AD forest. A member server joins the domain and runs the Okta agent. Your domain controller continues running AD DS. In VMware, you can keep your existing domain controller and use a second Windows Server virtual machine (VM) as the member server. One agent on that member server is enough to practice the first import. For **high availability**, install agents on at least two separate computers so another host can take over if one goes down. Okta calls for at least three agents when there are more than 30,000 users. Keep agents in the same domain on the same version. A mixed-version deployment can limit that domain's agents to the oldest installed version. [Okta · AD agent prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm)

    Continue with [Import and match Active Directory users](02-import-and-match-ad-users.md) to learn what happens to directory records after the agent connects.

    ## Plan the host and network

    A **forest** groups AD domains that share a directory schema and configuration. An **AD site** represents network topology and helps Windows select reachable domain controllers. An agent uses Windows for controller selection. Put hosts where their domain paths are reliable and scope each integration to the domain or organizational units it needs.

    Okta's prerequisites list supported Windows Server and .NET versions, CPU and memory guidance, and supported AD domain and forest functional levels. Use the current matrix when selecting an agent host. For registration, use an Okta admin account with permissions to manage directories, manage agents, and register agents. For a custom runtime account, verify required read access to every synchronized AD object. Directory reads, password reset, and write-back have different permission requirements.

    A proxied agent connection still needs to reach Okta and meet the agent's TLS requirements. For a **DMZ**, a network segment separated by firewalls, plan the cloud leg and the AD leg independently. The AD leg can use DNS (53), Kerberos (88), LDAP (389 or 636 for LDAP over TLS), Global Catalog (3268/3269), password change (464), RPC endpoint mapping (135 with dynamic ports), and other Windows services documented by Okta. Use Okta's port table for exact directions and transport requirements for the deployed topology.

    [Plan an AD integration](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-get-started.htm) · [AD prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-prerequisites.htm) · [DMZ ports](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-install-dmzports.htm)

    ## Official reading

    - [Integrate with Active Directory learning path](https://learning.okta.com/path/integrate-with-active-directory)
    - [Microsoft · Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
    - [AD integration prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm)
    - [Install the Okta AD agent](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-new-integration.htm)
    - [Okta service account permissions](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-about-service-account.htm)
    - [DMZ server ports](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-install-dmzports.htm) and [multiple AD agents](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-install-multiple.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-1.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Cloud connection | Agent starts outbound HTTPS to Okta. AD reachability is a separate path. |
    | Registration identity | Okta admin with directory and agent permissions. |
    | Runtime identity | Windows service account with AD permissions scoped to the operation. |

    ### Check your recall

    **The agent is available in Okta. How do you verify it can also read directory objects?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Run a scoped import and check the expected user and group records. Agent availability establishes that the service is communicating with Okta.</p>
    </details>

    **Which account needs rights to reset a password in AD?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The runtime service account on the Windows agent. The installer and Okta registration admin serve different purposes.</p>
    </details>

    **Which direction does the cloud connection start?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The agent initiates the outbound connection to Okta. It also has a separate AD network path.</p>
    </details>
