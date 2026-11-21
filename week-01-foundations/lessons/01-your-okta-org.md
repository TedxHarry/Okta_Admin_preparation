# Lesson 1 · Your Okta org

Devi joins Finance and asks for the expense app. You open Okta as an administrator. Before creating anything, you need to answer three questions. Which environment am I in? Where does Devi's identity live? Where would I check what she can access?

## What an org contains

An Okta organization, usually called an **org**, is an independent environment with its own users, groups, app integrations, policies, and configuration. Your Integrator org is where you will do this lesson. When you later open a Workforce trial, it will have its own directory. Creating Devi in one org does not automatically create her in the other.

| Term | What it means in Devi's case |
|---|---|
| User | The account that identifies Devi in this org. |
| Profile | The attributes stored for that user, such as her login and department. |
| Group | A collection of users. Finance employees can share an app assignment through a group. |
| App integration | The configuration connecting this org to an application, such as the expense service. |
| Assignment | The relationship that gives a user or group access to an app integration. |
| Authentication | The process by which Devi proves her identity when signing in. |

## How these pieces work together

Suppose an administrator assigns the expense app to a Finance group. Devi's department is Finance. Will she receive the assignment? You need one more fact: is she actually a member of the assigned group? Storing a department value and creating a group with the same name do not connect them automatically. An administrator can add Devi directly, or configure a rule that uses her profile to manage membership.

Now suppose Devi sees the app on her dashboard but receives another authentication prompt when she opens it. Assignment explains why the app is available to her. The app's sign-in requirements explain what she must prove before access succeeds. Keeping those decisions separate helps you choose where to investigate.

## Guided practice in your Integrator org

1. Open your existing Integrator org and locate the **Admin Console**. Observe the org hostname and the administrator hostname. Okta's standard administrator hostname includes `-admin`. Record fictional equivalents such as `example.okta.com` and `example-admin.okta.com`.
2. Open **Directory → People** and locate your own account. Identify one profile attribute and the account status. Explain what each tells you.
3. Open **Directory → Groups**, then **Applications → Applications**. Identify where you would inspect Finance group membership and where you would inspect the expense app's assignments. The navigation exercise works even if the training group and app have not been created yet.
4. Open your end-user dashboard using your org's dashboard link. Compare the actions available there with the Admin Console. Use the console to manage configuration and the dashboard to inspect the signed-in user's app experience.

## Check your understanding

- Your colleague creates Devi in a trial org. Your search in the Integrator org returns nothing. What would you verify before creating a duplicate?
- Devi's profile says Finance. What evidence would show that she receives the expense app through the Finance group?
- Devi signs in to Okta successfully. What does that establish, and what must you still check to explain her access to a specific app?

Reply with your answers and the two console locations you found. In the next lesson you will create two test users and observe what changes as their accounts become active.

## Official reading

- [Okta organizations](https://developer.okta.com/docs/concepts/okta-organizations/) covers the org boundary, hostnames, and environment types.
- [Integrator Free Plan configuration](https://developer.okta.com/docs/reference/org-defaults/) describes the features and limits of your lab.
- [Group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) explains how a profile attribute can drive membership.
