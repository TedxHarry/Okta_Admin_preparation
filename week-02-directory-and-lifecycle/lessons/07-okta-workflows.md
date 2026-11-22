# Lesson 7 · Okta Workflows for lifecycle management

=== "Theory"

    In the earlier lessons, a group rule maintained membership as a profile value changed. An app integration then handled the account lifecycle. **Okta Workflows** lets you define a sequence of actions around a lifecycle event. For example, when a user is activated, a flow can read that user's profile, decide whether the user qualifies, and add them to a specific group.

    ## Read the flow from left to right

    A flow consists of **cards**. An **event card** starts the flow and provides information about what happened. An **action card** reads or changes something in a connected system. A **function card** works with the data inside the flow. An **output** is a value a card produces. An **input** is a value a card needs. When you connect an earlier card's output to a later card's input, the later card can use the result.

    | Card | What it receives | What it does |
    | --- | --- | --- |
    | **Okta → User Activated** | Activation event from Okta | Supplies the user ID, the unique value Okta uses to identify the account involved in the event. |
    | **Okta → Read User** | The activated user's ID | Reads the Okta profile, including Department. |
    | **Branching → Continue If** | Department and the lab's expected value | Continues if the values match. Ends this run if the condition is false. |
    | **Okta → Add User to Group** | The user ID and a specific group ID | Adds that user to the lab group. |

    The activation event gives you the user's identity. To make a decision using Department, the flow reads the user's current profile. In the editor, drag **Okta User → ID** from the event into **Read User → ID or Login**. The event also has an admin ID, which identifies the person who initiated the activation. The action should use the ID of the user being activated.

    A **connection** lets a connector authenticate and act in a particular org or app. In this lab the same Okta connection is used for the event, the profile read, and the membership write. When a card fails, check which org the connection points to and whether it has the permission needed for that card. Reading a user and writing group membership require different permissions.

    ## Choose the mechanism by the change you need

    | What you want to happen | Where to configure it |
    | --- | --- |
    | Membership follows a profile attribute over time. | Use a [group rule](../../week-01-foundations/lessons/03-groups-and-membership-rules.md) so membership can follow later profile changes. |
    | The receiving app gets an account after assignment. | Use [application provisioning](05-application-provisioning.md) for the connector's supported account operations. |
    | An activation starts a sequence of steps with a decision. | Use an event-driven flow. Inspect each executed step in **Execution History**. |

    This lab runs at activation. If Department changes later, the activation flow has no new activation event to process. For access that must follow a later transfer or departure, design how the membership will be removed or updated as well.

    ## Interpret the result of a run

    Check the flow's **Execution History** to see whether a run started and which cards ran. A false **Continue If** result is an expected outcome when the user does not qualify. For a real error, find the first failing card and inspect its inputs. Then check the actual group membership in **Directory → Groups → People**. The run tells you what the automation attempted. The group tells you what access state exists now.

    Saving detailed card inputs and outputs is optional. Use synthetic test data if you enable it for this lab. Card outputs can contain user profile information.

    ## Official reading

    - [Workflows for Lifecycle Management](https://www.okta.com/platform/workflows/workflows-for-lifecycle-management/)
    - [First Look: Okta Workflows](https://learning.okta.com/first-look-okta-workflows/2273030/scorm/ilcz8c8ugqju)
    - [Okta Workflows Help](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-main.htm)
    - [User Activated event](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/events/useractivated.htm)
    - [Read User](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/actions/readuser.htm)
    - [Continue If](https://help.okta.com/wf/en-us/content/topics/workflows/function-reference/branching/branching_continueif.htm)
    - [Add User to Group](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/actions/addnewusertogroup.htm)
    - [Save flow data to execution history](https://help.okta.com/wf/en-us/content/Topics/Workflows/execute/execution-history-save.htm)

=== "Hands-on Lab"

    Use the Integrator org with access to the **Workflows Console**, a free flow slot, and permission to create an Okta connector connection and manage the test group. You will create one flow named `LAB-Activation-Group` and one Okta group named `LAB-Workflow-Activation`. The flow decides whether to add someone to the group when their account is activated. One test user will match the Department condition. The other is the **control user**, a test user who goes through the same activation with a Department that does not match. Leave the group unassigned to apps and admin roles.

    === "1. Build the flow"

        **1. Prepare the test records.** In **Directory → Groups**, create `LAB-Workflow-Activation`. Open the group and copy its ID from the browser address bar. The **ID** is the unique value Okta uses to identify that group. You will give it to the flow so the membership action knows which group to update. Following [Week 1, Lesson 2](../../week-01-foundations/lessons/02-users-profiles-and-activation.md), create two users with **Activate later**. In their profiles, set one Department to `Lab-Workflow-Onboarding` and the other to `Lab-Workflow-Control`. Verify both are staged. [Find the group ID in the Admin Console](https://support.okta.com/help/s/article/how-to-find-group-ids-through-the-okta-user-interface)

        **2. Add the event and profile read.** In the Admin Console, open **Workflow → Workflows console**. Under **Flows**, open a folder and create a flow named `LAB-Activation-Group`. Add the Okta **User Activated** event and select or authorize an Okta connection for the lab org. Add the Okta **Read User** action. Map **Okta User → ID** to **ID or Login**. Expose **Department** in the action card's profile outputs if it is hidden.

        **3. Add the condition.** Add **Function → Branching → Continue If**. Drag **Read User → Department** into **value a**. Use **equal to** and enter `Lab-Workflow-Onboarding` for **value b**. Use text values. Add an optional message such as `Department outside lab scope` for runs that stop here.

        **4. Add the membership action.** Add **Okta → Add User to Group**. Map the activated user's ID from the event card into the user ID input and paste the ID of **LAB-Workflow-Activation** into the group ID input. Save and turn on the flow. In a dedicated test org using synthetic profiles, you can enable **Save all data that passes through the flow** temporarily to inspect the exact card inputs and outputs.

    === "2. Test both outcomes"

        **1. Activate the matching user.** After saving and turning on the flow, wait one minute before activating the user. Okta documents this delay so the flow can start receiving events. If you activated the user too soon and see no run, generate a fresh activation with a separate staged test account after the flow is ready. [Okta · Build and test a flow](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-build-a-flow.htm)

        Then go to **Directory → People** and activate the staged user whose Department is `Lab-Workflow-Onboarding`. In Workflows, open the flow's **Execution History** and find the run for that activation. Check that the membership action ran. Verify the user under **LAB-Workflow-Activation → People**.

        **2. Activate the control user.** Repeat with the staged user whose Department is `Lab-Workflow-Control`. Find the second run. The condition should stop the flow before **Add User to Group**. Verify the control user stays outside the group even though their Okta account was activated.

        **3. Check a missing or unexpected result.** If there is no run, verify the flow is on, then confirm the activation in **Reports → System Log** and check that the Workflows connection points to that same org. If a run stopped after the profile read, compare the actual Department with the condition. If the membership action failed, check the group ID, the user ID, and the connector's group management permissions.

        **4. Reset the lab.** Turn the flow off and disable detailed input/output saving if you enabled it. Remove the matching test user from the lab group. The flow and its history are available for review when you return.
