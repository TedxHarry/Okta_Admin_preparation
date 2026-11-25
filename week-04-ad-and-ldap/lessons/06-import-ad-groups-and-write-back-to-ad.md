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

    ### Check group category, scope, and membership timing

    AD **security groups** can govern access in AD. **Distribution groups** are intended for distribution lists. **Global**, **Domain Local**, and **Universal** are AD scopes with different membership rules. Okta AD JIT imports security group memberships and does not synchronize distribution group membership. Use scheduled imports if you need supported distribution-group memberships. A child distribution group also does not confer membership in a parent security group through JIT.

    Cross-domain universal security groups have additional prerequisites. Check connected domains, domain trust and group ownership, the selected user and group OUs, and the **Universal Security Group Support** setting available with JIT. Okta documents an agent for each domain in the forest that contains a universal security group to synchronize. It also documents a boundary for domain-local groups containing members from multiple domains.

    [AD FAQ on universal groups and distribution groups](https://help.okta.com/oie/en-us/content/topics/directory/directory_faq_okta_and_ad_groups.htm) · [AD scope, membership and JIT settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm)

    ## Make the direction explicit before enabling writes

    Under **Directory → Directory Integrations → AD instance → Provisioning → To App**, **Create Users** controls account creation in AD and **Update User Attributes** controls profile updates. In **Directory → Profile Editor**, review the **Okta User to AD** mapping for the field. An update also needs a linked receiving account and a service account with effective write permission. When AD both supplies a profile and receives writes, review both mappings and the field's source priority before enabling the update. Read the resulting field on the original directory account.

    Assign users through a provisioning group. Use a separate group for **Group Push**, which provisions the group object and membership to a supported target. Follow the [AD-specific Group Push instructions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-push-group.htm) for its capabilities and permissions.

    [AD provisioning settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-provisioning.htm) · [Service account permissions by operation](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm) · [Group Push](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-about-group-push.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-6.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | AD group | Verify source ownership and imported membership. |
    | Native Okta group | Verify rule or direct membership and app assignment. |
    | Group Push | Use a separate group and verify actual membership in AD. |

    ### Check your recall

    **The Okta app user profile shows the mapped value, but AD shows the old one. What do you check?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Check Update User Attributes, the linked AD account, the write outcome, and effective service-account permissions on that AD attribute. The app user record establishes what Okta stored.</p>
    </details>

    **Is a distribution group's membership synchronized by AD JIT?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>JIT imports the applicable security group memberships. Use scheduled imports for supported distribution membership.</p>
    </details>

    **Which group maintains membership in the target?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The separate push group maintains membership. The provisioning group controls the account assignment.</p>
    </details>
