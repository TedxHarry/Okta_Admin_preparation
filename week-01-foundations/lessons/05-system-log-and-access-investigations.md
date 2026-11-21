# Lesson 5 · System Log and access investigations

=== "Theory"

    ## Read the System Log as evidence

    The **System Log** records events Okta observed in your org. An **event** describes one operation or decision, such as adding a user to a group or evaluating an authentication attempt. Open **Reports → System Log** in the Admin Console. Use the time range and time zone to narrow the search, then expand a matching row to see its details.

    | Field | What to look for |
    | --- | --- |
    | **Event type** | The identifier for the kind of operation, such as `user.session.start`. |
    | **Actor** | Who or what initiated it. A rule or service can act on a user, so the affected user may be in **Target** instead. |
    | **Target** | The objects affected by the event, such as a user, a group, or an app integration. An event can have several targets. |
    | **Outcome** | The result of this event and, when supplied, its reason. Read it together with the event type. |
    | **Client** | Context about where the request came from, such as the IP address or browser, when captured. |

    The System Log shows past activity. The Admin Console's **People**, group membership, and app **Assignments** views show what is configured now. If a user was assigned yesterday and someone removed the assignment today, the older assignment event can still be accurate. Check the current assignment before drawing a conclusion about what the user should see today.

    ## Follow the evidence across sign-in and app assignment

    `user.session.start` records an attempt to authenticate a user or establish an Okta session. A successful event shows that this particular operation succeeded. Additional policy or authentication steps can still follow. To establish that the user reached the dashboard, also check what their browser shows.

    For an app that uses **single sign-on (SSO)**, `user.authentication.sso` is an app-focused event to investigate. Read its outcome and target. The **Bookmark App** from Lesson 4 simply opens a URL, so use its assignment and the visible dashboard tile as evidence in this lab.

    When investigating an extra authentication prompt, look for related events in the same time window. In Identity Engine, `user.authentication.auth_via_mfa` is relevant to authenticator verification. Expand the event and inspect the outcome and the available authenticator details before naming the factor used. A session event by itself cannot tell you which factor satisfied a later challenge.

    ## Narrow a search one condition at a time

    A **filter** is a condition that selects matching events. Start with the time window, then add an event type. An equality check uses `eq`, and `and` requires both conditions to be true. For example, paste this into the System Log search bar:

    ```text
    eventType eq "user.session.start" and outcome.result eq "SUCCESS"
    ```

    Read that as “show attempts of this event type whose recorded outcome was success.” For the sign-in you generated, open the event and confirm the actor matches your test user. A filter that only searches the actor can miss assignment and group events affecting the same user, because the actor might be an administrator or an automated rule.

    If you see no match, widen the time window and remove one filter at a time. For authentication, check whether you reused an existing session. For a membership or assignment change, check that processing finished and that you searched for the kind of change you actually made.

    ## Official reading

    - [System Log filters and search](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm)
    - [Okta event types](https://developer.okta.com/docs/reference/api/event-types/)
    - [Manage app integration assignments](https://help.okta.com/oie/en-us/Content/Topics/apps/apps-manage-assignments.htm)

=== "Hands-on Lab"

    ## Lab 5 · Verify a sign-in and investigate a missing tile

    === "1. Read a sign-in event"

        ### 1. Prepare the test sessions

        Use the two active users, the `LAB-Finance` group and active rule, and the `LAB-Assignment-Bookmark` integration from Lessons 2–4. Confirm that the first user's Department is `Lab-Finance`, the second user's is `Lab-Operations`, and the bookmark is assigned to `LAB-Finance` without an individual assignment for either user. Use an admin account with access to the System Log.

        Keep your Admin Console open. Use a different browser profile or a fresh private window for the test-user session.

        ### 2. Generate a sign-in event

        1. Note the time and time zone you will use for the search.
        2. In the separate session, sign in as the first test user and complete the required prompts. Confirm the End-User Dashboard loads and shows the bookmark.
        3. If you opened a session that was already signed in, sign out of that test session and sign in again so you have a new attempt to look up.

        ### 3. Filter for the event

        1. In the Admin Console, open **Reports → System Log**.
        2. Set **From** and **To** to include the sign-in, using the displayed time zone.
        3. Enter the search below and run it. Find the row for your test user at the time you signed in.

        ```text
        eventType eq "user.session.start" and outcome.result eq "SUCCESS"
        ```

        4. If no row appears, search again with just the event type. Check the time window and the outcomes actually recorded.

        ### 4. Inspect the event details

        Expand the row using the arrow on the left. Find the **Actor**, event type, and **Outcome**. Verify the account and time match your test. If the user completed an additional authenticator prompt, look for nearby verification events, such as `user.authentication.auth_via_mfa`, and inspect the details that are present. Factor-based searches receive more practice later in the course.

    === "2. Trace a missing tile"

        ### 5. Reproduce a missing tile in the lab

        In the Admin Console, change the first test user's Department to `Lab-Operations` and save. After the rule has processed the change, refresh or reopen that user's dashboard. The bookmark should disappear once the group-based assignment is removed. Use the existing lab bookmark and test user for this exercise.

        ### 6. Find where the assignment stopped

        1. Open **Applications and Resources → Applications**, select `LAB-Assignment-Bookmark`, and open **Assignments**. Check whether `LAB-Finance` is still listed under **Groups**, then look for the first user under **People**.
        2. Open **Directory → Groups → LAB-Finance → People**. Check whether the user is a member.
        3. Open the user's **Profile** and inspect **Department**. Then check the rule under **Directory → Groups → Rules**. Explain which saved value changed and how it affected membership.

        ### 7. Look for changes in the System Log

        Set the time range around the department update. Search for these event types one at a time:

        ```text
        eventType eq "group.user_membership.remove"
        eventType eq "application.user_membership.remove"
        ```

        Expand matching events. Compare the target user, group or application, time, and outcome. The actor may be different from the affected user. If you cannot find a matching event, note that and use the current membership and assignment views to verify the state.

        ### 8. Restore the original setup and verify it

        1. Change the first user's Department back to `Lab-Finance`.
        2. Confirm the user appears in the group's **People** view and is assigned to the bookmark. Refresh the user's dashboard and check that the tile returns.
        3. Search the same time window for `group.user_membership.add` and `application.user_membership.add` with the `eventType eq` syntax. Compare any matching target and outcome with your earlier observations. Leave the restored configuration in place for the capstone.
