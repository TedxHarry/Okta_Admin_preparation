# Lesson 2 · Create and activate a user

=== "Theory"

    When you add someone in Okta, there are three moments to keep straight. **Creation** saves their account. **Activation** starts or completes the steps that make the account available for use. **First sign-in** is when the person actually tries to get in and Okta applies the sign-in requirements. These moments can happen together or at different times. That is why you can find someone in **Directory → People** before they can sign in. [Okta · Manage users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-people.htm) · [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm)

    ## What you enter in Add Person

    In the Admin Console, **Directory → People → Add Person** is where an administrator creates a user manually. Manual creation is a good fit when an admin needs to create an individual account directly in Okta. When an external system already holds the records you want to bring in, import and first-sign-in provisioning are other paths. Those are covered in Lesson 3. [Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Okta · Import users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-main.htm)

    | What you choose or enter | What it controls |
    | --- | --- |
    | **User type** | The profile definition this user will use. Start with the default type when it fits. If your org uses a custom type, check which additional fields it requires before you save. |
    | **First name and Last name** | The name values on the profile. Use the values that identify the person in your directory. |
    | **Username** | The account’s Okta login name. The documented Add Person form asks for it in email format. It identifies the sign-in account. |
    | **Primary email** | The main email address. Enter it separately if it differs from the username. For email activation, confirm the user can receive mail at the address you enter. |
    | **Secondary email** | An optional additional address that can help when the primary email is unavailable. |
    | **Groups** | Optional memberships you apply during creation. A group can grant an app or bring the user under a policy, so check what the group does before selecting it. |
    | **Realm** | Where the account belongs if the org uses realms. You can select a realm or let a realm assignment determine it. A delegated realm admin can only select a realm or create users where they have the required privileges. |

    Use **Save** to create the account or **Save and Add Another** to continue entering individual users. Okta documents support for up to three-byte UTF-8 characters in this form. UTF-8 is how text is encoded, so take that limit into account if a character in a name is rejected. [Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm)

    ## Choose when activation starts and who sets the password

    **Activate now** and **Activate later** answer *when should Okta start activation?* **I will set password** answers *who supplies the initial password?* These are separate decisions.

    | Path | What happens next | What to look for |
    | --- | --- | --- |
    | **Activate later** | Okta saves the account. An administrator can start activation when the person is ready. | Look for **Staged** in People. |
    | **Activate now**, with the user setting up their credentials | Okta starts activation. If the user has an email verification or password setup step, the account waits for the user to complete it. | Look for **Pending user action** when setup is still waiting on the user. |
    | **Activate now**, with **I will set password** selected | The administrator enters the initial password. The form shows **User must change password on first login**, which Okta selects by default. | The account can show **Active** even when the user still has to change that password during their first sign-in. |

    An **authenticator** is a method a user can use to prove their identity, such as a password or Okta Verify. **Enrollment** means setting up one of those methods on the account. Your authenticator enrollment policy controls which methods the user has to set up. So if the user sees a setup prompt after activation, read the prompt before assuming activation failed. They may already have an active account and still need to enroll an authenticator. [Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm) · [Okta · Authenticator enrollment policies](https://help.okta.com/okta_help.htm?id=ext-about-mfa-enrol-policies&type=oie)

    ## Start activation for an account that already exists

    The place to start depends on the user’s current status.

    - **One staged user.** In **Directory → People**, find the account and select **Activate** in its **Status** column. Confirm with **Activate User** in the dialog.
    - **Multiple users.** In **Directory → People → More Actions → Activate**, review the eligible users. Choose **Activate Selected** for specific accounts or **Activate All** when the entire eligible list is intended, then confirm.
    - **Suspended or deactivated user.** Open the person’s record and look for **Activate** on their page. Here the action restores an existing user. We’ll compare the access effects of suspension and deactivation in the offboarding lesson.

    For an activation path that uses email, the message gives the user instructions to finish. Watch the status of the same account after the admin action and again after the user completes the steps. [Okta · Activate user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm)

    ## Work out where activation stopped

    | What you see | What to inspect |
    | --- | --- |
    | **The user is still Staged.** | Confirm the correct record and check whether an administrator started activation. If the account was intentionally saved for later, use its **Activate** action when appropriate. |
    | **The user is Pending user action and sees no email.** | Verify the address on the user’s record and ask the user to check the mailbox and spam folder. If needed, open the same user and use the resend action if it appears. Okta Support documents the button as **Resend Password Email**. |
    | **The user opened an expired activation link.** | Okta documents seven days as the default validity period, which the org can configure. In Identity Engine, the user can use **Request activation email** on the expired-link page and follow the new message for the same account. |
    | **The user is Active and sees a password change or enrollment prompt.** | Check whether the admin set a password that must be changed on first login. For an enrollment prompt, check which authenticator the applicable policy requires. |
    | **The user can sign in to Okta but can’t open a particular app.** | Check app assignment, the app’s sign-in requirements, and the receiving app’s account where applicable. You’ve verified Okta sign-in already, so follow the problem to the specific app. |

    [Okta · Resend an activation email](https://support.okta.com/help/s/article/How-to-resend-activation-emails) · [Okta · Expired activation links](https://support.okta.com/help/s/article/okta-user-activation-flow-when-the-activation-email-link-expires) · [Okta · Assign applications to users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-apps.htm)

    **Active** tells you what state the account is in. A successful sign-in tells you the user met the requirements for that attempt. App assignment and a successful app launch each give you another piece of evidence. Check the one that answers the question you’re investigating.

=== "Hands-on Lab"

    --8<-- "lab-2.md"


=== "Revision"

    ## Create, activate, verify

    | Scenario | Action and expected evidence |
    | --- | --- |
    | Prepare the record for later | **Directory → People → Add Person → Activate later → Save**. Expect **Staged**. |
    | Start activation immediately | Choose **Activate now**. If setup is still required, look for **Pending user action**, then verify the user's first sign-in. |
    | Admin supplies an initial password | Choose **I will set password** where offered. Check **User must change password on first login**. The account can already show **Active** while the prompt is still due. |
    | Activate a staged user | In the **People** list, choose **Activate** in the **Status** column, then confirm **Activate User**. For multiple users, use **More Actions → Activate** and check the selected scope. |
    | Restore a suspended or deactivated user | Open the user's record and choose **Activate**. The prior state determines what must be verified after that action. |

    **Before saving.** Choose the user type, enter an email-format username and a reachable primary email, and check optional group or realm selections. A group can affect access and which policy applies.

    **Troubleshooting.** For a missing setup email, confirm the account status, address, and mailbox before using the resend action. If an **Active** user is prompted to set up a method, check authenticator enrollment policy.

    **Exam focus.** Compare creation, activation, and first sign-in as separate events. AD-sourced activation has directory-specific settings and belongs in the [exam coverage map](../../exam/coverage.md).

    ### Check your recall

    **1. A user was saved with Activate later. Should you start with a password reset?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Check for Staged and use Activate from the People list when the account is ready.</p>
    </details>

    **2. Can an Active user still see a first-sign-in password change?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Yes. Check whether the administrator required a change when setting the initial password.</p>
    </details>
