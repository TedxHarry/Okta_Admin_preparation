# Module 2 capstone · Finance joiner and mover

Use your Integrator org to give a new Finance test user their first app access, then handle their move to Operations. A **joiner** is someone who needs their initial access. A **mover** is someone who needs their access adjusted because their role or department changed. Then explain the result using the current configuration and System Log evidence. Work from the requirements before opening the hints.

## Starting state

- Complete [users and activation](../lessons/02-users-profiles-and-activation.md), [groups and rules](../lessons/03-groups-and-membership-rules.md), [app assignment](../lessons/04-application-assignment-and-dashboard.md), and the [System Log lab](../lessons/05-system-log-and-access-investigations.md).
- Confirm `LAB-Finance-by-Department` is active and assigns users with Department `Lab-Finance` to `LAB-Finance`. `LAB-Finance` is the Okta group the rule adds users to. `LAB-Assignment-Bookmark` is the practice bookmark app from Lesson 4. It should be assigned to that group.
- Use a new test account in your lab org and an email address you control. Keep the Admin Console and the test user's dashboard in separate browser sessions. Use an administrator account that can manage test users and read the System Log.
- Leave the working rule and app assignment in place. Use the new test user for all changes in this exercise.

=== "1. Onboard and verify the joiner"

    ### 1. Record the expected access path

    Write down the profile value, rule, target group, and app integration that should give the new user a tile. Confirm that the lab bookmark is visible to assigned users. If your configuration differs from the starting state, correct your lab setup before continuing.

    ### 2. Create the user and stage the account

    Create the test user with **Activate later**. Verify the account shows **Staged**. Set **Department** to `Lab-Finance` and verify the saved value in the user's **Profile**. Check `LAB-Finance` before activation and record whether the user appears.

    ### 3. Activate the account and verify membership

    Activate the staged user and complete the required setup using the test inbox. Confirm the user's current status in **Directory → People**. After the rule processes the change, look for the user in `LAB-Finance → People`. Keep the assignment rule-managed so you can observe the move in the next sublab.

    ### 4. Verify app assignment and the user experience

    Find the user in the bookmark integration's **Assignments → People** view. Sign in as the test user, find the tile, and open it. Record when you signed in and the time zone. In the Admin Console, locate the relevant System Log sign-in event and compare its actor and outcome with what happened in the browser.

=== "2. Process the move and explain the outcome"

    ### 5. Move the same user to Operations

    Update the user's **Department** to `Lab-Operations` and save. Record the time and time zone. Check the rule and the `LAB-Finance` membership after processing. Verify that the group is still assigned to the bookmark for other qualifying users.

    ### 6. Verify that the bookmark assignment was removed

    Check **Assignments → People** for the test user. Refresh or reopen their dashboard and confirm the tile is absent. If it remains, check the saved Department, current membership, and any other assignment path. Verify that you are looking at the test user's dashboard.

    ### 7. Compare log evidence with current state

    Search the System Log in the time window around the update. Look for group membership and application assignment removal events. Compare the event type, affected objects, time, and outcome. If you cannot find either event, record the gap and use the current group and assignment views to support your finding.

    ### 8. Write a short handoff

    In a few lines, explain why the user originally received the tile and which change removed it. Include the profile value before and after, the observed membership and assignment, the dashboard result, and any matching log events. Leave the capstone user in Operations for this exercise's final state.

## Hints and expected results

<details>
<summary>Open after you have tried both sublabs</summary>
<p>For the joiner, look in Directory → People for the account and its Department. In Directory → Groups → Rules, verify that the active rule uses that attribute and targets LAB-Finance. After activation and rule processing, verify membership in the group, assignment in the app, and the tile on the dashboard.</p>
<p>For the mover, use the saved profile and current membership first. After the Department becomes Lab-Operations, the test user should leave LAB-Finance and lose the group-derived bookmark assignment if no other assignment path applies. The group-to-app assignment itself should still be present.</p>
<p>Use the System Log searches from Lesson 5. Look up user.session.start for the sign-in, group.user_membership.remove for the membership change, and application.user_membership.remove for the assignment change. Search each event type separately. The bookmark opens a URL, so verify its launch in the browser.</p>
</details>
