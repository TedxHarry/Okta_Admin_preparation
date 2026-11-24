## Lab 2 · Create and activate users { #lab-2 }

Use an isolated Okta Identity Engine lab org, an admin who can create and activate users, and two different email addresses or aliases you control. Use a separate browser session for each test sign-in. See the [module lab setup](hands-on-labs.md#before-you-start) for shared prerequisites and test data.

1. Go to **Directory → People → Add Person**. Select **Okta User (default)** where shown. Enter first name `Lab`, last name `User A`, an email-format username, and the test primary email. Leave optional groups empty. Select **Activate later** and **Save**. Search for A in **People** and record the status. Expect **Staged**.
2. Repeat with last name `User B` and a different username and inbox address. Select **Activate now**, keep **I will set password** clear if offered, and **Save**. Check **People** and B's inbox before the first sign-in. In a separate user session, complete the offered setup and any required enrollment.
3. Return to the **People** list and find A. Select **Activate** in the **Status** column, then **Activate User** in the dialog. Check the test inbox, complete the offered setup, then sign in separately as A. If a message is missing, check the address on the user record, spam, and any resend action appropriate to the current status.
4. For each user, record the status at creation, after activation starts where observable, and after successful sign-in. The exact intermediate status depends on the activation option and what the user must finish.

**Pass check.** Both users can sign in and you can explain which account needed an extra admin action to start activation. Keep A and B for the next labs.

**Optional comparison.** Create a separate disposable user with **Activate now → I will set password**. Keep **User must change password on first login** selected if offered. Check the recorded status, then sign in as that user and record the password-change prompt. Use the approved secure handoff for any temporary credential. For bulk activation practice, open **People → More Actions → Activate**, inspect how **Activate Selected** limits scope, then exit without changing other accounts.

[Okta · Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) · [Okta · Activate user accounts](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-activate-user-account.htm)
