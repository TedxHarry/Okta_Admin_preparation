# Lesson 5 · Application provisioning

=== "Theory"

    In Module 2, assigning the bookmark gave a user a tile in Okta. This lesson follows an assignment further. When a connected application keeps its own user directory, Okta can ask it to create, update, or deactivate an account. That work is **provisioning**.

    ## Follow the assignment into the application

    **Assignment** records which user should receive the app in Okta. **Sign-in** establishes who the user is when they access it. **Provisioning** manages the separate account record that the app uses. Open the app's **Assignments** tab to see the first. Check the receiving app's user directory to see the last.

    An **API** is a documented way for one program to ask another program to do something. Here, Okta can ask the receiving application to look up an account or change a field. **SCIM**, the System for Cross-domain Identity Management, defines standard requests for working with users and groups. Okta's **connector** prepares these requests. The receiving service checks them, makes a supported change if the request is valid, and reports the result.

    ## Get the connection details from the receiving service

    Start on the receiving test service. Its SCIM setup page or documentation should give you the **SCIM base URL**, the starting address for its SCIM API. For example, if the base URL were `https://scim.example.test/v2`, the users **endpoint**, or request address, would be under that base at `/Users`. Use your service's actual base URL in Okta.

    The service also tells you how to prove that Okta may use that endpoint. With **header authentication**, a credential travels in a part of the request called the **Authorization header**. Use the credential and format the receiving service specifies for the test connector. **Test API Credentials** tells you whether Okta's connection check passed. Verify a real write separately by looking up the account in the receiving service.

    ## What the outbound settings control

    Open an app integration's **Provisioning → To App** settings. The available actions depend on what the integration supports.

    | Setting | What Okta tries to do | Evidence to check at the application |
    | --- | --- | --- |
    | **Create Users** | Find the matching account or create one when the user is assigned. | One account with the expected application username. Record its app-side ID. |
    | **Update User Attributes** | Send mapped profile changes for the assigned account. | The same app-side ID with the updated value. |
    | **Deactivate Users** | Ask the app to remove access when the assignment ends or the Okta user is deactivated. | For this SCIM lab, the existing account's `active` field becomes `false`. |

    ## How Okta knows which account to change

    An **application username** is the identifier you configure for the app assignment. For a typical SCIM setup, Okta searches for the corresponding `userName` before creating a record. If the app returns an existing account, the integration can use that account. If it creates one, the app returns an ID. That ID lets Okta address the same record when it sends an update.

    Profile mappings determine which fields Okta sends. The **Okta User to App** mapping supplies the values for outbound updates. The connection's credentials determine whether the app will accept them. If the attribute preview is correct but the destination still shows an old value, check the push timing on the mapping, **Update User Attributes**, then the result of the provisioning operation.

    ## Where to look when an assignment does not produce an account

    Start with the exact username in the Okta assignment. Open **Dashboard → Tasks** and check the app provisioning task for that user, then compare it with the receiving application's logs or account record. A valid connection test shows that the credential check passed. A particular write can still fail because the app requires another field, rejects a value, or lacks an available seat. Read the error before retrying. In the receiving app, check whether the account already exists so you can correct the cause without creating a second account.

    In this lesson, a direct assignment gives one person access. Group-based assignment uses a group to decide who should receive the app. **Group Push** manages a group and its memberships inside a compatible target. We will configure that separately.

    ## Official reading

    - [Configure provisioning for an app integration](https://help.okta.com/oie/en-us/Content/Topics/Provisioning/lcm/lcm-provision-application.htm)
    - [SCIM 2.0 protocol reference](https://developer.okta.com/docs/api/openapi/okta-scim/guides/scim-20/)
    - [Troubleshoot provisioning](https://help.okta.com/en-us/Content/Topics/Provisioning/lcm/troubleshooting.htm)

=== "Hands-on Lab"

    Use a fresh Okta-managed test user and a test app instance you control. For the lab below, you need a reachable HTTPS SCIM 2.0 endpoint with header authentication, permission to enable provisioning in Okta, and a way to read the target's user records or provisioning audit log. You will name the Okta catalog integration `LAB-SCIM-Lifecycle`. It is the connector that sends requests. The SCIM endpoint is the address of the receiving service, where the user records live. If you use an existing provisioning-enabled test app, follow its documented connection settings and use the same create, update, and deactivate steps.

    === "1. Connect the test application"

        **1. Prepare the test user.** In **Directory → People**, create or select a disposable Okta user with a unique username. Record their current first name. Verify that no one else uses this username on the test service. Keep this test app free of group assignments for the exercise so the direct assignment controls access.

        **2. Add the catalog integration.** Go to **Applications and Resources → Applications → Browse App Catalog**. Search for **SCIM 2.0 Test App (Header Auth)**. Add it to your lab org as `LAB-SCIM-Lifecycle`. Complete the catalog wizard. [Okta catalog listing](https://www.okta.com/integrations/scim-2-0-test-app-header-auth/)

        **3. Connect to the target.** In the app's **Provisioning** tab, open the integration settings and enable API integration if prompted. Enter the test service's SCIM base URL and the authorization header value specified by that service. If the screen asks for a unique user identifier, use `userName` for a standard SCIM endpoint that supports filtering by that field. Select **Test API Credentials** and save after the test passes. Use the test service's credentials in the console and keep them out of your lab notes.

        **4. Enable outbound actions.** Open **Provisioning → To App → Edit**. Enable **Create Users**, **Update User Attributes**, and **Deactivate Users**, then save. In the outbound attribute mappings, find the first-name mapping and confirm that it reads the Okta user's first name and applies to both creation and updates. Check this before assigning the user.

    === "2. Create, update, and deactivate"

        **1. Create the account.** Open the test integration's **Assignments → Assign → Assign to People**. Assign the disposable user and confirm the expected application username. Save the assignment. In the receiving service, find the account by that username and record its ID and first name. If you can inspect SCIM logs, identify the lookup and the request that created the record.

        **2. Update a mapped attribute.** In **Directory → People → test user → Profile**, change **First name** to a different lab value. Leave the username alone so the change is easy to trace. Reopen the target record and compare the first name and account ID. Expect a new first name on the original account. If the update does not arrive, check the mapping, its push timing, and **Dashboard → Tasks**.

        **3. Deactivate the app account.** Go back to the integration's **Assignments** tab and remove only that user's direct assignment. Check the target by the account ID from step 1. Expect the record to show `active: false`. If the receiving app hides inactive users in its default view, use its inactive-user view or the audit log. In **Directory → People**, check that the Okta user's status is still active.

        **4. Review the evidence.** Compare the Okta assignment, provisioning task or event, and target record at each stage. If the target remains active after removal, review **Deactivate Users** and the connector's response before repeating the operation. Restore the disposable user's original first name in Okta. Keep the test integration available for later group provisioning practice.

    If you have only the Integrator org today, use the [Module 3 mapping lab](02-profile-mappings.md) to inspect a proposed outbound value and identify the app-side evidence you would check next. Actual account creation, updates, and deactivation in this lesson require a receiving service.
