# Week 2 capstone · Manage a user from profile to offboarding

An Okta-managed test user needs access while their Department is `Lab-W2-Finance`. Their cost-center code starts at `FIN-0820` and later changes to `FIN-0821`. Configure the profile and access path, then use the same account to demonstrate a temporary hold and a final offboarding. Work from the outcomes below and look up the steps in the lessons as needed.

## Starting state

- Use a dedicated test user you are allowed to suspend and deactivate. You need an email address you control if the test user goes through email activation.
- Use a new Okta group named `LAB-W2-Finance-Access` and an unprivileged test integration. For the Okta-only path, use a dedicated bookmark for assignment checks and the app profile from [Week 2, Lesson 2](../lessons/02-profile-mappings.md) for mapping checks. A bookmark gives you a dashboard result to inspect.
- Use the optional string `labCostCenter` from [Week 2, Lesson 1](../lessons/01-universal-directory-and-profile-attributes.md). Restrict the rule to the lab Department and keep other access paths out of this exercise.
- The extensions require the supported test targets or Workflows permissions listed in their lessons.

=== "1. Establish access and trace the profile"

    1. Prepare the test user's Department and cost-center value. Find the field definition and show the value on the user record.
    2. Build a rule that puts the user into `LAB-W2-Finance-Access`. Assign the group to the test bookmark. Show the rule-managed membership, the group-derived app assignment, and the tile in a clean test session.
    3. Confirm the outbound mapping from `labCostCenter` to the app profile's **Cost Center Code** field. Preview the test user and show `FIN-0820`. Use [Profile mappings](../lessons/02-profile-mappings.md) if you need the path.
    4. Change the cost center to `FIN-0821` while keeping the Department as `Lab-W2-Finance`. Verify the saved input and the new mapping result. Explain why the same access rule still applies. In your notes, identify which system owns the source field and where you would check whether an external source could override it. See [Profile sourcing](../lessons/04-profile-sourcing-and-source-priority.md).

=== "2. Compare a temporary hold with offboarding"

    1. Suspend the user. Verify the account status, inspect the existing bookmark assignment from the Admin Console, and test a fresh sign-in as the disposable user.
    2. Restore the account from suspension and verify that the user can sign in. Check the group and app assignment again. Use [Suspend, deactivate, and restore a user](../lessons/03-user-account-lifecycle.md) if needed.
    3. Change the user's Department to `Lab-W2-Operations`. Verify that the rule removes the membership and the bookmark is no longer assigned. Then deactivate the same user. Check the final status in **Directory → People**. Keep the disposable user record available so you can compare it with the log later.
    4. Open **System Log** and find the suspension and deactivation entries. Record the outcome, actor, and target for each. Explain what changed at the group, app, and Okta user levels. If you used only the bookmark, your evidence covers Okta and the dashboard. To verify a target account, use the connected-app extension below.

=== "3. Verify the receiving system"

    **Tasks 1–3 require a working provisioning integration.** Run those tasks with a second disposable user before deactivating that user, or as a separate pass through the scenario.

    1. With a supported test application, configure the outbound mapping for an available test attribute and enable the supported create, update, and deactivate actions. Give this user an app assignment and record the receiving account ID. Verify an update on the same ID using [Application provisioning](../lessons/05-application-provisioning.md).
    2. If the target supports **Group Push**, use a separate push group and show the user's downstream membership. Remove the user from that push group first and verify the receiving group's membership. Use [Group Push](../lessons/06-group-push.md).
    3. Remove the user's app assignment. Verify the receiving account becomes inactive and record the target ID and state in your notes.
    4. If you have **Workflows**, run a separate test activation for an eligible user and a control user using [the lifecycle flow](../lessons/07-okta-workflows.md). Show which user reached the group action and which did not. Use a lab group without app or admin grants.

## Explain your result

Write a short handoff with the two cost-center values, the assignment path, the difference you saw between suspension and deactivation, and the evidence you collected. Include the target account or flow results if you ran those exercises.
