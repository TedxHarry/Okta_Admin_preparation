## Lab 1 · Connect Active Directory to Okta { #lab-1 }

Use your isolated VMware AD domain and an Okta org that shows **Add Active Directory**. Check the current [host prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm) before installing. Use a supported Windows Server host with access to your AD domain and outbound HTTPS to Okta. This lab prepares one test OU and verifies the agent. The next lesson uses the directory data to practice importing and matching.

### 1. Prepare the lab and install the agent

**1. Prepare a test OU.** On your VMware lab server, open **Active Directory Users and Computers**. Under the lab domain, create the OU `Okta-Lab`. Inside it, create a standard test user named `okta-lab-import` with a first name, last name and usable UPN and a security group named `Okta-Lab-Users`. Add the user to the group. Open the user's **Account** tab and note the full **user principal name (UPN)**. This is the AD sign-in name in a format such as `okta-lab-import@example.test`. Copy the actual value shown for your lab user.

**2. Confirm both network paths.** From the agent host, open your Okta org in the browser. Then check the path from the agent host to the domain controller. **DNS resolution** looks up the controller's name to find its address. A **port check** asks whether the host can open a connection to a specific service at that address.

In PowerShell on the agent host, substitute your lab controller's full DNS name in the commands below. The second command checks whether the agent host can connect to the standard **LDAP** port. LDAP stands for Lightweight Directory Access Protocol. Software uses it to read information from a directory. Use the port your lab is configured to use if it differs.

```powershell
Resolve-DnsName -Name "dc01.lab.example"
Test-NetConnection -ComputerName "dc01.lab.example" -Port 389
```

Look for the expected lab controller address in the first result and `TcpTestSucceeded : True` in the second. If the name lookup fails, check which DNS server the agent host uses and the controller name you entered. If the name resolves but the port check fails, check whether the LDAP service is reachable from that host. The port check establishes TCP connectivity for the selected port. The working agent and import validate the integration itself.

On the Windows Server VM that will run the agent, confirm it is joined to the lab domain. In Okta, select **Directory → Directory Integrations → Add Directory → Add Active Directory → Set Up Active Directory → Download Agent**. [Resolve-DnsName](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname) · [Test-NetConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection)

**3. Install using the lab domain.** Run the downloaded installer on the Windows Server with the appropriate installer permissions. Verify that it detected your lab domain. Select **Create or use the Okta Service account**, or use a lab service account with the documented rights. Record the account name for the Windows service check.

**4. Register with Okta.** Enter the org URL when the installer requests it. Follow the activation link, enter the displayed one-time code, sign in with the authorized Okta admin, and select **Allow Access**. Finish the installation. The code belongs in the activation form.

### 2. Set scope and verify the integration

**1. Select only the test OU.** Return to the setup page in the browser and select **Next** after the service starts. On **Connect an Organizational Unit to Okta**, select `Okta-Lab` for the users and groups you will import. Review any preselected OUs so the domain root or unrelated OUs stay outside the lab scope.

**2. Choose the username format and finish setup.** Choose **User Principal Name (UPN)** for this lab. Compare the expected Okta username with the test user's AD UPN from the first tab. Confirm the format before the first import. Okta uses the username in the relationship between the directory and Okta, and changing the format after import can cause errors for existing users. [Okta · AD agent installation and setup](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-new-integration.htm) On the attributes page, use the default attribute selection for the first pass. Complete the wizard. If you see discovered users in an import results view, leave their matches and activation decisions for the import lesson.

**3. Check the agent on both sides.** In Windows **Services**, find the Okta AD Agent service and confirm it is running. Check its **Log On As** account against the runtime account you selected. In Okta, open **Directory → Directory Integrations → your AD domain → Agents**. Verify that your lab host appears with a live connection and note the installed version. [View AD agent status](https://help.okta.com/oie/en-us/Content/Topics/Directory/agent-auto-update-view-ad.htm)

**4. Locate a failure before changing settings.** If Windows shows the service stopped, check its service identity and the Windows event for the startup failure. If Windows shows it running but Okta has no live agent, check the registered org, outbound HTTPS, and any proxy configuration. If the agent is live but the test OU is missing from the setup view, check AD connectivity, the selected domain, and the runtime identity's directory read access. Once you have a live agent, record which screen established each part of the result.
