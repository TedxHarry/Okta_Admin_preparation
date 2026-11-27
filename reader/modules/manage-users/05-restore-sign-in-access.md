# Lesson 5 · Restore sign-in access

=== "Theory"

    When someone says “I can’t sign in,” open **Directory → People** and find the exact account. Then find out where they stopped. Were they blocked before entering a password? Did they get asked to change it? Did they get past the password and stop at Okta Verify? Those details help you choose the smallest action that solves the problem. [Okta · User account status](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm)

    ## Decide what needs to change

    | What you find | What to consider |
    | --- | --- |
    | **Locked out**, and the user knows the password | **Unlock** removes the lockout. The existing password is still the one to use if it remains valid. |
    | The user forgot the password or needs a replacement | **Reset password** starts recovery through a link or a temporary password, depending on the option. |
    | **Password expired**, or an admin needs to force a change | Follow the password change prompt or choose the appropriate expiration action. Check whether you’re dealing with one person or an org-wide action. |
    | The user has lost access to a particular sign-in method | **Reset Authenticators** can remove the selected enrollment so the user can set it up again. |
    | **Staged**, **Pending user action**, **Suspended**, or **Deactivated** | Read the state first. Activation or account restoration may be the action you need. |
    | The user gets into Okta and only one app fails | Follow the app assignment and its sign-in requirements. Inspect the receiving account where applicable. |

    For the activation states, see [Lesson 2](02-create-and-activate-a-user.md). An **authenticator** is a way the user proves their identity. An **enrollment** is the setup that connects that method to the user's account. **MFA**, or multifactor authentication, checks more than one type of proof. A password and a registered device are examples of different types. [Okta · Configure the password authenticator](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-password.htm) · [Okta · Reset multifactor authentication](https://help.okta.com/oie/en-us/content/topics/security/mfa/mfa-reset-users.htm)

    ## Unlock one or several accounts

    A **lockout** temporarily blocks sign-in after the conditions in the applicable password policy are met, such as reaching the allowed number of failed attempts. Some policies include an automatic unlock interval. That’s why the same support ticket can show **Locked out** when opened and a different status when you investigate later. [Okta · Configure the password authenticator](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-password.htm)

    - **One user.** In **Directory → People**, use **Locked Out**, open the user, then choose **More Actions → Unlock Account**.
    - **Multiple users.** From **Directory → People → More Actions → Unlock People**, select the affected users, choose **Unlock People**, and confirm **Unlock**. Review who is selected before confirming.

    If the user immediately locks out again, check the new sign-in attempt in the System Log. If a connected directory is involved, check whether the lock is in Okta, in the directory, or both. **Delegated authentication** means Okta relies on a directory such as Active Directory (AD) or an LDAP directory to validate the password. Okta documents that self-service unlock can clear an LDAP-sourced user’s Okta-side lock while the LDAP account remains locked. A directory administrator may still have to unlock the directory record. [Okta · Unlock one account](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-unlock-individual.htm) · [Okta · Unlock multiple accounts](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-unlock-multiple.htm) · [Okta · Configure the password authenticator](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-password.htm)

    ## Reset an individual password

    From **Directory → People**, open the user and choose the password action. The Identity Engine guide calls the control **Reset or Remove password**. Choose a reset method based on what the user can access and what you want them to do next.

    | Reset choice | What the user does next |
    | --- | --- |
    | **Send a password reset email** | The user follows the link sent to their primary and secondary email addresses, where configured. The link lasts **one hour**. For an Okta-managed password, Okta documents that this reset takes effect immediately. |
    | **Create a temporary password** | Give the temporary password through your approved handoff channel. For an Okta-managed account, the reset marks it expired, and the user enters the temporary password and chooses a new one at the next sign-in. |

    If you also need to end existing Okta sessions, review the **Sign out user** option in the reset dialog. Password recovery and the app's own sign-in requirements are separate steps. The admin-initiated recovery step uses the link or temporary password. The user’s next app sign-in can still ask for the factors required by its policy. [Okta · Reset a user password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-individual.htm)

    ### When the directory validates the password

    For delegated AD users, Okta’s individual-expiry guide says the old AD password can still work until the user follows the emailed reset link. Its temporary-password instructions also call out an exception when the AD account is set to **Password never expires**. That setting can suppress the prompt to change the temporary password at the next sign-in. For delegated LDAP users, the LDAP server policy must require or allow the temporary-password change. Check the actual reset path and source policy before telling the user what will happen. [Okta · Reset a user password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-individual.htm) · [Okta · Expire an individual password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-expire-individual-password.htm)

    ### Reset multiple passwords

    Okta documents bulk reset for **AD users in orgs using AD**. From **Directory → People → Reset Passwords**, review the list, optionally filter by **Locked out**, **Expired token**, or **All**, and select the intended users before confirming. Okta sends the reset message with a generated password. For Okta-sourced users, use the documented individual reset flow. The separate **Expire Passwords** action can cover the org when the intended result is a forced change at the next sign-in. [Okta · Reset multiple user passwords](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-reset-multiple.htm)

    ## Expire a password and check the scope

    **One person.** Okta’s individual-expiry procedure uses the **Temporary Password** choice from the user’s **Reset Password** action. This puts the user into **one-time password mode**. Once you generate that temporary password, Okta says you cannot then create a password reset link. Decide which delivery path fits the case before generating the temporary password. [Okta · Expire an individual password](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-expire-individual-password.htm)

    **The org.** In **Directory → People → More Actions → Expire Passwords**, a **Super Admin** or **Org Admin** can require Okta-sourced users to change their passwords at their next sign-in. If the corresponding AD or LDAP password-reset feature is enabled, the scope can include users authenticated by that directory. Check that scope before confirming. Okta documents that existing sessions remain active and API tokens retain their own lifetime. When users change their passwords, apps that support provisioning and have **Sync Password** enabled can receive the change. You can track progress in the **App Password Health Report**. [Okta · Expire all user passwords](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-expire-all-passwords.htm)

    ## Reset an enrolled authenticator

    Suppose the user still knows their password, but their registered phone is gone. Confirm the account and follow your support process for verifying the person. Open the user under **Directory → People → More Actions → Reset Authenticators**. Select the method that needs to be set up again. Okta clears the selected enrollment so the user can re-enroll. If the user already has another method that satisfies the policy, check whether that existing method can get them through sign-in first. [Okta · Reset multifactor authentication](https://help.okta.com/oie/en-us/content/topics/security/mfa/mfa-reset-users.htm) · [Okta · Authenticator enrollment policies](https://help.okta.com/okta_help.htm?id=ext-about-mfa-enrol-policies&type=oie)

    Okta can also offer self-service recovery when its password policy and recovery methods allow it. If the user cannot see the expected recovery option, inspect the applicable **Password** policy and rule under **Security → Authenticators**, the user’s enrolled methods, and the directory that validates the password. [Okta · Configure the password authenticator](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-password.htm) · [Okta · Self-service account recovery](https://help.okta.com/oie/en-us/content/Topics/identity-engine/authenticators/configure-sspr.htm)

    ## Verify the result where the failure happened

    After the action, re-open the user record and read its status. Ask the user to make a fresh sign-in attempt, then check **Reports → System Log** around that time and filter to the intended user. Read the relevant event’s outcome and details. The admin action tells you what was requested. The new sign-in event tells you whether the user got through and where a remaining problem occurred. If Okta sign-in succeeds and the target app still fails, follow the access path into that app. [Okta · System Log filters and search](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm)

=== "Hands-on Lab"

    --8<-- "lab-5.md"


=== "Revision"

    ## Choose the smallest recovery action

    | Symptom | Action |
    | --- | --- |
    | User knows the password and the account says **Locked out** | **Directory → People → user → More Actions → Unlock Account**. Verify a fresh sign-in. For delegated users, check whether the directory is also locked. |
    | User forgot the password | Use **Reset or Remove password** where offered. An emailed link and an admin-generated temporary password have different handoffs. Verify the inbox or the first password-change prompt. |
    | User must change a password | Check the existing **Password expired** state. For an admin-initiated change for one user, review the temporary-password option. Org-wide expiration has a separate scope and control. |
    | User lost an enrolled phone | Open **More Actions → Reset Authenticators** and select the affected enrollment where appropriate. Verify the recovery or re-enrollment path before clearing it. |
    | User can sign in to Okta and one app fails | Check app assignment, app policy, and the target account before changing user credentials. |

    ### System Log filters to practice

    - **New Okta session:** `eventType eq "user.session.start" and outcome.result eq "SUCCESS"`
    - **Successful authenticator verification:** `eventType eq "user.authentication.auth_via_mfa" and outcome.result eq "SUCCESS"`
    - In the second result, expand the event for the test user and inspect **debugContext → debugData → factor** or **factorType** where present. Narrow the time range and compare the failed attempt, the admin action, and the retest.

    **Exam focus.** Demonstrate the fix with a fresh sign-in and factor evidence when the policy prompts for one. A password reset can succeed while a separate sign-in factor or policy still blocks access. [Okta · Locate factor information](https://support.okta.com/help/s/article/how-to-locate-factor-information-in-okta-system-log)

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **A lockout ticket changes halfway through**

    A user knows a valid password, but the delegated directory reports Locked. After the directory unlock, password proof succeeds and the user cannot use their old phone.

    1. What is the smallest action at each stage?
    2. Would expiring the password help after password proof already succeeds?
    3. What do you capture after recovery?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>Use the approved directory unlock first because that is where the password is rejected. After password proof succeeds, verify identity and use the scoped recovery or reset procedure for the unavailable factor.</li>
    <li>Expiration changes what happens to password proof at the next sign-in. The remaining problem is the required additional proof, so investigate enrollment or an approved alternative.</li>
    <li>Record a fresh sign-in by the intended account, the actual verification method and success, and the applicable policy outcome. A successful reset action alone does not prove login worked.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. The login completes password proof but the enrolled phone was replaced. Which action addresses the failed step? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Deactivate and reactivate the account</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B" data-correct> <span>B. Reset only the affected authenticator enrollment after identity verification</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Change the app assignment</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Unlock the password</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> The failure is at the second proof. A scoped reset addresses that enrollment and preserves other methods.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. A user still cannot sign in after an Okta unlock. Which records help separate directory lockout from a lost-factor problem? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. The available and enrolled verification methods</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B"> <span>B. The user&#x27;s app tile order</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. The failed attempt&#x27;s authentication details</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. The account&#x27;s status at the delegated directory</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and C and D.</strong> Locate where the attempt stops, then compare the password authority with the second-factor state.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A successful session-start event alone identifies the exact factor used. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Read correlated authentication or verification details for the method. Session creation alone does not identify it.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. The password is correct but the old Okta Verify phone is unavailable. Which action targets the problem?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Verify the user and recovery route, then reset the affected authenticator enrollment if needed.</p>
    </details>

    **2. A session-start event succeeded. How do you identify the factor?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Find the relevant authenticator verification event and inspect factor or factorType in the event details.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** An Okta unlock succeeded. A new password attempt still fails and the log points to delegated authentication. What do you check before resetting factors?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Identify whether the directory account is still locked or its password expired. Check the directory state and the failed delegated event. If password proof later succeeds and the user cannot complete another factor, investigate that enrollment separately.</p>
    </details>

    **Interview question.** A user reports an unexpected Push prompt and asks you to reset their phone enrollment. How do you handle the ticket?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Verify the identity through the approved recovery process, inspect recent sign-ins and factor activity, and follow the incident procedure if the attempts are suspicious. Reset only the intended enrollment when authorized, then verify fresh enrollment and a known test sign-in.</p>
    </details>
