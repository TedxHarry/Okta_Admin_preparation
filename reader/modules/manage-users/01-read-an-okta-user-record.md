# Lesson 1 · Read an Okta user record

=== "Theory"

    Open **Directory → People** in the Okta Admin Console. When you select a person, you’ll see their name, a status, and places to look for more information. Before changing anything, learn to answer four questions. Which account is this? What state is it in? Where did its information come from? What access does it have? Each answer comes from a different part of the record. [Okta · Manage users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-people.htm)

    ## The person, the account, and the profile

    A **person** is the individual. An **Okta user account** is the record Okta uses to represent that individual in your **org**, which is your Okta environment. **Universal Directory** is where Okta keeps the user’s information. The **profile** is the part of the account that holds details such as first name, last name, email, and department. Each field is called an **attribute**. [Okta · Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/)

    | Value | What it tells you |
    | --- | --- |
    | **Username** | The account’s Okta login name. It may look like an email address. In the Okta API, the field is called `login`. |
    | **Primary email** | The email address stored on the profile. Its value can be identical to the username, and each has its own field. |
    | **User ID** | The unique key Okta uses to identify the account. Use it when comparing records across an export or an API response. |

    An **API** is a way for software to request data or perform an action in Okta. If two results have the same name, compare their full usernames and primary emails before selecting a result. Use the user ID when you need to establish that two records refer to the exact same Okta account. [Okta · Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user)

    ## Find the record before diagnosing it

    If a menu, action, or user is missing, first confirm the test org, clear status filters, and check the administrator role and its scope. A scoped Help Desk Admin can view and perform supported recovery tasks for users in scope. Creating users, suspending them, and assigning apps need different permissions. [Okta · Help desk administrators](https://help.okta.com/oie/en-us/content/topics/security/administrators-help-desk-admin.htm)

    Start in **Directory → People**. You can filter the list by status. You can also search from the Admin Console search bar using the username or email address. If the user doesn’t appear, confirm the org you’re in, clear any status filter, and check what your admin role allows you to see. An **admin role** gives an administrator permission to perform certain actions or view certain records. For example, an administrator who manages only specific groups can see users in those groups. [Okta · Manage users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-people.htm)

    ## Read the account status

    The **status** tells you what state the Okta account is in right now. Find it in the **Status** column on the People page or on the individual user record. Three people can all say “I can’t sign in.” One might be waiting to finish activation, one might be locked out, and one might be suspended. Read the label before choosing an action.

    | Admin Console status | How to read it |
    | --- | --- |
    | **Staged** | The account exists. Activation has yet to start, or an admin action is pending. |
    | **Pending user action** | The user still has an activation step to complete, such as verifying their email or setting a password. The API calls this state `PROVISIONED`. |
    | **Active** | The account is active in Okta. If the user can’t open a particular app, check the app assignment and the sign-in requirements for that app. |
    | **Password reset** | The account is in recovery after an admin requested a password reset. The API calls this state `RECOVERY`. |
    | **Password expired** | The user needs to change the password before accessing apps. |
    | **Locked out** | The user exceeded the allowed sign-in attempts under the applicable policy. |
    | **Suspended** | Suspension blocks access while keeping the user’s app assignments in place. |
    | **Deactivated** | Okta deactivated the account and removes its app assignments. The API calls this state `DEPROVISIONED`. |

    When someone says “the user is provisioned,” ask which system they mean. The **Okta account** can have the API status `PROVISIONED`, meaning it is waiting for the user to finish setup. In an app integration, **provisioning** refers to work such as creating or updating an account **in the app**. [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm) · [Okta · Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/)

    ## Understand what controls the profile

    A **schema** defines which fields a profile can have and what each field accepts. The profile contains the values for one person. For example, the schema defines the **Department** field, and one user’s profile holds **Finance** as its value. Use **Directory → People → select the user → Profile** to read individual values. Use **Directory → Profile Editor** to inspect field definitions. [Okta · Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/)

    | Setting | Question it answers |
    | --- | --- |
    | **User type** | **Which fields can this user have?** An account uses one profile type. Okta supports the default type plus up to nine custom types. A custom type can require fields that the default type does not have. |
    | **Profile or attribute source** | **Which system supplies the value?** Okta can manage the data itself, or a connected system can supply it. One system can supply most of the profile while another supplies a particular field. |
    | **Realm** | **Which segment of this org does the account belong to?** If the org uses realms, it can organize users into separate populations within the same org and delegate administration. |

    If the field is missing, start with the user type and its field definitions. If you can see the field but its value is wrong, check the source and how that system’s field connects to the Okta field. That connection is a **mapping**. In the API, the account’s `type` identifies the profile type. A profile attribute named `userType` is a separate field. [Okta · Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/) · [Okta · Custom user types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-usertypes-about.htm)

    ## Read app access in three places

    An **app assignment** is how Okta grants a user access to an application integration. An assignment can go directly to a user or come through a **group**, which is a collection of users. Open the app under **Applications and Resources → Applications → Assignments** to see who receives it. To explain why someone gets the app, check the individual assignment and any group that can grant it. [Okta · Assign applications to users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-apps.htm)

    | Place | What you can learn there |
    | --- | --- |
    | **Okta user profile** | The person’s central details in Okta, such as their Okta username and department. |
    | **App user profile in Okta** | The values Okta holds for this person’s assignment to one integration. The username sent to the app can differ from the person’s Okta username. |
    | **Account inside the app** | The record the receiving app actually has. Check there when you need to prove it received an update or that its account is active. |

    An **Active** status answers the account-state question. An assignment answers the access-assignment question. A successful sign-in establishes that the user can get in. The receiving app’s account record shows what data actually arrived. Knowing which question you’re answering tells you where to look. [Okta · Universal Directory](https://developer.okta.com/docs/concepts/universal-directory/) · [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm)

=== "Hands-on Lab"

    --8<-- "lab-1.md"


=== "Revision"

    ## Read the user record

    | If you need to know… | Check… |
    | --- | --- |
    | Which user this is | **Directory → People**. Compare the exact username (`login`) and primary email. Use the user ID when you need to prove two records refer to the same account. |
    | What data the user can have | **User type** selects the schema. The schema defines the fields. The profile stores this user's values. |
    | Who supplies a value | Check the profile source, the field's **Source priority**, and the inbound mapping. A realm, where enabled, scopes populations and administration. |
    | Why an action is missing | Check the org, status filter, administrator role, and its scope. A scoped Help Desk Admin can perform supported recovery actions on users in scope. |
    | Why a user sees an app | Check **People → user → Applications** and the app's **Assignments** tab. Compare all assigned groups with the user's memberships. |

    ### Status at a glance

    | Console | What to do next |
    | --- | --- |
    | **Staged** | Check whether an admin needs to start activation. |
    | **Pending user action** (`PROVISIONED`) | Check whether the user still needs to complete activation or set credentials. |
    | **Active** | Use a fresh attempt to verify sign-in. For one failing app, check its assignment and sign-in policy. |
    | **Password reset** (`RECOVERY`) or **Password expired** | Check whether the user must complete recovery or set a new password. |
    | **Locked out** | Check the password policy and where the account is locked. |
    | **Suspended** or **Deactivated** (`DEPROVISIONED`) | Review the lifecycle action. Suspension retains assignments. Completed deactivation removes them. |

    **Exam focus.** A status, Okta sign-in, app assignment, and target-app access are four different checks. A successful result in one view answers only that view's question.

    ### Check your recall

    **1. Two users have the same display name. What do you compare first?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Compare their exact usernames and primary emails. Use the Okta user ID when you must establish that two records are the same account.</p>
    </details>

    **2. The user is Active and the app is missing. Where do you look?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Check the app assignment, its assigned groups, and the user’s group memberships. If assigned, check dashboard visibility and app sign-in requirements.</p>
    </details>

    ### Scenario and interview practice

    Decide what you would do and what evidence would confirm it. Then open each answer.

    **Troubleshooting scenario.** Two records share a display name. A ticket gives the old primary email and a recent failed sign-in. How would you identify the account before changing anything?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Find candidates by exact login and compare the user IDs and alternate identifiers in the recent System Log events. Cross-check the intended person's current login and primary email. An email change can make an old ticket look like a different person. Act on the verified user ID.</p>
    </details>

    **Interview question.** A user appears Active in People but says a colleague with the same name can open the app. Walk me through your first three checks.

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Confirm the failing user's ID and exact login, verify a fresh Okta sign-in, then inspect the actual app assignment path and app policy result. This separates account identity, Okta authentication, and application access.</p>
    </details>
