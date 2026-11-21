# Lesson 2 · Users, profiles, and activation

=== "Theory"

    ## What Okta creates when you add a person

    When you select **Add person** and save the form, Okta creates a **user account** in the current org. That account is the record you open when you need to see who the user is, check their status, or manage their access.

    The **user profile** is the part of the record that stores information about the user. Each named field is an **attribute**. For instance, **First name** is an attribute. The text stored in that field is its **value**. When a group rule later checks an attribute, it reads the value stored on the profile.

    **User type** determines which profile definition applies to the account. A profile definition specifies which fields are available for that type of user. The built-in **User** type is enough for this lab. We will use the form to fill in one profile. Changing which fields exist is a separate task in **Profile Editor**.

    | What you see in Okta | What it tells you |
    | --- | --- |
    | **Username** | The login identifier for the account in this org. The **Add Person** form shown in the lab requires email format. |
    | **Primary email** | The main email address on the user’s profile. In this lab, Okta uses it to deliver the activation message. The form can use the same value for username and primary email. Each field still has its own purpose. |
    | **Status** | The point the account has reached in its lifecycle. Look for it on **Directory → People** and on the individual user record. |
    | **Profile** | The tab you open on the individual user record to inspect attributes such as first name and email. |

    ## How creation and activation fit together

    **Creation** saves the account and its profile in the directory. **Activation** starts or completes the steps that make the account available for use. You can choose when Okta starts those steps in the **Activation** field.

    | Choice in Add Person | What happens when you save | What happens next |
    | --- | --- | --- |
    | **Activate later** | Okta saves a **Staged** account. | An administrator starts activation from the People list. |
    | **Activate now**, with the user setting up their own credentials | Okta starts activation when you save. When the user still has to complete email verification or password setup, the console shows **Pending user action**. | The user follows the activation message and completes the required setup. |
    | **Activate now**, with the administrator setting the password | Okta can show **Active** immediately under the documented conditions. | Depending on the settings and policy, the user can still be asked to change the password or enroll an authenticator. |

    **Staged** means that the account exists and is awaiting activation or an administrator action. **Pending user action** means the next required setup step belongs to the user. You may see this same pending state called `PROVISIONED` in the Okta API. Here it is an account status.

    **Active** is an account state. When the user actually signs in, Okta still checks the applicable authentication requirements. An **authenticator** is a method the user can use to prove their identity, such as a password or Okta Verify. The user also needs an assignment to receive a particular app integration.

    ### Follow the account through the email activation path

    1. **Save with Activate later.** The account first appears as **Staged**.
    2. **Start activation.** The administrator selects **Activate**. In the email setup path, Okta can show **Pending user action** while the user completes setup.
    3. **Finish setup.** The user follows the activation email and completes the required steps. Return to **Directory → People** to see when the account shows **Active**.

    If an account stays **Staged**, start by checking whether activation was initiated. If it shows **Pending user action**, start with the activation message and any unfinished setup. The status tells you which part of the process to investigate first.

    ## Official reading

    - [Add users manually](https://help.okta.com/oie/en-us/content/Topics/users-groups-profiles/usgp-add-users.htm)
    - [Activate user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm)
    - [User account status](https://help.okta.com/okta_help.htm?id=ext_end_user_states&type=oie)

=== "Hands-on Lab"

    ## Lab 2 · Create two accounts and compare activation

    Use your Integrator org and two distinct test logins in email format. Use email addresses you control for the **Primary email** values. The lab sends activation messages, so use inboxes you can open. Keep your Admin Console open in one browser profile and use a separate browser profile or private window to open the activation links as the test users.

    Work through the tabs in order. Leave the first **Add Person** form open when you move to **Activate now**.

    === "1. Open Add Person"

        1. In the **Admin Console**, open **Directory → People**.
        2. Select **Add person** above the search field.

        ![Admin Console sidebar with Directory expanded and the People page showing Add person and search](../../assets/okta-people-navigation.svg)

        3. In **Add Person**, leave **User type** set to **User**. Enter a test first and last name, an email-format **Username**, and the **Primary email** you control. Leave **Secondary email** and **Groups** blank for this lab.

        ![Full Add Person form with the Activation menu open and both Activate now and Activate later visible](../../assets/okta-add-person-activation.svg)

    === "2. Activate now"

        1. Set **Activation** to **Activate now**. Leave **I will set password** unchecked so you can work through the user setup path.
        2. Select **Save**. Back on **People**, use the search field to find the account by its username. Read the **Status** column before opening the inbox. If setup is still required, expect **Pending user action**.
        3. Open the activation message in the test inbox. Follow its link in the separate browser session and complete the setup Okta asks for.
        4. Refresh **Directory → People** in the Admin Console. Find the same account and look for **Active**.

    === "3. Activate later"

        1. Return to **Directory → People → Add person**. Enter the second test user's name, username, and primary email.
        2. Set **Activation** to **Activate later**, then select **Save**.
        3. Search for this second account on **People**. It should show **Staged**. The first user and the second user now have separate records, and the second account is still awaiting activation.
        4. Use **Activate** in the second user's **Status** column. In the **Activate Person** dialog, select **Activate User**.
        5. Open the second activation message and finish setup in the separate browser session. Refresh **People** and read the second account's status. If it remains **Pending user action**, check whether setup was completed for the correct account.

    === "4. Inspect the profile"

        1. In **Directory → People**, select either test user's name.
        2. Open **Profile**. Locate the username and primary email you entered. The profile shows the information Okta saved. Return to the People list to see the account's **Status** alongside the user record.
