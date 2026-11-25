## Lab 6 · Import groups, provision to AD, and push groups { #lab-6 }

Use the selected `Okta-Lab` OU, the AD security group `Okta-Lab-Users`, and its linked test member. Create a separate disposable target OU named `Okta-Lab-Outbound` and an active native Okta user named `okta-lab-outbound` with a unique login and no existing AD account in the domain.

### 1. Follow an AD membership across both systems

1. In **Provisioning → Integration**, confirm the user OU and group OU are selected. Run an import. In **Directory → Groups**, open the imported AD group and verify its source and membership. Record which user and group are in scope.
2. Create a native Okta group named **Lab AD Rule Output**. Create and activate a rule whose condition matches membership in the imported group and whose target is the native group. Verify the user's membership in both.
3. Remove the test member from `Okta-Lab-Users` in AD and import the change. Inspect both memberships again. Restore the original membership and repeat. If the parent group was imported but the expected nested membership is absent, inspect the selected OUs for both parent and child before editing the rule.

### 2. Create and update an AD user from Okta

1. In AD, review the agent account's documented user creation and attribute write permissions on `Okta-Lab-Outbound`. In **Directory → Directory Integrations → AD instance → Provisioning → Integration**, include that OU under **User OUs connected to Okta** and save. Okta requires a provisioning target OU to be in that list. In Okta, open the AD instance's **Provisioning → To App**. Configure the AD username format and required creation settings, then enable **Create Users** and **Update User Attributes**. If prompted for a notification recipient, use an admin inbox you control.
2. In **Directory → Groups**, create and open **Lab Provision AD Users**. Keep the group empty initially. Open **Directories → Manage Directories**, move the test AD integration to **Members**, and select **Next**. Under **Default Attributes → Organizational Unit**, use **Show More** if needed and select `Okta-Lab-Outbound`. Select **Confirm changes**. Verify the intended directory and OU on the group's **Directories** tab. Confirm the required profile mappings and outbound Department mapping before adding the native user. [Okta’s illustrated OU and provisioning group walkthrough](https://support.okta.com/help/s/article/provision-okta-users-to-a-specific-active-directory-organizational-unit?language=en_US)
3. Add `okta-lab-outbound` to the provisioning group. Find the resulting account in **Active Directory Users and Computers** in the target OU and record its account identity, distinguished name, and initial Department. If creation fails, compare the provisioning task, OU assignment, username, required fields, and effective directory permissions.
4. Edit the native user's Department in Okta. Verify the saved app user value and the resulting field on the same AD account. If Okta shows the correct outbound value but AD differs, inspect the connector task and the service identity's write permissions.

### 3. Push a separate group

1. Review Group Push permissions on the test target OU. Create a separate native Okta group named **Lab AD Pushed Members** and add the now-provisioned test user. Leave the account's provisioning assignment in place.
2. In **Provisioning → Integration**, select the intended target under **Group OUs connected to Okta** for the enhanced OU picker. Then open **Push Groups → Find groups by name**. Select **Lab AD Pushed Members**, choose the test OU, choose **Create Group**, and set the group scope and type for the lab. Save and use **Activate group push** in **Push Status**. Verify the group and member on the AD side.
3. Remove the member from the push group in Okta. Verify the target membership changes while the test AD account remains provisioned. Restore the initial group membership or unlink the disposable push according to the documented options. Retain or remove the target group deliberately and clean up only the accounts and groups created for this lab.
4. If enhanced Group Push or bidirectional group management is available, identify its current settings using Okta's AD group documentation. Use a separately disposable group for an existing-group linkage or bidirectional exercise. Never use the provisioning assignment group as the push group.

[AD inbound group import](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-groups.htm) · [Outbound AD provisioning](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-provisioning.htm) · [Push groups to AD](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-push-group.htm)
