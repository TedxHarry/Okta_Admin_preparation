# Lesson 6 · Import AD groups and write data back to AD

=== "Theory"

    An **AD group** is a group object in the directory. When Okta imports it, the import brings an AD-sourced group and its resolved memberships into Okta. An **Okta group** created in Okta can receive direct memberships or members calculated by a group rule. Know which group you are looking at before changing membership.

    | Operation | Direction | What to verify |
    | --- | --- | --- |
    | Import an AD group | AD → Okta | Group OU, selected user OU, linked users, and imported membership. |
    | Use an imported group in a rule | AD membership → Okta rule → Okta group | Imported membership exists first, then the active rule matches and assigns its target. |
    | Assign an Okta provisioning group to the AD instance | Okta → AD user account | Group assignment includes the intended OU and the eligible user is assigned. Check **Create Users** and the resulting account. |
    | Update a mapped AD user attribute | Okta → AD user account | The integration can update users, the outbound mapping evaluates correctly, and the agent has write permission on the attribute. |
    | Group Push to AD | Okta → AD group | The push mapping targets the intended group and the directory shows the expected group and members. Okta is the source for the pushed membership. |

    Okta resolves AD nested group membership into user memberships. Okta groups themselves have users as members. During ordinary imports, a nested child group beyond the selected scope can leave the visible parent membership incomplete. Check user OU, group OU, direct versus nested membership, and import type before troubleshooting a rule.

    [Import AD groups](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-groups.htm) · [AD import scope and nesting](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm) · [Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-rules.htm)

    ## Make the direction explicit before enabling writes

    Under **Directory → Directory Integrations → AD instance → Provisioning → To App**, **Create Users** controls account creation in AD and **Update User Attributes** controls profile updates. In **Directory → Profile Editor**, review the **Okta User to AD** mapping for the field. An update also needs a linked receiving account and a service account with effective write permission. When AD both supplies a profile and receives writes, review both mappings and the field's source priority before enabling the update. Read the resulting field on the original directory account.

    Assign users through a provisioning group. Use a separate group for **Group Push**, which provisions the group object and membership to a supported target. Follow the [AD-specific Group Push instructions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-push-group.htm) for its capabilities and permissions.

    [AD provisioning settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-provisioning.htm) · [Service account permissions by operation](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm) · [Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-push.htm)

=== "Hands-on Lab"

    Use a selected disposable AD user OU and group OU. Place a test user and security group in scope and add the user to the group in AD. Import both. Use the imported group as a condition in an active rule that assigns a separate Okta group. Verify the two memberships, then remove the AD membership and import the change. Inspect both results again.

    For write-back, use a separate disposable Okta-sourced test user. Assign a native provisioning group to the AD instance with a test target OU. Enable creation and updates in **To App** and inspect the outbound mapping for a harmless test field such as Department. Add the user to the provisioning group, verify its AD account, then edit the Okta field. Verify the changed value on that same AD account. For Group Push, use a separate native group containing the linked test user and inspect group membership in AD.

=== "Revision"

    **The Okta app user profile shows the mapped value, but AD shows the old one. What do you check?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check Update User Attributes, the linked AD account, the write outcome, and effective service-account permissions on that AD attribute. The app user record establishes what Okta stored.</p>
    </details>
