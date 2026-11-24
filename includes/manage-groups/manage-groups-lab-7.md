## Lab 7 · Import groups and trace source ownership { #lab-7 }

Import a disposable group, change its membership at the source, and verify the same change in Okta. You can also investigate the sample import records below without a connector.

### Choose a live connection

Use an isolated Okta Identity Engine org and an admin with access to the integration and groups. You also need permission to create a test group and change its members in the source. Choose one of these paths.

| Path | Prerequisites |
| --- | --- |
| Active Directory (AD) | A connected test AD domain with a working Okta AD agent, an approved test group OU, and two existing AD users already linked in Okta. See [Install and configure the Okta AD agent](https://help.okta.com/en-us/Content/topics/directory/ad-agent-new-integration.htm) for agent setup. |
| Provisioning-enabled app | A disposable app integration with working provisioning credentials, documented inbound group import, and two existing source accounts matched to the intended Okta users. |
| No connected source | Start at [Investigate the sample import records](#lab-7-import-records). All records in that exercise are simulated. |

Label the test users **Initial member** and **New member** in your notes. Use disposable accounts. Both should be active in Okta so you can also compare app assignment if you have a test bookmark.

### 1. Create a group at the source and import it

1. In AD, use **Active Directory Users and Computers** to create `Lab-GR7-Travel` as a **Global Security** group inside the approved test OU. Add only the Initial member. Use accounts from the same test domain. For the app path, create a supported group of the same name in the source app and add only the Initial member there.
2. In Okta, open the matching integration and check the import settings:
    - **AD:** Go to **Directory → Directory Integrations → Active Directory → Provisioning → Integration**. Confirm the test group OU is in **Group OUs connected to Okta** and that both users are in scope. If you are setting up the disposable integration, select the test OU and save before importing.
    - **App:** Go to **Applications and Resources → Applications → your test app → Provisioning → Integration → Edit**. Confirm **Import Groups** is selected and save if you enabled it.
3. From that integration’s **Import** tab, select **Import Now** if available. Use a full import for the AD baseline in the isolated test domain. For an app, follow the connector’s supported import options or wait for its scheduled run. If Okta asks you to confirm users, review the proposed links and confirm only the intended test records.
4. In **Directory → Groups → All**, find `Lab-GR7-Travel` by name and source. Record the Okta group ID, source, run time, and whether the summary or designated-admin email reports the group change. Open the member list and confirm it contains the Initial member and excludes the New member.

[AD group import setup](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-groups.htm) · [Run an AD import](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-users-on-demand.htm) · [Review app group imports](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-review-group-imports.htm)

### 2. Change one membership and verify the same record

1. Add the New member to `Lab-GR7-Travel` in the source system. Leave the Initial member in place. Verify both are present at the source and record the change time.
2. Run the next supported import or wait for it to complete. Open the group by the recorded Okta ID and verify both members. If the new member is absent, compare the import time with the source edit, check run completion and pending confirmations, and verify the user link, scope, and source group before retrying.
3. For an optional access check, assign a disposable Bookmark App to the imported group from **Assignments → Assign → Assign to Groups**. Check that both members appear under the bookmark’s **Assignments → People**. Remove the New member in the source and rerun import. Verify that their membership and the bookmark assignment both disappear if the group was their sole assignment path.
4. Restore the original source membership and run one more import. If you assigned a lab bookmark, remove its group assignment when finished. Keep the test group for repeat practice or remove it using the source connector’s documented cleanup procedure.

### 3. Investigate the sample import records { #lab-7-import-records }

Use these simulated records even if you ran the live lab. The Okta IDs below are exercise labels.

| Record | Source and scope | Membership or dependency |
| --- | --- | --- |
| AD Travel, parent | AD test domain, `OU=Included` | Contains AD Field Ops as a child. |
| AD Field Ops, child | Same domain, `OU=Excluded` | Alex is a direct member. |
| Travel, Okta ID `AD-17` | Imported by the AD agent | The parent exists in Okta. Alex is missing. This record assigns the test Travel bookmark. |
| Travel, Okta ID `APP-42` | Imported by Office 365 after AD sync to Microsoft Entra ID | Alex is listed. An app assignment depends on this record. |

1. Identify which record supplies the Travel bookmark and where you would check Alex’s membership. Explain why the Office 365 record appearing correct does not resolve the missing assignment.
2. Predict Alex’s membership in both AD groups after the child OU is included and a successful import processes the linked user. Then explain what you would investigate if the parent and child were in domains without the required trust.
3. An admin wants to stop importing Office 365 groups. Identify what blocks the change in this case, what other dependencies you would inspect, and when to check for removal.
4. In a separate LDAP import, the user test succeeds but omits a group. The group lives under `ou=partner-groups,dc=example,dc=com` while the Group Search Base is `ou=staff-groups,dc=example,dc=com`. Explain which boundary you would inspect before changing the membership attribute.

<details class="revision-answer">
<summary>Show the investigation answers</summary>
<ol>
<li>AD-17 supplies the bookmark. Trace Alex through AD Field Ops, its parent, and the AD integration. APP-42 has a different Okta group ID and does not supply that bookmark.</li>
<li>With both groups and Alex in scope, supported same-domain nesting, and a completed import, Alex should appear on the member list of both AD groups. Across domains, check the AD group scopes and trust before predicting the result.</li>
<li>APP-42’s app assignment is a dependency. Review all imported groups from the integration for app assignments, group policy rules, and mappings. Once the dependencies are resolved and disabling Import Groups is saved, verify removal after the next import.</li>
<li>The LDAP group lives outside the configured Group Search Base. Confirm that the group should be in scope and test the intended base and filter before changing the membership attribute.</li>
</ol>
</details>
