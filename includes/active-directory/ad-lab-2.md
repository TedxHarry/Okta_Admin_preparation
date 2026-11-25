## Lab 2 · Import and match AD users { #lab-2 }

Use the AD instance and `Okta-Lab` organizational unit (OU) from Lab 1. The comparison uses `okta-lab-import` as an existing-account match and a new disposable AD user, `okta-lab-new`. Both need valid first name, last name, and the username attributes selected for import. Keep a separate native Okta admin signed in. Use a Super Admin or Org Admin for the confirmation steps.

### 1. Review import settings and confirm matches

1. In **Directory → Directory Integrations → AD instance → Provisioning → Integration**, verify that only the test user and group OUs are selected. In **To Okta → General**, record the username format, schedule, activation email choice, and **Skip users during import** setting. Keep scheduled imports paused or off and JIT off for this comparison. Allow user imports and suppress activation emails where offered.
2. Create a native Okta account matching the generated username for `okta-lab-import` before confirmation. If that AD account is already linked, create another disposable AD user and a matching native Okta user for the comparison. Leave `okta-lab-new` absent in Okta. Record the existing Okta user ID from its profile URL before importing.
3. In **To Okta → User Creation & Matching**, choose exact match by username, leave auto-confirmation and auto-activation off, and save. Under **Import → Import Now**, select **Full import**. Find the two rows and compare their proposed matches.
4. Inspect or change the proposed decision using **Exact**, **New**, **Existing**, or **Ignore** as appropriate. Confirm the intended existing and new rows with **Confirm Assignments**. Leave immediate activation off for the new user. In **People**, verify the existing ID was retained, the AD links point to the right records, and the new user still needs activation.
5. If you want to compare partial matching, use a separate disposable pair with the same first and last names and different user names and emails. Enable **Allow partial matches** with **Auto-confirm partial matches** off, inspect the proposal, then ignore it. Restore the earlier setting. A matching name alone gives you a candidate to review.

### 2. Compare changes, removal, and safeguards

1. Verify AD sources a harmless mapped field such as Department for the linked test user. Change the value in AD and run an **Incremental import**. Verify the exact value on the same Okta user. If it stays unchanged, check when the edit was visible to the selected domain controller, the AD app profile, and the field's priority and mapping.
2. With JIT still off and the source lifecycle action recorded, move a separate confirmed test user to an OU outside the import scope. Compare an incremental import and a full import. Inspect **Import**, **People**, and the configured lifecycle action. The full import is the documented reconciliation path for deleted or out-of-scope AD users. If a safeguard pauses the change, inspect the warning and scope before proceeding.
3. Restore the original OU. If you set a lifecycle action that changed the Okta status, restore the AD account's intended state and check the configured reactivation behavior before expecting access to return. Restore the import schedule and matching settings after comparing results. Keep the two lab users for the next lessons.

With AD offline, predict the match and lifecycle outcomes from the configured criteria. A live comparison needs the connected test domain.

[Import and account settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm) · [Confirm imported assignments](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-confirm-user-assignments.htm) · [Import safeguards](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-safeguard.htm)
