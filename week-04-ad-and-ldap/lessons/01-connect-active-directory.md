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

    The Windows service starts an **outbound HTTPS connection** to Okta. Outbound means the agent starts the connection from your network. HTTPS protects the data on that connection. Okta uses TCP port 443 for this web traffic. A **port** identifies which network service should receive a connection. The agent host also needs **DNS**, which lets it find the domain controller by name, and a network path to reach that server. If the agent is on a member server or in a segmented network, check those two paths independently. Okta documents additional AD-side ports for a DMZ deployment.

    During a directory import, the agent reads AD data so Okta can process it. With delegated authentication enabled, the agent can also help AD validate a user's password when they sign in to Okta. An agent showing healthy establishes that the integration is communicating. The Import tab and a delegated sign-in test provide evidence for those individual operations.

    ## Separate installation, registration, and runtime access

    | Identity | What it is used for |
    | --- | --- |
    | **Windows installer account** | Runs the installer with the Windows and directory permissions needed for the installation choices, such as creating the service account if required. |
    | **Okta registration admin** | Signs in to your Okta org during setup and authorizes the agent to register with that org. |
    | **AD agent service account** | Runs the Windows service and performs directory operations with the permissions granted to it. |

    In a standard installation, the wizard can create or reuse **OktaService**. An existing service account is also an option if it has the documented rights. Match the permissions to the work. Reading objects for synchronization requires read access. Password reset and outbound provisioning require additional rights for the relevant directory objects. Use the documented permissions for each action and keep the runtime identity outside **Domain Admins**.

    ## Choose where the agent runs

    Okta supports physical or virtual Windows Server hosts and recommends a domain-joined **member server**. In an isolated VMware lab, the supported domain controller VM can also host the agent. That gives you a working single-host setup for the first import. For agent high availability, use separate hosts in the domain and keep their agent versions aligned. A single VM cannot demonstrate that another host takes over if it goes down.

    ## Official reading

    - [Integrate with Active Directory learning path](https://learning.okta.com/path/integrate-with-active-directory)
    - [Microsoft · Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
    - [AD integration prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm)
    - [Install the Okta AD agent](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-new-integration.htm)
    - [Okta service account permissions](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-about-service-account.htm)
    - [DMZ server ports](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-install-dmzports.htm) and [multiple AD agents](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-install-multiple.htm)

=== "Hands-on Lab"

    Use your isolated VMware AD domain and an Okta org that shows **Add Active Directory**. Check the current [host prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm) before installing. Use a supported Windows Server host with access to your AD domain and outbound HTTPS to Okta. This lab prepares one test OU and verifies the agent. The next lesson uses the directory data to practice importing and matching.

    === "1. Prepare the lab and install the agent"

        **1. Prepare a test OU.** On your VMware lab server, open **Active Directory Users and Computers**. Under the lab domain, create the OU `Okta-Lab`. Inside it, create a standard test user named `okta-lab-import` and a security group named `Okta-Lab-Users`. Add the user to the group. Open the user's **Account** tab and note the full user principal name (UPN). Use your lab domain's actual suffix.

        **2. Confirm both network paths.** From the agent host, open your Okta org in the browser. Then check the path from the agent host to the domain controller. **DNS resolution** looks up the controller's name to find its address. A **port check** asks whether the host can open a connection to a specific service at that address.

        In PowerShell on the agent host, substitute your lab controller's full DNS name in the commands below. This example checks the standard LDAP TCP port. Use the port your lab is configured to use if it differs.

        ```powershell
        Resolve-DnsName -Name "dc01.lab.example"
        Test-NetConnection -ComputerName "dc01.lab.example" -Port 389
        ```

        Look for the expected lab controller address in the first result and `TcpTestSucceeded : True` in the second. If the name lookup fails, check which DNS server the agent host uses and the controller name you entered. If the name resolves but the port check fails, check whether the LDAP service is reachable from that host. The port check establishes TCP connectivity for the selected port. The working agent and import validate the integration itself.

        If the agent runs on a separate VMware member server, confirm it is joined to the lab domain. In Okta, select **Directory → Directory Integrations → Add Directory → Add Active Directory → Set Up Active Directory → Download Agent**. [Resolve-DnsName](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname) · [Test-NetConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection)

        **3. Install using the lab domain.** Run the downloaded installer on the Windows Server with the appropriate installer permissions. Verify that it detected your lab domain. Select **Create or use the Okta Service account**, or use a lab service account with the documented rights. Record the account name for the Windows service check.

        **4. Register with Okta.** Enter the org URL when the installer requests it. Follow the activation link, enter the displayed one-time code, sign in with the authorized Okta admin, and select **Allow Access**. Finish the installation. The code belongs in the activation form.

    === "2. Set scope and verify the integration"

        **1. Select only the test OU.** Return to the setup page in the browser and select **Next** after the service starts. On **Connect an Organizational Unit to Okta**, select `Okta-Lab` for the users and groups you will import. Review any preselected OUs so the domain root or unrelated OUs stay outside the lab scope.

        **2. Choose the username format and finish setup.** Choose **User Principal Name (UPN)** for this lab. Compare the expected Okta username with the test user's AD UPN from the first tab. Confirm the format before the first import. Okta uses the username in the relationship between the directory and Okta, and changing the format after import can cause errors for existing users. [Okta · AD agent installation and setup](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-new-integration.htm) On the attributes page, use the default attribute selection for the first pass. Complete the wizard. If you see discovered users in an import results view, leave their matches and activation decisions for the import lesson.

        **3. Check the agent on both sides.** In Windows **Services**, find the Okta AD Agent service and confirm it is running. Check its **Log On As** account against the runtime account you selected. In Okta, open **Directory → Directory Integrations → your AD domain → Agents**. Verify that your lab host appears with a live connection and note the installed version. [View AD agent status](https://help.okta.com/oie/en-us/Content/Topics/Directory/agent-auto-update-view-ad.htm)

        **4. Locate a failure before changing settings.** If Windows shows the service stopped, check its service identity and the Windows event for the startup failure. If Windows shows it running but Okta has no live agent, check the registered org, outbound HTTPS, and any proxy configuration. If the agent is live but the test OU is missing from the setup view, check AD connectivity, the selected domain, and the runtime identity's directory read access. Once you have a live agent, record which screen established each part of the result.
