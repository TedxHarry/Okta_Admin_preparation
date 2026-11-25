## Lab 1 · Connect Active Directory to Okta { #lab-1 }

Use your isolated VMware AD domain and an Okta org that shows **Add Active Directory**. Check the current [host prerequisites](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-prerequisites.htm) before installing. Use a supported Windows Server host with access to your AD domain and outbound HTTPS to Okta. This lab prepares one test OU and verifies the agent. The next lesson uses the directory data to practice importing and matching.

### Before you install the agent { #ad-lab-preflight }

1. Start the VMware VM that runs your domain controller. Open **Active Directory Users and Computers** and verify your test domain and its users are visible. Then start the Windows Server that will run the Okta agent. If you use a separate agent VM, verify that it is joined to the lab domain and can reach the domain controller over the VMware network.
2. Write down the **AD DNS domain**, the controller's **fully qualified domain name** (its full DNS name), and the **Okta tenant hostname**. Use your real values in the commands. For the Okta hostname, enter just the hostname from your browser, without `https://`, a slash, or a page path.
3. From PowerShell **on the agent host**, run these checks. The first lookup asks DNS for the service record (SRV) that Windows uses to locate a domain controller. The two port checks test the directory and cloud paths separately.

    ```powershell
    $labDomain = "lab.example"
    $labDc = "dc01.lab.example"
    $oktaHost = "your-org.okta.com"

    Resolve-DnsName -Name "_ldap._tcp.dc._msdcs.$labDomain" -Type SRV
    Test-NetConnection -ComputerName $labDc -Port 389
    Test-NetConnection -ComputerName $oktaHost -Port 443
    ```

    Port 389 is the usual AD LDAP port tested here. Adapt the check to your lab's configured port if needed. If your lab routes Okta through a proxy, the direct 443 test can fail. Confirm that the browser can open your org from the agent host and that the agent can use the intended proxy settings. These checks establish discovery and connectivity. Agent registration and the first import verify that the whole path works.

4. Open your Okta **Admin Console** from the agent host. Verify that **Directory → Directory Integrations → Add Directory → Add Active Directory** is available and that you have a native Okta admin account that can sign in independently of AD. Keep that session available while you configure the integration.

| Result | What to check first |
| --- | --- |
| No SRV record for the test domain | Check the AD domain name and which DNS server the agent host uses. Confirm the domain controller is running and its locator records exist. |
| The controller resolves, but the AD port check fails | Check that the controller and agent VM can reach each other over the lab network. Review the relevant Windows firewall, service, and port settings. |
| AD checks pass, but the agent host cannot open Okta | Check the agent VM's internet route, DNS, and intended proxy. Confirm the exact org hostname. |
| The org opens, but **Add Active Directory** is missing | Confirm you are in the intended org and in its Admin Console. Review your directory and agent permissions and whether the integration is available in that org. |
| The installer cannot find the expected domain | Verify domain membership. On a domain-joined **member server**, run `Test-ComputerSecureChannel -Verbose` from an elevated PowerShell to check the Windows trust relationship. On a domain controller, use Microsoft's documented alternatives. |

[Okta AD integration prerequisites](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-prerequisites.htm) · [Microsoft DC locator records](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created) · [Microsoft secure channel check](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/test-computersecurechannel?view=powershell-5.1)

### 1. Prepare the lab and install the agent

**1. Prepare a test OU.** On your VMware lab server, open **Active Directory Users and Computers**. Under the lab domain, create the OU `Okta-Lab`. Inside it, create a standard test user named `okta-lab-import` with a first name, last name and usable UPN and a security group named `Okta-Lab-Users`. Add the user to the group. Open the user's **Account** tab and note the full **user principal name (UPN)**. This is the AD sign-in name in a format such as `okta-lab-import@example.test`. Copy the actual value shown for your lab user.

**2. Install using the lab domain.** In **Directory → Directory Integrations → Add Directory → Add Active Directory**, select **Set Up Active Directory → Download Agent**. If a working agent is already registered to this org and domain, use the existing agent and review its scope in the next section. Otherwise, run the downloaded installer on the Windows Server with the appropriate installer permissions. Verify that it detected your lab domain. Select **Create or use the Okta Service account**, or use a lab service account with the documented rights. Record the account name for the Windows service check.

**3. Register with Okta.** If you are installing a new agent, enter the org URL when the installer requests it. Follow the activation link, enter the displayed one-time code, sign in with the authorized Okta admin, and select **Allow Access**. Finish the installation. The code belongs in the activation form.

### 2. Set scope and verify the integration

**1. Select only the test OU.** For a new agent, return to the setup page in the browser and select **Next** after the service starts. On **Connect an Organizational Unit to Okta**, select `Okta-Lab` for users and groups. If you reused an existing test integration, review the user and group OUs under **Directory → Directory Integrations → your AD instance → Provisioning → Integration**. Review any preselected OUs so the domain root or unrelated OUs stay outside the lab scope.

**2. Choose the username format and finish setup.** For a new integration, choose **User Principal Name (UPN)** for this lab. For an existing integration, inspect the saved username format in **Provisioning → To Okta → General**. Use that format to predict the import username. Compare the expected Okta username with the test user's AD UPN from the lab setup above. Confirm the format before the first import. Okta uses the username in the relationship between the directory and Okta, and changing the format after import can cause errors for existing users. [Okta · AD agent installation and setup](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-new-integration.htm) If you are completing the setup wizard, on the attributes page use the default attribute selection for the first pass. Complete the wizard. If you see discovered users in an import results view, leave their matches and activation decisions for the import lesson.

**3. Check the agent on both sides.** In Windows **Services**, find the Okta AD Agent service and confirm it is running. Check its **Log On As** account against the runtime account you selected. In Okta, open **Directory → Directory Integrations → your AD domain → Agents**. Verify that your lab host appears with a live connection and note the installed version. [View AD agent status](https://help.okta.com/oie/en-us/Content/Topics/Directory/agent-auto-update-view-ad.htm)

**4. Locate a failure before changing settings.** If Windows shows the service stopped, check its service identity and the Windows event for the startup failure. If Windows shows it running but Okta has no live agent, check the registered org, outbound HTTPS, and any proxy configuration. If the agent is live but the test OU is missing from the setup view, check AD connectivity, the selected domain, and the runtime identity's directory read access. Once you have a live agent, record which screen established each part of the result.

### When you are ready for Lab 2

Proceed when the service is running, its host is listed under the correct AD instance in Okta, and you have verified both the selected user OU and group OU. Lab 2 will verify that the agent can read the test objects. If you already confirmed an AD user through an import, prepare a fresh test account for the later JIT exercise.
