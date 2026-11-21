# Lesson 1 · Your Okta org

An Okta **org** is one environment. It holds the users, groups, app integrations, and policies you work with. Your Integrator org has its own records and settings. A Workforce trial has its own records and settings too. If you open the trial and search for a user you created in your Integrator org, that user record will still be in the Integrator org. The org you open determines which data and settings you see.

That makes the org name and hostname the first things to check before you investigate an issue or change a setting. Okta's standard Admin Console hostname includes `-admin`. The org hostname and its corresponding admin hostname can lead to different views of the same environment.

## What Okta knows about a user

A **user account** is the record Okta keeps for a user in that org. Part of that record is the **profile**. It holds values such as the login, email address, and department. Each field is called an **attribute**.

The account also has a **status**. Status tells you where the account is in its lifecycle. A department value tells you something about the user. The account status tells you something about the account itself. When you open **Directory → People**, look for both. You will use them for different checks.

## How a profile value becomes group membership

A **group** is a collection of users. It lets you manage a set of people together. When you open a group, its membership tells you which users currently belong to it.

There are two useful ways to think about how a user gets there. An administrator can add the user directly. An administrator can also configure a **group rule** so Okta manages membership based on a condition.

A group rule has a condition and a target group. For an attribute-based rule, Okta reads the value from the user's Okta profile. If the rule is active and the user meets its conditions, Okta can add the user to the target group. The profile supplies the value. The rule makes use of that value. The membership is the result you can inspect.

If the membership you expected is missing, start with the profile value Okta actually has. Then open **Directory → Groups → Rules** and check the condition, whether the rule is active, and which group it targets. Finally, open the group itself to see the membership. Each screen answers a different question.

## How group membership leads to an app assignment

An **app integration** is the configuration that represents a connection to an application in Okta. An **assignment** makes that integration available to a user. You can assign the integration directly to the user or assign it to a group so members receive it through the group.

Follow those two relationships in order. First, establish that the user is in the group. Then open the app integration and establish that the group is assigned. Both relationships are needed for this path. A user can also have an assignment through a different group or a direct assignment, so check the source of the assignment before explaining why the user has it.

You can inspect this from **Applications → Applications**. Open an app integration and select **Assignments**. That view helps you understand who receives the integration. Later, when we study provisioning, we will check separately whether the connected application has an account for the user.

## What happens when the user opens the app

An app assignment answers one question: is this integration available to the user in Okta? When the user opens an app that Okta protects, a second question matters: has the user met the sign-in requirements for this app?

**Authentication** is how the user proves their identity. In Okta Identity Engine, a **global session policy** governs the requirements for establishing the Okta session. An **app sign-in policy** governs the authentication requirements for access to the requested app. Okta can use proof that the user already provided when it satisfies the app's requirements. The user may see another prompt if the app requires more proof.

This gives you a starting point when something looks wrong. Check the assignment when you need to explain how the user received the integration. Check the sign-in policy and the sign-in event when you need to explain an authentication prompt or denial. If Okta sign-in succeeds and the application still denies a particular action, the application's own permissions may need checking.

## Where to see each part

The **Admin Console** shows the configuration and records you administer. The **End-User Dashboard** shows the signed-in user's view, including the app tiles available to them on that dashboard.

| What you want to establish | Where to look |
| --- | --- |
| Which org you opened | Check the org name and browser hostname. |
| Which status and profile values the user has | Open the user under **Directory → People**. |
| Which users belong to a group | Open the group under **Directory → Groups**. |
| What condition drives membership | Open **Directory → Groups → Rules**. |
| How the app integration is assigned | Open the integration under **Applications → Applications**, then select **Assignments**. |
| What the user sees | Open the **End-User Dashboard** as that user. |

## Guided practice in your Integrator org

1. Open the **Admin Console** and the **End-User Dashboard**. Identify the org and explain which view you would use to inspect configuration.
2. Open your record under **Directory → People**. Identify the account status and one profile attribute. Explain what each tells you.
3. Open **Directory → Groups**. Find a group's membership view, then find the **Rules** tab. Explain what you would learn from each.
4. Open **Applications → Applications**. If there is an integration in your lab, open it and locate **Assignments**. If the list is empty, identify the page you will return to when you configure your first app.

## Check your understanding

1. Why can two orgs show different results when you search for the same login?
2. You can see the expected profile value. Which records would you check to establish whether that value led to an app assignment?
3. Why can a user who already signed in to Okta receive an additional prompt when opening an assigned app?

Try each answer in your own words before reopening the relevant section. In the next lesson, you will see how an account moves through activation and how to check its status.

## Official reading

- [Okta organizations](https://developer.okta.com/docs/concepts/okta-organizations/)
- [Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm)
- [Okta Identity Engine sign-in flows](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/about-sign-in-flows.htm)
