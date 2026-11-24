# Lesson 9 · Troubleshoot profile changes end to end

=== "Theory"

    A worker’s Department changed to `Support`. Okta displays it correctly, but an assigned app still shows the old value. Start with the latest source record and follow the change until you find the first value that differs from what you expected. Fix that stage and verify the same user and field through the rest of the flow.

    ### Follow one change across the records

    | Checkpoint | Evidence to compare | When it differs |
    | --- | --- | --- |
    | Source record and import | Source account ID, actual field value, change time, import result, and account match. | Correct the source data or investigate connector timing, import scope, and user matching. |
    | Okta user profile | Actual value under **Directory → People → Profile**, plus the field’s source priority. | Check which source owns the field and inspect its inbound mapping. |
    | Outbound mapping and app user | Correct app instance and user type, evaluated source, mapping timing, saved app user value, and any assignment override. | Check the selected row and compare Preview with the persisted value. |
    | Connector write | Assignment, **Update User Attributes** where supported, System Log or connector result, and the target account ID. | Check whether the operation ran. If it failed, read the target’s error and correct the relevant mapping, permissions, or data. |
    | Receiving account or sign-in | Stored account field for provisioning, or a fresh assertion and the claims the receiver consumed for federation. | Match the target account. If a claim arrived correctly, check the receiver’s claim mapping and how it uses the value. |

    Start with the test user, app, field, and time window. In **Reports → System Log**, filter to the user and app involved. For a profile push, inspect `application.provision.user.push_profile` when your integration emits it. Check the event outcome, targets, and available diagnostic details. A missing event can mean no qualifying write occurred. Check your filters, the assignment, timing, and provisioning settings before drawing that conclusion. A successful event still calls for a check of the intended field on the intended account.

    [Okta System Log event types](https://developer.okta.com/docs/reference/api/event-types/) · [Provisioning error events](https://help.okta.com/en-us/content/topics/provisioning/ref-apps-events.htm) · [Automatic user attribute updates](https://help.okta.com/oie/en-us/content/topics/provisioning/lcm/lcm-automatic-user-attribute-update.htm)

    ### Compare connector write-back with a workflow update

    For a direct connector write, configure **Okta User to App** and verify the connector can update the mapped field in that direction. For a supported AD test connection, check the target directory’s provisioning settings and **Update User Attributes**. Confirm the test account is linked to the intended directory and the mapped field is writable by the connector. The directory record is the final evidence.

    A Workflows run can perform a separate write. **User Okta Profile Updated** gives the ID of the user whose profile changed. Use that ID with **Read User** to retrieve current profile values. **Update User** writes the Okta user record. Choose **Partial** and **Pass Empty Values? → No** when you intend to write a populated value to a single lab field. Inspect Execution History for the event, read, condition, and update. Reopen the actual profile to verify the write.

    If the same flow reacts to profile updates and writes the profile, the write can trigger another run. Restrict the flow to a disposable user and compare the intended value with the existing value before writing. The follow-up event should reach a stop condition once both values match. If an outbound connector later consumes the field, verify its operation and target record separately.

    [Configure AD provisioning](https://help.okta.com/en-us/Content/topics/directory/ad-agent-configure-provisioning.htm) · [User Okta Profile Updated](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/events/oktauserprofileupdated.htm) · [Read User](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/actions/readuser.htm) · [Update User](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/actions/updateuser.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-9.md"

=== "Revision"

    ### Check your recall

    **1. Preview returns the right result, but the app user profile contains an older value. Where do you look?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Confirm the app instance, user type, and saved mapping. Then check whether the mapping applies on update and whether the assignment has an override.</p>
    </details>

    **2. The app user value is correct, but the connected app still shows the old value. What evidence do you need?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Match the provisioning result and target account ID to the profile change. Confirm the configured update behavior and inspect the actual target field.</p>
    </details>

    **3. An event-driven workflow reads and updates the same Okta profile. How do you keep it from repeating the write?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Compare the current destination value with the intended value. Stop the run before Update User when they match.</p>
    </details>
