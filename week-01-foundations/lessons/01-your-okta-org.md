# Lesson 1 · Your Okta org

When you open Okta, the first thing to check is which **org** you are in. An org is one Okta environment. It has its own users, groups, app connections, and rules for signing in. Your Integrator org and a Workforce trial are two separate environments. Each keeps its own configuration, so the org you open determines which accounts and settings you see.

## What lives in an org?

A **user account** is the record Okta uses to identify someone in that org. The **user profile** is the information stored on that record. Login, email, and department are profile fields. The account also has a **status**, which tells you where it is in its lifecycle. If you are trying to understand why someone cannot sign in, the status is one of the first things to check.

A **group** is a collection of users. Groups let you manage a set of people together. An administrator can add people to a group directly, or a **group rule** can use information on their profiles to manage membership. When you see a department value on a user profile, you are looking at data. To see whether that data affected access, check the group rule and the resulting membership.

An **app integration** is how you connect Okta to an application or represent it in Okta. An **assignment** tells Okta which users or groups the integration is available to. When you assign an app to a group, its members receive that assignment through the group.

## How Okta gets from a profile to app access

1. **Read the profile.** An active group rule looks at the Okta profile field it was configured to evaluate.
2. **Determine group membership.** The rule can place the user in its target group when the condition matches.
3. **Determine app assignment.** If that group is assigned to an app integration, the user receives that assignment. A user can also receive an assignment directly.
4. **Evaluate the sign-in requirements.** When the user opens the app, Okta evaluates the applicable sign-in policy. It may ask the user for another form of proof, depending on the rule that applies and what the user has already proved.

These steps give you a way to debug access. If someone expected an app from a group, look at the membership and assignment. If they reach a sign-in prompt or denial, look at the authentication requirements and the sign-in event. Each check answers a different question.

## Where you look in Okta

The **Admin Console** is where administrators read and manage the org's configuration. The **End-User Dashboard** is where the signed-in user sees app tiles available to them. The dashboard shows that user's view. Use the Admin Console to find the configuration behind it.

| What you want to check | Where to start |
| --- | --- |
| A user's account status or profile | **Directory → People** |
| Who belongs to a group | **Directory → Groups**, then open the group |
| What automatically puts users in a group | **Directory → Groups → Rules** |
| Which people or groups an app is assigned to | **Applications → Applications**, then open the app and select **Assignments** |
| What the signed-in user sees | **End-User Dashboard** |

The standard Admin Console hostname includes `-admin`. For example, `example-admin.okta.com` is the admin hostname for `example.okta.com`. Check the org name as well, especially once you have the Integrator and trial open at the same time.

## Guided practice in your Integrator org

1. Open the **Admin Console** and **End-User Dashboard**. Identify which tab shows configuration and which shows apps for the signed-in user.
2. In the Admin Console, open **Directory → People** and open your own record. Identify its status and one profile field. Say out loud what each tells you.
3. Open **Directory → Groups**. Find where membership appears on a group and where you would inspect a group rule.
4. Open **Applications → Applications**. If an app integration is present, open it and locate **Assignments**. Identify where Okta shows user and group assignments. If the list is empty, record the navigation path and leave the org ready for the application lab.

## Check your understanding

- Why can the same person have a separate record in each of your two orgs?
- If a profile field has the value you expect, what would you check next to prove that an app was assigned through a group?
- If a user can sign in to Okta and sees an app tile, what could still explain an additional prompt when they open the app?

## Official reading

- [Okta organizations](https://developer.okta.com/docs/concepts/okta-organizations/)
- [Integrator Free Plan configuration](https://developer.okta.com/docs/reference/org-defaults/)
- [Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm)
